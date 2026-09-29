# CLAUDE.md — LegalFriend California Small Claims Kit

Read `docs/PRD.md` before making changes. Key rules:

## Product boundary (never cross without PRD owner + attorney sign-off)
- Self-help publication/toolkit. No hosted inference, no case intake, no storage of
  user facts, prompts, or AI answers, no filing or communication on a user's behalf.
- Plaintiff side, California small claims only.

## Content rules
- **AI drafts, the attorney approves.** Since 2026-09-29 (Sophia's instruction) AI may draft
  ebook chapters and practice notes, but only from `sources/facts.yaml`, tagging every legal
  statement `[F:id]` / `[S:id]`. Drafts carry `status: ai_draft_pending_attorney_review`.
  Only the attorney sets `status: approved` or a fact's `verified: true`.
- Never state a legal rule that is not in `sources/facts.yaml`; add a fact (unverified) and
  flag it for review instead. See `docs/attorney-review.md`.
- Three layers are never mixed: OFFICIAL SOURCE / LEGALFRIEND PRACTICE NOTE / AI WORKSPACE.
- Legal facts (claim limits, form effective dates, fees) live only in
  `sources/facts.yaml` and `sources/manifest.yaml`. Never hard-code them in prompts, copy, or code.
- A form's version key is `form_number + effective_date + source_url + version_hash`.
  Superseded versions are kept, not deleted.
- Marketing/prompt wording must follow PRD §6.3–6.4 (no "AI lawyer", no outcome
  claims, no "first"/"only").

## Checks
- `python3 scripts/validate_manifest.py` and `python3 scripts/check_content.py` must pass before commit.
- `cd site && npm test` for the download functions.
- `python3 scripts/build_kit.py` (release) only builds when every file is approved and every
  used fact verified; `--draft` builds a marked review copy.
