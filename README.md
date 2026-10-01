# LegalFriend — California Small Claims Plaintiff Kit

> **California gives you the forms. LegalFriend helps you understand how the pieces fit together.**
>
> **Built for Your AI — Not Ours.**

An official-source-first, lawyer-designed self-help toolkit for people preparing to
file or pursue a **California small claims case as the plaintiff**. The kit is meant to
be loaded into an AI the purchaser chooses and runs (ChatGPT, Claude, a local model,
or a personal agent). LegalFriend does not host inference and does not receive case
facts, prompts, or AI answers.

Served at: `https://legalfriend.ai/california-small-claims`
(see [`docs/legalfriend-ai-integration.md`](docs/legalfriend-ai-integration.md)).

> **Status: v0.1 drafts.** All chapters, practice notes, and prompts are AI-drafted from
> `sources/facts.yaml` and await attorney review — see
> [`docs/attorney-review.md`](docs/attorney-review.md).
> Kits: [`kits/ca-small-claims`](kits/ca-small-claims) and [`kits/ca-lease-review`](kits/ca-lease-review). The release build refuses to package
> unapproved content.

## What's in the kit

| Layer | Folder | What it holds |
|---|---|---|
| **OFFICIAL SOURCE** | `sources/`, `corpus/` | California Courts self-help, Judicial Council forms and instructions, statutes, Rules of Court, and local court resources, with version and freshness metadata |
| **LEGALFRIEND PRACTICE NOTE** | `practice-notes/` | General educational commentary and issue-spotting written by a California attorney |
| **AI WORKSPACE** | `prompts/`, `workflows/` | Prompts and stage-by-stage workflows the purchaser's own AI uses to organize the purchaser's own case |
| Reader edition | `ebook/` | The same material as a human-readable guide |

These three layers are never mixed. Every corpus chunk carries a `layer` field, and
every AI answer is expected to label its content `[OFFICIAL SOURCE]`,
`[LEGALFRIEND PRACTICE NOTE]`, or `[AI WORKSPACE]`.

## Scope (MVP)

**In scope:** California small claims, plaintiff side, money claims, from
"is small claims the right fit?" through basic post-judgment orientation.

**Out of scope:** defendant workflow, appeals, eviction, debt defense, family law,
federal court, other states, automated filing, service ordering, communication
with the other side, outcome prediction, individualized attorney review.
See `docs/PRD.md` §9.2.

## Repository layout

The repo holds every LegalFriend kit plus the legalfriend.ai website. Each kit has the same
layout, so the scripts, the download service, and the website treat them alike.

```text
kits/
  LICENSE-KIT.md          License shipped inside every kit zip
  ca-small-claims/        California Small Claims Plaintiff Kit ($79)
  ca-lease-review/        California Lease Review Kit ($49)
    kit.yaml              name, title, version, price
    README-KIT.md         buyer-facing README (becomes README.md in the zip)
    sources/
      facts.yaml          every legal statement the kit may make, with citation
      manifest.yaml       official sources: URLs, version keys, freshness
    ebook/                reader edition, one chapter per step
    practice-notes/       LegalFriend commentary (separate provenance layer)
    prompts/              system prompt + task prompts for the buyer's AI
    workflows/            stage workflows; each item cites its facts
DISCLAIMER.md             shared relationship notice (shipped in every kit)
scripts/                  validate / check / build — all take --kit NAME (default: all kits)
site/                     legalfriend.ai (Astro → Cloudflare Pages) + download functions
docs/                     PRD, attorney review guide, hosting and distribution notes
```

## Source versioning

A form is never identified by its number alone. The version key is
`form_number + effective_date + source_url + version_hash`. When a new effective
version appears, the old record is kept and marked `superseded_by`, so changes stay
traceable (PRD §10.3). Facts such as claim limits or form effective dates live only in
`sources/manifest.yaml` and the corpus, never hard-coded in prompts or copy.

## Quick checks

```bash
python3 scripts/validate_manifest.py     # manifest rules + every fact cites a known source
python3 scripts/check_content.py         # [F:]/[S:] tags resolve, guardrail wording, review status
python3 scripts/validate_links.py        # checks every source_url (network)
python3 scripts/build_kit.py --draft     # review copy of the buyer zip (dist-kit/)
python3 scripts/build_kit.py             # release zip — only when everything is approved
(cd site && npm test)                    # download functions against fake Stripe/R2
```

## Selling the kit

Stripe Payment Link → `https://legalfriend.ai/kit/download?session_id={CHECKOUT_SESSION_ID}`.
The download page asks `/api/kit/status`; the file comes from `/api/kit/file`, which verifies
the Checkout Session with Stripe (paid, not refunded, right price), stamps the first download
on the PaymentIntent (`metadata.kit_first_downloaded_at`, used for the refund policy), and
streams that price's zip from R2. One `KIT_CATALOG` setting maps each Stripe Price to its kit
file, so every kit shares the same download page. No database. Configuration is described in
`site/functions/_lib/kit.ts`.

## Website (`site/`)

Static Astro site deployed to Cloudflare Pages.

| Pages setting | Value |
|---|---|
| Root directory | `site` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Env `NODE_VERSION` | `22` |
| Env `PUBLIC_SITE_LIVE` | `true` in production since 2026-09-28 (when unset: every page `noindex`, robots disallows all, preview banner) |
| Env `PUBLIC_KIT_CHECKOUT_URL` | checkout link once it exists (button is disabled until then) |

Landing copy comes from PRD §1, §5.3–5.4, §9.1 and §14. Styling (`src/styles/site.css`) follows
the "command deck" reference: achromatic surfaces, one 8px radius, one shadow stack, and a
single vermillion accent reserved for actions. `public/_redirects` sends old lease-app paths
to `lease.legalfriend.ai`. The "Before you buy" notice mirrors
`DISCLAIMER.md`; change both together.

## Distribution

The kit is built so it can later be dropped into personal agents and assistant
marketplaces without re-authoring content. See [`docs/distribution.md`](docs/distribution.md).

## License

Proprietary. All rights reserved. See [`LICENSE`](LICENSE). Official court materials
referenced or mirrored here remain the property of their publishers.
