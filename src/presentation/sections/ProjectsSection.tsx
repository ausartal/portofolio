"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { projects } from "@/domain/content/portfolio";
import type { Project } from "@/domain/content/entities";
import { SectionHeader } from "../components/SectionHeader";
import { Tag } from "../components/Tag";

/**
 * [06] MISCELLANEOUS MATTERS — nine project cards in a 3x3 grid on the
 * pale-electric field. Each card is a fixed-ratio plate with the mark
 * floating over a white panel and the story beneath.
 */
export function ProjectsSection() {
  return (
    <section
      id="miscellaneous"
      aria-labelledby="projects-heading"
      className="relative w-full bg-electric-pale py-[clamp(4rem,7vw,7.5rem)]"
    >
      <div id="projects-heading">
        <SectionHeader
          chapter="[06]"
          label="Miscellaneous Matters"
          heading="A LITTLE BIT OF EVERYTHING."
          aside={"\u201CAn ever-growing collection of side projects, visual experiments, when everything needs a purpose. Some things are simply made out of curiosity, experimentation, and the joy of creating.\u201D"}
          tone="light"
          headingClassName="text-electric"
        />
      </div>

      <div className="measure mt-[clamp(3rem,5vw,5rem)] grid gap-x-[3rem] gap-y-[3.5rem] sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  readonly project: Project;
  readonly index: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      className="group flex flex-col"
      initial={reduced ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay: (index % 3) * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="relative aspect-[550/600] w-full overflow-hidden border border-hairline bg-white/40">
        {/* White plate the mark sits on */}
        <div className="absolute inset-x-[5.4%] top-[5.3%] aspect-[480/226] bg-white" />

        {/* Project mark */}
        <div className="absolute inset-x-[8%] top-[6%] flex h-[38%] items-center justify-center">
          <Image
            src={project.image}
            alt={project.imageAlt}
            width={480}
            height={280}
            sizes="(max-width: 640px) 80vw, (max-width: 1280px) 40vw, 26vw"
            className="max-h-full w-auto max-w-[72%] object-contain transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          />
        </div>

        {/* Detail box */}
        <div className="absolute inset-x-[6.5%] bottom-[6.5%]">
          <h3 className="font-[family-name:var(--font-inter)] text-[clamp(1.125rem,1.5vw,1.8125rem)] font-bold tracking-[0.17em] text-ink">
            {project.name}
          </h3>
          <p className="mt-2 font-[family-name:var(--font-inter)] text-[0.875rem] leading-[1.55] text-ink-deep">
            {project.discipline}
          </p>
          <p className="mt-4 line-clamp-4 font-[family-name:var(--font-inter)] text-[0.875rem] leading-[1.55] text-muted-soft">
            {project.summary}
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li key={tag}>
                <Tag label={tag} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  );
}
