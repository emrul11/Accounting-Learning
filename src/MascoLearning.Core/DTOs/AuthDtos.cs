using System.ComponentModel.DataAnnotations;

namespace MascoLearning.Core.DTOs;

public record LoginRequest(
    [property: Required, EmailAddress] string Email,
    [property: Required] string Password);

public record UserDto(
    string Id,
    string Email,
    string FullName,
    string? Department,
    IReadOnlyList<string> Roles);

public record AuthResponse(string Token, DateTime ExpiresAtUtc, UserDto User);
