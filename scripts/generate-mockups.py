"""Generate transparent device assets with weirdapps/mockups, without stretching.

Original screenshots are read-only. Outputs and their dimensions are committed so
the Next.js/Vercel build does not need Python, frame downloads, or image tooling.
"""

import argparse
from collections import deque
from hashlib import sha256
import json
from pathlib import Path
import tempfile

import numpy as np
from PIL import Image, ImageDraw
from mockups import core

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
SOURCE = PUBLIC / "projects"
OUTPUT = PUBLIC / "mockups"
FRAME_KEY = "16_pro_black"
# Screenshot dimensions for iPhone 16 Pro (and proportionally scaled captures).
SCREEN_RATIO = 1260 / 2736
MAX_RATIO_ERROR = 0.005  # <= 0.5% accounts only for capture/edge pixel rounding.
# This existing simulator capture includes hardware chrome baked into its pixels.
HARDWARE_CAPTURE = "/projects/swiftbuilder/02.png"


def remove_existing_hardware(image):
    """Remove only the existing pill and outside rounded-screen corner matte."""
    image = image.convert("RGB")
    pixels = np.asarray(image)
    width, height = image.size
    background = tuple(int(v) for v in pixels[round(height * 0.09), width // 2])
    dark = np.max(pixels, axis=2) < 45
    region = np.zeros_like(dark)
    region[:round(height * 0.07), round(width * 0.25):round(width * 0.75)] = True
    candidates = dark & region
    visited = np.zeros_like(dark)
    islands = []
    for y, x in zip(*np.where(candidates)):
        if visited[y, x]:
            continue
        queue = deque([(x, y)])
        visited[y, x] = True
        component = []
        while queue:
            cx, cy = queue.popleft()
            component.append((cx, cy))
            for nx, ny in [(cx - 1, cy), (cx + 1, cy), (cx, cy - 1), (cx, cy + 1)]:
                if 0 <= nx < width and 0 <= ny < height and candidates[ny, nx] and not visited[ny, nx]:
                    visited[ny, nx] = True
                    queue.append((nx, ny))
        xs, ys = zip(*component)
        box = tuple(int(v) for v in (min(xs), min(ys), max(xs) + 1, max(ys) + 1))
        if box[2] - box[0] > width * 0.15 and box[3] - box[1] > height * 0.007:
            islands.append(box)
    if len(islands) != 1:
        raise ValueError(f"Expected one embedded Dynamic Island, found {len(islands)}; inspect {HARDWARE_CAPTURE}.")
    box = islands[0]
    draw = ImageDraw.Draw(image)
    draw.rectangle((box[0] - 2, box[1] - 2, box[2] + 2, box[3] + 2), fill=background)

    # Flood only corner-connected matte within corner patches. App pixels and
    # the status bar are untouched; the actual frame supplies the new curves.
    result = np.array(image)
    limit_x, limit_y = round(width * 0.18), round(height * 0.08)
    for x0, y0 in [(0, 0), (width - 1, 0), (0, height - 1), (width - 1, height - 1)]:
        queue = deque([(x0, y0)])
        seen = set()
        while queue:
            x, y = queue.popleft()
            if (x, y) in seen or not (0 <= x < width and 0 <= y < height):
                continue
            seen.add((x, y))
            if abs(x - x0) > limit_x or abs(y - y0) > limit_y or np.max(result[y, x]) > 80:
                continue
            result[y, x] = background
            queue.extend([(x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)])
    return Image.fromarray(result).convert("RGBA"), box


def proportional_fit(image, size):
    """Uniform resample; extend edge rows for sub-percent rounding differences."""
    scale = min(size[0] / image.width, size[1] / image.height)
    resized = image.resize((round(image.width * scale), round(image.height * scale)), Image.Resampling.LANCZOS)
    left = (size[0] - resized.width) // 2
    top = (size[1] - resized.height) // 2
    array = np.pad(np.asarray(resized), ((top, size[1] - resized.height - top), (left, size[0] - resized.width - left), (0, 0)), mode="edge")
    return Image.fromarray(array), [left, top, size[0] - resized.width - left, size[1] - resized.height - top]


def generate(check=False):
    config = core.FRAMES[FRAME_KEY]
    frame = Image.open(core.get_frames_dir() / config["path"]).convert("RGBA")
    alpha = np.asarray(frame)[:, :, 3]
    mask = core._flood_fill_screen_mask(alpha, frame.width // 2, frame.height // 2)
    bounds = Image.fromarray(mask).getbbox()
    if not bounds:
        raise ValueError("The bundled frame has no connected transparent screen opening.")
    left, top, right, bottom = bounds
    # Upstream hard-codes inaccurate coordinates for this frame. Use its actual
    # connected screen mask, then supply an already-sized, proportionate input.
    config.update(content_left=left, content_top=top, content_right=right - 1, content_bottom=bottom - 1)
    # All outputs share the same frame, so calculate the BFS screen mask once.
    core._flood_fill_screen_mask = lambda *_args, **_kwargs: mask.copy()
    screen_size = (right - left, bottom - top)
    assets = {}
    records = []
    errors = []
    files = sorted(p for p in SOURCE.rglob("*") if p.suffix.lower() in {".png", ".jpg", ".jpeg"})
    with tempfile.TemporaryDirectory(prefix="portfolio-mockups-") as working:
        staged = []
        for source in files:
            key = "/" + source.relative_to(PUBLIC).as_posix()
            image = Image.open(source).convert("RGBA")
            original_hash = sha256(source.read_bytes()).hexdigest()
            if image.width >= image.height:
                assets[key] = {"src": f"{key}?asset={original_hash[:12]}", "width": image.width, "height": image.height}
                records.append({"source": key, "sha256": original_hash, "kind": "desktop", "note": "Preserved original macOS screenshot; not an iPhone capture."})
                continue
            ratio_error = abs((image.width / image.height) / SCREEN_RATIO - 1)
            if ratio_error > MAX_RATIO_ERROR:
                errors.append(f"{key}: {image.width}x{image.height}, aspect-ratio mismatch {ratio_error:.2%}; export a supported iPhone 16 Pro screenshot.")
                continue
            removed_island = None
            if key == HARDWARE_CAPTURE:
                image, removed_island = remove_existing_hardware(image)
            fitted, padding = proportional_fit(image, screen_size)
            prepared = Path(working) / f"{len(staged)}-screen.png"
            fitted.save(prepared)
            destination = OUTPUT / source.relative_to(SOURCE).with_suffix(".png")
            temporary = Path(working) / f"{len(staged)}-mockup.png"
            core.create_mockup(prepared, temporary, frame_key=FRAME_KEY)
            finished = Image.open(temporary).convert("RGBA")
            if finished.getpixel((0, 0))[3] != 0:
                raise ValueError(f"{key}: generated canvas is not transparent.")
            if np.any(np.asarray(finished)[:, :, 3][mask == 255] != 255):
                raise ValueError(f"{key}: transparent gaps inside the screen opening.")
            if sha256(source.read_bytes()).hexdigest() != original_hash:
                raise ValueError(f"{key}: source screenshot unexpectedly changed.")
            output_key = "/" + destination.relative_to(PUBLIC).as_posix()
            fingerprint = sha256(finished.tobytes()).hexdigest()[:12]
            assets[key] = {"src": f"{output_key}?asset={fingerprint}", "width": finished.width, "height": finished.height}
            records.append({"source": key, "sha256": original_hash, "sourceSize": [image.width, image.height], "model": "iPhone 16 Pro", "frame": "Black Titanium", "output": output_key, "outputSize": list(finished.size), "sourceRatioError": round(ratio_error, 6), "edgePaddingPixels": padding, "removedEmbeddedIsland": removed_island})
            staged.append((temporary, destination))
            print(f"{'CHECK' if check else 'GENERATE'} {key}: {image.width}x{image.height} -> {output_key} ({finished.width}x{finished.height}), proportional fit, edge padding {padding}", flush=True)
        if errors:
            raise ValueError("Unsupported screenshot dimensions; no outputs were replaced:\n" + "\n".join(errors))
        if check:
            manifest = ROOT / "lib/mockups.json"
            if not manifest.exists() or json.loads(manifest.read_text()) != assets:
                raise ValueError("Missing or stale lib/mockups.json; run npm run generate:mockups.")
            for _temp, destination in staged:
                if not destination.exists():
                    raise ValueError(f"Missing generated asset: {destination}")
                current = Image.open(destination).convert("RGBA")
                expected = Image.open(_temp).convert("RGBA")
                if not np.array_equal(np.asarray(current), np.asarray(expected)):
                    raise ValueError(f"Stale generated asset: {destination}; run npm run generate:mockups.")
        else:
            for temporary, destination in staged:
                destination.parent.mkdir(parents=True, exist_ok=True)
                Image.open(temporary).save(destination, optimize=True)
            (ROOT / "lib/mockups.json").write_text(json.dumps(assets, indent=2) + "\n")
            OUTPUT.mkdir(parents=True, exist_ok=True)
            (OUTPUT / "generation-report.json").write_text(json.dumps({"tool": "weirdapps/mockups", "revision": "364a4794785ce8cd615c31c0fa21265973c6496d", "measuredScreenBounds": list(bounds), "assets": records}, indent=2) + "\n")
    print(f"{'Verified' if check else 'Generated'} {len(staged)} transparent iPhone mockups; originals preserved.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true", help="Fail if a generated image is missing or stale.")
    args = parser.parse_args()
    generate(args.check)
