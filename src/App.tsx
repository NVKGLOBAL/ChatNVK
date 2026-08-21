/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  MessageSquare, 
  Search, 
  Layers, 
  Settings, 
  Cpu, 
  Terminal, 
  User, 
  Wifi, 
  ShieldCheck, 
  LogOut,
  Scale,
  Menu,
  X,
  AlertTriangle,
  Info,
  Compass,
  Command,
  Database
} from "lucide-react";
import { UserProfile, AIPartner } from "./types";
import { DEFAULT_AI_PARTNERS } from "./data";
import Onboarding from "./components/Onboarding";
import ChatWindow from "./components/ChatWindow";
import WebGPUControl from "./components/WebGPUControl";
import AgentSandbox from "./components/AgentSandbox";
import WideResearchOrchestrator from "./components/WideResearchOrchestrator";
import LegalDisclaimerModal from "./components/LegalDisclaimerModal";
import WalkthroughGuide from "./components/WalkthroughGuide";
import NVKOSTopBar from "./components/NVKOSTopBar";
import NVKOSTaskDock from "./components/NVKOSTaskDock";
import OSWindowShell from "./components/OSWindowShell";
import SpotlightOSLauncher from "./components/SpotlightOSLauncher";
import NeuralWaveCanvas, { ThemePaletteId, THEME_PALETTES } from "./components/NeuralWaveCanvas";
import AIModelSwapperModal from "./components/AIModelSwapperModal";
import WorkspaceShell from "./components/workspace/WorkspaceShell";

export default function App() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activePartners, setActivePartners] = useState<AIPartner[]>([]);
  const [activeSystemTab, setActiveSystemTab] = useState<"messenger" | "research" | "sandbox" | "webgpu" | "sovereign">("sovereign");
  const [localModelEnabled, setLocalModelEnabled] = useState<boolean>(true);
  const [selectedModelId, setSelectedModelId] = useState<string>(() => {
    return localStorage.getItem("chatnvk_model_id") || "llama-3.3-8b-instruct-q4";
  });
  const [activeThemeId, setActiveThemeId] = useState<ThemePaletteId>(() => {
    return (localStorage.getItem("chatnvk_theme_id") as ThemePaletteId) || "matrix-cyan";
  });

  const handleSelectTheme = (newThemeId: ThemePaletteId) => {
    setActiveThemeId(newThemeId);
    localStorage.setItem("chatnvk_theme_id", newThemeId);
  };

  const handleSelectModel = (modelId: string, customApiKey?: string, customEndpoint?: string) => {
    setSelectedModelId(modelId);
    localStorage.setItem("chatnvk_model_id", modelId);
    if (customApiKey) localStorage.setItem("chatnvk_custom_api_key", customApiKey);
    if (customEndpoint) localStorage.setItem("chatnvk_custom_endpoint", customEndpoint);
  };
  
  // OS Spotlight & Modal States
  const [isSpotlightOpen, setIsSpotlightOpen] = useState<boolean>(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState<boolean>(false);
  const [isWalkthroughOpen, setIsWalkthroughOpen] = useState<boolean>(false);
  const [isModelSwapperOpen, setIsModelSwapperOpen] = useState<boolean>(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);

  const [disclaimerAcknowledged, setDisclaimerAcknowledged] = useState<boolean>(() => {
    return !!localStorage.getItem("chatnvk_disclaimer_accepted");
  });

  // Global Keyboard listener for Cmd+K / Ctrl+K Spotlight Launcher
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSpotlightOpen(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Load profile from offline storage if already onboarded
  useEffect(() => {
    const savedProfile = localStorage.getItem("chatnvk_profile");
    const savedPartners = localStorage.getItem("chatnvk_partners");

    if (savedProfile && savedPartners) {
      try {
        setProfile(JSON.parse(savedProfile));
        const parsed = JSON.parse(savedPartners) as AIPartner[];
        // Dynamic remapping of old IDs/names to the premium unique NVK ones
        const updated = parsed.map(saved => {
          let targetId = saved.id;
          if (targetId === "nova") targetId = "aether";
          if (targetId === "leo") targetId = "sylva";
          if (targetId === "sage") targetId = "charis";
          if (targetId === "zephyr") targetId = "aegis";
          if (targetId === "nature") targetId = "sylva";
          if (targetId === "vision") targetId = "aether";
          if (targetId === "kindness") targetId = "charis";
          if (targetId === "sovereignty") targetId = "aegis";

          const found = DEFAULT_AI_PARTNERS.find(p => p.id === targetId);
          return found || saved;
        });
        setActivePartners(updated);
        // Resave updated values to storage to avoid future mismatches
        localStorage.setItem("chatnvk_partners", JSON.stringify(updated));
      } catch (e) {
        console.error("Failed loading cached profile index.", e);
      }
    }
  }, []);

  const handleOnboardingComplete = (newProfile: UserProfile, selectedPartners: AIPartner[]) => {
    setProfile(newProfile);
    setActivePartners(selectedPartners);
    
    // Save locally
    localStorage.setItem("chatnvk_profile", JSON.stringify(newProfile));
    localStorage.setItem("chatnvk_partners", JSON.stringify(selectedPartners));
    localStorage.setItem("chatnvk_disclaimer_accepted", "true");
    setDisclaimerAcknowledged(true);
    
    // Launch guided step-by-step tour for new users
    setIsWalkthroughOpen(true);
  };

  const handleLogOut = () => {
    localStorage.removeItem("chatnvk_profile");
    localStorage.removeItem("chatnvk_partners");
    setProfile(null);
    setActivePartners([]);
  };

  return (
    <div id="main-app" className={`min-h-screen bg-gradient-to-br ${THEME_PALETTES[activeThemeId]?.bgGradient || "from-[#07090f] via-[#0b0e18] to-[#08090e]"} text-slate-100 font-sans selection:bg-indigo-500 selection:text-white antialiased relative overflow-hidden flex flex-col transition-colors duration-500`}>
      {/* Interactive Parallax Neural Wave Streams Canvas */}
      <NeuralWaveCanvas themeId={activeThemeId} />

      {/* Mesh Gradient Cyber Ambient Background Glows */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] blur-[130px] rounded-full pointer-events-none transition-all duration-700" 
        style={{ backgroundColor: THEME_PALETTES[activeThemeId]?.primaryGlow || "rgba(34, 211, 238, 0.25)" }}
      />
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] blur-[130px] rounded-full pointer-events-none transition-all duration-700" 
        style={{ backgroundColor: THEME_PALETTES[activeThemeId]?.secondaryGlow || "rgba(99, 102, 241, 0.25)" }}
      />

      <AnimatePresence mode="wait">
        {!profile ? (
          <Onboarding onComplete={handleOnboardingComplete} />
        ) : (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col h-screen overflow-hidden relative z-10 w-full"
          >
            {/* 1. NVK OS PERSISTENT TOP SYSTEM BAR */}
            <NVKOSTopBar
              profile={profile}
              activeTab={activeSystemTab}
              localModelEnabled={localModelEnabled}
              disclaimerAcknowledged={disclaimerAcknowledged}
              activeThemeId={activeThemeId}
              selectedModelId={selectedModelId}
              onOpenModelSwapper={() => setIsModelSwapperOpen(true)}
              onSelectTheme={handleSelectTheme}
              onOpenSpotlight={() => setIsSpotlightOpen(true)}
              onOpenWalkthrough={() => setIsWalkthroughOpen(true)}
              onOpenDisclaimer={() => setIsLegalModalOpen(true)}
              onLogOut={handleLogOut}
            />

            {/* 2. MAIN WORKSPACE WITH OS WINDOW SHELL CONTAINER */}
            <div className="flex-grow min-h-0 overflow-hidden p-2 sm:p-3 md:p-4 pb-20 sm:pb-24 flex flex-col relative z-10">
              <AnimatePresence mode="wait">
                {activeSystemTab === "messenger" && (
                  <motion.div
                    key="messenger-view"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="h-full w-full"
                  >
                    <OSWindowShell
                      title="Authentic Chat Core & Council Chambers"
                      processPath="~/sys/apps/chat_messenger.exe"
                      icon={MessageSquare}
                      activeTabKey="messenger"
                      onOpenSpotlight={() => setIsSpotlightOpen(true)}
                    >
                      <ChatWindow 
                        onboardedPartners={activePartners}
                        userName={profile.name}
                        localModelEnabled={localModelEnabled}
                        selectedModelId={selectedModelId}
                        onOpenDisclaimer={() => setIsLegalModalOpen(true)}
                      />
                    </OSWindowShell>
                  </motion.div>
                )}


                {activeSystemTab === "research" && (
                  <motion.div
                    key="research-view"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="h-full w-full"
                  >
                    <OSWindowShell
                      title="Wide Research GPU Engine"
                      processPath="~/sys/gpu/wide_research_node"
                      icon={Search}
                      activeTabKey="research"
                      onOpenSpotlight={() => setIsSpotlightOpen(true)}
                    >
                      <WideResearchOrchestrator />
                    </OSWindowShell>
                  </motion.div>
                )}

                {activeSystemTab === "sandbox" && (
                  <motion.div
                    key="sandbox-view"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="h-full w-full"
                  >
                    <OSWindowShell
                      title="VM Developer Sandbox Environment"
                      processPath="~/sys/sandbox/vm_container.sh"
                      icon={Terminal}
                      activeTabKey="sandbox"
                      onOpenSpotlight={() => setIsSpotlightOpen(true)}
                    >
                      <AgentSandbox />
                    </OSWindowShell>
                  </motion.div>
                )}

                {activeSystemTab === "sovereign" && (
                  <motion.div
                    key="sovereign-view"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="h-full w-full rounded-2xl overflow-hidden border border-indigo-500/30 shadow-2xl"
                  >
                    <WorkspaceShell />
                  </motion.div>
                )}

                {activeSystemTab === "webgpu" && (
                  <motion.div
                    key="webgpu-view"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="h-full w-full"
                  >
                    <OSWindowShell
                      title="WebGPU Offline Local Model Loader"
                      processPath="~/sys/webgpu/llama_weights.bin"
                      icon={Cpu}
                      activeTabKey="webgpu"
                      onOpenSpotlight={() => setIsSpotlightOpen(true)}
                    >
                      <WebGPUControl 
                        localModelEnabled={localModelEnabled}
                        onToggleLocalModel={setLocalModelEnabled}
                      />
                    </OSWindowShell>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 3. NVK OS FLOATING TASKBAR & DOCK */}
            <NVKOSTaskDock
              activeTab={activeSystemTab}
              onNavigateTab={(tab) => setActiveSystemTab(tab)}
              onOpenSpotlight={() => setIsSpotlightOpen(true)}
              onOpenWalkthrough={() => setIsWalkthroughOpen(true)}
              onOpenDisclaimer={() => setIsLegalModalOpen(true)}
              localModelEnabled={localModelEnabled}
            />

            {/* 4. SPOTLIGHT COMMAND PALETTE MODAL */}
            <SpotlightOSLauncher
              isOpen={isSpotlightOpen}
              onClose={() => setIsSpotlightOpen(false)}
              onNavigateTab={(tab) => setActiveSystemTab(tab)}
              onOpenWalkthrough={() => setIsWalkthroughOpen(true)}
              onOpenDisclaimer={() => setIsLegalModalOpen(true)}
              localModelEnabled={localModelEnabled}
              onToggleLocalModel={setLocalModelEnabled}
            />

            {/* 5. LEGAL DISCLAIMER MODAL */}
            <LegalDisclaimerModal 
              isOpen={isLegalModalOpen} 
              onClose={() => setIsLegalModalOpen(false)}
              onAccept={() => setDisclaimerAcknowledged(true)}
            />

            {/* 6. STEP-BY-STEP WALKTHROUGH GUIDE */}
            <WalkthroughGuide
              isOpen={isWalkthroughOpen}
              onClose={() => setIsWalkthroughOpen(false)}
              onNavigateToTab={(tab) => setActiveSystemTab(tab)}
            />

            {/* 7. UNIVERSAL AI MODEL SWAPPER MODAL */}
            <AIModelSwapperModal
              isOpen={isModelSwapperOpen}
              onClose={() => setIsModelSwapperOpen(false)}
              selectedModelId={selectedModelId}
              onSelectModel={(modelId, key, endpoint) => {
                handleSelectModel(modelId, key, endpoint);
                setIsModelSwapperOpen(false);
              }}
            />


          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
