# Lease Review retirement runbook
*Created: 2026-10-01 | Status: AI-GENERATED | Owner: Sophia | Requires Review: YES*

The hosted Lease Review service (`legalfriend_v1.1`, lease.legalfriend.ai + api.legalfriend.ai)
is retired in favor of the California Lease Review Kit. Promises made in the unified
[Privacy Policy §10](https://legalfriend.ai/privacy#lease-review) and
[Terms §14](https://legalfriend.ai/terms#lease-review):

| Date | Promise |
|---|---|
| 2026-10-01 | No new uploads or payments |
| through 2026-10-31 | Existing analyses viewable |
| after 2026-10-31 | Uploaded leases, analysis results, session/access records, email lists deleted |
| by 2026-11-15 | Deletion complete (backups expire on Supabase's schedule) |
| ongoing | Payment records kept in Stripe for accounting |

## Day 0 — 2026-10-01 (retirement mode)

1. **Merge the retirement PR** in `Sophia-Hong/legalfriend_v1.1`. It:
   - returns `410 service_retired` from every upload, processing, checkout, newsletter, cron and
     test endpoint (frontend + backend), behind `LEASE_SERVICE_RETIRED` in `lib/retirement.ts`;
   - redirects blog, deposit, privacy and terms pages to legalfriend.ai (permanent) and home,
     upload, pricing, FAQ, about, contact to `/california-lease-review` (temporary);
   - keeps `/analysis/*` and payment pages working, with a retirement banner and `noindex`;
   - removes the daily cart-recovery cron.
2. ~~Make existing analysis links work until Oct 31~~ — **skipped** (no customers; the access
   window in the Privacy Policy stays as written and costs nothing). For reference: Paid customers' email links use
   `access_tokens`, which expired 30 days after payment. In the Supabase SQL editor:
   ```sql
   -- read-only preview
   select count(*) filter (where expires_at < '2026-10-31 23:59:59-07') as expired_or_expiring,
          count(*) as total
   from access_tokens;
   -- extend every token to the end of the access window
   update access_tokens set expires_at = '2026-10-31 23:59:59-07'
   where expires_at < '2026-10-31 23:59:59-07';
   ```
3. **Stripe (Live):** archive the lease-review Products/Prices and deactivate their Payment
   Links. Do not delete anything. Keep the webhook endpoint
   (`https://lease.legalfriend.ai/api/webhooks/stripe`) enabled until Day 30 so refunds still sync.
4. ~~Notify past customers~~ — **not needed** (Sophia, 2026-10-01: the service had no customers).
   The template below is kept for reference only.

## Day 30 — on or after 2026-11-01 (shutdown and deletion)

Do these in order. Steps 2–4 are irreversible; each needs explicit approval at the time.

1. **Move the blog images** off Supabase first. Download these five files and commit them to
   `site/public/blog-images/` in this repo, then switch the five URLs in
   `site/src/content/blog/*.md` (search for `supabase.co`) to `/blog-images/<file>`:
   `w1-1-partial-check-stock.webp`, `w1-2-carpet-price-list-blurred.webp`,
   `w1-3-cleaning-line-blurred.webp`, `w1-4-gms-price-list-blurred.webp`,
   `w1-5-records-folder-stock.webp`
   (source: `https://srlslvgppnyacalqxftz.supabase.co/storage/v1/object/public/blog-images/<file>`).
2. **Inventory before deleting (read-only).** In the Supabase SQL editor:
   ```sql
   -- row counts of the service tables
   select 'leases' t, count(*) from leases union all
   select 'upload_sessions', count(*) from upload_sessions union all
   select 'analysis_results', count(*) from analysis_results union all
   select 'lease_analysis', count(*) from lease_analysis union all
   select 'access_tokens', count(*) from access_tokens union all
   select 'payments', count(*) from payments union all
   select 'newsletter_subscribers', count(*) from newsletter_subscribers union all
   select 'cart_recovery_emails', count(*) from cart_recovery_emails union all
   select 'contact_messages', count(*) from contact_messages;
   -- every foreign key that points at one of those tables (anything listed here that is NOT in
   -- the list above would be emptied by CASCADE: stop and review)
   select conrelid::regclass as referencing_table, confrelid::regclass as referenced_table
   from pg_constraint
   where contype = 'f'
     and confrelid::regclass::text in ('leases','upload_sessions','analysis_results','lease_analysis',
       'access_tokens','payments','newsletter_subscribers','cart_recovery_emails','contact_messages');
   ```
3. **Delete service data** (only after step 2 shows no unexpected referencing tables):
   ```sql
   truncate table access_tokens, analysis_results, lease_analysis, upload_sessions, payments,
     cart_recovery_emails, newsletter_subscribers, contact_messages, leases cascade;
   ```
   `payments` here is the app's own copy; Stripe keeps the accounting record.
   Then Storage → bucket `lease-documents` → select all → delete (empty the bucket). Do not
   touch `blog-images` until step 1 is done.
4. **Pause** the Vercel projects `legalfriend-v1-1-frontend` and `legalfriend-v1-1-backend`
   (pausing is reversible; delete them later if you like). Then in Stripe disable the webhook
   endpoint `https://lease.legalfriend.ai/api/webhooks/stripe`.
5. **DNS (Cloudflare):** set the `lease` record to *Proxied* and add a Redirect Rule
   `lease.legalfriend.ai/*` → `https://legalfriend.ai/california-lease-review` (301).
   Delete the `api` record. Then ask Claude to repoint the apex `_redirects` entries for
   `/upload`, `/pricing`, `/analysis*`, etc. from lease.legalfriend.ai to `/california-lease-review`.
6. **Supabase project:** once the blog images are moved and nothing else reads it, pause the
   project (the blog now builds from Markdown in this repo; the `blog_*` tables are no longer used).
7. Record the date each step was done at the bottom of this file. Deletion must be finished by
   **2026-11-15**.

## Customer notice (email template)

**Subject:** LegalFriend Lease Review is retiring: your analysis is available until October 31

Hi,

Thank you for using LegalFriend Lease Review.

As of October 1, 2026, we have retired the hosted Lease Review service and no longer accept new
leases or payments. You can still open your analysis with the link from your original email
until **October 31, 2026**. Please save or print anything you want to keep. If the link no
longer works, reply to this email and we will help.

After October 31, we will delete uploaded leases and analysis results, finishing by
November 15, 2026. Your payment record stays with our payment processor for accounting.
If you would like your data deleted sooner, just reply and let us know.

Lease Review is becoming a self-help kit that you run in the AI you choose, so your lease
never has to be uploaded to us. You can learn more at https://legalfriend.ai/california-lease-review.

Details: https://legalfriend.ai/privacy#lease-review

Sophia
LegalFriend (PeopleShine Inc.)
support@legalfriend.ai

## Log

| Step | Done on | By | Notes |
|---|---|---|---|
| Retirement PR merged | 2026-10-01 | Claude | legalfriend_v1.1#12; production verified (307/308/410) |
| Tokens extended | — | — | Skipped: no customers |
| Stripe products archived | | | |
| Customer notice sent | — | — | Not needed: no customers (Sophia, 2026-10-01) |
| Blog images moved | | | |
| Data deleted | | | |
| Vercel paused, webhook disabled | | | |
| DNS updated | | | |
| Supabase paused | | | |
