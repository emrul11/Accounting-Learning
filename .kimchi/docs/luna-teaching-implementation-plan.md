# Luna Execution Guide — Accounting Teaching Upgrade

Date: 2026-09-14
Audience: GPT-5.6 Luna implementing the internal Masco accounting course.
Revision: 2 — incorporates the review of the proposed full-implementation plan.
Status: PLAN ONLY. No lesson implementation is completed by this guide.

## A. Read this first

The owner wants very clear, sufficiently detailed accounting teaching for MIS colleagues with no formal accounting background. They will later help build accounting software. Teaching quality matters more than scores, security, or learner-management features.

This file is the execution schedule. `teaching-upgrade-suggestions.md` remains the teaching specification. Use this guide's smaller batches instead of that document's larger phases. Do not lower its correctness, explanation, or verification standards. Direct user instructions and repository instructions take precedence. Preserve existing work.

This revision replaces the pasted “Kimchi as Sole Executor” proposal. GPT-5.6 Luna is the sole implementation executor. Use L00–L19 as the identifiers everywhere; the pasted C1–C20 identifiers map to them in order and must not become a second progress system. Existing completed work stays completed when supported by evidence.

Use the explicitly selected GPT-5.6 Luna. Do not start other agents or switch models automatically. Suggested starting reasoning setting: medium for lesson editing; consider high for a difficult reconciliation only if the owner chooses it. This is a workflow recommendation, not a guarantee of cost or quality. The official model page describes Luna as intended for cost-sensitive workloads: https://developers.openai.com/api/docs/models/gpt-5.6-luna (checked 2026-09-14). API pricing is not a promise about this app's subscription usage.

Cost efficiency means fewer unnecessary reads, narrower edits, reusable examples, and less rework. It does NOT mean shorter learner explanations, skipping checks, or copying a template without understanding the topic.

## B. Current baseline and exact first action

At the 2026-09-14 review:
- Recent edits were accuracy repairs in modules 2 and 15 and the capstone quiz.
- Module 1 had NOT received the deeper teaching rewrite.
- The progress record honestly described only partial Phase 0 work.
- Quiz JSON structure passed for 16 banks/162 questions, but that does not certify accounting content.
- The capstone includes opening and adjusted trial balances and a production-completion entry.
- Canonical story data and its arithmetic verification script were not yet present.

Two residual defects were observed:
1. Module 1 still says "any tampering breaks the balance and becomes visible instantly". Replace the claim with the distinction between arithmetic balance and correctness. Omission, duplication, or wrong-account entries can remain balanced.
2. Module 15's reconciliation prompt still says "books show a ৳3,10,000 credit balance". In Masco's AP account this is a debit balance representing an amount recoverable from the supplier. Match the surrounding corrected solution.

Recheck current source before fixing: another session may already have changed it. Search strings/headings, not historical line numbers. Do not undo prior repairs.

## C. Session protocol: one named batch

Default: complete ONE batch per user request, verify it, write the handoff, and stop at that intentional boundary. If the user explicitly asks to continue through several batches, continue in order and checkpoint between them. Do not stop at merely proposing implementation.

At session start:
1. Read applicable AGENTS.md, git status, this guide's shared rules, and the requested batch.
2. Read the latest progress entry, not the full chat history or every historical review.
3. Read only the relevant master-plan sections and the named module/quiz. Read dependencies only when the lesson relies on them.
4. State the concrete batch being implemented in one short update.
5. Edit the files, verify, then update progress with evidence.

Keep read-only independent searches batched where practical. Do not repeatedly print entire HTML files, CSS, or all quiz banks. Read each current module fully once before rewriting it; then use targeted excerpts. A module full read is necessary context, not waste.

Allowed changes: named module HTML/quiz; glossary entries directly used; small shared CSS/components if needed; progress notes. Preserve module codes, URLs, API contracts, existing script initialization, and useful examples unless an explicit teaching correction requires change. Avoid unrelated backend, authentication, deployment, or framework work.

File lists are expected scope, not absolute prohibitions. Related changes to canonical data, glossary, navigation, or shared styles are allowed when needed to complete the batch correctly. Record the reason for each additional file. Improve wording and sequence for clarity as well as correctness; preserve Module 1's ৳31,00,000 example unless a verified inconsistency requires changing it.

An existing .mjs file does not establish that Node is installed. Check the available runtime once. Prefer Node for the verifier; if unavailable, use an available appropriate runtime and record the actual command/path. Do not install dependencies or create a second verifier implementation merely to match a suggested filename.

Do not create a draft document and then repeat the same lesson in HTML: author the real lesson directly, using a brief outline in working notes. Do not keep replanning. No automatic commit, push, publish, or messages to colleagues.

## D. Content contract for every batch

A new concept needs: ordinary-language meaning, purpose, explicit assumptions, fully worked reasoning, misconception explanation, guided practice, independent practice, and one useful variation. Later examples reduce supplied reasoning. No fixed word minimum or maximum.

Expand until account choices, calculations, assumptions, report effects, and likely misconceptions are understandable. Break lengthy material into short sections with stopping points. The number of exercises follows difficulty and declared learning outcomes: one exercise may address several outcomes, and a difficult outcome may require several examples. Avoid duplicated exercises added solely to satisfy a count.

Entry explanation order:
Event → assumptions → before/after → account choice and type → increase/decrease → debit/credit reasoning → entry → balances/profit/cash → later event.

Use connected paragraphs. For example, do not merely say "Dr Inventory, Cr Payable." Explain why received yarn is an asset, why the unpaid amount is a liability, why cash is unchanged, which rules select the sides, and why later payment must not record inventory again.

Use debit-left/credit-right T-accounts with account type and ending balance. Teach that debit/credit direction depends on account type. Essential assumptions stay visible; optional alternative explanations may use reveal blocks or native details/summary.

Feedback explains what a wrong answer claims happened, not just "incorrect." Include questions such as "Why not Bank?" and "Why not an expense yet?" Introduce terms before relying on them. Do not make a learner solve accounting by guessing which long option sounds most official.

Do not apply a journal-entry ladder to every topic. Reconciliation needs evidence tracing; costing needs quantity/value flow; controls need risk/consequence reasoning. Accounting comes before its software implications.

### Existing Bengali content

Preserve existing Bengali fields and their alignment with options and answers. Do not remove translations for convenience. If an English change alters meaning, update the corresponding Bengali content only when confident, and record any review need. Otherwise record the exact affected file/question/field as pending and keep that untranslated revision unavailable in Bengali. Inspect existing language behavior before choosing a safe English fallback; do not expose contradictory answers or enable unfinished translations. If Bengali is already disabled, retain that setting and record the pending fields. This is alignment maintenance, not a new full-translation project.

### Accounting questions discovered during work

“No open questions” means none currently known, not that none can arise. Record new policy questions with the affected lesson, the conflicting treatments, assumptions, and references checked. A material error blocks acceptance of the affected content; it does not prevent work on independent lessons. Seek primary accounting sources for uncertain rules and current legal/tax claims. Never invent finance approval or silently treat a disputed policy as resolved.

## E. Batches in execution order

### L00 — Finish narrow accuracy repairs

Read: this guide B, latest progress, matching passages in Modules 1/15 and their quiz explanations.
Edit: module-01.html, module-15.html; relevant quiz only if conflicting wording exists; progress.
Tasks: fix the two residual claims; search those two modules and banks for remaining variants; confirm the solution and prompt agree. Do not start the full rewrite here.
Acceptance: no universal tampering-detection claim; supplier receivable correctly labeled; no changed amounts; touched JSON valid; diff limited to the fixes.
Handoff: L01.

### L01 — Module 1 core understanding

Read: Module 1 fully, its quiz, master plan sections 4 and 7, existing exercise/style components once.
Edit: Module 1 core lesson and worked examples; minimal CSS only if needed.
Tasks:
1. Add three or four outcomes: classify accounts, explain increases/decreases, build a purchase/payment entry, explain why balance is insufficient.
2. Add a linked roadmap and prerequisites. Define account, balance, asset, liability, equity, revenue, and expense in plain language before the rules table.
3. Explain left/right first, then account-type rules, then DEA-LER as a memory aid.
4. Rewrite the existing yarn receipt and later payment using the full reasoning sequence. Preserve the existing ৳31,00,000 amounts unless an actual inconsistency requires correction.
5. Show Inventory, AP, and Bank T-accounts with labeled opening balances or clearly labeled movement-only diagrams. Never subtract a payment from an unspecified zero opening bank.
6. Keep the current destination walkthrough accurate; do not silently merge it with the yarn example if openings/events differ. Label separate cases clearly.
7. Resolve the opening mystery in the lesson body.
Acceptance: a beginner can explain each chosen account and side from the visible prose; T-account movements match entries; no new advanced terminology without explanation; existing quiz and navigation still initialize. Recalculate and record all example openings, movements, and closing balances now using the available calculator/runtime. Do not wait for L06's reusable verifier.
Handoff: L02. This batch alone is not completion of Module 1.

### L02 — Module 1 practice and teaching review

Read: revised Module 1, current quiz, shared exercise behavior, master plan practice/verification sections.
Tasks:
- Add a guided receipt: classifications supplied; learner chooses direction and sides.
- Add an independent purchase using a different supplier/amount, with explicit ownership/payment assumptions.
- Add immediate-payment and partial-return variations with clearly specified timing relative to payment.
- Add a non-production office-service expense example to isolate expense versus asset without manufacturing-overhead ambiguity.
- For each solution show account reasoning and explain at least one plausible wrong entry.
- Add a mixed recall task and a balance-but-wrong example.
- Align quiz scenarios and feedback with taught concepts, including translated fields if present. No question-count target is required.
- Add explanatory support for existing entry builders; they are not substitutes for independent practice.
Acceptance: worked/guided/independent levels actually differ in support; solutions trace to the scenarios; no essential assumption hidden; desktop/narrow-screen review and keyboard controls checked. Recalculate new variations and preserve these expected results for consolidation into L06. Quiz count follows the revised content; update displayed counts rather than forcing exactly 11 questions.
Handoff: mark Module 1 editorially ready for pilot, or list exact unresolved defects. Pilot pending is not editorial failure. Next L03.

### L03 — Module 0 beginner orientation

Read: Module 0 and quiz, revised Module 1 introduction.
Tasks: explain event versus document versus entry; show before/after without requiring Dr/Cr mastery; distinguish documents that support postings from quotations/requests; define narration/GRN/LC; add guided and independent event classification with explanations; link to Module 1.
Acceptance: a beginner can answer "what changed and what evidence supports it?" without having studied debit/credit. Preserve simple preview entries but label them previews.

### L04 — Module 2 chart of accounts

Read: Module 2/quiz and relevant revised Module 1 entry.
Tasks: connect that entry to codes; explain code/name/type and why codes are company choices; distinguish GL accounts from supplier/customer detail; use an information need to explain dimensions; guided then independent classification; remove numbering inconsistencies.
Acceptance: accounts and codes agree everywhere, learner can explain the reporting consequence, no implication that every supplier needs its own GL account.

### L05 — Module 3 reconciliation

Read: Module 3/quiz and Module 2 account/detail distinction.
Tasks: show one source document in detail and summary; solve the opening mystery in the body; worked reconciliation then guided difference and independent investigation; explain corrections based on evidence rather than automatically trusting GL or subledger.
Acceptance: difference traced to identified records; correction preserves both layers; a before/after reconciliation actually agrees.

### L06 — Reusable pattern and story data

Read: revised foundations, master plan story section, capstone opening/entries/statements.
Tasks: update _template.html with flexible author guidance. Create teaching-story-ledger.md and modules/data/teaching-story.json as specified in the master plan. Give introductory cases and capstone separate case IDs/openings. Do not force unlike examples into a single month. Record account IDs, event/document IDs, dated assumptions, currency/unit/rate, journal lines, and expected checkpoints.
Create scripts/verify-teaching-story.mjs using Node if available. Calculate balances from openings plus movements; verify per-entry balance, checkpoints, inventory quantities/values where represented, and statement reconciliation. Deliberately alter a fixture value in memory to show the check detects a mismatch; do not leave corrupted files.
Acceptance: reproducible data, actual calculations, no balancing plugs, clear mapping from displayed figures to case checkpoints. No runtime refactor of the learning site is necessary.

### L07–L17 — One module per batch

Each batch reads only its module/quiz and necessary story/prerequisite excerpts. Apply contract D, update story data only when the case changes, and perform checks F.

| Batch | Module | Required worked/guided/independent focus |
|---|---|---|
| L07 | 4 Posting engine | Familiar accounting entry → posting rule; source event/date/accounts; duplicate retry; correction; accounting before implementation |
| L08 | 5 Process costing | Quantities plus material/labor/overhead; WIP; complete cost schedule; explicit allocation assumptions |
| L09 | 6 Inventory/COGS | Yarn → WIP → FG → COGS; cost and quantities; remaining stock; why payment/issue/sale differ |
| L10 | 7 FX/LC | LC opening/margin versus debt; initial rate/revaluation/settlement; trace each change separately |
| L11 | 8 Payroll | Gross/net/withholding/payable; accrual/payment; production versus administration labor |
| L12 | 9 AP/AR | Invoice allocation, partial payments, returns before/after payment, aging, supplier debit balance |
| L13 | 10 Fixed assets | Cost/useful life/residual value; depreciation/accumulated depreciation; disposal; production-cost connection |
| L14 | 11 Statements | Reconciled trial balance → statement lines; profit into equity once; numerical profit-to-cash bridge |
| L15 | 12 Controls | Balanced wrong posting → risk → control → evidence; investigated exception and correction |
| L16 | 13 Exceptions | Normal case and one changed condition; missing evidence, event/creation/posting dates, period controls |
| L17 | 14 VAT/tax | Who owes whom; price/tax separation; stated example assumptions; verified dated references; no invented universal rates |

For every row: map major outcomes to worked reasoning, guided practice, independent application, misconception feedback, and useful variations. Shared exercises may cover related outcomes; difficult concepts may need additional examples. This is a content requirement, not merely adding headings or meeting a numerical quota. Split a batch into named parts only if the lesson cannot be completed coherently within the session; document the remaining sections exactly.

### Dependency rules

The listed order is the default working order. The executor is still one agent; this table allows independent work to proceed when a particular lesson has an unresolved issue, without requiring every earlier batch to finish first.

| Batch | Required foundation |
|---|---|
| L00 | Current source and latest progress |
| L01 | L00 fixes affecting Module 1 |
| L02 | L01 |
| L03 | L02 reference lesson |
| L04 | L02; verify Module 0 prerequisite wording if L03 is pending |
| L05 | L04 |
| L06 | L02–L05 examples and current capstone dataset |
| L07 | L05, L06 |
| L08 | L02, L06 |
| L09 | L08 |
| L10 | L05, L06; recap payable/receivable basics if needed |
| L11 | L08, L06 |
| L12 | L05, L06 |
| L13 | L02, L06; L08 for production-cost allocation examples |
| L14 | L09, L12, L13; any FX/payroll examples depend on L10/L11 |
| L15 | L07, L05 |
| L16 | L12, L15; additional prerequisites depend on exceptions selected |
| L17 | L12, L11 for withholding examples |
| L18 | All revised lessons used in its case, L06, L14 |
| L19 | L00–L18 implemented; outstanding review items explicitly tracked |

If an upstream example changes after its consumer was edited, check only the affected downstream references and figures. Document deferred prerequisites; do not mark a dependent lesson complete while its required explanation remains absent.

### L18 — Capstone teaching integration

Read: complete Module 15 and bank; canonical case and cost assumptions.
Tasks: source pack contains all inputs before exercises; opening balances complete; optional hints link to prerequisites; complete model solution follows the attempt; reconciliation and statements trace to entries; add numeric profit-to-cash bridge. Distinguish supplier statement viewpoints and ledger balances.
Resolve the manufacturing-cost treatment before presenting the case as a realistic full factory close. An explicit simplified materials-only case must be labeled limited practice; do not claim it demonstrates full absorption costing. If a policy decision remains unresolved, record it and complete independent content work rather than inventing finance approval.
Keep the current materials-only case as limited transaction-flow and closing practice while full treatment awaits finance review. Put that limitation before the document pack, not only inside the solution. Add a separate conceptual exercise asking which applicable production labor/overhead costs would enter WIP/finished goods and what additional allocation data would be needed. Link to the fully worked costing lesson. Do not suggest that merely labeling a shortcut makes it a complete realistic manufacturing close.
Acceptance: all balances derived, all tasks answerable from supplied data, learner can follow the complete solution, no contradictory quiz explanation; the scope limitation and full-costing bridge are visible. Finance review of the fuller capstone is a tracked external item. Do not invent revised allocations to force completion.

### L19 — Integration and learner pilot pack

Read: outcomes/progress tables and links rather than blindly rereading all content; inspect complete sections where a mismatch appears.
Tasks: navigation/prerequisites/glossary consistency; story arithmetic; quiz validation; shared UI regression; prepare pilot sheet with task, learner reasoning, help needed, misunderstanding, proposed repair. Include two new variations not identical to the worked examples.
Do not contact colleagues without authorization. Pilot can start after L02; it need not wait for L19. When feedback arrives, fix repeated misunderstandings in a narrowly scoped follow-up.
Acceptance: editorial evidence and unresolved finance/browser/pilot items stated separately. Never award 9.5 solely because checklist boxes exist.

Completion stages:
- Implemented: requested lesson changes exist, with pending checks listed.
- Editorially verified: changed explanations and answers reviewed, arithmetic and required technical/render checks completed, and no known material errors in the delivered scope.
- Finance reviewed: an actual reviewer has checked the policy-sensitive content; name/date/scope recorded only when supplied.
- Pilot tested: beginners have attempted unfamiliar variations; observed results and follow-up changes recorded.
- 9.5 target supported: the master rubric, accounting review, and pilot evidence support that judgment. A restricted capstone and unreviewed policy questions must remain visible limitations. Do not turn a target into an automatic rating.

It is valid to finish implementation while finance review or colleague availability is pending. The final report must state precisely which completion stage has been reached.

## F. Verification that is worth the cost

Every batch:
1. Inspect its diff for accidental removal of scripts, IDs, useful content, or unrelated edits.
2. Recalculate every changed numerical example, including wrong-answer explanations.
3. Parse touched JSON and check correct index, option/explanation lengths, and translation alignment.
4. Check new local links/anchors and duplicate IDs.
5. Inspect actual rendered content after layout changes; follow applicable browser skills/tool instructions. Check desktop/narrow width, tables/T-accounts, keyboard reveal behavior. A local static preview is sufficient for lessons; do not troubleshoot SQL Server just to inspect prose.
6. Run node --check only for changed JS; story arithmetic checks when relevant. Backend tests are needed if backend code changes, not for every paragraph edit.

At L19 validate all 16 quiz banks structurally, and review the meaning of every question/answer changed during the upgrade. Spot-checking a few changed answers is insufficient. Recheck canonical figures wherever displayed in lessons and quizzes: a passing data verifier does not validate copied HTML. Limit the broader untouched-content review to unresolved findings and integration dependencies, and state its coverage.

Create a reusable content-check script once if repeated checks justify it; do not write a new test framework. Do not repeat successful checks without new changes or an unresolved concern. If a tool is unavailable, record the exact unchecked item and continue independent verification. Do not call unrendered content visually verified.

After L02, L06, and L18, review the result against the master rubric. Human finance review is especially valuable for costing, tax, and recognition; a stronger model review is optional and requires the owner's choice. No automatic paid review loops. If two attempts fail to resolve the same accounting question, record the evidence and specific question, avoid unsupported edits, and continue separable tasks.

## G. Durable progress: keep the next session small

Append/update one compact entry in teaching-upgrade-progress.md:

Batch: Lxx
Status: not started / in progress / implemented-unverified / verified-editorially
Files changed:
Teaching outcomes added:
Examples and case IDs:
Checks actually run and results:
Additional files changed and why:
Pending translation fields (if any):
Unverified or finance/pilot questions:
Next batch and exact starting section:

Do not mark partial work complete. Distinguish “all requested edits made” from “browser checked” and “finance/pilot reviewed.” Preserve earlier progress history; correct overclaims explicitly instead of deleting them silently.

End the chat in about 150 words: batch completed, teaching changes, actual verification, limitations, next batch. The learner materials may be extensive even when the agent's progress summary is brief.

## H. Copy-ready prompts

### First Luna session

Use GPT-5.6 Luna. Read `.kimchi/docs/luna-teaching-implementation-plan.md` and relevant repository instructions. Execute batch L00 only, preserving existing work. Do not rewrite the plan or re-audit the entire repository. Fix confirmed residual claims, run the listed checks, update `.kimchi/docs/teaching-upgrade-progress.md`, and report the next batch. Teaching clarity and correctness are the priority; do not add backend or score-tracking features.

### Next session (change the batch ID)

Use GPT-5.6 Luna. Implement batch L01 from `.kimchi/docs/luna-teaching-implementation-plan.md`. Read its shared teaching contract and the latest progress entry, then only the relevant master-plan sections and source files. Complete the actual lesson edits and checks, preserve unrelated changes, and update the handoff. Give patient, complete learner explanations; save cost through narrow scope and reusable work, not shortened teaching. Stop after this batch is complete. Record unavailable verification honestly.

### Resume an interrupted batch

Read the latest teaching-upgrade-progress.md entry and resume its in-progress Luna batch from the recorded section. Inspect the current diff before editing. Do not repeat completed rewrites or successful checks unless subsequent changes invalidate them. Finish the batch, verify it, and record the next action.

### Implement the full plan across resumable work

Use GPT-5.6 Luna as the sole executor of `.kimchi/docs/luna-teaching-implementation-plan.md` revision 2. Inspect current instructions and progress, resume the first unfinished eligible batch, and continue through subsequent eligible batches with checkpoints. Implement and verify actual teaching changes; do not re-plan or switch models. Preserve existing Bengali content and keep changed answers aligned or safely unavailable pending review. Give learners complete, patient explanations. Record exact resume points if the session ends, and distinguish implementation, editorial checks, finance review, and pilot evidence. Do not publish or commit automatically.

### Optional milestone review

Review completed batches L01–L05 against the teaching rubric. Focus on reasoning gaps, inconsistent examples, misleading simplifications, and missing practice progression. Report concrete locations and the smallest repairs. Do not redesign the course or start unrequested implementation. Distinguish editorial findings from learner-pilot evidence.
