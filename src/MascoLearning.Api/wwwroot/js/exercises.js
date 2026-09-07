/**
 * MASCO ACCOUNTING LEARNING SITE
 * exercises.js — Head First interactive elements:
 *   1. Reveal-answer boxes  (class "exercise", answer inside "exercise-answer")
 *   2. Balance-check widget (class "balance-check") for journal entries
 *   3. Journal entry builder (class "entry-builder") with data-* config
 * No dependencies.
 */

(function () {
  "use strict";

  // ---------------------------------------------------------------
  // 1. REVEAL ANSWERS
  // <div class="exercise">
  //   ...question markup...
  //   <div class="exercise-answer">...the answer...</div>
  // </div>
  // ---------------------------------------------------------------
  function initRevealBoxes() {
    document.querySelectorAll(".exercise").forEach((box) => {
      const answer = box.querySelector(".exercise-answer");
      if (!answer || box.querySelector(".reveal-btn")) return;

      answer.classList.add("hidden");

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn btn-secondary reveal-btn";
      btn.textContent = "Show answer";

      btn.addEventListener("click", () => {
        const isHidden = answer.classList.contains("hidden");
        answer.classList.toggle("hidden", !isHidden);
        btn.textContent = isHidden ? "Hide answer" : "Show answer";
        if (isHidden) {
          answer.classList.add("revealed");
        }
      });

      answer.before(btn);
    });
  }

  // ---------------------------------------------------------------
  // 2. BALANCE CHECK
  // <div class="balance-check" data-debits="500000" data-credits="500000"></div>
  // Renders a live "balanced / out of balance" verdict for a worked entry.
  // ---------------------------------------------------------------
  function fmt(n) {
    return n.toLocaleString("en-US");
  }

  function initBalanceChecks() {
    document.querySelectorAll(".balance-check").forEach((el) => {
      const debits = Number(el.dataset.debits || 0);
      const credits = Number(el.dataset.credits || 0);
      if (!debits && !credits) return;

      const balanced = Math.abs(debits - credits) < 0.001;
      el.innerHTML = `
        <div class="bc-row ${balanced ? "bc-ok" : "bc-bad"}">
          <span class="bc-icon">${balanced ? "&#10003;" : "&#10007;"}</span>
          <span>
            Debits: <strong>&#2547;${fmt(debits)}</strong> &nbsp;|&nbsp;
            Credits: <strong>&#2547;${fmt(credits)}</strong> &nbsp;&rarr;&nbsp;
            ${balanced ? "Balanced. The entry can be posted." : `Out of balance by &#2547;${fmt(Math.abs(debits - credits))}! This entry can NEVER be posted.`}
          </span>
        </div>`;
    });
  }

  // ---------------------------------------------------------------
  // 3. JOURNAL ENTRY BUILDER
  // <div class="entry-builder"
  //      data-accounts='["Cash","Inventory - Yarn","Accounts Payable - ABC Yarn"]'
  //      data-answer='[{"account":"Inventory - Yarn","side":"D","amount":500000},{"account":"Accounts Payable - ABC Yarn","side":"C","amount":500000}]'>
  // </div>
  // Learner picks account/side/amount per line; "Check my entry" verifies.
  // ---------------------------------------------------------------
  function initEntryBuilders() {
    document.querySelectorAll(".entry-builder").forEach((root) => {
      let accounts = [];
      let answer = [];
      try {
        accounts = JSON.parse(root.dataset.accounts || "[]");
        answer = JSON.parse(root.dataset.answer || "[]");
      } catch {
        return;
      }
      if (!answer.length) return;

      const lines = Math.max(answer.length, 2);
      const rows = [];
      for (let i = 0; i < lines; i++) {
        rows.push(`
          <div class="eb-row">
            <select class="eb-account" aria-label="Account line ${i + 1}">
              <option value="">— pick account —</option>
              ${accounts.map((a) => `<option>${escapeHtml(a)}</option>`).join("")}
            </select>
            <select class="eb-side" aria-label="Debit or credit line ${i + 1}">
              <option value="">D/C</option>
              <option value="D">Debit</option>
              <option value="C">Credit</option>
            </select>
            <input type="number" class="eb-amount" min="0" step="1" placeholder="BDT" aria-label="Amount line ${i + 1}">
          </div>`);
      }

      root.innerHTML = `
        <div class="eb-head"><span>Account</span><span>Debit/Credit</span><span>Amount (BDT)</span></div>
        ${rows.join("")}
        <div class="eb-actions">
          <button type="button" class="btn btn-primary eb-check">Check my entry</button>
          <span class="eb-verdict" aria-live="polite"></span>
        </div>`;

      root.querySelector(".eb-check").addEventListener("click", () => {
        const verdict = root.querySelector(".eb-verdict");
        const entered = [];
        root.querySelectorAll(".eb-row").forEach((row) => {
          const account = row.querySelector(".eb-account").value;
          const side = row.querySelector(".eb-side").value;
          const amount = Number(row.querySelector(".eb-amount").value);
          if (account && side && amount > 0) {
            entered.push({ account, side, amount });
          }
        });

        if (entered.length === 0) {
          verdict.textContent = "Build at least one complete line first.";
          verdict.className = "eb-verdict eb-warn";
          return;
        }

        // Compare as multisets so line order does not matter.
        const norm = (list) =>
          list
            .map((l) => `${l.account}|${l.side}|${l.amount}`)
            .sort()
            .join("#");
        const ok = norm(entered) === norm(answer);

        if (ok) {
          verdict.textContent = "Correct! Your entry matches the model answer.";
          verdict.className = "eb-verdict eb-ok";
        } else {
          const dSum = entered.filter((l) => l.side === "D").reduce((s, l) => s + l.amount, 0);
          const cSum = entered.filter((l) => l.side === "C").reduce((s, l) => s + l.amount, 0);
          let hint = "Not quite. ";
          if (dSum !== cSum) hint += `Your debits (${fmt(dSum)}) and credits (${fmt(cSum)}) do not balance. `;
          else hint += "It balances, but the accounts or amounts are wrong. ";
          hint += "Re-read the worked example, then try again.";
          verdict.textContent = hint;
          verdict.className = "eb-verdict eb-bad";
        }
      });
    });
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text == null ? "" : String(text);
    return div.innerHTML;
  }

  function initAll() {
    initRevealBoxes();
    initBalanceChecks();
    initEntryBuilders();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }

  window.MascoExercises = { initAll };
})();
