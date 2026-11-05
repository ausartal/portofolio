"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { selectedWorks } from "@/domain/content/portfolio";
import { SectionHeader } from "../components/SectionHeader";
import { Tag } from "../components/Tag";

/**
 * [01] SELECTED WORKS — two portrait cards on a slate field, each with
 * metadata beneath. The hover lift is intentionally small; the comp is static.
 */
export function SelectedWorksSection() {
  return (
    <section
      id="inventory"
      aria-labelledby="selected-works-heading"
      className="relative w-full bg-slate-deep py-[clamp(4rem,7vw,7.5rem)]"
    >
      <div id="selected-works-heading">
        <SectionHeader
          chapter="[01]"
          label="Selected Works"
          heading="BEYOND THE SURFACE"
          aside="Personal explorations, untouched by client briefs. Crafted to test new ideas and direction"
        />
      </div>

      <div className="measure mt-[clamp(3rem,5vw,5.5rem)] grid gap-x-[2rem] gap-y-[3.5rem] md:grid-cols-2">
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
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", reduced ? "-6%" : "6%"]);

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.85, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        ref={ref}
        className="group relative aspect-[868/688] w-full overflow-hidden bg-slate-dark"
      >
        <motion.div
          style={{ y: imageY }}
          className="absolute inset-x-0 -top-[6%] -bottom-[6%]"
        >
          <Image
            src="/assets/archive-showcase.png"
            alt={`${work.title} key art`}
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-slate-dark/45 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-[clamp(1.25rem,2.2vw,2rem)]">
          <h3 className="font-[family-name:var(--font-inter)] text-[clamp(1.125rem,1.5vw,1.8125rem)] font-bold tracking-[0.17em] text-white">
            {work.title}
          </h3>
        </div>
      </div>

      <blockquote className="mt-6 max-w-[46rem] font-[family-name:var(--font-inter)] text-[0.9375rem] leading-[1.55] text-chrome">
        {work.statement}
      </blockquote>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <ul className="flex flex-wrap gap-2">
          {work.tags.map((tag) => (
            <li key={tag}>
              <Tag label={tag} className="border-stone/40 text-chrome" />
            </li>
          ))}
        </ul>
        <span className="font-[family-name:var(--font-inter)] text-caption text-chrome">{work.year}</span>
      </div>
    </motion.article>
  );
}
