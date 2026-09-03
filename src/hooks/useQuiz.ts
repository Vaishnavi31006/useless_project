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
  const [quizStats, setQuizStats] = useState<QuizStats | null>(null);

  const currentQuestion = useMemo(() => {
    if (!questions || questions.length === 0 || currentIndex >= questions.length) {
      return null;
    }
    return questions[currentIndex];
  }, [questions, currentIndex]);

  const isLastQuestion = currentIndex >= (questions?.length || 0) - 1;

  // Submit answer
  const submitAnswer = useCallback((selectedIndex: number) => {
    if (isLocked || !currentQuestion) return;

    setIsLocked(true);

    let isCorrect: boolean | undefined = undefined;
    let exposureScore: number | undefined = undefined;
    let selectedOptionText: string | null = null;

    if (currentQuestion.options[selectedIndex] !== undefined) {
      const option = currentQuestion.options[selectedIndex];
      selectedOptionText = getOptionText(option);

      if (currentQuestion.mode === 'feed') {
        exposureScore = getOptionExposureScore(option, 0);
      } else {
        isCorrect = selectedIndex === currentQuestion.answer;
      }
    }

    // Calculate score (purely non-time-based)
    const { score } = calculateQuestionScore(currentQuestion.mode, {
      isCorrect,
      exposureScore,
    });

    // Category and mode are strictly internal to select humorous reaction
    const commentary = getCommentary(currentQuestion.category, currentQuestion.mode, {
      isCorrect,
      exposureScore,
    });

    const userAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      mode: currentQuestion.mode,
      selectedOption: selectedIndex,
      selectedOptionText,
      exposureScore,
      isCorrect,
      score,
      commentary,
    };

    const nextAnswers = [...answers, userAnswer];
    setAnswers(nextAnswers);
    setLastAnswer(userAnswer);
    setCurrentCommentary(commentary);

    // If answering the final question, compute and store full stats immediately
    // so finalStats is 100% available and contains the final question's score
    if (currentIndex >= questions.length - 1) {
      const computedBaseStats = calculateTotalStats(nextAnswers, questions.length);
      const computedVerdict = getVerdict(computedBaseStats.percentage);
      setQuizStats({
        ...computedBaseStats,
        verdict: computedVerdict,
      });
    }
  }, [isLocked, currentQuestion, answers, currentIndex, questions.length]);

  // Proceed to next question (guarded so it never overshoots the last question)
  const nextQuestion = useCallback(() => {
    if (currentIndex >= questions.length - 1) {
      return;
    }
    setIsLocked(false);
    setCurrentCommentary(null);
    setLastAnswer(null);
    setCurrentIndex(prev => prev + 1);
  }, [currentIndex, questions.length]);

  // Retake quiz from question 1
  const retakeQuiz = useCallback(() => {
    setCurrentIndex(0);
    setAnswers([]);
    setIsLocked(false);
    setCurrentCommentary(null);
    setLastAnswer(null);
    setQuizStats(null);
  }, []);

  // Compute final stats (falls back to calculated if quizStats is set)
  const finalStats: QuizStats = useMemo(() => {
    if (quizStats) {
      return quizStats;
    }
    const totalQuestions = questions.length;
    const baseStats = calculateTotalStats(answers, totalQuestions);
    const verdict = getVerdict(baseStats.percentage);

    return {
      ...baseStats,
      verdict,
    };
  }, [quizStats, answers, questions.length]);

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
    submitAnswer,
    nextQuestion,
    retakeQuiz,
  };
}
