/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Users, 
  Play, 
  CheckCircle2, 
  Sparkles, 
  ShieldAlert, 
  Scale, 
  X,
  Layers,
  ArrowRight
} from "lucide-react";
import { CouncilMode } from "../../types";

interface CouncilPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onRunCouncil: (topic: string, mode: CouncilMode) => void;
  isDebating: boolean;
  councilOutputs: { role: string; text: string }[];
}

export default function CouncilPanel({
  isOpen,
  onClose,
  onRunCouncil,
  isDebating,
  councilOutputs
}: CouncilPanelProps) {
  const [topic, setTopic] = useState("");
  const [selectedMode, setSelectedMode] = useState<CouncilMode>("SEQUENTIAL");

  if (!isOpen) return null;

  const modes: { id: CouncilMode; title: string; desc: string; icon: any }[] = [
    { id: "SEQUENTIAL", title: "Sequential Council", desc: "Planner → Analyst → Critic → Verifier → Synthesizer", icon: ArrowRight },
    { id: "PARALLEL", title: "Parallel Council", desc: "All roles reason concurrently, then Critic & Synthesizer consolidate", icon: Layers },
    { id: "ADVERSARIAL", title: "Adversarial Council", desc: "One proposes, Critic attacks, Verifier falsifies, Synthesizer resolves", icon: ShieldAlert }
  ];

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 font-sans">
      <div className="w-full max-w-3xl bg-[#0a0d1a] border border-indigo-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                Sovereign Council Chambers
                <span className="text-[10px] font-mono bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30">
                  MULTI-AGENT ENGINE
                </span>
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                Execute collaborative or adversarial multi-agent debate on local intelligence
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1 font-mono text-xs">
          {/* Mode Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {modes.map(m => {
              const isSelected = selectedMode === m.id;
              const IconComp = m.icon;
              return (
                <div
                  key={m.id}
                  onClick={() => setSelectedMode(m.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? "bg-indigo-900/40 border-indigo-400 text-indigo-200 shadow-md"
                      : "bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <IconComp className="w-4 h-4 text-cyan-400" />
                    <span className="font-bold text-slate-200">{m.title}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-sans">{m.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Topic Input */}
          <div className="space-y-1.5">
            <label className="text-slate-300 font-bold">Debate Topic or Problem Statement:</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Architecting a local-first vector search index with zero cloud dependencies"
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500 font-sans text-xs"
              />
              <button
                onClick={() => {
                  if (topic.trim() && !isDebating) {
                    onRunCouncil(topic, selectedMode);
                  }
                }}
                disabled={!topic.trim() || isDebating}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-lg shadow-indigo-600/30"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{isDebating ? "Debating..." : "Convene Council"}</span>
              </button>
            </div>
          </div>

          {/* Live Debate Stream */}
          <div className="space-y-2 pt-2">
            <h4 className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">
              Chamber Transcripts & Synthesis:
            </h4>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 min-h-[160px] max-h-[300px] overflow-y-auto space-y-3">
              {councilOutputs.length === 0 ? (
                <div className="text-slate-600 text-center py-8">
                  No active council session. Enter a topic and convene the chamber above.
                </div>
              ) : (
                councilOutputs.map((out, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 font-bold text-[9px]">
                        {out.role}
                      </span>
                    </div>
                    <p className="text-slate-200 font-sans text-xs leading-relaxed whitespace-pre-wrap">
                      {out.text}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-900/40 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
          >
            Close Chamber
          </button>
        </div>
      </div>
    </div>
  );
}
