"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { animate, motion, useReducedMotion } from "motion/react";

const COLUMNS = 7;
const LOAD_SECONDS = 2.9;
const ease = [0.76, 0, 0.24, 1] as const;

const WORDS = ["ILLUSTRATION", "VISUAL DESIGN", "GAME DEV", "ENGINEERING"];

/**
 * Cinematic preloader. The server renders it already covering the page, so the
 * hero never flashes before it. A counter drives a bottom-up reveal of the mark,
 * then seven blue columns lift away in a stagger to uncover the hero.
 *
 * Scrolling is held (`data-intro="on"`) until the curtain is gone; SmoothScroll
 * reads that flag and the `intro:done` event.
 */
export function Intro() {
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "exit" | "gone">("loading");
  const [word, setWord] = useState(0);
  const finished = useRef(false);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    setPhase("exit");
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.intro = "on";
    window.scrollTo(0, 0);

    if (reduced) {
      const t = window.setTimeout(finish, 350);
      return () => window.clearTimeout(t);
    }

    const controls = animate(0, 100, {
      duration: LOAD_SECONDS,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setProgress(Math.round(v)),
      onComplete: () => window.setTimeout(finish, 260),
    });
    const words = window.setInterval(() => setWord((w) => (w + 1) % WORDS.length), 720);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && finish();
    window.addEventListener("keydown", onKey);

    return () => {
      controls.stop();
      window.clearInterval(words);
      window.removeEventListener("keydown", onKey);
    };
  }, [finish, reduced]);

  useEffect(() => {
    if (phase !== "gone") return;
    const root = document.documentElement;
    delete root.dataset.intro;
    window.dispatchEvent(new Event("intro:done"));
  }, [phase]);

  if (phase === "gone") return null;

  const exiting = phase === "exit";

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[100] overflow-hidden"
    >
      {/* Curtain columns */}
      <div className="absolute inset-0 flex">
        {Array.from({ length: COLUMNS }, (_, i) => (
          <motion.div
            key={i}
            className="h-full flex-1 bg-electric"
            style={{ marginRight: -1 }}
            initial={false}
            animate={{ y: exiting ? "-101%" : "0%" }}
            transition={{ duration: 0.95, delay: exiting ? i * 0.07 : 0, ease }}
            onAnimationComplete={() => {
              if (exiting && i === COLUMNS - 1) setPhase("gone");
            }}
          />
        ))}
      </div>

      {/* Content layer */}
      <motion.div
        className="absolute inset-0 text-white"
        initial={false}
        animate={{ opacity: exiting ? 0 : 1, scale: exiting ? 1.06 : 1 }}
        transition={{ duration: 0.45, ease: "easeIn" }}
      >
        {/* Blueprint grid */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "88px 88px",
            maskImage: "radial-gradient(circle at 50% 50%, #000 0%, transparent 72%)",
            WebkitMaskImage: "radial-gradient(circle at 50% 50%, #000 0%, transparent 72%)",
          }}
        />
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 size-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7A8CFF] opacity-30 blur-[120px]"
        />

        {/* Corner metadata */}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 font-inter text-[11px] font-semibold tracking-[0.18em] sm:p-8">
          <span>[ A’AL — PORTFOLIO ]</span>
          <button
            type="button"
            onClick={finish}
            className="cursor-pointer tracking-[0.18em] opacity-70 transition-opacity hover:opacity-100"
          >
            SKIP ↗
          </button>
        </div>

        {/* Mark */}
        <div className="absolute left-1/2 top-1/2 w-[min(46vw,360px)] -translate-x-1/2 -translate-y-[62%]">
          <div className="relative aspect-[1222/774] w-full">
            <Image
              src="/assets/logo-mark-white.png"
              alt=""
              fill
              priority
              sizes="360px"
              className="select-none object-contain opacity-[0.16]"
            />
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(${100 - progress}% 0 0 0)` }}
            >
              <Image
                src="/assets/logo-mark-white.png"
                alt="A’AL logo mark"
                fill
                priority
                sizes="360px"
                className="select-none object-contain"
              />
            </div>
            {/* Scan line riding the reveal edge */}
            <div
              aria-hidden
              className="absolute -inset-x-6 h-[2px] bg-acid shadow-[0_0_18px_3px_#EAFF45]"
              style={{ top: `${100 - progress}%`, opacity: progress > 0 && progress < 100 ? 1 : 0 }}
            />
          </div>
        </div>

        {/* Rotating discipline words */}
        <div className="absolute left-1/2 top-[63%] h-6 w-full -translate-x-1/2 overflow-hidden text-center font-line-seed text-[13px] font-bold tracking-[0.5em] sm:text-sm">
          <motion.div
            key={word}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {WORDS[word]}
          </motion.div>
        </div>

        {/* Counter + bar */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 sm:p-8">
          <div className="font-anton text-[clamp(4rem,14vw,11rem)] leading-[0.8] tracking-[0.04em] tabular-nums">
            {String(progress).padStart(3, "0")}
          </div>
          <div className="mb-1 hidden text-right font-inter text-[11px] font-semibold tracking-[0.18em] sm:block">
            BOUND TO CANVAS
            <br />
            <span className="opacity-70">ESC TO SKIP</span>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[5px] bg-white/20">
          <div className="h-full origin-left bg-acid" style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
      </motion.div>
    </div>
  );
}
