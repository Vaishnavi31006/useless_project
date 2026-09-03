import { useState, useCallback, useMemo } from 'react';
import { Question, UserAnswer, QuizStats, getOptionText, getOptionExposureScore } from '../types/quiz';
import { calculateQuestionScore, calculateTotalStats } from '../utils/scoring';
import { getCommentary } from '../data/commentaries';
import { getVerdict } from '../data/verdicts';

export function useQuiz(questions: Question[]) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [currentCommentary, setCurrentCommentary] = useState<string | null>(null);
  const [lastAnswer, setLastAnswer] = useState<UserAnswer | null>(null);
  const [isMediaReady, setIsMediaReady] = useState<boolean>(false);
  const [isMediaPlaying, setIsMediaPlaying] = useState<boolean>(false);

  const currentQuestion = useMemo(() => {
    if (!questions || questions.length === 0 || currentIndex >= questions.length) {
      return null;
    }
    return questions[currentIndex];
  }, [questions, currentIndex]);

  const isLastQuestion = currentIndex >= (questions?.length || 0) - 1;

  // Submit answer
  const submitAnswer = useCallback((
    selectedIndex: number | null,
    timeTaken: number,
    isTimeout: boolean = false
  ) => {
    if (isLocked || !currentQuestion) return;

    setIsLocked(true);
    setIsMediaPlaying(false);

    let isCorrect: boolean | undefined = undefined;
    let exposureScore: number | undefined = undefined;
    let selectedOptionText: string | null = null;

    if (selectedIndex !== null && currentQuestion.options[selectedIndex] !== undefined) {
      const option = currentQuestion.options[selectedIndex];
      selectedOptionText = getOptionText(option);

      if (currentQuestion.mode === 'feed') {
        exposureScore = getOptionExposureScore(option, 0);
      } else {
        isCorrect = selectedIndex === currentQuestion.answer;
      }
    } else {
      // Timeout or unanswered
      if (currentQuestion.mode === 'feed') {
        exposureScore = 0;
      } else {
        isCorrect = false;
      }
    }

    // Calculate score
    const { score } = calculateQuestionScore(currentQuestion.mode, {
      isCorrect,
      exposureScore,
      timeTaken: isTimeout ? 10.0 : timeTaken,
    });

    // Category and mode are strictly internal to select humorous reaction
    const commentary = getCommentary(currentQuestion.category, currentQuestion.mode, {
      isCorrect,
      exposureScore,
      timeTaken: isTimeout ? 10.0 : timeTaken,
      isTimeout,
    });

    const userAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      mode: currentQuestion.mode,
      selectedOption: selectedIndex,
      selectedOptionText,
      exposureScore,
      isCorrect,
      timeTaken: Number(timeTaken.toFixed(2)),
      score,
      commentary,
    };

    setLastAnswer(userAnswer);
    setCurrentCommentary(commentary);
    setAnswers(prev => [...prev, userAnswer]);
  }, [isLocked, currentQuestion]);

  // Proceed to next question
  const nextQuestion = useCallback(() => {
    setIsLocked(false);
    setCurrentCommentary(null);
    setLastAnswer(null);
    setIsMediaReady(false);
    setIsMediaPlaying(false);
    setCurrentIndex(prev => prev + 1);
  }, []);

  // Retake quiz from question 1
  const retakeQuiz = useCallback(() => {
    setCurrentIndex(0);
    setAnswers([]);
    setIsLocked(false);
    setCurrentCommentary(null);
    setLastAnswer(null);
    setIsMediaReady(false);
    setIsMediaPlaying(false);
  }, []);

  // Compute final stats
  const finalStats: QuizStats = useMemo(() => {
    const totalQuestions = questions.length;
    const baseStats = calculateTotalStats(answers, totalQuestions);
    const verdict = getVerdict(baseStats.percentage);

    return {
      ...baseStats,
      verdict,
    };
  }, [answers, questions.length]);

  return {
    currentIndex,
    currentQuestion,
    totalQuestions: questions.length,
    isLastQuestion,
    isLocked,
    currentCommentary,
    lastAnswer,
    answers,
    finalStats,
    isMediaReady,
    setIsMediaReady,
    isMediaPlaying,
    setIsMediaPlaying,
    submitAnswer,
    nextQuestion,
    retakeQuiz,
  };
}
