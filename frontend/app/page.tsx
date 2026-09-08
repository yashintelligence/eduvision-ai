"use client";

import React, { useState, useEffect } from "react";
import { TabType, ThemeMode, AnalyticsData, ModelInfo, PredictionResponse, PredictionInput } from "@/types";
import { checkHealth, getAnalytics, getModelInfo, predictStudent } from "@/lib/api";
import { GUJARATI_TEXT } from "@/lib/gujarati";
import { Navbar } from "@/components/Navbar";
import { PredictionTab } from "@/components/PredictionTab";
import { SimulatorTab } from "@/components/SimulatorTab";
import { AnalyticsTab } from "@/components/AnalyticsTab";
import { ScienceTab } from "@/components/ScienceTab";
import { AboutTab } from "@/components/AboutTab";
import { School, Award } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("prediction");
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(false);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [modelInfo, setModelInfo] = useState<ModelInfo | null>(null);
  const [currentResult, setCurrentResult] = useState<PredictionResponse | null>(null);

  // Initialize Theme from localStorage or default dark
  useEffect(() => {
    const savedTheme = (localStorage.getItem("eduvision_theme") as ThemeMode) || "dark";
    setTheme(savedTheme);
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(savedTheme);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("eduvision_theme", next);
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(next);
  };

  useEffect(() => {
    let isMounted = true;

    async function initializeData() {
      const connected = await checkHealth();
      if (isMounted) setIsBackendConnected(connected);

      const [analyticsData, infoData] = await Promise.all([
        getAnalytics(),
        getModelInfo(),
      ]);

      if (isMounted) {
        setAnalytics(analyticsData);
        setModelInfo(infoData);
      }
    }

    initializeData();

    const timer = setInterval(async () => {
      const connected = await checkHealth();
      if (isMounted) setIsBackendConnected(connected);
    }, 15000);

    return () => {
      isMounted = false;
      clearInterval(timer);
    };
  }, []);

  const handlePredict = async (data: PredictionInput): Promise<PredictionResponse> => {
    return await predictStudent(data);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-cyan-500/30">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isBackendConnected={isBackendConnected}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Presentation Container */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        {activeTab === "prediction" && (
          <PredictionTab
            onPredict={handlePredict}
            currentResult={currentResult}
            setCurrentResult={setCurrentResult}
          />
        )}

        {activeTab === "simulator" && <SimulatorTab />}

        {activeTab === "analytics" && (
          <AnalyticsTab analytics={analytics} modelInfo={modelInfo} />
        )}

        {activeTab === "science" && <ScienceTab />}

        {activeTab === "about" && <AboutTab />}
      </main>

      {/* Footer */}
      <footer className="no-print w-full border-t border-slate-200 dark:border-white/10 bg-white/90 dark:bg-slate-950/80 backdrop-blur-xl py-6 mt-16 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
            <School className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
            <span>{GUJARATI_TEXT.schoolName}</span>
          </div>
          <div className="flex items-center gap-1.5 font-bold">
            <span className="text-blue-700 dark:text-cyan-300">વિજ્ઞાન મેળો ૨૦૨૬</span>
            <span>•</span>
            <span>માર્ગદર્શક: <strong className="text-slate-900 dark:text-white">{GUJARATI_TEXT.mentorName}</strong></span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-500 font-medium">
            © ૨૦૨૬ EduVision AI • વિજ્ઞાન મેળો પ્રદર્શન આવૃત્તિ
          </div>
        </div>
      </footer>
    </div>
  );
}
