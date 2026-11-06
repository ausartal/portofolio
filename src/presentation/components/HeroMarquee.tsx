const WORDS = ["SELECTED WORKS", "DIGITAL ARCHIVES", "BEHIND THE SCENES", "MISCELLANEOUS MATTERS", "THE NEXT CHAPTER"];
const TILE = 3900;
const ANGLE = -6.49; // slope of the acid tape in the hero comp: 218.5 / 1920

/**
 * Scrolling type that rides the yellow tape band of the hero. The group is
 * rotated to the band's own angle and clipped to its polygon, so the words
 * appear to run along the ribbon. Loops seamlessly: three tiles, shift by one.
 */
export function HeroMarquee() {
  const line = WORDS.join("   ✦   ") + "   ✦   ";
  return (
    <g aria-hidden>
      <defs>
        <clipPath id="hero-tape-clip">
          <path d="M0 1204.5L1920 986V1134.5L0 1354.5V1204.5Z" />
        </clipPath>
      </defs>
      <g clipPath="url(#hero-tape-clip)">
        <g transform={`translate(0 1279.5) rotate(${ANGLE})`}>
          <g className="hero-marquee">
            {[0, 1, 2].map((i) => (
              <text
                key={i}
                x={i * TILE}
                y={26}
                textLength={TILE}
                lengthAdjust="spacing"
                className="font-anton"
                fontSize={72}
                fill="#1E1E1E"
                style={{ letterSpacing: "0.06em", whiteSpace: "pre" }}
              >
                {line}
              </text>
            ))}
          </g>
        </g>
      </g>
    </g>
  );
}
