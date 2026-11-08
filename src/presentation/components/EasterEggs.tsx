"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
const STAR = "M0 -24 Q4.3 -4.3 24 0 Q4.3 4.3 0 24 Q-4.3 4.3 -24 0 Q-4.3 -4.3 0 -24Z";

interface Spark {
  readonly id: number;
  readonly x: number;
  readonly y: number;
  readonly r: number;
  readonly s: number;
  readonly d: number;
}

/**
 * Hidden extras. The Konami code showers the page with stars; `egg:blueprint`
 * (triple-click the corner logo) toggles a blueprint overlay. Both announce
 * themselves with a small toast.
 */
export function EasterEggs() {
  const reduced = useReducedMotion();
  const [toast, setToast] = useState<string | null>(null);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const seq = useRef<string[]>([]);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const say = (msg: string) => {
      setToast(msg);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setToast(null), 2800);
    };

    const onKey = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      seq.current = [...seq.current, k].slice(-KONAMI.length);
      if (seq.current.join() !== KONAMI.join()) return;
      seq.current = [];
      say("✦ CHEAT CODE UNLOCKED ✦  +30 LIVES");
      if (!reduced) {
        setSparks(
          Array.from({ length: 36 }, (_, id) => ({
            id,
            x: Math.random() * 100,
            y: 10 + Math.random() * 80,
            r: (Math.random() - 0.5) * 720,
            s: 0.5 + Math.random() * 1.4,
            d: Math.random() * 0.5,
          })),
        );
        window.setTimeout(() => setSparks([]), 2800);
      }
    };

    const onBlueprint = () => {
      const on = document.documentElement.classList.toggle("blueprint");
      say(on ? "BLUEPRINT MODE · ON" : "BLUEPRINT MODE · OFF");
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("egg:blueprint", onBlueprint);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("egg:blueprint", onBlueprint);
      window.clearTimeout(timer.current);
    };
  }, [reduced]);

  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[96] overflow-hidden">
        {sparks.map((s) => (
          <motion.svg
            key={s.id}
            viewBox="-26 -26 52 52"
            className="absolute size-10 text-acid"
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{ opacity: [0, 1, 1, 0], scale: s.s, rotate: s.r, y: [0, -60, 40] }}
            transition={{ duration: 2.2, delay: s.d, ease: "easeOut" }}
          >
            <path d={STAR} fill="currentColor" stroke="#1E1E1E" strokeWidth="2" />
          </motion.svg>
        ))}
      </div>
      <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-8 z-[97] flex justify-center">
        <AnimatePresence>
          {toast && (
            <motion.div
              key={toast}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="border-2 border-ink bg-acid px-4 py-2 font-inter text-[11px] font-semibold tracking-[0.18em] text-ink"
            >
              {toast}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
