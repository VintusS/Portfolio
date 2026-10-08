# Project screenshots

Replace the original screenshots in the folders below, keep their filenames, then run `npm run generate:mockups` before rebuilding or redeploying. The website uses the finished device images in `public/mockups`; do not edit those generated images directly.

Use PNG files at their original Simulator or device resolution. Crop private data and any status-bar details you do not want published.

## Daily Swift

- `daily-swift/hero.png` — hero preview; a strong, readable overview screen
- `daily-swift/01.png` — Today screen
- `daily-swift/02.png` — lesson screen
- `daily-swift/03.png` — source citation screen

## FitKate

- `fitkate/01.png` — dashboard
- `fitkate/02.png` — workout editor
- `fitkate/03.png` — live session timer

## SwiftBuilder

- `swiftbuilder/01.png` — macOS workspace
- `swiftbuilder/02.png` — iPhone preview

## Poschore

- `poschore/01.png` — calibration
- `poschore/02.png` — active tracking
- `poschore/03.png` — aligned state

## Naming examples

- Correct: `public/projects/daily-swift/03.png`
- Correct: `public/projects/swiftbuilder/01.png`
- Incorrect: `Daily Swift screenshot 3.png`
- Incorrect: `poschore-final.PNG`

Filenames are lowercase folder names followed by zero-padded numbers: `01.png`, `02.png`, `03.png`. The Daily Swift hero is the one exception: `hero.png`.

The `silverlink` folder is reserved for future project-detail screenshots.

## Automated device images

```bash
npm run generate:mockups
npm run check:mockups
```

The generator uses [weirdapps/mockups](https://github.com/weirdapps/mockups), pinned to commit `364a4794785ce8cd615c31c0fa21265973c6496d`, and its bundled black titanium iPhone 16 Pro frame. Python 3 and Git are needed for the first run, which installs the tool in the ignored `.mockup-venv` directory. Subsequent generation runs locally without uploading screenshots. Set `MOCKUP_PYTHON` if your Python executable has another name.

Use 1260×2736 screenshots or proportionally scaled captures. Aspect-ratio differences above 0.5% fail with an explanation rather than stretching or cropping app content. Tiny rounding differences are filled by extending edge pixels. The existing SwiftBuilder iPhone capture has a baked-in hardware island and corner matte; the generator removes that hardware from its temporary working copy before applying the real device frame. If the capture format changes, it fails rather than guessing.

Originals are preserved. The macOS workspace remains a desktop image. Output dimensions and references are recorded in `lib/mockups.json`; source hashes, frame selection, dimensions, and adjustments are recorded in `public/mockups/generation-report.json`. Commit these outputs with screenshot updates. Vercel builds need no Python or mockup tooling.

Generated references include a content fingerprint so replacing a screenshot invalidates browser caches. `check:mockups` regenerates temporary copies and compares their pixels and manifest with the saved outputs, failing if an asset is missing or stale.
