import type { APIRoute } from "astro"
import { getCollection } from "astro:content"
import { LEASE_LANDING_APPROVED } from "../site"

// Keep in sync with src/pages. Only list pages meant for search.
const PATHS = [
  "/",
  "/california-small-claims",
  ...(LEASE_LANDING_APPROVED ? ["/california-lease-review"] : []),
  "/blog",
  "/deposit-dispute",
  "/deposit-dispute/deadline-calculator",
  "/terms",
  "/privacy",
]

export const GET: APIRoute = async ({ site }) => {
  const posts = (await getCollection("blog")).map((p) => `/blog/${p.id}`)
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      [...PATHS, ...posts].map((p) => `  <url><loc>${new URL(p, site)}</loc></url>`).join("\n") +
      `\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  )
}
