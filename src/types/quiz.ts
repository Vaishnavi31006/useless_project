export type Category = 'memes' | 'movies' | 'music' | 'ai' | 'slang';
export type MediaType = 'image' | 'audio' | 'video' | 'none';
export type QuestionMode = 'feed' | 'recognition';

export interface QuestionOption {
  text: string;
  exposureScore?: number; // 0 to 70 for Feed questions
}

export interface Question {
  id: number;
  category: Category;
  mode: QuestionMode;
  type: MediaType;
  media: string | null;
  question: string;
  options: (string | QuestionOption)[]; // 2, 3, or 4 options
  answer?: number; // 0-based index, required for 'recognition'
}

export interface UserAnswer {
  questionId: number;
  mode: QuestionMode;
  selectedOption: number | null; // null on timeout
  selectedOptionText: string | null;
  exposureScore?: number; // for feed questions
  isCorrect?: boolean; // for recognition questions
  timeTaken: number; // in seconds
  score: number; // 0 to 100
  commentary: string;
}

export interface VerdictTier {
  min: number;
  max: number;
  title: string;
  tagline: string;
  roasts: string[];
  color: string;
  badgeBg: string;
  meterColor: string;
}

export interface QuizStats {
  totalScore: number;
  maxScore: number;
  percentage: number;
  recognitionCorrect: number; // Correct recognition answers
  recognitionTotal: number; // Total recognition questions
  totalQuestions: number; // All questions (feed + recognition)
  averageTime: number;
  fastestTime: number | null;
  verdict: {
    title: string;
    tagline: string;
    roast: string;
    color: string;
    badgeBg: string;
    meterColor: string;
  };
}

export function getOptionText(opt: string | QuestionOption): string {
  return typeof opt === 'string' ? opt : opt.text;
}

export function getOptionExposureScore(opt: string | QuestionOption, defaultScore: number = 0): number {
  return typeof opt === 'string' ? defaultScore : (opt.exposureScore ?? defaultScore);
}
