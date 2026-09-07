using System.Security.Claims;
using System.Text;
using System.Threading.RateLimiting;
using MascoLearning.Api.Services;
using MascoLearning.Infrastructure.Data;
using MascoLearning.Infrastructure.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// ---------- Database ----------
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

// ---------- Identity ----------
builder.Services
    .AddIdentityCore<AppUser>(options =>
    {
        // Corporate training site: usable passwords, sane lockout.
        options.Password.RequiredLength = 8;
        options.Password.RequireDigit = true;
        options.Password.RequireUppercase = true;
        options.Password.RequireLowercase = true;
        options.Password.RequireNonAlphanumeric = false;

        options.Lockout.MaxFailedAccessAttempts = 5;
        options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(15);
        options.Lockout.AllowedForNewUsers = true;

        options.User.RequireUniqueEmail = true;
    })
    .AddRoles<IdentityRole>()
    .AddSignInManager()
    .AddEntityFrameworkStores<AppDbContext>();

// ---------- Auth (JWT bearer for the static frontend) ----------
var jwtSection = builder.Configuration.GetSection("Jwt");
var jwtKey = jwtSection["Key"]
    ?? throw new InvalidOperationException("Jwt:Key is not configured.");

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtSection["Issuer"],
            ValidAudience = jwtSection["Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
        };

        // Runs on EVERY authenticated request:
        //  1. Deactivated or deleted accounts are rejected immediately —
        //     a valid token is not a free pass.
        //  2. Tokens issued BEFORE the account's last password change are
        //     rejected, making admin password resets genuinely cut off old
        //     sessions (self-contained JWTs ignore Identity security stamps).
        options.Events = new JwtBearerEvents
        {
            OnTokenValidated = async context =>
            {
                var userManager = context.HttpContext.RequestServices
                    .GetRequiredService<UserManager<AppUser>>();

                var userId = context.Principal?.FindFirstValue(ClaimTypes.NameIdentifier);
                if (string.IsNullOrEmpty(userId))
                {
                    context.Fail("Token carries no user identity.");
                    return;
                }

                var user = await userManager.FindByIdAsync(userId);
                if (user is null || !user.IsActive)
                {
                    context.Fail("Account is inactive or no longer exists.");
                    return;
                }

                if (user.PasswordChangedAtUtc is { } changedAt &&
                    context.SecurityToken.ValidFrom < changedAt.AddSeconds(-5))
                {
                    context.Fail("Token was issued before the last password change.");
                }
            },
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("ManagerOrAdmin", policy =>
        policy.RequireRole(DbSeeder.RoleAdmin, DbSeeder.RoleManager));
});

builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IQuizBank, FileSystemQuizBank>();

// ---------- Rate limiting (brute-force / spam protection) ----------
builder.Services.AddRateLimiter(rateLimiterOptions =>
{
    rateLimiterOptions.RejectionStatusCode = StatusCodes.Status429TooManyRequests;

    // Login attempts per client IP. Identity lockout is the second layer.
    rateLimiterOptions.AddPolicy("login", context =>
        RateLimitPartition.GetFixedWindowLimiter(
            context.Connection.RemoteIpAddress?.ToString() ?? "unknown",
            _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = 10,
                Window = TimeSpan.FromMinutes(1),
            }));

    // Admin mutations: modest shared ceiling per IP.
    rateLimiterOptions.AddPolicy("admin", context =>
        RateLimitPartition.GetFixedWindowLimiter(
            context.Connection.RemoteIpAddress?.ToString() ?? "unknown",
            _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = 60,
                Window = TimeSpan.FromMinutes(1),
            }));
});

// ---------- API docs (OpenAPI JSON at /openapi/v1.json) ----------
builder.Services.AddOpenApi(options =>
{
    options.AddDocumentTransformer((doc, ctx, ct) =>
    {
        doc.Info = new OpenApiInfo
        {
            Title = "Masco Accounting Learning API",
            Version = "v1",
            Description = "Auth, progress tracking, server-side quiz grading, and team reports.",
        };
        return Task.CompletedTask;
    });
});

// ---------- Health checks (DB probe for load balancers / monitoring) ----------
builder.Services.AddHealthChecks()
    .AddCheck<DatabaseHealthCheck>("database");

builder.Services.AddControllers();

var app = builder.Build();

// ---------- Pipeline ----------
if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}
else
{
    app.MapOpenApi();   // /openapi/v1.json in development only
}
app.UseHttpsRedirection();

app.UseDefaultFiles();   // serves wwwroot/index.html at "/"
app.UseStaticFiles();

app.UseAuthentication();
app.UseAuthorization();

app.UseRateLimiter();

app.MapControllers();
app.MapHealthChecks("/health");

// ---------- Seed (idempotent) ----------
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await db.Database.MigrateAsync();

    // Demo accounts for evaluation; disable in production via config.
    var seedDemo = app.Configuration.GetValue("SeedDemoUsers", true);
    await DbSeeder.SeedAsync(scope.ServiceProvider, seedDemo);
}

app.Run();
