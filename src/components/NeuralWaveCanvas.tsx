/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from "react";

export type ThemePaletteId = "matrix-cyan" | "quantum-obsidian" | "hyper-amber" | "synthetix-violet" | "bio-jade";

export interface ThemePalette {
  id: ThemePaletteId;
  name: string;
  badge: string;
  primaryGlow: string;
  secondaryGlow: string;
  accentHex: string;
  secondaryHex: string;
  bgGradient: string;
  particleColors: string[];
}

export const THEME_PALETTES: Record<ThemePaletteId, ThemePalette> = {
  "matrix-cyan": {
    id: "matrix-cyan",
    name: "NVK Neural Matrix",
    badge: "Cyber Cyan & Indigo",
    primaryGlow: "rgba(34, 211, 238, 0.25)",
    secondaryGlow: "rgba(99, 102, 241, 0.25)",
    accentHex: "#22d3ee",
    secondaryHex: "#6366f1",
    bgGradient: "from-[#07090f] via-[#0b0e18] to-[#08090e]",
    particleColors: ["#22d3ee", "#6366f1", "#38bdf8", "#818cf8"]
  },
  "quantum-obsidian": {
    id: "quantum-obsidian",
    name: "Quantum Obsidian Void",
    badge: "Stealth Emerald & Silver",
    primaryGlow: "rgba(16, 185, 129, 0.25)",
    secondaryGlow: "rgba(148, 163, 184, 0.2)",
    accentHex: "#10b981",
    secondaryHex: "#94a3b8",
    bgGradient: "from-[#050608] via-[#090b0e] to-[#040507]",
    particleColors: ["#10b981", "#34d399", "#64748b", "#94a3b8"]
  },
  "hyper-amber": {
    id: "hyper-amber",
    name: "Hyper Neon Amber",
    badge: "Solar Gold & Orange",
    primaryGlow: "rgba(251, 191, 36, 0.25)",
    secondaryGlow: "rgba(249, 115, 22, 0.25)",
    accentHex: "#fbbf24",
    secondaryHex: "#f97316",
    bgGradient: "from-[#0d0a06] via-[#140e08] to-[#0a0805]",
    particleColors: ["#fbbf24", "#f59e0b", "#f97316", "#fde047"]
  },
  "synthetix-violet": {
    id: "synthetix-violet",
    name: "Synthetix Neon Violet",
    badge: "Cyberpunk Magenta",
    primaryGlow: "rgba(168, 85, 247, 0.25)",
    secondaryGlow: "rgba(236, 72, 153, 0.25)",
    accentHex: "#a855f7",
    secondaryHex: "#ec4899",
    bgGradient: "from-[#0d0714] via-[#130a1e] to-[#09050e]",
    particleColors: ["#a855f7", "#c084fc", "#ec4899", "#f472b6"]
  },
  "bio-jade": {
    id: "bio-jade",
    name: "Bio-Harmonic Jade",
    badge: "Aquamarine & Teal",
    primaryGlow: "rgba(20, 184, 166, 0.25)",
    secondaryGlow: "rgba(56, 189, 248, 0.25)",
    accentHex: "#14b8a6",
    secondaryHex: "#38bdf8",
    bgGradient: "from-[#050c0c] via-[#091414] to-[#040909]",
    particleColors: ["#14b8a6", "#2dd4bf", "#38bdf8", "#06b6d4"]
  }
};

interface NeuralWaveCanvasProps {
  themeId: ThemePaletteId;
  particleDensity?: "normal" | "high";
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  baseAlpha: number;
  phase: number;
  zDepth: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

export default function NeuralWaveCanvas({ themeId, particleDensity = "normal" }: NeuralWaveCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePos = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });
  const ripplesRef = useRef<Ripple[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.targetX = e.clientX;
      mousePos.current.targetY = e.clientY;
    };

    const handleClick = (e: MouseEvent) => {
      const palette = THEME_PALETTES[themeId] || THEME_PALETTES["matrix-cyan"];
      ripplesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 5,
        maxRadius: 180,
        alpha: 0.8,
        color: palette.accentHex
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    // Initialize Particles
    const palette = THEME_PALETTES[themeId] || THEME_PALETTES["matrix-cyan"];
    const count = particleDensity === "high" ? 85 : 50;
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const color = palette.particleColors[i % palette.particleColors.length];
      const zDepth = Math.random() * 0.8 + 0.2; // Parallax layer depth
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4 * zDepth,
        vy: (Math.random() - 0.5) * 0.4 * zDepth,
        size: Math.random() * 2.2 + 0.8,
        color,
        alpha: Math.random() * 0.6 + 0.2,
        baseAlpha: Math.random() * 0.5 + 0.2,
        phase: Math.random() * Math.PI * 2,
        zDepth
      });
    }

    let time = 0;

    // Animation Render Loop
    const render = () => {
      time += 0.015;

      // Smooth mouse lerp
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.05;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.05;

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      const activePalette = THEME_PALETTES[themeId] || THEME_PALETTES["matrix-cyan"];

      // 1. Draw Sine Neural Wave Streams
      const waveCount = 3;
      for (let w = 0; w < waveCount; w++) {
        ctx.beginPath();
        const waveOffset = w * (Math.PI / 1.5);
        const waveY = height * (0.3 + w * 0.2);

        for (let x = 0; x < width; x += 12) {
          const distanceToMouse = Math.abs(x - mousePos.current.x);
          const mouseDisplacement = Math.max(0, (200 - distanceToMouse) / 200) * 35;

          const y = waveY + 
            Math.sin(x * 0.003 + time + waveOffset) * 45 + 
            Math.cos(x * 0.006 - time * 0.8) * 20 - 
            mouseDisplacement;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.strokeStyle = w === 0 ? activePalette.accentHex : activePalette.secondaryHex;
        ctx.globalAlpha = 0.12 - w * 0.03;
        ctx.lineWidth = 2.5 - w * 0.5;
        ctx.stroke();
      }

      // 2. Draw & Update Ripples
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const r = ripplesRef.current[i];
        r.radius += 3.5;
        r.alpha *= 0.96;

        if (r.alpha < 0.01 || r.radius > r.maxRadius) {
          ripplesRef.current.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = r.color;
        ctx.globalAlpha = r.alpha;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // 3. Draw & Update Parallax Particles & Constellation Links
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Sine breathing alpha
        p.alpha = p.baseAlpha + Math.sin(time * 2 + p.phase) * 0.2;

        // Parallax displacement based on mouse position
        const parallaxX = ((mousePos.current.x - width / 2) / (width / 2)) * 15 * p.zDepth;
        const parallaxY = ((mousePos.current.y - height / 2) / (height / 2)) * 15 * p.zDepth;

        // Movement
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        const drawX = p.x + parallaxX;
        const drawY = p.y + parallaxY;

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(drawX, drawY, p.size * p.zDepth, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, p.alpha));
        ctx.shadowBlur = 10 * p.zDepth;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Constellation Proximity Lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = (p2.x + ((mousePos.current.x - width / 2) / (width / 2)) * 15 * p2.zDepth) - drawX;
          const dy = (p2.y + ((mousePos.current.y - height / 2) / (height / 2)) * 15 * p2.zDepth) - drawY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(drawX, drawY);
            ctx.lineTo(drawX + dx, drawY + dy);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - dist / 130) * 0.18;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, [themeId, particleDensity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
