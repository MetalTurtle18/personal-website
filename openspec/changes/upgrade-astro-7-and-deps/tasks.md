## 1. Astro upgrade

- [ ] 1.1 Run `npx @astrojs/upgrade` to bump `astro` and official integrations to Astro 7.x
- [ ] 1.2 Install `@astrojs/markdown-remark` to preserve the existing remark/rehype plugin
      pipeline
- [ ] 1.3 Remove any now-stable/removed experimental flags from `astro.config.mjs` (verify none
      are set)

## 2. Build/compile verification

- [ ] 2.1 Run `npm run build`; fix any Rust-compiler HTML strictness errors (unclosed tags,
      invalid nesting)
- [ ] 2.2 Visually spot-check inline whitespace/layout on home, blog post, and project pages for
      `compressHTML: 'jsx'` regressions
- [ ] 2.3 Confirm markdown rendering (TOC, heading anchors, smartypants, YouTube embeds) still
      works correctly

## 3. Other dependency upgrades

- [ ] 3.1 Bump `eslint` 9->10 and `@eslint/js` 9->10; run `npm run lint` and fix any new issues
- [ ] 3.2 Bump `prettier` 3.6->3.9; run `npm run format` and review diff
- [ ] 3.3 Bump `sharp` 0.34->0.35
- [ ] 3.4 Remove unused `eslint-plugin-svelte` devDependency

## 4. Node version pinning

- [ ] 4.1 Add `.nvmrc` pinning Node 24 (Active LTS)
- [ ] 4.2 Add `engines.node` field to `package.json`

## 5. Final verification

- [ ] 5.1 Run `npm run build` and `npm run lint` one final time, both clean
- [ ] 5.2 Run `npm audit` and confirm the Astro-6-rooted findings are resolved
