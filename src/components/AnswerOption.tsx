import React from 'react';
import { Check, X, Eye } from 'lucide-react';
import { QuestionMode } from '../types/quiz';

interface AnswerOptionProps {
  index: number;
  text: string;
  mode: QuestionMode;
  isSelected: boolean;
  isCorrect?: boolean;
  showResult: boolean;
  disabled: boolean;
  onSelect: (index: number) => void;
}

const OPTION_KEYS = ['1', '2', '3', '4'];
const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

export const AnswerOption: React.FC<AnswerOptionProps> = ({
  index,
  text,
  mode,
  isSelected,
  isCorrect,
  showResult,
  disabled,
  onSelect,
}) => {
  let stateClasses = "glass-panel-interactive border-white/10 text-slate-200 hover:border-brand-violet/40";
  let badgeClasses = "bg-dark-800 text-slate-400 border-white/10";
  let icon = null;

  if (showResult) {
    if (mode === 'feed') {
      // Feed mode: selected option highlighted cleanly without right/wrong judgment
      if (isSelected) {
        stateClasses = "bg-brand-violet/20 border-brand-violet/70 text-white shadow-[0_0_20px_rgba(139,92,246,0.35)] scale-[1.01]";
        badgeClasses = "bg-brand-violet text-white font-bold border-brand-violet/80";
        icon = <Eye className="w-4 h-4 text-brand-cyan" />;
      } else {
        stateClasses = "bg-dark-900/40 border-white/5 text-slate-500 opacity-40";
        badgeClasses = "bg-dark-950 text-slate-600 border-white/5";
      }
    } else {
      // Recognition mode: objective correct / incorrect
      if (isCorrect) {
        stateClasses = "bg-emerald-500/15 border-emerald-500/60 text-white shadow-[0_0_20px_rgba(16,185,129,0.35)] scale-[1.01]";
        badgeClasses = "bg-emerald-500 text-dark-950 font-bold border-emerald-400";
        icon = <Check className="w-4 h-4 text-emerald-400" />;
      } else if (isSelected && !isCorrect) {
        stateClasses = "bg-rose-500/15 border-rose-500/60 text-rose-200 shadow-[0_0_20px_rgba(244,63,94,0.35)] animate-shake";
        badgeClasses = "bg-rose-500 text-white font-bold border-rose-400";
        icon = <X className="w-4 h-4 text-rose-400" />;
      } else {
        stateClasses = "bg-dark-900/40 border-white/5 text-slate-500 opacity-40";
        badgeClasses = "bg-dark-950 text-slate-600 border-white/5";
      }
    }
  } else if (disabled) {
    stateClasses = "bg-dark-900/50 border-white/5 text-slate-500 cursor-not-allowed";
  }

  return (
    <button
      type="button"
      onClick={() => !disabled && onSelect(index)}
      disabled={disabled}
      aria-label={`Option ${OPTION_LETTERS[index] || index + 1}: ${text}`}
      className={`relative w-full text-left p-4 sm:p-5 rounded-2xl border flex items-center justify-between gap-4 group transition-all duration-200 select-none outline-none focus-visible:ring-2 focus-visible:ring-brand-violet ${stateClasses}`}
    >
      <div className="flex items-center gap-3.5 flex-1 min-w-0">
        <span className={`w-8 h-8 rounded-xl border flex items-center justify-center font-mono text-xs font-bold transition shrink-0 ${badgeClasses}`}>
          {OPTION_KEYS[index] || index + 1}
        </span>
        <span className="text-sm sm:text-base font-medium leading-snug break-words">
          {text}
        </span>
      </div>

      {icon && (
        <div className="shrink-0 pl-2">
          {icon}
        </div>
      )}
    </button>
  );
};
