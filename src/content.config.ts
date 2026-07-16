import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    draft: z.boolean().default(false),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).optional()
  })
});

const projectSchema = ({ image }: { image: () => any }) => z.object({
  name: z.string(),
  summary: z.string(),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  stack: z.array(z.string()),
  status: z.enum(['live', 'archived', 'wip']),
  url: z.string().url().optional(),
  repo: z.string().url().optional(),
  screenshot: image().optional(),
  draft: z.boolean().default(false)
});

const builds = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/builds' }),
  schema: projectSchema
});

const agents = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/agents' }),
  schema: ({ image }) => projectSchema({ image }).extend({
    runs_on: z.string().optional()
  })
});

const now = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/now' }),
  schema: z.object({
    updated: z.coerce.date(),
    draft: z.boolean().default(false)
  })
});

export const collections = { writing, builds, agents, now };
