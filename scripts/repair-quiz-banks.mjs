/**
 * Repair script: aligns wrongExplanations / wrongExplanationsBn arrays with
 * the options array in every quiz bank.
 *
 * Historical authoring pattern omitted the placeholder at the correct index,
 * which shifted explanations onto wrong option indices in quiz.js.
 * Fix: insert "" at the correct index whenever the array is exactly one
 * element short; leave already-correct arrays untouched.
 *
 * Run:  node scripts/repair-quiz-banks.mjs
 */
import fs from "node:fs";
import path from "node:path";

const dir = path.join(process.cwd(), "src", "MascoLearning.Api", "wwwroot", "modules", "data");
let fixed = 0;
let clean = 0;
const problems = [];

for (let i = 0; i <= 14; i++) {
  const code = "module-" + String(i).padStart(2, "0");
  const file = path.join(dir, code + ".json");
  const bank = JSON.parse(fs.readFileSync(file, "utf8"));

  bank.questions.forEach((q, qi) => {
    const label = `${code} Q${qi}`;
    for (const field of ["wrongExplanations", "wrongExplanationsBn"]) {
      if (!(field in q)) continue;
      const w = q[field];
      if (!Array.isArray(w)) { problems.push(`${label} ${field}: not an array`); continue; }

      if (w.length === q.options.length) {
        // Already aligned; verify non-empty on wrong indices.
        q.wrongOptionsEverywhereChecked = true;
      } else if (w.length === q.options.length - 1) {
        // Reinsert the missing placeholder at the correct index.
        const copy = [...w];
        copy.splice(q.correct, 0, "");
        q[field] = copy;
        fixed++;
      } else {
        problems.push(`${label} ${field}: length ${w.length} vs ${q.options.length} options — manual fix needed`);
        continue;
      }
    }
    delete q.wrongOptionsEverywhereChecked;

    // Post-check for this question (both languages).
    for (const [field, opts] of [["wrongExplanations", q.options], ["wrongExplanationsBn", q.optionsBn ?? q.options]]) {
      const w = q[field];
      if (!Array.isArray(w)) continue;
      if (w.length !== opts.length) { problems.push(`${label} ${field}: STILL misaligned`); continue; }
      w.forEach((text, idx) => {
        if (idx !== q.correct && String(text || "").trim() === "") {
          problems.push(`${label} ${field}[${idx}]: empty explanation for a wrong option`);
        }
      });
    }
  });

  fs.writeFileSync(file, JSON.stringify(bank, null, 2) + "\n", "utf8");
}

console.log(`arrays repaired: ${fixed}`);
if (problems.length) {
  console.log("PROBLEMS REQUIRING MANUAL FIX:");
  problems.forEach((p) => console.log(" - " + p));
  process.exitCode = 1;
} else {
  console.log("all banks now aligned and fully explained");
}
