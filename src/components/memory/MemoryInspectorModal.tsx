/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Database, 
  Trash2, 
  Plus, 
  Download, 
  Search, 
  X, 
  ShieldCheck, 
  Check,
  HardDrive
} from "lucide-react";
import { MemoryEntry, MemoryClassType } from "../../types";

interface MemoryInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MemoryInspectorModal({
  isOpen,
  onClose
}: MemoryInspectorModalProps) {
  const [entries, setEntries] = useState<MemoryEntry[]>([]);
  const [filterClass, setFilterClass] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [newClass, setNewClass] = useState<MemoryClassType>("LONG_TERM");
  const [isAdding, setIsAdding] = useState(false);

  const fetchMemory = () => {
    fetch("/api/memory")
      .then(res => res.json())
      .then(data => setEntries(data.entries || []))
      .catch(err => console.error("Memory fetch failed:", err));
  };

  useEffect(() => {
    if (isOpen) fetchMemory();
  }, [isOpen]);

  const handleSaveEntry = async () => {
    if (!newKey.trim() || !newValue.trim()) return;
    await fetch("/api/memory/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        entry: { key: newKey.trim(), value: newValue.trim(), classType: newClass }
      })
    });
    setNewKey("");
    setNewValue("");
    setIsAdding(false);
    fetchMemory();
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/memory/${id}`, { method: "DELETE" });
    fetchMemory();
  };

  const handleClearAll = async () => {
    if (confirm("Are you sure you want to delete all persistent memory?")) {
      await fetch("/api/memory/clear", { method: "POST" });
      fetchMemory();
    }
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(entries, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chatnvk-memory-${Date.now()}.json`;
    a.click();
  };

  const filteredEntries = entries.filter(e => {
    const matchesClass = filterClass === "ALL" || e.classType === filterClass;
    const matchesSearch = e.key.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          e.value.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesClass && matchesSearch;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 font-sans">
      <div className="w-full max-w-4xl bg-[#090b16] border border-indigo-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                Sovereign Persistent Memory Inspector
                <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                  LOCAL ONLY
                </span>
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                Inspect, edit, delete, or export your local persistent memory facts
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExport}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono flex items-center gap-1.5"
              title="Export memory as JSON"
            >
              <Download className="w-3.5 h-3.5" /> Export
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="p-3 border-b border-slate-800 bg-slate-900/40 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 flex-1 max-w-sm">
            <div className="relative w-full">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search memory keys & values..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-slate-200 focus:outline-none focus:border-indigo-500 text-xs font-sans"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={filterClass}
              onChange={e => setFilterClass(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-300 text-xs focus:outline-none"
            >
              <option value="ALL">All Classes ({entries.length})</option>
              <option value="WORKING">Working Context</option>
              <option value="SESSION">Session</option>
              <option value="LONG_TERM">Long-Term Memory</option>
              <option value="KNOWLEDGE">Knowledge / RAG</option>
              <option value="SYSTEM">System Memory</option>
            </select>

            <button
              onClick={() => setIsAdding(!isAdding)}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold flex items-center gap-1 transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> Add Fact
            </button>

            <button
              onClick={handleClearAll}
              className="px-3 py-1.5 bg-rose-950/60 hover:bg-rose-900 border border-rose-500/40 text-rose-300 rounded-lg flex items-center gap-1 transition-all"
              title="Delete all persistent memory"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear All
            </button>
          </div>
        </div>

        {/* Add Entry Form (Collapsible) */}
        {isAdding && (
          <div className="p-4 bg-slate-900/90 border-b border-slate-800 space-y-3 font-mono text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="Key (e.g. preferred_framework)"
                value={newKey}
                onChange={e => setNewKey(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100 focus:outline-none"
              />
              <select
                value={newClass}
                onChange={e => setNewClass(e.target.value as any)}
                className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-300"
              >
                <option value="LONG_TERM">LONG_TERM</option>
                <option value="WORKING">WORKING</option>
                <option value="KNOWLEDGE">KNOWLEDGE</option>
              </select>
              <button
                onClick={handleSaveEntry}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg p-2 flex items-center justify-center gap-1"
              >
                <Check className="w-3.5 h-3.5" /> Save to Memory
              </button>
            </div>
            <textarea
              placeholder="Value (e.g. React 19, TypeScript strict mode, SQLite persistence)"
              value={newValue}
              onChange={e => setNewValue(e.target.value)}
              rows={2}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100 font-sans text-xs focus:outline-none"
            />
          </div>
        )}

        {/* Entries Table */}
        <div className="p-4 overflow-y-auto flex-1 space-y-2 font-mono text-xs">
          {filteredEntries.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              No memory records found. Add user facts or execute sessions to populate local memory.
            </div>
          ) : (
            filteredEntries.map(entry => (
              <div
                key={entry.id}
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 flex items-start justify-between gap-3 group transition-all"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-indigo-300 font-bold text-xs">{entry.key}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 uppercase">
                      {entry.classType}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {new Date(entry.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-slate-300 font-sans text-xs">{entry.value}</p>
                </div>

                <button
                  onClick={() => handleDelete(entry.id)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Delete memory entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-900/40 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Total Memory Records: {entries.length}</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> 100% User Sovereign & Encrypted
          </span>
        </div>
      </div>
    </div>
  );
}
