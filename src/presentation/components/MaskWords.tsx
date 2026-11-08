"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

interface MaskWordsProps {
  readonly text: string;
  readonly className?: string;
  readonly delay?: number;
  readonly stagger?: number;
}

/**
 * Word-by-word mask reveal for headings: every word rises out of its own
 * clipped box when the heading scrolls into view. The real text stays in the
 * accessible name so screen readers read one heading, not fragments.
 */
export function MaskWords({ text, className, delay = 0, stagger = 0.08 }: MaskWordsProps) {
  const reduced = useReducedMotion();
  // Observe the unclipped wrapper: words sitting inside overflow-hidden never count as visible.
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  if (reduced) return <span className={className}>{text}</span>;

  const words = text.split(" ");
  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden
          className="inline-block overflow-hidden pb-[0.14em] align-top -mb-[0.14em]"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "112%", rotate: 4 }}
            animate={inView ? { y: "0%", rotate: 0 } : undefined}
            transition={{ duration: 0.95, delay: delay + i * stagger, ease: [0.16, 1, 0.3, 1] }}
          >
            {[...word].map((ch, c) => (
              <span key={c} className="hl">
                {ch}
              </span>
            ))}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
