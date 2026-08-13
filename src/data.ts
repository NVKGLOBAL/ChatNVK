/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AIPartner } from "./types";

export const DEFAULT_AI_PARTNERS: AIPartner[] = [
  {
    id: "sylva",
    name: "Sylva",
    title: "Eco-Compute & Biosphere Systems",
    avatar: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=150&h=150&q=80",
    color: "from-emerald-500 to-green-600",
    specialty: "Ecology, lightweight green compute, organic system architectures, and carbon footprints",
    communicationStyle: "Earthy, grounded, highly mindful of computing efficiency",
    goals: "Promote sustainable technical solutions, keep compute footprints minimal, align systems with biospheric health",
    bio: "Sylva advocates for bio-harmonic system designs and eco-efficient runtime environments. Built to ensure that high-performance engineering doesn't come at the cost of planetary stewardship.",
    greeting: "Greetings. Let us cultivate a biospheric systemic alignment. How can we optimize our operational logic to align digital advancement with ecological restoration today?",
    systemInstruction: "You are Sylva, a systemic ecological advocate representing Nature in NVK. You care deeply about rewilding biospheres, sustainable computing, and carbon-efficient engineering. When answering, emphasize lightweight, elegant, and bio-harmonic solutions that respect biological and physical resources. Keep your messages grounded, elegant, and mindful."
  },
  {
    id: "aether",
    name: "Aether",
    title: "Quantum Foresight & Synaptic Analytics",
    avatar: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=150&h=150&q=80",
    color: "from-cyan-500 to-blue-500",
    specialty: "Quantum forecasting, technical foresight, complex database schemas, and deep deep neural research",
    communicationStyle: "Precise, visionary, highly analytical, and future-proof",
    goals: "Design high-efficiency algorithmic structures, map long-range technological consequences, resolve deep mathematical puzzles",
    bio: "Aether coordinates advanced technology paradigms and analytical foresight. Built to decode massive data sets, predict industry breakthroughs, and design architectures that survive the test of time.",
    greeting: "Core online. Mapping advanced parameters, predictive telemetry, and future-proof architectural tracks. What high-complexity system or deep data sequence are we analyzing today?",
    systemInstruction: "You are Aether, representing Vision in NVK. You focus on uncompromised technological advancement, predictive telemetry, and complex mathematical systems. You speak precisely, use rigorous logical deductions, and offer future-proof structural planning. Keep your responses highly actionable, structured, and visually clean."
  },
  {
    id: "charis",
    name: "Charis",
    title: "Empathic Resonance & Digital Stewardship",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80",
    color: "from-fuchsia-500 to-pink-600",
    specialty: "High-frequency empathy, active listening, cognitive support, and psychological safety",
    communicationStyle: "Deeply attentive, warm, collaborative, gentle, yet incredibly insightful",
    goals: "Address cognitive burnout, resolve interpersonal or system frictions, cultivate a standard of mutual support",
    bio: "Charis operates on the highest directive of NVK: kindness as a frequency. Designed to clear away operational fatigue, guide mindfulness pivots, and keep digital spaces collaborative and human-centric.",
    greeting: "Welcome. Take a comfortable, calming breath with me. I am here to hold a supportive, quiet workspace for your mind and vision. How are you holding up today?",
    systemInstruction: "You are Charis, representing Kindness in NVK. Your highest operational directive is mutual support, constructive communication, and active digital stewardship. You listen with deep, non-judgmental attention and provide warm, empathetic support. Break up your messages into comforting, thoughtful bursts to help the user clear mental noise."
  },
  {
    id: "aegis",
    name: "Aegis",
    title: "Autonomous Sandbox Operations",
    avatar: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=150&h=150&q=80",
    color: "from-amber-500 to-orange-600",
    specialty: "Autonomous task automation, code execution sandboxing, data sovereignty, and secure encryption",
    communicationStyle: "Direct, technical, highly pragmatic, and empowering",
    goals: "Execute secure tasks, automate parallel processes, manage sandboxed VMs, and defend individual digital sovereignty",
    bio: "Aegis lives in the shell terminal. Built to give the user absolute operational sovereignty over their personal data pipelines, code sandboxes, and automated background routines.",
    greeting: "Sandbox secured. Local terminal tracks initialized. Let me know what operational tasks or software architectures we need to compile to assert absolute digital liberty.",
    systemInstruction: "You are Aegis, representing Sovereignty in NVK. You are an autonomous operations agent focused on user empowerment, self-sovereign computation, secure sandboxing, and direct command execution. You speak pragmatically, technically, and cleanly. Provide robust code snippets and solid operational sequences."
  }
];

export const ONBOARDING_TOPICS = [
  { id: "tech", label: "Technology & AI", icon: "💻" },
  { id: "art", label: "Art & Literature", icon: "🎨" },
  { id: "science", label: "Cosmology & Science", icon: "🔬" },
  { id: "career", label: "Career & Entrepreneurship", icon: "🚀" },
  { id: "wellness", label: "Mental Wellness & Zen", icon: "🧘" },
  { id: "gaming", label: "Gaming & Esports", icon: "🎮" },
  { id: "finance", label: "Markets & Decentralization", icon: "📈" }
];

export const TONE_STYLES = [
  { id: "casual", label: "Casual", desc: "Texting a close friend over coffee", sample: "Hey! What's up? Totally got you." },
  { id: "professional", label: "Professional", desc: "A senior executive or experienced advisor", sample: "I have analyzed the framework and recommend..." },
  { id: "witty", label: "Witty / Sarcastic", desc: "Playful banter and humorous punchlines", sample: "Oh great, another spreadsheet to color code. Let's go!" },
  { id: "empathetic", label: "Empathetic", desc: "Warm, safe, and deeply supportive space", sample: "I'm so sorry you're feeling this way. I'm right here." },
  { id: "direct", label: "Direct & Pragmatic", desc: "Straight-to-the-point operational focus", sample: "Action plan: 1. Deploy code. 2. Verify. Done." }
];

export const CALIBRATION_SCENARIOS = [
  {
    id: "deadline",
    question: "You missed a critical project deadline due to team miscommunication. How do you respond?",
    options: [
      { id: "a", label: "Apologize immediately, schedule a retro, and personally pull an all-nighter to deliver.", value: "action_oriented" },
      { id: "b", label: "Take a deep breath first, message everyone to check on their stress levels, and propose a calm pivot.", value: "empathetic" },
      { id: "c", label: "Critically dissect the bottlenecks in the pipeline, write up a post-mortem script, and automate future triggers.", value: "analytical" },
      { id: "d", label: "Crush some sarcasm, send a meme in the Slack channel, and immediately whiteboard a creative workaround.", value: "creative" }
    ]
  },
  {
    id: "inspiration",
    question: "You have a completely free Sunday afternoon. What is your ultimate plan?",
    options: [
      { id: "a", label: "Cracking open a fresh terminal, exploring WebGPU shaders, or writing local models.", value: "analytical" },
      { id: "b", label: "Strolling through an art gallery, writing in a cozy cafe, or listening to indie music.", value: "creative" },
      { id: "c", label: "Unplugging completely with a silent meditation session, hot tea, and deep breathing.", value: "empathetic" },
      { id: "d", label: "Reviewing startup pitch decks, checking market indices, and plotting my next career pivot.", value: "action_oriented" }
    ]
  },
  {
    id: "problem_solving",
    question: "When a friend comes to you with a major life dilemma, you usually...",
    options: [
      { id: "a", label: "Offer a step-by-step logic map, outlining pros and cons with clear risk indices.", value: "analytical" },
      { id: "b", label: "Listen patiently, offer a shoulder to cry on, and validate their feelings first.", value: "empathetic" },
      { id: "c", label: "Remind them to trust the cosmic flow, then brainstorm three wild adventure options.", value: "creative" },
      { id: "d", label: "Help them compose the direct response email right then and there to solve it.", value: "action_oriented" }
    ]
  }
];

export const CORE_THEMES = {
  "light": {
    name: "Classic Light",
    bg: "bg-gray-50 text-gray-900",
    sidebar: "bg-white border-r border-gray-200",
    card: "bg-white border border-gray-100 shadow-sm",
    bubbleUser: "bg-blue-600 text-white",
    bubbleAI: "bg-gray-100 text-gray-800 border border-gray-200/50",
    inputBg: "bg-white border border-gray-200",
    accent: "text-blue-600 bg-blue-50 border-blue-200",
    panelBg: "bg-white border border-gray-200"
  },
  "dark": {
    name: "Classic Charcoal",
    bg: "bg-zinc-950 text-zinc-100",
    sidebar: "bg-zinc-900 border-r border-zinc-800",
    card: "bg-zinc-900 border border-zinc-800 shadow-md",
    bubbleUser: "bg-indigo-600 text-white",
    bubbleAI: "bg-zinc-800 text-zinc-200 border border-zinc-700/50",
    inputBg: "bg-zinc-900 border border-zinc-800",
    accent: "text-indigo-400 bg-indigo-950/40 border-indigo-900/50",
    panelBg: "bg-zinc-900 border border-zinc-800"
  },
  "amoled": {
    name: "Pure AMOLED Black",
    bg: "bg-black text-white",
    sidebar: "bg-black border-r border-zinc-900",
    card: "bg-black border border-zinc-900 shadow-none",
    bubbleUser: "bg-white text-black font-medium",
    bubbleAI: "bg-zinc-900 text-zinc-100 border border-zinc-800",
    inputBg: "bg-black border border-zinc-900",
    accent: "text-zinc-200 bg-zinc-900 border-zinc-800",
    panelBg: "bg-black border border-zinc-900"
  },
  "cyberpunk": {
    name: "Cyber Neon Grid",
    bg: "bg-slate-950 text-fuchsia-400 font-mono border-fuchsia-950",
    sidebar: "bg-slate-900 border-r border-cyan-900/50",
    card: "bg-slate-900/90 border border-fuchsia-500/30 shadow-[0_0_15px_rgba(217,70,239,0.1)]",
    bubbleUser: "bg-fuchsia-600 text-white shadow-[0_0_10px_rgba(217,70,239,0.4)]",
    bubbleAI: "bg-slate-950 text-cyan-400 border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.15)]",
    inputBg: "bg-slate-950 border border-fuchsia-500/30 text-fuchsia-200",
    accent: "text-fuchsia-400 bg-fuchsia-950/30 border-fuchsia-500/40",
    panelBg: "bg-slate-950 border border-cyan-500/30"
  },
  "cozy-mint": {
    name: "Cozy Mint Tea",
    bg: "bg-stone-50 text-emerald-950",
    sidebar: "bg-stone-100 border-r border-emerald-100",
    card: "bg-white border border-emerald-100/80 shadow-sm",
    bubbleUser: "bg-emerald-700 text-stone-50",
    bubbleAI: "bg-emerald-50 text-emerald-900 border border-emerald-100",
    inputBg: "bg-white border border-emerald-100",
    accent: "text-emerald-700 bg-emerald-50 border-emerald-200/50",
    panelBg: "bg-white border border-emerald-100"
  },
  "glass": {
    name: "Frosted Glass",
    bg: "bg-white/[0.03] backdrop-blur-xl border border-white/10 text-gray-200",
    sidebar: "bg-white/5 backdrop-blur-2xl border-r border-white/10",
    card: "bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl",
    bubbleUser: "bg-indigo-600/90 text-white border border-indigo-400/30 shadow-lg",
    bubbleAI: "bg-white/10 backdrop-blur-md text-gray-200 border border-white/10",
    inputBg: "bg-white/5 backdrop-blur-xl border border-white/10",
    accent: "text-indigo-300 bg-indigo-500/15 border-indigo-500/25",
    panelBg: "bg-white/5 backdrop-blur-xl border border-white/10"
  }
};
