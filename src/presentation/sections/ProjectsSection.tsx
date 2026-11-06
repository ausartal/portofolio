"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { projects } from "@/domain/content/portfolio";
import { Ink, type Box } from "../components/Ink";
import { Stage } from "../components/Stage";
import { projectLayouts, type ProjectLayout } from "../layout/projectLayouts";

/**
 * [04] MISCELLANEOUS MATTERS — comp `[04]-Page.svg`, 1920 x 2334, field #E8ECFF.
 *
 * A Stage again: the nine cards sit at the coordinates stored in
 * `projectLayouts`, which are read off the exported comp and keep its small
 * card-to-card irregularities. Text is real text, placed by ink bounds.
 *
 *   eyebrow   [ 81.3  75.2   22.8  10.8]  Inter 600 12      #123DFF
 *   label     [116.9  76.2  189.6   9  ]  Inter 600 12      #666B78
 *   heading   [ 76.8 109.5 1300.7  61.5]  Afacad 700 92     #123DFF
 *   aside     [1520.2 104.9 320.2  68.7]  Inter 400 12/19.2 #666B78  right aligned
 *   card      548 x 598, 2px frame; plate 478 x 224, 2px frame
 *   title     LINE Seed 700 24     #1E1E1E
 *   subtitle  Inter 400 13         #1E1E1E
 *   summary   Inter 400 13 / 19.5  #424242
 *   tags      26 high, 1px #424242, Inter 11
 */
const ASIDE_LINES = [
  "“An ever-growing collection of side projects, visual",
  "experiments, when everything needs a purpose. Some",
  "things are simply made out of curiosity, experimentation,",
  "and the joy of creating.”",
] as const;

export function ProjectsSection() {
  return (
    <section
      id="inventory"
      aria-labelledby="projects-heading"
      className="relative w-full bg-[#E8ECFF]"
    >
      <h2 id="projects-heading" className="visually-hidden">
        Miscellaneous Matters — A Little Bit of Everything
      </h2>
      <Stage height={2334} className="bg-[#E8ECFF]">
        <ProjectsComp />
      </Stage>
    </section>
  );
}

function ProjectsComp() {
  const reduced = useReducedMotion();

  return (
    <div className="absolute inset-0 font-inter">
      <Ink box={[81.3, 75.2, 22.8, 10.8]} face="inter" size={12} lh={19.2} weight={600} color="#123DFF" dx={-1} dy={1}>
        [04]
      </Ink>
      <Ink
        box={[116.9, 76.2, 189.6, 9]}
        face="inter"
        size={12}
        lh={19.2}
        weight={600}
        ls={0.117}
        color="#666B78"
      >
        MISCELLANEOUS MATTERS
      </Ink>
      <Ink
        as="h3"
        box={[76.8, 109.5, 1300.7, 61.5]}
        face="afacad"
        size={92}
        lh={92}
        weight={700}
        ls={0.1}
        color="#123DFF"
        dy={3}
      >
        A LITTLE BIT OF EVERYTHING.
      </Ink>
      <Ink box={[1520.2, 104.9, 320.2, 68.7]} face="inter" size={12} lh={19.2} color="#666B78" align="right">
        {ASIDE_LINES.map((line, i) => (
          <span key={line}>
            {i > 0 && <br />}
            {line}
          </span>
        ))}
      </Ink>

      {projectLayouts.map((layout, index) => (
        <ProjectCard key={layout.id} layout={layout} index={index} reduced={Boolean(reduced)} />
      ))}
    </div>
  );
}

const rel = (b: Box, f: Box): Box => [b[0] - f[0], b[1] - f[1], b[2], b[3]];

function ProjectCard({
  layout,
  index,
  reduced,
}: {
  readonly layout: ProjectLayout;
  readonly index: number;
  readonly reduced: boolean;
}) {
  const project = projects[index];
  const f = layout.frame;
  const [px, py, pw, ph] = rel(layout.plate, f);
  const [ax, ay, aw, ah] = rel(layout.artwork.rect, f);
  const [dx, dy, dw, dh] = layout.artwork.disp;

  return (
    <motion.article
      className="group absolute"
      style={{ left: f[0], top: f[1], width: f[2], height: f[3] }}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Card frame: the comp strokes a 548 x 598 path 2px wide, centred on its edge */}
      <span
        className="absolute border-2 border-solid"
        style={{ left: -1, top: -1, width: f[2] + 2, height: f[3] + 2, borderColor: layout.stroke }}
      />
      {/* Plate */}
      <span
        className="absolute border-2 border-solid bg-white"
        style={{ left: px - 1, top: py - 1, width: pw + 2, height: ph + 2, borderColor: layout.stroke }}
      />
      {/* Artwork */}
      <div className="absolute overflow-hidden" style={{ left: ax, top: ay, width: aw, height: ah }}>
        <div className="absolute" style={{ left: dx, top: dy, width: dw, height: dh }}>
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            sizes={`${Math.round(dw)}px`}
            className="select-none object-fill"
          />
        </div>
      </div>
      {layout.extras.length > 0 && (
        <svg
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 overflow-visible"
          width={f[2]}
          height={f[3]}
          viewBox={`${f[0]} ${f[1]} ${f[2]} ${f[3]}`}
        >
          {layout.extras.map((e) => (
            <path key={e.d.slice(0, 24)} d={e.d} fill={e.fill} />
          ))}
        </svg>
      )}

      <Ink
        as="h3"
        box={layout.title}
        origin={[f[0], f[1]]}
        face="lineSeed"
        size={30}
        lh={30}
        weight={700}
        ls={0.15}
        color="#1E1E1E"
        dx={-2}
      >
        {project.name}
      </Ink>
      <Ink
        box={layout.discipline}
        origin={[f[0], f[1]]}
        face="inter"
        size={14.64}
        lh={19.5}
        ls={0.0095}
        color="#1E1E1E"
        dx={-1}
        dy={2}
      >
        {project.discipline}
      </Ink>
      <Ink
        box={layout.summary}
        origin={[f[0], f[1]]}
        face="inter"
        size={15}
        lh={23.25}
        color="#424242"
        width={layout.summary[2] + 8}
        dy={1}
      >
        {`"${project.summary}"`}
      </Ink>

      {layout.tags.map((tag, i) => {
        const r = rel(tag.rect, f);
        return (
          <span key={project.tags[i]}>
            <span
              className="absolute border border-solid border-[#424242]"
              style={{ left: r[0] - 0.5, top: r[1] - 0.5, width: r[2] + 1, height: r[3] + 1 }}
            />
            <Ink box={tag.text} origin={[f[0], f[1]]} face="inter" size={11} lh={16} color="#424242">
              {project.tags[i]}
            </Ink>
          </span>
        );
      })}
    </motion.article>
  );
}
