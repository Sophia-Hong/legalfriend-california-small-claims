import { defineConfig } from "astro/config"

// Static site for legalfriend.ai, deployed to Cloudflare Pages (build: `npm run build`, output: `dist`).
export default defineConfig({
  site: "https://legalfriend.ai",
  // "file" output (california-small-claims.html) lets Pages serve /california-small-claims
  // directly; "directory" output made Pages 308 it to a trailing-slash URL that
  // didn't match the canonical.
  trailingSlash: "never",
  build: { format: "file" },
  // Keep straight quotes: migrated blog posts are verbatim, attorney-reviewed text.
  markdown: { smartypants: false },
})
