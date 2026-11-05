import type { Metadata, Viewport } from "next";
import { Afacad, Anton, Inter, League_Spartan } from "next/font/google";
import "./globals.css";

/**
 * `LINE Seed JP` is not distributed through Google Fonts, so Inter — the body
 * face used across the rest of the document — carries the latin-friendly
 * headings, with the Japanese glyphs in the hero falling back to SYSTEM-UI.
 * See README for how to drop in the real LINE Seed JP files.
 */
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-inter",
});

const afacad = Afacad({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
  variable: "--font-afacad",
});

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-anton",
});

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-league-spartan",
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
  icons: {
    icon: "/favicon.ico",
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
      className={`${inter.variable} ${afacad.variable} ${anton.variable} ${leagueSpartan.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
