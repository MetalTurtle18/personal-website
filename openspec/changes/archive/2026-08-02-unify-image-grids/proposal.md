# Change: Unify Image Grids (Remark Plugin, Remove ImageGrid Component)

## Why

Image grids currently require the `<ImageGrid>` MDX component with six layout modes, forcing articles to use MDX and JSX syntax for a common need. Articles need a single, simple, markdown-native way to insert captioned images and masonry grids. The goal is one unified mechanism: a remark plugin that renders captioned figures and CSS-column masonry grids from plain markdown.

## What Changes

- **Add `localImageFigure` remark plugin** that transforms pure-image paragraphs:
  - Single image with a `title` (caption) → `<figure>` with `<figcaption>` and `data-caption`
  - Single image with a trailing `[width]` → inline `max-width` style
  - 2+ adjacent image lines (no blank line) → `.image-grid` masonry using CSS columns
  - Bare single images (`![alt](url)` with no caption/width) → left unchanged
- **Remove `src/components/ImageGrid.astro`** and all six layout modes (`2col`, `3col`, `4col`, `masonry`, `hero`, `1-2`) — the remark plugin's masonry becomes the only grid type
- **Migrate `src/content/projects/dnd-table.mdx`** from `<ImageGrid>` JSX to plain markdown image syntax, and rename to `.md`
- **Add figure/figcaption/`.image-grid` CSS** to `MarkdownPost.astro` (fluid `columns: 15rem`, responsive)
- **Keep MDX integration** (`@astrojs/mdx`, glob `**/*.{md,mdx}`) for potential future component use
- **Lightbox unchanged** — already collects `article .prose img` and reads `data-caption`

## Impact

- Affected specs: `image-grid` (REMOVED), new `captioned-images` (ADDED), `lightbox` (MODIFIED)
- Affected code:
  - `src/lib/remark-plugins.mjs` — add `localImageFigure`
  - `astro.config.mjs` — register plugin
  - `src/layouts/MarkdownPost.astro` — add figure/grid CSS
  - `src/components/ImageGrid.astro` — **deleted**
  - `src/content/projects/dnd-table.mdx` — migrated and renamed to `.md`
- No breaking changes to authored `.md` content: bare images render exactly as before; only captioned/width/grid images change rendering
