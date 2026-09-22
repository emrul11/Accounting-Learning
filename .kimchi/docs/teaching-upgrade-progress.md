# Teaching Upgrade — Progress Record

Created: 2026-09-14
Companion to: `teaching-upgrade-suggestions.md` (its Section 5 table and end-of-plan progress table point here)

Executor note (2026-09-14): the owner directed this workspace's agent (Kimchi) to execute ALL batches itself. Luna and Astra are not used. The batch structure, content contract, and verification standards of `luna-teaching-implementation-plan.md` are still followed; only the executor changed.

## 2026-09-14 — Batch L00: residual accuracy repairs

Batch: L00 — Finish narrow accuracy repairs
Status: verified-editorially
Files changed:
- `src/MascoLearning.Api/wwwroot/modules/module-01.html`
- `src/MascoLearning.Api/wwwroot/modules/module-15.html`
Teaching outcomes added: Module 1's Pacioli Q&A now distinguishes arithmetic balance from correctness (single-sided entries are caught; omitted, duplicated, or wrong-account entries can still balance — controls come later). Module 15's reconciliation prompt now says debit balance in the Accounts Payable—ABC Yarn account (a receivable), consistent with the corrected solution and quiz.
Examples and case IDs: unchanged — no amounts, dates, or accounts altered.
Checks actually run and results:
- Grep sweep across `modules/`: no remaining universal tampering claim; no remaining "credit balance in ABC Yarn's account" phrasing.
- Reviewed the remaining qualified variant (`module-01.json` Pacioli option: "unbalanced tampering becomes instantly visible") — its explanation already teaches that deliberately balanced fraud slips past the checksum; left unchanged as consistent with the corrected HTML.
- No JSON modified in this batch; diff limited to the two HTML prose fixes.
- Noted for L01/L02: `module-01.json` contains Bengali translation fields (`scenarioBn`, `optionsBn`, `explanationBn`, `wrongExplanationsBn`) that must stay aligned when that bank is edited.
Unverified or finance/pilot questions: rendered-page inspection not performed (prose-only changes inside existing elements, no layout change); finance review of capstone cost treatment still outstanding (standing, non-blocking).
Next batch and exact starting section: L01 — Module 1 core understanding. Begin at the Lesson section (`id="lesson"`) for terms-before-rules and left/right → rules → DEA-LER ordering, then the worked example (`id="worked-example"`) for the full reasoning ladder and T-accounts with labeled opening balances.

## 2026-09-14 — Batch L01: Module 1 core understanding (reference lesson)

Batch: L01 — Module 1 core understanding
Status: verified-editorially
Files changed:
- `src/MascoLearning.Api/wwwroot/modules/module-01.html`
- `src/MascoLearning.Api/wwwroot/styles/style.css` (new reusable `.t-account-*` styles)
Teaching outcomes added:
- Added `id="outcomes"` section with prerequisites (link to Module 0), four learning outcomes, and an anchored roadmap with four stopping points.
- Added "The words you need first" definitions block: account, balance, asset, liability, equity, revenue, expense — in plain language with Masco examples, before the debit/credit rules table.
- Resolved the opening Rafiq mystery in the lesson body (not just the exercise answer) with the distinction between a single-sided entry and the complete two-sided story.
- Rewrote the worked example (`id="worked-example"`) to carry the full reasoning ladder for Event 1 (event → assumptions → before/after → account choice → type → direction → Dr/Cr → entry → consequences → follow-up), moderate reasoning for Event 2, and an asset-vs-expense distinction for Event 3.
- Added T-accounts for Inventory—Yarn, Accounts Payable—ABC Yarn, and Cash at Bank—City Bank, each with labeled opening balances, movements, and closing balances, plus a final assets = liabilities + equity check.
- Added a continuation sentence in the Destination section so learners see it extends the same March example.
Examples and case IDs: preserved the existing ৳31,00,000 yarn example and ৳50,00,000 opening cash; no amounts changed.
Checks actually run and results:
- Grep sweep: no remaining universal tampering claim in `module-01.html`; the qualified quiz option in `module-01.json` left unchanged (its explanation already teaches the limitation).
- HTML parse check: Python `HTMLParser` feeds cleanly on `module-01.html`.
- Section tag count balanced: 12 `<section>` open tags and 12 `</section>` close tags.
- Key arithmetic phrases verified present: opening cash 50,00,000; Event 1 Dr Inventory / Cr AP 31,00,000; T-account closings 31,00,000, 0, and 14,50,000; final balance check 45,50,000 assets = 45,50,000 equity after 4,50,000 expense.
- Manual arithmetic recheck:
  - Assets after Event 1: 50,00,000 + 31,00,000 = 81,00,000; liabilities 31,00,000; equity 50,00,000. Balanced.
  - Bank after Events 2+3: 50,00,000 − 31,00,000 − 4,50,000 = 14,50,000.
  - Final assets: 31,00,000 inventory + 14,50,000 bank = 45,50,000.
  - Final equity: 50,00,000 opening − 4,50,000 electricity = 45,50,000. Assets = liabilities + equity. Balanced.
- `module-01.json` parses with 11 questions; not modified in this batch.
- Diff inspection: only the intended prose blocks and CSS were touched; quiz script `initQuizFromJson("module-01")`, navigation, footer, and all scripts preserved.
Unverified or finance/pilot questions: rendered-page browser check not performed (HTML structure changed but no new interactive scripts); finance review of capstone cost treatment still outstanding.
Next batch and exact starting section: L02 — Module 1 practice and quiz alignment. Start at `id="exercises"` section (DEA/LER Exercise 1, Rafiq puzzle Exercise 2), then add guided/independent practice and align `module-01.json` scenarios and explanations, preserving the Bengali translation fields.

## 2026-09-14 — Modules 1–5 review-defect fixes

Batch: Correction pass over Modules 1–5 following the external review (astra) of the block implementation
Status: verified-editorially
Files changed:
- `src/MascoLearning.Api/wwwroot/modules/module-01.html`
- `src/MascoLearning.Api/wwwroot/modules/module-02.html`
- `src/MascoLearning.Api/wwwroot/modules/module-03.html`
- `src/MascoLearning.Api/wwwroot/modules/module-04.html`
- `src/MascoLearning.Api/wwwroot/modules/module-05.html`
Fixes applied (review finding → fix):
1. M3 worksheet taught subledger-as-one-side journal structure → Q2 model answer rewritten: journal lines are GL accounts (Dr Inventory / Cr AP control); the subledger row is detail written in the same transaction, not a debit/credit side.
2. M3 worksheet compared one party's total with the whole control account → Q3 model answer corrected: the sum of ALL party rows equals the control account.
3. M3 worksheet said "adjust the subledger first", contradicting the lesson's neither-layer-automatic rule → Q4 model answer rewritten evidence-first: trace documents and posting log, correct the layer that holds the error, never post free-standing balancing journals.
4. M3 reconciliation reused INV-8891 (৳12,40,000 in the worked example) for a ৳30 lakh gap → reconciliation now uses INV-8902, an H&M export invoice for ৳30,00,000; the worked example's INV-8891 (12.4L, partial payments) is untouched and consistent.
5. M5 guided exercise allocated full cost to unfinished stock without a completion assumption → Exercise 3 prompt now states the simplification explicitly (cost follows physical kg evenly) and points to Exercise 4 for the proper equivalent-unit treatment.
6. M5 independent exercise conflated physical and equivalent units and its solution reversed the allocation effect → Exercise 4 rewritten: 800 kg physically completed + 100 kg at 40% = 840 equivalent units; rate ৳59.52/EU; physical allocation (৳55.56/kg) UNDERSTATES finished output (44,444 vs 47,619) and OVERSTATES WIP (5,556 vs 2,381) — direction corrected.
7. M5 cost schedule lost 20,000 m of dyed fabric → "Every taka accounted for" box added after Bucket C: 20,000 m × ৳60 = ৳12,00,000 in Inventory—Fabric; Bucket B's ৳60,00,000 fully reconciled (48,00,000 transferred + 12,00,000 on shelf).
8. M1 guided example was factory electricity (overhead ambiguity, conflicts with M5) → replaced with a true office-service expense (৳30,000 head-office internet/phone, same-day payment), which is unambiguously a period expense.
9. M1 guided receipt was missing (guided exercise was a payment) → new Exercise 3 "Guided receipt": dyes ৳9,00,000 from Colorchem on 30-day credit, types supplied, learner chooses direction/sides, with why-not-Bank and why-not-Expense feedback.
10. M1 worked example Event 3 factory electricity now carries an explicit simplification note pointing to Module 5's overhead absorption; office services noted as always period expenses.
11. M2 "dimension" used without definition → defined at point of use in Exercise 3's guided answer (reporting tag that slices one account's balance without new GL accounts).
12. M2 VAT Input exercise lacked assumptions → prompt now states: registered suppliers' VAT invoices show recoverable input tax separately; rates and law deferred to Module 14.
13. M4 guided exercise claimed scenario data was supplied but supplied none → Exercise 3 now has a complete scenario: GRN #GR-2026-0462, 2,000 kg dye from Colorchem at ৳450/kg (৳9,00,000), PO-3312, accounts 1213/2110, available sequence checks; solution walks that data.
14. M1 exercise numbering renumbered for the new sequence (Ex3 guided receipt, Ex4 guided office expense, Ex5 independent diesel, Ex6 variations); cross-reference in variations updated.
Checks actually run and results:
- All five module HTML files parse cleanly with Python HTMLParser; section and div open/close counts balanced for every file.
- Grep sweep: no remaining "subledger as one side", "Adjust the subledger first", "800 equivalent kg", old guided-electricity wording, or stale exercise cross-references.
- INV split verified: INV-8902 (3 refs, ৳30,00,000 reconciliation) vs INV-8891 (8 refs, ৳12,40,000 worked example) — no amount collision remains.
- M5 arithmetic recheck: 50,000 ÷ 840 = 59.52; finished 800 × 59.52 ≈ 47,619; WIP ≈ 2,381; physical spread 55.56/kg → 44,444 / 5,556. Effect direction now stated correctly.
- All five quiz banks parse; every question has a valid correct index and one wrongExplanation per option (11 + 10 + 10 + 10 + 10 = 51 questions). No JSON was modified in this pass.
Unverified or finance/pilot questions: rendered-page browser check still not performed (no layout-changing edits beyond one new tip box in M5 and restructured exercise blocks in M1 — desktop/narrow-screen review recommended); finance review of cost treatment (M1 note, M5, capstone) still outstanding.
Next batch and exact starting section: Module 6+ per luna-teaching-implementation-plan.md batch order (L06 canonical story data is still the gate before L07–L17 module rewrites); alternatively a pilot of Module 1 can begin now.

## 2026-09-14 — Module 6 review + leftover-contradiction fixes

Batch: Module 6 review against the content contract, verification of an external fix attempt, and completion of its leftovers
Status: verified-editorially
Files changed:
- `src/MascoLearning.Api/wwwroot/modules/module-06.html` (this session)
- (Prior session, verified not authored here: module-03.html INV-8901 rename, module-06 PO-2292 rename, module-06.json Q3 correction)
Review findings and outcomes:
1. Module 6 structure and internal arithmetic verified OK (outcomes, assumptions box, guided/independent practice, all figures recompute).
2. External fix attempt verified: INV-8891→INV-8901 rename in Module 3 complete (zero collisions remain; Modules 4/6/7/9/11 consistently keep INV-8891 = $90,000); PO-2291→PO-2292 rename in Module 6 complete; quiz Q3 March/April direction corrected.
3. Three leftovers found in the external fix and repaired in this session:
   - Mystery paragraph: April said a healthy "loss" — now "profit" (March artificial loss / April artificial profit).
   - NQ question text: still asked why March looked "profitable" — now asks why March looked so "loss-making", matching its corrected answer.
   - Mizan persona: "Eid-month 'losses' because idle wages sat IN inventory" — rewritten: March's "losses" came from expensing production wages immediately; the Eid month then looked too good for the opposite reason.
Checks actually run and results:
- module-06.html parses cleanly (HTMLParser); sections 11/11 balanced.
- Direction consistency asserted across mystery, NQ pair, Mizan persona, and quiz Q3: March = artificial loss, April = artificial profit.
- module-06.json and module-03.json parse; 10 questions each; valid correct indices and matching feedback counts.
- Zero PO-2291 references in Module 6 files; zero INV-8891 references in Module 3 files.
Unverified or finance/pilot questions: rendered-page browser check pending; Module 9's aging example shows "INV-8891 balance ৳10L" against the ৳1.1Cr invoice — plausible if mostly collected but unstated; check when Module 9 is reviewed.
Next batch and exact starting section: Module 7 review (FX/LC), starting with the INV-8891 $90,000 worked example and its three exchange rates.

---

## 2026-09-14 — Section 5 accuracy leads verified; confirmed defects fixed

Scope: verification of every Section 5 review lead against current source, plus repair of all
confirmed defects. This is partial Phase 0 work — the full reads of Modules 0–3 and the
canonical story data are still outstanding.

### Verification outcomes

| Lead | Outcome |
|---|---|
| M15 Q9 ৳24,15,500 figure | Confirmed defect — fixed |
| M15 Q10 "৳18,60,000-ish" | Confirmed defect — fixed |
| M15 supplier receivable "credit balance" phrasing | Confirmed defect — fixed (the closing balance-sheet note was already correct) |
| M2 expense band 5000–5999 with examples 6210/7310 | Confirmed defect — fixed |
| VAT referred to Module 13 (previous suggestions) | Not found in `.kimchi/docs` or modules — dropped |
| Email/quotation "not a document" | Not found in modules or docs — dropped |
| Capstone materials-only production cost | Confirmed — explicit simplification note added; deeper redesign deferred to finance |
| B/L date as universal recognition rule | Confirmed — scenario-assumption wording added |
| "Back-dated GRN" wording | Confirmed — reworded |

### Files changed

- `src/MascoLearning.Api/wwwroot/modules/data/module-15.json`
  - Q9 wrongExplanation: ৳24,15,500 → ৳25,15,500 (matches the explanation's own arithmetic).
  - Q10 explanation: "৳18,60,000-ish for yarn" replaced with traced figures — ৳31,00,000 paid to
    ABC Yarn (BPV-0351), closing inventory ৳6,20,000 yarn + ৳1,70,000 trims, ৳3,10,000 LC margin
    deposit, ৳2,50,000 non-cash depreciation, salaries ৳18,00,000 expensed vs ৳17,10,000 cash
    (৳90,000 TDS withheld). All figures traced to the module's own balance-sheet notes.
  - ABC reconciliation question: scenario and explanation now describe a **debit** balance in the
    AP—ABC Yarn account (a receivable), not a "credit balance in ABC Yarn's account".
- `src/MascoLearning.Api/wwwroot/modules/module-15.html`
  - Event table: PROD-COMP row points to the new simplification note; B/L row states the
    recognition assumption; ABC statement note now says debit balance/receivable.
  - Event G-pre: new "Simplification used in this capstone" paragraph — production cost is
    materials-only, Module 5's full absorption costing would add labor and overhead, and the
    capstone's salaries/electricity/depreciation are period expenses by scenario choice.
  - Event G: B/L date framed as the scenario's evidence of control passing on shipment, with an
    explicit warning not to read it as a universal rule.
  - ABC reconciliation: "credit in Masco's favour" replaced with the ledger-side description
    (debit balance in AP = receivable).
  - Event K: "Jamal creates the back-dated GRN" replaced with the delivery-date vs
    creation-timestamp distinction (evidence arriving late, not fabricated history).
- `src/MascoLearning.Api/wwwroot/modules/module-02.html`
  - COA expense band 5000–5999 → 5000–9999 (the examples 6210/7310 and the "starts with 5–9"
    solution logic now agree with the table).
  - Exercise 1 solution: "starts with 5–9 range" → "starts with 5–9 (the 5000–9999 expense block)".
  - Account-table gloss for 4100: "B/L-date revenue recognition (Module 7 context)" → "Revenue
    recognized on export shipment, evidenced by the B/L (Module 7)".
- `.kimchi/docs/teaching-upgrade-suggestions.md` — Section 5 table now carries a verification
  outcome column; Phase 0 progress row updated; date bumped.

### Checks actually run

- `python3` JSON parse of `module-15.json` (11 questions) and `module-02.json` (10 questions);
  every question has a valid `correct` index and one `wrongExplanations` entry per option.
- Arithmetic recheck: operating expenses 18,00,000 + 2,50,000 + 15,500 + 4,50,000 = 25,15,500;
  net profit 63,75,000 − 38,00,000 − 25,15,500 = 59,500. Q9's explanation, corrected
  wrongExplanation, and option list agree.
- Stale-string sweep across `modules/`: no remaining `24,15,500`, numeric `-ish` figures,
  `credit in Masco`, `back-dated`, or `5000–5999`. ("duplicate-ish accounts" in module-02.html
  is intentional prose and was kept.)
- Neither edited JSON contains translation fields, so no translation alignment was affected.

### Not verified / outstanding

- Rendered-page inspection (browser) of the three changed HTML files — recommended before
  considering this published.
- Rest of Phase 0: complete reads of Modules 0–3 and the capstone; canonical story data
  (`.kimchi/docs/teaching-story-ledger.md` + `teaching-story.json`) before any running-balance
  additions.
- Finance review of the capstone cost treatment (materials-only vs absorption) — the
  simplification is now explicit and labeled, but the underlying policy question stands.

## 2026-09-14 — L01 Module 1 core lesson implemented (editorial review pending)

Status: implemented-unverified.

The current working tree contains the Module 1 core teaching expansion: outcomes and prerequisites, a roadmap, plain-language definitions, the left/right and account-type explanation before DEA-LER, an expanded yarn/payment walkthrough, a destination preview, and T-account material. The balance-versus-correctness explanation is also corrected. These changes were already present in the working tree and were inspected during this session; no duplicate rewrite was applied.

Checks performed this session: targeted source inspection confirmed the new sections and corrected wording; the residual Module 15 supplier wording is now consistently a debit balance/receivable; all 16 quiz banks remain structurally present from the prior recorded check. Rendered browser inspection, keyboard interaction, and complete arithmetic review of the new Module 1 material remain outstanding.

Next batch: L02 — add and verify Module 1 guided practice, independent practice, variations, misconception feedback, and quiz alignment. Do not mark Module 1 editorially ready until L02 and its checks are complete.

## 2026-09-14 — L02 Module 1 practice ladder implemented

Status: implemented-unverified.

Added to `module-01.html`: a guided electricity exercise with account types supplied; an independent diesel purchase with assumptions; immediate-payment and partial-return variations; explanations of why Bank, Payable, Expense, and deletion are wrong in the relevant cases; and a balanced-but-misclassified entry example. Support now reduces from recognition to guided reasoning to independent application.

Checks performed: targeted source inspection confirmed the new exercises appear before the worked example and preserve existing scripts/IDs; amounts recalculate (৳80,000 diesel, ৳4,50,000 electricity, ৳15,50,000 half-yarn return); existing `module-01.json` remains unchanged and its previously recorded structure is valid. Rendered desktop/narrow-screen inspection and keyboard interaction remain outstanding, so this batch is not yet editorially verified.

Next batch: L03 — revise Module 0’s event/document/entry orientation, preserving the existing bridge and keeping debit/credit preview language clearly labeled as preview material.

## 2026-09-14 — L03 Module 0 orientation implemented

Status: implemented-unverified.

Added to `module-00.html`: beginner outcomes and roadmap, an explicit assumptions box before the worked preview, a guided document-versus-event classification exercise, and an independent missing-evidence exercise. The guided answer distinguishes a quotation as a document that does not prove a completed transaction, while the independent answer connects missing evidence to the ERP document trail.

Checks performed: targeted source inspection confirmed the new sections occur before the worked example and preserve existing module scripts and navigation. No quiz JSON or shared JavaScript was changed. Rendered browser, narrow-screen, keyboard, and complete content arithmetic checks remain outstanding.

Next batch: L04 — connect Module 2’s chart of accounts to a familiar Module 1 journal entry, explain codes versus detail, and add guided/independent account classification.

## 2026-09-14 — L04 Module 2 chart-of-accounts teaching implemented

Status: implemented-unverified.

Added to `module-02.html`: a direct rendering of the Module 1 yarn entry using COA codes 1211 and 2110; a plain-language explanation of GL account identity versus supplier/customer subledger detail; a guided diesel classification exercise with reporting decisions and alternatives; and an independent VAT Input account-design exercise. The exact code is explained as a company design choice rather than a universal accounting rule.

Checks performed: Module 2 quiz JSON parsed successfully with 10 valid questions and aligned wrong explanations; targeted inspection confirmed the new bridge and practice sections preserve existing scripts, IDs, and navigation. Rendered browser, narrow-screen, keyboard, and full content-policy checks remain outstanding.

Next batch: L05 — improve Module 3 reconciliation by tracing a source document through subledger and GL, resolving its mystery in the lesson body, and adding guided investigation practice.

## 2026-09-14 — L05 Module 3 reconciliation teaching implemented

Status: implemented-unverified.

Updated `module-03.html`: replaced the unsafe “subledger is usually right” rule with an evidence-based correction rule; added a worked ৳30 lakh reconciliation that traces an invoice, posting log, controlled correction, and final equality; added guided payment-application and independent duplicate-invoice exercises with document references and no-balancing-journal reasoning. Cleaned the duplicated mystery sentence.

Updated `module-03.json`: changed the quiz item to ask for the evidence-based correction rule and explain why the detailed subledger is only a starting trail, not automatic proof.

Checks performed: module-03 quiz JSON parsed successfully. Rendered browser, narrow-screen, keyboard, and full content-policy checks remain outstanding.

Next batch: L06 — extend the next foundational module with the same definition → walkthrough → guided practice → independent practice pattern.

## 2026-09-14 — First learning block Modules 1–5 extended

Modules 1–3 already contain their L01/L02, L04, and L05 lesson additions. Added remaining foundational practice to `module-04.html` (posting-rule assumptions, guided validation trace, independent idempotent retry) and `module-05.html` (costing assumptions, guided WIP flow, independent equivalent-unit allocation). These additions keep accounting reasoning before software mechanics and show why plausible shortcuts are wrong.

Checks performed: targeted source inspection and JSON parsing for the touched quiz bank. Final browser, responsive, keyboard, and complete arithmetic review for Modules 1–5 remain outstanding before marking the block editorially verified.

## 2026-09-14 — Module 6 inventory and COGS teaching implemented

Added outcomes and explicit export-policy assumptions to `module-06.html`, plus guided partial-shipment and independent pre-shipment write-down exercises. The solutions show quantity/value flow and explain why damage is a loss rather than COGS. Existing quiz bank remains aligned and structurally valid (10 questions).

Checks performed: module-06 quiz JSON parses with aligned answer indexes and feedback arrays. Browser, responsive, keyboard, and full arithmetic review remain outstanding.

## 2026-09-14 — Module 6 continuity defects corrected

Corrected the March/April mystery and quiz explanation so expensing production early produces an artificial March loss and April profit. Renamed Module 3's invoice to INV-8901 to avoid the FX example's INV-8891 collision, and renamed Module 6's worked order to PO-2292 while retaining INV-8891 for the FX thread. Module 6 quiz JSON still parses with aligned feedback.

## 2026-09-14 — Module 7 FX and LC teaching implemented

Added outcomes, explicit rate/policy assumptions, a guided payable calculation, and an independent month-end revaluation exercise to `module-07.html`. The examples distinguish booking, settlement, and closing rates and show the BDT journal for a payable FX loss. Existing Module 7 quiz JSON remains structurally aligned.

## 2026-09-14 — Module 8 payroll and labor-cost teaching implemented

Added outcomes, payroll assumptions, a guided direct/factory/admin split, and an independent accrual/payment exercise to `module-08.html`. The solutions distinguish gross cost, TDS liability, net salary payable, and payment timing. Existing Module 8 quiz JSON remains structurally aligned.

## 2026-09-14 — Modules 9–15 teaching scaffolding extended

Added beginner outcomes, explicit assumptions, and guided/independent practice to Modules 9–14 covering AP/AR matching and cash forecasts, depreciation and disposal, statement-to-cash reasoning, controls, exceptions, and tax ownership/withholding. Added capstone outcomes to Module 15. Existing quiz banks for Modules 9–15 parse with valid answer indexes and aligned feedback.

Modules 16–17 are not present in the repository (`module-15.html` is the final module), so no implementation was possible for those numbers without new content specifications.
