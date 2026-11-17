// POST /api/waitlist → "tell me once when the kit is ready" sign-up (Theo #legalfriend-product 1792395726/1792395887).
//
// Stores only the address, the kit id and the time — no case details (the form asks not to include any) and no cookies.
// One R2 object per address under waitlist/<kit>/, keyed by sha256 of the lower-cased address, so signing up again
// overwrites instead of duplicating. The sign-up count = the number of objects under that prefix.
// Bucket: the existing KITS binding (no new binding); the waitlist/ prefix is never served by /api/kit/file
// (that only reads object keys from the kit catalog).
//
// Accepts JSON (the page script) or a plain form post (no JS: 303 back to the page with ?waitlist=ok|error).
import { json } from "../_lib/kit.ts"

export interface WaitlistEnv {
  KITS?: { put(key: string, value: string, opts?: { httpMetadata?: { contentType?: string } }): Promise<unknown> }
}

export const WAITLIST_KITS = new Set(["ca-small-claims"])
export const WAITLIST_PREFIX = "waitlist/"
const MAX_BODY = 2048
const EMAIL = /^[^\s@<>()[\]\\,;:"]{1,64}@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/

async function sha256hex(s: string): Promise<string> {
  const d = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s))
  return [...new Uint8Array(d)].map((b) => b.toString(16).padStart(2, "0")).join("")
}

export async function waitlistKey(kit: string, email: string): Promise<string> {
  return `${WAITLIST_PREFIX}${kit}/${await sha256hex(email.trim().toLowerCase())}.json`
}

type Outcome = { ok: true } | { ok: false; status: number; reason: "not_configured" | "bad_request" | "bad_email" | "bad_kit" | "store_error" }

async function handle(fields: Record<string, string>, env: WaitlistEnv): Promise<Outcome> {
  if (fields.website) return { ok: true } // honeypot: bots fill the hidden field; pretend success, store nothing
  const email = (fields.email ?? "").trim()
  const kit = (fields.kit ?? "").trim()
  if (!WAITLIST_KITS.has(kit)) return { ok: false, status: 400, reason: "bad_kit" }
  if (email.length > 254 || !EMAIL.test(email)) return { ok: false, status: 400, reason: "bad_email" }
  if (!env.KITS?.put) return { ok: false, status: 503, reason: "not_configured" }
  try {
    await env.KITS.put(await waitlistKey(kit, email), JSON.stringify({ email, kit, at: new Date().toISOString() }), {
      httpMetadata: { contentType: "application/json" },
    })
  } catch {
    return { ok: false, status: 502, reason: "store_error" }
  }
  return { ok: true }
}

export async function onRequestPost({ request, env }: { request: Request; env: WaitlistEnv }): Promise<Response> {
  const type = (request.headers.get("Content-Type") ?? "").toLowerCase()
  const isForm = type.startsWith("application/x-www-form-urlencoded")
  const raw = await request.text()
  let out: Outcome
  let fields: Record<string, string> | null = null
  if (raw.length > MAX_BODY) {
    out = { ok: false, status: 413, reason: "bad_request" }
  } else {
    try {
      if (isForm) fields = Object.fromEntries(new URLSearchParams(raw))
      else if (type.startsWith("application/json")) {
        const p = JSON.parse(raw)
        if (p && typeof p === "object" && !Array.isArray(p)) fields = Object.fromEntries(Object.entries(p).map(([k, v]) => [k, typeof v === "string" ? v : ""]))
      }
    } catch {
      fields = null
    }
    out = fields ? await handle(fields, env) : { ok: false, status: 400, reason: "bad_request" }
  }
  if (isForm) {
    const back = new URL("/california-small-claims", request.url)
    back.searchParams.set("waitlist", out.ok ? "ok" : "error")
    back.hash = "waitlist"
    return new Response(null, { status: 303, headers: { Location: back.pathname + back.search + back.hash, "Cache-Control": "no-store" } })
  }
  return out.ok ? json({ ok: true }) : json({ ok: false, reason: out.reason }, out.status)
}
