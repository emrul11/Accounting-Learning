# Teaching Upgrade Implementation Plan

Execution companion: [Luna implementation batches](luna-teaching-implementation-plan.md). For GPT-5.6 Luna sessions, use that companion's batch order and handoff prompts; this document remains the teaching-quality specification.

Updated: 2026-09-14
Status: READY TO IMPLEMENT. Writing this plan does not complete its phases.
Target: a 9.5/10 teaching resource for Masco’s MIS team.

## 1. Owner’s objective

This internal course teaches accounting beginners before they help specify, build, test, or support accounting software. The owner prioritizes explanation depth, ease of following, and sufficient learning material. Security, scores, certificates, saved submissions, and approval workflows are not priorities for this upgrade.

Increase the material where reasoning is missing. Do not impose a word-count quota or pad lessons with repeated slogans. A lesson is sufficiently detailed when a beginner can explain the decisions and solve a similar situation independently.

Priorities:
1. Correct and consistent accounting.
2. Plain-language explanations without reasoning gaps.
3. Worked examples, guided practice, independent practice, and useful feedback.
4. Connections between lessons and between accounting and software behavior.
5. Readable visuals, navigation, and manageable learning steps.

Preserve useful stories, personas, existing functionality, and the simple HTML/CSS/JS architecture. Change numbers, questions, sequencing, and wording where needed. Do not replace the framework or add backend tracking features to accomplish teaching improvements.

## 2. Start here in a new session

Repository: `D:\emrul\Accounting-Learning`.

1. Read this plan fully and any applicable `AGENTS.md`. Inspect current git status; preserve unrelated changes.
2. Read actual current lessons before editing. Historical review notes identify leads, not verified current defects.
3. Read `README.md`, relevant `BUILD_PLAN.md` sections, and the components below. If hosting metadata exists, follow the applicable site instructions.
4. Execute Phase 0, then rewrite Module 1 as the reference lesson. Do not spend the first session producing another proposal.
5. Maintain the progress table at the end and create `.kimchi/docs/teaching-upgrade-progress.md` for detailed findings, files changed, checks, and next steps.

Primary files:
- `src/MascoLearning.Api/wwwroot/modules/module-00.html` through `module-15.html`
- Corresponding `modules/data/module-XX.json` quiz banks
- `modules/_template.html`
- `js/exercises.js`, `js/quiz.js`, `js/specsheet.js`
- `styles/style.css`
- `appendices/appendix-a.html` (existing glossary), other appendices, and `index.html`

Historical context: `.kimchi/docs/review-teaching-upgrades.md`, `verification.md`, and `finance-review-checklist.md`. Do not inherit their PASS claims without verification.

## 3. What 9.5/10 means

This is a quality target, not a guaranteed result from adding components.

| Dimension | Weight | Evidence |
|---|---:|---|
| Accounting correctness and consistency | 25% | Assumptions, entries, balances, explanations, and answers agree |
| Explanation clarity and depth | 25% | Learners can explain account choices and movements without filling in omitted reasoning |
| Sequence and manageable steps | 15% | Prerequisites come first; lessons have clear focus and stopping points |
| Examples, practice, feedback | 20% | Support reduces gradually; new situations test understanding; errors receive explanations |
| Connected understanding and MIS relevance | 10% | Learners trace events through books and explain software consequences |
| Readability and accessibility | 5% | Readable visuals/tables, clear navigation, keyboard-operable controls |

Rate each dimension out of 10 for editorial guidance. Material accounting errors or incorrect model answers block readiness regardless of the average. Distinguish editorial review, finance review, and learner-pilot evidence. Without a pilot, say “prepared for pilot,” not “proven 9.5/10.”

## 4. Teaching standards

### 4.1 Explain how to find the answer

For the FIRST example of a new posting pattern, explain:
1. Business event: what happened in ordinary language?
2. Assumptions: ownership/control, timing, payment terms, tax/currency simplifications.
3. Before and after: what changed in what we own, owe, earn, or consume?
4. Account selection: which accounts represent those changes, and why?
5. Classification: asset, liability, equity, income, or expense.
6. Direction: what increases or decreases?
7. Debit/credit reasoning: apply the rule; debit is a recording side, not cash received.
8. Entry: accounts, amounts, date, and a short explained narration.
9. Consequences: updated balances, profit and cash effects, and relevant unchanged measures.
10. Follow-up: payment, collection, return, correction, or another related event.

These are reasoning requirements, not ten mandatory headings. Combine them into readable paragraphs or a table:
`Account | Why this account? | Type | Increase/decrease | Debit/credit | Amount`.

Use full support for new patterns, then reduce supplied steps. Do not repeat a long ladder for every familiar entry. Module 0 stops at event, evidence, and before/after; full debit/credit instruction begins in Module 1.

### 4.2 Model explanation depth

> The factory receives ৳50,000 of yarn and will pay next month. Assume we now own it, the invoice matches the delivery, and tax and foreign currency are excluded here.
>
> Two things changed: we have more yarn and owe the supplier more money. No cash moved.
>
> Yarn goes into Inventory, an asset account, because it will help produce goods for sale. The debt goes into Accounts Payable, a liability account. “Payable” means an amount we must pay someone.
>
> Inventory increased. Increases in assets are debits. Accounts Payable increased. Increases in liabilities are credits. Therefore, debit Inventory ৳50,000 and credit Accounts Payable ৳50,000.
>
> Receipt alone does not create an expense. The cost remains in inventory as it moves through production; a later lesson traces when it becomes cost of goods sold. Issuing yarn to production is not the same as immediately expensing it.
>
> When we pay next month, the yarn does not change. Debt and bank balance decrease: debit Accounts Payable and credit Bank. Recording inventory again would count the purchase twice.

This is a tone/depth example, not a requirement to replace existing amounts. Explain every chosen amount and avoid mixing separate examples.

### 4.3 Three levels of practice

For each major learning outcome:
- Fully worked example: all reasoning supplied.
- Guided example: supply some information; learner completes missing reasoning.
- Independent example: a different situation with no account/side hints, followed by a reasoned solution.

Add at least one useful variation per major pattern, such as immediate versus later payment, partial payment, return, or correction. Do not force every variation into every lesson.

Feedback must explain why, not only show the correct entry. Explain what a common wrong entry would falsely claim: debiting Bank on payment claims cash increased.

Paper exercises and reveal boxes are sufficient. No submission backend is needed. Keep independent answers after the task and offer optional hints before the solution.

### 4.4 Adapt the reasoning to the topic

- Chart of accounts: information needed → category → account/dimension choice → reporting consequence.
- Reconciliation: compare → identify difference → trace evidence → determine cause → correct the appropriate record → reconcile again. Neither GL nor subledger is automatically right.
- Costing: physical quantities → cost inputs → allocation assumptions → WIP/finished goods → expense recognition.
- Statements: ledger balances → classification → statement lines → interpretation and cash connection.
- Controls: risk → possible failure → control → evidence → exception handling.
- Tax/FX: explicit scenario assumptions → calculation → entry → settlement/reconciliation.

### 4.5 Visuals, language, and pacing

Define terms before use: account, balance, equity, revenue, expense, period, accrual, narration, and control account. Extend Appendix A rather than create another glossary.

Show T-accounts with Dr on the left and Cr on the right, account type, event labels, and ending debit/credit balances. Do not imply debits increase every account or each account must balance to zero.

Use before/after tables and production-flow diagrams. Place simple source documents beside their accounting consequence where useful. Prefer existing HTML/CSS or accessible SVG for small diagrams. Do not rely on color alone.

Essential explanation and assumptions stay visible. Optional “Explain it another way” blocks provide alternate examples; advanced details can go into “Go deeper” sections.

Use small lessons with anchor navigation and stopping points. HTML line count is not a measure of learning time. Label time estimates provisional until a pilot supports them.

## 5. Accuracy baseline: check before expanding

Verify these leads against current source and fix confirmed problems (verified 2026-09-14 — outcomes in the third column; details in `.kimchi/docs/teaching-upgrade-progress.md`):

| Review lead | Required action | Verification outcome (2026-09-14) |
|---|---|---|
| Module 15 Q9 wrong explanation uses ৳24,15,500 | Recalculate; the previous correct expense total was ৳25,15,500 | Confirmed and fixed — wrongExplanation now says ৳25,15,500 |
| Module 15 Q10 uses “৳18,60,000-ish” for yarn payment | Trace actual payment and inventory; remove unsupported approximate figures | Confirmed and fixed — explanation rewritten with traced figures (৳31,00,000 yarn paid; ৳6,20,000 yarn + ৳1,70,000 trims closing inventory; ৳3,10,000 LC margin; ৳2,50,000 non-cash depreciation; ৳90,000 TDS withheld) |
| Module 15 describes supplier receivable as a credit balance in Masco’s AP account | Distinguish supplier credit in our favor from the debit balance in our ledger | Confirmed and fixed — quiz scenario and HTML now say debit balance in AP—ABC Yarn (a receivable); the balance-sheet note was already correct |
| Module 2 expense codes 5000–5999 include examples 6210/7310 | Align the stated coding scheme and examples; codes are company choices | Confirmed and fixed — band widened to 5000–9999; solution text aligned |
| Previous suggestions refer VAT to Module 13 | FX/LC is Module 7; VAT/tax is Module 14; exceptions are Module 13 | Not found — no such reference exists in `.kimchi/docs` or the modules; lead dropped |
| Email/quotation described as “not a document” | Ask whether the document establishes an event requiring an accounting entry | Not found in current modules or docs; lead dropped |
| Capstone manufacturing cost includes materials while factory costs are directly expensed | Review cost treatment and explicit simplifications with finance; do not imply material-only cost is universally full production cost | Confirmed and fixed with an explicit materials-only simplification note at Event G-pre (pointing back to Module 5 absorption); full redesign remains a finance-policy question |
| Receipt/B/L date treated as a universal recognition rule | State scenario assumptions and distinguish document date from recognition requirements | Confirmed and fixed — B/L recognition now framed as a scenario assumption (control passing on shipment) in the event table, Event G solution, and Module 2 gloss |
| Missing GRN automatically means no liability; “back-date GRN” wording | Distinguish evidence, actual event date, creation timestamp, posting date, and period controls; do not teach fabricated history | Partly confirmed — “back-dated GRN” wording fixed (delivery date vs creation timestamp); the no-entry-then-investigate teaching itself was already sound |

Earlier capstone repairs added opening/adjusted trial balances, production completion, an exchange rate, and supplier receivable. Trace them rather than undo them or assume they are sufficient.

For standards, recognition, tax, and policy questions consult appropriate primary sources. Record assumptions and sources. Never invent current rates or claim finance sign-off occurred. Maintain unresolved finance questions while continuing independent teaching work.

Quizzes are teaching material: change scenarios, answers, and explanations when required. Preserve alignment of any existing translated fields; record translation review needs and do not enable unfinished translations.

## 6. One connected story with reproducible numbers

Use a small continuing Masco story. Label unrelated exercises as separate cases. A capstone can be a later month with its own opening balances; do not force every exercise into one ledger.

Create before propagating running balances:
- `.kimchi/docs/teaching-story-ledger.md`: assumptions, opening trial balance, numbered events, documents, expected entries, checkpoints, and statement mappings.
- `src/MascoLearning.Api/wwwroot/modules/data/teaching-story.json`: canonical machine-readable teaching data for calculations. Keep identifiers, dates, units, amounts, currencies/rates, and expected checkpoints explicit.

Progression: owner funding → purchase/receipt → payment → production → sale → collection → adjustments → statements. Add FX, tax, overhead, and exceptions only after prerequisites.

Verify:
- Opening balance + movements = closing balance for every account.
- Debits equal credits per entry and across the trial balance.
- Inventory quantities and values reconcile under stated assumptions.
- Customer/supplier detail agrees with control accounts.
- Statements derive from adjusted balances and profit flows to equity exactly once.

Do not call a mixed position/profit snapshot a trial balance. Do not count profit twice. Never use unexplained balancing plugs. A connected ledger is substantive accounting work, not a cheap copy-and-paste addition.

## 7. Lesson structure

Adapt this structure to the topic:
1. Two to four concrete learning outcomes.
2. Prerequisite reminder with links.
3. Familiar question or mystery.
4. Roadmap and stopping points.
5. Short lessons: explanation → worked example → guided → independent practice.
6. Explicit resolution of the opening question.
7. Mixed recall using earlier concepts.
8. Accounting-to-software implications/personas/specification worksheet.
9. Recap and next step.

Do not put all practice at the end. Keep accounting before schema/implementation detail. Connect each software rule to its reason: payment reduces an existing payable, therefore allocate payment to the invoice rather than create another inventory receipt.

## 8. Implementation phases

### Phase 0 — Baseline and repair

Read Modules 0–3 completely, capstone entries/statements/quiz, and related scripts. Verify Section 5 leads. Fix confirmed errors. Create the detailed progress record with outcomes, gaps, and unresolved questions. Establish canonical story assumptions/data before running-balance additions.

Exit: confirmed defects repaired or clearly recorded as unresolved policy questions; baseline documented.

### Phase 1 — Module 1 reference lesson

Rewrite accounts/types, increases/decreases, debit/credit, credit purchases, payments, and limits of balancing checks. Add complete reasoning for new patterns, T-accounts, guided practice, independent variations, useful feedback, and an accurate statement preview. Explain the mnemonic after its meaning.

Deliver: revised HTML and aligned quiz, minimal reusable styling, actual verification results, and a pilot-ready reference lesson.

Pilot this lesson EARLY when colleagues are available. If unavailable, mark pilot pending and continue provisional work; do not block all implementation or claim the pattern is learner-validated.

### Phase 2 — Foundations and template

| Module | Teaching work |
|---|---|
| 0 | Event/evidence/entry distinction, before/after, non-posting documents, basic terms; no demand to master Dr/Cr |
| 2 | Familiar entry with codes; account versus supplier/customer detail and dimensions; guided classification; coding consistency |
| 3 | One document through detail and summary; small reconciliation; guided investigation; resolve the opening mystery |

Update `_template.html` after reference verification/feedback with flexible author guidance, not a rigid repeated ladder.

### Phase 3 — Posting, costing, statements

Read each lesson fully before editing.

| Module | Teaching work |
|---|---|
| 4 | Accounting rule before software rule; triggers/dates/accounts/amounts; retry and correction |
| 5 | Units and costs, WIP, materials/labor/overhead assumptions, fully traceable small example |
| 6 | Yarn → WIP → finished goods → COGS; quantity versus value; asset versus expense timing |
| 11 | Trial balance to statement lines; profit/equity/cash with a numerical bridge |

Teach Module 5 concepts before relying on them in Module 6. Reconcile each story checkpoint.

### Phase 4 — Specialized topics

| Module | Teaching work |
|---|---|
| 7 | LC promise, margin, purchase obligation, FX, revaluation, settlement as distinct events |
| 8 | Gross/net/withholding/payable; timing; production labor versus period costs |
| 9 | Invoice/allocation/balance; partial payments, returns, supplier debit balances, aging/reconciliation |
| 10 | Asset versus expense; cost/life/residual value; depreciation and accumulated depreciation; disposal |
| 12 | Failure → why arithmetic checks miss it → control → evidence → correction |
| 13 | Normal case versus changed condition; investigation, dates, corrections |
| 14 | Who owes whom; tax versus price/expense; dated illustrative assumptions and verified references |

Use topic-specific explanations, not mechanical template expansion. Add cumulative recall. Reorder or recap prerequisites where needed.

### Phase 5 — Capstone and integration

Provide a complete document pack and opening balances before tasks. Supply optional hints linking to earlier lessons. Put the fully reasoned solution after the attempt: journals, reconciliations, adjusted trial balance, statements, and numerical profit-to-cash bridge.

Distinguish real events, duplicates, unresolved claims, and supported adjustments. A printable HTML worksheet is sufficient. Review navigation, appendices, glossary, index descriptions, and all affected quiz explanations.

### Phase 6 — Pilot and refinement

Repeat small pilots after foundations and the integrated case. Fix repeated misunderstandings and rerun affected tasks. Report editorial, finance, and learner evidence separately.

## 9. Verification requirements

For each module:
- Trace every amount, date, unit, account choice, and answer to the scenario.
- Parse touched quiz JSON; check answer indices, explanation alignment, translations touched, and displayed counts. Parsing does not prove correctness.
- Check local links, anchors, scripts, and shared-component regressions.
- Inspect rendered desktop and narrow-screen pages with available browser tools and applicable skill instructions. Check tables, visuals, reveal buttons, keyboard access, navigation, and printing if changed.
- Syntax-check changed scripts. Run relevant existing tests if application code changes. Do not broaden into unrelated infrastructure work.

Add one focused arithmetic verification script under `scripts/` using the available runtime. Calculate from canonical data: per-entry balance, account movements, inventory, statements, and checkpoints. Compare displayed HTML/quiz figures to the canonical values; a correct dataset does not verify manually copied text.

Never equate balanced totals, passing regex searches, or valid JSON with accounting correctness. Record unavailable tools and failed checks honestly; continue useful independent verification rather than invent a PASS.

## 10. Learner pilot protocol

When the owner can arrange 2–3 beginner MIS colleagues, ask them to:
1. Read a short lesson without coaching.
2. Explain each account choice.
3. Solve a new variation without model answers.
4. Explain profit and cash effects.
5. Describe one resulting software behavior.

Prepare observation tasks without contacting people; do not send invitations/messages without authorization.

Record the learner’s reasoning, unfamiliar terms, help needed, and content repair. Normal pauses or rereading are not automatically defects; prioritize repeated confusion and incorrect reasoning after reading.

Success evidence: learners explain the pattern and solve a new variation without being told accounts or sides. This small pilot guides improvement; it is not proof of universal effectiveness.

## 11. Definition of done

For each module:
- [ ] Concrete outcomes and prerequisite links.
- [ ] Terms explained before use; essential path understandable without optional detail.
- [ ] Visible assumptions and bounded simplifications.
- [ ] Complete reasoning for new patterns; support reduced later.
- [ ] Accurate topic-appropriate visuals and balances.
- [ ] Worked/guided/independent practice and useful variation.
- [ ] Feedback explains common mistakes.
- [ ] Opening question resolved.
- [ ] Recall and connections to previous/next lessons.
- [ ] MIS implications follow accounting understanding.
- [ ] Lessons, quizzes, touched translations, and references agree.
- [ ] Arithmetic and rendered checks recorded, with limitations.

Course completion also requires consistent story data, a reproducible capstone, no known material errors, updated navigation/glossary, and explicit finance/pilot status. Do not claim human review occurred unless it did.

## 12. Progress and handoff

No phase is completed merely by writing this plan. Recheck existing repairs in Phase 0.

| Phase | Status | Next action |
|---|---|---|
| 0 Baseline/repair | L00 residual repairs also complete (2026-09-14); executor is now Kimchi for all batches | L01 Module 1 reference rewrite (see luna-teaching-implementation-plan.md) |
| 1 Module 1 reference | Started — L01 core rewrite complete (2026-09-14); L02 practice/quiz alignment next | L02 guided/independent practice and `module-01.json` alignment (see luna-teaching-implementation-plan.md) |
| 2 Foundations/template | Modules 0–5 content upgrades and review-defect fixes complete (2026-09-14); browser review pending | _template.html + canonical story data (L06) before module rewrites; rendered-page check of Modules 1–5 |
| 3 Posting/cost/statements | Not started | Full reads and topic-specific upgrades |
| 4 Specialized topics | Not started | Full reads before edits |
| 5 Capstone/integration | Not started | Complete data and navigation reconciliation |
| 6 Pilot/refinement | Pending colleagues | Start early pilot after Phase 1 when available |

At each session end update this table and `.kimchi/docs/teaching-upgrade-progress.md` with files changed, checks actually run, outstanding accounting questions, learner feedback needed, and the next concrete edit.

### Copy into tomorrow’s session

> Read `.kimchi/docs/teaching-upgrade-suggestions.md` fully and implement it. Our priority is exceptionally clear, thorough beginner accounting instruction for the MIS team, not security or score tracking. Inspect repository instructions and current changes, preserve unrelated work, verify Phase 0 defects, then rewrite Module 1 as the reference lesson with complete reasoning, T-accounts, guided and independent practice, and useful feedback. Continue phased work as time permits; do not stop at another proposal. Keep assumptions and all lesson/quiz figures consistent, verify rendered material and arithmetic, and update progress/handoff records. Do not claim 9.5/10 or finance/pilot approval without evidence.

