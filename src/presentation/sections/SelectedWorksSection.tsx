"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-3%", reduced ? "-3%" : "3%"]);

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.85, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col"
    >
      {/* 868x540 artwork container */}
      <div
        ref={ref}
        className={`group relative aspect-[868/540] w-full overflow-hidden ${
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
            className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
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
