// Run: npm test   (node --experimental-strip-types --test)
// Exercises the download functions against a fake Stripe API and a fake R2 bucket.
import { test, beforeEach } from "node:test"
import assert from "node:assert/strict"
import { onRequestGet as status } from "../functions/api/kit/status.ts"
import { onRequestGet as file } from "../functions/api/kit/file.ts"
import { DOWNLOAD_META_KEY } from "../functions/_lib/kit.ts"

const SID = "cs_test_a1B2c3D4e5F6g7H8i9J0"
const PRICE = "price_kit79"
let session: any
let calls: { method: string; url: string; body?: string }[]

function fakeStripe() {
  globalThis.fetch = (async (url: string, init: RequestInit = {}) => {
    const method = init.method ?? "GET"
    calls.push({ method, url, body: init.body?.toString() })
    assert.match(String((init.headers as any).Authorization), /^Bearer sk_test_/)
    if (url.includes(`/checkout/sessions/${SID}`)) return new Response(JSON.stringify(session), { status: 200 })
    if (url.includes("/checkout/sessions/")) return new Response("{}", { status: 404 })
    if (method === "POST" && url.endsWith(`/payment_intents/${session.payment_intent.id}`)) {
      const p = new URLSearchParams(String(init.body))
      session.payment_intent.metadata[DOWNLOAD_META_KEY] = p.get(`metadata[${DOWNLOAD_META_KEY}]`)
      return new Response("{}", { status: 200 })
    }
    return new Response("{}", { status: 500 })
  }) as any
}

const bucket = {
  get: async (key: string) => (key === "kits/ca.zip" ? { body: new Blob(["PK-zip"]).stream(), size: 6 } : null),
}
const env = () => ({ STRIPE_SECRET_KEY: "sk_test_x", KIT_PRICE_ID: PRICE, KIT_OBJECT_KEY: "kits/ca.zip", KIT_FILENAME: "kit v1.zip", KITS: bucket })
const req = (path: string, sid = SID) => ({ request: new Request(`https://legalfriend.ai${path}?session_id=${sid}`), env: env() })

beforeEach(() => {
  calls = []
  session = {
    status: "complete",
    payment_status: "paid",
    customer_details: { email: "buyer@example.com" },
    line_items: { data: [{ price: { id: PRICE } }] },
    payment_intent: { id: "pi_123", metadata: {}, latest_charge: { refunded: false, amount_refunded: 0 } },
  }
  fakeStripe()
})

test("status: paid purchase, not yet downloaded", async () => {
  const r = await status(req("/api/kit/status"))
  assert.equal(r.status, 200)
  assert.deepEqual(await r.json(), { ok: true, downloaded: false, firstDownloadedAt: null, email: "buyer@example.com" })
  assert.equal(r.headers.get("Cache-Control"), "no-store")
})

test("file: first download stamps the PaymentIntent, then streams the zip", async () => {
  const r = await file(req("/api/kit/file"))
  assert.equal(r.status, 200)
  assert.equal(await r.text(), "PK-zip")
  assert.equal(r.headers.get("Content-Disposition"), 'attachment; filename="kitv1.zip"')
  const post = calls.find((c) => c.method === "POST")!
  assert.ok(post, "expected a PaymentIntent update")
  assert.match(decodeURIComponent(post.body!), /metadata\[kit_first_downloaded_at\]=\d{4}-\d{2}-\d{2}T/)
  const after = await (await status(req("/api/kit/status"))).json()
  assert.equal(after.downloaded, true)
})

test("file: repeat download does not re-stamp", async () => {
  session.payment_intent.metadata[DOWNLOAD_META_KEY] = "2026-09-29T00:00:00.000Z"
  const r = await file(req("/api/kit/file"))
  assert.equal(r.status, 200)
  assert.equal(calls.filter((c) => c.method === "POST").length, 0)
})

test("file: refuses to stream if the download can't be recorded", async () => {
  globalThis.fetch = (async (url: string, init: RequestInit = {}) =>
    (init.method ?? "GET") === "POST" ? new Response("{}", { status: 500 }) : new Response(JSON.stringify(session))) as any
  const r = await file(req("/api/kit/file"))
  assert.equal(r.status, 502)
  assert.equal((await r.json()).reason, "stripe_error")
})

for (const [name, mutate, code, reason] of [
  ["unpaid session", (s: any) => (s.payment_status = "unpaid"), 402, "unpaid"],
  ["open session", (s: any) => (s.status = "open"), 402, "unpaid"],
  ["other product", (s: any) => (s.line_items.data = [{ price: { id: "price_other" } }]), 403, "wrong_product"],
  ["refunded charge", (s: any) => (s.payment_intent.latest_charge.refunded = true), 410, "refunded"],
  ["partially refunded", (s: any) => (s.payment_intent.latest_charge.amount_refunded = 100), 410, "refunded"],
] as const) {
  test(`both endpoints reject: ${name}`, async () => {
    mutate(session)
    for (const fn of [status, file]) {
      const r = await fn(req("/api/kit/x"))
      assert.equal(r.status, code)
      assert.equal((await r.json()).reason, reason)
    }
    assert.equal(calls.filter((c) => c.method === "POST").length, 0)
  })
}

test("rejects malformed and unknown session ids without leaking", async () => {
  for (const bad of ["", "abc", "cs_live_../../x", "pi_123"]) {
    const r = await file(req("/api/kit/file", encodeURIComponent(bad)))
    assert.equal(r.status, 400)
  }
  assert.equal(calls.length, 0, "no Stripe call for malformed ids")
  const r = await status(req("/api/kit/status", "cs_test_unknownunknown1"))
  assert.equal(r.status, 404)
})

test("not configured → 503", async () => {
  const r = await status({ request: new Request(`https://x/api/kit/status?session_id=${SID}`), env: {} })
  assert.equal(r.status, 503)
})

test("missing object → 503 and no stamp", async () => {
  const e = { ...env(), KIT_OBJECT_KEY: "kits/missing.zip" }
  const r = await file({ request: new Request(`https://x/api/kit/file?session_id=${SID}`), env: e })
  assert.equal(r.status, 503)
  assert.equal(calls.filter((c) => c.method === "POST").length, 0)
})
