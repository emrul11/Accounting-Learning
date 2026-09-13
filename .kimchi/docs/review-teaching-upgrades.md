# Review: Teaching-Competence Upgrades

**Plan:** `.kimchi/plans/review-response-teaching-upgrades.md`

**Known limitation:** .NET SDK is not available in this sandbox, so `dotnet build` and `dotnet test` could not be run. All other verification (content accuracy, plan coverage, HTML/JSON validity, link consistency) was performed.

---

## Verdict: NEEDS_FIXES

The implementation covers all five review recommendations structurally, and most new content is accurate and well-integrated. However, the Module 15 capstone contains several material accounting inconsistencies that will confuse learners and undermine the "competence" message. These must be fixed before the work can be approved.

---

## Issues

### 1. Capstone income-statement numbers do not add up

**File:** `src/MascoLearning.Api/wwwroot/modules/module-15.html`
**Lines:** ~780–800 (Task 4, Income Statement table)

The table lists:

- Sales Revenue: 63,75,000
- COGS: (38,00,000)
- Gross Profit: 25,75,000
- Salaries Expense: (18,00,000)
- Electricity Expense (3,50,000 + 50,000): (4,00,000)
- LC Commission Expense: (15,500)
- Depreciation Expense: (2,50,000)
- **Net Profit: 1,59,500**

With the stated expenses, net profit should be:
25,75,000 − 18,00,000 − 4,00,000 − 15,500 − 2,50,000 = **1,09,500**.

The stated 1,59,500 only results if Electricity Expense is 3,50,000 (ignoring the 50,000 March accrual shown in the table). Either the accrual should not be in this statement, or the net-profit line is wrong.

**Suggested fix:** Decide whether Event O (the 50,000 electricity accrual) is part of March’s P&L. If yes, change Net Profit to 1,09,500 and update the balance-sheet Retained Earnings line. If no, remove the +50,000 from the Electricity Expense line and keep Net Profit at 1,59,500. Be consistent with Task 3/Event O.

---

### 2. Capstone correction entry is not reflected in the financial statements

**File:** `src/MascoLearning.Api/wwwroot/modules/module-15.html`
**Lines:** ~700–720 (Event I correction entry); ~780–800 (Income Statement); ~810–860 (Balance Sheet)

Event I posts:

```
Dr Electricity Expense 50,000
Cr Inventory—Yarn 50,000
```

This reduces Inventory—Yarn by 50,000 and increases March Electricity Expense by 50,000. Neither effect appears in the revealed statements:

- Income Statement shows Electricity Expense as 4,00,000 (paid 3,50,000 + accrual 50,000) but does not add the correction 50,000.
- Balance Sheet shows Inventory—Yarn as 6,20,000 ("1,000 kg × ৳620"), but the ledger balance after all entries is 5,70,000.

Ledger trace for Inventory—Yarn:
+31,00,000 (Mar 10) + 15,50,000 (Mar 12) − 37,20,000 (Mar 14 issue) − 3,10,000 (Mar 22 return) − 50,000 (Mar 25 correction) = **5,70,000**.

**Suggested fix:** Either (a) treat the correction as a prior-period adjustment that hits opening Retained Earnings (not March P&L) and reduce opening RE by 50,000, keeping Inventory—Yarn at 5,70,000; or (b) include the 50,000 in March Electricity Expense (4,50,000 total), reduce Inventory—Yarn to 5,70,000, and recalculate Net Profit to 59,500 and Retained Earnings to 1,47,79,500. Whichever treatment is chosen, the journal entry, income statement, and balance sheet must agree.

---

### 3. ABC Yarn reconciliation uses inconsistent return-credit amounts and wrong arithmetic

**File:** `src/MascoLearning.Api/wwwroot/modules/module-15.html`
**Lines:** ~540–590 (Task 2, ABC Yarn reconciliation)

The document pack states that RET-0008 is a return of 500 kg at ৳620/kg = **৳3,10,000**. The reconciliation table correctly labels the return as −৳3,10,000 and computes Masco’s net payable as:

31,00,000 − 3,10,000 − 31,00,000 = **−৳3,10,000**.

But it then states ABC Yarn’s net as:

31,00,000 + 31,00,000 − 3,10,000 − 31,00,000 = **+৳29,76,000**.

That arithmetic equals **27,90,000**, not 29,76,000. The 29,76,000 figure can only be obtained by using **৳1,24,000** as the return credit, which is never defined anywhere in the capstone and contradicts the documented 3,10,000 return.

The explanation then mixes the two amounts: "Removing the duplicate brings them to ৳29,76,000 − ৳31,00,000 = −৳1,24,000, which reconciles with our −৳3,10,000 + the credit memo not yet settled (৳1,86,000 timing)." This is incoherent because the return credit cannot be both 3,10,000 and 1,24,000.

**Suggested fix:** Use ৳3,10,000 consistently for RET-0008. Correct ABC Yarn’s net to 27,90,000. Explain the true reconciliation: the supplier’s statement includes the duplicate INV-0991; after removing it, their position should agree with Masco’s −৳3,10,000 (a credit in Masco’s favour pending settlement). Remove the undefined 1,24,000 and 1,86,000 figures.

---

### 4. Capstone quiz answer repeats the incorrect 1,24,000 return credit

**File:** `src/MascoLearning.Api/wwwroot/modules/data/module-15.json`
**Question 11 (last question)

The correct-answer explanation states:

> "Statement: 31,00,000 (INV-0987) + 31,00,000 (INV-0991) − 1,24,000 (RET-0008) − 31,00,000 (PAY) = 29,76,000."

Again, RET-0008 is documented as ৳3,10,000, not 1,24,000. Using 3,10,000 gives 27,90,000. The entire explanation therefore teaches the wrong reconciliation amount.

**Suggested fix:** Recalculate the supplier-statement walkthrough using ৳3,10,000 for the return credit. Update the statement total and the final explanation to match the corrected capstone reconciliation.

---

### 5. Module kickers still say "of 14" now that Module 15 is part of the catalog

**Files:** `src/MascoLearning.Api/wwwroot/modules/module-00.html` through `module-14.html` (header `.module-kicker`)

Every pre-capstone module header still reads, for example, "Module 1 of 14", "Module 14 of 14", etc. With the new `module-15` catalog row and landing-page table, the catalog is now 15 modules (0–14) plus the capstone (15), or 16 learning modules total. The old "of 14" wording is stale and inconsistent with `module-15.html`, which correctly says "Module 15 of 15 · The capstone".

**Suggested fix:** Update each `.module-kicker` to read "Module N of 15" for Modules 0–14, or remove the denominator entirely ("Module N") to avoid future drift.

---

### 6. Module 14 does not link forward to the capstone

**File:** `src/MascoLearning.Api/wwwroot/modules/module-14.html`
**Lines:** ~389–410 ("What’s Next" / "You Made It" section)

The plan decision log notes that Module 15 should be "linked from module-14's 'next' and the checklist too". Module 14’s closing section congratulates the learner but does not link to `module-15.html`. Although the capstone is reachable from the dashboard and landing page, the linear navigation path is broken at the final content module.

**Suggested fix:** Add a primary-button link to `/modules/module-15.html` in Module 14’s closing section.

---

### 7. BUILD_PLAN.md status checklist not updated for completed capstone checklist

**File:** `BUILD_PLAN.md`
**Lines:** ~360–370 ("Status" section)

The status checklist still marks "per-persona competency checklist on Module 15" as not done (`[ ]`), but the checklist has been implemented in `module-15.html` and is referenced from `dashboard.html` and `admin/reports.html`.

**Suggested fix:** Update the status item to `[x] per-persona competency checklist on Module 15`, or add a clarifying note that the printable checklist is implemented and pending human sign-off workflow.

---

## What was verified and found correct

- **Faulty accounting claims (Chunk 1):** `module-01.json` Q7 and Q10 no longer claim equality holds per account balance or that imbalance implies corruption/fraud; Q11 correctly teaches "balanced ≠ correct"; `exercises.js` balanced message no longer says the entry "can be posted"; `finance-review-checklist.md` documents every touched claim.
- **Early destination walkthrough (Chunk 2):** `module-01.html` includes a destination section tracing an LC yarn purchase and an export shipment through a mini balance sheet and income statement, with links to `module-11.html`.
- **Posting-spec worksheets (Chunk 3):** `specsheet.js` exists, implements four prompts, reveal answers, and a working "Copy for review" feature; Modules 01, 02, 03, 04, 09, and 13 each include a spec-sheet section with module-specific model answers and register the script; `_template.html` documents the component.
- **Capstone structure (Chunk 4):** `DbSeeder.cs` includes the `module-15` catalog row; `module-15.html` exists with a document pack, five task groups, and interactive components; `module-15.json` is valid JSON with `moduleCode: "module-15"` and passes basic quiz-bank structural checks; `index.html` lists Module 15; README and BUILD_PLAN mention the capstone.
- **Competency separation (Chunk 5):** `module-15.html` includes a printable 7-row competency checklist with sign-off columns; `dashboard.html` explains "Completed = passed quiz" versus demonstrated competence; `admin/reports.html` includes the manager note; README describes the checklist as the sign-off gate.
- **HTML/JSON validity:** `module-01.json`, `module-15.json`, `module-01.html`, and `module-15.html` are syntactically valid.
