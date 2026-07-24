## Context

Sanity CMS is currently used only to proxy one static PDF file. Cloudinary hosts 2 images. Both are
external dependencies with setup overhead disproportionate to their use. The owner wants a single,
free, low-friction replacement that handles both images and arbitrary files (PDFs), is not GitHub,
and can later serve as a general "upload once, get a URL" store (potentially markdown articles down
the line).

## Goals / Non-Goals

- Goals:
  - Remove Sanity (`@sanity/astro`, `sanity`, `studio/`) entirely
  - Remove Cloudinary as an image host
  - Preserve the exact public URL `/document/<slug>` for the existing PDF
  - Keep the implementation boring: a static slug->key mapping, no new build-time API calls
- Non-Goals:
  - Building a general-purpose asset upload pipeline/CI step (manual upload via R2 dashboard is
    fine for "several dozen photos and a couple files")
  - Migrating markdown article hosting off git (explicitly deferred by the owner)

## Decisions

- **Decision: Use Cloudflare R2 with the built-in public `pub-<hash>.r2.dev` bucket URL.**
  Alternatives considered: Bunny Storage (no permanent free tier, requires billing setup),
  ImageKit (bandwidth-based free tier, weaker for arbitrary/non-image files), committing large
  files to `public/` in the repo (bloats git history on every change, rejected because user
  doesn't want to lean on GitHub for this).
  R2 gives a real, permanent free tier (10 GB storage, no egress fees), a web dashboard for
  drag-and-drop upload, and zero DNS/Worker setup needed for the default public dev URL.

- **Decision: Keep `/document/[slug].ts` as a proxy route backed by a static config file
  (`src/data/documents.ts`) instead of Sanity's GROQ query.**
  This preserves the existing public URL contract (`dekolis.com/document/meta-mesa-poster.pdf`)
  that the owner explicitly wants to keep, while removing the CMS dependency. Adding a new document
  in the future is a one-line addition to `documents.ts` plus an upload to the bucket — no new
  infrastructure.

- **Decision: Store the R2 public base URL as a single exported constant** in
  `src/data/documents.ts` (and referenced from `astro.config.mjs`'s `image.domains`), rather than
  an environment variable, matching the existing pattern of hardcoding the Sanity `projectId` /
  Cloudinary cloud name directly in config. No secrets are involved (public bucket), so an env var
  adds indirection without benefit.

## Migration Plan

1. Owner creates a Cloudflare account (if not already existing) and an R2 bucket, enabling the
   default public `pub-<hash>.r2.dev` access — no custom domain or Worker required.
   - Cloudflare dashboard -> R2 Object Storage -> Create bucket (any name, e.g. `dekolis-assets`)
   - Bucket Settings -> Public Access -> enable "R2.dev subdomain" -> copy the resulting
     `https://pub-<hash>.r2.dev` URL
2. Owner uploads via the dashboard's drag-and-drop file browser:
   - `meta-mesa-poster.pdf` -> e.g. key `documents/meta-mesa-poster.pdf`
   - The 2 Cloudinary images -> e.g. keys `images/R1-00502-0023_sk51ym.jpg`,
     `images/PromoImage_hixxql.png`
3. Owner provides the public bucket URL back to the implementer.
4. Implementer fills in `R2_PUBLIC_BASE_URL` in `src/data/documents.ts`, updates
   `astro.config.mjs` image domains, updates the 3 content references, removes Sanity/Cloudinary
   code and deps, deletes `studio/`.
5. Run `npm run build` and manually verify the PDF route and both images render/download
   correctly from the deployed preview.

## Risks / Trade-offs

- R2's default `pub-<hash>.r2.dev` URL is not a pretty/branded domain. Acceptable trade-off for
  zero DNS setup; a custom domain can be added later for free if desired.
- No image transformation/optimization happens at the R2 layer (unlike Cloudinary). Astro's
  built-in `astro:assets` image optimization already handles this at build time via the
  `image.domains` allowlist, so no functionality is actually lost.

## Open Questions

- None currently blocking; execution paused until the owner supplies the R2 public bucket URL and
  confirms uploaded object keys (see task 1 in `tasks.md`).
