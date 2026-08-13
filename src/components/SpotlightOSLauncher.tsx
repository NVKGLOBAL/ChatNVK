/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  MessageSquare, 
  Cpu, 
  Terminal, 
  Scale, 
  Compass, 
  Sparkles, 
  X, 
  Zap, 
  ShieldCheck, 
  User, 
  ChevronRight,
  Command,
  Database,
  Radio
} from "lucide-react";
import { DEFAULT_AI_PARTNERS } from "../data";

interface SpotlightOSLauncherProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: "messenger" | "research" | "sandbox" | "webgpu") => void;
  onOpenWalkthrough: () => void;
  onOpenDisclaimer: () => void;
  localModelEnabled: boolean;
  onToggleLocalModel: (enabled: boolean) => void;
}

export default function SpotlightOSLauncher({
  isOpen,
  onClose,
  onNavigateTab,
  onOpenWalkthrough,
  onOpenDisclaimer,
  localModelEnabled,
  onToggleLocalModel
}: SpotlightOSLauncherProps) {
  const [query, setQuery] = useState("");

  // Keyboard shortcut listener for Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const spotlightItems = [
    {
      id: "tab-messenger",
      title: "Authentic Chat Messenger",
      subtitle: "1-on-1 Dialogue & Multi-Agent Council Chambers",
      category: "Applications",
      icon: MessageSquare,
      color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
      action: () => {
        onNavigateTab("messenger");
        onClose();
      }
    },
    {
      id: "tab-research",
      title: "Wide Research GPU Engine",
      subtitle: "Parallel Deep Web Citation & Synthesis Nodes",
      category: "Applications",
      icon: Search,
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
      action: () => {
        onNavigateTab("research");
        onClose();
      }
    },
    {
      id: "tab-sandbox",
      title: "VM Developer Sandbox",
      subtitle: "Code Execution, Shell Scripting & Server Micro-Apps",
      category: "Applications",
      icon: Terminal,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      action: () => {
        onNavigateTab("sandbox");
        onClose();
      }
    },
    {
      id: "tab-webgpu",
      title: "WebGPU Offline Model Loader",
      subtitle: "Run Llama / Phi-3 Local Weights in Browser VRAM",
      category: "Applications",
      icon: Cpu,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      action: () => {
        onNavigateTab("webgpu");
        onClose();
      }
    },
    {
      id: "toggle-local-gpu",
      title: localModelEnabled ? "Switch to Gemini Cloud Pipeline" : "Enable WebGPU Local GPU Weights",
      subtitle: localModelEnabled ? "Currently running offline WebGPU" : "Route inference directly in browser RAM/VRAM",
      category: "System Routing",
      icon: Database,
      color: localModelEnabled ? "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" : "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      action: () => {
        onToggleLocalModel(!localModelEnabled);
        onClose();
      }
    },
    {
      id: "open-tour",
      title: "Guided Step-by-Step Tour",
      subtitle: "Learn all 6 modules of ChatNVK Sovereign OS",
      category: "System Utilities",
      icon: Compass,
      color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
      action: () => {
        onOpenWalkthrough();
        onClose();
      }
    },
    {
      id: "open-legal",
      title: "Legal Terms & AI Safety Disclaimer",
      subtitle: "Probabilistic notice & responsible AI guidelines",
      category: "System Utilities",
      icon: Scale,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      action: () => {
        onOpenDisclaimer();
        onClose();
      }
    }
  ];

  const filtered = spotlightItems.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) || 
    item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.15 }}
          className="relative w-full max-w-xl bg-[#0b0d14]/95 border border-cyan-500/30 rounded-2xl shadow-[0_0_50px_rgba(34,211,238,0.15)] overflow-hidden text-slate-100 font-sans"
        >
          {/* Subtle Top Cyber Accent */}
          <div className="h-1 bg-gradient-to-r from-indigo-500 via-cyan-400 to-purple-500 w-full" />

          {/* Spotlight Search Header */}
          <div className="p-4 border-b border-indigo-500/20 flex items-center gap-3 bg-black/40">
            <Search className="w-5 h-5 text-cyan-400 flex-shrink-0 animate-pulse" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Execute NVK Neural Matrix Command..."
              autoFocus
              className="w-full bg-transparent text-sm sm:text-base text-cyan-100 placeholder-slate-500 focus:outline-none font-mono font-medium"
            />
            <div className="flex items-center gap-1 text-[10px] font-mono bg-indigo-950/80 border border-indigo-500/30 px-2 py-1 rounded text-cyan-300 flex-shrink-0">
              <Command className="w-3 h-3" /> K
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
            {filtered.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs font-mono">
                No matching NVK OS processes found. Try searching for "Chat", "Research", "GPU", or "Tour".
              </div>
            ) : (
              filtered.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className="w-full p-3 rounded-xl hover:bg-white/10 flex items-center justify-between transition-colors group text-left"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`p-2 rounded-lg border ${item.color} flex-shrink-0`}>
                        <ItemIcon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-100 group-hover:text-indigo-300 transition-colors truncate">
                            {item.title}
                          </span>
                          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider px-1.5 py-0.5 rounded bg-black/40 border border-white/5">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </button>
                );
              })
            )}
          </div>

          {/* Footer Quick Bar */}
          <div className="p-3 bg-black/60 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>NVK SOVEREIGN MATRIX OS v2.4</span>
            </div>
            <div className="flex items-center gap-3">
              <span>[ESC] Close</span>
              <span>[ENTER] Execute</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
