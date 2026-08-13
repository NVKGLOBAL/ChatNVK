/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Cpu, 
  Sparkles, 
  Check, 
  X, 
  Key, 
  Globe, 
  HardDrive, 
  Zap, 
  Layers, 
  ShieldCheck, 
  Sliders, 
  Terminal,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { AVAILABLE_MODELS } from "../lib/llm-router";
import { AIModelSpec } from "../types";

interface AIModelSwapperModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedModelId: string;
  onSelectModel: (modelId: string, customApiKey?: string, customEndpoint?: string) => void;
}

export default function AIModelSwapperModal({
  isOpen,
  onClose,
  selectedModelId,
  onSelectModel
}: AIModelSwapperModalProps) {
  const [activeTab, setActiveTab] = useState<"models" | "keys" | "custom">("models");
  const [serverStatus, setServerStatus] = useState<any>(null);
  
  // Custom user overrides saved in localStorage
  const [customKey, setCustomKey] = useState<string>(() => localStorage.getItem("chatnvk_custom_api_key") || "");
  const [customUrl, setCustomUrl] = useState<string>(() => localStorage.getItem("chatnvk_custom_endpoint") || "http://localhost:11434/v1");

  useEffect(() => {
    if (isOpen) {
      fetch("/api/models")
        .then(res => res.json())
        .then(data => setServerStatus(data))
        .catch(err => console.warn("Could not fetch server model status:", err));
    }
  }, [isOpen]);

  const handleSaveCustomConfig = () => {
    localStorage.setItem("chatnvk_custom_api_key", customKey);
    localStorage.setItem("chatnvk_custom_endpoint", customUrl);
    onSelectModel(selectedModelId, customKey, customUrl);
  };

  const providerIcons: { [key: string]: any } = {
    google: Sparkles,
    openai: Zap,
    anthropic: Cpu,
    deepseek: Layers,
    groq: Zap,
    ollama: HardDrive,
    local: Terminal
  };

  const currentModelSpec = AVAILABLE_MODELS.find(m => m.id === selectedModelId) || AVAILABLE_MODELS[0];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-4 z-50 font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="w-full max-w-3xl bg-[#090b14] border border-indigo-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-slate-200 max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-5 border-b border-indigo-500/20 bg-gradient-to-r from-indigo-950/60 via-slate-900 to-purple-950/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-indigo-600/30 border border-indigo-400/40 text-indigo-300">
                <Cpu className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white tracking-wide flex items-center gap-2">
                  Universal AI Model Swapper
                  <span className="text-[10px] font-mono bg-cyan-950 border border-cyan-500/40 text-cyan-300 px-2 py-0.5 rounded-full font-bold">
                    PLUG & PLAY
                  </span>
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  Switch instantly between Gemini, OpenAI, Claude, DeepSeek, Groq, or Local Ollama
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Bar */}
          <div className="flex border-b border-indigo-500/20 bg-slate-900/60 font-mono text-xs px-4">
            <button
              onClick={() => setActiveTab("models")}
              className={`py-3 px-4 flex items-center gap-2 border-b-2 font-bold transition-all ${
                activeTab === "models"
                  ? "border-indigo-400 text-indigo-300 bg-indigo-500/10"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <Layers className="w-4 h-4" />
              Model Directory ({AVAILABLE_MODELS.length})
            </button>

            <button
              onClick={() => setActiveTab("keys")}
              className={`py-3 px-4 flex items-center gap-2 border-b-2 font-bold transition-all ${
                activeTab === "keys"
                  ? "border-indigo-400 text-indigo-300 bg-indigo-500/10"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <Key className="w-4 h-4" />
              API Key Status
            </button>

            <button
              onClick={() => setActiveTab("custom")}
              className={`py-3 px-4 flex items-center gap-2 border-b-2 font-bold transition-all ${
                activeTab === "custom"
                  ? "border-indigo-400 text-indigo-300 bg-indigo-500/10"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <Sliders className="w-4 h-4" />
              Custom API / Local Ollama
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto space-y-4 flex-1">
            
            {activeTab === "models" && (
              <div className="space-y-4">
                {/* Active Model Summary Banner */}
                <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                    <div>
                      <span className="text-[10px] font-mono text-indigo-300 uppercase font-bold block">
                        ACTIVE RUNTIME MODEL
                      </span>
                      <span className="text-sm font-bold text-white">{currentModelSpec.name}</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-cyan-300 bg-cyan-950 border border-cyan-500/30 px-3 py-1 rounded-lg">
                    {currentModelSpec.contextWindow}
                  </span>
                </div>

                {/* Model Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {AVAILABLE_MODELS.map(m => {
                    const isSelected = selectedModelId === m.id;
                    const IconComp = providerIcons[m.provider] || Cpu;

                    return (
                      <div
                        key={m.id}
                        onClick={() => {
                          onSelectModel(m.id, customKey, customUrl);
                        }}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-2 relative group ${
                          isSelected
                            ? "bg-indigo-900/40 border-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.25)]"
                            : "bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className={`p-2 rounded-lg ${isSelected ? "bg-indigo-500/30 text-indigo-300" : "bg-slate-800 text-slate-400"}`}>
                              <IconComp className="w-4 h-4" />
                            </div>
                            <div>
                              <h3 className="text-xs font-bold text-slate-100 group-hover:text-white flex items-center gap-1.5">
                                {m.name}
                              </h3>
                              <span className="text-[9px] font-mono text-slate-500 uppercase">{m.provider}</span>
                            </div>
                          </div>

                          {isSelected ? (
                            <span className="p-1 rounded-full bg-indigo-500 text-white">
                              <Check className="w-3.5 h-3.5" />
                            </span>
                          ) : (
                            m.badge && (
                              <span className="text-[9px] font-mono bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
                                {m.badge}
                              </span>
                            )
                          )}
                        </div>

                        <p className="text-[11px] text-slate-400 leading-snug">{m.description}</p>

                        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
                          <span>Context: {m.contextWindow}</span>
                          <span className="text-indigo-400 group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                            Select Model <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === "keys" && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <h3 className="text-xs font-bold font-mono text-slate-200 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Environment Variables Detection
                  </h3>
                  <p className="text-xs text-slate-400">
                    When deploying or uploading to GitHub, you can specify these API keys in your <code className="text-indigo-300 bg-slate-950 px-1.5 py-0.5 rounded">.env</code> file:
                  </p>
                </div>

                <div className="space-y-2 font-mono text-xs">
                  {[
                    { name: "GEMINI_API_KEY", provider: "Google Gemini", key: "google", desc: "Powers Gemini 3.5 Flash, 3.5 Pro, 2.5 Flash" },
                    { name: "OPENAI_API_KEY", provider: "OpenAI", key: "openai", desc: "Powers GPT-4o, GPT-4o Mini, o3-mini" },
                    { name: "ANTHROPIC_API_KEY", provider: "Anthropic", key: "anthropic", desc: "Powers Claude 3.5 Sonnet & Haiku" },
                    { name: "DEEPSEEK_API_KEY", provider: "DeepSeek", key: "deepseek", desc: "Powers DeepSeek V3 and DeepSeek R1" },
                    { name: "GROQ_API_KEY", provider: "Groq LPU", key: "groq", desc: "Powers Llama 3.3 70B accelerated" },
                    { name: "CUSTOM_LLM_URL", provider: "Custom / Ollama", key: "custom", desc: "Powers Ollama and custom endpoints" }
                  ].map(item => {
                    const isConfigured = serverStatus?.configuredKeys?.[item.key];

                    return (
                      <div key={item.name} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-100">{item.name}</span>
                            <span className="text-[10px] text-slate-500 font-sans">({item.provider})</span>
                          </div>
                          <p className="text-[10px] text-slate-400 font-sans">{item.desc}</p>
                        </div>

                        <span className={`px-2.5 py-1 rounded text-[10px] font-bold border flex items-center gap-1 ${
                          isConfigured 
                            ? "bg-emerald-950/80 border-emerald-500/40 text-emerald-300" 
                            : "bg-slate-800/80 border-slate-700 text-slate-400"
                        }`}>
                          {isConfigured ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              Configured
                            </>
                          ) : (
                            "Not Set"
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === "custom" && (
              <div className="space-y-4 font-mono text-xs">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 font-sans">
                  <h3 className="text-xs font-bold text-slate-200 flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-cyan-400" />
                    Runtime Custom Endpoint Override
                  </h3>
                  <p className="text-xs text-slate-400">
                    Want to run local AI models without server setup? Enter your custom API Key or local Ollama / vLLM HTTP URL below:
                  </p>
                </div>

                <div className="space-y-3 bg-slate-900/40 p-4 rounded-xl border border-slate-800">
                  <div>
                    <label className="block text-slate-300 mb-1 font-bold">Custom API Key</label>
                    <input
                      type="password"
                      value={customKey}
                      onChange={e => setCustomKey(e.target.value)}
                      placeholder="sk-..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-bold">Custom OpenAI-Compatible Endpoint URL</label>
                    <input
                      type="text"
                      value={customUrl}
                      onChange={e => setCustomUrl(e.target.value)}
                      placeholder="http://localhost:11434/v1"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <button
                    onClick={handleSaveCustomConfig}
                    className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" /> Save Runtime Overrides
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Footer */}
          <div className="p-4 border-t border-indigo-500/20 bg-slate-900/80 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">
              Current Model: <strong className="text-indigo-300">{currentModelSpec.name}</strong>
            </span>

            <button
              onClick={onClose}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/30"
            >
              Apply & Close
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
