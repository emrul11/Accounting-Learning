using MascoLearning.Api.Extensions;
using MascoLearning.Core.DTOs;
using MascoLearning.Core.Enums;
using MascoLearning.Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MascoLearning.Api.Controllers;

/// <summary>Learning path listing with the caller's status per module.</summary>
[ApiController]
[Route("api/modules")]
[Authorize]
public class ModulesController : ControllerBase
{
    private readonly AppDbContext _db;

    public ModulesController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<ModuleDto>>> List(CancellationToken ct)
    {
        var userId = User.UserId();

        var modules = await _db.Modules
            .Where(m => m.IsActive)
            .OrderBy(m => m.OrderNo)
            .ToListAsync(ct);

        var progress = await _db.Progress
            .Where(p => p.UserId == userId)
            .ToDictionaryAsync(p => p.ModuleId, p => p, ct);

        var bestScores = await _db.QuizAttempts
            .Where(a => a.UserId == userId)
            .GroupBy(a => a.ModuleId)
            .Select(g => new { ModuleId = g.Key, Best = g.Max(a => a.Percentage) })
            .ToDictionaryAsync(x => x.ModuleId, x => x.Best, ct);

        return Ok(modules.Select(m =>
        {
            progress.TryGetValue(m.Id, out var prog);
            bestScores.TryGetValue(m.Id, out var best);
            return new ModuleDto(
                m.Id, m.Code, m.Title, m.OrderNo, m.IsAppendix,
                prog?.Status ?? ProgressStatus.NotStarted,
                prog?.CompletedAtUtc,
                best);
        }).ToList());
    }
}
