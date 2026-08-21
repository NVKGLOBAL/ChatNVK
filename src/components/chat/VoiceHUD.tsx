/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { 
  PhoneOff, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Bot, 
  User, 
  Radio
} from "lucide-react";
import { AgentRoleType } from "../../types";

interface VoiceHUDProps {
  isOpen: boolean;
  onClose: () => void;
  activeRole: AgentRoleType;
  onSendVoiceQuery: (transcript: string) => Promise<string>;
}

export default function VoiceHUD({
  isOpen,
  onClose,
  activeRole,
  onSendVoiceQuery
}: VoiceHUDProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [agentReply, setAgentReply] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (!isOpen) {
      recognitionRef.current?.stop();
      window.speechSynthesis.cancel();
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = async (event: any) => {
      let current = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        current += event.results[i][0].transcript;
      }
      setTranscript(current);

      // If user paused or finalized sentence
      if (event.results[event.results.length - 1].isFinal) {
        setIsProcessing(true);
        const reply = await onSendVoiceQuery(current);
        setAgentReply(reply);
        setIsProcessing(false);

        // Local Speech Synthesis
        const utterance = new SpeechSynthesisUtterance(reply);
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
      }
    };

    recognition.start();
    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
      window.speechSynthesis.cancel();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-2xl flex flex-col items-center justify-between p-6 z-50 font-sans text-slate-100">
      {/* Top Bar */}
      <div className="flex items-center justify-between w-full max-w-lg font-mono text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-bold text-white">SOVEREIGN VOICE DUPLEX</span>
        </div>
        <span className="px-2 py-0.5 rounded bg-indigo-950 border border-indigo-500/30 text-indigo-300">
          LOCAL BROWSER AUDIO
        </span>
      </div>

      {/* Center Waveform & Avatar */}
      <div className="flex flex-col items-center space-y-6 text-center my-auto">
        <div className="relative">
          <div className={`w-32 h-32 rounded-full flex items-center justify-center border-2 transition-all ${
            isSpeaking 
              ? "bg-cyan-500/20 border-cyan-400 shadow-[0_0_50px_rgba(6,182,212,0.4)] scale-110" 
              : "bg-indigo-950/50 border-indigo-500/40"
          }`}>
            <Bot className="w-14 h-14 text-indigo-300 animate-pulse" />
          </div>

          {isSpeaking && (
            <div className="absolute -inset-4 border-2 border-cyan-400/30 rounded-full animate-ping pointer-events-none" />
          )}
        </div>

        <div>
          <h3 className="text-lg font-bold text-white tracking-wide">
            {activeRole} Active
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-1">
            {isSpeaking ? "Agent Speaking..." : isProcessing ? "Local Model Reasoning..." : "Listening to user..."}
          </p>
        </div>

        {/* Live Closed Captions */}
        <div className="max-w-md bg-slate-900/80 border border-slate-800 rounded-2xl p-4 min-h-[80px] text-xs font-mono text-slate-300 flex flex-col justify-center">
          {transcript ? (
            <p className="text-indigo-200"><strong className="text-indigo-400">You:</strong> {transcript}</p>
          ) : agentReply ? (
            <p className="text-cyan-200"><strong className="text-cyan-400">Agent:</strong> {agentReply}</p>
          ) : (
            <p className="text-slate-500 italic">Speak naturally. Audio is processed 100% locally in your browser.</p>
          )}
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="flex items-center gap-4 pb-4">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`p-4 rounded-full border transition-all ${
            isMuted 
              ? "bg-rose-500/20 border-rose-500 text-rose-400" 
              : "bg-slate-900 border-slate-800 text-slate-300 hover:text-white"
          }`}
        >
          {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </button>

        <button
          onClick={onClose}
          className="p-4 rounded-full bg-rose-600 hover:bg-rose-500 text-white shadow-xl shadow-rose-600/40 transition-all scale-105"
        >
          <PhoneOff className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
