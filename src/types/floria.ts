/**
 * Shared domain types for the Floria experience.
 * Keep component-local UI state inside components;
 * only cross-cutting domain models belong here.
 */

/** A catalogued specimen in the Discovery archive. */
export interface Specimen {
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

/** A floating bloom photo in the Storytelling finale. */
export interface BloomItem {
  file: string;
  title: string;
  className: string;
  rot: number;
  dx: number;
  dy: number;
  speed: number;
  phase: number;
}

/** Scroll-driven frame-sequence configuration. */
export interface FrameSequenceConfig {
  totalPart1: number;
  totalPart2: number;
  blendSpan: number;
  totalCombined: number;
  transitionStart: number;
  transitionEnd: number;
}
