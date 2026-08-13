# ⚡ ChatNVK — Plug & Play Multi-Model AI Matrix OS

![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=for-the-badge&logo=typescript)
![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4.1-38BDF8?style=for-the-badge&logo=tailwind-css)
![Express](https://img.shields.io/badge/Express-4.21-000000?style=for-the-badge&logo=express)
![License](https://img.shields.io/badge/License-Apache_2.0-green?style=for-the-badge)

**ChatNVK** is a full-stack, multi-model AI workspace and Council Chamber operating environment built with React 19, Vite, Express, and TypeScript. It features a universal plug-and-play LLM engine that allows swapping seamlessly between **Google Gemini, OpenAI, Anthropic Claude, DeepSeek, Groq LPU, or local Ollama/custom HTTP endpoints**.

---

## 🌟 Key Features

### 1. 🔌 Universal Multi-Model AI Swapper
- **Plug-and-Play Architecture**: Swap models instantly via the UI model selector or `.env` file without breaking conversation state.
- **Supported Providers**:
  - **Google Gemini**: Gemini 3.5 Flash, 3.5 Pro, 2.5 Flash
  - **OpenAI**: GPT-4o, GPT-4o Mini, o3-mini
  - **Anthropic**: Claude 3.5 Sonnet, Claude 3.5 Haiku
  - **DeepSeek**: DeepSeek V3 (Chat), DeepSeek R1 (Reasoner)
  - **Groq LPU**: Llama 3.3 70B Versatile
  - **Local / Ollama**: Any custom `v1/chat/completions` endpoint (`http://localhost:11434/v1`)
- **Automatic Fallback**: Gracefully falls back if a specific provider key is missing or invalid.

### 2. 🏛️ Council Chambers & Multi-Agent Syndicate
- **Synergy & Debate Modes**: Run multi-agent brainstorms where curated personas (Aether, Sylva, Charis, Aegis) collaborate or debate topics in real time.
- **Full Duplex Voice Calls**: Speak directly to companions with live voice transcripts and speech synthesis.

### 3. 🔬 Wide Research GPU Engine
- Parallel sub-task research generator with real-time thought telemetry logs, Quality Copilot anti-loop watchdog, and citation grounding.

### 4. 💻 VM Developer Sandbox & WebGPU Offline Mode
- Virtual machine command line container simulator and local WebGPU model loader for total offline privacy.

---

## 🚀 Quickstart Guide

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **bun** / **yarn**

### 1. Clone Repository & Install Dependencies
```bash
git clone https://github.com/your-username/ChatNVK.git
cd ChatNVK

npm install
```

### 2. Configure Environment Variables
Copy the `.env.example` template into a `.env` file:
```bash
cp .env.example .env
```

Open `.env` and configure your default model and API keys:
```env
# Default Active AI Model
DEFAULT_AI_MODEL="gemini-3.5-flash"

# Google Gemini API Key
GEMINI_API_KEY="your_gemini_api_key_here"

# Optional Keys for Swapping
OPENAI_API_KEY="your_openai_api_key_here"
ANTHROPIC_API_KEY="your_anthropic_api_key_here"
DEEPSEEK_API_KEY="your_deepseek_api_key_here"
GROQ_API_KEY="your_groq_api_key_here"
CUSTOM_LLM_URL="http://localhost:11434/v1"
```

### 3. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Environment Variables Reference

| Variable | Description | Required? | Default |
|---|---|---|---|
| `DEFAULT_AI_MODEL` | Specifies active default AI model ID | No | `gemini-3.5-flash` |
| `GEMINI_API_KEY` | Google Gemini AI API Key | Recommended | None |
| `OPENAI_API_KEY` | OpenAI API Key (GPT-4o, o3-mini) | Optional | None |
| `ANTHROPIC_API_KEY` | Anthropic Claude API Key | Optional | None |
| `DEEPSEEK_API_KEY` | DeepSeek API Key (V3 & R1) | Optional | None |
| `GROQ_API_KEY` | Groq LPU API Key (Llama 3.3) | Optional | None |
| `CUSTOM_LLM_URL` | Custom OpenAI-compatible endpoint URL | Optional | `http://localhost:11434/v1` |
| `APP_URL` | Service URL for production hosting | No | `http://localhost:3000` |

---

## 📦 Available Scripts

- `npm run dev` — Boots the Express backend server with Vite middleware in development mode (`tsx server.ts`).
- `npm run build` — Bundles client assets with Vite and compiles backend `server.ts` into CommonJS (`dist/server.cjs`) via `esbuild`.
- `npm run start` — Launches compiled production server (`node dist/server.cjs`).
- `npm run lint` — Validates TypeScript types across frontend and backend.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Motion (`motion/react`), Lucide React Icons, Recharts, D3.js
- **Backend**: Node.js, Express, Vite Server Middleware, Esbuild, Dotenv
- **AI Integrations**: Universal LLM Router (`@google/genai`, OpenAI REST, Anthropic REST, DeepSeek REST, Ollama)

---

## 📄 License
Licensed under the [Apache License, Version 2.0](LICENSE).
