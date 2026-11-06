import type { CSSProperties, ReactNode } from "react";

/** [x, y, width, height] in comp pixels. */
export type Box = readonly [x: number, y: number, w: number, h: number];

/**
 * Vertical metrics of each face, as fractions of the font size. `asc`/`desc` are
 * the line-box ascent and descent Chrome uses, `cap` the height of a flat capital.
 * They let `Ink` turn "the glyph outlines start at y = 109.5" (what the exported
 * comp tells us) into the CSS `top` that puts the first line's caps there.
 */
const FACES = {
  inter: { cls: "font-inter", asc: 0.969, desc: 0.241, cap: 0.734 },
  afacad: { cls: "font-afacad", asc: 1, desc: 0.333, cap: 0.625 },
  dmSans: { cls: "font-dm-sans", asc: 0.992, desc: 0.31, cap: 0.7 },
  anton: { cls: "font-anton", asc: 1.176, desc: 0.329, cap: 0.859 },
  lineSeed: { cls: "font-line-seed", asc: 0.932, desc: 0.168, cap: 0.766 },
} as const;

export type Face = keyof typeof FACES;

interface InkProps {
  /** Ink bounds of the text in the comp. Only x, y (and w for right alignment / wrapping) are used. */
  readonly box: Box;
  readonly face: Face;
  readonly size: number;
  /** Line height in px. */
  readonly lh: number;
  readonly weight?: 400 | 500 | 600 | 700;
  /** Letter spacing in em. */
  readonly ls?: number;
  readonly color: string;
  readonly align?: "left" | "right";
  /** Wrapping width in px. Omit for a single, non-wrapping line. */
  readonly width?: number;
  /** Comp position of the parent this text is placed inside; `box` stays in comp coordinates. */
  readonly origin?: readonly [x: number, y: number];
  /** Optical nudge in px, applied after the metric-based placement. */
  readonly dx?: number;
  readonly dy?: number;
  readonly upper?: boolean;
  readonly className?: string;
  readonly style?: CSSProperties;
  readonly as?: "p" | "span" | "h2" | "h3" | "h4" | "div";
  readonly children: ReactNode;
}

const WEIGHT = { 400: "font-normal", 500: "font-medium", 600: "font-semibold", 700: "font-bold" } as const;

/**
 * Absolutely positioned text whose *ink* lands on the comp's glyph bounds.
 * Must be rendered inside a `Stage`.
 */
export function Ink({
  box,
  face,
  size,
  lh,
  weight = 400,
  ls = 0,
  color,
  align = "left",
  width,
  origin = [0, 0],
  dx = 0,
  dy = 0,
  upper,
  className = "",
  style,
  as: Tag = "p",
  children,
}: InkProps) {
  const f = FACES[face];
  const top = box[1] - origin[1] - ((lh - (f.asc + f.desc) * size) / 2 + (f.asc - f.cap) * size) + dy;
  const pos: CSSProperties =
    align === "right"
      ? { right: 1920 - (box[0] + box[2]) - dx - origin[0], width }
      : { left: box[0] - origin[0] + dx, width };

  return (
    <Tag
      className={`absolute m-0 ${f.cls} ${WEIGHT[weight]} ${upper ? "uppercase" : ""} ${
        width === undefined ? "whitespace-nowrap" : ""
      } ${className}`}
      data-ink-box={process.env.NODE_ENV === "production" ? undefined : box.join(",")}
      style={{
        top,
        fontSize: size,
        lineHeight: `${lh}px`,
        letterSpacing: ls ? `${ls}em` : undefined,
        color,
        textAlign: align,
        ...pos,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
