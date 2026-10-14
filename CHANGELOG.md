# Changelog

All notable changes to the kit. Source-version changes (a new form effective date,
a changed claim limit, etc.) are logged here with the manifest `id` they touch.

## [Unreleased]

### Changed
- 2026-10-14 source check against California Courts self-help (facts still `verified: false`):
  `advisors` ("Most counties are required…", was "Each county provides"),
  `government-claim` (real-estate damage moved to the 1-year deadline),
  `judgment-ten-years` (added the 2023 once-for-5-years renewal limit; confidence → medium).
  Every ebook/practice-note line citing them was rewritten to match. New manifest sources:
  `cc-selfhelp-small-claims-advisor`, `cc-selfhelp-government-claim`, `cc-selfhelp-renew-judgment`.
- 2026-10-14 (second pass): `service-who` / `service-methods` (sheriff and clerk certified mail
  only where offered; "professional" not "registered" process server), `proof-of-service`
  (file at least 5 days before the court date), `notice-of-entry` (SC-130 or SC-200; at the
  hearing or mailed), `satisfaction` (EJ-100 if a lien was recorded; 14-day deadline).
  `waive-excess` and `entity-appearance` unchanged — self-help does not state them; noted for
  the attorney's statute check. New manifest sources: `cc-selfhelp-serve`,
  `cc-selfhelp-after-trial`, `cc-selfhelp-when-you-get-paid`.
- 2026-10-14 (attorney review notes): added `jcc-form-sc-200` and `jcc-form-ej-100` to the
  manifest and fact sources so visible cites match the source lists; synced each chapter's
  "Official sources" list with the new `[S:…]` tags; split three run-on advisor sentences.

### Added
- Repository scaffold per PRD §11 (Draft v0.1, 2026-09-28).
- Source manifest seeded with the statewide sources listed in PRD §25
  (all marked `status: pending_fetch`; not yet fetched or hashed).
- Corpus chunk metadata schema (PRD §10.2).
- Draft system prompt and stage workflows (pending attorney review).
- Retrieval test cases from PRD §18.
