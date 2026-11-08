"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { selectedWorks } from "@/domain/content/portfolio";
import { SectionHeader } from "../components/SectionHeader";
import { Tag } from "../components/Tag";

/**
 * [01] SELECTED WORKS (Frame 46 in Figma) — two portrait cards on a slate field (#454545).
 * Dimensions, proportions, spacing, and typography match the 1920x1080 Figma comp.
 */
export function SelectedWorksSection() {
  return (
    <section
      id="tavern"
      aria-labelledby="selected-works-heading"
      className="relative w-full bg-slate-deep py-[clamp(3.5rem,5.5vw,5.5rem)]"
    >
      <div id="selected-works-heading">
        <SectionHeader
          chapter="[01]"
          label="SELECTED WORKS"
          heading="BEYOND THE SURFACE"
          aside="Personal explorations, untouched by client briefs. Crafted to test new ideas and direction"
          asideClassName="max-w-[202px]"
        />
      </div>

      <div className="measure mt-[clamp(2.5rem,4.5vw,4.5rem)] grid gap-x-[2rem] gap-y-[3.5rem] lg:grid-cols-2">
        {selectedWorks.map((work, index) => (
          <WorkCard key={work.id} work={work} index={index} />
        ))}
      </div>
    </section>
  );
}

function WorkCard({
  work,
  index,
}: {
  readonly work: (typeof selectedWorks)[number];
  readonly index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  // Observe an unclipped wrapper: a fully clip-pathed element never counts as intersecting.
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { once: true, amount: 0.25 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-3%", reduced ? "-3%" : "3%"]);

  // Pointer tilt: card leans toward the cursor and a soft highlight follows it.
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const spring = { stiffness: 140, damping: 18, mass: 0.5 };
  const rotateY = useSpring(useTransform(mx, [0, 1], reduced ? [0, 0] : [-7, 7]), spring);
  const rotateX = useSpring(useTransform(my, [0, 1], reduced ? [0, 0] : [6, -6]), spring);
  const glowX = useTransform(mx, (v) => `${v * 100}%`);
  const glowY = useTransform(my, (v) => `${v * 100}%`);
  const glow = useMotionTemplate`radial-gradient(420px circle at ${glowX} ${glowY}, rgba(255,255,255,0.22), transparent 60%)`;
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.85, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col"
    >
      {/* 868x540 artwork container */}
      <div ref={wrapRef} className="[perspective:1100px]">
      <motion.div
        ref={ref}
        data-cursor-label="VIEW"
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        initial={reduced ? false : { clipPath: "inset(0 0 100% 0)" }}
        animate={{ clipPath: inView ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)" }}
        transition={{ duration: 1.15, delay: index * 0.12, ease: [0.76, 0, 0.24, 1] }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`group relative aspect-[868/540] w-full overflow-hidden will-change-transform ${
          work.id === "last-frequency" ? "bg-[#123DFF]" : "bg-[#FF775D]"
        }`}
      >
        <motion.div
          style={{ y: imageY }}
          className="absolute inset-x-0 -top-[3%] -bottom-[3%]"
        >
          <Image
            src={work.image}
            alt={work.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
          />
        </motion.div>
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: glow }}
        />
      </motion.div>
      </div>

      {/* Project Title (LINE Seed JP 700, 29px) */}
      <div className="mt-5 lg:mt-[22px]">
        <h3
          className={`font-line-seed text-[clamp(1.25rem,1.8125rem,1.8125rem)] font-bold leading-tight text-white ${
            work.id === "almost-there" ? "tracking-[0.3448em]" : "tracking-[0.1724em]"
          }`}
        >
          {work.title}
        </h3>
      </div>

      {/* Project Statement / Quote (Inter 400, 15px, line-height 23px) */}
      <blockquote className="mt-3.5 lg:mt-[18px] max-w-[868px] font-inter text-[clamp(0.875rem,0.9375rem,0.9375rem)] leading-[1.533] text-[#C6C6C6]">
        {work.statement}
      </blockquote>

      {/* Project Metadata (Tags left, Year right) */}
      <div className="mt-5 lg:mt-[24px] flex items-center justify-between gap-4">
        <ul className="flex flex-wrap items-center gap-3">
          {work.tags.map((tag) => (
            <li key={tag}>
              <Tag
                label={tag}
                className="border-[#DADDDC] text-[#C6C6C6] bg-transparent hover:border-white hover:text-white transition-colors duration-300"
              />
            </li>
          ))}
        </ul>
        <span className="font-inter text-[12px] text-[#C6C6C6] shrink-0">
          {work.year}
        </span>
      </div>
    </motion.article>
  );
}
