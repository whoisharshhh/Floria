"use client";

import { useEffect, useState } from "react";

/**
 * Reactive mobile / touch-device flag.
 * Matches the heuristic used by the Hero spotlight experience.
 */
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = (): void => {
      setIsMobile(
        window.innerWidth < breakpoint ||
          ("ontouchstart" in window && window.innerWidth < 1024),
      );
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}
