/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Check, 
  Copy, 
  ShieldCheck, 
  Terminal, 
  Sparkles, 
  User, 
  Bot, 
  ChevronDown, 
  ChevronRight, 
  Activity,
  Cpu
} from "lucide-react";
import { Message, SenderType } from "../../types";

interface MessageBubbleProps {
  message: Message;
  key?: string | number;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  const isUser = message.senderType === SenderType.USER;
  const isAgent = message.senderType === SenderType.AGENT || message.senderType === SenderType.AI;

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex flex-col gap-1.5 my-3 ${isUser ? "items-end" : "items-start"}`}>
      {/* Sender Header */}
      <div className="flex items-center gap-2 px-1 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-1.5">
          {isUser ? (
            <span className="p-1 rounded-md bg-indigo-950/80 border border-indigo-500/30 text-indigo-300">
              <User className="w-3 h-3" />
            </span>
          ) : (
            <span className="p-1 rounded-md bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
              <Bot className="w-3 h-3" />
            </span>
          )}
          <span className="font-bold text-slate-200">{message.senderName}</span>
        </div>

        {message.agentRole && (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-900/40 border border-indigo-400/30 text-indigo-300 font-bold">
            {message.agentRole}
          </span>
        )}

        {message.modelUsed && (
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-400 flex items-center gap-1">
            <Cpu className="w-2.5 h-2.5" />
            {message.modelUsed}
          </span>
        )}

        <span className="text-[10px] text-slate-500">{message.timestamp}</span>
      </div>

      {/* Main Message Box */}
      <div
        className={`max-w-[88%] md:max-w-[78%] rounded-2xl p-4 shadow-lg text-sm leading-relaxed transition-all relative group ${
          isUser
            ? "bg-indigo-600 text-white rounded-tr-xs"
            : "bg-[#0d111e] border border-slate-800/90 text-slate-200 rounded-tl-xs"
        }`}
      >
        {/* Verification Steps Accordion (if present) */}
        {message.verificationSteps && message.verificationSteps.length > 0 && (
          <div className="mb-3 p-2.5 rounded-xl bg-slate-900/90 border border-indigo-500/20 font-mono text-xs">
            <button
              onClick={() => setShowVerification(!showVerification)}
              className="flex items-center justify-between w-full text-indigo-300 hover:text-indigo-200 font-bold"
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>8-Step Sovereign Verification Trace ({message.verificationSteps.length})</span>
              </div>
              {showVerification ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>

            {showVerification && (
              <div className="mt-2.5 space-y-1.5 border-t border-slate-800 pt-2 text-[11px]">
                {message.verificationSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-slate-300">
                    <span className="px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 font-bold text-[9px]">
                      {step.step}
                    </span>
                    <span className="text-slate-400 font-sans">{step.details}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Text Content */}
        <div className="whitespace-pre-wrap font-sans break-words">{message.text}</div>

        {/* Tool Execution Badges */}
        {message.toolExecutions && message.toolExecutions.length > 0 && (
          <div className="mt-3 pt-2 border-t border-slate-800 space-y-1 font-mono text-[11px]">
            {message.toolExecutions.map((tool, idx) => (
              <div key={idx} className="p-2 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-cyan-300">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>{tool.toolName}</span>
                </div>
                <span className="text-[10px] text-emerald-400 uppercase font-bold">{tool.status}</span>
              </div>
            ))}
          </div>
        )}

        {/* Copy Button on Hover */}
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity"
          title="Copy text"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
}
