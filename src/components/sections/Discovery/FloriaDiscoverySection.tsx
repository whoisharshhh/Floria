"use client";

import React, { useState, useRef, useEffect } from "react";

interface Specimen {
  id: string;
  catalogNumber: string;
  name: string;
  scientificName: string;
  category: string;
  sector: string;
  coordinates: string;
  elevation: string;
  vitality: string;
  frequency: string;
  description: string;
  fieldNotes: string;
  image: string;
  aspectRatio: string;
  colSpan: string;
  offsetY: string;
  accentColor: string;
  glowColor: string;
}

const SPECIMENS: Specimen[] = [
  {
    id: "specimen-01",
    catalogNumber: "ARC-01 // BIO-SPECTRAL",
    name: "Aethelgard",
    scientificName: "Cervus Astraea L.",
    category: "BIO-SPECTRAL FAUNA",
    sector: "SECTOR 09 // GROVE OF GLASS",
    coordinates: "44° 18' 22\" N • 09° 42' 15\" E",
    elevation: "+1,420M CANOPY",
    vitality: "99.4% OPTICAL RESONANCE",
    frequency: "540 THz (AQUAMARINE)",
    description:
      "A solitary entity moving soundlessly through shadow and starlight. Its crystalline antlers refract ambient photons into living auroras that awaken dormant flora.",
    fieldNotes:
      "First encountered during the dusk transition. Does not disturb moss or undergrowth when walking. Emits a delicate harmonic vibration capable of calming subterranean fauna.",
    image: "/discovery/specimen_01.jpg",
    aspectRatio: "aspect-[4/5]",
    colSpan: "lg:col-span-5",
    offsetY: "lg:translate-y-0",
    accentColor: "text-emerald-400",
    glowColor: "rgba(52, 211, 153, 0.25)",
  },
  {
    id: "specimen-02",
    catalogNumber: "ARC-02 // SENTIENT BOTANICAL",
    name: "Sylvan Core of Ostra",
    scientificName: "Lotus Radix Bio-Neuralis",
    category: "MYCELIAL FLORA",
    sector: "SECTOR 04 // OSTRA MYCELIUM",
    coordinates: "42° 03' 51\" N • 11° 14' 08\" E",
    elevation: "-180M BASIN",
    vitality: "96.8% MYCELIAL FLUX",
    frequency: "420 THz (CHLORO-GOLD)",
    description:
      "A sentient botanical organ anchoring the deep forest floor. Pulses with gold and emerald bioluminescence, transmitting neural impulses across entire continents of roots.",
    fieldNotes:
      "The petals are composed of glass-like translucent chitin with conductive vascular capillaries. Inhaling its spores induces vivid synchronized visions of planetary history.",
    image: "/discovery/specimen_02.jpg",
    aspectRatio: "aspect-[4/5]",
    colSpan: "lg:col-span-7",
    offsetY: "lg:translate-y-12",
    accentColor: "text-amber-300",
    glowColor: "rgba(252, 211, 77, 0.25)",
  },
  {
    id: "specimen-03",
    catalogNumber: "ARC-03 // ATMOSPHERIC DRIFTER",
    name: "Aerial Drifters of Zephyr",
    scientificName: "Aero-Medusa Nocturna",
    category: "ATMOSPHERIC PHENOMENA",
    sector: "SECTOR 12 // ZEPHYR CANYON",
    coordinates: "45° 52' 09\" N • 08° 19' 33\" E",
    elevation: "+3,200M HIGHLANDS",
    vitality: "100% ATMOSPHERIC SYNC",
    frequency: "610 THz (CYAN / VIOLET)",
    description:
      "Bioluminescent sky-strata organisms that drift above abyssal gorges. Known to guide lost field expeditions through dense twilight storms toward geothermal springs.",
    fieldNotes:
      "Buoyancy is sustained through lighter-than-air bio-methane sacs that glow in rhythm with planetary magnetic pulses. Tendrils detect microscopic moisture changes hours in advance.",
    image: "/discovery/specimen_03.jpg",
    aspectRatio: "aspect-[4/5]",
    colSpan: "lg:col-span-6",
    offsetY: "lg:translate-y-0",
    accentColor: "text-cyan-300",
    glowColor: "rgba(103, 232, 249, 0.25)",
  },
  {
    id: "specimen-04",
    catalogNumber: "ARC-04 // LITHIC GUARDIAN",
    name: "Valley of Blossom & Stone",
    scientificName: "Litho-Floris Primordialis",
    category: "LIVING HABITAT",
    sector: "SECTOR 01 // VALLEY OF THE DAWN",
    coordinates: "43° 11' 02\" N • 14° 08' 45\" E",
    elevation: "+890M VALE",
    vitality: "94.2% GEOTHERMAL HARMONY",
    frequency: "380 THz (ROSE QUARTZ)",
    description:
      "A monumental sanctuary where blooming crystal flora symbiotically fuses with ancient basalt spires, creating micro-climates of eternal spring.",
    fieldNotes:
      "Petals woven with fiber-optic yarn density. Rock strata continuously absorb planetary heat, releasing a soothing thermal mist that blankets the lower basin each twilight.",
    image: "/discovery/specimen_04.jpg",
    aspectRatio: "aspect-[16/9]",
    colSpan: "lg:col-span-6",
    offsetY: "lg:translate-y-8",
    accentColor: "text-rose-300",
    glowColor: "rgba(244, 114, 182, 0.25)",
  },
  {
    id: "specimen-05",
    catalogNumber: "ARC-05 // VEIL CANOPY",
    name: "The Whispering Canopy",
    scientificName: "Sylva Aeterna Altissima",
    category: "PRIMEVAL HABITAT",
    sector: "SECTOR 07 // CELESTIAL VEIL",
    coordinates: "46° 30' 14\" N • 10° 22' 50\" E",
    elevation: "+2,100M MIST LAYER",
    vitality: "98.1% PHOTO-SYNTHESIS",
    frequency: "505 THz (EMERALD SPRAY)",
    description:
      "A cloud-level canopy where perpetual twilight mist nurtures hanging moss that captures, filters, and purifies cosmic radiation into liquid luminescence.",
    fieldNotes:
      "Sound waves travel three times further inside this canopy due to unique atmospheric ionization. Explorers report auditory hallucinations of ancient celestial choruses.",
    image: "/discovery/specimen_05.jpg",
    aspectRatio: "aspect-[16/9]",
    colSpan: "lg:col-span-7",
    offsetY: "lg:translate-y-0",
    accentColor: "text-teal-300",
    glowColor: "rgba(45, 212, 191, 0.25)",
  },
  {
    id: "specimen-06",
    catalogNumber: "ARC-06 // ABYSSAL SANCTUM",
    name: "Obsidian Deep Grotto",
    scientificName: "Abyssus Phosphorea",
    category: "SUBTERRANEAN CAVERN",
    sector: "SECTOR 15 // OBSIDIAN CRAGS",
    coordinates: "41° 44' 30\" N • 13° 35' 18\" E",
    elevation: "-940M SUB-CRUST",
    vitality: "97.5% THERMAL STABILITY",
    frequency: "480 THz (INDIGO FLUX)",
    description:
      "Subterranean lakes illuminated by mineral phosphorescence. Echoes with low-frequency acoustic vibrations that resonate through the planet's mantle.",
    fieldNotes:
      "Water within the grotto exhibits anomalous surface tension and holds memory of magnetic events. Inscriptions found along the basalt walls indicate centuries of sentinel reverence.",
    image: "/discovery/specimen_06.jpg",
    aspectRatio: "aspect-[16/9]",
    colSpan: "lg:col-span-5",
    offsetY: "lg:translate-y-14",
    accentColor: "text-purple-300",
    glowColor: "rgba(192, 132, 252, 0.25)",
  },
];

export default function FloriaDiscoverySection() {
  const [selectedSpecimen, setSelectedSpecimen] = useState<Specimen | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  // Parallax tracking
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            setScrollY(rect.top);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);

  const handleTitleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };



  return (
    <section
      ref={sectionRef}
      id="discovery"
      className="relative w-full bg-black text-white py-16 sm:py-28 md:py-44 px-4 sm:px-10 md:px-16 lg:px-24 overflow-hidden select-none font-sans"
    >
      {/* ============================================================ */}
      {/* 1. BACKGROUND SCIENTIFIC GRID & FLOATING WATERMARKS */}
      {/* ============================================================ */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle Archival Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Ambient atmospheric radial glows */}
        <div className="absolute top-[15%] left-[5%] w-[600px] h-[600px] rounded-full bg-emerald-950/20 blur-[140px] pointer-events-none" />
        <div className="absolute top-[50%] right-[5%] w-[700px] h-[700px] rounded-full bg-purple-950/20 blur-[160px] pointer-events-none" />
        <div className="absolute bottom-[10%] left-[20%] w-[800px] h-[800px] rounded-full bg-cyan-950/15 blur-[180px] pointer-events-none" />

        <div
          style={{ transform: `translateY(${scrollY * -0.06}px)` }}
          className="absolute top-[38%] -right-20 font-display text-[15vw] font-black uppercase text-white/[0.018] tracking-tight leading-none whitespace-nowrap will-change-transform"
        >
          BIOLUMINESCENCE
        </div>
        <div
          style={{ transform: `translateY(${scrollY * 0.05}px)` }}
          className="absolute bottom-20 -left-10 font-display text-[14vw] font-black uppercase text-white/[0.02] tracking-tighter leading-none whitespace-nowrap will-change-transform"
        >
          CHRONICLES
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. SECTION HEADER (HERO ARCHIVE INTRO) */}
      {/* ============================================================ */}
      <div className="relative z-10 max-w-7xl mx-auto mb-20 sm:mb-28 md:mb-36">

        {/* Large Grand Typography: DISCOVER FLORIA with Living Image Animation */}
        <div
          className="relative inline-block w-full group cursor-pointer"
          onMouseMove={handleTitleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setMousePos({ x: 0.5, y: 0.5 });
          }}
        >
          {/* Dynamic Ambient Aura that pulses behind the title */}
          <div
            ref={glowRef}
            className="absolute -inset-10 -z-10 rounded-3xl blur-[90px] transition-all duration-700 pointer-events-none opacity-60 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(52, 211, 153, 0.35) 0%, rgba(168, 85, 247, 0.25) 40%, rgba(6, 182, 212, 0.15) 70%, transparent 85%)`,
            }}
          />

          <h2
            ref={headingRef}
            className="font-display font-black text-transparent bg-clip-text text-[10.5vw] sm:text-[8.5vw] md:text-[76px] lg:text-[102px] xl:text-[118px] tracking-[-0.035em] leading-[0.88] uppercase select-none transition-transform duration-300 ease-out will-change-transform"
            style={{
              backgroundImage: "url('/frames-part1/frame-080.jpg')",
              backgroundSize: "cover",
              backgroundRepeat: "repeat",
              backgroundPosition: `${50 + (mousePos.x - 0.5) * 10}% ${50 + (mousePos.y - 0.5) * 10}%`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              WebkitTextStroke: "1px rgba(255, 255, 255, 0.4)",
              filter: isHovered
                ? "drop-shadow(0 0 45px rgba(52, 211, 153, 0.6)) drop-shadow(0 0 90px rgba(168, 85, 247, 0.4))"
                : "drop-shadow(0 4px 30px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 35px rgba(52, 211, 153, 0.3))",
              transform: isHovered
                ? `perspective(1000px) rotateX(${(mousePos.y - 0.5) * -6}deg) rotateY(${(mousePos.x - 0.5) * 8}deg) scale(1.01)`
                : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
            }}
          >
            DISCOVER <br className="hidden sm:inline" />
            FLORIA
          </h2>

          {/* Micro crosshair corner markers for field journal feel */}
          <span className="absolute -top-4 -left-4 text-emerald-500/60 font-mono text-xs select-none">
            ┌
          </span>
          <span className="absolute -top-4 right-0 text-emerald-500/60 font-mono text-xs select-none">
            ┐
          </span>
        </div>

        {/* Editorial Field Note Subtitle & Intro */}
        {/* Editorial Field Note Subtitle & Intro */}
        <div className="mt-8 sm:mt-12 border-t border-white/15 pt-8 sm:pt-10 max-w-4xl">
          <div className="space-y-4">
            {/* Field Journal Kicker */}
            <div className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.28em] text-zinc-400 uppercase font-semibold">
              <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              <span>EXPEDITION ARCHIVE // FIELD DOSSIER 01</span>
            </div>

            {/* Thick, Bold, High-Impact Editorial Statement with Vibrant Floria Colors */}
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl md:text-[34px] lg:text-[38px] leading-[1.22] tracking-[-0.03em] uppercase text-white drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
              An interactive digital archive chronicling{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-400 drop-shadow-[0_0_20px_rgba(52,211,153,0.6)]">
                living anomalies
              </span>
              ,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-orange-300 drop-shadow-[0_0_20px_rgba(252,211,77,0.6)]">
                sacred sanctuaries
              </span>
              , and{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-purple-400 drop-shadow-[0_0_20px_rgba(103,232,249,0.6)]">
                ethereal sentience
              </span>
              .
            </h3>

            {/* Refined Supporting Body Text with Harmonious Accents */}
            <p className="text-base sm:text-lg md:text-xl text-zinc-300 font-sans font-semibold leading-relaxed max-w-2xl">
              Every specimen embodies{" "}
              <span className="text-purple-300 drop-shadow-[0_0_12px_rgba(216,180,254,0.4)]">ancient starlight</span>,{" "}
              <span className="text-emerald-300 drop-shadow-[0_0_12px_rgba(110,231,183,0.4)]">botanical consciousness</span>, and{" "}
              <span className="text-rose-300 drop-shadow-[0_0_12px_rgba(253,164,175,0.4)]">uncharted beauty</span>.
            </p>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. RESPONSIVE AESTHETIC PHOTO WALL — TILTED POLAROID FRAMES   */}
      {/* ============================================================ */}

      {/* MOBILE PHOTO WALL (< md) — TIGHTLY TAPED CONNECTED CASCADE */}
      <div className="block md:hidden relative z-10 max-w-sm sm:max-w-md mx-auto mb-16 px-2">
        <div className="flex flex-col items-center">
          {SPECIMENS.map((specimen, idx) => (
            <MobilePhotoCard
              key={specimen.id}
              specimen={specimen}
              index={idx}
              onOpenDossier={() => setSelectedSpecimen(specimen)}
            />
          ))}
        </div>
      </div>

      {/* DESKTOP SCATTERED COLLAGE (>= md) */}
      <div className="hidden md:block relative z-10 max-w-[1400px] mx-auto min-h-[1400px] md:min-h-[1800px]">
        {SPECIMENS.map((specimen, idx) => (
          <ScatteredPhotoFrame
            key={specimen.id}
            specimen={specimen}
            index={idx}
            onOpenDossier={() => setSelectedSpecimen(specimen)}
          />
        ))}
      </div>



      {/* ============================================================ */}
      {/* 5. SPECIMEN INTERACTIVE DOSSIER MODAL */}
      {/* ============================================================ */}
      {selectedSpecimen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 md:p-10 animate-fade-in">
          <div className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 p-4 sm:p-8 md:p-10 shadow-2xl max-h-[90dvh] sm:max-h-[92vh] overflow-y-auto">
            {/* Close Button with safe mobile placement */}
            <button
              onClick={() => setSelectedSpecimen(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-zinc-300 hover:text-white font-mono text-[10px] sm:text-xs tracking-[0.14em] sm:tracking-[0.2em] uppercase px-3 py-2 sm:px-4 sm:py-2.5 min-h-[44px] flex items-center justify-center border border-zinc-700 hover:border-white transition-colors cursor-pointer rounded-sm bg-zinc-900/90 z-20"
            >
              ✕ CLOSE
            </button>

            {/* Modal Top Metadata */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-[9px] sm:text-[10px] tracking-[0.18em] sm:tracking-[0.25em] text-zinc-400 uppercase mb-3 sm:mb-4 pr-24 sm:pr-0">
              <span className={selectedSpecimen.accentColor}>
                {selectedSpecimen.catalogNumber}
              </span>
              <span>{'//'}</span>
              <span>{selectedSpecimen.sector}</span>
              <span className="hidden xs:inline">{'//'}</span>
              <span className="hidden xs:inline">COORD: {selectedSpecimen.coordinates}</span>
            </div>

            <h3 className="font-display font-bold text-xl sm:text-3xl md:text-4xl text-white uppercase tracking-tight mb-1 sm:mb-2">
              {selectedSpecimen.name}
            </h3>
            <div className="font-mono text-xs sm:text-sm text-zinc-400 italic mb-4 sm:mb-6">
              {selectedSpecimen.scientificName}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 items-start mb-6 sm:mb-8">
              {/* Image Preview with framing */}
              <div className="md:col-span-6 relative border border-white/20 overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={selectedSpecimen.image}
                  alt={selectedSpecimen.name}
                  className="w-full h-auto max-h-[260px] sm:max-h-[380px] md:max-h-[520px] object-contain"
                />
                <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/70 backdrop-blur-md font-mono text-[9px] text-zinc-300">
                  {selectedSpecimen.elevation}
                </div>
              </div>

              {/* Field Notes & Sensor Telemetry */}
              <div className="md:col-span-6 space-y-3 sm:space-y-4">
                <div className="border-b border-zinc-900 pb-3">
                  <div className="text-[9px] sm:text-[10px] font-mono tracking-[0.2em] text-zinc-500 uppercase mb-1">
                    PRIMARY RECORD
                  </div>
                  <p className="text-sm sm:text-sm text-zinc-300 leading-relaxed font-light">
                    {selectedSpecimen.description}
                  </p>
                </div>

                <div className="border-b border-zinc-900 pb-3">
                  <div className="text-[9px] sm:text-[10px] font-mono tracking-[0.2em] text-zinc-500 uppercase mb-1">
                    EXPEDITION FIELD OBSERVATION
                  </div>
                  <p className="text-sm sm:text-sm text-zinc-400 leading-relaxed font-light italic">
                    &ldquo;{selectedSpecimen.fieldNotes}&rdquo;
                  </p>
                </div>

                {/* Telemetry Grid */}
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3 pt-1 sm:pt-2 font-mono text-[10px]">
                  <div className="border border-zinc-900 bg-black/40 p-2 sm:p-2.5">
                    <span className="text-zinc-500 block mb-0.5 sm:mb-1">VITALITY INDEX</span>
                    <span className="text-emerald-300 font-semibold text-[11px] sm:text-xs">
                      {selectedSpecimen.vitality}
                    </span>
                  </div>
                  <div className="border border-zinc-900 bg-black/40 p-2 sm:p-2.5">
                    <span className="text-zinc-500 block mb-0.5 sm:mb-1">SPECTRAL EMISSION</span>
                    <span className="text-cyan-300 font-semibold text-[11px] sm:text-xs">
                      {selectedSpecimen.frequency}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 border-t border-zinc-900 pt-4 sm:pt-6">
              <span className="font-mono text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-widest text-center sm:text-left">
                VERIFIED ARCHIVAL ENTRY • FLORIA SYSTEM 01
              </span>
              <button
                onClick={() => setSelectedSpecimen(null)}
                className="w-full sm:w-auto px-6 py-3 min-h-[44px] flex items-center justify-center bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold hover:bg-zinc-200 transition-colors cursor-pointer rounded-sm"
              >
                Return to Dossier
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}

// 6 hand-crafted positions: {top, left, width, rotate} for each photo frame - 2-column mood board on both mobile and desktop
const FRAME_LAYOUTS = [
  { top: "0%",   left: "2%",  width: "45%", rotate: "-3.5deg", zIndex: 2 },
  { top: "3%",   left: "52%", width: "46%", rotate: "3deg",    zIndex: 3 },
  { top: "34%",  left: "3%",  width: "45%", rotate: "4deg",    zIndex: 4 },
  { top: "37%",  left: "51%", width: "46%", rotate: "-3deg",   zIndex: 1 },
  { top: "68%",  left: "2%",  width: "46%", rotate: "-2.5deg", zIndex: 5 },
  { top: "71%",  left: "52%", width: "45%", rotate: "3.5deg",  zIndex: 6 },
];

// Accent colors per frame for the tape / label
const FRAME_ACCENTS = [
  { tape: "bg-emerald-400/80", label: "text-emerald-300" },
  { tape: "bg-amber-300/80",   label: "text-amber-200" },
  { tape: "bg-cyan-400/80",    label: "text-cyan-300" },
  { tape: "bg-rose-400/80",    label: "text-rose-300" },
  { tape: "bg-teal-400/80",    label: "text-teal-300" },
  { tape: "bg-purple-400/80",  label: "text-purple-300" },
];

function ScatteredPhotoFrame({
  specimen,
  index,
  onOpenDossier,
}: {
  specimen: Specimen;
  index: number;
  onOpenDossier: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const layout = FRAME_LAYOUTS[index] || FRAME_LAYOUTS[0];
  const accent = FRAME_ACCENTS[index] || FRAME_ACCENTS[0];

  return (
    <div
      className="absolute transition-all duration-700 ease-out"
      style={{
        top: layout.top,
        left: layout.left,
        width: layout.width,
        zIndex: hovered ? 50 : layout.zIndex,
        transform: hovered
          ? "rotate(0deg) scale(1.04) translateY(-6px)"
          : `rotate(${layout.rotate})`,
        filter: hovered
          ? "drop-shadow(0 20px 40px rgba(0,0,0,0.8))"
          : "drop-shadow(0 6px 20px rgba(0,0,0,0.5))",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onOpenDossier}
    >
      {/* The Polaroid / Photo Frame */}
      <div className="relative bg-zinc-100 p-2 sm:p-3.5 md:p-4 pb-9 sm:pb-14 md:pb-16 cursor-pointer group shadow-xl">

        {/* Tape strip on top — like washi tape pinning it to the wall */}
        <div
          className={`absolute -top-2 sm:-top-2.5 left-1/2 -translate-x-1/2 w-12 sm:w-16 md:w-20 h-3 sm:h-4 md:h-5 ${accent.tape} opacity-90 -rotate-1 z-10`}
          style={{ clipPath: "polygon(4% 0%, 96% 0%, 100% 100%, 0% 100%)" }}
        />

        {/* Photo inside */}
        <div className="relative w-full aspect-[4/5] overflow-hidden bg-black">
          <img
            src={specimen.image}
            alt={specimen.name}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
          />
          {/* Subtle vintage overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 via-transparent to-black/20 pointer-events-none mix-blend-multiply" />
        </div>

        {/* Handwritten-style caption at the bottom of the polaroid */}
        <div className="absolute bottom-1.5 sm:bottom-2.5 md:bottom-3 left-2 sm:left-3 md:left-4 right-2 sm:right-3 md:right-4">
          <h3 className="font-display font-bold text-[11px] sm:text-sm md:text-lg text-zinc-800 uppercase tracking-tight leading-tight truncate">
            {specimen.name}
          </h3>
          <div className="font-mono text-[7px] sm:text-[8px] md:text-[9px] text-zinc-500 italic mt-0.5 truncate">
            {specimen.scientificName}
          </div>
        </div>

        {/* Tiny corner pin dot */}
        <div className="absolute top-1.5 right-1.5 w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-zinc-400/60" />
      </div>

      {/* Floating label underneath the frame — dark label on hover */}
      <div
        className={`mt-2 sm:mt-3 text-center transition-all duration-500 ${
          hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        <span className={`font-mono text-[8px] sm:text-[9px] tracking-[0.25em] uppercase ${accent.label}`}>
          {specimen.sector}
        </span>
      </div>
    </div>
  );
}

function MobilePhotoCard({
  specimen,
  index,
  onOpenDossier,
}: {
  specimen: Specimen;
  index: number;
  onOpenDossier: () => void;
}) {
  const accent = FRAME_ACCENTS[index % FRAME_ACCENTS.length];
  // Subtle alternating organic tilts
  const rotations = [
    "-rotate-[1.5deg]",
    "rotate-[1.5deg]",
    "-rotate-[1deg]",
    "rotate-[2deg]",
    "-rotate-[1.5deg]",
    "rotate-[1deg]",
  ];
  const rotAngle = rotations[index % rotations.length];

  return (
    <div
      onClick={onOpenDossier}
      style={{ zIndex: index + 1 }}
      className={`relative w-full cursor-pointer group ${rotAngle} hover:rotate-0 transition-transform duration-300 active:scale-[0.98] ${
        index > 0 ? "-mt-2 sm:-mt-2.5" : ""
      }`}
    >
      {/* Tape strip on top — connects this photo to the bottom of the card above */}
      <div
        className={`absolute -top-3 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-5 ${accent.tape} opacity-95 -rotate-1 z-30 shadow-[0_2px_8px_rgba(0,0,0,0.35)]`}
        style={{ clipPath: "polygon(3% 0%, 97% 0%, 100% 100%, 0% 100%)" }}
      />

      {/* Polaroid Container */}
      <div className="relative bg-zinc-100 p-3 pb-12 sm:pb-13 shadow-[0_14px_36px_rgba(0,0,0,0.7)] rounded-[2px] border border-zinc-200/80">
        {/* Photo */}
        <div className="relative w-full aspect-[4/5] overflow-hidden bg-black rounded-[1px]">
          <img
            src={specimen.image}
            alt={specimen.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 via-transparent to-black/20 pointer-events-none mix-blend-multiply" />

          {/* Sector Badge placed cleanly in top-right of image as archival tag */}
          <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/75 backdrop-blur-md rounded-[2px] border border-white/15">
            <span className={`font-mono text-[7.5px] sm:text-[8.5px] tracking-[0.16em] uppercase ${accent.label} font-semibold`}>
              {specimen.sector}
            </span>
          </div>
        </div>

        {/* Captions at bottom of polaroid */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="font-display font-bold text-xs sm:text-sm text-zinc-900 uppercase tracking-tight leading-tight">
              {specimen.name}
            </h3>
            <div className="font-mono text-[8px] sm:text-[9px] text-zinc-500 italic mt-0.5 truncate">
              {specimen.scientificName}
            </div>
          </div>
          <span className="shrink-0 font-mono text-[8px] sm:text-[9px] text-pink-600 font-bold uppercase tracking-wider pl-1">
            DOSSIER ↗
          </span>
        </div>

        {/* Corner Pin */}
        <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-zinc-400/60" />
      </div>
    </div>
  );
}

