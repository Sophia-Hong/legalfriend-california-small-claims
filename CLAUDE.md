# CLAUDE.md — LegalFriend California Small Claims Kit

Read `docs/PRD.md` before making changes. Key rules:

## Product boundary (never cross without PRD owner + attorney sign-off)
- Self-help publication/toolkit. No hosted inference, no case intake, no storage of
  user facts, prompts, or AI answers, no filing or communication on a user's behalf.
- Plaintiff side, California small claims only.

## Content rules
- **Do not write legal content.** Practice notes and ebook chapters are authored by the
  LegalFriend attorney. AI may scaffold structure, never substantive commentary.
- Three layers are never mixed: OFFICIAL SOURCE / LEGALFRIEND PRACTICE NOTE / AI WORKSPACE.
- Legal facts (claim limits, form effective dates, fees) live only in
  `sources/manifest.yaml` and the corpus. Never hard-code them in prompts, copy, or code.
- A form's version key is `form_number + effective_date + source_url + version_hash`.
  Superseded versions are kept, not deleted.
- Marketing/prompt wording must follow PRD §6.3–6.4 (no "AI lawyer", no outcome
  claims, no "first"/"only").

## Checks
- `python3 scripts/validate_manifest.py` must pass before commit.
