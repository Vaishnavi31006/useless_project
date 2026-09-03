import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { QuizStats } from '../types/quiz';
import { ScoreMeter } from '../components/ScoreMeter';
import { ResultStats } from '../components/ResultStats';
import { RotateCcw, Share2, Check, Sparkles, MessageSquareQuote } from 'lucide-react';

interface ResultsProps {
  stats: QuizStats;
  onRetake: () => void;
}

export const Results: React.FC<ResultsProps> = ({ stats, onRetake }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const count = 200;
      const defaults = {
        origin: { y: 0.7 },
        zIndex: 100,
      };

      function fire(particleRatio: number, opts: confetti.Options) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      }

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
      });
      fire(0.2, {
        spread: 60,
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });
    } catch (e) {
      // Fallback if canvas is unavailable
    }
  }, []);

  const handleShare = async () => {
    const shareText = `I scored ${stats.percentage}% (${stats.verdict.title}) on the Brainrot Meter! "${stats.verdict.roast}"`;
    const shareData = {
      title: 'Brainrot Meter Result',
      text: shareText,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(`${shareText}\nTake the test: ${window.location.href}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      // Fallback
    }
  };

  return (
    <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 pt-4 pb-20 flex flex-col items-center text-center animate-fade-in">
      {/* Header Eyebrow */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dark-850/90 border border-white/10 mb-4 shadow-inner">
        <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
        <span className="font-mono text-xs uppercase tracking-wider text-slate-300">
          ASSESSMENT COMPLETE
        </span>
      </div>

      <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
        OFFICIAL VERDICT
      </h1>

      {/* Animated Circular Gauge Meter */}
      <ScoreMeter
        percentage={stats.percentage}
        meterColor={stats.verdict.meterColor}
        verdictTitle={stats.verdict.title}
      />

      {/* Tagline */}
      <p className="text-sm font-mono text-slate-400 max-w-md -mt-1 mb-6">
        {stats.verdict.tagline}
      </p>

      {/* Roast Card */}
      <div className="w-full max-w-xl glass-panel rounded-3xl p-6 sm:p-7 border border-white/10 shadow-2xl relative my-2 text-left group">
        <div className="flex items-center gap-2 text-brand-amber text-xs font-mono font-bold uppercase tracking-wider mb-2">
          <MessageSquareQuote className="w-4 h-4" />
          <span>Algorithmic Diagnosis</span>
        </div>
        <p className="text-base sm:text-xl font-medium text-slate-100 italic leading-relaxed">
          "{stats.verdict.roast}"
        </p>
      </div>

      {/* Metrics Stats Grid */}
      <ResultStats
        totalScore={stats.totalScore}
        maxScore={stats.maxScore}
        recognizedCount={stats.recognizedCount}
        totalQuestions={stats.totalQuestions}
        averageTime={stats.averageTime}
        fastestTime={stats.fastestTime}
      />

      {/* Action Buttons: Retake & Share */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-md mt-4">
        <button
          type="button"
          onClick={onRetake}
          className="w-full sm:w-1/2 px-6 py-4 rounded-2xl bg-dark-850 hover:bg-dark-800 text-white font-display font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 border border-white/10 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
        >
          <RotateCcw className="w-4 h-4 text-brand-cyan" />
          <span>RETAKE TEST</span>
        </button>

        <button
          type="button"
          onClick={handleShare}
          className="w-full sm:w-1/2 px-6 py-4 rounded-2xl bg-gradient-to-r from-brand-violet to-brand-cyan hover:opacity-90 text-white font-display font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-brand-violet/25"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-white" />
              <span>COPIED LINK!</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4 text-white" />
              <span>SHARE RESULT</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
