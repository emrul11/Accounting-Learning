/**
 * MASCO ACCOUNTING LEARNING SITE
 * specsheet.js — "From Lesson to Software" posting-spec worksheet.
 *
 *   <div class="spec-sheet">
 *     <div class="spec-prompt">
 *       <h4>Prompt text</h4>
 *       <textarea></textarea>
 *       <button type="button" class="spec-reveal">Reveal model answer</button>
 *       <div class="spec-answer" style="display:none"><p>...</p></div>
 *     </div>
 *     <!-- repeat for each prompt -->
 *     <button type="button" class="spec-copy">Copy for review</button>
 *   </div>
 *
 * Behaviour:
 *   1. Each "Reveal model answer" button toggles the corresponding
 *      .spec-answer block (hidden by default via inline style).
 *   2. The "Copy for review" button assembles a plain-text block
 *      (module title + four learner answers) and writes it to the
 *      clipboard via navigator.clipboard.writeText. Falls back to
 *      a temporary textarea + execCommand('copy') when the modern
 *      Clipboard API is unavailable.
 *
 * No dependencies. Vanilla JS.
 */

(function () {
  "use strict";

  var PROMPT_LABELS = [
    "1. What event triggers this posting?",
    "2. Which accounts, amounts, and dates apply?",
    "3. What approval and validation are required?",
    "4. What happens on cancellation, correction, or retry?",
  ];

  // ---------------------------------------------------------------
  // 1. REVEAL MODEL ANSWER BUTTONS
  // ---------------------------------------------------------------
  function initRevealButtons(sheet) {
    sheet.querySelectorAll(".spec-prompt").forEach(function (promptEl) {
      var answer = promptEl.querySelector(".spec-answer");
      var btn = promptEl.querySelector(".spec-reveal");
      if (!answer || !btn || btn.dataset.specBound === "1") return;

      btn.dataset.specBound = "1";
      btn.addEventListener("click", function () {
        var isHidden =
          answer.style.display === "none" ||
          answer.getAttribute("aria-hidden") === "true";
        if (isHidden) {
          answer.style.display = "";
          answer.setAttribute("aria-hidden", "false");
          btn.textContent = "Hide model answer";
        } else {
          answer.style.display = "none";
          answer.setAttribute("aria-hidden", "true");
          btn.textContent = "Reveal model answer";
        }
      });
    });
  }

  // ---------------------------------------------------------------
  // 2. COPY FOR REVIEW BUTTON
  // ---------------------------------------------------------------
  function getModuleTitle(sheet) {
    var h1 = document.querySelector("header.module-hero h1");
    if (h1 && h1.textContent.trim()) {
      return h1.textContent.trim().replace(/\s+/g, " ");
    }
    return document.title || "Module";
  }

  function getPromptHeading(promptEl) {
    var h = promptEl.querySelector("h4");
    if (h && h.textContent.trim()) {
      return h.textContent.trim().replace(/\s+/g, " ");
    }
    return "Prompt";
  }

  function getAnswerText(promptEl) {
    var ta = promptEl.querySelector("textarea");
    var text = ta ? ta.value.trim() : "";
    return text || "(no answer yet)";
  }

  function buildClipboardText(sheet) {
    var title = getModuleTitle(sheet);
    var prompts = sheet.querySelectorAll(".spec-prompt");
    var lines = [];
    lines.push("Posting-Spec Worksheet — " + title);
    lines.push("=".repeat("Posting-Spec Worksheet — ".length + title.length));
    lines.push("");
    prompts.forEach(function (promptEl, idx) {
      var heading =
        getPromptHeading(promptEl) || (PROMPT_LABELS[idx] || "Prompt " + (idx + 1));
      lines.push(heading);
      lines.push("-".repeat(heading.length));
      lines.push(getAnswerText(promptEl));
      lines.push("");
    });
    return lines.join("\n");
  }

  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "absolute";
    ta.style.left = "-9999px";
    ta.style.top = "0";
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (e) {
      ok = false;
    }
    document.body.removeChild(ta);
    return ok;
  }

  function initCopyButton(sheet) {
    var btn = sheet.querySelector(".spec-copy");
    if (!btn || btn.dataset.specBound === "1") return;
    btn.dataset.specBound = "1";

    btn.addEventListener("click", function () {
      var text = buildClipboardText(sheet);

      if (
        typeof navigator !== "undefined" &&
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === "function"
      ) {
        navigator.clipboard.writeText(text).then(
          function () {
            btn.textContent = "Copied!";
            setTimeout(function () {
              btn.textContent = "Copy for review";
            }, 2000);
          },
          function () {
            if (fallbackCopy(text)) {
              btn.textContent = "Copied!";
              setTimeout(function () {
                btn.textContent = "Copy for review";
              }, 2000);
            } else {
              btn.textContent = "Copy failed — select & copy manually";
            }
          }
        );
      } else if (fallbackCopy(text)) {
        btn.textContent = "Copied!";
        setTimeout(function () {
          btn.textContent = "Copy for review";
        }, 2000);
      } else {
        btn.textContent = "Copy failed — select & copy manually";
      }
    });
  }

  function initSpecSheets() {
    document.querySelectorAll(".spec-sheet").forEach(function (sheet) {
      initRevealButtons(sheet);
      initCopyButton(sheet);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSpecSheets);
  } else {
    initSpecSheets();
  }

  window.MascoSpecSheets = { initSpecSheets };
})();
