/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Cpu, 
  HardDrive, 
  Check, 
  X, 
  Layers, 
  ShieldCheck, 
  Activity, 
  Zap, 
  Terminal,
  RefreshCw,
  FolderOpen
} from "lucide-react";
import { LocalModelInfo, RuntimeHealth } from "../../types";

interface LocalModelManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeModelId: string;
  onSelectModel: (modelId: string) => void;
}

export default function LocalModelManagerModal({
  isOpen,
  onClose,
  activeModelId,
  onSelectModel
}: LocalModelManagerModalProps) {
  const [models, setModels] = useState<LocalModelInfo[]>([]);
  const [health, setHealth] = useState<RuntimeHealth | null>(null);
  const [loadingModelId, setLoadingModelId] = useState<string | null>(null);

  const fetchStatus = () => {
    fetch("/api/models/local")
      .then(res => res.json())
      .then(data => {
        setModels(data.models || []);
        setHealth(data.runtimeHealth || null);
      })
      .catch(err => console.error("Error fetching local models:", err));
  };

  useEffect(() => {
    if (isOpen) fetchStatus();
  }, [isOpen]);

  const handleLoadModel = async (modelId: string) => {
    setLoadingModelId(modelId);
    try {
      await fetch("/api/models/load", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ modelId })
      });
      onSelectModel(modelId);
      fetchStatus();
    } catch (e) {
      console.error("Load model error:", e);
    } finally {
      setLoadingModelId(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-xl flex items-center justify-center p-4 z-50 font-sans">
      <div className="w-full max-w-4xl bg-[#080a14] border border-indigo-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-indigo-500/20 bg-gradient-to-r from-indigo-950/70 via-slate-900 to-cyan-950/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-600/30 border border-indigo-400/40 text-indigo-300">
              <Cpu className="w-6 h-6 animate-pulse text-cyan-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide flex items-center gap-2">
                Sovereign Model Manager
                <span className="text-[10px] font-mono bg-emerald-950 border border-emerald-500/40 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                  GGUF / LOCAL OPEN-WEIGHT
                </span>
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                No Cloud APIs. No Vendor Lock-in. Native Local Execution Runtimes.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hardware Telemetry Bar */}
        {health && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 bg-slate-900/80 border-b border-slate-800 text-[11px] font-mono">
            <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">Runtime Engine:</span>
              <span className="text-emerald-400 font-bold">{health.engine}</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">VRAM Allocation:</span>
              <span className="text-indigo-300 font-bold">{(health.vramUsedMb / 1024).toFixed(1)} GB</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">GPU Acceleration:</span>
              <span className="text-cyan-300 font-bold">ACTIVE (Metal/CUDA)</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">Network State:</span>
              <span className="text-emerald-400 font-bold">SOVEREIGN OFFLINE</span>
            </div>
          </div>
        )}

        {/* Model Grid */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1 font-mono text-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="font-bold text-slate-200">Installed Open-Weight Models ({models.length}):</span>
            <button
              onClick={fetchStatus}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Refresh
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {models.map(model => {
              const isSelected = activeModelId === model.id;
              const isLoading = loadingModelId === model.id;

              return (
                <div
                  key={model.id}
                  onClick={() => !isLoading && handleLoadModel(model.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 relative group ${
                    isSelected
                      ? "bg-indigo-900/40 border-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.25)]"
                      : "bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-lg ${isSelected ? "bg-indigo-500/30 text-indigo-300" : "bg-slate-800 text-slate-400"}`}>
                        <Cpu className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-slate-100 group-hover:text-white">
                          {model.name}
                        </h3>
                        <span className="text-[10px] text-slate-400 font-bold">
                          {model.format} • {model.quantization} • {model.parameterSize}
                        </span>
                      </div>
                    </div>

                    {isSelected && (
                      <span className="p-1 rounded-full bg-indigo-500 text-white">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-400 bg-slate-950/60 p-2 rounded-lg">
                    <div>
                      <span className="block text-slate-500">Context</span>
                      <span className="text-slate-200 font-bold">{model.contextWindow}</span>
                    </div>
                    <div>
                      <span className="block text-slate-500">VRAM</span>
                      <span className="text-slate-200 font-bold">{model.vramRequiredGb} GB</span>
                    </div>
                    <div>
                      <span className="block text-slate-500">Throughput</span>
                      <span className="text-cyan-400 font-bold">{model.inferenceSpeedTokensPerSec} t/s</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-[10px]">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      {model.capabilities.toolCalling && <span className="text-emerald-400">✓ Tools</span>}
                      {model.capabilities.reasoning && <span className="text-indigo-400">✓ Reasoning</span>}
                      {model.capabilities.codeExecution && <span className="text-cyan-400">✓ Code</span>}
                    </div>

                    <span className="text-indigo-400 font-bold group-hover:translate-x-0.5 transition-transform">
                      {isLoading ? "Loading..." : isSelected ? "Active Model" : "Load Model →"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-indigo-500/20 bg-slate-900/80 flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400">
            Active Substrate: <strong className="text-indigo-300">{activeModelId}</strong>
          </span>

          <button
            onClick={onClose}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/30"
          >
            Confirm & Close
          </button>
        </div>
      </div>
    </div>
  );
}
