# Distribution: putting the kit inside people's own agents

*Created: 2026-09-28 | Status: AI-GENERATED proposal | Requires Review: YES*

The product direction: rather than a hosted app, the kit lives inside the purchaser's
own AI / personal agent. Content is authored once (`sources/`, `corpus/`,
`practice-notes/`, `prompts/`, `workflows/`); each channel below is a packaging step.

| Channel | Package | Notes |
|---|---|---|
| Claude (Projects / Skills) | `prompts/system.md` as instructions + corpus Markdown as knowledge; or a Skill folder (`SKILL.md` + files) | Runs entirely in the user's Claude account |
| ChatGPT (Custom GPT / Projects) | Same instructions + knowledge files | Watch file-count and size limits; prefer fewer, larger Markdown files |
| Local models | `corpus/chunks.jsonl` + any local RAG tool | Fully offline |
| Agent tools (MCP) | Read-only tools: `search_sources`, `get_form`, `get_workflow_step` | **Must run locally (stdio) or on a no-logging endpoint.** A hosted server would receive the user's queries, which conflicts with the PRD §6.1 "no prompt logs" promise. Needs legal review before hosting. |
| Web crawlers / agents | `llms.txt` on legalfriend.ai pointing at the public (free) pages | Discovery only; paid content stays behind purchase |

## Rules that hold for every channel

- The disclaimer in `DISCLAIMER.md` ships with every package.
- The three provenance labels are preserved.
- Packages are generated from the same build, so a source update (e.g. a new SC-100
  effective date) reaches every channel through one version bump and CHANGELOG entry.
- No channel may add hosted inference, case intake, or answer logging without a
  separate legal/ethics review (PRD §6.5).
