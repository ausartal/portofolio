"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { contact, site } from "@/domain/content/portfolio";
import { Ink } from "../components/Ink";
import { Stage } from "../components/Stage";

/** Wrapper covers the whole comp so the in-view observer has an area to measure; clicks still reach the content. */
const FILL = "absolute inset-0 pointer-events-none [&_a]:pointer-events-auto";

/**
 * [07] THE NEXT CHAPTER — comp `[05]-Page.svg`, 1920 x 1400, white field. The
 * footer is a child of the same Stage because the comp draws it on this canvas.
 *
 *   eyebrow   [ 81.3  75.2  22.4 10.8]  Inter 600 12        #123DFF
 *   label     [120.9  76.2 140    9  ]  Inter 600 12        #666B78
 *   aside     [1731.1 80.3 112.6 11.3]  Inter 400 12        #666B78  right aligned
 *   lead      [ 78.8 320  1036.4 78.8]  Anton 90 / 94.5     #123DFF
 *   outline   [ 79.4 448   898.7 78.8]  Anton 90, 2px inner stroke #123DFF
 *   body      [ 76.3 600.8 876.3 119.6] Inter 400 16 / 26   #666B78
 *   rule      x 72..982, y 866.5, 1px black
 *   prompt    [ 78.4 931.2 241.2 12  ]  Inter 400 16        #1E1E1E
 *   bar       x 76..982, y 961..1021, 1px #666B78
 *   button    x 771..974, y 966..1016, #4C2929 / #1F2126
 *   artwork   x 1034 y 33, 912 x 1221
 */
export function ContactSection({ footer }: { readonly footer: ReactNode }) {
  return (
    <section id="transmit" aria-labelledby="contact-heading" className="relative w-full bg-white">
      <Stage height={1400} className="bg-white">
        <ContactComp footer={footer} />
      </Stage>
    </section>
  );
}

function ContactComp({ footer }: { readonly footer: ReactNode }) {
  const reduced = useReducedMotion();

  const fade = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          viewport: { once: true, amount: "some" as const },
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <div className="absolute inset-0 font-inter">
      <motion.div
        className="absolute"
        style={{ left: 1034, top: 33, width: 912, height: 1221 }}
        initial={reduced ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src={contact.visual}
          alt="Character illustration for The Next Chapter"
          fill
          sizes="912px"
          className="select-none object-fill"
          priority
        />
      </motion.div>

      <Ink box={[81.3, 75.2, 22.4, 10.8]} face="inter" size={12} lh={19.2} weight={600} color="#123DFF" dx={-1} dy={1}>
        {contact.chapter}
      </Ink>
      <Ink
        box={[120.9, 76.2, 140, 9]}
        face="inter"
        size={12}
        lh={19.2}
        weight={600}
        ls={0.117}
        color="#666B78"
      >
        {contact.label}
      </Ink>
      <Ink box={[1731.1, 80.3, 112.6, 11.3]} face="inter" size={12} lh={19.2} ls={-0.009} color="#666B78" align="right">
        {contact.aside}
      </Ink>

      <motion.div className={FILL} {...fade(0.04)}>
        <Ink
          as="h2"
          box={[78.8, 320, 1036.4, 78.8]}
          face="anton"
          size={90}
          lh={94.5}
          ls={0.1}
          color="#123DFF"
          dx={-2}
          dy={1}
        >
          <span id="contact-heading">{contact.headingLead}</span>
        </Ink>
      </motion.div>

      {/* Outlined line: the comp strokes 4px but masks it to the glyph, i.e. a 2px inner stroke */}
      <motion.svg
        {...fade(0.1)}
        aria-hidden
        className="absolute left-0 top-0 overflow-visible"
        width={1920}
        height={700}
        viewBox="0 0 1920 700"
      >
        <defs>
          <mask id="contact-outline-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="1920" height="700">
            <text
              x={76}
              y={525.5}
              fill="white"
              className="font-anton"
              style={{ fontSize: 90, letterSpacing: "0.1em" }}
            >
              {contact.headingTail}
            </text>
          </mask>
        </defs>
        <text
          data-ink-box={process.env.NODE_ENV === "production" ? undefined : "79.4,448,898.7,78.8"}
          x={76}
          y={525.5}
          fill="none"
          stroke="#123DFF"
          strokeWidth={4}
          mask="url(#contact-outline-mask)"
          className="font-anton"
          style={{ fontSize: 90, letterSpacing: "0.1em" }}
        >
          {contact.headingTail}
        </text>
      </motion.svg>
      <span className="visually-hidden">{contact.headingTail}</span>

      {contact.body.map((paragraph, index) => (
        <motion.div key={paragraph.slice(0, 24)} className={FILL} {...fade(0.14 + index * 0.05)}>
          <Ink
            box={[76.3, 600.8 + index * 78, 876.3, 40]}
            face="inter"
            size={15.9}
            lh={26}
            color="#666B78"
            width={884}
            dy={2}
          >
            {paragraph}
          </Ink>
        </motion.div>
      ))}

      <span className="absolute bg-black" style={{ left: 72, top: 866, width: 910, height: 1 }} />

      <motion.div className={FILL} {...fade(0.2)}>
        <Ink box={[78.4, 931.2, 241.2, 12]} face="inter" size={16} lh={24} ls={-0.0078} color="#1E1E1E" dx={-1} dy={0.5}>
          {contact.prompt}
        </Ink>
        <span
          className="absolute border border-solid border-[#666B78]"
          style={{ left: 76, top: 961, width: 906, height: 60 }}
        />
        <Ink box={[91.3, 984.8, 575.6, 15.6]} face="inter" size={16} lh={24} color="#757575" dx={-1} dy={1}>
          {contact.promptBody}
        </Ink>
        <a
          href={`mailto:${site.email}`}
          className="absolute border border-solid border-[#1F2126] bg-[#4C2929] transition-opacity duration-200 hover:opacity-90"
          style={{ left: 771, top: 966, width: 203, height: 50 }}
        >
          <Ink
            as="span"
            box={[803.7, 985.9, 137.9, 11.2]}
            origin={[771, 966]}
            dx={-1}
            dy={-1}
            face="inter"
            size={14.8}
            lh={24}
            color="#FFFFFF"
          >
            {contact.action}
          </Ink>
        </a>
        <Ink box={[78.1, 1034, 439.8, 11.6]} face="inter" size={12} lh={19.2} ls={-0.004} color="#B3B3B3" dx={-1}>
          {contact.emailPrompt}
        </Ink>
        <a href={`mailto:${site.email}`} className="hover:text-[#123DFF]" style={{ color: "#B3B3B3" }}>
          <Ink as="span" box={[527.6, 1033.9, 164.4, 11.7]} face="inter" size={12} lh={19.2} ls={-0.011} dy={0.5} color="currentColor">
            {site.email}
          </Ink>
        </a>
      </motion.div>

      {footer}
    </div>
  );
}
