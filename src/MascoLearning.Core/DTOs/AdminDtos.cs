using System.ComponentModel.DataAnnotations;

namespace MascoLearning.Core.DTOs;

// ---------- Admin: user management ----------

public class CreateUserRequest
{
    [Required, EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required, MinLength(8)]
    public string Password { get; set; } = string.Empty;

    [Required, MinLength(2)]
    public string FullName { get; set; } = string.Empty;

    public string? Department { get; set; }

    [Required]
    public string Role { get; set; } = string.Empty; // "Learner" | "Manager" | "Admin"
}

public record UserAdminDto(
    string Id,
    string Email,
    string FullName,
    string? Department,
    bool IsActive,
    DateTime CreatedAtUtc,
    IReadOnlyList<string> Roles,
    int ModulesCompleted);

public record UpdateUserRequest(bool? IsActive, string? Department, string? FullName);

public class ResetPasswordRequest
{
    [Required, MinLength(8)]
    public string NewPassword { get; set; } = string.Empty;
}

// ---------- Manager: team report ----------

public record TeamReportRowDto(
    string UserId,
    string FullName,
    string Email,
    string? Department,
    IReadOnlyList<string> Roles,
    bool IsActive,
    int ModulesCompleted,
    int ModulesStartedNotFinished,
    int TotalAttempts,
    int BestOverallPercent,
    double AvgScorePercent,
    DateTime? LastActivityUtc);

public record TeamReportDto(
    int LearnerCount,
    double AvgCompletionPercent,
    IReadOnlyList<TeamReportRowDto> Rows);
