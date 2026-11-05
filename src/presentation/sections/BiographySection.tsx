"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { biography, categoryTags } from "@/domain/content/portfolio";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";

/**
 * [04] BEHIND THE SCENES — light field. Portrait plate left, biography
 * right, category tags closing the block.
 */
export function BiographySection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], ["-5%", reduced ? "-5%" : "5%"]);

  return (
    <section
      id="character"
      aria-labelledby="biography-heading"
      className="relative w-full bg-white py-[clamp(4rem,7vw,7.5rem)]"
    >
      <div id="biography-heading">
        <SectionHeader
          chapter={biography.chapter}
          label={biography.label}
          heading={biography.heading}
          aside={biography.aside}
          tone="light"
          headingClassName="text-electric"
        />
      </div>

      <div className="measure mt-[clamp(3rem,5vw,5rem)] grid items-start gap-x-[3rem] gap-y-[3rem] lg:grid-cols-[minmax(0,486fr)_minmax(0,1164fr)]">
        {/* Portrait plate */}
        <Reveal direction="right" amount={0.2}>
          <div
            ref={ref}
            className="relative aspect-[486/607] w-full overflow-hidden bg-stone"
          >
            <motion.div
              style={{ y: portraitY }}
              className="absolute inset-x-0 -top-[5%] -bottom-[5%]"
            >
              <Image
                src={biography.portrait}
                alt="Portrait of Ahmad Nab'al Falah"
                fill
                sizes="(max-width: 1024px) 60vw, 25vw"
                className="object-cover"
              />
            </motion.div>
          </div>
        </Reveal>

        {/* Biography */}
        <div>
          <Reveal>
            <p className="max-w-[58rem] font-[family-name:var(--font-inter)] text-[clamp(1rem,1.28vw,1.0625rem)] leading-[1.65] text-ink-deep">
              {biography.intro}
            </p>
          </Reveal>

          <div className="mt-7 space-y-5">
            {biography.body.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 24)} delay={0.06 + index * 0.05}>
                <p className="max-w-[58rem] font-[family-name:var(--font-inter)] text-[0.875rem] leading-[1.65] text-muted">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <ul className="mt-10 flex flex-wrap gap-2">
              {categoryTags.map((tag, index) => (
                <motion.li
                  key={tag.label}
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="inline-flex items-center rounded-full border border-hairline px-3 py-[0.375rem] font-[family-name:var(--font-inter)] text-micro leading-none text-muted whitespace-nowrap transition-colors duration-300 hover:border-electric hover:text-electric">
                    {tag.label}
                  </span>
                </motion.li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
