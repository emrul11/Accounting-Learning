# MascoLearning Code Review

## Verdict: NEEDS_FIXES

The project has a solid layered foundation, clean composition, and a good server-side grading model, but it has correctness, security, and production-readiness gaps that must be addressed before release.

## Rating: C

A cleanly structured prototype with working architecture and good content coverage, but it ships with active security gaps (token invalidation, deactivated-user access), a hardcoded frontend pass mark, race conditions, missing validation, and an incomplete production checklist that prevent approval as-is.

## Issues

1. **Password reset does not invalidate existing JWTs**
   - File: `/mnt/d/emrul/ACCOUNTING LEARNING/src/MascoLearning.Api/Controllers/UsersController.cs`
   - Line: 89 (`await _users.UpdateSecurityStampAsync(user);`)
   - Description: `UpdateSecurityStampAsync` updates the stamp, but the JWT bearer middleware does not check the Identity security stamp on every request. Self-contained tokens issued before the reset remain valid until their 12-hour expiry. A user whose password was reset by an admin (e.g. after suspected compromise) can still use old tokens.
   - Suggested fix: Either (a) reduce token lifetime to a short value plus refresh tokens, or (b) add a custom `SecurityStampValidator`-style event on the JWT bearer options (`TokenValidated`) that rejects tokens whose `iat`/`SecurityStamp` predates the user's current stamp. Document the chosen behavior. The API docs already claim reset "invalidates existing tokens"; make that true.

2. **Deactivated users can still call APIs with a valid token**
   - File: `/mnt/d/emrul/ACCOUNTING LEARNING/src/MascoLearning.Api/Controllers/AuthController.cs`
   - Lines: 60-74 (`Me`), and implicitly all `[Authorize]` controllers
   - Description: `AuthController.Me` does not check `IsActive`; more importantly, no middleware or policy validates the `IsActive` flag for authenticated requests. A deactivated user's JWT continues to work across the API until expiry.
   - Suggested fix: Add a requirement/policy (e.g. `ActiveUserRequirement`) or a `TokenValidated` event that checks `user.IsActive` and rejects the request with 401 when false. Apply it globally or to all `[Authorize]` endpoints.

3. **Frontend uses hardcoded 80% pass mark instead of the bank's configured passMark**
   - File: `/mnt/d/emrul/ACCOUNTING LEARNING/src/MascoLearning.Api/wwwroot/js/quiz.js`
   - Line: ~480 (`const passed = percentage >= 80;` inside `showResults`)
   - Description: The server grades against `bank.passMark`, but `quiz.js` always considers 80% as passing when displaying the result banner, feedback text, and completion state. If an author sets `passMark` to 70 or 90, the learner will see inconsistent pass/fail messaging.
   - Suggested fix: Store the loaded `passMark` on the engine instance and use `percentage >= this.passMark` in `showResults`. Remove the hardcoded `80`.

4. **Progress endpoints are vulnerable to duplicate-row race conditions**
   - Files:
     - `/mnt/d/emrul/ACCOUNTING LEARNING/src/MascoLearning.Api/Controllers/ProgressController.cs` lines 35-55
     - `/mnt/d/emrul/ACCOUNTING LEARNING/src/MascoLearning.Api/Controllers/QuizzesController.cs` lines 97-124 (`UpsertProgressAsync`)
   - Description: Both paths read `FirstOrDefaultAsync` and then add a new record if none exists. Under concurrent requests (e.g. module page `start` and quiz `submit` fired together), two inserts can race and one will hit the unique index on `(UserId, ModuleId)`, producing a 500 `DbUpdateException`.
   - Suggested fix: Wrap the read-modify-write in a serializable transaction or use a database-side upsert (`MERGE` / `INSERT ... ON CONFLICT` / `ExecuteUpdate` with retry). At minimum, catch the unique-constraint violation and retry once.

5. **Quiz submission does not validate null answers and accepts indices larger than a question's option count**
   - File: `/mnt/d/emrul/ACCOUNTING LEARNING/src/MascoLearning.Api/Controllers/QuizzesController.cs`
   - Lines: 55-65
   - Description: `request.SelectedAnswers.Count` and `Any(...)` will throw `NullReferenceException` if the client omits `selectedAnswers`. The range check `> 5` is arbitrary and allows, for example, index `5` for a two-option question; grading marks it wrong, but the API should reject malformed input early.
   - Suggested fix: Add `[Required]`/`[MinLength]`/`[MaxLength]` attributes to `SubmitAttemptRequest`, or explicit null/length checks. Validate each answer index against `bank.Questions[i].Options.Count` and reject with 400 if any index is out of range.

6. **User-management DTOs lack validation attributes**
   - File: `/mnt/d/emrul/ACCOUNTING LEARNING/src/MascoLearning.Core/DTOs/AdminDtos.cs`
   - Description: `CreateUserRequest`, `UpdateUserRequest`, and `ResetPasswordRequest` contain non-nullable `string` properties but no `[Required]`, `[EmailAddress]`, `[MinLength]`, or `[RegularExpression]` attributes. The controller trims values blindly, so null inputs can cause `NullReferenceException`, and admins can reset passwords to weak values because the DTO does not enforce the same rules as `PasswordOptions`.
   - Suggested fix: Add data-annotation validation to the DTOs. `CreateUserRequest.Email` should require an email address, `Password`/`NewPassword` should require min 8 chars, a digit, and an uppercase letter (matching Identity options), and `Role` should be required.

7. **Auth DTOs lack validation**
   - File: `/mnt/d/emrul/ACCOUNTING LEARNING/src/MascoLearning.Api/wwwroot/js/auth.js`
   - Related backend file: `/mnt/d/emrul/ACCOUNTING LEARNING/src/MascoLearning.Core/DTOs/AuthDtos.cs`
   - Description: `LoginRequest` has no `[Required]` or `[EmailAddress]` validation. While the controller does not crash on null email, relying on implicit behavior is brittle and allows clearly invalid payloads through.
   - Suggested fix: Add `[Required]` and `[EmailAddress]` to `LoginRequest.Email` and `[Required]`/`[DataType(DataType.Password)]` to `LoginRequest.Password`.

8. **No HTTPS / HSTS / security headers configured**
   - File: `/mnt/d/emrul/ACCOUNTING LEARNING/src/MascoLearning.Api/Program.cs`
   - Description: The production checklist requires HTTPS redirection, but the pipeline has no `UseHsts()`, `UseHttpsRedirection()`, `Strict-Transport-Security` header, or other security headers (CSP, X-Frame-Options, etc.).
   - Suggested fix: Add `app.UseHsts()` and `app.UseHttpsRedirection()` (outside development). Consider adding a security-headers middleware for CSP and framing protection.

9. **No rate limiting / API throttling**
   - File: `/mnt/d/emrul/ACCOUNTING LEARNING/src/MascoLearning.Api/Program.cs`
   - Description: Identity lockout protects only the login endpoint. There is no global or endpoint-level rate limiting, so endpoints such as `POST /api/auth/login`, `/api/users/{id}/reset-password`, or quiz submissions can be brute-forced or spammed.
   - Suggested fix: Add `AddRateLimiter` with a fixed-window or sliding-window policy, at minimum for `/api/auth/login` and the user-management endpoints.

10. **No application health checks or production logging configuration**
    - File: `/mnt/d/emrul/ACCOUNTING LEARNING/src/MascoLearning.Api/Program.cs` and `appsettings.json`
    - Description: There is no health-check endpoint, no structured logging provider, and no log retention. The README checklist mentions log retention and PII verification, but nothing is wired.
    - Suggested fix: Add `services.AddHealthChecks()` with a database-check probe. Configure a persistent logging provider (e.g. Serilog to rolling files or Application Insights) and a short retention policy. Add `appsettings.Production.json` to the deployment docs.

11. **Quiz attempt and progress tables lack foreign keys to AspNetUsers**
    - File: `/mnt/d/emrul/ACCOUNTING LEARNING/src/MascoLearning.Infrastructure/Data/AppDbContext.cs`
    - Description: `ProgressRecord.UserId` and `QuizAttempt.UserId` are stored as `nvarchar(450)` but are not configured as foreign keys to `AspNetUsers`. This removes referential integrity: deleting a user leaves orphan progress/attempt rows, and invalid `UserId` values can be inserted.
    - Suggested fix: Add `HasOne<AppUser>().WithMany().HasForeignKey(...)` mappings for both entities, choosing `Restrict` or `Cascade` delete as appropriate.

12. **Test coverage is too narrow for the feature set**
    - File: `/mnt/d/emrul/ACCOUNTING LEARNING/tests/MascoLearning.Api.Tests/*.cs`
    - Description: Existing tests cover quiz-bank parsing and DB uniqueness constraints only. They do not cover auth/authorization, role-based access, inactive-user denial, password-reset token invalidation, progress state transitions, server-side grading correctness, pass-mark edge cases, report aggregation, CSV export, or admin self-deactivation guard.
    - Suggested fix: Add controller integration tests using `WebApplicationFactory`, an in-memory SQLite or test-container database, and JWT token generation. Prioritize: (a) deactivated users cannot access endpoints, (b) learners cannot hit manager/admin routes, (c) passing/failing quiz attempts produce correct progress state, (d) admin cannot deactivate self, (e) grading ignores client-reported scores.

13. **`UsersController.Create` can throw on missing role/email/password due to trimming**
    - File: `/mnt/d/emrul/ACCOUNTING LEARNING/src/MascoLearning.Api/Controllers/UsersController.cs`
    - Lines: 42-46
    - Description: `request.Role.Trim()`, `request.Email.Trim()`, and `request.Password` are dereferenced before validation. If the DTO is malformed, the response is an unhandled 500 instead of a 400 with field-level errors.
    - Suggested fix: Implement the DTO validation attributes recommended in issue 6 and add `if (!ModelState.IsValid) return BadRequest(ModelState);` to the action. Remove direct trimming by moving normalization into the DTO or a helper.

14. **Duplicate user-id parsing logic across controllers**
    - Files: multiple controllers (`ModulesController.cs`, `ProgressController.cs`, `QuizzesController.cs`, `ReportsController.cs`, `UsersController.cs`)
    - Description: Each controller repeats `User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)!.Value` (or similar). This is error-prone and complicates global policy changes such as adding `IsActive` checks.
    - Suggested fix: Add an extension method `string UserId(this ClaimsPrincipal user)` or `CurrentUserId(this ControllerBase controller)` in the API project and use it everywhere.

15. **Frontend result display trusts local score before server response**
    - File: `/mnt/d/emrul/ACCOUNTING LEARNING/src/MascoLearning.Api/wwwroot/js/quiz.js`
    - Lines: 470-520 (`showResults`)
    - Description: The UI renders pass/fail banners using the locally computed percentage before the server returns the authoritative result. Although the server verdict is shown afterward, a slow network can leave the user seeing the local verdict for a noticeable period. More importantly, the `localPercentage` argument passed to `submitToServer` is ignored.
    - Suggested fix: Await the server result before rendering the final panel, or render a "grading..." state. Remove the unused `localPercentage` parameter or use it only for an optimistic progress bar.

16. **Server quiz bank accepts pass marks outside 0-100 via raw JSON before clamping**
    - File: `/mnt/d/emrul/ACCOUNTING LEARNING/src/MascoLearning.Api/Services/QuizBank.cs`
    - Line: 67 (`Math.Clamp(raw.PassMark ?? 80, 0, 100)`)
    - Description: Clamping silently changes an author's invalid `passMark` (e.g. 150). The server then uses 100 while the JSON file still says 150, creating a mismatch if a future version stops clamping. A missing `passMark` also silently defaults to 80.
    - Suggested fix: Reject banks with `passMark` missing or outside 0-100 and return `null` / log a warning, rather than silently correcting them. The validation loop already rejects bad questions; extend it to validate `passMark`.

17. **Demo account passwords are hardcoded in the frontend login page**
    - File: `/mnt/d/emrul/ACCOUNTING LEARNING/src/MascoLearning.Api/wwwroot/login.html`
    - Lines: 67-75
    - Description: `data-pass="Demo@2026"` for each demo chip exposes the shared demo password in source control and page HTML, even though the README says demo accounts are disabled in production via config. A production deployment that accidentally enables demo users leaks credentials in the page source.
    - Suggested fix: Remove the password from the markup. Populate demo credentials via a small server-rendered endpoint or a separate demo-login API call that does not expose the password in HTML. Ensure `SeedDemoUsers` is documented as required to be `false` in production and add a startup warning log when demo users are seeded.

## Strengths

- Clean layered dependency graph: `Api -> Infrastructure -> Core`, with `Core` having no external dependencies.
- `Program.cs` is a readable, well-commented composition root; OpenAPI is correctly limited to development.
- Server-side quiz grading is implemented correctly and consistently: the browser cannot report a fake score because the server recomputes against the same JSON bank.
- Path-traversal protection in `FileSystemQuizBank` rejects unsafe module slugs before touching the file system.
- Identity password and lockout options are sensible for a corporate training tool.
- The module catalog, roles, and admin account are seeded idempotently on startup.
- Static frontend is served from the same origin as the API, eliminating CORS complexity.
- Bangla i18n infrastructure and bilingual quiz-bank fields are already wired and ready to enable once the product decision changes `LANGUAGES`.
- The content scope is complete: all 15 modules and 4 appendices authored with Head First structure, plus a fully bilingual exemplar bank (`module-00.json`).

## Production-Readiness Summary

Based on the README deployment checklist:

- [x] `ASPNETCORE_ENVIRONMENT=Production` hides OpenAPI.
- [x] `SeedDemoUsers` toggle exists.
- [ ] HTTPS/HSTS/HTTPS redirection not implemented.
- [ ] Production JWT key management is documented but relies entirely on ops discipline; the dev key is committed (documented as dev-only).
- [ ] No password-expiry/reset invalidation enforcement for JWTs.
- [ ] No rate limiting or global active-user check.
- [ ] No backup job or health checks.
- [ ] No structured logging/retention configuration.
- [ ] No CA content review workflow is visible in code (per README roadmap, post-launch).

The application is a strong foundation but requires the fixes above before it can be considered production-ready.
