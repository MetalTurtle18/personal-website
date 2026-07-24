# Change: Remove Sanity CMS, migrate images and documents to Cloudflare R2

## Why

Sanity is only used for one thing today: proxying a single 11MB PDF through `/document/[slug].ts`.
It requires a separate Studio app (`studio/`), a CMS account, and a data-fetching integration for
no real editorial benefit on this site. Meanwhile, images are hosted on Cloudinary, which the
owner finds has a poor interface and handles non-image files poorly. Consolidating both images and
files onto Cloudflare R2 (free tier, plain object storage, easy web-dashboard upload, works
identically for any file type) removes both dependencies and their setup overhead.

## What Changes

- **BREAKING**: Remove `@sanity/astro` and `sanity` integration entirely from `astro.config.mjs`
  and `package.json`
- **BREAKING**: Remove the `studio/` Sanity Studio sub-project
- Replace the Sanity-backed GROQ query in `src/pages/document/[slug].ts` with a small static
  slug -> R2 object key mapping (`src/data/documents.ts`); the route continues to proxy/stream
  bytes so the public URL shape (`/document/<slug>`) is preserved exactly
- Move the 2 Cloudinary-hosted images (used in `about.astro`, `writing-project-articles.md`, and
  referenced image field in `dnd-table.md`) to the same R2 bucket; update their `src`/`url`
  references
- Remove `cdn.sanity.io` and `res.cloudinary.com` from `astro.config.mjs` `image.domains`; add the
  new R2 public domain
- Remove the `/// <reference types="@sanity/astro/module" />` line from `src/env.d.ts`

## Impact

- Affected specs: `document-hosting` (new capability, replaces the implicit Sanity-backed behavior)
- Affected code: `astro.config.mjs`, `src/pages/document/[slug].ts`, `src/env.d.ts`,
  `package.json`, `src/pages/about.astro`, `src/content/blog/writing-project-articles.md`,
  `src/content/projects/dnd-table.md`, deletion of `studio/`
- External dependency: requires a Cloudflare R2 bucket with public access enabled (manual,
  one-time setup — see `design.md`)
