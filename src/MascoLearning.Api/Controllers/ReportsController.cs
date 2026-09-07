using System.Text;
using MascoLearning.Api.Extensions;
using MascoLearning.Core.DTOs;
using MascoLearning.Core.Enums;
using MascoLearning.Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MascoLearning.Api.Controllers;

/// <summary>
/// Progress reports: a learner sees their own history; managers and admins
/// see the whole team and can export CSV.
/// </summary>
[ApiController]
[Route("api/reports")]
public class ReportsController : ControllerBase
{
    private readonly AppDbContext _db;

    public ReportsController(AppDbContext db) => _db = db;

    /// <summary>The logged-in learner's full progress + recent attempts.</summary>
    [HttpGet("my")]
    [Authorize]
    public async Task<ActionResult<MyReportDto>> My(CancellationToken ct)
    {
        var userId = User.UserId();

        var user = await _db.Users.FirstAsync(u => u.Id == userId, ct);
        var roles = await (from ur in _db.UserRoles
                           join r in _db.Roles on ur.RoleId equals r.Id
                           where ur.UserId == userId
                           select r.Name!).ToListAsync(ct);

        var allModules = await _db.Modules
            .Where(m => m.IsActive)
            .OrderBy(m => m.OrderNo)
            .ToListAsync(ct);

        var progressByModule = await _db.Progress
            .Where(p => p.UserId == userId)
            .ToDictionaryAsync(p => p.ModuleId, ct);

        var attemptStats = await _db.QuizAttempts
            .Where(a => a.UserId == userId)
            .GroupBy(a => a.ModuleId)
            .Select(g => new { ModuleId = g.Key, Attempts = g.Count(), Best = g.Max(a => a.Percentage) })
            .ToDictionaryAsync(x => x.ModuleId, x => x, ct);

        var modules = allModules.Select(m =>
        {
            progressByModule.TryGetValue(m.Id, out var prog);
            attemptStats.TryGetValue(m.Id, out var stat);
            return new ModuleProgressDto(
                m.Code,
                m.Title,
                prog?.Status ?? ProgressStatus.NotStarted,
                prog?.CompletedAtUtc,
                stat?.Attempts ?? 0,
                stat?.Best ?? 0);
        }).ToList();

        var recent = await _db.QuizAttempts
            .Where(a => a.UserId == userId)
            .OrderByDescending(a => a.AttemptedAtUtc)
            .Take(20)
            .Include(a => a.Module)
            .Select(a => new AttemptSummaryDto(
                a.Module.Code, a.Module.Title, a.Score, a.Total,
                a.Percentage, a.Percentage >= a.PassMark, a.AttemptedAtUtc))
            .ToListAsync(ct);

        return Ok(new MyReportDto(
            new UserDto(user.Id, user.Email!, user.FullName, user.Department, roles),
            modules.Count(m => m.Status == ProgressStatus.Completed),
            allModules.Count,
            modules,
            recent));
    }

    /// <summary>Whole-team progress for managers and admins.</summary>
    [HttpGet("team")]
    [Authorize(Policy = "ManagerOrAdmin")]
    public async Task<ActionResult<TeamReportDto>> Team(CancellationToken ct)
    {
        var rows = await BuildTeamRowsAsync(ct);
        var learners = rows.Where(r => r.Roles.Contains(DbSeeder.RoleLearner)).ToList();
        if (learners.Count > 0)
        {
            // Count of modules completed across the catalog (modules only, no appendices).
            var totalCatalog = await _db.Modules.CountAsync(m => m.IsActive && !m.IsAppendix, ct);
            var avgCompletion = learners.Average(r => totalCatalog == 0 ? 0 : 100.0 * r.ModulesCompleted / totalCatalog);
            return Ok(new TeamReportDto(learners.Count, Math.Round(avgCompletion, 1), rows));
        }
        return Ok(new TeamReportDto(0, 0, rows));
    }

    /// <summary>Same data as /team, as a CSV download for HR/management.</summary>
    [HttpGet("team/export")]
    [Authorize(Policy = "ManagerOrAdmin")]
    public async Task<IActionResult> ExportCsv(CancellationToken ct)
    {
        var rows = await BuildTeamRowsAsync(ct);

        var sb = new System.Text.StringBuilder();
        sb.AppendLine("Name,Email,Department,Roles,Active,ModulesCompleted,StartedNotFinished,TotalQuizAttempts,BestOverallPercent,AvgScorePercent,LastActivityUtc");
        foreach (var r in rows)
        {
            sb.Append(Csv(r.FullName)).Append(',');
            sb.Append(Csv(r.Email)).Append(',');
            sb.Append(Csv(r.Department ?? "")).Append(',');
            sb.Append(Csv(string.Join(";", r.Roles))).Append(',');
            sb.Append(r.IsActive).Append(',');
            sb.Append(r.ModulesCompleted).Append(',');
            sb.Append(r.ModulesStartedNotFinished).Append(',');
            sb.Append(r.TotalAttempts).Append(',');
            sb.Append(r.BestOverallPercent).Append(',');
            sb.Append(r.AvgScorePercent).Append(',');
            sb.AppendLine(r.LastActivityUtc?.ToString("yyyy-MM-dd HH:mm:ss") ?? "");
        }

        return File(Encoding.UTF8.GetBytes(sb.ToString()), "text/csv",
            $"masco-learning-report-{DateTime.UtcNow:yyyyMMdd-HHmm}.csv");
    }

    // ---------- helpers ----------

    private async Task<List<TeamReportRowDto>> BuildTeamRowsAsync(CancellationToken ct)
    {
        var users = await _db.Users.OrderBy(u => u.FullName).ToListAsync(ct);

        var rolePairs = await (
            from ur in _db.UserRoles
            join r in _db.Roles on ur.RoleId equals r.Id
            select new { ur.UserId, Role = r.Name! }).ToListAsync(ct);
        var rolesByUser = rolePairs.GroupBy(p => p.UserId)
            .ToDictionary(g => g.Key, g => g.Select(x => x.Role).ToArray());

        var completed = await _db.Progress
            .Where(p => p.Status == ProgressStatus.Completed)
            .GroupBy(p => p.UserId)
            .Select(g => new { UserId = g.Key, Count = g.Count() })
            .ToDictionaryAsync(x => x.UserId, x => x.Count, ct);

        var started = await _db.Progress
            .Where(p => p.Status == ProgressStatus.Started)
            .GroupBy(p => p.UserId)
            .Select(g => new { UserId = g.Key, Count = g.Count() })
            .ToDictionaryAsync(x => x.UserId, x => x.Count, ct);

        var attempts = await _db.QuizAttempts
            .GroupBy(a => a.UserId)
            .Select(g => new
            {
                UserId = g.Key,
                Count = g.Count(),
                Best = g.Max(a => a.Percentage),
                Avg = g.Average(a => a.Percentage),
                Last = g.Max(a => a.AttemptedAtUtc),
            })
            .ToDictionaryAsync(x => x.UserId, x => x, ct);

        return users.Select(u =>
        {
            attempts.TryGetValue(u.Id, out var att);
            var lastActivity = new[]
            {
                u.CreatedAtUtc,
                att?.Last,
            }.Max();
            return new TeamReportRowDto(
                u.Id,
                u.FullName,
                u.Email!,
                u.Department,
                rolesByUser.GetValueOrDefault(u.Id, Array.Empty<string>()),
                u.IsActive,
                completed.GetValueOrDefault(u.Id, 0),
                started.GetValueOrDefault(u.Id, 0),
                att?.Count ?? 0,
                att?.Best ?? 0,
                Math.Round(att?.Avg ?? 0, 1),
                lastActivity);
        }).ToList();
    }

    /// <summary>
    /// Escapes CSV cells AND neutralizes formula injection: a value starting
    /// with = + - @ could execute as a spreadsheet formula when the export is
    /// opened in Excel. Prefixing with ' renders it inert.
    /// </summary>
    private static string Csv(string value)
    {
        var safe = value.StartsWith('=') || value.StartsWith('+') ||
                   value.StartsWith('-') || value.StartsWith('@')
            ? "'" + value
            : value;
        return safe.Contains('"') || safe.Contains(',') || safe.Contains('\n')
            ? $"\"{safe.Replace("\"", "\"\"")}\""
            : safe;
    }
}
