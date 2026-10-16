# Attorney review guide — California Small Claims Kit v0.1

> Paths in this guide are relative to `kits/ca-small-claims/`.
*Created: 2026-09-29 | Status: AI-GENERATED | Owner: Sophia (attorney) | Requires Review: YES*

All kit content (12 ebook chapters, 4 practice notes, 6 prompts) was AI-drafted on
2026-09-29 at Sophia's request, grounded only in `sources/facts.yaml`. It was written
without network access to court or legislative sites, so **nothing has been checked
against the live official sources yet.**

The kit cannot be released until this review is done. `python3 scripts/build_kit.py`
refuses to build a sellable zip while any file is unapproved or any fact it uses is
unverified. `python3 scripts/build_kit.py --draft` builds a marked review copy.

## How to approve

1. **Facts first.** For each entry in `sources/facts.yaml`, open its sources (URLs in
   `sources/manifest.yaml`), confirm or correct the statement and citation, then set
   `verified: true`. When you fetch a source, fill in its `last_verified`, `effective_date`
   (forms), and set `status: verified`.
2. **Content.** Read each chapter and practice note. Edit freely. Then set its front matter
   `status: approved` (and, for practice notes, `author` and `last_reviewed`).
3. Run `python3 scripts/check_content.py --release`. When it passes, build the release zip
   with `python3 scripts/build_kit.py` and upload it (see the setup notes in
   `docs/legalfriend-ai-integration.md`).

`python3 scripts/check_content.py` prints the status of every file and how many unverified
facts each uses.

## Start here: medium-confidence facts (13)

These are the facts most likely to need a correction (subsection numbers, exact deadlines,
details):

| Fact | Statement | Citation |
|---|---|---|
| `waive-excess` | A claim may not be split into several cases to fit under the limit; a plaintiff who sues in small claims for less than the full amount generally gives up the rest. | Cal. Code Civ. Proc. § 116.220 (subsection to confirm) |
| `entity-appearance` | A corporation or other business entity appears through a regular employee, officer, or director who was not hired just to appear in small claims court (a partnership may also appear through a partner); the representative must file a declaration of authority (SC-109). | Cal. Code Civ. Proc. § 116.540(b), (c), (j) |
| `demand-first` | Where possible, ask the defendant to pay (or, if the claim is for possession of property, to return the property) before you file. SC-100 item 4 says the request can be made in person, in writing, or by phone, and asks whether you did and, if not, why not. | Cal. Code Civ. Proc. § 116.320(b)(3); SC-100 item 4 (Rev. Jan. 1, 2026) |
| `venue-basics` | Small claims venue follows specific rules — commonly where a defendant lives or does business, where a contract was made or was to be performed, or where the injury or property damage happened — with special rules for certain consumer contracts. | Cal. Code Civ. Proc. §§ 116.370(a), 395, 395.5 |
| `fees-vary` | Filing fees depend on the amount claimed and how many small claims the plaintiff has filed in the past 12 months; check the court's current fee schedule rather than relying on a number in this kit. | California Courts small claims guidance |
| `substituted-service-timing` | Substituted service is not complete until 10 days after the mailing, which must be counted toward the service deadline. | Cal. Code Civ. Proc. §§ 116.340(a)(3), 415.20(a)–(b) |
| `proof-of-service` | After service, the server completes and signs a proof of service (form SC-104); file it with the court at least 5 days before the hearing. | Cal. Code Civ. Proc. § 116.340(c); SC-104; California Courts, Serve your small claims forms |
| `postpone` | A party can ask to postpone the hearing using form SC-150; whether it is granted is up to the court. | Judicial Council form SC-150 |
| `statement-of-assets` | Unless the judgment is paid or appealed, the losing party generally must complete a Judgment Debtor's Statement of Assets (form SC-133) and send it to the winning party within the time the law sets. | Cal. Code Civ. Proc. § 116.830; SC-133 |
| `enforcement-wait` | The winning party generally must wait until the time to appeal or to ask the court to vacate the judgment has passed before starting collection. | Cal. Code Civ. Proc. § 116.810 |
| `enforcement-tools` | Common collection tools include a writ of execution (EJ-130) used for bank levies and wage garnishment, an abstract of judgment (EJ-001) that creates a lien on the debtor's real property in a county once it is recorded with that county's recorder, and an order for the debtor to appear for examination. | Cal. Code Civ. Proc. §§ 699.510, 697.310(a), 708.110; forms EJ-130, EJ-001 |
| `judgment-ten-years` | A California money judgment generally expires after 10 years unless it is renewed before then. Since January 1, 2023, some judgments can be renewed only once, for 5 years — California Courts describes this as applying when the debtor is a person (not a business or government agency), the principal owed is less than $200,000 for a medical expense or less than $50,000 for a personal debt, and the debt is not from a tort, fraud, unpaid wages, or other money owed to an employee. | Cal. Code Civ. Proc. §§ 683.020, 683.110(c)–(d), 683.120(c); California Courts, Renew a small claims judgment |
| `satisfaction` | When the judgment is paid in full, the judgment creditor must file an Acknowledgment of Satisfaction of Judgment right away — usually form SC-290, or form EJ-100 (signed in front of a notary) if a lien was recorded on the debtor's real estate. If the debtor asks in writing and the creditor, without good cause, does not file within 14 days of the request, the creditor can be liable for the debtor's damages plus $50. | Cal. Code Civ. Proc. § 116.850(a)–(b); SC-290; EJ-100 |

## Gaps the drafts avoided (candidates for new facts)

The writers did not state these because they are not in `facts.yaml`; the text sends readers
to the official source instead. Adding a verified fact for any of them lets the chapters say
it directly.

**Scope and limits**
- Whether small claims is limited to money, or can order property returned / other relief.
- Exceptions to the dollar limits; options for claims over the limit (e.g., limited civil).
- Matters small claims cannot hear (evictions, family law, etc.).
- When limitation periods start, tolling, and classifying a claim; worked example in Ch. 2
  (filing $12,500 of a $15,000 claim waives $2,500) — confirm.

**Defendants and venue**
- How to name a sole proprietor with a DBA, partnerships, LLCs, corporations; aliases.
- Suspended/dissolved entities on bizfile; owner liability for entity debts.
- Serving a business through its agent for service of process.
- Wrong-venue consequences; consumer-contract venue rule; defendants in several counties;
  the SC-100 venue reason section.
- Small claims is filed in the county superior court (the drafts avoid saying so).

**SC-100 and filing**
- What SC-100 asks item by item (a single `sc100-contents` fact would help Ch. 5–6);
  signature under penalty of perjury; attaching pages; older form versions.
- Who signs SC-100 for a business plaintiff.
- Required form/timing of the pre-filing payment demand.
- What the clerk returns after filing; copies; e-filing availability; payment methods;
  how/when FW-001 is filed and partial waivers.
- Recoverable amounts (interest, costs, out-of-pocket expenses).
- Government claims: how/where to present, forms, deadline to sue after denial.

**Service**
- Which papers are served; day-counting for the 15/20-day deadlines; when clerk
  certified-mail service is complete and its fee; substituted-service details
  (competent adult, P.O. boxes); SC-104 filing deadline; consequences if service
  isn't completed; whether a co-plaintiff counts as a "party" who can't serve (Ch. 8
  infers yes).

**Hearing and evidence**
- Judge/commissioner/temporary judge; time per case; interpreters and accommodations;
  witnesses, subpoenas (SC-107), declarations; copies of exhibits and exchange with the
  other side; electronic evidence; no-show consequences; SC-120 timing and response;
  SC-150 deadline and fee.

**Judgment and collection**
- How judgment is delivered; correcting it; motion to vacate; appeal process after SC-140.
- Counting the collection waiting period; installment payment requests.
- SC-133 contents, deadline, and remedies if not sent; examination order form (SC-134).
- Levying officer steps and fees; wage garnishment limits and exemptions; interest and
  recoverable collection costs; renewal procedure; SC-290 deadline and penalty.

## Non-legal know-how to glance at

- Bizfile search steps and county FBN lookup ("usually the county clerk or clerk-recorder").
- Plain-English definitions of entity types and "agent for service of process" (Ch. 3).
- Collection note: writing down bank/employer details the plaintiff already knows from
  ordinary, lawful contact.
- Chapter 5 example timeline and damages table ($1,800.00 + $245.50 − $400.00 = $1,645.50),
  labeled as made-up examples.

## Outside the kit

- `/privacy` and `/terms` on legalfriend.ai were also drafted on 2026-09-29 (seller
  PeopleShine Inc. dba LegalFriend; refund until first download; California courts, no
  arbitration). Review them before turning on checkout.
