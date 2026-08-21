/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { AgentRoleType } from "../../types";
import { AGENT_ROLES_METADATA } from "../../lib/sovereign-runtime";

interface AgentRoleSelectorProps {
  activeRole: AgentRoleType;
  onSelectRole: (role: AgentRoleType) => void;
}

export default function AgentRoleSelector({
  activeRole,
  onSelectRole
}: AgentRoleSelectorProps) {
  const roles: AgentRoleType[] = [
    "PLANNER",
    "RESEARCHER",
    "ANALYST",
    "ENGINEER",
    "CRITIC",
    "VERIFIER",
    "ARCHITECT",
    "SYNTHESIZER",
    "EXECUTOR"
  ];

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto p-2 bg-[#060810] border-b border-slate-800/80 scrollbar-none font-mono text-xs">
      <span className="text-[10px] text-slate-500 uppercase px-2 font-bold whitespace-nowrap">
        Agent Role:
      </span>

      {roles.map((role) => {
        const meta = AGENT_ROLES_METADATA[role];
        const isSelected = activeRole === role;

        return (
          <button
            key={role}
            onClick={() => onSelectRole(role)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all whitespace-nowrap border text-[11px] ${
              isSelected
                ? "bg-indigo-900/50 border-indigo-400 text-indigo-200 font-bold shadow-sm"
                : "bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
            }`}
            title={meta.focus}
          >
            <span>{meta.avatar}</span>
            <span>{role}</span>
          </button>
        );
      })}
    </div>
  );
}
