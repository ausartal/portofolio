"use client";

import type { ReactNode } from "react";

interface StageProps {
  /** Comp height in design pixels (comp width is always 1920). */
  readonly height: number;
  /** Tailwind/utility classes applied to the scaling wrapper. */
  readonly className?: string;
  readonly children: ReactNode;
}

/**
 * Reproduces a Figma comp exactly.
 *
 * Every comp in this project is authored on a 1920 px wide canvas. Any layout
 * built from percentage widths, `clamp()` steps or viewport units drifts away
 * from the comp as soon as the viewport is not exactly 1920 px — which is
 * always, once a scrollbar or a different monitor is involved.
 *
 * A Stage instead pins its children to a literal 1920 x `height` pixel box and
 * scales that box to the available width with a CSS `transform`. Because the
 * box is measured in design pixels, every child can use the comp's own numbers
 * verbatim (x: 72, width: 1776, font-size: 92px, …), so proportions, positions
 * and gaps stay identical at any viewport width, and the whole block scales
 * down as one piece instead of reflowing.
 *
 * `--stage-scale` is exposed so descendants can counter-scale optical details
 * (hairlines, letter-spacing) if they ever need to.
 */
export function Stage({ height, className = "", children }: StageProps) {
  return (
    <div className={`stage ${className}`} style={{ "--stage-h": height } as React.CSSProperties}>
      <div className="stage__frame">
        <div className="stage__inner">{children}</div>
      </div>
    </div>
  );
}
