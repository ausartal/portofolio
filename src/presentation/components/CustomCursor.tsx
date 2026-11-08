"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

/**
 * Dot + trailing ring. Only mounts for fine pointers (mouse/trackpad); the ring
 * swells over anything interactive and shrinks on press. Blend mode difference
 * keeps it legible on every section's field colour.
 */
export function CustomCursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [down, setDown] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 260, damping: 28, mass: 0.5 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => {
      const on = mq.matches && !reduced;
      setEnabled(on);
      document.documentElement.classList.toggle("has-cursor", on);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [reduced]);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const el = e.target as Element | null;
      setHover(!!el?.closest("a, button, [role='button'], [data-cursor='hover']"));
      setLabel(el?.closest<HTMLElement>("[data-cursor-label]")?.dataset.cursorLabel ?? null);
    };
    const leave = () => setVisible(false);
    const down_ = () => setDown(true);
    const up = () => setDown(false);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down_);
    window.addEventListener("pointerup", up);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down_);
      window.removeEventListener("pointerup", up);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] mix-blend-difference"
        style={{ x, y, opacity: visible ? 1 : 0 }}
      >
        <div className="-ml-[3px] -mt-[3px] size-[6px] rounded-full bg-white" />
      </motion.div>
      <motion.div
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-[90] ${label ? "" : "mix-blend-difference"}`}
        style={{ x: rx, y: ry, opacity: visible ? 1 : 0 }}
      >
        <motion.div
          className="-ml-5 -mt-5 size-10 rounded-full border border-white"
          animate={{
            scale: down ? 0.7 : label ? 2.3 : hover ? 1.9 : 1,
            backgroundColor: hover || label ? "rgba(255,255,255,1)" : "rgba(255,255,255,0)",
          }}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
        />
        {/* Over a labelled target the ring drops the blend and becomes a plain white disc with black text. */}
        <motion.span
          className="absolute left-0 top-0 -ml-5 flex size-10 items-center justify-center font-inter text-[10px] font-bold tracking-[0.14em] text-black"
          initial={false}
          animate={{ opacity: label && !down ? 1 : 0, scale: label ? 1 : 0.6 }}
          transition={{ duration: 0.2 }}
          style={{ marginTop: -20 }}
        >
          {label}
        </motion.span>
      </motion.div>
    </>
  );
}
