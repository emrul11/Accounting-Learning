# Masco Accounting Learning Platform

A Head First–style learning platform that teaches the accounting knowledge
needed to build (and operate) an ERP accounting module — written for people
who have never studied accounting, using only Bangladesh RMG / Masco Group
examples.

This is a real, sellable training product: user accounts, role-based access,
individual progress tracking, **server-side quiz grading**, team reports with
CSV export, and plain static content that anyone can author.

---

## 1. Quick Start (development)

Prerequisites: **.NET 9 SDK** and **SQL Server** (any edition; LocalDB works too).

```powershell
# 1. Restore + build
dotnet build MascoLearning.slnx

# 2. Create/update the database (connection string below)
dotnet ef database update --project src\MascoLearning.Infrastructure --startup-project src\MascoLearning.Api

# 3. Run
dotnet run --project src\MascoLearning.Api
```

Open **http://localhost:5xxx** (the URL `dotnet run` prints).

Default seeded accounts (change immediately in any real deployment):

| Email | Password | Roles |
|---|---|---|
| `admin@masco.local` | `ChangeMe!2026` | Admin, Manager |
| `learner.demo@masco.local` | `Demo@2026` | Learner (demo) |
| `manager.demo@masco.local` | `Demo@2026` | Manager (demo) |
| `admin.demo@masco.local` | `Demo@2026` | Admin (demo) |

The three `.demo` accounts power the one-click "Try a demo account" panel on
the login page. Disable them for production with `"SeedDemoUsers": false` in
appsettings (or environment override).

On startup the app runs EF migrations automatically and seeds roles,
the admin account, and the module catalog (modules 0–15 + appendices A–D).

### Connection string

`src/MascoLearning.Api/appsettings.json`:

```json
"ConnectionStrings": {
  "Default": "Server=localhost;Database=MascoLearningDb;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=True"
}
```

For production, override via environment variable or config tool:

```powershell
# example: named SQL instance with SQL auth
ConnectionStrings__Default="Server=MASCO-SRV01\SQLEXPRESS;Database=MascoLearningDb;User Id=masco_app;Password=***;TrustServerCertificate=True"
```

### JWT secret (IMPORTANT)

The key in `appsettings.json` is a **development-only** placeholder.
In production set it from an environment variable (64+ random chars):

```powershell
Jwt__Key="<64+ random characters>"
```

Never commit the production key.

---

## 2. What This Project Is

```
Browser (static HTML/CSS/JS — no framework, no build step)
    │  fetch() + JSON   Authorization: Bearer <JWT>
    ▼
ASP.NET Core 9 Web API ──► Entity Framework Core ──► SQL Server
```

- **Frontend**: hand-written HTML/CSS/vanilla JS implementing a Head First
  learning design (mystery hooks, predict-before-reveal exercises, brain
  dumps, persona boxes, scenario quizzes). Served as static files by the API —
  one deployment, one origin, no CORS.
- **Backend**: ASP.NET Core Identity for accounts/password hashing/lockout,
  JWT bearer tokens for the frontend, EF Core code-first migrations.
- **Anti-cheat by design**: quiz questions live in JSON files served to the
  browser for *rendering*, but every submission is re-graded **on the server**
  against those same files before anything is saved. The client cannot report
  a fake score.

### Roles

| Role | Can do |
|---|---|
| Learner | Browse all content, take quizzes, see own dashboard/history |
| Manager | Everything above + team report, CSV export |
| Admin | Everything above + create users, deactivate users, reset passwords |

There is no self-registration — admins onboard staff (corporate training
model).

---

## 3. Repository Layout

```
├── MascoLearning.slnx                  # .NET solution
├── BUILD_PLAN.md                       # product & pedagogy plan (start here)
├── masco_accounting_site_prompts_GENERAL.md  # AI prompt library (source material)
├── src/
│   ├── MascoLearning.Api/              # Web API host
│   │   ├── Controllers/                # Auth, Users, Modules, Progress, Quizzes, Reports
│   │   ├── Services/QuizBank.cs        # loads + validates quiz banks, server-side grading input
│   │   ├── Program.cs                  # composition root (DI, auth, seeding)
│   │   └── wwwroot/                    # THE LEARNING SITE (static)
│   │       ├── index.html              # landing page
│   │       ├── login.html              # login
│   │       ├── dashboard.html          # learner progress dashboard
│   │       ├── admin/reports.html      # manager/admin team report
│   │       ├── modules/                # module pages + _template.html
│   │       │   └── data/*.json         # quiz banks (one per module)
│   │       ├── js/                     # api, auth, progress, exercises, quiz engine
│   │       └── styles/style.css        # design system incl. Head First components
│   ├── MascoLearning.Core/             # entities, enums, DTOs (no dependencies)
│   └── MascoLearning.Infrastructure/   # EF Core DbContext, Identity, JWT service, seeder
└── tests/MascoLearning.Api.Tests/      # xUnit tests (quiz bank rules, DB constraints)
```

---

## 4. HTTP API Reference

Interactive OpenAPI JSON (development): `/openapi/v1.json`

All endpoints return JSON. Errors use `{ "error": "...", "details": [...] }`.

### Auth — `/api/auth`
| Method | Route | Auth | Notes |
|---|---|---|---|
| POST | `/api/auth/login` | public | `{email, password}` → `{token, expiresAtUtc, user}` |
| GET | `/api/auth/me` | any | current profile |

Failed logins lock the account for 15 minutes after 5 attempts.

### Users (admin) — `/api/users`
| Method | Route | Notes |
|---|---|---|
| GET | `/api/users` | list with roles + completion counts |
| POST | `/api/users` | `{email, password, fullName, department, role}` — role ∈ Learner/Manager/Admin |
| PUT | `/api/users/{id}` | `{isActive?, department?, fullName?}` — cannot deactivate yourself |
| POST | `/api/users/{id}/reset-password` | `{newPassword}` — tokens issued **before** this moment are rejected on every later request |

### Built-in platform protections

- Login rate-limited per IP (10/min → HTTP 429) on top of Identity's 5-attempt lockout
- Admin user-mutation endpoints rate-limited separately
- Every authenticated request re-checks the account exists and is `IsActive` — deactivation cuts access immediately
- Password resets genuinely invalidate older JWTs (issue-time vs `PasswordChangedAtUtc` comparison)
- Quiz submissions are validated server-side (length + per-question bounds) before grading

### Learning — `/api/modules`, `/api/progress`, `/api/quizzes`
| Method | Route | Notes |
|---|---|---|
| GET | `/api/modules` | catalog with caller's status/best score |
| POST | `/api/progress/{code}/start` | marks Started (never downgrades Completed) |
| POST | `/api/quizzes/{code}/attempts` | `{selectedAnswers:[...]}` → **server-graded** result |

Attempt response: `{score, total, percentage, passMark, passed, gradedAnswers[]}`.
A passing attempt (≥ pass mark) automatically completes the module.

### Reports — `/api/reports`
| Method | Route | Auth | Notes |
|---|---|---|---|
| GET | `/api/reports/my` | any | own progress + last 20 attempts |
| GET | `/api/reports/team` | Manager/Admin | per-person summary rows |
| GET | `/api/reports/team/export` | Manager/Admin | same data as CSV download |

---

## 5. Authoring Content (the part non-developers do)

Each module = **one HTML page + one quiz bank JSON file**.

1. Copy `wwwroot/modules/_template.html` → `wwwroot/modules/module-XX.html`.
2. Fill the nine sections (mystery → big picture → lesson → your turn →
   worked example → recap → personas → quiz → what's next). Follow the tone
   rules at the top of `BUILD_PLAN.md` — conversational, Masco examples only,
   one big idea at a time.
3. Create `wwwroot/modules/data/module-XX.json`:

```json
{
  "moduleCode": "module-02",
  "passMark": 80,
  "questions": [
    {
      "scenario": "A real situation at the factory…",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correct": 2,
      "explanation": "Why option C is right.",
      "wrongExplanations": [
        "Why A is wrong (optional)",
        "Why B is wrong (optional)",
        "",
        "Why D is wrong (optional)"
      ]
    }
  ]
}
```

Rules enforced by the backend (`Services/QuizBank.cs`):
- 10 questions recommended; every question needs ≥2 options and a valid
  `correct` index, otherwise the whole bank is rejected (fail loudly, not subtly).
- `moduleCode` must match the filename slug (`a-z 0-9 -`).
- No tax rates hardcoded in content without a date + "verify at nbr.gov.bd" note.

Available interactive components (see existing modules for usage):
`.exercise/.exercise-answer` reveal boxes, `.balance-check` widget,
`.entry-builder` journal builder, `.hf-*` Head First boxes, `.diagram` blocks.

### Bangla (বাংলা) support — currently HIDDEN

All Bangla infrastructure is built and preserved but **disabled by product
decision** (translation quality pending native-speaker review). The switch is
one line in `wwwroot/js/i18n.js`:

```js
var LANGUAGES = ["en"];        // current: English-only
var LANGUAGES = ["en", "bn"];  // flip to re-enable everything below
```

What already exists and lights up automatically when enabled:
- **UI chrome** dictionaries (`js/i18n.js`), nav toggle, `data-i18n` attributes
- **Module key-concept panels** ("বাংলা সারসংক্ষেপ") in `js/bangla-summaries.js`
- **Bilingual quiz banks**: add `scenarioBn`, `optionsBn`, `explanationBn`,
  `wrongExplanationsBn` fields; `quiz.js` renders them when language is bn.
  `modules/data/module-00.json` is the complete working exemplar.
- **Server-side validation** of `wrongExplanationsBn` alignment (optional field,
  enforced when present)

Before enabling publicly: have the translations reviewed by a native speaker,
and translate the remaining quiz banks (01–14).

---

## 6. Testing

```powershell
dotnet test MascoLearning.slnx
```

Current coverage: quiz-bank validation rules (anti-cheat core), DB uniqueness
constraints (one progress row per user+module, unique module codes).
Add tests for new business rules — this suite is part of the sales story.

---

## 7. Deployment Checklist (production)

Already implemented in code: HSTS + HTTPS redirection (non-development),
login/admin rate limiting, `/health` database probe, active-user gate on every
request, reset-invalidation, quiz-bank structural validation, demo-user config
flag. Remaining operational items:

- [ ] Windows Server + IIS site (or Kestrel as a Windows service) with HTTPS certificate bound (redirect is on; the cert/port must exist)
- [ ] `Jwt__Key` set via environment/user secrets (64+ random chars) — dev key never used
- [ ] `"SeedDemoUsers": false` so demo accounts and their login-page panel are not created
- [ ] Strong seed-admin password set immediately after first login (Users page → reset password), or seed admin deactivated after creating a personal admin
- [ ] Connection string uses least-privilege SQL login (db_datareader/writer + DDL only during migrations)
- [ ] Automated nightly SQL Server backup job scheduled; restore tested once
- [ ] `ASPNETCORE_ENVIRONMENT=Production` (hides OpenAPI endpoint)
- [ ] Log retention configured; app logs free of PII (they are — verify nothing custom was added)

---

## 8. Roadmap (post-v1)

- [x] Modules 0–15 + Appendices A–D authored in Head First style (Module 15 is the capstone: one month at Masco)
- [x] Bangla toggle: UI chrome translated, per-module বাংলা key-concept panels,
      bilingual quiz banks supported (module-00 fully bilingual)
- [ ] Remaining quiz banks translated (scenarioBn/optionsBn/explanationBn fields)
- [ ] Full Bangla lesson translations
- [ ] Certificates on full-path completion (`Certificates` table already reserved)
- [ ] Question bank moved into the DB with admin UI (regrade historical attempts via stored `answers_json`)
- [ ] Multi-tenancy if selling to multiple companies
- [ ] Email notifications for managers when learners are stuck

### Running the pilot

The intended learner flow is:

1. **Modules 0 → 14**, in order. Each module builds on the previous one;
   Modules 0–4 are non-negotiable for any role.
2. **Module 15 (Capstone: One Month at Masco)** — fifteen real factory
   documents for March 2026 (LC opening, GRNs, payroll, supplier statement,
   duplicate invoice, missing GRN, export shipment, closing adjustments).
   Learner journals the month, reconciles the supplier, posts closing
   entries, and produces a tiny income statement and balance sheet.
3. **Competency checklist** (sign-off on the capstone page) — each
   persona (developer, commercial, warehouse, finance, HR) demonstrates
   the specific skills the ERP build needs from them, line by line.
4. **Team ready to build the accounting software** — only after the
   checklist is signed off does a contributor join an implementation
   stream. The capstone exists specifically to surface the gaps between
   "I read the module" and "I can close a real month".

The printable Practical Competency Checklist in Module 15 is the sign-off gate; quiz completion alone is not treated as readiness.

---

## 9. License & Ownership

Internal product of Masco Group (or the contracting entity). Content must be
reviewed by a qualified Chartered Accountant before commercial resale;
tax content carries a review-by date tied to the annual NBR budget.
