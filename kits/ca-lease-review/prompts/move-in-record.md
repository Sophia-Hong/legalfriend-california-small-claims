<!-- Task prompt. Use together with prompts/system.md. Status: ai_draft_pending_attorney_review -->

# Move-in record

**Sections:** Deposit, Repairs · **Workflow step:** move-in-record

## When to use
The person has the keys, or will soon, and wants a clear record of the unit's condition at
move-in: a room-by-room checklist and a photo log they can use later at move-out.

## What to do
1. Ask for the basics: address and unit, move-in date, rooms and outdoor areas, appliances
   included, and whether the landlord gave them a move-in checklist or inspection form. If
   there is one, build the record to match it so the two can be compared.
2. Explain briefly why this matters. At move-out, deductions are limited to certain
   categories, including cleaning needed to return the unit to its move-in level of
   cleanliness and damage beyond ordinary wear and tear [F:deposit-allowed-deductions]. A
   dated record of the starting point helps everyone see what changed.
3. Build a room-by-room checklist. For each room, list the items to look at — walls,
   ceiling, floors or carpet, doors and locks, windows and screens, blinds, lights and
   switches, outlets, fixtures, cabinets, appliances, plumbing, heating and cooling, smoke
   and carbon monoxide alarms — and give a column for condition, cleanliness, and notes.
   Describe what is seen ("1-inch scuff on wall left of door"), not who caused it.
4. Build a photo log. Each row: photo or video number, room, item, what it shows, date and
   time taken, and file name. Suggest a wide shot of each room first, then close-ups of
   anything worn, marked, or broken, with a coin or ruler for scale where useful.
5. Add tips for keeping the record: back up the files in two places, keep the original
   files (which carry date information), and send a copy of the completed checklist to the
   landlord in writing and keep that message.
6. Mention that newer rules require landlords to take photos at certain points, including
   at move-in for some tenancies, to support deductions [F:deposit-photos]. The dates are
   still being confirmed, so the person's own record is useful either way.
7. If anything found affects basic living conditions — heating, plumbing, hot water,
   electrical, weatherproofing, pests, safe floors or stairs — note it separately.
   California rental housing must meet basic habitability standards [F:habitability].
   Suggest the person ask for the repair in writing (`prompts/questions-for-landlord.md`
   can help with wording).
8. Add a reminder for the end of the tenancy: the person may request an initial
   inspection before moving out, no earlier than two weeks before the tenancy ends, to get
   a chance to fix identified problems [F:deposit-pre-moveout-inspection]. Put the
   lease end date (from the extraction) and a "request inspection" reminder date in the
   output, and tell the person to set the reminder in their own calendar.

## Output
```
[OFFICIAL SOURCE]
[F:deposit-allowed-deductions], [F:deposit-photos], [F:habitability],
[F:deposit-pre-moveout-inspection] — each with source title and URL

[LEGALFRIEND PRACTICE NOTE]
practice-notes/move-in-documentation.md — relevant points

[AI WORKSPACE]
Move-in record — <address, unit> — move-in date <date>

Room: <name>
| Item | Condition | Clean? (describe) | Notes | Photo #s |
|------|-----------|-------------------|-------|----------|
(repeat for every room and outdoor area)

Photo log
| # | Room | Item | What it shows | Date / time | File name |
|---|------|------|---------------|-------------|-----------|

Living-condition items to raise in writing: <list or "none noted">
Sent to landlord: <date / method> (fill in)

Reminders
- Lease end date: <from lease, p.__ §__>
- Request pre-move-out inspection: on or after <end date − 14 days>, and early enough to fix
  anything found [F:deposit-pre-moveout-inspection]
- Before moving out: repeat this photo log for every room.
```
