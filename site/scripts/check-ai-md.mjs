// Fails (exit 1) if dist/llms.txt or any dist/*.md differs from the built HTML:
//  - every llms.txt title/description must equal the page's <title>/<meta name="description">
//  - the intro line must equal the home page description
//  - every sitemap page must be listed once, nothing else
//  - each .md must have the same word sequence as the page's visible main text
// Usage: node scripts/check-ai-md.mjs [distDir]
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { parse, pageMeta, mainNodes, htmlWords, mdWords, sitemapPaths, htmlFile, mdFile } from "./ai-md.mjs"

export function checkDist(dist) {
  const errors = []
  const paths = sitemapPaths(readFileSync(join(dist, "sitemap.xml"), "utf8"))
  const metas = new Map()

  for (const p of paths) {
    const root = parse(readFileSync(join(dist, htmlFile(p)), "utf8"))
    const meta = pageMeta(root)
    metas.set(meta.canonical, { path: p, ...meta })
    let md
    try { md = readFileSync(join(dist, mdFile(p)), "utf8") } catch { errors.push(`${p}: ${mdFile(p)} missing`); continue }
    const a = htmlWords(mainNodes(root))
    const b = mdWords(md)
    if (!a.length) errors.push(`${p}: page has no visible main text`)
    const n = Math.max(a.length, b.length)
    for (let i = 0; i < n; i++) {
      if (a[i] !== b[i]) {
        errors.push(`${p}: ${mdFile(p)} differs from page text at word ${i}: html "${a.slice(i, i + 6).join(" ")}" vs md "${b.slice(i, i + 6).join(" ")}"`)
        break
      }
    }
  }

  const lines = readFileSync(join(dist, "llms.txt"), "utf8").split("\n")
  const home = metas.get("https://legalfriend.ai/") ?? [...metas.values()].find((m) => m.path === "/")
  const listed = new Set()
  let seenH1 = false, seenIntro = false
  for (const [i, line] of lines.entries()) {
    const at = `llms.txt:${i + 1}`
    if (!line) continue
    let m
    if (line.startsWith("# ")) {
      seenH1 = true
      if (line !== `# ${home.siteName}`) errors.push(`${at}: title is not the published site name`)
    } else if (line.startsWith("> ")) {
      seenIntro = true
      if (line !== `> ${home.description}`) errors.push(`${at}: intro differs from the home page description`)
    } else if (line === "## Pages" || line === "## Blog") {
      // neutral structural headings
    } else if ((m = line.match(/^- \[(.+?)\]\((\S+)\): (.+)$/))) {
      const page = metas.get(m[2])
      if (!page) { errors.push(`${at}: URL not in sitemap: ${m[2]}`); continue }
      if (listed.has(m[2])) errors.push(`${at}: listed twice: ${m[2]}`)
      listed.add(m[2])
      if (m[1] !== page.title) errors.push(`${at}: title differs from <title> of ${page.path}`)
      if (m[3] !== page.description) errors.push(`${at}: description differs from meta description of ${page.path}`)
    } else {
      errors.push(`${at}: unexpected line: ${line}`)
    }
  }
  if (!seenH1 || !seenIntro) errors.push("llms.txt: missing title or intro line")
  for (const c of metas.keys()) if (!listed.has(c)) errors.push(`llms.txt: page not listed: ${c}`)
  return errors
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const errors = checkDist(process.argv[2] ?? "dist")
  if (errors.length) {
    console.error("ai-md check FAILED:\n" + errors.map((e) => "  - " + e).join("\n"))
    process.exit(1)
  }
  console.log("ai-md check ok")
}
