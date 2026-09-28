# Serving the kit on legalfriend.ai

*Created: 2026-09-28 | Status: AI-GENERATED plan | Requires Review: YES*

## Current state (checked 2026-09-28)

| | |
|---|---|
| Registrar | Namecheap |
| DNS | **Cloudflare** (Free, account `info@legalfriend.ai`) — nameservers `bjorn.ns.cloudflare.com`, `mallory.ns.cloudflare.com`, switched 2026-09-28. Previous: `dns1/dns2.registrar-servers.com` (Namecheap records left intact for rollback) |
| `legalfriend.ai`, `www` | Vercel project `legalfriend-v1-1-frontend` (lease-review app, repo `legalfriend_v1.1`) |
| `api.legalfriend.ai` | Vercel project `legalfriend-v1-1-backend` |
| Other LegalFriend repos | `legalfriendv1.0`, `legalfriend_eval` — inactive since 2025-07 |

## Live state (cutover completed 2026-09-28)

| Hostname | Served by | Cloudflare proxy |
|---|---|---|
| `legalfriend.ai`, `www` | **Cloudflare Pages** project `legalfriend-site` (this repo, `site/`); `www` 301 → apex via Redirect Rule | Proxied |
| `lease.legalfriend.ai` | Vercel `legalfriend-v1-1-frontend` — lease-review app stays as is | **DNS only** |
| `api.legalfriend.ai` | Vercel `legalfriend-v1-1-backend` | **DNS only** |

Vercel hostnames stay "DNS only" so Cloudflare never proxies in front of Vercel.
The lease-review app is not ported; if it later becomes a bring-your-own-AI prompt
kit it turns static and can move to Pages then.

Stack for this repo's site: static site (Astro) on Cloudflare Pages; Stripe webhook
on Pages Functions; kit downloads from R2 via signed URLs; Cloudflare Web Analytics
(cookieless, fits PRD §19).

## Migration steps

1. ✅ *Done 2026-09-28 (awaiting Active).* 10 records copied 1:1, all DNS only;
   SSL/TLS Full (strict); no DNSSEC, forwarding, or URL redirects existed.
   **DNS move only (no visible change).** Add `legalfriend.ai` to Cloudflare (Free),
   copy every Namecheap record, set all to DNS only, disable DNSSEC at Namecheap if
   on, switch nameservers. Replace any Namecheap-hosted email forwarding / URL
   redirects with Cloudflare Email Routing / Redirect Rules.
2. ✅ *Done 2026-09-28.* **Lease app to subdomain** (change in `legalfriend_v1.1`, needs sign-off):
   `https://legalfriend.ai` is hard-coded in ~20 files (canonical URLs, Stripe
   success/cancel URLs, emails, sitemap/robots, JSON-LD). Move to one env var, add the
   subdomain to the Vercel project, update the Stripe webhook endpoint and Supabase
   auth redirect URLs.
   *2026-09-28:* code change prepared on `legalfriend_v1.1` branch
   `claude/amazing-cori-9r2bxk` (not yet committed — the repo's interactive
   `codex` pre-commit hook can't run in the cloud session). All origin references now
   read `NEXT_PUBLIC_SITE_ORIGIN` (default `https://legalfriend.ai`, so merging alone
   changes nothing). Cutover = add `lease.legalfriend.ai` to the Vercel project + a
   DNS-only CNAME in Cloudflare, set `NEXT_PUBLIC_SITE_ORIGIN=https://lease.legalfriend.ai`,
   redeploy, then update the Stripe webhook endpoint and Supabase auth redirect URLs.
   The lease app's static `public/llms.txt` still lists apex URLs; update it then.
3. ✅ *Done 2026-09-28.* **Launch the new site** on the apex/`www` (`site/`, preview mode by default).
   Apex is primary (PRD URLs are `https://legalfriend.ai/...`); `www` 301s to apex. 301-redirect old lease-app paths
   (`/upload`, `/pricing`, `/blog/*`, …) to the subdomain to keep search equity.

## Open decision

v1.1 already has attorney-reviewed `/deposit-dispute` pages (deadline calculator,
deposit kit). Security deposit is a PRD §15.3 dispute type
(`/california-small-claims/security-deposit`). Decide whether those pages move to
the new site or stay with the lease app.

## Known gap (pre-existing, not caused by the move)

The apex has no Google Workspace SPF (`v=spf1 include:_spf.google.com ~all`) and no
Google DKIM record, so mail sent from `@legalfriend.ai` via Gmail may land in spam.
Add both in Cloudflare after the zone is Active.

## Cutover record (2026-09-28)

- `legalfriend_v1.1` PR #10 merged; Vercel `NEXT_PUBLIC_SITE_ORIGIN=https://lease.legalfriend.ai`
  (Production), redeployed. `lease.legalfriend.ai` added to `legalfriend-v1-1-frontend`.
- Stripe live webhook → `https://lease.legalfriend.ai/api/webhooks/stripe` (no test endpoint).
- Supabase redirect URLs + `https://lease.legalfriend.ai/**`. Site URL is still
  `localhost:3000` (pre-existing) — auth emails will link there until it's changed.
- Pages env: `NODE_VERSION=22`, `PUBLIC_SITE_LIVE=true`, `TZ=America/Los_Angeles`.
- Cloudflare DNS: apex + `www` CNAME → `legalfriend-site.pages.dev` (proxied); `lease`, `api`
  DNS only; MX/TXT unchanged.

## Follow-ups

- Remove `legalfriend.ai` and `www.legalfriend.ai` from the Vercel `legalfriend-v1-1-frontend`
  project (they no longer point there; Vercel will warn about certificate renewal).
- Supabase Site URL → `https://lease.legalfriend.ai`.
- Google Search Console: submit `https://legalfriend.ai/sitemap.xml`; add `lease.legalfriend.ai`.
- Kit-specific privacy policy and terms before checkout (`/privacy`, `/terms` currently
  redirect to the lease app's pages).
- Lease app `public/llms.txt` still lists apex URLs.
