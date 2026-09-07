using MascoLearning.Api.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging.Abstractions;
using Xunit;

namespace MascoLearning.Api.Tests;

/// <summary>
/// The quiz bank is the anti-cheat core of the platform: the browser loads
/// the same JSON the server grades against. These tests lock down its
/// parsing and validation rules.
/// </summary>
public class QuizBankTests : IDisposable
{
    private readonly string _root;
    private readonly FileSystemQuizBank _bank;

    public QuizBankTests()
    {
        _root = Path.Combine(Path.GetTempPath(), "quizbank-tests-" + Guid.NewGuid().ToString("N"));
        Directory.CreateDirectory(Path.Combine(_root, "modules", "data"));
        _bank = new FileSystemQuizBank(new FakeEnv { WebRootPath = _root }, NullLogger<FileSystemQuizBank>.Instance);
    }

    [Fact]
    public async Task LoadAsync_valid_file_returns_questions_and_pass_mark()
    {
        var json = """
        {
          "moduleCode": "module-00",
          "passMark": 80,
          "questions": [
            {
              "scenario": "A truck arrives. What happens?",
              "options": ["Entry", "Document", "Event", "Nothing"],
              "correct": 2,
              "explanation": "The physical arrival is the event.",
              "wrongExplanations": [
                "An entry needs a document first.",
                "A document is the proof, not the happening.",
                "",
                "Something definitely happened — the truck is right there."
              ]
            },
            {
              "scenario": "A signed GRN is what?",
              "options": ["Event", "Document", "Entry", "Ledger"],
              "correct": 1,
              "explanation": "A GRN is the proof document.",
              "wrongExplanations": [
                "The event was the physical arrival.",
                "",
                "The entry happens later, in the system.",
                "A ledger is a book of accounts."
              ]
            }
          ]
        }
        """;
        await File.WriteAllTextAsync(Path.Combine(_root, "modules", "data", "module-00.json"), json);

        var result = await _bank.LoadAsync("module-00");

        Assert.NotNull(result);
        Assert.Equal("module-00", result!.ModuleCode);
        Assert.Equal(80, result.PassMark);
        Assert.Equal(2, result.Questions.Count);
        Assert.Equal(2, result.Questions[0].Correct);
    }

    [Fact]
    public async Task LoadAsync_missing_file_returns_null()
    {
        var result = await _bank.LoadAsync("module-99");
        Assert.Null(result);
    }

    [Fact]
    public async Task LoadAsync_rejects_wrong_length_wrongExplanations()
    {
        // Regression guard for the alignment bug found in content review:
        // 4 options but only 3 explanations (correct index has no slot).
        var json = """
        {
          "moduleCode": "module-02",
          "passMark": 80,
          "questions": [
            {
              "scenario": "Aligned?",
              "options": ["A", "B", "C", "D"],
              "correct": 1,
              "explanation": "B is correct.",
              "wrongExplanations": [
                "Why A fails.",
                "Why C fails.",
                "Why D fails."
              ]
            }
          ]
        }
        """;
        await File.WriteAllTextAsync(Path.Combine(_root, "modules", "data", "module-02.json"), json);

        var result = await _bank.LoadAsync("module-02");

        // Misaligned arrays would show one learner the wrong option's note.
        Assert.Null(result);
    }

    [Fact]
    public async Task LoadAsync_accepts_aligned_wrongExplanations()
    {
        var json = """
        {
          "moduleCode": "module-02",
          "passMark": 80,
          "questions": [
            {
              "scenario": "Aligned?",
              "options": ["A", "B", "C", "D"],
              "correct": 1,
              "explanation": "B is correct.",
              "wrongExplanations": [
                "Why A fails.",
                "",
                "Why C fails.",
                "Why D fails."
              ]
            }
          ]
        }
        """;
        await File.WriteAllTextAsync(Path.Combine(_root, "modules", "data", "module-02.json"), json);

        var result = await _bank.LoadAsync("module-02");

        Assert.NotNull(result);
    }

    [Theory]
    [InlineData(null)]
    [InlineData(0)]
    [InlineData(101)]
    public async Task LoadAsync_rejects_missing_or_out_of_range_passMark(int? badPassMark)
    {
        var passMarkJson = badPassMark is null ? "" : $"\"passMark\": {badPassMark},";
        var json = """
        {
          "moduleCode": "module-03",
          PASSMARK_PLACEHOLDER
          "questions": [
            {
              "scenario": "Anything",
              "options": ["A", "B"],
              "correct": 0,
              "explanation": "Because."
            }
          ]
        }
        """.Replace("PASSMARK_PLACEHOLDER", passMarkJson);
        await File.WriteAllTextAsync(Path.Combine(_root, "modules", "data", "module-03.json"), json);

        var result = await _bank.LoadAsync("module-03");

        // A silently defaulted/clamped pass mark hides author errors.
        Assert.Null(result);
    }

    [Theory]
    [InlineData("module")]              // no dash
    [InlineData("../secrets")]          // path traversal attempt
    [InlineData("module/../module-00")] // traversal attempt
    [InlineData("")]
    public async Task LoadAsync_rejects_unsafe_or_malformed_slugs(string slug)
    {
        var result = await _bank.LoadAsync(slug);
        Assert.Null(result);
    }

    [Fact]
    public async Task LoadAsync_file_with_out_of_range_correct_index_is_rejected()
    {
        var json = """
        {
          "moduleCode": "module-01",
          "questions": [
            {
              "scenario": "Broken question",
              "options": ["A", "B"],
              "correct": 7,
              "explanation": "correct index does not exist"
            }
          ]
        }
        """;
        await File.WriteAllTextAsync(Path.Combine(_root, "modules", "data", "module-01.json"), json);

        var result = await _bank.LoadAsync("module-01");

        // A question whose answer index points nowhere must never reach the grader.
        Assert.Null(result);
    }

    [Fact]
    public async Task LoadAsync_malformed_json_returns_null_not_exception()
    {
        await File.WriteAllTextAsync(
            Path.Combine(_root, "modules", "data", "appendix-a.json"),
            "{ this is not json ");

        var result = await _bank.LoadAsync("appendix-a");

        Assert.Null(result);
    }

    public void Dispose()
    {
        try { Directory.Delete(_root, recursive: true); } catch { /* best effort */ }
    }

    private sealed class FakeEnv : IWebHostEnvironment
    {
        public string WebRootPath { get; set; } = string.Empty;
        public IFileProvider WebRootFileProvider { get; set; } = new NullFileProvider();
        public string ApplicationName { get; set; } = "test";
        public IFileProvider ContentRootFileProvider { get; set; } = new NullFileProvider();
        public string ContentRootPath { get; set; } = "/";
        public string EnvironmentName { get; set; } = "Development";
    }
}
