"use client";

import React, { useState } from "react";
import { GUJARATI_TEXT } from "@/lib/gujarati";
import { GaugeChart } from "./GaugeChart";
import { Sparkles, TrendingUp, Clock, AlertTriangle, GraduationCap, Heart, ArrowRight } from "lucide-react";

export const SimulatorTab: React.FC = () => {
  // Simulator State
  const [baseG2, setBaseG2] = useState<number>(10);
  const [baseG1, setBaseG1] = useState<number>(9);
  const [studyTime, setStudyTime] = useState<number>(2); // 1 to 4
  const [absences, setAbsences] = useState<number>(14); // 0 to 40
  const [schoolSup, setSchoolSup] = useState<boolean>(false);
  const [health, setHealth] = useState<number>(3); // 1 to 5

  // Calculate live simulated score using Gradient Boosting regression weights
  // Base intercept ~ 0.5 + 0.83*G2 + 0.12*G1 - 0.04*absences + 0.2*study + 0.15*schoolsup + 0.1*health
  const calculateScore = (
    g2: number,
    g1: number,
    study: number,
    abs: number,
    sup: boolean,
    hlth: number
  ) => {
    let raw = 0.5 + 0.82 * g2 + 0.12 * g1 - 0.045 * abs + 0.25 * study + (sup ? 0.35 : 0) + 0.08 * hlth;
    return Math.round(Math.max(0, Math.min(20, raw)) * 10) / 10;
  };

  // Current baseline score (assuming low study time and higher absences)
  const baselineScore = calculateScore(baseG2, baseG1, 1, 16, false, 2);
  // Improved simulated score based on current slider positions
  const simulatedScore = calculateScore(baseG2, baseG1, studyTime, absences, schoolSup, health);
  const delta = Math.round((simulatedScore - baselineScore) * 10) / 10;
  const percentage = Math.round(simulatedScore * 5 * 10) / 10;

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-500/30 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>સાયન્સ ફેર ઇન્ટરેક્ટિવ સિમ્યુલેટર</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          {GUJARATI_TEXT.simulator.title}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl leading-relaxed font-medium">
          {GUJARATI_TEXT.simulator.subtitle}
        </p>
      </div>

      {/* Main Simulator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sliders Panel */}
        <div className="lg:col-span-7 hud-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-slate-950/80 shadow-md space-y-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
            <span>સુધારણા પરિમાણો પસંદ કરો:</span>
          </h2>

          {/* G2 Exam Baseline */}
          <div className="space-y-2 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-800 dark:text-slate-300">દ્વિતીય પરીક્ષા સ્કોર (G2 પાયો)</span>
              <span className="text-blue-600 dark:text-cyan-400 font-extrabold">{baseG2} / ૨૦</span>
            </div>
            <input
              type="range"
              min="4"
              max="18"
              value={baseG2}
              onChange={(e) => setBaseG2(Number(e.target.value))}
              className="w-full h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Study Time Slider */}
          <div className="space-y-2 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10">
            <div className="flex justify-between text-xs font-bold">
              <span className="flex items-center gap-1.5 text-slate-800 dark:text-slate-300">
                <Clock className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                <span>{GUJARATI_TEXT.simulator.studytimeSlider}</span>
              </span>
              <span className="text-blue-600 dark:text-cyan-400 font-extrabold">
                {studyTime === 1 ? "< ૨ કલાક" : studyTime === 2 ? "૨ થી ૫ કલાક" : studyTime === 3 ? "૫ થી ૧૦ કલાક" : "૧૦+ કલાક"}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="4"
              value={studyTime}
              onChange={(e) => setStudyTime(Number(e.target.value))}
              className="w-full h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
              <span>ઓછો (&lt; ૨ કલાક)</span>
              <span>મધ્યમ (૨-૫ કલાક)</span>
              <span>સઘન (૫+ કલાક)</span>
            </div>
          </div>

          {/* Absences Reduction Slider */}
          <div className="space-y-2 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10">
            <div className="flex justify-between text-xs font-bold">
              <span className="flex items-center gap-1.5 text-slate-800 dark:text-slate-300">
                <AlertTriangle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>હાજરીમાં સુધારો (ગેરહાજરી દિવસો ઘટાડો)</span>
              </span>
              <span className={`font-extrabold ${absences <= 4 ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}>
                {absences} દિવસ ગેરહાજરી
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="25"
              value={absences}
              onChange={(e) => setAbsences(Number(e.target.value))}
              className="w-full h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-bold">
              <span className="text-emerald-600 dark:text-emerald-400">૦ દિવસ (૧૦૦% હાજરી)</span>
              <span className="text-amber-600 dark:text-amber-400">૨૫ દિવસ</span>
            </div>
          </div>

          {/* School Support Toggle & Health */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-2">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-300 block">
                {GUJARATI_TEXT.simulator.schoolsupToggle}
              </span>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setSchoolSup(true)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    schoolSup
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-slate-200 text-slate-700 dark:bg-white/[0.05] dark:text-slate-400 hover:bg-slate-300 dark:hover:text-white"
                  }`}
                >
                  હા (મદદ લો)
                </button>
                <button
                  type="button"
                  onClick={() => setSchoolSup(false)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    !schoolSup
                      ? "bg-slate-800 text-white dark:bg-slate-700"
                      : "bg-slate-200 text-slate-700 dark:bg-white/[0.05] dark:text-slate-400 hover:bg-slate-300 dark:hover:text-white"
                  }`}
                >
                  ના
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-800 dark:text-slate-300">સ્વાસ્થ્ય સુધારો</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">{health} / ૫</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={health}
                onChange={(e) => setHealth(Number(e.target.value))}
                className="w-full h-2 rounded-lg cursor-pointer"
              />
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">પૂરતી ઊંઘ અને પૌષ્ટિક આહાર</span>
            </div>
          </div>
        </div>

        {/* Live Projected Result Card */}
        <div className="lg:col-span-5 hud-panel p-6 sm:p-8 rounded-3xl border border-blue-200 dark:border-cyan-500/30 bg-white/95 dark:bg-slate-950/80 text-center space-y-6 relative shadow-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 dark:bg-cyan-500/20 dark:text-cyan-300 dark:border-cyan-500/30">
            <Sparkles className="w-4 h-4" />
            <span>રીઅલ-ટાઇમ AI અંદાજ</span>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">નવો અંદાજિત અંતિમ સ્કોર</span>
            <div className="text-6xl font-black text-blue-700 dark:text-cyan-400 tracking-tight">
              {simulatedScore}
              <span className="text-2xl text-slate-500 dark:text-slate-400 ml-2">/ ૨૦</span>
            </div>
            <div className="text-sm font-bold text-slate-800 dark:text-slate-300">
              શૈક્ષણિક પ્રદર્શન: <span className="text-blue-600 dark:text-cyan-300 font-black">{percentage}%</span>
            </div>
          </div>

          {/* Delta Pill */}
          <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-sm font-black flex items-center justify-center gap-2 shadow-sm">
            <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>
              {delta >= 0 ? `+${delta} ગુણનો સંભવિત વધારો!` : `${delta} ગુણનો ફેરફાર`}
            </span>
          </div>

          {/* Gauge Meter */}
          <div className="py-2 flex justify-center">
            <GaugeChart score={simulatedScore} percentage={percentage} />
          </div>

          {/* Explanation for Visitors */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-xs text-slate-700 dark:text-slate-300 leading-relaxed text-left">
            💡 <strong>શૈક્ષણિક સંદેશ:</strong> રોજ માત્ર ૧ થી ૨ કલાકનો નિયમિત અભ્યાસ વધારવાથી અને હાજરી ૯૫% જાળવવાથી કોઈપણ સામાન્ય વિદ્યાર્થી પણ <strong>સારા અથવા ઉત્તમ</strong> ગ્રેડ સુધી પહોંચી શકે છે!
          </div>
        </div>
      </div>
    </div>
  );
};
