# Review Response: Teaching-Competence Upgrades

Implements all 5 recommendations from the external review of the MascoLearning
platform, per the user's scope choices: all 5 recommendations, static capstone
with reveal answers, spec worksheets for core modules (1, 2, 3, 4, 9, 13),
content fixes now with finance review afterwards.

## Goal

Turn "passed the quiz" into "demonstrated competence" for the MIS team before
they build accounting software:

1. Correct explanations that could become faulty software assumptions.
2. Add a complete practical capstone case (one fictional month of factory
   documents) with static, reveal-answer delivery.
3. Make learners produce software requirements (posting-spec worksheets) in
   the core modules.
4. Separate quiz completion from demonstrated competence (competency
   checklist + wording clarity).
5. Give beginners the destination earlier (financial-statements walkthrough
   in Module 1, detailed treatment stays in Module 11).

## Constraints

- Static frontend (no framework, no build step) served by the existing API —
  all new UI uses existing patterns (`hf-*` boxes, `.exercise` reveals,
  `.entry-builder`, `.balance-check`).
- No new NuGet packages, no new backend tables (static capstone per user
  choice). The only backend-adjacent change is one seeder catalog row.
- Quiz-bank JSON must satisfy `Services/QuizBank.cs` validation rules
  (moduleCode matches filename slug, >=2 options, valid correct index,
  wrongExplanations aligned with options and `wrongExplanationsBn` aligned
  when present).
- Bilingual fields exist in module-01's quiz bank; edits must keep English
  and Bangla in sync. New content is English-only (Bangla is hidden by
  product decision).
- No tax rates or dated NBR claims in new content.
- Content accuracy: verified fixes only; a finance-review checklist
  documents every touched claim for post-hoc human review (user decision).

## Chunks

### Chunk 1 — Correct faulty accounting claims (Review #1)

**Files changed:**
- `src/MascoLearning.Api/wwwroot/modules/data/module-01.json`
- `src/MascoLearning.Api/wwwroot/js/exercises.js`
- `src/MascoLearning.Api/wwwroot/modules/module-01.html` (lesson text audit)
- `.kimchi/docs/finance-review-checklist.md` (new)

**Depends on:** nothing.

**Work:**
1. `module-01.json` Q7 (line ~207): replace
   "S(debits) = S(credits) per entry, per account balance, per trial balance.
   Corruption and fraud break the equality loudly." with a correct
   statement: equality holds **per journal entry** and **across the trial
   balance**; individual accounts normally carry debit or credit balances —
   that is expected, not corruption. Update the Bangla `explanationBn` to
   match. Reword the "survives because it's a checksum" idea to say the
   checksum catches *arithmetic and posting asymmetries*, not fraud in
   general — most fraud is deliberately balanced.
2. `module-01.json` Q10 (line ~289): keep the out-of-balance scenario but
   soften "data corruption" phrasing to "an error somewhere — a missed
   line, a one-sided posting, a mistyped amount" so learners don't infer
   that imbalance => fraud. Update Bangla counterpart.
3. Add one new question to `module-01.json`: "Masco's books balance
   perfectly, but the auditor still finds an error" — teaching that a
   balanced trial balance does NOT prove correctness (errors of omission,
   wrong-account postings, reversed entries, duplicated entries all
   balance). Model it on the ACCA error-type distinction (errors a TB
   detects vs. does not).
4. `js/exercises.js` line 67: change
   `"Balanced. The entry can be posted."` to wording that separates
   arithmetic from truth, e.g.
   `"Balanced — the arithmetic check passes. (Balanced is not the same as
   correct: the checksum cannot catch a well-formed lie.)"`.
   Keep the out-of-balance branch unchanged.
5. Audit all 15 quiz banks and module HTML for the same failure pattern
   (grep: `per account balance`, `can be posted`, `fraud`, `corruption`,
   `never be`, `always be`) and correct any statement a developer could
   turn into a validation rule that is stronger than accounting warrants.
6. Create `.kimchi/docs/finance-review-checklist.md`: every claim edited
   or added in this chunk, with file/line and the correct-versus-wrong
   rationale, for the finance lead's post-hoc review.

**Accept when:** `dotnet test` passes (quiz-bank validation), the balance
widget's balanced branch no longer asserts postability, module-01 contains
an explicit "balanced is not correct" teaching moment.

**Test coverage:** existing xUnit quiz-bank tests; manual grep re-run
confirms no residual overclaims in the audited pattern list.

### Chunk 2 — Early destination walkthrough (Review #5)

**Files changed:**
- `src/MascoLearning.Api/wwwroot/modules/module-01.html`

**Depends on:** nothing (can parallel Chunk 1).

**Work:** add a "The Destination: One Transaction's Journey" section after
the lesson, before the recap/quiz: take ONE yarn purchase on LC and ONE
export shipment and show, in a simple two-column mini balance sheet +
four-line income statement, how each journal entry moves assets,
liabilities, profit, and cash. Keep it to ~1 screen; explicitly point
forward to Module 11 for the full treatment. Uses existing `.diagram`,
`.hf-*` components; a small static HTML table is fine.

**Accept when:** the section renders with existing styling, shows at least
one asset, one liability, one revenue, and one expense line changing in
response to the traced entries, and cross-links to module-11.html.

**Test coverage:** static content — verified by rendering the page during
the smoke run.

### Chunk 3 — Posting-spec worksheets (Review #3)

**Files changed:**
- `src/MascoLearning.Api/wwwroot/js/specsheet.js` (new component)
- `src/MascoLearning.Api/wwwroot/modules/module-01.html`, `module-02.html`,
  `module-03.html`, `module-04.html`, `module-09.html`, `module-13.html`
- `src/MascoLearning.Api/wwwroot/modules/_template.html` (document the
  component for future authors)

**Depends on:** nothing (can parallel Chunks 1-2; edits different files
except module-01.html, which Chunk 1/2 also touch — apply sequentially).

**Work:**
1. New `specsheet.js`: a `.spec-sheet` component — four prompts
   (What event triggers posting? Which accounts/amounts/dates? What
   approval & validation? What happens on cancellation, correction,
   retry?) each with a textarea the learner fills in BEFORE revealing a
   model answer (same predict-then-reveal pattern as `.exercise`).
   Include a "Copy for review" button that assembles the learner's four
   answers into clipboard text, so outputs can be collected and become the
   reviewed posting matrix.
2. Insert a "From Lesson to Software" spec-sheet section at the end of
   modules 01, 02, 03, 04, 09, 13, each with module-specific model answers
   (e.g. Module 4: GRN approval triggers Dr Inventory-Yarn / Cr AP with the
   GRN as source document; Module 13: short-shipment handling).
3. Register the script on those six pages.

**Accept when:** all six pages render working spec sheets with model
answers; the copy button produces coherent text; `_template.html` documents
usage.

**Test coverage:** manual smoke; no backend change to test.

### Chunk 4 — Capstone case study (Review #2)

**Files changed:**
- `src/MascoLearning.Infrastructure/Data/DbSeeder.cs` (catalog row)
- `src/MascoLearning.Api/wwwroot/modules/module-15.html` (new)
- `src/MascoLearning.Api/wwwroot/modules/data/module-15.json` (new)
- `src/MascoLearning.Api/wwwroot/index.html` (module table row)
- `README.md`, `BUILD_PLAN.md` (catalog/status updates)

**Depends on:** Chunk 1 (so the capstone's model answers use corrected
accounting language).

**Work:**
1. Seeder: add `("module-15", "Capstone: One Month at Masco", 15)` to
   `ModuleCatalog` (before the appendix rows). The seeder is idempotent —
   inserts only what is missing, no migration needed; startup auto-migrates.
2. `module-15.html`: "One Month at Masco" — a fictional month (say March
   2026) of ~12-15 factory documents: yarn LC purchases, GRNs (one
   short-received), production consumption issues, export sales invoices,
   payroll with TDS, a supplier return, a **duplicate invoice
   submission**, a **missing GRN** (learner must recognize it and write a
   query-note), a correction entry, VAT and bank payments. Tasks, in order:
   journalize the month -> reconcile the supplier statement -> make closing
   adjustments (consumption, depreciation) -> produce a simple income
   statement + balance sheet -> explain the results in plain language.
   Every task is predict-then-reveal using existing components
   (`.exercise-answer`, `.entry-builder`, `.balance-check`).
3. `module-15.json`: quiz bank (~10 questions) of error-spotting /
   scenario type — "which document justifies this entry?", "the duplicate
   invoice — what should the system have done?" — passMark 80, server
   graded like all other modules.
4. `index.html`: add the module-15 row to the static module table (the
   table is static HTML; status badges are JS-enhanced).
5. README/BUILD_PLAN: reflect the new module and the capstone's purpose.

**Accept when:** seeder adds the row on next startup; page renders; quiz
bank passes `QuizBank` validation; `dotnet test` green.

**Test coverage:** existing quiz-bank tests cover the new JSON; verify
catalog row appears via `/api/modules` in the smoke run.

### Chunk 5 — Competency checklist & completion-semantics clarity (Review #4)

**Files changed:**
- `src/MascoLearning.Api/wwwroot/modules/module-15.html` (checklist
  section — avoids a new route)
- `src/MascoLearning.Api/wwwroot/dashboard.html` (wording)
- `src/MascoLearning.Api/wwwroot/admin/reports.html` (wording)
- `README.md` (pilot instructions)

**Depends on:** Chunk 4 (the checklist references capstone tasks).

**Work:**
1. A printable "Practical Competency Checklist" (static, printable via
   print CSS): evidence items mapping to sign-off lines — journals
   correct, reconciliation found the duplicate, adjustments justified,
   statements tie to the trial balance, spec sheets collected and
   reviewed — with name/date/signature columns for manager + finance
   reviewer.
2. Wording in dashboard/reports: "Completed" badges gain a tooltip/legend
   line: "Completed = passed the module quiz. Demonstrated competence =
   capstone checklist signed by manager/finance." No DB or API change.
3. README: short "Running the pilot" section — the intended flow: modules
   -> spec sheets collected per module -> capstone -> checklist sign-off ->
   then the team is ready to specify/build the accounting software.

**Accept when:** checklist renders and is linked from module-15 and the
dashboard; wording clarifies completion is not competence.

**Test coverage:** static content; verified in smoke run.

## Verification Strategy

1. `dotnet build MascoLearning.slnx` — zero warnings introduced.
2. `dotnet test MascoLearning.slnx` — all existing tests pass (quiz-bank
   validation covers new/edited JSON).
3. Smoke run: `dotnet run --project src/MascoLearning.Api` -> verify
   `/api/modules` includes module-15, open module-01/09/13/15 pages, run
   one quiz submission against module-15's bank, confirm the balance
   widget's new wording.
4. Re-run the Chunk-1 grep audit after all edits — no residual overclaim
   patterns.
5. `finance-review-checklist.md` reviewed for completeness against every
   content edit made.

## Decision Log

- **Capstone as `module-15` (not an appendix):** gets catalog entry,
  server-graded quiz, progress tracking, and counts in team-report
  completion averages. Seeder is idempotent -> no migration.
- **Static reveal answers (user choice):** no submission/review backend.
  Competence evidence is human-collected via the printable checklist and
  the spec-sheet "copy for review" output. A server-side submission
  workflow is a recorded future option.
- **Spec sheets for modules 1, 2, 3, 4, 9, 13 (user choice):** these map
  to posting logic; remaining modules get the framework via
  `_template.html` documentation for later authoring.
- **Completion semantics left as-is:** quiz pass still sets Completed
  (the review called scores "weak evidence", not wrong); the fix is the
  checklist + wording, not a schema change.
- **Bangla:** edited bilingual quiz fields keep both languages in sync;
  all new content English-only, consistent with the hidden-Bangla policy.
- **Finance review after the fact (user choice):** every touched or new
  accounting claim is logged in the review checklist for sign-off.

## Risks

- **Content accuracy in new material** (capstone model answers, spec-sheet
  answers) — mitigated by sticking to patterns already taught in modules
  0-14, avoiding tax rates/dated claims, and the finance-review checklist.
- **Team-report denominator changes** from 15 to 16 modules
  (`totalCatalog` counts non-appendix rows) — intended, but managers will
  see completion averages dip until learners finish the capstone.
- **Authoring volume** — the capstone is the largest single piece; kept to
  one month, ~12-15 documents, five task groups, to stay reviewable.
- **Static index.html table drift** — the module table is hand-written;
  module-15 row must be added there or the page is unreachable from the
  landing page (linked from module-14's "next" and the checklist too).

## Open Questions

None blocking — all scope decisions answered by the user.
