# Changelog

All notable changes to the kit. Source-version changes (a new form effective date,
a changed claim limit, etc.) are logged here with the manifest `id` they touch.

## [Unreleased]

### Changed
- System prompt: the assistant states conclusions for the person's facts (fit, venue,
  defendant name, form version, deadline) under AI WORKSPACE instead of handing
  procedural questions back or deferring to "ask a lawyer" within scope. Outcome
  prediction and the rest of "What you do not do" are unchanged. Owner decision
  2026-10-01 (self-help publication; the person's own AI applies it; LegalFriend never
  sees the case).

### Added
- Repository scaffold per PRD §11 (Draft v0.1, 2026-09-28).
- Source manifest seeded with the statewide sources listed in PRD §25
  (all marked `status: pending_fetch`; not yet fetched or hashed).
- Corpus chunk metadata schema (PRD §10.2).
- Draft system prompt and stage workflows (pending attorney review).
- Retrieval test cases from PRD §18.
