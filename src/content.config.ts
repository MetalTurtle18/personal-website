import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

// Shared schema for blog posts and projects
const contentSchema = z.object({
  title: z.string(),
  description: z.string(),
  summary: z.string().optional(),
  pubDate: z.coerce.date(),
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
