---
chapter: 12
title: Using the LegalFriend AI Toolkit
stages: [prefiling, pleading, filing, service, hearing, judgment]
status: ai_draft_pending_attorney_review
facts_used: [sc100-effective, local-forms, guide-and-file, advisors]
sources_used: [cc-selfhelp-small-claims, cc-small-claims-forms, cc-selfhelp-fill-out-forms, jcc-form-sc-100, ccp-116-260]
---

# Using the LegalFriend AI Toolkit

> DRAFT — AI-drafted from sources/facts.yaml for attorney review. Not for release until approved.

**In this chapter:** This chapter is about the kit itself, not about the law. It explains what is in the kit, how to load it into an AI tool you choose, and how your information is handled. It also shows how to check any procedural statement against its official source, and what the kit cannot do.

## What is in the kit

The kit is a self-help publication built for use with the AI you choose. It has these parts:

- **The ebook** (`ebook/`). The guide you are reading. It explains each stage in plain English.
- **The facts sheet** (`sources/facts.yaml`). A short list of the legal statements the kit relies on. Each one has an id, a citation, the sources behind it, a confidence level, and whether an attorney has verified it against the official source.
- **The source manifest** (`sources/manifest.yaml`). A list of every official source the kit uses, with its title, link, publisher, and version details such as effective date and when it was last checked.
- **Prompts** (`prompts/`). Instructions for your AI. `system.md` sets the ground rules. Task prompts help with research, timelines, the SC-100 worksheet, evidence, and hearing preparation.
- **Workflows** (`workflows/`). Step-by-step outlines for each stage, from before filing through judgment.
- **Practice notes** (`practice-notes/`). General educational commentary from LegalFriend, kept separate from the official sources.

## Supported AI environments

You can use the kit with a general-purpose AI tool that lets you set standing instructions and add reference files. Common options include:

- **ChatGPT** (Projects or Custom GPTs)
- **Claude** (Projects)
- **Local models** run on your own computer with a tool that supports documents or search

Menus and limits change often, so check your AI provider's help pages for current steps. The general setup is the same everywhere:

1. **Create a project** (or a custom assistant) just for your small claims matter.
2. **Paste `prompts/system.md`** into the project's instructions field.
3. **Upload the knowledge files:** the ebook, `sources/facts.yaml`, `sources/manifest.yaml`, and the practice notes.
4. **Start with a simple test.** Ask the AI which stage you are in and to cite its source. Check that it uses the three labels described below.
5. **Use the task prompts** from `prompts/` as you reach each stage.

If your tool limits the number or type of files, check its help pages for supported formats. Fewer, larger files often work better than many small ones.

> **LegalFriend practice note** — Keep one project per case. Mixing notes from different matters in one project can make answers harder to follow.

## The privacy model

The kit is designed so your case stays with you.

- **LegalFriend never receives your case facts, your prompts, or your AI's answers.** The kit is files you load yourself. There is no LegalFriend server in the loop.
- **Your AI provider's own terms apply** to anything you share with it. Read your provider's privacy and data settings. Some tools offer options about whether your chats are stored or used for training.
- **Share only what you need.** Many tasks work without sensitive details such as full account numbers or Social Security numbers.

The AI you use is selected and run by you. It is not LegalFriend's agent and does not speak for any LegalFriend attorney.

## The three provenance labels

"Provenance" means where information comes from. The kit keeps three kinds of content apart, and `system.md` asks your AI to label every answer the same way:

- **[OFFICIAL SOURCE]** — what California Courts, Judicial Council forms, statutes, or court rules say, with a citation.
- **[LEGALFRIEND PRACTICE NOTE]** — general educational commentary from the kit. It is not a statement of law and not advice about your case.
- **[AI WORKSPACE]** — anything your AI created for you, such as a timeline, checklist, worksheet, or draft. Treat it as a working draft that you review.

In the ebook, you will see the same idea. `[F:...]` tags point to an entry in the facts sheet. `[S:...]` tags point to a source in the manifest. Practice notes appear in boxed callouts.

If an answer blends these together or has no labels, ask the AI to separate them.

## How to verify a procedural statement

Treat every procedural statement as something to confirm, whether it comes from the ebook or from your AI.

1. **Find the tag or citation.** Look for an `[F:...]` or `[S:...]` tag, or the source your AI named.
2. **Look it up.** Find the fact id in `sources/facts.yaml` and note its sources. Then find each source id in `sources/manifest.yaml`.
3. **Open the official link.** Use the `source_url` in the manifest. Read the current text yourself.
4. **Check the version.** For forms, confirm the current effective date on the official form page. For example, the kit records that on 2026-09-28 the SC-100 page listed the form as effective January 1, 2026 [F:sc100-effective]. Before you use SC-100, open the form page and confirm what it says now [S:jcc-form-sc-100].
5. **Check your local court.** Some courts require additional local forms, so check your court's website or clerk [F:local-forms].
6. **Note any gap.** If the official source says something different from the kit, the official source controls. Write down the difference and rely on the current official version.

If the kit has no source for a question, a well-behaved AI will say so rather than guess. You can then check the official California Courts self-help pages directly [S:cc-selfhelp-small-claims].

## Limitations

- **AI can be wrong.** It can misread a source, mix up details, or state something with confidence that is not correct. Verify before you rely on anything.
- **Sources change.** Forms, fees, limits, and rules are updated. The kit may lag behind. The current official source always controls.
- **Not legal advice.** The kit is general information for self-help. It does not tell you what to do in your case, predict any result, or review your documents.
- **No attorney-client relationship.** Buying or using the kit does not, by itself, create an attorney-client relationship with LegalFriend or any lawyer associated with it.
- **Limited scope.** The kit covers the California small claims plaintiff side. Other matters are outside it.

Free help is also available. California Courts offers free form-filling help, including Guide & File, and free small claims advisors [F:guide-and-file]. Each county provides free small claims advisor assistance [F:advisors].

## Checklist

- [ ] I created a separate project in the AI tool I chose.
- [ ] I pasted `prompts/system.md` into the instructions.
- [ ] I uploaded the ebook, facts sheet, manifest, and practice notes.
- [ ] I read my AI provider's privacy and data settings.
- [ ] I tested that answers use the three labels and cite sources.
- [ ] I verify each procedural statement against its official link.
- [ ] I confirm form effective dates on the official form page [F:sc100-effective].
- [ ] I check my local court for extra forms or rules [F:local-forms].
- [ ] I know where to find free court help [F:guide-and-file].

## Official sources for this chapter

- [S:cc-selfhelp-small-claims] California Small Claims Process — https://selfhelp.courts.ca.gov/small-claims
- [S:cc-small-claims-forms] Small Claims Forms — https://selfhelp.courts.ca.gov/small-claims-forms
- [S:cc-selfhelp-fill-out-forms] Fill out forms to start a small claims case — https://selfhelp.courts.ca.gov/small-claims/start-case/forms/fill-out-forms
- [S:jcc-form-sc-100] SC-100 — Plaintiff's Claim and ORDER to Go to Small Claims Court — https://selfhelp.courts.ca.gov/jcc-form/SC-100
- [S:ccp-116-260] Cal. Code of Civil Procedure § 116.260 — https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CCP&sectionNum=116.260
