/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  Check, 
  X, 
  FileText, 
  Cpu, 
  Lock, 
  Search, 
  Sparkles, 
  Scale, 
  HelpCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from "lucide-react";

interface LegalDisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept?: () => void;
}

export default function LegalDisclaimerModal({ isOpen, onClose, onAccept }: LegalDisclaimerModalProps) {
  const [activeTab, setActiveTab] = useState<"ai_accuracy" | "advice_limits" | "privacy_webgpu" | "code_safety">("ai_accuracy");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [accepted, setAccepted] = useState<boolean>(() => {
    return !!localStorage.getItem("chatnvk_disclaimer_accepted");
  });
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    sec1: true,
    sec2: true,
    sec3: true,
    sec4: true,
  });

  if (!isOpen) return null;

  const handleAcceptTerms = () => {
    localStorage.setItem("chatnvk_disclaimer_accepted", "true");
    localStorage.setItem("chatnvk_disclaimer_accepted_at", new Date().toISOString());
    setAccepted(true);
    if (onAccept) onAccept();
    onClose();
  };

  const toggleSection = (id: string) => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const legalClauses = [
    {
      id: "ai_accuracy",
      category: "AI Output & Accuracy",
      icon: Sparkles,
      color: "text-amber-400 bg-amber-400/10 border-amber-400/20",
      title: "Generative AI Output Notice & Accuracy Disclaimer",
      summary: "ChatNVK utilizes large language models (Google Gemini API & browser-based WebGPU local models) to synthesize responses.",
      items: [
        {
          heading: "Model Hallucinations & Imperfections",
          body: "Generative AI models function probabilistically. Responses may contain factual errors, outdated data, unverified inferences, or fabricated sources ('hallucinations')."
        },
        {
          heading: "Independent Verification",
          body: "Users are strongly advised to independently verify all factual, historical, mathematical, or scientific claims before relying on AI outputs for decisions."
        },
        {
          heading: "No Warranty of Accuracy",
          body: "All conversational responses, research summaries, and sandbox outputs are provided 'AS-IS' without warranty of any kind, explicit or implied."
        }
      ]
    },
    {
      id: "advice_limits",
      category: "Non-Professional Advice",
      icon: AlertTriangle,
      color: "text-rose-400 bg-rose-400/10 border-rose-400/20",
      title: "Strict Non-Medical, Non-Legal & Non-Financial Disclaimer",
      summary: "ChatNVK AI companions are simulated conversational profiles and do NOT represent certified professionals.",
      items: [
        {
          heading: "Medical & Mental Health Notice",
          body: "ChatNVK is not a medical device or licensed healthcare provider. If you are experiencing a medical emergency, acute emotional distress, or mental health crisis, please contact emergency services (e.g. 911 or 988 crisis lifelines) immediately."
        },
        {
          heading: "Legal Counsel Disclaimer",
          body: "Conversations with AI companions (such as Aegis, Charis, or Sylva) do not constitute attorney-client privilege or professional legal counsel."
        },
        {
          heading: "Financial & Investment Disclaimer",
          body: "Financial trends, code samples, or market insights discussed during chats or wide research are purely educational. Never execute trades or investments based solely on AI projections."
        }
      ]
    },
    {
      id: "privacy_webgpu",
      category: "Data Privacy & WebGPU",
      icon: Lock,
      color: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
      title: "Data Sovereignty & Local Processing Privacy",
      summary: "ChatNVK is engineered for user data sovereignty, giving you choice over cloud versus offline WebGPU execution.",
      items: [
        {
          heading: "Local Storage & Client Sovereignty",
          body: "All active chat histories, profile preferences, and session data remain stored locally in your browser's IndexedDB / localStorage."
        },
        {
          heading: "Offline WebGPU Execution",
          body: "When Local WebGPU mode is enabled, model weights run directly inside browser RAM/VRAM. No raw prompts leave your machine during local inference."
        },
        {
          heading: "Cloud Routing (Gemini API)",
          body: "Cloud-routed requests pass through secure server endpoints via encrypted TLS channels strictly to service your queries."
        }
      ]
    },
    {
      id: "code_safety",
      category: "Sandbox Code Safety",
      icon: Cpu,
      color: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",
      title: "Developer Sandbox & Script Execution Safety",
      summary: "Code and system manifests synthesized by AI agents must be handled with appropriate developer care.",
      items: [
        {
          heading: "Code Review Requirement",
          body: "Always inspect AI-generated code, Dockerfiles, shell scripts, or API configurations prior to running them in production environments."
        },
        {
          heading: "Container Isolation",
          body: "When testing scripts inside the VM Developer Sandbox, ensure untrusted code is confined within virtual sandboxes and rate-limited environments."
        }
      ]
    }
  ];

  const filteredClauses = legalClauses.map(clause => ({
    ...clause,
    items: clause.items.filter(item => 
      !searchQuery || 
      item.heading.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clause.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(clause => clause.items.length > 0);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl bg-[#12141c] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-slate-100 font-sans"
        >
          {/* Header Banner */}
          <div className="p-4 sm:p-6 bg-gradient-to-r from-indigo-950/80 via-slate-900 to-slate-950 border-b border-white/10 flex items-start justify-between gap-4 flex-shrink-0">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="p-2.5 sm:p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shadow-lg shadow-amber-500/5">
                <Scale className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">Legal Disclaimer & Terms</h2>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300">
                    v2.4 Sovereign Matrix
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Important notice regarding AI accuracy, medical/legal disclaimers, data privacy, and user responsibilities.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-colors"
              aria-label="Close legal disclaimer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Search & Tab Navigation */}
          <div className="px-4 sm:px-6 pt-4 pb-3 bg-white/5 border-b border-white/10 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between flex-shrink-0">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search clauses (e.g., medical, accuracy, WebGPU, code)..."
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Status indicator */}
            <div className="flex items-center gap-2 self-end sm:self-center">
              {accepted ? (
                <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                  <ShieldCheck className="w-3.5 h-3.5" /> TERMS ACKNOWLEDGED
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-[11px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg">
                  <AlertTriangle className="w-3.5 h-3.5" /> ACTION REQUIRED
                </span>
              )}
            </div>
          </div>

          {/* Content Scroll View */}
          <div className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-6">
            {filteredClauses.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-xs">
                No legal clauses matching "{searchQuery}". Try searching for medical, accuracy, code, or privacy.
              </div>
            ) : (
              filteredClauses.map((clause) => {
                const ClauseIcon = clause.icon;
                const isExpanded = expandedSections[clause.id] !== false;

                return (
                  <div 
                    key={clause.id}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-5 transition-all space-y-4"
                  >
                    {/* Clause Header */}
                    <div 
                      onClick={() => toggleSection(clause.id)}
                      className="flex items-center justify-between cursor-pointer select-none group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg border ${clause.color}`}>
                          <ClauseIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <div>
                          <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                            {clause.title}
                          </h3>
                          <p className="text-xs text-slate-400 mt-0.5">
                            {clause.summary}
                          </p>
                        </div>
                      </div>

                      <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 group-hover:text-white">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>

                    {/* Clause Items */}
                    {isExpanded && (
                      <div className="pt-2 border-t border-white/10 space-y-3">
                        {clause.items.map((item, idx) => (
                          <div key={idx} className="bg-black/30 border border-white/5 p-3 sm:p-4 rounded-lg space-y-1">
                            <h4 className="text-xs font-semibold text-indigo-300 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                              {item.heading}
                            </h4>
                            <p className="text-xs text-slate-300 leading-relaxed pl-3.5">
                              {item.body}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            )}

            {/* Mandatory Medical/Emergency Notice Banner */}
            <div className="bg-rose-950/30 border border-rose-500/30 rounded-xl p-4 flex items-start gap-3 text-rose-200 text-xs">
              <ShieldAlert className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-rose-300 block mb-0.5">Immediate Health & Mental Crisis Notice</span>
                If you or someone you know is in immediate danger or distress, do not rely on ChatNVK. Please call local emergency services or contact the National Suicide & Crisis Lifeline by dialing or texting <strong>988</strong> (USA) or your local equivalent.
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 sm:p-5 bg-black/60 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
            <div className="text-[11px] text-slate-400 font-mono text-center sm:text-left">
              By using ChatNVK, you acknowledge the probabilistic nature of AI.
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-medium transition-colors"
              >
                Close
              </button>

              <button
                onClick={handleAcceptTerms}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                I Understand & Agree
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
