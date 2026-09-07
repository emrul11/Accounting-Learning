using System.Text.Json;
using MascoLearning.Api.Extensions;
using MascoLearning.Api.Services;
using MascoLearning.Core.DTOs;
using MascoLearning.Core.Enums;
using MascoLearning.Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MascoLearning.Api.Controllers;

/// <summary>
/// Receives quiz submissions and grades them server-side against the quiz
/// bank JSON. A passing attempt (>= pass mark) completes the module.
/// </summary>
[ApiController]
[Route("api/quizzes")]
[Authorize]
public class QuizzesController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly IQuizBank _quizBank;
    private readonly ILogger<QuizzesController> _logger;

    public QuizzesController(AppDbContext db, IQuizBank quizBank, ILogger<QuizzesController> logger)
    {
        _db = db;
        _quizBank = quizBank;
        _logger = logger;
    }

    [HttpPost("{moduleCode}/attempts")]
    public async Task<ActionResult<AttemptResultDto>> Submit(
        string moduleCode, SubmitAttemptRequest request, CancellationToken ct)
    {
        var module = await _db.Modules.FirstOrDefaultAsync(m => m.Code == moduleCode && m.IsActive, ct);
        if (module is null)
        {
            return NotFound(new { error = $"Unknown module '{moduleCode}'." });
        }

        var bank = await _quizBank.LoadAsync(moduleCode, ct);
        if (bank is null)
        {
            return NotFound(new { error = $"No quiz published yet for '{moduleCode}'." });
        }

        // Length must match the bank exactly, and each selected index must
        // exist within ITS question's option count (-1 = skipped).
        if (request.SelectedAnswers.Count != bank.Questions.Count)
        {
            return BadRequest(new
            {
                error = $"Expected {bank.Questions.Count} answers but received {request.SelectedAnswers.Count}.",
            });
        }
        for (var i = 0; i < bank.Questions.Count; i++)
        {
            var selected = request.SelectedAnswers[i];
            if (selected < -1 || selected >= bank.Questions[i].Options.Count)
            {
                return BadRequest(new { error = $"Answer {i + 1} is out of range for its options." });
            }
        }

        // ----- Server-side grading: the browser's own score is ignored. -----
        var graded = new List<GradedAnswerDto>(bank.Questions.Count);
        var score = 0;
        for (var i = 0; i < bank.Questions.Count; i++)
        {
            var selected = request.SelectedAnswers[i];
            var correct = bank.Questions[i].Correct;
            var isCorrect = selected == correct;
            if (isCorrect)
            {
                score++;
            }
            graded.Add(new GradedAnswerDto(i, selected, correct, isCorrect));
        }

        var percentage = (int)Math.Round(score * 100.0 / bank.Questions.Count);
        var passed = percentage >= bank.PassMark;

        // ----- Persist the attempt -----
        var userId = User.UserId();

        var attempt = new Core.Entities.QuizAttempt
        {
            UserId = userId,
            ModuleId = module.Id,
            Score = score,
            Total = bank.Questions.Count,
            Percentage = percentage,
            PassMark = bank.PassMark,
            AnswersJson = JsonSerializer.Serialize(request.SelectedAnswers),
            AttemptedAtUtc = DateTime.UtcNow,
        };

        await SaveAttemptWithProgressAsync(userId, module.Id, passed, attempt, ct);

        return Ok(new AttemptResultDto(
            attempt.Id, moduleCode, score, bank.Questions.Count,
            percentage, bank.PassMark, passed, graded));
    }

    /// <summary>
    /// Attempt insert + progress upsert in one save. Two requests racing on a
    /// learner's first touch of a module (page-open 'start' + quick quiz
    /// submit) both try to INSERT the same ProgressRecord; the unique index
    /// lets exactly one win, and the loser retries as an UPDATE.
    /// </summary>
    private async Task SaveAttemptWithProgressAsync(
        string userId, int moduleId, bool passed,
        Core.Entities.QuizAttempt attempt, CancellationToken ct)
    {
        for (var tryCount = 1; ; tryCount++)
        {
            try
            {
                _db.QuizAttempts.Add(attempt);
                await UpsertProgressAsync(userId, moduleId, passed);
                await _db.SaveChangesAsync(ct);
                return;
            }
            catch (DbUpdateException ex) when (tryCount == 1 && IsUniqueViolation(ex))
            {
                _logger.LogInformation(
                    "Progress insert raced for user {UserId} module {ModuleId}; retrying as update.",
                    userId, moduleId);

                // Nothing was persisted (SaveChanges is transactional).
                // Start over with clean tracking; the retry path will find
                // the winner's row and UPDATE it instead of INSERTing.
                _db.ChangeTracker.Clear();
            }
        }
    }

    private async Task UpsertProgressAsync(string userId, int moduleId, bool passed)
    {
        var record = await _db.Progress
            .FirstOrDefaultAsync(p => p.UserId == userId && p.ModuleId == moduleId);

        if (record is null)
        {
            record = new Core.Entities.ProgressRecord { UserId = userId, ModuleId = moduleId };
            _db.Progress.Add(record);
        }

        record.LastAccessedAtUtc = DateTime.UtcNow;
        if (passed)
        {
            if (record.Status != ProgressStatus.Completed)
            {
                record.CompletedAtUtc = DateTime.UtcNow;
            }
            record.Status = ProgressStatus.Completed;
        }
        else if (record.Status == ProgressStatus.NotStarted)
        {
            record.Status = ProgressStatus.Started;
        }
    }

    private static bool IsUniqueViolation(DbUpdateException ex) =>
        ex.InnerException is Microsoft.Data.SqlClient.SqlException
        {
            Number: 2601 or 2627
        };
}
