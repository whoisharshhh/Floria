"use client";

import React, { useState, useRef, useEffect } from "react";
import StorytellingSection from "@/components/StorytellingSection";
import FloriaDiscoverySection from "@/components/FloriaDiscoverySection";
import FloriaFooter from "@/components/FloriaFooter";
import LuxuryPreloader from "@/components/LuxuryPreloader";

export default function Home() {
  const [preloadProgress, setPreloadProgress] = useState(0);

  // Hover & Touch Reveal State
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const mousePos = useRef({ x: -1000, y: -1000 });
  const currentPos = useRef({ x: -1000, y: -1000 });
  const isTouching = useRef(false);
  const heroRef = useRef<HTMLElement>(null);
  const revealLayerRef = useRef<HTMLDivElement>(null);
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || ('ontouchstart' in window && window.innerWidth < 1024);
      setIsMobile(mobile);
      if (mobile && heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        mousePos.current = { x: rect.width * 0.5, y: rect.height * 0.45 };
        currentPos.current = { x: rect.width * 0.5, y: rect.height * 0.45 };
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    let t = 0;
    const updateSpotlight = () => {
      t += 0.015;

      // On mobile when not actively touching, smoothly float spotlight across the landscape
      if (isMobile && !isTouching.current && heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const centerX = rect.width * 0.5;
        const centerY = rect.height * 0.42;
        const wanderX = Math.sin(t * 0.75) * (rect.width * 0.24);
        const wanderY = Math.cos(t * 1.05) * (rect.height * 0.14);
        mousePos.current = { x: centerX + wanderX, y: centerY + wanderY };
      }

      // Lerp easing smoothing factor
      const factor = isMobile ? 0.1 : 0.14;
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * factor;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * factor;

      if (revealLayerRef.current) {
        const { x, y } = currentPos.current;
        // Mobile: 180px radius; Desktop: 260px radius
        const radius = isMobile ? 180 : 260;
        const core = isMobile ? 95 : 140;
        const mid = isMobile ? 145 : 210;
        const maskGradient = `radial-gradient(circle ${radius}px at ${x}px ${y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) ${core}px, rgba(0,0,0,0.4) ${mid}px, rgba(0,0,0,0) ${radius}px)`;
        revealLayerRef.current.style.webkitMaskImage = maskGradient;
        revealLayerRef.current.style.maskImage = maskGradient;
      }

      animFrameId.current = requestAnimationFrame(updateSpotlight);
    };

    animFrameId.current = requestAnimationFrame(updateSpotlight);
    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isMobile]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    if (!isHovered) {
      setIsHovered(true);
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mousePos.current = { x, y };
    currentPos.current = { x, y };
    setIsHovered(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!e.touches[0] || !heroRef.current) return;
    isTouching.current = true;
    const touch = e.touches[0];
    const rect = heroRef.current.getBoundingClientRect();
    mousePos.current = {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    };
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!e.touches[0] || !heroRef.current) return;
    isTouching.current = true;
    const touch = e.touches[0];
    const rect = heroRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    mousePos.current = { x, y };
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      isTouching.current = false;
    }, 1500);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setIsHovered(false);
  };

  return (
    <div
      suppressHydrationWarning
      className="relative w-full min-h-screen bg-black text-white selection:bg-white selection:text-black"
    >
      {/* LUXURY EDITORIAL PRELOADER (Locks scroll until video frames buffer) */}
      <LuxuryPreloader progress={preloadProgress} />

      {/* 1. HERO SECTION (100vh on desktop, 100dvh on mobile) */}
      <section
        ref={heroRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
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
            FLORIA
          </div>
          <nav className="flex items-center text-[10px] sm:text-xs font-mono tracking-[0.16em] sm:tracking-[0.2em] text-zinc-300 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
            <a
              href="https://www.linkedin.com/in/harsh-patel-mca"
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
            FLORIA
          </h1>
        </main>

        {/* BOTTOM ROW EDGE-TO-EDGE (Above Reveal Layer: z-20) */}
        <footer className="relative w-full flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 z-20 shrink-0 pb-8 md:pb-0">
          {/* Bottom-Left Description Block */}
          <div className="max-w-[340px] sm:max-w-[380px] text-left">
            <p className="text-zinc-200 text-xs sm:text-[15px] md:text-sm leading-relaxed font-sans font-normal tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              An immersive world of curious creatures, magical places, and stories waiting to be discovered.
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

      {/* 2. SCROLL-DRIVEN STORYTELLING SECTION DIRECTLY AFTER HERO */}
      <StorytellingSection onLoadProgress={setPreloadProgress} />

      {/* 3. FLORIA DISCOVERY SECTION — INTERACTIVE DIGITAL ARCHIVE */}
      <FloriaDiscoverySection />

      {/* 4. FLORIA FOOTER — ART BOOK COLOPHON */}
      <FloriaFooter />


    </div>
  );
}


