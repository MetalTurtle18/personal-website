## 1. Implementation

- [x] 1.1 Parse a `[width]` bracket following the first image of a paragraph
- [x] 1.2 Apply the parsed width as `max-width` on the `.image-grid` container for grids
- [x] 1.3 Keep solo-figure width behavior unchanged
- [x] 1.4 Center standalone figures with `margin: 1.5rem auto`
- [x] 1.5 Center `.image-grid` containers with `margin: 1.5rem auto`
- [x] 1.6 Reset grid figure margins (`margin: 0`) so grid spacing comes from `gap`

## 2. Verification

- [x] 2.1 Plugin unit test: solo width, grid width on first image, grid without width
- [x] 2.2 `npm run build` succeeds
- [x] 2.3 `npx astro check` passes with 0 errors
- [x] 2.4 `npm run lint` passes
