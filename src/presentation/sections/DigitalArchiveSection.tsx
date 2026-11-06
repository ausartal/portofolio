"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { digitalArchive } from "@/domain/content/portfolio";
import { Ink } from "../components/Ink";
import { Stage } from "../components/Stage";

/**
 * [02] DIGITAL ARCHIVES — comp `[02]-Page.svg`, 1920 x 1080, field #022BD3.
 *
 * Laid out on a Stage at the comp's own pixel coordinates so proportions,
 * positions and gaps match the design exactly at any viewport width. Text boxes
 * are the ink bounds of the glyph outlines in the exported SVG:
 *
 *   eyebrow      [ 81.3  75.2  22.3 10.8]  Inter 600 12        #C6C6C6
 *   label        [116.9  76.2 130.6  9  ]  Inter 600 12        #C6C6C6
 *   heading      [ 80.6 109.6 1176.2 61.3] Afacad 700 92       #FFFFFF
 *   aside        [1676.2 129  157.2 49.5]  Inter 400 12 / 19.2 #C1C3CA  right aligned
 *   title        [ 78.8 274.7 625.1 148.5] DM Sans 400 90 / 84  #FFFFFF
 *   paragraphs   [ 75.8 493.8 656.1 67.5], [76.8 604.8 669.5 67.6]  Inter 400 / 26
 *   cta          [ 70.7 788.8  91.7 10.8]  Inter              #EAFF45  + arrow 176..189 x 788..799.5
 *   rule         x 70..749, y 842, 1px white @ 25 %
 *   focus label  [ 71   864.8 111.5 10.5]  Inter 600 12        #EAFF45
 *   focus body   [ 71.2 895.5 548.7 13.5]  Inter 400           #FFFFFF
 *   frame        801 272 1043 x 640 #E7E7E7, notch 32.5 x 34.5
 *   showcase     841 315 964 x 553, drop shadow (19, 19, blur 27.4, 25 % black)
 */
export function DigitalArchiveSection() {
  return (
    <section id="quest" aria-labelledby="digital-archives-heading" className="relative w-full">
      <h2 id="digital-archives-heading" className="visually-hidden">
        Digital Archives — Unbound by Resolution
      </h2>
      <Stage height={1080} className="bg-[#022BD3]">
        <ArchiveComp />
      </Stage>
    </section>
  );
}

function ArchiveComp() {
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

  const { project } = digitalArchive;

  return (
    <div className="absolute inset-0 font-inter text-white">
      <Ink box={[81.3, 75.2, 22.3, 10.8]} face="inter" size={12} lh={19.2} weight={600} color="#C6C6C6" dx={-1} dy={2}>
        {digitalArchive.chapter}
      </Ink>
      <Ink
        box={[116.9, 76.2, 130.6, 9]}
        face="inter"
        size={12}
        lh={19.2}
        weight={600}
        ls={0.117}
        color="#C6C6C6"
      >
        {digitalArchive.label}
      </Ink>

      <motion.div {...fade(0.06)}>
        <Ink
          as="h3"
          box={[80.6, 109.6, 1176.2, 61.3]}
          face="afacad"
          size={92}
          lh={92}
          weight={700}
          ls={0.1}
          color="#FFFFFF"
          dx={-4}
          dy={4}
        >
          {digitalArchive.heading}
        </Ink>
      </motion.div>

      <Ink box={[1676.2, 129, 157.2, 49.5]} face="inter" size={12} lh={19.2} color="#C1C3CA" align="right">
        {"“Within every building made"}
        <br />
        {"with pride, the architect is"}
        <br />
        {"trapped inside.”"}
      </Ink>

      <motion.div {...fade(0.1)}>
        <Ink
          as="h4"
          box={[78.8, 274.7, 625.1, 148.5]}
          face="dmSans"
          weight={400}
          size={91.5}
          lh={84}
          color="#FFFFFF"
          dx={-3}
          dy={1}
        >
          THE EDGELESS
          <br />
          CANVAS.
        </Ink>
      </motion.div>

      {project.paragraphs.map((paragraph, index) => (
        <motion.div key={paragraph.slice(0, 24)} {...fade(0.16 + index * 0.06)}>
          <Ink
            box={index === 0 ? [75.8, 493.8, 656.1, 67.5] : [76.8, 604.8, 669.5, 67.6]}
            face="inter"
            size={16}
            lh={26}
            color="#FFFFFF"
            dy={2}
            width={680}
          >
            {paragraph}
          </Ink>
        </motion.div>
      ))}

      <motion.a
        {...fade(0.28)}
        href="#transmit"
        className="group absolute block"
        style={{ left: 64, top: 776, width: 140, height: 36 }}
      >
        <Ink
          as="span"
          box={[70.7, 788.8, 91.7, 10.8]}
          origin={[64, 776]}
          face="inter"
          size={14}
          lh={22.5}
          weight={600}
          color="#EAFF45"
          dy={2}
        >
          {project.ctaLabel}
        </Ink>
        <svg
          viewBox="0 0 13 12"
          fill="none"
          aria-hidden
          className="absolute overflow-visible transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:-translate-y-0.5"
          style={{ left: 176 - 64, top: 788 - 776, width: 13, height: 12 }}
        >
          <path d="M0 11.5L13 0M13 6.5V0H7" stroke="#EAFF45" strokeWidth="2" />
        </svg>
      </motion.a>

      <span className="absolute bg-white/25" style={{ left: 70, top: 842, width: 679, height: 1 }} />

      <motion.div {...fade(0.32)}>
        <Ink
          box={[71, 864.8, 111.5, 10.5]}
          face="inter"
          size={13}
          lh={19.2}
          weight={600}
          color="#EAFF45"
          dy={2}
        >
          {project.focusLabel}
        </Ink>
        <Ink box={[71.2, 895.5, 548.7, 13.5]} face="inter" size={14} lh={22.5} color="#FFFFFF" dy={1}>
          {project.focus}
        </Ink>
      </motion.div>

      {/* Framed showcase */}
      <div className="absolute bg-[#E7E7E7]" style={{ left: 801, top: 272, width: 1043, height: 640 }}>
        <svg
          viewBox="0 0 33 35"
          fill="none"
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 z-10"
          style={{ width: 33, height: 35 }}
        >
          <path d="M0 25L22.5 0H32.5L0 34.5V25Z" fill="#022BD3" />
        </svg>
      </div>
      <motion.div
        className="absolute overflow-hidden bg-black"
        style={{ left: 841, top: 315, width: 964, height: 553, boxShadow: "19px 19px 27.4px rgba(0,0,0,0.25)" }}
        initial={reduced ? false : { scale: 1.03 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* The comp scales the 1901 x 1199 bitmap to the frame's width, so it is 607.8 px tall and cropped to 553 from the top */}
        <div className="absolute left-0 top-0" style={{ width: 964, height: 607.8 }}>
          <Image
            src={project.image}
            alt="The Edgeless Canvas digital archive showcase"
            fill
            sizes="964px"
            className="object-fill"
          />
        </div>
      </motion.div>
    </div>
  );
}
