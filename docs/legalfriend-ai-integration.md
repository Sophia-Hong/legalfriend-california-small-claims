# Serving the kit on legalfriend.ai

*Created: 2026-09-28 | Status: AI-GENERATED proposal | Requires Review: YES*

## Current state (checked 2026-09-28)

| | |
|---|---|
| Live repo | `Sophia-Hong/legalfriend_v1.1` (monorepo, `frontend/` + `backend/`) |
| Vercel project serving the domain | `legalfriend-v1-1-frontend` |
| Domains on that project | `www.legalfriend.ai` (primary), `legalfriend.ai` → redirects to `www` |
| Other LegalFriend repos | `legalfriendv1.0` (last push 2025-07), `legalfriend_eval` (2025-07) — inactive |

So any URL under `legalfriend.ai` is answered by the v1.1 frontend today.

## Options for `legalfriend.ai/california-small-claims`

**A. Separate Vercel project + path rewrite (recommended)**
- Add a `site/` Next.js app to this repo; deploy it as its own Vercel project.
- In `legalfriend_v1.1/frontend/next.config.mjs`, add one rewrite:
  `/california-small-claims/:path*` → `https://<new-project>.vercel.app/california-small-claims/:path*`.
- Pros: keeps the PRD's SEO paths on the main domain; the kit ships independently of
  the lease product; the lease product can be wound down later without touching this.
- Cons: one small change to the production repo (needs sign-off), two deploys to watch.

**B. Build the pages inside the v1.1 frontend**
- Least infra. But ties the new product to a codebase you plan to retire, and
  mixes the lease-review legal copy with the small-claims copy.

**C. Subdomain (`smallclaims.legalfriend.ai`)**
- Cleanest separation, but the PRD's URL plan (§14–15) is path-based under the main
  domain, which is better for building one domain's search authority.

When the lease product is retired, option A lets the new project take over the apex
domain directly and the rewrite goes away.

## Checkout

PRD open question #8. The v1.1 stack already has Stripe live. For the kit, a Stripe
Payment Link or Checkout Session that delivers a download / repo-invite is enough;
no case data is involved, so none of the v1.1 upload/session machinery is needed.
