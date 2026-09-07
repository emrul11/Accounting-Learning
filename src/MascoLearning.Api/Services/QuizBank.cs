using System.Text.Json;
using MascoLearning.Core.DTOs;

namespace MascoLearning.Api.Services;

/// <summary>
/// Loads quiz definitions from wwwroot/modules/data/{moduleCode}.json and
/// grades submissions SERVER-SIDE. The browser fetches the same files for
/// rendering, so there is one source of truth — and clients cannot report
/// a fake score because the server recomputes it from the same JSON.
/// </summary>
public interface IQuizBank
{
    Task<QuizBankFile?> LoadAsync(string moduleCode, CancellationToken ct = default);
}

public record QuizBankFile(
    string ModuleCode,
    int PassMark,
    IReadOnlyList<QuizQuestion> Questions);

public record QuizQuestion(
    string Scenario,
    IReadOnlyList<string> Options,
    int Correct,
    string Explanation);

public class FileSystemQuizBank : IQuizBank
{
    private readonly IWebHostEnvironment _env;
    private readonly ILogger<FileSystemQuizBank> _logger;

    public FileSystemQuizBank(IWebHostEnvironment env, ILogger<FileSystemQuizBank> logger)
    {
        _env = env;
        _logger = logger;
    }

    public async Task<QuizBankFile?> LoadAsync(string moduleCode, CancellationToken ct = default)
    {
        // Defense-in-depth: code must be a simple slug ("module-00", "appendix-a"),
        // so no path tricks can reach outside the quiz folder.
        if (string.IsNullOrWhiteSpace(moduleCode) || moduleCode.Length > 40)
        {
            return null;
        }
        if (moduleCode.Any(c => !(char.IsAsciiLetterOrDigit(c) || c == '-')))
        {
            return null;
        }

        var path = Path.Combine(_env.WebRootPath ?? "wwwroot", "modules", "data", $"{moduleCode}.json");
        if (!File.Exists(path))
        {
            return null;
        }

        try
        {
            await using var stream = File.OpenRead(path);
            var raw = await JsonSerializer.DeserializeAsync<QuizBankRaw>(stream, JsonOpts, ct);
            if (raw is null || raw.Questions is null || raw.Questions.Count == 0)
            {
                return null;
            }

            // Pass mark must be explicit and sane — never silently defaulted
            // or clamped, so authors see their mistakes immediately.
            if (raw.PassMark is null || raw.PassMark < 1 || raw.PassMark > 100)
            {
                _logger.LogWarning(
                    "Quiz bank {Module} rejected: passMark missing or outside 1-100.", moduleCode);
                return null;
            }

            // Validate every question: correct index must exist inside options,
            // and every WRONG option must carry its own explanation.
            foreach (var q in raw.Questions)
            {
                if (q.Options is null || q.Options.Count < 2 ||
                    q.Correct < 0 || q.Correct >= q.Options.Count ||
                    string.IsNullOrWhiteSpace(q.Scenario) ||
                    string.IsNullOrWhiteSpace(q.Explanation))
                {
                    _logger.LogWarning("Quiz bank {Module} has an invalid question entry.", moduleCode);
                    return null;
                }

                if (!IsWrongExplanationsValid(q.WrongExplanations, q.Options.Count, q.Correct, requirePresent: true) ||
                    !IsWrongExplanationsValid(q.WrongExplanationsBn, q.Options.Count, q.Correct, requirePresent: false))
                {
                    _logger.LogWarning(
                        "Quiz bank {Module} rejected: wrongExplanations must exist, match option count, and explain every wrong option.",
                        moduleCode);
                    return null;
                }
            }

            return new QuizBankFile(
                raw.ModuleCode ?? moduleCode,
                raw.PassMark.Value,
                raw.Questions
                    .Select(q => new QuizQuestion(q.Scenario!, q.Options!, q.Correct, q.Explanation!))
                    .ToList());
        }
        catch (JsonException ex)
        {
            _logger.LogError(ex, "Quiz bank {Module} is not valid JSON.", moduleCode);
            return null;
        }
    }

    private static bool IsWrongExplanationsValid(
        List<string>? list, int optionCount, int correctIndex, bool requirePresent)
    {
        // English explanations are mandatory; Bangla stays optional until the
        // full translation ships.
        if (list is null) return !requirePresent;
        if (list.Count != optionCount) return false;
        for (var i = 0; i < list.Count; i++)
        {
            // Every WRONG option needs a visible explanation; the correct
            // index holds an empty placeholder by convention.
            if (i == correctIndex) continue;
            if (string.IsNullOrWhiteSpace(list[i])) return false;
        }
        return true;
    }

    private sealed class QuizBankRaw
    {
        public string? ModuleCode { get; set; }
        public int? PassMark { get; set; }
        public List<QuizQuestionRaw>? Questions { get; set; }
    }

    private sealed class QuizQuestionRaw
    {
        public string? Scenario { get; set; }
        public List<string>? Options { get; set; }
        public int Correct { get; set; } = -1;
        public string? Explanation { get; set; }
        public List<string>? WrongExplanations { get; set; }
        public List<string>? WrongExplanationsBn { get; set; }
    }

    private static readonly JsonSerializerOptions JsonOpts = new(JsonSerializerDefaults.Web);
}
