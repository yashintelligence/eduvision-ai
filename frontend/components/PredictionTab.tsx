"use client";

import React, { useState } from "react";
import { PredictionInput, PredictionResponse } from "@/types";
import { GUJARATI_TEXT, RISK_COLORS } from "@/lib/gujarati";
import { GaugeChart } from "./GaugeChart";
import { ComparisonChart } from "./ComparisonChart";
import { CelebrationEffect } from "./CelebrationEffect";
import { StudentReportModal } from "./StudentReportModal";
import {
  Sparkles,
  RotateCcw,
  FileText,
  CheckCircle,
  AlertCircle,
  Clock,
  BookOpen,
  Heart,
  HelpCircle,
  User,
  GraduationCap,
  ShieldAlert,
  Zap,
  Cpu,
  Flame,
  Award,
} from "lucide-react";

interface PredictionTabProps {
  onPredict: (data: PredictionInput) => Promise<PredictionResponse>;
  currentResult: PredictionResponse | null;
  setCurrentResult: (res: PredictionResponse | null) => void;
}

const DEFAULT_INPUT: PredictionInput = {
  student_name: "",
  standard: "8",
  G1: 12,
  G2: 13,
  studytime: 2,
  failures: 0,
  schoolsup: "yes",
  famsup: "yes",
  internet: "yes",
  higher: "yes",
  goout: 3,
  freetime: 3,
  health: 4,
  absences: 4,
};

export const PredictionTab: React.FC<PredictionTabProps> = ({
  onPredict,
  currentResult,
  setCurrentResult,
}) => {
  const [formData, setFormData] = useState<PredictionInput>(DEFAULT_INPUT);
  const [loading, setLoading] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (formData.G1 < 0 || formData.G1 > 20 || formData.G2 < 0 || formData.G2 > 20) {
      setValidationError("પરીક્ષાના ગુણ ૦ થી ૨૦ ની વચ્ચે હોવા જોઈએ.");
      return;
    }

    setLoading(true);
    try {
      const res = await onPredict(formData);
      setCurrentResult(res);
      if (res.risk_level === "excellent") {
        setCelebrate(true);
        setTimeout(() => setCelebrate(false), 4500);
      }
      setTimeout(() => {
        const el = document.getElementById("prediction-result-view");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } catch (err) {
      console.error(err);
      setValidationError("આગાહી કરવામાં ક્ષતિ સર્જાઈ છે. કૃપા કરીને ફરી પ્રયાસ કરો.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(DEFAULT_INPUT);
    setCurrentResult(null);
    setValidationError(null);
  };

  return (
    <div className="space-y-10 animate-fadeIn max-w-5xl mx-auto pt-4">
      <CelebrationEffect trigger={celebrate} />

      {/* Printable Certificate Modal */}
      {showCertificateModal && currentResult && (
        <StudentReportModal
          prediction={currentResult}
          onClose={() => setShowCertificateModal(false)}
        />
      )}

      {/* Cosmic Mission Control Hero Header */}
      <div className="relative overflow-hidden rounded-3xl hud-panel p-6 sm:p-10 border border-slate-200 dark:border-cyan-500/30 bg-white/95 dark:bg-slate-950/80 shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-purple-500/10 dark:bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-blue-50 text-blue-700 border border-blue-200 dark:bg-cyan-500/15 dark:text-cyan-300 dark:border-cyan-500/40">
              <Zap className="w-3.5 h-3.5 text-amber-500 dark:text-yellow-300" />
              <span>AI NEURAL ENGINE v2.0 ONLINE</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-300 dark:bg-white/10 dark:text-slate-300 dark:border-white/10">
              <Cpu className="w-3.5 h-3.5 text-blue-600 dark:text-indigo-400" />
              <span>ચોકસાઈ: ૮૧.૪% (R²: ૦.૮૧૩૮)</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            વિદ્યાર્થી પ્રદર્શનની <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">AI ન્યુરલ આગાહી</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed font-medium">
            વિદ્યાર્થીની પરીક્ષા વિગતો, દૈનિક અભ્યાસ સમય અને હાજરી દાખલ કરો. EduVision AI મશીન લર્નિંગ મોડેલ દ્વારા વાસ્તવિક અંતિમ સ્કોર અને વ્યક્તિગત સુધારણા માર્ગદર્શન મેળવો.
          </p>
        </div>
      </div>

      {/* Futuristic Form Grid */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Step 1: Student Identity */}
        <div className="hud-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-cyan-500/20 bg-white/95 dark:bg-slate-950/80 shadow-md space-y-5">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
            <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 dark:bg-cyan-500/20 dark:text-cyan-400 dark:border-cyan-500/30">
                <User className="w-5 h-5" />
              </div>
              <span>{GUJARATI_TEXT.prediction.studentInfoSection}</span>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-white/10">સ્ટેપ ૧</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 mb-2">
                {GUJARATI_TEXT.prediction.studentNameLabel}
              </label>
              <input
                type="text"
                value={formData.student_name}
                onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                placeholder={GUJARATI_TEXT.prediction.studentNamePlaceholder}
                className="w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-cyan-500/30 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm font-bold focus:outline-none focus:border-blue-500 dark:focus:border-cyan-400 shadow-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 mb-2">
                {GUJARATI_TEXT.prediction.standardLabel}
              </label>
              <select
                value={formData.standard}
                onChange={(e) => setFormData({ ...formData, standard: e.target.value })}
                className="w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-cyan-500/30 text-slate-900 dark:text-white text-sm font-bold focus:outline-none focus:border-blue-500 dark:focus:border-cyan-400 shadow-sm"
              >
                <option value="6">ધોરણ ૬ (Class 6)</option>
                <option value="7">ધોરણ ૭ (Class 7)</option>
                <option value="8">ધોરણ ૮ (Class 8)</option>
                <option value="9">ધોરણ ૯ (Class 9)</option>
                <option value="10">ધોરણ ૧૦ (Class 10)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Step 2: Academic Sensors (G1, G2, Absences, Study time, Failures) */}
        <div className="hud-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-cyan-500/20 bg-white/95 dark:bg-slate-950/80 shadow-md space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
            <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30">
                <BookOpen className="w-5 h-5" />
              </div>
              <span>{GUJARATI_TEXT.prediction.academicSection}</span>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 dark:bg-cyan-500/20 dark:text-cyan-300 dark:border-cyan-500/30">
              મુખ્ય શૈક્ષણિક પ્રભાવકો
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* G1 */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 space-y-2.5">
              <div className="flex justify-between items-center text-xs font-bold text-slate-800 dark:text-slate-300">
                <span className="flex items-center gap-1">
                  {GUJARATI_TEXT.prediction.g1Label}
                  <span title={GUJARATI_TEXT.prediction.g1Tooltip}>
                    <HelpCircle className="w-3.5 h-3.5 text-slate-400 cursor-help" />
                  </span>
                </span>
                <span className="text-base font-black text-blue-600 dark:text-cyan-400">{formData.G1} / ૨૦</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={formData.G1}
                onChange={(e) => setFormData({ ...formData, G1: Number(e.target.value) })}
                className="w-full h-2.5 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 font-bold">
                <span>૦ ગુણ</span>
                <span>૧૦ (પાસ)</span>
                <span>૨૦ ગુણ</span>
              </div>
            </div>

            {/* G2 (Highest weight 80.5%) */}
            <div className="p-4 rounded-2xl bg-blue-50/80 dark:bg-gradient-to-b dark:from-cyan-950/30 dark:to-slate-900/50 border-2 border-blue-400 dark:border-cyan-500/50 space-y-2.5 relative shadow-md shadow-blue-500/5 dark:shadow-cyan-950/50">
              <div className="flex justify-between items-center text-xs font-black text-slate-900 dark:text-white">
                <span className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-blue-600 dark:text-cyan-400 animate-pulse" />
                  <span>{GUJARATI_TEXT.prediction.g2Label}</span>
                </span>
                <span className="text-base font-black text-blue-700 dark:text-cyan-400">
                  {formData.G2} / ૨૦
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={formData.G2}
                onChange={(e) => setFormData({ ...formData, G2: Number(e.target.value) })}
                className="w-full h-2.5 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-blue-700 dark:text-cyan-400 font-black">
                <span>સર્વોચ્ચ પ્રભાવ: ૮૦.૫%</span>
                <span>૨૦ ગુણ</span>
              </div>
            </div>

            {/* Absences (14.2% weight) */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 space-y-2.5">
              <div className="flex justify-between items-center text-xs font-bold text-slate-800 dark:text-slate-300">
                <span className="flex items-center gap-1">
                  {GUJARATI_TEXT.prediction.absencesLabel}
                </span>
                <span className={`text-base font-black ${formData.absences > 10 ? "text-rose-600 dark:text-rose-400" : "text-emerald-600 dark:text-emerald-400"}`}>
                  {formData.absences} દિવસ
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="75"
                value={formData.absences}
                onChange={(e) => setFormData({ ...formData, absences: Number(e.target.value) })}
                className="w-full h-2.5 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-bold">
                <span className="text-emerald-600 dark:text-emerald-400">૦ (૧૦૦% હાજરી)</span>
                <span className="text-rose-600 dark:text-rose-400">૭૫ દિવસ</span>
              </div>
            </div>

            {/* Study Time */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 space-y-2">
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-300">
                {GUJARATI_TEXT.prediction.studytimeLabel}
              </label>
              <select
                value={formData.studytime}
                onChange={(e) => setFormData({ ...formData, studytime: Number(e.target.value) })}
                className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white text-xs font-bold focus:outline-none focus:border-blue-500 dark:focus:border-cyan-400"
              >
                <option value={1}>૧. ૨ કલાકથી ઓછો (&lt; 2 કલાક)</option>
                <option value={2}>૨. ૨ થી ૫ કલાક (2-5 કલાક)</option>
                <option value={3}>૩. ૫ થી ૧૦ કલાક (5-10 કલાક)</option>
                <option value={4}>૪. ૧૦ કલાકથી વધુ (&gt; 10 કલાક)</option>
              </select>
            </div>

            {/* Failures */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 space-y-2.5">
              <div className="flex justify-between items-center text-xs font-bold text-slate-800 dark:text-slate-300">
                <span>{GUJARATI_TEXT.prediction.failuresLabel}</span>
                <span className="text-sm font-black text-amber-600 dark:text-amber-400">{formData.failures} વિષય</span>
              </div>
              <input
                type="range"
                min="0"
                max="4"
                value={formData.failures}
                onChange={(e) => setFormData({ ...formData, failures: Number(e.target.value) })}
                className="w-full h-2.5 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
                <span>૦ (કોઈ નહીં)</span>
                <span>૪ વિષય</span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Lifestyle & Support Services */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Lifestyle */}
          <div className="hud-panel p-6 rounded-3xl border border-slate-200 dark:border-cyan-500/20 bg-white/95 dark:bg-slate-950/80 shadow-md space-y-4">
            <div className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">
              <Heart className="w-5 h-5 text-rose-500 dark:text-rose-400" />
              <span>{GUJARATI_TEXT.prediction.lifestyleSection}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 space-y-1">
                <div className="flex justify-between font-bold text-slate-800 dark:text-slate-300">
                  <span>સ્વાસ્થ્ય</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-black">{formData.health}/૫</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={formData.health}
                  onChange={(e) => setFormData({ ...formData, health: Number(e.target.value) })}
                  className="w-full h-2 cursor-pointer"
                />
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 space-y-1">
                <div className="flex justify-between font-bold text-slate-800 dark:text-slate-300">
                  <span>ફ્રી સમય</span>
                  <span className="text-blue-600 dark:text-blue-400 font-black">{formData.freetime}/૫</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={formData.freetime}
                  onChange={(e) => setFormData({ ...formData, freetime: Number(e.target.value) })}
                  className="w-full h-2 cursor-pointer"
                />
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 space-y-1">
                <div className="flex justify-between font-bold text-slate-800 dark:text-slate-300">
                  <span>મનોરંજન</span>
                  <span className="text-purple-600 dark:text-purple-400 font-black">{formData.goout}/૫</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={formData.goout}
                  onChange={(e) => setFormData({ ...formData, goout: Number(e.target.value) })}
                  className="w-full h-2 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="hud-panel p-6 rounded-3xl border border-slate-200 dark:border-cyan-500/20 bg-white/95 dark:bg-slate-950/80 shadow-md space-y-4">
            <div className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">
              <GraduationCap className="w-5 h-5 text-indigo-600 dark:text-purple-400" />
              <span>{GUJARATI_TEXT.prediction.supportSection}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              {[
                { label: "શાળા સહાય", key: "schoolsup" as const },
                { label: "પરિવાર સહાય", key: "famsup" as const },
                { label: "ઇન્ટરનેટ", key: "internet" as const },
                { label: "ઉચ્ચ અભ્યાસ", key: "higher" as const },
              ].map((item, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 space-y-1.5 text-center">
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block truncate">
                    {item.label}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, [item.key]: formData[item.key] === "yes" ? "no" : "yes" })
                    }
                    className={`w-full py-1.5 rounded-xl font-black text-xs transition-all ${
                      formData[item.key] === "yes"
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/30 dark:bg-gradient-to-r dark:from-blue-600 dark:to-cyan-600"
                        : "bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-white/10 dark:text-slate-400 dark:hover:bg-white/20"
                    }`}
                  >
                    {formData[item.key] === "yes" ? "હા" : "ના"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Validation error notice */}
        {validationError && (
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-500/15 border border-rose-300 dark:border-rose-500/30 text-rose-800 dark:text-rose-300 text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Big Futuristic Submit CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:flex-1 py-4 px-8 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-black text-base shadow-lg shadow-blue-500/25 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 flex items-center justify-center gap-3 border border-blue-400/40"
          >
            <Sparkles className="w-5 h-5 text-yellow-300 animate-spin" />
            <span>{loading ? GUJARATI_TEXT.prediction.submittingBtn : GUJARATI_TEXT.prediction.submitBtn}</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto py-4 px-6 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 dark:bg-slate-900/80 dark:hover:bg-slate-800 dark:text-slate-300 dark:border-white/10 font-bold text-sm transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{GUJARATI_TEXT.prediction.resetBtn}</span>
          </button>
        </div>
      </form>

      {/* Holographic Output Results Section */}
      {currentResult && (
        <div id="prediction-result-view" className="space-y-8 pt-10 border-t-2 border-blue-500/30 dark:border-cyan-500/30 animate-fadeIn">
          {/* Official Certificate Download Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-50 via-indigo-50 to-white dark:from-cyan-950/60 dark:via-blue-950/60 dark:to-slate-950/90 border-2 border-blue-300 dark:border-cyan-400/50 shadow-lg dark:shadow-[0_0_40px_rgba(6,182,212,0.2)] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 dark:from-cyan-400 dark:to-blue-600 text-white dark:text-slate-950 flex items-center justify-center shadow-lg font-black shrink-0">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  {currentResult.student_name} નો સત્તાવાર શૈક્ષણિક રિપોર્ટ તૈયાર છે!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5 font-medium">
                  વિજ્ઞાન મેળાનું સત્તાવાર શૈક્ષણિક પ્રમાણપત્ર પ્રિન્ટ / PDF ડાઉનલોડ કરો.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowCertificateModal(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-cyan-400 dark:to-blue-500 hover:from-blue-700 hover:to-indigo-700 dark:hover:from-cyan-300 dark:hover:to-blue-400 text-white dark:text-slate-950 font-black text-sm shadow-md hover:scale-105 transition-all flex items-center justify-center gap-2.5 shrink-0"
            >
              <FileText className="w-5 h-5" />
              <span>{GUJARATI_TEXT.results.downloadPdf}</span>
            </button>
          </div>

          {/* Metric + Risk Holographic Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Predicted Score Card */}
            <div className="hud-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-cyan-500/30 bg-white/95 dark:bg-slate-950/80 shadow-md flex flex-col justify-between space-y-4">
              <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {GUJARATI_TEXT.results.predictedScore}
              </span>
              <div>
                <div className="text-6xl sm:text-7xl font-black text-blue-700 dark:text-cyan-400 tracking-tight">
                  {currentResult.predicted_score}
                  <span className="text-2xl text-slate-500 dark:text-slate-400 font-bold ml-2">/ ૨૦</span>
                </div>
                <div className="text-sm font-extrabold text-slate-800 dark:text-slate-300 mt-2">
                  શૈક્ષણિક પ્રદર્શન ટકાવારી: <span className="text-blue-600 dark:text-cyan-300 font-black">{currentResult.percentage}%</span>
                </div>
              </div>
              <div className="h-3.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-300 dark:border-white/10">
                <div
                  style={{ width: `${Math.min(100, Math.max(5, currentResult.percentage))}%` }}
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 transition-all duration-700"
                />
              </div>
            </div>

            {/* Risk Category Card */}
            {(() => {
              const colorInfo = RISK_COLORS[currentResult.risk_level] || RISK_COLORS.moderate;
              return (
                <div
                  className={`p-6 sm:p-8 rounded-3xl border ${colorInfo.bg} bg-gradient-to-br ${colorInfo.gradient} text-white shadow-xl flex flex-col justify-between space-y-4`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-white/90">
                      {GUJARATI_TEXT.results.riskCategory}
                    </span>
                    <ShieldAlert className="w-7 h-7 text-white/90" />
                  </div>
                  <div>
                    <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                      {currentResult.risk_label_gu}
                    </h3>
                    <div className="text-base font-bold text-white/95 mt-1">
                      {currentResult.risk_status_gu}
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium">
                    {currentResult.risk_tone_gu}
                  </p>
                </div>
              );
            })()}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="hud-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-slate-950/80 shadow-md space-y-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>{GUJARATI_TEXT.results.gaugeTitle}</span>
              </h3>
              <GaugeChart
                score={currentResult.predicted_score}
                percentage={currentResult.percentage}
              />
            </div>

            <div className="hud-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-slate-950/80 shadow-md space-y-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>{GUJARATI_TEXT.results.comparisonTitle}</span>
              </h3>
              <ComparisonChart
                g1={currentResult.inputs.G1}
                g2={currentResult.inputs.G2}
                predicted={currentResult.predicted_score}
              />
            </div>
          </div>

          {/* Contributing Factors Analysis */}
          <div className="hud-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-slate-950/80 shadow-md space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
              <span>{GUJARATI_TEXT.results.factorsTitle}</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
              {currentResult.factors.map((factor, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border ${
                    factor.status === "strength"
                      ? "bg-emerald-50 text-emerald-900 border-emerald-300 dark:bg-emerald-500/10 dark:border-emerald-500/30 dark:text-emerald-300"
                      : factor.status === "attention"
                      ? "bg-rose-50 text-rose-900 border-rose-300 dark:bg-rose-500/10 dark:border-rose-500/30 dark:text-rose-300"
                      : "bg-slate-50 text-slate-800 border-slate-200 dark:bg-white/[0.04] dark:border-white/10 dark:text-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-black mb-1">
                    <span>{factor.feature_name_gu}</span>
                    <span className="text-[11px] opacity-80">પ્રભાવ: {factor.importance_pct}%</span>
                  </div>
                  <p className="text-xs leading-relaxed font-medium">{factor.description_gu}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Personalized Recommendations */}
          <div className="hud-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-slate-950/80 shadow-md space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>{GUJARATI_TEXT.results.recommendationsTitle}</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {currentResult.recommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border-l-4 border-blue-600 dark:border-cyan-400 border border-slate-200 dark:border-white/10 space-y-1.5"
                >
                  <div className="text-sm font-extrabold text-blue-700 dark:text-cyan-300">
                    {rec.title}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    {rec.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
