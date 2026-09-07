using MascoLearning.Api.Extensions;
using MascoLearning.Core.Enums;
using MascoLearning.Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MascoLearning.Api.Controllers;

/// <summary>
/// Tracks lesson engagement (a module page was opened). Quiz passes mark
/// completion automatically — see QuizzesController.
/// </summary>
[ApiController]
[Route("api/progress")]
[Authorize]
public class ProgressController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly ILogger<ProgressController> _logger;

    public ProgressController(AppDbContext db, ILogger<ProgressController> logger)
    {
        _db = db;
        _logger = logger;
    }

    /// <summary>Called by a module page on open: marks the module "Started".</summary>
    [HttpPost("{moduleCode}/start")]
    public async Task<IActionResult> Start(string moduleCode)
    {
        var module = await _db.Modules.FirstOrDefaultAsync(m => m.Code == moduleCode && m.IsActive);
        if (module is null)
        {
            return NotFound(new { error = $"Unknown module '{moduleCode}'." });
        }

        var userId = User.UserId();

        // A page-open 'start' can race the learner's first quiz submission
        // (both INSERT the same ProgressRecord). Retry once as an update.
        for (var tryCount = 1; ; tryCount++)
        {
            try
            {
                var record = await _db.Progress
                    .FirstOrDefaultAsync(p => p.UserId == userId && p.ModuleId == module.Id);

                if (record is null)
                {
                    record = new Core.Entities.ProgressRecord
                    {
                        UserId = userId,
                        ModuleId = module.Id,
                        Status = ProgressStatus.Started,
                        LastAccessedAtUtc = DateTime.UtcNow,
                    };
                    _db.Progress.Add(record);
                }
                else
                {
                    // Never downgrade a Completed module back to Started.
                    if (record.Status != ProgressStatus.Completed)
                    {
                        record.Status = ProgressStatus.Started;
                    }
                    record.LastAccessedAtUtc = DateTime.UtcNow;
                }

                await _db.SaveChangesAsync();
                return NoContent();
            }
            catch (DbUpdateException ex) when (tryCount == 1 && IsUniqueViolation(ex))
            {
                _logger.LogInformation(
                    "Progress start raced for user {UserId} module {ModuleId}; retrying.",
                    userId, module.Id);
                _db.ChangeTracker.Clear();
            }
        }
    }

    private static bool IsUniqueViolation(DbUpdateException ex) =>
        ex.InnerException is Microsoft.Data.SqlClient.SqlException
        {
            Number: 2601 or 2627
        };
}
