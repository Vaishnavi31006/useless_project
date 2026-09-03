import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const progressPercent = total > 0 ? Math.min(100, Math.max(0, (current / total) * 100)) : 0;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 my-2">
      <div className="h-1.5 w-full bg-dark-850 rounded-full overflow-hidden border border-white/5 shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-brand-violet via-brand-cyan to-brand-emerald transition-all duration-300 ease-out shadow-[0_0_12px_rgba(139,92,246,0.6)]"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};
