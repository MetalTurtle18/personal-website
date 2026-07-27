## Context

The site uses Astro 7 with plain markdown content collections. Articles are rendered via `MarkdownPost` layout which wraps `<Content />` in a `.prose` div. Images from Cloudflare R2 are referenced by URL. The project values zero-dependency, minimal-JS approaches.

## Goals / Non-Goals

- Goals:
  - Enable grid layouts for images in MDX articles
  - Add lightbox for all article images (grid and standalone)
  - Keep existing `.md` files working without changes
  - Maintain zero-dependency approach (no PhotoSwipe, Fancybox, etc.)
  - Use native browser APIs where possible

- Non-Goals:
  - Image upload/management workflows
  - Gallery collection system (separate from article content)
  - Server-side image processing beyond Astro's built-in `<Image>`
  - Animated transitions between lightbox images

## Decisions

### MDX over Remark Plugin for Grids

MDX chosen because:
- Image grids are UI components, not text transforms
- Astro has first-class MDX support with minimal config
- Component approach is more extensible (captions, future layouts)
- Avoids complex mdast/hast AST manipulation for a presentation concern

Alternatives considered:
- Remark container directive plugin: More complex, harder to maintain, limited to markdown syntax
- Rehype plugin wrapping images: Operates after HTML generation, awkward for structured data

### Native `<dialog>` for Lightbox

Chosen because:
- Built-in backdrop, focus trapping, and dismiss behavior
- No dependency needed
- ~30 lines of JS for navigation logic
- CSS `::backdrop` pseudo-element for overlay styling

Alternatives considered:
- Custom overlay div: Would need manual focus management and backdrop click handling
- PhotoSwipe/Fancybox: Adds dependency, against project conventions

### Global Handler vs Per-Component Lightbox

Global handler on `MarkdownPost` chosen because:
- Lightbox works for ALL images automatically (markdown `![]()`, `<ImageGrid>`, any future `<img>`)
- Single implementation, no duplication
- Images in `.prose` are already scoped by the layout's DOM

### ImageGrid as Props-Based Component

Props-based API chosen because:
- Images are remote R2 URLs — no local file imports to leverage
- Cleaner syntax for the common case (list of URLs + alts)
- Captions as optional props keep the API simple

## Risks / Trade-offs

- **MDX adds build dependency** → Mitigated by Astro's mature MDX integration; only used for files that need grids
- **Lightbox JS adds to every article page** → Mitigated by small script size (~30 lines) and no external deps
- **Remote R2 images not optimized by Astro's `<Image>`** → Already the case; R2 serves images directly. Could add `r2bucket.dekolis.com` to `image.remotePatterns` in future for optimization if desired

## Migration Plan

1. Install `@astrojs/mdx`
2. Update glob patterns in `content.config.ts`
3. Add `mdx()` to `astro.config.mjs`
4. Create `ImageGrid.astro` component
5. Add lightbox dialog + script to `MarkdownPost.astro`
6. No existing files need content changes — all backward compatible

Rollback: Remove `@astrojs/mdx`, revert glob patterns, delete `ImageGrid.astro`, remove lightbox additions from `MarkdownPost.astro`.
