## REMOVED Requirements

### Requirement: Grid Layout Modes

**Reason**: The `<ImageGrid>` MDX component and its six layout modes (`2col`, `3col`, `4col`, `masonry`, `hero`, `1-2`) are removed in favor of a single unified markdown-based masonry grid provided by the `captioned-images` capability.
**Migration**: Replace `<ImageGrid layout="...">` JSX in `.mdx` content with adjacent markdown image lines (`![alt](url "caption")`) which render as a masonry grid. For any future custom layouts, re-add a component or use the retained MDX integration.

### Requirement: Responsive Grid Behavior

**Reason**: The component is removed; responsive behavior is now provided by the fluid CSS-columns grid in the `captioned-images` capability.
**Migration**: No authored content change; grids now collapse to a single column via `columns: 15rem` instead of a 768px media query.

### Requirement: Image Captions

**Reason**: Captions moved from an `ImageGrid` prop to the markdown title attribute (`![alt](url "caption")`), handled by the `captioned-images` capability.
**Migration**: In `.mdx` content, move `caption: '...'` props into the markdown title attribute position.

### Requirement: Grid Image Sources

**Reason**: The component is removed; grid images are now authored as standard markdown image URLs.
**Migration**: Keep remote URL sources in markdown image syntax; no functional loss since remote URLs already bypassed Astro image optimization.
