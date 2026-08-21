/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  ShieldAlert, 
  Lock, 
  Unlock, 
  Terminal, 
  FileText, 
  Globe, 
  Database, 
  Cpu, 
  Check, 
  X,
  ShieldCheck
} from "lucide-react";
import { ToolPermission } from "../../types";
import { SYSTEM_TOOLS_REGISTRY } from "../../lib/sovereign-runtime";

interface ToolPermissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ToolPermissionsModal({
  isOpen,
  onClose
}: ToolPermissionsModalProps) {
  const [permissions, setPermissions] = useState<Record<ToolPermission, boolean>>({
    READ_FILES: true,
    WRITE_FILES: true,
    EXECUTE_CODE: true,
    NETWORK_ACCESS: true,
    BROWSER_ACCESS: false,
    DATABASE_ACCESS: true,
    SYSTEM_COMMANDS: false
  });

  const togglePermission = (perm: ToolPermission) => {
    setPermissions(prev => ({ ...prev, [perm]: !prev[perm] }));
  };

  const permissionList: { key: ToolPermission; name: string; desc: string; icon: any; risk: "low" | "medium" | "high" }[] = [
    { key: "READ_FILES", name: "Read Local Files", desc: "Allow local model to read documents in the sandbox directory.", icon: FileText, risk: "low" },
    { key: "WRITE_FILES", name: "Write Local Files", desc: "Allow local model to create/modify project workspace files.", icon: FileText, risk: "medium" },
    { key: "EXECUTE_CODE", name: "Isolated Code Execution", desc: "Allow running sandboxed Python/JS code snippets with resource caps.", icon: Terminal, risk: "medium" },
    { key: "DATABASE_ACCESS", name: "SQLite Memory Tables", desc: "Allow reading and writing to user-owned persistent SQLite storage.", icon: Database, risk: "low" },
    { key: "NETWORK_ACCESS", name: "Web Tool Crawler", desc: "Allow tool to fetch external URLs for research (Intelligence stays local).", icon: Globe, risk: "medium" },
    { key: "SYSTEM_COMMANDS", name: "Host System Commands", desc: "Allow direct host bash commands outside the sandbox container.", icon: ShieldAlert, risk: "high" }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 font-sans">
      <div className="w-full max-w-2xl bg-[#090c18] border border-indigo-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                Sovereign Tool Permission Matrix
                <span className="text-[10px] font-mono bg-rose-950 text-rose-300 px-2 py-0.5 rounded border border-rose-500/30">
                  DENY BY DEFAULT
                </span>
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                Agents never receive unrestricted access. Explicit authorization required.
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

        {/* Permissions List */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1 font-mono text-xs">
          {permissionList.map(item => {
            const isGranted = permissions[item.key];
            const IconComp = item.icon;

            return (
              <div
                key={item.key}
                className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                  isGranted
                    ? "bg-slate-900/80 border-slate-700"
                    : "bg-slate-950/40 border-slate-800/80 opacity-75"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isGranted ? "bg-indigo-950 text-indigo-300" : "bg-slate-800 text-slate-500"}`}>
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-200">{item.name}</span>
                      <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                        item.risk === "high" ? "bg-rose-950 text-rose-300 border border-rose-500/30" :
                        item.risk === "medium" ? "bg-amber-950 text-amber-300 border border-amber-500/30" :
                        "bg-slate-800 text-slate-400"
                      }`}>
                        {item.risk} risk
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-sans mt-0.5">{item.desc}</p>
                  </div>
                </div>

                <button
                  onClick={() => togglePermission(item.key)}
                  className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all text-xs ${
                    isGranted
                      ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-400"
                  }`}
                >
                  {isGranted ? (
                    <>
                      <Unlock className="w-3.5 h-3.5" /> Granted
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" /> Denied
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/40 flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400">
            Active Registry: <strong className="text-indigo-300">{SYSTEM_TOOLS_REGISTRY.length} Tools Loaded</strong>
          </span>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/30"
          >
            Apply Matrix
          </button>
        </div>
      </div>
    </div>
  );
}
