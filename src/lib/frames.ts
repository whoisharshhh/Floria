/**
 * Scroll-driven frame-sequence helpers.
 * The cinematic story is rendered from pre-extracted JPEG frames
 * served from `public/frames-part1` and `public/ezgif-...-jpg`.
 */
import type { FrameSequenceConfig } from "@/types/floria";

export const FRAME_SEQUENCE: FrameSequenceConfig = {
  totalPart1: 232,
  totalPart2: 232,
  blendSpan: 38,
  totalCombined: 232 + 232 - 38, // 426 virtual frames
  transitionStart: 232 - 38, // 194
  transitionEnd: 232,
};

const pad3 = (n: number): string => String(n).padStart(3, "0");

/**
 * Resolve the public URL of a virtual frame index (1-based).
 * Handles the Part 1 → Part 2 cinematic blend window.
 */
export function getFrameSrc(virtualIndex: number): string {
  const { totalPart1, transitionStart, transitionEnd } = FRAME_SEQUENCE;
  const i = Math.max(1, Math.min(FRAME_SEQUENCE.totalCombined, Math.round(virtualIndex)));

  if (i <= transitionStart) return `/frames-part1/frame-${pad3(i)}.jpg`;
  if (i <= transitionEnd) return `/frames-part1/frame-${pad3(i)}.jpg`;
  const part2Index = i - totalPart1 + FRAME_SEQUENCE.blendSpan;
  return `/ezgif-7b873439e6df41fa-jpg/ezgif-frame-${pad3(part2Index)}.jpg`;
}
