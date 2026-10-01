<!-- Task prompt. Use together with prompts/system.md. Status: ai_draft_pending_attorney_review -->

# Clause check

**Sections:** Money, Rules, Repairs, Privacy, Ending, Deposit, Other · **Workflow step:** check-clauses

## When to use
The lease has been extracted (`prompts/lease-extraction.md`) and the person wants to know
which clauses are worth a closer look under California law, and what to ask about them.
If there is no extraction yet, run that first.

## What to do
1. Work only from the extraction and the lease text. Quote clauses exactly, with page and
   section.
2. Compare each item with the facts below. Read each fact's `statement` and
   `approved_language` in `sources/facts.yaml`, and its source in `sources/manifest.yaml`.
   - **Deposits (all types together):** [F:deposit-what-counts], [F:deposit-limit-general],
     [F:deposit-limit-small-landlord], [F:deposit-limit-servicemember]. Any deposit
     described as nonrefundable: [F:deposit-no-nonrefundable].
   - **Late fee:** [F:late-fee-reasonable].
   - **Application or screening fee:** [F:screening-fee]. Do not state a dollar cap.
   - **Rent increases:** [F:rent-cap], [F:rent-increase-notice], [F:local-rules]. Do not
     decide whether the unit is exempt; list what would need to be checked.
   - **Entry and privacy:** [F:entry-notice], [F:waivers-void].
   - **Repairs:** [F:habitability], [F:waivers-void]. If the person asks about
     [F:repair-and-deduct], explain the fact and its strict conditions only.
   - **Liability waiver, release, or "hold harmless" language:** [F:waivers-void].
   - **Jury waiver:** [F:jury-waiver].
   - **Attorney's fees that run only one way:** [F:attorney-fees-reciprocal].
   - **Automatic renewal or extension:** [F:auto-renewal] — use the printing details from
     the extraction.
   - **Language and translation:** [F:translation].
   - **Ending and leaving early:** [F:termination-notice-mtm], [F:just-cause],
     [F:mitigation], [F:dv-termination] (mention only as general information).
   - **Deposit return and deductions:** [F:deposit-allowed-deductions],
     [F:deposit-21-days], [F:deposit-receipts], [F:deposit-pre-moveout-inspection].
   - **Always:** [F:local-rules] — tell the person to check the city's and county's rules.
3. Flag an item only when the lease text and a fact actually connect. For each flagged
   item, use the words **"worth a closer look"** or **"may not be enforceable as
   written."** Never call the clause illegal, void, or invalid, and never tell the person
   not to sign or not to pay.
4. If the fact has `approved_language`, quote it verbatim in its own column, labeled as
   LegalFriend's standard wording. Leave the column blank if there is none.
5. Write one neutral question per flagged item, asking the landlord or manager to
   clarify, confirm, or explain (not to admit anything).
6. Do the arithmetic checks below and show every step so the person can verify it. Use
   only numbers quoted in the lease or given by the person; mark anything missing.
7. List items you checked and did not flag, and items the kit has no fact for (say
   "the kit doesn't cover this — check the official source" and give the closest source).

## Output
```
[OFFICIAL SOURCE]
Facts used, each with: [F:...] — plain-English summary — source title — URL

[LEGALFRIEND PRACTICE NOTE]
practice-notes/clauses-worth-a-question.md — relevant points, quoted or closely paraphrased

[AI WORKSPACE]
Items worth a closer look
| # | Section | Lease text (quoted, page/§) | Related fact | LegalFriend standard wording (verbatim, if any) | Official source (title + URL) | Neutral question to ask |
|---|---------|-----------------------------|--------------|-----------------------------------------------|-------------------------------|-------------------------|

Arithmetic you can check
Deposits
  Monthly rent:            $____  (lease p.__, §__)
  Security deposit:        $____
  Pet deposit:             $____
  Key deposit:             $____
  Cleaning deposit:        $____
  Other (name):            $____
  Total deposits:          $____  = sum of the lines above
  Total ÷ monthly rent:    ____ months
  Compare: one month for most landlords [F:deposit-limit-general]; up to two months
  for a small landlord who fits the definition [F:deposit-limit-small-landlord]; one
  month if the tenant is a service member [F:deposit-limit-servicemember].
  Whether the small-landlord rule fits is a question to ask, not something to assume.

Late fee
  Late fee:                $____  (plus any daily amount: $__ per day, up to __)
  Late fee ÷ rent × 100:   ____ %
  Compare: about 5% of monthly rent is a common signal to look more closely
  [F:late-fee-reasonable].

Rent increase (only if the lease or a notice states one)
  (New rent − current rent) ÷ current rent × 100 = ____ %
  Notice given: ____ days [F:rent-increase-notice]; see also [F:rent-cap], [F:local-rules].

Checked, nothing flagged: <list>
Not covered by the kit: <list with closest official source>
Check locally: the city and county rules for <address> [F:local-rules]
Next step: turn the questions into a written message (prompts/questions-for-landlord.md).
```
