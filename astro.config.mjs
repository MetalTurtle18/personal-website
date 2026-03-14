// @ts-check
import { defineConfig } from 'astro/config';

import icon from 'astro-icon';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkSmartyPants from 'remark-smartypants';
import remarkEmbedder from '@remark-embedder/core';
import oembedTransformer from '@remark-embedder/transformer-oembed';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://dekolis.com',
  image: {
    domains: ['res.cloudinary.com', 'docs.astro.build'],
    layout: 'constrained',
    responsiveStyles: true,
  },
  integrations: [icon(), sitemap()],
  markdown: {
    remarkPlugins: [
      // @ts-ignore - Plugin types are not fully compatible with Astro's config types
      [
        remarkSmartyPants,
        {
          dashes: 'oldschool', // --- to em dash, -- to en dash
          ellipses: true, // ... to ellipsis
          quotes: false, // Keep straight quotes (no curly quotes)
        },
      ],
      [
        (remarkEmbedder.default || remarkEmbedder),
        {
          transformers: [
            (oembedTransformer.default || oembedTransformer)
          ],
        },
      ]
    ],
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
