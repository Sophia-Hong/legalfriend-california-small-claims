// Run after `astro build` (part of `npm run build`): every /blog-images/ reference in the
// built site must resolve to a file under dist/blog-images/, or the build fails.
// Covers body <img src> and the absolute https://legalfriend.ai/blog-images/ og/twitter
// image URLs from frontmatter. A file renamed without its links (F-338 w1-4) breaks here,
// not in a preview 404.
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs"
import { join, relative } from "node:path"

const dist = process.argv[2] ?? "dist"
const REF = /(?:https?:\/\/(?:www\.)?legalfriend\.ai)?\/blog-images\/([^"'\s)<>?#]+)/g

function* files(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) yield* files(p)
    else if (/\.(html|xml|json|txt)$/.test(name)) yield p
  }
}

if (!existsSync(dist)) {
  console.error(`check-blog-images: ${dist} not found — run astro build first`)
  process.exit(2)
}

let refs = 0
const missing = []
for (const f of files(dist)) {
  for (const m of readFileSync(f, "utf8").matchAll(REF)) {
    refs++
    const name = decodeURIComponent(m[1])
    if (!existsSync(join(dist, "blog-images", name))) missing.push(`${relative(dist, f)}: /blog-images/${name}`)
  }
}

if (missing.length) {
  console.error(`check-blog-images: ${missing.length} of ${refs} references do not resolve:`)
  for (const line of missing) console.error(`  ${line}`)
  process.exit(1)
}
if (refs === 0) {
  // The blog has image posts; zero matches means the pattern or the build changed, not "all good".
  console.error("check-blog-images: no /blog-images/ references found in dist — check the pattern")
  process.exit(1)
}
console.log(`check-blog-images: ${refs} references, all resolve`)
