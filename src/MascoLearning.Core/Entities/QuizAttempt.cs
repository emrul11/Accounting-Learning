namespace MascoLearning.Core.Entities;

/// <summary>
/// One graded quiz submission by one learner for one module.
/// Answers are stored as JSON so attempts can be regraded later
/// (e.g. when the question bank moves fully server-side).
/// </summary>
public class QuizAttempt
{
    public int Id { get; set; }

    public string UserId { get; set; } = string.Empty;

    public int ModuleId { get; set; }
    public LearningModule Module { get; set; } = null!;

    public int Score { get; set; }

    public int Total { get; set; }

    /// <summary>Rounded percentage 0-100.</summary>
    public int Percentage { get; set; }

    /// <summary>Persisted at the time of the attempt; rates/rules may change.</summary>
    public int PassMark { get; set; } = 80;

    /// <summary>JSON array of selected option indices, e.g. "[2,0,1,...]".</summary>
    public string AnswersJson { get; set; } = "[]";

    public DateTime AttemptedAtUtc { get; set; }
}
