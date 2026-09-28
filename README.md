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

> **Status: Draft v0.1 scaffold.** No substantive legal content has been written yet.
> Every practice note, ebook chapter, and prompt is a stub pending attorney authoring
> and review. See [`DISCLAIMER.md`](DISCLAIMER.md).

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

```text
ebook/              Reader edition (Markdown), chapter per PRD §13
sources/
  manifest.yaml     Every source we rely on, with version key + freshness
  statewide/        Fetched official statewide material (self-help, forms, statutes, rules)
  counties/         County layer (Phase 2; only where there is real local content)
corpus/
  metadata.schema.json   Chunk metadata contract (PRD §10.2)
  chunks.jsonl           Built retrieval corpus (generated)
  index-manifest.json    Build record (generated)
prompts/            System prompt + task prompts for the purchaser's AI
workflows/          Plaintiff workflow and stage workflows (YAML)
practice-notes/     Attorney-authored commentary (stubs until written)
scripts/            Source fetch / normalize / validate / diff / build tooling
tests/              Freshness, citation-integrity, form-version, retrieval cases
docs/               PRD, distribution plan, legalfriend.ai integration
site/               legalfriend.ai public site (Astro → Cloudflare Pages)
```

## Source versioning

A form is never identified by its number alone. The version key is
`form_number + effective_date + source_url + version_hash`. When a new effective
version appears, the old record is kept and marked `superseded_by`, so changes stay
traceable (PRD §10.3). Facts such as claim limits or form effective dates live only in
`sources/manifest.yaml` and the corpus, never hard-coded in prompts or copy.

## Quick checks

```bash
python3 scripts/validate_manifest.py     # schema + provenance rules on sources/manifest.yaml
python3 scripts/validate_links.py        # HEAD-checks every source_url (network)
```

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

Landing copy comes verbatim from PRD §14. `/design-preview` renders the same copy in the
candidate "command deck" style (always `noindex`). `public/_redirects` sends old lease-app
paths to `lease.legalfriend.ai`. The "Before you buy" notice mirrors
`DISCLAIMER.md`; change both together.

## Distribution

The kit is built so it can later be dropped into personal agents and assistant
marketplaces without re-authoring content. See [`docs/distribution.md`](docs/distribution.md).

## License

Proprietary. All rights reserved. See [`LICENSE`](LICENSE). Official court materials
referenced or mirrored here remain the property of their publishers.
