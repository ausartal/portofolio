"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { biography, categoryTags } from "@/domain/content/portfolio";
import { Ink, type Box } from "../components/Ink";
import { Stage } from "../components/Stage";

/**
 * [04] BEHIND THE SCENES — comp `[03]-Page.svg`, 1920 x 1080, white field.
 *
 * Laid out on a Stage at the comp's own pixel coordinates (see Stage.tsx), so
 * proportions and positions match the design at any viewport width. Text boxes
 * below are the ink bounds of the glyph outlines in the exported SVG.
 *
 *   eyebrow     [103.3  75.2 22.6   10.8]  Inter 600 12     #022BD3
 *   label       [138.9  76.2 144    9   ]  Inter 600 12     #141824
 *   heading     [ 98.8 109.5 951.8  61.5]  Afacad 700 92    #123DFF
 *   aside       [1696.8 129  158.7  28.2]  Inter 400 12     #141824  right aligned
 *   headline    [698.4 320.1 760.1 146.5]  Anton 76 / 79.8  #123DFF
 *   intro       [697.5 519.1 942.1  16.6]  Inter 400 18     #141824
 *   body        [696.4 578.3 1157.6 243.7] Inter 400 14 / 23 #666B78
 *   tags        y 878.5, 26 high, 1px #DADDDC
 *   shadow      189.7 297  416 x 557, rotated 7.70339 deg, #74767B
 *   portrait    150.5 322.4 416 x 557
 */

const TAGS: readonly { readonly rect: Box; readonly text: Box }[] = [
  { rect: [696.5, 878.5, 116, 26], text: [708.3, 887.8, 90.9, 10.6] },
  { rect: [835.5, 878.5, 98, 26], text: [847.2, 887.8, 73, 10.6] },
  { rect: [956.5, 878.5, 128, 26], text: [968.7, 887.8, 103.5, 10.6] },
  { rect: [1107.5, 878.5, 87, 26], text: [1119.3, 887.8, 62.9, 8.4] },
  { rect: [1217.5, 878.5, 93, 26], text: [1230, 887.8, 67.5, 10.6] },
  { rect: [1333.5, 878.5, 101, 26], text: [1346, 887.8, 75.2, 8.4] },
];

export function BiographySection() {
  return (
    <section id="character" aria-labelledby="biography-heading" className="relative w-full bg-white">
      <h2 id="biography-heading" className="visually-hidden">
        Behind the Scenes — {biography.heading}
      </h2>
      <Stage height={1080} className="bg-white">
        <BiographyComp />
      </Stage>
    </section>
  );
}

function BiographyComp() {
  const reduced = useReducedMotion();

  const fade = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          viewport: { once: true, amount: 0.1 },
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <div className="absolute inset-0 font-inter">
      <Ink box={[103.3, 75.2, 22.6, 10.8]} face="inter" size={12} lh={19.2} weight={600} color="#022BD3" dx={-1} dy={1}>
        {biography.chapter}
      </Ink>
      <Ink
        box={[138.9, 76.2, 144, 9]}
        face="inter"
        size={12}
        lh={19.2}
        weight={600}
        ls={0.1066}
        color="#141824"
      >
        {biography.label}
      </Ink>

      <motion.div {...fade(0.04)}>
        <Ink
          as="h3"
          box={[98.8, 109.5, 951.8, 61.5]}
          face="afacad"
          size={92}
          lh={92}
          weight={700}
          ls={0.1}
          color="#123DFF"
          dy={2}
        >
          {biography.heading}
        </Ink>
      </motion.div>

      <Ink
        box={[1696.8, 129, 158.7, 28.2]}
        face="inter"
        size={12}
        lh={19.2}
        color="#141824"
        align="right"
      >
        {"“A Creative Practice Without"}
        <br />
        {"Fixed Boundaries”"}
      </Ink>

      {/* Tilted slate plate behind the portrait */}
      <div
        className="absolute bg-[#74767B]"
        style={{
          left: 189.663,
          top: 297,
          width: 416,
          height: 557,
          transform: "rotate(7.70339deg)",
          transformOrigin: "0 0",
        }}
      />
      <motion.div
        className="absolute"
        style={{ left: 150.454, top: 322.367, width: 416, height: 557 }}
        initial={reduced ? false : { opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src={biography.portrait}
          alt="Illustration of Ahmad Nab'al Falah in MS Paint"
          fill
          sizes="416px"
          className="select-none object-fill"
          priority
        />
      </motion.div>

      <motion.div {...fade(0.08)}>
        <Ink
          as="h4"
          box={[698.4, 320.1, 760.1, 146.5]}
          face="anton"
          size={76}
          lh={79.8}
          ls={0.1}
          color="#123DFF"
          dx={-3}
          dy={2}
        >
          CURIOUS BY NATURE
          <br />
          CREATIVE BY PRACTICE
        </Ink>
      </motion.div>

      <motion.div {...fade(0.12)}>
        <Ink box={[697.5, 519.1, 942.1, 16.6]} face="inter" size={17} lh={27} color="#141824" dx={-1} dy={1}>
          {biography.intro}
        </Ink>
      </motion.div>

      {biography.body.map((paragraph, index) => (
        <motion.div key={paragraph.slice(0, 24)} {...fade(0.16 + index * 0.05)}>
          <Ink
            box={[696.4, [578.3, 670.3, 762.3][index] ?? 578.3, 1157.6, 70]}
            face="inter"
            size={14}
            lh={23}
            color="#666B78"
            width={1162}
          >
            {paragraph}
          </Ink>
        </motion.div>
      ))}

      {categoryTags.map((tag, index) => {
        const t = TAGS[index];
        return (
          <motion.div key={tag.label} {...fade(0.22 + index * 0.03)}>
            <span
              className="absolute border border-[#DADDDC]"
              style={{ left: t.rect[0] - 0.5, top: t.rect[1] - 0.5, width: t.rect[2] + 1, height: t.rect[3] + 1 }}
            />
            <Ink box={t.text} face="inter" size={11} lh={16} color="#666B78">
              {tag.label}
            </Ink>
          </motion.div>
        );
      })}
    </div>
  );
}
