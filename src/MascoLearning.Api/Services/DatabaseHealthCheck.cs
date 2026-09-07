using MascoLearning.Infrastructure.Data;
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace MascoLearning.Api.Services;

/// <summary>
/// Simple database reachability probe for /health. Returns degraded (not
/// unhealthy) when the DB is unreachable so a blip doesn't pull the whole
/// site out of a load balancer — static content still serves.
/// </summary>
public class DatabaseHealthCheck : IHealthCheck
{
    private readonly AppDbContext _db;

    public DatabaseHealthCheck(AppDbContext db) => _db = db;

    public async Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context, CancellationToken cancellationToken = default)
    {
        try
        {
            return await _db.Database.CanConnectAsync(cancellationToken)
                ? HealthCheckResult.Healthy("Database reachable.")
                : HealthCheckResult.Degraded("Database unreachable.");
        }
        catch (Exception ex)
        {
            return HealthCheckResult.Degraded("Database check failed.", ex);
        }
    }
}
