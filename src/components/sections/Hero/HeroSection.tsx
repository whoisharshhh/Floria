"use client";

import type React from "react";
import { siteConfig } from "@/config/site";

interface HeroSectionProps {
  heroRef: React.RefObject<HTMLElement | null>;
  revealLayerRef: React.RefObject<HTMLDivElement | null>;
  isMobile: boolean;
  isHovered: boolean;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave: () => void;
  onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
  onTouchMove: (e: React.TouchEvent<HTMLDivElement>) => void;
  onTouchEnd: () => void;
}

/**
 * Full-viewport hero with a cursor/touch spotlight reveal.
 * Presentational only — all pointer state lives in the parent feature.
 */
export function HeroSection({
  heroRef,
  revealLayerRef,
  isMobile,
  isHovered,
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}: HeroSectionProps) {
  return (
    <section
      ref={heroRef}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className="relative min-h-[100dvh] h-[100dvh] md:h-screen w-full bg-black text-white flex flex-col justify-between px-6 sm:px-12 md:px-16 lg:px-20 py-6 sm:py-10 md:py-10 overflow-hidden select-none font-sans"
    >
      {/* BASE HERO BACKGROUND (BG_IMAGE_1) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <img
          src="/bg_image_1.jpg"
          alt="Floria World Base"
          className="w-full h-full object-cover object-center select-none"
        />
        {/* Subtle cinematic gradient vignette to keep editorial text legible */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/15 to-black/60 pointer-events-none" />
      </div>

      {/* REVEAL LAYER (BG_IMAGE_2) WITH CURSOR/TOUCH SPOTLIGHT MASK */}
      <div
        ref={revealLayerRef}
        style={{
          opacity: isMobile ? 1 : isHovered ? 1 : 0,
          transition: isMobile ? "none" : "opacity 0.35s ease-out",
        }}
        className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden"
      >
        <img
          src="/bg_image_2.jpg"
          alt="Floria World Reveal"
          className="w-full h-full object-cover object-center select-none"
        />
        {/* Matching cinematic gradient vignette on the reveal image */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 pointer-events-none" />
      </div>

      {/* TOP NAVBAR (Above Reveal Layer: z-20) */}
      <header className="relative w-full flex items-center justify-between z-20 shrink-0">
        <div className="text-xs sm:text-sm font-semibold tracking-[0.28em] uppercase text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          {siteConfig.name}
        </div>
        <nav className="flex items-center text-[10px] sm:text-xs font-mono tracking-[0.16em] sm:tracking-[0.2em] text-zinc-300 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-200 flex items-center gap-1.5 group cursor-pointer"
            title="Harsh Patel LinkedIn Profile"
          >
            <span>LINKEDIN</span>
            <span className="text-[10px] text-zinc-400 group-hover:text-white transition-colors duration-200">↗</span>
          </a>
        </nav>
      </header>

      {/* CENTER HERO SECTION (Above Reveal Layer: z-20) */}
      <main className="relative w-full flex flex-col items-center justify-center my-auto z-20 py-2 sm:py-4 -translate-y-[4%] sm:-translate-y-[10%] md:-translate-y-[20%]">
        {/* Supporting Tagline (Positioned above FLORIA) */}
        <div className="text-[11px] sm:text-xs md:text-sm font-mono tracking-[0.16em] sm:tracking-[0.24em] uppercase text-zinc-200 font-medium select-none mb-2 sm:mb-3 text-center drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          ENTER A WORLD WHERE CREATURES COME ALIVE
        </div>

        {/* Dominant Hero Headline (Responsive clamp to avoid horizontal scroll) */}
        <h1 className="w-full font-sans font-black tracking-[-0.04em] leading-[0.86] md:leading-[0.82] text-white text-[16vw] sm:text-[18vw] md:text-[180px] lg:text-[230px] xl:text-[270px] select-none text-center uppercase my-0 py-0 drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)] max-w-full break-normal">
          {siteConfig.name}
        </h1>
      </main>

      {/* BOTTOM ROW EDGE-TO-EDGE (Above Reveal Layer: z-20) */}
      <footer className="relative w-full flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 z-20 shrink-0 pb-8 md:pb-0">
        {/* Bottom-Left Description Block */}
        <div className="max-w-[340px] sm:max-w-[380px] text-left">
          <p className="text-zinc-200 text-xs sm:text-[15px] md:text-sm leading-relaxed font-sans font-normal tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            {siteConfig.description}
          </p>
        </div>
      </footer>

      {/* Subtle Bottom Center Scroll Indicator to invite exploration */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
        <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-zinc-400">
          SCROLL TO DISCOVER
        </span>
        <span className="text-[10px] text-zinc-400 animate-bounce">↓</span>
      </div>
    </section>
  );
}
