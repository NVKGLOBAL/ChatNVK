/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Terminal as TerminalIcon, 
  Play, 
  Trash2, 
  X, 
  ShieldCheck, 
  Activity, 
  Clock, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";
import { SandboxCommand } from "../../types";

interface SandboxTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SandboxTerminalModal({
  isOpen,
  onClose
}: SandboxTerminalModalProps) {
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<SandboxCommand[]>([
    {
      command: "uname -a",
      output: "Linux sovereign-node 6.12.0-nvk-x86_64 Local-First Host",
      timestamp: new Date().toLocaleTimeString(),
      status: "success",
      exitCode: 0,
      durationMs: 4
    }
  ]);
  const [isRunning, setIsRunning] = useState(false);

  const handleRunCommand = async () => {
    if (!command.trim() || isRunning) return;

    const cmdText = command.trim();
    setIsRunning(true);

    try {
      const res = await fetch("/api/sandbox/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command: cmdText })
      });
      const data = await res.json();

      setHistory(prev => [
        ...prev,
        {
          command: cmdText,
          output: data.output || "Completed.",
          timestamp: new Date().toLocaleTimeString(),
          status: data.status === "error" ? "error" : "success",
          exitCode: data.exitCode,
          durationMs: data.durationMs
        }
      ]);
      setCommand("");
    } catch (err: any) {
      setHistory(prev => [
        ...prev,
        {
          command: cmdText,
          output: `Execution error: ${err.message}`,
          timestamp: new Date().toLocaleTimeString(),
          status: "error",
          exitCode: 1
        }
      ]);
    } finally {
      setIsRunning(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 font-sans">
      <div className="w-full max-w-3xl bg-[#080b14] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
              <TerminalIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                Isolated Sandbox Terminal
                <span className="text-[10px] font-mono bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
                  SECURE SUBPROCESS
                </span>
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                Resource capped at 512MB RAM, 1 vCPU, 8s timeout
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setHistory([])}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              title="Clear terminal history"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Output */}
        <div className="p-4 overflow-y-auto flex-1 font-mono text-xs space-y-3 bg-[#05070d]">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-slate-500 text-[10px]">
                <div className="flex items-center gap-1.5">
                  <span className="text-cyan-400 font-bold">$</span>
                  <span className="text-slate-200">{item.command}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.durationMs !== undefined && <span>{item.durationMs}ms</span>}
                  <span className={item.status === "error" ? "text-rose-400" : "text-emerald-400"}>
                    exit: {item.exitCode ?? 0}
                  </span>
                </div>
              </div>
              <pre className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300 whitespace-pre-wrap font-mono text-[11px]">
                {item.output}
              </pre>
            </div>
          ))}

          {isRunning && (
            <div className="flex items-center gap-2 text-cyan-400 text-xs py-2">
              <Activity className="w-3.5 h-3.5 animate-spin" />
              <span>Executing isolated process in sovereign sandbox...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-slate-800 bg-slate-900/80 font-mono text-xs flex gap-2">
          <span className="text-cyan-400 font-bold self-center pl-2">$</span>
          <input
            type="text"
            value={command}
            onChange={e => setCommand(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleRunCommand()}
            placeholder="Type sandbox command (e.g. ls, uname, python --version)..."
            className="flex-1 bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none text-xs"
          />
          <button
            onClick={handleRunCommand}
            disabled={!command.trim() || isRunning}
            className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white font-bold rounded-lg flex items-center gap-1"
          >
            <Play className="w-3.5 h-3.5" /> Run
          </button>
        </div>
      </div>
    </div>
  );
}
