using MascoLearning.Core.Entities;
using MascoLearning.Core.Enums;
using MascoLearning.Infrastructure.Data;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace MascoLearning.Api.Tests;

/// <summary>
/// Database rule tests. These protect invariants the reports rely on:
/// one progress row per (user, module), and required references.
/// </summary>
public class DatabaseRuleTests : IDisposable
{
    private readonly SqliteConnection _connection;
    private readonly AppDbContext _db;

    public DatabaseRuleTests()
    {
        _connection = new SqliteConnection("DataSource=:memory:");
        _connection.Open();
        _db = new AppDbContext(
            new DbContextOptionsBuilder<AppDbContext>()
                .UseSqlite(_connection)
                .Options);
        _db.Database.EnsureCreated();
    }

    /// <summary>Progress/attempt rows now have FKs to AspNetUsers — tests
    /// must create a real user first and use its Id.</summary>
    private async Task<string> CreateUserAsync(string id)
    {
        var user = new Infrastructure.Data.AppUser
        {
            Id = id,
            UserName = id + "@test",
            Email = id + "@test",
        };
        _db.Users.Add(user);
        await _db.SaveChangesAsync();
        return user.Id;
    }

    [Fact]
    public async Task Progress_is_unique_per_user_and_module()
    {
        var userId = await CreateUserAsync("u1");
        var module = new LearningModule { Code = "module-00", Title = "Test", OrderNo = 0 };
        _db.Modules.Add(module);
        await _db.SaveChangesAsync();

        _db.Progress.Add(new ProgressRecord { UserId = userId, ModuleId = module.Id, Status = ProgressStatus.Started });
        await _db.SaveChangesAsync();

        _db.Progress.Add(new ProgressRecord { UserId = userId, ModuleId = module.Id, Status = ProgressStatus.Completed });
        await Assert.ThrowsAsync<DbUpdateException>(() => _db.SaveChangesAsync());
    }

    [Fact]
    public async Task Same_user_can_have_progress_for_different_modules()
    {
        var userId = await CreateUserAsync("u2");
        var m0 = new LearningModule { Code = "module-00", Title = "T0", OrderNo = 0 };
        var m1 = new LearningModule { Code = "module-01", Title = "T1", OrderNo = 1 };
        _db.Modules.AddRange(m0, m1);
        await _db.SaveChangesAsync();

        _db.Progress.Add(new ProgressRecord { UserId = userId, ModuleId = m0.Id, Status = ProgressStatus.Completed });
        _db.Progress.Add(new ProgressRecord { UserId = userId, ModuleId = m1.Id, Status = ProgressStatus.Started });
        await _db.SaveChangesAsync();

        Assert.Equal(2, await _db.Progress.CountAsync());
    }

    [Fact]
    public async Task Progress_cannot_reference_a_nonexistent_user()
    {
        // Regression guard for the missing-FK finding in code review.
        var module = new LearningModule { Code = "module-09", Title = "T9", OrderNo = 9 };
        _db.Modules.Add(module);
        await _db.SaveChangesAsync();

        _db.Progress.Add(new ProgressRecord { UserId = "ghost-user", ModuleId = module.Id });
        await Assert.ThrowsAsync<DbUpdateException>(() => _db.SaveChangesAsync());
    }

    [Fact]
    public async Task Module_codes_are_unique()
    {
        _db.Modules.Add(new LearningModule { Code = "module-05", Title = "First", OrderNo = 5 });
        await _db.SaveChangesAsync();

        _db.Modules.Add(new LearningModule { Code = "module-05", Title = "Duplicate", OrderNo = 6 });
        await Assert.ThrowsAsync<DbUpdateException>(() => _db.SaveChangesAsync());
    }

    public void Dispose()
    {
        _db.Dispose();
        _connection.Dispose();
    }
}
