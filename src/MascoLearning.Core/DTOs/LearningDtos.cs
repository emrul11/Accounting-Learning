using MascoLearning.Core.Enums;
using System.ComponentModel.DataAnnotations;

namespace MascoLearning.Core.DTOs;

/// <summary>Module entry with the requesting learner's status.</summary>
public record ModuleDto(
    int Id,
    string Code,
    string Title,
    int OrderNo,
    bool IsAppendix,
    ProgressStatus Status,
    DateTime? CompletedAtUtc,
    int? BestScorePercent);

/// <summary>Learner submits selected option indices, in question order.</summary>
public record SubmitAttemptRequest(
    [property: Required, MinLength(1), MaxLength(60)] IReadOnlyList<int> SelectedAnswers);

public record AttemptResultDto(
    int AttemptId,
    string ModuleCode,
    int Score,
    int Total,
    int Percentage,
    int PassMark,
    bool Passed,
    IReadOnlyList<GradedAnswerDto> GradedAnswers);

/// <summary>Server-side verdict for each question so the UI cannot fake it.</summary>
public record GradedAnswerDto(int QuestionIndex, int Selected, int Correct, bool IsCorrect);

public record MyReportDto(
    UserDto User,
    int ModulesCompleted,
    int ModulesTotal,
    IReadOnlyList<ModuleProgressDto> Modules,
    IReadOnlyList<AttemptSummaryDto> RecentAttempts);

public record ModuleProgressDto(
    string Code,
    string Title,
    ProgressStatus Status,
    DateTime? CompletedAtUtc,
    int Attempts,
    int BestScorePercent);

public record AttemptSummaryDto(
    string ModuleCode,
    string ModuleTitle,
    int Score,
    int Total,
    int Percentage,
    bool Passed,
    DateTime AttemptedAtUtc);
