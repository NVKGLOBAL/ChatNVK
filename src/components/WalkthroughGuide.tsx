/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  MessageSquare, 
  Search, 
  Terminal, 
  Cpu, 
  Scale, 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Compass, 
  Workflow, 
  Users, 
  Play, 
  Zap,
  HelpCircle,
  ShieldCheck,
  Code
} from "lucide-react";

interface WalkthroughGuideProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToTab?: (tab: "messenger" | "research" | "sandbox" | "webgpu") => void;
}

export interface WalkthroughStep {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  badge: string;
  tabKey?: "messenger" | "research" | "sandbox" | "webgpu";
  description: string;
  bullets: {
    label: string;
    detail: string;
  }[];
  proTip: string;
  actionText?: string;
}

export const WALKTHROUGH_STEPS: WalkthroughStep[] = [
  {
    id: "step-1",
    title: "1. Calibrate Your Sovereign Identity & Persona Partners",
    subtitle: "Onboarding & Persona Matrix",
    icon: Sparkles,
    color: "from-indigo-500 to-purple-600 text-indigo-400 bg-indigo-500/10 border-indigo-500/30",
    badge: "Step 1 of 6",
    description: "Welcome to ChatNVK! Get started by setting up your profile and choosing your specialized AI companions.",
    bullets: [
      {
        label: "Calibrated Tone",
        detail: "Choose between Concise, Empathetic, Philosophical, or Socratic response calibration."
      },
      {
        label: "Sovereign Companions",
        detail: "Select specialized agents: Aether (Quantum Visionary), Sylva (Bio-Systems Architect), Charis (Socratic Ethicist), or Aegis (Cybernetic Defender)."
      },
      {
        label: "Offline Calibration",
        detail: "All preferences and agent weights are saved locally in your browser."
      }
    ],
    proTip: "You can recalibrate your profile at any time by clicking your user profile in the bottom left rail!"
  },
  {
    id: "step-2",
    title: "2. Authentic Chat Core & Multi-Agent Group Councils",
    subtitle: "Messenger Module",
    icon: MessageSquare,
    color: "from-indigo-600 to-cyan-600 text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
    badge: "Step 2 of 6",
    tabKey: "messenger",
    description: "Engage in 1-on-1 dialogue with your calibrated AI companion, or convene multi-agent group council chambers.",
    bullets: [
      {
        label: "Voice Notes & Audio Bursts",
        detail: "Tap the microphone icon to record audio notes with simulated real-time waveform transcription."
      },
      {
        label: "Media Attachments",
        detail: "Upload images, schematics, or text files directly into the prompt stream."
      },
      {
        label: "Council Chambers",
        detail: "Click 'New Group Council' to synthesize multi-perspective discussions where 3 AI companions converse simultaneously!"
      }
    ],
    proTip: "Try asking a Council Chamber to debate a complex topic—watch Aether, Charis, and Aegis share distinct insights in turn!",
    actionText: "Open Messenger Chat"
  },
  {
    id: "step-3",
    title: "3. Cognition Canvas & Dynamic Artifact Visualizer",
    subtitle: "Mindmap & Code Inspector",
    icon: Workflow,
    color: "from-purple-500 to-pink-600 text-purple-400 bg-purple-500/10 border-purple-500/30",
    badge: "Step 3 of 6",
    tabKey: "messenger",
    description: "Unlock structured thinking with the Cognition Canvas side-panel inside any chat session.",
    bullets: [
      {
        label: "Interactive Mindmaps",
        detail: "Automatically visualizes key concepts, relationships, and decision trees extracted from your dialogue."
      },
      {
        label: "Artifact Code Inspector",
        detail: "Collects synthesized code snippets, JSON manifests, and markdown documents into copyable artifacts."
      },
      {
        label: "D3 Data Charts",
        detail: "Renders interactive SVG charts for numerical data and research metrics."
      }
    ],
    proTip: "Click the 'Cognition Canvas' toggle icon on the top right of any chat header to inspect live mindmaps!",
    actionText: "View Cognition Canvas"
  },
  {
    id: "step-4",
    title: "4. Parallel Wide Research GPU Engine",
    subtitle: "Deep Research Orchestrator",
    icon: Search,
    color: "from-cyan-500 to-emerald-600 text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    badge: "Step 4 of 6",
    tabKey: "research",
    description: "Launch parallel deep-research pipelines across multiple search nodes and web sources.",
    bullets: [
      {
        label: "Parallel Node Execution",
        detail: "Queries multiple search workers simultaneously for comprehensive coverage."
      },
      {
        label: "Synthesized Dossiers",
        detail: "Generates executive summaries, citation lists, and key takeaways."
      },
      {
        label: "GPU Cluster Visualization",
        detail: "Watch simulated GPU compute nodes allocate memory and process search streams in real time."
      }
    ],
    proTip: "Use Wide Research for market analysis, technical specs, or multi-source factual deep dives!",
    actionText: "Launch Wide Research"
  },
  {
    id: "step-5",
    title: "5. VM Developer Sandbox & WebGPU Offline Model",
    subtitle: "Execution Sandbox & Local Inference",
    icon: Terminal,
    color: "from-amber-500 to-orange-600 text-amber-400 bg-amber-500/10 border-amber-500/30",
    badge: "Step 5 of 6",
    tabKey: "sandbox",
    description: "Test AI-generated code inside virtual sandboxes or switch to 100% offline WebGPU model inference.",
    bullets: [
      {
        label: "VM Developer Sandbox",
        detail: "Safely execute shell scripts, Python snippets, and web server micro-apps inside containerized sandboxes."
      },
      {
        label: "WebGPU Local Model Loader",
        detail: "Toggle local model weights running directly in your browser's VRAM/RAM for maximum privacy and zero latency."
      }
    ],
    proTip: "Switch to 'WebGPU Loader' tab to experience fully offline sovereign AI processing directly in your browser!",
    actionText: "Open VM Sandbox"
  },
  {
    id: "step-6",
    title: "6. Legal Terms, Disclaimer & Responsible AI Use",
    subtitle: "Safety & Compliance",
    icon: Scale,
    color: "from-rose-500 to-amber-600 text-rose-400 bg-rose-500/10 border-rose-500/30",
    badge: "Step 6 of 6",
    description: "ChatNVK prioritizes responsible AI deployment, user data privacy, and clear legal boundaries.",
    bullets: [
      {
        label: "Probabilistic AI Outputs",
        detail: "Always verify factual claims, code, and synthesized data before critical real-world execution."
      },
      {
        label: "Non-Medical / Non-Legal Notice",
        detail: "ChatNVK companions do not provide certified medical, emergency, legal, or financial counsel."
      },
      {
        label: "Data Sovereignty",
        detail: "Your chats remain stored strictly on your device via browser local storage."
      }
    ],
    proTip: "Click the 'AI Disclaimer' badge in the top right header anytime to review full legal terms and safety guidelines!"
  }
];

export default function WalkthroughGuide({ isOpen, onClose, onNavigateToTab }: WalkthroughGuideProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  if (!isOpen) return null;

  const currentStep = WALKTHROUGH_STEPS[currentStepIndex];
  const StepIcon = currentStep.icon;

  const handleNext = () => {
    if (currentStepIndex < WALKTHROUGH_STEPS.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleAction = () => {
    if (currentStep.tabKey && onNavigateToTab) {
      onNavigateToTab(currentStep.tabKey);
      onClose();
    } else {
      handleNext();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-[#12141c] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-slate-100 font-sans"
        >
          {/* Top Progress Bar */}
          <div className="w-full bg-slate-900/80 h-1.5 flex">
            {WALKTHROUGH_STEPS.map((_, idx) => (
              <div
                key={idx}
                className={`h-full flex-1 transition-all duration-300 ${
                  idx <= currentStepIndex ? "bg-gradient-to-r from-indigo-500 to-cyan-400" : "bg-white/10"
                }`}
              />
            ))}
          </div>

          {/* Modal Header */}
          <div className="p-4 sm:p-6 bg-gradient-to-r from-indigo-950/80 via-slate-900 to-slate-950 border-b border-white/10 flex items-start justify-between gap-4 flex-shrink-0">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className={`p-3 rounded-xl border ${currentStep.color}`}>
                <StepIcon className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300">
                    {currentStep.badge}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {currentStep.subtitle}
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-bold tracking-tight text-white mt-1">
                  {currentStep.title}
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-colors"
              aria-label="Close walkthrough"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Step Content */}
          <div className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-5">
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentStep.description}
            </p>

            {/* Bullets Card */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
              <h3 className="text-xs font-mono text-indigo-300 uppercase tracking-wider flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-indigo-400" /> Key Features & Controls
              </h3>
              <div className="space-y-2.5">
                {currentStep.bullets.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs">
                    <div className="p-1 rounded bg-indigo-500/20 text-indigo-300 mt-0.5 flex-shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <div>
                      <strong className="text-slate-100 font-semibold">{b.label}: </strong>
                      <span className="text-slate-300">{b.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pro Tip Box */}
            <div className="bg-gradient-to-r from-amber-500/10 to-indigo-500/10 border border-amber-500/20 p-3.5 rounded-xl flex items-start gap-3">
              <Zap className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5 animate-pulse" />
              <div className="text-xs text-amber-200/90 leading-relaxed">
                <strong className="text-amber-300">Pro-Tip: </strong>
                {currentStep.proTip}
              </div>
            </div>
          </div>

          {/* Modal Footer Controls */}
          <div className="p-4 sm:p-5 bg-black/60 border-t border-white/10 flex items-center justify-between gap-3 flex-shrink-0">
            {/* Step indicators */}
            <div className="flex items-center gap-1.5">
              {WALKTHROUGH_STEPS.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentStepIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === currentStepIndex 
                      ? "bg-indigo-500 w-5" 
                      : "bg-white/20 hover:bg-white/40"
                  }`}
                  title={`Jump to ${s.title}`}
                />
              ))}
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={currentStepIndex === 0}
                className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>

              {currentStep.actionText && (
                <button
                  onClick={handleAction}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-current" /> {currentStep.actionText}
                </button>
              )}

              <button
                onClick={handleNext}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-1.5"
              >
                {currentStepIndex === WALKTHROUGH_STEPS.length - 1 ? (
                  <>Finish Tour <Check className="w-4 h-4" /></>
                ) : (
                  <>Next Step <ChevronRight className="w-4 h-4" /></>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
