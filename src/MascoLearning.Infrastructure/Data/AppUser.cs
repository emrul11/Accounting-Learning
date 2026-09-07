using MascoLearning.Core.Entities;

namespace MascoLearning.Infrastructure.Data;

/// <summary>
/// Application user. ASP.NET Core Identity handles password hashing,
/// lockout, and security stamping — we only add profile fields.
/// </summary>
public class AppUser : Microsoft.AspNetCore.Identity.IdentityUser
{
    public string FullName { get; set; } = string.Empty;

    /// <summary>e.g. "Commercial", "Warehouse", "Finance", "HR", "IT"</summary>
    public string? Department { get; set; }

    public bool IsActive { get; set; } = true;

    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;

    /// <summary>
    /// Set when an admin resets the password. JWT bearer validation rejects
    /// any token issued BEFORE this moment, making resets genuinely cut off
    /// old sessions.
    /// </summary>
    public DateTime? PasswordChangedAtUtc { get; set; }
}
