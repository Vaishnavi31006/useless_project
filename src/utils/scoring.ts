import { QuestionMode, UserAnswer } from '../types/quiz';

/**
 * Brainrot Meter Scoring Engine
 * 
 * Rules:
 * - Every question has a max score of 100
 * - Total max score = questions.length * 100 (Dynamic, never hardcoded)
 * - NO timers, NO time-based calculations, NO speed bonuses.
 * 
 * Recognition Questions:
 * - Correct: 100 points
 * - Wrong: 0 points
 * 
 * Feed Exposure Questions:
 * - Scales 0-70 exposureScore to 0-100:
 *   70 -> 100
 *   50 -> 71
 *   30 -> 43
 *   0  -> 0
 * - Formula: Math.round((exposureScore / 70) * 100)
 */

export function calculateRecognitionScore(isCorrect: boolean): { score: number } {
  return { score: isCorrect ? 100 : 0 };
}

export function calculateFeedScore(exposureScore: number): { score: number } {
  if (exposureScore <= 0) {
    return { score: 0 };
  }
  const score = Math.min(100, Math.max(0, Math.round((exposureScore / 70) * 100)));
  return { score };
}

export function calculateQuestionScore(
  mode: QuestionMode,
  params: { isCorrect?: boolean; exposureScore?: number }
): { score: number } {
  if (mode === 'feed') {
    return calculateFeedScore(params.exposureScore ?? 0);
  } else {
    return calculateRecognitionScore(Boolean(params.isCorrect));
  }
}

export function calculateTotalStats(answers: UserAnswer[], totalQuestions: number) {
  const maxScore = totalQuestions * 100;
  const totalScore = answers.reduce((acc, curr) => acc + curr.score, 0);
  const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

  // Recognition questions only
  const recognitionAnswers = answers.filter(a => a.mode === 'recognition');
  const recognitionTotal = recognitionAnswers.length;
  const recognitionCorrect = recognitionAnswers.filter(a => a.isCorrect === true).length;
  const feedTotal = answers.filter(a => a.mode === 'feed').length;

  return {
    totalScore,
    maxScore,
    percentage,
    recognitionCorrect,
    recognitionTotal,
    totalQuestions,
    feedTotal,
  };
}
