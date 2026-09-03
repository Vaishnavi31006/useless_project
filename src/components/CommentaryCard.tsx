import React, { useEffect, useState } from 'react';
import { ArrowRight, Zap, AlertTriangle, CheckCircle2, XCircle, Eye } from 'lucide-react';
import { QuestionMode } from '../types/quiz';

interface CommentaryCardProps {
  mode: QuestionMode;
  isCorrect?: boolean;
  exposureScore?: number;
  isTimeout: boolean;
  timeTaken: number;
  score: number;
  commentary: string;
  onNext: () => void;
  isLastQuestion: boolean;
}

export const CommentaryCard: React.FC<CommentaryCardProps> = ({
  mode,
  isCorrect = false,
  exposureScore = 0,
  isTimeout,
  timeTaken,
  score,
  commentary,
  onNext,
  isLastQuestion,
}) => {
  const [autoAdvanceProgress, setAutoAdvanceProgress] = useState(100);

  useEffect(() => {
    const duration = 2400; // ms
    const interval = 25;
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
      setAutoAdvanceProgress(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          onNext();
          return 0;
        }
        return prev - step;
      });
    }, interval);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
        e.preventDefault();
        clearInterval(timer);
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onNext]);

  return (
    <div className="w-full max-w-2xl mx-auto my-4 animate-scale-in">
      <div className="relative overflow-hidden rounded-2xl glass-panel border border-brand-violet/30 p-5 sm:p-6 shadow-2xl bg-dark-900/95">
        {/* Top header: Outcome + Speed */}
        <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3.5 mb-3.5">
          <div className="flex items-center gap-2">
            {mode === 'feed' ? (
              // FEED MODE: never say "Correct" or "Incorrect"
              isTimeout ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  TIMEOUT (0 PTS)
                </span>
              ) : exposureScore === 0 ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono bg-slate-700/40 text-slate-300 border border-white/10">
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  ZERO EXPOSURE (0 PTS)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono bg-brand-violet/25 text-brand-cyan border border-brand-violet/40">
                  <Eye className="w-3.5 h-3.5" />
                  EXPOSURE CONFIRMED (+{score} PTS)
                </span>
              )
            ) : (
              // RECOGNITION MODE: objective Correct / Incorrect / Timeout
              isTimeout ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  TIMEOUT (0 PTS)
                </span>
              ) : isCorrect ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  CORRECT (+{score} PTS)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  <XCircle className="w-3.5 h-3.5" />
                  INCORRECT (0 PTS)
                </span>
              )
            )}
          </div>

          <div className="flex items-center gap-1.5 font-mono text-xs text-slate-400 bg-dark-850 px-2.5 py-1 rounded-lg border border-white/5">
            <Zap className="w-3 h-3 text-brand-amber" />
            <span>{timeTaken.toFixed(1)}s</span>
          </div>
        </div>

        {/* Humorous commentary text */}
        <div className="my-2">
          <p className="text-base sm:text-lg font-medium text-slate-100 italic leading-relaxed">
            "{commentary}"
          </p>
        </div>

        {/* Action bar */}
        <div className="mt-4 pt-3 flex items-center justify-between gap-4">
          <span className="font-mono text-[11px] text-slate-500 hidden sm:inline">
            Press [Space] or [Enter] to skip
          </span>

          <button
            type="button"
            onClick={onNext}
            className="ml-auto inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-brand-violet to-brand-cyan hover:opacity-90 text-white text-xs font-bold font-mono uppercase tracking-wider transition shadow-lg shadow-brand-violet/20"
          >
            <span>{isLastQuestion ? 'View Verdict' : 'Next Question'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Automated countdown progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-dark-950">
          <div
            className="h-full bg-gradient-to-r from-brand-violet to-brand-cyan transition-all duration-75"
            style={{ width: `${autoAdvanceProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
