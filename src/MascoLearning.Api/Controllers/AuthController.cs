using System.Security.Claims;
using MascoLearning.Api.Extensions;
using MascoLearning.Core.DTOs;
using MascoLearning.Infrastructure.Data;
using MascoLearning.Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace MascoLearning.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly UserManager<AppUser> _users;
    private readonly SignInManager<AppUser> _signIn;
    private readonly ITokenService _tokens;

    public AuthController(
        UserManager<AppUser> users,
        SignInManager<AppUser> signIn,
        ITokenService tokens)
    {
        _users = users;
        _signIn = signIn;
        _tokens = tokens;
    }

    /// <summary>Login with email + password. Returns a JWT and profile.</summary>
    [HttpPost("login")]
    [AllowAnonymous]
    [EnableRateLimiting("login")]
    public async Task<ActionResult<AuthResponse>> Login(LoginRequest request)
    {
        var user = await _users.FindByEmailAsync(request.Email);
        if (user is null || !user.IsActive)
        {
            // Same message for both cases: do not reveal account existence/status.
            return Unauthorized(new { error = "Invalid email or password." });
        }

        // Validates the password and enforces lockout WITHOUT issuing an
        // Identity cookie — this API is token-only (JWT returned below).
        var result = await _signIn.CheckPasswordSignInAsync(
            user, request.Password, lockoutOnFailure: true);

        if (result.IsLockedOut)
        {
            return StatusCode(StatusCodes.Status423Locked,
                new { error = "Account locked after too many failed attempts. Try again in 15 minutes." });
        }
        if (!result.Succeeded)
        {
            return Unauthorized(new { error = "Invalid email or password." });
        }

        var roles = await _users.GetRolesAsync(user);
        var (token, expires) = _tokens.CreateToken(user, roles);

        return Ok(new AuthResponse(token, expires,
            new UserDto(user.Id, user.Email!, user.FullName, user.Department, roles.ToList())));
    }

    /// <summary>Profile of the logged-in user.</summary>
    [HttpGet("me")]
    [Authorize]
    public async Task<ActionResult<UserDto>> Me()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = await _users.FindByIdAsync(userId!);
        if (user is null)
        {
            return Unauthorized();
        }
        var roles = await _users.GetRolesAsync(user);
        return Ok(new UserDto(user.Id, user.Email!, user.FullName, user.Department, roles.ToList()));
    }
}
