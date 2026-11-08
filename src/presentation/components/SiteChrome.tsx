"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const SECTIONS = [
  { id: "hero", label: "HOME" },
  { id: "tavern", label: "TAVERN" },
  { id: "quest", label: "QUEST" },
  { id: "character", label: "CHARACTER" },
  { id: "inventory", label: "INVENTORY" },
  { id: "transmit", label: "TRANSMIT" },
] as const;

/**
 * Persistent chrome: the white logo mark bottom-right (back to top) and a dot rail on the right
 * edge. Both use mix-blend-mode difference, so they invert against whichever
 * section field sits underneath (blue turns acid-ish, pale turns navy).
 */
export function SiteChrome() {
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const show = () => setReady(true);
    if (!document.documentElement.dataset.intro) show();
    else window.addEventListener("intro:done", show, { once: true });
    return () => window.removeEventListener("intro:done", show);
  }, []);

  // The logo doubles as back-to-top, so it only appears once the hero is gone.
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting), { threshold: 0 });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(els.indexOf(e.target as HTMLElement));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <AnimatePresence>
        {ready && pastHero && (
          <motion.a
            href="#hero"
            aria-label="Back to top — A’AL"
            className="fixed bottom-5 right-5 z-40 block w-[clamp(56px,5vw,84px)] mix-blend-difference sm:bottom-8 sm:right-8"
            initial={{ opacity: 0, y: 24, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, rotate: -6, scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
          >
            <Image
              src="/assets/logo-mark-white.png"
              alt=""
              width={1222}
              height={774}
              sizes="84px"
              className="h-auto w-full"
            />
          </motion.a>
        )}
      </AnimatePresence>

      <motion.nav
        aria-label="Section progress"
        className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 mix-blend-difference md:flex"
        initial={{ opacity: 0, x: 16 }}
        animate={ready ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        {SECTIONS.map((s, i) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-label={s.label}
            aria-current={i === active ? "true" : undefined}
            className="group flex items-center gap-3 font-inter text-[10px] font-semibold tracking-[0.2em] text-white"
          >
            <span
              className={`translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 ${
                i === active ? "translate-x-0 opacity-100" : ""
              }`}
            >
              {s.label}
            </span>
            <span
              className={`block h-[2px] bg-white transition-all duration-500 ease-quartz ${
                i === active ? "w-8" : "w-3 group-hover:w-6"
              }`}
            />
          </a>
        ))}
      </motion.nav>
    </>
  );
}
