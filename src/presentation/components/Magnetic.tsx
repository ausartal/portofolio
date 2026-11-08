"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

interface MagneticProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly style?: CSSProperties;
  /** How far (fraction of the pointer's offset from centre) the element follows. */
  readonly strength?: number;
}

/** Pulls its child toward the pointer while hovered and springs back on leave. */
export function Magnetic({ children, className, style, strength = 0.3 }: MagneticProps) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  if (reduced) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      style={{ ...style, x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
