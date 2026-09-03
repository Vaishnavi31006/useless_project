import React from 'react';
import { Zap, RotateCcw } from 'lucide-react';

interface HeaderProps {
  currentQuestionNumber?: number;
  totalQuestions?: number;
  onRestart?: () => void;
  showRestart?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentQuestionNumber,
  totalQuestions,
  onRestart,
  showRestart = false,
}) => {
  return (
    <header className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-5 pb-3 flex items-center justify-between">
      {/* Brand logo */}
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-violet to-brand-cyan p-[1px] shadow-lg shadow-brand-violet/20 flex items-center justify-center">
          <div className="w-full h-full bg-dark-900/90 rounded-[11px] flex items-center justify-center">
            <Zap className="w-4 h-4 text-brand-cyan fill-brand-cyan" />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-display font-black tracking-wider text-sm sm:text-base text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
            BRAINROT<span className="text-brand-violet">METER</span>
          </span>
          <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 -mt-0.5">
            ONLINE CULTURE INDEX
          </span>
        </div>
      </div>

      {/* Center dynamic question counter if in quiz */}
      {currentQuestionNumber !== undefined && totalQuestions !== undefined && (
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-dark-850/80 border border-white/10 shadow-inner">
          <span className="font-mono text-xs text-slate-400">STAGE</span>
          <span className="font-mono text-sm font-bold text-white tracking-wider">
            {String(currentQuestionNumber).padStart(2, '0')}
            <span className="text-slate-500 font-normal"> / {String(totalQuestions).padStart(2, '0')}</span>
          </span>
        </div>
      )}

      {/* Right action */}
      <div className="flex items-center gap-2">
        {showRestart && onRestart && (
          <button
            onClick={onRestart}
            aria-label="Restart Quiz"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-800/80 hover:bg-dark-700 text-slate-400 hover:text-white text-xs font-mono transition border border-white/5"
            title="Start Over"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">RESET</span>
          </button>
        )}
      </div>
    </header>
  );
};
