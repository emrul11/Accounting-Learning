# MASCO ACCOUNTING LEARNING SITE — BUILD PLAN
## Head First Edition — Teaching Accounting to People Building the ERP

---

## 1. WHY THIS SITE EXISTS (THE MISSION)

Masco Group is building an ERP accounting module. The team building it — developers,
commercial officers, production staff, HR — mostly has **zero formal accounting
background**. Someone who cannot explain what a Chart of Accounts is or why a GRN
must create a journal entry **cannot help build this software**. They will guess,
guess wrong, and the wrongness gets baked into code and data.

This site fixes that. It takes a person from "I don't know what a debit is" to
"I can explain every posting rule in our posting matrix" using **Head First
learning principles** — because traditional textbook teaching fails busy adults
with no accounting background.

**Success definition:** a learner who finishes the site can:
1. Explain WHY each accounting rule exists (not just what it is)
2. Predict the journal entry for a real factory event before the system shows it
3. Spot when a requirement or a piece of code violates an accounting principle
4. Pass each module quiz at 8/10 or better

---

## 2. HEAD FIRST APPROACH — WHAT IT MEANS HERE

Head First books work because the brain learns best when it is **engaged, curious,
slightly challenged, and never bored**. Every page applies these rules:

| Head First Principle | How This Site Applies It |
|---|---|
| **Talk to the reader, don't lecture** | Second-person, conversational: "Imagine you just received 5,000 kg of yarn from China…" |
| **One big idea per page** | Each concept gets its own visual scene; never cram two ideas into one screen |
| **Visuals over prose** | Every concept gets a text/ASCII diagram, comic-style scene, or flow: `Event → Document → Department → Journal Entry` |
| **Redundancy on purpose** | The same idea appears as story, diagram, table, and exercise — repetition in different forms |
| **Make the brain think** | Exercises with blank spaces, "your turn" boxes, predict-the-entry challenges BEFORE revealing answers |
| **Emotion & surprise** | Real Masco drama: a late GRN causes a stock-out; an early revenue entry inflates profit and the buyer audit finds it |
| **"There are no dumb questions"** | FAQ boxes where the reader asks the confused question everyone is secretly thinking |
| **Interview the concepts** | "A Conversation with the General Ledger" — concepts talk about themselves in Q&A form |
| **Fireside chats / debates** | Two concepts argue: "Subledger vs GL — who's right when we disagree?" |
| **Mystery / puzzle hooks** | Each module opens with a mystery ("Why did Masco show ৳8.5M profit but have no cash?") solved by the module's end |
| **Metacognition** | "Brain dump" boxes: pause, recall, write down what you just learned before moving on |
| **Answer, then explain** | Quiz answers always explain WHY the wrong options are wrong, not just why the right one is right |

**Tone rules for all content:**
- Plain English. Short sentences. No jargon without immediate definition.
- Every example uses Masco's real world: yarn from China, H&M orders, LC payments,
  Gazipur factory floors, BDT/USD, NBR taxes.
- Humor allowed. Silliness allowed if it aids memory. Corporate stiffness forbidden.
- Bangladesh RMG context ALWAYS. No generic textbook examples.

---

## 3. AUDIENCE & PERSONAS

Content is written for the lowest common denominator: someone who has never seen
a balance sheet.

1. **Rafiq — Software Developer** — builds the posting engine; must know what his code means financially
2. **Nasrin — Commercial Officer** — handles LCs, export invoices; must know why B/L date matters
3. **Jamal — Warehouse/Production** — creates GRNs; must know why timeliness matters
4. **Shirin — Finance/Accounts** — will operate the system daily; needs the full picture
5. **Mizan — HR/Payroll** — processes salaries; must know direct vs indirect labor

Each module ends with a **"What this means for YOUR job"** box per persona.

---

## 4. CURRICULUM (LEARNING PATH)

Same 14-module spine plus Module 0 as the on-ramp, plus Module 15 as the
capstone month-end close. Each module = Lesson + Worked Example + Quiz +
Exercises + Persona box.

| # | Module | Core Question the Learner Must Answer |
|---|---|---|
| 0 | How Business Becomes Accounting | "How does a pile of yarn turn into numbers?" |
| 1 | Double-Entry Bookkeeping | "Why does every transaction have two sides — and why must they balance?" |
| 2 | Chart of Accounts | "What is a COA and why can't we build software without one?" |
| 3 | Subledger vs General Ledger | "Why track H&M separately AND one total for the bank?" |
| 4 | The Posting Engine | "How does clicking 'Approve GRN' create a journal entry?" ⭐ core module |
| 5 | Process Costing | "How does ৳100 of yarn become ৳180 of fabric become ৳250 of garment?" |
| 6 | Inventory & COGS | "When does inventory become an expense? (Only when we ship.)" |
| 7 | Foreign Currency & LC | "Why does one import have THREE exchange rates?" |
| 8 | Payroll & Labor Costs | "Which worker's salary is product cost and which is overhead?" |
| 9 | Accounts Payable & Receivable | "Who owes us? Who do we owe? How do we know we're safe?" |
| 10 | Fixed Assets | "A machine costs ৳50 lakh today but works 10 years — what happens to the numbers?" |
| 11 | Financial Statements | "What do the Balance Sheet, Income Statement, and Cash Flow actually say?" |
| 12 | Audit & Controls | "Why can't one person create AND approve a payment?" |
| 13 | Real-World Exceptions | "What happens when the shipment is short or the LC has a discrepancy?" |
| 14 | VAT & Tax (Bangladesh) | "What do NBR, VAT, AIT, TDS, and WPPF demand from our system?" |
| 15 | **Capstone: One Month at Masco** | "Can you close one full month at the factory?" — fifteen real factory documents (LC opening, GRNs, payroll, supplier statement, duplicate invoice, missing GRN, export shipment, closing adjustments) journalized, reconciled, adjusted, and reported end-to-end. Intended flow: modules 0–14 → module-15 capstone → per-persona competency checklist sign-off → team ready to build the ERP. |

**Appendices (quick reference, Head First style = cheat sheets & posters):**
- A: RMG Glossary (60 terms, plain language)
- B: Document Types (who creates, who approves, what it triggers)
- C: Role-Based Quick Guides
- D: Cross-Reference Index ("I have a yarn rejection — which module?")

---

## 5. PAGE ANATOMY — EVERY MODULE FOLLOWS THIS TEMPLATE

```
┌─────────────────────────────────────────────────────┐
│ 1. THE MYSTERY      A hook: a real Masco problem    │
│                     the learner can't yet solve     │
│ 2. THE BIG PICTURE  One full-width diagram of the   │
│                     whole process, with "YOU ARE    │
│                     HERE" marker                    │
│ 3. THE CONCEPT      Head First lesson: story first, │
│                     diagram, table, "no dumb        │
│                     questions" box                  │
│ 4. YOUR TURN        Exercise with blanks — learner  │
│                     predicts/writes BEFORE reveal   │
│ 5. WORKED EXAMPLE   Real numbers, real journal      │
│                     entries, step-by-step           │
│ 6. SHARPEN & RECAP  Brain dump box + key takeaway   │
│ 7. PERSONA BOX      "What this means for YOUR job"  │
│                     (5 personas)                    │
│ 8. THE QUIZ         10 scenario MCQs, instant       │
│                     feedback, explanations for      │
│                     every option                    │
│ 9. WHAT'S NEXT      Teaser for the next module      │
└─────────────────────────────────────────────────────┘
```

Interactive elements (JS):
- **Reveal-answer buttons** (click to flip exercise answers — no accidental spoilers)
- **Journal entry builder** (pick debit/credit accounts, must balance)
- **Quiz engine** (`js/quiz.js` extended with per-option explanations)
- **Progress tracking** (server-side via API — see Section 7)
- **Balance-check widget** (type entries, see live "out of balance!" warning)

---

## 6. FRONTEND — TECH & FILE STRUCTURE

Frontend stays a plain static site: HTML/CSS/vanilla JS. No framework, no build
step. It talks to the backend API (Section 7) for login and progress.

```
ACCOUNTING LEARNING/
├── index.html                 ← landing: mystery hook + learning path + login state
├── login.html                 ← NEW: login page
├── dashboard.html             ← NEW: learner's own progress view
├── admin/                     ← NEW: manager/admin reports (role-gated)
│   └── reports.html
├── modules/
│   ├── module-00.html … module-15.html  (15 is the capstone month-end close)
│   └── _template.html         ← the page anatomy above, ready to fill
├── appendices/
│   ├── appendix-a.html … appendix-d.html
├── js/
│   ├── quiz.js                ← quiz engine (exists, extend)
│   ├── exercises.js           ← NEW: reveal answers, entry builder
│   ├── api.js                 ← NEW: fetch wrapper, JWT handling
│   ├── auth.js                ← NEW: login/logout/session logic
│   └── progress.js            ← REWRITE: localStorage → API calls
├── styles/
│   └── style.css              ← extend: Head First visual language
├── BUILD_PLAN.md              ← this file
└── masco_accounting_site_prompts_GENERAL.md  ← existing prompt library (source material)
```

**Head First visual language (style.css):**
- Hand-drawn feel: rounded boxes, arrows, sticky-note styling for tips
- Distinct boxes: 💡 Tip, ⚠️ Watch out, ❓ No Dumb Questions, 🧠 Brain Dump,
  ✏️ Your Turn, 🗣️ Fireside Chat
- Color-coded: concept (blue), exercise (yellow), danger (red), success (green)
- Mobile-friendly (staff may read on phones)

---

## 7. BACKEND — .NET + SQL SERVER (LOGIN & PROGRESS TRACKING)

### 7.1 Architecture

```
Browser (static HTML/CSS/JS)
    │  fetch() + JSON, Authorization: Bearer <JWT>
    ▼
ASP.NET Core 8 Web API  ──►  EF Core  ──►  SQL Server
```

- **Backend:** ASP.NET Core 8 Web API (matches team skills: .NET + MSSQL)
- **Auth:** ASP.NET Core Identity for user storage/password hashing +
  JWT bearer tokens for the SPA-style static frontend
- **ORM:** Entity Framework Core (code-first migrations)
- **DB:** SQL Server (Express/Standard — whatever the company already licenses)
- **Docs:** Swagger/OpenAPI enabled in development

### 7.2 Solution Structure

```
src/
├── MascoLearning.Api/            ← Web API project (controllers, Program.cs)
├── MascoLearning.Core/           ← entities, interfaces, DTOs
├── MascoLearning.Infrastructure/ ← EF Core DbContext, migrations, repositories
└── MascoLearning.Api.Tests/      ← unit/integration tests (xUnit)
```

### 7.3 Database Schema

Identity provides `AspNetUsers`, `AspNetRoles` automatically. Custom tables:

```sql
Modules            (Id, Code 'module-04', Title, OrderNo, IsActive)
QuizAttempts       (Id, UserId FK, ModuleId FK, Score, Total,
                    AnswersJson, AttemptedAt)
Progress           (Id, UserId FK, ModuleId FK,
                    Status [NotStarted|Started|Completed],
                    LastAccessedAt, CompletedAt)
Certificates       (Id, UserId FK, IssuedAt, SerialNo)   -- later phase
```

Seeded on first run: 16 modules (0–15, including the capstone) + 4 appendices; one Admin account;
roles: `Admin`, `Manager`, `Learner`.

### 7.4 API Endpoints

| Method | Route | Who | Purpose |
|---|---|---|---|
| POST | `/api/auth/login` | public | returns JWT + user info |
| POST | `/api/auth/register` | Admin | create learners/managers |
| GET | `/api/me` | any logged-in | profile + overall progress |
| GET | `/api/modules` | any logged-in | module list w/ my status |
| POST | `/api/progress/{moduleCode}/start` | Learner | mark started |
| POST | `/api/progress/{moduleCode}/complete` | Learner | mark completed |
| POST | `/api/quizzes/{moduleCode}/attempts` | Learner | submit answers → score saved, returned |
| GET | `/api/reports/my` | Learner | own history |
| GET | `/api/reports/team` | Manager/Admin | all users' progress, scores, failures |
| GET | `/api/reports/team/export` | Manager/Admin | CSV export |

### 7.5 Security Musts

- Passwords hashed by Identity (PBKDF2) — never stored or logged in plain text
- HTTPS only; HTTP redirects to HTTPS
- JWT short expiry (~8h workday) + validation of issuer/audience
- Role-based `[Authorize(Roles="Admin")]` on management endpoints
- Login rate limiting (lockout after N failed attempts — Identity built-in)
- CORS locked to the site's own origin
- Secrets (DB password, JWT key) in configuration/user-secrets, never in git
- Automated daily SQL Server backup job; restore tested once before go-live

### 7.6 Deployment

- Windows Server + IIS (company standard) or Kestrel as Windows service
- Publish via `dotnet publish`; frontend served as static files from same site
- One environment to start (staging can be a second IIS site on same box)
- Seed script creates admin; first action: change default password

---

## 8. BUILD PHASES

### Phase 1 — Foundation (do first)
1. Extend `styles/style.css` with the Head First component library
2. Build `modules/_template.html` implementing the 9-part page anatomy
3. Build `js/exercises.js` (reveal answers, balance-check widget)
4. Extend `js/quiz.js` with per-option explanations
5. Rewrite `index.html` as Head First landing (mystery hook, path map, persona picker)
6. **Backend skeleton:** .NET solution, Identity + JWT login working, modules seeded,
   progress + attempts endpoints, Swagger verified
7. **Wire up:** `login.html`, `js/api.js`, `js/auth.js`, rewrite `js/progress.js`
   to call API; verify: complete a quiz on one PC, see progress on another
8. `dashboard.html` (learner view) + `admin/reports.html` (manager view, CSV export)

### Phase 2 — Core Modules (the spine)
9. Modules 0–4 (Module 4 Posting Engine gets the most effort) ⭐

### Phase 3 — Domain Modules
10. Modules 5–8 (Costing, Inventory/COGS, Forex/LC, Payroll)
11. Modules 9–11 (AP/AR, Fixed Assets, Financial Statements)

### Phase 4 — Reality & Compliance
12. Modules 12–14 (Audit & Controls, Exceptions, VAT & Tax)

### Phase 5 — Appendices & Polish
13. Appendices A–D, cross-links, mobile pass, certificates
14. Content QA: every example checked against Masco context; tax content dated
    and flagged for post-NBR-budget review; CA review of tax modules

**Content source:** existing content + the prompt library
(`masco_accounting_site_prompts_GENERAL.md`) provide raw material;
Head First re-authoring transforms it into the new format.

---

## 9. QUALITY BAR — EVERY PAGE MUST PASS

- [ ] Opens with a mystery/hook, not a definition
- [ ] At least one diagram per major concept
- [ ] At least one "predict before reveal" exercise
- [ ] "No dumb questions" box included
- [ ] All examples are Masco RMG / Bangladesh specific
- [ ] Persona box answers "why should I care?"
- [ ] Quiz: 10 scenario questions, every option explained; score saved to server
- [ ] Readable by someone with zero accounting background (test on a real person)
- [ ] No hardcoded tax rates; rates dated with "verify at nbr.gov.bd" warning

**Platform quality bar:**
- [ ] All endpoints authorize correctly (Learner cannot call Admin routes)
- [ ] Progress survives browser/device change (server-side truth)
- [ ] Backup restore tested; secrets not committed to git

---

## 10. OUT OF SCOPE (FOR NOW)

- Multi-company / multi-tenancy (single Masco deployment first)
- CMS (plain HTML files)
- Bangla translation (possible future phase)
- Discussion forum / chat
- The actual ERP accounting software itself (this site teaches the knowledge
  needed to build it — see the production-readiness plan separately)

---

## 11. STATUS

- [x] Build plan written (this file)
- [x] Phase 1 — Foundation (frontend components + .NET API + wiring)
- [x] All 16 modules (0–15, including capstone month-end close) authored Head First style with 10–11 question quiz banks
- [x] Appendices A–D authored
- [ ] Post-launch: CA review of tax content, Bangla translation, certificates, question bank in DB
- [x] per-persona competency checklist on Module 15 (printable 7-row checklist implemented in `module-15.html`, referenced from `dashboard.html` and `admin/reports.html`; pending human sign-off workflow to be wired in post-launch)
