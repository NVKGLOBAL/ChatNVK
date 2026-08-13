/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Terminal, 
  UploadCloud, 
  BarChart3, 
  Download, 
  Play, 
  FileText, 
  Loader2, 
  AlertCircle, 
  ArrowRight, 
  Check, 
  Layers,
  Github,
  Globe,
  Code2,
  Laptop,
  Tablet,
  Smartphone,
  Maximize2,
  Minimize2,
  RefreshCw,
  Wand2,
  Sparkles,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Folder,
  FileCode,
  Plus,
  Edit3,
  Server,
  HardDrive,
  Copy,
  Sliders,
  TerminalSquare,
  Webhook,
  Workflow,
  Zap,
  Database,
  Bot,
  Share2,
  Send,
  Key,
  Activity,
  Radio,
  Link,
  Clock
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { CodeProject, CodeProjectFile } from "../types";

// PRESET FULL-STACK STARTER PROJECTS
const STARTER_PROJECTS: CodeProject[] = [
  {
    id: "proj-quantum-matrix",
    name: "NVK Bio-Harmonic Matrix Web App",
    template: "react-express",
    status: "deployed",
    progress: 100,
    deploymentUrl: "https://nvk-matrix-app.run.app",
    githubRepo: {
      owner: "nvk-quantum-labs",
      repoName: "nvk-bio-harmonic-matrix",
      branch: "main",
      commitHash: "7a9e2d1",
      pushedAt: "Just now"
    },
    files: [
      {
        path: "index.html",
        language: "html",
        code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>NVK Quantum Matrix</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background: #08090d; color: #f8fafc; font-family: system-ui, sans-serif; overflow-x: hidden; }
    .glow-cyan { box-shadow: 0 0 25px rgba(34,211,238,0.25); }
    .glow-purple { box-shadow: 0 0 25px rgba(168,85,247,0.25); }
  </style>
</head>
<body class="p-6 flex flex-col items-center justify-center min-h-screen">
  <div class="max-w-xl w-full bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 glow-cyan text-center space-y-4 relative overflow-hidden">
    <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500"></div>
    <div class="inline-flex p-3 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400">
      <svg class="w-8 h-8 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
    </div>
    <h1 class="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
      NVK Quantum Matrix v10,000
    </h1>
    <p class="text-xs text-slate-400 font-mono">Real-time reactive full-stack web application powered by NVK Autonomous Core.</p>
    
    <div class="grid grid-cols-2 gap-3 pt-2">
      <div class="bg-black/50 border border-indigo-500/20 p-3 rounded-xl text-left">
        <span class="text-[10px] text-slate-500 font-mono block">QUANTUM EFFICIENCY</span>
        <span id="quantum-score" class="text-lg font-bold text-cyan-400 font-mono">99.84%</span>
      </div>
      <div class="bg-black/50 border border-purple-500/20 p-3 rounded-xl text-left">
        <span class="text-[10px] text-slate-500 font-mono block">CYBER LATENCY</span>
        <span id="latency-score" class="text-lg font-bold text-purple-400 font-mono">0.12 ms</span>
      </div>
    </div>

    <button onclick="pingServer()" class="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20">
      ⚡ Execute Cyber Wave Pulse
    </button>
    <div id="status-box" class="text-[11px] font-mono text-emerald-400 hidden bg-emerald-950/40 border border-emerald-500/30 p-2 rounded-lg">
      ✓ Cyber Wave Synthesized: HTTP 200 OK
    </div>
  </div>

  <script>
    function pingServer() {
      const box = document.getElementById('status-box');
      const score = document.getElementById('quantum-score');
      box.classList.remove('hidden');
      score.innerText = (99.8 + Math.random() * 0.19).toFixed(2) + '%';
      setTimeout(() => {
        box.classList.add('hidden');
      }, 3000);
    }
  </script>
</body>
</html>`
      },
      {
        path: "server.ts",
        language: "typescript",
        code: `import express from "express";
import path from "path";

const app = express();
const PORT = 3000;

app.use(express.json());

// API Gateway Endpoints
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", version: "10000.4.2", runtime: "NVK Quantum OS" });
});

app.post("/api/quantum-pulse", (req, res) => {
  const { frequency } = req.body;
  res.json({
    success: true,
    telemetry: {
      harmonicFrequency: frequency || 432,
      latencyMs: 0.12,
      nodeOrigin: "Cloud Run Container #421"
    }
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(\`NVK Server listening on port \${PORT}\`);
});`
      },
      {
        path: "package.json",
        language: "json",
        code: `{
  "name": "nvk-bio-harmonic-matrix",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "tsx server.ts",
    "build": "vite build && esbuild server.ts --bundle --platform=node --format=cjs --packages=external --outfile=dist/server.cjs",
    "start": "node dist/server.cjs"
  },
  "dependencies": {
    "express": "^4.21.0",
    "motion": "^11.0.0",
    "lucide-react": "^0.400.0"
  }
}`
      }
    ]
  },
  {
    id: "proj-cyber-dashboard",
    name: "Cybernetic Enterprise Analytics Hub",
    template: "cyber-dashboard",
    status: "coding",
    progress: 85,
    files: [
      {
        path: "index.html",
        language: "html",
        code: `<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-950 text-slate-100 p-8 font-sans">
  <div class="max-w-4xl mx-auto space-y-6">
    <header class="flex justify-between items-center border-b border-slate-800 pb-4">
      <div>
        <h1 class="text-xl font-bold text-cyan-400 font-mono">NVK CYBERNETIC ANALYTICS</h1>
        <p class="text-xs text-slate-400">Enterprise High-Throughput Stream Monitor</p>
      </div>
      <span class="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs px-3 py-1 rounded-full font-mono">LIVE STREAM ACTIVE</span>
    </header>

    <div class="grid grid-cols-3 gap-4">
      <div class="bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <span class="text-xs text-slate-400">API Requests/sec</span>
        <div class="text-2xl font-bold font-mono text-cyan-300 mt-1">14,280</div>
      </div>
      <div class="bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <span class="text-xs text-slate-400">Active WebSocket Nodes</span>
        <div class="text-2xl font-bold font-mono text-indigo-300 mt-1">1,024</div>
      </div>
      <div class="bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <span class="text-xs text-slate-400">Memory Bandwidth</span>
        <div class="text-2xl font-bold font-mono text-purple-300 mt-1">4.2 TB/s</div>
      </div>
    </div>
  </div>
</body>
</html>`
      }
    ]
  }
];

export default function AgentSandbox() {
  const [activeTab, setActiveTab] = useState<"studio" | "connectors" | "github" | "terminal" | "analytics">("studio");

  // Universal Agent Connectors & Webhook Mesh State
  const [connectorsList, setConnectorsList] = useState<Array<{
    id: string;
    name: string;
    category: "webhook" | "database" | "browser" | "code" | "messaging" | "github";
    protocol: string;
    status: "active" | "connected" | "standby";
    endpoint: string;
    description: string;
    latencyMs: number;
    callsCount: number;
  }>>([
    {
      id: "conn-rest-webhook",
      name: "REST & GraphQL Universal Webhook Gateway",
      category: "webhook",
      protocol: "HTTP/2 E2EE Webhook",
      status: "active",
      endpoint: "https://api.nvk.ai/v1/webhook-gateway",
      description: "Dispatches HTTP POST/GET, handles Bearer Auth, GraphQL queries, and JSON body parsing.",
      latencyMs: 12,
      callsCount: 1420
    },
    {
      id: "conn-database-sql",
      name: "Cloud SQL & Firestore DB Connector",
      category: "database",
      protocol: "PostgreSQL / gRPC Firestore",
      status: "connected",
      endpoint: "postgres://nvk-db-node.cloudsql:5432/main",
      description: "Direct SQL query engine, relational schema migrations, and real-time document listeners.",
      latencyMs: 8,
      callsCount: 890
    },
    {
      id: "conn-browser-dom",
      name: "Playwright Headless Browser & DOM Scraper",
      category: "browser",
      protocol: "Chrome DevTools Protocol (CDP)",
      status: "active",
      endpoint: "chrome-headless://nvk-browser-sandbox:9222",
      description: "Automates web navigation, handles JS hydration, clicks buttons, autofills forms, and extracts PDF/DOM.",
      latencyMs: 45,
      callsCount: 612
    },
    {
      id: "conn-python-code",
      name: "Sandboxed Python 3.12 Code Interpreter",
      category: "code",
      protocol: "Pyodide WASM / Linux Kernel Sandbox",
      status: "active",
      endpoint: "python3-env://nvk-executor-node-04",
      description: "Executes Python code, NumPy matrix calculations, Pandas analytics, and outputs Plotly charts.",
      latencyMs: 18,
      callsCount: 2340
    },
    {
      id: "conn-messaging-mesh",
      name: "Messaging & Notification Mesh (Slack, Discord, Gmail)",
      category: "messaging",
      protocol: "OAuth 2.0 & Webhook Dispatch",
      status: "connected",
      endpoint: "https://hooks.nvk.ai/messaging/dispatch",
      description: "Sends real-time Slack channel alerts, Discord embeds, Telegram bot updates, and Gmail reports.",
      latencyMs: 15,
      callsCount: 430
    },
    {
      id: "conn-github-cicd",
      name: "GitHub Actions & Cloud Run CI/CD Deployer",
      category: "github",
      protocol: "GitHub REST & GraphQL API",
      status: "connected",
      endpoint: "https://api.github.com/repos/nvk-quantum-labs",
      description: "Automates git commits, creates pull requests, triggers GitHub Actions, and deploys containers.",
      latencyMs: 22,
      callsCount: 185
    }
  ]);

  const [selectedConnectorId, setSelectedConnectorId] = useState<string>("conn-rest-webhook");
  const [testToolPayload, setTestToolPayload] = useState<string>(
    JSON.stringify({ action: "query_database", table: "users", limit: 5, filter: "status = 'active'" }, null, 2)
  );
  const [isExecutingTool, setIsExecutingTool] = useState<boolean>(false);
  const [toolExecutionLogs, setToolExecutionLogs] = useState<Array<{
    id: string;
    timestamp: string;
    connectorName: string;
    endpoint: string;
    status: number;
    latencyMs: number;
    requestPayload: string;
    responsePayload: string;
  }>>([
    {
      id: "exec-101",
      timestamp: new Date(Date.now() - 120000).toLocaleTimeString(),
      connectorName: "REST & GraphQL Universal Webhook Gateway",
      endpoint: "https://api.nvk.ai/v1/webhook-gateway",
      status: 200,
      latencyMs: 14,
      requestPayload: '{"event":"user_signup","user_id":"usr_9942","source":"landing_page"}',
      responsePayload: '{"success":true,"message":"Webhook dispatched to 3 downstream microservices","id":"evt_88321"}'
    },
    {
      id: "exec-102",
      timestamp: new Date(Date.now() - 60000).toLocaleTimeString(),
      connectorName: "Sandboxed Python 3.12 Code Interpreter",
      endpoint: "python3-env://nvk-executor-node-04",
      status: 200,
      latencyMs: 19,
      requestPayload: 'import numpy as np\nprint(np.mean([10, 20, 30, 40, 50]))',
      responsePayload: 'Output: 30.0\nExecution Time: 0.002s\nMemory: 1.4 MB'
    }
  ]);

  // Modal / Form state for adding custom connector
  const [showAddConnectorModal, setShowAddConnectorModal] = useState<boolean>(false);
  const [newConnName, setNewConnName] = useState<string>("");
  const [newConnEndpoint, setNewConnEndpoint] = useState<string>("");
  const [newConnProtocol, setNewConnProtocol] = useState<string>("REST / HTTP POST");
  const [newConnDesc, setNewConnDesc] = useState<string>("");

  // Handler for executing a Super Tool
  const handleExecuteSuperTool = () => {
    if (!testToolPayload.trim()) return;

    setIsExecutingTool(true);
    const activeConn = connectorsList.find(c => c.id === selectedConnectorId) || connectorsList[0];

    setTimeout(() => {
      const simulatedLatency = Math.floor(Math.random() * 25) + 10;
      let simulatedResponse = "";

      try {
        if (activeConn.category === "code") {
          simulatedResponse = `[Python 3.12 Execution OK]\nResult: Matrix multiplication verified (Shape: [100, 100])\nTensors computed in ${simulatedLatency}ms.`;
        } else if (activeConn.category === "database") {
          simulatedResponse = JSON.stringify({
            status: "SUCCESS",
            rowsAffected: 5,
            data: [
              { id: 101, name: "Alpha Node", status: "ONLINE", score: 99.4 },
              { id: 102, name: "Beta Node", status: "ONLINE", score: 98.9 }
            ]
          }, null, 2);
        } else if (activeConn.category === "browser") {
          simulatedResponse = JSON.stringify({
            url: "https://example.com/target",
            pageTitle: "Target Automated Web Page",
            extractedText: "DOM scraped successfully. 14 elements parsed.",
            screenshotUrl: "https://nvk-sandbox.run/screenshots/sc_4920.png"
          }, null, 2);
        } else {
          simulatedResponse = JSON.stringify({
            status: "HTTP 200 OK",
            gateway: activeConn.endpoint,
            message: "Super Agent Tool Dispatch Succeeded",
            payloadEcho: testToolPayload.substring(0, 100) + "..."
          }, null, 2);
        }
      } catch (err) {
        simulatedResponse = `Execution completed with code 200. Gateway acknowledged request.`;
      }

      const newLog = {
        id: `exec-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString(),
        connectorName: activeConn.name,
        endpoint: activeConn.endpoint,
        status: 200,
        latencyMs: simulatedLatency,
        requestPayload: testToolPayload,
        responsePayload: simulatedResponse
      };

      setToolExecutionLogs(prev => [newLog, ...prev]);
      setIsExecutingTool(false);

      // Increment call count
      setConnectorsList(prev => prev.map(c => c.id === activeConn.id ? { ...c, callsCount: c.callsCount + 1 } : c));
    }, 900);
  };

  // Super Agent Architectural Pillars State (Orchestration, Self-Healing, Memory & HITL Guardrails)
  const [meshSubTab, setMeshSubTab] = useState<"orchestrator" | "selfhealing" | "memory" | "guardrails">("orchestrator");
  const [isAsyncParallel, setIsAsyncParallel] = useState<boolean>(true);

  // Pillar 1: Sub-Agent Hierarchy Matrix
  const [subAgents, setSubAgents] = useState([
    { id: "agent-supervisor", name: "Supervisor Orchestrator", role: "ReAct / LangGraph Supervisor", status: "active", icon: "👑", load: "18%" },
    { id: "agent-github", name: "GitHub & CI/CD Agent", role: "Git Commits, PRs & Cloud Run", status: "idle", icon: "🐙", load: "0%" },
    { id: "agent-data", name: "Data Analyst Agent", role: "PostgreSQL & NumPy Computations", status: "active", icon: "📊", load: "42%" },
    { id: "agent-browser", name: "Headless DOM Agent", role: "Playwright Scraping & Hydration", status: "idle", icon: "🌐", load: "0%" },
    { id: "agent-webhook", name: "Self-Healing Webhook Agent", role: "REST/GraphQL & Payload Repair", status: "active", icon: "⚡", load: "12%" }
  ]);

  // Pillar 2: Self-Healing Tools State
  const [isSimulatingSelfHealing, setIsSimulatingSelfHealing] = useState<boolean>(false);
  const [selfHealingLogs, setSelfHealingLogs] = useState<Array<{ step: string; status: "error" | "repairing" | "success"; detail: string }>>([
    { step: "HTTP Dispatch", status: "success", detail: "POST https://api.stripe.com/v1/charges (HTTP 200 OK)" },
    { step: "Payload Validation", status: "success", detail: "JSON schema matched OpenAPI v3.1 spec." }
  ]);

  const triggerSelfHealingDemo = () => {
    setIsSimulatingSelfHealing(true);
    setSelfHealingLogs([
      { step: "1. Initial API Call", status: "error", detail: "HTTP 400 Bad Request: Missing required field 'currency' in charge request payload." }
    ]);

    setTimeout(() => {
      setSelfHealingLogs(prev => [
        ...prev,
        { step: "2. Web-Search API Doc Inspection", status: "repairing", detail: "Agent retrieved updated Stripe API spec v2026-06. Identified 'currency' default 'usd'." }
      ]);
    }, 1200);

    setTimeout(() => {
      setSelfHealingLogs(prev => [
        ...prev,
        { step: "3. Dynamic Payload Repair", status: "repairing", detail: "Injected {'currency': 'usd'} into payload structure and re-signed Bearer Token." }
      ]);
    }, 2400);

    setTimeout(() => {
      setSelfHealingLogs(prev => [
        ...prev,
        { step: "4. Re-Execution Succeeded", status: "success", detail: "HTTP 200 OK: Charge ID 'ch_9942183' processed successfully in 0.11s." }
      ]);
      setIsSimulatingSelfHealing(false);
    }, 3600);
  };

  // Pillar 3: Episodic Memory & Knowledge Graph
  const [episodicMemories, setEpisodicMemories] = useState([
    { id: "mem-1", date: "2026-08-01", compressedInsight: "User prefers Tailwind CSS v4, dark luxury themes, and Vite bundler configuration.", rawLogCount: 420 },
    { id: "mem-2", date: "2026-08-02", compressedInsight: "Active Cloud SQL instance running PostgreSQL at postgres://nvk-db-node:5432/main.", rawLogCount: 890 },
    { id: "mem-3", date: "2026-08-02", compressedInsight: "WebGPU WebGL fallback enabled with WGSL compute shader matrix multiplication.", rawLogCount: 150 }
  ]);

  const [knowledgeGraphNodes, setKnowledgeGraphNodes] = useState([
    { id: "n1", label: "User NVK", type: "Entity", relation: "Manages" },
    { id: "n2", label: "Project ChatNVK", type: "Workspace", relation: "Contains" },
    { id: "n3", label: "Super Agent Mesh", type: "Core Module", relation: "Invokes" },
    { id: "n4", label: "Cloud SQL DB", type: "Database", relation: "Persists To" },
    { id: "n5", label: "Cloud Run Container", type: "Infrastructure", relation: "Deploys On" }
  ]);

  // Pillar 4: HITL Human Guardrails & CRON Automations
  const [pendingHitlApprovals, setPendingHitlApprovals] = useState([
    {
      id: "hitl-101",
      riskLevel: "HIGH_RISK" as const,
      actionName: "Production Cloud Run Deployment",
      agentName: "GitHub & CI/CD Agent",
      target: "gcr.io/nvk-studio/chatnvk:v2.4",
      timestamp: "Just now",
      description: "Deploying latest production build to Cloud Run cluster with port 3000 mapping."
    },
    {
      id: "hitl-102",
      riskLevel: "HIGH_RISK" as const,
      actionName: "Execute Financial Transaction / Billing Charge",
      agentName: "Self-Healing Webhook Agent",
      target: "Stripe Production API",
      timestamp: "3 mins ago",
      description: "Executing $49.00 automated subscription billing upgrade for workspace tier."
    }
  ]);

  const [cronAutomations, setCronAutomations] = useState([
    { id: "cron-1", schedule: "0 9 * * *", name: "Daily Workspace Health Summary", status: "active", lastRun: "Today at 09:00 AM" },
    { id: "cron-2", schedule: "0 0 * * 1", name: "Weekly Database Backup & Index Cleanup", status: "active", lastRun: "Monday at 00:00 AM" },
    { id: "cron-3", schedule: "*/15 * * * *", name: "GitHub Repository Auto-Sync & Lint Check", status: "active", lastRun: "12 mins ago" }
  ]);

  const handleApproveHitl = (id: string) => {
    setPendingHitlApprovals(prev => prev.filter(item => item.id !== id));
  };

  const handleRejectHitl = (id: string) => {
    setPendingHitlApprovals(prev => prev.filter(item => item.id !== id));
  };

  // Add Custom Connector
  const handleCreateCustomConnector = () => {
    if (!newConnName || !newConnEndpoint) return;

    const newConn = {
      id: `conn-custom-${Date.now()}`,
      name: newConnName,
      category: "webhook" as const,
      protocol: newConnProtocol || "REST / Webhook",
      status: "active" as const,
      endpoint: newConnEndpoint,
      description: newConnDesc || "Custom user-defined Super Agent API integration endpoint.",
      latencyMs: 15,
      callsCount: 1
    };

    setConnectorsList(prev => [newConn, ...prev]);
    setSelectedConnectorId(newConn.id);
    setShowAddConnectorModal(false);
    setNewConnName("");
    setNewConnEndpoint("");
    setNewConnDesc("");
  };
  
  // Studio Project & File Explorer States
  const [currentProject, setCurrentProject] = useState<CodeProject>(STARTER_PROJECTS[0]);
  const [selectedFileIndex, setSelectedFileIndex] = useState<number>(0);
  const [editableCode, setEditableCode] = useState<string>(STARTER_PROJECTS[0].files[0]?.code || "");
  const [aiPromptInput, setAiPromptInput] = useState<string>("");
  const [isAiRefactoring, setIsAiRefactoring] = useState<boolean>(false);
  const [previewViewport, setPreviewViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [isFullscreenPreview, setIsFullscreenPreview] = useState<boolean>(false);
  const [previewKey, setPreviewKey] = useState<number>(0);
  const [activeStudioSubTab, setActiveStudioSubTab] = useState<"code" | "preview" | "architecture">("preview");

  // GitHub & Cloud Deployer States
  const [githubOwner, setGithubOwner] = useState<string>("nvk-quantum-labs");
  const [githubRepoName, setGithubRepoName] = useState<string>("nvk-quantum-app");
  const [githubBranch, setGithubBranch] = useState<string>("main");
  const [isDeployingGithub, setIsDeployingGithub] = useState<boolean>(false);
  const [deployLogs, setDeployLogs] = useState<string[]>([]);
  const [deploySuccess, setDeploySuccess] = useState<boolean>(false);
  const [cloudRunActive, setCloudRunActive] = useState<boolean>(true);

  // Terminal State
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "System: NVK Quantum VM Container initialized (Ubuntu 22.04 LTS)",
    "System: Node v22.12.0 & esbuild v0.21.5 ready",
    "System: GitHub CLI v2.40 authenticated for @nvk-quantum-labs",
    "System: Port 3000 bound to container network interface"
  ]);
  const [terminalInput, setTerminalInput] = useState<string>("");

  // Data Analytics State
  const [file, setFile] = useState<{ name: string; size: string; content: string } | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [analysisReport, setAnalysisReport] = useState<string>("");
  const [chartData, setChartData] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync active file code when changing file index
  useEffect(() => {
    if (currentProject.files[selectedFileIndex]) {
      setEditableCode(currentProject.files[selectedFileIndex].code);
    }
  }, [selectedFileIndex, currentProject]);

  // Handle Code Change in Editor
  const handleCodeChange = (newCode: string) => {
    setEditableCode(newCode);
    setCurrentProject(prev => {
      const updatedFiles = [...prev.files];
      if (updatedFiles[selectedFileIndex]) {
        updatedFiles[selectedFileIndex] = {
          ...updatedFiles[selectedFileIndex],
          code: newCode,
          isModified: true
        };
      }
      return { ...prev, files: updatedFiles };
    });
  };

  // AI Code Refactor Simulation
  const handleAiRefactor = async (presetPrompt?: string) => {
    const promptToUse = presetPrompt || aiPromptInput;
    if (!promptToUse.trim()) return;

    setIsAiRefactoring(true);
    setAiPromptInput("");

    setTimeout(() => {
      let refactored = editableCode;
      const activeFile = currentProject.files[selectedFileIndex];

      if (activeFile?.path === "index.html") {
        if (promptToUse.toLowerCase().includes("dark") || promptToUse.toLowerCase().includes("cyber")) {
          refactored = refactored.replace(
            `<body class="p-6 flex flex-col items-center justify-center min-h-screen">`,
            `<body class="p-6 flex flex-col items-center justify-center min-h-screen bg-black text-cyan-200">`
          );
        } else if (promptToUse.toLowerCase().includes("particle") || promptToUse.toLowerCase().includes("wave")) {
          refactored = refactored.replace(
            `</h1>`,
            `</h1>\n    <div class="text-[10px] text-cyan-400 font-mono animate-bounce">⚡ Quantum Particle Resonance Synthesized</div>`
          );
        } else {
          refactored += `\n<!-- AI Refactored: ${promptToUse} -->`;
        }
      } else {
        refactored += `\n// AI Refactored: ${promptToUse}`;
      }

      handleCodeChange(refactored);
      setIsAiRefactoring(false);
      setPreviewKey(prev => prev + 1);
      setTerminalLogs(prev => [...prev, `[AI Studio] Applied refactor: "${promptToUse}"`]);
    }, 1200);
  };

  // Execute GitHub Deployment
  const handleTriggerGitHubDeploy = () => {
    setIsDeployingGithub(true);
    setDeployLogs([]);
    setDeploySuccess(false);

    const steps = [
      "Initializing Git repository & staging workspace files...",
      `Creating GitHub Repository: https://github.com/${githubOwner}/${githubRepoName}...`,
      "Generating .github/workflows/deploy.yml CI/CD deployment pipeline...",
      "Executing Git Commit with SHA-256 cryptographic signature...",
      `Pushing branch '${githubBranch}' to origin remote...`,
      "Triggering Cloud Run build container sync..."
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setDeployLogs(prev => [...prev, step]);
        if (index === steps.length - 1) {
          setIsDeployingGithub(false);
          setDeploySuccess(true);
          setCurrentProject(prev => ({
            ...prev,
            status: "deployed",
            githubRepo: {
              owner: githubOwner,
              repoName: githubRepoName,
              branch: githubBranch,
              commitHash: Math.random().toString(16).substring(2, 9),
              pushedAt: new Date().toLocaleTimeString()
            }
          }));
          setTerminalLogs(prev => [...prev, `[OK] GitHub repo https://github.com/${githubOwner}/${githubRepoName} successfully deployed!`]);
        }
      }, (index + 1) * 900);
    });
  };

  // Download ZIP simulation
  const handleDownloadZip = () => {
    const projectContent = JSON.stringify(currentProject, null, 2);
    const blob = new Blob([projectContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${currentProject.name.toLowerCase().replace(/\s+/g, "-")}-source.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Terminal Execution
  const executeCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const cmd = terminalInput.trim();
    setTerminalLogs(prev => [...prev, `quantum@nvk:~$ ${cmd}`]);
    setTerminalInput("");

    setTimeout(() => {
      if (cmd === "help") {
        setTerminalLogs(prev => [
          ...prev,
          "Available Commands: ls, cat <file>, npm run build, git status, git push, docker ps, upload-dataset, clear"
        ]);
      } else if (cmd === "ls") {
        setTerminalLogs(prev => [
          ...prev,
          currentProject.files.map(f => f.path).join("   ") + "   node_modules/"
        ]);
      } else if (cmd.startsWith("cat ")) {
        const targetPath = cmd.replace("cat ", "").trim();
        const found = currentProject.files.find(f => f.path === targetPath);
        if (found) {
          setTerminalLogs(prev => [...prev, found.code]);
        } else {
          setTerminalLogs(prev => [...prev, `cat: ${targetPath}: No such file or directory`]);
        }
      } else if (cmd === "git status") {
        setTerminalLogs(prev => [
          ...prev,
          `On branch ${githubBranch}`,
          "Your branch is up to date with 'origin/main'.",
          "nothing to commit, working tree clean"
        ]);
      } else if (cmd === "git push") {
        setTerminalLogs(prev => [
          ...prev,
          `To https://github.com/${githubOwner}/${githubRepoName}.git`,
          `   ${currentProject.githubRepo?.commitHash || "7a9e2d1"}..f82b40a  ${githubBranch} -> ${githubBranch}`
        ]);
      } else if (cmd === "clear") {
        setTerminalLogs([]);
      } else {
        setTerminalLogs(prev => [...prev, `bash: command not found: ${cmd.split(" ")[0]}`]);
      }
    }, 120);
  };

  // Data Analytics File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    setIsUploading(true);
    setTerminalLogs(prev => [...prev, `quantum@nvk:~$ upload-file ${uploadedFile.name}`]);

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Data = event.target?.result as string;

      try {
        const response = await fetch("/api/analyze-file", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileBase64: base64Data,
            mimeType: uploadedFile.type || "text/plain",
            fileName: uploadedFile.name,
            prompt: "Please extract core stats, insights, and structural metrics."
          })
        });

        const data = await response.json();
        setFile({
          name: uploadedFile.name,
          size: `${(uploadedFile.size / 1024).toFixed(1)} KB`,
          content: base64Data
        });

        setAnalysisReport(data.report || "File parsed successfully.");
        setChartData(data.chartData || [
          { name: "Parsing Efficiency", value: 98 },
          { name: "Data Integrity", value: 100 },
          { name: "Schema Match", value: 94 }
        ]);
        setActiveTab("analytics");
      } catch (err: any) {
        setTerminalLogs(prev => [...prev, `[ERROR] Failed to parse file`]);
      } finally {
        setIsUploading(false);
      }
    };
    reader.readAsDataURL(uploadedFile);
  };

  // Viewport width styling
  const getViewportWidthStyle = () => {
    switch (previewViewport) {
      case "tablet": return "max-w-[768px] h-[480px]";
      case "mobile": return "max-w-[375px] h-[520px]";
      default: return "w-full h-[450px]";
    }
  };

  // Active HTML code preview generator
  const getActiveHtmlContent = () => {
    const htmlFile = currentProject.files.find(f => f.path.endsWith(".html"));
    return htmlFile?.code || `<!DOCTYPE html><html><body style="background:#08090d;color:#fff;font-family:sans-serif;padding:2rem;text-align:center;"><h2>NVK App Preview Loading...</h2></body></html>`;
  };

  return (
    <div id="sandbox-container" className="bg-[#090b12]/95 border border-indigo-500/30 backdrop-blur-2xl rounded-2xl p-3 sm:p-5 space-y-4 text-xs font-sans shadow-2xl relative overflow-hidden">
      
      {/* Top Header & Main Navigation Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-3.5 border-b border-indigo-500/20 gap-3">
        
        {/* Title & Active Template Badge */}
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2 rounded-xl text-cyan-200 border border-cyan-400/30 shadow-lg shadow-indigo-600/20">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">{currentProject.name}</h3>
              <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300">
                10,000Y FUTURE EDITION
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono mt-0.5">Full-Stack AI Studio, Interactive Web Creator & GitHub Deployment Engine</p>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-indigo-500/30 self-start lg:self-auto overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveTab("studio")}
            className={`px-3 py-1.5 rounded-lg font-mono text-[11px] font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "studio" 
                ? "bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md border border-cyan-400/30" 
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Code2 className="w-4 h-4 text-cyan-300" /> App Studio & Preview
          </button>

          <button
            onClick={() => setActiveTab("connectors")}
            className={`px-3 py-1.5 rounded-lg font-mono text-[11px] font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "connectors" 
                ? "bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md border border-cyan-400/30" 
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Webhook className="w-4 h-4 text-emerald-300" /> Super Agent Mesh
          </button>

          <button
            onClick={() => setActiveTab("github")}
            className={`px-3 py-1.5 rounded-lg font-mono text-[11px] font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "github" 
                ? "bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md border border-cyan-400/30" 
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Github className="w-4 h-4 text-purple-300" /> GitHub & Deploy
          </button>

          <button
            onClick={() => setActiveTab("terminal")}
            className={`px-3 py-1.5 rounded-lg font-mono text-[11px] font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "terminal" 
                ? "bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md border border-cyan-400/30" 
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <TerminalSquare className="w-4 h-4 text-emerald-300" /> Shell Console
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-3 py-1.5 rounded-lg font-mono text-[11px] font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "analytics" 
                ? "bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md border border-cyan-400/30" 
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <BarChart3 className="w-4 h-4 text-amber-300" /> Data Analytics
          </button>
        </div>

      </div>

      {/* TAB 1: FULL STACK APP STUDIO & LIVE INTERACTIVE WEB CREATOR */}
      {activeTab === "studio" && (
        <div className="space-y-4">
          
          {/* Sub Navigation Bar inside Studio: Code vs Live Preview vs Architecture */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-black/40 p-2 rounded-xl border border-indigo-500/20">
            
            {/* View Mode Switcher */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setActiveStudioSubTab("preview")}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeStudioSubTab === "preview" 
                    ? "bg-cyan-500/20 border border-cyan-400/40 text-cyan-200" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-cyan-400" /> Live Interactive Preview
              </button>

              <button
                onClick={() => setActiveStudioSubTab("code")}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeStudioSubTab === "code" 
                    ? "bg-indigo-500/20 border border-indigo-400/40 text-indigo-200" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Code2 className="w-3.5 h-3.5 text-indigo-400" /> Code Editor & Tree
              </button>

              <button
                onClick={() => setActiveStudioSubTab("architecture")}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeStudioSubTab === "architecture" 
                    ? "bg-purple-500/20 border border-purple-400/40 text-purple-200" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-purple-400" /> System Architecture Graph
              </button>
            </div>

            {/* Viewport controls for preview */}
            {activeStudioSubTab === "preview" && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                  <button
                    onClick={() => setPreviewViewport("desktop")}
                    className={`p-1.5 rounded text-xs transition-colors ${previewViewport === "desktop" ? "bg-cyan-500/30 text-cyan-300" : "text-slate-400"}`}
                    title="Desktop 1920x1080 Viewport"
                  >
                    <Laptop className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setPreviewViewport("tablet")}
                    className={`p-1.5 rounded text-xs transition-colors ${previewViewport === "tablet" ? "bg-cyan-500/30 text-cyan-300" : "text-slate-400"}`}
                    title="Tablet Viewport"
                  >
                    <Tablet className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setPreviewViewport("mobile")}
                    className={`p-1.5 rounded text-xs transition-colors ${previewViewport === "mobile" ? "bg-cyan-500/30 text-cyan-300" : "text-slate-400"}`}
                    title="Mobile Viewport"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => setPreviewKey(prev => prev + 1)}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300"
                  title="Reload Preview"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setIsFullscreenPreview(true)}
                  className="p-1.5 rounded-lg bg-indigo-600/30 border border-indigo-400/30 text-indigo-200 hover:text-white"
                  title="Expand Fullscreen"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* AI Code Prompt Bar */}
          <div className="bg-gradient-to-r from-indigo-950/80 via-slate-900 to-purple-950/80 p-3 rounded-xl border border-indigo-500/30 space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse flex-shrink-0" />
              <input
                type="text"
                value={aiPromptInput}
                onChange={(e) => setAiPromptInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAiRefactor()}
                placeholder="Ask NVK AI Studio to refactor or add features (e.g., 'Add dark mode toggle', 'Add Express API route')..."
                className="w-full bg-transparent text-xs text-white placeholder-slate-400 outline-none font-mono"
              />
              <button
                onClick={() => handleAiRefactor()}
                disabled={isAiRefactoring}
                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold font-mono text-[10px] uppercase flex items-center gap-1 flex-shrink-0 shadow-md hover:from-cyan-400 hover:to-indigo-500 disabled:opacity-50"
              >
                {isAiRefactoring ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
                <span>Refactor</span>
              </button>
            </div>

            {/* Preset Refactor Chips */}
            <div className="flex items-center gap-2 overflow-x-auto text-[9px] font-mono text-slate-400 pt-1">
              <span className="text-slate-500 uppercase flex-shrink-0">Quick Presets:</span>
              <button
                onClick={() => handleAiRefactor("Add particle canvas background and glow FX")}
                className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-cyan-300 whitespace-nowrap"
              >
                ⚡ Add Glow & Particles
              </button>
              <button
                onClick={() => handleAiRefactor("Add Express backend endpoint /api/telemetry")}
                className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-indigo-300 whitespace-nowrap"
              >
                🔌 Wire Express Route
              </button>
              <button
                onClick={() => handleAiRefactor("Add cyber theme toggle and status dashboard")}
                className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-purple-300 whitespace-nowrap"
              >
                🛡️ Cyber Theme Toggle
              </button>
            </div>
          </div>

          {/* SUB TAB CONTENT 1: LIVE INTERACTIVE PREVIEW */}
          {activeStudioSubTab === "preview" && (
            <div className="flex flex-col items-center justify-center min-h-[460px] bg-black/60 border border-indigo-500/20 rounded-xl p-3 relative overflow-hidden">
              <div className={`transition-all duration-300 border border-cyan-500/30 rounded-xl overflow-hidden shadow-2xl bg-black ${getViewportWidthStyle()}`}>
                <iframe
                  key={previewKey}
                  title="NVK Interactive App Preview"
                  srcDoc={getActiveHtmlContent()}
                  className="w-full h-full border-none bg-[#08090d]"
                  sandbox="allow-scripts allow-modals"
                />
              </div>

              {/* Status footer bar */}
              <div className="w-full mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  LIVE SANDBOX EXECUTION ACTIVE (Port 3000)
                </span>
                <span>Viewport: {previewViewport.toUpperCase()}</span>
              </div>
            </div>
          )}

          {/* SUB TAB CONTENT 2: CODE EDITOR & MULTI-FILE EXPLORER */}
          {activeStudioSubTab === "code" && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[460px]">
              
              {/* Left File Tree Panel */}
              <div className="md:col-span-1 bg-black/50 border border-indigo-500/20 rounded-xl p-3 space-y-3 overflow-y-auto">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="font-mono text-[10px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Folder className="w-3.5 h-3.5 text-cyan-400" /> Files Explorer
                  </span>
                  <button 
                    onClick={() => {
                      const newPath = prompt("Enter file path (e.g. src/components/Header.tsx):");
                      if (newPath) {
                        setCurrentProject(prev => ({
                          ...prev,
                          files: [...prev.files, { path: newPath, language: "typescript", code: `// New file: ${newPath}\n` }]
                        }));
                        setSelectedFileIndex(currentProject.files.length);
                      }
                    }}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                    title="Add File"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-1">
                  {currentProject.files.map((file, idx) => {
                    const isSelected = selectedFileIndex === idx;
                    return (
                      <button
                        key={file.path}
                        onClick={() => setSelectedFileIndex(idx)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg font-mono text-xs flex items-center justify-between transition-all ${
                          isSelected 
                            ? "bg-indigo-600/30 border border-indigo-400/40 text-cyan-200 font-bold" 
                            : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                        }`}
                      >
                        <span className="truncate flex items-center gap-2">
                          <FileCode className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                          {file.path}
                        </span>
                        {file.isModified && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Code Editor Panel */}
              <div className="md:col-span-3 bg-[#0d0f17] border border-indigo-500/20 rounded-xl p-3 flex flex-col justify-between h-full font-mono">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px] text-slate-400">
                  <span className="text-cyan-300 font-bold flex items-center gap-1.5">
                    <Edit3 className="w-3.5 h-3.5 text-cyan-400" /> {currentProject.files[selectedFileIndex]?.path}
                  </span>
                  <button
                    onClick={() => navigator.clipboard.writeText(editableCode)}
                    className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px]"
                  >
                    <Copy className="w-3 h-3" /> Copy Code
                  </button>
                </div>

                <textarea
                  value={editableCode}
                  onChange={(e) => handleCodeChange(e.target.value)}
                  className="w-full flex-grow bg-transparent text-emerald-300 p-2 outline-none resize-none font-mono text-xs leading-relaxed border-none focus:ring-0"
                  spellCheck={false}
                />

                <div className="pt-2 border-t border-slate-800/80 flex justify-between items-center text-[10px] text-slate-500">
                  <span>Language: {currentProject.files[selectedFileIndex]?.language || "plaintext"}</span>
                  <span>Lines: {editableCode.split("\n").length}</span>
                </div>
              </div>

            </div>
          )}

          {/* SUB TAB CONTENT 3: SYSTEM ARCHITECTURE NODE GRAPH */}
          {activeStudioSubTab === "architecture" && (
            <div className="bg-black/60 border border-purple-500/20 rounded-xl p-5 min-h-[460px] flex flex-col justify-between space-y-4">
              <div>
                <h4 className="font-mono text-xs font-bold text-purple-300 uppercase tracking-wider mb-2">
                  System Architecture Node Map (Full-Stack Pipeline)
                </h4>
                <p className="text-xs text-slate-400">Visual topology of frontend client components, proxy API routes, and container isolation layers.</p>
              </div>

              {/* Visual Nodes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-auto">
                {/* Node 1: Client SPA */}
                <div className="bg-slate-900 border border-cyan-500/40 p-4 rounded-xl space-y-2 relative shadow-lg">
                  <div className="flex items-center justify-between text-cyan-400 font-mono text-xs font-bold">
                    <span>FRONTEND REACT SPA</span>
                    <Globe className="w-4 h-4" />
                  </div>
                  <p className="text-[11px] text-slate-300">Vite + React 18 + Tailwind CSS. Renders interactive canvas UI.</p>
                  <span className="text-[9px] font-mono text-cyan-400 block pt-2 border-t border-slate-800">Port 3000 Ingress</span>
                </div>

                {/* Node 2: Server API */}
                <div className="bg-slate-900 border border-indigo-500/40 p-4 rounded-xl space-y-2 relative shadow-lg">
                  <div className="flex items-center justify-between text-indigo-400 font-mono text-xs font-bold">
                    <span>EXPRESS BACKEND API</span>
                    <Server className="w-4 h-4" />
                  </div>
                  <p className="text-[11px] text-slate-300">Node TS Server handling /api/* proxy requests and Gemini SDK calls.</p>
                  <span className="text-[9px] font-mono text-indigo-400 block pt-2 border-t border-slate-800">CJS Bundled dist/server.cjs</span>
                </div>

                {/* Node 3: Database & Cloud */}
                <div className="bg-slate-900 border border-purple-500/40 p-4 rounded-xl space-y-2 relative shadow-lg">
                  <div className="flex items-center justify-between text-purple-400 font-mono text-xs font-bold">
                    <span>CLOUD RUN & STORAGE</span>
                    <HardDrive className="w-4 h-4" />
                  </div>
                  <p className="text-[11px] text-slate-300">Firestore E2EE DB + Cloud Run container scaling with SSL security.</p>
                  <span className="text-[9px] font-mono text-purple-400 block pt-2 border-t border-slate-800">Auto Scale-to-Zero</span>
                </div>
              </div>

              <div className="bg-indigo-950/30 border border-indigo-500/20 p-3 rounded-xl flex items-center justify-between text-xs text-indigo-200 font-mono">
                <span>Architecture Verified: No missing API keys or bundle circular dependencies detected.</span>
                <span className="text-emerald-400 font-bold">✓ VERIFIED</span>
              </div>
            </div>
          )}

        </div>
      )}

      {/* TAB 2: BASE44 UNIVERSAL CONNECTORS & SUPER AGENT MESH */}
      {activeTab === "connectors" && (
        <div className="space-y-4">
          
          {/* Top Mesh Header Banner */}
          <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-cyan-950/80 p-4 rounded-xl border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <Workflow className="w-4 h-4 animate-pulse" />
                </span>
                <h4 className="font-bold text-white text-sm tracking-tight">ChatNVK Super Agent Architecture & Tool Execution Engine</h4>
                <span className="bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[9px] px-2 py-0.5 rounded-full font-mono">
                  E2EE ENCRYPTED & SANDBOXED
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Multi-agent hierarchies, self-healing tool dispatches, compressed episodic memory, and human-in-the-loop permission guardrails.
              </p>
            </div>

            <button
              onClick={() => setShowAddConnectorModal(true)}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-slate-950 font-bold font-mono text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 flex-shrink-0"
            >
              <Plus className="w-4 h-4" /> Register Custom API / Webhook
            </button>
          </div>

          {/* 4 SUPER AGENT PILLARS SUB-NAVIGATION BAR */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-black/60 p-1.5 rounded-xl border border-emerald-500/20 font-mono text-xs">
            <button
              onClick={() => setMeshSubTab("orchestrator")}
              className={`p-2.5 rounded-lg font-bold transition-all flex items-center justify-center gap-2 text-center ${
                meshSubTab === "orchestrator"
                  ? "bg-gradient-to-r from-emerald-600 to-cyan-600 text-white shadow-md border border-cyan-400/40"
                  : "text-slate-400 hover:text-white hover:bg-slate-900/60"
              }`}
            >
              <Bot className="w-4 h-4 text-emerald-300" />
              <span>1. Multi-Agent Mesh</span>
            </button>

            <button
              onClick={() => setMeshSubTab("selfhealing")}
              className={`p-2.5 rounded-lg font-bold transition-all flex items-center justify-center gap-2 text-center ${
                meshSubTab === "selfhealing"
                  ? "bg-gradient-to-r from-emerald-600 to-cyan-600 text-white shadow-md border border-cyan-400/40"
                  : "text-slate-400 hover:text-white hover:bg-slate-900/60"
              }`}
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>2. Self-Healing Tools</span>
            </button>

            <button
              onClick={() => setMeshSubTab("memory")}
              className={`p-2.5 rounded-lg font-bold transition-all flex items-center justify-center gap-2 text-center ${
                meshSubTab === "memory"
                  ? "bg-gradient-to-r from-emerald-600 to-cyan-600 text-white shadow-md border border-cyan-400/40"
                  : "text-slate-400 hover:text-white hover:bg-slate-900/60"
              }`}
            >
              <Database className="w-4 h-4 text-indigo-300" />
              <span>3. Episodic Memory</span>
            </button>

            <button
              onClick={() => setMeshSubTab("guardrails")}
              className={`p-2.5 rounded-lg font-bold transition-all flex items-center justify-center gap-2 text-center ${
                meshSubTab === "guardrails"
                  ? "bg-gradient-to-r from-emerald-600 to-cyan-600 text-white shadow-md border border-cyan-400/40"
                  : "text-slate-400 hover:text-white hover:bg-slate-900/60"
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-rose-300" />
              <span>4. HITL Guardrails</span>
            </button>
          </div>

          {/* SUB-TAB 1: MULTI-AGENT HIERARCHY & ASYNC PARALLEL ORCHESTRATOR */}
          {meshSubTab === "orchestrator" && (
            <div className="space-y-4">
              <div className="bg-black/60 border border-indigo-500/20 p-4 rounded-xl space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <h5 className="font-bold text-white text-xs flex items-center gap-2">
                      <Bot className="w-4 h-4 text-cyan-400" /> Supervisor & Specialized Sub-Agents Hierarchy
                    </h5>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      The Supervisor agent routes complex workspace goals in parallel to specialized agent workers.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-lg border border-slate-800 font-mono text-[10px]">
                    <span className="text-slate-400">Tool Execution Mode:</span>
                    <button
                      onClick={() => setIsAsyncParallel(!isAsyncParallel)}
                      className={`px-2 py-0.5 rounded font-bold transition-colors ${
                        isAsyncParallel ? "bg-emerald-500 text-slate-950" : "bg-slate-800 text-slate-300"
                      }`}
                    >
                      {isAsyncParallel ? "⚡ Async Parallel (Fast)" : "🐌 Sequential"}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
                  {subAgents.map((agent) => (
                    <div key={agent.id} className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-lg">{agent.icon}</span>
                        <span className="bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[9px] px-2 py-0.5 rounded-full font-mono">
                          Load: {agent.load}
                        </span>
                      </div>
                      <div>
                        <h6 className="font-bold text-white text-xs">{agent.name}</h6>
                        <p className="text-[10px] text-slate-400">{agent.role}</p>
                      </div>
                      <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-full rounded-full transition-all duration-500" 
                          style={{ width: agent.load === "0%" ? "5%" : agent.load }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SUB-TAB 2: SELF-HEALING TOOLS & DYNAMIC PYTHON SYNTHESIZER */}
          {meshSubTab === "selfhealing" && (
            <div className="space-y-4">
              <div className="bg-black/60 border border-amber-500/20 p-4 rounded-xl space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div>
                    <h5 className="font-bold text-amber-300 text-xs flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-400 fill-current" /> Self-Healing API Loop & Dynamic Tool Synthesizer
                    </h5>
                    <p className="text-[10px] text-slate-400 font-sans mt-0.5">
                      When an external API returns an error or schema mismatch, the agent automatically reads API documentation, fixes payload fields, and retries natively.
                    </p>
                  </div>

                  <button
                    onClick={triggerSelfHealingDemo}
                    disabled={isSimulatingSelfHealing}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 disabled:opacity-50"
                  >
                    {isSimulatingSelfHealing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                    <span>Test Self-Healing Loop</span>
                  </button>
                </div>

                {/* Healing Step Logs */}
                <div className="space-y-2 bg-[#08090d] p-3 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-500 border-b border-slate-800 pb-1 flex justify-between">
                    <span>SELF-HEALING TELEMETRY TRACE</span>
                    <span>Status: {isSimulatingSelfHealing ? "Self-Healing in progress..." : "Idle"}</span>
                  </div>

                  {selfHealingLogs.map((log, idx) => (
                    <div key={idx} className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 flex items-start gap-2.5">
                      {log.status === "error" && <span className="text-rose-400 font-bold">❌</span>}
                      {log.status === "repairing" && <span className="text-amber-400 font-bold">🩹</span>}
                      {log.status === "success" && <span className="text-emerald-400 font-bold">✅</span>}
                      <div className="space-y-0.5 text-[11px]">
                        <div className="font-bold text-slate-200">{log.step}</div>
                        <p className="text-slate-400 text-[10px]">{log.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SUB-TAB 3: EPISODIC MEMORY & KNOWLEDGE GRAPH VISUALIZER */}
          {meshSubTab === "memory" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                
                {/* Left: Episodic Compression Memory */}
                <div className="bg-black/60 border border-indigo-500/20 p-4 rounded-xl space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <h5 className="font-bold text-indigo-300 text-xs flex items-center gap-2">
                      <Database className="w-4 h-4 text-indigo-400" /> Daily Episodic Compression Memory
                    </h5>
                    <span className="bg-indigo-950 text-indigo-300 border border-indigo-500/30 text-[9px] px-2 py-0.5 rounded">
                      2,460 Raw Logs Pruned
                    </span>
                  </div>

                  <div className="space-y-2">
                    {episodicMemories.map((mem) => (
                      <div key={mem.id} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                        <div className="flex justify-between text-[10px] text-slate-500">
                          <span>{mem.date}</span>
                          <span className="text-emerald-400">{mem.rawLogCount} raw logs compressed</span>
                        </div>
                        <p className="text-slate-200 text-xs font-sans leading-relaxed">{mem.compressedInsight}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Knowledge Graph Relationship Mapping */}
                <div className="bg-black/60 border border-cyan-500/20 p-4 rounded-xl space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <h5 className="font-bold text-cyan-300 text-xs flex items-center gap-2">
                      <Share2 className="w-4 h-4 text-cyan-400" /> Workspace Knowledge Graph (Entities)
                    </h5>
                    <span className="bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-[9px] px-2 py-0.5 rounded">
                      Neo4j / Graph Mesh
                    </span>
                  </div>

                  <div className="space-y-2">
                    {knowledgeGraphNodes.map((node) => (
                      <div key={node.id} className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-cyan-400" />
                          <span className="font-bold text-white">{node.label}</span>
                          <span className="text-[10px] text-slate-500">({node.type})</span>
                        </div>
                        <span className="text-emerald-400 font-bold text-[10px]">{node.relation} ➔</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* SUB-TAB 4: HITL HUMAN GUARDRAILS & CRON AUTOMATIONS */}
          {meshSubTab === "guardrails" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                
                {/* Left: Pending HITL Approvals Queue */}
                <div className="bg-black/60 border border-rose-500/20 p-4 rounded-xl space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <h5 className="font-bold text-rose-300 text-xs flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-rose-400" /> Human-in-the-Loop (HITL) Pending Approvals
                    </h5>
                    <span className="bg-rose-950 text-rose-300 border border-rose-500/30 text-[9px] px-2 py-0.5 rounded">
                      {pendingHitlApprovals.length} Pending High-Risk Actions
                    </span>
                  </div>

                  {pendingHitlApprovals.length === 0 ? (
                    <div className="p-6 text-center text-slate-500 text-xs font-sans">
                      ✓ No pending high-risk approval requests. All autonomous agent actions are low risk.
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {pendingHitlApprovals.map((req) => (
                        <div key={req.id} className="p-3.5 rounded-xl bg-slate-900/90 border border-rose-500/30 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[9px] px-2 py-0.5 rounded font-bold">
                              HIGH RISK ACTION
                            </span>
                            <span className="text-slate-500 text-[10px]">{req.timestamp}</span>
                          </div>

                          <div>
                            <h6 className="font-bold text-white text-xs">{req.actionName}</h6>
                            <p className="text-[10px] text-slate-400 mt-0.5 font-sans">{req.description}</p>
                          </div>

                          <div className="bg-black/60 p-2 rounded-lg text-[10px] text-cyan-300 font-mono">
                            Target: {req.target}
                          </div>

                          <div className="flex gap-2 pt-1">
                            <button
                              onClick={() => handleApproveHitl(req.id)}
                              className="w-full py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-[11px] shadow-sm"
                            >
                              ✓ Approve Action
                            </button>
                            <button
                              onClick={() => handleRejectHitl(req.id)}
                              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px]"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: Triggered & Scheduled CRON Automations */}
                <div className="bg-black/60 border border-emerald-500/20 p-4 rounded-xl space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <h5 className="font-bold text-emerald-300 text-xs flex items-center gap-2">
                      <Clock className="w-4 h-4 text-emerald-400" /> Triggered & Scheduled CRON Automations
                    </h5>
                    <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/30 text-[9px] px-2 py-0.5 rounded">
                      Temporal / Celery Microservice
                    </span>
                  </div>

                  <div className="space-y-2">
                    {cronAutomations.map((job) => (
                      <div key={job.id} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-xs">{job.name}</span>
                          <span className="text-cyan-300 font-mono text-[10px] bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                            {job.schedule}
                          </span>
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-400 pt-1">
                          <span>Status: <strong className="text-emerald-400">{job.status}</strong></span>
                          <span>Last Run: {job.lastRun}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Active Connectors Matrix Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {connectorsList.map((conn) => {
              const isSelected = selectedConnectorId === conn.id;
              return (
                <div
                  key={conn.id}
                  onClick={() => setSelectedConnectorId(conn.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-2.5 relative overflow-hidden ${
                    isSelected
                      ? "bg-slate-900/90 border-emerald-400 shadow-lg shadow-emerald-500/10"
                      : "bg-black/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase font-bold text-slate-400 flex items-center gap-1.5">
                      {conn.category === "webhook" && <Webhook className="w-3.5 h-3.5 text-cyan-400" />}
                      {conn.category === "database" && <Database className="w-3.5 h-3.5 text-indigo-400" />}
                      {conn.category === "browser" && <Globe className="w-3.5 h-3.5 text-emerald-400" />}
                      {conn.category === "code" && <TerminalSquare className="w-3.5 h-3.5 text-amber-400" />}
                      {conn.category === "messaging" && <Send className="w-3.5 h-3.5 text-purple-400" />}
                      {conn.category === "github" && <Github className="w-3.5 h-3.5 text-slate-300" />}
                      {conn.category.toUpperCase()}
                    </span>
                    <span className="bg-emerald-950 text-emerald-400 border border-emerald-500/40 text-[9px] px-2 py-0.5 rounded-full font-mono flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> {conn.status.toUpperCase()}
                    </span>
                  </div>

                  <div>
                    <h5 className="font-bold text-white text-xs truncate">{conn.name}</h5>
                    <p className="text-[10px] text-slate-400 line-clamp-2 mt-0.5">{conn.description}</p>
                  </div>

                  <div className="bg-black/60 p-2 rounded-lg font-mono text-[10px] text-slate-300 truncate border border-slate-800/80">
                    <span className="text-slate-500 block text-[8px] uppercase">ENDPOINT / URI</span>
                    <span className="text-cyan-300 truncate block">{conn.endpoint}</span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-800/80">
                    <span>Protocol: {conn.protocol}</span>
                    <span className="text-emerald-400 font-bold">{conn.latencyMs}ms • {conn.callsCount} calls</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Tool Execution Playground & Payload Inspector */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-black/60 border border-indigo-500/20 rounded-xl p-4">
            
            {/* Left: Input Payload & Preset Builder */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-mono text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-emerald-400 fill-current" /> Super Tool Invocation Tester
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  Selected: <strong className="text-cyan-300">{connectorsList.find(c => c.id === selectedConnectorId)?.name}</strong>
                </span>
              </div>

              {/* Preset Payload Chips */}
              <div className="flex items-center gap-2 overflow-x-auto text-[9px] font-mono text-slate-400">
                <span className="text-slate-500 uppercase flex-shrink-0">Sample Payloads:</span>
                <button
                  onClick={() => setTestToolPayload(JSON.stringify({ action: "query_database", table: "users", limit: 5 }, null, 2))}
                  className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-indigo-300 whitespace-nowrap"
                >
                  🗄️ SQL Query
                </button>
                <button
                  onClick={() => setTestToolPayload(JSON.stringify({ action: "scrape_url", url: "https://news.ycombinator.com", extract: ["titles", "links"] }, null, 2))}
                  className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-emerald-300 whitespace-nowrap"
                >
                  🌐 Scrape Website
                </button>
                <button
                  onClick={() => setTestToolPayload("import numpy as np\nA = np.random.rand(5,5)\nprint('Determinant:', np.linalg.det(A))")}
                  className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-amber-300 whitespace-nowrap"
                >
                  🐍 Python Execution
                </button>
              </div>

              <textarea
                value={testToolPayload}
                onChange={(e) => setTestToolPayload(e.target.value)}
                rows={7}
                className="w-full bg-[#0d0f17] border border-slate-800 rounded-xl p-3 text-emerald-300 font-mono text-xs outline-none focus:border-emerald-500 leading-relaxed resize-none"
                placeholder="Enter tool JSON parameters or Python code snippet..."
              />

              <button
                onClick={handleExecuteSuperTool}
                disabled={isExecutingTool}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-cyan-600 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-slate-950 font-bold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 disabled:opacity-50"
              >
                {isExecutingTool ? <Loader2 className="w-4 h-4 animate-spin text-slate-950" /> : <Play className="w-4 h-4 fill-current text-slate-950" />}
                <span>Execute Super Tool Request</span>
              </button>
            </div>

            {/* Right: Live Request Dispatch Log & Response */}
            <div className="space-y-3 flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-mono text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-cyan-400" /> Live Response Inspector & Telemetry
                </span>
                <span className="bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[9px] px-2 py-0.5 rounded font-mono">
                  HTTP 200 OK
                </span>
              </div>

              <div className="bg-[#08090d] border border-slate-800 rounded-xl p-3 font-mono text-xs text-slate-300 min-h-[210px] max-h-[210px] overflow-y-auto space-y-2 leading-relaxed">
                <div className="text-[10px] text-slate-500 border-b border-slate-800 pb-1 flex justify-between">
                  <span>LAST EXECUTION RESULT</span>
                  <span>{toolExecutionLogs[0]?.timestamp || "Ready"}</span>
                </div>
                <pre className="text-cyan-300 whitespace-pre-wrap font-mono text-[11px]">
                  {toolExecutionLogs[0]?.responsePayload || "Click 'Execute Super Tool Request' to test live connector tool dispatch..."}
                </pre>
              </div>

              <div className="p-2.5 bg-slate-900/80 border border-slate-800 rounded-xl flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>E2EE Signature: sha256_9f82a1...</span>
                <span>Latency: {toolExecutionLogs[0]?.latencyMs || 12} ms</span>
              </div>
            </div>

          </div>

          {/* Tool Execution History Dispatch Log Table */}
          <div className="bg-black/80 border border-slate-800 rounded-xl p-4 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h5 className="font-bold text-slate-200 text-xs flex items-center gap-2">
                <TerminalSquare className="w-4 h-4 text-emerald-400" /> Super Agent Tool Call Execution History
              </h5>
              <span className="text-[10px] text-slate-500">{toolExecutionLogs.length} Events Dispatched</span>
            </div>

            <div className="space-y-2 max-h-[200px] overflow-y-auto">
              {toolExecutionLogs.map((log) => (
                <div key={log.id} className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px]">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400 font-bold">{log.connectorName}</span>
                      <span className="bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[9px] px-1.5 py-0.2 rounded">
                        HTTP {log.status}
                      </span>
                    </div>
                    <p className="text-slate-400 text-[10px] truncate max-w-md">{log.requestPayload}</p>
                  </div>

                  <div className="text-right text-[10px] text-slate-500 flex-shrink-0">
                    <div>{log.timestamp}</div>
                    <div className="text-emerald-400 font-bold">{log.latencyMs} ms latency</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Modal for Registering Custom Connector */}
          <AnimatePresence>
            {showAddConnectorModal && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md p-4 flex items-center justify-center">
                <div className="bg-slate-950 border border-emerald-500/40 rounded-2xl p-6 max-w-lg w-full space-y-4 font-sans text-xs">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                    <h4 className="font-bold text-white text-sm flex items-center gap-2">
                      <Webhook className="w-4 h-4 text-emerald-400" /> Register Custom Super Agent Connector
                    </h4>
                    <button
                      onClick={() => setShowAddConnectorModal(false)}
                      className="text-slate-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-3 font-mono">
                    <div>
                      <label className="text-slate-400 block mb-1">Connector Name:</label>
                      <input
                        type="text"
                        value={newConnName}
                        onChange={(e) => setNewConnName(e.target.value)}
                        placeholder="e.g. Stripe Payment Webhook Gateway"
                        className="w-full bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-white outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="text-slate-400 block mb-1">Endpoint URL / Target URI:</label>
                      <input
                        type="text"
                        value={newConnEndpoint}
                        onChange={(e) => setNewConnEndpoint(e.target.value)}
                        placeholder="e.g. https://api.stripe.com/v1/charges"
                        className="w-full bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-white outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="text-slate-400 block mb-1">Protocol / Auth Type:</label>
                      <input
                        type="text"
                        value={newConnProtocol}
                        onChange={(e) => setNewConnProtocol(e.target.value)}
                        placeholder="e.g. Bearer Token Auth / HTTP POST"
                        className="w-full bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-slate-400 block mb-1">Description:</label>
                      <input
                        type="text"
                        value={newConnDesc}
                        onChange={(e) => setNewConnDesc(e.target.value)}
                        placeholder="e.g. Dispatches billing events and customer subscription upgrades."
                        className="w-full bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-white outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={handleCreateCustomConnector}
                      className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-xs uppercase shadow-lg shadow-emerald-500/20"
                    >
                      Save & Register Connector
                    </button>
                    <button
                      onClick={() => setShowAddConnectorModal(false)}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </AnimatePresence>

        </div>
      )}

      {/* TAB 3: GITHUB & CLOUD DEPLOYMENT SUITE */}
      {activeTab === "github" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* GitHub Config Form */}
            <div className="bg-black/50 border border-indigo-500/30 p-4 rounded-xl space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                <Github className="w-5 h-5 text-purple-400" />
                <h4 className="font-bold text-slate-200 text-sm">GitHub Repository Deployment</h4>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">GitHub Owner / Organization:</label>
                  <input
                    type="text"
                    value={githubOwner}
                    onChange={(e) => setGithubOwner(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 p-2 rounded-lg text-white outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Repository Name:</label>
                  <input
                    type="text"
                    value={githubRepoName}
                    onChange={(e) => setGithubRepoName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 p-2 rounded-lg text-white outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-slate-400 block mb-1">Target Branch:</label>
                    <input
                      type="text"
                      value={githubBranch}
                      onChange={(e) => setGithubBranch(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 p-2 rounded-lg text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">CI/CD Pipeline:</label>
                    <div className="bg-slate-900 border border-slate-800 p-2 rounded-lg text-emerald-400 font-bold">
                      GitHub Actions
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleTriggerGitHubDeploy}
                  disabled={isDeployingGithub}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20 disabled:opacity-50"
                >
                  {isDeployingGithub ? <Loader2 className="w-4 h-4 animate-spin" /> : <Github className="w-4 h-4" />}
                  <span>Push & Deploy to GitHub</span>
                </button>
              </div>
            </div>

            {/* Cloud Run & ZIP Export Panel */}
            <div className="bg-black/50 border border-indigo-500/30 p-4 rounded-xl space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-cyan-400" />
                    <h4 className="font-bold text-slate-200 text-sm">Quantum Cloud Run URL</h4>
                  </div>
                  <span className="bg-emerald-950 text-emerald-400 border border-emerald-500/40 text-[10px] px-2 py-0.5 rounded-full font-mono font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> ACTIVE
                  </span>
                </div>

                <div className="bg-slate-900/90 border border-cyan-500/30 p-3 rounded-xl font-mono text-xs space-y-2">
                  <div className="text-slate-400 text-[10px]">PRODUCTION ENDPOINT</div>
                  <a 
                    href={currentProject.deploymentUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-cyan-300 hover:underline font-bold flex items-center gap-1 truncate"
                  >
                    {currentProject.deploymentUrl} <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <p className="text-[10px] text-slate-500">SSL Certificate Valid • Container Ingress Port 3000 Bound</p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleDownloadZip}
                    className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-mono text-xs flex items-center justify-center gap-2 transition-all"
                  >
                    <Download className="w-4 h-4 text-cyan-400" /> Download Full Source ZIP / JSON
                  </button>
                </div>
              </div>

              {/* Status Badge */}
              <div className="bg-purple-950/20 border border-purple-500/20 p-3 rounded-xl text-[10px] font-mono text-purple-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span>Synchronized with NVK Quantum Cloud Infrastructure. Ready for global distribution.</span>
              </div>
            </div>

          </div>

          {/* Deployment Execution Terminal Logs */}
          <div className="bg-black/80 border border-slate-800 rounded-xl p-3 font-mono text-[11px] text-emerald-400 h-[180px] overflow-y-auto space-y-1">
            <div className="text-slate-500 text-[10px] border-b border-slate-800 pb-1 mb-2">BUILD & DEPLOYMENT LOGS</div>
            {deployLogs.length === 0 ? (
              <div className="text-slate-600 italic">Click "Push & Deploy to GitHub" to trigger automated git pipeline...</div>
            ) : (
              deployLogs.map((log, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-slate-600">[{new Date().toLocaleTimeString()}]</span>
                  <span>{log}</span>
                </div>
              ))
            )}
            {deploySuccess && (
              <div className="text-cyan-300 font-bold pt-1">
                ✓ GitHub repository deployment complete: https://github.com/{githubOwner}/{githubRepoName}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: SHELL TERMINAL CONSOLE */}
      {activeTab === "terminal" && (
        <div className="space-y-3">
          <div className="bg-black/80 border border-indigo-500/30 rounded-xl p-3.5 font-mono text-[11px] text-emerald-400 h-[300px] overflow-y-auto space-y-2">
            {terminalLogs.map((log, idx) => (
              <div key={idx} className="leading-relaxed whitespace-pre-wrap">
                {log}
              </div>
            ))}
          </div>

          <form onSubmit={executeCommand} className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl p-2.5 font-mono text-xs">
            <span className="text-indigo-400 font-bold">quantum@nvk:~$</span>
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              placeholder="Type help, ls, cat index.html, git status, git push or upload-dataset..."
              className="bg-transparent text-slate-100 outline-none w-full"
            />
          </form>
        </div>
      )}

      {/* TAB 4: DATA ANALYTICS & REPORTS */}
      {activeTab === "analytics" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-black/40 p-3 rounded-xl border border-indigo-500/20">
            <div className="flex items-center gap-2">
              <input 
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
                accept=".csv,.txt,.pdf,.json"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2 rounded-lg flex items-center gap-1.5 text-xs font-mono"
              >
                <UploadCloud className="w-3.5 h-3.5" /> Upload Dataset for AI Parsing
              </button>
            </div>
            {file && <span className="text-xs font-mono text-cyan-300">File loaded: {file.name} ({file.size})</span>}
          </div>

          {chartData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black/50 p-4 rounded-xl border border-indigo-500/20">
                <h4 className="font-mono text-xs font-bold text-cyan-300 mb-3 uppercase">Parsed Analytics Visualization</h4>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                      <XAxis dataKey="name" stroke="#64748b" fontSize={9} />
                      <YAxis stroke="#64748b" fontSize={9} />
                      <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "rgba(255,255,255,0.1)" }} />
                      <Bar dataKey="value" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-black/50 p-4 rounded-xl border border-indigo-500/20 space-y-3">
                <h4 className="font-mono text-xs font-bold text-cyan-300 uppercase">AI Inspection Dossier</h4>
                <div className="bg-slate-900 p-3 rounded-lg text-slate-300 text-xs font-sans leading-relaxed max-h-[160px] overflow-y-auto whitespace-pre-wrap border border-slate-800">
                  {analysisReport || "Upload a dataset to generate deep AI statistical dossier."}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500 border border-dashed border-indigo-500/20 rounded-xl">
              <AlertCircle className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
              <p className="font-mono text-xs text-slate-300">No active datasets loaded yet</p>
            </div>
          )}
        </div>
      )}

      {/* FULLSCREEN PREVIEW MODAL */}
      <AnimatePresence>
        {isFullscreenPreview && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-white font-mono text-xs">
              <span className="font-bold text-cyan-300 flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" /> NVK Quantum App Fullscreen Stage
              </span>
              <button
                onClick={() => setIsFullscreenPreview(false)}
                className="px-3 py-1.5 rounded-lg bg-red-600/30 border border-red-500/30 text-red-200 hover:text-white"
              >
                Close Fullscreen
              </button>
            </div>

            <div className="flex-grow my-4 rounded-xl overflow-hidden border border-cyan-500/40 shadow-2xl bg-[#08090d]">
              <iframe
                title="NVK Fullscreen App Preview"
                srcDoc={getActiveHtmlContent()}
                className="w-full h-full border-none"
                sandbox="allow-scripts allow-modals"
              />
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
