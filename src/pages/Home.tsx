import React, { useEffect } from 'react';
import { Play, Flame, Clock, ShieldAlert, Cpu } from 'lucide-react';

interface HomeProps {
  questionsCount: number;
  onStart: () => void;
}

export const Home: React.FC<HomeProps> = ({ questionsCount, onStart }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onStart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onStart]);

  return (
    <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-16 flex flex-col items-center justify-center text-center">
      {/* Eyebrow tag */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dark-850/80 border border-brand-violet/30 mb-6 shadow-lg shadow-brand-violet/10 animate-fade-in">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cyan"></span>
        </span>
        <span className="font-mono text-[11px] sm:text-xs font-semibold text-slate-300 uppercase tracking-widest">
          INTERNET CULTURE EXPOSURE TEST
        </span>
      </div>

      {/* Main Headline */}
      <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-white leading-[1.08] max-w-3xl mb-6">
        HOW ONLINE ARE YOU,{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-violet via-brand-cyan to-brand-emerald">
          REALLY?
        </span>
      </h1>

      {/* Subheadline (Dynamic question count!) */}
      <p className="font-sans text-base sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed mb-8">
        <span className="font-bold text-white font-mono">{questionsCount} stages</span>. Zero context.
        Let's measure how much internet culture and algorithmic brainrot have colonized your feed.
      </p>

      {/* Primary CTA Button */}
      <div className="relative group my-4">
        <div className="absolute -inset-1 bg-gradient-to-r from-brand-violet via-brand-cyan to-brand-emerald rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition duration-300 group-hover:duration-200 animate-pulse-glow" />

        <button
          type="button"
          onClick={onStart}
          aria-label="Start the Brainrot Meter Test"
          className="relative px-8 sm:px-10 py-4 sm:py-5 rounded-2xl bg-dark-950 border border-white/20 text-white font-display font-extrabold text-lg sm:text-xl tracking-wider uppercase flex items-center gap-3 transition-all duration-200 transform group-hover:scale-[1.02] group-active:scale-[0.98] shadow-2xl"
        >
          <Play className="w-5 h-5 fill-brand-cyan text-brand-cyan" />
          <span>START THE TEST</span>
        </button>
      </div>

      <div className="flex items-center gap-2 mt-3 text-xs font-mono text-slate-500">
        <span>Press</span>
        <kbd className="px-2 py-0.5 rounded bg-dark-800 border border-white/10 text-slate-300 font-bold text-[10px]">
          ENTER
        </kbd>
        <span>or click to begin</span>
      </div>

      {/* Feature teaser cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full max-w-3xl mt-12 text-left">
        <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/5 flex flex-col gap-2 transition hover:border-brand-violet/20">
          <div className="w-8 h-8 rounded-xl bg-brand-violet/10 border border-brand-violet/20 flex items-center justify-center text-brand-violet">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-wide">10s Recognition Window</h2>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Every second counts. Immediate recall earns up to 30 speed bonus points.
            </p>
          </div>
        </div>

        <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/5 flex flex-col gap-2 transition hover:border-brand-cyan/20">
          <div className="w-8 h-8 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-wide">Feed Exposure Diagnostics</h2>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Measures what actually surfaced on your algorithm vs. true oblivion.
            </p>
          </div>
        </div>

        <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/5 flex flex-col gap-2 transition hover:border-brand-pink/20">
          <div className="w-8 h-8 rounded-xl bg-brand-pink/10 border border-brand-pink/20 flex items-center justify-center text-brand-pink">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-wide">Zero Filter Roasts</h2>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Get assessed with dynamic reactions and an official online verdict.
            </p>
          </div>
        </div>
      </div>

      {/* Screen time warning footer note */}
      <div className="flex items-center justify-center gap-2 mt-12 text-[11px] font-mono text-slate-600">
        <ShieldAlert className="w-3.5 h-3.5 text-slate-500" />
        <span>Your algorithmic feed history has inevitable consequences.</span>
      </div>
    </div>
  );
};
