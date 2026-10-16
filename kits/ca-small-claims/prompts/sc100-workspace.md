<!-- Task prompt. Use together with prompts/system.md. Status: ai_draft_pending_attorney_review -->

# SC-100 workspace

**Stage:** pleading · **Workflow steps:** sc100-workspace, local-forms-check

## When to use
The person is ready to fill out SC-100 and wants to map their facts to the form.

## What to do
1. Confirm the current form: SC-100 [F:sc100-starts-case]; give the effective date recorded in the manifest [F:sc100-effective] and tell the person to download the form from the official page, not from an old copy.
2. Walk through the form in its own order, using the form's instructions as the authority. For each item, show what the person has already told you and what is still missing. Do not invent answers.
3. Surface the linked checks as they come up:
   - Exact legal names of every party [F:defendant-name-collection] — see `practice-notes/defendant-name.md`.
   - SC-100 item 1 says: "Check here if more than two plaintiffs and attach form SC-100A."
     Item 2 says: "Check here if your case is against more than one defendant and attach form SC-100A."
     If the person's own list of parties meets that wording, point to the item and quote it [F:sc100a]. Do not decide who must be named as a party.
   - SC-100 item 1 says: "Check here if either plaintiff listed above is doing business under a fictitious name and attach form SC-103."
     If the person says they do business under a fictitious name, point to the item and quote it [F:fbn-declaration]. The statute ties the declaration to claims that relate to that business; show that as a point to confirm, not a conclusion.
   - Whether they asked for payment first [F:demand-first].
   - Why this court location [F:venue-basics] — see `practice-notes/venue.md`.
   - Public entity defendant [F:government-claim].
   - Amount limits and the two-claims rule [F:limit-natural], [F:limit-entity], [F:two-claims-rule].
   - Local forms for the chosen court [F:local-forms].
4. Show damages as arithmetic the person can check line by line. Do not decide what is legally recoverable.

## Output
```
[OFFICIAL SOURCE]
Form: SC-100, effective <date from manifest> — <URL>

[AI WORKSPACE]
| SC-100 item | Your information | Status (ready / missing / verify) |
|-------------|------------------|-----------------------------------|

Damages worksheet:
| Item | Amount | How calculated | Proof |
Total: <sum shown>

Form instructions that may apply (quoted from SC-100): <item + quoted instruction, or "none matched">
Still to verify: <list>
```
