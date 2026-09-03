import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Question, UserAnswer, getOptionText } from '../types/quiz';
import { MediaRenderer } from '../components/MediaRenderer';
import { ProgressBar } from '../components/ProgressBar';
import { AnswerOption } from '../components/AnswerOption';
import { CommentaryCard } from '../components/CommentaryCard';

interface QuizProps {
  questions: Question[];
  currentIndex: number;
  totalQuestions: number;
  isLocked: boolean;
  currentCommentary: string | null;
  lastAnswer: UserAnswer | null;
  isLastQuestion: boolean;
  onSubmitAnswer: (selectedIndex: number) => void;
  onNextQuestion: () => void;
}

export const Quiz: React.FC<QuizProps> = ({
  questions,
  currentIndex,
  totalQuestions,
  isLocked,
  currentCommentary,
  lastAnswer,
  isLastQuestion,
  onSubmitAnswer,
  onNextQuestion,
}) => {
  const currentQuestion = questions[currentIndex];
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const answerSubmittedRef = useRef<boolean>(false);

  useEffect(() => {
    setSelectedOption(null);
    answerSubmittedRef.current = false;
  }, [currentIndex]);

  const handleSelectOption = useCallback((optionIndex: number) => {
    if (isLocked || answerSubmittedRef.current) return;
    answerSubmittedRef.current = true;
    setSelectedOption(optionIndex);
    onSubmitAnswer(optionIndex);
  }, [isLocked, onSubmitAnswer]);

  // Keyboard navigation adapted to number of options (2, 3, or 4)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.altKey || e.ctrlKey || e.metaKey) return;

      const numOptions = currentQuestion?.options?.length || 4;
      const allowedKeys = ['1', '2', '3', '4'].slice(0, numOptions);

      if (allowedKeys.includes(e.key)) {
        const idx = parseInt(e.key, 10) - 1;
        if (idx >= 0 && idx < numOptions && !isLocked) {
          e.preventDefault();
          handleSelectOption(idx);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLocked, currentQuestion?.options?.length, handleSelectOption]);

  if (!currentQuestion) {
    return null;
  }

  const numOptions = currentQuestion.options.length;
  // Adaptive grid layout for 2, 3, or 4 options
  let gridLayoutClass = "grid grid-cols-1 sm:grid-cols-2 gap-3";
  if (numOptions === 2) {
    gridLayoutClass = "grid grid-cols-1 sm:grid-cols-2 gap-3.5";
  } else if (numOptions === 3) {
    gridLayoutClass = "grid grid-cols-1 sm:grid-cols-3 gap-3";
  }

  return (
    <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 pt-2 pb-14">
      {/* Progress Bar */}
      <ProgressBar current={currentIndex + 1} total={totalQuestions} />

      {/* Main Question Card (Timer completely removed) */}
      <div className="glass-panel rounded-3xl p-5 sm:p-7 border border-white/10 shadow-2xl relative mt-3">
        {/* Media Asset Renderer */}
        <MediaRenderer
          type={currentQuestion.type}
          media={currentQuestion.media}
        />

        {/* Question Text */}
        <div className="my-5 text-center sm:text-left">
          <h2 className="font-display font-bold text-lg sm:text-2xl text-white leading-snug tracking-tight">
            {currentQuestion.question}
          </h2>
        </div>

        {/* Adaptive Answer Options Grid (2, 3, or 4 options) */}
        <div className={`${gridLayoutClass} pt-2`}>
          {currentQuestion.options.map((opt, idx) => {
            const optText = getOptionText(opt);
            return (
              <AnswerOption
                key={idx}
                index={idx}
                text={optText}
                mode={currentQuestion.mode}
                isSelected={selectedOption === idx}
                isCorrect={currentQuestion.mode === 'recognition' ? currentQuestion.answer === idx : undefined}
                showResult={isLocked}
                disabled={isLocked}
                onSelect={handleSelectOption}
              />
            );
          })}
        </div>
      </div>

      {/* Reactive Commentary Popup Card */}
      {isLocked && currentCommentary && lastAnswer && (
        <CommentaryCard
          mode={lastAnswer.mode}
          isCorrect={lastAnswer.isCorrect}
          exposureScore={lastAnswer.exposureScore}
          score={lastAnswer.score}
          commentary={currentCommentary}
          onNext={onNextQuestion}
          isLastQuestion={isLastQuestion}
        />
      )}
    </div>
  );
};
