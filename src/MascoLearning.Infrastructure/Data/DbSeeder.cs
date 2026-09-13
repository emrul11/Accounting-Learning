using MascoLearning.Core.Entities;
using MascoLearning.Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace MascoLearning.Infrastructure.Data;

/// <summary>
/// Idempotent seeder: creates roles, the initial admin, and the module
/// catalog. Safe to run on every startup — it only inserts what is missing.
/// </summary>
public static class DbSeeder
{
    public const string RoleAdmin = "Admin";
    public const string RoleManager = "Manager";
    public const string RoleLearner = "Learner";

    public static readonly string[] AllRoles = { RoleAdmin, RoleManager, RoleLearner };

    /// <summary>
    /// Default seed admin. MUST be disabled or re-passworded immediately
    /// after first login in any real deployment.
    /// </summary>
    public const string SeedAdminEmail = "admin@masco.local";
    public const string SeedAdminPassword = "ChangeMe!2026";

    /// <summary>Demo accounts (one per role) for evaluation without signup.</summary>
    public const string DemoPassword = "Demo@2026";
    private static readonly (string Email, string FullName, string Role)[] DemoUsers =
    {
        ("learner.demo@masco.local", "Demo Learner", RoleLearner),
        ("manager.demo@masco.local", "Demo Manager", RoleManager),
        ("admin.demo@masco.local", "Demo Admin", RoleAdmin),
    };

    private static readonly (string Code, string Title, int OrderNo)[] ModuleCatalog =
    {
        ("module-00", "How Business Becomes Accounting", 0),
        ("module-01", "Double-Entry Bookkeeping", 1),
        ("module-02", "Chart of Accounts", 2),
        ("module-03", "Subledger vs General Ledger", 3),
        ("module-04", "The Posting Engine", 4),
        ("module-05", "Process Costing", 5),
        ("module-06", "Inventory & COGS", 6),
        ("module-07", "Foreign Currency & Letter of Credit", 7),
        ("module-08", "Payroll & Labor Costs", 8),
        ("module-09", "Accounts Payable & Receivable", 9),
        ("module-10", "Fixed Assets & Depreciation", 10),
        ("module-11", "Financial Statements", 11),
        ("module-12", "Audit & Controls", 12),
        ("module-13", "Real-World Exceptions", 13),
        ("module-14", "VAT & Tax (Bangladesh)", 14),
        ("module-15", "Capstone: One Month at Masco", 15),
        ("appendix-a", "Appendix A: Bangladesh RMG Glossary", 100),
        ("appendix-b", "Appendix B: Document Types Reference", 101),
        ("appendix-c", "Appendix C: Role-Based Quick Guides", 102),
        ("appendix-d", "Appendix D: Cross-Reference Index", 103),
    };

    public static async Task SeedAsync(IServiceProvider services, bool seedDemoUsers = true)
    {
        var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
        var userManager = services.GetRequiredService<UserManager<AppUser>>();
        var db = services.GetRequiredService<AppDbContext>();

        // --- Roles ---
        foreach (var role in AllRoles)
        {
            if (!await roleManager.RoleExistsAsync(role))
            {
                await roleManager.CreateAsync(new IdentityRole(role));
            }
        }

        // --- Seed admin ---
        if (await userManager.FindByEmailAsync(SeedAdminEmail) is null)
        {
            var admin = new AppUser
            {
                UserName = SeedAdminEmail,
                Email = SeedAdminEmail,
                EmailConfirmed = true,
                FullName = "Site Administrator",
                Department = "IT",
            };
            var result = await userManager.CreateAsync(admin, SeedAdminPassword);
            if (result.Succeeded)
            {
                await userManager.AddToRolesAsync(admin, new[] { RoleAdmin, RoleManager });
            }
        }

        // --- Module catalog ---
        foreach (var (code, title, orderNo) in ModuleCatalog)
        {
            var exists = await db.Modules.AnyAsync(m => m.Code == code);
            if (!exists)
            {
                db.Modules.Add(new LearningModule
                {
                    Code = code,
                    Title = title,
                    OrderNo = orderNo,
                    IsAppendix = code.StartsWith("appendix"),
                });
            }
        }
        await db.SaveChangesAsync();

        // --- Demo accounts (evaluation without signup) ---
        // Disabled in production via "SeedDemoUsers": false.
        if (seedDemoUsers)
        {
            foreach (var (email, fullName, role) in DemoUsers)
            {
                if (await userManager.FindByEmailAsync(email) is null)
                {
                    var demo = new AppUser
                    {
                        UserName = email,
                        Email = email,
                        EmailConfirmed = true,
                        FullName = fullName,
                        Department = "Demo",
                    };
                    if ((await userManager.CreateAsync(demo, DemoPassword)).Succeeded)
                    {
                        await userManager.AddToRoleAsync(demo, role);
                    }
                }
            }
        }
    }
}
