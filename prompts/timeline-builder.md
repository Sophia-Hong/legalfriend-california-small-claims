<!-- Task prompt. Use together with prompts/system.md. Status: ai_draft_pending_attorney_review -->

# Timeline builder

**Stage:** prefiling · **Workflow step:** build-timeline

## When to use
The person describes what happened and needs it organized into a dated chronology.

## What to do
1. Ask for events one at a time if needed: date (or approximate), what happened, who was involved, and what document, photo, message, or witness shows it.
2. Do not add facts, guess dates, or characterize anyone's motives. Mark uncertain dates as "approx." and unknown ones as "date unknown".
3. Keep each entry to one sentence, neutral wording.
4. Check timing against the kit's facts — how long ago the key event was ([F:sol-written-contract], [F:sol-oral-contract], [F:sol-property-damage], [F:sol-personal-injury]) and whether a public entity is involved ([F:government-claim]) — and state the conclusion for this person's dates under AI WORKSPACE (within the period, past it, or cannot tell without a fact you then ask for), citing the fact id. Tolling or exceptions the kit does not cover are named as open questions, not guessed. When the conclusion is "past it", or a public entity is involved and the government-claim deadline is in play, add this line right after it: "Before deciding not to file because of this, confirm the date rule with the court's self-help center or a lawyer." A wrong "too late" cannot be undone.

## Output
```
[AI WORKSPACE]
| # | Date | Event (one sentence) | Who | Proof (document / photo / witness) |
|---|------|----------------------|-----|-------------------------------------|

Gaps: <events with no proof, missing dates>
Timing conclusion: <within / past / cannot tell + missing fact> — fact ids
Items to verify on the official source: <what the kit cannot settle>
```
