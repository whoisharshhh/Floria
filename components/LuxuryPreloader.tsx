"use client";

import React, { useEffect, useState } from "react";

interface LuxuryPreloaderProps {
  progress: number; // 0 to 100
  onComplete?: () => void;
}

export default function LuxuryPreloader({ progress, onComplete }: LuxuryPreloaderProps) {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Smooth number interpolation
  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayProgress((prev) => {
        if (prev < progress) {
          return Math.min(progress, prev + 1);
        }
        return prev;
      });
    }, 20);

    return () => clearInterval(timer);
  }, [progress]);

  // Lock scrolling while preloader is active
  useEffect(() => {
    if (!isDone) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      // Prevent mobile touch scroll gestures
      const preventScroll = (e: TouchEvent) => {
        e.preventDefault();
      };
      window.addEventListener("touchmove", preventScroll, { passive: false });

      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
        window.removeEventListener("touchmove", preventScroll);
      };
    }
  }, [isDone]);

  // Handle completion when reaching 100%
  useEffect(() => {
    if (displayProgress >= 100) {
      const finishTimer = setTimeout(() => {
        setIsDone(true);
        if (onComplete) onComplete();
      }, 400);

      const hideTimer = setTimeout(() => {
        setHidden(true);
      }, 1200);

      return () => {
        clearTimeout(finishTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [displayProgress, onComplete]);

  if (hidden) return null;

  // Status subtitle based on progress
  const getStatusText = (val: number) => {
    if (val < 25) return "Gathering floral threads...";
    if (val < 55) return "Weaving woolen sanctuary...";
    if (val < 85) return "Tuning sensory video frames...";
    if (val < 100) return "Almost ready...";
    return "Sanctuary ready to explore";
  };

  return (
    <div
      style={{
        transition: "opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#070709] px-6 select-none ${
        isDone ? "opacity-0 pointer-events-none scale-105" : "opacity-100 scale-100"
      }`}
    >
      {/* Ambient background rose-gold glow */}
      <div className="absolute w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] rounded-full bg-rose-500/10 blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute w-[220px] h-[220px] sm:w-[350px] sm:h-[350px] rounded-full bg-amber-400/10 blur-[80px] pointer-events-none" />

      {/* Central Brand Emblem */}
      <div className="relative flex flex-col items-center justify-center text-center z-10 max-w-sm w-full">
        {/* Animated Woolen Flower Ring Icon */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-8 flex items-center justify-center">
          {/* Outer rotating dashed stitches */}
          <div className="absolute inset-0 rounded-full border border-dashed border-rose-300/30 animate-[spin_12s_linear_infinite]" />
          
          {/* Inner pulsating glow ring */}
          <div className="absolute inset-2 rounded-full border border-rose-400/40 animate-[spin_8s_linear_infinite_reverse]" />

          {/* Organic Blooming Flower SVG */}
          <svg
            viewBox="0 0 100 100"
            className="w-12 h-12 text-rose-300 drop-shadow-[0_0_15px_rgba(244,114,182,0.8)]"
            fill="currentColor"
          >
            {/* 6 Woolen Flower Petals */}
            <circle cx="50" cy="30" r="14" fill="rgba(251, 191, 36, 0.75)" />
            <circle cx="67" cy="40" r="14" fill="rgba(244, 114, 182, 0.75)" />
            <circle cx="67" cy="60" r="14" fill="rgba(251, 191, 36, 0.75)" />
            <circle cx="50" cy="70" r="14" fill="rgba(244, 114, 182, 0.75)" />
            <circle cx="33" cy="60" r="14" fill="rgba(251, 191, 36, 0.75)" />
            <circle cx="33" cy="40" r="14" fill="rgba(244, 114, 182, 0.75)" />
            {/* Flower Center */}
            <circle cx="50" cy="50" r="11" fill="#fff" />
          </svg>

          {/* Golden Sparkles */}
          <span className="absolute -top-1 right-2 text-amber-300 text-xs animate-ping">✦</span>
          <span className="absolute -bottom-1 left-2 text-rose-300 text-xs animate-pulse">✧</span>
        </div>

        {/* Brand Name */}
        <h2 className="font-sans font-extrabold tracking-[0.32em] text-white text-2xl sm:text-3xl uppercase drop-shadow-[0_2px_12px_rgba(255,255,255,0.3)] mb-2">
          FLORIA
        </h2>

        {/* Subtitle */}
        <p className="font-mono text-[10px] sm:text-xs tracking-[0.24em] uppercase text-rose-200/70 mb-8">
          WOOLEN FLORAL EXPERIENCE
        </p>

        {/* Progress Bar Container */}
        <div className="w-full max-w-[260px] flex flex-col items-center gap-3">
          {/* The Bar */}
          <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden relative">
            <div
              style={{ width: `${displayProgress}%` }}
              className="h-full bg-gradient-to-r from-rose-400 via-amber-300 to-rose-300 transition-all duration-150 ease-out shadow-[0_0_12px_rgba(244,114,182,0.9)]"
            />
          </div>

          {/* Percentage & Status Counter */}
          <div className="w-full flex items-center justify-between text-[11px] font-mono tracking-widest text-zinc-400">
            <span className="text-zinc-300">{getStatusText(displayProgress)}</span>
            <span className="text-rose-300 font-semibold">{displayProgress}%</span>
          </div>
        </div>

        {/* Mobile-Friendly Hint */}
        <div className="mt-8 text-[9px] font-mono tracking-[0.2em] uppercase text-zinc-500">
          {displayProgress >= 100 ? "Swipe down to begin" : "Loading high-definition frames"}
        </div>
      </div>
    </div>
  );
}
