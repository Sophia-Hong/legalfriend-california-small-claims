import { defineConfig } from "astro/config"

// Static site for legalfriend.ai, deployed to Cloudflare Pages (build: `npm run build`, output: `dist`).
export default defineConfig({
  site: "https://legalfriend.ai",
  trailingSlash: "ignore",
  build: { format: "directory" },
})
