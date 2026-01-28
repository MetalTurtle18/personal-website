import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

// Shared schema for blog posts and projects
const contentSchema = z.object({
  title: z.string(),
  description: z.string(),
  summary: z.string().optional(),
  pubDate: z.coerce.date(), // The initial date of publication for this article
  updateDate: z.coerce.date().optional(), // The date of the last update to this article
  chronoDate: z.coerce.date().optional(), // The date that the content takes place (e.g., project completion date)
  author: z.string().default('Dorian Kolis'),
  featured: z.boolean().default(false),
  image: z
    .object({
      url: z.string(),
      alt: z.string(),
    })
    .optional(),
});

// Define blog collection
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: contentSchema,
});

// Define projects collection
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: contentSchema,
});

export const collections = { blog, projects };
