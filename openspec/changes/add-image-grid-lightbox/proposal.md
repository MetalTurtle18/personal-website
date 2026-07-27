# Change: Add Image Grid Component and Global Lightbox

## Why

Articles need to display collections of images in structured grid layouts (2-col, 3-col, masonry, hero, etc.) with lightbox viewing. Currently there is no way to compose image grids in markdown content, and clicking images has no zoom/enlarge behavior. Additionally, all images in articles should support lightbox viewing, not just those inside grids.

## What Changes

- **Add `@astrojs/mdx` integration** to enable component usage within content files
- **Update content collection glob patterns** from `**/*.md` to `**/*.{md,mdx}` so both formats coexist
- **Create `<ImageGrid>` Astro component** supporting multiple layout modes: `2col`, `3col`, `4col`, `masonry`, `hero`, `1-2`
- **Add global lightbox** via native `<dialog>` element in `MarkdownPost` layout, triggered by clicking any `<img>` in article prose
- **Add lightbox script** to `MarkdownPost` layout for keyboard navigation (arrow keys, Escape), caption display, and image indexing across all page images
- **Add global image styling** for lightbox cursor hint and hover state

## Impact

- Affected specs: `content-collections` (glob pattern change), new `image-grid` and `lightbox` capabilities
- Affected code:
  - `astro.config.mjs` — add `mdx()` integration
  - `src/content.config.ts` — update glob patterns
  - `src/components/ImageGrid.astro` — new component
  - `src/layouts/MarkdownPost.astro` — add lightbox dialog, styles, and script
- No breaking changes: existing `.md` files and all current functionality remain unchanged
