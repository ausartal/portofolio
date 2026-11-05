import { Reveal } from "./Reveal";

interface SectionHeaderProps {
  readonly chapter: string;
  readonly label: string;
  readonly heading: string;
  readonly aside?: string;
  readonly tone?: "dark" | "light" | "electric";
  readonly headingClassName?: string;
}

/**
 * The `[0N] — LABEL` eyebrow plus oversized heading and right-aligned aside.
 * One component for every section so the rhythm cannot drift between them.
 */
export function SectionHeader({
  chapter,
  label,
  heading,
  aside,
  tone = "dark",
  headingClassName = "text-white",
}: SectionHeaderProps) {
  const chapterTone =
    tone === "electric" ? "text-electric" : tone === "light" ? "text-electric-deep" : "text-chrome";

  const labelTone =
    tone === "electric"
      ? "text-chrome"
      : tone === "light"
        ? "text-ink-deep"
        : "text-chrome";

  const asideTone =
    tone === "electric"
      ? "text-chrome-alt"
      : tone === "light"
        ? "text-ink-deep"
        : "text-chrome-alt";

  return (
    <div className="measure">
      <Reveal>
        <div className="flex items-baseline gap-4">
          <span
            className={`font-[family-name:var(--font-inter)] text-caption font-semibold tracking-normal ${chapterTone}`}
          >
            {chapter}
          </span>
          <span
            className={`font-[family-name:var(--font-inter)] text-caption font-semibold uppercase tracking-[0.117em] ${labelTone}`}
          >
            {label}
          </span>
        </div>
      </Reveal>

      <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-12">
        <Reveal delay={0.06}>
          <h2
            className={`font-[family-name:var(--font-afacad)] text-[clamp(2.75rem,6vw,5.75rem)] font-bold leading-[1] tracking-[0.1em] ${headingClassName}`}
          >
            {heading}
          </h2>
        </Reveal>

        {aside ? (
          <Reveal delay={0.12} direction="left">
            <p
              className={`max-w-[22rem] font-[family-name:var(--font-inter)] text-caption leading-[1.6] md:text-right ${asideTone}`}
            >
              {aside}
            </p>
          </Reveal>
        ) : null}
      </div>
    </div>
  );
}
