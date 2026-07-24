## 1. Astro upgrade

- [x] 1.1 Run `npx @astrojs/upgrade` to bump `astro` and official integrations to Astro 7.x
- [x] 1.2 Install `@astrojs/markdown-remark` to preserve the existing remark/rehype plugin
      pipeline (adopted the non-deprecated `unified()` processor config, not just the deprecated
      `markdown.remarkPlugins` shorthand)
- [x] 1.3 Remove any now-stable/removed experimental flags from `astro.config.mjs` (verified none
      were set)

## 2. Build/compile verification

- [x] 2.1 Run `npm run build`; fix any Rust-compiler HTML strictness errors (unclosed tags,
      invalid nesting) — none found
- [x] 2.2 Visually spot-check inline whitespace/layout on home, blog post, and project pages for
      `compressHTML: 'jsx'` regressions — diffed rendered text content before/after upgrade,
      confirmed no visible differences beyond internal build hashes/timestamps
- [x] 2.3 Confirm markdown rendering (TOC, heading anchors, smartypants, YouTube embeds) still
      works correctly — heading anchors and smartypants (em-dashes, smart quotes, ellipses)
      verified in build output; TOC/YouTube embed logic unchanged and unaffected (no content
      currently exercises them on non-draft pages)

## 3. Other dependency upgrades

- [x] 3.1 Bump `eslint` 9->10 and `@eslint/js` 9->10; run `npm run lint` and fix any new issues
      (also bumped `eslint-plugin-astro` 1.x->3.0.1 for ESLint 10 support, and fixed its
      `astro-eslint-parser` import to use a namespace import per the new export shape)
- [x] 3.2 Bump `prettier` 3.6->3.9; run `npm run format` and review diff (only trivial markdown
      whitespace changes in 2 openspec spec files)
- [x] 3.3 Bump `sharp` 0.34->0.35
- [x] 3.4 Remove unused `eslint-plugin-svelte` devDependency

## 4. Node version pinning

- [x] 4.1 Add `.nvmrc` pinning Node 24 (Active LTS)
- [x] 4.2 Add `engines.node` field to `package.json` (`>=24.16.0`, matching the actual minimum
      required by `eslint-plugin-astro`/`astro-eslint-parser` 3.x; the previously-installed local
      Node 24.10.0 does not satisfy this and should be upgraded)

## 5. Final verification

- [x] 5.1 Run `npm run build` and `npm run lint` one final time, both clean
- [x] 5.2 Run `npm audit` and confirm the Astro-6-rooted findings are resolved (0 vulnerabilities
      after `npm audit fix`, down from 17)
