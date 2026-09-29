import type { APIRoute } from "astro"
import { SITE_LIVE } from "../site"

export const GET: APIRoute = ({ site }) =>
  new Response(
    SITE_LIVE
      ? `User-agent: *\nAllow: /\nDisallow: /kit/\nDisallow: /api/\n\nSitemap: ${new URL("/sitemap.xml", site)}\n`
      : "User-agent: *\nDisallow: /\n",
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  )
