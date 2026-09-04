"use client";

import React from "react";
import { GUJARATI_TEXT } from "@/lib/gujarati";
import { Cpu, GitBranch, Target, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export const ScienceTab: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 dark:bg-cyan-500/20 dark:text-cyan-300 dark:border-cyan-500/30 mb-2">
          <Cpu className="w-3.5 h-3.5" />
          <span>સાયન્સ ફેર ટેકનિકલ પ્રદર્શન</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          {GUJARATI_TEXT.science.title}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl leading-relaxed font-medium">
          {GUJARATI_TEXT.science.subtitle}
        </p>
      </div>

      {/* How Gradient Boosting Works */}
      <div className="hud-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-slate-950/80 shadow-md space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md">
            <GitBranch className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {GUJARATI_TEXT.science.howItWorksTitle}
            </h2>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Scikit-learn Pipeline • GradientBoostingRegressor(random_state=42)
            </span>
          </div>
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          {GUJARATI_TEXT.science.howItWorksDesc}
        </p>

        {/* Tree Concept Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-2">
            <span className="text-xs font-bold text-blue-600 dark:text-cyan-400">સ્ટેપ ૧: પ્રારંભિક વૃક્ષ</span>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">મૂળભૂત અંદાજ</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              પ્રથમ Decision Tree વિદ્યાર્થીના G2 ગુણ અને હાજરી પરથી પ્રાથમિક અંદાજ નક્કી કરે છે.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-2">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">સ્ટેપ ૨: ભૂલ સુધારણા</span>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Residual Learning</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              ત્યારબાદ આવતાં વૃક્ષો અગાઉ થયેલ ભૂલ (Residual error) શોધીને અભ્યાસ સમય અને સહાય જેવા પરિબળો ઉમેરી સુધારો કરે છે.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-2">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">સ્ટેપ ૩: અંતિમ સચોટતા</span>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Optimal Score</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              તમામ વૃક્ષોનું શ્રેષ્ઠ સંયોજન બનીને અંતિમ સ્કોર [૦ થી ૨૦] ની વચ્ચે સચોટ રીતે ક્લેમ્પ થાય છે.
            </p>
          </div>
        </div>
      </div>

      {/* Model Benchmark Table for Science Fair Judges */}
      <div className="hud-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-slate-950/80 shadow-md space-y-5">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <span>વૈજ્ઞાનિક મોડેલ સરખામણી (Model Benchmark)</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 dark:bg-white/[0.04] text-slate-800 dark:text-slate-200 font-bold border-b border-slate-200 dark:border-white/10">
              <tr>
                <th className="py-3 px-4">મોડેલ અલ્ગોરિધમ</th>
                <th className="py-3 px-4">સરેરાશ ભૂલ (MAE)</th>
                <th className="py-3 px-4">ચોકસાઈ સ્કોર (R²)</th>
                <th className="py-3 px-4">સ્થિતિ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/5">
              <tr className="hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200">Linear Regression</td>
                <td className="py-3 px-4 text-slate-700 dark:text-slate-300">૧.૪૪૨૯</td>
                <td className="py-3 px-4 text-slate-700 dark:text-slate-300">૦.૭૬૯૦ (૭૬.૯%)</td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">સામાન્ય રેખીય સંબંધ</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200">Random Forest Regressor</td>
                <td className="py-3 px-4 text-slate-700 dark:text-slate-300">૧.૨૦૬૧</td>
                <td className="py-3 px-4 text-slate-700 dark:text-slate-300">૦.૮૧૩૨ (૮૧.૩%)</td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">સારો બહુવૃક્ષ અંદાજ</td>
              </tr>
              <tr className="bg-blue-50 dark:bg-cyan-500/10 font-bold border-l-4 border-blue-600 dark:border-cyan-400">
                <td className="py-3.5 px-4 text-blue-900 dark:text-cyan-300 font-extrabold">
                  Gradient Boosting Regressor (EduVision AI)
                </td>
                <td className="py-3.5 px-4 text-emerald-700 dark:text-emerald-400 font-extrabold">
                  ૧.૧૮૦૪ (લઘુત્તમ ભૂલ)
                </td>
                <td className="py-3.5 px-4 text-blue-900 dark:text-cyan-300 font-extrabold">
                  ૦.૮૧૩૮ (૮૧.૪% સર્વોચ્ચ)
                </td>
                <td className="py-3.5 px-4 text-emerald-700 dark:text-emerald-400 font-extrabold">
                  ✅ શ્રેષ્ઠ મોડેલ
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
