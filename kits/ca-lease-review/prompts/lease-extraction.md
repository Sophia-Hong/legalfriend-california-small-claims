<!-- Task prompt. Use together with prompts/system.md. Status: ai_draft_pending_attorney_review -->

# Lease extraction

**Sections:** Basics, Money, Rules, Repairs, Privacy, Ending, Deposit, Other · **Workflow step:** extract

## When to use
The person has shared their lease (and any addenda) and wants to see, section by section,
what it actually says before anything is checked or questioned. Run this before
`prompts/clause-check.md`.

## What to do
1. Before the person shares the lease, remind them once that they may redact Social
   Security numbers, bank or card details, and signatures. Their AI provider's terms govern
   what they share.
2. Read **every page**, including addenda, exhibits, house rules, and anything signed with
   the lease. List them at the top of the output. If a page is missing, cut off, or hard to
   read, say which one.
3. For each item below, record three things:
   - `clause` — the exact lease text, in quotation marks, with page and section if visible.
     If the item appears in more than one place, quote each place. If it is absent, write
     `not found in lease`.
   - `where` — page / section / addendum name, or `not visible`.
   - `notes` — a list of short plain-English notes (one idea each, about 12 words or
     fewer), lifted from the clause text. Use an empty list if there is nothing to add.
4. **Extraction rules — follow them exactly:**
   - Every field is a string or `not found in lease`. **Never** reduce a term to yes/no,
     true/false, allowed/not allowed, or a checkbox. Leases express rules in many ways;
     quote the words and put the nuance in `notes`.
   - Copy amounts exactly as written (for example "$1,850.00", "two months' rent",
     "5% of the unpaid balance", "$50 plus $10 per day"). Do not convert, total, or round
     here. Arithmetic belongs in the clause check.
   - Do not infer, guess, or fill gaps from what leases "usually" say.
   - Do not judge whether anything is allowed under California law in this step. Just
     record what the lease says.
   - List every charge the lease calls a deposit, fee, or charge, even if it is not called
     a "security deposit." Some differently named charges are counted together with the
     security deposit under California law [F:deposit-what-counts], so the clause check
     needs all of them.
   - For any automatic renewal or extension clause, also describe in `notes` how it is
     printed: bold or not, type size compared with nearby text, and where it sits relative
     to the signature lines. The clause check uses this [F:auto-renewal].
   - For the language item, note the language the lease is written in and anything the
     person tells you about the language the lease was discussed in [F:translation].
5. Items to extract:
   - **Basics:** parties (landlord/owner, property manager, every tenant, other listed
     occupants); property address and unit; lease type and term (fixed term or
     month-to-month; start date; end date); monthly rent; rent due date, grace period, and
     how rent is paid.
   - **Money:** deposits by type (security, pet, key, cleaning, any other); one-time fees
     (move-in, admin, application/screening, other); recurring fees (parking, storage,
     pet rent, trash, other); late fee (amount, when it starts, any daily add-on); other
     possible fees (returned payment, lockout, early payment, other); utilities (who pays
     each one, any shared or allocated billing); rent increase terms.
   - **Rules:** pets; guests and occupancy limits; subletting and assignment; smoking;
     alterations, painting, and decorating; any other house rules (noise, parking,
     shared areas, HOA rules).
   - **Repairs:** who maintains what (landlord, tenant, shared), including appliances,
     plumbing, heating, pests, yard, smoke and carbon monoxide alarms; how to request a
     repair; who pays for what kinds of damage.
   - **Privacy:** landlord entry (reasons, notice, hours, how notice is given); showings to
     future tenants or buyers; any emergency entry language.
   - **Ending:** renewal or automatic renewal; notice to end or not renew (who gives it,
     how much, in what form); early termination or lease-break fee; staying past the end
     date (holdover); move-out requirements.
   - **Deposit:** when and how the deposit is returned; listed deductions or automatic
     charges (for example carpet or "professional" cleaning); move-in and move-out
     inspections; forwarding address requirements.
   - **Other:** attorney's fees; jury waiver or other dispute-resolution terms; liability
     waiver, release, or indemnity ("hold harmless") language; language of the lease and
     any translation; renters insurance; anything else unusual or hard to understand.
6. End with a short list of terms the person may want explained, and any items you could
   not find or read.

## Output
```
[AI WORKSPACE]
Lease extraction — <property address or "address not found in lease">
Documents read: <lease + each addendum / exhibit, with page counts>
Pages missing or hard to read: <list or "none noticed">

## Basics
parties:
  clause: "<exact quote>" | not found in lease
  where: <page / section> | not visible
  notes: ["<short note>", "<short note>"]
address:
  ...
(repeat for every item in every section: Basics, Money, Rules, Repairs, Privacy,
Ending, Deposit, Other)

Terms you may want explained: <list>
Not found or unreadable: <list>
Next step: run the clause check (prompts/clause-check.md).
```
