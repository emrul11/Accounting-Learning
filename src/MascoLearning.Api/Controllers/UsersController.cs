using MascoLearning.Api.Extensions;
using MascoLearning.Core.DTOs;
using MascoLearning.Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;

namespace MascoLearning.Api.Controllers;

/// <summary>
/// Admin-only user management: create accounts, list users, deactivate,
/// reset passwords. There is no self-registration — admins onboard staff.
/// </summary>
[ApiController]
[Route("api/users")]
[Authorize(Roles = DbSeeder.RoleAdmin)]
[EnableRateLimiting("admin")]
public class UsersController : ControllerBase
{
    private static readonly string[] AllowedRoles =
        { DbSeeder.RoleLearner, DbSeeder.RoleManager, DbSeeder.RoleAdmin };

    private readonly UserManager<AppUser> _users;
    private readonly AppDbContext _db;

    public UsersController(UserManager<AppUser> users, AppDbContext db)
    {
        _users = users;
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<UserAdminDto>>> List()
    {
        var users = await _users.Users.OrderBy(u => u.FullName).ToListAsync();
        var rolesByUser = await GetRolesMap(users);

        var completedCounts = await _db.Progress
            .Where(p => p.Status == Core.Enums.ProgressStatus.Completed)
            .GroupBy(p => p.UserId)
            .Select(g => new { UserId = g.Key, Count = g.Count() })
            .ToDictionaryAsync(x => x.UserId, x => x.Count);

        var rows = users.Select(u => new UserAdminDto(
            u.Id, u.Email!, u.FullName, u.Department, u.IsActive, u.CreatedAtUtc,
            rolesByUser.GetValueOrDefault(u.Id, Array.Empty<string>()),
            completedCounts.GetValueOrDefault(u.Id, 0))).ToList();

        return Ok(rows);
    }

    [HttpPost]
    public async Task<ActionResult<UserAdminDto>> Create(CreateUserRequest request)
    {
        var role = request.Role.Trim();
        if (!AllowedRoles.Contains(role, StringComparer.OrdinalIgnoreCase))
        {
            return BadRequest(new { error = $"Role must be one of: {string.Join(", ", AllowedRoles)}." });
        }

        var user = new AppUser
        {
            UserName = request.Email.Trim(),
            Email = request.Email.Trim(),
            FullName = request.FullName.Trim(),
            Department = string.IsNullOrWhiteSpace(request.Department) ? null : request.Department.Trim(),
        };

        var result = await _users.CreateAsync(user, request.Password);
        if (!result.Succeeded)
        {
            return BadRequest(new
            {
                error = "Could not create user.",
                details = result.Errors.Select(e => e.Description).ToArray(),
            });
        }

        await _users.AddToRoleAsync(user, NormalizeRole(role));

        return CreatedAtAction(nameof(List), new UserAdminDto(
            user.Id, user.Email!, user.FullName, user.Department, true,
            user.CreatedAtUtc, new[] { NormalizeRole(role) }, 0));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, UpdateUserRequest request)
    {
        var user = await _users.FindByIdAsync(id);
        if (user is null)
        {
            return NotFound();
        }

        if (request.IsActive.HasValue)
        {
            // Guard: never let an admin lock themselves out of the system.
            if (!request.IsActive.Value && user.Id == CurrentUserId())
            {
                return BadRequest(new { error = "You cannot deactivate your own account." });
            }
            user.IsActive = request.IsActive.Value;
        }
        if (request.Department is not null)
        {
            user.Department = string.IsNullOrWhiteSpace(request.Department) ? null : request.Department.Trim();
        }
        if (request.FullName is not null && !string.IsNullOrWhiteSpace(request.FullName))
        {
            user.FullName = request.FullName.Trim();
        }

        await _users.UpdateAsync(user);
        return NoContent();
    }

    [HttpPost("{id}/reset-password")]
    public async Task<IActionResult> ResetPassword(string id, ResetPasswordRequest request)
    {
        var user = await _users.FindByIdAsync(id);
        if (user is null)
        {
            return NotFound();
        }

        var token = await _users.GeneratePasswordResetTokenAsync(user);
        var result = await _users.ResetPasswordAsync(user, token, request.NewPassword);
        if (!result.Succeeded)
        {
            return BadRequest(new
            {
                error = "Password does not meet the rules (min 8 chars, digit, uppercase).",
                details = result.Errors.Select(e => e.Description).ToArray(),
            });
        }

        // Cut off old sessions for real: the JWT bearer event rejects any
        // token issued before this timestamp, and existing tokens die here.
        user.PasswordChangedAtUtc = DateTime.UtcNow;
        _db.Users.Update(user);

        // Invalidate refresh-style Identity artifacts too.
        await _users.UpdateSecurityStampAsync(user);
        return NoContent();
    }

    // ---------- helpers ----------

    private string CurrentUserId() => User.UserId();

    private static string NormalizeRole(string role) =>
        DbSeeder.AllRoles.First(r => r.Equals(role, StringComparison.OrdinalIgnoreCase));

    private async Task<Dictionary<string, string[]>> GetRolesMap(List<AppUser> users)
    {
        var ids = users.Select(u => u.Id).ToList();
        var pairs = await (
            from ur in _db.UserRoles
            join r in _db.Roles on ur.RoleId equals r.Id
            where ids.Contains(ur.UserId)
            select new { ur.UserId, r.Name })
            .ToListAsync();

        return pairs.GroupBy(p => p.UserId)
            .ToDictionary(g => g.Key, g => g.Select(x => x.Name!).ToArray());
    }
}
