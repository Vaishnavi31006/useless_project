import React from 'react';
import { AlertOctagon, Terminal } from 'lucide-react';
import { ValidationError } from '../utils/validation';

interface ValidationErrorBannerProps {
  errors: ValidationError[];
}

export const ValidationErrorBanner: React.FC<ValidationErrorBannerProps> = ({ errors }) => {
  if (!errors || errors.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 bg-dark-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-2xl bg-dark-900 border-2 border-rose-500/80 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-rose-950/50">
        <div className="flex items-center gap-3 text-rose-400 mb-4">
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center">
            <AlertOctagon className="w-6 h-6 text-rose-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-display text-white">
              Data Validation Error
            </h2>
            <p className="text-xs font-mono text-rose-300">
              src/data/questions.json configuration issue
            </p>
          </div>
        </div>

        <div className="bg-dark-950 rounded-2xl p-4 border border-white/10 font-mono text-xs text-slate-300 max-h-72 overflow-y-auto mb-6 space-y-2">
          <div className="text-slate-400 flex items-center gap-1.5 pb-2 border-b border-white/5 font-semibold">
            <Terminal className="w-3.5 h-3.5 text-rose-400" />
            <span>FOUND {errors.length} ISSUE{errors.length > 1 ? 'S' : ''}:</span>
          </div>
          {errors.map((err, i) => (
            <div key={i} className="text-rose-300/90 pl-2 border-l-2 border-rose-500/50 py-0.5">
              • {err.message}
            </div>
          ))}
        </div>

        <div className="bg-dark-850/80 rounded-2xl p-4 border border-white/5 text-xs text-slate-300 space-y-1">
          <span className="font-semibold text-white block mb-1">How to resolve:</span>
          <p>1. Open <code className="bg-dark-950 px-1.5 py-0.5 rounded text-brand-cyan">src/data/questions.json</code> in VS Code.</p>
          <p>2. Verify each question has a valid <code className="bg-dark-950 px-1.5 py-0.5 rounded text-brand-cyan">mode</code> ("feed" or "recognition"), 2 to 4 options, and valid exposureScores or answer index.</p>
          <p>3. Save the file and Vite will automatically reload.</p>
        </div>
      </div>
    </div>
  );
};
