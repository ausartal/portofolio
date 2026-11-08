"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

const WORDS = ["SELECTED WORKS", "DIGITAL ARCHIVES", "BEHIND THE SCENES", "MISCELLANEOUS MATTERS", "THE NEXT CHAPTER"];
/** Doubled so the sequence has an even length and solid/outline still alternate where the tile wraps. */
const SEQ = [...WORDS, ...WORDS];
const ANGLE = -6.49; // slope of the acid tape in the hero comp: 218.5 / 1920
const GAP = 70; // space between a word and its star, each side
const STAR = 24; // star radius

const INK = "#1E1E1E";

/** Alternates solid, outline, solid, outline… in ink; stars are always ink. */
const STYLES = [
  { fill: INK, stroke: "none", star: INK },
  { fill: "none", stroke: INK, star: INK },
] as const;

const STAR_PATH = `M0 ${-STAR} Q${STAR * 0.18} ${-STAR * 0.18} ${STAR} 0 Q${STAR * 0.18} ${STAR * 0.18} 0 ${STAR} Q${-STAR * 0.18} ${STAR * 0.18} ${-STAR} 0 Q${-STAR * 0.18} ${-STAR * 0.18} 0 ${-STAR}Z`;

/**
 * Scrolling type that rides the yellow tape of the hero. One line of Anton
 * words, alternating solid and outlined (all ink),
 * separated by four-point stars that keep spinning as they travel.
 *
 * Word widths are measured once the font is in, so stars sit exactly between
 * words and the loop wraps by one tile with no seam. Scroll velocity nudges the
 * speed up and flips direction when scrolling back. The group is rotated to the
 * tape's angle and clipped to its polygon.
 */
export function HeroMarquee() {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const dir = useRef(1);
  const refs = useRef<(SVGTextElement | null)[]>([]);
  // Rough first guess so the server render has a sane layout before measuring.
  const [widths, setWidths] = useState<number[]>(() => SEQ.map((w) => w.length * 41));

  useEffect(() => {
    let alive = true;
    const measure = () => {
      if (!alive) return;
      const next = refs.current.slice(0, SEQ.length).map((el) => el?.getComputedTextLength() ?? 0);
      if (next.every((n) => n > 0)) setWidths(next);
    };
    document.fonts.ready.then(measure);
    return () => {
      alive = false;
    };
  }, []);

  // Each word is followed by gap + star + gap.
  const slot = (i: number) => widths[i] + GAP * 2 + STAR * 2;
  const tile = SEQ.reduce((sum, _, i) => sum + slot(i), 0);

  const { scrollY } = useScroll();
  const smooth = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(smooth, [-2500, 0, 2500], [-4, 0, 4], { clamp: false });

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    const b = boost.get();
    if (b > 0.08) dir.current = 1;
    else if (b < -0.08) dir.current = -1;
    const step = (1.7 + Math.abs(b) * 1.5) * (delta / 16.67) * dir.current;
    let next = x.get() - step;
    if (next <= -tile) next += tile;
    if (next > 0) next -= tile;
    x.set(next);
  });

  let cursor = 0;
  const copies = [0, 1, 2].map((copy) => {
    const items = SEQ.map((word, i) => {
      const st = STYLES[i % 2];
      const wx = copy * tile + cursor;
      const sx = wx + widths[i] + GAP + STAR;
      cursor += slot(i);
      return (
        <g key={`${copy}-${i}`}>
          <text
            ref={(el) => {
              if (copy === 0) refs.current[i] = el;
            }}
            x={wx}
            y={26}
            className="font-anton"
            fontSize={72}
            fill={st.fill}
            stroke={st.stroke}
            strokeWidth={st.stroke === "none" ? 0 : 2.4}
            strokeLinejoin="round"
            style={{ letterSpacing: "0.06em", whiteSpace: "pre" }}
          >
            {word}
          </text>
          {/* Placement lives on the outer <g>; the CSS spin would overwrite a transform on the path itself. */}
          <g transform={`translate(${sx} 0)`}>
            <path
              d={STAR_PATH}
              fill={st.star}
              className={reduced ? undefined : "tape-star"}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />
          </g>
        </g>
      );
    });
    cursor = 0;
    return items;
  });

  return (
    <g aria-hidden>
      <defs>
        <clipPath id="hero-tape-clip">
          <path d="M0 1204.5L1920 986V1134.5L0 1354.5V1204.5Z" />
        </clipPath>
      </defs>
      <g clipPath="url(#hero-tape-clip)">
        <g transform={`translate(0 1279.5) rotate(${ANGLE})`}>
          <motion.g style={{ x }}>{copies}</motion.g>
        </g>
      </g>
    </g>
  );
}
