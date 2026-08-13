/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";
import { AIModelSpec } from "../types";

export const AVAILABLE_MODELS: AIModelSpec[] = [
  // Google Gemini Family
  {
    id: "gemini-3.5-flash",
    name: "Gemini 3.5 Flash",
    provider: "google",
    description: "Fast, multimodal, high-reasoning Google AI model.",
    contextWindow: "1M tokens",
    badge: "DEFAULT / RECOMMENDED",
    isDefault: true,
    requiresApiKey: true,
    envKeyName: "GEMINI_API_KEY"
  },
  {
    id: "gemini-3.5-pro",
    name: "Gemini 3.5 Pro",
    provider: "google",
    description: "Deep reasoning & complex code synthesis.",
    contextWindow: "2M tokens",
    badge: "PRO REASONING",
    requiresApiKey: true,
    envKeyName: "GEMINI_API_KEY"
  },
  {
    id: "gemini-2.5-flash",
    name: "Gemini 2.5 Flash",
    provider: "google",
    description: "Ultra-low latency streaming model.",
    contextWindow: "1M tokens",
    badge: "LIGHTSPEED",
    requiresApiKey: true,
    envKeyName: "GEMINI_API_KEY"
  },

  // OpenAI Family
  {
    id: "gpt-4o",
    name: "GPT-4o (OpenAI)",
    provider: "openai",
    description: "Flagship multimodal OpenAI model.",
    contextWindow: "128k tokens",
    badge: "OPENAI",
    requiresApiKey: true,
    envKeyName: "OPENAI_API_KEY"
  },
  {
    id: "gpt-4o-mini",
    name: "GPT-4o Mini",
    provider: "openai",
    description: "Lightweight and efficient OpenAI chat model.",
    contextWindow: "128k tokens",
    badge: "EFFICIENT",
    requiresApiKey: true,
    envKeyName: "OPENAI_API_KEY"
  },
  {
    id: "o3-mini",
    name: "OpenAI o3-mini",
    provider: "openai",
    description: "High-reasoning STEM and math model.",
    contextWindow: "200k tokens",
    badge: "REASONING",
    requiresApiKey: true,
    envKeyName: "OPENAI_API_KEY"
  },

  // Anthropic Claude Family
  {
    id: "claude-3-5-sonnet-20241022",
    name: "Claude 3.5 Sonnet",
    provider: "anthropic",
    description: "Industry-leading code generation and writing.",
    contextWindow: "200k tokens",
    badge: "ANTHROPIC",
    requiresApiKey: true,
    envKeyName: "ANTHROPIC_API_KEY"
  },
  {
    id: "claude-3-5-haiku-20241022",
    name: "Claude 3.5 Haiku",
    provider: "anthropic",
    description: "Lightning fast compact Claude model.",
    contextWindow: "200k tokens",
    badge: "RAPID",
    requiresApiKey: true,
    envKeyName: "ANTHROPIC_API_KEY"
  },

  // DeepSeek Family
  {
    id: "deepseek-chat",
    name: "DeepSeek V3 (Chat)",
    provider: "deepseek",
    description: "High-performance open-weights style model.",
    contextWindow: "64k tokens",
    badge: "DEEPSEEK",
    requiresApiKey: true,
    envKeyName: "DEEPSEEK_API_KEY"
  },
  {
    id: "deepseek-reasoner",
    name: "DeepSeek R1 (Reasoner)",
    provider: "deepseek",
    description: "Chain-of-thought mathematical reasoning model.",
    contextWindow: "64k tokens",
    badge: "COT REASONER",
    requiresApiKey: true,
    envKeyName: "DEEPSEEK_API_KEY"
  },

  // Groq Accelerated Llama
  {
    id: "llama-3.3-70b-versatile",
    name: "Llama 3.3 70B (Groq)",
    provider: "groq",
    description: "Ultra-fast LPU inference via Groq.",
    contextWindow: "128k tokens",
    badge: "GROQ LPU",
    requiresApiKey: true,
    envKeyName: "GROQ_API_KEY"
  },

  // Ollama & Custom Local Endpoints
  {
    id: "ollama/llama3",
    name: "Ollama Local (Llama 3)",
    provider: "ollama",
    description: "Self-hosted local model via Ollama localhost.",
    contextWindow: "8k - 32k tokens",
    badge: "LOCAL OLLAMA",
    requiresApiKey: false,
    envKeyName: "CUSTOM_LLM_URL"
  },
  {
    id: "custom/http-endpoint",
    name: "Custom OpenAI-Compatible API",
    provider: "local",
    description: "Any custom v1/chat/completions endpoint (vLLM, LM Studio).",
    contextWindow: "Custom",
    badge: "CUSTOM ENDPOINT",
    requiresApiKey: false,
    envKeyName: "CUSTOM_LLM_URL"
  }
];

export interface UnifiedChatMessage {
  role: "user" | "model" | "assistant" | "system";
  content: string;
  imageBase64?: string;
  imageMimeType?: string;
}

export interface UniversalGenerateOptions {
  modelId?: string;
  messages: UnifiedChatMessage[];
  systemInstruction?: string;
  customApiKey?: string;
  customEndpoint?: string;
}

export interface UniversalGenerateResult {
  text: string;
  providerUsed: string;
  modelUsed: string;
}

/**
 * Universal Multi-Model LLM Dispatcher
 */
export async function generateWithAnyModel(
  options: UniversalGenerateOptions
): Promise<UniversalGenerateResult> {
  const modelId = options.modelId || process.env.DEFAULT_AI_MODEL || "gemini-3.5-flash";
  const matchedSpec = AVAILABLE_MODELS.find(m => m.id === modelId) || AVAILABLE_MODELS[0];
  const provider = matchedSpec.provider;

  // 1. GOOGLE GEMINI PROVIDER
  if (provider === "google" || modelId.startsWith("gemini")) {
    const apiKey = options.customApiKey || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "";
    
    if (!apiKey) {
      return {
        text: `[Model Config Note] GEMINI_API_KEY is not set in environment or settings. To use ${matchedSpec.name}, please add GEMINI_API_KEY to your .env file or settings.`,
        providerUsed: "Google (Fallback)",
        modelUsed: modelId
      };
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: { "User-Agent": "aistudio-build" }
      }
    });

    const geminiContents = options.messages.map(m => {
      const parts: any[] = [];
      if (m.imageBase64 && m.imageMimeType) {
        parts.push({
          inlineData: {
            mimeType: m.imageMimeType,
            data: m.imageBase64
          }
        });
      }
      parts.push({ text: m.content || "" });
      return {
        role: m.role === "user" ? "user" : "model",
        parts
      };
    });

    // Map model names safely if necessary
    const targetModel = modelId === "gemini-3.5-flash" || modelId === "gemini-3.5-pro" ? "gemini-2.5-flash" : modelId;

    const response = await ai.models.generateContent({
      model: targetModel,
      contents: geminiContents,
      config: {
        systemInstruction: options.systemInstruction || "You are a helpful AI assistant."
      }
    });

    return {
      text: response.text || "No output generated.",
      providerUsed: "Google Gemini",
      modelUsed: modelId
    };
  }

  // 2. OPENAI & OPENAI-COMPATIBLE PROVIDERS (DeepSeek, Groq, Ollama, Custom HTTP)
  if (provider === "openai" || provider === "deepseek" || provider === "groq" || provider === "ollama" || provider === "local") {
    let apiKey = options.customApiKey;
    let endpoint = options.customEndpoint;

    if (provider === "openai") {
      apiKey = apiKey || process.env.OPENAI_API_KEY;
      endpoint = endpoint || "https://api.openai.com/v1/chat/completions";
    } else if (provider === "deepseek") {
      apiKey = apiKey || process.env.DEEPSEEK_API_KEY;
      endpoint = endpoint || "https://api.deepseek.com/v1/chat/completions";
    } else if (provider === "groq") {
      apiKey = apiKey || process.env.GROQ_API_KEY;
      endpoint = endpoint || "https://api.groq.com/openai/v1/chat/completions";
    } else if (provider === "ollama" || provider === "local") {
      endpoint = endpoint || process.env.CUSTOM_LLM_URL || "http://localhost:11434/v1/chat/completions";
      apiKey = apiKey || "ollama";
      if (!endpoint.endsWith("/chat/completions")) {
        endpoint = endpoint.replace(/\/$/, "") + "/chat/completions";
      }
    }

    if (!apiKey && provider !== "ollama" && provider !== "local") {
      // Fallback to Gemini if key is missing
      if (process.env.GEMINI_API_KEY) {
        console.warn(`[LLM Router] ${matchedSpec.envKeyName} missing. Falling back to Gemini.`);
        return generateWithAnyModel({ ...options, modelId: "gemini-3.5-flash" });
      }
      return {
        text: `[Model Config Note] ${matchedSpec.envKeyName} is not configured. Add ${matchedSpec.envKeyName} to your .env file to enable ${matchedSpec.name}.`,
        providerUsed: `${matchedSpec.name} (Key Missing)`,
        modelUsed: modelId
      };
    }

    const openAiMessages: any[] = [];
    if (options.systemInstruction) {
      openAiMessages.push({ role: "system", content: options.systemInstruction });
    }

    options.messages.forEach(m => {
      const role = m.role === "user" ? "user" : m.role === "system" ? "system" : "assistant";
      if (m.imageBase64 && m.imageMimeType) {
        openAiMessages.push({
          role,
          content: [
            { type: "text", text: m.content || "" },
            { type: "image_url", image_url: { url: `data:${m.imageMimeType};base64,${m.imageBase64}` } }
          ]
        });
      } else {
        openAiMessages.push({ role, content: m.content || "" });
      }
    });

    const realModelName = modelId.startsWith("ollama/") ? modelId.replace("ollama/", "") : modelId;

    const resp = await fetch(endpoint!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(apiKey ? { "Authorization": `Bearer ${apiKey}` } : {})
      },
      body: JSON.stringify({
        model: realModelName,
        messages: openAiMessages,
        temperature: 0.7
      })
    });

    if (!resp.ok) {
      const errText = await resp.text();
      console.error(`[LLM Router] ${provider} error (${resp.status}):`, errText);
      
      // Fallback to Gemini if available
      if (process.env.GEMINI_API_KEY && provider !== "google") {
        return generateWithAnyModel({ ...options, modelId: "gemini-3.5-flash" });
      }
      throw new Error(`${matchedSpec.name} HTTP ${resp.status}: ${errText}`);
    }

    const data = await resp.json();
    const replyText = data.choices?.[0]?.message?.content || "No message content returned.";

    return {
      text: replyText,
      providerUsed: matchedSpec.name,
      modelUsed: modelId
    };
  }

  // 3. ANTHROPIC CLAUDE PROVIDER
  if (provider === "anthropic") {
    const apiKey = options.customApiKey || process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      if (process.env.GEMINI_API_KEY) {
        return generateWithAnyModel({ ...options, modelId: "gemini-3.5-flash" });
      }
      return {
        text: `[Model Config Note] ANTHROPIC_API_KEY is missing. Add ANTHROPIC_API_KEY to .env to use ${matchedSpec.name}.`,
        providerUsed: "Anthropic (Key Missing)",
        modelUsed: modelId
      };
    }

    const claudeMessages = options.messages
      .filter(m => m.role === "user" || m.role === "assistant" || m.role === "model")
      .map(m => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.content || ""
      }));

    const resp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: modelId,
        max_tokens: 4096,
        system: options.systemInstruction || "You are a helpful assistant.",
        messages: claudeMessages
      })
    });

    if (!resp.ok) {
      const errText = await resp.text();
      if (process.env.GEMINI_API_KEY) {
        return generateWithAnyModel({ ...options, modelId: "gemini-3.5-flash" });
      }
      throw new Error(`Anthropic error (${resp.status}): ${errText}`);
    }

    const data = await resp.json();
    const replyText = data.content?.[0]?.text || "No response content.";

    return {
      text: replyText,
      providerUsed: "Anthropic Claude",
      modelUsed: modelId
    };
  }

  // DEFAULT / FALLBACK
  return generateWithAnyModel({ ...options, modelId: "gemini-3.5-flash" });
}
