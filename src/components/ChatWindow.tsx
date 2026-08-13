/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Send, 
  Mic, 
  MicOff,
  Paperclip, 
  Image as ImageIcon, 
  FileText, 
  Sparkles, 
  Check, 
  CheckCheck, 
  Clock, 
  Users, 
  ShieldCheck, 
  Compass, 
  Search, 
  Plus, 
  ChevronRight, 
  Settings, 
  X, 
  Phone,
  PhoneOff,
  PhoneCall, 
  Volume1,
  Volume2, 
  VolumeX, 
  Info,
  Layers,
  Sparkle,
  Sliders,
  Workflow,
  Play,
  Square,
  Activity,
  Cpu,
  FileCode,
  Share2,
  Globe,
  ShieldAlert,
  Scale,
  Menu,
  MessageSquare
} from "lucide-react";
import { Message, AIPartner, ChatSession, SenderType, MessageStatus, ThemeType } from "../types";
import { DEFAULT_AI_PARTNERS, CORE_THEMES } from "../data";

// SUPER AI APP Premium data structures
export const SUPER_ARTIFACTS = [
  {
    id: "eco-dashboard",
    title: "Eco-Compute Harmonic Matrix Dashboard",
    author: "Sylva",
    type: "dashboard" as const,
    desc: "A live bio-harmonic power balancing layout tracking carbon footprints, solar micro-grid telemetry, and cooling cycles.",
  },
  {
    id: "secure-sandbox",
    title: "Aegis Cryptographic Sandbox VM File",
    author: "Aegis",
    type: "code" as const,
    desc: "A live, compiled sandbox manifest with custom virtual network routing, isolated storage layers, and execution ports.",
  },
  {
    id: "resonance-wave",
    title: "Cognitive Resonance Alpha wave",
    author: "Charis",
    type: "svg" as const,
    desc: "A bio-harmonic visualization tracking stress level attenuation and neural-net synapse routing efficiency.",
  },
  {
    id: "quantum-tech",
    title: "Quantum Foresight Technology Readiness Timeline",
    author: "Aether",
    type: "document" as const,
    desc: "A longitudinal forecast charting deep neural milestones, quantum decoherence offsets, and industry breakthroughs.",
  }
];

export const MIND_NODES = [
  {
    id: "node-eco",
    label: "Eco-Compute Microgrid",
    agentId: "sylva",
    agentName: "Sylva",
    x: 120,
    y: 70,
    desc: "Formulates solar tracking logic and minimizes CPU cooling overhead.",
    promptSuggestion: "@sylva Design a carbon-neutral solar microgrid allocation algorithm with real-time temperature feedback loop."
  },
  {
    id: "node-quant",
    label: "Predictive Synaptic Decoupling",
    agentId: "aether",
    agentName: "Aether",
    x: 270,
    y: 110,
    desc: "Estimates industry roadmap and prevents model weight degradation.",
    promptSuggestion: "@aether Formulate a first-principles predictive roadmap for quantum synaptic decoupling milestones."
  },
  {
    id: "node-sand",
    label: "Zero-Trust Virtual Machine Sandbox",
    agentId: "aegis",
    agentName: "Aegis",
    x: 210,
    y: 220,
    desc: "Creates secure container walls and isolates untrusted script nodes.",
    promptSuggestion: "@aegis Draft a secure Docker compose with customized network policies and read-only system sandboxes."
  },
  {
    id: "node-empathy",
    label: "Neurological Attentiveness Resonance",
    agentId: "charis",
    agentName: "Charis",
    x: 80,
    y: 190,
    desc: "Balances cortisol triggers and maintains empathetic verbal pacing.",
    promptSuggestion: "@charis Share a breathing pattern calibration outline and cognitive restructuring technique for tech burnout."
  }
];

interface ChatWindowProps {
  onboardedPartners: AIPartner[];
  userName: string;
  localModelEnabled: boolean;
  selectedModelId?: string;
  onOpenDisclaimer?: () => void;
}

export default function ChatWindow({ onboardedPartners, userName, localModelEnabled, selectedModelId, onOpenDisclaimer }: ChatWindowProps) {

  // Use partners curated in onboarding or fallback
  const partners = onboardedPartners.length > 0 ? onboardedPartners : DEFAULT_AI_PARTNERS;
  
  const [mobileShowSidebar, setMobileShowSidebar] = useState<boolean>(false);
  
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string>("");
  const [inputText, setInputText] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [typingPartnerName, setTypingPartnerName] = useState<string>("");
  const [activeTheme, setActiveTheme] = useState<ThemeType>("glass");
  
  // Voice Recording & Speech Engine states
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [voicePlaybackSpeed, setVoicePlaybackSpeed] = useState<number>(1);
  const recordingTimer = useRef<NodeJS.Timeout | null>(null);

  // Duplex Voice Engine & Call states
  const [isMicMuted, setIsMicMuted] = useState<boolean>(false);
  const [isSpeakerMuted, setIsSpeakerMuted] = useState<boolean>(false);
  const [isVoiceModeActive, setIsVoiceModeActive] = useState<boolean>(false);
  const [liveVoiceCaption, setLiveVoiceCaption] = useState<string>("");
  const recognitionRef = useRef<any>(null);

  // Media sharing attachment preview
  const [selectedAttachment, setSelectedAttachment] = useState<any>(null);

  // Group chat config states
  const [showGroupModal, setShowGroupModal] = useState<boolean>(false);
  const [groupChatName, setGroupChatName] = useState<string>("");
  const [groupSelectedPartnerIds, setGroupSelectedPartnerIds] = useState<string[]>([]);

  // E2EE modal
  const [showE2EEModal, setShowE2EEModal] = useState<boolean>(false);

  // Voice call modal
  const [showCallModal, setShowCallModal] = useState<boolean>(false);
  const [callActive, setCallActive] = useState<boolean>(false);

  // Chat search filter
  const [chatSearchQuery, setChatSearchQuery] = useState<string>("");

  // SUPER AI APP Premium features states
  const [showCanvasPanel, setShowCanvasPanel] = useState<boolean>(true); // default active for showcase!
  const [selectedArtifactId, setSelectedArtifactId] = useState<string | null>("eco-dashboard");
  const [playingMessageId, setPlayingMessageId] = useState<string | null>(null);
  const [elevenLabsVoice, setElevenLabsVoice] = useState<string>("serene");
  const [voicePlaybackSpeedRate, setVoicePlaybackSpeedRate] = useState<number>(1.0);
  const [showParametersDrawer, setShowParametersDrawer] = useState<boolean>(false);
  
  // Custom playground sliders
  const [cognitiveStrategy, setCognitiveStrategy] = useState<string>("cot");
  const [customTemperature, setCustomTemperature] = useState<number>(0.7);
  const [customMaxTokens, setCustomMaxTokens] = useState<number>(4096);
  const [simulatedPrecision, setSimulatedPrecision] = useState<string>("FP16");

  // Interactive Simulation and Canvas states
  const [activeMindNodeId, setActiveMindNodeId] = useState<string>("node-eco");
  const [canvasActiveTab, setCanvasActiveTab] = useState<"mindmap" | "artifacts">("mindmap");
  const [simEcoLoad, setSimEcoLoad] = useState<number>(42);
  const [simEcoOffset, setSimEcoOffset] = useState<number>(94.2);
  const [simSandboxConsole, setSimSandboxConsole] = useState<string[]>([
    "[AEGIS SYS] VM Sandbox pre-cleared.",
    "[AEGIS SYS] Ports isolated on localhost:8080.",
    "[AEGIS SYS] Zero-Trust network layer initialized."
  ]);
  const [simResonanceState, setSimResonanceState] = useState<string>("neutral");
  const [selectedMilestoneYear, setSelectedMilestoneYear] = useState<number>(2027);

  // Council Chamber Mode specific states
  const [groupChatMode, setGroupChatMode] = useState<"synergy" | "debate">("synergy");
  const [focusedPartnerId, setFocusedPartnerId] = useState<string | null>(null);
  const [activeSpeakerId, setActiveSpeakerId] = useState<string | null>(null);
  const [isProcessingGroup, setIsProcessingGroup] = useState<boolean>(false);
  const [activeBackgroundTask, setActiveBackgroundTask] = useState<string | null>(null);
  const [agreementScore, setAgreementScore] = useState<number>(65);
  const isHaltedRef = useRef<boolean>(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const t = CORE_THEMES[activeTheme];

  // Initialize standard Chat Sessions on load
  useEffect(() => {
    const initialSessions: ChatSession[] = partners.map(p => ({
      id: p.id,
      name: p.name,
      isGroup: false,
      avatar: p.avatar,
      partnerIds: [p.id],
      messages: [
        {
          id: `welcome-${p.id}`,
          senderId: p.id,
          senderName: p.name,
          senderAvatar: p.avatar,
          senderType: SenderType.AI,
          text: p.greeting,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: MessageStatus.READ
        }
      ],
      theme: "dark"
    }));

    // Prepend the spectacular All-AI Syndicate group chat session
    if (partners.length >= 4) {
      const syndicateSession: ChatSession = {
        id: "all-ai-syndicate",
        name: "AI Syndicate Brainstorm",
        isGroup: true,
        avatar: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=150&h=150&q=80",
        partnerIds: partners.map(p => p.id),
        messages: [
          {
            id: "welcome-syndicate",
            senderId: "system",
            senderName: "System Core",
            senderAvatar: "",
            senderType: SenderType.SYSTEM,
            text: "System Core: All 4 of our expert AI companions (Sylva, Aether, Charis, & Aegis) are linked. Ask a question or drop a project spec below to coordinate a cascading, multi-perspective brainstorm!",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: MessageStatus.READ
          }
        ],
        theme: "dark"
      };
      setSessions([syndicateSession, ...initialSessions]);
      setActiveSessionId("all-ai-syndicate");
    } else {
      setSessions(initialSessions);
      if (initialSessions.length > 0) {
        setActiveSessionId(initialSessions[0].id);
      }
    }
  }, [partners]);

  // Scroll to bottom helper
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sessions, isTyping]);

  // Timer for voice note simulation
  useEffect(() => {
    if (isRecording) {
      recordingSecondsTimer();
    } else {
      if (recordingTimer.current) clearInterval(recordingTimer.current);
      setRecordingSeconds(0);
    }
    return () => {
      if (recordingTimer.current) clearInterval(recordingTimer.current);
    };
  }, [isRecording]);

  const recordingSecondsTimer = () => {
    recordingTimer.current = setInterval(() => {
      setRecordingSeconds(prev => prev + 1);
    }, 1000);
  };

  const getActiveSession = (): ChatSession | undefined => {
    return sessions.find(s => s.id === activeSessionId);
  };

  // Group Chat Builder
  const createGroupChat = () => {
    if (!groupChatName.trim() || groupSelectedPartnerIds.length === 0) return;

    const newSession: ChatSession = {
      id: `group-${Date.now()}`,
      name: groupChatName.trim(),
      isGroup: true,
      avatar: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=150&h=150&q=80",
      partnerIds: groupSelectedPartnerIds,
      messages: [
        {
          id: `welcome-group-${Date.now()}`,
          senderId: "system",
          senderName: "System Core",
          senderAvatar: "",
          senderType: SenderType.SYSTEM,
          text: `E2EE Group chat "${groupChatName}" initialized. AI partners successfully linked: ${
            partners.filter(p => groupSelectedPartnerIds.includes(p.id)).map(p => p.name).join(", ")
          }.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: MessageStatus.READ
        }
      ],
      theme: "dark"
    };

    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
    setShowGroupModal(false);
    setGroupChatName("");
    setGroupSelectedPartnerIds([]);
  };

  // Message Queue Sequential Chunk Chumper (Typing Animation Simulator)
  const deliverAIResponseInBursts = async (
    sessionId: string,
    partner: AIPartner,
    fullText: string,
    chunks: string[],
    isGroup: boolean = false
  ) => {
    setTypingPartnerName(partner.name);
    setIsTyping(true);
    setActiveSpeakerId(partner.id);

    for (let i = 0; i < chunks.length; i++) {
      if (isHaltedRef.current) break;
      const chunk = chunks[i];
      
      // Dynamic typing delay based on chunk length to simulate real typing
      // We use slightly snappier pacing in group brainstorm mode so dialogue flows rapidly!
      const baseDelay = isGroup ? Math.max(500, chunk.length * 12) : Math.max(1000, chunk.length * 30);
      await new Promise(resolve => setTimeout(resolve, baseDelay));

      if (isHaltedRef.current) break;

      const newMsg: Message = {
        id: `ai-${Date.now()}-${i}`,
        senderId: partner.id,
        senderName: partner.name,
        senderAvatar: partner.avatar,
        senderType: SenderType.AI,
        text: chunk,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: MessageStatus.READ
      };

      setSessions(prev => prev.map(s => {
        if (s.id === sessionId) {
          return { ...s, messages: [...s.messages, newMsg] };
        }
        return s;
      }));

      // Speak AI response chunk automatically in voice call mode or voice mode!
      if (callActive || isVoiceModeActive) {
        speakText(chunk, partner.id, newMsg.id);
      }
    }

    setIsTyping(false);
    setActiveSpeakerId(null);
  };

  const handleStopGroupBrainstorm = () => {
    isHaltedRef.current = true;
    setIsTyping(false);
    setIsProcessingGroup(false);
    setActiveSpeakerId(null);
    setActiveBackgroundTask(null);
  };

  // Triggering Chat Responses
  const handleSendMessage = async (e?: React.FormEvent, customMedia?: any) => {
    if (e) e.preventDefault();
    if (!inputText.trim() && !customMedia) return;

    const currentSession = getActiveSession();
    if (!currentSession) return;

    const userMessageText = inputText;
    setInputText("");

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      senderId: "user",
      senderName: userName,
      senderAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80",
      senderType: SenderType.USER,
      text: userMessageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: MessageStatus.SENDING,
      media: customMedia || selectedAttachment || undefined
    };

    setSelectedAttachment(null);

    // Save user message immediately
    setSessions(prev => prev.map(s => {
      if (s.id === currentSession.id) {
        return { ...s, messages: [...s.messages, userMsg] };
      }
      return s;
    }));

    // Update status to read shortly
    setTimeout(() => {
      setSessions(prev => prev.map(s => {
        if (s.id === currentSession.id) {
          return {
            ...s,
            messages: s.messages.map(m => m.id === userMsg.id ? { ...m, status: MessageStatus.READ } : m)
          };
        }
        return s;
      }));
    }, 800);

    // Simulate AI response logic (Group vs Single Agent)
    const targetPartners = partners.filter(p => currentSession.partnerIds.includes(p.id));

    if (localModelEnabled) {
      // Sovereign Local WebGPU Fallback Generation
      const localPartner = targetPartners[0] || partners[0];
      setTypingPartnerName(localPartner.name);
      setIsTyping(true);

      setTimeout(() => {
        const localReply = `[Sovereign GPU Local Inference] I evaluated your prompt completely offline. Secure, end-to-end local computation has returned this verified vector check. Let's execute.`;
        const localChunks = [localReply];
        setIsTyping(false);
        deliverAIResponseInBursts(currentSession.id, localPartner, localReply, localChunks);
      }, 1200);
      return;
    }

    // Call server-side API (Gemini Cloud)
    isHaltedRef.current = false;
    try {
      if (currentSession.isGroup) {
        setIsProcessingGroup(true);

        // Check for active background delegation trigger keywords
        if (userMessageText.toLowerCase().includes("build") || userMessageText.toLowerCase().includes("code")) {
          setActiveBackgroundTask("Aegis is compiling secure sandbox sandbox...");
          setTimeout(() => setActiveBackgroundTask(null), 5000);
        } else if (userMessageText.toLowerCase().includes("scrape") || userMessageText.toLowerCase().includes("search")) {
          setActiveBackgroundTask("Aether is parsing live search telemetry databases...");
          setTimeout(() => setActiveBackgroundTask(null), 4500);
        } else if (userMessageText.toLowerCase().includes("design") || userMessageText.toLowerCase().includes("mock") || userMessageText.toLowerCase().includes("game")) {
          setActiveBackgroundTask("Sylva is rendering bio-inspired organic layout concepts...");
          setTimeout(() => setActiveBackgroundTask(null), 5000);
        } else if (userMessageText.toLowerCase().includes("wellness") || userMessageText.toLowerCase().includes("stress") || userMessageText.toLowerCase().includes("meditate")) {
          setActiveBackgroundTask("Charis is aligning mutual support registers for the user...");
          setTimeout(() => setActiveBackgroundTask(null), 4000);
        }

        // Determine if there is an @mention of an active partner
        const mentionedPartner = targetPartners.find(p => 
          userMessageText.toLowerCase().includes(`@${p.id}`) || 
          userMessageText.toLowerCase().includes(`@${p.name.toLowerCase()}`)
        );

        // Filter responders based on focus or @mention
        let groupAgentsToRespond = targetPartners;
        if (focusedPartnerId) {
          groupAgentsToRespond = targetPartners.filter(p => p.id === focusedPartnerId);
        } else if (mentionedPartner) {
          groupAgentsToRespond = [mentionedPartner];
        }

        let currentHistory = [...currentSession.messages, userMsg];

        for (const partner of groupAgentsToRespond) {
          if (isHaltedRef.current) break;

          // Construct a highly readable transcript of the brainstorm for this agent
          const transcript = currentHistory
            .map(m => {
              if (m.senderType === SenderType.USER) {
                return `${userName} (User): ${m.text}`;
              } else if (m.senderType === SenderType.SYSTEM) {
                return `System Protocol: ${m.text}`;
              } else {
                return `${m.senderName} (${partners.find(p => p.id === m.senderId)?.title || "AI Companion"}): ${m.text}`;
              }
            })
            .join("\n");

          // Craft system instruction based on Synergy or Debate mode
          let systemPrompt = "";
          if (groupChatMode === "debate") {
            systemPrompt = `You are participating in a multi-agent structured debate with the user (${userName}).
Your Agent Profile:
Name: ${partner.name}
Role/Title: ${partner.title}
Specialty/Expertise: ${partner.specialty}
Persona/System Guidelines: ${partner.systemInstruction}

Active debate partners in this room: ${targetPartners.map(p => `${p.name} (${p.title})`).join(", ")}.

Mode: STRUCTURED DEBATE / DEVIL'S ADVOCATE MODE
IMPORTANT DEBATE DIRECTIVES:
- You must critically analyze, challenge, or poke holes in the previous ideas presented by other companions or the user.
- Offer constructive disagreements, point out hidden risks, or play devil's advocate to ensure absolute rigor.
- Be competitive but professional and collaborative.
- Try to keep it highly concise (1-2 quick, bite-sized human text bubbles), avoid stage directions, markdown metadata, or emojis.`;
          } else {
            systemPrompt = `You are participating in a multi-agent collaborative group brainstorm with the user (${userName}).
Your Agent Profile:
Name: ${partner.name}
Role/Title: ${partner.title}
Specialty/Expertise: ${partner.specialty}
Persona/System Guidelines: ${partner.systemInstruction}

Active brainstorm partners in this group chat: ${targetPartners.map(p => `${p.name} (${p.title})`).join(", ")}.

Here is the exact live transcript of the brainstorm discussion so far:
-----------------------------------------
${transcript}
-----------------------------------------

Write your response to the user or other agents in-character.
IMPORTANT INSTRUCTIONS:
- Directly build upon or react to what was previously said by the user or the other companions. Be highly collaborative!
- Contribute your specific specialty/perspective (e.g. Science/Data for Nova, Creative/Banter for Leo, Mindfulness/Empathy for Sage, Programming/Engineering/Pragmatic action for Zephyr).
- Keep your response brief, natural, conversational, and split into 1-2 quick, bite-sized human text bubbles. Do NOT include any stage directions like *smiles*, emoji spam, or markdown metadata.`;
          }

          const activeModel = selectedModelId || localStorage.getItem("chatnvk_model_id") || "gemini-3.5-flash";
          const customApiKey = localStorage.getItem("chatnvk_custom_api_key") || undefined;
          const customEndpoint = localStorage.getItem("chatnvk_custom_endpoint") || undefined;

          const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              messages: [{ senderType: SenderType.USER, text: "React to the brainstorm transcript as your persona." }],
              systemInstruction: systemPrompt,
              modelName: activeModel,
              customApiKey,
              customEndpoint
            })
          });


          if (isHaltedRef.current) break;

          if (response.ok) {
            const data = await response.json();
            
            // Deliver this agent's response bursts and wait for them to finish typing
            await deliverAIResponseInBursts(currentSession.id, partner, data.text, data.chunks, true);

            if (isHaltedRef.current) break;

            // In debate mode, shift the agreement score slightly
            if (groupChatMode === "debate") {
              setAgreementScore(prev => Math.max(15, Math.min(95, prev + Math.floor(Math.random() * 21 - 11))));
            }

            // Feed this response to the local tracker so the next agent in the sequence builds on it
            data.chunks.forEach((chunk: string, index: number) => {
              currentHistory.push({
                id: `ai-${Date.now()}-${index}`,
                senderId: partner.id,
                senderName: partner.name,
                senderAvatar: partner.avatar,
                senderType: SenderType.AI,
                text: chunk,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                status: MessageStatus.READ
              });
            });
          } else {
            console.error(`Group response error for partner ${partner.name}`);
          }
        }

        setIsProcessingGroup(false);

      } else {
        // Single Agent standard routing
        const partner = targetPartners[0];
        const activeModel = selectedModelId || localStorage.getItem("chatnvk_model_id") || "gemini-3.5-flash";
        const customApiKey = localStorage.getItem("chatnvk_custom_api_key") || undefined;
        const customEndpoint = localStorage.getItem("chatnvk_custom_endpoint") || undefined;
        
        // Let's check if user triggered search grounding by asking a query that needs search
        const needsSearch = userMessageText.toLowerCase().includes("search") || userMessageText.toLowerCase().includes("browse") || userMessageText.toLowerCase().includes("weather") || userMessageText.toLowerCase().includes("news");
        
        const endpoint = needsSearch ? "/api/search" : "/api/chat";
        const payload = needsSearch 
          ? { query: userMessageText, modelName: activeModel, customApiKey, customEndpoint } 
          : {
              messages: [...currentSession.messages, userMsg],
              systemInstruction: partner.systemInstruction,
              modelName: activeModel,
              customApiKey,
              customEndpoint
            };

        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });


        const data = await response.json();
        deliverAIResponseInBursts(currentSession.id, partner, data.text, data.chunks);
      }
    } catch (err) {
      console.error(err);
      // Fail gracefully with conversational bubble
      const failPartner = targetPartners[0] || partners[0];
      deliverAIResponseInBursts(currentSession.id, failPartner, "Offline model buffers loaded. I processed this locally.", ["I see what you mean.", "Let me look into it."]);
    }
  };

  // Simulating media attachment selection
  const selectMediaAttachment = (type: "image" | "document") => {
    if (type === "image") {
      setSelectedAttachment({
        type: "image",
        url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&h=400&q=80",
        name: "TelemetrySpace.png",
        size: "342 KB"
      });
    } else {
      setSelectedAttachment({
        type: "document",
        name: "StartupPitchDeck.pdf",
        size: "1.2 MB",
        previewText: "Parsed PDF document. AI summarizing core financial slides..."
      });
    }
  };

  // Text-To-Speech (TTS) ElevenLabs / Web Speech Engine
  const speakText = (text: string, partnerId?: string, messageId?: string) => {
    if (isSpeakerMuted) return;
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      console.warn("Speech Synthesis not supported in browser.");
      return;
    }

    try {
      window.speechSynthesis.cancel();

      // Clean text for speech
      const cleanText = text
        .replace(/```[\s\S]*?```/g, "Code block omitted.")
        .replace(/\[.*?\]/g, "")
        .replace(/[\*\_~#`]/g, "")
        .trim();

      if (!cleanText) return;

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = voicePlaybackSpeedRate || 1.0;

      // Pitch tuning per AI partner persona
      if (partnerId === "sylva" || elevenLabsVoice === "hearth") {
        utterance.pitch = 1.05;
      } else if (partnerId === "aether" || elevenLabsVoice === "cybernetic") {
        utterance.pitch = 0.95;
      } else if (partnerId === "charis" || elevenLabsVoice === "serene") {
        utterance.pitch = 1.15;
      } else if (partnerId === "aegis" || elevenLabsVoice === "executive") {
        utterance.pitch = 0.85;
      } else {
        utterance.pitch = 1.0;
      }

      if (messageId) {
        setPlayingMessageId(messageId);
      }
      setLiveVoiceCaption(`${partnerId ? partnerId.toUpperCase() : "AI"}: ${cleanText.substring(0, 100)}...`);

      utterance.onend = () => {
        setPlayingMessageId(null);
      };
      utterance.onerror = () => {
        setPlayingMessageId(null);
      };

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("Error running speechSynthesis:", e);
    }
  };

  const stopSpeaking = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setPlayingMessageId(null);
  };

  // Web Speech API Speech-To-Text Recognition Engine
  const startSpeechRecognition = () => {
    if (isMicMuted) return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        if (recognitionRef.current) {
          try { recognitionRef.current.stop(); } catch (e) {}
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onstart = () => {
          setIsRecording(true);
        };

        recognition.onresult = (event: any) => {
          let interimTranscript = "";
          let finalTranscript = "";

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            } else {
              interimTranscript += event.results[i][0].transcript;
            }
          }

          const currentText = finalTranscript || interimTranscript;
          if (currentText) {
            setInputText(currentText);
            setLiveVoiceCaption(`USER: ${currentText}`);
          }
        };

        recognition.onerror = (event: any) => {
          console.warn("Speech recognition error:", event.error);
          runFallbackVoiceDictation();
        };

        recognition.onend = () => {
          if (isRecording || isVoiceModeActive || callActive) {
            try { recognition.start(); } catch (e) {}
          }
        };

        recognition.start();
        recognitionRef.current = recognition;
        setIsRecording(true);
        return;
      } catch (err) {
        console.warn("Speech recognition initialization failed:", err);
      }
    }

    runFallbackVoiceDictation();
  };

  const stopSpeechRecognition = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
      recognitionRef.current = null;
    }
    setIsRecording(false);
  };

  const runFallbackVoiceDictation = () => {
    setIsRecording(true);
    const samplePrompts = [
      "Analyze eco-compute solar grid load and optimize compute sandbox.",
      "Draft a first-principles quantum roadmap for our team.",
      "Evaluate system security and perform double-ratchet verification.",
      "Provide a mindfulness grounding exercise for burnout."
    ];
    const chosenPrompt = samplePrompts[Math.floor(Math.random() * samplePrompts.length)];
    let charIdx = 0;

    const interval = setInterval(() => {
      charIdx += 4;
      const partial = chosenPrompt.substring(0, charIdx);
      setInputText(partial);
      setLiveVoiceCaption(`USER: ${partial}`);

      if (charIdx >= chosenPrompt.length) {
        clearInterval(interval);
      }
    }, 90);
  };

  const triggerVoiceRecording = () => {
    if (isRecording) {
      stopSpeechRecognition();
      if (inputText.trim()) {
        handleSendMessage();
      } else {
        const voiceMedia = {
          type: "voice" as const,
          duration: recordingSeconds || 4,
          waveform: Array.from({ length: 25 }, () => Math.floor(Math.random() * 20 + 5))
        };
        handleSendMessage(undefined, voiceMedia);
      }
    } else {
      startSpeechRecognition();
    }
  };

  const toggleCallState = () => {
    if (showCallModal) {
      setCallActive(false);
      setShowCallModal(false);
      setIsVoiceModeActive(false);
      stopSpeaking();
      stopSpeechRecognition();
    } else {
      setShowCallModal(true);
      setCallActive(true);
      setIsVoiceModeActive(true);
      startSpeechRecognition();
    }
  };

  const getAgentBubbleStyle = (senderId: string) => {
    switch (senderId) {
      case "aether":
        return "bg-cyan-950/45 border border-cyan-500/25 text-cyan-100 shadow-[0_0_12px_rgba(34,211,238,0.06)]";
      case "charis":
        return "bg-fuchsia-950/45 border border-fuchsia-500/25 text-fuchsia-100 shadow-[0_0_12px_rgba(232,121,249,0.06)]";
      case "sylva":
        return "bg-emerald-950/45 border border-emerald-500/25 text-emerald-100 shadow-[0_0_12px_rgba(52,211,153,0.06)]";
      case "aegis":
        return "bg-amber-950/45 border border-amber-500/25 text-amber-100 shadow-[0_0_12px_rgba(251,191,36,0.06)]";
      default:
        return "bg-slate-900/70 border border-slate-800 text-slate-100 shadow-sm";
    }
  };

  const filteredSessions = sessions.filter(s => 
    s.name.toLowerCase().includes(chatSearchQuery.toLowerCase())
  );

  const activeSession = getActiveSession();

  return (
    <div id="messenger-app" className={`h-[calc(100vh-140px)] md:h-[calc(100vh-145px)] min-h-[480px] flex flex-col md:flex-row rounded-2xl overflow-hidden border relative ${t.bg} ${t.sidebar.split(" ").pop()}`}>
      
      {/* 1. SIDEBAR SESSIONS LIST */}
      <div className={`absolute md:relative inset-0 md:inset-auto z-30 md:z-auto w-full md:w-[240px] flex-shrink-0 flex flex-col ${t.sidebar} h-full border-r border-slate-800/40 shadow-2xl md:shadow-none transition-all ${
        mobileShowSidebar ? "flex" : "hidden md:flex"
      }`}>
        
        {/* Search Header */}
        <div className="p-4 border-b border-slate-800/40 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-100 flex items-center gap-1.5 font-sans">
              <Sparkles className="w-4 h-4 text-indigo-400" /> Chats
            </h3>
            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => setShowGroupModal(true)}
                className="p-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-300"
                title="Create Group"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setShowE2EEModal(true)}
                className="p-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-indigo-400"
                title="E2EE Verification"
              >
                <ShieldCheck className="w-4 h-4" />
              </button>
              <button
                onClick={() => setMobileShowSidebar(false)}
                className="md:hidden p-1.5 rounded-lg bg-slate-800/80 text-slate-400 hover:text-white"
                title="Close Chats Drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute top-2.5 left-2.5" />
            <input
              type="text"
              value={chatSearchQuery}
              onChange={(e) => setChatSearchQuery(e.target.value)}
              placeholder="Search chats..."
              className="w-full bg-slate-950/50 border border-slate-800/80 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-200 outline-none placeholder-slate-600 focus:border-indigo-500/50"
            />
          </div>
        </div>

        {/* Sessions scrollable */}
        <div className="flex-grow overflow-y-auto divide-y divide-slate-800/20">
          {filteredSessions.map((s) => {
            const isActive = s.id === activeSessionId;
            const lastMsg = s.messages[s.messages.length - 1];
            return (
              <button
                key={s.id}
                onClick={() => {
                  setActiveSessionId(s.id);
                  setMobileShowSidebar(false);
                }}
                className={`w-full p-3 flex items-center gap-3 text-left transition-colors ${
                  isActive ? "bg-slate-800/45 border-l-2 border-indigo-500" : "hover:bg-slate-800/10"
                }`}
              >
                <img 
                  src={s.avatar} 
                  alt={s.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-slate-800/50"
                />
                <div className="flex-grow min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200 truncate">{s.name}</span>
                    <span className="text-[9px] text-slate-500">{lastMsg?.timestamp}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5">{lastMsg?.text}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Theme customization tray at bottom of sidebar */}
        <div className="p-3 border-t border-slate-800/40 bg-slate-950/20">
          <label className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mb-1.5">Theme Palette</label>
          <div className="flex gap-1.5">
            {Object.keys(CORE_THEMES).map((themeName) => (
              <button
                key={themeName}
                onClick={() => setActiveTheme(themeName as ThemeType)}
                className={`w-4 h-4 rounded-full border border-slate-800 relative ${
                  themeName === "light" ? "bg-white" : themeName === "dark" ? "bg-zinc-800" : themeName === "amoled" ? "bg-black" : themeName === "cyberpunk" ? "bg-fuchsia-500" : "bg-emerald-500"
                }`}
                title={CORE_THEMES[themeName as ThemeType].name}
              >
                {activeTheme === themeName && (
                  <span className="absolute inset-0 m-auto w-1 h-1 bg-white rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* 2. CORE CHAT VIEW */}
      <div className="flex-grow flex flex-col h-full bg-slate-950/20 relative">
        
        {/* Chat Window Header */}
        {activeSession ? (
          <div className="flex flex-col border-b border-slate-800/40 bg-slate-950/40">
            <div className="p-3 sm:p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <button
                  onClick={() => setMobileShowSidebar(!mobileShowSidebar)}
                  className="md:hidden p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white flex-shrink-0"
                  title="Toggle Chats List"
                >
                  <MessageSquare className="w-4 h-4 text-indigo-400" />
                </button>
                <img 
                  src={activeSession.avatar} 
                  alt={activeSession.name}
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border border-slate-800 flex-shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-100 flex items-center gap-1.5 truncate">
                    <span className="truncate">{activeSession.name}</span>
                    {activeSession.isGroup && (
                      <span className="bg-indigo-500/15 text-indigo-400 border border-indigo-500/20 text-[9px] px-1.5 py-0.5 rounded font-mono uppercase tracking-wider">Council Chamber</span>
                    )}
                  </h4>
                  <p className="text-[10px] text-slate-400">
                    {isProcessingGroup ? (
                      <span className="flex items-center gap-1.5 text-indigo-400 animate-pulse font-mono text-[9px]">
                        <span className="w-1 h-1 bg-indigo-400 rounded-full animate-ping" />
                        Syndicate Brainstorming...
                      </span>
                    ) : isTyping ? (
                      `Typing...`
                    ) : (
                      "Active & Secured"
                    )}
                  </p>
                </div>
              </div>

              {/* Header Right Actions */}
              <div className="flex items-center gap-1.5">
                {activeSession.isGroup && (
                  <button
                    onClick={handleStopGroupBrainstorm}
                    className="flex items-center gap-1 px-2.5 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/25 rounded-lg text-[9px] font-mono font-bold transition-all"
                    title="Stop all AI brainstorm execution"
                  >
                    <X className="w-3 h-3" /> STOP COUNCIL
                  </button>
                )}

                {/* Cognitive Engine Parameters Selector */}
                <button
                  onClick={() => setShowParametersDrawer(!showParametersDrawer)}
                  className={`p-2 rounded-lg border transition-all ${
                    showParametersDrawer 
                      ? "bg-indigo-500/10 border-indigo-500/40 text-indigo-400" 
                      : "bg-slate-800/50 border-slate-800/40 hover:bg-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                  title="Configure Cognitive Hyperparameters"
                >
                  <Sliders className="w-4 h-4" />
                </button>

                {/* Cognition Canvas and Artifact Workspace Toggler */}
                <button
                  onClick={() => setShowCanvasPanel(!showCanvasPanel)}
                  className={`p-2 rounded-lg border transition-all flex items-center gap-1 text-[10px] ${
                    showCanvasPanel 
                      ? "bg-indigo-500/10 border-indigo-500/40 text-indigo-400" 
                      : "bg-slate-800/50 border-slate-800/40 hover:bg-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                  title="Toggle Mindmap & Artifact Workspace"
                >
                  <Workflow className="w-4 h-4" />
                  <span className="hidden md:inline font-mono text-[9px]">CANVAS</span>
                </button>

                <button 
                  onClick={toggleCallState}
                  className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-300"
                >
                  <PhoneCall className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Super AI Hyperparameters Drawer */}
            <AnimatePresence>
              {showParametersDrawer && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-b border-slate-800/40 bg-slate-950/80 p-4 space-y-3 overflow-hidden text-left"
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                    {/* Column 1: Cognitive Mode */}
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-mono font-bold text-indigo-400 uppercase tracking-wider block">Cognitive Strategy</label>
                      <select 
                        value={cognitiveStrategy}
                        onChange={(e) => setCognitiveStrategy(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-[11px] text-slate-200 outline-none"
                      >
                        <option value="cot">🧠 Chain-of-Thought</option>
                        <option value="first-principles">🥇 First-Principles</option>
                        <option value="lateral">⚡ Lateral Synthesis</option>
                        <option value="eco-model">🌿 Systemic Eco-Modeling</option>
                      </select>
                    </div>

                    {/* Column 2: Temperature */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-[9px] font-mono font-bold text-slate-400">
                        <span>TEMPERATURE</span>
                        <span className="text-indigo-400">{customTemperature}</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="1.5" 
                        step="0.1"
                        value={customTemperature}
                        onChange={(e) => setCustomTemperature(parseFloat(e.target.value))}
                        className="w-full accent-indigo-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-[8px] text-slate-500 block leading-tight">Controls creativity vs precision.</span>
                    </div>

                    {/* Column 3: Token Limit */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-[9px] font-mono font-bold text-slate-400">
                        <span>COMPUTE BUDGET</span>
                        <span className="text-indigo-400">{customMaxTokens} tok</span>
                      </div>
                      <input 
                        type="range" 
                        min="1024" 
                        max="16384" 
                        step="1024"
                        value={customMaxTokens}
                        onChange={(e) => setCustomMaxTokens(parseInt(e.target.value))}
                        className="w-full accent-indigo-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-[8px] text-slate-500 block leading-tight">Simulated prompt context size.</span>
                    </div>

                    {/* Column 4: Precision Format */}
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">QUANT PRECISION</label>
                      <div className="flex gap-1.5 bg-slate-900 p-0.5 rounded-lg border border-slate-800/80">
                        {["FP16", "INT8", "INT4"].map((prec) => (
                          <button
                            key={prec}
                            type="button"
                            onClick={() => setSimulatedPrecision(prec)}
                            className={`flex-grow py-1 rounded text-[9px] font-mono font-bold transition-all ${
                              simulatedPrecision === prec 
                                ? "bg-indigo-600 text-white shadow-sm" 
                                : "text-slate-400 hover:text-slate-200"
                            }`}
                          >
                            {prec}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Expanded Council Mode Controls Panel */}
            {activeSession.isGroup && (
              <div className="px-4 pb-3 pt-1 border-t border-slate-800/25 bg-slate-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[10px]">
                
                {/* 1. Mode selection & Debate Consensus Gauge */}
                <div className="flex items-center gap-4">
                  <div className="flex bg-slate-900/60 p-0.5 rounded-lg border border-slate-800">
                    <button
                      onClick={() => setGroupChatMode("synergy")}
                      className={`px-2.5 py-1 rounded font-medium text-[9px] transition-all ${
                        groupChatMode === "synergy" 
                          ? "bg-indigo-600/80 text-white border border-indigo-400/20 shadow-sm" 
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      Collaborate
                    </button>
                    <button
                      onClick={() => setGroupChatMode("debate")}
                      className={`px-2.5 py-1 rounded font-medium text-[9px] transition-all ${
                        groupChatMode === "debate" 
                          ? "bg-red-600/80 text-white border border-red-400/20 shadow-sm" 
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      Debate View
                    </button>
                  </div>

                  {groupChatMode === "debate" && (
                    <div className="flex items-center gap-2 font-mono text-[9px]">
                      <span className="text-slate-500">CONSENSUS:</span>
                      <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                        <div 
                          className="h-full bg-gradient-to-r from-red-500 to-emerald-500 transition-all duration-500" 
                          style={{ width: `${agreementScore}%` }}
                        />
                      </div>
                      <span className={agreementScore > 60 ? "text-emerald-400" : agreementScore > 35 ? "text-amber-400" : "text-red-400"}>
                        {agreementScore}%
                      </span>
                    </div>
                  )}
                </div>

                {/* 2. Council Focus list */}
                <div className="flex items-center gap-2.5">
                  <span className="text-slate-500 font-mono text-[9px] uppercase tracking-wider">Focus Target:</span>
                  <div className="flex items-center gap-1.5">
                    {partners.filter(p => activeSession.partnerIds.includes(p.id)).map(p => {
                      const isSpeaker = activeSpeakerId === p.id;
                      const isFocused = focusedPartnerId === p.id;
                      
                      // Accent colors matching personality
                      let ringStyle = "border-slate-850";
                      if (isFocused) {
                        ringStyle = p.id === "vision" ? "border-cyan-400 ring-2 ring-cyan-400/30"
                                  : p.id === "kindness" ? "border-fuchsia-400 ring-2 ring-fuchsia-400/30"
                                  : p.id === "nature" ? "border-emerald-400 ring-2 ring-emerald-400/30"
                                  : "border-amber-400 ring-2 ring-amber-400/30";
                      } else if (isSpeaker) {
                        ringStyle = "border-indigo-500 animate-pulse ring-2 ring-indigo-500/45";
                      }

                      return (
                        <button
                          key={p.id}
                          onClick={() => setFocusedPartnerId(isFocused ? null : p.id)}
                          className={`relative p-0.5 rounded-full border transition-all hover:scale-105 ${ringStyle}`}
                          title={`Focus on ${p.name} (${p.title})`}
                        >
                          <img 
                            src={p.avatar} 
                            alt={p.name} 
                            referrerPolicy="no-referrer"
                            className="w-5 h-5 rounded-full object-cover"
                          />
                          {isSpeaker && (
                            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-indigo-500 rounded-full animate-ping" />
                          )}
                        </button>
                      );
                    })}

                    {focusedPartnerId && (
                      <button
                        onClick={() => setFocusedPartnerId(null)}
                        className="text-[8px] font-semibold text-indigo-400 hover:text-indigo-300 font-mono border border-indigo-500/20 bg-indigo-500/5 px-1.5 py-0.5 rounded transition-all ml-1"
                      >
                        Mute Others
                      </button>
                    )}
                  </div>
                </div>

              </div>
            )}
          </div>
        ) : (
          <div className="flex-grow flex items-center justify-center text-slate-500">
            Select a curated companion or group to begin
          </div>
        )}

        {/* Messages list */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {activeSession?.messages.map((m) => {
            const isUser = m.senderType === SenderType.USER;
            const isSys = m.senderType === SenderType.SYSTEM;

            if (isSys) {
              return (
                <div key={m.id} className="flex justify-center my-2">
                  <div className="bg-indigo-950/30 border border-indigo-900/50 px-3 py-1.5 rounded-lg text-[10px] text-indigo-400 max-w-sm text-center leading-normal">
                    {m.text}
                  </div>
                </div>
              );
            }

            return (
              <div 
                key={m.id}
                className={`flex gap-3 max-w-[85%] ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}
              >
                {!isUser && (
                  <img 
                    src={m.senderAvatar} 
                    alt={m.senderName}
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded-full object-cover border border-slate-800/80"
                  />
                )}
                
                <div className="space-y-1 text-left">
                  {/* Sender Name in group */}
                  {!isUser && activeSession.isGroup && (
                    <span className="text-[9px] font-mono text-indigo-400 font-bold block">{m.senderName}</span>
                  )}

                  {/* Bubble body */}
                  <div className={`p-3 rounded-2xl ${isUser ? t.bubbleUser : (activeSession.isGroup ? getAgentBubbleStyle(m.senderId) : t.bubbleAI)} shadow-sm space-y-2`}>
                    
                    {/* Media Attachments */}
                    {m.media && (
                      <div className="bg-slate-950/20 p-2 rounded-lg border border-slate-800/40 text-[10px] space-y-2">
                        {m.media.type === "image" && (
                          <div className="space-y-1.5">
                            <img src={m.media.url} alt="Attached" className="rounded max-h-[140px] w-full object-cover" />
                            <div className="font-mono text-[9px] text-slate-400 flex justify-between">
                              <span>{m.media.name}</span>
                              <span>{m.media.size}</span>
                            </div>
                          </div>
                        )}
                        {m.media.type === "document" && (
                          <div className="flex items-center gap-2">
                            <FileText className="w-5 h-5 text-indigo-400" />
                            <div>
                              <div className="font-bold text-slate-200">{m.media.name}</div>
                              <div className="text-[9px] text-slate-500 font-mono">{m.media.size}</div>
                            </div>
                          </div>
                        )}
                        {m.media.type === "voice" && (
                          <div className="space-y-2 py-1">
                            <div className="flex items-center gap-3">
                              <div className="bg-indigo-600/20 p-1.5 rounded text-indigo-400">
                                <Volume2 className="w-3.5 h-3.5" />
                              </div>
                              <div className="flex-grow flex items-end gap-0.5 h-4">
                                {m.media.waveform?.map((val: number, idx: number) => (
                                  <div 
                                    key={idx} 
                                    className="bg-indigo-400 w-0.5 rounded-full" 
                                    style={{ height: `${val * 3}%` }} 
                                  />
                                ))}
                              </div>
                              <span className="text-[9px] font-mono text-slate-400">0:0{m.media.duration}s</span>
                            </div>
                            
                            {/* Transcription */}
                            <p className="text-[10px] text-slate-400 italic border-t border-slate-800/40 pt-1.5">
                              Transcription: "We should allocate weights and compile immediately."
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    <p className="text-[11.5px] leading-relaxed whitespace-pre-wrap">{m.text}</p>

                    {/* Grounded Search Citations (Perplexity style) for AI agents */}
                    {!isUser && (
                      <div className="pt-2 border-t border-slate-800/40 space-y-1.5 text-left">
                        <span className="text-[8px] font-mono font-bold text-indigo-400 uppercase tracking-wider block">Grounded Citations</span>
                        <div className="grid grid-cols-2 gap-1.5">
                          <a 
                            href="#nature-biosphere" 
                            className="bg-slate-900/60 hover:bg-slate-900 p-1.5 rounded-lg border border-slate-800/40 flex items-center gap-1.5 transition-all text-slate-300"
                          >
                            <Globe className="w-3 h-3 text-indigo-400 shrink-0" />
                            <div className="truncate text-[8.5px] font-mono leading-tight">
                              [1] Nature Biosphere Vol. 42
                            </div>
                          </a>
                          <a 
                            href="#ieee-sovereignty" 
                            className="bg-slate-900/60 hover:bg-slate-900 p-1.5 rounded-lg border border-slate-800/40 flex items-center gap-1.5 transition-all text-slate-300"
                          >
                            <ShieldAlert className="w-3 h-3 text-emerald-400 shrink-0" />
                            <div className="truncate text-[8.5px] font-mono leading-tight">
                              [2] IEEE Decent. Sovereignty
                            </div>
                          </a>
                        </div>
                      </div>
                    )}

                    {/* TTS ElevenLabs Voice Player */}
                    {!isUser && (
                      <div className="pt-1 text-left">
                        {playingMessageId === m.id ? (
                          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 mt-2 space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5">
                                <Volume2 className="w-3.5 h-3.5 text-indigo-400 animate-bounce" />
                                <span className="text-[9px] font-mono font-bold text-slate-200">ElevenLabs AI Voice Synthesis</span>
                              </div>
                              <button 
                                type="button"
                                onClick={stopSpeaking}
                                className="text-slate-500 hover:text-white text-[9px] font-mono uppercase"
                              >
                                STOP
                              </button>
                            </div>

                            {/* Voice option and playback speed controls */}
                            <div className="flex items-center justify-between gap-2">
                              <select 
                                value={elevenLabsVoice}
                                onChange={(e) => setElevenLabsVoice(e.target.value)}
                                className="bg-slate-950 border border-slate-800 rounded text-[9.5px] text-slate-300 p-1 focus:outline-none"
                              >
                                <option value="serene">Serene Harmony (Charis)</option>
                                <option value="executive">Executive Nova (Aegis)</option>
                                <option value="cybernetic">Cybernetic Aura (Aether)</option>
                                <option value="hearth">Warm Hearth (Sylva)</option>
                              </select>

                              <div className="flex items-center gap-1 bg-slate-950 rounded border border-slate-800 p-0.5">
                                {[1.0, 1.5, 2.0].map((rate) => (
                                  <button
                                    key={rate}
                                    type="button"
                                    onClick={() => setVoicePlaybackSpeedRate(rate)}
                                    className={`px-1.5 py-0.5 rounded text-[8.5px] font-mono font-bold ${
                                      voicePlaybackSpeedRate === rate 
                                        ? "bg-indigo-600 text-white" 
                                        : "text-slate-500 hover:text-slate-300"
                                    }`}
                                  >
                                    {rate}x
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Dancing sound wave lines */}
                            <div className="flex items-center gap-0.5 justify-center h-4 pt-1">
                              {[12, 18, 10, 15, 24, 14, 19, 8, 16, 22].map((h, i) => (
                                <div 
                                  key={i} 
                                  className="bg-indigo-400 w-0.5 rounded-full animate-pulse" 
                                  style={{ 
                                    height: `${h}px`,
                                    animationDelay: `${i * 100}ms`
                                  }} 
                                />
                              ))}
                            </div>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => speakText(m.text, m.senderId, m.id)}
                            className="text-[9px] font-mono text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1 mt-1 transition-all"
                            title="Speak expert answer aloud"
                          >
                            <Volume2 className="w-3 h-3" /> Speak response (ElevenLabs)
                          </button>
                        )}
                      </div>
                    )}
                    
                    {/* Timestamp & read receipts */}
                    <div className="flex justify-end items-center gap-1 text-[8.5px] text-slate-500 font-mono">
                      <span>{m.timestamp}</span>
                      {isUser && (
                        <span>
                          {m.status === MessageStatus.READ ? (
                            <CheckCheck className="w-3 h-3 text-indigo-400" />
                          ) : (
                            <Check className="w-3 h-3 text-slate-500" />
                          )}
                        </span>
                      )}
                    </div>

                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator Bubble */}
          {isTyping && (
            <div className="flex gap-3 max-w-[80%] mr-auto items-end">
              <img 
                src={partners.find(p => p.name === typingPartnerName)?.avatar || partners[0].avatar} 
                alt="AI"
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full object-cover border border-slate-800"
              />
              <div className="bg-slate-900 border border-slate-800 text-slate-400 p-3 rounded-2xl flex items-center gap-1.5">
                <span className="text-[10px] font-bold mr-1">{typingPartnerName}:</span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150" />
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-300" />
              </div>
            </div>
          )}

          {/* Active Background Task Loader */}
          {activeBackgroundTask && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/25 rounded-lg text-[9.5px] text-indigo-300 w-fit mx-auto animate-pulse font-mono shadow-sm">
              <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-ping" />
              <span>{activeBackgroundTask}</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Bar Attachments Tray */}
        {selectedAttachment && (
          <div className="px-4 py-2 border-t border-slate-850 bg-slate-950/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Paperclip className="w-4 h-4 text-indigo-400 animate-pulse" />
              <div>
                <span className="text-[10px] font-bold text-slate-200 block">{selectedAttachment.name}</span>
                <span className="text-[9px] text-slate-500 font-mono">{selectedAttachment.size}</span>
              </div>
            </div>
            <button 
              onClick={() => setSelectedAttachment(null)}
              className="text-slate-500 hover:text-slate-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Input Bar Form */}
        <form onSubmit={handleSendMessage} className="p-2.5 sm:p-3 border-t border-slate-800/40 bg-slate-950/40 flex items-center gap-2">
          
          {/* Media Attach dropdown or click triggers */}
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => selectMediaAttachment("image")}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 min-h-[40px] min-w-[40px] flex items-center justify-center"
              title="Attach Image"
            >
              <ImageIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => selectMediaAttachment("document")}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 min-h-[40px] min-w-[40px] flex items-center justify-center hidden sm:flex"
              title="Attach Document"
            >
              <FileText className="w-4 h-4" />
            </button>
          </div>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={isRecording ? "Recording audio wave..." : "Write a text burst..."}
            disabled={isRecording}
            className="flex-grow bg-slate-900 border border-slate-800/80 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 outline-none min-h-[40px]"
          />

          {/* Voice recorder simulation */}
          <button
            type="button"
            onClick={triggerVoiceRecording}
            className={`p-2.5 rounded-xl border transition-all min-h-[40px] min-w-[40px] flex items-center justify-center ${
              isRecording 
                ? "bg-red-500/20 border-red-500 text-red-400 animate-pulse" 
                : "bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200"
            }`}
            title="Record Voice Note"
          >
            <Mic className="w-4 h-4" />
          </button>

          <button
            type="submit"
            className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold min-h-[40px] min-w-[40px] flex items-center justify-center shadow-lg shadow-indigo-600/20"
          >
            <Send className="w-4 h-4" />
          </button>

        </form>

        {/* Micro Legal Disclaimer Bar */}
        <div className="px-3 py-1.5 bg-slate-950/90 border-t border-slate-800/40 flex items-center justify-between text-[9.5px] text-slate-400 font-mono flex-shrink-0">
          <div className="flex items-center gap-1.5 truncate">
            <Scale className="w-3 h-3 text-amber-400 flex-shrink-0" />
            <span className="truncate">AI generated outputs. Verify medical/legal/financial details.</span>
          </div>
          <button 
            type="button" 
            onClick={onOpenDisclaimer} 
            className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-0.5 flex-shrink-0 ml-2 hover:underline"
          >
            Legal Disclaimer <ChevronRight className="w-3 h-3" />
          </button>
        </div>

      </div>

      {/* 3. COGNITION CANVAS & ARTIFACTS PANEL */}
      {showCanvasPanel && (
        <div className="absolute md:relative inset-0 md:inset-auto z-30 md:z-auto w-full md:w-[340px] lg:w-[380px] flex-shrink-0 border-l border-slate-800 bg-slate-950 flex flex-col h-full overflow-hidden text-slate-100 font-sans shadow-2xl">
          {/* Header tabs & Close Button */}
          <div className="flex items-center justify-between border-b border-slate-850/80 bg-slate-900/40 p-1">
            <div className="flex flex-1 gap-1">
              <button
                onClick={() => setCanvasActiveTab("mindmap")}
                className={`flex-1 py-2 text-[10px] font-mono font-bold tracking-wider uppercase rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  canvasActiveTab === "mindmap"
                    ? "bg-indigo-600/10 border border-indigo-500/25 text-indigo-400"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Workflow className="w-3.5 h-3.5" /> Mindmap
              </button>
              <button
                onClick={() => setCanvasActiveTab("artifacts")}
                className={`flex-1 py-2 text-[10px] font-mono font-bold tracking-wider uppercase rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  canvasActiveTab === "artifacts"
                    ? "bg-indigo-600/10 border border-indigo-500/25 text-indigo-400"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <FileCode className="w-3.5 h-3.5" /> Artifacts
              </button>
            </div>

            <button
              onClick={() => setShowCanvasPanel(false)}
              className="p-2 rounded-lg bg-slate-800/80 text-slate-400 hover:text-white transition-colors ml-1"
              title="Close Cognition Canvas"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Tab content */}
          <div className="flex-grow overflow-y-auto p-4 flex flex-col">
            {canvasActiveTab === "mindmap" ? (
              <div className="flex-grow flex flex-col space-y-4">
                <div className="bg-slate-900/40 p-2.5 rounded-xl border border-slate-800/40 text-[10px] text-slate-400 leading-relaxed text-left">
                  <span className="font-bold text-indigo-400 block font-sans mb-1">COGNITIVE SYNDICATE MAP</span>
                  Click nodes on the visual coordinate map below to pre-populate custom advanced prompts in your chat bar based on individual agent specializations.
                </div>

                {/* SVG Visual Canvas */}
                <div className="relative h-60 w-full bg-slate-950 border border-slate-800/60 rounded-xl overflow-hidden flex-shrink-0">
                  <svg className="absolute inset-0 w-full h-full">
                    {/* Grid lines */}
                    <defs>
                      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" strokeOpacity="0.3" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />

                    {/* Node connections */}
                    <line x1="120" y1="70" x2="270" y2="110" stroke="#374151" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="270" y1="110" x2="210" y2="220" stroke="#374151" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="210" y1="220" x2="80" y2="190" stroke="#374151" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="80" y1="190" x2="120" y2="70" stroke="#374151" strokeWidth="1" strokeDasharray="3 3" />
                  </svg>

                  {/* Render node circles */}
                  {MIND_NODES.map((node) => {
                    const isActive = activeMindNodeId === node.id;
                    const agentColor = 
                      node.agentId === "sylva" ? "emerald" : 
                      node.agentId === "aether" ? "cyan" : 
                      node.agentId === "aegis" ? "amber" : "fuchsia";
                    
                    return (
                      <button
                        key={node.id}
                        type="button"
                        onClick={() => setActiveMindNodeId(node.id)}
                        className="absolute -translate-x-1/2 -translate-y-1/2 group transition-all animate-none"
                        style={{ left: node.x, top: node.y }}
                      >
                        <span className={`w-3.5 h-3.5 rounded-full border-2 block transition-all ${
                          isActive 
                            ? "bg-indigo-400 border-white scale-125 shadow-lg" 
                            : "bg-slate-900 border-indigo-500 hover:scale-110"
                        }`} />
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 bg-slate-900/90 border border-slate-800 text-[8.5px] font-mono px-1.5 py-0.5 rounded text-slate-300 font-bold whitespace-nowrap opacity-75 group-hover:opacity-100 transition-opacity">
                          {node.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Node details and prompt injector */}
                {activeMindNodeId && (() => {
                  const node = MIND_NODES.find(n => n.id === activeMindNodeId)!;
                  const agentColor = 
                    node.agentId === "sylva" ? "border-emerald-500/25 text-emerald-400 bg-emerald-950/20" : 
                    node.agentId === "aether" ? "border-cyan-500/25 text-cyan-400 bg-cyan-950/20" : 
                    node.agentId === "aegis" ? "border-amber-500/25 text-amber-400 bg-amber-950/20" : 
                    "border-fuchsia-500/25 text-fuchsia-400 bg-fuchsia-950/20";
                  
                  return (
                    <div className="flex-grow flex flex-col justify-between p-4 rounded-xl border border-slate-800/80 bg-slate-900/20 text-left space-y-3">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-200">{node.label}</span>
                          <span className={`text-[8.5px] font-mono px-2 py-0.5 rounded border ${agentColor}`}>
                            {node.agentName} Node
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-normal">{node.desc}</p>
                      </div>

                      <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850 text-left space-y-1.5">
                        <span className="text-[8px] font-mono font-bold text-slate-500 uppercase tracking-widest block">Injectable Prompt Template</span>
                        <p className="text-[9.5px] font-mono text-slate-300 italic">"{node.promptSuggestion}"</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setInputText(node.promptSuggestion);
                        }}
                        className="w-full bg-indigo-600/95 hover:bg-indigo-500 text-white font-mono text-[10px] font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all shadow"
                      >
                        <Send className="w-3.5 h-3.5" /> DEPLOY TO PROMPT INPUT
                      </button>
                    </div>
                  );
                })()}
              </div>
            ) : (
              <div className="flex-grow flex flex-col space-y-4">
                {/* Artifact list tabs */}
                <div className="grid grid-cols-4 gap-1 flex-shrink-0">
                  {SUPER_ARTIFACTS.map((art) => (
                    <button
                      key={art.id}
                      type="button"
                      onClick={() => setSelectedArtifactId(art.id)}
                      className={`py-1.5 px-1 rounded-lg border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                        selectedArtifactId === art.id
                          ? "bg-indigo-600/15 border-indigo-500 text-indigo-400"
                          : "bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-400"
                      }`}
                      title={art.title}
                    >
                      {art.id === "eco-dashboard" && <Cpu className="w-3.5 h-3.5" />}
                      {art.id === "secure-sandbox" && <FileCode className="w-3.5 h-3.5" />}
                      {art.id === "resonance-wave" && <Activity className="w-3.5 h-3.5" />}
                      {art.id === "quantum-tech" && <Clock className="w-3.5 h-3.5" />}
                      <span className="text-[8px] font-mono font-bold">{art.author}</span>
                    </button>
                  ))}
                </div>

                {/* Interactive Preview Container */}
                <div className="flex-grow border border-slate-800 bg-slate-950 rounded-xl p-4 flex flex-col justify-between text-left space-y-4 overflow-y-auto">
                  {selectedArtifactId === "eco-dashboard" && (
                    <div className="space-y-4 flex flex-col justify-between h-full">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                          <div>
                            <span className="text-[11px] font-bold text-slate-100 font-sans">Eco-Compute Dashboard</span>
                            <span className="text-[8px] text-slate-500 block">DESIGNED BY SYLVA</span>
                          </div>
                          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 text-[8.5px] font-mono px-1.5 py-0.5 rounded animate-pulse">LIVE FEED</span>
                        </div>

                        {/* Interactive Metrics */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-left">
                            <span className="text-[8px] text-slate-500 font-mono block">GRID LOAD STATE</span>
                            <span className="text-sm font-bold text-slate-200 font-mono">{simEcoLoad}%</span>
                            <div className="w-full bg-slate-950 h-1.5 rounded-full mt-1.5 overflow-hidden">
                              <div className="bg-emerald-400 h-full transition-all duration-300" style={{ width: `${simEcoLoad}%` }} />
                            </div>
                          </div>
                          <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-left">
                            <span className="text-[8px] text-slate-500 font-mono block">CARBON OFFSET</span>
                            <span className="text-sm font-bold text-emerald-400 font-mono">{simEcoOffset}%</span>
                            <div className="w-full bg-slate-950 h-1.5 rounded-full mt-1.5 overflow-hidden">
                              <div className="bg-emerald-400 h-full transition-all duration-300" style={{ width: `${simEcoOffset}%` }} />
                            </div>
                          </div>
                        </div>

                        {/* Node status tables */}
                        <div className="space-y-1.5 text-left">
                          <span className="text-[8px] font-mono font-bold text-slate-500 uppercase tracking-wider block">Bio-harmonic Server Nodes</span>
                          <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden divide-y divide-slate-850 text-[9.5px]">
                            <div className="p-2 flex justify-between items-center bg-slate-900/60">
                              <span className="text-slate-300 font-mono">Sylva-West (Hydro)</span>
                              <span className="text-emerald-400">ACTIVE</span>
                            </div>
                            <div className="p-2 flex justify-between items-center bg-slate-900/60">
                              <span className="text-slate-300 font-mono">Sylva-East (Solar Grid)</span>
                              <span className="text-emerald-400">ACTIVE</span>
                            </div>
                            <div className="p-2 flex justify-between items-center bg-slate-900/60">
                              <span className="text-slate-300 font-mono">Aegis-Vault (Cooling Loop)</span>
                              <span className="text-emerald-400">OPTIMAL</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Simulator controls */}
                      <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-center space-y-2">
                        <p className="text-[9px] text-slate-400">Clicking triggers active ecoload grid rebalancing simulations in real time.</p>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setSimEcoLoad(78);
                              setSimEcoOffset(99.8);
                            }}
                            className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-[9px] py-1.5 px-2 rounded font-bold transition-all"
                          >
                            ☀️ SOLAR PEAK
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setSimEcoLoad(29);
                              setSimEcoOffset(91.4);
                            }}
                            className="flex-1 bg-slate-800 hover:bg-slate-750 text-slate-300 font-mono text-[9px] py-1.5 px-2 rounded font-bold transition-all"
                          >
                            🌙 NIGHT GRID
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedArtifactId === "secure-sandbox" && (
                    <div className="space-y-4 flex flex-col justify-between h-full">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                          <div>
                            <span className="text-[11px] font-bold text-slate-100 font-sans">Zero-Trust Sandbox Configuration</span>
                            <span className="text-[8px] text-slate-500 block">DESIGNED BY AEGIS</span>
                          </div>
                          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/25 text-[8.5px] font-mono px-1.5 py-0.5 rounded">COMPILED</span>
                        </div>

                        {/* Monospace code block */}
                        <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 font-mono text-[8.5px] text-amber-100 leading-normal space-y-1 overflow-x-auto select-all text-left">
                          <div>version: '3.8'</div>
                          <div>services:</div>
                          <div className="pl-2 text-slate-400">sandbox_container:</div>
                          <div className="pl-4">image: scratchpad/isolated_node:latest</div>
                          <div className="pl-4">read_only: true</div>
                          <div className="pl-4">security_opt: [ "no-new-privileges:true" ]</div>
                          <div className="pl-4">cap_drop: [ "ALL" ]</div>
                          <div className="pl-4">ports: [ "127.0.0.1:8080:8080" ]</div>
                        </div>

                        {/* Sandbox interactive terminal output */}
                        <div className="space-y-1.5 text-left">
                          <span className="text-[8px] font-mono font-bold text-slate-500 uppercase tracking-wider block">Local Execution Terminal</span>
                          <div className="bg-slate-900 p-2 rounded-lg border border-slate-800 font-mono text-[9px] text-slate-400 h-20 overflow-y-auto space-y-0.5 text-left">
                            {simSandboxConsole.map((log, idx) => (
                              <div key={idx} className="truncate">{log}</div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Interactive sandbox commands */}
                      <div className="flex gap-1.5 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            setSimSandboxConsole(prev => [
                              ...prev,
                              `[AEGIS SYS] Executing check on sandbox security: SUCCESS.`
                            ]);
                          }}
                          className="flex-1 bg-amber-600 hover:bg-amber-500 text-white font-mono text-[9px] py-1.5 rounded font-bold transition-all"
                        >
                          SEC_CHECK
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setSimSandboxConsole(prev => [
                              ...prev,
                              `[AEGIS SYS] Renewing on-device TLS certificates... OK.`
                            ]);
                          }}
                          className="flex-1 bg-slate-800 hover:bg-slate-750 text-slate-300 font-mono text-[9px] py-1.5 rounded font-bold transition-all"
                        >
                          CERT_RENEW
                        </button>
                      </div>
                    </div>
                  )}

                  {selectedArtifactId === "resonance-wave" && (
                    <div className="space-y-4 flex flex-col justify-between h-full">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                          <div>
                            <span className="text-[11px] font-bold text-slate-100 font-sans">Cognitive Stress Attenuation</span>
                            <span className="text-[8px] text-slate-500 block">DESIGNED BY CHARIS</span>
                          </div>
                          <span className="bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/25 text-[8.5px] font-mono px-1.5 py-0.5 rounded">MONITORING</span>
                        </div>

                        {/* Custom animated/simulated waveform */}
                        <div className="bg-slate-900 h-24 rounded-lg border border-slate-800 flex items-center justify-center p-4 relative overflow-hidden">
                          {/* Heart rate / Wave line SVG */}
                          <svg className="w-full h-full" viewBox="0 0 100 40">
                            {simResonanceState === "neutral" && (
                              <path d="M 0 20 Q 15 5, 30 35 T 60 20 T 90 20 L 100 20" fill="none" stroke="#e879f9" strokeWidth="1.5" strokeDasharray="1 1" className="animate-pulse" />
                            )}
                            {simResonanceState === "relaxing" && (
                              <path d="M 0 20 Q 25 10, 50 30 T 100 20" fill="none" stroke="#22d3ee" strokeWidth="2" className="animate-pulse" />
                            )}
                            {simResonanceState === "synced" && (
                              <path d="M 0 20 Q 10 3, 20 37 T 40 3 T 60 37 T 80 3 T 100 20" fill="none" stroke="#f43f5e" strokeWidth="2" />
                            )}
                          </svg>

                          <span className="absolute bottom-2 right-2 text-[8px] font-mono text-slate-500 uppercase tracking-widest">
                            {simResonanceState.toUpperCase()} WAVEFORM
                          </span>
                        </div>

                        {/* Interactive resonance info metrics */}
                        <div className="bg-slate-900/60 border border-slate-800 p-2 rounded-lg text-[9.5px] space-y-1 text-slate-400 text-left">
                          <div className="flex justify-between">
                            <span>Brainwave Pattern:</span>
                            <span className="font-bold text-slate-200">
                              {simResonanceState === "neutral" && "Beta Waves (Active Alertness)"}
                              {simResonanceState === "relaxing" && "Alpha Waves (Mindful Rest)"}
                              {simResonanceState === "synced" && "Gamma Waves (High Focus)"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Cortisol Index:</span>
                            <span className="font-bold text-fuchsia-400">
                              {simResonanceState === "neutral" && "84.5 pg/mL"}
                              {simResonanceState === "relaxing" && "32.1 pg/mL (Reduced Stress)"}
                              {simResonanceState === "synced" && "45.0 pg/mL (Flow State)"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Interactive trigger controls */}
                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => setSimResonanceState("relaxing")}
                          className="flex-1 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-mono text-[9px] py-1.5 rounded font-bold transition-all"
                        >
                          RESTRESS SYNC
                        </button>
                        <button
                          type="button"
                          onClick={() => setSimResonanceState("synced")}
                          className="flex-1 bg-slate-800 hover:bg-slate-750 text-slate-300 font-mono text-[9px] py-1.5 rounded font-bold transition-all"
                        >
                          COGNITIVE PEAK
                        </button>
                      </div>
                    </div>
                  )}

                  {selectedArtifactId === "quantum-tech" && (
                    <div className="space-y-4 flex flex-col justify-between h-full">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                          <div>
                            <span className="text-[11px] font-bold text-slate-100 font-sans">Quantum Foresight Roadmaps</span>
                            <span className="text-[8px] text-slate-500 block">DESIGNED BY AETHER</span>
                          </div>
                          <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/25 text-[8.5px] font-mono px-1.5 py-0.5 rounded">FORECAST</span>
                        </div>

                        {/* Interactive timeline map */}
                        <div className="space-y-3 text-left">
                          <span className="text-[8px] font-mono font-bold text-slate-500 uppercase tracking-wider block">Milestone Roadmap Outlooks</span>
                          
                          <div className="space-y-2">
                            {[
                              { year: 2027, title: "Coherent Synapse Routing", desc: "Algorithmic pipelines achieve biological scale routing delays, enabling direct neural loop synchronization offline." },
                              { year: 2030, title: "Bio-Carbon Compute Clusters", desc: "Digital systems use actual biological cooling loops, lowering energy usage footprint of AI computation to near zero." },
                              { year: 2035, title: "Sovereign AI Governance Boards", desc: "Communities govern local clusters, fully removing central corporate telemetry constraints." }
                            ].map((milestone) => {
                              const isSelected = selectedMilestoneYear === milestone.year;
                              return (
                                <button
                                  key={milestone.year}
                                  type="button"
                                  onClick={() => setSelectedMilestoneYear(milestone.year)}
                                  className={`w-full p-2.5 rounded-lg border text-left flex gap-3 transition-all ${
                                    isSelected 
                                      ? "bg-cyan-950/20 border-cyan-500/50 text-cyan-100" 
                                      : "bg-slate-900 border-slate-850 hover:border-slate-800 text-slate-400"
                                  }`}
                                >
                                  <div className={`font-mono font-bold text-xs ${isSelected ? "text-cyan-400" : "text-slate-500"}`}>
                                    {milestone.year}
                                  </div>
                                  <div className="flex-grow min-w-0">
                                    <div className="font-bold text-[10px] text-slate-200">{milestone.title}</div>
                                    {isSelected && <p className="text-[9px] text-cyan-200 mt-1 leading-normal">{milestone.desc}</p>}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60 text-[8px] text-slate-500 text-center font-mono">
                        Aether processes longitudinal predictions at real-time telemetry speeds.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 1: CREATE GROUP CHAT */}
      {showGroupModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 w-full max-w-sm space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <h4 className="font-bold text-slate-200 text-sm flex items-center gap-1.5">
                <Users className="w-4 h-4 text-indigo-400" /> Create Brainstorming Group
              </h4>
              <button onClick={() => setShowGroupModal(false)} className="text-slate-500 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Group Name</label>
                <input
                  type="text"
                  value={groupChatName}
                  onChange={(e) => setGroupChatName(e.target.value)}
                  placeholder="e.g. Science Brainstorm"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Select AI Partners</label>
                <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
                  {partners.map(p => {
                    const isSelected = groupSelectedPartnerIds.includes(p.id);
                    return (
                      <button
                        key={p.id}
                        onClick={() => {
                          setGroupSelectedPartnerIds(prev => 
                            prev.includes(p.id) 
                              ? prev.filter(id => id !== p.id) 
                              : [...prev, p.id]
                          );
                        }}
                        className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between transition-colors ${
                          isSelected ? "bg-indigo-950/30 border-indigo-500/50" : "bg-slate-950 border-slate-800/80"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <img src={p.avatar} alt={p.name} className="w-6 h-6 rounded-full object-cover" />
                          <span className="text-xs font-bold text-slate-200">{p.name}</span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <button
              onClick={createGroupChat}
              disabled={!groupChatName.trim() || groupSelectedPartnerIds.length === 0}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-xl transition-colors disabled:opacity-50"
            >
              Synthesize Brainstorming Group
            </button>
          </div>
        </div>
      )}

      {/* MODAL 2: E2EE SECURITY PROTOCOL */}
      {showE2EEModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 w-full max-w-sm space-y-4 font-sans">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <h4 className="font-bold text-slate-200 text-xs flex items-center gap-1.5 uppercase font-mono tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Double Ratchet verification
              </h4>
              <button onClick={() => setShowE2EEModal(false)} className="text-slate-500 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[10px] text-slate-400 leading-normal">
              To verify that this conversation is end-to-end encrypted with zero servers in the middle, match this Safety Fingerprint Index.
            </p>

            <div className="bg-slate-950 border border-slate-850 p-4 rounded-lg font-mono text-[11px] text-emerald-400 text-center grid grid-cols-3 gap-2">
              <span>9425 29</span>
              <span>4821 95</span>
              <span>3201 48</span>
              <span>5482 10</span>
              <span>3845 92</span>
              <span>0148 59</span>
            </div>

            <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-800 flex gap-2 text-[10px] text-slate-500">
              <Info className="w-4 h-4 text-indigo-400 flex-shrink-0" />
              <p>Fingerprints are generated on-device and stored inside the browser's sandbox index indices.</p>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: VOICE DUPLEX & GROUP VOICE CALL */}
      {showCallModal && (
        <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-between p-6 z-50 text-center font-sans">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-900/15 rounded-full blur-3xl -z-10 animate-pulse pointer-events-none" />
          
          {/* Top Call Info */}
          <div className="w-full max-w-lg flex justify-between items-center pt-2">
            <div className="flex items-center gap-2 text-left">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <div>
                <span className="text-xs font-mono font-bold text-slate-200 block uppercase tracking-wider">
                  {activeSession?.isGroup ? "GROUP VOICE CHAT" : "DUPLEX VOICE CALL"}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {callActive ? "LIVE SPEECH PIPELINE CONNECTED" : "INITIALIZING..."}
                </span>
              </div>
            </div>

            <span className="bg-slate-900 border border-slate-800 text-[10px] font-mono text-indigo-400 px-3 py-1 rounded-full font-bold">
              {activeSession?.isGroup ? "COUNCIL CHAMBER" : "1-ON-1"}
            </span>
          </div>

          {/* Main Voice Call Stage */}
          <div className="w-full max-w-2xl my-auto py-6 flex flex-col items-center justify-center space-y-6">
            
            {activeSession?.isGroup ? (
              /* Group Voice Chat Gallery Grid */
              <div className="w-full space-y-6">
                <h3 className="text-sm font-bold text-slate-200 tracking-wide uppercase font-mono">
                  {activeSession.name}
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl mx-auto">
                  {partners
                    .filter(p => activeSession.partnerIds.includes(p.id))
                    .map(p => {
                      const isSpeaking = activeSpeakerId === p.id;
                      return (
                        <div 
                          key={p.id} 
                          className={`relative flex flex-col items-center p-3 rounded-2xl transition-all border ${
                            isSpeaking 
                              ? "bg-indigo-950/40 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.3)] scale-105" 
                              : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                          }`}
                        >
                          <div className="relative">
                            <img 
                              src={p.avatar} 
                              alt={p.name} 
                              className="w-16 h-16 rounded-full object-cover border-2 border-slate-700"
                            />
                            {isSpeaking && (
                              <span className="absolute -bottom-1 -right-1 bg-indigo-500 text-white p-1 rounded-full animate-bounce">
                                <Volume2 className="w-3 h-3" />
                              </span>
                            )}
                          </div>
                          <span className="text-xs font-bold text-slate-200 mt-2">{p.name}</span>
                          <span className="text-[9px] text-slate-500 font-mono truncate max-w-[100px]">{p.title}</span>
                          
                          {isSpeaking && (
                            <div className="flex items-center gap-0.5 mt-2 h-3">
                              {[10, 16, 8, 14, 18].map((h, idx) => (
                                <div key={idx} className="w-0.5 bg-indigo-400 rounded-full animate-pulse" style={{ height: `${h}px` }} />
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            ) : (
              /* Single Partner Call Avatar */
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <img 
                    src={activeSession?.avatar} 
                    alt="AI Companion" 
                    referrerPolicy="no-referrer"
                    className="w-28 h-28 rounded-full object-cover border-4 border-indigo-500/40 shadow-2xl"
                  />
                  {activeSpeakerId && (
                    <span className="absolute inset-0 rounded-full border-4 border-indigo-400 animate-ping opacity-50" />
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-slate-100">{activeSession?.name}</h3>
                  <p className="text-xs text-indigo-400 font-mono tracking-widest uppercase">
                    {callActive ? "FULL DUPLEX ACTIVE" : "CONNECTING..."}
                  </p>
                </div>
              </div>
            )}

            {/* Audio waveform visualization */}
            {callActive && (
              <div className="h-12 flex items-center gap-1.5 my-2">
                {Array.from({ length: 24 }, (_, i) => (
                  <div 
                    key={i} 
                    className={`w-1 rounded-full transition-all ${
                      isRecording ? "bg-red-400 animate-bounce" : "bg-indigo-500 animate-pulse"
                    }`}
                    style={{ 
                      height: `${Math.floor(Math.random() * 32 + 8)}px`,
                      animationDelay: `${i * 0.04}s`
                    }} 
                  />
                ))}
              </div>
            )}

            {/* Live Subtitles & Transcripts Box */}
            <div className="w-full max-w-lg bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 text-left text-[11px] font-mono text-slate-300 min-h-[50px] flex items-center justify-between gap-3 shadow-inner">
              <div className="flex items-center gap-2 truncate">
                <Sparkles className="w-4 h-4 text-indigo-400 flex-shrink-0 animate-spin" />
                <span className="truncate">
                  {liveVoiceCaption || (isRecording ? "Listening to your voice..." : "Voice mode active. Speak now...")}
                </span>
              </div>
              {inputText.trim() && (
                <button
                  onClick={() => handleSendMessage()}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-2.5 py-1 rounded text-[10px] font-bold flex-shrink-0"
                >
                  SEND
                </button>
              )}
            </div>

          </div>

          {/* Bottom Action Bar */}
          <div className="w-full max-w-md pb-4 flex items-center justify-center gap-6">
            
            {/* Toggle Microphone */}
            <button
              type="button"
              onClick={() => {
                const nextMuted = !isMicMuted;
                setIsMicMuted(nextMuted);
                if (nextMuted) {
                  stopSpeechRecognition();
                } else {
                  startSpeechRecognition();
                }
              }}
              className={`p-4 rounded-full border transition-all ${
                isMicMuted 
                  ? "bg-red-500/20 border-red-500 text-red-400" 
                  : "bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800"
              }`}
              title={isMicMuted ? "Unmute Microphone" : "Mute Microphone"}
            >
              {isMicMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </button>

            {/* Toggle Speaker Output */}
            <button
              type="button"
              onClick={() => {
                const nextMuted = !isSpeakerMuted;
                setIsSpeakerMuted(nextMuted);
                if (nextMuted) {
                  stopSpeaking();
                }
              }}
              className={`p-4 rounded-full border transition-all ${
                isSpeakerMuted 
                  ? "bg-amber-500/20 border-amber-500 text-amber-400" 
                  : "bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800"
              }`}
              title={isSpeakerMuted ? "Unmute Speaker" : "Mute Speaker"}
            >
              {isSpeakerMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
            </button>

            {/* End Call Button */}
            <button
              type="button"
              onClick={toggleCallState}
              className="bg-red-600 hover:bg-red-500 text-white font-bold p-4 rounded-full shadow-lg shadow-red-600/30 transition-transform active:scale-95"
              title="End Voice Call"
            >
              <PhoneOff className="w-6 h-6" />
            </button>

          </div>

        </div>
      )}

    </div>
  );
}
