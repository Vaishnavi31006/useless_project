import React from 'react';
import { Award, Zap, Timer, CheckCircle } from 'lucide-react';

interface ResultStatsProps {
  totalScore: number;
  maxScore: number;
  recognitionCorrect: number;
  recognitionTotal: number;
  totalQuestions: number;
  averageTime: number;
  fastestTime: number | null;
}

export const ResultStats: React.FC<ResultStatsProps> = ({
  totalScore,
  maxScore,
  recognitionCorrect,
  recognitionTotal,
  totalQuestions,
  averageTime,
  fastestTime,
}) => {
  return (
    <div className="w-full max-w-xl mx-auto grid grid-cols-2 gap-3 my-6">
      {/* Stat 1: Total Points */}
      <div className="glass-panel rounded-2xl p-4 flex flex-col justify-between border border-white/5">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="font-mono text-xs uppercase tracking-wider">Total Score</span>
          <Award className="w-4 h-4 text-brand-violet" />
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-display text-2xl font-bold text-white">{totalScore}</span>
          <span className="font-mono text-xs text-slate-500">/ {maxScore}</span>
        </div>
        <span className="text-[11px] text-slate-500 mt-1 font-mono">
          Across {totalQuestions} total stages
        </span>
      </div>

      {/* Stat 2: Recognition Performance (Only counts mode === 'recognition') */}
      <div className="glass-panel rounded-2xl p-4 flex flex-col justify-between border border-white/5">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="font-mono text-xs uppercase tracking-wider">Recognition</span>
          <CheckCircle className="w-4 h-4 text-brand-emerald" />
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-display text-2xl font-bold text-emerald-400">
            {recognitionCorrect}
          </span>
          <span className="font-mono text-xs text-slate-500">
            / {recognitionTotal}
          </span>
        </div>
        <span className="text-[11px] text-slate-500 mt-1 font-mono">
          {recognitionTotal > 0
            ? `${Math.round((recognitionCorrect / recognitionTotal) * 100)}% recall rate`
            : "No recognition stages"}
        </span>
      </div>

      {/* Stat 3: Avg Speed */}
      <div className="glass-panel rounded-2xl p-4 flex flex-col justify-between border border-white/5">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="font-mono text-xs uppercase tracking-wider">Avg Speed</span>
          <Timer className="w-4 h-4 text-brand-cyan" />
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-display text-2xl font-bold text-white">{averageTime.toFixed(1)}</span>
          <span className="font-mono text-xs text-slate-500">seconds</span>
        </div>
        <span className="text-[11px] text-slate-500 mt-1 font-mono">Reaction time</span>
      </div>

      {/* Stat 4: Fastest Answer */}
      <div className="glass-panel rounded-2xl p-4 flex flex-col justify-between border border-white/5">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="font-mono text-xs uppercase tracking-wider">Fastest Hit</span>
          <Zap className="w-4 h-4 text-brand-amber" />
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-display text-2xl font-bold text-amber-400">
            {fastestTime !== null ? `${fastestTime.toFixed(1)}s` : '—'}
          </span>
        </div>
        <span className="text-[11px] text-slate-500 mt-1 font-mono">Peak reflex reaction</span>
      </div>
    </div>
  );
};
