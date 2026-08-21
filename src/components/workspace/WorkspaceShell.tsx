/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { 
  Shield, 
  Cpu, 
  Users, 
  Database, 
  Terminal, 
  Lock, 
  Phone, 
  Sparkles, 
  Plus, 
  Trash2, 
  Menu, 
  X,
  MessageSquare
} from "lucide-react";
import { 
  Message, 
  SenderType, 
  MessageStatus, 
  AgentRoleType, 
  CouncilMode, 
  ChatSession 
} from "../../types";
import MessageList from "../chat/MessageList";
import Composer from "../chat/Composer";
import AgentRoleSelector from "../chat/AgentRoleSelector";
import CouncilPanel from "../chat/CouncilPanel";
import VoiceHUD from "../chat/VoiceHUD";
import MemoryInspectorModal from "../memory/MemoryInspectorModal";
import LocalModelManagerModal from "../models/LocalModelManagerModal";
import ToolPermissionsModal from "../tools/ToolPermissionsModal";
import SandboxTerminalModal from "../tools/SandboxTerminalModal";

export default function WorkspaceShell() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [activeRole, setActiveRole] = useState<AgentRoleType>("PLANNER");
  const [activeModelId, setActiveModelId] = useState("llama-3.3-8b-instruct-q4");
  const [enableVerification, setEnableVerification] = useState(true);

  // Modals
  const [isCouncilOpen, setIsCouncilOpen] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isMemoryOpen, setIsMemoryOpen] = useState(false);
  const [isModelsOpen, setIsModelsOpen] = useState(false);
  const [isPermissionsOpen, setIsPermissionsOpen] = useState(false);
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Council State
  const [isDebating, setIsDebating] = useState(false);
  const [councilOutputs, setCouncilOutputs] = useState<{ role: string; text: string }[]>([]);

  // Sessions State
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>("session-default");

  const abortControllerRef = useRef<AbortController | null>(null);

  // Load sessions from local persistence on boot
  useEffect(() => {
    fetch("/api/persistence/sessions")
      .then(res => res.json())
      .then(data => {
        if (data.sessions && data.sessions.length > 0) {
          setSessions(data.sessions);
          setMessages(data.sessions[0].messages || []);
          setCurrentSessionId(data.sessions[0].id);
        }
      })
      .catch(err => console.error("Could not load local sessions:", err));
  }, []);

  // Save session when messages change
  useEffect(() => {
    if (messages.length > 0) {
      const activeSession: ChatSession = {
        id: currentSessionId,
        name: messages[0]?.text.slice(0, 30) || "Sovereign Chat",
        isGroup: false,
        avatar: "🛡️",
        partnerIds: [],
        messages,
        theme: "dark",
        updatedAt: new Date().toISOString()
      };
      fetch("/api/persistence/save-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session: activeSession })
      }).catch(err => console.error("Auto-save error:", err));
    }
  }, [messages, currentSessionId]);

  const handleSend = async (overrideText?: string) => {
    const textToSend = overrideText || input;
    if (!textToSend.trim() || isStreaming) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      senderId: "user-1",
      senderName: "Operator",
      senderAvatar: "👤",
      senderType: SenderType.USER,
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: MessageStatus.SENT
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsStreaming(true);

    const botMessageId = `ai-${Date.now()}`;
    const botMessage: Message = {
      id: botMessageId,
      senderId: "sovereign-ai",
      senderName: `Sovereign Engine (${activeRole})`,
      senderAvatar: "🤖",
      senderType: SenderType.AI,
      agentRole: activeRole,
      modelUsed: activeModelId,
      text: "",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: MessageStatus.SENDING,
      verificationSteps: []
    };

    setMessages(prev => [...prev, botMessage]);

    try {
      const controller = new AbortController();
      abortControllerRef.current = controller;

      const response = await fetch("/api/chat/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          agentRole: activeRole,
          enableVerification
        }),
        signal: controller.signal
      });

      if (!response.body) return;
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const parsed = JSON.parse(line.replace("data: ", ""));
              if (parsed.type === "token") {
                accumulatedText += parsed.token;
                setMessages(prev =>
                  prev.map(m => (m.id === botMessageId ? { ...m, text: accumulatedText } : m))
                );
              } else if (parsed.type === "verification_step") {
                setMessages(prev =>
                  prev.map(m =>
                    m.id === botMessageId
                      ? {
                          ...m,
                          verificationSteps: [
                            ...(m.verificationSteps || []),
                            {
                              step: parsed.data.step,
                              status: "passed",
                              agentRole: parsed.data.role,
                              details: parsed.data.text,
                              timestamp: new Date().toLocaleTimeString()
                            }
                          ]
                        }
                      : m
                  )
                );
              }
            } catch (e) {
              // ignore parse fragments
            }
          }
        }
      }
    } catch (err: any) {
      if (err.name !== "AbortError") {
        setMessages(prev =>
          prev.map(m =>
            m.id === botMessageId
              ? { ...m, text: m.text + `\n[Local Inference Error: ${err.message}]`, status: MessageStatus.ERROR }
              : m
          )
        );
      }
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  const handleStop = () => {
    abortControllerRef.current?.abort();
    setIsStreaming(false);
  };

  const handleNewSession = () => {
    const newId = `session-${Date.now()}`;
    setCurrentSessionId(newId);
    setMessages([]);
  };

  const handleRunCouncil = async (topic: string, mode: CouncilMode) => {
    setIsDebating(true);
    setCouncilOutputs([]);

    try {
      const res = await fetch("/api/council/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, mode })
      });

      if (!res.body) return;
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let currentRole = "";
      let currentText = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.replace("data: ", ""));
              if (data.type === "agent_start") {
                currentRole = data.agent.role;
                currentText = "";
                setCouncilOutputs(prev => [...prev, { role: currentRole, text: "" }]);
              } else if (data.type === "agent_token") {
                currentText += data.token;
                setCouncilOutputs(prev =>
                  prev.map(out => (out.role === currentRole ? { ...out, text: currentText } : out))
                );
              }
            } catch (e) {}
          }
        }
      }
    } catch (e) {
      console.error("Council error:", e);
    } finally {
      setIsDebating(false);
    }
  };

  const handleVoiceQuery = async (query: string): Promise<string> => {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ text: query }],
        agentRole: activeRole
      })
    });
    const data = await res.json();
    return data.text || "Processed locally.";
  };

  return (
    <div className="flex h-screen w-screen bg-[#04060c] text-slate-100 overflow-hidden font-sans select-none">
      {/* Sovereign Sidebar */}
      <div className={`w-64 bg-[#070912] border-r border-slate-800/80 flex flex-col justify-between transition-all ${isSidebarOpen ? "block absolute inset-y-0 left-0 z-40" : "hidden md:flex"}`}>
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-2.5 px-1">
            <div className="p-2 rounded-xl bg-indigo-600/30 border border-indigo-400/40 text-indigo-300">
              <Shield className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white tracking-wider">CHATNVK v3.0</h1>
              <p className="text-[10px] font-mono text-slate-400">SOVEREIGN WORKSPACE</p>
            </div>
          </div>

          <button
            onClick={handleNewSession}
            className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-indigo-600/30"
          >
            <Plus className="w-4 h-4" /> New Session
          </button>

          {/* Quick Hub Navigation */}
          <div className="space-y-1 font-mono text-xs pt-2">
            <button
              onClick={() => setIsModelsOpen(true)}
              className="w-full p-2 rounded-lg hover:bg-slate-800/60 text-slate-300 hover:text-white flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-indigo-400" />
                <span>Models</span>
              </div>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-indigo-300 font-bold">GGUF</span>
            </button>

            <button
              onClick={() => setIsCouncilOpen(true)}
              className="w-full p-2 rounded-lg hover:bg-slate-800/60 text-slate-300 hover:text-white flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-400" />
                <span>Council</span>
              </div>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 font-bold">MULTI</span>
            </button>

            <button
              onClick={() => setIsMemoryOpen(true)}
              className="w-full p-2 rounded-lg hover:bg-slate-800/60 text-slate-300 hover:text-white flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-400" />
                <span>Memory Store</span>
              </div>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-emerald-300 font-bold">LOCAL</span>
            </button>

            <button
              onClick={() => setIsPermissionsOpen(true)}
              className="w-full p-2 rounded-lg hover:bg-slate-800/60 text-slate-300 hover:text-white flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-400" />
                <span>Tool Matrix</span>
              </div>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-amber-300 font-bold">DENY</span>
            </button>

            <button
              onClick={() => setIsSandboxOpen(true)}
              className="w-full p-2 rounded-lg hover:bg-slate-800/60 text-slate-300 hover:text-white flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-rose-400" />
                <span>Sandbox Shell</span>
              </div>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-rose-300 font-bold">ISOLATED</span>
            </button>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/40 text-[10px] font-mono text-slate-500 text-center">
          AI YOU OWN • 100% LOCAL
        </div>
      </div>

      {/* Main Workspace Feed */}
      <div className="flex-1 flex flex-col h-full bg-[#03050a] relative">
        {/* Top Bar */}
        <div className="p-3 border-b border-slate-800/80 bg-[#070914] flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1.5 rounded-lg bg-slate-800 md:hidden text-slate-300"
            >
              {isSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setIsModelsOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 transition-all font-mono text-xs text-slate-300 hover:text-white"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold text-slate-200">{activeModelId}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsVoiceOpen(true)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-cyan-300 hover:text-cyan-200 transition-all flex items-center gap-1.5 text-xs font-mono"
              title="Launch Sovereign Voice Call"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Voice Duplex</span>
            </button>

            <button
              onClick={() => setIsCouncilOpen(true)}
              className="p-2 rounded-xl bg-indigo-950 border border-indigo-500/40 text-indigo-300 hover:text-indigo-200 transition-all flex items-center gap-1.5 text-xs font-mono font-bold"
              title="Convene Council Chambers"
            >
              <Users className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Council</span>
            </button>
          </div>
        </div>

        {/* Role Selector Ribbon */}
        <AgentRoleSelector
          activeRole={activeRole}
          onSelectRole={(r) => setActiveRole(r)}
        />

        {/* Message Stream */}
        <MessageList
          messages={messages}
          isStreaming={isStreaming}
          activeModelName={activeModelId}
          onSelectPrompt={(p) => handleSend(p)}
        />

        {/* Composer */}
        <Composer
          input={input}
          setInput={setInput}
          onSend={() => handleSend()}
          isStreaming={isStreaming}
          onStop={handleStop}
          activeRole={activeRole}
          enableVerification={enableVerification}
          setEnableVerification={setEnableVerification}
        />
      </div>

      {/* Modals */}
      <CouncilPanel
        isOpen={isCouncilOpen}
        onClose={() => setIsCouncilOpen(false)}
        onRunCouncil={handleRunCouncil}
        isDebating={isDebating}
        councilOutputs={councilOutputs}
      />

      <VoiceHUD
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        activeRole={activeRole}
        onSendVoiceQuery={handleVoiceQuery}
      />

      <MemoryInspectorModal
        isOpen={isMemoryOpen}
        onClose={() => setIsMemoryOpen(false)}
      />

      <LocalModelManagerModal
        isOpen={isModelsOpen}
        onClose={() => setIsModelsOpen(false)}
        activeModelId={activeModelId}
        onSelectModel={(m) => setActiveModelId(m)}
      />

      <ToolPermissionsModal
        isOpen={isPermissionsOpen}
        onClose={() => setIsPermissionsOpen(false)}
      />

      <SandboxTerminalModal
        isOpen={isSandboxOpen}
        onClose={() => setIsSandboxOpen(false)}
      />
    </div>
  );
}
