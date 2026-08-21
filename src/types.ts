/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * CHATNVK v3.0 - SOVEREIGN INTELLIGENCE WORKSPACE TYPES
 */

export enum SenderType {
  USER = "USER",
  AI = "AI",
  SYSTEM = "SYSTEM",
  AGENT = "AGENT"
}

export enum MessageStatus {
  SENDING = "SENDING",
  SENT = "SENT",
  DELIVERED = "DELIVERED",
  READ = "READ",
  VERIFYING = "VERIFYING",
  ERROR = "ERROR"
}

export type AgentRoleType = 
  | "RESEARCHER" 
  | "ANALYST" 
  | "ENGINEER" 
  | "CRITIC" 
  | "PLANNER" 
  | "VERIFIER" 
  | "ARCHITECT" 
  | "SYNTHESIZER" 
  | "EXECUTOR";

export type CouncilMode = "SEQUENTIAL" | "PARALLEL" | "ADVERSARIAL";

export type MemoryClassType = 
  | "WORKING" 
  | "SESSION" 
  | "LONG_TERM" 
  | "KNOWLEDGE" 
  | "AGENT" 
  | "SYSTEM";

export type ToolPermission = 
  | "READ_FILES" 
  | "WRITE_FILES" 
  | "EXECUTE_CODE" 
  | "NETWORK_ACCESS" 
  | "BROWSER_ACCESS" 
  | "DATABASE_ACCESS" 
  | "SYSTEM_COMMANDS";

export interface ToolDefinition {
  id: string;
  name: string;
  description: string;
  requiredPermission: ToolPermission;
  isEnabled: boolean;
  parametersSchema?: any;
}

export interface ToolExecutionRecord {
  id: string;
  toolId: string;
  toolName: string;
  permission: ToolPermission;
  input: any;
  output: any;
  status: "pending" | "approved" | "denied" | "success" | "failed";
  timestamp: string;
  durationMs?: number;
}

export interface VerificationStep {
  step: "PLAN" | "EXECUTE" | "OBSERVE" | "CHECK" | "CRITIQUE" | "CORRECT" | "VERIFY" | "FINAL";
  status: "pending" | "running" | "passed" | "flagged";
  agentRole: AgentRoleType;
  details: string;
  timestamp: string;
}

export interface AuditTrailEvent {
  id: string;
  timestamp: string;
  eventType: 
    | "TASK_CREATED" 
    | "PLAN_CREATED" 
    | "AGENT_STARTED" 
    | "TOOL_REQUESTED" 
    | "TOOL_APPROVED" 
    | "TOOL_EXECUTED" 
    | "OBSERVATION_RECEIVED" 
    | "CRITIQUE_CREATED" 
    | "CORRECTION_APPLIED" 
    | "VERIFICATION_COMPLETED" 
    | "FINAL_RESPONSE" 
    | "MEMORY_UPDATED";
  agentRole?: AgentRoleType;
  payload: any;
  verificationPassed?: boolean;
}

export interface MemoryEntry {
  id: string;
  classType: MemoryClassType;
  key: string;
  value: string;
  confidence: number;
  createdAt: string;
  updatedAt: string;
  sourceSessionId?: string;
  tags?: string[];
}

export interface MediaContent {
  type: "image" | "document" | "link" | "voice";
  url?: string;
  name?: string;
  size?: string;
  previewText?: string;
  waveform?: number[];
  duration?: number;
  metadata?: {
    title?: string;
    description?: string;
    thumbnail?: string;
  };
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderType: SenderType;
  agentRole?: AgentRoleType;
  text: string;
  timestamp: string;
  status: MessageStatus;
  media?: MediaContent;
  isTranscript?: boolean;
  isThought?: boolean;
  thoughtContent?: string;
  chunks?: string[];
  verificationSteps?: VerificationStep[];
  toolExecutions?: ToolExecutionRecord[];
  modelUsed?: string;
  runtimeSpeedTokensPerSec?: number;
}

export interface AIPartner {
  id: string;
  name: string;
  title: string;
  role?: AgentRoleType;
  avatar: string;
  color: string;
  specialty: string;
  communicationStyle: string;
  goals: string;
  bio: string;
  greeting: string;
  systemInstruction: string;
}

export interface UserProfile {
  name: string;
  interests: string[];
  communicationStyle: string;
  goals: string[];
  scenarioAnswers: { [key: string]: string };
  isOnboarded: boolean;
}

export type ThemeType = "light" | "dark" | "amoled" | "cyberpunk" | "cozy-mint" | "glass";

export interface ChatSession {
  id: string;
  name: string;
  isGroup: boolean;
  avatar: string;
  partnerIds: string[];
  activeAgentRoles?: AgentRoleType[];
  councilMode?: CouncilMode;
  messages: Message[];
  theme: ThemeType;
  updatedAt?: string;
  isPinned?: boolean;
  tags?: string[];
}

export type ModelFormat = "GGUF" | "Safetensors" | "Ollama" | "WebGPU" | "LocalAI" | "Local-Daemon";

export interface LocalModelInfo {
  id: string;
  name: string;
  format: ModelFormat;
  quantization: string;
  contextWindow: string;
  parameterSize: string;
  vramRequiredGb: number;
  ramRequiredGb: number;
  filePath?: string;
  isLoaded: boolean;
  isDefault?: boolean;
  capabilities: {
    toolCalling: boolean;
    reasoning: boolean;
    vision: boolean;
    codeExecution: boolean;
  };
  inferenceSpeedTokensPerSec?: number;
}

export interface AIModelSpec {
  id: string;
  name: string;
  provider: "local" | "ollama" | "gguf" | "webgpu";
  description: string;
  contextWindow: string;
  badge?: string;
  isDefault?: boolean;
  requiresApiKey?: boolean;
  envKeyName?: string;
}

export interface RuntimeHealth {
  status: "ONLINE" | "OFFLINE" | "DEGRADED";
  engine: "node-llama-cpp" | "Ollama" | "WebGPU" | "Local-Sovereign-Core";
  activeModelId: string | null;
  loadedModelsCount: number;
  vramUsedMb: number;
  vramTotalMb: number;
  ramUsedMb: number;
  ramTotalMb: number;
  gpuAcceleration: boolean;
  offlineMode: boolean;
}

export interface CodeProjectFile {
  path: string;
  code: string;
  language?: string;
  isModified?: boolean;
}

export interface CodeProject {
  id: string;
  name: string;
  template: "react-express" | "nextjs-fullstack" | "webgl-quantum" | "cyber-dashboard" | "webgpu-neural";
  status: "researching" | "scaffolding" | "coding" | "testing" | "deployed";
  progress: number;
  files: CodeProjectFile[];
  deploymentUrl?: string;
  githubRepo?: {
    owner: string;
    repoName: string;
    branch: string;
    commitHash?: string;
    pushedAt?: string;
  };
}

export interface SandboxCommand {
  command: string;
  output: string;
  timestamp: string;
  status: "running" | "success" | "error";
  exitCode?: number;
  durationMs?: number;
}

export interface WideResearchNode {
  id: string;
  name: string;
  role: "planner" | "explorer" | "verifier" | "summarizer";
  status: "idle" | "active" | "completed" | "failed";
  progress: number;
  currentTask?: string;
  findings?: string[];
  sources?: {
    url: string;
    title: string;
    relevanceScore: number;
    contradictionFlag: boolean;
    retrievedAt: string;
  }[];
}
