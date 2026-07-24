## 1. Manual setup (owner)

- [ ] 1.1 Create Cloudflare account (if needed) and an R2 bucket with public "R2.dev subdomain"
      access enabled
- [ ] 1.2 Upload `meta-mesa-poster.pdf` and the 2 Cloudinary-hosted images to the bucket
- [ ] 1.3 Provide the public bucket base URL (`https://pub-<hash>.r2.dev`) and the object keys used

## 2. Code migration

- [ ] 2.1 Create `src/data/documents.ts` exporting `R2_PUBLIC_BASE_URL` and a slug -> R2 key
      mapping array
- [ ] 2.2 Rewrite `src/pages/document/[slug].ts` to build static paths from `documents.ts` and
      proxy/stream bytes from the R2 URL instead of Sanity
- [ ] 2.3 Update `astro.config.mjs`: remove the `sanity` integration, remove `cdn.sanity.io` and
      `res.cloudinary.com` from `image.domains`, add the R2 public hostname
- [ ] 2.4 Remove `/// <reference types="@sanity/astro/module" />` from `src/env.d.ts`
- [ ] 2.5 Update image references in `src/pages/about.astro`,
      `src/content/blog/writing-project-articles.md`, and `src/content/projects/dnd-table.md`
      (image field) to R2 URLs
- [ ] 2.6 Remove `@sanity/astro` and `sanity` from root `package.json`; run `npm install`
- [ ] 2.7 Delete the `studio/` directory

## 3. Verification

- [ ] 3.1 Run `npm run build` and confirm it succeeds with no Sanity/Cloudinary references
- [ ] 3.2 Confirm `/document/meta-mesa-poster.pdf` route builds and serves the correct PDF
- [ ] 3.3 Confirm both images render correctly in `about.astro` and blog/project pages
- [ ] 3.4 Run `npm run lint` and fix any issues
- [ ] 3.5 Grep repo for lingering `sanity`/`cloudinary` references
