import React from 'react';
import { Clock, Volume2, Film } from 'lucide-react';

interface TimerProps {
  timeLeft: number; // 0 to 10
  maxTime?: number;
  isMediaPlaying?: boolean;
  mediaType?: 'audio' | 'video' | 'image' | 'none';
}

export const Timer: React.FC<TimerProps> = ({
  timeLeft,
  maxTime = 10,
  isMediaPlaying = false,
  mediaType = 'none',
}) => {
  const percent = Math.max(0, Math.min(100, (timeLeft / maxTime) * 100));

  let colorClass = "from-brand-cyan to-brand-violet";
  let textClass = "text-brand-cyan";
  let isUrgent = false;

  if (timeLeft <= 2.5) {
    colorClass = "from-rose-500 to-red-600";
    textClass = "text-rose-400";
    isUrgent = true;
  } else if (timeLeft <= 5.0) {
    colorClass = "from-amber-400 to-orange-500";
    textClass = "text-amber-400";
  }

  if (isMediaPlaying) {
    return (
      <div className="w-full max-w-2xl mx-auto mb-4 px-4 sm:px-0">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1.5">
          <div className="flex items-center gap-1.5 text-brand-cyan animate-pulse">
            {mediaType === 'audio' ? (
              <Volume2 className="w-3.5 h-3.5" />
            ) : (
              <Film className="w-3.5 h-3.5" />
            )}
            <span className="font-semibold tracking-wider uppercase">
              {mediaType === 'audio' ? 'Playing Audio Cue...' : 'Playing Video Clip...'}
            </span>
          </div>
          <span className="text-slate-500 text-[11px]">Timer starts after playback</span>
        </div>
        <div className="h-2 w-full bg-dark-850 rounded-full overflow-hidden border border-brand-cyan/20">
          <div className="h-full bg-brand-cyan/40 w-full animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto mb-4 px-4 sm:px-0">
      <div className="flex items-center justify-between text-xs font-mono mb-1.5">
        <div className={`flex items-center gap-1.5 ${textClass}`}>
          <Clock className={`w-3.5 h-3.5 ${isUrgent ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }} />
          <span className="font-semibold tracking-wider">RECOGNITION WINDOW</span>
        </div>
        <div className={`font-mono text-sm font-bold ${textClass} ${isUrgent ? 'animate-pulse' : ''}`}>
          {timeLeft.toFixed(1)}s
        </div>
      </div>

      {/* Progress track */}
      <div className="h-2 w-full bg-dark-850 rounded-full overflow-hidden border border-white/5 shadow-inner">
        <div
          className={`h-full bg-gradient-to-r ${colorClass} transition-all duration-75 ease-linear rounded-full ${
            isUrgent ? 'shadow-[0_0_12px_rgba(244,63,94,0.8)]' : ''
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};
