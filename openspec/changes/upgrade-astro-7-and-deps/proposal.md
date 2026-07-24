# Change: Upgrade Astro 6 -> 7 and refresh other dependencies

## Why

Astro 7 is out with meaningful build-speed improvements (Rust compiler, Vite 8/Rolldown, native
Rust markdown pipeline) and resolves most of the currently-outstanding npm audit findings, which
are rooted in Astro 6.4.8's own dependency tree (esbuild, sharp, etc.). Several other dependencies
(`eslint`, `@eslint/js`, `prettier`, `sharp`) also have newer major/minor versions available. An
unused devDependency (`eslint-plugin-svelte`) should be removed since there is no Svelte code in
this project.

## What Changes

- **BREAKING**: Upgrade `astro` 6.4.8 -> 7.x via `npx @astrojs/upgrade`
- **BREAKING**: Astro 7 defaults to a new Rust-based Markdown processor ("Sätteri") and no longer
  bundles the remark/rehype pipeline. Since this project uses custom remark/rehype plugins
  (`remark-toc`, `rehype-slug`, `rehype-autolink-headings`, `remark-smartypants`, and a local
  `remark-plugins.mjs`), explicitly install `@astrojs/markdown-remark` to keep the existing
  `markdown.remarkPlugins`/`rehypePlugins` config working
- Audit all `.astro` templates for the new Rust compiler's stricter HTML parsing (unclosed tags,
  invalid nesting no longer silently corrected)
- Verify no unwanted whitespace/layout shifts from the new `compressHTML: 'jsx'` default
- Upgrade `eslint` 9->10, `@eslint/js` 9->10, `prettier` 3.6->3.9, `sharp` 0.34->0.35
- Remove unused `eslint-plugin-svelte` devDependency
- Add `.nvmrc` (Node 24 LTS) and an `engines.node` field to `package.json`

## Impact

- Affected specs: `build-tooling` (new capability, documents the markdown pipeline and Node
  version conventions so future changes don't silently regress them)
- Affected code: `package.json`, `package-lock.json`, `astro.config.mjs`, `eslint.config.js`, and
  potentially any `.astro` file with HTML the new Rust compiler rejects
- Requires re-running `npm run build` and `npm run lint` to catch regressions before merging
