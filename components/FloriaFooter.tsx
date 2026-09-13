"use client";

import React, { useState } from "react";

export default function FloriaFooter() {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    setMousePos({ x, y });
  };

  return (
    <footer className="relative w-full bg-black text-white pt-16 sm:pt-28 md:pt-40 pb-12 sm:pb-16 px-6 sm:px-10 md:px-16 lg:px-24 overflow-hidden select-none border-t border-zinc-900/80 font-sans">
      {/* Background Archival Grid Ambient lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col justify-between">
        {/* ============================================================ */}
        {/* 1. TOP BRAND MANIFESTO & STORY STATEMENT                     */}
        {/* ============================================================ */}
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center pb-16 sm:pb-24 border-b border-zinc-900 space-y-4 sm:space-y-6">
          {/* Section Kicker */}
          <div className="flex items-center gap-2.5 font-mono text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] text-pink-400 uppercase font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse shadow-[0_0_8px_rgba(244,114,182,0.8)]" />
            A WORLD WOVEN FROM DREAMS // CHAPTER I
          </div>

          <p className="font-display font-medium text-xl sm:text-3xl md:text-4xl text-white leading-snug tracking-tight max-w-3xl">
            Step into a living sanctuary where curious creatures roam, gentle blossoms hum, and every path leads to a magical story.
          </p>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-xl font-light">
            Crafted with tactile textures, embroidered valleys, and quiet wonder. Floria is an invitation to slow down, wander beyond the horizon, and rediscover the joy of imagination.
          </p>

          {/* Whimsical Archival Stamps */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 font-mono text-[9px] sm:text-[10px] tracking-[0.16em] sm:tracking-[0.2em] text-zinc-400 uppercase">
            <a
              href="https://www.linkedin.com/in/harsh-patel-mca"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-pink-500/40 bg-pink-500/10 text-pink-300 hover:text-white hover:border-pink-400 px-3 py-1.5 rounded-sm font-medium shadow-[0_0_15px_rgba(244,114,182,0.15)] transition-colors flex items-center gap-1.5"
            >
              <span>✦ CREATED BY HARSH PATEL</span>
              <span className="text-[9px]">↗</span>
            </a>
            <span className="border border-white/15 bg-white/5 px-3 py-1.5 rounded-sm">
              ✦ LIVING STORYBOOK
            </span>
            <span className="border border-white/15 bg-white/5 text-zinc-300 px-3 py-1.5 rounded-sm">
              EST. 2026
            </span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. OVERSIZED FLORIA TYPOGRAPHY (INTERACTIVE LIVING PLATE)    */}
        {/* ============================================================ */}
        <div
          className="relative py-10 sm:py-20 border-b border-zinc-900 flex flex-col items-center justify-center w-full overflow-visible group cursor-pointer"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setMousePos({ x: 0.5, y: 0.5 });
          }}
        >
          {/* Micro Archival Kicker above the Word */}
          <div className="flex items-center gap-2 font-mono text-[9px] sm:text-[11px] tracking-[0.3em] text-pink-400/90 uppercase mb-3 sm:mb-5 transition-opacity duration-300">
            <span className="text-pink-400">✦</span>
            <span>BOTANICAL ARCHIVE // LIVING MONOGRAPH</span>
            <span className="text-pink-400">✦</span>
          </div>

          {/* Huge Architectural Monograph Lettering with Living Liquid Shimmer & 3D Tilt */}
          <h1
            className="w-full font-display font-black tracking-tight sm:tracking-normal md:tracking-[-0.03em] leading-[0.85] uppercase select-none text-[clamp(2.4rem,11.5vw,16.5rem)] py-2 max-w-full text-center whitespace-nowrap will-change-transform transition-all duration-300 ease-out"
            style={{
              backgroundImage:
                "linear-gradient(115deg, #ffffff 0%, #fed7aa 22%, #f472b6 42%, #e879f9 60%, #38bdf8 80%, #ffffff 100%)",
              backgroundSize: "240% 100%",
              backgroundPosition: `${mousePos.x * 100}% 50%`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              WebkitTextStroke: "1px rgba(255, 255, 255, 0.25)",
              transform: isHovered
                ? `perspective(1000px) rotateX(${(mousePos.y - 0.5) * -7}deg) rotateY(${(mousePos.x - 0.5) * 9}deg) scale(1.025)`
                : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
              filter:
                "drop-shadow(0 10px 40px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 25px rgba(244, 114, 182, 0.25))",
            }}
          >
            FLORIA
          </h1>

          {/* Micro Corner Crosshairs */}
          <span className="absolute top-4 left-4 sm:left-12 font-mono text-xs text-pink-500/40 select-none">┌</span>
          <span className="absolute top-4 right-4 sm:right-12 font-mono text-xs text-pink-500/40 select-none">┐</span>
          <span className="absolute bottom-4 left-4 sm:left-12 font-mono text-xs text-pink-500/40 select-none">└</span>
          <span className="absolute bottom-4 right-4 sm:right-12 font-mono text-xs text-pink-500/40 select-none">┘</span>

          {/* Editorial Subtitle Strip Centered under FLORIA */}
          <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-6 font-mono text-[8.5px] sm:text-[10px] md:text-[11px] tracking-[0.2em] sm:tracking-[0.28em] text-zinc-400 uppercase">
            <span>[ AN IMMERSIVE WORLD OF CURIOUS CREATURES ]</span>
            <span className="text-zinc-600 hidden xs:inline">•</span>
            <a
              href="https://www.linkedin.com/in/harsh-patel-mca"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 hover:text-white font-medium transition-colors"
            >
              [ CREATED & DESIGNED BY HARSH PATEL ↗ ]
            </a>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3. FINAL STORYBOOK COLOPHON & COPYRIGHT                      */}
        {/* ============================================================ */}
        <div className="pt-8 sm:pt-10 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-[9px] sm:text-[10px] tracking-[0.16em] sm:tracking-[0.2em] text-zinc-500 uppercase">
          {/* Copyright & Archival Credit */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 text-center sm:text-left">
            <span>© 2026 FLORIA</span>
            <span>•</span>
            <span>
              CREATED BY{" "}
              <a
                href="https://www.linkedin.com/in/harsh-patel-mca"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-pink-300 transition-colors font-bold tracking-wider underline underline-offset-4 decoration-zinc-600 hover:decoration-pink-400"
              >
                HARSH PATEL ↗
              </a>
            </span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline text-zinc-400">
              IMMERSIVE LIVING SANCTUARY
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-zinc-400 font-medium">STATUS: ACTIVE EXPEDITION</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

