import type {
  CategoryTag,
  NavigationItem,
  Project,
  SelectedWork,
  SocialLink,
} from "./entities";

/**
 * Every string in this file is transcribed verbatim from the Figma document
 * `Scripta`, node 386:668 ("Portofolio"). Copy is treated as data so the
 * presentation layer stays a pure rendering concern.
 */

export const site = {
  name: "Ahmad Nab'al Falah",
  shortName: "Ausartal",
  role: "Multidisciplinary Creative",
  email: "ahmadnabalfalah@gmail.com",
  tagline: "パッションをカタチに。",
  heroLineOne: "BOUND TO",
  heroLineTwo: "CANVAS",
  description:
    "A creative practice without fixed boundaries — illustration, visual design, game development, and software engineering.",
} as const;

export const navigation: readonly NavigationItem[] = [
  { id: "tavern", label: "TAVERN", href: "#tavern" },
  { id: "quest", label: "QUEST", href: "#quest" },
  { id: "character", label: "CHARACTER", href: "#character" },
  { id: "inventory", label: "INVENTORY", href: "#inventory" },
  { id: "transmit", label: "TRANSMIT", href: "#transmit" },
];

export const socials: readonly SocialLink[] = [
  { label: "Github", href: "https://github.com/ausartal" },
  { label: "Instagram", href: "https://www.instagram.com/aal.naf/" },
  { label: "Discord", href: "https://discord.gg/n7kQhHZeq" },
  { label: "Linkedin", href: "https://www.linkedin.com/in/ahmad-nab-al-falah-50271a2aa/" },
];

export const selectedWorks: readonly SelectedWork[] = [
  {
    id: "last-frequency",
    title: "THE LAST FREQUENCY",
    statement:
      "Frequency becomes the symbol of Liam's connection with his father, as well as the village's only link to the outside world. The word 'last' illustrates a situation where hope is almost gone.",
    tags: ["Emotional storytelling", "Symbolism & metaphors"],
    year: "2024",
    image: "/assets/selected-last-frequency.png",
    imageAlt: "The Last Frequency artwork",
  },
  {
    id: "almost-there",
    title: "ALMOST THERE",
    statement:
      "Almost There symbolizes the struggle to reclaim one's life. The quote \u201Cfairy tales can come true, it all depends on you\u201D emphasizes that miracles are not just awaited, but created by your own hands.",
    tags: ["Character development", "Hope & resilience"],
    year: "2019",
    image: "/assets/selected-almost-there.png",
    imageAlt: "Almost There artwork",
  },
];

export const digitalArchive = {
  chapter: "[02]",
  label: "DIGITAL ARCHIVES",
  heading: "UNBOUND BY RESOLUTION",
  aside: "\u201CWithin every building made with pride, the architect is trapped inside.\u201D",
  project: {
    title: "THE EDGELESS CANVAS.",
    paragraphs: [
      "When imagination is no longer confined by screen dimensions. This segment is a pure digital archive\u2014a playground where raw ideas are translated into pixels. No strict rules, just bold visual exploration.",
      "Building worlds beyond physical constraints. Here, the architect takes full control. These independent works refuse to be restricted by resolution or rigid client briefs, proving that digital design can have a soul.",
    ],
    ctaLabel: "Call To Action",
    focusLabel: "Exploration Focus",
    focus:
      "Interactive prototypes, new visual directions, and uncompromising digital identities.",
    image: "/assets/archive-showcase.png",
  },
} as const;

export const biography = {
  chapter: "[04]",
  label: "BEHIND THE SCENES",
  heading: "AHMAD NAB\u2019AL FALAH",
  aside: "\u201CA Creative Practice Without Fixed Boundaries\u201D",
  intro:
    "I explore ideas through different disciplines, finding connections between art, technology, and the spaces in between.",
  body: [
    "I'm a multidisciplinary creative with a background in illustration, visual design, game development, and software engineering. Over the years, I've found myself drawn to different disciplines, constantly exploring unfamiliar territories, experimenting with new mediums, and discovering unexpected connections between art and technology. I enjoy approaching ideas from different perspectives, breaking them down, and turning abstract thoughts into something tangible, meaningful, and thoughtfully crafted.",
    "From illustrated worlds and interactive experiences to digital products and software systems, my work moves between creativity and technical problem-solving. I believe good work is built through curiosity, experimentation, and thoughtful construction, where a strong concept meets careful execution and an appreciation for even the smallest details. For me, the process is just as important as the outcome \u2014 every sketch, prototype, revision, and unexpected detour is an opportunity to learn something new.",
    "Away from the screen, you'll probably find me exploring visual culture, collecting references, browsing through books, sketching spontaneous ideas, or observing the little details of everyday life. I'm naturally curious about how things are made, how people experience them, and how seemingly unrelated ideas can come together to create something entirely new. There's always another subject to explore, another skill to develop, and another rabbit hole worth getting lost in.",
  ],
  portrait: "/assets/design/behind-the-scenes-portrait.png",
} as const;

export const about = {
  chapter: "[05]",
  label: "THE PRACTITIONER",
  heading: "CURIOUS BY NATURE\nCREATIVE BY PRACTICE",
  aside: "\u201CA Creative Practice Without Fixed Boundaries\u201D",
} as const;

export const categoryTags: readonly CategoryTag[] = [
  { label: "Visual storytelling" },
  { label: "World building" },
  { label: "Creative technology" },
  { label: "Architecture" },
  { label: "Programming" },
  { label: "Music & Sound" },
];

export const projects: readonly Project[] = [
  {
    id: "mda-webtoon",
    slug: "mda-webtoon",
    name: "MDA Webtoon \u2014 2020",
    year: "2020",
    discipline: "DIGITAL ILLUSTRATION & COMIC PRODUCTION",
    summary:
      "Contributed to digital comic and webtoon production through 2D illustration and visual development. Focused on translating narrative concepts into expressive visuals that support character identity and storytelling.",
    tags: ["2D Illustration", "Webtoon", "Visual Storytelling"],
    image: "/assets/projects/project-mdawebtoon.png",
    imageAlt: "MDA Webtoon illustration panel",
  },
  {
    id: "seameo",
    slug: "seameo",
    name: "SEAMEO \u2014 2021",
    year: "2021",
    discipline: "VIRTUAL EXHIBITION & SPATIAL DESIGN",
    summary:
      "Contributed to the development of an international virtual exhibition as Lead Artist and Structural Construction. Oversaw visual direction and helped build immersive digital exhibition spaces.",
    tags: ["Lead Artist", "Spatial Design", "3D Enviroment"],
    image: "/assets/projects/project-seameo.png",
    imageAlt: "SEAMEO virtual exhibition space",
  },
  {
    id: "cornec",
    slug: "cornec",
    name: "CORNECT \u2014 2022",
    year: "2022",
    discipline: "PROJECT IDENTITY & DIGITAL DESIGN",
    summary:
      "An exploration of visual identity and digital product design, bringing together a distinctive visual language and a cohesive design direction.",
    tags: ["Brand Identity", "Graphic Design"],
    image: "/assets/projects/project-cornec.png",
    imageAlt: "Cornec identity mark",
  },
  {
    id: "nous",
    slug: "nous",
    name: "NOUS \u2014 2023",
    year: "2023",
    discipline: "VISUAL IDENTITY & CREATIVE DESIGN",
    summary:
      "A visual identity exploration centered around simplicity, geometry, and visual recognition. Developed a distinctive graphic mark to establish a cohesive and memorable brand presence.",
    tags: ["Logo Design", "Brand Identity", "Visual Design"],
    image: "/assets/projects/project-nous.png",
    imageAlt: "Nous geometric brand mark",
  },
  {
    id: "world-forge",
    slug: "world-forge",
    name: "WORLD FORGE \u2014 2023",
    year: "2023",
    discipline: "GAME DEVELOPMENT & WORLD BUILDING",
    summary:
      "An exploration of digital world creation and interactive environment design. Focused on shaping immersive spaces through visual composition, environmental elements, and creative world-building.",
    tags: ["Game Development", "World Building", "Environment Design"],
    image: "/assets/projects/project-worldforge.png",
    imageAlt: "World Forge environment study",
  },
  {
    id: "pensfest",
    slug: "pensfest",
    name: "PENSFEST \u2014 2024",
    year: "2024",
    discipline: "EVENT BRANDING & VISUAL IDENTITY",
    summary:
      "A visual identity concept for PENSFEST, translating the spirit of creativity, collaboration, and celebration into a recognizable visual system. Designed to establish a cohesive identity across event communications.",
    tags: ["Event Managing", "Logo Design", "Graphic Design"],
    image: "/assets/projects/project-pensfest.png",
    imageAlt: "PENSFEST event branding",
  },
  {
    id: "medtrace",
    slug: "medtrace",
    name: "MEDTRACE \u2014 2025",
    year: "2025",
    discipline: "HEALTHCARE TECHNOLOGY & DIGITAL IDENTITY",
    summary:
      "A healthcare technology concept focused on connecting medical information through a clear and recognizable digital identity. The visual direction combines medical symbolism with a modern technology-oriented approach.",
    tags: ["Healthcare", "Mobile Development", "Website Development"],
    image: "/assets/projects/project-medtrace.png",
    imageAlt: "MedTrace medical care tracker identity",
  },
  {
    id: "extract",
    slug: "extract",
    name: "EXTRACT \u2014 2026",
    year: "2026",
    discipline: "FINANCIAL TECHNOLOGY & PRODUCT DEVELOPMENT",
    summary:
      "An enterprise expense management platform designed to streamline reimbursement workflows and financial operations. Integrates expense tracking, OCR-powered document processing, policy enforcement, approval management, and financial oversight into one connected ecosystem.",
    tags: ["Product Design", "Full-Stack Development", "FinTech", "Sas"],
    image: "/assets/projects/project-extract.png",
    imageAlt: "Extract product mark",
  },
  {
    id: "akurat",
    slug: "akurat",
    name: "AKURAT \u2014 2026",
    year: "2026",
    discipline: "EDTECH & INTELLIGENT ASSESSMENT SYSTEM",
    summary:
      "An intelligent chemistry learning and assessment platform designed to enhance educational experiences through adaptive testing, competency tracking, and data-driven learning analytics. Connects students, educators, and administrators through an integrated digital learning ecosystem.",
    tags: ["Product Design", "Full-Stack Development", "Adaptive Assessment"],
    image: "/assets/projects/project-akurat.png",
    imageAlt: "Akurat product logotype",
  },
];

export const contact = {
  chapter: "[05]",
  label: "THE NEXT CHAPTER",
  aside: "Let's Work Together",
  headingLead: "GOT SOMETHING IN MIND?",
  headingTail: "LET'S MAKE IT HAPPEN",
  body: [
    "Have a project in mind, an idea worth exploring, or simply looking for someone to bring your vision to life? I'm always open to new opportunities, creative collaborations, and interesting challenges.",
    "Whether it's graphic design, illustration, web design, or game development, I'd love to hear what you're working on. Let's turn a good idea into something worth experiencing.",
  ],
  prompt: "HAVE A PROJECT TO DISCUSS?",
  promptBody: "Whether you have a detailed brief or just a rough idea, feel free to reach out.",
  action: "TELL ME ABOUT IT.",
  emailPrompt:
    "For inquiries, collaborations, or just a good conversation, you can reach me at:",
  visual: "/assets/contact-visual.png",
} as const;

export const sectionNumbers = {
  selectedWorks: "[01]",
  digitalArchives: "[02]",
  capabilities: "[03]",
  biography: "[04]",
  about: "[05]",
  miscellaneous: "[06]",
  contact: "[07]",
} as const;
