import { defineCollection, z } from "astro:content"
import { glob } from "astro/loaders"

// Blog posts migrated verbatim from lease.legalfriend.ai/blog (attorney-reviewed text).
// Do not edit post bodies without legal review.
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    // The lease app's <title> when it differed from the on-page headline.
    metaTitle: z.string().optional(),
    description: z.string(),
    slug: z.string(),
    publishedAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    author: z.string().optional(),
    image: z.string().url().optional(),
    sourceUrl: z.string().url(),
  }),
})

export const collections = { blog }
