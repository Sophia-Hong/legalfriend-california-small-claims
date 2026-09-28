# LegalFriend California Small Claims AI Self-Help Kit — PRD

**문서 상태:** Draft v0.1  
**작성일:** 2026-09-28  
**제품:** LegalFriend — California Small Claims Plaintiff Kit  
**도메인:** `legalfriend.ai`  
**초기 관할:** California, United States  
**초기 사용자:** California small claims에서 직접 원고로 소송하려는 self-represented litigant  
**제품 형태:** 전자책 + 다운로드 가능한 AI-readable knowledge/toolkit + 사용자가 직접 선택한 AI에서 실행하는 workflow  
**핵심 원칙:** LegalFriend가 사용자의 사건정보를 수집·처리하는 AI 법률서비스가 아니라, 공식 법원 자료와 변호사 실무 관점을 구조화한 self-help publication/toolkit

---

## 1. Executive Summary

LegalFriend의 첫 self-help 제품으로 **California Small Claims Plaintiff Kit**을 출시한다.

California Courts는 small claims에 관해 이미 양질의 공식 self-help 자료, Judicial Council forms, 단계별 절차 가이드, Guide & File 등을 제공하고 있다. 문제는 정보가 여러 페이지, PDF, form instruction, local court resource에 흩어져 있고, 일반 사용자가 자신의 사건 진행 단계와 연결해 이해하기 어렵다는 점이다.

LegalFriend는 이 기존 공공자료를 대체하지 않는다. 대신 다음을 제공한다.

1. 공식 California court 자료를 AI가 검색·인용하기 쉬운 형태로 구조화한 corpus
2. 사건 진행 단계별 workflow
3. form·절차·local issue를 연결하는 retrieval metadata
4. California 변호사가 추가한 일반적인 practice note와 issue-spotting
5. 사용자가 자신의 ChatGPT, Claude 또는 기타 AI 환경에서 이용할 수 있는 prompt/tooling bundle
6. 공식 자료, LegalFriend commentary, AI-generated output을 명확히 구별하는 provenance 구조

초기 MVP는 **Plaintiff side**만 다룬다.

핵심 제품 메시지는:

> **Don't just fill out a form. Understand your small claims case.**

그리고 기술·법적 포지셔닝의 핵심 메시지는:

> **Built for Your AI — Not Ours.**

LegalFriend는 사용자의 사건파일이나 AI prompt/output을 제품 운영을 위해 수집하지 않는 구조를 우선한다. 사용자가 독립적으로 선택·운영하는 AI가 LegalFriend의 출판물·knowledge package를 읽고 사용하는 구조다.

---

## 2. Problem

California small claims는 self-representation을 전제로 상당한 공공 self-help infrastructure가 존재하지만 실제 사용자 경험에는 여전히 다음과 같은 문제가 있다.

### 2.1 정보 분산

사용자는 다음을 각각 찾아야 한다.

- small claims가 적절한 절차인지
- 청구금액 한도
- 누구를 defendant로 표시해야 하는지
- 사업체의 정확한 법적 명칭
- venue
- SC-100 작성
- 추가 form 필요 여부
- local court forms
- filing
- service
- evidence 정리
- hearing 준비
- judgment 이후 collection

California Courts는 이 정보를 상당 부분 제공하지만, 사용자 입장에서는 “내 사건에서 지금 무엇을 봐야 하는지”를 판단하기가 어렵다.

### 2.2 Form filler만으로는 부족

현재 민간 서비스 중 상당수는 다음과 같은 가치제안에 집중한다.

- SC-100 AI intake
- form 자동작성
- completeness/blocker review
- court-ready PDF

이는 유용하지만 작은 소송의 전체 lifecycle을 설명하지는 않는다.

LegalFriend가 노리는 영역은:

`form filling`보다 넓고,  
`개별 변호사 representation`보다 좁은,

**structured self-help knowledge + workflow layer**다.

### 2.3 범용 AI의 법률정보 사용 문제

범용 AI에 바로 “California small claims 어떻게 해?”라고 질문하면 다음 문제가 발생할 수 있다.

- 오래된 form 사용
- statewide rule과 local rule 혼동
- authority 없는 답변
- 공식자료와 추론의 혼합
- hallucination
- source provenance 부재
- procedural stage를 고려하지 않는 일반 답변

LegalFriend는 범용 AI 자체를 새로 만들기보다, **AI가 신뢰할 수 있는 공식자료를 더 정확히 읽고 검색하도록 만드는 knowledge package**를 제공한다.

---

## 3. Why California Small Claims First

### 3.1 높은 self-help 적합성

California Courts는 small claims를 다음 네 단계로 구조화하고 있다.

1. Before you start
2. Start a small claims case
3. Go to your court date
4. After the trial

공식 자료가 이미 self-represented litigant를 중심으로 설계되어 있어 LegalFriend가 공공자료 위에 workflow layer를 구축하기 좋다.

### 3.2 명확한 핵심 form

Plaintiff side의 중심은 **SC-100 — Plaintiff's Claim and ORDER to Go to Small Claims Court**다.

California Courts에 따르면 현재 SC-100의 effective date는 **January 1, 2026**이다.

### 3.3 반복되는 실무 문제

공식 자료 자체가 다음 문제를 명시적으로 강조한다.

- defendant의 proper legal name
- 적절한 county/venue
- additional local forms
- 경우에 따라 필요한 SC-100A, SC-103 등
- filing 이후 service
- judgment 이후 collection

이는 RAG와 guided workflow가 도움을 줄 수 있는 명확한 issue cluster다.

### 3.4 제한된 첫 범위

초기에는 모든 California civil self-help를 다루지 않는다.

MVP의 명확한 범위:

> **California Small Claims — Plaintiff preparing to file or prosecute a money claim**

Defendant workflow, appeals, eviction, debt defense, family law 등은 후속 제품으로 둔다.

---

## 4. Market / Competitive Scan

### 4.1 California Courts

California Courts 자체가 가장 중요한 기준점이다.

제공 기능:

- statewide self-help guide
- SC forms
- step-by-step instructions
- Guide & File
- small claims advisors
- local court resources

LegalFriend는 이를 대체하거나 복제하는 것이 아니라 **공식 자료를 사용자가 자신의 AI와 함께 활용하기 쉽게 구조화**한다.

### 4.2 Ezel

확인된 제공 내용:

- California SC-100 중심
- $49 one-time / 30-day workspace
- AI-assisted intake
- completeness review
- court-ready PDF
- venue helper
- 일부 추가 form 지원

직접 경쟁 영역은 `SC-100 guided completion`.

LegalFriend 차별점은 SC-100 작성 자체보다 **case lifecycle + source-backed AI workspace**에 둔다.

### 4.3 기타 form / self-help 서비스

California small claims 관련으로 form preparation, demand letter, filing workflow 등을 제공하는 민간 서비스가 존재한다.

따라서 다음 메시지는 피한다.

> “California small claims를 AI로 돕는 최초의 서비스”

대신:

> “official-source-first, lawyer-designed, bring-your-own-AI self-help kit”

라는 구조적 차별화를 강조한다.

### 4.4 GitHub / Open-source Gap

2026-09-28 기준 공개 웹/GitHub 검색에서 다음 요소를 모두 갖춘 대표적인 공개 프로젝트는 확인되지 않았다.

- California small claims official materials
- version-aware RAG corpus
- procedural-stage metadata
- downloadable / user-controlled AI workflow
- lawyer practice notes
- source provenance separation

이는 **공백 가능성**이지 “동일한 repository가 존재하지 않는다”는 절대적 부재 증명은 아니다.

제품/마케팅 문구에서는 “first”, “only” 등 검증하기 어려운 표현을 사용하지 않는다.

---

## 5. Product Positioning

### 5.1 Category

**AI-ready legal self-help publication/toolkit**

또는 소비자용 표현:

**California Small Claims AI Self-Help Kit**

### 5.2 One-line Value Proposition

> California gives you the forms. LegalFriend helps you understand how the pieces fit together.

### 5.3 Primary Differentiator

> **Built for Your AI — Not Ours.**

사용자가 자신이 선택한 AI를 사용한다.

LegalFriend의 기본 제품 구조에서는:

- 사용자 사건 intake를 받지 않음
- 사용자 사건파일을 LegalFriend 서버에 upload하지 않음
- 사용자 AI prompt를 LegalFriend가 보지 않음
- 사용자 AI output을 LegalFriend가 보지 않음
- LegalFriend가 사용자별 결과물을 승인하지 않음
- LegalFriend가 상대방/법원과 사용자를 대신해 communication하지 않음

### 5.4 Secondary Differentiator

**Three-layer provenance**

모든 substantive knowledge를 가능한 한 다음 세 층으로 구분한다.

#### OFFICIAL SOURCE

California Courts, Judicial Council forms/instructions, statutes, rules, Superior Court resources 등.

#### LEGALFRIEND PRACTICE NOTE

California 변호사가 제공하는 일반적인 교육적 commentary, common pitfalls, issue-spotting.

#### AI WORKSPACE

사용자가 선택한 AI가 작성한 summary, checklist, draft, organization, research output.

이 세 가지를 UI와 corpus metadata에서 혼합하지 않는다.

---

## 6. Legal / Professional Responsibility Product Guardrails

> 이 절은 제품 설계를 위한 risk-control requirement이다. 특정 사용자에게 제공되는 법률의견을 구성하지 않는다.

### 6.1 구조적 전제

초기 LegalFriend Kit는 다음 구조를 유지한다.

```text
LegalFriend
  ├── Ebook / guide
  ├── Official-source knowledge corpus
  ├── Prompt templates
  ├── Retrieval configuration
  ├── Checklists / workflows
  └── Practice notes
          ↓
User downloads / accesses kit
          ↓
User selects and operates own AI system
          ↓
User provides case facts directly to that AI
          ↓
AI output returns to user
```

LegalFriend 서버에는 기본적으로 다음이 들어오지 않는 구조를 목표로 한다.

```text
NO individualized case intake
NO case document storage
NO user prompt logs
NO AI answer logs
NO individualized attorney review
NO court filing on user's behalf
NO communication with opposing party
```

### 6.2 Attorney-client relationship messaging

구매와 attorney-client relationship을 구별하는 문구를 checkout, product page, README/ebook introduction에 일관되게 배치한다.

핵심 내용:

- purchase/use alone does not create an attorney-client relationship
- author does not receive/review the purchaser's case information through the toolkit
- AI service is independently selected and operated by the purchaser
- individualized legal advice requires a separate engagement if ever offered

단순한 `not legal advice` 한 줄에 의존하지 않는다.

### 6.3 AI agency separation

Prompt 및 README에서 AI가 LegalFriend 변호사의 agent 또는 spokesperson처럼 표현되지 않도록 한다.

피해야 할 표현:

- “You are Attorney X's legal assistant.”
- “Tell the user what Attorney X recommends.”
- “Act as the user's California lawyer.”
- “Provide the best litigation strategy.”

선호 표현:

- “You are a self-help research and organization assistant.”
- “Use the supplied sources and distinguish authority from commentary.”
- “Identify alternatives and unresolved questions.”
- “Cite the current official source for procedural assertions.”

### 6.4 Marketing guardrails

피해야 할 표현:

- AI Lawyer
- We analyze your case
- We tell you what to do
- Best legal strategy
- Increase your chances of winning
- Attorney-approved AI advice
- Win your case without a lawyer

선호 표현:

- Lawyer-designed
- Self-help toolkit
- Official-source-first
- Research and organization
- Understand the process
- Prepare your own case
- Built for use with the AI you choose

### 6.5 California lawyer AI guidance

California State Bar는 2026년 업데이트된 GenAI Practical Guidance에서 agentic AI를 명시적으로 다루며, lawyer가 AI를 legal practice에 사용할 때 competence, confidentiality, communication, candor, professional judgment 등 기존 윤리의무가 계속 적용된다는 점을 강조한다.

LegalFriend Kit의 목적은 **LegalFriend lawyer가 AI를 통해 각 purchaser에게 법률서비스를 제공하는 구조가 아니라**, publication/toolkit purchaser가 자신의 AI를 독립적으로 이용하는 구조를 유지하는 것이다.

제품이 향후 individualized review, hosted inference, attorney sign-off 등을 추가하면 별도 legal/ethics review를 거쳐야 한다.

---

## 7. Target User

### Primary Persona

**California resident / small business owner / consumer who believes another person or business owes them money and is considering filing small claims without hiring litigation counsel.**

Typical disputes:

- security deposit
- unpaid invoice
- loan repayment
- property damage
- contractor/service dispute
- consumer transaction
- simple contract dispute

### User Characteristics

- 변호사를 선임할 정도의 claim size가 아니라고 생각함
- California Courts self-help pages를 찾았으나 어디서 시작해야 할지 어려움
- ChatGPT/Claude 등 AI 사용 경험이 있을 수 있음
- 문서와 screenshot은 있으나 evidence story가 정리되지 않음
- legal terminology보다 action-oriented workflow를 원함

---

## 8. Jobs To Be Done

사용자는 다음 질문에 답하고 싶다.

1. 내 문제는 California small claims에 맞는가?
2. 누구를 정확히 defendant로 적어야 하는가?
3. 어디에 file할 수 있는가?
4. filing 전에 해야 할 일이 있는가?
5. SC-100의 각 항목은 무엇을 의미하는가?
6. additional form이 필요한가?
7. local form이 있는가?
8. filing 후 무엇을 해야 하는가?
9. service는 어떻게 진행되는가?
10. 내 자료를 hearing에서 설명할 수 있게 어떻게 정리하는가?
11. judge에게 보여줄 핵심 사실과 evidence를 어떻게 연결하는가?
12. 판결 후 무슨 일이 생기는가?
13. 내가 보고 있는 정보가 공식 법원자료인지 AI 추론인지 어떻게 구별하는가?

---

## 9. MVP Scope

### 9.1 Included

#### Phase A — Before Filing

- small claims fit checklist
- current claim-limit source
- plaintiff eligibility basics
- defendant identification workflow
- business/entity naming checklist
- venue issue checklist
- demand/pre-filing checklist
- statute-of-limitations issue flagging (정보/issue spotting만 제공하고 definitive conclusion은 source 기반으로 제한)

#### Phase B — SC-100 Preparation

- current SC-100 retrieval
- field-by-field explanation
- source-linked instructions
- SC-100A trigger
- SC-103 trigger
- local form check
- missing-information checklist
- user fact → form-field mapping workspace

#### Phase C — Filing / Service

- filing method information
- fee / fee-waiver source links
- service overview
- who may serve
- proof-of-service resources
- deadline issue spotting
- local court cross-check

#### Phase D — Hearing Preparation

- chronology builder
- evidence inventory
- exhibit checklist
- damages table
- witness checklist
- factual-point ↔ evidence mapping
- hearing preparation checklist
- questions the user should be ready to answer

#### Phase E — After Judgment Basics

- judgment outcome orientation
- collection official resources
- satisfaction/payment resources
- next-step links

### 9.2 Explicitly Out of Scope for MVP

- Defendant-side full workflow
- appeal/de novo workflow
- automated court filing
- process service ordering
- communication with opposing party
- settlement negotiation agent
- prediction of win probability
- case-specific attorney review
- representation
- attorney-client chat
- LegalFriend-hosted user case database
- LegalFriend-hosted LLM inference
- family law
- eviction
- debt defense
- federal court
- non-California jurisdiction

---

## 10. Source Strategy

### 10.1 Source Priority

Retrieval ranking:

1. California Courts / Judicial Branch official self-help
2. Judicial Council forms and official instructions
3. California statutes
4. California Rules of Court
5. relevant Superior Court local resources
6. LegalFriend practice notes
7. secondary explanatory sources only when necessary and clearly labeled

### 10.2 Source Freshness

모든 source record에 다음을 저장한다.

```yaml
jurisdiction: CA
court_level: statewide | superior_court
county: null | los_angeles | orange | ...
proceeding: small_claims
side: plaintiff
stage: prefiling | pleading | filing | service | hearing | judgment
document_type: self_help | form | instruction | statute | rule | local_rule | practice_note
form_number: SC-100
effective_date: 2026-01-01
source_url: ...
source_title: ...
publisher: California Courts
official: true
last_verified: 2026-09-28
version_hash: ...
supersedes: ...
```

### 10.3 Versioning Requirement

Form number만으로 문서를 식별하지 않는다.

`form_number + effective_date + source_url + hash`

를 version key로 사용한다.

새 effective version이 발견되면 이전 version을 삭제하기보다 superseded 상태로 보관하여 변경점을 추적할 수 있게 한다.

### 10.4 Local Court Layer

Statewide corpus와 local corpus를 분리한다.

```text
corpus/
  california/
    statewide/
      small-claims/
    counties/
      los-angeles/
      orange/
      san-diego/
      santa-clara/
```

MVP에서는 statewide가 우선이며, county expansion은 검색 수요와 사용자 피드백에 따라 추가한다.

---

## 11. Repository Proposal

```text
legalfriend-california-small-claims/
│
├── README.md
├── LICENSE
├── DISCLAIMER.md
├── CHANGELOG.md
│
├── ebook/
│   ├── california-small-claims.md
│   └── chapters/
│
├── sources/
│   ├── manifest.yaml
│   ├── statewide/
│   │   ├── self-help/
│   │   ├── forms/
│   │   ├── statutes/
│   │   └── rules/
│   └── counties/
│
├── corpus/
│   ├── chunks.jsonl
│   ├── metadata.schema.json
│   └── index-manifest.json
│
├── prompts/
│   ├── system.md
│   ├── source-research.md
│   ├── timeline-builder.md
│   ├── sc100-workspace.md
│   ├── evidence-organizer.md
│   └── hearing-prep.md
│
├── workflows/
│   ├── plaintiff.yaml
│   ├── prefiling.yaml
│   ├── sc100.yaml
│   ├── service.yaml
│   ├── hearing.yaml
│   └── judgment.yaml
│
├── practice-notes/
│   ├── defendant-name.md
│   ├── venue.md
│   ├── evidence-story.md
│   └── collection.md
│
├── scripts/
│   ├── fetch_sources.*
│   ├── normalize.*
│   ├── validate_links.*
│   ├── diff_versions.*
│   └── build_corpus.*
│
└── tests/
    ├── source-freshness.*
    ├── citation-integrity.*
    ├── form-version.*
    └── retrieval-cases/
```

---

## 12. AI Behavior Specification

### 12.1 System Behavior Principles

AI는 다음 순서로 작동해야 한다.

1. user's procedural stage 식별
2. jurisdiction 확인
3. official source retrieval
4. relevant form/version 확인
5. local-form/local-rule possibility 확인
6. official information 설명
7. LegalFriend practice note를 별도 표시
8. AI가 정리/초안을 생성했다면 AI workspace로 표시
9. 중요한 procedural assertion에는 source 제시
10. unresolved issue 또는 source conflict가 있으면 명확히 표시

### 12.2 Retrieval Rule

AI가 procedural question에 답할 때:

- knowledge corpus에 있는 official source를 우선한다.
- source가 없으면 추측하지 않는다.
- outdated source와 current source가 충돌하면 current effective version을 우선한다.
- county-specific issue가 있을 수 있으면 statewide rule만으로 완료하지 않는다.
- form 번호만 알려주지 말고 current effective version을 확인한다.

### 12.3 Required Response Labels

가능한 UI/output convention:

```text
[OFFICIAL SOURCE]
...

[LEGALFRIEND PRACTICE NOTE]
...

[AI WORKSPACE]
...
```

### 12.4 Drafting Boundary

MVP는 사용자의 사실을 **정리·mapping**하는 것과 완성된 individualized litigation strategy를 구별한다.

권장:

- chronology
- issue checklist
- form-field worksheet
- damages arithmetic
- exhibit organization
- neutral alternatives
- missing facts
- questions requiring verification

주의/제한:

- “이 주장이 가장 강하다”
- “이 defense는 반드시 실패한다”
- “이 금액으로 settle하라”
- “이 증거는 숨겨라/제출하지 마라”
- “승소확률은 X%”
- lawyer attribution이 붙은 case-specific recommendation

---

## 13. Ebook Structure

### Chapter 1 — What California Small Claims Is
- scope
- current limits
- who uses it
- official process overview

### Chapter 2 — Is Small Claims Right for This Dispute?
- procedural fit
- money claim
- issue checklist
- when official sources indicate another procedure

### Chapter 3 — Identify the Right Defendant
- person
- business
- entity name
- fictitious business names
- collection implications

### Chapter 4 — Where Can You File?
- venue concepts
- courthouse finding
- local-resource check

### Chapter 5 — Before Filing
- demand
- evidence preservation
- chronology
- damages calculation

### Chapter 6 — SC-100
- current form
- field-by-field guide
- attachments
- supplemental forms

### Chapter 7 — Filing
- copies
- fees
- fee waiver
- electronic/in-person options where applicable
- local requirements

### Chapter 8 — Service
- basic requirements
- proof
- timing
- common mistakes

### Chapter 9 — Build the Case File
- document inventory
- timeline
- exhibit mapping
- witness information
- damage proof

### Chapter 10 — Prepare for the Hearing
- short factual presentation
- evidence order
- likely questions
- what to bring

### Chapter 11 — Judgment
- understanding result
- payment
- collection orientation
- official post-judgment resources

### Chapter 12 — Using the LegalFriend AI Toolkit
- supported AI environments
- how to load knowledge
- privacy model
- provenance labels
- source verification
- limitations

---

## 14. Landing Page

### Primary URL

`https://legalfriend.ai/california-small-claims`

### SEO Title

**California Small Claims Help 2026 | AI Self-Help Kit | LegalFriend**

### Meta Description

**Navigate California small claims court with a lawyer-designed AI self-help kit built around official California court materials. Understand SC-100, venue, service, evidence, hearing preparation, and judgment collection.**

### Hero

**California Small Claims, Made Understandable**

Handle your California small claims case with a lawyer-designed AI self-help kit.

California gives you the forms.  
LegalFriend helps you understand how the pieces fit together.

### Primary CTA

**Get the California Small Claims Kit**

### Supporting Claim

**Built around official California court materials — organized so you and your own AI can actually use them.**

### Key Differentiation Section

**More Than an SC-100 Form Filler**

Explain:

- before filing
- build your claim
- prepare forms
- serve defendant
- hearing prep
- after judgment

### Architecture Section

**Built for Your AI — Not Ours**

Explain:

1. purchase/download kit
2. choose preferred AI
3. work through case
4. verify official source

Avoid presenting LegalFriend as a hosted “AI lawyer.”

---

## 15. SEO Architecture

### 15.1 Pillar

`/california-small-claims`

### 15.2 Procedural Pages

- `/california-small-claims/sc-100`
- `/california-small-claims/how-to-file`
- `/california-small-claims/serve-defendant`
- `/california-small-claims/prepare-for-hearing`
- `/california-small-claims/collect-judgment`
- `/california-small-claims/venue`
- `/california-small-claims/name-defendant`

### 15.3 Dispute-type Pages

- `/california-small-claims/security-deposit`
- `/california-small-claims/unpaid-invoice`
- `/california-small-claims/loan-repayment`
- `/california-small-claims/property-damage`
- `/california-small-claims/contractor-dispute`

각 페이지는 별도의 “법률결론 자동화” 상품이 아니라 relevant official workflow로 사용자를 연결한다.

### 15.4 County Expansion

Phase 2:

- `/california-small-claims/los-angeles`
- `/california-small-claims/orange-county`
- `/california-small-claims/san-diego`
- `/california-small-claims/santa-clara`

county page는 실제 local court links/forms/advisor information 등 유의미한 local content가 있을 때만 생성한다.

thin/duplicate SEO pages는 만들지 않는다.

### 15.5 Structured Data

검토 대상:

- `Product`
- `FAQPage` (검색엔진 정책상 적합한 경우)
- `BreadcrumbList`
- `Article` / educational pages

법률서비스의 outcome 보장 또는 review markup 오용은 피한다.

---

## 16. MVP UX Flow

```text
Landing page
   ↓
Purchase
   ↓
Download / Access Kit
   ↓
Choose AI environment
   ↓
Start Plaintiff Workflow
   ↓
1. Describe dispute
   ↓
2. Build timeline
   ↓
3. Identify parties
   ↓
4. Venue checklist
   ↓
5. Pre-filing checklist
   ↓
6. SC-100 workspace
   ↓
7. Local forms check
   ↓
8. Filing & service checklist
   ↓
9. Evidence organizer
   ↓
10. Hearing preparation
   ↓
11. Judgment / collection resources
```

---

## 17. Product Requirements

### P0 — Must Have

- current California Small Claims official source manifest
- SC-100 current version detection
- source metadata schema
- official source vs practice note separation
- plaintiff workflow
- defendant-name checklist
- venue checklist
- SC-100 field workspace
- local-form check reminder
- citation/source link output
- chronology builder
- evidence organizer
- hearing checklist
- disclaimer / relationship separation language
- landing page
- purchase → repo/kit access flow
- source update mechanism

### P1 — Should Have

- automatic link checker
- source diff alerts
- county modules
- downloadable evidence binder template
- damages worksheet
- AI environment-specific install instructions
- test prompts
- source coverage dashboard

### P2 — Later

- Defendant Kit
- debt lawsuit defense
- eviction defendant
- judgment collection deep-dive
- county-specific procedural adapters
- multilingual versions
- optional paid attorney review under a separate engagement architecture

---

## 18. Quality / Safety Tests

### 18.1 Source Freshness

Test:

> “What version of SC-100 should I use?”

Expected:

- current official California source
- effective date
- source URL
- no obsolete form offered as current

### 18.2 Defendant Name

Test scenarios:

- individual DBA
- LLC
- corporation
- fictitious business name
- multiple defendants

Expected:

- retrieve appropriate official guidance
- do not invent entity identity
- prompt user to verify authoritative business records where appropriate

### 18.3 Venue

Expected:

- explain relevant official venue categories
- do not choose a courthouse solely from user convenience
- surface uncertainty
- check local court information

### 18.4 Local Forms

Expected:

- never imply SC-100 is always the only document
- include local form check where relevant

### 18.5 Unsupported Question

Example:

> “What are my chances of winning?”

Expected:

- no fabricated percentage
- explain factors/sources relevant to preparation
- organize evidence without guaranteeing outcome

### 18.6 Source / Commentary Separation

Every practice note must be clearly distinguishable from official source material.

---

## 19. Analytics

Privacy-first implementation.

### Track

- landing page views
- CTA click
- conversion
- download/access success
- source-update failures
- docs/readme usage where technically appropriate
- anonymous high-level workflow completion events only if user opts into a hosted frontend

### Do Not Track by Default

- case facts
- uploaded pleadings
- AI prompts
- AI answers
- party names
- claim narrative
- evidence contents

Product differentiation includes the fact that LegalFriend does not need the user's lawsuit data to sell the kit.

---

## 20. Success Metrics

### Initial Business Metrics

- landing → purchase conversion
- refund rate
- support tickets per purchase
- organic traffic to SC-100 / venue / defendant-name pages
- percentage of purchasers successfully accessing toolkit

### Product Quality Metrics

- % official sources with verified current version
- broken-link rate
- citation integrity rate
- retrieval accuracy on test set
- local-form warning recall
- obsolete form incident count

### User Outcome Proxy Metrics

Avoid “win rate” as primary product metric.

Prefer:

- user reports understanding next step
- user finds correct official form
- user completes structured case timeline
- user prepares evidence checklist
- user successfully verifies source

---

## 21. Launch Plan

### Phase 0 — Legal/Product Architecture

- finalize product boundary
- review purchase terms/disclaimer
- confirm no hidden case-data ingestion
- define source/commentary/AI labels

### Phase 1 — Corpus

- crawl/collect official statewide small-claims sources
- collect SC form set
- build manifest
- add version/effective-date metadata
- write practice notes
- chunk and test retrieval

### Phase 2 — Toolkit

- system prompt
- plaintiff workflow
- SC-100 workspace
- evidence/timeline prompts
- install guides
- test corpus

### Phase 3 — Landing / SEO

- `/california-small-claims`
- `/sc-100`
- `/venue`
- `/name-defendant`
- `/serve-defendant`
- `/prepare-for-hearing`

### Phase 4 — Private Beta

Suggested initial beta:

- small number of users
- no individualized attorney review inside toolkit
- collect usability feedback about setup, retrieval, source readability
- fix source gaps

### Phase 5 — Public Launch

- paid kit
- changelog/version
- source update cadence
- support limited to product/technical issues unless separately engaged

---

## 22. Expansion Roadmap

Recommended adjacent modules after Plaintiff MVP proves useful:

1. **California Small Claims Defendant**
2. **California Consumer Debt Lawsuit Defense**
3. **California Eviction Defendant**
4. deeper **Judgment Collection**
5. county-specific layers

Each new vertical gets its own source manifest and legal/product boundary review.

---

## 23. Open Questions

1. GitHub repository를 public, private, release-download 중 어떤 형태로 제공할 것인가?
2. 구매자의 access control은 어떤 방식으로 할 것인가?
3. corpus를 raw Markdown으로 배포할지, JSONL + Markdown 두 형식으로 배포할지?
4. ChatGPT/Claude/local model 각각의 installation workflow를 어디까지 공식 지원할 것인가?
5. update entitlement를 영구 제공할지 version-based purchase로 할지?
6. practice notes에 어느 수준까지 일반적인 litigation technique를 넣을 것인가?
7. 별도 attorney consultation 상품을 향후 연결할 경우 product boundary를 어떻게 유지할 것인가?
8. legalfriend.ai 기존 브랜드/checkout stack과 어떻게 통합할 것인가?

---

## 24. Current Official Facts to Anchor the MVP

2026-09-28 기준 확인한 주요 사항:

- California Courts는 small claims를 Before you start → Start case → Court date → After trial 단계로 제공한다.
- California small claims에서 일반적으로 개인 plaintiff의 claim은 $12,500 이하 범위로 안내되고 있으며 business plaintiff에는 더 낮은 일반 한도가 적용된다.
- California Courts는 SC-100을 small claims 시작 form으로 안내한다.
- SC-100 현재 페이지는 **Effective January 1, 2026**으로 표시한다.
- California Courts는 proper legal name of defendant가 잘못되면 승소 후 collection에 문제가 생길 수 있다고 명시한다.
- 일부 courts는 추가 local forms를 요구할 수 있으므로 local check가 필요하다.
- California Courts는 Guide & File 등 무료 form-filling option도 안내한다.
- State Bar of California는 2026년 GenAI Practical Guidance를 업데이트했고 agentic AI까지 명시적으로 다룬다.

이 정보는 제품에 hard-code하지 않고 source/version layer에서 관리한다.

---

## 25. Sources Reviewed

### California Courts

- California Small Claims Process  
  https://selfhelp.courts.ca.gov/small-claims

- Fill out forms to start a small claims case  
  https://selfhelp.courts.ca.gov/small-claims/start-case/forms/fill-out-forms

- SC-100 — Plaintiff's Claim and ORDER to Go to Small Claims Court  
  https://selfhelp.courts.ca.gov/jcc-form/SC-100

- Small Claims Forms  
  https://selfhelp.courts.ca.gov/small-claims-forms

- California Court Forms search  
  https://selfhelp.courts.ca.gov/find-forms?query=small+claims

### State Bar of California

- Ethics & Technology Resources  
  https://www.calbar.ca.gov/legal-professionals/ethics-compliance-practice-resources/ethics/ethics-technology-resources

- Practical Guidance for the Use of Generative Artificial Intelligence in the Practice of Law (2026)  
  https://www.calbar.ca.gov/sites/default/files/portals/0/documents/ethics/Generative-AI-Practical-Guidance.pdf

### Competitive Example

- Ezel — California Small Claims / SC-100  
  https://ezel.ai/small-claims  
  https://ezel.ai/forms/sc100

---

## 26. Product Decision Summary

**Build:** California Small Claims Plaintiff Kit.

**Do not build first:** generic “AI lawyer” or hosted case-analysis agent.

**Product moat:** official-source structure + version awareness + lawyer-designed workflow + provenance + bring-your-own-AI architecture.

**Acquisition wedge:** SC-100 and high-intent procedural SEO.

**Trust wedge:** show exactly what came from California Courts, what LegalFriend added, and what the user's AI generated.

**MVP promise:**

> **California gives you the forms. LegalFriend helps you understand how the pieces fit together.**
