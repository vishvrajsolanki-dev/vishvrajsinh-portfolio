import { useEffect } from "react";

/** Tracks pointer for CSS spotlight surfaces via --pointer-x / --pointer-y */
export function usePointerSpotlight(enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const root = document.documentElement;
    root.style.setProperty("--pointer-x", "50vw");
    root.style.setProperty("--pointer-y", "40vh");

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        root.style.setProperty("--pointer-x", `${e.clientX}px`);
        root.style.setProperty("--pointer-y", `${e.clientY}px`);
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [enabled]);
}
