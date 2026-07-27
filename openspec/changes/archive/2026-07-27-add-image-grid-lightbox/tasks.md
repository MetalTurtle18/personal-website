## 1. Setup

- [x] 1.1 Install `@astrojs/mdx` dependency
- [x] 1.2 Add `mdx()` integration to `astro.config.mjs`
- [x] 1.3 Update glob patterns in `src/content.config.ts` to `**/*.{md,mdx}` for both collections

## 2. ImageGrid Component

- [x] 2.1 Create `src/components/ImageGrid.astro` with props interface (layout, images[])
- [x] 2.2 Implement `2col` layout
- [x] 2.3 Implement `3col` layout
- [x] 2.4 Implement `4col` layout
- [x] 2.5 Implement `masonry` layout (CSS columns)
- [x] 2.6 Implement `hero` layout (1 large + sidebar stack)
- [x] 2.7 Implement `1-2` layout (1 full-width + 2 below)
- [x] 2.8 Add responsive breakpoints (collapse to single column on mobile)
- [x] 2.9 Add caption rendering below images

## 3. Global Lightbox

- [x] 3.1 Add `<dialog>` element to `MarkdownPost.astro` template
- [x] 3.2 Add lightbox CSS styles (backdrop, image sizing, caption, navigation arrows)
- [x] 3.3 Add global script: click handler on `article img` to open lightbox
- [x] 3.4 Add keyboard navigation (ArrowLeft, ArrowRight, Escape)
- [x] 3.5 Add image indexing (track current position among all page images)
- [x] 3.6 Add cursor hint styling on images (`cursor: zoom-in`)
- [x] 3.7 Add mobile swipe support

## 4. Verification

- [x] 4.1 Build succeeds with mixed `.md` and `.mdx` files
- [x] 4.2 Existing `.md` articles render identically
- [x] 4.3 ImageGrid renders all 6 layout modes correctly
- [x] 4.4 Lightbox opens for standalone markdown images
- [x] 4.5 Lightbox opens for ImageGrid images
- [x] 4.6 Keyboard navigation works (arrows + escape)
- [x] 4.7 Mobile responsive behavior verified
- [x] 4.8 Lint and typecheck pass
