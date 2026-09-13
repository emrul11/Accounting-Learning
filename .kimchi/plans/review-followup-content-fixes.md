# Follow-up Review: Content Reliability Fixes

Addresses the follow-up review (rating 7/10) by fixing the capstone numerical
and accounting inconsistencies and the Module 1 walkthrough simplification.
Issue #5 (saving/reviewing practical work in-platform) is recorded as a
separate future chunk because it requires new backend tables and APIs.

## Goal

Raise content reliability from 5/10 to a level where learners can reproduce
every capstone answer from a consistent set of source documents, and where
the early financial-statements walkthrough does not teach revenue without cost.

## Scope included

1. Capstone export price fix and ABC Yarn reconciliation consistency.
2. Rebuild capstone with an opening trial balance, complete WIP → finished
   goods → COGS flow, and an adjusted trial balance that feeds the statements.
3. Module 1 early walkthrough: add COGS / inventory-cost entry or explicitly
   flag the simplification.

## Scope excluded (recorded as future)

4. Persist spec-sheet drafts, capstone submissions, and finance review
   decisions in the platform.

## Constraints

- No backend changes unless Issue #5 is later approved.
- Use existing static HTML/JS patterns only.
- Keep new capstone numbers internally consistent and reproducible.
- No tax-rate or dated NBR claims beyond existing modules.
- English-only new content.

## Chunks

### Chunk 1 — Rebuild capstone from a consistent document set

**Files changed:**
- `src/MascoLearning.Api/wwwroot/modules/module-15.html`
- `src/MascoLearning.Api/wwwroot/modules/data/module-15.json`

**Depends on:** nothing.

**Work:**
1. Decide on a coherent fact pattern:
   - Export price: keep revenue at ৳63,75,000 by stating the price is
     **USD 4.25/pc at ৳100/USD = ৳425/pc**. Update the document-pack row
     and any quiz/reference.
   - ABC Yarn: after return and payment, Masco has a **৳3,10,000 credit from
     ABC Yarn** (i.e., a receivable/prepaid, not ৳0 owed). Update the
     reconciliation prompt, the worked answer, the closing balance sheet,
     and quiz Q11 so the same figure appears everywhere.
   - Provide an **opening trial balance as of 1 Mar 2026** with plausible
     opening balances for Cash, Machinery, Accumulated Depreciation,
     Share Capital, and Retained Earnings.
   - Provide a **production cost sheet / completion record** showing WIP
     ৳37,20,000 transferred to Finished Goods, then ৳38,00,000 of finished
     goods shipped and recognized as COGS (slightly higher than yarn cost to
     include trims/VAT/costing overhead, or equal if that is the chosen
     simplification — but it must be documented).
   - Provide an **adjusted trial balance** before statements so every
     statement line can be traced to a ledger balance.
   - Ensure the income-statement and balance-sheet numbers tie to the
     adjusted trial balance. No plugs. Opening retained earnings must equal
     the prior closing retained earnings, not a balancing figure.
2. Update quiz `module-15.json` to match the rebuilt numbers:
   - Q11 supplier reconciliation uses ৳3,10,000 credit consistently.
   - Any question referencing COGS, WIP, export revenue, or net profit uses
     the rebuilt figures.

**Accept when:** a learner with the document pack + opening trial balance +
adjusted trial balance can independently reproduce every journal entry,
reconciliation, and statement figure; `python3 -m json.tool` validates the
quiz bank.

**Test coverage:** manual arithmetic trace; grep for stale figures
(1,24,000, 1,86,000, 29,76,000, 63,750 where it should not appear).

### Chunk 2 — Module 1 walkthrough COGS fix

**Files changed:**
- `src/MascoLearning.Api/wwwroot/modules/module-01.html`

**Depends on:** nothing (can parallel Chunk 1).

**Work:**
- In the early destination walkthrough, after the export sale entry
  (Dr AR / Cr Sales), add a second entry:
  `Dr Cost of Goods Sold / Cr Inventory—Yarn` for a simple finished-goods
  cost (e.g., ৳30,00,000). Update the mini income statement to show Revenue,
  COGS, and Net Profit. Update the mini balance sheet to reduce Inventory
  and add the COGS effect through retained earnings/profit.
- Alternatively, if the pedagogical intent is to show only the revenue side
  first, add an explicit note: "This is a simplified revenue-only view; in
  Module 6 you will learn to match COGS to the same sale." Given the
  reviewer's concern, the preferred fix is to include the COGS entry.

**Accept when:** the Module 1 walkthrough either includes COGS or explicitly
flags the simplification; no learner can conclude sales create profit with
zero cost.

## Verification Strategy

- Manual arithmetic trace of every capstone figure from opening balances to
  closing statements.
- `python3 -m json.tool` on `module-15.json`.
- Grep audit for contradictory figures across capstone files.

## Decision Log

- Export price: solved by adding exchange rate (USD 4.25 → ৳425) so existing
  large revenue figure stays and the multiplication is correct.
- ABC Yarn: choose the figure the entries actually produce (−৳3,10,000) and
  reflect it as a supplier credit / receivable, rather than forcing 0.
- WIP/COGS: add a production-completion document so the ৳38,00,000 COGS has
  a source.
- Opening retained earnings: derive from the opening trial balance, not as
  a plug.
- Issue #5 (persistence): excluded because it needs new DB tables, API
  endpoints, and UI; record as the next major feature after content fixes.

## Risks

- Authoring volume: rebuilding the capstone is the largest piece.
- New numbers could still be inconsistent if not traced carefully.
- Module 1 COGS addition may make the early walkthrough slightly longer;
  keep it to one extra entry and table.

## Open Questions

- Should Issue #5 (saving/reviewing practical work in-platform) be added to
  this plan, or remain a separate future project?
