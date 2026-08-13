/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Search, 
  Command, 
  Compass, 
  Scale, 
  Cpu, 
  Activity, 
  Wifi, 
  ShieldCheck, 
  User, 
  LogOut, 
  ChevronDown, 
  Terminal, 
  Layers, 
  Info,
  Database,
  Palette
} from "lucide-react";
import { UserProfile } from "../types";
import { THEME_PALETTES, ThemePaletteId } from "./NeuralWaveCanvas";
import { AVAILABLE_MODELS } from "../lib/llm-router";

interface NVKOSTopBarProps {
  profile: UserProfile;
  activeTab: "messenger" | "research" | "sandbox" | "webgpu";
  localModelEnabled: boolean;
  disclaimerAcknowledged: boolean;
  activeThemeId: ThemePaletteId;
  selectedModelId?: string;
  onOpenModelSwapper?: () => void;
  onSelectTheme: (themeId: ThemePaletteId) => void;
  onOpenSpotlight: () => void;
  onOpenWalkthrough: () => void;
  onOpenDisclaimer: () => void;
  onLogOut: () => void;
}

export default function NVKOSTopBar({
  profile,
  activeTab,
  localModelEnabled,
  disclaimerAcknowledged,
  activeThemeId,
  selectedModelId = "gemini-3.5-flash",
  onOpenModelSwapper,
  onSelectTheme,
  onOpenSpotlight,
  onOpenWalkthrough,
  onOpenDisclaimer,
  onLogOut
}: NVKOSTopBarProps) {
  const [timeString, setTimeString] = useState<string>("");
  const [dateString, setDateString] = useState<string>("");
  const [showOSMenu, setShowOSMenu] = useState<boolean>(false);
  const [showThemeMenu, setShowThemeMenu] = useState<boolean>(false);

  const matchedModel = AVAILABLE_MODELS.find(m => m.id === selectedModelId) || AVAILABLE_MODELS[0];


  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }));
      setDateString(now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentTheme = THEME_PALETTES[activeThemeId] || THEME_PALETTES["matrix-cyan"];

  const tabTitles = {
    messenger: "Chat Messenger",
    research: "Wide Research GPU",
    sandbox: "VM Sandbox",
    webgpu: "WebGPU Local Loader"
  };

  return (
    <div className="w-full bg-[#07090f]/95 border-b border-indigo-500/25 px-3 sm:px-4 py-1.5 backdrop-blur-2xl flex items-center justify-between text-xs font-sans text-slate-200 z-30 flex-shrink-0 select-none relative overflow-hidden shadow-lg">
      {/* Laser Top Line Accent */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 opacity-90" />

      {/* Left: OS Brand Menu & Active Application Header */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* NVK Matrix OS Dropdown Menu */}
        <div className="relative">
          <button
            onClick={() => setShowOSMenu(!showOSMenu)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gradient-to-r from-indigo-900/80 to-purple-900/80 hover:from-indigo-800 hover:to-purple-800 border border-cyan-400/40 text-cyan-200 font-bold transition-all shadow-[0_0_10px_rgba(99,102,241,0.3)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="font-mono text-[11px] tracking-wider uppercase">NVK.MATRIX</span>
            <ChevronDown className="w-3 h-3 text-cyan-300" />
          </button>

          {/* OS Dropdown Modal */}
          <AnimatePresence>
            {showOSMenu && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="absolute top-full left-0 mt-2 w-60 bg-[#0c0e17] border border-cyan-500/30 rounded-xl shadow-2xl p-2 z-50 text-slate-200 space-y-1 font-sans text-xs"
              >
                <div className="p-2 border-b border-indigo-500/20">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">NVK MATRIX QUANTUM OS v3.0</span>
                  <span className="text-slate-400 text-[11px] font-mono">NODE: {profile.name}</span>
                </div>

                <button
                  onClick={() => {
                    setShowOSMenu(false);
                    onOpenSpotlight();
                  }}
                  className="w-full flex items-center gap-2.5 p-2 rounded-lg hover:bg-indigo-600/20 text-slate-200 transition-colors text-left font-mono text-xs"
                >
                  <Command className="w-4 h-4 text-cyan-400" /> Neural Palette (⌘K)
                </button>

                <button
                  onClick={() => {
                    setShowOSMenu(false);
                    onOpenWalkthrough();
                  }}
                  className="w-full flex items-center gap-2.5 p-2 rounded-lg hover:bg-indigo-600/20 text-slate-200 transition-colors text-left font-mono text-xs"
                >
                  <Compass className="w-4 h-4 text-cyan-400" /> System Walkthrough
                </button>

                <button
                  onClick={() => {
                    setShowOSMenu(false);
                    onOpenDisclaimer();
                  }}
                  className="w-full flex items-center gap-2.5 p-2 rounded-lg hover:bg-indigo-600/20 text-slate-200 transition-colors text-left font-mono text-xs"
                >
                  <Scale className="w-4 h-4 text-amber-400" /> AI Safety Disclaimer
                </button>

                <div className="border-t border-indigo-500/20 pt-1">
                  <button
                    onClick={() => {
                      setShowOSMenu(false);
                      onLogOut();
                    }}
                    className="w-full flex items-center gap-2.5 p-2 rounded-lg hover:bg-red-500/20 text-red-300 transition-colors text-left font-medium font-mono text-xs"
                  >
                    <LogOut className="w-4 h-4 text-red-400" /> Reset Profile Calibration
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div className="h-4 w-px bg-indigo-500/30" />

        {/* Active Application Label */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-white text-xs sm:text-sm tracking-tight">{tabTitles[activeTab]}</span>
          <span className="hidden md:inline-flex items-center gap-1 font-mono text-[9px] px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            LIVE NODE
          </span>
        </div>
      </div>

      {/* Center: Live Digital Clock & Spotlight Search trigger */}
      <div className="hidden lg:flex items-center gap-3">
        <button
          onClick={onOpenSpotlight}
          className="flex items-center gap-2 px-3 py-1 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 hover:text-white transition-all text-xs font-mono shadow-inner group"
        >
          <Search className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform" />
          <span>Spotlight Search</span>
          <span className="text-[9px] bg-black/40 px-1.5 py-0.5 rounded border border-white/10 text-slate-400">⌘K</span>
        </button>

        <div className="font-mono text-xs text-slate-300 flex items-center gap-2 bg-black/40 border border-white/5 px-2.5 py-1 rounded-lg">
          <span className="text-indigo-400 font-bold">{timeString}</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400 text-[10px] uppercase">{dateString}</span>
        </div>
      </div>

      {/* Right: Telemetry Controls & System Quick Badges */}
      <div className="flex items-center gap-2 sm:gap-3">
        
        {/* Universal AI Model Swapper Button */}
        <button
          onClick={onOpenModelSwapper}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-400/40 text-indigo-200 transition-all font-mono text-[10px] shadow-sm group"
          title="Swap AI Model (Gemini, OpenAI, Claude, DeepSeek, Groq, Ollama)"
        >
          <Cpu className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-45 transition-transform" />
          <span className="font-bold text-slate-100">{matchedModel.name}</span>
          <span className="hidden xl:inline text-[9px] bg-indigo-900/60 text-indigo-300 px-1.5 py-0.2 rounded border border-indigo-500/30">SWAP</span>
        </button>

        {/* Theme Palette Switcher Dropdown */}

        <div className="relative">
          <button
            onClick={() => setShowThemeMenu(!showThemeMenu)}
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/50 hover:bg-black/70 border border-indigo-500/30 text-slate-200 transition-all font-mono text-[10px]"
            title="Switch Visual Theme Palette"
          >
            <Palette className="w-3.5 h-3.5" style={{ color: currentTheme.accentHex }} />
            <span className="hidden md:inline font-bold" style={{ color: currentTheme.accentHex }}>
              {currentTheme.badge}
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          <AnimatePresence>
            {showThemeMenu && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="absolute top-full right-0 mt-2 w-56 bg-[#0a0c14] border border-indigo-500/30 rounded-xl shadow-2xl p-2 z-50 text-slate-200 space-y-1 font-sans text-xs"
              >
                <div className="p-2 border-b border-indigo-500/20 font-mono text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Visual Mode & Wave Streams
                </div>

                {Object.values(THEME_PALETTES).map((pal) => (
                  <button
                    key={pal.id}
                    onClick={() => {
                      onSelectTheme(pal.id);
                      setShowThemeMenu(false);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors text-left font-mono text-xs ${
                      activeThemeId === pal.id ? "bg-indigo-600/30 border border-indigo-400/30 font-bold" : "hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pal.accentHex }} />
                      <span className="text-slate-200">{pal.name}</span>
                    </div>
                    <span className="text-[9px] text-slate-400">{pal.badge}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Routing Indicator */}
        <div className="hidden sm:flex items-center gap-1.5 font-mono text-[10px] bg-black/40 border border-white/10 px-2 py-1 rounded-lg">
          <Database className="w-3 h-3 text-indigo-400" />
          <span className={localModelEnabled ? "text-cyan-400 font-bold" : "text-emerald-400 font-bold"}>
            {localModelEnabled ? "WebGPU" : "Cloud GPU"}
          </span>
        </div>

        {/* Guided Tour Trigger */}
        <button
          onClick={onOpenWalkthrough}
          className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-400/30 text-indigo-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-all"
          title="Guided Step-by-Step Tour"
        >
          <Compass className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden sm:inline font-mono text-[10px]">Tour</span>
        </button>

        {/* Disclaimer Trigger */}
        <button
          onClick={onOpenDisclaimer}
          className={`p-1.5 sm:px-2.5 sm:py-1 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-all ${
            !disclaimerAcknowledged 
              ? "bg-amber-500/20 border-amber-500/40 text-amber-300 animate-pulse" 
              : "bg-white/5 border-white/10 text-slate-300 hover:text-white"
          }`}
          title="Legal Safety Terms"
        >
          <Scale className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline font-mono text-[10px]">Terms</span>
        </button>

        {/* User Avatar */}
        <div className="w-7 h-7 rounded-full bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-indigo-300 font-bold text-xs">
          {profile.name.charAt(0).toUpperCase()}
        </div>

      </div>

    </div>
  );
}
