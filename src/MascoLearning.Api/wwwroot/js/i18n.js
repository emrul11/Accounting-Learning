/**
 * MASCO ACCOUNTING LEARNING SITE
 * i18n.js — English / Bangla (বাংলা) language layer.
 * Dictionaries are EMBEDDED (no fetch) so every page can call t()
 * synchronously, even before other scripts run.
 *
 * Usage:
 *   - Static text:  <span data-i18n="nav.start"></span>
 *   - Placeholders: <input data-i18n-ph="login.email">
 *   - In JS:        MascoI18N.t("dash.completed")
 *   - Toggle:       MascoI18N.toggle()  (persists choice, reloads page)
 *
 * Adding translations later (e.g., full module translations):
 *   - Quiz banks: add optional "scenarioBn", "optionsBn", "explanationBn",
 *     "wrongExplanationsBn" fields — quiz.js picks them up automatically
 *     when the language is bn (falls back to English otherwise).
 */

(function () {
  "use strict";

  // ============================================================
  // LANGUAGE CONFIGURATION — the ONLY switch needed.
  //
  // Currently English-only (Bangla hidden per product decision).
  // To re-enable Bangla later, change ONE line:
  //     var LANGUAGES = ["en", "bn"];
  // Everything else already supports it: dictionaries below,
  // the nav toggle, quiz-bank *Bn fields (see module-00.json),
  // and the module বাংলা key-concept panels light up automatically.
  // ============================================================
  var LANGUAGES = ["en"];

  function banglaEnabled() {
    return LANGUAGES.indexOf("bn") !== -1;
  }

  var DICTS = {
    en: {
      "nav.start": "Start Here",
      "nav.dashboard": "Dashboard",
      "nav.modules": "Modules",
      "nav.teamReport": "Team Report",
      "nav.appendices": "Appendices",
      "nav.login": "Log in",
      "nav.logout": "Log out",
      "nav.byRole": "By Role",
      "nav.structure": "Structure",

      "lang.label": "বাংলা",

      "login.title": "Welcome back",
      "login.sub": "Log in to track your progress through the accounting learning path.",
      "login.email": "Work email",
      "login.emailPh": "you@masco.com.bd",
      "login.password": "Password",
      "login.passwordPh": "Your password",
      "login.btn": "Log in",
      "login.btnBusy": "Logging in…",
      "login.errBoth": "Enter both your email and password.",
      "login.footnote": "Accounts are created by your administrator.<br>Forgot your password? Contact IT.",

      "demo.heading": "Just exploring? Try a demo account",
      "demo.learner": "Learner demo",
      "demo.manager": "Manager demo",
      "demo.admin": "Admin demo",
      "demo.note": "One click signs you in — safe to explore, progress is saved to the demo user.",

      "dash.title": "My Dashboard",
      "dash.subtitle": "Your personal learning progress",
      "dash.progressSection": "Your Progress",
      "dash.statCompleted": "Modules completed",
      "dash.statInProgress": "In progress",
      "dash.statAttempts": "Quiz attempts",
      "dash.statAvgScore": "Average score",
      "dash.overallNote": "Overall completion: <strong>{0}</strong> of the full learning path. Aim for 80%+ on every quiz before moving to the next module.",
      "dash.pathSection": "Learning Path",
      "dash.pathIntro": "Work top to bottom. Green means passed — click any module to continue where you left off.",
      "dash.attemptsSection": "Recent Quiz Attempts",
      "dash.attemptsIntro": "Your last 20 attempts. Failed attempts are normal — retake until you pass with 80%+.",
      "dash.colWhen": "When (UTC)",
      "dash.colModule": "Module",
      "dash.colScore": "Score",
      "dash.colResult": "Result",
      "dash.noAttempts": "No quiz attempts yet. Open Module 0 and start learning!",
      "dash.loadFail": "Could not load your progress:",

      "status.notStarted": "Not started",
      "status.started": "In progress",
      "status.completed": "Completed",
      "status.read": "Read",
      "status.passed": "Passed",
      "status.belowPass": "Below pass mark",

      "report.teamTitle": "Team Report",
      "report.teamSubtitle": "Who is learning, who is stuck, who needs a nudge",
      "report.summary": "Team Summary",
      "report.activeLearners": "Active learners",
      "report.avgCompletion": "Avg completion",
      "report.learners": "Learners",
      "report.searchPh": "Search name, email, department…",
      "report.exportCsv": "Export CSV",
      "report.addUser": "+ Add User",
      "report.colName": "Name",
      "report.colDept": "Department",
      "report.colCompleted": "Completed",
      "report.colStarted": "Started",
      "report.colAttempts": "Attempts",
      "report.colAvgScore": "Avg score",
      "report.colLastActivity": "Last activity (UTC)",
      "report.rowTip": "Tip: click a row to open that person's detail actions (deactivate, reset password).",
      "report.loading": "Loading team data…",
      "report.noMatch": "No learners match your search.",
      "report.couldNotLoad": "Could not load:",
      "report.inactive": "inactive",

      "user.modalAdd": "Add a user",
      "user.fullName": "Full name",
      "user.fullNamePh": "Rafiq Islam",
      "user.email": "Work email",
      "user.emailPh": "rafiq@masco.com.bd",
      "user.dept": "Department",
      "user.deptPh": "Commercial",
      "user.role": "Role",
      "user.initialPass": "Initial password",
      "user.initialPassPh": "Min 8 chars, 1 digit, 1 uppercase",
      "user.cancel": "Cancel",
      "user.create": "Create user",
      "user.required": "Name, email and password are required.",
      "user.resetBtn": "Reset password",
      "user.toggleActive": "Deactivate",
      "user.toggleReactive": "Reactivate",
      "user.close": "Close",

      "guard.notAllowed": "Not allowed",
      "guard.body": "does not have access to this page.",
      "guard.goDash": "Go to my dashboard",

      "index.heroTitle": "How to Use This Site",
      "index.heroSub": "Masco Group Bangladesh — Accounting Module Learning",
    },

    bn: {
      "nav.start": "শুরু এখানে",
      "nav.dashboard": "ড্যাশবোর্ড",
      "nav.modules": "মডিউলসমূহ",
      "nav.teamReport": "টিম রিপোর্ট",
      "nav.appendices": "পরিশিষ্ট",
      "nav.login": "লগ ইন",
      "nav.logout": "লগ আউট",
      "nav.byRole": "ভূমিকা অনুযায়ী",
      "nav.structure": "গঠন",

      "lang.label": "English",

      "login.title": "স্বাগতম",
      "login.sub": "একাউন্টিং শেখার পথে আপনার অগ্রগতি ট্র্যাক করতে লগ ইন করুন।",
      "login.email": "অফিস ইমেইল",
      "login.emailPh": "you@masco.com.bd",
      "login.password": "পাসওয়ার্ড",
      "login.passwordPh": "আপনার পাসওয়ার্ড",
      "login.btn": "লগ ইন",
      "login.btnBusy": "লগ ইন হচ্ছে…",
      "login.errBoth": "ইমেইল ও পাসওয়ার্ড—দুটোই দিন।",
      "login.footnote": "একাউন্ট তৈরি করে অ্যাডমিনিস্ট্রেটর।<br>পাসওয়ার্ড ভুলে গেছেন? আইটি-তে যোগাযোগ করুন।",

      "demo.heading": "শুধু ঘুরে দেখছেন? ডেমো একাউন্ট চেষ্টা করুন",
      "demo.learner": "লার্নার ডেমো",
      "demo.manager": "ম্যানেজার ডেমো",
      "demo.admin": "অ্যাডমিন ডেমো",
      "demo.note": "এক ক্লিকেই লগ ইন — নিরাপদে ঘুরে দেখুন; অগ্রগতি ডেমো ইউজারে সংরক্ষিত হবে।",

      "dash.title": "আমার ড্যাশবোর্ড",
      "dash.subtitle": "আপনার ব্যক্তিগত শেখার অগ্রগতি",
      "dash.progressSection": "আপনার অগ্রগতি",
      "dash.statCompleted": "সম্পন্ন মডিউল",
      "dash.statInProgress": "চলছে",
      "dash.statAttempts": "কুইজের চেষ্টা",
      "dash.statAvgScore": "গড় স্কোর",
      "dash.overallNote": "সামগ্রিক অগ্রগতি: পুরো পথের <strong>{0}</strong>। পরের মডিউলে যাওয়ার আগে প্রতিটি কুইজে ৮০%+ লক্ষ্য রাখুন।",
      "dash.pathSection": "শেখার পথ",
      "dash.pathIntro": "উপর থেকে নিচে শিখুন। সবুজ মানে পাস — যেখানে থেমেছিলেন সেখান থেকে চালিয়ে যেতে মডিউলে ক্লিক করুন।",
      "dash.attemptsSection": "সাম্প্রতিক কুইজের ফলাফল",
      "dash.attemptsIntro": "আপনার শেষ ২০টি চেষ্টা। ব্যর্থ চেষ্টা স্বাভাবিক — ৮০%+ না পারা পর্যন্ত আবার চেষ্টা করুন।",
      "dash.colWhen": "সময় (UTC)",
      "dash.colModule": "মডিউল",
      "dash.colScore": "স্কোর",
      "dash.colResult": "ফলাফল",
      "dash.noAttempts": "এখনও কোনো কুইজ দেননি। মডিউল ০ খুলুন — শেখা শুরু করুন!",
      "dash.loadFail": "অগ্রগতি লোড করা যায়নি:",

      "status.notStarted": "শুরু হয়নি",
      "status.started": "চলছে",
      "status.completed": "সম্পন্ন",
      "status.read": "পঠিত",
      "status.passed": "পাস",
      "status.belowPass": "পাস মার্কার নিচে",

      "report.teamTitle": "টিম রিপোর্ট",
      "report.teamSubtitle": "কে শিখছে, কে আটকে আছে, কে উৎসাহ দরকার",
      "report.summary": "টিমের সারসংক্ষেপ",
      "report.activeLearners": "সক্রিয় শিক্ষার্থী",
      "report.avgCompletion": "গড় সম্পন্নতা",
      "report.learners": "শিক্ষার্থীবৃন্দ",
      "report.searchPh": "নাম, ইমেইল, বিভাগ খুঁজুন…",
      "report.exportCsv": "CSV ডাউনলোড",
      "report.addUser": "+ ইউজার যোগ করুন",
      "report.colName": "নাম",
      "report.colDept": "বিভাগ",
      "report.colCompleted": "সম্পন্ন",
      "report.colStarted": "শুরু করেছে",
      "report.colAttempts": "কুইজ চেষ্টা",
      "report.colAvgScore": "গড় স্কোর",
      "report.colLastActivity": "সর্বশেষ কার্যক্রম (UTC)",
      "report.rowTip": "টিপ: কারো বিবরণ (নিষ্ক্রিয়, পাসওয়ার্ড রিসেট) দেখতে সারিতে ক্লিক করুন।",
      "report.loading": "টিমের তথ্য আসছে…",
      "report.noMatch": "অনুসন্ধানে কেউ মেলেনি।",
      "report.couldNotLoad": "লোড করা যায়নি:",
      "report.inactive": "নিষ্ক্রিয়",

      "user.modalAdd": "ইউজার যোগ করুন",
      "user.fullName": "পূর্ণ নাম",
      "user.fullNamePh": "রফিক ইসলাম",
      "user.email": "অফিস ইমেইল",
      "user.emailPh": "rafiq@masco.com.bd",
      "user.dept": "বিভাগ",
      "user.deptPh": "কমার্শিয়াল",
      "user.role": "ভূমিকা",
      "user.initialPass": "প্রাথমিক পাসওয়ার্ড",
      "user.initialPassPh": "ন্যূনতম ৮ অক্ষর, ১টি সংখ্যা, ১টি বড় হাতের",
      "user.cancel": "বাতিল",
      "user.create": "ইউজার তৈরি করুন",
      "user.required": "নাম, ইমেইল ও পাসওয়ার্ড আবশ্যক।",
      "user.resetBtn": "পাসওয়ার্ড রিসেট",
      "user.toggleActive": "নিষ্ক্রিয় করুন",
      "user.toggleReactive": "পুনরায় সক্রিয়",
      "user.close": "বন্ধ",

      "guard.notAllowed": "অনুমতি নেই",
      "guard.body": "এই পৃষ্ঠায় প্রবেশাধিকার নেই।",
      "guard.goDash": "আমার ড্যাশবোর্ডে যান",

      "index.heroTitle": "এই সাইট কীভাবে ব্যবহার করবেন",
      "index.heroSub": "মাসকো গ্রুপ বাংলাদেশ — একাউন্টিং মডিউল লার্নিং",
    },
  };

  var Lang = {
    current: (function () {
      try {
        var saved = localStorage.getItem("ml.lang");
        if (saved === "en") return saved;
        // A stored "bn" preference is honored only while Bangla is enabled.
        if (saved === "bn" && banglaEnabled()) return saved;
      } catch (e) { /* storage unavailable */ }
      return "en";
    })(),

    /** Feature flag exposed for other scripts (e.g. summary panels). */
    isBanglaEnabled: banglaEnabled,

    t: function (key) {
      var d = DICTS[this.current] || DICTS.en;
      return d[key] !== undefined ? d[key] : (DICTS.en[key] !== undefined ? DICTS.en[key] : key);
    },

    fmt: function (key) {
      var s = this.t(key);
      for (var i = 1; i < arguments.length; i++) {
        s = s.replace("{" + (i - 1) + "}", String(arguments[i]));
      }
      return s;
    },

    /** Is the current language Bangla? (used by quiz.js for Bn fields) */
    isBn: function () {
      return this.current === "bn";
    },

    apply: function () {
      document.documentElement.setAttribute("lang", this.current);
      document.documentElement.classList.toggle("lang-bn", this.isBn());

      var nodes = document.querySelectorAll("[data-i18n]");
      for (var i = 0; i < nodes.length; i++) {
        nodes[i].innerHTML = this.t(nodes[i].getAttribute("data-i18n"));
      }
      var phNodes = document.querySelectorAll("[data-i18n-ph]");
      for (var j = 0; j < phNodes.length; j++) {
        phNodes[j].setAttribute("placeholder", this.t(phNodes[j].getAttribute("data-i18n-ph")));
      }

      // Update any toggle buttons already rendered.
      var btns = document.querySelectorAll(".lang-toggle");
      for (var k = 0; k < btns.length; k++) {
        btns[k].textContent = this.t("lang.label");
      }
    },

    toggle: function () {
      if (!banglaEnabled()) return; // hidden while English-only
      this.current = this.isBn() ? "en" : "bn";
      try {
        localStorage.setItem("ml.lang", this.current);
      } catch (e) { /* ignore */ }
      // Reload so dynamically-rendered pages (dashboard/admin/quizzes)
      // regenerate fully in the chosen language.
      location.reload();
    },
  };

  // Render toggle buttons wherever the page declares a mount point,
  // and apply translations once DOM is ready.
  function buildToggle(container) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "btn btn-nav lang-toggle";
    b.title = "English / বাংলা";
    b.addEventListener("click", function () { Lang.toggle(); });
    b.textContent = Lang.t("lang.label");
    container.appendChild(b);
    return b;
  }

  function boot() {
    if (!banglaEnabled()) {
      Lang.apply();
      return; // no visible toggle in English-only mode
    }
    var mounts = document.querySelectorAll(".lang-toggle-mount");
    for (var i = 0; i < mounts.length; i++) {
      if (!mounts[i].querySelector(".lang-toggle")) {
        buildToggle(mounts[i]);
      }
    }
    Lang.apply();
  }

  // Public: auth.js creates the mount AFTER this script's DOMContentLoaded
  // pass, so it must be able to request a button directly. No-op while
  // Bangla is disabled (mount stays empty and invisible).
  Lang.createToggle = function (container) {
    if (!banglaEnabled()) return null;
    var btn = buildToggle(container);
    Lang.apply(); // sets correct label text
    return btn;
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  window.MascoI18N = Lang;
})();
