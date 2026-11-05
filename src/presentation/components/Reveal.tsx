"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const OFFSETS: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 34 },
  down: { x: 0, y: -34 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
  none: { x: 0, y: 0 },
};

interface RevealProps {
  readonly children: ReactNode;
  readonly delay?: number;
  readonly duration?: number;
  readonly direction?: Direction;
  readonly className?: string;
  readonly amount?: number;
  readonly once?: boolean;
}

/**
 * Scroll-triggered entrance. Uses a spring-free tween with the `emerge`
 * easing so text settles rather than bounces — matching the comp's restraint.
 */
export function Reveal({
  children,
  delay = 0,
  duration = 0.75,
  direction = "up",
  className,
  amount = 0.3,
  once = true,
}: RevealProps) {
  const reduced = useReducedMotion();
  const offset = OFFSETS[direction];

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
