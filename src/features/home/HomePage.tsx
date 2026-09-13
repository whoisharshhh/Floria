"use client";

import React, { useState, useRef, useEffect } from "react";
import { StorytellingSection } from "@/components/sections/Storytelling";
import { FloriaDiscoverySection } from "@/components/sections/Discovery";
import { FloriaFooter } from "@/components/layout/Footer";
import { LuxuryPreloader } from "@/components/ui/Preloader";
import { HeroSection } from "@/components/sections/Hero";
import { useIsMobile } from "@/hooks";

/**
 * HomePage — composition root for the `/` route.
 * Owns the hero spotlight interaction; sections below are self-contained.
 */
export function HomePage() {
  const [preloadProgress, setPreloadProgress] = useState(0);

  // Hover & Touch Reveal State
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();
  const mousePos = useRef({ x: -1000, y: -1000 });
  const currentPos = useRef({ x: -1000, y: -1000 });
  const isTouching = useRef(false);
  const heroRef = useRef<HTMLElement>(null);
  const revealLayerRef = useRef<HTMLDivElement>(null);
  const animFrameId = useRef<number | null>(null);

  // Seed the spotlight at the hero centre on touch devices.
  useEffect(() => {
    if (isMobile && heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      mousePos.current = { x: rect.width * 0.5, y: rect.height * 0.45 };
      currentPos.current = { x: rect.width * 0.5, y: rect.height * 0.45 };
    }
  }, [isMobile]);

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
      <HeroSection
        heroRef={heroRef}
        revealLayerRef={revealLayerRef}
        isMobile={isMobile}
        isHovered={isHovered}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />

      {/* 2. SCROLL-DRIVEN STORYTELLING SECTION DIRECTLY AFTER HERO */}
      <StorytellingSection onLoadProgress={setPreloadProgress} />

      {/* 3. FLORIA DISCOVERY SECTION — INTERACTIVE DIGITAL ARCHIVE */}
      <FloriaDiscoverySection />

      {/* 4. FLORIA FOOTER — ART BOOK COLOPHON */}
      <FloriaFooter />
    </div>
  );
}
