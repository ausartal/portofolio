"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { digitalArchive } from "@/domain/content/portfolio";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";

/**
 * [02] DIGITAL ARCHIVES — electric blue field. Story column left,
 * framed showcase right, with the acid call-to-action link.
 */
export function DigitalArchiveSection() {
  const reduced = useReducedMotion();

  return (
    <section
      id="quest"
      aria-labelledby="digital-archives-heading"
      className="relative w-full overflow-hidden bg-electric-deep py-[clamp(4rem,7vw,7.5rem)]"
    >
      <div id="digital-archives-heading">
        <SectionHeader
          chapter={digitalArchive.chapter}
          label={digitalArchive.label}
          heading={digitalArchive.heading}
          aside={digitalArchive.aside}
          tone="electric"
        />
      </div>

      <div className="measure mt-[clamp(3rem,5vw,5rem)] grid items-start gap-x-[3rem] gap-y-[3rem] lg:grid-cols-[minmax(0,679fr)_minmax(0,1043fr)]">
        {/* Story column */}
        <div className="order-2 lg:order-1">
          <Reveal direction="right">
            <h3 className="font-[family-name:var(--font-inter)] text-[clamp(2rem,4.2vw,5rem)] leading-[1.05] text-white">
              {digitalArchive.project.title}
            </h3>
          </Reveal>

          <div className="mt-8 space-y-6">
            {digitalArchive.project.paragraphs.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 24)} delay={0.08 + index * 0.06}>
                <p className="max-w-[42rem] font-[family-name:var(--font-inter)] text-[clamp(0.9375rem,1.1vw,1rem)] leading-[1.6] text-white/90">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <a
              href="#tavern"
              className="group mt-10 inline-flex items-center gap-2 font-[family-name:var(--font-inter)] text-[0.875rem] font-semibold text-acid"
            >
              <span className="relative">
                {digitalArchive.project.ctaLabel}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-acid transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full" />
              </span>
              <svg
                viewBox="0 0 13 11"
                fill="none"
                aria-hidden
                className="size-[13px] transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
              >
                <path
                  d="M0 5.5h11M7 1l4.5 4.5L7 10"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
              </svg>
            </a>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="mt-10 border-t border-acid/40 pt-5">
              <p className="font-[family-name:var(--font-inter)] text-micro uppercase tracking-[0.118em] text-acid">
                {digitalArchive.project.focusLabel}
              </p>
              <p className="mt-2 max-w-[42rem] font-[family-name:var(--font-inter)] text-[0.875rem] leading-[1.6] text-white">
                {digitalArchive.project.focus}
              </p>
            </div>
          </Reveal>
        </div>

        {/* Showcase */}
        <Reveal className="order-1 lg:order-2" direction="left" amount={0.2}>
          <div className="relative aspect-[1043/640] w-full overflow-hidden bg-plate">
            <motion.div
              className="absolute inset-0"
              initial={reduced ? false : { scale: 1.08 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={digitalArchive.project.image}
                alt="The Edgeless Canvas digital archive showcase"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </motion.div>
            <span aria-hidden className="absolute left-0 top-0 block size-[32px] bg-electric-deep" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
