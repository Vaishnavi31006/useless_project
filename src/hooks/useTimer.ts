import { useState, useEffect, useRef, useCallback } from 'react';

interface UseTimerProps {
  maxDuration?: number; // default 10 seconds
  onTimeout: () => void;
}

export function useTimer({ maxDuration = 10, onTimeout }: UseTimerProps) {
  const [timeLeft, setTimeLeft] = useState<number>(maxDuration);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const startTimeRef = useRef<number | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const onTimeoutRef = useRef(onTimeout);

  useEffect(() => {
    onTimeoutRef.current = onTimeout;
  }, [onTimeout]);

  const stopTimer = useCallback(() => {
    setIsRunning(false);
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (startTimeRef.current !== null) {
      const elapsed = (performance.now() - startTimeRef.current) / 1000;
      return Math.min(maxDuration, Math.max(0, elapsed));
    }
    return maxDuration - timeLeft;
  }, [maxDuration, timeLeft]);

  const startTimer = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    startTimeRef.current = performance.now();
    setTimeLeft(maxDuration);
    setIsRunning(true);

    const tick = () => {
      if (!startTimeRef.current) return;
      const now = performance.now();
      const elapsed = (now - startTimeRef.current) / 1000;
      const remaining = Math.max(0, maxDuration - elapsed);

      setTimeLeft(remaining);

      if (remaining <= 0) {
        setIsRunning(false);
        animFrameRef.current = null;
        onTimeoutRef.current();
      } else {
        animFrameRef.current = requestAnimationFrame(tick);
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);
  }, [maxDuration]);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    startTimeRef.current = null;
    setTimeLeft(maxDuration);
  }, [maxDuration]);

  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  const getTimeTaken = useCallback((): number => {
    if (startTimeRef.current === null) {
      return maxDuration - timeLeft;
    }
    const elapsed = (performance.now() - startTimeRef.current) / 1000;
    return Math.min(maxDuration, Math.max(0, Number(elapsed.toFixed(2))));
  }, [maxDuration, timeLeft]);

  return {
    timeLeft,
    isRunning,
    startTimer,
    stopTimer,
    resetTimer,
    getTimeTaken,
  };
}
