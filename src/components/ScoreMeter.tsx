import React, { useEffect, useState } from 'react';

interface ScoreMeterProps {
  percentage: number;
  meterColor?: string;
  verdictTitle: string;
}

export const ScoreMeter: React.FC<ScoreMeterProps> = ({
  percentage,
  meterColor = "#8b5cf6",
  verdictTitle,
}) => {
  const safePercentage = typeof percentage === 'number' && !isNaN(percentage)
    ? Math.min(100, Math.max(0, Math.round(percentage)))
    : 0;

  const [displayValue, setDisplayValue] = useState(safePercentage);

  useEffect(() => {
    let start = 0;
    const end = safePercentage;
    const duration = 1200; // ms
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const frame = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(1, elapsed / duration);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * easeProgress);

      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(frame);
      }
    };

    animationFrameId = requestAnimationFrame(frame);
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [safePercentage]);

  const size = 260;
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayValue / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center my-4 select-none">
      <div className="relative" style={{ width: size, height: size }}>
        <div
          className="absolute inset-0 rounded-full blur-[40px] opacity-25"
          style={{ backgroundColor: meterColor }}
        />

        <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#161a29"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={meterColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-75 ease-out"
            style={{
              filter: `drop-shadow(0 0 12px ${meterColor}99)`,
            }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <span className="font-mono text-xs uppercase tracking-widest text-slate-400 mb-1">
            BRAINROT LEVEL
          </span>
          <div className="flex items-baseline justify-center">
            <span className="font-display font-extrabold text-5xl sm:text-6xl text-white tracking-tight">
              {displayValue}
            </span>
            <span className="font-display font-bold text-2xl text-slate-400 ml-0.5">
              %
            </span>
          </div>
          <span className="font-mono text-[11px] text-slate-500 mt-1">
            EXPOSURE INDEX
          </span>
        </div>
      </div>

      <div 
        className="mt-4 px-4 py-1.5 rounded-full border text-xs sm:text-sm font-bold font-mono tracking-wider uppercase shadow-lg animate-fade-in"
        style={{
          borderColor: `${meterColor}55`,
          backgroundColor: `${meterColor}18`,
          color: meterColor,
        }}
      >
        {verdictTitle}
      </div>
    </div>
  );
};
