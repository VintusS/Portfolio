# Dragomir Mîndrescu — Portfolio

A responsive portfolio for iOS engineer Dragomir Mîndrescu, built with Next.js, React, and TypeScript.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Updating app screenshots

Replace the source images in `public/projects`, then run:

```bash
npm run generate:mockups
npm run check:mockups
```

This creates transparent black titanium iPhone mockups without changing the originals. See [the screenshot guide](public/projects/README.md) for filenames, supported dimensions, and first-run requirements. Commit the generated `public/mockups` images and `lib/mockups.json` along with source updates.

## Production build

```bash
npm run build
npm run start
```

## Deploy to Vercel

Import this repository into Vercel. The framework preset should be detected as Next.js and no custom build settings are required.

Set `NEXT_PUBLIC_SITE_URL` to the final custom domain if you use one. When it is omitted, social metadata automatically uses Vercel's production URL.
