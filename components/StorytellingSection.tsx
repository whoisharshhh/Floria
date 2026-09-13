"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";

const TOTAL_PART1 = 232;
const TOTAL_PART2 = 232;
const BLEND_SPAN = 38; // 38 frames of cinematic S-curve morph & camera dolly flight
const TOTAL_COMBINED = TOTAL_PART1 + TOTAL_PART2 - BLEND_SPAN; // 426 virtual frames
const TRANSITION_START = TOTAL_PART1 - BLEND_SPAN; // 194
const TRANSITION_END = TOTAL_PART1; // 232

// All 35 authentic bloom images from public/discovery/bloms
// Scattered across full screen width — edge to edge, no gaps
const BLOOM_ITEMS = [
  // ═══════════════════════════════════════════════════════
  // LEFT SIDE — 17 photos spread across 5 columns (0% → 28%)
  // All photos visible on mobile and desktop!
  // ═══════════════════════════════════════════════════════

  // Row 1 (top ~2-8%)
  { file: "WhatsApp Image 2026-09-13 at 12.28.51 (1).jpeg", title: "BLOSSOM DUSK",
    className: "absolute top-[2%] left-[2%] sm:left-[1%]",
    rot: -4, dx: -140, dy: -80, speed: 1.1, phase: 0.2 },
  { file: "WhatsApp Image 2026-09-13 at 12.28.51.jpeg", title: "WOOLEN HILLS",
    className: "absolute top-[4%] left-[20%] sm:top-[5%] sm:left-[11%]",
    rot: 3.5, dx: -110, dy: -55, speed: 0.95, phase: 1.4 },
  { file: "WhatsApp Image 2026-09-13 at 12.50.07.jpeg", title: "SILKEN VALLEY",
    className: "absolute top-[2%] left-[38%] sm:left-[22%] lg:left-[24%]",
    rot: 2.8, dx: -75, dy: -70, speed: 0.92, phase: 3.7 },

  // Row 2 (~14-22%)
  { file: "WhatsApp Image 2026-09-13 at 12.28.52 (1).jpeg", title: "LAVENDER VALE",
    className: "absolute top-[12%] left-[3%] sm:top-[16%] sm:left-[1%]",
    rot: -3, dx: -160, dy: -30, speed: 1.2, phase: 2.7 },
  { file: "WhatsApp Image 2026-09-13 at 12.50.04 (1).jpeg", title: "PETAL DREAMS",
    className: "absolute top-[14%] left-[21%] sm:left-[14%] lg:left-[16%]",
    rot: 3.2, dx: -95, dy: -60, speed: 1.05, phase: 2.4 },
  { file: "image.png", title: "FLORIA SANCTUARY",
    className: "absolute top-[11%] left-[40%] sm:top-[18%] sm:left-[26%] lg:left-[28%]",
    rot: -2, dx: -80, dy: -35, speed: 0.85, phase: 1.9 },

  // Row 3 (~28-36%)
  { file: "WhatsApp Image 2026-09-13 at 12.28.52.jpeg", title: "SUNRISE MEADOW",
    className: "absolute top-[22%] left-[3%] sm:top-[30%] sm:left-[2%]",
    rot: 4, dx: -150, dy: -5, speed: 1.05, phase: 3.8 },
  { file: "WhatsApp Image 2026-09-13 at 12.50.04.jpeg", title: "EMERALD GROVE",
    className: "absolute top-[25%] left-[21%] sm:top-[28%] sm:left-[13%] lg:left-[15%]",
    rot: -3.5, dx: -100, dy: -10, speed: 0.9, phase: 3.1 },
  { file: "WhatsApp Image 2026-09-13 at 12.50.07 (2).jpeg", title: "MUSHROOM GLOW",
    className: "absolute top-[21%] left-[39%] sm:top-[32%] sm:left-[24%] lg:left-[27%]",
    rot: 4.2, dx: -70, dy: 5, speed: 0.88, phase: 1.7 },

  // Row 4 (~42-50%)
  { file: "WhatsApp Image 2026-09-13 at 12.28.53 (1).jpeg", title: "SPRING BREEZE",
    className: "absolute top-[33%] left-[2%] sm:top-[44%] sm:left-[1%]",
    rot: -2.5, dx: -155, dy: 30, speed: 0.9, phase: 4.6 },
  { file: "WhatsApp Image 2026-09-13 at 12.50.05 (1).jpeg", title: "FAIRY MEADOW",
    className: "absolute top-[41%] left-[12%] sm:top-[43%] sm:left-[13%] lg:left-[16%]",
    rot: 2.5, dx: -95, dy: 20, speed: 1.15, phase: 4.0 },

  // Row 5 (~56-64%)
  { file: "WhatsApp Image 2026-09-13 at 12.28.53.jpeg", title: "PASTEL CANOPY",
    className: "absolute top-[50%] left-[2%] sm:top-[58%] sm:left-[2%]",
    rot: 3, dx: -145, dy: 60, speed: 1.15, phase: 5.2 },
  { file: "WhatsApp Image 2026-09-13 at 12.50.05.jpeg", title: "TWILIGHT GLADE",
    className: "absolute top-[58%] left-[12%] sm:top-[57%] sm:left-[14%] lg:left-[17%]",
    rot: -4.0, dx: -90, dy: 55, speed: 1.25, phase: 4.9 },
  { file: "WhatsApp Image 2026-09-13 at 12.50.07 (1).jpeg", title: "ENCHANTED BROOK",
    className: "absolute top-[66%] left-[3%] sm:top-[61%] sm:left-[26%] lg:left-[29%]",
    rot: -2.8, dx: -70, dy: 50, speed: 1.1, phase: 0.6 },

  // Row 6 (~70-78%)
  { file: "WhatsApp Image 2026-09-13 at 12.50.06.jpeg", title: "MOSS COTTAGE",
    className: "absolute top-[72%] left-[20%] sm:left-[1%]",
    rot: 3.8, dx: -150, dy: 80, speed: 0.95, phase: 5.6 },
  { file: "WhatsApp Image 2026-09-13 at 12.50.07 (3).jpeg", title: "DAWN CHORUS",
    className: "absolute top-[67%] left-[38%] sm:top-[71%] sm:left-[14%] lg:left-[16%]",
    rot: -3.2, dx: -100, dy: 75, speed: 1.05, phase: 2.8 },

  // Row 7 (bottom ~84-93%)
  { file: "WhatsApp Image 2026-09-13 at 12.28.54 (1).jpeg", title: "WILD BLOOMS",
    className: "absolute bottom-[3%] left-[4%] sm:bottom-[3%] sm:left-[1%]",
    rot: -4.5, dx: -140, dy: 95, speed: 1.0, phase: 0.8 },

  // ═══════════════════════════════════════════════════════
  // RIGHT SIDE — 18 photos spread across 5 columns (0% → 28%)
  // All photos visible on mobile and desktop!
  // ═══════════════════════════════════════════════════════

  // Row 1 (top ~2-8%)
  { file: "WhatsApp Image 2026-09-13 at 12.28.54 (2).jpeg", title: "CHERRY BREEZE",
    className: "absolute top-[2%] right-[2%] sm:right-[1%]",
    rot: 4.5, dx: 140, dy: -80, speed: 1.1, phase: 1.1 },
  { file: "WhatsApp Image 2026-09-13 at 12.28.54.jpeg", title: "COTTON CLOUDS",
    className: "absolute top-[4%] right-[20%] sm:top-[5%] sm:right-[11%]",
    rot: -3.5, dx: 110, dy: -55, speed: 0.95, phase: 2.3 },
  { file: "WhatsApp Image 2026-09-13 at 12.50.10.jpeg", title: "SUNLIT GLADE",
    className: "absolute top-[2%] right-[38%] sm:right-[22%] lg:right-[24%]",
    rot: -2.7, dx: 75, dy: -70, speed: 0.92, phase: 4.4 },

  // Row 2 (~14-22%)
  { file: "WhatsApp Image 2026-09-13 at 12.28.55 (1).jpeg", title: "BLOSSOM STREAM",
    className: "absolute top-[12%] right-[3%] sm:top-[16%] sm:right-[1%]",
    rot: 3, dx: 160, dy: -30, speed: 1.2, phase: 3.5 },
  { file: "WhatsApp Image 2026-09-13 at 12.50.08 (1).jpeg", title: "AMBER WHISPER",
    className: "absolute top-[14%] right-[21%] sm:right-[14%] lg:right-[16%]",
    rot: -4.2, dx: 95, dy: -60, speed: 1.05, phase: 1.3 },
  { file: "WhatsApp Image 2026-09-13 at 12.28.56 (2).jpeg", title: "WOOLEN COTTAGE",
    className: "absolute top-[11%] right-[40%] sm:top-[18%] sm:right-[26%] lg:right-[28%]",
    rot: 2, dx: 80, dy: -35, speed: 0.85, phase: 2.9 },

  // Row 3 (~28-36%)
  { file: "WhatsApp Image 2026-09-13 at 12.28.55 (2).jpeg", title: "FELT PETALS",
    className: "absolute top-[22%] right-[3%] sm:top-[30%] sm:right-[2%]",
    rot: -4, dx: 150, dy: -5, speed: 1.05, phase: 4.7 },
  { file: "WhatsApp Image 2026-09-13 at 12.50.08 (2).jpeg", title: "CRYSTAL RIVER",
    className: "absolute top-[25%] right-[21%] sm:top-[28%] sm:right-[13%] lg:right-[15%]",
    rot: 3.6, dx: 100, dy: -10, speed: 0.9, phase: 2.6 },
  { file: "WhatsApp Image 2026-09-13 at 12.50.09.jpeg", title: "AUTUMN HILL",
    className: "absolute top-[21%] right-[39%] sm:top-[32%] sm:right-[24%] lg:right-[27%]",
    rot: -4.1, dx: 70, dy: 5, speed: 0.88, phase: 2.1 },

  // Row 4 (~42-50%)
  { file: "WhatsApp Image 2026-09-13 at 12.28.55 (3).jpeg", title: "SILK HORIZON",
    className: "absolute top-[33%] right-[2%] sm:top-[44%] sm:right-[1%]",
    rot: 2.5, dx: 155, dy: 30, speed: 0.9, phase: 5.8 },
  { file: "WhatsApp Image 2026-09-13 at 12.50.08.jpeg", title: "RUSTIC NOOK",
    className: "absolute top-[41%] right-[12%] sm:top-[43%] sm:right-[13%] lg:right-[16%]",
    rot: -2.8, dx: 95, dy: 20, speed: 1.15, phase: 3.4 },

  // Row 5 (~56-64%)
  { file: "WhatsApp Image 2026-09-13 at 12.28.55.jpeg", title: "GOLDEN HARVEST",
    className: "absolute top-[50%] right-[2%] sm:top-[58%] sm:right-[2%]",
    rot: -3, dx: 145, dy: 60, speed: 1.15, phase: 0.4 },
  { file: "WhatsApp Image 2026-09-13 at 12.50.09 (1).jpeg", title: "HONEY BLOOM",
    className: "absolute top-[58%] right-[12%] sm:top-[57%] sm:right-[14%] lg:right-[17%]",
    rot: 3.9, dx: 90, dy: 55, speed: 1.25, phase: 4.5 },
  { file: "WhatsApp Image 2026-09-13 at 12.50.09 (3).jpeg", title: "STARRY MIST",
    className: "absolute top-[66%] right-[3%] sm:top-[61%] sm:right-[26%] lg:right-[29%]",
    rot: 2.9, dx: 70, dy: 50, speed: 1.1, phase: 0.9 },

  // Row 6 (~70-78%)
  { file: "WhatsApp Image 2026-09-13 at 12.50.09 (2).jpeg", title: "QUIET POND",
    className: "absolute top-[72%] right-[20%] sm:right-[1%]",
    rot: -3.4, dx: 150, dy: 80, speed: 0.95, phase: 5.3 },
  { file: "WhatsApp Image 2026-09-13 at 12.50.10 (1).jpeg", title: "GENTLE STREAM",
    className: "absolute top-[67%] right-[38%] sm:top-[71%] sm:right-[14%] lg:right-[16%]",
    rot: 3.3, dx: 100, dy: 75, speed: 1.05, phase: 3.3 },

  // Row 7 (bottom ~84-93%)
  { file: "WhatsApp Image 2026-09-13 at 12.28.56 (1).jpeg", title: "MEADOW PATH",
    className: "absolute bottom-[3%] right-[4%] sm:bottom-[3%] sm:right-[1%]",
    rot: 4, dx: 140, dy: 95, speed: 1.0, phase: 1.7 },
  { file: "WhatsApp Image 2026-09-13 at 12.28.56.jpeg", title: "VILLAGE BLOOMS",
    className: "absolute bottom-[5%] right-[37%] sm:bottom-[5%] sm:right-[14%] lg:right-[16%]",
    rot: -3.5, dx: 95, dy: 90, speed: 1.05, phase: 4.1 },
];

export default function StorytellingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const borderImgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesCanvasRef = useRef<HTMLCanvasElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Gallery hover focus state
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Dynamic references for all bloom polaroid photos
  const photoRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Bioluminescent fireflies particle system
  const firefliesRef = useRef<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    color: string;
    glowColor: string;
    alpha: number;
    pulseSpeed: number;
    pulsePhase: number;
  }[]>([]);

  // Lightbox gallery state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const galleryScrollRef = useRef<HTMLDivElement>(null);

  const openLightbox = useCallback((idx: number) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  }, []);

  const goToImage = useCallback((idx: number) => {
    const clamped = Math.max(0, Math.min(BLOOM_ITEMS.length - 1, idx));
    setLightboxIndex(clamped);
    // Scroll to the image in the gallery strip
    if (galleryScrollRef.current) {
      const thumbWidth = 72; // thumbnail width + gap
      galleryScrollRef.current.scrollTo({
        left: clamped * thumbWidth - galleryScrollRef.current.clientWidth / 2 + thumbWidth / 2,
        behavior: "smooth",
      });
    }
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goToImage(lightboxIndex + 1);
      if (e.key === "ArrowLeft") goToImage(lightboxIndex - 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxOpen, lightboxIndex, closeLightbox, goToImage]);

  // Physics-based lerp tracking references
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const currentFrameRef = useRef(0);

  // In-memory 1080p HD frames caches
  const part1Ref = useRef<HTMLImageElement[]>([]);
  const part2Ref = useRef<HTMLImageElement[]>([]);

  // Initialize 45 organic bioluminescent fireflies
  useEffect(() => {
    const colors = [
      { fill: "#f472b6", glow: "rgba(244, 114, 182, 0.85)" }, // Blossom pink
      { fill: "#fbbf24", glow: "rgba(251, 191, 36, 0.85)" },  // Honey gold
      { fill: "#34d399", glow: "rgba(52, 211, 153, 0.85)" },  // Forest emerald
      { fill: "#38bdf8", glow: "rgba(56, 189, 248, 0.85)" },  // Celestial cyan
      { fill: "#c084fc", glow: "rgba(192, 132, 252, 0.85)" }, // Twilight lilac
    ];

    const width = typeof window !== "undefined" ? window.innerWidth : 1200;
    const height = typeof window !== "undefined" ? window.innerHeight : 800;

    firefliesRef.current = Array.from({ length: 48 }, () => {
      const c = colors[Math.floor(Math.random() * colors.length)];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2.2 + 1.2,
        color: c.fill,
        glowColor: c.glow,
        alpha: Math.random() * 0.45 + 0.45,
        pulseSpeed: Math.random() * 1.5 + 0.8,
        pulsePhase: Math.random() * Math.PI * 2,
      };
    });
  }, []);

  // 1. Progressive Image Cache Loader:
  // Part 1: Video 1 (235105.mp4 - 232 frames)
  // Part 2: Video 2 (235114.mp4 - 232 frames)
  useEffect(() => {
    const p1: HTMLImageElement[] = [];
    for (let i = 1; i <= TOTAL_PART1; i++) {
      const img = new Image();
      const num = String(i).padStart(3, "0");
      img.src = `/frames-part1/frame-${num}.jpg`;
      p1.push(img);
    }
    part1Ref.current = p1;

    const p2: HTMLImageElement[] = [];
    for (let i = 1; i <= TOTAL_PART2; i++) {
      const img = new Image();
      const num = String(i).padStart(3, "0");
      img.src = `/ezgif-7b873439e6df41fa-jpg/ezgif-frame-${num}.jpg`;
      p2.push(img);
    }
    part2Ref.current = p2;

    // Eagerly pre-decode initial and boundary transition frames in the background for zero-stutter GPU draws
    const prewarmSeam = async () => {
      // Eagerly decode first 25 frames immediately so user's first scroll touch is instant
      for (let i = 0; i < Math.min(25, TOTAL_PART1); i++) {
        if (p1[i] && typeof p1[i].decode === "function") {
          try { await p1[i].decode(); } catch (_) {}
        }
      }
      for (let i = Math.max(0, TRANSITION_START - 10); i < TOTAL_PART1; i++) {
        if (p1[i] && typeof p1[i].decode === "function") {
          try { await p1[i].decode(); } catch (_) {}
        }
      }
      for (let i = 0; i < Math.min(TOTAL_PART2, BLEND_SPAN + 10); i++) {
        if (p2[i] && typeof p2[i].decode === "function") {
          try { await p2[i].decode(); } catch (_) {}
        }
      }
    };
    prewarmSeam();
  }, []);

  // 2. Continuous 60fps/120fps Physics & GPU Canvas Render Loop
  useEffect(() => {
    let animId: number;
    let vw = window.innerWidth;
    let vh = window.innerHeight;
    let lastTimestamp = 0;

    const handleResize = () => {
      vw = window.innerWidth;
      vh = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth * dpr;
        canvasRef.current.height = window.innerHeight * dpr;
      }
      if (particlesCanvasRef.current) {
        particlesCanvasRef.current.width = window.innerWidth * dpr;
        particlesCanvasRef.current.height = window.innerHeight * dpr;
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    handleResize();

    // Mouse parallax tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Staggered exit trajectories and organic floating physics for all 17 Bloom photos
    const textConfigs = BLOOM_ITEMS.map((item, idx) => ({
      get ref() {
        return { current: photoRefs.current[idx] };
      },
      start: 0.01 + (idx % 4) * 0.01,
      end: 0.12 + (idx % 4) * 0.015,
      dx: item.dx,
      dy: item.dy,
      initRot: item.rot,
      extraRot: item.rot * 2.5,
      speed: item.speed,
      phase: item.phase,
      ampY: 6 + (idx % 3) * 2,
      ampX: 2 + (idx % 2) * 2,
      ampRot: 1.0,
      parallaxX: item.dx > 0 ? 14 : -14,
      parallaxY: item.dy * 0.08,
    }));


    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollTrackLength = rect.height - window.innerHeight;
      if (scrollTrackLength <= 0) return;

      const currentScroll = -rect.top;
      const rawProgress = currentScroll / scrollTrackLength;
      targetProgressRef.current = Math.min(Math.max(rawProgress, 0), 1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Safe cached image retrieval helper with graceful fallback
    const getCachedImg = (images: HTMLImageElement[], targetIdx: number, maxCount: number) => {
      if (!images || images.length === 0) return null;
      let idx = Math.min(maxCount - 1, Math.max(0, targetIdx));
      let img = images[idx];
      while (idx > 0 && (!img || !img.complete || img.naturalWidth === 0)) {
        idx--;
        img = images[idx];
      }
      return img && img.complete && img.naturalWidth > 0 ? img : null;
    };

    // Ultra-smooth, seamless cinematic bridging renderer
    const renderFrame = (vFrame: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      const cw = canvas.width;
      const ch = canvas.height;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      if (vFrame < TRANSITION_START) {
        // =========================================================
        // PHASE 1: PURE VIDEO 1 (Cottage valley flight)
        // =========================================================
        const img1 = getCachedImg(part1Ref.current, Math.round(vFrame), TOTAL_PART1);
        if (!img1) return;

        const imgW = img1.naturalWidth || 1920;
        const imgH = img1.naturalHeight || 1080;
        const scale = Math.max(cw / imgW, ch / imgH);
        const dw = imgW * scale;
        const dh = imgH * scale;
        const dx = (cw - dw) / 2;
        const dy = (ch - dh) * 0.56;

        ctx.globalAlpha = 1.0;
        ctx.drawImage(img1, dx, dy, dw, dh);

      } else if (vFrame >= TRANSITION_END) {
        // =========================================================
        // PHASE 3: PURE VIDEO 2 (Stream & sanctuary vista)
        // =========================================================
        const p2Idx = Math.round(vFrame - TRANSITION_END + BLEND_SPAN);
        const img2 = getCachedImg(part2Ref.current, p2Idx, TOTAL_PART2);
        if (!img2) return;

        const imgW = img2.naturalWidth || 1920;
        const imgH = img2.naturalHeight || 1080;
        const scale = Math.max(cw / imgW, ch / imgH);
        const dw = imgW * scale;
        const dh = imgH * scale;
        const dx = (cw - dw) / 2;
        const dy = (ch - dh) * 0.56;

        ctx.globalAlpha = 1.0;
        ctx.drawImage(img2, dx, dy, dw, dh);

      } else {
        // =========================================================
        // PHASE 2: HARMONIC SYSTEMATIC BRIDGE (Seamless Transition)
        // Both videos advance synchronously with S-curve cosine dissolve,
        // camera dolly forward push, and subtle blossom light bloom!
        // =========================================================
        const localT = Math.min(1, Math.max(0, (vFrame - TRANSITION_START) / BLEND_SPAN));

        // Cosine S-curve: zero derivative at start & arrival (buttery seamless)
        const blendWeight = 0.5 - 0.5 * Math.cos(Math.PI * localT);

        // Synchronous frame indices
        const idx1 = Math.min(TOTAL_PART1 - 1, Math.round(vFrame));
        const idx2 = Math.min(TOTAL_PART2 - 1, Math.round(localT * (BLEND_SPAN - 1)));

        const img1 = getCachedImg(part1Ref.current, idx1, TOTAL_PART1);
        const img2 = getCachedImg(part2Ref.current, idx2, TOTAL_PART2);

        if (!img1 && !img2) return;

        // Cinematic Forward Dolly Motion (peaks at +3.6% zoom at midpoint)
        const dollyScale = 1.0 + Math.sin(localT * Math.PI) * 0.036;

        const refImg = img1 || img2!;
        const imgW = refImg.naturalWidth || 1920;
        const imgH = refImg.naturalHeight || 1080;
        const baseScale = Math.max(cw / imgW, ch / imgH) * dollyScale;
        const dw = imgW * baseScale;
        const dh = imgH * baseScale;
        const dx = (cw - dw) / 2;
        const dy = (ch - dh) * 0.56;

        // 1. Draw base video layer (Video 1 naturally completing its flight)
        if (img1) {
          ctx.globalAlpha = 1.0;
          ctx.drawImage(img1, dx, dy, dw, dh);
        }

        // 2. Dissolve in new video layer (Video 2 launching into view)
        if (img2) {
          ctx.globalAlpha = blendWeight;
          ctx.drawImage(img2, dx, dy, dw, dh);
          ctx.globalAlpha = 1.0;
        }

        // 3. Dreamy cherry-blossom sunbeam light bloom at the apex of the transition
        const bloomIntensity = Math.sin(localT * Math.PI) * 0.22;
        if (bloomIntensity > 0.005) {
          const grad = ctx.createRadialGradient(
            cw * 0.5, ch * 0.44, cw * 0.06,
            cw * 0.5, ch * 0.44, Math.max(cw, ch) * 0.7
          );
          grad.addColorStop(0, `rgba(255, 253, 247, ${bloomIntensity * 0.95})`);
          grad.addColorStop(0.35, `rgba(254, 215, 226, ${bloomIntensity * 0.65})`);
          grad.addColorStop(0.7, `rgba(251, 182, 206, ${bloomIntensity * 0.25})`);
          grad.addColorStop(1, "rgba(255, 255, 255, 0)");
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, cw, ch);
        }
      }
    };

    // 120fps buttery-smooth momentum physics render loop
    const renderLoop = () => {
      // Damped Lerp factor for silky responsiveness without jitter
      const diff = targetProgressRef.current - currentProgressRef.current;
      currentProgressRef.current += diff * 0.12;

      const p = currentProgressRef.current;

      // -------------------------------------------------------------
      // STAGE 1: CARD EXPANSION (Progress 0.0 -> 0.16)
      // -------------------------------------------------------------
      let initW: number;
      let initH: number;
      if (vw < 640) {
        initW = Math.min(185, vw * 0.46);
        initH = Math.min(vh * 0.56, initW * (16 / 9));
      } else if (vw < 1024) {
        initW = Math.min(280, vw * 0.35);
        initH = Math.min(vh * 0.65, initW * (16 / 9));
      } else {
        initW = Math.min(340, Math.max(280, vw * 0.22));
        initH = Math.min(vh * 0.68, initW * (16 / 9));
      }

      const expandProgress = Math.min(Math.max((p - 0.01) / (0.16 - 0.01), 0), 1);
      const easeExpand = expandProgress * expandProgress * (3 - 2 * expandProgress);

      const curW = initW + (vw - initW) * easeExpand;
      const curH = initH + (vh - initH) * easeExpand;
      const curRadius = Math.max(0, 18 * (1 - easeExpand * 1.5));
      const curShadow = Math.max(0, 0.45 * (1 - easeExpand * 1.8));

      if (cardRef.current) {
        cardRef.current.style.width = `${curW}px`;
        cardRef.current.style.height = `${curH}px`;
        cardRef.current.style.borderRadius = `${curRadius}px`;
        cardRef.current.style.boxShadow =
          curShadow > 0.01
            ? `0 25px 70px -15px rgba(244, 114, 182, ${curShadow * 0.85}), 0 0 35px rgba(253, 230, 138, ${curShadow * 0.45})`
            : "none";
      }

      if (borderImgRef.current) {
        borderImgRef.current.style.opacity = `${Math.max(0, 1 - easeExpand * 2.2)}`;
      }

      if (vignetteRef.current) {
        vignetteRef.current.style.opacity = `${Math.max(0, 0.4 * (1 - easeExpand * 1.4))}`;
      }
      if (glowRef.current) {
        glowRef.current.style.opacity = `${Math.max(0, 1 - p * 4.5)}`;
      }

      // Smooth mouse lerp damping
      currentMouseX += (targetMouseX - currentMouseX) * 0.06;
      currentMouseY += (targetMouseY - currentMouseY) * 0.06;

      const now = performance.now() * 0.001; // Current timestamp in seconds

      // Render floating bioluminescent fireflies onto background particles canvas (strictly behind video)
      const pCanvas = particlesCanvasRef.current;
      if (pCanvas) {
        const scrollFade = Math.max(0, 1 - p * 8);
        if (scrollFade <= 0.01) {
          if (pCanvas.style.opacity !== "0") {
            pCanvas.style.opacity = "0";
            const pCtx = pCanvas.getContext("2d");
            if (pCtx) pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
          }
        } else {
          if (pCanvas.style.opacity !== "1") pCanvas.style.opacity = "1";
          const pCtx = pCanvas.getContext("2d");
          if (pCtx) {
            pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const cw = pCanvas.width / dpr;
            const ch = pCanvas.height / dpr;

            pCtx.save();
            pCtx.scale(dpr, dpr);

            const mousePx = (currentMouseX * 0.5 + 0.5) * cw;
            const mousePy = (currentMouseY * 0.5 + 0.5) * ch;

            firefliesRef.current.forEach((ff) => {
              ff.x += ff.vx + Math.sin(now * ff.pulseSpeed + ff.pulsePhase) * 0.45;
              ff.y += ff.vy + Math.cos(now * ff.pulseSpeed * 0.8 + ff.pulsePhase) * 0.45;

              if (ff.x < -20) ff.x = cw + 20;
              if (ff.x > cw + 20) ff.x = -20;
              if (ff.y < -20) ff.y = ch + 20;
              if (ff.y > ch + 20) ff.y = -20;

              const dx = ff.x - mousePx;
              const dy = ff.y - mousePy;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 150 && dist > 1) {
                const force = (150 - dist) / 150;
                ff.x += (dx / dist) * force * 3.5;
                ff.y += (dy / dist) * force * 3.5;
              }

              const pulse = 0.45 + 0.55 * Math.sin(now * ff.pulseSpeed * 2.2 + ff.pulsePhase);
              const currentAlpha = ff.alpha * pulse * scrollFade;

              pCtx.save();
              pCtx.globalAlpha = Math.max(0, Math.min(1, currentAlpha));
              pCtx.shadowBlur = ff.radius * 4;
              pCtx.shadowColor = ff.glowColor;
              pCtx.fillStyle = ff.color;
              pCtx.beginPath();
              pCtx.arc(ff.x, ff.y, ff.radius, 0, Math.PI * 2);
              pCtx.fill();
              pCtx.restore();
            });

            pCtx.restore();
          }
        }
      }

      // Exit animations and organic zero-gravity floating for Stage 1 initial badges
      textConfigs.forEach((cfg) => {
        if (!cfg.ref.current) return;
        const t = Math.min(Math.max((p - cfg.start) / (cfg.end - cfg.start), 0), 1);
        const easeT = t * t * (3 - 2 * t);
        const opacity = Math.max(0, 1 - easeT);

        // Organic levitation breathing dampens smoothly as card scroll-exit begins
        const floatDamp = Math.max(0, 1 - easeT * 1.5);
        const floatY = Math.sin(now * cfg.speed + cfg.phase) * cfg.ampY * floatDamp;
        const floatX = Math.cos(now * cfg.speed * 0.85 + cfg.phase) * cfg.ampX * floatDamp;
        const floatR = Math.sin(now * cfg.speed * 0.6 + cfg.phase) * cfg.ampRot * floatDamp;

        // Subtle interactive mouse parallax
        const plx = currentMouseX * cfg.parallaxX * floatDamp;
        const ply = currentMouseY * cfg.parallaxY * floatDamp;

        const x = cfg.dx * easeT + floatX + plx;
        const y = cfg.dy * easeT + floatY + ply;
        const rot = cfg.initRot + cfg.extraRot * easeT + floatR;
        const scale = 1 - 0.12 * easeT;

        cfg.ref.current.style.opacity = `${opacity}`;
        cfg.ref.current.style.transform = `translate3d(${x}px, ${y}px, 0px) rotate(${rot}deg) scale(${scale})`;
        cfg.ref.current.style.pointerEvents = opacity < 0.02 ? "none" : "auto";
      });

      // -------------------------------------------------------------
      // STAGE 2: 426-FRAME CONTINUOUS HARMONIC DUAL EXPEDITION (0.16 -> 0.95)
      // Silky smooth float interpolation and zero-cut connection!
      // -------------------------------------------------------------
      let targetFrame = 0;
      if (p > 0.16) {
        const scrubProgress = Math.min(Math.max((p - 0.16) / (0.95 - 0.16), 0), 1);
        targetFrame = scrubProgress * (TOTAL_COMBINED - 1);
      }

      // Continuous float interpolation prevents single-frame jumps
      const frameDiff = targetFrame - currentFrameRef.current;
      currentFrameRef.current += frameDiff * 0.20;
      const displayFrameFloat = Math.min(
        TOTAL_COMBINED - 1,
        Math.max(0, currentFrameRef.current)
      );

      // Sub-millisecond GPU draw with seamless bridge
      renderFrame(displayFrameFloat);

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      suppressHydrationWarning
      className="relative w-full h-[750vh] bg-black text-white select-none overflow-visible"
    >
      {/* Pinned 100vh viewport container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-black">
        {/* Dynamic Multilayered Living Aurora behind Card */}
        <div
          ref={glowRef}
          className="absolute w-[520px] sm:w-[860px] h-[520px] sm:h-[860px] rounded-full blur-[140px] pointer-events-none transition-opacity will-change-opacity animate-[pulse_5s_ease-in-out_infinite]"
          style={{
            background:
              "radial-gradient(circle, rgba(244, 114, 182, 0.35) 0%, rgba(168, 85, 247, 0.22) 42%, rgba(52, 211, 153, 0.14) 72%, transparent 88%)",
          }}
        />

        {/* Ambient Bioluminescent Fireflies Canvas strictly BEHIND the video card (z-0) */}
        <canvas
          ref={particlesCanvasRef}
          className="absolute inset-0 pointer-events-none z-0 w-full h-full transition-opacity duration-300"
        />

        {/* ============================================================ */}
        {/* STAGE 1: ALL 35 BLOOM MINI POLAROID PHOTOS (From bloms/)     */}
        {/* ============================================================ */}
        {BLOOM_ITEMS.map((item, idx) => (
          <div
            key={item.file}
            ref={(el) => {
              photoRefs.current[idx] = el;
            }}
            style={{ transform: `rotate(${item.rot}deg)` }}
            className={`${item.className} z-20 pointer-events-auto will-change-transform`}
            onClick={() => openLightbox(idx)}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <div
              className={`bg-white/95 p-0.5 pb-1 sm:p-1.5 sm:pb-3 rounded-[3px] shadow-[0_8px_25px_rgba(0,0,0,0.7)] sm:shadow-[0_12px_35px_rgba(0,0,0,0.75)] transition-all duration-300 cursor-pointer group ${
                hoveredIdx !== null && hoveredIdx !== idx
                  ? "opacity-35 scale-[0.94] blur-[0.6px]"
                  : "opacity-100 hover:scale-125 hover:rotate-0 hover:z-40 hover:shadow-[0_20px_60px_rgba(244,114,182,0.9)] hover:ring-2 hover:ring-pink-300/80"
              }`}
            >
              <div className="w-[42px] h-[54px] xs:w-[48px] xs:h-[62px] sm:w-20 sm:h-26 md:w-24 md:h-32 overflow-hidden rounded-[2px] bg-zinc-900">
                <img
                  src={`/discovery/bloms/${encodeURIComponent(item.file)}`}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
              </div>
              <div className="mt-0.5 sm:mt-1 text-center font-mono text-[5px] xs:text-[6px] sm:text-[7.5px] md:text-[8px] text-zinc-700 tracking-wider font-bold uppercase truncate max-w-[42px] xs:max-w-[48px] sm:max-w-[80px] md:max-w-[96px]">
                {item.title}
              </div>
            </div>
          </div>
        ))}

        {/* ============================================================ */}
        {/* CENTER SCROLL-DRIVEN SCALING CONTAINER (Canvas inside Card)  */}
        {/* 100% Native Crisp High-Definition Render — Zero 3D Blur      */}
        {/* ============================================================ */}
        <div
          ref={cardRef}
          style={{
            boxShadow:
              "0 25px 70px -15px rgba(244, 114, 182, 0.4), 0 0 35px rgba(253, 230, 138, 0.25)",
          }}
          className="relative z-10 overflow-hidden shrink-0 flex items-center justify-center will-change-[width,height,border-radius,box-shadow] bg-black"
        >
          {/* HTML5 Ultra-High-Speed 120fps GPU Canvas scrubbing Video 1 -> Video 2 */}
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover select-none pointer-events-none will-change-transform"
          />

          {/* Authentic Floral Botanical Frame Overlay (border.png) */}
          <img
            ref={borderImgRef}
            src="/border.png"
            alt="Floria Floral Border"
            className="absolute inset-0 w-full h-full object-fill pointer-events-none z-20 select-none transition-opacity duration-200"
          />

          {/* Faint subtle vignette overlay that softly dissolves */}
          <div
            ref={vignetteRef}
            className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-black/30 transition-opacity"
          />
        </div>
      </div>

      {/* ============================================================ */}
      {/* LIGHTBOX GALLERY OVERLAY                                     */}
      {/* ============================================================ */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.92)" }}
        >
          {/* Backdrop click to close */}
          <div className="absolute inset-0" onClick={closeLightbox} />

          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-200 cursor-pointer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Navigation arrows */}
          {lightboxIndex > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); goToImage(lightboxIndex - 1); }}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/25 transition-all duration-200 cursor-pointer"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}
          {lightboxIndex < BLOOM_ITEMS.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goToImage(lightboxIndex + 1); }}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/25 transition-all duration-200 cursor-pointer"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}

          {/* Main large image */}
          <div
            className="relative z-[1] flex items-center justify-center w-full px-16 sm:px-24"
            style={{ height: "calc(100vh - 160px)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white p-2 sm:p-3 md:p-4 rounded-md shadow-[0_30px_100px_rgba(0,0,0,0.8)] animate-[scaleIn_0.25s_ease-out]">
              <img
                src={`/discovery/bloms/${encodeURIComponent(BLOOM_ITEMS[lightboxIndex].file)}`}
                alt={BLOOM_ITEMS[lightboxIndex].title}
                className="max-h-[60vh] sm:max-h-[65vh] md:max-h-[70vh] max-w-[80vw] sm:max-w-[70vw] md:max-w-[60vw] object-contain rounded-sm"
              />
              <div className="mt-2 sm:mt-3 text-center font-mono text-[10px] sm:text-xs md:text-sm text-zinc-600 tracking-[0.2em] font-bold uppercase">
                {BLOOM_ITEMS[lightboxIndex].title}
              </div>
            </div>
          </div>

          {/* Thumbnail strip */}
          <div
            className="relative z-[1] w-full px-4 sm:px-8 pb-4 sm:pb-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              ref={galleryScrollRef}
              className="flex gap-2 sm:gap-3 overflow-x-auto py-2 px-2 scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {BLOOM_ITEMS.map((item, idx) => (
                <button
                  key={`thumb-${item.file}`}
                  onClick={() => goToImage(idx)}
                  className={`shrink-0 rounded-sm overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                    idx === lightboxIndex
                      ? "border-white/90 shadow-[0_0_15px_rgba(255,255,255,0.3)] scale-110"
                      : "border-white/20 opacity-50 hover:opacity-80 hover:border-white/40"
                  }`}
                >
                  <img
                    src={`/discovery/bloms/${encodeURIComponent(item.file)}`}
                    alt={item.title}
                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-cover"
                  />
                </button>
              ))}
            </div>
            {/* Image counter */}
            <div className="text-center mt-2 font-mono text-[10px] sm:text-xs text-white/50 tracking-widest">
              {lightboxIndex + 1} / {BLOOM_ITEMS.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
