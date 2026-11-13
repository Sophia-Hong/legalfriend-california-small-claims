// Shared helpers for the post-build AI-readable Markdown step.
// Source of truth = the built dist/*.html. build-ai-md.mjs writes llms.txt and the .md copies
// from it; check-ai-md.mjs re-reads both and fails the build if they drift from the HTML.
// No dependencies: the Astro output is well-formed, so a small tokenizer is enough.

const VOID = new Set(["meta", "link", "img", "br", "input", "hr", "source", "area", "base", "col", "wbr"])
const RAW = new Set(["script", "style"])
const BLOCK = new Set([
  "p", "div", "section", "article", "aside", "header", "footer", "main", "nav", "figure", "figcaption",
  "ul", "ol", "li", "h1", "h2", "h3", "h4", "h5", "h6", "table", "thead", "tbody", "tr", "td", "th",
  "details", "summary", "blockquote", "form", "button", "label", "hr", "dl", "dt", "dd", "pre",
])
const SKIP = new Set(["script", "style", "template", "noscript", "head", "svg"])

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " }
export function decode(s) {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
    if (e[0] === "#") {
      const n = e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10)
      return String.fromCodePoint(n)
    }
    return ENTITIES[e.toLowerCase()] ?? m
  })
}

export function parse(html) {
  const root = { tag: "#root", attrs: {}, children: [] }
  const stack = [root]
  const re = /<!--[\s\S]*?-->|<!doctype[^>]*>|<\/([a-zA-Z0-9]+)\s*>|<([a-zA-Z][a-zA-Z0-9]*)((?:\s+[^\s"'<>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'>]+))?)*)\s*(\/?)>/gi
  let last = 0
  let m
  const top = () => stack[stack.length - 1]
  while ((m = re.exec(html))) {
    if (m.index > last) top().children.push(html.slice(last, m.index))
    last = re.lastIndex
    if (m[1]) {
      const tag = m[1].toLowerCase()
      for (let i = stack.length - 1; i > 0; i--) {
        if (stack[i].tag === tag) { stack.length = i; break }
      }
    } else if (m[2]) {
      const tag = m[2].toLowerCase()
      const attrs = {}
      for (const a of (m[3] || "").matchAll(/([^\s"'<>\/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g)) {
        attrs[a[1].toLowerCase()] = decode(a[2] ?? a[3] ?? a[4] ?? "")
      }
      const el = { tag, attrs, children: [] }
      top().children.push(el)
      if (RAW.has(tag)) {
        const close = html.toLowerCase().indexOf(`</${tag}`, last)
        const end = close === -1 ? html.length : close
        el.children.push(html.slice(last, end))
        const gt = html.indexOf(">", end)
        last = re.lastIndex = gt === -1 ? html.length : gt + 1
      } else if (!VOID.has(tag) && !m[4]) {
        stack.push(el)
      }
    }
  }
  if (last < html.length) top().children.push(html.slice(last))
  return root
}

export function find(node, pred) {
  if (typeof node === "string") return null
  if (pred(node)) return node
  for (const c of node.children) {
    const r = find(c, pred)
    if (r) return r
  }
  return null
}

export function textOf(node) {
  if (typeof node === "string") return decode(node)
  return node.children.map(textOf).join("")
}

// Page facts straight from the built HTML.
export function pageMeta(root) {
  const title = textOf(find(root, (n) => n.tag === "title")).trim()
  const desc = find(root, (n) => n.tag === "meta" && n.attrs.name === "description")
  const canon = find(root, (n) => n.tag === "link" && n.attrs.rel === "canonical")
  const site = find(root, (n) => n.tag === "meta" && n.attrs.property === "og:site_name")
  return {
    title,
    description: desc ? desc.attrs.content : "",
    canonical: canon ? canon.attrs.href : "",
    siteName: site ? site.attrs.content : "",
  }
}

// Main content = everything between the site nav and the site footer.
export function mainNodes(root) {
  const body = find(root, (n) => n.tag === "body")
  const kids = body.children
  const navIdx = kids.findIndex((k) => typeof k !== "string" && k.tag === "nav" && k.attrs.class === "nav")
  const footIdx = kids.findIndex((k) => typeof k !== "string" && k.tag === "footer")
  if (navIdx === -1 || footIdx === -1 || footIdx < navIdx) throw new Error("page layout: site nav/footer not found")
  return kids.slice(navIdx + 1, footIdx)
}

const hidden = (n) => "hidden" in n.attrs

// Visible main text as a word list (whitespace-normalized). Block boundaries and <br> split words.
export function htmlWords(nodes) {
  let out = ""
  const walk = (n) => {
    if (typeof n === "string") { out += decode(n); return }
    if (SKIP.has(n.tag) || hidden(n)) return
    if (n.tag === "br") { out += " "; return }
    const b = BLOCK.has(n.tag)
    if (b) out += " "
    n.children.forEach(walk)
    if (b) out += " "
  }
  nodes.forEach(walk)
  return out.split(/\s+/).filter(Boolean)
}

// ---------- HTML -> Markdown ----------

const esc = (s) => s.replace(/[\\*`\[\]]/g, "\\$&")
// Literal "*" is already escaped by esc(), so a leading "*" here is our own emphasis mark.
const escLead = (line) => line.replace(/^(\s*)(#(?=#*\s)|>|[+\-](?=\s)|\d+(?=\.\s))/, (m, sp, c) => (/^\d/.test(c) ? `${sp}${c}\\` : `${sp}\\${c}`))

function wrap(mark, inner) {
  const t = inner.trim()
  if (!t) return inner
  const lead = inner.match(/^\s*/)[0]
  const trail = inner.match(/\s*$/)[0]
  return `${lead}${mark}${t}${mark}${trail}`
}

function link(inner, href, base) {
  const t = inner.trim()
  if (!t || !href) return inner
  let url
  try { url = new URL(href, base).href } catch { return inner }
  url = url.replace(/\)/g, "%29").replace(/ /g, "%20")
  return `${inner.match(/^\s*/)[0]}[${t}](${url})${inner.match(/\s*$/)[0]}`
}

function hasBlock(n) {
  return typeof n !== "string" && n.children.some((c) => typeof c !== "string" && (BLOCK.has(c.tag) || hasBlock(c)))
}

export function toMarkdown(nodes, base) {
  const inline = (n) => {
    if (typeof n === "string") return esc(decode(n).replace(/\s+/g, " "))
    if (SKIP.has(n.tag) || hidden(n) || n.tag === "img" || n.tag === "input") return ""
    const inner = () => n.children.map(inline).join("")
    switch (n.tag) {
      case "strong": case "b": return wrap("**", inner())
      case "em": case "i": return wrap("*", inner())
      case "code": return wrap("`", inner())
      case "a": return link(inner(), n.attrs.href, base)
      case "br": return "  \n"
      default: return inner()
    }
  }

  const flowToBlocks = (children, ctx = {}) => {
    const blocks = []
    let buf = ""
    const flush = () => {
      const t = buf.replace(/[ \t]+\n/g, "\n").trim()
      if (t) blocks.push(escLead(t))
      buf = ""
    }
    for (const c of children) {
      if (typeof c === "string") { buf += inline(c); continue }
      if (SKIP.has(c.tag) || hidden(c)) continue
      if (BLOCK.has(c.tag) || (c.tag === "a" && hasBlock(c))) {
        flush()
        blocks.push(...block(c, ctx))
      } else {
        buf += inline(c)
      }
    }
    flush()
    return blocks
  }

  const indent = (s, pad) => s.split("\n").map((l, i) => (i === 0 || !l ? l : pad + l)).join("\n")

  const block = (n, ctx) => {
    const t = n.tag
    if (t === "a") return flowToBlocks(n.children, { href: n.attrs.href })
    if (/^h[1-6]$/.test(t)) {
      let text = n.children.map(inline).join("").replace(/\s+/g, " ").trim()
      if (ctx.href) text = link(text, ctx.href, base)
      return text ? [`${"#".repeat(+t[1])} ${text}`] : []
    }
    if (t === "ul" || t === "ol") {
      const items = n.children.filter((c) => typeof c !== "string" && c.tag === "li" && !hidden(c))
      const lines = items.map((li, i) => {
        const marker = t === "ol" ? `${i + 1}. ` : "- "
        const body = flowToBlocks(li.children, ctx).join("\n")
        return `${marker}${indent(body, " ".repeat(marker.length))}`
      })
      return lines.length ? [lines.join("\n")] : []
    }
    if (t === "table") return table(n)
    if (t === "summary") {
      const text = n.children.map(inline).join("").replace(/\s+/g, " ").trim()
      return text ? [`**${text}**`] : []
    }
    if (t === "blockquote") {
      return flowToBlocks(n.children, ctx).map((b) => b.split("\n").map((l) => `> ${l}`).join("\n"))
    }
    if (t === "hr") return []
    return flowToBlocks(n.children, ctx)
  }

  const table = (tbl) => {
    const rows = []
    const collect = (n) => {
      for (const c of n.children) {
        if (typeof c === "string" || hidden(c)) continue
        if (c.tag === "tr") rows.push(c.children.filter((x) => typeof x !== "string" && (x.tag === "td" || x.tag === "th")))
        else if (["thead", "tbody", "tfoot"].includes(c.tag)) collect(c)
      }
    }
    collect(tbl)
    if (!rows.length) return []
    const cell = (c) => flowToBlocks(c.children).join(" ").replace(/\n/g, " ").replace(/\|/g, "\\|")
    const width = Math.max(...rows.map((r) => r.length))
    const line = (r) => `| ${Array.from({ length: width }, (_, i) => (r[i] ? cell(r[i]) : "")).join(" | ")} |`
    return [[line(rows[0]), `|${" --- |".repeat(width)}`, ...rows.slice(1).map(line)].join("\n")]
  }

  return flowToBlocks(nodes).join("\n\n") + "\n"
}

// Markdown (as emitted above) -> word list, for comparing against htmlWords.
export function mdWords(md) {
  const unesc = (s) => s.replace(/\\([\\*`\[\]#>+\-.|])/g, "$1")
  const words = []
  for (let line of md.split("\n")) {
    if (/^\s*\|(\s*:?-{3,}:?\s*\|)+\s*$/.test(line)) continue
    line = line.replace(/^(?:>\s?)*\s*(?:(?:[-*+]|\d+\.)\s+)?(?:#{1,6}\s+)?/, "")
    line = line.replace(/(?<!\\)\[((?:[^\]\\]|\\.)*)\]\([^)\s]*\)/g, "$1")
    line = line.replace(/(?<!\\)[*`]/g, "")
    line = line.replace(/\\\|/g, "\u0000").replace(/\|/g, " ").replace(/\u0000/g, "\\|")
    words.push(...unesc(line).split(/\s+/).filter(Boolean))
  }
  return words
}

// Pages come from the built sitemap.xml (the site's own list of public pages).
export function sitemapPaths(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname)
}
export const htmlFile = (p) => (p === "/" ? "index.html" : `${p.slice(1)}.html`)
export const mdFile = (p) => (p === "/" ? "index.md" : `${p.slice(1)}.md`)
