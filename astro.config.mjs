// @ts-check
import { defineConfig, envField } from 'astro/config';

import icon from 'astro-icon';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkToc from 'remark-toc';
import { localSmartyPants, localEmbedder } from './src/lib/remark-plugins.mjs';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://dekolis.com',
  image: {
    domains: ['res.cloudinary.com', 'docs.astro.build'],
    layout: 'constrained',
    responsiveStyles: true,
  },
  env: {
    schema: {
      PREVIEW: envField.boolean({
        context: 'client',
        access: 'public',
        optional: true,
        default: false,
      }),
      COMMIT_REF: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
        default: '',
      }),
      GITHUB_SHA: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
        default: '',
      }),
    },
  },
  integrations: [icon(), sitemap()],
  markdown: {
    smartypants: true /* TODO: 1) this should be true default 2) behavior*/,
    remarkPlugins: [localSmartyPants, localEmbedder, [remarkToc, { heading: 'Contents' }]],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'prepend',
          content: {
            type: 'element',
            tagName: 'svg',
            properties: {
              xmlns: 'http://www.w3.org/2000/svg',
              viewBox: '0 0 24 24',
              width: '1.4rem',
              fill: '#999999', // Light gray (lighter than #333 body text)
              className: ['heading-anchor-icon'],
              ariaHidden: 'true',
            },
            children: [
              {
                type: 'element',
                tagName: 'path',
                properties: {
                  d: 'M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7a5 5 0 0 0-5 5a5 5 0 0 0 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1M8 13h8v-2H8zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4a5 5 0 0 0 5-5a5 5 0 0 0-5-5',
                },
              },
            ],
          },
          headingProperties: {
            className: ['anchor'],
          },
          properties: {
            className: ['anchor-link'],
          },
        },
      ],
    ],
  },
});
