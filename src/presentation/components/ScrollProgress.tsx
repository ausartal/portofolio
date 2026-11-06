"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Thin gradient bar pinned to the top that fills as the page is read. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-[#123DFF] via-[#7A8CFF] to-[#EAFF45]"
      style={{ scaleX }}
    />
  );
}
