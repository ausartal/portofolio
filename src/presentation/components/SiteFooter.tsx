"use cache";

import { site, socials } from "@/domain/content/portfolio";
import { Ink, type Box } from "./Ink";

/**
 * Footer of comp `[05]-Page.svg`: a 1 px black rule from x 72 to 1867 at
 * y 1251.5, with the copyright on the left and the four links on the right.
 * Rendered inside the contact Stage, so every box is in comp pixels.
 */
const LINK_BOXES: Readonly<Record<string, Box>> = {
  Github: [1481.6, 1271.8, 45.4, 9.3],
  Instagram: [1580.9, 1272.3, 68, 11.3],
  Discord: [1702.9, 1271.8, 51.4, 9.3],
  Linkedin: [1808.9, 1271.8, 57.1, 9.3],
};

export async function SiteFooter() {
  const year = new Date().getFullYear();
  const name = site.name.replace("'", "’");

  return (
    <footer>
      <span className="absolute bg-black" style={{ left: 72, top: 1251, width: 1795, height: 1 }} />
      <Ink
        box={[73, 1271.8, 350.3, 11.7]}
        face="inter"
        size={12}
        lh={19.2}
        weight={600}
        ls={0.114}
        color="#666B78"
        dx={-1}
        dy={1}
      >
        {`© ${year} / ${name}. All rights reserved.`}
      </Ink>
      <ul>
        {socials.map((social) => {
          const box = LINK_BOXES[social.label];
          return (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                className="absolute transition-colors duration-200 hover:text-[#123DFF]"
                style={{ left: box[0] - 6, top: box[1] - 9, width: box[2] + 12, height: 28, color: "#666B78" }}
              >
                <Ink
                  as="span"
                  box={box}
                  origin={[box[0] - 6, box[1] - 9]}
                  face="inter"
                  size={12}
                  lh={19.2}
                  weight={600}
                  ls={0.105}
                  dx={-0.5}
                  dy={1}
                  color="currentColor"
                >
                  {social.label}
                </Ink>
              </a>
            </li>
          );
        })}
      </ul>
    </footer>
  );
}
