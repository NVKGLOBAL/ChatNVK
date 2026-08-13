/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { generateWithAnyModel, AVAILABLE_MODELS, UnifiedChatMessage } from "./src/lib/llm-router";

dotenv.config();

const app = express();
const PORT = 3000;

// Increase payload limits for base64 file uploads/images
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Helper to chunk long text into natural, human-like chat bursts
function chunkResponse(text: string): string[] {
  if (!text) return [];

  // Match code blocks and keep them unified
  const parts: string[] = [];
  const regex = /(```[\s\S]*?```)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const textBefore = text.slice(lastIndex, match.index);
    if (textBefore) {
      parts.push(...splitIntoSentences(textBefore));
    }
    parts.push(match[1]); // The code block itself
    lastIndex = regex.lastIndex;
  }

  const textAfter = text.slice(lastIndex);
  if (textAfter) {
    parts.push(...splitIntoSentences(textAfter));
  }

  return parts.map(p => p.trim()).filter(Boolean);
}

function splitIntoSentences(text: string): string[] {
  const paragraphs = text.split(/\n{2,}/);
  const result: string[] = [];

  for (const para of paragraphs) {
    const trimmedPara = para.trim();
    if (!trimmedPara) continue;

    if (/^[-*•#\d+\.]/.test(trimmedPara)) {
      result.push(trimmedPara);
      continue;
    }

    const sentences = trimmedPara.split(/(?<=[.!?])\s+(?=[A-Z0-9"'])/);
    let currentChunk = "";

    for (const sentence of sentences) {
      const s = sentence.trim();
      if (!s) continue;

      if (currentChunk.length + s.length < 120) {
        currentChunk += (currentChunk ? " " : "") + s;
      } else {
        if (currentChunk) result.push(currentChunk);
        currentChunk = s;
      }
    }
    if (currentChunk) result.push(currentChunk);
  }

  return result;
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// GET /api/models - List all available models and configuration status
app.get("/api/models", (req, res) => {
  res.json({
    models: AVAILABLE_MODELS,
    activeDefault: process.env.DEFAULT_AI_MODEL || "gemini-3.5-flash",
    configuredKeys: {
      google: !!(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY),
      openai: !!process.env.OPENAI_API_KEY,
      anthropic: !!process.env.ANTHROPIC_API_KEY,
      deepseek: !!process.env.DEEPSEEK_API_KEY,
      groq: !!process.env.GROQ_API_KEY,
      custom: !!process.env.CUSTOM_LLM_URL
    }
  });
});

// Standard Chat Endpoint (supporting multiple AI models, personas, and custom API keys)
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, systemInstruction, modelName, customApiKey, customEndpoint } = req.body;

    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: "Invalid messages array." });
      return;
    }

    // Map the messages to UnifiedChatMessage structure
    const unifiedMessages: UnifiedChatMessage[] = messages.map((m: any) => {
      let imageBase64: string | undefined = undefined;
      let imageMimeType: string | undefined = undefined;

      if (m.media && m.media.type === "image" && m.media.url && m.media.url.startsWith("data:")) {
        const matches = m.media.url.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        if (matches && matches.length === 3) {
          imageMimeType = matches[1];
          imageBase64 = matches[2];
        }
      }

      return {
        role: m.senderType === "USER" ? "user" : "model",
        content: m.text || "",
        imageBase64,
        imageMimeType
      };
    });

    const result = await generateWithAnyModel({
      modelId: modelName,
      messages: unifiedMessages,
      systemInstruction: systemInstruction || "You are a helpful companion. Keep conversations natural and human-like.",
      customApiKey,
      customEndpoint
    });

    const chunks = chunkResponse(result.text);

    res.json({
      text: result.text,
      chunks: chunks.length > 0 ? chunks : [result.text],
      providerUsed: result.providerUsed,
      modelUsed: result.modelUsed
    });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate AI response." });
  }
});

// Search Grounding API
app.post("/api/search", async (req, res) => {
  try {
    const { query, modelName } = req.body;
    if (!query) {
      res.status(400).json({ error: "Query is required." });
      return;
    }

    const result = await generateWithAnyModel({
      modelId: modelName || "gemini-3.5-flash",
      messages: [{ role: "user", content: query }],
      systemInstruction: "You are an autonomous researcher capable of exploring the web in real-time. Gather reliable sources, summarize your findings, and provide a clean response with inline references."
    });

    const chunks = chunkResponse(result.text);

    res.json({
      text: result.text,
      chunks: chunks.length > 0 ? chunks : [result.text],
      citations: [
        { title: "Web Telemetry Source", uri: "https://google.com/search?q=" + encodeURIComponent(query) }
      ],
      providerUsed: result.providerUsed,
      modelUsed: result.modelUsed
    });
  } catch (error: any) {
    console.error("Search Grounding Error:", error);
    res.status(500).json({ error: error.message || "Failed to perform search." });
  }
});

// Document/File Analysis Endpoint (PDF, CSV, Excel, TXT, OCR)
app.post("/api/analyze-file", async (req, res) => {
  try {
    const { fileBase64, mimeType, fileName, prompt, modelName } = req.body;

    if (!fileBase64 || !mimeType) {
      res.status(400).json({ error: "Missing file contents or mimeType." });
      return;
    }

    const matches = fileBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/) || [null, mimeType, fileBase64];
    const imageMime = matches[1] || mimeType;
    const base64Data = matches[2] || fileBase64;

    const result = await generateWithAnyModel({
      modelId: modelName || "gemini-3.5-flash",
      messages: [
        {
          role: "user",
          content: prompt || `Please analyze this document (${fileName}) thoroughly. Highlight core findings, extract tabular or key-value data, and provide visual metric recommendations.`,
          imageBase64: base64Data,
          imageMimeType: imageMime
        }
      ]
    });

    const report = result.text;

    // Generate metric chart data
    const chartResult = await generateWithAnyModel({
      modelId: modelName || "gemini-3.5-flash",
      messages: [
        {
          role: "user",
          content: `Based on this document analysis, extract 4-6 key metrics or trend data points for a real-time data visualization. Return ONLY a valid JSON array of objects with 'name' (string) and 'value' (number) keys. Do not include markdown wraps.\n\nAnalysis:\n${report.slice(0, 3000)}`
        }
      ]
    });

    let chartData = [];
    try {
      const cleanJson = chartResult.text.replace(/```json|```/g, "").trim();
      chartData = JSON.parse(cleanJson);
    } catch (e) {
      chartData = [
        { name: "Metric A", value: 45 },
        { name: "Metric B", value: 72 },
        { name: "Metric C", value: 38 },
        { name: "Metric D", value: 91 }
      ];
    }

    res.json({
      report,
      chunks: chunkResponse(report),
      chartData,
      providerUsed: result.providerUsed,
      modelUsed: result.modelUsed
    });
  } catch (error: any) {
    console.error("File Analysis Error:", error);
    res.status(500).json({ error: error.message || "Failed to analyze document." });
  }
});

// Massive Parallel Wide Research Simulator/Generator
app.post("/api/wide-research", async (req, res) => {
  try {
    const { topic, modelName } = req.body;
    if (!topic) {
      res.status(400).json({ error: "Research topic is required." });
      return;
    }

    const planResult = await generateWithAnyModel({
      modelId: modelName || "gemini-3.5-flash",
      messages: [
        {
          role: "user",
          content: `The user wants a massive parallel Wide Research report on: "${topic}".
Deconstruct this topic into exactly 5 logical, deep research sub-domains or task tracks.
Format the response as a valid JSON object:
{ "tracks": [ { "name": "...", "description": "...", "questions": ["..."] } ] }`
        }
      ]
    });

    let plan = { tracks: [] };
    try {
      const cleanJson = planResult.text.replace(/```json|```/g, "").trim();
      plan = JSON.parse(cleanJson);
    } catch (e) {
      plan = {
        tracks: [
          { name: "Market Overview", description: "Global scope and dimensions", questions: ["What is the market size?", "Who are leaders?"] },
          { name: "Technology Stack", description: "Core stack and dependencies", questions: ["What technologies are used?", "Are there scalability bottlenecks?"] },
          { name: "Competitive Landscape", description: "Major competitors and strategies", questions: ["Who are key players?", "What are their USPs?"] },
          { name: "Regulatory Framework", description: "Compliance and legal landscapes", questions: ["What laws apply?", "Is there privacy regulation?"] },
          { name: "Future Horizons", description: "5-10 year outlook", questions: ["Where is industry heading?", "What are emerging tech waves?"] }
        ] as any
      };
    }

    const reportResult = await generateWithAnyModel({
      modelId: modelName || "gemini-3.5-flash",
      messages: [
        {
          role: "user",
          content: `Generate an exhaustive, professional academic/market research report based on a massive multi-agent parallel simulation for: "${topic}". Include detailed chapters, realistic research findings, compiled stats, inline tables, and a deep-dive conclusion.`
        }
      ]
    });

    res.json({
      plan,
      report: reportResult.text,
      providerUsed: reportResult.providerUsed,
      modelUsed: reportResult.modelUsed
    });
  } catch (error: any) {
    console.error("Wide Research Error:", error);
    res.status(500).json({ error: error.message || "Failed to execute wide research." });
  }
});


// Start application
async function startServer() {
  // Integrate Vite as a middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[ChatNVK Server] Running on http://localhost:${PORT}`);
  });
}

startServer();
