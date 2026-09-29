import type { APIRoute } from "astro"

// Keep in sync with src/pages. Only list pages meant for search.
const PATHS = ["/", "/california-small-claims", "/terms", "/privacy"]

export const GET: APIRoute = ({ site }) =>
  new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      PATHS.map((p) => `  <url><loc>${new URL(p, site)}</loc></url>`).join("\n") +
      `\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  )
