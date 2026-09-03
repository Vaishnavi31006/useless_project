import React from 'react';
import { Award, CheckCircle, Eye, Layers } from 'lucide-react';

interface ResultStatsProps {
  totalScore: number;
  maxScore: number;
  recognitionCorrect: number;
  recognitionTotal: number;
  feedTotal: number;
  totalQuestions: number;
}

export const ResultStats: React.FC<ResultStatsProps> = ({
  totalScore,
  maxScore,
  recognitionCorrect,
  recognitionTotal,
  feedTotal,
  totalQuestions,
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
          Max 100 pts per stage
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

      {/* Stat 3: Feed Exposure Stages */}
      <div className="glass-panel rounded-2xl p-4 flex flex-col justify-between border border-white/5">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="font-mono text-xs uppercase tracking-wider">Feed Stages</span>
          <Eye className="w-4 h-4 text-brand-cyan" />
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-display text-2xl font-bold text-brand-cyan">{feedTotal}</span>
          <span className="font-mono text-xs text-slate-500">stages</span>
        </div>
        <span className="text-[11px] text-slate-500 mt-1 font-mono">
          Algorithm exposure
        </span>
      </div>

      {/* Stat 4: Total Questions */}
      <div className="glass-panel rounded-2xl p-4 flex flex-col justify-between border border-white/5">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="font-mono text-xs uppercase tracking-wider">Total Stages</span>
          <Layers className="w-4 h-4 text-brand-amber" />
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-display text-2xl font-bold text-amber-400">{totalQuestions}</span>
          <span className="font-mono text-xs text-slate-500">total</span>
        </div>
        <span className="text-[11px] text-slate-500 mt-1 font-mono">
          Full assessment
        </span>
      </div>
    </div>
  );
};
