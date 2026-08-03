## 1. Remark Plugin

- [x] 1.1 Add `localImageFigure` plugin to `src/lib/remark-plugins.mjs`
- [x] 1.2 Visit top-level `paragraph` nodes only (parent is root)
- [x] 1.3 Filter whitespace-only `text` nodes from paragraph children
- [x] 1.4 Accept only pure-image paragraphs (image nodes, optionally followed by a `[width]` text node)
- [x] 1.5 Transform single image + caption → `<figure>` with `<figcaption>` + `data-caption`
- [x] 1.6 Apply trailing `[width]` as inline `max-width` on standalone figures
- [x] 1.7 Transform 2+ adjacent images → `<div class="image-grid">` of `<figure>`s
- [x] 1.8 Leave bare single images (no caption, no width) untouched

## 2. Configuration & Styling

- [x] 2.1 Register `localImageFigure` in `astro.config.mjs` remarkPlugins
- [x] 2.2 Add `.prose figure` / `.prose figcaption` styles to `MarkdownPost.astro`
- [x] 2.3 Add `.image-grid` CSS (fluid `columns: 15rem`, `break-inside: avoid`, gap, margins)

## 3. Removal & Migration

- [x] 3.1 Delete `src/components/ImageGrid.astro`
- [x] 3.2 Migrate the 5 `<ImageGrid>` blocks in `src/content/projects/dnd-table.mdx` to plain markdown syntax
- [x] 3.3 Remove the `import ImageGrid` line from `dnd-table.mdx`
- [x] 3.4 Rename `dnd-table.mdx` → `dnd-table.md`

## 4. Verification

- [x] 4.1 `npm run build` succeeds
- [x] 4.2 `npx astro check` passes with 0 errors
- [x] 4.3 `npm run lint` passes
- [x] 4.4 No remaining `ImageGrid` references in `src/`
- [x] 4.5 dnd-table renders its grids correctly in dev (`PREVIEW=true`)
- [x] 4.6 Lightbox opens for grid and standalone images with captions
