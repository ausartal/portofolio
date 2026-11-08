import type { Metadata, Viewport } from "next";
import { Afacad, Afacad_Flux, Anton, DM_Sans, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

/**
 * The six families the design actually uses, each loaded with only the weights
 * its text nodes ask for:
 *
 *   Afacad Flux  700        hero display     200 / 266.67
 *   Afacad       700        section headings  92 / 92
 *   DM Sans      400        [02] title        90 / 84
 *   Anton        400        closing headline  90 / 94.5 and 76 / 79.8
 *   LINE Seed JP 400 / 700  tagline, navigation, card titles
 *   Inter        400 / 600  every remaining block of copy
 *
 * The `-face` suffix keeps these family variables clear of the theme keys in
 * `globals.css`, which are inline aliases and would otherwise resolve against
 * themselves.
 */
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-inter-face",
});

const afacad = Afacad({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
  variable: "--font-afacad-face",
});

const afacadFlux = Afacad_Flux({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
  variable: "--font-afacad-flux-face",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-dm-sans-face",
});

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-anton-face",
});

/**
 * LINE Seed JP is self-hosted. The Google Fonts build of this face is cut into
 * roughly 120 unicode-range slices of 12 KB each for full kanji coverage, which
 * turns every build into hundreds of network fetches and makes the build fail
 * whenever fonts.gstatic.com times out. The files here are the latin and
 * latin-ext slices for both weights, plus the japanese slice that carries the
 * hero tagline (`パッションをカタチに。`), merged into one file per weight.
 *
 * Source: Google Fonts, LINE Seed JP, SIL Open Font License 1.1
 * (see ./fonts/OFL.txt).
 */
const lineSeed = localFont({
  src: [
    { path: "./fonts/line-seed-jp-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/line-seed-jp-700.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  preload: false,
  variable: "--font-line-seed-face",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ausartal.github.io"),
  title: {
    default: "Ahmad Nab'al Falah — Bound to Canvas",
    template: "%s — Ahmad Nab'al Falah",
  },
  description:
    "Portfolio of Ahmad Nab'al Falah: a multidisciplinary creative working across illustration, visual design, game development, and software engineering.",
  keywords: [
    "Ahmad Nab'al Falah",
    "Ausartal",
    "portfolio",
    "illustration",
    "visual design",
    "game development",
    "software engineering",
  ],
  authors: [{ name: "Ahmad Nab'al Falah", url: "https://github.com/ausartal" }],
  creator: "Ahmad Nab'al Falah",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Ahmad Nab'al Falah — Bound to Canvas",
    description:
      "A creative practice without fixed boundaries. Selected works, digital archives, and miscellaneous matters.",
    siteName: "Ahmad Nab'al Falah",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmad Nab'al Falah — Bound to Canvas",
    description: "A creative practice without fixed boundaries.",
  },
};

export const viewport: Viewport = {
  themeColor: "#EEF1FA",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${afacad.variable} ${afacadFlux.variable} ${anton.variable} ${dmSans.variable} ${lineSeed.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
