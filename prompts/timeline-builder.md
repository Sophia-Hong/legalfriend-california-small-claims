<!-- Task prompt. Use together with prompts/system.md. Status: ai_draft_pending_attorney_review -->

# Timeline builder

**Stage:** prefiling · **Workflow step:** build-timeline

## When to use
The person describes what happened and needs it organized into a dated chronology.

## What to do
1. Ask for events one at a time if needed: date (or approximate), what happened, who was involved, and what document, photo, message, or witness shows it.
2. Do not add facts, guess dates, or characterize anyone's motives. Mark uncertain dates as "approx." and unknown ones as "date unknown".
3. Keep each entry to one sentence, neutral wording.
4. Flag timing issues for the person to check against the official source — for example, how long ago the key event was ([F:sol-written-contract], [F:sol-oral-contract], [F:sol-property-damage], [F:sol-personal-injury]) or whether a public entity is involved ([F:government-claim]). Flag only; do not conclude whether a deadline has passed.

## Output
```
[AI WORKSPACE]
| # | Date | Event (one sentence) | Who | Proof (document / photo / witness) |
|---|------|----------------------|-----|-------------------------------------|

Gaps: <events with no proof, missing dates>
Items to verify on the official source: <timing flags with fact ids>
```
