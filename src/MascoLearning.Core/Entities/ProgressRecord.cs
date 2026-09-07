using MascoLearning.Core.Enums;

namespace MascoLearning.Core.Entities;

/// <summary>
/// A learner's current state for one module. One row per (user, module).
/// </summary>
public class ProgressRecord
{
    public int Id { get; set; }

    public string UserId { get; set; } = string.Empty;

    public int ModuleId { get; set; }
    public LearningModule Module { get; set; } = null!;

    public ProgressStatus Status { get; set; } = ProgressStatus.NotStarted;

    public DateTime LastAccessedAtUtc { get; set; }

    public DateTime? CompletedAtUtc { get; set; }
}
