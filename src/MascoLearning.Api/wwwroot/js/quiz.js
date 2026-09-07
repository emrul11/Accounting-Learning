/**
 * MASCO ACCOUNTING LEARNING SITE
 * Quiz Engine — Vanilla JavaScript
 * Renders quizzes from /modules/data/{moduleCode}.json and submits every
 * attempt to the backend, which re-grades it SERVER-SIDE before saving.
 * No frameworks, no dependencies.
 *
 * Usage on a module page:
 *   <div id="quiz-container"></div>
 *   <script src="/js/quiz.js"></script>
 *   <script>initQuizFromJson("module-00");</script>
 */

(function () {
  "use strict";

  // ============================================
  // QUIZ ENGINE CLASS
  // ============================================

  class QuizEngine {
    constructor(containerId, questions, options = {}) {
      this.container = document.getElementById(containerId);
      if (!this.container) {
        console.error(`Quiz container #${containerId} not found`);
        return;
      }

      this.questions = questions || [];
      this.moduleCode = options.moduleCode || null;
      this.passMark = options.passMark || 80; // from the loaded quiz bank
      this.currentIndex = 0;
      this.score = 0;
      this.answers = []; // Track user's answers for review
      this.selectedOption = undefined;
      this.hasAnswered = false;
      this.submittedToServer = false;

      this.init();
    }

    init() {
      this.renderQuizContainer();
      this.loadQuestion();
    }

    // Build the HTML structure for the quiz
    renderQuizContainer() {
      this.container.innerHTML = `
                <div class="quiz-wrapper">
                    <div class="quiz-header">
                        <span class="quiz-progress">Question <span id="current-q">1</span> of <span id="total-q">${this.questions.length}</span></span>
                        <span class="quiz-score">Score: <span id="current-score">0</span></span>
                    </div>

                    <div class="quiz-progress-bar">
                        <div class="quiz-progress-fill" id="progress-fill" style="width: 0%"></div>
                    </div>

                    <div class="quiz-question-area" id="question-area">
                        <div class="scenario-label">Scenario</div>
                        <p class="question-text" id="question-text"></p>

                        <div class="options-list" id="options-list"></div>

                        <div class="feedback-area" id="feedback-area" style="display: none;">
                            <div class="feedback-content" id="feedback-content"></div>
                        </div>
                    </div>

                    <div class="quiz-controls">
                        <button class="btn btn-secondary" id="btn-prev" style="visibility: hidden;">← Previous</button>
                        <button class="btn btn-primary" id="btn-submit" disabled>Submit Answer</button>
                        <button class="btn btn-primary" id="btn-next" style="display: none;">Next →</button>
                    </div>

                    <div class="quiz-results" id="quiz-results" style="display: none;"></div>
                </div>
            `;

      // Cache DOM references
      this.dom = {
        currentQ: document.getElementById("current-q"),
        totalQ: document.getElementById("total-q"),
        currentScore: document.getElementById("current-score"),
        progressFill: document.getElementById("progress-fill"),
        questionText: document.getElementById("question-text"),
        optionsList: document.getElementById("options-list"),
        feedbackArea: document.getElementById("feedback-area"),
        feedbackContent: document.getElementById("feedback-content"),
        btnPrev: document.getElementById("btn-prev"),
        btnSubmit: document.getElementById("btn-submit"),
        btnNext: document.getElementById("btn-next"),
        quizResults: document.getElementById("quiz-results"),
        questionArea: document.getElementById("question-area"),
      };

      // Bind events
      this.dom.btnSubmit.addEventListener("click", () => this.submitAnswer());
      this.dom.btnNext.addEventListener("click", () => this.nextQuestion());
      this.dom.btnPrev.addEventListener("click", () => this.prevQuestion());
    }

    // Load current question
    loadQuestion() {
      const q = this.questions[this.currentIndex];
      this.hasAnswered = this.answers[this.currentIndex] !== undefined;

      // Update progress
      this.dom.currentQ.textContent = this.currentIndex + 1;
      this.dom.currentScore.textContent = this.score;
      const progressPercent = (this.currentIndex / this.questions.length) * 100;
      this.dom.progressFill.style.width = `${progressPercent}%`;

      // Update question text (Bangla fields preferred when lang=bn)
      this.dom.questionText.textContent = this.pick(q, "scenario");

      // Render options
      this.renderOptions(q);

      // Reset feedback
      this.dom.feedbackArea.style.display = "none";
      this.dom.feedbackContent.innerHTML = "";

      // Update buttons
      this.updateButtons();

      // If already answered, show the saved state
      if (this.hasAnswered) {
        this.showAnsweredState(q);
      }
    }

    /**
     * Language-aware field picker: prefers "<field>Bn" when the site
     * language is Bangla AND a translation exists in the quiz bank,
     * otherwise falls back to the English field. Quiz banks become
     * bilingual by simply ADDING the Bn fields — no other changes.
     */
    pick(obj, field) {
      if (window.MascoI18N && window.MascoI18N.isBn()) {
        const bn = obj[field + "Bn"];
        if (bn !== undefined && bn !== null && bn !== "") return bn;
      }
      return obj[field];
    }

    /** Array variant for option lists: banks must provide complete
     *  optionsBn arrays (same length) or English is used wholesale. */
    pickArray(obj, field, bnField) {
      if (window.MascoI18N && window.MascoI18N.isBn()) {
        const bn = obj[bnField];
        if (Array.isArray(bn) && bn.length === obj[field].length) return bn;
      }
      return obj[field];
    }

    // Render option buttons
    renderOptions(question) {
      this.dom.optionsList.innerHTML = "";

      const options = this.pickArray(question, "options", "optionsBn");

      options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.dataset.index = index;
        btn.innerHTML = `
                    <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                    <span class="option-text">${this.escapeHtml(option)}</span>
                `;

        btn.addEventListener("click", () => this.selectOption(index));
        this.dom.optionsList.appendChild(btn);
      });
    }

    // Handle option selection
    selectOption(index) {
      if (this.hasAnswered) return; // Prevent changing after submit

      // Remove previous selection
      this.dom.optionsList.querySelectorAll(".option-btn").forEach((btn) => {
        btn.classList.remove("selected");
      });

      // Add selection to clicked button
      const selected = this.dom.optionsList.querySelector(
        `[data-index="${index}"]`,
      );
      selected.classList.add("selected");

      // Enable submit
      this.dom.btnSubmit.disabled = false;
      this.selectedOption = index;
    }

    // Submit answer and show feedback
    submitAnswer() {
      if (this.selectedOption === undefined) return;

      const q = this.questions[this.currentIndex];
      const isCorrect = this.selectedOption === q.correct;

      // Record answer
      this.answers[this.currentIndex] = {
        selected: this.selectedOption,
        correct: isCorrect,
        question: q,
      };

      this.hasAnswered = true;

      // Update score
      if (isCorrect) {
        this.score++;
        this.dom.currentScore.textContent = this.score;
      }

      // Show visual feedback on options
      this.showOptionFeedback(q);

      // Show explanation
      this.showFeedback(q, isCorrect);

      // Update buttons
      this.updateButtons();
    }

    // Highlight correct/incorrect options
    showOptionFeedback(question) {
      const buttons = this.dom.optionsList.querySelectorAll(".option-btn");

      buttons.forEach((btn, index) => {
        btn.disabled = true; // Prevent further clicks

        if (index === question.correct) {
          btn.classList.add("correct");
        } else if (
          index === this.selectedOption &&
          index !== question.correct
        ) {
          btn.classList.add("incorrect");
        }
      });
    }

    // Show answered state (when navigating back)
    showAnsweredState(question) {
      const recorded = this.answers[this.currentIndex];

      // Show selection
      const buttons = this.dom.optionsList.querySelectorAll(".option-btn");
      buttons.forEach((btn, index) => {
        btn.disabled = true;
        if (index === question.correct) {
          btn.classList.add("correct");
        } else if (index === recorded.selected && !recorded.correct) {
          btn.classList.add("incorrect");
        }
      });

      // Show feedback
      this.showFeedback(question, recorded.correct);
    }

    // Display feedback panel
    showFeedback(question, isCorrect) {
      const bn = window.MascoI18N && window.MascoI18N.isBn();
      const icon = isCorrect ? "✓" : "✗";
      const statusClass = isCorrect ? "feedback-correct" : "feedback-incorrect";
      const statusText = isCorrect ? (bn ? "সঠিক" : "Correct")
                                   : (bn ? "ভুল" : "Incorrect");
      const options = this.pickArray(question, "options", "optionsBn");
      const correctText = options[question.correct];

      let whyWrong = "";
      const wrongList = (bn && Array.isArray(question.wrongExplanationsBn))
        ? question.wrongExplanationsBn
        : question.wrongExplanations;
      if (
        !isCorrect &&
        Array.isArray(wrongList) &&
        wrongList[this.selectedOption]
      ) {
        whyWrong = `<p class="wrong-why"><strong>${bn ? "আপনার উত্তর কেন ভুল:" : "Why your choice is wrong:"}</strong> ${wrongList[this.selectedOption]}</p>`;
      }

      const answerLabel = bn ? "উত্তর" : "Answer";

      this.dom.feedbackContent.innerHTML = `
                <div class="feedback-header ${statusClass}">
                    <span class="feedback-icon">${icon}</span>
                    <span class="feedback-status">${statusText}</span>
                </div>
                <div class="feedback-explanation">
                    <p><strong>${answerLabel}:</strong> ${String.fromCharCode(65 + question.correct)} — ${correctText}</p>
                    <p>${this.pick(question, "explanation")}</p>
                    ${whyWrong}
                </div>
            `;

      this.dom.feedbackArea.style.display = "block";
    }

    // Update button states
    updateButtons() {
      // Previous button visibility
      this.dom.btnPrev.style.visibility =
        this.currentIndex > 0 ? "visible" : "hidden";

      if (this.hasAnswered) {
        // After answering: hide submit, show next (or finish)
        this.dom.btnSubmit.style.display = "none";

        if (this.currentIndex < this.questions.length - 1) {
          this.dom.btnNext.textContent = "Next →";
          this.dom.btnNext.style.display = "inline-block";
        } else {
          this.dom.btnNext.textContent = "See Results";
          this.dom.btnNext.style.display = "inline-block";
        }
      } else {
        // Before answering: show submit (disabled until selection)
        this.dom.btnSubmit.style.display = "inline-block";
        this.dom.btnSubmit.disabled = this.selectedOption === undefined;
        this.dom.btnNext.style.display = "none";
      }
    }

    // Go to next question or show results
    nextQuestion() {
      if (this.currentIndex < this.questions.length - 1) {
        this.currentIndex++;
        this.selectedOption = undefined;
        this.loadQuestion();
      } else {
        this.showResults();
      }
    }

    // Go to previous question
    prevQuestion() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.selectedOption = this.answers[this.currentIndex]?.selected;
        this.loadQuestion();
      }
    }

    // Selected answer indices in question order (what the server grades)
    getSelectedAnswerIndices() {
      return this.questions.map(
        (_, i) => (this.answers[i] && this.answers[i].selected) ?? -1,
      );
    }

    // Submit the completed attempt to the server (best effort)
    async submitToServer() {
      if (!this.moduleCode) return { ok: false, reason: "no-module" };
      const API = window.MascoAPI;
      if (!API || !API.isLoggedIn()) return { ok: false, reason: "guest" };
      if (!window.MascoProgress) return { ok: false, reason: "no-progress-lib" };

      try {
        const result = await window.MascoProgress.submitQuizAttempt(
          this.moduleCode,
          this.getSelectedAnswerIndices(),
        );
        return { ok: true, result }; // result.percentage is the server's verdict
      } catch (err) {
        console.warn("Server grading failed:", err.message);
        return { ok: false, reason: err.message };
      }
    }

    // Display final results
    async showResults() {
      const bn = window.MascoI18N && window.MascoI18N.isBn();
      const percentage = Math.round((this.score / this.questions.length) * 100);
      const passed = percentage >= this.passMark; // bank-configured pass mark

      // Fire the server submission first so the verdict is authoritative.
      const serverOutcome = await this.submitToServer();

      let message, messageClass, title;
      const strongPass = percentage >= 90;
      if (percentage >= Math.max(this.passMark + 10, 85)) {
        message = bn ? "চমৎকার! এই ধারণাগুলোতে আপনার দখল অনেক শক্ত।" : "Excellent! You have a strong grasp of these concepts.";
        messageClass = "result-excellent";
      } else if (passed) {
        message = bn ? "বাহ! মূল ধারণাগুলো আপনি বুঝেছেন।" : "Good job! You understand the core concepts.";
        messageClass = "result-good";
      } else if (percentage >= 60) {
        message = bn ? "মোটামুটি। পরের ধাপে যাওয়ার আগে পাঠ ও উদাহরণ আবার দেখুন।" : "Fair. Review the lesson and worked example before moving on.";
        messageClass = "result-fair";
      } else {
        message = bn ? "আরও অনুশীলন দরকার। এই মডিউলটি আবার পড়ে নিন।" : "Needs improvement. Please re-read this module before proceeding.";
        messageClass = "result-needs-work";
      }
      title = passed ? (bn ? "মডিউল সম্পন্ন" : "Module Complete")
                     : (bn ? "শেখা চালিয়ে যান" : "Keep Learning");

      // Hide question area, show results
      this.dom.questionArea.style.display = "none";
      this.dom.btnPrev.style.visibility = "hidden";
      this.dom.btnNext.style.display = "none";

      // Build review of wrong answers
      const wrongAnswers = this.answers.filter((a) => !a.correct);
      let reviewHtml = "";

      if (wrongAnswers.length > 0) {
        const reviewTitle = bn ? "এই প্রশ্নগুলো আবার দেখুন" : "Review These Questions";
        const correctLabel = bn ? "সঠিক উত্তর" : "Correct answer";
        reviewHtml = `
                    <div class="result-review">
                        <h4>${reviewTitle}</h4>
                        ${wrongAnswers
                          .map(
                            (a, i) => `
                            <div class="review-item">
                                <p class="review-question"><strong>Q:</strong> ${this.pick(a.question, "scenario").substring(0, 100)}...</p>
                                <p class="review-correct"><strong>${correctLabel}:</strong> ${String.fromCharCode(65 + a.question.correct)} — ${this.pickArray(a.question, "options", "optionsBn")[a.question.correct]}</p>
                            </div>
                        `,
                          )
                          .join("")}
                    </div>
                `;
      }

      // Server verification banner
      let serverBanner = "";
      if (serverOutcome.ok) {
        const r = serverOutcome.result;
        serverBanner = r.passed
          ? (bn
              ? `<div class="server-banner ok">সার্ভার সংরক্ষণ ও যাচাই করেছে — মডিউল <strong>সম্পন্ন</strong> হিসেবে চিহ্নিত। এটি আপনার ড্যাশবোর্ড ও ম্যানেজারের রিপোর্টে দেখা যাবে।</div>`
              : `<div class="server-banner ok">Saved &amp; verified by the server — module marked <strong>Completed</strong>. This shows on your dashboard and your manager's report.</div>`)
          : (bn
              ? `<div class="server-banner warn">চেষ্টা সংরক্ষিত (${r.percentage}%)। পাস করতে ${r.passMark}% দরকার।</div>`
              : `<div class="server-banner warn">Attempt saved (${r.percentage}%). You need ${r.passMark}% to pass this module.</div>`);
      } else if (serverOutcome.reason === "guest") {
        serverBanner = bn
          ? `<div class="server-banner warn">আপনি লগ ইন করেননি — এই ফলাফল <strong>সংরক্ষিত হয়নি</strong>। অগ্রগতি ট্র্যাক করতে <a href="/login.html">লগ ইন</a> করুন।</div>`
          : `<div class="server-banner warn">
                        You are not logged in — this attempt was <strong>not saved</strong>.
                        <a href="/login.html">Log in</a> to track progress and retake anytime.
                    </div>`;
      } else if (serverOutcome.reason !== "no-module") {
        serverBanner = `<div class="server-banner warn">${bn ? "ফলাফল সংরক্ষণ করা যায়নি:" : "Could not save this attempt:"} ${this.escapeHtml(String(serverOutcome.reason))}</div>`;
      }

      const retakeLabel = bn ? "আবার কুইজ দিন" : "Retake Quiz";
      const backLabel = bn ? "পাঠে ফিরুন" : "Back to Lesson";
      const dashLabel = bn ? "আমার ড্যাশবোর্ড" : "My Dashboard";

      this.dom.quizResults.innerHTML = `
                <div class="results-panel ${messageClass}">
                    <div class="results-score-circle">
                        <span class="results-percentage">${percentage}%</span>
                        <span class="results-fraction">${this.score} / ${this.questions.length}</span>
                    </div>
                    <h3 class="results-title">${title}</h3>
                    <p class="results-message">${message}</p>
                    ${!passed ? `<p class="results-hint">Aim for ${this.passMark}% before moving to the next module.</p>` : ""}
                </div>
                ${serverBanner}
                ${reviewHtml}
                <div class="results-actions">
                    <button class="btn btn-secondary" onclick="location.reload()">${retakeLabel}</button>
                    <a href="#lesson" class="btn btn-primary">${backLabel}</a>
                    <a href="/dashboard.html" class="btn btn-primary">${dashLabel}</a>
                </div>
            `;

      this.dom.quizResults.style.display = "block";

      // Fill progress bar to 100%
      this.dom.progressFill.style.width = "100%";
    }

    // Utility: escape HTML to prevent injection
    escapeHtml(text) {
      const div = document.createElement("div");
      div.textContent = text;
      return div.innerHTML;
    }
  }

  // ============================================
  // GLOBAL INITIALIZERS
  // ============================================

  // Direct initializer when a page already has its questions in JS.
  window.initQuiz = function (questions, containerId = "quiz-container") {
    return new QuizEngine(containerId, questions);
  };

  /**
   * Preferred initializer: loads the quiz bank JSON served alongside the
   * site, records that the learner opened this module, then starts the quiz.
   * @param {string} moduleCode e.g. "module-00"
   */
  window.initQuizFromJson = async function (moduleCode, containerId = "quiz-container") {
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = `<div class="quiz-loading">Loading quiz…</div>`;
    }
    try {
      const res = await fetch(`/modules/data/${moduleCode}.json`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const bank = await res.json();

      if (window.MascoProgress) {
        window.MascoProgress.markStarted(moduleCode);
      }
      return new QuizEngine(containerId, bank.questions, {
        moduleCode,
        passMark: bank.passMark || 80,
      });
    } catch (err) {
      console.error(err);
      if (container) {
        container.innerHTML = `<div class="quiz-loading error">Quiz could not be loaded (${err.message}). Is the file /modules/data/${moduleCode}.json present?</div>`;
      }
      return null;
    }
  };

  // Expose the class for advanced use
  window.QuizEngine = QuizEngine;
})();
