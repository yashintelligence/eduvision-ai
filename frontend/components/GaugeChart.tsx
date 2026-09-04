"use client";

import React from "react";

interface GaugeChartProps {
  score: number; // 0 to 20
  percentage: number; // 0 to 100
}

export const GaugeChart: React.FC<GaugeChartProps> = ({ score, percentage }) => {
  const safePercentage = Math.min(100, Math.max(0, Number(percentage) || 0));
  const safeScore = Math.min(20, Math.max(0, Number(score) || 0));

  // Arc calculations (Radius 105, center at 160, 145)
  const arcRadius = 105;
  const arcCircumference = Math.PI * arcRadius; // ~329.87px for a 180-deg semicircle
  const strokeDashoffset = arcCircumference * (1 - safePercentage / 100);

  // Rotation angle for needle (-90deg at 0%, 0deg at 50%, +90deg at 100%)
  const needleAngle = -90 + (safePercentage / 100) * 180;

  // Status badge config
  const statusInfo =
    safePercentage >= 75
      ? {
          label: "🌟 ઉત્કૃષ્ટ શૈક્ષણિક સિદ્ધિ (A+)",
          color: "text-emerald-700 bg-emerald-100/90 border-emerald-300 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/30",
        }
      : safePercentage >= 50
      ? {
          label: "⚡ સરેરાશ / સુધારવા યોગ્ય (B)",
          color: "text-blue-700 bg-blue-100/90 border-blue-300 dark:bg-cyan-500/15 dark:text-cyan-300 dark:border-cyan-500/30",
        }
      : {
          label: "⚠️ વિશેષ માર્ગદર્શન જરૂરી (C)",
          color: "text-amber-700 bg-amber-100/90 border-amber-300 dark:bg-rose-500/15 dark:text-rose-300 dark:border-rose-500/30",
        };

  return (
    <div className="flex flex-col items-center justify-center p-2 w-full max-w-sm mx-auto">
      <div className="relative w-full max-w-[310px] aspect-[16/11] flex items-center justify-center">
        <svg viewBox="0 0 320 185" className="w-full h-full overflow-visible select-none">
          <defs>
            {/* Smooth 4-stop vibrant gradient */}
            <linearGradient id="meterGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="35%" stopColor="#f97316" />
              <stop offset="68%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>

            {/* Neon Aura Filter */}
            <filter id="meterGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#00f2fe" floodOpacity="0.4" />
            </filter>

            {/* Center Pod Drop Shadow */}
            <filter id="podShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.18" />
            </filter>
          </defs>

          {/* 1. Inactive Background Track */}
          <path
            d="M 55 145 A 105 105 0 0 1 265 145"
            fill="none"
            stroke="currentColor"
            className="text-slate-200 dark:text-slate-800/80"
            strokeWidth="16"
            strokeLinecap="round"
          />

          {/* 2. Active Glowing Progress Arc */}
          <path
            d="M 55 145 A 105 105 0 0 1 265 145"
            fill="none"
            stroke="url(#meterGradient)"
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray={arcCircumference}
            strokeDashoffset={strokeDashoffset}
            filter="url(#meterGlow)"
            className="transition-all duration-1000 ease-out"
          />

          {/* 3. Outer Tick Marks & Labels */}
          {/* 0% */}
          <line x1="42" y1="145" x2="49" y2="145" stroke="currentColor" className="text-slate-400 dark:text-slate-500" strokeWidth="2" />
          <text x="30" y="149" fill="currentColor" className="text-slate-600 dark:text-slate-400 font-extrabold text-[11px]" textAnchor="middle">0%</text>

          {/* 25% */}
          <line x1="77" y1="67" x2="82" y2="72" stroke="currentColor" className="text-slate-400 dark:text-slate-500" strokeWidth="2" />
          <text x="68" y="60" fill="currentColor" className="text-slate-600 dark:text-slate-400 font-extrabold text-[11px]" textAnchor="middle">૨૫%</text>

          {/* 50% */}
          <line x1="160" y1="32" x2="160" y2="39" stroke="currentColor" className="text-slate-400 dark:text-slate-500" strokeWidth="2" />
          <text x="160" y="24" fill="currentColor" className="text-slate-600 dark:text-slate-400 font-extrabold text-[11px]" textAnchor="middle">૫૦%</text>

          {/* 75% */}
          <line x1="243" y1="67" x2="238" y2="72" stroke="currentColor" className="text-slate-400 dark:text-slate-500" strokeWidth="2" />
          <text x="252" y="60" fill="currentColor" className="text-slate-600 dark:text-slate-400 font-extrabold text-[11px]" textAnchor="middle">૭૫%</text>

          {/* 100% */}
          <line x1="278" y1="145" x2="271" y2="145" stroke="currentColor" className="text-slate-400 dark:text-slate-500" strokeWidth="2" />
          <text x="294" y="149" fill="currentColor" className="text-slate-600 dark:text-slate-400 font-extrabold text-[11px]" textAnchor="middle">૧૦૦%</text>

          {/* 4. Tapered Needle Indicator (Rotates around 160, 145) */}
          {/* Note: Drawn BEFORE the central pod so the needle NEVER intersects the text! */}
          <g
            transform={`translate(160, 145) rotate(${needleAngle})`}
            className="transition-transform duration-1000 ease-out"
          >
            {/* Tapered Pointer Blade */}
            <polygon
              points="-3,-60 0,-103 3,-60"
              fill="currentColor"
              className="text-blue-600 dark:text-cyan-400"
            />
            {/* Glowing Beacon Head on the Arc */}
            <circle cx="0" cy="-105" r="5.5" fill="#ffffff" stroke="currentColor" className="text-blue-600 dark:text-cyan-400" strokeWidth="2.5" />
            <circle cx="0" cy="-105" r="8" fill="none" stroke="currentColor" className="text-blue-500/40 dark:text-cyan-400/40 animate-ping" strokeWidth="1" />
          </g>

          {/* 5. Central Solid HUD Pod (Drawn ON TOP of needle) */}
          <g filter="url(#podShadow)">
            {/* Circular Pod Background */}
            <circle
              cx="160"
              cy="145"
              r="62"
              className="fill-white dark:fill-slate-900 stroke-slate-300 dark:stroke-cyan-500/30"
              strokeWidth="2"
            />
            {/* Inner Decorative Tech Ring */}
            <circle
              cx="160"
              cy="145"
              r="54"
              fill="none"
              className="stroke-slate-200/80 dark:stroke-white/10"
              strokeWidth="1"
              strokeDasharray="4 2"
            />

            {/* Main Percentage Display (Razor-sharp, NEVER obscured) */}
            <text
              x="160"
              y="122"
              textAnchor="middle"
              className="fill-slate-900 dark:fill-white font-black tracking-tight"
              style={{ fontSize: "28px", fontFamily: "Outfit, sans-serif" }}
            >
              {safePercentage}%
            </text>

            {/* Score Pill Background & Text */}
            <rect
              x="110"
              y="131"
              width="100"
              height="20"
              rx="10"
              className="fill-blue-50 dark:fill-cyan-500/15 stroke-blue-200 dark:stroke-cyan-500/30"
              strokeWidth="1"
            />
            <text
              x="160"
              y="145"
              textAnchor="middle"
              className="fill-blue-700 dark:fill-cyan-300 font-extrabold text-[11px]"
            >
              {safeScore} / ૨૦ ગુણ
            </text>
          </g>
        </svg>
      </div>

      {/* 6. Live Status Chip */}
      <div
        className={`mt-1 inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold border shadow-sm ${statusInfo.color}`}
      >
        <span>{statusInfo.label}</span>
      </div>
    </div>
  );
};
