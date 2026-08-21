/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import { 
  Send, 
  Square, 
  Mic, 
  MicOff, 
  Paperclip, 
  ShieldCheck, 
  Sparkles,
  X
} from "lucide-react";
import { AgentRoleType } from "../../types";

interface ComposerProps {
  input: string;
  setInput: (value: string) => void;
  onSend: () => void;
  isStreaming: boolean;
  onStop: () => void;
  activeRole: AgentRoleType;
  enableVerification: boolean;
  setEnableVerification: (enabled: boolean) => void;
  onAttachFile?: (file: File) => void;
}

export default function Composer({
  input,
  setInput,
  onSend,
  isStreaming,
  onStop,
  activeRole,
  enableVerification,
  setEnableVerification,
  onAttachFile
}: ComposerProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [attachedFileName, setAttachedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  const toggleSpeechRecognition = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Browser speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setInput(input + (input ? " " : "") + transcript);
    };

    recognition.onerror = () => {
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
    recognitionRef.current = recognition;
    setIsRecording(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isStreaming) {
        onSend();
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedFileName(file.name);
      onAttachFile?.(file);
    }
  };

  return (
    <div className="p-3 md:p-4 bg-[#090c16] border-t border-slate-800/80 font-sans">
      <div className="max-w-4xl mx-auto space-y-2">
        {/* Attachment Pill */}
        {attachedFileName && (
          <div className="flex items-center gap-2 px-3 py-1 bg-indigo-950/60 border border-indigo-500/30 rounded-lg text-xs text-indigo-300 w-fit">
            <Paperclip className="w-3.5 h-3.5" />
            <span className="font-mono">{attachedFileName}</span>
            <button
              onClick={() => setAttachedFileName(null)}
              className="text-slate-400 hover:text-white ml-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Input Box */}
        <div className="relative rounded-2xl bg-slate-900/90 border border-slate-800 focus-within:border-indigo-500/60 shadow-xl transition-all flex flex-col p-2.5">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Message ${activeRole.toLowerCase()} role on local model... (Shift+Enter for new line)`}
            rows={2}
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm focus:outline-none resize-none px-2 py-1"
          />

          {/* Action Row */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
            <div className="flex items-center gap-2">
              {/* File Attachment Input */}
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
                title="Attach local document/file"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              {/* Local Speech Recognition Button */}
              <button
                type="button"
                onClick={toggleSpeechRecognition}
                className={`p-1.5 rounded-lg transition-all ${
                  isRecording 
                    ? "bg-rose-500 text-white animate-pulse" 
                    : "bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-slate-200"
                }`}
                title="Local speech to text (Browser Native)"
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              {/* 8-Step Verification Toggle */}
              <button
                type="button"
                onClick={() => setEnableVerification(!enableVerification)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-mono text-[10px] font-bold border transition-all ${
                  enableVerification
                    ? "bg-emerald-950/80 border-emerald-500/40 text-emerald-300"
                    : "bg-slate-800/40 border-slate-700 text-slate-500 hover:text-slate-300"
                }`}
                title="Toggle 8-step verification pipeline"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>8-STEP VERIFY</span>
              </button>
            </div>

            {/* Send / Stop Button */}
            {isStreaming ? (
              <button
                onClick={onStop}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold transition-all shadow-lg shadow-rose-600/30"
              >
                <Square className="w-3.5 h-3.5" />
                <span className="text-xs">Halt</span>
              </button>
            ) : (
              <button
                onClick={onSend}
                disabled={!input.trim()}
                className="flex items-center gap-1 px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white font-bold transition-all shadow-lg shadow-indigo-600/30"
              >
                <Send className="w-3.5 h-3.5" />
                <span className="text-xs">Send</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
