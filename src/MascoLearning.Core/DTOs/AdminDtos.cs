using System.ComponentModel.DataAnnotations;

namespace MascoLearning.Core.DTOs;

// ---------- Admin: user management ----------

public record CreateUserRequest(
    [property: Required, EmailAddress] string Email,
    [property: Required, MinLength(8)] string Password,
    [property: Required, MinLength(2)] string FullName,
    string? Department,
    [property: Required] string Role); // "Learner" | "Manager" | "Admin"

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

public record ResetPasswordRequest(
    [property: Required, MinLength(8)] string NewPassword);

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
