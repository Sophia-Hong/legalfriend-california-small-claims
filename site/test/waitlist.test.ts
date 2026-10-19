// Run: npm test   (node --experimental-strip-types --test)
// The waitlist function against a fake R2 bucket.
import { test, beforeEach } from "node:test"
import assert from "node:assert/strict"
import { onRequestPost, waitlistKey } from "../functions/api/waitlist.ts"

let store: Map<string, string>
let failPut: boolean
const env = () => ({
  KITS: {
    async put(key: string, value: string) {
      if (failPut) throw new Error("r2 down")
      store.set(key, value)
    },
  },
})

beforeEach(() => {
  store = new Map()
  failPut = false
})

const post = (body: string, type = "application/json", e: any = env()) =>
  onRequestPost({ request: new Request("https://legalfriend.ai/api/waitlist", { method: "POST", headers: { "Content-Type": type }, body }), env: e })

test("stores one object per address (case-insensitive), only email/kit/time", async () => {
  let r = await post(JSON.stringify({ email: "Ana@Example.com", kit: "ca-small-claims" }))
  assert.equal(r.status, 200)
  assert.deepEqual(await r.json(), { ok: true })
  r = await post(JSON.stringify({ email: " ana@example.com ", kit: "ca-small-claims" }))
  assert.equal(r.status, 200)
  assert.equal(store.size, 1)
  const [key, value] = [...store][0]
  assert.equal(key, await waitlistKey("ca-small-claims", "ana@example.com"))
  assert.match(key, /^waitlist\/ca-small-claims\/[0-9a-f]{64}\.json$/)
  assert.deepEqual(Object.keys(JSON.parse(value)).sort(), ["at", "email", "kit"])
})

test("rejects bad email, unknown kit, bad body, oversize body — nothing stored", async () => {
  for (const [body, type, status, reason] of [
    [JSON.stringify({ email: "not-an-email", kit: "ca-small-claims" }), "application/json", 400, "bad_email"],
    [JSON.stringify({ email: "a@b", kit: "ca-small-claims" }), "application/json", 400, "bad_email"],
    [JSON.stringify({ email: "a@example.com", kit: "lease" }), "application/json", 400, "bad_kit"],
    [JSON.stringify(["a@example.com"]), "application/json", 400, "bad_request"],
    ["{broken", "application/json", 400, "bad_request"],
    ["email=a@example.com", "text/plain", 400, "bad_request"],
    [JSON.stringify({ email: "a@example.com", kit: "ca-small-claims", pad: "x".repeat(3000) }), "application/json", 413, "bad_request"],
  ] as const) {
    const r = await post(body, type)
    assert.equal(r.status, status, body.slice(0, 40))
    assert.deepEqual(await r.json(), { ok: false, reason })
  }
  assert.equal(store.size, 0)
})

test("honeypot filled = success reply, nothing stored", async () => {
  const r = await post(JSON.stringify({ email: "bot@example.com", kit: "ca-small-claims", website: "http://spam" }))
  assert.equal(r.status, 200)
  assert.equal(store.size, 0)
})

test("missing bucket = 503 not_configured; store failure = 502", async () => {
  let r = await post(JSON.stringify({ email: "a@example.com", kit: "ca-small-claims" }), "application/json", {})
  assert.equal(r.status, 503)
  failPut = true
  r = await post(JSON.stringify({ email: "a@example.com", kit: "ca-small-claims" }))
  assert.equal(r.status, 502)
  assert.deepEqual(await r.json(), { ok: false, reason: "store_error" })
})

test("plain form post (no JS) → 303 back to the page with the outcome", async () => {
  let r = await post("email=a%40example.com&kit=ca-small-claims&website=", "application/x-www-form-urlencoded")
  assert.equal(r.status, 303)
  assert.equal(r.headers.get("Location"), "/california-small-claims?waitlist=ok#waitlist")
  assert.equal(store.size, 1)
  r = await post("email=nope&kit=ca-small-claims", "application/x-www-form-urlencoded")
  assert.equal(r.headers.get("Location"), "/california-small-claims?waitlist=error#waitlist")
})
