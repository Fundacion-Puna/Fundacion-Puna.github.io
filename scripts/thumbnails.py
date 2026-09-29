#!/usr/bin/env python3
"""Build the archive thumbnails and the media manifest.

Run from the repository root whenever a photo is added to `static/` or a PDF
to `static/docs/`:

    python3 scripts/thumbnails.py

For every file it writes a small WebP preview to `static/thumbs/` (same path,
`.webp` extension) and records its oriented size in `src/lib/media.json`. The
archive grid reads that manifest to reserve each card's height before the
image arrives, so the masonry columns never jump while scrolling.

Existing thumbnails are only rebuilt when their source is newer.

Requires Pillow. PDF covers also need poppler (`pdftoppm`, `pdfinfo`); without
it PDFs are still listed, just without a cover.
"""

import json
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
STATIC = ROOT / "static"
THUMBS = STATIC / "thumbs"
DOCS = STATIC / "docs"
MANIFEST = ROOT / "src" / "lib" / "media.json"

# Two archive columns on a phone at 2x density, or four on desktop at 2x.
THUMB_WIDTH = 640
QUALITY = 75

PHOTO_SUFFIXES = {".jpg", ".jpeg", ".png", ".webp"}


def thumb_path(source: Path) -> Path:
    return THUMBS / source.relative_to(STATIC).with_suffix(".webp")


def is_stale(source: Path, target: Path) -> bool:
    return not target.exists() or target.stat().st_mtime < source.stat().st_mtime


def save_thumb(image: Image.Image, target: Path) -> None:
    image = image.convert("RGB")
    # Only ever shrinks: the 448px scans from 2013 keep their own size.
    image.thumbnail((THUMB_WIDTH, THUMB_WIDTH * 8))
    target.parent.mkdir(parents=True, exist_ok=True)
    image.save(target, "WEBP", quality=QUALITY, method=6)


def photo_entry(source: Path) -> dict:
    target = thumb_path(source)

    with Image.open(source) as image:
        # Phones store portraits as rotated landscapes plus an EXIF flag;
        # browsers honour the flag, so the manifest must too.
        image = ImageOps.exif_transpose(image)
        width, height = image.size
        if is_stale(source, target):
            save_thumb(image, target)

    return {
        "width": width,
        "height": height,
        "thumb": target.relative_to(STATIC).as_posix(),
    }


def pdf_entry(source: Path) -> dict:
    entry: dict = {}

    if shutil.which("pdfinfo"):
        info = subprocess.run(
            ["pdfinfo", str(source)], capture_output=True, text=True, check=False
        ).stdout
        for line in info.splitlines():
            if line.startswith("Pages:"):
                entry["pages"] = int(line.split()[1])

    if not shutil.which("pdftoppm"):
        return entry

    target = thumb_path(source)

    if is_stale(source, target):
        with tempfile.TemporaryDirectory() as tmp:
            prefix = Path(tmp) / "cover"
            subprocess.run(
                ["pdftoppm", "-png", "-singlefile", "-f", "1", "-l", "1",
                 "-scale-to", str(THUMB_WIDTH * 2), str(source), str(prefix)],
                check=True,
            )
            with Image.open(prefix.with_suffix(".png")) as cover:
                save_thumb(cover, target)

    with Image.open(target) as cover:
        entry.update(
            width=cover.width,
            height=cover.height,
            thumb=target.relative_to(STATIC).as_posix(),
        )

    return entry


def main() -> int:
    manifest = {}

    for source in sorted(STATIC.iterdir()):
        if source.is_file() and source.suffix.lower() in PHOTO_SUFFIXES:
            manifest[source.name] = photo_entry(source)

    if DOCS.exists():
        for source in sorted(DOCS.rglob("*.pdf")):
            manifest[source.relative_to(STATIC).as_posix()] = pdf_entry(source)

    MANIFEST.write_text(
        json.dumps(manifest, indent="\t", ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    print(f"{len(manifest)} files -> {MANIFEST.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
