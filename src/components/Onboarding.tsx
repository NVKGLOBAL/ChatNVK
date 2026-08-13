/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  MessageSquare, 
  Settings, 
  Shield, 
  Smile, 
  Cpu, 
  Zap, 
  Users,
  Scale
} from "lucide-react";
import LegalDisclaimerModal from "./LegalDisclaimerModal";
import { UserProfile, AIPartner } from "../types";
import { ONBOARDING_TOPICS, TONE_STYLES, CALIBRATION_SCENARIOS, DEFAULT_AI_PARTNERS } from "../data";

interface OnboardingProps {
  onComplete: (profile: UserProfile, selectedPartners: AIPartner[]) => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedTone, setSelectedTone] = useState<string>("casual");
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [isCalibrating, setIsCalibrating] = useState<boolean>(false);
  const [calibratedPartners, setCalibratedPartners] = useState<AIPartner[]>([]);
  const [chosenPartnerIds, setChosenPartnerIds] = useState<string[]>([]);
  const [showDisclaimerModal, setShowDisclaimerModal] = useState<boolean>(false);
  const [disclaimerAccepted, setDisclaimerAccepted] = useState<boolean>(true);

  const handleTopicToggle = (topicId: string) => {
    setSelectedTopics(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId) 
        : [...prev, topicId]
    );
  };

  const handleOptionSelect = (scenarioId: string, optionId: string) => {
    setAnswers(prev => ({ ...prev, [scenarioId]: optionId }));
  };

  const startCalibration = () => {
    setIsCalibrating(true);
    
    // Simulate smart calibration of partners based on responses
    setTimeout(() => {
      // Sort default partners slightly or customize based on topics/styles
      const tailored = [...DEFAULT_AI_PARTNERS];
      setCalibratedPartners(tailored);
      setChosenPartnerIds(tailored.map(p => p.id)); // Select all by default
      setIsCalibrating(false);
      setStep(5); // Move to partner selection step
    }, 2800);
  };

  const handleFinish = () => {
    if (!name.trim()) return;
    
    const profile: UserProfile = {
      name: name.trim(),
      interests: selectedTopics,
      communicationStyle: selectedTone,
      goals: ["Growth", "Mentorship"],
      scenarioAnswers: answers,
      isOnboarded: true
    };

    const finalPartners = calibratedPartners.filter(p => chosenPartnerIds.includes(p.id));
    onComplete(profile, finalPartners);
  };

  const totalSteps = 5;

  return (
    <div id="onboarding-container" className="min-h-screen bg-[#0d0e12] text-slate-100 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Mesh Gradient Background Layers */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/30 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Main Container Card */}
      <div className="w-full max-w-xl bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl relative z-10 backdrop-blur-2xl">
        
        {/* Header Branding */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">ChatNVK</h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Cognitive Curation System</p>
            </div>
          </div>
          <div className="text-xs text-slate-500 font-mono">
            {isCalibrating ? "CALIBRATING..." : `STEP 0${step} / 0${totalSteps}`}
          </div>
        </div>

        {/* Step Indicator Bar */}
        {!isCalibrating && step <= 4 && (
          <div className="w-full bg-slate-800 h-1 rounded-full mb-8 overflow-hidden">
            <div 
              className="bg-indigo-500 h-full transition-all duration-500 ease-out" 
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        )}

        <AnimatePresence mode="wait">
          {isCalibrating ? (
            <motion.div 
              key="calibrating"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
                <Sparkles className="w-8 h-8 text-indigo-400 absolute inset-0 m-auto animate-pulse" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-indigo-300">Synthesizing Psychographic Map...</h3>
              <p className="text-sm text-slate-400 max-w-sm">
                Curating personalized AI companions with custom specialties to match your interests and tone profile.
              </p>
              <div className="mt-6 flex gap-2 text-[10px] font-mono text-slate-500 bg-slate-950 px-4 py-2 rounded-lg border border-slate-800">
                <span className="animate-pulse">●</span> PROCESSING SELECTIONS & SCENARIOS
              </div>
            </motion.div>
          ) : (
            <>
              {/* STEP 1: IDENTITY */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl font-semibold text-white mb-2">Let's build your companion matrix</h2>
                    <p className="text-sm text-slate-400">
                      Welcome to ChatNVK. To generate authentic, deep conversation partners, let's start with your name.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono text-slate-400 uppercase tracking-wider">How should we address you?</label>
                    <input 
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name or callsign..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors font-sans"
                    />
                  </div>

                  <div className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-400">
                    <Shield className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-300 mb-0.5">Absolute Sovereignty & Privacy</p>
                      <p>All chats are end-to-end encrypted. You can also activate local WebGPU offline execution once inside.</p>
                    </div>
                  </div>

                  <div className="bg-amber-500/10 border border-amber-500/20 p-3.5 rounded-xl space-y-2">
                    <label className="flex items-start gap-2.5 cursor-pointer text-xs text-amber-200">
                      <input 
                        type="checkbox" 
                        checked={disclaimerAccepted} 
                        onChange={(e) => setDisclaimerAccepted(e.target.checked)}
                        className="mt-0.5 accent-indigo-600 rounded flex-shrink-0"
                      />
                      <span>
                        I acknowledge AI outputs are probabilistic and non-medical/legal advice. Read{" "}
                        <button 
                          type="button" 
                          onClick={() => setShowDisclaimerModal(true)} 
                          className="text-amber-400 underline font-semibold hover:text-amber-300"
                        >
                          Legal Disclaimer
                        </button>.
                      </span>
                    </label>
                  </div>

                  <button
                    disabled={!name.trim() || !disclaimerAccepted}
                    onClick={() => setStep(2)}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Calibrate Communication Styles <ArrowRight className="w-4 h-4" />
                  </button>

                  <LegalDisclaimerModal 
                    isOpen={showDisclaimerModal} 
                    onClose={() => setShowDisclaimerModal(false)} 
                    onAccept={() => setDisclaimerAccepted(true)}
                  />
                </motion.div>
              )}

              {/* STEP 2: INTERESTS */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl font-semibold text-white mb-2">Map your domains of interest</h2>
                    <p className="text-sm text-slate-400">
                      Select the topics you'd love your AI conversation partners to specialized in.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {ONBOARDING_TOPICS.map((topic) => {
                      const isSelected = selectedTopics.includes(topic.id);
                      return (
                        <button
                          key={topic.id}
                          onClick={() => handleTopicToggle(topic.id)}
                          className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${
                            isSelected 
                              ? "bg-indigo-600/20 border-indigo-500 text-indigo-200 shadow-lg" 
                              : "bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 text-slate-400"
                          }`}
                        >
                          <span className="text-xl">{topic.icon}</span>
                          <span className="text-xs font-semibold">{topic.label}</span>
                          {isSelected && <Check className="w-4 h-4 ml-auto text-indigo-400" />}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex justify-between items-center pt-4">
                    <button 
                      onClick={() => setStep(1)}
                      className="text-slate-400 hover:text-white text-sm"
                    >
                      Back
                    </button>
                    <button
                      disabled={selectedTopics.length === 0}
                      onClick={() => setStep(3)}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 px-6 rounded-xl transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                      Continue <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: TONE STYLE */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl font-semibold text-white mb-2">Align communication frequency</h2>
                    <p className="text-sm text-slate-400">
                      How should your conversation partners communicate with you? This determines vocabulary and brevity.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {TONE_STYLES.map((tone) => {
                      const isSelected = selectedTone === tone.id;
                      return (
                        <button
                          key={tone.id}
                          onClick={() => setSelectedTone(tone.id)}
                          className={`w-full flex flex-col gap-1 p-4 rounded-xl border text-left transition-all ${
                            isSelected 
                              ? "bg-indigo-600/20 border-indigo-500 text-indigo-200" 
                              : "bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 text-slate-400"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white">{tone.label}</span>
                            {isSelected && <div className="w-2 h-2 rounded-full bg-indigo-400" />}
                          </div>
                          <span className="text-[11px] text-slate-500">{tone.desc}</span>
                          <span className="text-[10px] font-mono mt-1 text-indigo-400/70 bg-white/5 px-2 py-1 rounded border border-white/10">
                            Example: "{tone.sample}"
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex justify-between items-center pt-4">
                    <button 
                      onClick={() => setStep(2)}
                      className="text-slate-400 hover:text-white text-sm"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(4)}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 px-6 rounded-xl transition-colors flex items-center gap-2"
                    >
                      Calibrate Persona Quizzes <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: PSYCHOGRAPHIC QUIZ */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl font-semibold text-white mb-2">Scenario-based alignment</h2>
                    <p className="text-sm text-slate-400">
                      Answer this calibration scenario to fine-tune companion personalities.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {CALIBRATION_SCENARIOS.slice(0, 1).map((scenario) => (
                      <div key={scenario.id} className="space-y-3">
                        <p className="text-xs font-semibold text-indigo-300 leading-relaxed bg-indigo-950/20 p-3 rounded-lg border border-indigo-500/20">
                          {scenario.question}
                        </p>
                        <div className="space-y-2">
                          {scenario.options.map((option) => {
                            const isSelected = answers[scenario.id] === option.id;
                            return (
                              <button
                                key={option.id}
                                onClick={() => handleOptionSelect(scenario.id, option.id)}
                                className={`w-full p-3.5 rounded-xl border text-left text-xs transition-all ${
                                  isSelected 
                                    ? "bg-indigo-600/20 border-indigo-500 text-indigo-200 shadow-lg" 
                                    : "bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 text-slate-400"
                                }`}
                              >
                                {option.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-4">
                    <button 
                      onClick={() => setStep(3)}
                      className="text-slate-400 hover:text-white text-sm"
                    >
                      Back
                    </button>
                    <button
                      disabled={Object.keys(answers).length < 1}
                      onClick={startCalibration}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 px-6 rounded-xl transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                      Synthesize Companions <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 5: PARTNER SELECTION */}
              {step === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl font-semibold text-white mb-1">Your Curated Companions</h2>
                    <p className="text-sm text-slate-400">
                      Based on your cognitive map, ChatNVK synthesized 4 unique AI personalities. Select your initial chat list.
                    </p>
                  </div>

                  <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
                    {calibratedPartners.map((partner) => {
                      const isChosen = chosenPartnerIds.includes(partner.id);
                      return (
                        <div 
                          key={partner.id}
                          className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-4 ${
                            isChosen 
                              ? "bg-indigo-600/10 border-indigo-500/30" 
                              : "bg-white/5 border border-white/10"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <img 
                              src={partner.avatar} 
                              alt={partner.name}
                              referrerPolicy="no-referrer"
                              className="w-12 h-12 rounded-full object-cover border border-white/10"
                            />
                            <div>
                              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                                {partner.name}
                                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-indigo-400">
                                  {partner.title.split(" & ")[0]}
                                </span>
                              </h4>
                              <p className="text-[10px] text-slate-400 line-clamp-2 mt-0.5">{partner.bio}</p>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              setChosenPartnerIds(prev => 
                                prev.includes(partner.id)
                                  ? prev.filter(id => id !== partner.id)
                                  : [...prev, partner.id]
                              );
                            }}
                            className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all ${
                              isChosen 
                                ? "bg-indigo-600 border-indigo-500 text-white" 
                                : "bg-white/5 border border-white/10 text-slate-400 hover:text-slate-200"
                            }`}
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    onClick={handleFinish}
                    disabled={chosenPartnerIds.length === 0}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 mt-4 shadow-lg disabled:opacity-50"
                  >
                    Initialize ChatNVK Engine <Sparkles className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
