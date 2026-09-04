"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { PredictionResponse } from "@/types";
import { GUJARATI_TEXT } from "@/lib/gujarati";
import { GaugeChart } from "./GaugeChart";
import { School, Printer, X, Award, FileDown } from "lucide-react";

interface StudentReportModalProps {
  prediction: PredictionResponse;
  onClose: () => void;
}

export const StudentReportModal: React.FC<StudentReportModalProps> = ({
  prediction,
  onClose,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  if (!mounted) return null;

  const modalContent = (
    <div
      id="official-certificate-modal-root"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fadeIn"
    >
      <div className="certificate-print-sheet hud-panel w-full max-w-3xl rounded-3xl border border-slate-200 dark:border-white/20 p-5 sm:p-8 space-y-4 shadow-2xl relative my-auto bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100">
        {/* Modal Controls (Strictly Hidden in Print) */}
        <div className="no-print flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-500/20 pb-3">
          <div className="flex items-center gap-2 text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 dark:bg-cyan-500/10 dark:text-cyan-400 dark:border-cyan-500/30">
            <Award className="w-4 h-4" />
            <span>{GUJARATI_TEXT.scienceFairBadge}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:inline-block font-semibold">
              💡 PDF માટે: પ્રિન્ટ વિન્ડોમાં &apos;Save as PDF&apos; પસંદ કરો.
            </span>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 text-white font-extrabold text-xs shadow-md hover:shadow-cyan-500/30 transition-all hover:scale-[1.02]"
              title="પ્રિન્ટ અથવા PDF તરીકે સાચવો"
            >
              <Printer className="w-4 h-4" />
              <span>{GUJARATI_TEXT.certificate.printBtn}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-white/10 dark:hover:bg-white/20 dark:text-slate-300 dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Printable Area (Fits cleanly on single A4) */}
        <div className="space-y-4 print-container">
          {/* Certificate Header */}
          <div className="text-center space-y-1.5 border-b-2 border-slate-200 dark:border-white/15 pb-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-600 text-white shadow-md mx-auto mb-1">
              <School className="w-7 h-7" />
            </div>
            <h1 className="text-lg sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              {GUJARATI_TEXT.schoolName}
            </h1>
            <p className="text-xs sm:text-sm font-bold text-blue-700 dark:text-cyan-400">
              {GUJARATI_TEXT.certificate.subHeader}
            </p>
            <div className="inline-block mt-1 px-4 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 text-[11px] font-extrabold uppercase tracking-wider">
              {GUJARATI_TEXT.certificate.officialTitle}
            </div>
          </div>

          {/* Student Info Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 text-xs">
            <div>
              <span className="text-slate-500 dark:text-slate-400 block text-[10px] font-semibold">વિદ્યાર્થીનું નામ:</span>
              <strong className="text-sm text-slate-900 dark:text-white">{prediction.student_name || "નિયમિત વિદ્યાર્થી"}</strong>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block text-[10px] font-semibold">ધોરણ / વર્ગ:</span>
              <strong className="text-sm text-slate-900 dark:text-white">ધોરણ {prediction.standard}</strong>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block text-[10px] font-semibold">પ્રમાણપત્ર ક્રમાંક:</span>
              <strong className="text-xs font-mono text-blue-700 dark:text-cyan-400">{prediction.id}</strong>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block text-[10px] font-semibold">મૂલ્યાંકન તારીખ:</span>
              <strong className="text-sm text-slate-900 dark:text-white">{prediction.created_at.split(" ")[0]}</strong>
            </div>
          </div>

          {/* Scores & Meters Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
            {/* Big Score Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 dark:from-blue-900/40 dark:to-slate-900 dark:border-blue-500/30 text-center space-y-1.5">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">અનુમાનિત અંતિમ ગુણ (G3)</span>
              <div className="text-4xl sm:text-5xl font-black text-blue-700 dark:text-cyan-400">
                {prediction.predicted_score} <span className="text-lg text-slate-500 dark:text-slate-400 font-bold">/ ૨૦</span>
              </div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                શૈક્ષણિક પ્રદર્શન: <span className="text-blue-600 dark:text-cyan-300 font-black">{prediction.percentage}%</span>
              </div>
              <div className="inline-block px-3 py-0.5 rounded-full text-[11px] font-extrabold bg-blue-100 text-blue-800 border border-blue-300 dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-400/40 mt-1">
                {prediction.risk_label_gu} ({prediction.risk_status_gu})
              </div>
            </div>

            {/* Gauge Meter */}
            <div className="p-1 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 flex flex-col items-center">
              <GaugeChart score={prediction.predicted_score} percentage={prediction.percentage} />
            </div>
          </div>

          {/* Input Summary */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              પરીક્ષા અને વર્તણૂક સારાંશ:
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-xs text-center">
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">G1 ગુણ</span>
                <strong className="text-slate-900 dark:text-white">{prediction.inputs.G1}/૨૦</strong>
              </div>
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">G2 ગુણ</span>
                <strong className="text-slate-900 dark:text-white">{prediction.inputs.G2}/૨૦</strong>
              </div>
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">ગેરહાજરી</span>
                <strong className="text-slate-900 dark:text-white">{prediction.inputs.absences} દિવસ</strong>
              </div>
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">અભ્યાસ સમય</span>
                <strong className="text-slate-900 dark:text-white">
                  {prediction.inputs.studytime === 1 ? "< ૨ કલાક" : prediction.inputs.studytime === 2 ? "૨-૫ કલાક" : "૫+ કલાક"}
                </strong>
              </div>
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">નાપાસ વિષયો</span>
                <strong className="text-slate-900 dark:text-white">{prediction.inputs.failures}</strong>
              </div>
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">શાળા સહાય</span>
                <strong className="text-slate-900 dark:text-white">{prediction.inputs.schoolsup === "yes" ? "હા" : "ના"}</strong>
              </div>
            </div>
          </div>

          {/* AI Personalized Recommendations */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              વ્યક્તિગત શૈક્ષણિક ભલામણો (AI Recommendations):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {prediction.recommendations.map((rec, i) => (
                <div key={i} className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border-l-4 border-blue-600 border border-slate-200 dark:border-slate-700">
                  <div className="font-bold text-blue-700 dark:text-cyan-300 text-xs">{rec.title}</div>
                  <div className="text-slate-600 dark:text-slate-300 text-[10.5px] mt-0.5 leading-tight">{rec.detail}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Signatures Row */}
          <div className="pt-5 border-t-2 border-slate-200 dark:border-white/15 grid grid-cols-2 gap-8 text-center text-xs">
            <div className="space-y-2">
              <div className="h-8 border-b border-dashed border-slate-400 w-40 mx-auto" />
              <div>
                <strong className="block text-slate-900 dark:text-white font-bold">{GUJARATI_TEXT.mentorName}</strong>
                <span className="text-slate-500 dark:text-slate-400 text-[10px]">માર્ગદર્શક શિક્ષક (પ્રોજેક્ટ હેડ)</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-8 border-b border-dashed border-slate-400 w-40 mx-auto" />
              <div>
                <strong className="block text-slate-900 dark:text-white font-bold">{GUJARATI_TEXT.certificate.parentSign}</strong>
                <span className="text-slate-500 dark:text-slate-400 text-[10px]">વાલીશ્રીની નોંધણી સહી</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

