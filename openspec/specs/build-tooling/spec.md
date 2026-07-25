# build-tooling Specification

## Purpose

Configure the Astro build pipeline with a remark/rehype Markdown plugin stack, local custom remark plugins, and a pinned Node.js version for reproducible builds.
## Requirements
### Requirement: Markdown Plugin Pipeline

The system SHALL render `.md` content using the remark/rehype plugin pipeline (via
`@astrojs/markdown-remark`), configured with `remark-toc`, `rehype-slug`,
`rehype-autolink-headings`, `remark-smartypants`, and the project's local remark plugins, rather
than Astro's native default Markdown processor.

#### Scenario: Blog post renders with table of contents and heading anchors

- **GIVEN** a markdown blog post with multiple headings
- **WHEN** the site is built
- **THEN** a table of contents SHALL be generated
- **AND** each heading SHALL have a clickable anchor link

### Requirement: Pinned Node.js Version

The project SHALL declare its target Node.js version via both an `.nvmrc` file and the
`engines.node` field in `package.json`, tracking a current Active LTS release.

#### Scenario: Contributor sets up the project

- **WHEN** a contributor runs a version manager (e.g. `nvm use`) in the project root
- **THEN** it SHALL switch to the Node version declared in `.nvmrc`

