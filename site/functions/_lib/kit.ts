// Purchase verification for gated kit downloads (Cloudflare Pages Functions).
//
// No database: Stripe is the record. A download is allowed only for a Checkout Session that
// is complete, paid, not refunded, and contains KIT_PRICE_ID. The first download is stamped
// on the PaymentIntent metadata, which is what the refund policy ("refund until first
// download") is checked against.
//
// Env (Pages → Settings → Variables and Secrets / Bindings):
//   STRIPE_SECRET_KEY  secret; restricted key with Checkout Sessions: Read,
//                      PaymentIntents: Write, Charges: Read
//   KIT_CATALOG        JSON object keyed by Stripe Price ID, one entry per kit:
//                      {"price_...": {"name": "California Small Claims Kit",
//                                     "object": "ca-small-claims/....zip",
//                                     "filename": "....zip"}}
//   — or, for a single kit — KIT_PRICE_ID, KIT_OBJECT_KEY, KIT_FILENAME (KIT_NAME optional)
//   KITS               R2 bucket binding

export interface KitEnv {
  STRIPE_SECRET_KEY?: string
  KIT_CATALOG?: string
  KIT_PRICE_ID?: string
  KIT_OBJECT_KEY?: string
  KIT_FILENAME?: string
  KIT_NAME?: string
  KITS?: { get(key: string): Promise<{ body: ReadableStream; size: number } | null> }
}

export interface Product {
  priceId: string
  name: string
  object: string
  filename: string
}

export type Verdict =
  | { ok: true; paymentIntentId: string; firstDownloadedAt: string | null; email: string | null; product: Product }
  | { ok: false; status: number; reason: "not_configured" | "bad_session" | "not_found" | "unpaid" | "wrong_product" | "refunded" | "stripe_error" }

export const DOWNLOAD_META_KEY = "kit_first_downloaded_at"
const SESSION_ID = /^cs_(live|test)_[A-Za-z0-9]{10,200}$/
const STRIPE = "https://api.stripe.com/v1"

export function catalog(env: KitEnv): Map<string, Product> {
  const out = new Map<string, Product>()
  if (env.KIT_CATALOG) {
    let parsed: Record<string, { name?: string; object?: string; filename?: string }>
    try {
      parsed = JSON.parse(env.KIT_CATALOG)
    } catch {
      return out
    }
    for (const [priceId, p] of Object.entries(parsed ?? {})) {
      if (p?.object) out.set(priceId, { priceId, name: p.name || "LegalFriend Kit", object: p.object, filename: p.filename || "legalfriend-kit.zip" })
    }
  } else if (env.KIT_PRICE_ID && env.KIT_OBJECT_KEY) {
    out.set(env.KIT_PRICE_ID, {
      priceId: env.KIT_PRICE_ID,
      name: env.KIT_NAME || "California Small Claims Kit",
      object: env.KIT_OBJECT_KEY,
      filename: env.KIT_FILENAME || "legalfriend-kit.zip",
    })
  }
  return out
}

export function configured(env: KitEnv): boolean {
  return Boolean(env.STRIPE_SECRET_KEY && env.KITS && catalog(env).size > 0)
}

async function stripe(env: KitEnv, path: string, init: RequestInit = {}): Promise<Response> {
  return fetch(`${STRIPE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
      "Stripe-Version": "2024-06-20",
      ...(init.body ? { "Content-Type": "application/x-www-form-urlencoded" } : {}),
    },
  })
}

export async function verifyPurchase(env: KitEnv, sessionId: string | null): Promise<Verdict> {
  if (!configured(env)) return { ok: false, status: 503, reason: "not_configured" }
  if (!sessionId || !SESSION_ID.test(sessionId)) return { ok: false, status: 400, reason: "bad_session" }

  const res = await stripe(
    env,
    `/checkout/sessions/${sessionId}?expand[]=line_items&expand[]=payment_intent.latest_charge`,
  )
  if (res.status === 404) return { ok: false, status: 404, reason: "not_found" }
  if (!res.ok) return { ok: false, status: 502, reason: "stripe_error" }
  const s: any = await res.json()

  if (s.status !== "complete" || s.payment_status !== "paid") return { ok: false, status: 402, reason: "unpaid" }
  const products = catalog(env)
  const items: any[] = s.line_items?.data ?? []
  const product = items.map((li) => products.get(li?.price?.id)).find(Boolean)
  if (!product) return { ok: false, status: 403, reason: "wrong_product" }

  const pi = s.payment_intent
  if (!pi || typeof pi !== "object") return { ok: false, status: 502, reason: "stripe_error" }
  const charge = pi.latest_charge
  if (charge && typeof charge === "object" && (charge.refunded || charge.amount_refunded > 0)) {
    return { ok: false, status: 410, reason: "refunded" }
  }
  return {
    ok: true,
    paymentIntentId: pi.id,
    firstDownloadedAt: pi.metadata?.[DOWNLOAD_META_KEY] ?? null,
    email: s.customer_details?.email ?? null,
    product,
  }
}

export async function recordFirstDownload(env: KitEnv, paymentIntentId: string, at: Date): Promise<boolean> {
  const body = new URLSearchParams({ [`metadata[${DOWNLOAD_META_KEY}]`]: at.toISOString() })
  const res = await stripe(env, `/payment_intents/${paymentIntentId}`, { method: "POST", body })
  return res.ok
}

export const noStore = {
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow",
  "Referrer-Policy": "no-referrer",
}

export function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...noStore },
  })
}
