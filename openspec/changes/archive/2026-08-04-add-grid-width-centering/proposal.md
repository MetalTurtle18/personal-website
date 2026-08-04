# Change: Add Grid Width & Figure/Grid Centering

## Why

Image grids currently ignore the trailing `[width]` bracket entirely, so there is no way to size an image group. Standalone captioned figures and grids also hug the left edge when they are narrower than the content pane.

## What Changes

- The `[width]` bracket on the **first image line** of a grid applies `max-width` to the whole `.image-grid` container (group width)
- Standalone figures and image-grid containers are horizontally centered in the content pane
- Figures inside a grid no longer inherit the standalone figure's vertical margins (spacing comes from grid `gap`)

## Impact

- Affected specs: `captioned-images` (MODIFIED `Image Width Control`, ADDED `Figure and Grid Centering`)
- Affected code:
  - `src/lib/remark-plugins.mjs` — parse a bracket after the first image and apply it to the grid container
  - `src/layouts/MarkdownPost.astro` — centering margins for figures/grids, margin reset for grid figures
- Authoring: the bracket must be on the first image line of a group; brackets on later lines are consumed but ignored
