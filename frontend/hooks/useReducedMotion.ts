import { useEffect, useState } from "react";

export function useReducedMotion() {
  const [shouldReduce, setShouldReduce] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Check if mobile
    const isMobile = window.innerWidth < 768;

    // Check if low-end device via hardware concurrency
    const isLowEnd = navigator.hardwareConcurrency <= 4;

    setShouldReduce(prefersReduced || isMobile || isLowEnd);
  }, []);

  return shouldReduce;
}
