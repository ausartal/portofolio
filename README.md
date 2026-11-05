<div align="center">

# Bound to Canvas

**Personal portfolio of Ahmad Nab'al Falah** — a multidisciplinary creative working across
illustration, visual design, game development, and software engineering.

[![Next.js](https://img.shields.io/badge/Next.js-16.4-000?logo=next.js&logoColor=fff)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.3-087EA4?logo=react&logoColor=fff)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=fff)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?logo=tailwindcss&logoColor=fff)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-123DFF.svg)](./LICENSE)

</div>

---

## Overview

A single-page portfolio rendered as a continuous scroll: an illustrated hero, selected works,
a digital archive, a project grid, a biography, and a closing contact block. The layout,
typography, palette, and copy are implemented directly from the Figma source document
**"Scripta"** — nothing is approximated.

The page is fully static. Every route is prerendered at build time; there is no server
dependency, no database, and no runtime data fetching.

## Tech Stack

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) | Static output, file-based metadata, built-in font optimisation |
| UI | React 19 | Server Components by default, client boundary only where motion is needed |
| Language | TypeScript (strict) | Content types are modelled, so a copy change cannot silently break a section |
| Styling | Tailwind CSS 4 | CSS-first `@theme` tokens — the design system lives in CSS, not a config file |
| Animation | Motion (`motion/react`) | Declarative scroll-linked transforms and viewport reveals |
| Scrolling | Lenis | One shared rAF loop for momentum scrolling instead of per-component listeners |
| Fonts | `next/font/google` | Self-hosted at build time: no render-blocking request to Google |

## Architecture

The codebase is layered. Dependencies point inward — the domain knows nothing about React.

```
src/
├── app/                              # Next.js App Router (routing + document shell)
│   ├── layout.tsx                    # Font loading, metadata, <html> wiring
│   ├── page.tsx                      # Composition root — assembles the six sections
│   └── globals.css                   # Design tokens (@theme), base layer, custom utilities
│
├── domain/                           # Pure data. No framework imports.
│   └── content/
│       ├── entities.ts               # Types: Project, SelectedWork, NavigationItem, ...
│       └── portfolio.ts              # All copy, transcribed verbatim from Figma
│
└── presentation/                     # Everything that renders
    ├── components/                   # Reusable primitives
    │   ├── Reveal.tsx                # Viewport-triggered entrance wrapper
    │   ├── Motion.tsx                # SplitHeading (clip reveal), Odometer (count-up)
    │   ├── SectionHeader.tsx         # Shared `[0N] — LABEL` + heading + aside rhythm
    │   ├── Tag.tsx                   # Hairline pill
    │   ├── Icons.tsx                 # Single-path social marks, currentColor
    │   └── SiteFooter.tsx            # Server-rendered footer (see Cache Components note)
    ├── sections/                     # One file per Figma frame
    │   ├── HeroSection.tsx           # [—]  BOUND TO / CANVAS
    │   ├── SelectedWorksSection.tsx  # [01] BEYOND THE SURFACE
    │   ├── DigitalArchiveSection.tsx # [02] UNBOUND BY RESOLUTION
    │   ├── ProjectsSection.tsx       # [06] A LITTLE BIT OF EVERYTHING.
    │   ├── BiographySection.tsx      # [04] BEHIND THE SCENES
    │   └── ContactSection.tsx        # [07] THE NEXT CHAPTER
    └── hooks/
        └── SmoothScroll.tsx          # Lenis mount + anchor interception
```

### Why content is separated from presentation

Every user-facing string lives in `src/domain/content/portfolio.ts` and is transcribed
character-for-character from the Figma document — including typographic apostrophes
(`U+2019`), em dashes, and the Japanese hero tagline. Section components receive that data
and do nothing but render it. Two consequences:

- **Copy is auditable.** `scripts/audit-copy.py` asserts every expected string is present in
  the source tree, so a refactor cannot quietly drop a headline.
- **Layout changes cannot corrupt content.** Restyling a section touches only the section file.

## Design System

Tokens are declared once in `src/app/globals.css` under Tailwind 4's `@theme` directive. Values
were sampled from the running Figma document rather than eyeballed.

### Palette

| Token | Value | Role |
| --- | --- | --- |
| `--color-canvas` | `#EEF1FA` | Hero backdrop |
| `--color-slate-deep` | `#454545` | `[01]` section field, building silhouettes |
| `--color-slate-dark` | `#202020` | Silhouette shadow, project card wells |
| `--color-electric` | `#123DFF` | Primary accent, links, headings |
| `--color-electric-deep` | `#022BD3` | `[02]` section field |
| `--color-electric-pale` | `#E8ECFF` | `[06]` projects field |
| `--color-acid` | `#EAFF45` | Call to action, hero carousel band |
| `--color-ink` | `#1E1E1E` | Primary text on light fields |
| `--color-muted` | `#666B78` | Secondary body copy |
| `--color-chrome` | `#C6C6C6` | Eyebrows and captions on dark fields |

### Typography

Four families, matching the Figma document. Loaded through `next/font`, so each one is
self-hosted and served from the same origin with no layout shift.

| Family | Usage | Source |
| --- | --- | --- |
| **Afacad** 700 | Oversized section headings, hero display type | Google Fonts |
| **Anton** 400 | Contact headline | Google Fonts |
| **Inter** 400 / 600 | Body copy, navigation, eyebrows, metadata | Google Fonts |
| **League Spartan** 600 / 700 | Project logotypes | Google Fonts |
| **LINE Seed JP** 400 / 700 | Japanese hero tagline, section titles | *Not on Google Fonts* |

Sizes are declared as named steps (`--text-display`, `--text-mega`, `--text-hero`,
`--text-chapter`, `--text-title`, `--text-body`, `--text-caption`, `--text-micro`) with
line-height and letter-spacing baked in, so vertical rhythm stays consistent across sections.

### Motion

Every animation is wrapped in a `prefers-reduced-motion` guard via Motion's
`useReducedMotion()`. When a visitor has reduced motion enabled, parallax collapses to a
static transform, reveals render immediately, and `SmoothScroll` never mounts Lenis — the
page falls back to native scrolling.

Easing is intentionally restrained: `cubic-bezier(0.16, 1, 0.3, 1)` for entrances and
`cubic-bezier(0.22, 1, 0.36, 1)` for hover transitions. Text settles rather than bounces.

## Getting Started

Requires **Node.js 20.9+**.

```bash
git clone https://github.com/ausartal/portofolio-website.git
cd portofolio-website
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Produce an optimised production build |
| `npm run start` | Serve the production build locally |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run `tsc --noEmit` across the project |
| `npm run audit:copy` | Assert every Figma string is present in the source |

## Assets

The fifteen source images were exported from Figma at 2× and renamed to describe what they
contain rather than their layer ID.

```
public/assets/
├── hero-illustration-left.png     2426×1990   Hero: left illustration cluster
├── hero-illustration-right.png    2572×2676   Hero: right illustration cluster
├── hero-character.png             2080×2696   Hero: character subject
├── archive-showcase.png           2038×1216   [02] digital archive showcase
├── about-portrait.png              832×1114   [04] portrait plate
├── contact-visual.png             1824×2442   [07] abstract visual field
└── projects/
    ├── project-akurat.png          846×210
    ├── project-extract.png         548×548
    ├── project-medtrace.png        294×288
    ├── project-pensfest.png        454×340
    ├── project-worldforge.png      546×566
    ├── project-nous.png            490×490
    ├── project-cornec.png          506×504
    ├── project-seameo.png          394×404
    └── project-mdawebtoon.png      394×392
```

All raster assets are served through `next/image`, which handles resizing, modern format
negotiation, and lazy loading below the fold. The three hero images are marked `priority`
so they are fetched eagerly.

## Deployment

The build output is fully static, so any static host works.

<details>
<summary><b>Vercel</b></summary>

1. Import the repository at [vercel.com/new](https://vercel.com/new).
2. Accept the detected defaults (`next build`).
3. Deploy. No environment variables are required.

</details>

<details>
<summary><b>GitHub Pages</b></summary>

Use `output: "export"` in `next.config.ts`, then publish the generated `out/` directory.
Add a `.nojekyll` file so Next.js asset folders are not stripped.

</details>

<details>
<summary><b>Any static host</b></summary>

Run `npm run build` and serve the resulting `.next` directory with a Node runtime, or switch
to `output: "export"` and upload `out/` to object storage behind a CDN.

</details>

## Notes and Known Constraints

**`LINE Seed JP` is not available on Google Fonts.** The Japanese hero tagline
(`パッションをカタチに。`) currently falls back to system UI fonts, which vary by platform. To
match Figma exactly, place the font files under `src/app/fonts/` and switch that slot to
`next/font/local`.

**Server Components and `Date`.** The footer's copyright year is resolved at build time. Under
Cache Components, Next.js 16 rejects an uncached `new Date()` during prerender, so `SiteFooter`
is an async Server Component carrying a `use cache` directive, and it receives its parent
through normal composition rather than being imported across a client boundary.

**Turbopack and Tailwind.** The project uses `@tailwindcss/turbopack` rather than
`@tailwindcss/postcss`, configured through `next.config.ts`. This is the Next.js 16 default for
projects scaffolded with Turbopack enabled.

**`font-[family-name:var(--font-*)]` utilities.** Font families are referenced through
arbitrary-value utilities rather than named `font-*` classes. Declaring `--font-afacad` inside
`@theme` would shadow the CSS variable that `next/font` generates, resolving it against itself
and silently falling back to the body font.

## License

Released under the [MIT License](./LICENSE).

The written content, illustrations, and photography are the property of Ahmad Nab'al Falah and
are not covered by the MIT grant.

---

<div align="center">
<sub>Built by Ahmad Nab'al Falah — a creative practice without fixed boundaries.</sub>
</div>
