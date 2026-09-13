"use client";

import { useEffect } from "react";

/**
 * Lock document scroll while `locked` is true.
 * Used by fullscreen overlays such as the preloader / lightbox.
 */
export function useLockedScroll(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const preventScroll = (e: TouchEvent): void => e.preventDefault();
    window.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
      window.removeEventListener("touchmove", preventScroll);
    };
  }, [locked]);
}
