using System.Security.Claims;

namespace MascoLearning.Api.Extensions;

public static class ClaimsPrincipalExtensions
{
    /// <summary>
    /// Single source for extracting the authenticated user's Id — replaces
    /// the copy-pasted FindFirstValue calls that used to live in each controller.
    /// </summary>
    public static string UserId(this ClaimsPrincipal principal) =>
        principal.FindFirstValue(ClaimTypes.NameIdentifier)
            ?? throw new UnauthorizedAccessException("Token has no user id claim.");
}
