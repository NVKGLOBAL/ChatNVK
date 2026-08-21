/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * CHATNVK v3.0 - SOVEREIGN INTELLIGENCE RUNTIME
 * AI YOU OWN. NOT AI YOU RENT.
 */

import { 
  LocalModelInfo, 
  RuntimeHealth, 
  AgentRoleType, 
  CouncilMode, 
  VerificationStep, 
  AuditTrailEvent,
  ToolDefinition,
  ToolExecutionRecord,
  MemoryEntry,
  MemoryClassType
} from "../types";

export const DEFAULT_LOCAL_MODELS: LocalModelInfo[] = [
  {
    id: "llama-3.3-8b-instruct-q4",
    name: "Llama 3.3 8B Instruct (GGUF)",
    format: "GGUF",
    quantization: "Q4_K_M",
    contextWindow: "128k tokens",
    parameterSize: "8B",
    vramRequiredGb: 5.6,
    ramRequiredGb: 8.0,
    isLoaded: true,
    isDefault: true,
    capabilities: {
      toolCalling: true,
      reasoning: true,
      vision: false,
      codeExecution: true
    },
    inferenceSpeedTokensPerSec: 48.5
  },
  {
    id: "deepseek-r1-distill-qwen-14b-q4",
    name: "DeepSeek R1 Distill 14B (GGUF)",
    format: "GGUF",
    quantization: "Q4_K_M",
    contextWindow: "64k tokens",
    parameterSize: "14B",
    vramRequiredGb: 9.2,
    ramRequiredGb: 16.0,
    isLoaded: false,
    capabilities: {
      toolCalling: true,
      reasoning: true,
      vision: false,
      codeExecution: true
    },
    inferenceSpeedTokensPerSec: 32.1
  },
  {
    id: "qwen-2.5-coder-7b-q8",
    name: "Qwen 2.5 Coder 7B (GGUF)",
    format: "GGUF",
    quantization: "Q8_0",
    contextWindow: "128k tokens",
    parameterSize: "7B",
    vramRequiredGb: 8.0,
    ramRequiredGb: 12.0,
    isLoaded: false,
    capabilities: {
      toolCalling: true,
      reasoning: true,
      vision: false,
      codeExecution: true
    },
    inferenceSpeedTokensPerSec: 54.0
  },
  {
    id: "mistral-nemo-12b-instruct-q5",
    name: "Mistral NeMo 12B Instruct (GGUF)",
    format: "GGUF",
    quantization: "Q5_K_S",
    contextWindow: "128k tokens",
    parameterSize: "12B",
    vramRequiredGb: 8.5,
    ramRequiredGb: 14.0,
    isLoaded: false,
    capabilities: {
      toolCalling: true,
      reasoning: true,
      vision: false,
      codeExecution: false
    },
    inferenceSpeedTokensPerSec: 38.0
  },
  {
    id: "phi-4-14b-reasoning-q4",
    name: "Phi-4 14B High Reasoning (GGUF)",
    format: "GGUF",
    quantization: "Q4_K_M",
    contextWindow: "32k tokens",
    parameterSize: "14B",
    vramRequiredGb: 9.0,
    ramRequiredGb: 16.0,
    isLoaded: false,
    capabilities: {
      toolCalling: true,
      reasoning: true,
      vision: false,
      codeExecution: true
    },
    inferenceSpeedTokensPerSec: 34.2
  },
  {
    id: "webgpu-smollm2-in-browser",
    name: "WebGPU SmolLM2 1.7B (Zero-Server In-Browser)",
    format: "WebGPU",
    quantization: "Q4",
    contextWindow: "8k tokens",
    parameterSize: "1.7B",
    vramRequiredGb: 1.5,
    ramRequiredGb: 2.0,
    isLoaded: false,
    capabilities: {
      toolCalling: false,
      reasoning: false,
      vision: false,
      codeExecution: false
    },
    inferenceSpeedTokensPerSec: 26.0
  }
];

export const SYSTEM_TOOLS_REGISTRY: ToolDefinition[] = [
  {
    id: "tool-local-fs",
    name: "Local Filesystem Explorer",
    description: "Inspect, read, and write local files in the isolated workspace sandbox.",
    requiredPermission: "READ_FILES",
    isEnabled: true
  },
  {
    id: "tool-code-sandbox",
    name: "Sandboxed Code Execution Engine",
    description: "Execute Python, Node.js, and Bash code in an isolated sub-process with resource caps.",
    requiredPermission: "EXECUTE_CODE",
    isEnabled: true
  },
  {
    id: "tool-local-rag",
    name: "Local Vector Knowledge Index",
    description: "Perform local semantic retrieval on uploaded PDFs, TXT files, and notes.",
    requiredPermission: "READ_FILES",
    isEnabled: true
  },
  {
    id: "tool-web-search",
    name: "Sovereign Web Research Crawler",
    description: "Fetch web queries for facts while local model synthesizes analysis.",
    requiredPermission: "NETWORK_ACCESS",
    isEnabled: true
  },
  {
    id: "tool-sqlite-memory",
    name: "Persistent SQLite Memory Store",
    description: "Query and store user facts in user-controlled local database tables.",
    requiredPermission: "DATABASE_ACCESS",
    isEnabled: true
  }
];

export const AGENT_ROLES_METADATA: Record<AgentRoleType, {
  title: string;
  avatar: string;
  color: string;
  focus: string;
  defaultPrompt: string;
}> = {
  PLANNER: {
    title: "Chief Planner & Decomposer",
    avatar: "🧭",
    color: "#6366f1",
    focus: "Breaks user objectives into logical DAG task trees and verification checkpoints.",
    defaultPrompt: "You are the Chief Planner. Decompose the request into precise, actionable steps. Determine which tools and roles are required."
  },
  RESEARCHER: {
    title: "Sovereign Deep Researcher",
    avatar: "🔬",
    color: "#06b6d4",
    focus: "Gathers empirical data, local documents, and verified citations.",
    defaultPrompt: "You are the Deep Researcher. Find concrete evidence, cite sources, and isolate facts from assumptions."
  },
  ANALYST: {
    title: "Strategic Quantitative Analyst",
    avatar: "📊",
    color: "#3b82f6",
    focus: "Evaluates metrics, tradeoffs, numerical bounds, and structural data.",
    defaultPrompt: "You are the Strategic Analyst. Review data objectively, calculate bounds, and benchmark tradeoffs."
  },
  ENGINEER: {
    title: "Senior Software Engineer",
    avatar: "⚙️",
    color: "#10b981",
    focus: "Architects clean, type-safe, production-ready code with no simulated stubs.",
    defaultPrompt: "You are the Senior Engineer. Write clean, complete, executable code adhering to strict type safety and modular design."
  },
  CRITIC: {
    title: "Adversarial Logic Critic",
    avatar: "🛡️",
    color: "#f59e0b",
    focus: "Stress-tests hypotheses, identifies edge case bugs, and rejects logical fallacies.",
    defaultPrompt: "You are the Adversarial Critic. Rigorously critique the proposal, identify failure modes, and reject superficial assumptions."
  },
  VERIFIER: {
    title: "Falsification & Truth Verifier",
    avatar: "⚖️",
    color: "#ec4899",
    focus: "Executes 8-step verification loops to confirm evidence matches conclusions.",
    defaultPrompt: "You are the Truth Verifier. Cross-examine claims against sources, check logic consistency, and output verification status."
  },
  ARCHITECT: {
    title: "System & Domain Architect",
    avatar: "🏛️",
    color: "#8b5cf6",
    focus: "Maintains high-level cohesion, non-functional boundaries, and durability.",
    defaultPrompt: "You are the System Architect. Ensure modularity, clean domain boundaries, and compliance with sovereign architectural rules."
  },
  SYNTHESIZER: {
    title: "Master Consensus Synthesizer",
    avatar: "✨",
    color: "#14b8a6",
    focus: "Reconciles debates, merges council perspectives, and delivers the unified output.",
    defaultPrompt: "You are the Consensus Synthesizer. Distill multi-agent findings into a clear, unified, actionable, and verified conclusion."
  },
  EXECUTOR: {
    title: "Autonomous Action Executor",
    avatar: "🚀",
    color: "#f43f5e",
    focus: "Runs tools, sandbox scripts, and applies authorized modifications.",
    defaultPrompt: "You are the Action Executor. Carry out authorized tool operations cleanly with exact audit logging."
  }
};
