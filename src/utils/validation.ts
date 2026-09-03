import { Category, MediaType, QuestionMode, getOptionText, getOptionExposureScore } from '../types/quiz';

const VALID_CATEGORIES: Category[] = ['memes', 'movies', 'music', 'ai', 'slang'];
const VALID_MEDIA_TYPES: MediaType[] = ['image', 'audio', 'video', 'none'];
const VALID_MODES: QuestionMode[] = ['feed', 'recognition'];

export interface ValidationError {
  questionId?: number;
  field?: string;
  message: string;
}

export function validateQuestions(questions: any[]): { isValid: boolean; errors: ValidationError[] } {
  const errors: ValidationError[] = [];

  if (!Array.isArray(questions) || questions.length === 0) {
    return {
      isValid: false,
      errors: [{ message: "questions.json must contain a non-empty array of questions." }]
    };
  }

  const seenIds = new Set<number>();

  questions.forEach((q, index) => {
    const qIndex = `Question #${index + 1}`;

    // ID validation
    if (typeof q.id !== 'number' || isNaN(q.id)) {
      errors.push({ questionId: q.id, field: 'id', message: `${qIndex}: 'id' must be a valid number.` });
    } else if (seenIds.has(q.id)) {
      errors.push({ questionId: q.id, field: 'id', message: `${qIndex}: Duplicate ID ${q.id} detected. Each question ID must be unique.` });
    } else {
      seenIds.add(q.id);
    }

    // Category validation
    if (!VALID_CATEGORIES.includes(q.category)) {
      errors.push({
        questionId: q.id,
        field: 'category',
        message: `${qIndex} (ID: ${q.id}): Invalid category "${q.category}". Must be one of: ${VALID_CATEGORIES.join(', ')}.`
      });
    }

    // Mode validation
    if (!VALID_MODES.includes(q.mode)) {
      errors.push({
        questionId: q.id,
        field: 'mode',
        message: `${qIndex} (ID: ${q.id}): Invalid mode "${q.mode}". Must be "feed" or "recognition".`
      });
    }

    // Media type validation
    if (!VALID_MEDIA_TYPES.includes(q.type)) {
      errors.push({
        questionId: q.id,
        field: 'type',
        message: `${qIndex} (ID: ${q.id}): Invalid type "${q.type}". Must be one of: ${VALID_MEDIA_TYPES.join(', ')}.`
      });
    }

    // Media path validation when type != none
    if (q.type !== 'none' && (!q.media || typeof q.media !== 'string' || q.media.trim() === '')) {
      errors.push({
        questionId: q.id,
        field: 'media',
        message: `${qIndex} (ID: ${q.id}): Question has type "${q.type}" but 'media' path is missing or empty.`
      });
    }

    // Question text validation
    if (!q.question || typeof q.question !== 'string' || q.question.trim() === '') {
      errors.push({
        questionId: q.id,
        field: 'question',
        message: `${qIndex} (ID: ${q.id}): 'question' text cannot be empty.`
      });
    }

    // Options count validation: minimum 2, maximum 4 options
    if (!Array.isArray(q.options) || q.options.length < 2 || q.options.length > 4) {
      errors.push({
        questionId: q.id,
        field: 'options',
        message: `${qIndex} (ID: ${q.id}): 'options' must be an array of 2, 3, or 4 items. Found ${Array.isArray(q.options) ? q.options.length : 'non-array'}.`
      });
    } else {
      q.options.forEach((opt: any, optIdx: number) => {
        const text = getOptionText(opt);
        if (!text || typeof text !== 'string' || text.trim() === '') {
          errors.push({
            questionId: q.id,
            field: `options[${optIdx}]`,
            message: `${qIndex} (ID: ${q.id}): Option index ${optIdx} has empty or missing text.`
          });
        }

        // For Feed questions: each option must have exposureScore between 0 and 70
        if (q.mode === 'feed') {
          if (typeof opt !== 'object' || opt === null || typeof opt.exposureScore !== 'number') {
            errors.push({
              questionId: q.id,
              field: `options[${optIdx}].exposureScore`,
              message: `${qIndex} (ID: ${q.id}): Feed option #${optIdx + 1} must be an object with an 'exposureScore' number.`
            });
          } else if (opt.exposureScore < 0 || opt.exposureScore > 70) {
            errors.push({
              questionId: q.id,
              field: `options[${optIdx}].exposureScore`,
              message: `${qIndex} (ID: ${q.id}): Feed option #${optIdx + 1} exposureScore must be between 0 and 70. Found: ${opt.exposureScore}.`
            });
          }
        }
      });
    }

    // Feed questions must NOT contain an "answer" field
    if (q.mode === 'feed' && q.answer !== undefined) {
      errors.push({
        questionId: q.id,
        field: 'answer',
        message: `${qIndex} (ID: ${q.id}): Feed questions must NOT have an 'answer' field because there is no objectively correct answer.`
      });
    }

    // Recognition questions MUST contain a valid "answer" field (0-based index)
    if (q.mode === 'recognition') {
      if (typeof q.answer !== 'number' || !Number.isInteger(q.answer)) {
        errors.push({
          questionId: q.id,
          field: 'answer',
          message: `${qIndex} (ID: ${q.id}): Recognition questions require an integer 'answer' index.`
        });
      } else if (Array.isArray(q.options) && (q.answer < 0 || q.answer >= q.options.length)) {
        errors.push({
          questionId: q.id,
          field: 'answer',
          message: `${qIndex} (ID: ${q.id}): 'answer' index (${q.answer}) is out of bounds for ${q.options.length} options (must be 0 to ${q.options.length - 1}).`
        });
      }
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
}
