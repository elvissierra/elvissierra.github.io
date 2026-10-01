import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One markdown file per case study. The filename is the URL slug (/projects/<slug>),
// and images live in public/images/projects/<slug>/.
const projects = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/content/projects' }),
	schema: z.object({
		title: z.string(),
		summary: z.string(),
		tags: z.array(z.string()),
		order: z.number(),
		cover: z.string(),
		coverAlt: z.string(),
		gallery: z.array(z.object({ src: z.string(), caption: z.string() })),
		repo: z.url().optional(),
	}),
});

export const collections = { projects };
