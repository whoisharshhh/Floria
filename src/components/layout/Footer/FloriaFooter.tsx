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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-[#070709] text-white pt-20 sm:pt-28 md:pt-36 pb-14 sm:pb-18 px-6 sm:px-10 md:px-16 lg:px-24 overflow-hidden select-none border-t border-white/[0.08] font-sans">
      {/* 1. Ambient Warm Aurora Clouds */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[850px] h-[350px] sm:h-[450px] bg-rose-500/[0.07] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[380px] h-[300px] bg-amber-400/[0.05] rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[320px] bg-purple-500/[0.05] rounded-full blur-[120px] pointer-events-none" />

      {/* 2. Delicate Woolen Stitched Border at Top */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-rose-300/30 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col justify-between">
        {/* ============================================================ */}
        {/* 1. ELEGANT STORYBOOK MANIFESTO                                */}
        {/* ============================================================ */}
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center pb-16 sm:pb-20 border-b border-white/[0.07] space-y-5 sm:space-y-6">
          {/* Whimsical Kicker Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-rose-300/20 bg-rose-500/[0.08] backdrop-blur-md shadow-[0_0_20px_rgba(244,114,182,0.15)]">
            <span className="text-amber-300 text-xs animate-pulse">✦</span>
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-rose-200 uppercase font-medium">
              SANCTUARY OF WONDER
            </span>
            <span className="text-rose-300 text-xs animate-pulse">✦</span>
          </div>

          {/* Emotional Manifesto Heading */}
          <h2 className="font-sans font-bold text-2xl sm:text-3xl md:text-4xl text-white leading-tight tracking-tight max-w-2xl drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
            Where curious creatures roam and every flower weaves a story.
          </h2>

          {/* Warm Poetic Body */}
          <p className="text-sm sm:text-base text-zinc-300/90 leading-relaxed max-w-xl font-light tracking-wide">
            Handcrafted with tactile textures, embroidered valleys, and quiet poetry. 
            Floria is an invitation to slow down, wander through gentle petals, and rediscover the joy of imagination.
          </p>

          {/* Luxury Creator & Storybook Badges */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3 sm:gap-4 font-mono text-[10px] sm:text-[11px] tracking-[0.16em] uppercase">
            <a
              href="https://www.linkedin.com/in/harsh-patel-mca"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full border border-rose-400/30 bg-gradient-to-r from-rose-500/10 to-amber-500/10 hover:border-rose-300 text-rose-200 hover:text-white transition-all duration-300 shadow-[0_4px_20px_rgba(244,114,182,0.15)] hover:shadow-[0_6px_25px_rgba(244,114,182,0.3)] hover:-translate-y-0.5"
            >
              <span className="text-amber-300 group-hover:scale-125 transition-transform duration-300">✦</span>
              <span className="font-semibold tracking-wider">CRAFTED BY HARSH PATEL</span>
              <span className="text-rose-400 group-hover:text-white transition-colors">↗</span>
            </a>

            <span className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-zinc-300/80 backdrop-blur-sm">
              WOOLEN LIVING WORLD
            </span>

            <span className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-zinc-400 backdrop-blur-sm">
              EDITION 2026
            </span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. TIMELESS, ULTRA-LUXURIOUS FLORIA TYPOGRAPHY               */}
        {/* ============================================================ */}
        <div
          className="relative py-14 sm:py-20 border-b border-white/[0.07] flex flex-col items-center justify-center w-full overflow-visible group cursor-pointer"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setMousePos({ x: 0.5, y: 0.5 });
          }}
        >
          {/* Subtle Radial Cursor Spotlight Glow */}
          <div
            className="absolute pointer-events-none rounded-full blur-[80px] transition-opacity duration-500"
            style={{
              left: `${mousePos.x * 100}%`,
              top: `${mousePos.y * 100}%`,
              width: "380px",
              height: "220px",
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, rgba(244,114,182,0.22) 0%, rgba(251,191,36,0.14) 45%, transparent 75%)",
              opacity: isHovered ? 1 : 0.4,
            }}
          />

          {/* Subtitle with Sparkles */}
          <div className="flex items-center gap-3 font-mono text-[9px] sm:text-[11px] tracking-[0.3em] sm:tracking-[0.36em] text-rose-300/80 uppercase mb-4 sm:mb-6">
            <span className="text-amber-300/80 text-xs">✦</span>
            <span>A BOTANICAL LIVING STORYBOOK</span>
            <span className="text-rose-300/80 text-xs">✦</span>
          </div>

          {/* Grand, Clean & Powerful Headline (Font-Sans Black, No Glitches) */}
          <h1
            className="w-full font-sans font-black tracking-[-0.03em] sm:tracking-[-0.04em] leading-[0.85] text-center select-none text-[clamp(2.8rem,14vw,14.5rem)] py-2 uppercase transition-all duration-300 ease-out"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #ffffff 0%, #fff1f2 22%, #fbcfe8 45%, #fde68a 70%, #ffffff 100%)",
              backgroundSize: "200% 200%",
              backgroundPosition: `${mousePos.x * 100}% 50%`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: isHovered
                ? "drop-shadow(0 15px 45px rgba(0,0,0,0.9)) drop-shadow(0 0 35px rgba(244, 114, 182, 0.35))"
                : "drop-shadow(0 10px 30px rgba(0,0,0,0.8)) drop-shadow(0 0 20px rgba(251, 191, 36, 0.15))",
              transform: isHovered ? "scale(1.015)" : "scale(1)",
            }}
          >
            FLORIA
          </h1>

          {/* Subtitle Motto */}
          <p className="mt-4 sm:mt-6 font-mono text-[9px] sm:text-xs tracking-[0.24em] text-zinc-400 uppercase text-center max-w-lg">
            An immersive realm crafted with tactile wool & quiet wonder
          </p>
        </div>

        {/* ============================================================ */}
        {/* 3. CLEAN & SOPHISTICATED BOTTOM BAR                           */}
        {/* ============================================================ */}
        <div className="pt-8 sm:pt-10 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-[10px] tracking-[0.18em] text-zinc-500 uppercase">
          {/* Copyright & Harsh Patel Credit */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 text-center sm:text-left">
            <span>© 2026 FLORIA SANCTUARY</span>
            <span className="text-zinc-600">•</span>
            <span>
              DESIGNED BY{" "}
              <a
                href="https://www.linkedin.com/in/harsh-patel-mca"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-300 hover:text-rose-300 transition-colors font-semibold"
              >
                HARSH PATEL ↗
              </a>
            </span>
          </div>

          {/* Status & Back to Top */}
          <div className="flex items-center gap-5 sm:gap-6">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-400" />
              </span>
              <span className="text-zinc-400">SANCTUARY BLOOMING</span>
            </div>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer group"
              title="Return to top"
            >
              <span>TOP</span>
              <span className="group-hover:-translate-y-0.5 transition-transform">↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
