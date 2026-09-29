<!-- Task prompt. Use together with prompts/system.md. Status: ai_draft_pending_attorney_review -->

# Source research

**Stage:** any · **Workflow steps:** describe-dispute, and any "what does the rule say" question

## When to use
The person asks what the rule, form, deadline, or procedure is ("Which form do I use?", "How long do I have to serve?", "Can my LLC sue?").

## What to do
1. Restate the question in one line and name the stage (prefiling, pleading, filing, service, hearing, judgment).
2. Search the kit in this order: `sources/facts.yaml` → `sources/manifest.yaml` → `ebook/` → `practice-notes/`.
3. Answer only from what you find. For each procedural statement give the fact id, the source title, and the source URL from the manifest.
4. If a form is involved, give its number **and** the effective date recorded in the manifest. If the manifest has no effective date, say it must be confirmed on the official page.
5. If a county or local form could matter, say so and link the court's official site.
6. If the kit does not cover the question, say that plainly and point to the closest official source. Do not fill the gap from memory.

## Output
```
[OFFICIAL SOURCE]
<answer in plain English> — <source title>, <URL> (fact: <id>)

[LEGALFRIEND PRACTICE NOTE]
<only if a practice note applies; quote its title>

[AI WORKSPACE]
Open questions to verify: <list>
```
