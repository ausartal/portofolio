"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * Momentum scrolling. Mounted once at the document root so every section
 * inherits a single rAF loop rather than each spinning up its own.
 * Honours `prefers-reduced-motion` by opting out entirely.
 */
export function SmoothScroll({ children }: { readonly children: React.ReactNode }) {
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      frame.current = requestAnimationFrame(raf);
    };
    frame.current = requestAnimationFrame(raf);

    const onAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: 0 });
    };

    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
