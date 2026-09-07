using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using MascoLearning.Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace MascoLearning.Infrastructure.Services;

public interface ITokenService
{
    (string token, DateTime expiresAtUtc) CreateToken(AppUser user, IList<string> roles);
}

public class TokenService : ITokenService
{
    private readonly IConfiguration _config;

    public TokenService(IConfiguration config) => _config = config;

    public (string token, DateTime expiresAtUtc) CreateToken(AppUser user, IList<string> roles)
    {
        var jwt = _config.GetSection("Jwt");
        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(jwt["Key"] ?? throw new InvalidOperationException("Jwt:Key is not configured")));

        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.Id),
            new(JwtRegisteredClaimNames.Email, user.Email ?? string.Empty),
            new(ClaimTypes.NameIdentifier, user.Id),
            new(ClaimTypes.Email, user.Email ?? string.Empty),
            new("fullName", user.FullName),
        };
        foreach (var role in roles)
        {
            claims.Add(new Claim(ClaimTypes.Role, role));
        }

        var hours = double.TryParse(jwt["ExpiryHours"], out var h) ? h : 12;
        var expires = DateTime.UtcNow.AddHours(hours);

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: jwt["Issuer"],
            audience: jwt["Audience"],
            claims: claims,
            expires: expires,
            signingCredentials: creds);

        return (new JwtSecurityTokenHandler().WriteToken(token), expires);
    }
}
