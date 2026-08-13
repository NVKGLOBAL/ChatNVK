/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum SenderType {
  USER = "USER",
  AI = "AI",
  SYSTEM = "SYSTEM"
}

export enum MessageStatus {
  SENDING = "SENDING",
  SENT = "SENT",
  DELIVERED = "DELIVERED",
  READ = "READ"
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
  text: string;
  timestamp: string;
  status: MessageStatus;
  media?: MediaContent;
  isTranscript?: boolean;
  isThought?: boolean;
  thoughtContent?: string;
  chunks?: string[]; // Split bursts
}

export interface AIPartner {
  id: string;
  name: string;
  title: string;
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
  messages: Message[];
  theme: ThemeType;
}

export interface WideResearchNode {
  id: string;
  name: string;
  role: "planner" | "explorer" | "verifier" | "summarizer";
  status: "idle" | "active" | "completed" | "failed";
  progress: number;
  currentTask?: string;
  findings?: string[];
}

export interface SandboxCommand {
  command: string;
  output: string;
  timestamp: string;
  status: "running" | "success" | "error";
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

export interface ArtifactItem {
  id: string;
  title: string;
  author: string;
  type: "dashboard" | "code" | "svg" | "document" | "app";
  desc: string;
  code?: string;
  htmlPreview?: string;
  files?: CodeProjectFile[];
  githubUrl?: string;
}

export type AIModelProvider = "google" | "openai" | "anthropic" | "deepseek" | "groq" | "ollama" | "local";

export interface AIModelSpec {
  id: string;
  name: string;
  provider: AIModelProvider;
  description: string;
  contextWindow: string;
  badge?: string;
  isDefault?: boolean;
  requiresApiKey?: boolean;
  envKeyName?: string;
}

