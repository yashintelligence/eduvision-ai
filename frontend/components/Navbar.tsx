"use client";

import React, { useState } from "react";
import { TabType, ThemeMode } from "@/types";
import { GUJARATI_TEXT } from "@/lib/gujarati";
import {
  Sparkles,
  BarChart3,
  Info,
  Menu,
  X,
  School,
  Sun,
  Moon,
  TrendingUp,
  Cpu,
  Orbit,
  Zap,
  Award,
} from "lucide-react";

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isBackendConnected: boolean;
  theme: ThemeMode;
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isBackendConnected,
  theme,
  toggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "prediction" as TabType, label: "લાઈવ આગાહી", icon: Sparkles },
    { id: "simulator" as TabType, label: "વોટ-ઇફ સિમ્યુલેટર", icon: TrendingUp },
    { id: "analytics" as TabType, label: "શૈક્ષણિક વિશ્લેષણ", icon: BarChart3 },
    { id: "science" as TabType, label: "AI સાયન્સ", icon: Cpu },
    { id: "about" as TabType, label: "પ્રોજેક્ટ પરિચય", icon: Info },
  ];

  return (
    <header className="sticky top-3 z-50 w-full px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-2.5">
      {/* Primary Floating Navigation Bar */}
      <div className="rounded-2xl sm:rounded-full px-4 sm:px-6 py-3 flex items-center justify-between transition-all duration-300 backdrop-blur-2xl shadow-lg bg-white/95 dark:bg-slate-950/90 border border-slate-200 dark:border-cyan-500/30 dark:shadow-[0_8px_32px_rgba(0,242,254,0.12)]">
        
        {/* Left: Brand & AI Core Icon */}
        <div
          className="flex items-center gap-3 cursor-pointer select-none group shrink-0"
          onClick={() => setActiveTab("prediction")}
        >
          <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-[2px] shadow-md group-hover:scale-105 transition-transform shrink-0">
            <div className="w-full h-full rounded-full bg-white dark:bg-slate-950 flex items-center justify-center">
              <Orbit className="w-5 h-5 text-blue-600 dark:text-cyan-400 group-hover:rotate-180 transition-transform duration-700" />
            </div>
            <span
              className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-slate-950 shadow-sm ${
                isBackendConnected ? "bg-emerald-500" : "bg-amber-500"
              }`}
              title={isBackendConnected ? "AI સર્વર જોડાયેલ છે" : "AI સર્વર કનેક્ટ થઈ રહ્યું છે..."}
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                EduVision <span className="text-blue-600 dark:text-cyan-400">AI</span>
              </span>
              <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-blue-50 text-blue-700 border border-blue-200 dark:bg-cyan-500/15 dark:text-cyan-300 dark:border-cyan-500/30">
                <Zap className="w-3 h-3 text-amber-500 dark:text-yellow-300" />
                <span>૨૦૨૬</span>
              </span>
            </div>
          </div>
        </div>

        {/* Center: Spacious Navigation Tabs (no wrapping, clear buttons) */}
        <nav className="hidden lg:flex items-center gap-1.5 p-1 rounded-full bg-slate-100/90 dark:bg-slate-900/80 border border-slate-200/90 dark:border-white/10 mx-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 xl:px-4 py-2 rounded-full text-xs xl:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/30 dark:bg-gradient-to-r dark:from-cyan-500 dark:to-blue-600 dark:text-white dark:shadow-[0_0_18px_rgba(6,182,212,0.45)] dark:border dark:border-cyan-300/40"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/10"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "opacity-80"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Mentor Identity & Theme Toggle */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Mentor Tag */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300">
            <span className="text-slate-500 dark:text-slate-400 text-[11px]">માર્ગદર્શક:</span>
            <strong className="text-slate-900 dark:text-cyan-300 font-bold">{GUJARATI_TEXT.mentorName}</strong>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-300 dark:border-cyan-500/30 text-slate-800 dark:text-amber-300 shadow-sm transition-all hover:scale-105 active:scale-95"
            title={theme === "dark" ? "લાઇટ મોડ ચાલુ કરો" : "ડાર્ક મોડ ચાલુ કરો"}
            aria-label="થીમ સ્વિચ કરો"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-300 hover:rotate-90 transition-transform" />
            ) : (
              <Moon className="w-4 h-4 text-slate-800 hover:-rotate-12 transition-transform" />
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-white/15"
              aria-label="નેવિગેશન મેનુ"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Spacious Secondary Banner: School Recognition */}
      <div className="hidden sm:flex items-center justify-between px-5 py-2 rounded-xl sm:rounded-full bg-white/80 dark:bg-slate-950/70 backdrop-blur-md border border-slate-200/80 dark:border-white/10 text-xs text-slate-600 dark:text-slate-400 shadow-sm">
        <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
          <School className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0" />
          <span>{GUJARATI_TEXT.schoolName}</span>
        </div>
        <div className="flex items-center gap-3 font-semibold text-[11px]">
          <span className="inline-flex items-center gap-1 text-blue-700 dark:text-cyan-300 font-bold">
            <Award className="w-3.5 h-3.5" />
            <span>વિજ્ઞાન મેળો ૨૦૨૬ પ્રદર્શન પ્રોજેક્ટ</span>
          </span>
          <span className="text-slate-400 dark:text-slate-600">•</span>
          <span>
            માર્ગદર્શક: <strong className="text-slate-900 dark:text-white">{GUJARATI_TEXT.mentorName}</strong>
          </span>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden rounded-2xl p-4 space-y-2 shadow-2xl backdrop-blur-2xl bg-white/98 dark:bg-slate-950/98 border border-slate-200 dark:border-cyan-500/30 animate-fadeIn">
          <div className="px-3 py-2 flex items-center gap-2 rounded-xl bg-slate-100 dark:bg-white/[0.04] text-xs text-slate-700 dark:text-slate-300 font-bold">
            <School className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0" />
            <span className="truncate">{GUJARATI_TEXT.schoolName}</span>
          </div>

          <div className="space-y-1 pt-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md dark:bg-gradient-to-r dark:from-cyan-500 dark:to-blue-600"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-white" : "opacity-80"}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
