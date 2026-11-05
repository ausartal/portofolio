"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { contact, site } from "@/domain/content/portfolio";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";

/**
 * [07] THE NEXT CHAPTER — closing block. Oversized two-tone headline,
 * gradient interactive field, and the direct mail action.
 */
export function ContactSection({ footer }: { readonly footer: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const visualY = useTransform(scrollYProgress, [0, 1], ["6%", reduced ? "6%" : "-6%"]);

  return (
    <section
      ref={ref}
      id="tavern"
      aria-labelledby="contact-heading"
      className="relative w-full overflow-hidden bg-white py-[clamp(4rem,7vw,7.5rem)]"
    >
      <div id="contact-heading">
        <SectionHeader
          chapter={contact.chapter}
          label={contact.label}
          aside={contact.aside}
          heading={contact.headingLead}
          tone="light"
          headingClassName="text-electric"
        />
        <span className="visually-hidden">{contact.headingTail}</span>
      </div>

      <div className="measure mt-[clamp(2.5rem,4vw,4rem)] grid items-start gap-x-[4rem] gap-y-[3rem] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]">
        {/* Left — copy and action */}
        <div>
          <Reveal>
            <p className="font-[family-name:var(--font-anton)] text-[clamp(2.25rem,4.7vw,5.625rem)] leading-[1.05] tracking-[0.1em] text-ink">
              {contact.headingTail}
            </p>
          </Reveal>

          <div className="mt-8 space-y-5">
            {contact.body.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 24)} delay={0.06 + index * 0.05}>
                <p className="max-w-[56rem] font-[family-name:var(--font-inter)] text-[clamp(0.9375rem,1.1vw,1rem)] leading-[1.6] text-muted">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          {/* Prompt + action bar */}
          <Reveal delay={0.16}>
            <div className="mt-12 border-t border-ink/25 pt-6">
              <p className="font-[family-name:var(--font-inter)] text-[clamp(0.9375rem,1.1vw,1rem)] leading-[1.6] text-ink">
                {contact.prompt}
              </p>
              <p className="mt-2 font-[family-name:var(--font-inter)] text-[clamp(0.9375rem,1.1vw,1rem)] leading-[1.6] text-muted-soft">
                {contact.promptBody}
              </p>

              <a
                href={`mailto:${site.email}`}
                className="group mt-6 inline-flex items-center gap-3 rounded-full bg-electric px-7 py-4 font-[family-name:var(--font-inter)] text-[0.9375rem] leading-[1.6] text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-ink-deep"
              >
                {contact.action}
                <svg
                  viewBox="0 0 13 11"
                  fill="none"
                  aria-hidden
                  className="size-[13px] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5"
                >
                  <path d="M0 5.5h11M7 1l4.5 4.5L7 10" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </a>
            </div>
          </Reveal>

          {/* Direct mail */}
          <Reveal delay={0.2}>
            <div className="mt-12 border-t border-hairline pt-5">
              <p className="font-[family-name:var(--font-inter)] text-caption leading-[1.6] text-chrome-dim">
                {contact.emailPrompt}
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-1 inline-block font-[family-name:var(--font-inter)] text-caption leading-[1.6] text-chrome-dim underline decoration-transparent underline-offset-4 transition-colors duration-300 hover:text-electric hover:decoration-current"
              >
                {site.email}
              </a>
            </div>
          </Reveal>
        </div>

        {/* Right — visual field */}
        <Reveal direction="left" amount={0.15} className="lg:sticky lg:top-16">
          <div className="relative aspect-[912/1221] w-full overflow-hidden">
            <motion.div
              style={{ y: visualY }}
              className="absolute inset-x-0 -top-[6%] -bottom-[6%]"
            >
              <Image
                src={contact.visual}
                alt="Abstract visual field"
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover"
              />
            </motion.div>
          </div>
        </Reveal>
      </div>

      {/* Footer */}
      {footer}
    </section>
  );
}
