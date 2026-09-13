# Follow-up Content Fixes Review

**Plan reviewed:** `/mnt/d/emrul/Accounting-Learning/.kimchi/plans/review-followup-content-fixes.md`

**Files reviewed:**
- `src/MascoLearning.Api/wwwroot/modules/module-15.html`
- `src/MascoLearning.Api/wwwroot/modules/data/module-15.json`
- `src/MascoLearning.Api/wwwroot/modules/module-01.html`

**Scope:** The .NET SDK is unavailable, so build/test were not run. Validation focused on content, arithmetic, and consistency per the review instructions.

## Verdict: APPROVED

All review-focus items were traced and found arithmetically correct and internally consistent. Detail is provided below for the record.

### Capstone (module-15.html + module-15.json)

1. **Export price and revenue** — The B/L document (line 105) states 15,000 pcs at USD 4.25/pc with a bank rate of ৳100/USD, giving ৳425/pc and total revenue of ৳63,75,000. This figure is used consistently in:
   - Event G journal entries (lines 395–397).
   - Income statement (line 785).
   - Adjusted trial balance (lines 814, 829).
   - Balance sheet AR—H&M (line 891).
   - Quiz Q6 and Q9 in `module-15.json`.
   - The Task 5 cash-vs-profit explanation (line 950).

2. **Opening trial balance (1 Mar 2026)** — Present at lines 140–164. Debits (৳3,70,50,000) equal credits (৳3,70,50,000). The balances are plausible: Cash ৳70,00,000, stranded Inventory—Yarn ৳50,000, Machinery ৳3,00,00,000, Accumulated Depreciation ৳30,00,000, Share Capital ৳3,00,00,000, and Retained Earnings ৳40,50,000.

3. **WIP → FG → COGS flow** — Production completion document PROD-COMP-2026-001 is present (line 104) and journalized at lines 350–366: Dr Finished Goods ৳38,00,000 / Cr WIP ৳37,20,000 / Cr Inventory—Trims ৳80,000. The COGS entry at lines 412–414 is Dr COGS ৳38,00,000 / Cr Finished Goods ৳38,00,000. WIP and FG both close to ৳0, and neither appears on the closing balance sheet.

4. **ABC Yarn reconciliation** — After INV-0987 (+৳31,00,000), RET-0008 (−৳3,10,000), and BPV-0351 (−৳31,00,000), Masco's net AP—ABC is −৳3,10,000, reclassified as Receivable from ABC Yarn ৳3,10,000 (adjusted trial balance line 815; balance sheet line 892). The supplier statement of ৳27,90,000 is explained by the duplicate INV-0991 still included by ABC Yarn: 31,00,000 + 31,00,000 − 3,10,000 − 31,00,000 = ৳27,90,000 (line 634). Removing the duplicate reconciles to −৳3,10,000.

5. **Adjusted trial balance** — Present at lines 807–835. Totals tie at ৳4,53,65,000 on both sides. Every statement line traces to a row in this trial balance.

6. **Balance sheet identity** — Total assets ৳3,57,99,500 (line 905) equal total liabilities ৳16,90,000 plus total equity ৳3,41,09,500. Retained Earnings is ৳41,09,500, calculated as opening RE ৳40,50,000 (from the opening trial balance) + March net profit ৳59,500.

7. **Income statement arithmetic** — Gross profit ৳25,75,000 (৳63,75,000 − ৳38,00,000). Total operating expenses ৳25,15,500 (salaries ৳18,00,000 + electricity ৳4,50,000 + LC commission ৳15,500 + depreciation ৳2,50,000). Net profit ৳59,500 (lines 789–793).

8. **Quiz Q11** — `module-15.json` Q11 uses the ৳3,10,000 credit / ৳27,90,000 supplier statement / duplicate INV-0991 story consistently. The explanation correctly reconciles both positions and notes the ৳31,00,000 gap equals the duplicate invoice. No contradictory "৳0 owed" claim appears.

9. **JSON validation** — `python3 -m json.tool` reports the quiz bank is valid JSON.

10. **Stale-figure audit** — No occurrences of 1,24,000, 1,86,000, 29,76,000, or 63,750 remain in the capstone files.

### Module 1 walkthrough (module-01.html)

11. **COGS entry** — Event B1 ("The goods sold cost money") at lines 313–320 correctly shows Dr Cost of Goods Sold ৳30,00,000 / Cr Inventory—Yarn ৳30,00,000.

12. **Income statements** — The post-Event B income statement shows Revenue ৳50,00,000, COGS ৳30,00,000, and Net Profit ৳20,00,000. The final income statement shows Revenue ৳50,00,000, COGS ৳30,00,000, Utilities ৳4,50,000, and Net Profit ৳15,50,000. COGS is non-zero and Net Profit equals Revenue − COGS − Utilities in both cases.

13. **Balance sheets** — Inventory—Yarn is reduced from ৳31,00,000 to ৳1,00,000 after the COGS entry, and the final retained earnings / profit line reflects the lower profit of ৳15,50,000.

---

**Review file path:** `/mnt/d/emrul/Accounting-Learning/.kimchi/docs/review-followup-fixes.md`

**Verdict:** APPROVED
