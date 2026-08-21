/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { 
  MessageSquare, 
  Search, 
  Terminal, 
  Cpu, 
  Command, 
  Compass, 
  Scale, 
  Sparkles,
  Zap,
  Layers,
  Shield
} from "lucide-react";

interface NVKOSTaskDockProps {
  activeTab: "messenger" | "research" | "sandbox" | "webgpu" | "sovereign";
  onNavigateTab: (tab: "messenger" | "research" | "sandbox" | "webgpu" | "sovereign") => void;
  onOpenSpotlight: () => void;
  onOpenWalkthrough: () => void;
  onOpenDisclaimer: () => void;
  localModelEnabled: boolean;
}

export default function NVKOSTaskDock({
  activeTab,
  onNavigateTab,
  onOpenSpotlight,
  onOpenWalkthrough,
  onOpenDisclaimer,
  localModelEnabled
}: NVKOSTaskDockProps) {
  const dockApps = [
    {
      id: "sovereign",
      title: "Sovereign Workspace",
      subtitle: "GGUF / Verification / Council",
      icon: Shield,
      color: "from-indigo-600 via-purple-700 to-cyan-800 text-cyan-200 shadow-indigo-500/50",
      activeColor: "bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.9)]",
      isTab: true
    },
    {
      id: "messenger",
      title: "Authentic Chat Core",
      subtitle: "1-on-1 Dialogue & Councils",
      icon: MessageSquare,
      color: "from-indigo-600 via-indigo-700 to-purple-800 text-cyan-200 shadow-indigo-500/40",
      activeColor: "bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]",
      isTab: true
    },
    {
      id: "research",
      title: "Wide Research GPU",
      subtitle: "Parallel Web Synthesis",
      icon: Search,
      color: "from-cyan-600 via-blue-700 to-indigo-800 text-white shadow-cyan-500/40",
      activeColor: "bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]",
      isTab: true
    },
    {
      id: "sandbox",
      title: "VM Sandbox",
      subtitle: "Container Execution",
      icon: Terminal,
      color: "from-amber-600 via-orange-700 to-red-800 text-amber-100 shadow-amber-500/40",
      activeColor: "bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.8)]",
      isTab: true
    },
    {
      id: "webgpu",
      title: "WebGPU Loader",
      subtitle: "In-Browser Local Weights",
      icon: Cpu,
      color: "from-emerald-600 via-teal-700 to-cyan-800 text-emerald-100 shadow-emerald-500/40",
      activeColor: "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]",
      badge: localModelEnabled ? "WebGPU" : undefined,
      isTab: true
    }
  ];

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 max-w-full px-2">
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-[#0b0d14]/95 border border-indigo-500/30 p-2 sm:p-2.5 rounded-2xl shadow-[0_0_30px_rgba(15,23,42,0.8)] backdrop-blur-2xl flex items-center gap-1.5 sm:gap-3 relative overflow-hidden"
      >
        {/* Subtle Cyber Top Highlight Line */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80" />

        {/* NVK Matrix Brand Watermark */}
        <div className="hidden xl:flex items-center gap-1 px-2 border-r border-indigo-500/20 font-mono text-[9px] text-indigo-400 font-bold">
          <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" />
          <span>NVK.MATRIX</span>
        </div>
        
        {/* Dock Applications */}
        {dockApps.map((app) => {
          const AppIcon = app.icon;
          const isActive = activeTab === app.id;

          return (
            <div key={app.id} className="relative group flex flex-col items-center">
              
              {/* Tooltip on hover */}
              <div className="absolute bottom-full mb-3 hidden group-hover:flex flex-col items-center pointer-events-none transition-all z-50">
                <div className="bg-[#0e111a] border border-cyan-500/30 px-3 py-1.5 rounded-lg text-center shadow-2xl">
                  <span className="text-xs font-bold text-cyan-300 block whitespace-nowrap font-mono">{app.title}</span>
                  <span className="text-[9px] text-slate-400 font-mono block whitespace-nowrap">{app.subtitle}</span>
                </div>
                <div className="w-2 h-2 bg-[#0e111a] border-r border-b border-cyan-500/30 rotate-45 -mt-1" />
              </div>

              {/* App Icon Button */}
              <motion.button
                whileHover={{ y: -5, scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigateTab(app.id as any)}
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${app.color} p-2.5 sm:p-3 flex items-center justify-center shadow-lg transition-all relative border border-white/10 ${
                  isActive 
                    ? "ring-2 ring-cyan-400 ring-offset-2 ring-offset-[#0b0d14] scale-105" 
                    : "opacity-75 hover:opacity-100"
                }`}
                aria-label={app.title}
              >
                <AppIcon className="w-5 h-5 sm:w-6 sm:h-6" />

                {/* Optional Badge */}
                {app.badge && (
                  <span className="absolute -top-1.5 -right-1 bg-cyan-400 text-slate-950 font-bold font-mono text-[8px] px-1.5 py-0.2 rounded-full shadow-lg border border-slate-900">
                    {app.badge}
                  </span>
                )}
              </motion.button>

              {/* Active Indicator Laser Pill */}
              <div className={`w-4 h-1 rounded-full mt-1.5 transition-all ${
                isActive ? `${app.activeColor}` : "bg-white/10 opacity-0 group-hover:opacity-100"
              }`} />

            </div>
          );
        })}

        {/* Vertical Cyber Divider */}
        <div className="h-8 w-px bg-indigo-500/30 mx-0.5 sm:mx-1 flex-shrink-0" />

        {/* System Utility Fast Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Neural Command Palette Icon */}
          <div className="relative group flex flex-col items-center">
            <div className="absolute bottom-full mb-3 hidden group-hover:flex flex-col items-center pointer-events-none z-50">
              <div className="bg-[#0e111a] border border-indigo-500/40 px-3 py-1.5 rounded-lg text-center shadow-2xl">
                <span className="text-xs font-bold text-indigo-300 block whitespace-nowrap font-mono">Neural Command Palette</span>
                <span className="text-[9px] text-cyan-400 font-mono block whitespace-nowrap">Shortcut: ⌘K</span>
              </div>
              <div className="w-2 h-2 bg-[#0e111a] border-r border-b border-indigo-500/40 rotate-45 -mt-1" />
            </div>

            <motion.button
              whileHover={{ y: -5, scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenSpotlight}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-indigo-950/90 hover:bg-indigo-900 border border-indigo-500/50 text-indigo-300 hover:text-white p-2.5 sm:p-3 flex items-center justify-center transition-all shadow-md"
              title="Launch Neural Command Palette"
            >
              <Command className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
            </motion.button>
            <div className="w-1.5 h-1.5 rounded-full mt-1.5 bg-indigo-500/30" />
          </div>

          {/* Guided Tour Launcher Icon */}
          <div className="relative group flex flex-col items-center">
            <div className="absolute bottom-full mb-3 hidden group-hover:flex flex-col items-center pointer-events-none z-50">
              <div className="bg-[#0e111a] border border-cyan-500/40 px-3 py-1.5 rounded-lg text-center shadow-2xl">
                <span className="text-xs font-bold text-cyan-300 block whitespace-nowrap font-mono">Guided NVK Walkthrough</span>
                <span className="text-[9px] text-slate-400 font-mono block whitespace-nowrap">6-Step System Tour</span>
              </div>
              <div className="w-2 h-2 bg-[#0e111a] border-r border-b border-cyan-500/40 rotate-45 -mt-1" />
            </div>

            <motion.button
              whileHover={{ y: -5, scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenWalkthrough}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-cyan-950/90 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-300 hover:text-white p-2.5 sm:p-3 flex items-center justify-center transition-all shadow-md"
              title="Step-by-Step System Tour"
            >
              <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-300 animate-spin-slow" />
            </motion.button>
            <div className="w-1.5 h-1.5 rounded-full mt-1.5 bg-cyan-500/30" />
          </div>

        </div>

      </motion.div>
    </div>
  );
}
