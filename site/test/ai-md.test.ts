// Run: npm test   (node --experimental-strip-types --test)
// The llms.txt / .md checker must fail on any change to a generated file: words, a stray "*", a link target.
import { test, after } from "node:test"
import assert from "node:assert/strict"
import { mkdtempSync, writeFileSync, readFileSync, rmSync, realpathSync } from "node:fs"
import { tmpdir } from "node:os"
import { join, sep } from "node:path"
import { execFileSync } from "node:child_process"
// @ts-ignore -- plain .mjs build scripts
import { checkDist } from "../scripts/check-ai-md.mjs"

const PAGE = `<!doctype html><html><head><title>Home | LegalFriend</title>
<meta name="description" content="Lawyer-designed self-help.">
<link rel="canonical" href="https://legalfriend.ai/">
<meta property="og:site_name" content="LegalFriend"></head>
<body><nav class="nav"><a href="/">LegalFriend</a></nav>
<main><p>Built for your AI. Not ours.</p>
<h2><a href="/california-small-claims">California Small Claims Kit</a></h2>
<p>See the <strong>kit</strong> page.</p></main>
<footer>footer</footer></body></html>`

const made: string[] = []
// Remove only the temp dirs this file made (Kai PR #5 r2): each must sit directly in the real tmpdir with our prefix.
after(() => {
  const base = realpathSync(tmpdir()) + sep + "ai-md-test-"
  for (const d of made) {
    const r = realpathSync(d)
    if (!r.startsWith(base) || r.length <= base.length) throw new Error(`refusing to remove ${r}`)
    rmSync(r, { recursive: true })
  }
})

function fixture() {
  const dist = mkdtempSync(join(tmpdir(), "ai-md-test-"))
  made.push(dist)
  writeFileSync(join(dist, "index.html"), PAGE)
  writeFileSync(join(dist, "sitemap.xml"), `<urlset><url><loc>https://legalfriend.ai/</loc></url></urlset>`)
  writeFileSync(join(dist, "_headers"), "/*\n  X-Content-Type-Options: nosniff\n")
  execFileSync(process.execPath, [join(import.meta.dirname, "../scripts/build-ai-md.mjs"), dist])
  return dist
}

function mutate(dist: string, file: string, from: string, to: string) {
  const p = join(dist, file)
  const s = readFileSync(p, "utf8")
  assert.ok(s.includes(from), `${file} has no "${from}"`)
  writeFileSync(p, s.replace(from, to))
}

test("generated files pass the check", () => {
  assert.deepEqual(checkDist(fixture()), [])
})

test("a stray * inside a word fails (Kai PR #5)", () => {
  const d = fixture()
  mutate(d, "index.md", "Not ours.", "N*ot ours.")
  assert.ok(checkDist(d).length > 0)
})

test("a changed link target fails, even with the same text (Kai PR #5)", () => {
  const d = fixture()
  mutate(d, "index.md", "https://legalfriend.ai/california-small-claims", "https://legalfriend.ai/kit/download")
  assert.ok(checkDist(d).some((e) => e.includes("link 0 differs")))
})

test("a changed word fails", () => {
  const d = fixture()
  mutate(d, "index.md", "Built for your AI.", "Built for every AI.")
  assert.ok(checkDist(d).some((e) => e.includes("differs from page text")))
})

test("a changed llms.txt description fails", () => {
  const d = fixture()
  mutate(d, "llms.txt", ": Lawyer-designed self-help.", ": The best self-help.")
  assert.ok(checkDist(d).some((e) => e.includes("description differs")))
})
