using MascoLearning.Core.Entities;
using MascoLearning.Core.Enums;
using MascoLearning.Infrastructure.Data;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace MascoLearning.Infrastructure.Data;

public class AppDbContext : IdentityDbContext<AppUser>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<LearningModule> Modules => Set<LearningModule>();
    public DbSet<QuizAttempt> QuizAttempts => Set<QuizAttempt>();
    public DbSet<ProgressRecord> Progress => Set<ProgressRecord>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<LearningModule>(e =>
        {
            e.HasIndex(m => m.Code).IsUnique();
            e.Property(m => m.Code).HasMaxLength(50).IsRequired();
            e.Property(m => m.Title).HasMaxLength(200).IsRequired();
        });

        builder.Entity<QuizAttempt>(e =>
        {
            e.HasIndex(a => new { a.UserId, a.ModuleId });
            // Long free-text JSON: SQL Server maps this to nvarchar(max) by default.
            e.Property(a => a.AnswersJson);
        });

        // Referential integrity for user-owned rows: no orphans when users
        // are removed, and invalid user ids cannot be inserted.
        builder.Entity<QuizAttempt>()
            .HasOne<AppUser>()
            .WithMany()
            .HasForeignKey(a => a.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Entity<ProgressRecord>()
            .HasOne<AppUser>()
            .WithMany()
            .HasForeignKey(p => p.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Entity<ProgressRecord>(e =>
        {
            e.HasIndex(p => new { p.UserId, p.ModuleId }).IsUnique();
            e.Property(p => p.Status)
                .HasConversion(
                    s => (int)s,
                    v => (ProgressStatus)v);
        });

        // Restrict delete: keep attempts/progress if a module row is ever removed.
        builder.Entity<QuizAttempt>()
            .HasOne(a => a.Module)
            .WithMany()
            .HasForeignKey(a => a.ModuleId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Entity<ProgressRecord>()
            .HasOne(p => p.Module)
            .WithMany()
            .HasForeignKey(p => p.ModuleId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
