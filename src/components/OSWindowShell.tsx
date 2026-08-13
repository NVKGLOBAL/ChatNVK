/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Sparkles, 
  Maximize2, 
  Minimize2, 
  X, 
  Terminal, 
  Activity, 
  ShieldCheck, 
  Cpu, 
  Command,
  RefreshCw
} from "lucide-react";

interface OSWindowShellProps {
  title: string;
  processPath: string;
  icon: React.ElementType;
  children: React.ReactNode;
  activeTabKey: string;
  onOpenSpotlight: () => void;
}

export default function OSWindowShell({
  title,
  processPath,
  icon: Icon,
  children,
  activeTabKey,
  onOpenSpotlight
}: OSWindowShellProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  if (isMinimized) {
    return (
      <div className="p-4 bg-indigo-950/40 border border-indigo-500/30 rounded-2xl flex items-center justify-between backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs font-mono text-indigo-300 font-bold">{title} (Minimized)</span>
        </div>
        <button
          onClick={() => setIsMinimized(false)}
          className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all"
        >
          Restore Window
        </button>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full rounded-2xl border border-white/15 bg-[#10121a]/95 backdrop-blur-2xl shadow-2xl overflow-hidden transition-all relative ${
      isMaximized ? "fixed inset-2 z-40 m-0" : "w-full"
    }`}>
      {/* NVK OS Window Title Header - Cyber HUD Style */}
      <div className="bg-gradient-to-r from-slate-950 via-[#121524] to-slate-950 px-3.5 sm:px-4 py-2 border-b border-indigo-500/20 flex items-center justify-between flex-shrink-0 relative overflow-hidden shadow-inner">
        {/* Glowing Top Cyber Line */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-indigo-500 via-cyan-400 to-purple-500 opacity-70" />

        {/* Left: NVK HUD Node Emblem & Process Title */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-2.5 h-2.5 bg-cyan-400 rounded-sm rotate-45 shadow-sm shadow-cyan-400/80 animate-pulse" />
            <span className="font-mono text-[10px] font-bold text-cyan-400 tracking-wider hidden sm:inline">NVK-HUD</span>
          </div>

          <div className="h-3.5 w-px bg-indigo-500/30 flex-shrink-0" />

          {/* Icon & Title */}
          <div className="flex items-center gap-2 min-w-0">
            <Icon className="w-4 h-4 text-indigo-400 flex-shrink-0" />
            <span className="text-xs font-bold text-slate-100 tracking-tight truncate">{title}</span>
            <span className="hidden md:inline-block text-[9.5px] font-mono text-cyan-300/80 px-2 py-0.5 rounded bg-indigo-950/60 border border-indigo-500/30 truncate">
              {processPath}
            </span>
          </div>
        </div>

        {/* Right: NVK Cybernetic Window Controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={onOpenSpotlight}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-600/15 hover:bg-indigo-600/30 border border-indigo-400/30 text-indigo-300 hover:text-white text-[10px] font-mono transition-all shadow-sm"
            title="Launch NVK Neural Spotlight"
          >
            <Command className="w-3 h-3 text-cyan-400" />
            <span>NEURAL [⌘K]</span>
          </button>

          <div className="h-3.5 w-px bg-white/10 hidden sm:block" />

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1 sm:px-2 py-0.5 rounded bg-slate-900 hover:bg-indigo-950 border border-slate-700/60 hover:border-indigo-500/50 text-slate-400 hover:text-cyan-300 font-mono text-[10px] transition-all"
              title="Dock Node"
            >
              _
            </button>
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 sm:px-2 py-0.5 rounded bg-slate-900 hover:bg-indigo-950 border border-slate-700/60 hover:border-indigo-500/50 text-slate-400 hover:text-cyan-300 font-mono text-[10px] transition-all"
              title={isMaximized ? "Restore Grid" : "Expand HUD"}
            >
              {isMaximized ? "⧉" : "□"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Window Content */}
      <div className="flex-grow min-h-0 overflow-hidden relative">
        {children}
      </div>

      {/* Window OS Status Bar Footer */}
      <div className="px-3 py-1.5 bg-[#0a0c12] border-t border-white/10 flex items-center justify-between text-[9.5px] font-mono text-slate-400 flex-shrink-0">
        <div className="flex items-center gap-3 truncate">
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>PID: {Math.floor(1000 + Math.random() * 8999)}</span>
          </span>
          <span className="hidden md:inline text-slate-500">
            ALLOCATED MEMORY: 128 MB VRAM
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-500 hidden sm:inline">60 FPS MATRIX READY</span>
          <button 
            onClick={onOpenSpotlight}
            className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold"
          >
            <Terminal className="w-3 h-3" /> Cmd Palette
          </button>
        </div>
      </div>
    </div>
  );
}
