"""Semantic audit: every string transcribed from Figma must exist in the source."""

import re
import sys

EXPECTED = [
    "パッションをカタチに。", "BOUND TO", "CANVAS", "TRANSMIT", "INVENTORY", "QUEST",
    "CHARACTER", "TAVERN",
    "[01]", "SELECTED WORKS", "BEYOND THE SURFACE",
    "Personal explorations, untouched by client briefs. Crafted to test new ideas and direction",
    "THE LAST FREQUENCY", "ALMOST THERE", "Character development", "Hope & resilience", "2019",
    "Emotional storytelling", "Symbolism & metaphors", "2024",
    "[02]", "DIGITAL ARCHIVES", "UNBOUND BY RESOLUTION", "THE EDGELESS CANVAS.",
    "Call To Action", "Exploration Focus",
    "Interactive prototypes, new visual directions, and uncompromising digital identities.",
    "[04]", "BEHIND THE SCENES", "AHMAD NAB\u2019AL FALAH", "CURIOUS BY NATURE",
    "CREATIVE BY PRACTICE",
    "Visual storytelling", "Creative technology", "Architecture", "Programming",
    "Music & Sound", "World building",
    "[06]", "MISCELLANEOUS MATTERS", "A LITTLE BIT OF EVERYTHING.",
    "AKURAT \u2014 2026", "EXTRACT \u2014 2026", "MEDTRACE \u2014 2025", "PENSFEST \u2014 2024",
    "WORLD FORGE \u2014 2023", "NOUS \u2014 2023", "CORNECT \u2014 2022", "SEAMEO \u2014 2021",
    "MDA Webtoon \u2014 2020",
    "EDTECH & INTELLIGENT ASSESSMENT SYSTEM",
    "FINANCIAL TECHNOLOGY & PRODUCT DEVELOPMENT",
    "HEALTHCARE TECHNOLOGY & DIGITAL IDENTITY",
    "EVENT BRANDING & VISUAL IDENTITY",
    "GAME DEVELOPMENT & WORLD BUILDING",
    "VISUAL IDENTITY & CREATIVE DESIGN",
    "PROJECT IDENTITY & DIGITAL DESIGN",
    "VIRTUAL EXHIBITION & SPATIAL DESIGN",
    "DIGITAL ILLUSTRATION & COMIC PRODUCTION",
    "Product Design", "Full-Stack Development", "Adaptive Assessment", "FinTech", "Sas",
    "Healthcare", "Mobile Development", "Website Development", "Event Managing",
    "Logo Design", "Graphic Design", "Game Development", "World Building",
    "Environment Design", "Brand Identity", "Visual Design", "Lead Artist",
    "Spatial Design", "3D Enviroment", "2D Illustration", "Webtoon", "Visual Storytelling",
    "[07]", "THE NEXT CHAPTER", "Let's Work Together", "GOT SOMETHING IN MIND?",
    "LET'S MAKE IT HAPPEN", "HAVE A PROJECT TO DISCUSS?",
    "Whether you have a detailed brief or just a rough idea, feel free to reach out.",
    "TELL ME ABOUT IT.", "ahmadnabalfalah@gmail.com",
    "For inquiries, collaborations, or just a good conversation, you can reach me at:",
]

ESCAPE_RE = re.compile(r"\\u([0-9a-fA-F]{4})")


def unescape(text: str) -> str:
    return ESCAPE_RE.sub(lambda m: chr(int(m.group(1), 16)), text)


def main() -> int:
    roots = sys.argv[1:] or ["src"]
    chunks = []
    for root in roots:
        import pathlib

        base = pathlib.Path(root)
        files = sorted(base.rglob("*.ts")) + sorted(base.rglob("*.tsx"))
        for path in files:
            chunks.append(path.read_text(encoding="utf-8"))

    source = "\n".join(chunks)
    haystack = unescape(source)

    missing = [e for e in EXPECTED if e not in haystack and e not in source]

    print(f"scanned roots    : {', '.join(roots)}")
    print(f"expected strings : {len(EXPECTED)}")
    print(f"missing          : {len(missing)}")
    for item in missing:
        print("   MISSING ->", repr(item))

    projects = re.findall(r'id: "([a-z0-9-]+)"', source)
    print(f"\nproject ids      : {len(projects)}")
    print("  ", projects)

    return 1 if missing else 0


if __name__ == "__main__":
    raise SystemExit(main())
