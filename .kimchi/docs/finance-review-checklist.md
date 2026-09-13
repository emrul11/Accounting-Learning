# Finance Review Checklist — Chunk 1 (Review Response: Teaching Upgrades)

This checklist records every accounting claim edited or added in Chunk 1.
The finance lead should verify each entry against current textbook
treatment (we used the ACCA error-correction distinction as the reference
for what a trial balance detects vs. does not detect).

Sign-off convention: leave initials in `Verified:` after review.

---

## 1. `src/MascoLearning.Api/wwwroot/modules/data/module-01.json`

### 1a. Q7 — Luca Pacioli / double-entry integrity check

- **Original (English):**
  "Σdebits = Σcredits per entry, **per account balance**, per trial balance.
  Corruption and fraud break the equality loudly."
- **Revised (English):**
  "Σdebits = Σcredits within every journal entry, and again across the
  entire trial balance. Individual accounts normally carry either a debit
  balance or a credit balance — that is expected (assets and expenses run
  debit, liabilities and revenue run credit), not corruption. The checksum
  catches arithmetic and posting asymmetries; most fraud is deliberately
  balanced, so it slips past this check entirely."
- **Original (Bangla):**
  "প্রতি এন্ট্রি, প্রতি ব্যালেন্স, trial balance—সবখানে Σdebit=Σcredit।
  জালিয়াতি ভাঙলেই সরব হয়ে ধরা পড়ে।"
- **Revised (Bangla):**
  "প্রতিটি জার্নাল এন্ট্রিতে Σdebit=Σcredit, এবং পুরো trial balance-এও তাই।
  একক একাউন্টে সাধারণত debit বা credit ব্যালেন্স থাকে — এটাই স্বাভাবিক
  (সম্পদ ও খরচ debit-প্রকৃতি, দায় ও রাজস্ব credit-প্রকৃতি), জালিয়াতি
  নয়। Checksum ধরে গাণিতিক ও posting অসামঞ্জস্য; বেশিরভাগ জালিয়াতি
  ইচ্ছাকৃতভাবে সুষম থাকে, তাই এই চেক এড়িয়ে যায়।"
- **Rationale:** Equality holds **per journal entry** and across the
  **trial balance**. It does NOT hold per individual account — accounts
  carry debit balances (assets, expenses) or credit balances (liabilities,
  equity, revenue) by design. The original phrasing could be read as "each
  account's debits equal its credits," which is wrong. Also: most fraud is
  deliberately balanced; the checksum catches arithmetic and one-sided
  posting errors, not fraud in general.
- **Verified:** ____

### 1b. Q7 — wrongExplanations and wrongExplanationsBn

- No structural change. The "wrong" explanations were already correct
  (modern ERPs store header + balanced lines; currency-agnostic). No
  wording needed revision.
- **Verified:** ____

### 1c. Q10 — trial balance out by ৳100

- **Original (English, option text):**
  "Somewhere, at least one posting or data corruption broke the balance law
  — and the books cannot be trusted until found and fixed"
- **Revised (English, option text):**
  "Somewhere, an error broke the balance law — a missed line, a one-sided
  posting, a mistyped amount — and the books cannot be trusted until it
  is found and fixed"
- **Original (Bangla):**
  "কোথাও অন্তত একটি posting বা data corruption ভারসাম্য ভেঙেছে — খুঁজে
  ঠিক না করা পর্যন্ত বই অবিশ্বাস্য"
- **Revised (Bangla):**
  "কোথাও একটি ভুল ভারসাম্য ভেঙেছে — একটি বাদ-পড়া লাইন, একপাশি
  posting, বা ভুল টাইপ করা অঙ্ক — খুঁজে ঠিক না করা পর্যন্ত বই অবিশ্বাস্য"
- **Rationale:** "Data corruption" is too strong — implies fraud or system
  failure. The actual cause of TB imbalance is almost always a mundane
  posting error: a missed line, a one-sided entry, a typo. The corrected
  wording teaches the right mental model without implying imbalance =
  fraud.
- **Verified:** ____

### 1d. Q11 (NEW) — "Balanced TB doesn't prove correctness"

- **New scenario:** At month-end Shirin's trial balance ties perfectly,
  yet an auditor still finds an error. How?
- **Correct answer (index 1):**
  "Balanced is not the same as correct: the checksum catches arithmetic
  and posting asymmetries, but several common errors still balance —
  omission, wrong-account posting, complete reversal, duplicated entry."
- **Explanation (English):** Names the four error types that balance while
  still being wrong; states what a TB does detect (one-sided entries,
  wrong amounts on one side, arithmetic errors) and what it does NOT
  detect (errors of principle). Closes with the audit lesson: reconcile to
  source documents, not just to the TB.
- **Explanation (Bangla):** Mirrors the English content.
- **Rationale:** Closes the gap left by Q7/Q10. Teaches the ACCA distinction
  (errors a TB detects vs. errors it does not) so learners do not infer
  "balanced = correct = trustworthy." Required to prevent developers from
  turning TB-balance into a strong correctness validation in the MIS
  they go on to build.
- **Verified:** ____

---

## 2. `src/MascoLearning.Api/wwwroot/js/exercises.js`

### 2a. Balance-check widget — balanced branch message

- **Original (around line 67):**
  `"Balanced. The entry can be posted."`
- **Revised:**
  `"Balanced — the arithmetic check passes. (Balanced is not the same as
  correct: the checksum cannot catch a well-formed lie.)"`
- **Out-of-balance branch:** unchanged.
- **Rationale:** The widget's "balanced" verdict should not assert
  postability without also reminding the learner that balance is an
  arithmetic gate, not a truth gate. Same out-of-balance branch wording
  preserved intentionally — refusing an unbalanced entry IS still a hard
  system rule.
- **Verified:** ____

---

## 3. `src/MascoLearning.Api/wwwroot/modules/module-01.html`

### 3a. New section "The Destination: One Transaction's Journey"

- **Location:** new `<section id="destination">` inserted after the
  worked-example section, before "Sharpen Your Brain".
- **What it teaches:** Traces one yarn purchase on LC (Event A) and one
  export shipment on credit (Event B) through a mini balance sheet and a
  four-line income statement. Adds two more events (paying the LC,
  collecting the receivable) and one expense (electricity) so the learner
  sees all four combinations: asset↔liability, asset↔revenue, asset↔asset,
  asset↔expense.
- **Balance sheet values:** start 50L assets / 50L equity; after Event A
  81L/81L; after Event B 131L/131L; final 95.5L/95.5L. Income statement:
  revenue 50L, expenses 4.5L, profit 45.5L.
- **Why these numbers:** kept deliberately round and small so the maths
  is visibly correct at a glance. No tax rates, no NBR claims, no FX.
- **Cross-link:** Module 11 (Financial Statements) linked in the intro
  paragraph and in the closing "Notice three things" panel.
- **Components used:** existing `hf-box hf-tip`, `hf-box hf-questions`,
  `table-wrapper`, `journal-table` classes — no new framework introduced.
- **Rationale:** Review #5 — beginners need to see the destination before
  they have the patience to walk through every rule. The single-screen
  trace makes the bridge visible without trying to teach the full Module
  11 treatment.
- **Verified:** ____

### 3b. Quiz section intro — question count

- **Original:** "10 scenarios. Pass mark: 80%."
- **Revised:** "11 scenarios. Pass mark: 80%."
- **Rationale:** Q11 was added; copy must match the actual bank length.
- **Verified:** ____

---

## 4. Other modules — audit result

The grep audit (`per account balance`, `can be posted`, `fraud`,
`corruption`, `never be`, `always be`, `break.*equality`, `equality.*broken`)
across `wwwroot/modules/data/*.json` and `wwwroot/modules/*.html` returned
hits that did NOT warrant correction:

- **`module-00.json`** — uses "fraud" to describe missing-document fraud
  and document-trail destruction. Legitimate, factually correct.
- **`module-02.json`** — "Approve — fewer accounts is always better" is
  a deliberately wrong option (distractor). Not a teaching claim.
- **`module-03.json`** — "A GL account whose balance must always equal
  the total of the subledger rows beneath it" is the control-account
  rule, which IS a strong reconciliation rule by design. Correct as-is.
- **`module-06.json` / `module-07.json` / `module-09.json`** — "fraud"
  appears in the context of legitimate accounting-fraud patterns
  (cherry-picking rates, destroying records, etc.). These are correct
  claims about what counts as fraud.
- **`module-08.json`** — "Salaries under ৳20,000 never become product
  cost" is a deliberate wrong option. "OT always means more output" is
  also a deliberate wrong option.
- **`module-11.json`** — "Beauty without lineage is how fraud dresses"
  is a metaphor about document trails. Legitimate.
- **`module-12.json`** — all "fraud" references are about segregation-of-
  duties controls and toxic role combinations. Correct by design.
- **`module-06.html`** — "They can never be sold as first quality" refers
  to substandard goods, not accounting. Unrelated.

No further content edits were made in this chunk. The audit pattern list
is now clean of residual overclaims in `module-01.*` and `exercises.js`,
which were the only files with claims strong enough to mislead a developer
into a too-strong validation rule.

- **Audit verified:** ____

---

## Summary for finance lead

Three files were edited to fix claims that could become faulty software
assumptions:

1. `module-01.json` — softened the "equality holds per account balance"
   overclaim, softened "data corruption" wording, added Q11 teaching the
   balanced-≠-correct distinction.
2. `exercises.js` — separated arithmetic success from postability in the
   balance-check widget.
3. `module-01.html` — added the destination walkthrough so beginners see
   the financial statements the entries eventually feed.

All edits stay within first-principles accounting: a balanced trial balance
is an arithmetic gate, not a truth gate. The trial balance detects
arithmetic and one-sided posting errors; it does not detect errors of
principle (omission, wrong account, reversal, duplication). Auditors
exist precisely because balance ≠ correctness.
