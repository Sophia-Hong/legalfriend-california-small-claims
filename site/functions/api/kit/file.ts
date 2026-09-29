// GET /api/kit/file?session_id=cs_... → streams the kit zip for a verified purchase and
// stamps the first download on the PaymentIntent (this ends the refund window).
import { json, noStore, recordFirstDownload, verifyPurchase, type KitEnv } from "../../_lib/kit.ts"

export async function onRequestGet({ request, env }: { request: Request; env: KitEnv }): Promise<Response> {
  const sessionId = new URL(request.url).searchParams.get("session_id")
  const v = await verifyPurchase(env, sessionId)
  if (!v.ok) return json({ ok: false, reason: v.reason }, v.status)

  const obj = await env.KITS!.get(env.KIT_OBJECT_KEY!)
  if (!obj) return json({ ok: false, reason: "file_missing" }, 503)

  // Record before streaming: if Stripe can't record it, don't hand out the file, so the
  // refund window is never ambiguous.
  if (v.firstDownloadedAt === null && !(await recordFirstDownload(env, v.paymentIntentId, new Date()))) {
    return json({ ok: false, reason: "stripe_error" }, 502)
  }

  const filename = (env.KIT_FILENAME || "legalfriend-kit.zip").replace(/[^A-Za-z0-9._-]/g, "")
  return new Response(obj.body, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Length": String(obj.size),
      "Content-Disposition": `attachment; filename="${filename}"`,
      ...noStore,
    },
  })
}
