// GET /api/kit/status?session_id=cs_... → purchase state for the download page. Read-only.
import { json, verifyPurchase, type KitEnv } from "../../_lib/kit.ts"

export async function onRequestGet({ request, env }: { request: Request; env: KitEnv }): Promise<Response> {
  const sessionId = new URL(request.url).searchParams.get("session_id")
  const v = await verifyPurchase(env, sessionId)
  if (!v.ok) return json({ ok: false, reason: v.reason }, v.status)
  return json({ ok: true, downloaded: v.firstDownloadedAt !== null, firstDownloadedAt: v.firstDownloadedAt, email: v.email, product: v.product.name })
}
