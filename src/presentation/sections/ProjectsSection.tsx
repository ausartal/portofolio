"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { projects } from "@/domain/content/portfolio";
import { projectLayouts, type Box } from "../layout/projectLayouts";

const QUOTE =
  "“An ever-growing collection of side projects, visual experiments, when everything needs a purpose. Some things are simply made out of curiosity, experimentation, and the joy of creating.”";

const STAR_PATH = "M0 -24 Q4.3 -4.3 24 0 Q4.3 4.3 0 24 Q-4.3 4.3 -24 0 Q-4.3 -4.3 0 -24Z";

const outline = { WebkitTextStroke: "2px #123DFF", color: "transparent" } as const;

/**
 * [04] MISCELLANEOUS MATTERS — a pinned horizontal gallery.
 *
 * The section is as tall as the track is long; a sticky viewport-high stage
 * stays put while vertical scroll slides the track sideways. The track opens
 * with the heading (solid line, outline line — the marquee's vocabulary),
 * runs the nine projects as numbered inventory slots in date order, and ends on
 * a hand-off to the contact section. A bottom HUD shows the active slot and a
 * year-by-year rail.
 *
 * With reduced motion the pin is dropped and the same cards wrap into a grid.
 */
export function ProjectsSection() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const dist = useMotionValue(2400);
  const [vh, setVh] = useState(800);
  const [travel, setTravel] = useState(2400);
  const [stops, setStops] = useState<number[]>([]);
  const [active, setActive] = useState(0);

  // Measure on resize only (ResizeObserver also fires once when it starts observing).
  useEffect(() => {
    if (reduced) return;
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      const vw = window.innerWidth;
      const d = Math.max(0, track.offsetWidth - vw);
      dist.set(d);
      setTravel(d);
      setVh(window.innerHeight);
      setStops(
        cardRefs.current.map((el) =>
          el && d > 0 ? Math.min(1, Math.max(0, (el.offsetLeft + el.offsetWidth / 2 - vw / 2) / d)) : 0,
        ),
      );
    };
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [reduced, dist]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform([scrollYProgress, dist], ([p, d]: number[]) => -p * d);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (!stops.length) return;
    let best = 0;
    stops.forEach((s, i) => {
      if (Math.abs(s - p) < Math.abs(stops[best] - p)) best = i;
    });
    setActive(best);
  });

  const cards = projects.map((project, i) => (
    <Slot
      key={project.id}
      project={project}
      index={i}
      total={projects.length}
      reduced={Boolean(reduced)}
      setRef={(el) => {
        cardRefs.current[i] = el;
      }}
    />
  ));

  return (
    <section
      ref={sectionRef}
      id="inventory"
      aria-labelledby="projects-heading"
      className="relative w-full bg-electric-pale"
      style={reduced ? undefined : { height: travel + vh }}
    >
      <div className={reduced ? "relative px-5 py-20 sm:px-10" : "sticky top-0 h-screen overflow-hidden"}>
        {/* Eyebrow */}
        <div
          className={`${
            reduced
              ? "mb-10"
              : "absolute inset-x-0 top-0 z-10 px-[clamp(1.25rem,3.958vw,4.75rem)] pt-[clamp(1.25rem,5vh,3.5rem)]"
          } flex items-baseline justify-between font-inter text-caption font-semibold`}
        >
          <span className="flex items-baseline gap-4">
            <span className="text-electric">[04]</span>
            <span className="uppercase tracking-[0.117em] text-muted">MISCELLANEOUS MATTERS</span>
          </span>
          {!reduced && (
            <span className="hidden tracking-[0.18em] text-muted sm:block">
              {String(projects.length).padStart(2, "0")} ITEMS · {projects[0].year}–
              {projects[projects.length - 1].year}
            </span>
          )}
        </div>

        <motion.div
          ref={trackRef}
          style={reduced ? undefined : { x }}
          className={
            reduced
              ? "flex flex-col gap-14"
              : "relative flex h-full w-max items-center gap-[clamp(1.5rem,3vw,3.5rem)] pb-[clamp(6rem,17vh,9.5rem)] pl-[clamp(1.25rem,3.958vw,4.75rem)] pr-[clamp(1.25rem,6vw,8rem)] pt-[clamp(3rem,8vh,5rem)] will-change-transform"
          }
        >
          {/* Heading panel */}
          <div className={reduced ? "" : "shrink-0 pr-[clamp(1rem,4vw,5rem)]"}>
            <h2
              id="projects-heading"
              className="font-afacad text-[clamp(3rem,min(8.2vw,17vh),9.5rem)] font-bold leading-[0.98] tracking-[0.1em] text-electric"
            >
              <span className="block">A LITTLE BIT</span>
              <span className="block">
                <span className="inline-block bg-acid px-[0.12em]" style={outline}>
                  OF EVERYTHING.
                </span>
              </span>
            </h2>
            <div className="mt-[clamp(1rem,3vh,2rem)] flex items-start gap-6">
              <svg aria-hidden viewBox="-26 -26 52 52" className="mt-1 size-9 shrink-0 text-ink">
                <path
                  d={STAR_PATH}
                  fill="currentColor"
                  className={reduced ? undefined : "tape-star"}
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                />
              </svg>
              <p className="max-w-[26rem] font-inter text-caption leading-[1.7] text-muted">{QUOTE}</p>
            </div>
            {!reduced && (
              <div
                data-cursor-label="SCROLL"
                className="mt-[clamp(1rem,3.5vh,2.5rem)] inline-flex items-center gap-3 py-2 font-inter text-[11px] font-semibold tracking-[0.2em] text-ink"
              >
                SCROLL
                <motion.span
                  aria-hidden
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-block"
                >
                  →
                </motion.span>
              </div>
            )}
          </div>

          <div className={reduced ? "grid gap-10 sm:grid-cols-2 lg:grid-cols-3" : "contents"}>{cards}</div>

          {/* Hand-off */}
          {!reduced && (
            <a
              href="#transmit"
              data-cursor-label="GO"
              className="group flex h-[min(62vh,34rem)] w-[clamp(18rem,40vw,38rem)] shrink-0 flex-col justify-between border-2 border-electric bg-electric p-[clamp(1.25rem,2.2vw,2.5rem)] text-white transition-[transform,box-shadow] duration-500 ease-quartz hover:-translate-x-1.5 hover:-translate-y-1.5 hover:shadow-[10px_10px_0_#1E1E1E]"
            >
              <span className="font-inter text-[11px] font-semibold tracking-[0.2em]">END OF INVENTORY</span>
              <span className="font-anton text-[clamp(2.25rem,4.4vw,4.5rem)] leading-[0.95] tracking-[0.04em]">
                GOT AN IDEA?
                <br />
                <span style={{ WebkitTextStroke: "2px #FFFFFF", color: "transparent" }}>LET’S BUILD IT.</span>
              </span>
              <span className="flex items-center justify-between font-inter text-[11px] font-semibold tracking-[0.2em]">
                TRANSMIT
                <span className="inline-block text-2xl transition-transform duration-500 ease-quartz group-hover:-translate-y-2 group-hover:translate-x-2">
                  ↗
                </span>
              </span>
            </a>
          )}
        </motion.div>

        {/* HUD */}
        {!reduced && (
          <div className="absolute inset-x-0 bottom-0 z-10 pl-[clamp(1.25rem,3.958vw,4.75rem)] pr-[clamp(6rem,9vw,10rem)] pb-[clamp(1rem,4vh,2.5rem)]">
            <div className="mb-3 flex items-end justify-between font-inter text-[11px] font-semibold tracking-[0.18em] text-ink">
              <span>
                <span className="font-anton text-3xl tracking-[0.04em] tabular-nums text-electric">
                  {String(active + 1).padStart(2, "0")}
                </span>{" "}
                / {String(projects.length).padStart(2, "0")}
              </span>
              <span className="hidden text-muted sm:block">{projects[active].name.split(" — ")[0]}</span>
            </div>
            <div className="relative h-[2px] bg-electric/20">
              <motion.div className="absolute inset-0 origin-left bg-electric" style={{ scaleX: scrollYProgress }} />
              {stops.map((s, i) => (
                <span
                  key={projects[i].id}
                  className={`absolute top-1/2 size-[9px] -translate-x-1/2 -translate-y-1/2 border-2 border-electric transition-colors duration-300 ${
                    i === active ? "bg-electric" : "bg-electric-pale"
                  }`}
                  style={{ left: `${s * 100}%` }}
                />
              ))}
            </div>
            <div className="relative mt-2 h-4 font-inter text-[10px] font-semibold tracking-[0.12em] text-muted">
              {stops.map((s, i) => (
                <span
                  key={projects[i].id}
                  className={`absolute -translate-x-1/2 transition-colors duration-300 ${i === active ? "text-electric" : ""}`}
                  style={{ left: `${s * 100}%` }}
                >
                  {projects[i].year}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/** Vector pieces (MedTrace wordmark) extend past the artwork clip; their ink bounds, in comp pixels. */
const EXTRA_BOX: Record<string, Box> = { medtrace: [269.2, 1809, 196.7, 51.1] };

/**
 * The artwork exactly as the comp shows it: each bitmap is cropped to the
 * comp's clip rect (SEAMEO and WORLD FORGE keep only their single mark), and
 * MedTrace gets its wordmark back. Everything is drawn in comp coordinates and
 * the SVG's viewBox is the art's own bounds plus a margin, so it scales to fit.
 */
function Artwork({ id, src, label }: { readonly id: string; readonly src: string; readonly label: string }) {
  const layout = projectLayouts.find((l) => l.id === id);
  if (!layout) return null;
  const [rx, ry, rw, rh] = layout.artwork.rect;
  const [dx, dy, dw, dh] = layout.artwork.disp;
  let [minX, minY, maxX, maxY] = [rx, ry, rx + rw, ry + rh];
  const extra = EXTRA_BOX[id];
  if (extra) {
    minX = Math.min(minX, extra[0]);
    minY = Math.min(minY, extra[1]);
    maxX = Math.max(maxX, extra[0] + extra[2]);
    maxY = Math.max(maxY, extra[1] + extra[3]);
  }
  const pad = Math.max(maxX - minX, (maxY - minY) * 1.6) * 0.14;
  const clipId = `art-clip-${id}`;
  return (
    <svg
      role="img"
      aria-label={label}
      viewBox={`${minX - pad} ${minY - pad} ${maxX - minX + pad * 2} ${maxY - minY + pad * 2}`}
      className="absolute inset-0 size-full select-none transition-transform duration-[900ms] ease-quartz group-hover:scale-[1.06]"
    >
      <defs>
        <clipPath id={clipId}>
          <rect x={rx} y={ry} width={rw} height={rh} />
        </clipPath>
      </defs>
      <image
        href={src}
        x={rx + dx}
        y={ry + dy}
        width={dw}
        height={dh}
        preserveAspectRatio="none"
        clipPath={`url(#${clipId})`}
      />
      {layout.extras.map((e) => (
        <path key={e.d.slice(0, 24)} d={e.d} fill={e.fill} />
      ))}
    </svg>
  );
}

function Slot({
  project,
  index,
  total,
  reduced,
  setRef,
}: {
  readonly project: (typeof projects)[number];
  readonly index: number;
  readonly total: number;
  readonly reduced: boolean;
  readonly setRef: (el: HTMLElement | null) => void;
}) {
  const name = project.name.split(" — ")[0];
  // Alternate slots sit lower so the row reads as a rhythm, not a ruler.
  const drop = !reduced && index % 2 === 1 ? "translate-y-[clamp(0.75rem,4.5vh,3rem)]" : "";

  return (
    <article ref={setRef} className={`group/slot relative shrink-0 ${reduced ? "" : "w-[clamp(17.5rem,min(27vw,50vh),27.5rem)]"} ${drop}`}>
      {/* Oversized outline year peeking over the card's top edge */}
      <span
        aria-hidden
        className={`pointer-events-none absolute bottom-full left-[-0.4rem] translate-y-[36%] select-none font-anton text-[clamp(4.5rem,7.2vw,6.75rem)] leading-none tracking-[0.04em] transition-opacity duration-500 text-transparent opacity-30 [-webkit-text-stroke:2px_#123DFF] group-hover/slot:opacity-100`}
      >
        {project.year}
      </span>
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="group relative flex flex-col border-2 border-electric bg-electric-pale transition-[transform,box-shadow] duration-500 ease-quartz hover:-translate-x-1.5 hover:-translate-y-1.5 hover:shadow-[10px_10px_0_#123DFF]"
      >
        {/* Slot strip */}
        <div className="flex items-center justify-between bg-electric px-4 py-2 text-white">
          <span className="font-anton text-[1.6rem] leading-none tracking-[0.06em] tabular-nums">
            {String(index + 1).padStart(2, "0")}
            <span className="ml-1 font-inter text-[10px] font-semibold tracking-[0.18em] opacity-60">
              /{String(total).padStart(2, "0")}
            </span>
          </span>
          <span className="font-inter text-[11px] font-semibold tracking-[0.18em]">{project.year}</span>
        </div>

        {/* Plate: blueprint dots; only a whisper of tint on hover so the logo stays the star */}
        <div
          className="relative aspect-[16/10] w-full overflow-hidden border-b-2 border-electric bg-white transition-colors duration-500 group-hover:bg-[#F1F4FF]"
          style={{
            backgroundImage: "radial-gradient(rgba(18,61,255,0.18) 1px, transparent 1.4px)",
            backgroundSize: "14px 14px",
          }}
        >
          <Artwork id={project.id} src={project.image} label={project.imageAlt} />
        </div>

        {/* Body */}
        <div className="flex flex-col gap-2.5 p-4 sm:p-5">
          <h3 className="font-line-seed text-[clamp(1.1rem,1.5vw,1.5rem)] font-bold uppercase leading-tight tracking-[0.12em] text-ink">
            {name}
          </h3>
          <p className="font-inter text-[10.5px] font-semibold uppercase leading-[1.5] tracking-[0.12em] text-muted">
            {project.discipline}
          </p>
          <p className="line-clamp-4 font-inter text-[13px] leading-[1.55] text-[#424242]">{project.summary}</p>
          <ul className="mt-1 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="inline-flex h-6 items-center border border-[#424242] px-2.5 font-inter text-[11px] leading-none text-[#424242] transition-colors duration-300 group-hover:border-electric group-hover:text-electric"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </article>
  );
}
