namespace MascoLearning.Core.Entities;

/// <summary>
/// A learning unit (module or appendix) shown on the site.
/// Seeded from code so content structure is version-controlled.
/// </summary>
public class LearningModule
{
    public int Id { get; set; }

    /// <summary>URL-friendly identifier, e.g. "module-04", "appendix-b".</summary>
    public string Code { get; set; } = string.Empty;

    public string Title { get; set; } = string.Empty;

    /// <summary>
    /// Sort position in the learning path. Appendices sort after modules.
    /// </summary>
    public int OrderNo { get; set; }

    public bool IsAppendix { get; set; }

    public bool IsActive { get; set; } = true;
}
