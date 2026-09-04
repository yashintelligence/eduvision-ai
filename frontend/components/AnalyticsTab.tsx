"use client";

import React from "react";
import { AnalyticsData, ModelInfo } from "@/types";
import { GUJARATI_TEXT } from "@/lib/gujarati";
import { BarChart3, Clock, AlertTriangle, Cpu } from "lucide-react";

interface AnalyticsTabProps {
  analytics: AnalyticsData | null;
  modelInfo: ModelInfo | null;
}

export const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ analytics, modelInfo }) => {
  if (!analytics) {
    return (
      <div className="p-12 text-center text-slate-400 animate-pulse">
        {GUJARATI_TEXT.common.loading}
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 dark:bg-indigo-500/20 dark:text-indigo-300 dark:border-indigo-500/30 mb-2">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>વાસ્તવિક ૩૯૫ વિદ્યાર્થીઓનો સંશોધન ડેટાસેટ</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          {GUJARATI_TEXT.analytics.title}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl leading-relaxed font-medium">
          {GUJARATI_TEXT.analytics.subtitle}
        </p>
      </div>

      {/* Chart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Study Time vs Score */}
        <div className="hud-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-slate-950/80 shadow-md space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-500/20 dark:text-cyan-300 dark:border-blue-500/30">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {GUJARATI_TEXT.analytics.studyVsScoreTitle}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{GUJARATI_TEXT.analytics.studyVsScoreDesc}</p>
            </div>
          </div>

          <div className="space-y-4 pt-3">
            {analytics.study_time_vs_score.map((item, idx) => {
              const maxScore = 20;
              const barWidth = Math.min(100, Math.max(10, (item.avg_score / maxScore) * 100));
              return (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs sm:text-sm font-bold">
                    <span className="text-slate-800 dark:text-slate-200">{item.category}</span>
                    <span className="text-blue-700 dark:text-cyan-300 font-extrabold">
                      {item.avg_score} / ૨૦ ગુણ ({item.count} વિદ્યાર્થી)
                    </span>
                  </div>
                  <div className="h-3.5 w-full bg-slate-100 dark:bg-white/[0.06] rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-white/5">
                    <div
                      style={{ width: `${barWidth}%` }}
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-500 transition-all duration-700"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-xs text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-white/10 pt-3 font-medium">
            💡 <strong>તારણ:</strong> ૧૦+ કલાક અભ્યાસ કરનારા વિદ્યાર્થીઓનો સરેરાશ સ્કોર ૨ કલાકથી ઓછા અભ્યાસ કરતા વિદ્યાર્થીઓ કરતાં લગભગ ૩ ગુણ વધુ રહે છે.
          </div>
        </div>

        {/* Absences vs Score */}
        <div className="hud-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-slate-950/80 shadow-md space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 dark:bg-rose-500/20 dark:text-rose-400 dark:border-rose-500/30">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {GUJARATI_TEXT.analytics.absencesVsScoreTitle}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{GUJARATI_TEXT.analytics.absencesVsScoreDesc}</p>
            </div>
          </div>

          <div className="space-y-4 pt-3">
            {analytics.absences_vs_score.map((item, idx) => {
              const maxScore = 20;
              const barWidth = Math.min(100, Math.max(10, (item.avg_score / maxScore) * 100));
              return (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs sm:text-sm font-bold">
                    <span className="text-slate-800 dark:text-slate-200">{item.category}</span>
                    <span className="text-rose-600 dark:text-rose-400 font-extrabold">
                      {item.avg_score} / ૨૦ ગુણ ({item.count} વિદ્યાર્થી)
                    </span>
                  </div>
                  <div className="h-3.5 w-full bg-slate-100 dark:bg-white/[0.06] rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-white/5">
                    <div
                      style={{ width: `${barWidth}%` }}
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-600 transition-all duration-700"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-xs text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-white/10 pt-3 font-medium">
            💡 <strong>તારણ:</strong> ૨૦ દિવસથી વધુ ગેરહાજરી ધરાવતા વિદ્યાર્થીઓનો સરેરાશ સ્કોર ઘટીને ૭.૮ થઈ જાય છે, જે શૈક્ષણિક જોખમ શ્રેણીમાં આવે છે.
          </div>
        </div>
      </div>

      {/* Feature Importance Breakdown */}
      {modelInfo && (
        <div className="hud-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-slate-950/80 shadow-md space-y-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 border border-purple-200 dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-500/30">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {GUJARATI_TEXT.analytics.keySignalsTitle}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{GUJARATI_TEXT.analytics.keySignalsDesc}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {modelInfo.feature_importances.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 flex flex-col justify-between space-y-2 hover:border-blue-300 dark:hover:border-cyan-500/30 transition-colors"
              >
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-800 dark:text-white truncate max-w-[70%]">{item.feature_name_gu}</span>
                  <span className="text-blue-700 dark:text-cyan-300 font-black">{item.importance_pct}%</span>
                </div>
                <div className="h-2.5 w-full bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${Math.max(4, item.importance_pct)}%` }}
                    className={`h-full rounded-full ${
                      idx === 0
                        ? "bg-cyan-500"
                        : idx === 1
                        ? "bg-blue-500"
                        : idx === 2
                        ? "bg-indigo-500"
                        : "bg-purple-500"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
