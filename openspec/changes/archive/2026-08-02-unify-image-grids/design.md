## Context

The site previously added `@astrojs/mdx` and an `<ImageGrid>` Astro component with six layout modes for article image grids. Using it requires MDX/JSX syntax. The project now prefers a single, markdown-native image mechanism.

## Goals / Non-Goals

- Goals:
  - One unified markdown syntax for captioned images and image grids
  - Caption always available, width optionally available
  - Adjacent images (no blank line) become a masonry grid
  - No JavaScript for layout (CSS columns)
  - Bare images render identically to today
  - Remove the MDX `<ImageGrid>` component and its six layout modes

- Non-Goals:
  - Balanced/JS masonry (rejected: too few images to justify, project avoids JS)
  - Native CSS masonry via `grid-template-rows: masonry` (rejected: Firefox-only per caniuse June 2026)
  - Removing the MDX integration entirely (kept for future component use)

## Decisions

### Remark plugin over Rehype plugin

- Decision: Transform in remark (mdast), emitting `html` nodes, mirroring the existing `localEmbedder` plugin (src/lib/remark-plugins.mjs).
- Why: mdast image nodes carry structured `url`, `alt`, `title`; paragraph grouping cleanly encodes the grid rule (adjacent lines = one paragraph). Rehype operates on already-flattened HTML.
- Alternatives: Rehype plugin (less structured input), container directives (heavier syntax, new deps).

### CSS Columns masonry

- Decision: `.image-grid { columns: 15rem; }` with `break-inside: avoid` on figures.
- Why: zero JS, zero layout shift, preserves aspect ratios, fluid column count (~3 at article width, collapses on mobile).
- Alternatives: JS balanced masonry (rejected for JS cost), native CSS masonry (Firefox-only), flexbox object-fit (crops images).

### Width syntax `[width]`

- Decision: trailing `[400]` / `[50%]` text node after an image is parsed by the plugin and applied as inline `max-width` on standalone figures only.
- Why: parses as a clean adjacent `text` node (verified); keeps alt text clean (unlike Obsidian `![alt|400](url)`).
- Alternatives: Pandoc attribute lists `{.width=400}` (more verbose), alt-text convention (pollutes accessibility).

### Migrate dnd-table to `.md`

- Decision: convert its five `<ImageGrid>` blocks to plain markdown and rename to `.md`.
- Why: it no longer uses MDX features; keeps MDX installed but unused-file-free.

## Risks / Trade-offs

- **Plugin scope** → Restricted to top-level pure-image paragraphs; images inside links/lists/mixed paragraphs are left untouched.
- **CSS columns order** → Images flow down columns in source order (not height-balanced); accepted given small sets.
- **Raw `html` nodes bypass image optimization** → Already the case for remote R2 images; no regression.

## Migration Plan

1. Add plugin, register in config, add CSS
2. Delete `ImageGrid.astro`
3. Migrate `dnd-table.mdx` to markdown, rename to `.md`
4. Verify build/check/lint
5. Archive openspec change

Rollback: re-add `ImageGrid.astro`, remove plugin registration and CSS, revert `dnd-table.md` to `.mdx` with JSX grids.
