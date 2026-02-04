"use client";

import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

/**
 * Detects if the current device is mobile based on:
 * 1. Window width (< 768px)
 * 2. User agent string for mobile devices
 *
 * Returns true for mobile devices, false for desktop/tablet
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // Check screen width
      const isMobileWidth = window.innerWidth < MOBILE_BREAKPOINT;

      // Check user agent for mobile devices
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

      setIsMobile(isMobileWidth || isMobileUA);
    };

    // Initial check
    checkMobile();

    // Listen for resize events (debounced via RAF)
    let rafId: number;
    const handleResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(checkMobile);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return isMobile;
}
