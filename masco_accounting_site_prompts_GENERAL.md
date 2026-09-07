# MASCO GROUP — ACCOUNTING MODULE LEARNING WEBSITE
## PROMPT LIBRARY — ACCOUNTING CONCEPTS (General Audience Version)

---

## HOW TO USE THIS DOCUMENT

**This is your accounting concepts prompt library.** Copy-paste each prompt into any free AI (Claude, ChatGPT, Gemini, Perplexity). Save every output to your website CMS or Notion. Do not modify the context block — it is calibrated for Bangladesh RMG specificity.

> **Note:** Developer/technical prompts (database design, API specs, system architecture) are maintained in a separate developer document.

### Site Sections

| Section | Audience | Prompts |
|---|---|---|
| How to Use This Site | Everyone | `SITE-0` |
| Module 0–14 (A, B, C prompts) | Everyone | `X-A`, `X-B`, `X-C` |
| Appendices A, B, C, D | Everyone / Role-specific | `APP-X` |

### Prompt Pattern Per Module

| Prompt | Purpose | Audience |
|---|---|---|
| X-A | Concept + Business Flow + Text Diagram | Everyone |
| X-B | Worked Example with Real Numbers | Everyone |
| X-C | Scenario-Based Quiz (10 MCQs) | Everyone |

### Quality Rule
Run every A and B prompt on **two different AIs**. Compare outputs. Note contradictions. Use the more conservative answer for your site. Run C on whichever AI gave the better A output.

---

## MASTER CONTEXT BLOCK

> **Copy this exact block at the top of every single prompt below. Do not shorten it.**

```
CONTEXT (Read carefully before answering):

Company: Masco Group Bangladesh
Industry: Knit composite, 100% export-oriented Ready-Made Garments (RMG)
Location: Factories in Gazipur and Dhaka
Employees: ~1,275
Currency: Local = BDT (Bangladeshi Taka). Export = USD/EUR. Import = USD.

Production chain:
Yarn → Knitting → Dyeing → Cutting → Sewing → Printing/Embroidery → Washing → Finishing → Export

Export markets: Europe (Sweden, Germany, Spain, UK, Netherlands)
Import sources: Yarn and fabric from China, Hong Kong, South Korea

Buyers include: H&M, Zara, C&A, and similar European retail brands.
Payment method: Letter of Credit (LC) — mostly at sight and usance (60/90/120 days)
Import mechanism: Bond license (duty-free import of raw materials for export)

Existing ERP modules already built:
SCM, Merchandising, Production, Inventory, HR/Payroll, Commercial,
Garments, Dyeing, Printing, Embroidery, Wash, Vehicle Management, Sustainability.

We are now building the ACCOUNTING MODULE for this ERP.
Our team includes software engineers, implementation staff, commercial staff,
and finance staff. Most have ZERO formal accounting background.

IMPORTANT RULES FOR YOUR RESPONSE:
- Always use Bangladesh RMG context. Do NOT use India-specific tax rules or examples.
- Avoid generic international accounting examples when a Bangladesh RMG example is possible.
- Explain everything from first principles. Assume the reader has never studied accounting.
- Use structured formatting: tables, numbered lists, section headers.
- Bold every key term the FIRST time it appears.
- End every major section with a "Key Takeaway" box (1–2 sentences).
- Include a simple TEXT-BASED system diagram using arrows where asked
  (format: Event → Document → Department → Accounting Impact).
- Keep language plain. No unnecessary jargon.
```

---

## PROMPT: SITE-0 — HOW TO USE THIS WEBSITE

```
[PASTE MASTER CONTEXT BLOCK HERE]

You are helping write the "How to Use This Site" introduction page for our
internal accounting learning website.

This website has 14 learning modules + 4 appendices.
The audience is mixed: commercial officers, production supervisors,
finance staff, warehouse staff, and software developers.

Write this page with the following sections:

1. WHY THIS SITE EXISTS (3–4 sentences)
   - We are building an ERP accounting module for Masco Group.
   - Everyone involved must understand the accounting logic — not just developers.
   - This site is the single source of truth for all accounting rules.

2. WHAT THIS SITE COVERS (table)
   Show all 14 modules in a table: | Module No. | Topic | Why It Matters |

3. HOW TO NAVIGATE BY ROLE
   Write a separate paragraph for each of these 5 roles:
   a) Commercial Officer (LC, export, buyer invoices) → Start at: Module 0, 7, 9, 13
   b) Production / Warehouse Staff (GRN, WIP, inventory) → Start at: Module 0, 5, 6, 13
   c) Finance / Accounts Staff (full picture) → Start at: Module 0 through 14, in order
   d) HR / Payroll Staff → Start at: Module 0, 8
   e) Software Developers / Implementers → Read ALL modules for accounting understanding. Technical system specifications are in a separate developer document.

   Format: For each role, write:
   - Your job and accounting touchpoints
   - Which modules are essential for you
   - Which modules you can read later
   - One thing to watch out for

4. HOW THE MODULES ARE STRUCTURED
   - Each module has: Lesson (A), Worked Example (B), Quiz (C)
   - Suggest: Read A → try to understand B → test yourself with C

5. IMPORTANT DISCLAIMERS
   - VAT, TDS, AIT rates are set by NBR Bangladesh and change frequently.
     Always verify current rates at nbr.gov.bd before implementation.
   - Bangladesh Bank regulations on export proceeds realization may change.
   - This site reflects RMG-specific accounting treatment. General accounting
     textbooks may contradict this — trust this site for Masco context.

6. VERSION & MAINTENANCE NOTE
   - This document should be reviewed after every NBR budget announcement
     (typically June every year).
   - Module owner should be named per module for accountability.

Format: Clean, plain language. This page is for everyone, not just accountants.
```

---

## MODULE 0: HOW BUSINESS BECOMES ACCOUNTING

### PROMPT 0-A: Concept (Lesson)

```
[PASTE MASTER CONTEXT BLOCK HERE]

TEACH MODULE 0: How Business Operations Become Accounting Entries

This is the foundation module. Before anyone learns accounting rules,
they must understand how physical factory events turn into numbers
in a computer system. Explain from absolute first principles.

Cover these sections IN THIS ORDER:

---

SECTION 1: WHAT IS A "BUSINESS DOCUMENT"?

Explain: In any business, before any accounting entry is made,
a physical paper or digital document must exist. Accounting is
always based on documents, never on memory or verbal instruction.

List these 10 document types with one Masco example each:
| Document | What It Records | Who Creates It | Masco Example |
- Purchase Order (PO)
- Goods Received Note (GRN)
- Quality Control Report (QC)
- Supplier Invoice
- Bill of Lading (B/L)
- Export Commercial Invoice
- Letter of Credit (LC)
- Payment Voucher
- Bank Credit Advice
- Journal Voucher (JV)

---

SECTION 2: THREE BUSINESS CYCLES (The Core Flows)

For EACH cycle, show a TEXT DIAGRAM first, then explain each step:
Format: Event → Document → Department → Accounting Event → Financial Impact

CYCLE A: PURCHASE CYCLE (Importing Yarn from China)
Steps:
1. Decide to buy yarn
2. Send purchase order to China
3. China ships, we receive at Gazipur warehouse
4. Supplier sends invoice
5. We pay through LC

CYCLE B: PRODUCTION CYCLE (Yarn → Finished Garments)
Steps:
1. Issue yarn to knitting floor
2. Knitting completes (fabric made)
3. Dyeing completed
4. Cutting, sewing, finishing
5. Final QC pass, move to warehouse

CYCLE C: EXPORT/SALES CYCLE (Shipment → LC Payment)
Steps:
1. Pack and load garments
2. Customs clearance
3. Ship to Germany (H&M)
4. Present documents to bank
5. LC payment received

For each step in each cycle, fill this table:
| Step | Operational Action | Document Created | Department | Accounting Event Triggered |

---

SECTION 3: OPERATIONAL EVENT vs ACCOUNTING EVENT

Explain the difference clearly with 3 examples:

Example 1: Yarn arrives at warehouse today.
- Operational event: Yarn is physically in our building (today)
- Accounting event: Inventory increases in value (also today, when GRN is approved)
- Same timing here.

Example 2: We ship garments to H&M on March 25.
- Operational event: Truck leaves factory (March 25)
- Accounting event: Revenue is recorded (March 25 — date of B/L)
- Same timing here.

Example 3: We open an LC to pay China supplier.
- Operational event: LC is opened at bank (today)
- Accounting event: Nothing yet — no asset, no liability created
- Different timing — accounting event only happens when goods arrive.

Explain WHY timing matters: "If we record too early, profit looks higher than reality.
If we record too late, expenses are understated."

---

SECTION 4: WHY ERP SYSTEMS AUTOMATE THIS

Explain:
- Without ERP: Accountant manually types every journal entry from documents.
- With ERP: Operational module (e.g., SCM) creates the document,
  accounting module reads it and auto-generates the entry.
- Example: SCM creates a GRN → Accounting module auto-posts:
  Debit Raw Material Inventory / Credit GRN Clearing

Show which existing Masco ERP module feeds which accounting event:
| Masco ERP Module | Documents It Creates | Accounting Events It Triggers |
- SCM → PO, GRN → Inventory increase, AP accrual
- Commercial → Export Invoice, LC → Revenue recognition
- HR/Payroll → Salary sheet → Salary expense
- Production → Production output → WIP/COGS
- Inventory → Stock transfers → No accounting (physical move only)

---

KEY TAKEAWAY BOX:
"Every accounting entry has a source document.
No document = no accounting entry. This is non-negotiable."
```

---

### PROMPT 0-B: Worked Example

```
[PASTE MASTER CONTEXT BLOCK HERE]

WORKED EXAMPLE FOR MODULE 0:

Scenario: H&M Germany places an order for 10,000 dozen basic T-shirts.
We complete the order from yarn purchase to payment received.

Show this as a TIMELINE TABLE with these columns:
| Day | Event | Operational Action | Document | Department | Accounting Event | BDT Impact |

Timeline:
- Day 1: Order confirmed, LC received from H&M
- Day 5: PO issued to China yarn supplier
- Day 20: Yarn arrives at Gazipur, GRN created
- Day 22: Yarn issued to knitting floor
- Day 30: Knitting complete, transfer to dyeing
- Day 38: Dyeing complete
- Day 45: Cutting and sewing complete
- Day 52: Finishing and packing complete
- Day 55: Customs clearance
- Day 56: Shipment departs, B/L issued
- Day 60: Documents presented to bank
- Day 90: LC payment credited to our account

Exchange rate assumption: 1 USD = 112 BDT throughout.
Order value: $80,000 export. Yarn cost: $40,000 import.

For Days 20, 22, 52, 56, 90 — show the ACTUAL accounting entry:
Format:
Account Debited | Amount | Account Credited | Amount | Why

---

SECTION 2: WHAT COULD GO WRONG
List 5 real problems that happen at Masco and explain the accounting impact each creates:
1. Yarn arrives but GRN is not created for 3 days (timing problem)
2. H&M rejects 200 dozen for quality issue (revenue reversal)
3. Exchange rate changes between shipment and payment (gain/loss)
4. Supplier invoices for more than the PO amount (3-way match fail)
5. Documents presented to bank late, LC expired (payment delay)

---

SECTION 3: WHERE NON-FINANCE STAFF GET CONFUSED
Write 5 common misunderstandings and correct them:

Example format:
MYTH: "Once the shipment leaves, we've made our money."
REALITY: "Revenue is recognized on the B/L date, but cash only arrives when
the bank credits the LC payment — sometimes 30–90 days later."

Write 4 more myths in the same format, relevant to commercial or production staff.
```

---

### PROMPT 0-C: Scenario-Based Quiz

```
[PASTE MASTER CONTEXT BLOCK HERE]

QUIZ FOR MODULE 0: Business Flow to Accounting Mapping

CRITICAL INSTRUCTION: Every question MUST be written as a real scenario
(a situation someone encounters at Masco), NOT a definition question.

BAD EXAMPLE (do not do this): "What is a GRN?"
GOOD EXAMPLE (do this): "The warehouse received 500kg of yarn from China at 9am.
It is now 5pm and the store keeper has not yet created a GRN.
What accounting problem does this create?"

Write 10 scenario-based MCQs.

Rules:
- 4 options per question (A, B, C, D)
- Only ONE correct answer
- Questions must cover: document sequencing, operational vs accounting timing,
  which department creates which document, what triggers an accounting entry

Include Answer Key at end with ONE sentence explaining why each answer is correct.

Distribute questions:
- Q1–Q3: Purchase cycle scenarios
- Q4–Q5: Production cycle scenarios
- Q6–Q7: Export/sales cycle scenarios
- Q8–Q9: Timing difference scenarios
- Q10: "Something went wrong" scenario (exception)
```

---

---

## MODULE 1: DOUBLE-ENTRY BOOKKEEPING

### PROMPT 1-A: Concept (Lesson)

```
[PASTE MASTER CONTEXT BLOCK HERE]

TEACH MODULE 1: Double-Entry Bookkeeping from Absolute Zero

The readers are engineers and factory staff with no accounting background.
Build understanding from first principles. Do NOT assume prior knowledge.

---

SECTION 1: WHY ACCOUNTING EXISTS (Start here)

Answer these three questions plainly:
1. Why does Masco need to track money at all?
   (Use: "Imagine we didn't — what would happen after 6 months of production?")
2. What is the difference between "having goods" and "having money"?
3. Why can't we just look at the bank account to know if Masco is profitable?

---

SECTION 2: THE ACCOUNTING EQUATION

Introduce: Assets = Liabilities + Equity

Explain each term in plain language with ONE Masco example per term:
- Asset: Something Masco owns that has value
  (Examples: cotton yarn in warehouse, knitting machine, cash in bank, USD receivable from H&M)
- Liability: Something Masco owes to someone else
  (Examples: unpaid supplier bill to China, bank loan, unpaid salaries)
- Equity: What would be left for the owner if all liabilities were paid
  (Examples: share capital, profit accumulated over years)

Show the equation balancing with a simple Masco example:
"Assets (machines 5M + inventory 2M + cash 1M) = Liabilities (bank loan 4M) + Equity (4M)"
Then show what happens when we buy yarn for cash (both sides stay equal).

---

SECTION 3: DEBIT AND CREDIT — THE MOST MISUNDERSTOOD CONCEPT

Explain this VERY carefully because most people get confused:

Step 1: The physical analogy
- Imagine a T-shaped account. Left side = Debit. Right side = Credit.
- It is just a position (left or right). It does NOT mean "good" or "bad."
- Never say "debit is positive, credit is negative."

Step 2: The rules for each account type
For each of the 5 account types, provide:
- Definition (1 sentence)
- Masco example
- Rule: What increases it (Debit or Credit?)
- Rule: What decreases it (Debit or Credit?)
- Memory trick

| Account Type | Masco Example | Increases With | Decreases With | Memory Trick |
- Asset (Cash, Inventory, Machines, Receivables)
- Liability (Supplier Payable, Bank Loan, Salary Payable)
- Equity (Share Capital, Retained Earnings)
- Revenue (Export Sales)
- Expense (Yarn Consumed, Salary, Electricity)

Step 3: The golden rule
"Every transaction has AT LEAST two sides. Total Debits always equal Total Credits.
This is not optional — it is mathematical law."

---

SECTION 4: FIVE MASCO JOURNAL ENTRIES

Show the FULL journal entry format for each:
| Date | Account | Debit (BDT) | Credit (BDT) | Explanation |

Entry 1: Buy yarn for cash — 500,000 BDT
Entry 2: Buy yarn on credit from China — $10,000 @ 112 = 1,120,000 BDT
Entry 3: Pay January salaries — 3,500,000 BDT (all cash)
Entry 4: Export shipment confirmed to H&M — $80,000 @ 112 = 8,960,000 BDT revenue
Entry 5: Receive electricity bill for factory — 180,000 BDT (not paid yet)

For each entry, after showing the numbers, write:
"Why Dr [Account]: ___" and "Why Cr [Account]: ___"

---

SECTION 5: BRIDGE TO MODULE 4
Add this exact paragraph at the end:

"In a manual system, an accountant would type each of these entries one by one.
In Masco's ERP, these entries are generated AUTOMATICALLY when operational events happen —
for example, when the SCM module approves a GRN, the accounting module
instantly creates the yarn purchase entry.
Module 4 (Posting Engine) explains exactly how this automation works.
For now, understand the entries themselves."

---

COMMON MISTAKES BOX:
List 5 most common mistakes beginners make with debits/credits.
Use Masco scenarios.
```

---

### PROMPT 1-B: Worked Example

```
[PASTE MASTER CONTEXT BLOCK HERE]

WORKED EXAMPLE FOR MODULE 1:

Show SEVEN complete journal entries for Masco Group January 2026.
For each, show the ACCOUNTING EQUATION balance after the entry.

Format:
---
TRANSACTION [N]: [Title]
Scenario: [2-sentence operational description]
Journal Entry:
| Account | Debit (BDT) | Credit (BDT) |
Why Dr [Account]: [one sentence]
Why Cr [Account]: [one sentence]
Equation Check: Assets [X] = Liabilities [Y] + Equity [Z]
---

Transactions:
1. Jan 1: Owner invests 10,000,000 BDT as share capital (cash)
2. Jan 5: Buy knitting machine for 2,000,000 BDT cash
3. Jan 8: Buy yarn on credit from China — $5,000 @ 112 BDT
4. Jan 10: Pay factory rent for January — 150,000 BDT cash
5. Jan 15: Export shipment to H&M — $30,000 @ 112. Goods cost 1,800,000 BDT.
   (Show BOTH the revenue entry AND the cost-of-goods entry.)
6. Jan 20: Receive LC payment from H&M — $30,000 @ 113 BDT
   (Rate changed from 112 to 113 — show exchange gain.)
7. Jan 31: Pay China supplier from Transaction 3 — rate now 114

After all 7 entries, show a simple RUNNING BALANCE TABLE:
| After Transaction | Cash | Inventory | Machines | AR | AP | Revenue | COGS | Equity |
```

---

### PROMPT 1-C: Scenario-Based Quiz

```
[PASTE MASTER CONTEXT BLOCK HERE]

QUIZ FOR MODULE 1: Double-Entry Bookkeeping

CRITICAL INSTRUCTION: Every question MUST be a real scenario at Masco,
NOT a definition question.

BAD: "What does 'debit' mean in accounting?"
GOOD: "The SCM team created a GRN for 500kg of yarn received today.
Which account should be debited in the journal entry?"

Write 10 scenario-based MCQs:

- Q1–Q2: Which account to debit in a purchase scenario
- Q3–Q4: Which account to credit in a sales/payment scenario
- Q5–Q6: Impact on the accounting equation
- Q7: A "something doesn't balance" scenario — what's wrong?
- Q8: Direct vs indirect expense classification (salary example)
- Q9: Trick question — a transaction that looks like expense but is actually an asset
  (e.g., buying a sewing machine)
- Q10: What happens if we record a credit instead of a debit for inventory?

4 options per question. Answer Key with one-sentence explanations.
```

---

---

## MODULE 2: CHART OF ACCOUNTS

### PROMPT 2-A: Concept (Lesson)

```
[PASTE MASTER CONTEXT BLOCK HERE]

TEACH MODULE 2: Chart of Accounts for Masco Group

---

SECTION 1: WHAT IS A CHART OF ACCOUNTS

Explain it as a "master filing system" — before any transaction can be recorded,
the account must exist in this list. Use the analogy of folder tabs in a filing cabinet.

Explain why two companies' charts of accounts are different — because their
business activities are different.

---

SECTION 2: ACCOUNT CODE NUMBERING SYSTEM

Explain Masco's numbering system:
| Range | Category | Why This Range |
1000–1999 → Assets
2000–2999 → Liabilities
3000–3999 → Equity
4000–4999 → Revenue
5000–5999 → Cost of Goods Sold (COGS)
6000–6999 → Operating Expenses
7000–7999 → Production Overheads
8000–8999 → Financial Items (interest, bank charges, exchange)
9000–9999 → Tax & Statutory

Explain sub-codes: 1100 = Cash & Bank, 1110 = Cash-BDT, 1120 = Cash-USD, 1130 = Bank-BDT

---

SECTION 3: MASCO-SPECIFIC ACCOUNTS

For each category, give 4–5 accounts with:
| Code | Account Name | What It Tracks | Example Transaction |

Category coverage (give actual account names):
a) Assets: Cash-BDT, Bank-BDT, Bank-USD, Accounts Receivable, Yarn Inventory,
   WIP-Knitting, WIP-Dyeing, Finished Goods, Prepaid AIT, Knitting Machines,
   Sewing Machines, Buildings
b) Liabilities: GRN Clearing/Accrued Receipts, AP-China Suppliers, AP-Local,
   Salary Payable, Bank Loan-BDT, WPPF Payable, TDS Payable
c) Equity: Share Capital, Retained Earnings
d) Revenue: Export Sales-Europe, Scrap Sales, Exchange Gain
e) COGS: Yarn Consumed, Dyeing Chemicals, Direct Labor-Sewing, Direct Labor-Knitting
f) Operating Expenses: Admin Salaries, Office Rent, Utilities-Admin
g) Production Overheads: Factory Supervisor Salary, Machine Depreciation,
   Factory Electricity, Indirect Materials
h) Financial: Bank Interest Expense, LC Charges, Exchange Loss, Bill Discounting Charge
i) Tax: VAT Input, AIT-Import, TDS Payable

---

SECTION 4: CONTROL ACCOUNTS vs DETAIL ACCOUNTS vs SUBLEDGER

Explain the hierarchy:
Control Account (GL level, 1 balance) → Detail by Buyer (Subledger)

Example:
- GL: Accounts Receivable = 8,500,000 BDT (one number)
- Subledger: H&M Germany = 5,000,000, Zara Spain = 2,500,000, C&A Netherlands = 1,000,000
- Check: 5,000,000 + 2,500,000 + 1,000,000 = 8,500,000 ✓

Explain: You do NOT create a new GL account for each buyer.
The subledger handles buyer-level detail.
The GL only sees the total.

Which accounts have subledgers at Masco:
- Accounts Receivable → by Buyer
- Accounts Payable → by Supplier
- Inventory → by Item/Location
- Fixed Assets → by Asset Tag

Which accounts go DIRECTLY to GL (no subledger):
- Revenue, Expenses, Overheads, Cash, Bank, Tax accounts

---

KEY TAKEAWAY BOX:
"The chart of accounts is configured ONCE before go-live.
After transactions exist, account codes cannot be changed or deleted.
Get this right from the start."
```

---

### PROMPT 2-B: Worked Example

```
[PASTE MASTER CONTEXT BLOCK HERE]

WORKED EXAMPLE FOR MODULE 2:

PART 1: Build a 30-account Chart of Accounts for Masco Group.
Show as a table: | Code | Account Name | Category | Normal Balance (Dr/Cr) | Subledger? |
Cover all 9 ranges (1000–9000). Make it realistic for RMG.

PART 2: Show 6 transactions and identify which accounts are hit.
For each transaction, do NOT show the full journal entry —
just show "Which accounts are affected and why."

Transactions:
1. Receive yarn from China (not paid yet)
2. Pay factory electricity bill
3. Export shipment to H&M Germany
4. Pay 200 employees' salaries by bank transfer
5. Buy a new sewing machine (import, paid by LC)
6. Receive LC payment from H&M

PART 3: Two concept questions with answers:

Q: "We have a new buyer — Primark UK. Do we add a new account to the Chart of Accounts?"
A: Explain using subledger vs GL logic.

Q: "We now buy a new yarn type — organic cotton. Do we add a new account?"
A: Explain using inventory subledger logic.

PART 4: ACCOUNT QUICK REFERENCE CARD
Create a 1-page reference table: | Transaction Type | Debit Account | Credit Account |
Cover: yarn purchase, machine purchase, salary payment, export sale, LC payment,
VAT on local purchase, customs AIT, factory electricity.
```

---

### PROMPT 2-C: Scenario-Based Quiz

```
[PASTE MASTER CONTEXT BLOCK HERE]

QUIZ FOR MODULE 2: Chart of Accounts

CRITICAL INSTRUCTION: Every question MUST be a real Masco scenario.
No definition questions.

Write 10 scenario-based MCQs:

- Q1–Q2: Which account code range fits which transaction?
- Q3: Someone wants to create account 4500 for "yarn expense" — is this correct?
- Q4: Control account vs subledger — which balance is "correct" in a mismatch?
- Q5: Should machine spare parts (15,000 BDT) go to Assets or Expenses?
- Q6: Which account gets hit when we pay a local supplier via bank transfer?
- Q7: We made a gain because the USD rate moved favorably. Which account range?
- Q8: Someone suggests creating a separate account for every Chinese yarn supplier.
  Why is this wrong?
- Q9: WPPF payable — which range?
- Q10: A new account is needed. What process should be followed? (options about
  who approves, whether existing transactions change, etc.)

4 options per question. Answer Key with explanations.
```

---

---

## MODULE 3: SUBLEDGER vs GENERAL LEDGER

### PROMPT 3-A: Concept (Lesson)

```
[PASTE MASTER CONTEXT BLOCK HERE]

TEACH MODULE 3: Subledger vs General Ledger

---

SECTION 1: THE PROBLEM SUBLEDGERS SOLVE

Start with this scenario:
"Masco has 50 export buyers and 80 import suppliers. If we tracked each buyer
and supplier in the GL directly, we'd have 130 extra accounts, and the balance
sheet would be unreadable."

Explain: The GL needs to stay simple (one "Accounts Receivable" total).
The subledger handles the detail (who owes what, how much, since when).

---

SECTION 2: WHAT IS THE GENERAL LEDGER?

- The official accounting record. One balance per account per period.
- Used to generate financial statements.
- Shows: "Accounts Receivable = 8,500,000 BDT"
- Does NOT show: which buyer owes what.

---

SECTION 3: WHAT IS A SUBLEDGER?

- A detail register linked to one GL control account.
- Shows the breakdown that the GL doesn't.
- Example: AR Subledger shows H&M = 5M, Zara = 2.5M, C&A = 1M.
- Sum of subledger = GL control balance (always — if not, there is a problem).

The four Masco subledgers:
| Subledger | GL Control Account | Detail Level | Key Information Tracked |
1. Accounts Receivable (AR) → by Buyer → invoice date, amount, due date, payment received
2. Accounts Payable (AP) → by Supplier → PO no., invoice no., due date, payment status
3. Inventory → by Item/Location → quantity, value, warehouse, batch
4. Fixed Assets → by Asset Tag → purchase date, cost, depreciation to date, location

---

SECTION 4: HOW SUBLEDGER POSTS TO GL

TEXT DIAGRAM:
Operational Event → Subledger Entry (detailed) → Batch Summary → GL Entry (1 line)

Example:
Jan 15: Export Invoice H&M $50,000 → AR Subledger: H&M +$50,000
Jan 16: Export Invoice Zara $30,000 → AR Subledger: Zara +$30,000
Jan 16 (day-end batch): GL Entry: Dr AR Control 8,960,000 BDT / Cr Revenue 8,960,000 BDT
(8,960,000 = ($50,000 + $30,000) × 112 exchange rate)

Explain why we batch (not real-time): performance, rollback capability, easier error correction.

---

SECTION 5: RECONCILIATION — WHY IT MATTERS

Explain: Subledger total MUST equal GL control account balance.
If they differ: Something went wrong (failed posting, manual override, system error).

Common causes of mismatch:
1. A subledger entry was made but GL posting failed (network error)
2. Someone manually adjusted the GL account (bypassing subledger)
3. Period mismatch (subledger entry in Jan, GL posting in Feb)
4. Rounding differences in foreign currency conversion

What should happen:
- System runs auto-reconciliation daily
- Alert sent if variance > 0 BDT
- Finance team investigates and resolves within 24 hours

TEXT DIAGRAM:
Subledger Total [X] → Compare → GL Control [Y]
If X ≠ Y → Alert → Investigate → Fix → Re-reconcile

---

KEY TAKEAWAY BOX:
"The subledger tells you WHO owes you / who you owe.
The GL tells you HOW MUCH in total.
Both must always agree."
```

---

### PROMPT 3-B: Worked Example

```
[PASTE MASTER CONTEXT BLOCK HERE]

WORKED EXAMPLE FOR MODULE 3:

SCENARIO: January 2026 — AR Subledger and GL reconciliation

PART 1: Build the AR Subledger for January
Three export invoices and payments:

| Date | Buyer | Invoice Amount | Exchange Rate | BDT Value | Payment Date | Payment (USD) | Payment (BDT) | Balance (BDT) |
Jan 5: H&M Germany — $40,000 @ 112
Jan 12: Zara Spain — $30,000 @ 112
Jan 18: C&A Netherlands — $20,000 @ 113
Jan 20: H&M payment received — $40,000 @ 114
Jan 28: C&A payment received — $20,000 @ 115

Calculate: Running balance after each transaction per buyer.
Calculate: Total AR Subledger balance at Jan 31.
Note: Show exchange gain/loss on each payment.

PART 2: Show GL entries (batch posted day-end)
Show what the GL sees:
Jan 5 (batch): Dr AR Control / Cr Export Revenue
Jan 12 (batch): Dr AR Control / Cr Export Revenue
Jan 18 (batch): Dr AR Control / Cr Export Revenue
Jan 20 (batch): Dr Bank-USD / Cr AR Control (+ Exchange Gain)
Jan 28 (batch): Dr Bank-USD / Cr AR Control (+ Exchange Gain)

GL AR Control running balance: show after each batch.

PART 3: Reconciliation at Jan 31
Subledger total = ?
GL control balance = ?
Do they match? (They should.)

PART 4: WHAT GOES WRONG — Show this failure scenario:
Jan 18 invoice is in subledger (subledger shows C&A 2,260,000 BDT)
but GL posting FAILS due to a system error.
- Subledger balance: X
- GL balance: Y
- Difference: Z
- What should the system do?
- What should Finance do to fix this?
- Show the correction journal entry.
```

---

### PROMPT 3-C: Scenario-Based Quiz

```
[PASTE MASTER CONTEXT BLOCK HERE]

QUIZ FOR MODULE 3: Subledger vs General Ledger

CRITICAL INSTRUCTION: All questions must be real Masco scenarios, not definitions.

Write 10 scenario-based MCQs:

- Q1: The AR subledger shows 8.5M BDT total but the GL shows 8.2M. Which is wrong?
- Q2: Finance wants to know "how much does Zara Spain owe us right now?" — where do they look?
- Q3: The MD wants to know total receivables for the balance sheet — where does that come from?
- Q4: A junior accountant manually credits the GL AR control account to "fix" a discrepancy
  without touching the subledger. What problem does this create?
- Q5: In which subledger would you find "500kg cotton yarn, batch 2026-01-15, value 56,000 BDT"?
- Q6: Subledger batch posting is scheduled for 11pm every night. An invoice was created
  at 10:30pm. When will it appear in the GL?
- Q7: What is the purpose of the "GRN Clearing" account — is it a GL account or a subledger?
- Q8: A supplier calls asking how much Masco owes them. Which module/report does Finance use?
- Q9: Year-end audit: auditor asks "show me all transactions for account 1210 (AR-Export)."
  What does the GL show vs what does the subledger show?
- Q10: Reconciliation runs at midnight. It finds a 15,000 BDT discrepancy. Who should it alert?
  And by what time should it be resolved?

4 options. Answer Key with explanations.
```

---

---

## MODULE 4: POSTING ENGINE (THE HEART)

### PROMPT 4-A: Concept (Lesson)

```
[PASTE MASTER CONTEXT BLOCK HERE]

TEACH MODULE 4: The Posting Engine — How Accounting Entries Are Auto-Generated

This is the most critical module. If the posting engine is wrong,
every financial statement will be wrong. Treat this as the foundation
of the entire accounting system.

---

SECTION 1: WHAT IS A POSTING RULE?

Explain: "A posting rule is a pre-defined template that says:
'When THIS event happens under THESE conditions,
create THIS accounting entry automatically.'"

Analogy: Like a conditional formula in Excel —
=IF(event="GRN_APPROVED" AND item_type="YARN",
  DEBIT("Raw Material Inventory"), CREDIT("GRN Clearing"))

The accounting team defines these rules ONCE during setup.
After that, the system creates entries automatically without human intervention.

---

SECTION 2: EVENT-BASED ACCOUNTING

Define "event" in ERP context: An operational action that changes asset,
liability, revenue, or expense. Not every operational action is an event.

Which events TRIGGER accounting entries at Masco:
| Event | Trigger Condition | Debit Account | Credit Account | Why |
1. GRN Approved → Warehouse confirms receipt
   Dr: Raw Material Inventory / Cr: GRN Clearing (Accrued Receipts)
   Why: We own the yarn, but haven't received the invoice yet.

2. Supplier Invoice Matched to GRN → Finance approves 3-way match
   Dr: GRN Clearing / Cr: Accounts Payable-China
   Why: The accrued receipt is now a confirmed liability to the supplier.

3. Supplier Payment Executed → Bank confirms transfer
   Dr: Accounts Payable-China / Cr: Bank-USD
   Why: Liability cleared, cash gone.

4. Payroll Processed → HR finalizes attendance + calculation
   Dr: Salary-Direct Labor (COGS) + Salary-Indirect (Overhead) / Cr: Salary Payable
   Why: Expense incurred, not yet paid.

5. Payroll Bank Transfer → Finance executes bank payment
   Dr: Salary Payable / Cr: Bank-BDT
   Why: Liability cleared, cash gone.

6. Export Shipment Confirmed → Commercial gets B/L from shipping line
   Dr: Accounts Receivable-H&M / Cr: Export Sales-Europe
   Why: Revenue recognized on shipment date (when title passes to buyer).

7. COGS Backflush → Month-end or shipment trigger
   Dr: COGS-Yarn Consumed / Cr: Finished Goods Inventory
   Why: The cost of goods shipped becomes an expense.

8. LC Payment Received → Bank credit advice confirmed
   Dr: Bank-USD / Cr: Accounts Receivable + Exchange Gain/Loss
   Why: Receivable cleared, cash received, any rate difference is gain/loss.

9. Depreciation Run → Monthly batch (1st of every month)
   Dr: Depreciation Expense / Cr: Accumulated Depreciation
   Why: Systematic cost allocation for asset usage.

10. Salary Accrual (month-end) → If payroll not processed by month-end
    Dr: Salary Expense / Cr: Salary Payable (Accrued)
    Why: Expense belongs to this month even if paid next month.

---

SECTION 3: ACCOUNT DETERMINATION LOGIC

Explain: Not all GRNs hit the same debit account.
A GRN for yarn → Raw Material Inventory
A GRN for spare parts → Repairs & Maintenance Expense
A GRN for packing materials → Packing Materials Inventory

The system uses "account determination rules" to choose the right account:
| Factor | Value | Debit Account Determined |
- Item category = YARN → 1510 Raw Material Inventory
- Item category = MACHINE → 1700 Fixed Assets (triggers capitalization)
- Item category = SPARE_PART_MINOR → 6200 Repairs & Maintenance
- Item category = PACKING → 1520 Packing Materials Inventory

Show how multiple factors can combine:
"If item_category = CHEMICAL AND department = DYEING → 5120 Dyeing Chemicals"

---

SECTION 4: POSTING SEQUENCE MATTERS

Explain: Events MUST post in the correct order.
Wrong order = wrong balances.

Required sequence:
1. PO approved (no accounting — just a commitment)
2. GRN approved → Dr Inventory / Cr GRN Clearing
3. Invoice matched → Dr GRN Clearing / Cr AP
4. Payment → Dr AP / Cr Bank
If Step 3 happens before Step 2: GRN Clearing is debited without a credit → imbalanced.

---

SECTION 5: REVERSAL LOGIC

Rule: NEVER delete a posted accounting entry. Always reverse.

Reversal = Create an equal-opposite journal entry with reference to original.
Original: Dr Inventory 100,000 / Cr GRN Clearing 100,000
Reversal: Dr GRN Clearing 100,000 / Cr Inventory 100,000
Net result: Both entries exist in history. Net effect = zero.

Why: Complete audit trail. Auditors can see everything that happened.
Deletions = red flag. Reversals = normal business practice.

---

KEY TAKEAWAY BOX:
"The posting engine is the bridge between operations and accounting.
Every posting rule must be defined, tested, and approved by Finance
before go-live. A wrong posting rule silently corrupts every financial statement."
```

---

### PROMPT 4-B: Worked Example

```
[PASTE MASTER CONTEXT BLOCK HERE]

WORKED EXAMPLE FOR MODULE 4:

Show COMPLETE posting logic for one full purchase-to-payment cycle.

SCENARIO: Import 500kg cotton yarn from China.

Data:
- PO issued: 500kg @ $10/kg = $5,000 (Rate on PO date: 112 BDT = 560,000 BDT)
- GRN: 500kg received, GRN date rate: 113 BDT (total: 565,000 BDT)
- Supplier invoice: $5,000 (same as PO, no discrepancy)
  + $200 freight charge (not in PO)
  Invoice date rate: 113 BDT
- Payment: $5,200 paid via LC. Payment date rate: 114 BDT (total: 592,800 BDT)

For EACH posting step, show:
---
STEP [N]: [Event Name]
Trigger: [What happened operationally]
Exchange rate used: [and why this rate]
Journal Entry:
| Account Code | Account Name | Debit (BDT) | Credit (BDT) |
Business Logic: [Why these accounts, 2 sentences]
Outstanding balance after this step: [which accounts have open balances]
---

Steps to cover:
Step 1: GRN Approved (500kg received)
Step 2: Freight accrual (when freight invoice arrives separately)
Step 3: Supplier invoice matched (3-way match: PO + GRN + Invoice)
Step 4: Payment executed (rate has moved)
  — Show: exchange gain/loss calculation
  — Show: net AP cleared

PART 2: WHAT IF GRN IS REVERSED?
After Step 1, the QC team rejects the yarn (contamination found).
GRN must be reversed.
Show:
- The reversal entry
- The effect on AP (it was already posted to GRN Clearing)
- What happens to the supplier invoice (it cannot be matched now)
- The sequence of reversals required

PART 3: ACCOUNT DETERMINATION EXAMPLES
Show account determination for 5 different GRN scenarios:
1. Cotton yarn from China
2. Spare parts for knitting machine (value: 8,000 BDT)
3. New knitting machine (value: 1,800,000 BDT)
4. Dyeing chemicals from local supplier
5. Office stationery from local supplier

For each: What account code is determined? Why?
```

---

### PROMPT 4-C: Scenario-Based Quiz

```
[PASTE MASTER CONTEXT BLOCK HERE]

QUIZ FOR MODULE 4: Posting Engine

CRITICAL INSTRUCTION: All questions must be real operational scenarios at Masco.

Write 10 scenario-based MCQs:

- Q1: GRN is created but supplier invoice hasn't arrived yet. What account holds
  the liability temporarily?
- Q2: A payment is made to China supplier but GRN Clearing still has a balance.
  What posting step was skipped?
- Q3: Yarn GRN is for 500kg but invoice says 490kg. The system is set to auto-post
  invoice matching. What should happen?
- Q4: An export invoice is posted for $80,000 @ 112 BDT. Payment arrives @ 115 BDT.
  What happens to the extra 3 BDT per USD?
- Q5: Finance posts a salary entry by mistake for the wrong month. It is now POSTED.
  What is the CORRECT action?
- Q6: Depreciation run is supposed to happen on the 1st of each month but was
  forgotten for January. It is now Feb 15. What should Finance do?
- Q7: A new item category "SAMPLE_FABRIC" is added to the item master but no
  account determination rule exists for it. A GRN is created for sample fabric.
  What should the system do?
- Q8: The accounts payable shows $50,000 owed to China Yarn Co. The CFO wants to
  know: was a GRN created for all of it? Where does the system show this link?
- Q9: A GRN is approved and posting fires. But the "Raw Material Inventory" account
  is marked INACTIVE. What should the posting engine do?
- Q10: An accountant manually posts a journal entry crediting Accounts Payable by
  200,000 BDT without any source document. What control should prevent this?

4 options. Answer Key with explanations.
```

---

---

## MODULE 5: PROCESS COSTING

### PROMPT 5-A: Concept (Lesson)

```
[PASTE MASTER CONTEXT BLOCK HERE]

TEACH MODULE 5: Process Costing for Knit Garments Factory

---

SECTION 1: WHY PROCESS COSTING (NOT JOB COSTING)

Explain the difference:
- Job Costing: Track cost per individual item (used in printing press, construction)
- Process Costing: Track cost per BATCH through production stages (used in RMG)

Why RMG uses process costing:
- We make thousands of identical T-shirts, not custom items
- Cost is tracked per DOZEN or per KG through stages
- We can't track cost of individual shirt #4,827

---

SECTION 2: MASCO PRODUCTION CHAIN WITH COST FLOW

For EACH stage, explain:
- What inputs come in
- What costs are added at this stage
- What output leaves this stage
- What the cost is named (WIP-Knitting, WIP-Dyeing, etc.)

TEXT DIAGRAM:
Raw Material Inventory
→ [KNITTING] Yarn becomes fabric
  Costs added: Direct Labor (knitting operators), Machine Overhead
  Account: WIP-Knitting
→ [DYEING] Grey fabric gets color
  Costs added: Dye Chemicals, Direct Labor, Water & Steam
  Account: WIP-Dyeing
→ [CUTTING] Fabric panels are cut
  Costs added: Direct Labor
  Account: WIP-Cutting
→ [SEWING] Panels assembled into garments
  Costs added: Direct Labor (largest cost here), Accessories (buttons, labels)
  Account: WIP-Sewing
→ [PRINTING / EMBROIDERY] (Only some orders)
  Costs added: Ink/Thread, Labor
  Account: WIP-Printing
→ [WASHING] (Only some orders)
  Costs added: Washing chemicals, Labor, Water
  Account: WIP-Washing
→ [FINISHING] Pressing, folding, packing
  Costs added: Packing materials, Labor
  Account: Finished Goods Inventory
→ [EXPORT SHIPMENT]
  Cost moves from: Finished Goods Inventory → COGS

---

SECTION 3: WIP vs FINISHED GOODS — THE CRITICAL DISTINCTION

WIP (Work In Process):
- Goods that have STARTED production but NOT completed
- Asset on balance sheet: money invested but not yet recoverable
- Example: Fabric that is in the dyeing vat right now

Finished Goods:
- Production 100% complete, ready to ship
- Still an asset: Will become revenue/COGS when shipped
- Example: Packed cartons in the Gazipur warehouse

COGS (Cost of Goods Sold):
- The cost that "leaves" the balance sheet when we SHIP
- Goes to the Income Statement as an expense
- Only recognized at the moment of shipment (B/L date)

Show this as an ASSET JOURNEY TABLE:
| Stage | Account Type | Account Name | Triggered By |
Raw Material → Asset → Raw Material Inventory → GRN approval
In Knitting → Asset → WIP-Knitting → Production start
...
Finished → Asset → Finished Goods → Production completion
Shipped → Expense → COGS → B/L date

---

SECTION 4: COST ACCUMULATION EXAMPLE

Show cumulative cost build-up for one order:
Order: 10,000 dozen basic T-shirts for H&M Germany

| Stage | Cost Added | Cumulative Cost | Cost per Dozen |
After yarn issue: 800,000 BDT
After knitting: +50,000 labor, +25,000 overhead → 875,000 BDT
After dyeing: +70,000 chemicals, +35,000 labor → 980,000 BDT
After cutting: +20,000 labor → 1,000,000 BDT
After sewing: +160,000 labor, +30,000 accessories → 1,190,000 BDT
After finishing: +60,000 packing → 1,250,000 BDT
Total: 1,250,000 BDT for 10,000 dozen = 125 BDT/dozen

---

SECTION 5: CONDITIONAL STAGES (CRITICAL FOR MASCO)

Some orders skip stages. Explain what happens to cost flow:
- Order skips printing: WIP goes directly from Sewing to Washing (or Finishing)
  Printing account never touched for this order.
- Order skips washing: WIP goes directly from Sewing (or Printing) to Finishing
- Order requires BOTH printing and embroidery: Two additional WIP accounts involved

Rule: Cost only accumulates in a stage if that order ACTUALLY goes through it.

---

SECTION 6: REWORK COST (VERY COMMON IN RMG)

Rework = Goods that fail QC and must go back to a previous stage.

Example: 500 dozen T-shirts fail dyeing QC (shade variation). Sent back to dyeing.
- Extra dye chemical: 15,000 BDT
- Extra labor: 8,000 BDT
- Total rework cost: 23,000 BDT

Options for accounting:
Option A: Add rework cost to the same production order (higher total cost per dozen)
Option B: Post to separate "Rework Cost" account (keeps original order cost clean)

Recommended: Option A (total cost for order, simpler)
Exception: If rework is due to supplier defect, charge back to supplier → Option B

---

KEY TAKEAWAY BOX:
"Cost only becomes COGS when we SHIP.
Until then, every taka spent on production is an ASSET (WIP or Finished Goods).
This is why a factory can be profitable but cash-poor — assets are tied up in inventory."
```

---

### PROMPT 5-B: Worked Example

```
[PASTE MASTER CONTEXT BLOCK HERE]

WORKED EXAMPLE FOR MODULE 5:

SCENARIO: Two production orders running in January 2026.

Order A: 8,000 dozen basic T-shirts (stages: Knitting, Dyeing, Cutting, Sewing, Washing, Finishing)
Order B: 8,000 dozen printed polo shirts (stages: ALL stages including Printing)

Costs incurred in January 2026:

ORDER A:
- Yarn issued from warehouse: 640,000 BDT
- Knitting labor: 32,000 / Knitting overhead: 18,000
- Dyeing chemicals: 48,000 / Dyeing labor: 25,000
- Cutting labor: 14,000
- Sewing labor: 96,000 / Sewing accessories: 22,000
- Washing cost (chemicals + labor): 42,000
- Finishing (packing + labor): 38,000
Status: 6,000 dozen COMPLETED & SHIPPED. 2,000 dozen in finishing at month-end.

ORDER B:
- Yarn issued: 640,000 BDT
- Same knitting, dyeing, cutting, sewing as Order A
- Printing: ink + screen + labor: 72,000
- Washing: 42,000 / Finishing: 38,000
Status: ALL 8,000 dozen completed by Jan 31, NOT YET shipped at month-end.

REQUIRED:

PART 1: Cost Accumulation Table
Build a stage-by-stage cost table for EACH order:
| Stage | Order A Cost | Order B Cost |
Show cumulative and per-dozen at each stage.

PART 2: Month-End Balance Sheet Impact
At January 31, what is:
- WIP balance for Order A (the 2,000 dozen still in finishing)?
- Finished Goods balance for Order B (all 8,000 dozen complete, not shipped)?
- COGS for January (Order A shipment of 6,000 dozen)?

Show journal entries for:
- COGS recognition when 6,000 dozen of Order A ships
- Order B sitting in Finished Goods (no entry needed — just show the balance)

PART 3: REWORK SCENARIO
500 dozen of Order A fail washing QC. Extra washing cost: 18,000 BDT.
Show: How this affects the total cost per dozen for Order A.
Show: The journal entry for extra washing cost.
Before and after cost-per-dozen comparison.

PART 4: CONDITIONAL STAGE PROOF
Order C arrives (5,000 dozen, NO washing, NO printing, just Knitting/Dyeing/Cutting/Sewing/Finishing).
Show that the cost accumulation table only has those 5 stages.
Show that WIP-Washing and WIP-Printing are NEVER touched for Order C.
```

---

### PROMPT 5-C: Scenario-Based Quiz

```
[PASTE MASTER CONTEXT BLOCK HERE]

QUIZ FOR MODULE 5: Process Costing

CRITICAL INSTRUCTION: All questions must be real Masco production scenarios.

Write 10 scenario-based MCQs:

- Q1: An order is in the dyeing machine on January 31. Where does it appear
  on the balance sheet?
- Q2: We finish 5,000 dozen T-shirts on January 29 but ship them on February 3.
  When is COGS recognized?
- Q3: Knitting consumes 800kg of yarn but the BOM says it should use 780kg for
  this order. How is the extra 20kg treated?
- Q4: Order for 3,000 dozen doesn't need printing. The printing department
  supervisor says they should still allocate some cost to cover their overhead.
  Is this correct?
- Q5: 200 dozen T-shirts fail sewing QC — the seams are uneven. They are
  returned to sewing. Who should the rework cost be charged to?
- Q6: At month-end, the production system shows 3,000 dozen are in the
  cutting department. The cost accumulated so far is 120,000 BDT. What account
  holds this 120,000 BDT?
- Q7: Order A cost per dozen = 125 BDT. Order B cost per dozen = 162 BDT.
  The finance manager asks why the difference. What is the most likely reason?
- Q8: Goods are in the "Finished Goods" warehouse, packed and labeled,
  waiting for shipping instruction. Is this an expense yet?
- Q9: A dyeing machine breaks down mid-batch. 500 dozen of fabric are ruined.
  They cannot be recovered. How should this cost be treated?
- Q10: The production team wants to record yarn issued to production as COGS
  immediately when issued. Finance says this is wrong. Who is right and why?

4 options. Answer Key with explanations.
```

---

---

## MODULE 6: INVENTORY & COGS

### PROMPT 6-A: Concept (Lesson)

```
[PASTE MASTER CONTEXT BLOCK HERE]

TEACH MODULE 6: Inventory Accounting & COGS Recognition

---

SECTION 1: TWO PARALLEL SYSTEMS

In Masco's ERP, inventory is tracked in TWO ways simultaneously:
- Stock Ledger: Quantity tracking (kg, dozen, pieces, rolls)
- Accounting Ledger: Value tracking (BDT)

Warehouse cares about: "Do we have 500kg of cotton yarn 30/1 in bin A3?"
Finance cares about: "What is the BDT value of our Raw Material Inventory?"
Both must stay reconciled.

Show this table:
| Event | Stock Ledger Impact | Accounting Ledger Impact |
- GRN for 500kg yarn @ 110 BDT/kg → +500kg | +55,000 BDT
- Issue 200kg to knitting → -200kg | -[weighted avg cost × 200]
- Transfer from Gazipur to Dhaka warehouse → -200kg Gazipur / +200kg Dhaka | No accounting impact (same company)
- Adjust stock (variance found) → ±qty | ±[value at current avg cost]
- Ship to H&M → -N dozen (from finished goods) | -[finished goods cost] to COGS

KEY RULE: Physical transfers within Masco = no accounting entry.
Only receipts from outside, issues to production, and shipments to customers change value.

---

SECTION 2: WEIGHTED AVERAGE COST METHOD

Why Masco should use Weighted Average (not FIFO):
- Yarn prices fluctuate batch to batch ($10.00/kg, $10.50/kg, $9.80/kg)
- We blend yarn from different batches in same production run
- Weighted average gives ONE stable cost for all yarn of same type

How Weighted Average Works:
Formula: New Average = (Old Stock Value + New Receipt Value) / (Old Stock Qty + New Receipt Qty)

Show step-by-step recalculation:
Opening: 100kg @ 100 BDT/kg = 10,000 BDT
Receipt 1: 200kg @ 110 BDT/kg = 22,000 BDT
New Average = (10,000 + 22,000) / (100 + 200) = 32,000 / 300 = 106.67 BDT/kg
Issue: 150kg @ 106.67 BDT = 16,000 BDT
Remaining: 150kg @ 106.67 BDT = 16,000 BDT

Receipt 2: 100kg @ 105 BDT/kg = 10,500 BDT
New Average = (16,000 + 10,500) / (150 + 100) = 26,500 / 250 = 106 BDT/kg

Show this as a running table with all columns.

---

SECTION 3: WHEN DOES INVENTORY BECOME COGS?

Answer clearly:
Inventory is NEVER COGS until the goods are shipped to the buyer.

The journey:
| Event | What Changes | COGS Yet? |
Yarn purchased → Raw Material Inventory increases | No
Yarn issued to production → Raw Material → WIP | No
WIP → Finished Goods (production complete) → Finished Goods increases | No
Finished Goods SHIPPED (B/L created) → Finished Goods decreases → COGS recognized | YES

"COGS is recognized on the B/L date — the day title passes to the buyer."

---

SECTION 4: BACKFLUSHING EXPLAINED

Problem: In RMG, production issues yarn at the start of the process
but we don't know EXACT consumption until after finishing.

Backflushing = System calculates and records consumption AUTOMATICALLY
based on production output and BOM, rather than tracking every kilo issued.

Steps:
1. 10,000 dozen T-shirts completed.
2. BOM says: 0.12kg yarn per dozen = 1,200kg standard
3. System issues 1,200kg from inventory automatically (the "backflush")
4. Journal entry: Dr WIP-Knitting (1,200 × avg cost) / Cr Raw Material Inventory

What if actual consumption differs:
- More consumed (wastage higher than standard): Unfavorable material variance
- Less consumed (efficient run): Favorable material variance
- Variance = actual issued – standard backflushed

---

SECTION 5: INVENTORY WRITE-OFFS AND ADJUSTMENTS

Types of inventory adjustments:
| Type | Reason | Accounting Treatment |
Physical count variance → Count shows 480kg but system shows 500kg → Write off 20kg to Inventory Adjustment expense
Yarn damage/spoilage → 50kg ruined by moisture → Write off to Raw Material Loss
Obsolete stock → Old yarn type no longer used → Write down to net realizable value

All adjustments require Finance approval before posting.
```

---

### PROMPT 6-B: Worked Example

```
[PASTE MASTER CONTEXT BLOCK HERE]

WORKED EXAMPLE FOR MODULE 6:

SCENARIO: Track Cotton Yarn 30/1 through January 2026.

OPENING BALANCE (Jan 1):
- 300kg @ 104 BDT/kg = 31,200 BDT

TRANSACTIONS:
Jan 3: Receive GRN-001: 600kg @ 110 BDT from China (Rate 112, original USD cost)
Jan 8: Issue 400kg to Knitting (Order A)
Jan 12: Receive GRN-002: 400kg @ 108 BDT from China
Jan 15: Issue 350kg to Knitting (Order B)
Jan 20: Receive GRN-003: 500kg @ 112 BDT from China
Jan 25: Issue 600kg to Knitting (Order C)
Jan 31: Physical count shows 448kg (system says 450kg — 2kg discrepancy)

REQUIRED:

PART 1: Complete Stock Ledger
| Date | Description | Receipt (kg) | Issue (kg) | Balance (kg) |

PART 2: Weighted Average Cost Ledger
| Date | Description | Receipt Value | Issue Value | W.Avg Cost | Balance Value |
Recalculate weighted average after EACH receipt.
Use weighted average for each issue value.

PART 3: Journal Entries
Show journal entries for:
- Each GRN (Dr Raw Material Inventory / Cr GRN Clearing)
- Each issue to production (Dr WIP-Knitting / Cr Raw Material Inventory)
- Physical count adjustment (write off 2kg discrepancy)

PART 4: Backflush Reconciliation
If Order A's BOM says 0.12kg/dozen and they completed 3,200 dozen,
standard consumption = 384kg.
Actual issued = 400kg.
Variance = 16kg unfavorable.
Show the variance journal entry.

PART 5: Closing Balance Reconciliation
Confirm: Stock ledger closing qty × weighted avg cost = Accounting ledger balance.
```

---

### PROMPT 6-C: Scenario-Based Quiz

```
[PASTE MASTER CONTEXT BLOCK HERE]

QUIZ FOR MODULE 6: Inventory & COGS

CRITICAL INSTRUCTION: All questions must be real Masco scenarios.

Write 10 scenario-based MCQs:

- Q1: We receive 500kg of yarn. The stock ledger is updated but Finance
  hasn't approved the GRN yet. What is the accounting ledger status?
- Q2: Yarn is issued from warehouse to the knitting floor. Which account
  is debited and which is credited?
- Q3: Production completes 5,000 dozen T-shirts. They are moved to the
  finished goods warehouse. No shipment yet. Which account increases?
- Q4: The physical count finds 10kg less than the system shows. What
  must Finance do before this can be posted?
- Q5: We receive two batches of the same yarn type: 100kg @ 100 and 200kg @ 115.
  We then issue 150kg. What cost per kg is used for the issue value?
  (Choose the closest answer from options with calculations.)
- Q6: An order is shipped to H&M on January 31. Finance closes January books
  on February 5. Which date should COGS be recognized?
- Q7: Backflushing runs at month-end. BOM says 1,200kg standard, but physical
  records show 1,350kg was actually consumed. The difference (150kg) — what account?
- Q8: 200kg of yarn stored in the warehouse is found to be contaminated.
  It cannot be used. What happens to the inventory value?
- Q9: The SCM team transfers 300kg of yarn from Gazipur warehouse to Dhaka factory.
  Both are Masco factories. What accounting entry is needed?
- Q10: Year-end: Some yarn has been in the warehouse for 18 months and the
  market price has fallen below cost. What accounting adjustment is required?

4 options. Answer Key with explanations.
```

---

---

## MODULE 7: FOREIGN CURRENCY & LETTER OF CREDIT

### PROMPT 7-A: Concept (Lesson)

```
[PASTE MASTER CONTEXT BLOCK HERE]

TEACH MODULE 7: Foreign Currency Accounting & Letter of Credit

---

SECTION 1: WHY MULTI-CURRENCY MATTERS AT MASCO

Every export invoice is in USD or EUR.
Every import invoice is in USD.
Local transactions are in BDT.
Bangladesh Bank requires BDT reporting.

This means EVERY foreign currency transaction has:
- A foreign currency amount (the business reality)
- A BDT equivalent (the accounting reality)

Both must be tracked. The difference between them is EXCHANGE GAIN/LOSS.

---

SECTION 2: THREE EXCHANGE RATES — UNDERSTAND EACH ONE

| Rate Type | When Used | Example |
TRANSACTION RATE: Rate on the date the transaction happens.
  "We recognized revenue of $80,000 on Jan 15 when rate was 112 BDT."
  Entry: Dr AR $80,000 (at 112) = 8,960,000 BDT

REPORTING RATE (Month-end Rate): Rate on the last day of the period.
  "At Jan 31, rate is 115 BDT. Our $80,000 AR is now worth 9,200,000 BDT."
  Unrealized gain = 9,200,000 – 8,960,000 = 240,000 BDT
  Entry: Dr AR 240,000 / Cr Unrealized FX Gain 240,000

REALIZATION RATE: Rate when cash actually arrives.
  "Payment received Feb 20 at 113 BDT. $80,000 = 9,040,000 BDT."
  Reverse unrealized gain: Dr Unrealized FX Gain 240,000 / Cr AR 240,000
  Recognize realized: Dr Bank-USD 9,040,000 / Cr AR 8,960,000 + Realized FX Gain 80,000

Show this as a timeline diagram with BDT values at each stage.

---

SECTION 3: LETTER OF CREDIT (LC) — THE EXPORT SIDE

What is an LC: A bank guarantee from buyer's bank that payment will be made
if we fulfill the terms (correct goods, correct documents, within validity).

Export LC Life Cycle:
Step 1: H&M Germany opens LC at Deutsche Bank for $80,000 with terms.
  → LC received at our bank (Sonali Bank, Dhaka)
  → Accounting: Nothing yet. LC is a contingent (conditional) asset.
    Do NOT record revenue or receivable yet.

Step 2: We ship garments. B/L dated Jan 25.
  → Revenue recognized on B/L date.
  → Entry: Dr AR-H&M / Cr Export Sales

Step 3: We present documents to our bank (Invoice, B/L, Packing List, CoO).
  → Bank reviews for LC compliance (3–5 working days)
  → If documents are "clean" (match LC terms): Bank accepts for payment.

Step 4a: At-Sight LC — Bank pays us within 5–7 days.
  → Entry: Dr Bank-USD / Cr AR-H&M ± Exchange Gain/Loss

Step 4b: Usance LC — Bank accepts but payment in 90 days.
  → Create "Bills Receivable" (a type of short-term asset)
  → Entry: Dr Bills Receivable / Cr AR-H&M
  → When due: Dr Bank-USD / Cr Bills Receivable ± Exchange Gain/Loss

---

SECTION 4: LETTER OF CREDIT — THE IMPORT SIDE

Import LC Life Cycle (Yarn from China):
Step 1: We open LC at Sonali Bank for $50,000 to China Yarn Co.
  → Bank debits our account for margin money (typically 10–25%)
  → Entry: Dr LC Margin Deposit / Cr Bank-BDT
  → The LC itself: No full liability entry yet.

Step 2: China ships yarn. B/L dated Feb 10.
  → GRN created when yarn arrives at Gazipur.
  → Entry: Dr Raw Material Inventory / Cr GRN Clearing

Step 3: China presents documents to their bank. Documents arrive here via SWIFT.
  → We accept documents (3-way match with GRN + Invoice)
  → Entry: Dr GRN Clearing / Cr AP-China Supplier

Step 4: LC payment due date — bank debits our account.
  → Entry: Dr AP-China / Cr Bank-USD / ± Exchange Gain/Loss
  → LC Margin released: Dr Bank-BDT / Cr LC Margin Deposit

---

SECTION 5: BACK-TO-BACK LC — MASCO'S MOST IMPORTANT FINANCING STRUCTURE

This is Bangladesh RMG specific. Explain carefully.

Scenario: H&M sends us export LC for $100,000 (Jan 1).
We need to buy yarn from China for $60,000.
Instead of paying cash, we use the export LC as SECURITY.

We approach Sonali Bank: "I have an export LC from H&M for $100,000.
Please open an import LC to China for $60,000 backed by this export LC."
Bank agrees — this is called a BACK-TO-BACK LC.

TEXT DIAGRAM:
H&M Germany → Export LC ($100,000) → Sonali Bank → Import LC ($60,000) → China Yarn Co
     ↑                                        ↓
 Our Revenue Source                    Our Raw Material

Why this is important in accounting:
- Import LC liability is now LINKED to export LC collection
- If H&M cancels export LC → import LC payment source disappears → risk
- Margin requirements are lower because bank sees the export LC as collateral
- Accounting must LINK these two LCs (import LC linked_to export LC)

Margin money note: Bangladesh banks typically require 10–25% margin on import LCs.
On back-to-back LCs, margin may be waived or reduced because export LC is collateral.

---

SECTION 6: BANGLADESH BANK EXPORT PROCEEDS REALIZATION

Rule: Export earnings must be repatriated to Bangladesh within 120 days
of shipment date (or within LC validity, whichever is earlier).

If not received in 120 days:
- Must apply to Bangladesh Bank for extension
- Failure to comply: warning, fine, export license risk

ERP must track: shipment_date + 120 days = realization_deadline
Alert Finance 30 days before deadline.

---

KEY TAKEAWAY BOX:
"In export business, you can be profitable on paper but cash-poor for months.
Revenue is recognized at shipment (B/L date) but cash arrives 30–120 days later.
Exchange rates move during that gap. Every BDT of that movement is real profit or loss."
```

---

### PROMPT 7-B: Worked Example

```
[PASTE MASTER CONTEXT BLOCK HERE]

WORKED EXAMPLE FOR MODULE 7:

SCENARIO: Complete Back-to-Back LC cycle.

STEP 1 (Feb 1): Receive Export LC from H&M Germany — $100,000.
  Exchange rate: 112. LC terms: at sight, validity 90 days.

STEP 2 (Feb 5): Open Back-to-Back Import LC to China Yarn Co — $60,000.
  Margin paid to bank: 15% = $9,000 equivalent = 1,020,000 BDT (rate 113.3)

STEP 3 (Feb 20): Yarn arrives Gazipur. GRN created. Rate: 114.

STEP 4 (Feb 22): Supplier invoice matched. $60,000 @ 114 = 6,840,000 BDT.

STEP 5 (Mar 10): Garments completed and shipped to H&M. B/L issued.
  FOB value: $100,000. Cost of goods: 7,200,000 BDT. Rate: 115.

STEP 6 (Mar 15): Documents presented to bank.

STEP 7 (Mar 25): H&M pays through LC. $100,000 received.
  Rate: 116. Bank charges: 25,000 BDT.

STEP 8 (Apr 1): Sonali Bank debits for China payment. $60,000.
  Rate: 117. LC margin released.

REQUIRED:

For EACH step, show:
- Journal entry with all accounts and amounts
- Running balance of key accounts (AR, AP, Bank-USD, Inventory)
- Exchange gain/loss calculation where applicable

At the end, show:

FINAL SUMMARY TABLE:
| Item | Amount (USD) | Amount (BDT) |
Revenue recognized (Step 5)
COGS recognized (Step 5)
Gross profit (BDT)
Exchange gain on collection (Step 7)
Exchange loss on payment (Step 8)
Bank charges
Net profit from this order

Also: Calculate total margin money deployed and when released.
```

---

### PROMPT 7-C: Scenario-Based Quiz

```
[PASTE MASTER CONTEXT BLOCK HERE]

QUIZ FOR MODULE 7: Foreign Currency & LC

CRITICAL INSTRUCTION: All questions must be real Masco LC/export scenarios.

Write 10 scenario-based MCQs:

- Q1: An export LC arrives from H&M for $80,000. Should Finance record
  a revenue or receivable entry when the LC arrives?
- Q2: We ship garments on March 25. Rate is 112. At March 31, rate is 115.
  At March 31, AR balance in BDT should be:
  (a) original rate × amount, (b) month-end rate × amount, (c) blended rate, (d) USD amount only
- Q3: Back-to-back LC: The export LC from H&M is cancelled before shipment.
  What is the accounting impact on the import LC payable to China?
- Q4: We receive LC payment for $50,000. The rate on revenue recognition was 110.
  The rate today is 113. What account gets the 3 BDT × 50,000 = 150,000 BDT?
- Q5: A usance LC (90-day payment term). We ship on Jan 10. Payment due April 10.
  When should revenue be recognized?
- Q6: LC margin money of 1,000,000 BDT is deposited with the bank.
  Is this an expense, asset, or liability?
- Q7: Bangladesh Bank realization deadline for a Jan 15 shipment is:
  (Calculate 120 days from Jan 15)
- Q8: We issue an import LC for $50,000. Rate on LC open date: 112.
  Rate when goods arrive: 115. Rate when payment made: 118.
  Which rate determines the cost of inventory (GRN valuation)?
- Q9: Unrealized FX gain at month-end — where does it go on the financial statements?
- Q10: We have $200,000 in AR from various buyers at various rates. Rate goes up 2 BDT.
  What is the impact on our BDT profit? (Test understanding of rate × balance.)

4 options. Answer Key with explanations.
```

---

---

## MODULE 8: PAYROLL & LABOR COSTS

### PROMPT 8-A: Concept (Lesson)

```
[PASTE MASTER CONTEXT BLOCK HERE]

TEACH MODULE 8: Payroll & Labor Cost Accounting for RMG Factory

---

SECTION 1: DIRECT LABOR vs INDIRECT LABOR

This distinction is critical because it determines whether the cost
goes into the PRODUCT (COGS) or into OVERHEAD/EXPENSE.

DIRECT LABOR: Workers who PHYSICALLY MAKE the garments.
  - Their cost is part of the product cost.
  - If we make more garments, direct labor cost increases proportionally.
  - Examples at Masco: Knitting machine operators, dyeing floor workers,
    sewing machine operators, embroidery workers, finishing/folding workers

INDIRECT LABOR: Workers who SUPPORT production but don't touch the product.
  - Their cost is overhead or operating expense.
  - Changes slowly regardless of production volume.
  - Examples at Masco: Floor supervisors, quality inspectors, mechanics,
    store keepers, security guards, cleaning staff, admin officers, accountants

Show as a table for Masco's departments:
| Department | Labor Type | Cost Account | Reason |

---

SECTION 2: PAYROLL COMPONENTS (Bangladesh Labor Act)

Build payroll step by step:

GROSS PAY = Basic Salary + Overtime + Allowances + Bonus (if applicable)

Overtime rules (Bangladesh Labor Act 2006):
- Standard hours: 8 hours/day, 48 hours/week
- Overtime rate: 2× (double) the hourly rate
- Maximum overtime: 2 hours/day (with worker consent)
- Maximum in garments (special provision): Up to 10 hours/day with consent
- Calculation: Hourly rate = Basic Salary / (Total hours in month)
  Overtime amount = Overtime hours × (Hourly rate × 2)

DEDUCTIONS (from gross):
- Provident Fund: Employee's contribution (typically 5–10% of basic)
- Tax deduction (only for taxable employees — threshold applies)
- Advance recovery (if loan was given)

NET PAY = Gross Pay – Deductions

---

SECTION 3: COMPLIANCE ACCRUALS — MANDATORY FOR BANGLADESH RMG

These are REAL costs that must be accrued monthly even if paid later.

A) FESTIVAL BONUS:
  - Required: 2 bonuses per year (Eid-ul-Fitr + Eid-ul-Adha)
  - Amount: One month's basic salary per bonus (2 months total per year)
  - Timing: Paid before each Eid
  - Monthly accrual: 2 months' salary ÷ 12 months = 1/6 of monthly basic
  - Entry: Dr Festival Bonus Expense / Cr Festival Bonus Payable

B) WPPF (Workers' Profit Participation Fund):
  - Required by Bangladesh Companies Profit (Workers' Participation) Act
  - Rate: 5% of net profit after tax
  - Timing: Calculated annually, paid within 9 months of year-end
  - Monthly estimate: If expected annual profit is 10M, monthly accrual = 10M × 5% ÷ 12
  - Entry: Dr WPPF Expense / Cr WPPF Payable

C) GROUP INSURANCE:
  - Mandatory in many buyer compliance standards (H&M, Zara require this)
  - Typically a fixed monthly premium per worker
  - Entry: Dr Group Insurance Expense / Cr Group Insurance Payable (or Bank if paid)

---

SECTION 4: PAYROLL POSTING — TWO-STEP PROCESS

STEP 1: SALARY ACCRUAL (when HR finalizes the payroll, before bank payment)
  Entry:
  Dr Salary-Direct Labor (COGS): [direct workers amount]
  Dr Salary-Indirect (Factory Overhead): [indirect factory workers]
  Dr Salary-Admin (Operating Expense): [office/admin workers]
     Cr Salary Payable: [total net pay]
     Cr Provident Fund Payable: [employee PF deduction]
     Cr TDS Payable: [tax deducted if any]

STEP 2: BANK PAYMENT (when finance transfers to employee accounts)
  Entry:
  Dr Salary Payable: [total net pay amount]
     Cr Bank-BDT: [same amount]

WHY TWO STEPS: Expense is recognized when the work is DONE (last day of month),
not when the cash is paid (usually 7th of next month).
This is the ACCRUAL principle.

---

SECTION 5: HOW SALARY COST FLOWS INTO PRODUCT COST

Direct labor becomes part of the cost per dozen through process costing:
- Each production order tracks which workers (departments) worked on it.
- Salary per department ÷ hours worked × hours on this order = labor cost for order.
- This adds to WIP and eventually becomes COGS.

Indirect labor and overhead are allocated at a PREDETERMINED RATE:
- Not direct-charged per order.
- Pooled as factory overhead, then allocated per machine hour or per dozen.

Include Bangladesh Labor Act citation note:
"Overtime rules, minimum wage, and bonus requirements are governed by
Bangladesh Labor Act 2006 and subsequent amendments. Always verify
current minimum wage with the Gazette (RMG minimum wage is revised periodically
by the Minimum Wage Board). Current rates as of knowledge cutoff: verify at [Ministry of Labour]."
```

---

### PROMPT 8-B: Worked Example

```
[PASTE MASTER CONTEXT BLOCK HERE]

WORKED EXAMPLE FOR MODULE 8:

SCENARIO: January 2026 payroll for Gazipur factory.

WORKFORCE:
Direct Workers: 900 employees
  - Total Basic Salary: 2,700,000 BDT
  - Total Overtime Hours: 15,000 hours
  - Hourly basic rate (based on basic salary ÷ 208 hours/month avg): Calculate
  - Overtime amount (at 2×): Calculate

Indirect Workers (Factory): 250 employees
  - Total Basic Salary: 875,000 BDT
  - Overtime hours: 2,000 hours
  - Overtime amount: Calculate

Admin/Office Workers: 125 employees
  - Total Basic Salary: 625,000 BDT
  - No overtime

COMPLIANCE ACCRUALS (all employees, all 1,275):
  - Festival bonus accrual: (total basic × 2 months) ÷ 12
  - WPPF: Estimated January profit 6,000,000 BDT → WPPF = 5% → monthly 1/12
  - Group insurance: 300 BDT per employee per month

DEDUCTIONS:
  - Provident Fund (employee): 5% of basic for all workers
  - TDS: Only admin staff earning >50,000 BDT basic (simplified: 5 employees, 10,000 BDT each)

REQUIRED:

PART 1: Payroll Summary Table
| Category | Basic | OT | Gross | PF Deduction | TDS | Net Pay |
Show for each of the 3 worker categories.
Show totals.

PART 2: Compliance Accruals Calculation
Show calculation for each compliance item.

PART 3: Journal Entry — Salary Accrual
Show the COMPLETE January salary accrual entry.
Split correctly between:
- COGS (Direct Labor)
- Factory Overhead (Indirect Factory)
- Operating Expense (Admin)
Include all compliance accruals in the same entry or as separate entries (your choice — explain why).

PART 4: Journal Entry — Bank Payment (paid Feb 7)
Show the payment entry.

PART 5: Management Report
"Total labor cost per dozen" if factory produced 10,000 dozen in January.
Show: Direct labor per dozen vs Total labor cost per dozen.
```

---

### PROMPT 8-C: Scenario-Based Quiz

```
[PASTE MASTER CONTEXT BLOCK HERE]

QUIZ FOR MODULE 8: Payroll & Labor Costs

CRITICAL INSTRUCTION: All questions must be real Masco payroll scenarios.

Write 10 scenario-based MCQs:

- Q1: A sewing machine operator earns 12,000 BDT basic. She worked 30 overtime hours.
  Bangladesh Labor Act overtime rate is 2×. Calculate her overtime pay.
  (Give 4 numerical options.)
- Q2: The salary for January is processed on Feb 5 and paid on Feb 7. When should
  Finance recognize the expense in the accounts?
- Q3: A floor supervisor at Masco spends 70% of time on the production floor
  managing sewing operators and 30% doing admin paperwork. How should his
  salary be allocated in accounting?
- Q4: Festival bonus — it's only February. No Eid this month. Should any festival
  bonus appear in the February accounts?
- Q5: WPPF is 5% of net profit. In Q1, Masco made 8,000,000 BDT profit.
  Finance wants to wait until year-end to recognize WPPF. Is this correct approach?
- Q6: 900 direct workers' salaries are booked. Where does this cost ultimately
  appear on the financial statements?
- Q7: The provident fund: the employee contributes 5% of basic. The company matches
  it (employer contribution). Which account is debited for the EMPLOYER portion?
- Q8: An accountant records ALL 1,275 employee salaries to "Salary Expense" without
  splitting direct/indirect. What is wrong with this approach?
- Q9: Group insurance premium is paid annually in January (150,000 BDT lump sum).
  Should the entire 150,000 BDT be expensed in January?
- Q10: Overtime records for 50 direct workers were not submitted by the production
  supervisor before month-end closing. What should Finance do?

4 options. Answer Key with explanations.
```

---

---

## MODULE 9: ACCOUNTS PAYABLE & RECEIVABLE

### PROMPT 9-A: Concept (Lesson)

```
[PASTE MASTER CONTEXT BLOCK HERE]

TEACH MODULE 9: Accounts Payable & Accounts Receivable

---

SECTION 1: AP AND AR — OPPOSITE SIDES OF THE SAME COIN

Accounts Receivable (AR): What BUYERS owe US.
  - Created when we issue an export invoice.
  - Reduced when we receive payment.
  - Balance = money we are owed right now.

Accounts Payable (AP): What WE owe to SUPPLIERS.
  - Created when we accept a supplier invoice.
  - Reduced when we make payment.
  - Balance = money we owe right now.

Both are tracked in subledgers (by buyer and by supplier) and summarized in GL.

---

SECTION 2: AGING ANALYSIS — THE MOST USED REPORT IN FINANCE

Aging = How OLD is each unpaid amount?

For AR (amounts buyers owe us):
| Buyer | 0–30 days | 31–60 days | 61–90 days | 90+ days | Total |
- 0–30: Normal. LC payment in process.
- 31–60: Follow up with buyer/bank.
- 61–90: Escalate. Bank may have discrepancy issue.
- 90+: Critical. Legal action or write-off consideration.

For AP (amounts we owe suppliers):
| Supplier | 0–30 | 31–60 | 61–90 | 90+ | Total |
- Manage to pay within terms to maintain relationship.
- Early payment may earn discount (Section 4).
- Late payment may create bad relationship with China suppliers.

---

SECTION 3: WHY OVERDUE AR IS DANGEROUS IN EXPORT

1. Bangladesh Bank 120-day realization rule (from Module 7)
2. LC expiry: LC has a validity date. If documents not presented in time,
   bank may refuse payment.
3. Bad debt risk: If buyer goes bankrupt, we lose the receivable permanently.
4. Cash flow impact: We've already paid workers and suppliers — not receiving
   export proceeds on time creates working capital crisis.

Bad debt provision:
- When AR is 90+ days old, Finance should create a provision.
- Entry: Dr Bad Debt Expense / Cr Provision for Doubtful Debts
- This is NOT writing off — just being conservative on the balance sheet.
- If eventually paid: Reverse the provision.
- If confirmed loss: Dr Provision / Cr AR (write-off).

---

SECTION 4: CASH DISCOUNTS

Supplier offers early payment discount:
- "2/10 net 30" = 2% discount if paid within 10 days, otherwise full amount in 30 days
- Example: Invoice $10,000. Pay within 10 days → pay only $9,800.

Gross Method (recommended for Masco):
- Record full invoice at $10,000.
- When discount is taken: Dr AP $10,000 / Cr Bank $9,800 / Cr Purchase Discount $200

Why gross method: More transparent. Discount account shows actual savings.

Buyer offers discount to us (we are the buyer in import):
- Same logic, reversed perspective.

---

SECTION 5: USANCE LC AND BILL DISCOUNTING

USANCE LC: Payment terms in the LC specify payment after X days.
  - Example: H&M opens a usance 90-day LC.
  - We ship Jan 15. Payment due April 15.
  - We have a "bills receivable" (accepted bank draft) for $80,000 from Jan 15 to Apr 15.

BILL DISCOUNTING: We can take this accepted draft to our bank and get cash now
  (before April 15) at a discount (the bank charges interest).
  - Example: Bank pays us $79,200 now for $80,000 due in 90 days (interest ~8% p.a.)
  - Entry: Dr Bank: 79,200 × 115 = 9,108,000 BDT
            Dr Bill Discounting Charge: 800 × 115 = 92,000 BDT
            Cr Bills Receivable: 80,000 × 115 = 9,200,000 BDT

Why companies discount: Cash now is worth more than cash in 90 days for working capital.
Cost: The bank charges approximately 8–12% p.a. on the face value.
```

---

### PROMPT 9-B: Worked Example

```
[PASTE MASTER CONTEXT BLOCK HERE]

WORKED EXAMPLE FOR MODULE 9:

SCENARIO: January 2026 AP and AR activity.

ACCOUNTS RECEIVABLE:

Three invoices issued in January:
Jan 5: Invoice to H&M Germany — $40,000, LC at sight, rate 112
Jan 12: Invoice to Zara Spain — $30,000, usance 90 days, rate 113
Jan 20: Invoice to C&A Netherlands — $25,000, LC at sight, rate 114

Two payments received in January:
Jan 25: H&M paid — $40,000, rate 115 (LC cleared by bank)
No other payments received in January.

Feb 10: Bill discounting — Zara's usance draft discounted at 9% p.a. for 75 days remaining.
  Discount amount = $30,000 × 9% × 75/365 = Calculate.
  Rate: 116.

ACCOUNTS PAYABLE:

Two invoices from suppliers:
Jan 8: Invoice from China Yarn Co — $50,000, net 60 days, rate 112
Jan 20: Invoice from local packaging supplier — 200,000 BDT, terms: "2/10 net 30"

Two payments made in January:
Jan 28: Paid local packaging supplier (within 10 days of Jan 20) — took 2% discount.
Jan 31: No other payments made.

REQUIRED:

PART 1: AR Aging Report at January 31
| Buyer | Invoice Date | Amount (USD) | BDT @ Transaction Rate | 0–30 | 31–60 | Status |
Note: H&M is paid. Zara is 90-day usance (not overdue). C&A at sight (follow up needed).

PART 2: AP Aging Report at January 31
| Supplier | Due Date | Amount (USD or BDT) | 0–30 | 31–60 | 61–90 |

PART 3: Journal Entries
Show journal entries for ALL AR and AP transactions including:
- Invoice recognition (AR and AP)
- H&M payment with exchange gain/loss
- Local packaging early payment with discount
- Feb 10 bill discounting of Zara usance

PART 4: Cash Flow Impact Analysis
If we had NOT discounted the Zara bill, cash position in February would be:
Show the difference in cash position (with discounting vs without).
What is the cost of discounting (in BDT)? Is it worth it?
```

---

### PROMPT 9-C: Scenario-Based Quiz

```
[PASTE MASTER CONTEXT BLOCK HERE]

QUIZ FOR MODULE 9: Accounts Payable & Receivable

CRITICAL INSTRUCTION: All questions must be real Masco trade scenarios.

Write 10 scenario-based MCQs:

- Q1: H&M owes $80,000 on an invoice dated January 5 (at-sight LC).
  It is now February 15 and payment has not been received.
  Which aging bucket does this fall into and what should Finance do?
- Q2: A supplier invoice for $50,000 arrives but the GRN was only
  for $48,000. The 3-way match fails. What should Finance do?
- Q3: A supplier offers "2/10 net 30." We pay on Day 12. Do we get the discount?
- Q4: Zara's 90-day usance LC: We shipped Jan 20, payment due April 20.
  It is now March 1. Is this AR amount overdue?
- Q5: We create a provision for bad debt (90+ days AR). Does this reduce
  our revenue? Does it reduce our AR? What does it reduce?
- Q6: China supplier invoice has a freight charge of $2,000 not in the original PO.
  The 3-way match fails on this line. What is the correct action?
- Q7: We discount a bill receivable with the bank. We give up $800 in interest.
  What account is debited for the $800?
- Q8: AP subledger shows we owe China Yarn Co $150,000. But AP control account in
  GL shows $148,000. The reconciliation finds a 2,000 difference. What should happen?
- Q9: A buyer confirms they will pay "within 30 days" verbally. Should Finance
  record this as received? Change aging bucket? Issue a credit note?
- Q10: We write off a 2-year-old $5,000 receivable from a buyer who has gone bankrupt.
  What is the correct entry (assuming provision already exists for the full amount)?

4 options. Answer Key with explanations.
```

---

---

## MODULE 10: FIXED ASSETS

### PROMPT 10-A: Concept (Lesson)

```
[PASTE MASTER CONTEXT BLOCK HERE]

TEACH MODULE 10: Fixed Asset Accounting for Garments Factory

---

SECTION 1: WHAT ARE FIXED ASSETS?

Fixed Assets = Long-term items owned by Masco, used in production, NOT for resale.

Characteristics:
- Used for more than 1 year
- Have significant value (Masco threshold: > 50,000 BDT)
- Generate economic benefit over time
- Examples: Knitting machines, dyeing machines, sewing machines,
  generator, air conditioning, delivery vehicles, factory building

NOT fixed assets (even if expensive):
- Yarn (inventory — for sale/use in production)
- Spare parts used in same period (expense)
- Stationery (expense)
- 1-time use tools under threshold (expense)

---

SECTION 2: CAPITALIZATION vs EXPENSE — THE KEY DECISION

When to CAPITALIZE (record as Asset):
- Cost > 50,000 BDT (configurable threshold)
- Useful life > 1 year
- Enhances capacity or capability (not just repairs)

When to EXPENSE (record as Expense immediately):
- Cost ≤ 50,000 BDT (even if it lasts years — not material)
- Routine maintenance (oiling machines, replacing small parts)
- Repairs to restore condition (not enhance it)
- Consumable tools

Decision table for common Masco scenarios:
| Item | Cost | Decision | Reasoning |
New knitting machine: 2,000,000 BDT → Capitalize
Machine overhaul (major): 500,000 BDT → Capitalize (extends life by 3 years)
Belt replacement on dyeing machine: 8,000 BDT → Expense (routine maintenance)
New sewing machine: 75,000 BDT → Capitalize (above threshold)
Box of needles for sewing: 2,000 BDT → Expense (consumable)
Air conditioner for office: 60,000 BDT → Capitalize (> threshold, > 1 year)

---

SECTION 3: DEPRECIATION — THE COST ALLOCATION CONCEPT

Depreciation = Spreading the cost of an asset over its useful life.
It is NOT cash. It is an accounting expense only.
The machine loses economic value as it ages → depreciation captures this decline in accounting.

Straight-Line Method (recommended for Masco):
Annual Depreciation = (Cost – Salvage Value) / Useful Life in Years
Monthly Depreciation = Annual / 12

Salvage Value = Estimated value when asset is disposed/scrapped at end of life.

Useful life examples for Masco:
| Asset Type | Useful Life | Salvage % |
Knitting machine: 10 years, 10% salvage
Dyeing machine: 8 years, 10% salvage
Sewing machine: 7 years, 5% salvage
Vehicle: 5 years, 10% salvage
Building: 20 years, 0% salvage
Computer/IT: 3 years, 0% salvage
Furniture: 5 years, 5% salvage

Worked calculation:
Knitting machine cost: 2,000,000 BDT
Installation: 150,000 BDT → Total: 2,150,000 BDT
Salvage: 215,000 BDT (10%)
Depreciable amount: 1,935,000 BDT
Annual depreciation: 193,500 BDT
Monthly: 16,125 BDT

Depreciation entry (monthly, auto-generated):
Dr Depreciation Expense – Knitting: 16,125 BDT
Cr Accumulated Depreciation – Knitting: 16,125 BDT

Net Book Value (NBV) = Cost – Accumulated Depreciation

---

SECTION 4: HOW DEPRECIATION BECOMES PRODUCTION COST

Depreciation of production machines → Factory Overhead → Product Cost

Step 1: Monthly depreciation posted to "Machine Depreciation – Overhead" account.
Step 2: Overhead pool accumulated (depreciation + electricity + supervisor salary + ...).
Step 3: Overhead allocated to production orders based on machine hours used.
Step 4: Allocated overhead becomes part of WIP cost.
Step 5: Eventually flows to COGS when product ships.

---

SECTION 5: MAINTENANCE vs CAPITALIZATION — THE GREY AREA

This is a daily judgment call in RMG factories.

ROUTINE MAINTENANCE (EXPENSE):
- Replacing oil in machines (monthly cost)
- Replacing worn needles, blades, belts
- Painting walls (restoring condition)
- IT support and software subscriptions

MAJOR OVERHAUL (CAPITALIZE if conditions met):
- Engine replacement in generator that extends life by 5 years
- Complete rebuild of a dyeing machine (restores to "as new" condition)
- Adding new automation component that increases output by 30%

RULE OF THUMB:
- Does it RESTORE condition? → Expense
- Does it EXTEND useful life? → Capitalize
- Does it ENHANCE capability? → Capitalize
- Is it ROUTINE? → Expense regardless of cost

Include note: Finance Manager must approve all capitalization decisions.
```

---

### PROMPT 10-B: Worked Example

```
[PASTE MASTER CONTEXT BLOCK HERE]

WORKED EXAMPLE FOR MODULE 10:

SCENARIO: Track ONE fixed asset from purchase to disposal.

PURCHASE (Jan 1, 2026):
New circular knitting machine from South Korea.
Invoice: $17,500 (rate 114 BDT = 1,995,000 BDT)
Freight/insurance: 80,000 BDT
Customs duty (with bond exemption): 0
Installation + testing: 75,000 BDT
TOTAL CAPITALIZED: Calculate.
Useful life: 10 years. Salvage: 10%.

REQUIRED:

PART 1: Capitalization Entry (Jan 1, 2026)
Show all cost components going into the asset.
Show journal entry.
Calculate: Total capitalized value, depreciable amount, annual depreciation, monthly depreciation.

PART 2: Year 1 Depreciation Schedule (2026)
Build a table: | Month | Depreciation | Accumulated Dep | Net Book Value |
Show all 12 months.

PART 3: Year 3 Major Overhaul (Jan 1, 2029)
Cost: 450,000 BDT. This overhaul extends machine life by 3 more years.
Decision: Capitalize or expense?
If capitalize: Add to asset cost, recalculate depreciation for remaining life.
Show the new depreciation calculation.

PART 4: Year 5 Disposal (Jan 1, 2031 — sold for 800,000 BDT)
At disposal date:
- Original cost + overhaul cost = ?
- Accumulated depreciation (5 years) = ?
- Net Book Value = ?
- Sale proceeds = 800,000 BDT
- Gain or Loss? = ?
Show journal entry for disposal.

PART 5: Depreciation to Production Cost
If this machine runs 10,000 hours/month and is allocated to production orders,
show how depreciation per hour is calculated.
If Order A used 3,000 hours in January, how much overhead is charged to Order A?
```

---

### PROMPT 10-C: Scenario-Based Quiz

```
[PASTE MASTER CONTEXT BLOCK HERE]

QUIZ FOR MODULE 10: Fixed Assets

CRITICAL INSTRUCTION: All questions must be real Masco factory scenarios.

Write 10 scenario-based MCQs:

- Q1: We buy 50 sewing machine needles for 2,500 BDT. One of the engineers wants
  to record this as an asset (it lasts 6 months). Is he correct?
- Q2: The generator at Gazipur factory gets a complete engine replacement for
  500,000 BDT, extending its life by 4 years. Capitalize or expense?
- Q3: A knitting machine was purchased on July 1, 2025. Cost: 1,800,000 BDT.
  Life: 10 years. What is the 2025 depreciation (only 6 months in 2025)?
- Q4: Net Book Value of a sewing machine is 120,000 BDT. It is sold for 150,000 BDT.
  What is the accounting result?
- Q5: Accumulated depreciation of a machine is 1,600,000 BDT. Original cost was 
  2,000,000 BDT. Salvage was 200,000 BDT. Has the machine been fully depreciated?
- Q6: A machine is fully depreciated (NBV = 0) but still in use. Should Masco
  continue recording depreciation? Should it be removed from the asset register?
- Q7: Monthly depreciation of the dyeing machines totals 45,000 BDT.
  Where does this 45,000 BDT ultimately go in the financial statements?
- Q8: An asset was purchased for 2,000,000 BDT but was only used for 6 months
  before a better model made it obsolete. NBV is 1,700,000 BDT. Market value
  is estimated at 400,000 BDT. What accounting adjustment is required?
- Q9: The asset register shows 45 sewing machines. The physical count finds 43.
  Two are missing. What steps should Finance and Management take?
- Q10: Installation cost of 75,000 BDT for a new machine — is this capitalized
  as part of the machine cost or expensed separately?

4 options. Answer Key with explanations.
```

---

---

## MODULE 11: FINANCIAL STATEMENTS

### PROMPT 11-A: Concept (Lesson)

```
[PASTE MASTER CONTEXT BLOCK HERE]

TEACH MODULE 11: Financial Statements for Masco Group

---

SECTION 1: WHAT ARE FINANCIAL STATEMENTS?

Financial statements are the FINAL OUTPUT of the entire accounting system.
Everything we have done in Modules 1–10 builds toward these three documents.
They answer three fundamental business questions:

Question 1: "What do we OWN and what do we OWE?" → Balance Sheet
Question 2: "Did we make MONEY this period?" → Income Statement
Question 3: "Where did our CASH go?" → Cash Flow Statement

---

SECTION 2: BALANCE SHEET (Statement of Financial Position)

A snapshot at ONE SPECIFIC DATE (e.g., "As of December 31, 2025").

Structure:
ASSETS (what Masco owns):
  Current Assets (will be used/converted in < 1 year):
    - Cash and Bank: 45M BDT
    - Accounts Receivable (AR): 85M BDT
    - Inventory (Yarn, WIP, Finished Goods): 120M BDT
    - Prepaid AIT: 8M BDT
  Non-Current Assets (long-term):
    - Fixed Assets (Machines, Buildings): 280M BDT
    - Accumulated Depreciation: (65M) BDT
    - Net Fixed Assets: 215M BDT
TOTAL ASSETS: 473M BDT

LIABILITIES (what Masco owes):
  Current Liabilities (due within 1 year):
    - Accounts Payable (suppliers): 55M BDT
    - Salary Payable: 18M BDT
    - Tax Payable: 8M BDT
    - Bank Overdraft: 12M BDT
  Non-Current Liabilities (due > 1 year):
    - Term Loan (bank): 80M BDT
TOTAL LIABILITIES: 173M BDT

EQUITY (owner's interest):
  - Share Capital: 120M BDT
  - Retained Earnings: 180M BDT
TOTAL EQUITY: 300M BDT

CHECK: ASSETS (473M) = LIABILITIES (173M) + EQUITY (300M) ✓

---

SECTION 3: INCOME STATEMENT (Profit & Loss Statement)

Performance over a PERIOD (e.g., "For the Year Ended December 31, 2025").

Structure:
Revenue:
  Export Sales (USD/EUR converted to BDT): 1,320M BDT
  Scrap Sales: 5M BDT
  TOTAL REVENUE: 1,325M BDT

Cost of Goods Sold (COGS):
  Yarn Consumed: (660M)
  Dyeing Chemicals: (85M)
  Direct Labor: (180M)
  Production Overhead (including depreciation): (120M)
  TOTAL COGS: (1,045M)

GROSS PROFIT: 280M BDT (Gross Margin: 21%)

Operating Expenses:
  Admin Salaries: (60M)
  Office Rent & Utilities: (25M)
  Depreciation (Admin): (8M)
  TOTAL OPERATING EXPENSES: (93M)

OPERATING PROFIT: 187M BDT

Financial Items:
  Bank Interest: (18M)
  LC Charges: (12M)
  Exchange Gain/(Loss): 3M (if gain) or (3M) (if loss)
  Bill Discounting Charges: (5M)

PROFIT BEFORE TAX: ~155M BDT
Income Tax (25%): (38.75M)
NET PROFIT AFTER TAX: ~116M BDT

---

SECTION 4: CASH FLOW STATEMENT

Answers: "Where did cash actually come from and go?"
Why separate from Income Statement:
  - Revenue ≠ Cash received (AR may still be outstanding)
  - Depreciation is an expense but NOT a cash outflow
  - Buying a machine is a cash outflow but NOT an expense (it's capitalized)

Three sections:
A) OPERATING ACTIVITIES: Cash from/to day-to-day business
   Start with Net Profit, then add back non-cash items (depreciation),
   then adjust for working capital changes (AR increase = cash used, AP increase = cash provided)

B) INVESTING ACTIVITIES: Cash for/from long-term assets
   - Machine purchases: Cash out
   - Machine sales: Cash in
   - Land purchases: Cash out

C) FINANCING ACTIVITIES: Cash from/for funding
   - Bank loan received: Cash in
   - Loan repayment: Cash out
   - Owner capital injection: Cash in
   - Dividend paid: Cash out

Net Cash Change = Operating + Investing + Financing
Opening Cash + Net Change = Closing Cash (must match Balance Sheet cash)

---

SECTION 5: HOW ALL MODULES FEED THE STATEMENTS

| Module | Balance Sheet Impact | Income Statement Impact |
Module 2 (COA) → Structure and account codes for both statements
Module 5 (Process Costing) → Inventory (BS), COGS (IS)
Module 6 (Inventory) → Inventory value (BS), COGS (IS)
Module 7 (FX) → AR/Bank (BS), Exchange Gain/Loss (IS)
Module 8 (Payroll) → Salary Payable (BS), Salary Expense (IS)
Module 9 (AP/AR) → AP/AR balances (BS), Bad Debt Expense (IS)
Module 10 (Fixed Assets) → Asset/Accum Dep (BS), Depreciation (IS)
Module 14 (Tax) → Tax Payable (BS), Tax Expense (IS)

---

SECTION 6: MANAGEMENT REPORTS vs FINANCIAL STATEMENTS

Financial Statements: For external users (bank, auditors, tax authority). Standard format.
Management Reports: For internal decision-making. Custom format.

Key management reports Masco needs that the standard P&L doesn't show:
| Report | Who Uses It | Key Question It Answers |
Cost per dozen by style → Merchandising → "Is this order profitable at this FOB price?"
Buyer-wise profitability → Commercial → "Which buyers give best margins?"
Department expense analysis → Factory Managers → "Where is overhead too high?"
Machine utilization % → Production → "Are machines being used efficiently?"
Cash flow forecast (8-week rolling) → CFO → "Will we have enough cash for payroll next month?"
Order-wise P&L → MD → "Which orders made money this year?"

---

KEY TAKEAWAY BOX:
"Revenue is NOT cash. Profit is NOT cash.
A company can show profit on the income statement while running out of cash
(because buyers haven't paid yet, or because cash is tied up in inventory).
The cash flow statement tells the true story."
```

---

### PROMPT 11-B: Worked Example

```
[PASTE MASTER CONTEXT BLOCK HERE]

WORKED EXAMPLE FOR MODULE 11:

DATA FOR MASCO GROUP — YEAR 2025:

Income Statement Data:
Export Sales: 12,000,000 USD @ average rate 110 = 1,320,000,000 BDT
Scrap Sales: 4,500,000 BDT
Yarn Consumed: 660,000,000 BDT
Dyeing Chemicals: 85,000,000 BDT
Direct Labor: 180,000,000 BDT
Indirect Labor (factory): 65,000,000 BDT
Machine Depreciation: 48,000,000 BDT
Factory Overheads (electricity, water, etc.): 27,000,000 BDT
Packing Materials: 30,000,000 BDT
Admin Salaries: 60,000,000 BDT
Office Rent: 24,000,000 BDT
Admin Utilities: 12,000,000 BDT
Bank Interest: 18,000,000 BDT
LC Charges: 12,000,000 BDT
Exchange Gain: 6,000,000 BDT
Bill Discounting Charges: 4,000,000 BDT
Income Tax (effective rate 25%): Calculate
WPPF (5% of pre-WPPF profit): Calculate

Balance Sheet Data:
Cash-BDT: 45,000,000
Bank-USD (at year-end rate 112): 36,000,000 BDT equivalent
AR-Export: 180,000,000 BDT
Inventory (Yarn + WIP + FG): 220,000,000 BDT
Prepaid AIT: 8,000,000 BDT
Fixed Assets (gross): 380,000,000 BDT
Accumulated Depreciation: (95,000,000) BDT
AP-Suppliers: 85,000,000 BDT
Bank Loan (short-term): 50,000,000 BDT
Bank Loan (long-term): 80,000,000 BDT
Salary Payable: 22,000,000 BDT
Festival Bonus Payable: 18,000,000 BDT
WPPF Payable: Calculate (from IS)
Tax Payable: Calculate (from IS)
Share Capital: 200,000,000 BDT
Retained Earnings (opening): 140,000,000 BDT

REQUIRED:

PART 1: Complete Income Statement
Follow the structure from 11-A. Calculate COGS, Gross Profit, Operating Profit,
Net Profit. Calculate WPPF (5% of profit before WPPF and tax).
Calculate Income Tax (25% of profit after WPPF, before tax).

PART 2: Complete Balance Sheet
Build both sides. Verify: Assets = Liabilities + Equity.
(Retained Earnings closing = Opening + Net Profit)

PART 3: Simplified Cash Flow Statement
Use indirect method for Operating Activities:
Start with Net Profit, adjust for:
- Add back depreciation
- Change in AR (increased by 30M from opening = cash used)
- Change in Inventory (decreased by 10M = cash provided)
- Change in AP (increased by 15M = cash provided)
Investing: Machine purchases during year (65,000,000)
Financing: Loan repayment (20,000,000)
Show closing cash and confirm it matches Balance Sheet.

PART 4: Three Management Reports (derived from same data)
1. Gross Margin % (Revenue – COGS / Revenue)
2. Direct Labor per Dozen (if 9,000,000 dozen shipped during year)
3. Export Sales per Employee (1,275 employees)
```

---

### PROMPT 11-C: Scenario-Based Quiz

```
[PASTE MASTER CONTEXT BLOCK HERE]

QUIZ FOR MODULE 11: Financial Statements

CRITICAL INSTRUCTION: All questions must be real Masco management scenarios.

Write 10 scenario-based MCQs:

- Q1: Masco shipped $12M worth of garments in 2025 but only received
  $10.5M in bank payments. AR balance increased. Does the Income Statement
  show $12M or $10.5M as revenue?
- Q2: A machine was purchased for 2,000,000 BDT cash. Which statement(s) is/are affected?
  (Test: balance sheet + cash flow, but NOT income statement directly)
- Q3: Depreciation of 48,000,000 BDT appears on the income statement.
  How much cash left the building for depreciation?
- Q4: The MD asks: "We made 80M profit last year. Why do we have a cash shortage
  for salaries this month?" What is the most likely explanation?
- Q5: Inventory went from 200M to 220M (increased). In the cash flow statement,
  is this a source or use of cash?
- Q6: Which financial statement shows whether Masco can pay its short-term debts?
  (Assets/liabilities comparison — current ratio concept)
- Q7: WPPF payable of 18M appears on the balance sheet. Has this cash been paid out?
  Does it appear on the income statement?
- Q8: Exchange gain of 6M BDT — is this cash received? Where does it appear?
- Q9: A finance manager says "our gross profit margin is 22% — that's good."
  What does this mean for every 100 BDT of revenue?
- Q10: Year-end audit: Auditor asks "show me the link between your net profit
  and your retained earnings." What is the connection?

4 options. Answer Key with explanations.
```

---

---

## MODULE 12: AUDIT & CONTROLS

### PROMPT 12-A: Concept (Lesson)

```
[PASTE MASTER CONTEXT BLOCK HERE]

TEACH MODULE 12: Internal Controls & Audit Trail for RMG ERP

---

SECTION 1: WHY INTERNAL CONTROLS EXIST

Three purposes:
1. Prevent fraud (deliberate wrongdoing)
2. Prevent errors (unintentional mistakes)
3. Ensure compliance (Bangladesh Bank, NBR, buyer code of conduct)

Real cost of missing controls in RMG:
- Inflated GRN → Fictitious inventory → Cash siphoned to fake suppliers
- Duplicate invoice payment → Paying the same supplier invoice twice
- Unauthorized discount to buyer → Revenue reduced without approval
- Modified payroll → Extra salary to ghost employees
- Back-dated entries → This year's expense moved to last year (tax manipulation)

---

SECTION 2: MAKER vs CHECKER (SEGREGATION OF DUTIES)

Core principle: The person who CREATES a transaction cannot be the person who APPROVES it.

| Task | Maker | Checker | Why Separate? |
Create GRN → Warehouse Staff → Warehouse Supervisor → Warehouse staff might inflate qty
Match invoice → Finance Officer → Finance Manager → Officer might approve incorrect invoice
Create payment voucher → Accountant → Finance Manager → Accountant might create fraudulent payment
Execute bank transfer → Finance → Different person than approver → Both fraud and error prevention

GOLDEN RULE: No one person should have end-to-end control over any transaction
from initiation to payment.

---

SECTION 3: APPROVAL HIERARCHY

Define approval thresholds (configurable):
| Amount (BDT) | Minimum Approver |
0 – 50,000 → Department Head
50,001 – 500,000 → Finance Manager
500,001 – 2,000,000 → Director (Finance/Operations)
Above 2,000,000 → MD / Board approval

Document types and required approvals:
| Document | Required Approvers |
PO (import) → SCM Manager + Finance Manager (for currency amount)
GRN → Warehouse Supervisor
Supplier Invoice → Finance Officer (match) + Finance Manager (approve payment)
Export Invoice → Commercial Manager
Payment Voucher → Finance Manager (threshold-based)
Journal Entry (manual) → Finance Manager + Finance Director
Period Closing → Finance Director

---

SECTION 4: AUDIT TRAIL — EVERY ACTION MUST BE RECORDED

Definition: An audit trail is a complete, chronological record of who did what to which record, when.

Minimum audit trail fields for every transaction:
| Field | Purpose |
created_by + created_at → Who entered it and when
approved_by + approved_at → Who authorized it
last_modified_by + last_modified_at → Who changed it (and what changed)
old_value / new_value → What was changed (field-level)
ip_address / device → Where the action happened (optional but recommended)

CRITICAL: Audit trail records must be IMMUTABLE — no one can delete or edit them.
The audit trail is a write-only log.

---

SECTION 5: PERIOD CONTROLS

Once a period is closed:
- No new entries can be posted to that period
- No existing entries can be modified
- Only Finance Director can reopen a closed period
- Every reopening must be logged with reason

Why this matters:
- Tax filings are based on closed period data
- Auditors rely on period-end figures being stable
- If periods can be changed after tax filing: legal liability

---

SECTION 6: CONTROLS SPECIFIC TO BANGLADESH RMG EXPORT

Bangladesh Bank controls:
- Export proceeds must be repatriated within 120 days
- Any proceeds not repatriated: report to Bangladesh Bank
- Export invoice value must match customs declaration

NBR (Tax Authority) controls:
- VAT invoices must be genuine and in correct Mushak format
- Input VAT can only be claimed with valid VAT invoice
- TDS must be deposited within 7 days of payment

Buyer compliance controls:
- Many buyers (H&M, Zara) require Masco to maintain specific records
- Wage records must be available for audit
- Overtime records must match actual payroll
- No child labor certification → HR and payroll records are auditable

---

KEY TAKEAWAY BOX:
"Controls slow down individual transactions but prevent disasters.
One fraudulent payment or one invalid VAT claim can cost more than
100× the time saved by bypassing controls."
```

---

### PROMPT 12-B: Worked Example

```
[PASTE MASTER CONTEXT BLOCK HERE]

WORKED EXAMPLE FOR MODULE 12:

SCENARIO: Full control flow for one $50,000 payment to China supplier.

Walk through EVERY control touchpoint:

STEP 1: SCM officer creates Purchase Order
  Maker: SCM Officer (Karim)
  Action: Creates PO #2026-01-045 for 500kg yarn @ $100/kg = $50,000
  Control: PO amount > 500,000 BDT → Requires Finance Manager approval
  System Action: PO sent to Finance Manager's approval queue

STEP 2: Finance Manager reviews and approves PO
  Checker: Finance Manager (Rahman)
  Control: Verifies: budget available? Price reasonable vs market?
  System Action: PO status = APPROVED. Audit log created.

STEP 3: Warehouse Keeper creates GRN when yarn arrives
  Maker: Store Keeper (Hasan)
  Action: Creates GRN #2026-01-112 for 497kg (3kg shortage, quality issue)
  Control: GRN qty must ≤ PO qty. System flags 3kg shortage.
  System Action: Routes to Warehouse Supervisor for approval.

STEP 4: Warehouse Supervisor approves GRN (with shortage note)
  Checker: Warehouse Supervisor (Ahmed)
  Control: Confirms physical receipt. Adds note: "3kg rejected — color defect"
  System Action: GRN APPROVED. Inventory updated. Posting fires: Dr Inventory 55,664,000 / Cr GRN Clearing.

STEP 5: Finance Officer receives supplier invoice and matches
  Maker: Accountant (Priya)
  Invoice: $50,000 (full PO value, ignoring shortage)
  3-way match result: FAIL — GRN is 497kg, invoice is 500kg (3kg = $300 discrepancy)
  System Action: Routes invoice to exception queue.

STEP 6: Finance Manager resolves discrepancy
  Decision: Create debit note for $300. Request credit note from China.
  Approved for payment: $49,700 only.
  System Action: Invoice matched for $49,700. Debit note created. AP = $49,700.

STEP 7: Finance Manager creates payment voucher for $49,700
  Amount > 50,000 BDT equivalent → Requires Director approval.
  System Action: Payment voucher in Director's queue.

STEP 8: Finance Director approves payment
  System Action: Payment voucher APPROVED.

STEP 9: Bank officer executes bank transfer
  THIS PERSON IS DIFFERENT from the Finance Officer and Finance Manager.
  They only have bank execution rights, not voucher creation rights.
  System Action: Bank transfer executed. Payment voucher status = PAID.
  Posting fires: Dr AP $49,700 / Cr Bank-USD $49,700.

STEP 10: Another accountant performs bank reconciliation next week
  This person is DIFFERENT from everyone above.
  Reconciliation confirms payment matches bank statement.

Show: Audit trail table for this entire flow.
Show: What BLOCKS would prevent each potential fraud attempt.
```

---

### PROMPT 12-C: Scenario-Based Quiz

```
[PASTE MASTER CONTEXT BLOCK HERE]

QUIZ FOR MODULE 12: Internal Controls & Audit Trail

CRITICAL INSTRUCTION: All questions must be real Masco control scenarios.

Write 10 scenario-based MCQs:

- Q1: The warehouse keeper who receives yarn ALSO approves the GRN.
  What fraud risk does this create?
- Q2: A payment voucher for 400,000 BDT needs approval. The Finance Manager
  is on vacation. His assistant submits the voucher and also approves it.
  Which control is violated?
- Q3: An accountant realises she posted a salary entry to the wrong month (posted
  in January, should be February). The period is POSTED. What should she do?
- Q4: An auditor asks for a report of ALL transactions that were modified after
  initial entry. Where does the system get this information?
- Q5: The finance director wants to reopen December (closed) to add a missed entry.
  What controls should govern this process?
- Q6: A supplier sends the SAME invoice twice (different invoice numbers, same amount
  and description). What system control should catch this?
- Q7: Bangladesh Bank regulations require export proceeds within 120 days.
  An export made on September 1 has not been collected by November 30. What should
  the ERP system have done by now?
- Q8: An accountant manually adjusts the GL "Accounts Payable" balance directly
  (bypasses the AP subledger). What is the risk? What control prevents this?
- Q9: A $5,000 payment is approved by a department head. The policy says amounts
  above $5,000 need Finance Manager approval. The payment is made. What is wrong?
- Q10: Buyer compliance audit: H&M requests all payroll records for January 2026
  to verify no child labor and correct overtime payment. What documents must exist
  in the ERP to satisfy this request?

4 options. Answer Key with explanations.
```

---

---

## MODULE 13: REAL-WORLD EXCEPTIONS

### PROMPT 13-A: Concept (Lesson)

```
[PASTE MASTER CONTEXT BLOCK HERE]

TEACH MODULE 13: Real-World Exceptions in RMG Accounting

This module covers situations that happen regularly at Masco
but are NOT covered by the standard posting rules in Module 4.
Every exception requires a SPECIFIC response from operations AND accounting.

Format for each exception:
1. What happened (operational reality)
2. Why it's an accounting problem
3. Which department handles it
4. Documents required
5. Accounting adjustment needed (journal entry)
6. What to watch out for

---

EXCEPTION 1: SUPPLIER SHORT SHIPMENT
Happened: Ordered 1,000kg cotton yarn from China. Received 950kg.
Problem: GRN can only be created for 950kg but invoice says 1,000kg.
Department: Warehouse (GRN), Commercial (claims), Finance (AP adjustment)
Documents: PO (1,000kg), GRN (950kg), Supplier Invoice ($10,000), Debit Note (50kg)
Accounting:
  GRN posts normally for 950kg.
  Debit note created: Dr Debit Note Receivable ($500) / Cr AP-China ($500)
  OR: Hold invoice at 950kg value. Pay only for received.
Watch out for: Supplier may ship balance later — track as open claim.

---

EXCEPTION 2: YARN REJECTION AFTER GRN (QUALITY FAIL)
Happened: 200kg of yarn passed initial count (GRN created) but QC later found contamination.
Yarn returned to China supplier.
Problem: GRN already created, inventory increased, AP already accrued.
Department: QC (report), Warehouse (return), Commercial (claim), Finance (reversal)
Documents: QC Rejection Report, Return GRN (negative GRN), Debit Note
Accounting:
  Reverse the original GRN entry: Dr GRN Clearing / Cr Raw Material Inventory
  (If invoice already matched: also reverse: Dr AP / Cr GRN Clearing)
  Create supplier claim: Dr Supplier Claim Receivable / Cr AP (if payment was pending)
Watch out for: If goods were partially used in production before QC rejection — more complex.

---

EXCEPTION 3: BUYER CLAIM / DISCOUNT DEMAND
Happened: H&M receives our shipment but finds 3% of garments have stitch defects.
H&M claims a 3% discount on the invoice ($80,000 × 3% = $2,400).
We agree to the claim.
Problem: Revenue was already recognized at full $80,000.
Department: Commercial (negotiation), Finance (credit note)
Documents: Buyer's claim letter, Commercial Manager approval, Credit Note
Accounting:
  If AR not yet collected: Dr Export Sales 2,400 × 112 = Dr Revenue / Cr AR
  If already collected: Dr Revenue / Cr Payable to H&M (refund or offset next invoice)
Watch out for: If claim is about quality (our fault) vs buyer's commercial reason — impacts
whether it's a revenue reduction or a cost.

---

EXCEPTION 4: LC DISCREPANCY (DOCUMENT MISMATCH)
Happened: We presented shipping documents to the bank but the LC specified
"GSM 180" and we shipped "GSM 175." Bank flags discrepancy.
Problem: Buyer's bank may refuse to pay until discrepancy resolved.
Revenue is recognized at shipment but cash is delayed (and uncertain).
Department: Commercial (resolve discrepancy), Finance (hold AR collection)
Documents: LC, Discrepancy Notice from bank, Amendment to LC (if buyer agrees)
Accounting:
  No new entry — revenue was correctly recognized at shipment.
  Update AR aging: flag this invoice as "disputed." Do not age normally.
  Accrue bank discrepancy charges: Dr Bank Charges / Cr Bank Charges Payable
Watch out for: If LC expires before discrepancy resolved, buyer may negotiate.

---

EXCEPTION 5: AIR FREIGHT UPGRADE (SEA TO AIR)
Happened: Order originally planned as sea freight (3 weeks). Customer requests urgent delivery.
We switch to air freight. Sea freight: 150,000 BDT. Air freight: 450,000 BDT.
Extra cost: 300,000 BDT.
Problem: Was buyer informed and did they agree to absorb the extra cost?
Department: Merchandising (buyer agreement), Logistics, Finance
Documents: Buyer email/amendment, Air freight invoice
Accounting:
  Scenario A: Buyer pays the extra: No impact on our profit. Debit buyer for 300,000 BDT.
  Scenario B: We absorb the cost: Dr Freight Variance (COGS) 300,000 / Cr AP-Freight Agent
Watch out for: Confirm in writing before shipping. Verbal agreements are dangerous.

---

EXCEPTION 6: PURCHASE PRICE VARIANCE (YARN PRICE CHANGE)
Happened: PO was issued at $10/kg. By shipment time, supplier claims $11.50/kg (market up).
New invoice shows $11.50/kg for 1,000kg. Original PO: $10,000. New Invoice: $11,500.
Problem: GRN was at $10/kg (standard). Invoice at $11.50/kg.
Department: SCM (negotiation/approval), Finance (variance posting)
Documents: PO ($10/kg), GRN (based on PO price), Revised Invoice ($11.50/kg), Approval Email
Accounting:
  GRN posts at PO price: Dr Inventory $10,000
  Invoice match: $11,500 (higher than PO by $1,500)
  Purchase Price Variance: Dr PPV Expense $1,500 / Cr AP $1,500 (in addition to GRN clearing)
Watch out for: PPV should be reviewed regularly. Consistent unfavorable PPV = purchasing problem.

---

EXCEPTION 7: CUSTOMS DUTY REASSESSMENT
Happened: We imported yarn declaring $10/kg. Customs authority reassesses at $12/kg.
Additional duty assessed: 2% × $2 × 1,000kg = $40 equivalent customs fine.
(In bond license context, duty may not apply but penalty might.)
Department: C&F Agent, Commercial, Finance
Documents: Customs reassessment letter, Appeal or payment receipt
Accounting:
  If duty paid (bond violation): Dr Customs Duty Expense / Cr Bank
  Additional inventory cost? If duty must be capitalized into inventory: Dr Inventory / Cr Duty Payable
  Watch: Bangladesh bond license rules — diversion to local market triggers full duty + penalty.

---

EXCEPTION 8: MACHINE BREAKDOWN (IDLE TIME)
Happened: Main circular knitting machine broke down for 2 weeks.
Workers were idle (still paid). No production output during this time.
Problem: We paid direct labor (40 workers × 14 days) but produced nothing.
Department: Production (documentation), Finance (cost allocation)
Documents: Maintenance log, HR overtime/absence records
Accounting:
  Option A: Idle time cost remains in production overhead (spreads across all orders).
  Option B: Separate "Idle Time" expense account (transparent reporting).
  Repair cost: If < capitalization threshold → Dr Repairs Expense / Cr Vendor Payable.
  If major repair extending life → Capitalize (Module 10 rules apply).
Watch out for: If breakdown was covered by insurance — create insurance claim receivable.

---

EXCEPTION 9: EXCHANGE RATE LARGE MOVEMENT
Happened: We have $500,000 in outstanding AR. Rate moves from 112 to 118 in 3 weeks.
Problem: Our BDT financial statements change significantly.
This is not an error — it's the reality of export business.
Department: Finance only
Documents: Bangladesh Bank exchange rate table
Accounting:
  Month-end revaluation: Dr AR / Cr Unrealized FX Gain (6 BDT × $500,000 = 3,000,000 BDT)
  This increases this month's profit but is not cash yet.
  When collected: Reverse unrealized, recognize actual realized gain/loss.
Watch out for: Large unrealized gains can inflate profit numbers. MD should understand this is not cash.

---

EXCEPTION 10: INVOICE PROCESSED TWICE (DUPLICATE PAYMENT)
Happened: Same supplier invoice paid twice (second time by a different accountant).
Problem: AP shows negative balance for supplier, cash overpaid.
Department: Finance (urgent recovery), Audit (investigation)
Documents: Both payment vouchers, bank statements, supplier statement
Accounting:
  The second (wrong) payment: Dr Advance to Supplier / Cr Bank (temporarily reclassify)
  Contact supplier for refund.
  On refund receipt: Dr Bank / Cr Advance to Supplier
  Investigate: How did the duplicate pass the approval workflow? Fix the control gap.

Show for EACH exception a summary table:
| Exception | Frequency | Financial Impact | Recovery Time |
```

---

### PROMPT 13-B: Worked Example

```
[PASTE MASTER CONTEXT BLOCK HERE]

WORKED EXAMPLE FOR MODULE 13:

Walk through THREE exceptions with complete numbers.

---

EXCEPTION 1: SUPPLIER SHORT SHIPMENT + PARTIAL RETURN

PO: 1,000kg cotton yarn @ $10/kg = $10,000. Issued to China Yarn Co.
GRN created: 970kg received (30kg missing). Rate: 112 BDT.
Supplier invoice: $10,000 (full amount).
3-way match FAILS.

Later: China ships remaining 30kg. Separate GRN created. Rate at that time: 114 BDT.

Show:
- GRN 1 entry (970kg @ 112)
- Invoice match exception and debit note for 30kg
- GRN 2 entry (30kg @ 114)
- Final invoice match after GRN 2 arrives
- Exchange rate impact on total yarn cost
- AP balance through the full cycle (open → partially cleared → fully cleared)

---

EXCEPTION 2: BUYER CLAIM + PARTIAL REFUND

Export to Zara Spain: Invoice $60,000. Shipped Jan 20, B/L date Jan 20. Rate: 113.
Revenue recognized Jan 20: 6,780,000 BDT. AR: 6,780,000 BDT.
LC payment received Feb 15: $60,000 @ rate 116 = 6,960,000 BDT.
Feb 20: Zara claims $1,800 discount (3%) for minor wash variation.
Masco agrees. Credit note issued.
Zara agrees to offset against next invoice rather than cash refund.

Show:
- Jan 20: Revenue recognition entry
- Feb 15: Payment received (exchange gain calculation)
- Feb 20: Credit note entry (reverse $1,800 worth of revenue)
- Show: how credit note creates a debit to next invoice (offset)
- Net revenue from this order after claim

---

EXCEPTION 3: EXCHANGE RATE CRISIS SCENARIO

AR balance on Dec 1: $300,000 from 3 buyers (all recognized in November at avg rate 110).
Dec 31 reporting rate: 107 (BDT weakened back).
Jan 20 payments received: $300,000 at rate 108.

Show:
- Nov 30 position: AR value in BDT
- Dec 31 revaluation entry (unrealized loss)
- Jan 1: Auto-reversal of unrealized
- Jan 20: Payment entry with realized loss
- Net exchange loss for Nov–Jan period on this $300,000
- Show on income statement: Where does this appear?
- Explain to the MD: Is this a real loss?
```

---

### PROMPT 13-C: Scenario-Based Quiz

```
[PASTE MASTER CONTEXT BLOCK HERE]

QUIZ FOR MODULE 13: Real-World Exceptions

CRITICAL INSTRUCTION: All questions must be real Masco exception scenarios.

Write 10 scenario-based MCQs:

- Q1: GRN was created for 500kg. QC discovers 50kg is contaminated, 3 days AFTER
  the GRN was approved and inventory was updated. What is the FIRST accounting step?
- Q2: Buyer claims $2,000 discount. We agree. AR was already recognized at full amount.
  Should we reverse the full invoice and reissue? Or create a credit note?
- Q3: A supplier invoice was paid by mistake twice ($30,000 each = $60,000 total paid).
  The mistake is discovered the same day. What is the FASTEST correct resolution?
- Q4: We upgraded from sea freight to air freight without buyer approval.
  Extra cost: 400,000 BDT. Buyer refuses to pay. Where does this cost go?
- Q5: At month-end, AR of $500,000 is revalued at a higher rate. This creates a
  500,000 BDT unrealized gain. Should the MD be confident about this extra profit?
- Q6: Customs reassesses our yarn import value upward, demanding additional
  customs duty of 150,000 BDT. We have a bond license. Why might this be
  particularly serious (beyond just the money)?
- Q7: A machine breakdown caused 15 workers to be idle for 1 week. They were
  still paid. Should this labor cost go to: (a) a specific production order,
  (b) general overhead, (c) a separate idle time account, or (d) write it off?
- Q8: An LC has a discrepancy (document error). Revenue was recognized at shipment.
  The buyer's bank is withholding payment. What should Finance do to AR?
- Q9: Purchase price variance (PPV) of 200,000 BDT unfavorable this month.
  Finance wants to add it to inventory cost. Is this correct?
- Q10: Our $800,000 AR from a buyer is 95 days old and the LC has expired.
  The buyer is unresponsive. What should Finance do (in order)?

4 options. Answer Key with explanations.
```

---

---

## MODULE 14: VAT & TAX (BANGLADESH-SPECIFIC)

### PROMPT 14-A: Concept (Lesson)

```
[PASTE MASTER CONTEXT BLOCK HERE]

TEACH MODULE 14: VAT & Tax for Bangladesh RMG Export

⚠️ MANDATORY DISCLAIMER — INCLUDE AT THE VERY START OF THIS LESSON:
"All VAT rates, TDS rates, AIT rates, and tax thresholds in this module
are governed by the National Board of Revenue (NBR) Bangladesh and are
subject to change with each national budget (typically announced in June).
Before implementing any tax calculation in the ERP, verify current rates at
nbr.gov.bd or consult a licensed tax consultant in Bangladesh.
Do NOT hardcode tax rates — all rates must be configurable in the system."

---

SECTION 1: VAT IN BANGLADESH — OVERVIEW FOR RMG EXPORT

VAT = Value Added Tax. Currently 15% standard rate in Bangladesh (verify at nbr.gov.bd).

KEY DISTINCTION for Masco:
- Export sales: ZERO-RATED (0% VAT). We charge 0 VAT to our foreign buyers.
- Local purchases (from Bangladesh suppliers): We PAY 15% VAT on those purchases.
- We can CLAIM BACK (input tax credit under VAT 4.3) the VAT we paid on purchases
  used in export production.

Example:
Buy local packaging materials: 100,000 BDT + 15,000 BDT VAT = 115,000 BDT paid.
This 15,000 BDT VAT is NOT our cost — we get it back.
Accounting:
Dr Packaging Expense: 100,000 BDT
Dr VAT Input (Asset account): 15,000 BDT
Cr Accounts Payable: 115,000 BDT

We submit monthly VAT return (Mushak 9.1 form — verify form number with NBR).
If input VAT > output VAT: Government owes us a refund (or we carry forward).

---

SECTION 2: MUSHAK — UNDERSTANDING VAT INVOICES

Mushak = The official VAT document in Bangladesh.
For purchasing: Must receive valid Mushak invoice from supplier.
Without a valid Mushak invoice: Cannot claim input tax credit.

Key Mushak types (verify current forms with NBR):
- Mushak 6.3: Tax Invoice (used when we sell locally — rare for us since we export)
- Mushak 6.10: Credit Note (for returns and adjustments)
- What we RECEIVE from local suppliers: Their Mushak 6.3 invoice
- What we SUBMIT monthly: VAT return form

Document rule: EVERY local purchase that includes VAT must have a valid Mushak invoice
with supplier's BIN (Business Identification Number) on it.
Without BIN: Input credit claim may be rejected by NBR during audit.

---

SECTION 3: ADVANCE INCOME TAX (AIT) ON IMPORTS

When Masco imports yarn from China through customs, we pay AIT at the customs point.
This is NOT a final tax — it is a PREPAYMENT against our annual income tax liability.

How it works:
- Customs calculates: AIT = [Configurable %] × CIF value of import
- We pay AIT at customs to get goods released
- This amount is stored as "Prepaid AIT" (asset) in our books
- At year-end: AIT paid throughout the year is deducted from total income tax owed

Accounting:
Dr Prepaid AIT (Asset): [AIT amount]
Dr Raw Material Inventory: [CIF value]
Cr Bank-BDT: [AIT amount]
(Customs duty posting: separate if applicable — bond license may exempt duty)

Rate: Verify current AIT rate at nbr.gov.bd before implementation. Configure in system.

---

SECTION 4: TAX DEDUCTION AT SOURCE (TDS)

When Masco pays certain types of LOCAL payments, we are required by law to
DEDUCT tax at source and deposit it to the government.

We are acting as a TAX COLLECTOR on behalf of the government.

Common TDS scenarios at Masco:
| Payment Type | TDS Rate (verify NBR) | Example |
Service payments (transport, security) → Rate as per NBR schedule
Rent payments → Rate as per NBR schedule
Professional fees (lawyer, consultant) → Rate as per NBR schedule
Contractor payments → Rate as per NBR schedule

Example (rates to be verified):
Pay rent: 500,000 BDT per month.
TDS (verify % with NBR): Let's say X%.
Net payment to landlord: 500,000 × (1 – X%) BDT
TDS deposited to government: 500,000 × X% BDT

Accounting:
Dr Rent Expense: 500,000 BDT
  Cr TDS Payable: 500,000 × X% BDT
  Cr Bank-BDT: Net payment

TDS deposit deadline: Usually within 7 working days of deduction (verify NBR).
Monthly TDS return: Required.

---

SECTION 5: BOND LICENSE ACCOUNTING

Masco likely operates under a bonded warehouse license (also called "bond" or "EX-BOND").

What it means:
- We can import raw materials (yarn, fabric, accessories) DUTY-FREE.
- Condition: We MUST export the finished garments within a specified period.
- If we sell finished goods LOCALLY instead of exporting: We must pay the duty we avoided.

In accounting terms:
- Track bonded stock separately from any non-bonded stock.
- Report to customs authority monthly: How much imported, how much consumed, how much exported.
- If duty exemption was used but goods not exported: Assess duty as a liability.

Bond register (mandatory):
- Opening balance of bonded raw materials
- Imports during period (quantity, value, customs reference)
- Consumption in production (linked to production orders)
- Export of finished goods (linked to export shipment)
- Closing balance
- Utilization ratio = exported value / imported value (customs monitor this)

Accounting for bond:
- Normal GRN entry (no duty entry because duty is exempt)
- If bond violation occurs: Dr Customs Duty Expense / Cr Customs Duty Payable

---

SECTION 6: WPPF (WORKERS' PROFIT PARTICIPATION FUND)

Governed by: Workers' Profit Participation and Welfare Fund Act.
Rate: 5% of NET PROFIT (before this deduction, after all other expenses including tax).

Monthly accounting:
- Estimate current month's profit.
- Accrue: WPPF = estimated_profit × 5% / 12 months
- Entry: Dr WPPF Expense (Overhead or Operating) / Cr WPPF Payable

Year-end adjustment:
- When actual audited profit is known: True up WPPF to actual.
- WPPF is paid to a tripartite fund: Workers 80%, Workers Welfare 10%, Workers Education 10%.
- Timing: Must be paid within 9 months of financial year-end.

---

KEY TAKEAWAY BOX:
"Tax in Bangladesh RMG is not optional accounting — it is a legal compliance requirement.
AIT, TDS, VAT input claims, bond license returns are audited regularly by NBR and Customs.
Errors result in penalties, interest, and risk to export license.
Tax rates and rules MUST be verified with NBR before implementation.
All rates must be CONFIGURABLE in the system — never hardcoded."
```

---

### PROMPT 14-B: Worked Example

```
[PASTE MASTER CONTEXT BLOCK HERE]

WORKED EXAMPLE FOR MODULE 14:

⚠️ NOTE: Use placeholder tax rates in this example.
Clearly label each rate as "EXAMPLE ONLY — verify with NBR."
The structure of the calculation is what matters, not the specific rate.

SCENARIO: January 2026 tax transactions for Masco Group.

TRANSACTION 1: Local purchase of packing materials
Supplier: Dhaka Packaging Ltd (has valid BIN registration)
Amount: 300,000 BDT
VAT: [15% — EXAMPLE ONLY, verify NBR current rate]
Total invoiced: 345,000 BDT
Mushak invoice received: Yes

TRANSACTION 2: Import of cotton yarn from China
CIF value: $60,000. Rate: 114 BDT = 6,840,000 BDT
Customs duty: 0% (bond license exempt)
AIT: [example rate] × 6,840,000 BDT = [calculate]
Other customs charges: 25,000 BDT
Net payment at customs: AIT + 25,000 BDT

TRANSACTION 3: Pay rent for Gazipur factory
Monthly rent: 450,000 BDT
TDS rate: [example rate] (verify NBR schedule)
Net payment to landlord: Calculate
TDS to deposit: Calculate

TRANSACTION 4: Pay local transport contractor
Bill: 120,000 BDT
TDS rate: [example rate]
Net payment: Calculate

TRANSACTION 5: Export shipment to H&M (January 25)
Invoice: $80,000. VAT rate: 0% (export, zero-rated)
Export declaration filed.

TRANSACTION 6: Monthly WPPF accrual
Estimated January net profit: 9,000,000 BDT
WPPF: 5% × 9,000,000 / 12 = Calculate

REQUIRED:

PART 1: Complete journal entries for ALL 6 transactions.
Label each tax component clearly.

PART 2: Monthly Tax Position Summary
| Tax Type | Asset (What we can recover) | Liability (What we must pay) |
VAT Input (from Transaction 1): ?
AIT paid (from Transaction 2): ?
TDS payable (Transactions 3 + 4): ?
WPPF payable (Transaction 6): ?

PART 3: Documents checklist
For each transaction, list what documents must be on file:
| Transaction | Required Document | Where Filed |

PART 4: Monthly Compliance Calendar
| Action | Deadline (example) | Responsible |
VAT return submission
TDS deposit
TDS return filing
Bond license monthly return
```

---

### PROMPT 14-C: Scenario-Based Quiz

```
[PASTE MASTER CONTEXT BLOCK HERE]

QUIZ FOR MODULE 14: VAT & Tax

CRITICAL INSTRUCTION: All questions must be real Masco compliance scenarios.

⚠️ Note to quiz generator: Do not state specific tax rates as definitive —
use "applicable rate" or "rate as per NBR" instead.

Write 10 scenario-based MCQs:

- Q1: We buy packaging materials locally and pay VAT to the supplier.
  Is this VAT our final cost, or can we recover it?
- Q2: A local supplier provides goods without a Mushak (VAT) invoice.
  We paid VAT to them in cash. Can we claim input tax credit?
- Q3: We import yarn under bond license. Customs AIT is collected.
  Which account does AIT go to — expense or asset?
- Q4: Our bond license requires us to export finished goods. We sold
  200kg of excess yarn locally to a small factory. What compliance risk does this create?
- Q5: We pay a consulting firm 200,000 BDT for business advisory services.
  TDS applies. The consultant insists we pay the full amount without deduction.
  What should Masco do?
- Q6: VAT input for January is 180,000 BDT. We have no local sales (100% export).
  Output VAT is 0. What happens to the 180,000 BDT VAT input?
- Q7: Year-end audit: NBR auditor asks to see all VAT invoices (Mushak) for
  the year. We have complete records for 10 months but 2 months are missing.
  What is the risk?
- Q8: WPPF is 5% of net profit. If this year's profit is 15,000,000 BDT,
  what is the total WPPF amount? (Give numerical options.)
- Q9: TDS was deducted from a supplier payment on January 15. By what approximate
  date should it be deposited to the government?
- Q10: An accountant suggests hardcoding the VAT rate as 15% directly in the
  software. Why is this a bad practice?

4 options. Answer Key with explanations.
```

---

---

## APPENDIX A: BANGLADESH RMG GLOSSARY

### PROMPT APP-A: Glossary

```
[PASTE MASTER CONTEXT BLOCK HERE]

Create a GLOSSARY of 60 terms for the accounting learning website.

Format as a table:
| Term | Plain English Definition (1 sentence max) | Masco Example |

IMPORTANT:
- Definitions must be in plain language (no accounting textbook language)
- Masco example must be specific to RMG factory context
- Do NOT use the term being defined in its own definition
- Flag Bangladesh-specific terms with [BD] marker

Include these term categories:

ACCOUNTING FUNDAMENTALS (15 terms):
Debit, Credit, Journal Entry, General Ledger, Subledger, Trial Balance,
Account Code, Accrual, Prepayment, Provision, Write-off, Reconciliation,
Period Closing, Chart of Accounts, Double Entry

PRODUCTION & COSTING (15 terms):
COGS (Cost of Goods Sold), WIP (Work in Process), Finished Goods,
Process Costing, Backflushing, BOM (Bill of Materials), Cost per Dozen,
Direct Labor, Indirect Labor, Factory Overhead, Cost Center,
Production Variance, Scrap, Yield, Standard Cost

RMG & TRADE TERMS (15 terms):
LC (Letter of Credit), Back-to-Back LC, Bill of Lading (B/L),
GRN (Goods Received Note), FOB (Free on Board), Usance, At-Sight,
GSM (Grams per Square Meter), Dozen, Style, Merchandiser,
Commercial Invoice, Packing List, Certificate of Origin, CIF

BANGLADESH-SPECIFIC [BD] (15 terms):
Bond License, Mushak, BIN (Business Identification Number),
WPPF (Workers' Profit Participation Fund), AIT (Advance Income Tax),
TDS (Tax Deduction at Source), NBR (National Board of Revenue),
Bangladesh Bank (BB), EX-BOND, VAT 4.3, Export Declaration,
Wage Board, Eid Bonus, Proforma Invoice, Bangladesh Garment Manufacturers
and Exporters Association (BGMEA)
```

---

## APPENDIX B: DOCUMENT TYPES REFERENCE

### PROMPT APP-B: Document Reference

```
[PASTE MASTER CONTEXT BLOCK HERE]

Create a COMPLETE DOCUMENT REFERENCE GUIDE for Masco Group's accounting system.

For each document, provide:
| Document Code | Document Name | Who Creates | Who Approves | What It Triggers | Accounting Impact | Retention Period |

Document list:

PURCHASE CYCLE:
PO, GRN, QC_REPORT, RETURN_GRN, SUPPLIER_INVOICE, DEBIT_NOTE, CREDIT_NOTE_RECEIVED

EXPORT CYCLE:
EXPORT_LC, EXPORT_INVOICE, PACKING_LIST, BILL_OF_LADING, CERTIFICATE_OF_ORIGIN,
AIRWAY_BILL (if air freight), BACK_TO_BACK_LC

PAYMENT CYCLE:
PAYMENT_VOUCHER, BANK_DEBIT_ADVICE, BANK_CREDIT_ADVICE, BANK_RECONCILIATION_STATEMENT

PAYROLL CYCLE:
ATTENDANCE_REGISTER, OVERTIME_REGISTER, SALARY_SHEET, WAGE_SLIP, BANK_TRANSFER_FILE

PRODUCTION CYCLE:
PRODUCTION_ORDER, MATERIAL_ISSUE_SLIP, PRODUCTION_OUTPUT_REPORT, QC_FINAL_PASS

TAX & COMPLIANCE:
VAT_MUSHAK_INVOICE, CUSTOMS_BILL_OF_ENTRY, AIT_RECEIPT, TDS_CHALLAN, BOND_RETURN

INTERNAL ACCOUNTING:
JOURNAL_VOUCHER, DEPRECIATION_SCHEDULE, BANK_RECONCILIATION, EXPENSE_CLAIM

Then add: DOCUMENT FLOW DIAGRAM (text-based with arrows) showing:
Import Purchase Flow: PO → GRN → INVOICE → PAYMENT
Export Flow: EXPORT_LC → EXPORT_INVOICE → B/L → BANK_CREDIT
Payroll Flow: ATTENDANCE → SALARY_SHEET → BANK_TRANSFER
```

---

## APPENDIX C: ROLE-BASED QUICK GUIDES

### PROMPT APP-C: Role Guides

```
[PASTE MASTER CONTEXT BLOCK HERE]

Create FOUR ROLE-BASED QUICK GUIDE PAGES for the accounting learning website.
Each guide must be practical and specific to that person's daily job at Masco.

For EACH role, structure the guide as follows:

A) YOUR ACCOUNTING TOUCHPOINTS
What data/documents do you provide to the accounting system?
What reports/data do you receive FROM the accounting system?

B) DAILY DECISIONS THAT AFFECT ACCOUNTING
List the 5 most common decisions this role makes that have accounting impact.
For EACH decision: "When you do [X], the accounting system does [Y]. If you do it wrong, [Z] happens."

C) WHAT YOU PROVIDE (Your Inputs to Accounting)
List documents/data you create. What fields matter most? What happens if wrong?

D) WHAT YOU USE (Accounting Outputs for Your Work)
Which reports do you read? What question does each report answer for you?

E) YOUR TOP 3 MOST COMMON MISTAKES
For each: What's the mistake → What's the accounting impact → How to fix it.

---

ROLE 1: COMMERCIAL OFFICER (LC, Export Invoices, Buyer Communication)
Key touchpoints: Export invoices, LC management, shipping documents, buyer claims

ROLE 2: PRODUCTION/WAREHOUSE SUPERVISOR (GRN, Material Issues, Production Output)
Key touchpoints: GRN creation, material issue, production output reporting, QC

ROLE 3: FINANCE/ACCOUNTS STAFF (Full picture — AP, AR, GL, reporting)
Key touchpoints: Invoice matching, payment processing, journal entries, period closing

ROLE 4: HR/PAYROLL OFFICER (Salary, Attendance, Compliance)
Key touchpoints: Attendance records, payroll calculation, compliance accruals


```

---

## APPENDIX D: CROSS-REFERENCE INDEX

### PROMPT APP-D: Cross-Reference

```
[PASTE MASTER CONTEXT BLOCK HERE]

Create a CROSS-REFERENCE MASTER INDEX — the "where to look" guide for the entire site.

---

SECTION 1: SCENARIO TO MODULE MAP
For each business scenario, identify which modules cover it.

| Scenario | Primary Module | Related Modules | System Requirement in | Key Document |

Include these 30 scenarios:
1. Yarn received from China (GRN)
2. Yarn quality rejected after GRN
3. Supplier invoice matched to GRN
4. Supplier short shipment
5. Payment to China supplier via LC
6. Exchange rate movement between invoice and payment
7. Back-to-back LC opened
8. Garment shipment to H&M (export invoice)
9. LC payment received from H&M
10. LC discrepancy — bank holds payment
11. Buyer claims discount
12. Monthly salary processed
13. Festival bonus accrual
14. WPPF calculation
15. Machine purchased from Korea
16. Monthly depreciation run
17. Machine sold/disposed
18. Knitting machine breakdown
19. Inventory physical count (with variance)
20. Backflushing at month-end
21. Process costing: COGS at shipment
22. Local packaging purchased (VAT applicable)
23. AIT paid at customs
24. TDS deducted from rent payment
25. Bond license monthly return
26. VAT input credit claim
27. Month-end foreign currency revaluation
28. Period closing sequence
29. Year-end financial statements
30. Duplicate invoice detected

---

SECTION 2: ACCOUNT CODE QUICK LOOKUP
For each common transaction, show account codes:
| Transaction | Debit Account Code | Credit Account Code |
(Cover 25 most common Masco transactions)

---

SECTION 3: WHO DOES WHAT — DEPARTMENT MAP
| Transaction | Initiating Department | Approving Department | Finance Action | Accounting Entry Trigger |
(Cover 20 key transaction types)

---

SECTION 4: COMPLIANCE CALENDAR
| Compliance Item | Frequency | Deadline | Responsible Role | Risk if Missed |
(Cover: VAT return, TDS deposit, TDS return, Bond return, BB realization tracking,
 WPPF payment, Festival bonus, Annual audit, AIT reconciliation)
```

---

## FINAL NOTES FOR SITE BUILD

### Prompt Execution Order (Recommended)

Run prompts in this sequence to build your site content:

```
Phase A (Foundation — build these first):
SITE-0 → 0-A → 0-B → 0-C → 1-A → 1-B → 1-C → 2-A → 2-B → 2-C

Phase B (Core Engine):
3-A → 3-B → 3-C → 4-A → 4-B → 4-C

Phase C (Production & Inventory):
5-A → 5-B → 5-C → 6-A → 6-B → 6-C

Phase D (Finance & Compliance):
7-A → 7-B → 7-C → 8-A → 8-B → 8-C
9-A → 9-B → 9-C → 10-A → 10-B → 10-C

Phase E (Reporting & Controls):
11-A → 11-B → 11-C → 12-A → 12-B → 12-C
13-A → 13-B → 13-C → 14-A → 14-B → 14-C

Phase F (Reference Materials):
APP-A → APP-B → APP-C → APP-D


```

### Cross-Check Rule

For Modules 4, 7, 14 (highest risk of error):
Run each A-prompt on Claude AND ChatGPT.
Where answers differ — the more conservative answer is safer for Bangladesh RMG context.
For tax rates (Module 14): ALWAYS verify independently at nbr.gov.bd before putting on site.

Note: Technical system requirements (database design, API specs) are maintained in a
separate developer document and are not part of this learning site.

### Site Version Control

Add this to every page footer:
"Last reviewed: [date]. Bangladesh NBR regulations as of [date].
Verify all tax rates and compliance deadlines before implementation."

---

*End of Prompt Library — Version 1.0 FINAL*
*Total prompts: 48 (14 modules × 3 prompts each + 4 appendices + 1 site intro)*
*Estimated content generation: 25–40 hours of AI output across all free accounts*
