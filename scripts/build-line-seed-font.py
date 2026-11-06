"""Build the self-hosted LINE Seed JP woff2 files from the Google Fonts slices.

Google Fonts serves LINE Seed JP as ~124 unicode-range slices of 12 KB each. The
site only needs latin, latin-ext and the kana slice that carries the hero
tagline, so this script keeps those blocks and merges them into one file per
weight with fontTools.
"""

import re
import sys
import urllib.request
from pathlib import Path

from fontTools.merge import Merger
from fontTools.ttLib import TTFont

UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
)

# Characters the design renders in LINE Seed JP: the hero tagline
# 「パッションをカタチに。」plus ASCII for the navigation and card titles.
TAGLINE = "パッションをカタチに。"
KEEP = {ord(c) for c in TAGLINE} | set(range(0x20, 0x7F))

OUT = Path(__file__).resolve().parents[1] / "src" / "app" / "fonts"
WEIGHTS = {"400": "normal", "700": "bold"}


def fetch(url: str) -> bytes:
    request = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(request, timeout=120) as response:
        return response.read()


def codepoint_ranges(value: str) -> list[tuple[int, int]]:
    ranges = []
    for match in re.finditer(r"U\+([0-9A-Fa-f]+)(?:-([0-9A-Fa-f]+))?", value):
        low = int(match.group(1), 16)
        high = int(match.group(2), 16) if match.group(2) else low
        ranges.append((low, high))
    return ranges


def slices_for(weight: str) -> list[tuple[str, str]]:
    """Return (label, url) for every slice this site needs, per weight."""
    css = fetch(
        f"https://fonts.googleapis.com/css2?family=LINE+Seed+JP:wght@{weight}&display=swap"
    ).decode("utf-8")

    found = []
    for index, match in enumerate(re.finditer(r"@font-face \{(.*?)\}", css, re.S)):
        body = match.group(1)
        url = re.search(r"url\((https://[^)]+\.woff2)\)", body)
        unicode_range = re.search(r"unicode-range: ([^;]+);", body)
        if not url or not unicode_range:
            continue
        found.append((index, codepoint_ranges(unicode_range.group(1)), url.group(1)))

    return [
        (str(index), url)
        for index, ranges, url in found
        if _keep_slice(index, ranges)
    ]


def _keep_slice(index: int, ranges: list[tuple[int, int]]) -> bool:
    # The first four blocks are the named slices, in order:
    # cyrillic, greek-ext, latin-ext, latin.
    if index < 4:
        return index >= 2
    return any(any(low <= cp <= high for low, high in ranges) for cp in KEEP)


def main() -> int:
    OUT.mkdir(parents=True, exist_ok=True)
    for weight, style in WEIGHTS.items():
        kept = slices_for(weight)
        paths = []
        for label, url in kept:
            path = OUT / f".slice-{weight}-{label}.woff2"
            path.write_bytes(fetch(url))
            paths.append(path)

        merged = Merger().merge([str(path) for path in paths])
        merged.flavor = "woff2"
        target = OUT / f"line-seed-jp-{weight}.woff2"
        merged.save(str(target))
        for path in paths:
            path.unlink()

        font = TTFont(str(target))
        names = {
            (record.nameID, record.platformID): str(record)
            for record in font["name"].names
        }
        mapped = set()
        for table in font["cmap"].tables:
            mapped.update(table.cmap.keys())
        missing = [hex(cp) for cp in sorted(KEEP) if cp > 0x7F and cp not in mapped]

        print(
            f"{target.name}: {target.stat().st_size} B, {len(kept)} slices, "
            f"{len(font.getGlyphOrder())} glyphs, "
            f"{names.get((1, 3))!r} {names.get((2, 3))!r} ({style})"
        )
        print(f"  tagline glyphs present: {not missing} {missing}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
