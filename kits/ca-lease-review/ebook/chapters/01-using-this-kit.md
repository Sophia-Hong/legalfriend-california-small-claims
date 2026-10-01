---
chapter: 1
title: Using This Kit With Your AI
status: ai_draft_pending_attorney_review
facts_used: [local-rules]
sources_used: [oag-landlord-tenant, dre-california-tenants, civ-1947-12]
---

# Using This Kit With Your AI

> DRAFT — AI-drafted from sources/facts.yaml for attorney review. Not for release until approved.

**In this chapter:** This chapter is about the kit itself, not about the law. It explains what the kit is and is not, how to load it into the AI tool you choose, and how to keep your lease private. It also covers the three labels your AI will use and how to check any legal point against its official source.

## What this kit is

The kit is a self-help guide for California renters. You load it into an AI tool you use, such as ChatGPT or Claude, and give that AI your own lease. With the kit, your AI can help you:

- Explain your lease section by section in plain English.
- Point out clauses worth a closer look under California law.
- Prepare polite, written questions for your landlord or property manager.
- Build a move-in record and, later, organize a deposit-return request.

## What this kit is not

- **Not a lawyer.** Your AI is not your lawyer, and it does not speak for LegalFriend or any attorney.
- **Not legal advice.** The kit gives general information. It does not tell you what to do about your lease.
- **Not a review service.** LegalFriend does not read your lease or check your AI's answers.
- **No attorney-client relationship.** Buying or using the kit does not create one with LegalFriend or any lawyer.

The kit is written for renters, but its aim is understanding, not conflict. A lease works best when both sides know what it says.

## Setting it up

Menus change often, so check your AI provider's help pages. The general setup is similar in most tools:

1. **Create a project** (or custom assistant) just for your lease. Keep one project per lease so notes do not get mixed up.
2. **Paste `prompts/system.md`** into the project's instructions field. This sets the ground rules your AI follows.
3. **Upload `knowledge/all-in-one.md`** as a project file. It holds the kit's reference material in one file.
4. **Share your lease.** Upload the lease (and any addenda) or paste the text. Redact it first if you want to (see below).
5. **Run the task prompts** as you need them. Copy and paste each one into the chat:
   - `prompts/lease-extraction.md` — walks through your lease section by section.
   - `prompts/clause-check.md` — looks for clauses worth a closer look.
   - `prompts/questions-for-landlord.md` — drafts neutral, written questions.
   - `prompts/move-in-record.md` — builds a room-by-room move-in record.
   - `prompts/deposit-return.md` — organizes your move-out and deposit records.

Start with a test: ask your AI to summarize one section and cite its source, using the three labels below.

## Your privacy

The kit is designed so your lease stays with you.

- **LegalFriend never receives your lease.** It also never sees your prompts or your AI's answers. The kit is just files you load yourself.
- **Your AI provider's terms apply.** What you share with an AI tool is governed by that provider's terms. Read its privacy and data settings; some tools let you choose whether chats are stored or used for training.
- **Redact what you do not need to share.** Most lease questions do not need your most sensitive details.

Redaction tips:

- Black out or delete Social Security numbers, driver's license numbers, and dates of birth.
- Remove bank account and routing numbers, and card details.
- Cover signatures and initials.
- Consider replacing names with labels like "Tenant" and "Landlord."
- Keep the rent amount, deposit amounts, dates, and clause wording. Your AI needs those to help.

> **LegalFriend practice note** — Work from a copy of your lease, not the original. Save the redacted copy with a clear file name, such as "Lease – redacted for AI," so you always know which version you shared.

## The three labels

The `system.md` prompt asks your AI to separate every answer into three labeled parts:

- **[OFFICIAL SOURCE]** — what a California statute, court decision, or state agency says, with a citation and link.
- **[LEGALFRIEND PRACTICE NOTE]** — general educational commentary from the kit. It is not a statement of law and not advice about your lease.
- **[AI WORKSPACE]** — anything your AI created for you, such as a summary, checklist, question list, or draft. Treat it as a working draft that you review.

If an answer blends these together or has no labels, ask your AI to separate them.

In this ebook, an `[F:...]` tag points to an entry in the kit's facts sheet (`sources/facts.yaml`), and an `[S:...]` tag points to an official source in `sources/manifest.yaml`. Practice notes appear in boxed callouts.

## Always confirm with the official link

Treat every legal point as something to confirm, whether it comes from this ebook or from your AI.

1. **Find the tag or citation** in the answer.
2. **Look up the source** in `sources/manifest.yaml` and open its official link.
3. **Read the current text yourself.** If it says something different from the kit or your AI, the official source controls.
4. **Check your local rules.** Many California cities and counties have their own rent or tenant protection rules that can be stricter than state law, so the rules for the property's address also apply [F:local-rules]. Check your city's rules, and see the state law reference [S:civ-1947-12].

For a general overview, the California Attorney General's landlord-tenant page [S:oag-landlord-tenant] and the Department of Real Estate's tenant guide [S:dre-california-tenants] are good starting points.

## Limits

- **AI can be wrong.** It can misread a clause or sound sure when it is not. Check before you rely on anything.
- **Laws and local rules change.** The kit may lag behind. The current official source always controls.
- **Not legal advice.** The kit does not decide whether any clause in your lease is enforceable, and it does not predict any outcome.
- **When to get help.** If you have a dispute, a deadline, or a large amount of money at stake, consider talking with a licensed California attorney or a local tenant or landlord resource.

## Checklist

- [ ] I created a separate project in the AI tool I chose.
- [ ] I pasted `prompts/system.md` into the instructions.
- [ ] I uploaded `knowledge/all-in-one.md`.
- [ ] I read my AI provider's privacy and data settings.
- [ ] I redacted sensitive details from a copy of my lease.
- [ ] I tested that answers use the three labels and cite sources.
- [ ] I confirm each legal point with its official link.
- [ ] I check my city's rules for the property's address.

## Official sources for this chapter

- [S:oag-landlord-tenant] California Attorney General — Landlord-Tenant Issues — https://oag.ca.gov/consumers/general/landlord-tenant-issues
- [S:dre-california-tenants] California Tenants: A Guide to Residential Tenants' and Landlords' Rights and Responsibilities — https://www.dre.ca.gov/Publications/
- [S:civ-1947-12] Cal. Civil Code § 1947.12 — https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1947.12
