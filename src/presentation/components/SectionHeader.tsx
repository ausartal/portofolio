import { Reveal } from "./Reveal";

interface SectionHeaderProps {
  readonly chapter: string;
  readonly label: string;
  readonly heading: string;
  readonly aside?: string;
  readonly tone?: "dark" | "light" | "electric" | "pale";
  readonly headingClassName?: string;
  readonly asideClassName?: string;
}

/**
 * The `[0N] — LABEL` eyebrow plus oversized heading and right-aligned aside.
 * Reusable header matching the exact Figma typography, width, and color pairings.
 */
export function SectionHeader({
  chapter,
  label,
  heading,
  aside,
  tone = "dark",
  headingClassName = "text-white",
  asideClassName = "max-w-[202px]",
}: SectionHeaderProps) {
  const chapterTone =
    tone === "electric"
      ? "text-chrome"
      : tone === "light"
        ? "text-electric-deep"
        : tone === "pale"
          ? "text-electric"
          : "text-chrome";

  const labelTone =
    tone === "electric"
      ? "text-chrome"
      : tone === "light"
        ? "text-ink-deep"
        : tone === "pale"
          ? "text-muted"
          : "text-chrome";

  const asideTone =
    tone === "electric"
      ? "text-chrome-alt"
      : tone === "light"
        ? "text-ink-deep"
        : tone === "pale"
          ? "text-muted"
          : "text-chrome-alt";

  return (
    <div className="measure">
      <Reveal>
        <div className="flex items-baseline gap-4">
          <span
            className={`font-inter text-caption font-semibold tracking-normal ${chapterTone}`}
          >
            {chapter}
          </span>
          <span
            className={`font-inter text-caption font-semibold uppercase tracking-[0.117em] ${labelTone}`}
          >
            {label}
          </span>
        </div>
      </Reveal>

      <div className="mt-1 flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-8">
        <Reveal delay={0.06}>
          <h2
            className={`font-afacad text-[clamp(2.75rem,5.73vw,5.75rem)] font-bold leading-[1] tracking-[0.1em] ${headingClassName}`}
          >
            {heading}
          </h2>
        </Reveal>

        {aside ? (
          <Reveal delay={0.12} direction="left">
            <p
              className={`font-inter text-caption leading-[1.58] md:text-right ${asideTone} ${asideClassName}`}
            >
              {aside}
            </p>
          </Reveal>
        ) : null}
      </div>
    </div>
  );
}
