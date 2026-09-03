import { QuestionMode, UserAnswer } from '../types/quiz';

/**
 * Brainrot Meter Scoring Engine
 * 
 * Rules:
 * - Every question has a max score of 100
 * - Total max score = questions.length * 100 (Dynamic, never hardcoded)
 * - Speed bonus formula: 30 * Math.max(0, 1 - timeTaken / 10)
 * 
 * Recognition Questions:
 * - Correct: 70 base + speed bonus (up to 30) -> Max 100
 * - Wrong / Timeout: 0 points
 * 
 * Feed Exposure Questions:
 * - Base points from option's exposureScore (e.g. 70, 50, 30, 0)
 * - Speed bonus awarded ONLY if exposureScore > 0
 * - Never seen (exposureScore === 0) or timeout: 0 points regardless of speed
 */

export function calculateRecognitionScore(isCorrect: boolean, timeTaken: number) {
  if (!isCorrect) {
    return { score: 0, speedScore: 0, baseScore: 0 };
  }
  const clampedTime = Math.max(0, Math.min(10, timeTaken));
  const speedScore = Math.round(30 * Math.max(0, 1 - clampedTime / 10));
  const baseScore = 70;
  const score = baseScore + speedScore;
  return { score, speedScore, baseScore };
}

export function calculateFeedScore(exposureScore: number, timeTaken: number) {
  // If user claims never seen (exposure 0), speed bonus is 0
  if (exposureScore <= 0) {
    return { score: 0, speedScore: 0, baseScore: 0 };
  }
  const clampedTime = Math.max(0, Math.min(10, timeTaken));
  const speedScore = Math.round(30 * Math.max(0, 1 - clampedTime / 10));
  const baseScore = exposureScore;
  const score = Math.min(100, baseScore + speedScore);
  return { score, speedScore, baseScore };
}

export function calculateQuestionScore(
  mode: QuestionMode,
  params: { isCorrect?: boolean; exposureScore?: number; timeTaken: number }
) {
  if (mode === 'feed') {
    return calculateFeedScore(params.exposureScore ?? 0, params.timeTaken);
  } else {
    return calculateRecognitionScore(Boolean(params.isCorrect), params.timeTaken);
  }
}

export function calculateTotalStats(answers: UserAnswer[], totalQuestions: number) {
  const maxScore = totalQuestions * 100;
  const totalScore = answers.reduce((acc, curr) => acc + curr.score, 0);
  const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

  // Recognized count: correct for recognition, or exposureScore > 0 for feed
  const recognizedCount = answers.filter(a => {
    if (a.mode === 'feed') {
      return (a.exposureScore ?? 0) > 0;
    }
    return Boolean(a.isCorrect);
  }).length;

  const validTimes = answers.map(a => a.timeTaken).filter(t => t >= 0 && t <= 10);
  const averageTime = validTimes.length > 0
    ? Number((validTimes.reduce((a, b) => a + b, 0) / validTimes.length).toFixed(2))
    : 0;

  const positiveTimes = answers.filter(a => a.score > 0).map(a => a.timeTaken);
  const fastestTime = positiveTimes.length > 0
    ? Number(Math.min(...positiveTimes).toFixed(2))
    : null;

  return {
    totalScore,
    maxScore,
    percentage,
    recognizedCount,
    totalQuestions,
    averageTime,
    fastestTime,
  };
}
