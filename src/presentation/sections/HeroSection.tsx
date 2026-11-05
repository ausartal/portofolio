"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { navigation, site, socials } from "@/domain/content/portfolio";
import { socialIcons } from "../components/Icons";

/**
 * Hero canvas. Layering, bottom to top:
 *   canvas (#EEF1FA) → building silhouettes → acid carousel band → illustrations
 *   → character → navigation → display type.
 * Parallax is scroll-linked and disabled under reduced-motion.
 */
export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const characterY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "18%"]);
  const typeY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "-22%"]);
  const bandY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "6%"]);

  return (
    <section
      ref={ref}
      id="transmit"
      aria-label="Introduction"
      className="relative isolate min-h-[100svh] w-full overflow-hidden bg-canvas"
    >
      {/* Building silhouettes — the two-tone blocks from the comp */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%]">
        <div className="absolute bottom-0 left-0 h-[68%] w-[30%] bg-slate-deep" />
        <div className="absolute bottom-0 left-0 h-[50%] w-[30%] bg-slate-dark" />
        <div className="absolute right-0 bottom-0 h-[70%] w-[70%] bg-slate-deep" />
        <div className="absolute right-0 bottom-0 h-[57%] w-[70%] bg-slate-dark" />
      </div>

      {/* Acid carousel band that crosses the buildings */}
      <motion.div
        aria-hidden
        style={{ y: bandY }}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[26%]"
      >
        <div className="absolute inset-x-0 top-0 h-[33%] bg-olive" />
        <div className="absolute inset-x-0 top-[33%] bottom-0 bg-acid-deep" />
      </motion.div>

      {/* Illustration layers */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div
          style={{ y: typeY }}
          className="absolute right-0 bottom-[8%] w-[67%] max-w-[1286px]"
        >
          <Image
            src="/assets/hero-illustration-right.png"
            alt=""
            width={1286}
            height={1338}
            priority
            sizes="(max-width: 768px) 100vw, 67vw"
            className="h-auto w-full"
          />
        </motion.div>

        <motion.div
          style={{ y: characterY }}
          className="absolute bottom-0 left-0 w-[54%] max-w-[1040px]"
        >
          <Image
            src="/assets/hero-character.png"
            alt=""
            width={1040}
            height={1347}
            priority
            sizes="(max-width: 768px) 100vw, 54vw"
            className="h-auto w-full"
          />
        </motion.div>

        <div className="absolute bottom-[14%] left-0 w-[63%] max-w-[1212px] opacity-95">
          <Image
            src="/assets/hero-illustration-left.png"
            alt=""
            width={1212}
            height={994}
            priority
            sizes="(max-width: 768px) 100vw, 63vw"
            className="h-auto w-full"
          />
        </div>
      </div>

      {/* Social rail */}
      <ul className="absolute left-[clamp(1.25rem,3.4vw,4.75rem)] top-[clamp(1.5rem,2.2vw,2.75rem)] z-20 flex flex-col gap-0">
        {socials.map((social, index) => {
          const Icon = socialIcons[social.label as keyof typeof socialIcons];
          return (
            <li key={social.label}>
              <motion.a
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={social.label}
                className="grid size-12 place-items-center text-white transition-colors duration-300 hover:text-acid"
                initial={reduced ? false : { opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.09, ease: [0.16, 1, 0.3, 1] }}
              >
                <Icon className="size-[40px]" />
              </motion.a>
            </li>
          );
        })}
      </ul>

      {/* Navigation */}
      <motion.nav
        aria-label="Primary"
        className="absolute right-[clamp(1.25rem,3.4vw,4.75rem)] top-[clamp(1.5rem,2.2vw,2.75rem)] z-20 max-w-[calc(100%-7rem)]"
        initial={reduced ? false : { opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <ul className="flex flex-wrap items-center justify-end gap-x-[clamp(0.75rem,1.7vw,2rem)] gap-y-1">
          {navigation.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                className="group relative font-[family-name:var(--font-inter)] text-[clamp(0.75rem,1.04vw,1.25rem)] font-bold tracking-[0.1em] text-white transition-opacity duration-300 hover:opacity-70"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-acid transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>
      </motion.nav>

      {/* Display type */}
      <motion.div
        style={{ y: typeY }}
        className="relative z-10 flex min-h-[100svh] flex-col justify-center pt-[22vh] pb-[18vh]"
      >
        <div className="measure">
          <motion.p
            className="font-[family-name:var(--font-inter)] text-[clamp(1.5rem,2.6vw,2.5rem)] leading-[1.1] text-white"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {site.tagline}
          </motion.p>

          <motion.span
            aria-hidden
            className="mt-7 block h-[3px] w-[293px] max-w-[60%] origin-left bg-white"
            initial={reduced ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          />

          <h1 className="visually-hidden">
            {site.name} — {site.heroLineOne} {site.heroLineTwo}
          </h1>

          <motion.div
            aria-hidden
            className="mt-2 font-[family-name:var(--font-afacad)] text-[clamp(3.5rem,10.4vw,12.5rem)] font-bold leading-[1.02] tracking-[0.08em] text-white"
            initial={reduced ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="block">{site.heroLineOne}</span>
            <span className="block pl-[9%]">{site.heroLineTwo}</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
      >
        <motion.span
          className="block h-10 w-px bg-white/60"
          animate={reduced ? undefined : { scaleY: [0.3, 1, 0.3], originY: 0 }}
          transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
