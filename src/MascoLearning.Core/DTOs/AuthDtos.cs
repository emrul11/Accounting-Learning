using System.ComponentModel.DataAnnotations;

namespace MascoLearning.Core.DTOs;

public class LoginRequest
{
    [Required, EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string Password { get; set; } = string.Empty;
}

public record UserDto(
    string Id,
    string Email,
    string FullName,
    string? Department,
    IReadOnlyList<string> Roles);

public record AuthResponse(string Token, DateTime ExpiresAtUtc, UserDto User);
