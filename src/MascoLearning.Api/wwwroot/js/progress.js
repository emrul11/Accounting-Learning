/**
 * MASCO ACCOUNTING LEARNING SITE
 * progress.js — learner progress operations used by module pages,
 * the dashboard, and quizzes. All state lives on the server; this file
 * is a thin, friendly wrapper over MascoAPI.
 */

(function () {
  "use strict";

  const API = window.MascoAPI;

  const MascoProgress = {
    /**
     * Tell the server the learner opened this module page.
     * Silently ignored when not logged in (guest browsing still works,
     * but nothing is tracked).
     */
    async markStarted(moduleCode) {
      if (!API.isLoggedIn()) return;
      try {
        await API.startModule(moduleCode);
      } catch (err) {
        console.warn("Could not record module start:", err.message);
      }
    },

    /**
     * Submit a finished quiz. Returns the SERVER-graded result:
     * { attemptId, score, total, percentage, passMark, passed, gradedAnswers }
     * Throws MascoAPI.ApiError when not logged in (401) or on failure.
     */
    submitQuizAttempt(moduleCode, selectedAnswers) {
      return API.submitAttempt(moduleCode, selectedAnswers);
    },

    /** Full personal report for dashboards. */
    myReport() {
      return API.myReport();
    },

    /** Best score per module code from a myReport payload. */
    bestScoreByModule(report) {
      const map = {};
      (report.modules || []).forEach((m) => {
        map[m.code] = m.bestScorePercent || 0;
      });
      return map;
    },

    /** Friendly status label + CSS class for a progress status enum value. */
    statusBadge(status, isAppendix) {
      const T = (k) => (window.MascoI18N ? window.MascoI18N.t(k) : null);
      switch (status) {
        case 2:
          return {
            label: isAppendix ? (T("status.read") || "Read") : (T("status.completed") || "Completed"),
            cls: "status-completed",
          };
        case 1:
          return { label: T("status.started") || "In progress", cls: "status-started" };
        default:
          return { label: T("status.notStarted") || "Not started", cls: "status-not-started" };
      }
    },
  };

  window.MascoProgress = MascoProgress;
})();
