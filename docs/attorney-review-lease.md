# Attorney review guide: California Lease Review Kit v0.1
*Created: 2026-10-01 | Status: AI-GENERATED | Owner: Sophia (attorney) | Requires Review: YES*

> Paths are relative to `kits/ca-lease-review/`. Same process as `docs/attorney-review.md`
> (verify facts, then set `status: approved`; the release build refuses anything less).

All content (8 chapters, 4 practice notes, system prompt + 5 task prompts, workflow) was
AI-drafted on 2026-10-01 from `sources/facts.yaml` (30 facts), reusing the
attorney-approved wording from the retired Lease Review service
(`legalfriend_v1.1/backend/CA_State_Config.yaml`, `approved_language`). Nothing has been
checked against live official sources yet.

## Start here: medium-confidence facts (9)

| Fact | Statement | Citation |
|---|---|---|
| `deposit-limit-small-landlord` | A small landlord — generally a natural person (or an LLC or family trust made up of natural persons) who owns no more than two residential rental properties with no more than four units in total — may collect up to two months' rent as security. | Cal. Civ. Code § 1950.5(c)(2), (c)(4) (subsections to confirm) |
| `deposit-limit-servicemember` | The small-landlord exception does not apply when the tenant is a service member; the one-month limit applies. | Cal. Civ. Code § 1950.5(c)(3) (subsection to confirm) |
| `deposit-receipts` | When deductions for repairs or cleaning total more than $125, the itemized statement must include copies of receipts or invoices (or a good-faith estimate, followed by receipts, if the work could not be completed within 21 days). | Cal. Civ. Code § 1950.5(g)(2)–(3) |
| `deposit-photos` | Newer rules require landlords to take photos of the unit at certain points (for example, at move-out before repairs or cleaning, and at move-in for tenancies starting on or after a 2025 effective date) to support deductions. | Cal. Civ. Code § 1950.5 (as amended by AB 2801, 2024; dates to confirm) |
| `late-fee-reasonable` | A late fee must be a reasonable estimate of the landlord's actual costs from late payment; a fee set as a penalty may be unenforceable. A late fee above about 5% of monthly rent is commonly treated as a signal to look more closely. | Cal. Civ. Code § 1671(d); Orozco v. Casimiro (2004) 121 Cal.App.4th Supp. 7 |
| `screening-fee` | An application screening fee is capped by state law at an amount adjusted each year for inflation, and the applicant is entitled to an itemized receipt; check the current cap rather than relying on a number in this kit. | Cal. Civ. Code § 1950.6 |
| `repair-and-deduct` | After giving the landlord notice and a reasonable time to fix a habitability problem, a tenant may in some cases pay for the repair and deduct it from rent, up to one month's rent and no more than twice in 12 months; the conditions are strict. | Cal. Civ. Code § 1942 |
| `auto-renewal` | An automatic renewal or extension clause in a residential lease is voidable by the tenant unless it appears in at least 8-point boldface type immediately above the tenant's signature. | Cal. Civ. Code § 1945.5 |
| `dv-termination` | A tenant who is a victim of domestic violence, sexual assault, stalking, or certain other crimes may end a lease early with written notice and qualifying documentation. | Cal. Civ. Code § 1946.7 |

## Approved wording reused from the old service

These lines are quoted verbatim where relevant. Two of them read stronger than the kit's
neutral tone; decide whether to keep them word for word.

| Fact | Approved wording |
|---|---|
| `deposit-what-counts` | All deposits combined (security + pet + other) must comply with CA limits: 1 month rent for most landlords, 2 months for small owners (≤2 properties, ≤4 units) |
| `deposit-limit-general` | Deposits exceed CA standard limit (1 month rent). Legal only if landlord owns ≤2 properties with ≤4 units total. |
| `deposit-limit-small-landlord` | Deposits exceed CA legal limits (1 month for most landlords, 2 months for small landlords with ≤2 properties). |
| `deposit-allowed-deductions` | Reasonable wear and tear from normal use |
| `late-fee-reasonable` | This late fee is over 5% of rent (California's common "reasonableness" benchmark)—if charged, demand proof of the landlord's actual costs before paying. |
| `entry-notice` | California requires reasonable notice (commonly 24+ hours) for non-emergency entry |
| `habitability` | Despite any contradicting clause, your landlord is still required to maintain heating, plumbing, and a safe structure. Document any issues and ask for repairs in writing. |
| `waivers-void` | Despite this clause, landlords remain liable for their negligence and must provide habitable housing. |
| `jury-waiver` | Despite this clause, you can still request a jury trial. This waiver is invalid in CA. |

- **Late fee** ("…demand proof of the landlord's actual costs before paying"): "demand" is firmer
  than the rest of the kit; chapter 3 follows it with a softer "ask a polite written question" tip.
- **Jury waiver** ("This waiver is invalid in CA."): reads as a verdict; quoted as approved wording.
- The two deposit-limit warnings ("Legal only if…", "exceed CA legal limits") were **not** used:
  they read as conclusions about the reader's lease and omit the service-member exception.

## Gaps the drafts avoided (candidates for new facts)

**Money and clauses:** what counts as a deposit beyond the general rule (cleaning/"nonrefundable"
fees); returned-check fees; daily/compounding late fees and grace periods; payment-method rules;
joint-and-several ("every tenant owes the full rent") clauses; required disclosures (mold, lead,
bed bugs, flood); assistance animals vs pets (fair housing; no source in the manifest yet);
subletting/assignment consent; guest and occupancy limits; smoking, home business, and
short-term-rental rules (mostly local); tenant's right to a signed copy; landlord's duty to
disclose a name and address for notices.

**Repairs and entry:** repair-and-deduct conditions (e.g., any 30-day presumption); rent
withholding (deliberately left out); tenant upkeep duties (§ 1941.2); mold/lead/asbestos and code
enforcement; acts protected from retaliation and remedies; permitted entry reasons and
"emergency"; showings; remedies for improper entry; the state config's `entry_rights` text
("You can say no if your landlord didn't give proper notice…") is not yet a fact.

**Ending:** what happens when a fixed term ends silently; just-cause reasons and relocation amounts;
how Tenant Protection Act coverage and the exemption notice work; § 1946.1 exceptions; early
termination fees; subletting to reduce losses; § 1946.7 documents and timing; notice of
non-renewal; lockouts and self-help eviction.

**Deposit:** wear-and-tear examples (the config's `deposit_protection` paint/carpet examples are
not yet facts); "bad faith" definition; forwarding address; day counting for 21 days; deposit
interest (local); sale of the property; burden of proof; time limit to sue; photo-rule dates.

## Migrated blog and deposit pages (legalfriend.ai/blog, /deposit-dispute)

Bodies were copied verbatim from lease.legalfriend.ai; only promotional links to the retired
service were removed. Items to look at:

- The 2025 posts contain literal `''` instead of apostrophes (e.g., "they''re"); this was on the
  live site too.
- Deposit FAQ: "If your landlord doesn't respond within 14 days, the next step is filing…" vs the
  ignored-letter post: "California has no universal fixed waiting period."
- Deposit FAQ cites "CCP §339" for the limitations period.
- Calculator result text: "Your landlord has violated California law." is shown without knowing
  whether an itemized statement was sent.
- The deposit disclaimer still mentions "documents generated" (from the retired letter product).
- Removed from /deposit-dispute: the $39 kit pricing, the "Real results" testimonials (they
  endorsed the retired product), FAQs "What languages are supported?" and "Is my information
  secure?", and the demand-letter step. See the migration notes in the commit message.
- Five blog images are still served from the lease app's Supabase storage; they must be moved
  before Supabase is shut down (see `docs/lease-retirement-runbook.md`).

## Landing page

`/california-lease-review` copy is new (draft). It is `noindex` and out of the sitemap until
`LEASE_LANDING_APPROVED` is set to `true` in `site/src/site.ts`.
