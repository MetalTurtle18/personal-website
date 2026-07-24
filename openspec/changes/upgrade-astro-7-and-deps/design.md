## Context

Astro 7.0 is a major version bump with several breaking changes relevant to this project: a
Rust-based `.astro` compiler with stricter HTML parsing, a new default Markdown processor that
drops the remark/rehype pipeline unless explicitly re-added, a new `compressHTML: 'jsx'` default,
and removal of already-unused features (`@astrojs/db`, deprecated `astro:transitions` internals).
ESLint 10 is also out; `eslint-plugin-astro` and `@typescript-eslint` compatibility need checking.

## Goals / Non-Goals

- Goals:
  - Land on Astro 7.x with the site's existing markdown plugin pipeline fully working
  - Resolve the npm audit findings that are rooted in Astro 6's dependency tree
  - Keep lint/build green throughout
  - Pin a Node LTS version for reproducibility
- Non-Goals:
  - Adopting new Astro 7 features not required for this site (Advanced Routing / `src/fetch.ts`,
    experimental CDN cache providers, route caching) — out of scope, can be a future change
  - Migrating to the new native Sätteri markdown processor (would require reworking the remark/
    rehype plugin pipeline into Sätteri's plugin model) — deferred; `@astrojs/markdown-remark`
    keeps the existing pipeline working as-is

## Decisions

- **Decision: Keep the remark/rehype pipeline via `@astrojs/markdown-remark` rather than porting
  to Sätteri.** The project has several working remark/rehype plugins
  (`remark-toc`, `rehype-slug`, `rehype-autolink-headings`, `remark-smartypants`, custom
  `remark-plugins.mjs`). Porting to Sätteri's plugin model is a separate, larger effort with
  unclear plugin-compatibility today; installing `@astrojs/markdown-remark` is the documented,
  low-risk path to preserve current behavior on Astro 7.

- **Decision: Use `npx @astrojs/upgrade` for the mechanical bump**, then manually patch in
  `@astrojs/markdown-remark` and remove deprecated experimental flags (none currently set in this
  project, but double-check after the automated upgrade).

- **Decision: Pin Node 24 (current Active LTS)** in `.nvmrc` and `package.json` `engines.node`,
  matching the locally installed version, rather than Node 22 (Maintenance LTS).

## Risks / Trade-offs

- Rust compiler strictness may surface previously-silent HTML issues in `.astro` templates
  (unclosed tags, invalid nesting). Mitigation: run `astro check` and `astro build`, fix any
  errors, and visually diff key pages.
- `compressHTML: 'jsx'` default may subtly change whitespace between inline elements. Mitigation:
  visually spot-check pages with inline text/links after upgrading.
- ESLint 10 may have breaking config changes affecting `eslint-plugin-astro` /
  `@typescript-eslint`. Mitigation: upgrade in the same pass and run `npm run lint`, pinning back
  to ESLint 9 if a blocking incompatibility is found (documented as a fallback, not expected).

## Migration Plan

1. Run `npx @astrojs/upgrade` (bumps `astro` and official `@astrojs/*` integrations).
2. Install `@astrojs/markdown-remark` explicitly; confirm `markdown.remarkPlugins`/`rehypePlugins`
   config in `astro.config.mjs` still applies.
3. Run `npm run build`; fix any Rust-compiler HTML strictness errors.
4. Visually spot-check inline whitespace on key pages (home, blog post, project page).
5. Bump `eslint`, `@eslint/js`, `prettier`, `sharp`; remove `eslint-plugin-svelte`.
6. Run `npm run lint`; resolve any new rule violations or config incompatibilities.
7. Add `.nvmrc` and `engines.node`.
8. Final `npm run build` + `npm run lint` pass.

## Open Questions

None currently blocking.
