import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    author: z.string().default('UX Mind'),
    excerpt: z.string(),
    coverImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    video: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

// Přepisy podcastů a reportáží pro stránky /v-mediich/{slug}/ — metadata dílu jsou v src/data/media.ts
const prepisy = defineCollection({
  type: 'content',
  schema: z.object({
    /** Kdo mluví (zobrazí se nad přepisem) */
    mluvci: z.array(z.string()).default([]),
    /** Přepis upravený pro čtení (ne surový automatický) */
    upraveno: z.boolean().default(true),
  }),
});

export const collections = { blog, prepisy };
