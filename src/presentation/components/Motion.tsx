"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface SplitHeadingProps {
  readonly lines: readonly string[];
  readonly className?: string;
  readonly lineClassName?: string;
  readonly delay?: number;
  readonly stagger?: number;
}

/**
 * Clip-reveal headline: each line masks upward from its own baseline.
 * The wrapper keeps the line boxes tight so the mask edge reads as a hard cut,
 * which is what the comp's oversized type relies on.
 */
export function SplitHeading({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.11,
}: SplitHeadingProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <span className={className}>
        {lines.map((line) => (
          <span key={line} className={`block ${lineClassName ?? ""}`}>
            {line}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span className={className}>
      {lines.map((line, index) => (
        <span key={line} className="block overflow-hidden">
          <motion.span
            className={`block ${lineClassName ?? ""}`}
            initial={{ y: "108%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.95,
              delay: delay + index * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/**
 * Counts a numeric string up to its value on first view. Preserves any
 * prefix/suffix (e.g. "[01]") by splitting on the first digit run.
 */
export function Odometer({ value, className }: { readonly value: string; readonly className?: string }) {
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const match = value.match(/\d+/);
    if (!match) return;
    const target = Number.parseInt(match[0], 10);
    if (Number.isNaN(target)) return;

    const node = ref.current;
    if (!node) return;

    let raf = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 900;
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(eased * target);
          setDisplay(value.replace(match[0], String(current).padStart(match[0].length, "0")));
          if (progress < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, reduced]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
