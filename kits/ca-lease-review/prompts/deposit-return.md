<!-- Task prompt. Use together with prompts/system.md. Status: ai_draft_pending_attorney_review -->

# Deposit return

**Section:** Deposit · **Workflow step:** move-out-and-deposit

## When to use
The person is moving out, or has moved out, and wants to track the deposit timeline,
review an itemized statement of deductions, or ask in writing for the balance or an
itemization.

## What to do
1. Gather: move-out date (the day keys were returned), the deposits paid (from the lease
   extraction or receipts), the forwarding address given to the landlord and when, the
   move-in record and move-out photos, any pre-move-out inspection notes, and any
   statement or payment received so far.
2. **Timeline.** Within 21 days after the tenant moves out, the landlord must return the
   deposit or send an itemized statement of deductions with any remaining balance
   [F:deposit-21-days]. Show the date arithmetic: move-out date + 21 calendar days = date.
   Tell the person to confirm how days are counted on the official source rather than
   relying on your arithmetic alone.
3. **Review each deduction** if a statement arrived. For each line:
   - Which allowed category it seems to fit: unpaid rent; repairing damage beyond ordinary
     wear and tear caused by the tenant or guests; cleaning needed to return the unit to
     its move-in level of cleanliness; or, if the lease allows, replacing personal property
     beyond ordinary wear and tear [F:deposit-allowed-deductions]. If none fits clearly,
     mark it "worth a closer look."
   - What the move-in record and move-out photos show for that item.
   - Whether receipts or invoices are attached. When repair and cleaning deductions total
     more than $125, the statement must include copies of receipts or invoices, or a
     good-faith estimate followed by receipts if the work could not be finished within 21
     days [F:deposit-receipts]. Show the total of repair and cleaning lines.
   - Whether any part was described as nonrefundable; a lease may not make any part of
     the security deposit nonrefundable [F:deposit-no-nonrefundable].
   - Whether the landlord's photos were provided, if the person asks [F:deposit-photos]
     (dates to confirm).
4. **Draft a neutral written request**, if the person wants one: a short, polite message
   that gives the move-out date and forwarding address, lists the deposits paid, and asks
   for either the balance or the itemized statement — or, if a statement arrived, asks
   specific questions about specific lines and requests any missing receipts. Attach or
   offer the move-in record. No threats, no legal conclusions, no mention of damages
   amounts, no deadline the law does not set.
5. **If it stays unresolved:** explain that many deposit disputes are heard in California
   small claims court, where a natural person may generally sue for up to $12,500
   [F:small-claims-limit], and point the person to the LegalFriend California Small Claims
   Kit and the official small claims self-help pages. If the person asks about penalties,
   you may state that a court may award statutory damages of up to twice the deposit if a
   landlord keeps it in bad faith [F:deposit-bad-faith], and that whether that applies is
   for a court to decide. Do not include this in the draft message.
6. Check local rules: some cities have their own deposit or tenant rules [F:local-rules].
7. Never predict whether the person will get money back, how much, or how a court would
   see it.

## Output
```
[OFFICIAL SOURCE]
[F:deposit-21-days], [F:deposit-allowed-deductions], [F:deposit-receipts],
[F:deposit-no-nonrefundable] (+ others used) — each with source title and URL

[LEGALFRIEND PRACTICE NOTE]
practice-notes/deposit-return-checklist.md — relevant points

[AI WORKSPACE]
Timeline
  Move-out date (keys returned):  <date>
  + 21 days:                      <date>   [F:deposit-21-days]
  Forwarding address sent:        <date / method>
  Statement or payment received:  <date / "not yet">

Deposits paid
| Type | Amount | Source (lease p.__ / receipt) |
Total paid: $____

Deductions review (if a statement arrived)
| Line | Amount | Category it seems to fit | Move-in record / photos | Receipt attached? | Note |
|------|--------|--------------------------|-------------------------|-------------------|------|
Repair + cleaning total: $____ (over $125? receipts required [F:deposit-receipts])
Amount returned: $____   Total paid − deductions = $____ (check it matches)

Draft written request (edit before sending)
<polite, neutral message>

If unresolved: LegalFriend California Small Claims Kit; official small claims self-help
Check locally: <city / county> rules [F:local-rules]
```
