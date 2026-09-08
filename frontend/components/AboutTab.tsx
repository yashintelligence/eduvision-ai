"use client";

import React from "react";
import { GUJARATI_TEXT } from "@/lib/gujarati";
import { School, UserCheck, Target, Sparkles } from "lucide-react";

export const AboutTab: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-500/30 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>શૈક્ષણિક વિજ્ઞાન & AI પહેલ</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          {GUJARATI_TEXT.about.title}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 font-medium">
          {GUJARATI_TEXT.about.subtitle}
        </p>
      </div>

      {/* Vision Card */}
      <div className="hud-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-slate-950/80 shadow-md space-y-4">
        <div className="flex items-center gap-2.5 text-lg font-bold text-slate-900 dark:text-white">
          <Target className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
          <span>{GUJARATI_TEXT.about.visionTitle}</span>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          {GUJARATI_TEXT.about.visionText}
        </p>
        <div className="p-4 rounded-2xl bg-blue-50 dark:bg-cyan-950/40 border border-blue-200 dark:border-cyan-800/60 text-xs text-blue-900 dark:text-cyan-200 leading-relaxed font-bold">
          💡 "વિદ્યાર્થી પ્રગતિ માટે બુદ્ધિશાળી આગાહી અને સમયસર માર્ગદર્શન"
        </div>
      </div>

      {/* Grid: School, Mentor */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* School */}
        <div className="hud-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-slate-950/80 shadow-md space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 flex items-center justify-center border border-blue-200 dark:border-blue-500/30">
            <School className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
              {GUJARATI_TEXT.about.schoolInfoTitle}
            </span>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white mt-1">
              {GUJARATI_TEXT.schoolName}
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            ગ્રામીણ અને અર્ધ-શહેરી ક્ષેત્રના વિદ્યાર્થીઓ માટે અદ્યતન ટેકનોલોજી દ્વારા ગુણવત્તાયુક્ત શિક્ષણ માર્ગદર્શન પૂરું પાડતી શાળા.
          </p>
        </div>

        {/* Mentor */}
        <div className="hud-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-slate-950/80 shadow-md space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400 flex items-center justify-center border border-purple-200 dark:border-purple-500/30">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
              {GUJARATI_TEXT.about.mentorInfoTitle}
            </span>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white mt-1">
              {GUJARATI_TEXT.mentorName}
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            શિક્ષક અને શૈક્ષણિક પ્રોજેક્ટ માર્ગદર્શક. વિદ્યાર્થીઓના સર્વાંગી વિકાસ અને AI આધારિત શૈક્ષણિક સંશોધનના પ્રણેતા.
          </p>
        </div>
      </div>
    </div>
  );
};
