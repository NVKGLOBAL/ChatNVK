/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect } from "react";
import { Sparkles, Shield, Cpu, Terminal, Layers } from "lucide-react";
import { Message } from "../../types";
import MessageBubble from "./MessageBubble";

interface MessageListProps {
  messages: Message[];
  isStreaming: boolean;
  activeModelName: string;
  onSelectPrompt: (prompt: string) => void;
}

export default function MessageList({
  messages,
  isStreaming,
  activeModelName,
  onSelectPrompt
}: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  const sovereignPrompts = [
    { title: "Architect Sovereign System", prompt: "Design a local-first event-driven architecture using TypeScript and SQLite with zero cloud dependencies." },
    { title: "Run 8-Step Verification Loop", prompt: "Evaluate the performance and memory constraints of running GGUF Q4 quantized models on 8GB VRAM." },
    { title: "Convene Adversarial Council", prompt: "Debate the trade-offs between local WASM WebGPU inference vs. native GGUF llama.cpp execution." },
    { title: "Execute Sandbox Code", prompt: "Write and execute an isolated Python script in the sandbox to benchmark vector embedding cosine similarity." }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
      {messages.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center max-w-xl mx-auto space-y-6 my-auto py-8">
          <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 shadow-xl">
            <Shield className="w-10 h-10 animate-pulse text-cyan-400" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white tracking-wide">
              ChatNVK Sovereign Intelligence Workspace
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              AI You Own. Not AI You Rent. Operating locally on <span className="text-indigo-300 font-bold">{activeModelName}</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full pt-2">
            {sovereignPrompts.map((item, idx) => (
              <button
                key={idx}
                onClick={() => onSelectPrompt(item.prompt)}
                className="p-3 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/50 text-left transition-all group"
              >
                <h4 className="text-xs font-bold text-slate-200 group-hover:text-indigo-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{item.prompt}</p>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          {messages.map(msg => (
            <MessageBubble key={msg.id} message={msg} />
          ))}

          {isStreaming && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-900/40 border border-indigo-500/20 text-xs font-mono text-indigo-300 w-fit">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Sovereign local engine generating tokens...</span>
            </div>
          )}

          <div ref={bottomRef} />
        </>
      )}
    </div>
  );
}
