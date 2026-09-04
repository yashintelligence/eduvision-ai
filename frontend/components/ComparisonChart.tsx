"use client";

import React from "react";

interface ComparisonChartProps {
  g1: number;
  g2: number;
  predicted: number;
}

export const ComparisonChart: React.FC<ComparisonChartProps> = ({ g1, g2, predicted }) => {
  const bars = [
    { label: "પ્રથમ સત્ર (G1)", value: g1, color: "from-cyan-500 to-blue-600", border: "border-cyan-400/50" },
    { label: "દ્વિતીય સત્ર (G2)", value: g2, color: "from-blue-600 to-indigo-600", border: "border-blue-400/50" },
    { label: "અનુમાનિત અંતિમ (G3)", value: predicted, color: "from-purple-500 to-pink-600", border: "border-purple-400/50" },
  ];

  return (
    <div className="flex flex-col gap-4 p-2 w-full">
      <div className="grid grid-cols-3 gap-3 h-48 items-end pt-6 pb-2 px-2 border-b border-slate-300/40 dark:border-white/10">
        {bars.map((bar, i) => {
          const heightPercent = Math.min(100, Math.max(8, (bar.value / 20) * 100));
          return (
            <div key={i} className="flex flex-col items-center h-full justify-end group">
              <span className="text-sm sm:text-base font-black text-slate-900 dark:text-white mb-2 group-hover:scale-110 transition-transform">
                {bar.value}
                <span className="text-[11px] font-normal text-slate-500 dark:text-slate-400">/૨૦</span>
              </span>
              <div className="w-full max-w-[52px] bg-slate-200/60 dark:bg-white/[0.05] rounded-t-xl overflow-hidden h-full flex items-end">
                <div
                  style={{ height: `${heightPercent}%` }}
                  className={`w-full rounded-t-xl bg-gradient-to-t ${bar.color} border-t-2 ${bar.border} shadow-lg transition-all duration-700 ease-out`}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-3 gap-2 text-center text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
        <div>G1 સ્કોર</div>
        <div>G2 સ્કોર</div>
        <div className="text-purple-600 dark:text-purple-300">અનુમાનિત સ્કોર</div>
      </div>
    </div>
  );
};
