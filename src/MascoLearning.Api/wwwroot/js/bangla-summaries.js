/**
 * MASCO ACCOUNTING LEARNING SITE
 * bangla-summaries.js — injects an always-visible "বাংলা সারসংক্ষেপ"
 * key-concepts panel at the top of every module page.
 *
 * Full Bangla lesson translations are a future phase; this panel gives
 * Bangla-first learners the core idea + terminology of each module up front,
 * while the English lesson, worked example and quiz remain the reference.
 *
 * Quiz banks can become fully bilingual by adding scenarioBn / optionsBn /
 * explanationBn / wrongExplanationsBn fields (see module-00.json) — quiz.js
 * renders them automatically when the site language is set to বাংলা.
 */

(function () {
  "use strict";

  var SUMMARIES = {
    "module-00": {
      intro: "একাউন্টিং মানে ব্যবসার ঘটনাকে সংখ্যায় অনুবাদ করা। প্রতিটি ঘটনা তিন ধাপে যায়: <strong>ঘটনা → ডকুমেন্ট → এন্ট্রি</strong>। গোডাউনে সুতা এলে আগে GRN (ডকুমেন্ট) হয়, তারপর সিস্টেমে জার্নাল এন্ট্রি। সোনালি নিয়ম: <strong>ডকুমেন্ট ছাড়া এন্ট্রি নয়</strong> — এটিই প্রতারণা ও ভুল থেকে সবচেয়ে বড় সুরক্ষা।",
      glossary: [
        ["GRN", "পণ্য গ্রহণের স্বীকৃতি — কে, কখন, কত পেয়েছে তার প্রমাণ"],
        ["Event", "সত্যিকারের ঘটনা: ট্রাক আসা, শার্ট শিপ হওয়া"],
        ["Entry", "ডকুমেন্টের ভিত্তিতে সিস্টেমে লেখা সংখ্যা"],
        ["Audit trail", "প্রতিটি সংখ্যার পেছনের কাগজ-পত্রের গল্প"],
      ],
    },
    "module-01": {
      intro: "প্রতিটি লেনদেনের <strong>দুই পাশ</strong> থাকে: মূল্য কোথায় গেল (Dr/বাম) এবং কোথা থেকে এল (Cr/ডান)। প্রতিটি এন্ট্রিতে <strong>মোট Dr = মোট Cr</strong> — এটিই ১৪৯৪ সাল থেকে চলে আসা অখণ্ডতার চেক। মনে রাখুন: <strong>DEA-LER</strong> — Debit বাড়ায় Assets ও Expenses; বাকিরা (Liability, Equity, Revenue) বাড়ে Credit-এ।",
      glossary: [
        ["Debit (Dr)", "জার্নালের বাম পাশ"],
        ["Credit (Cr)", "জার্নালের ডান পাশ"],
        ["Asset", "যা মালিকানায় আছে (নগদ, মজুদ, মেশিন)"],
        ["Liability", "যা অন্যকে দিতে হবে (সরবরাহকারী, ঋণ)"],
        ["Trial balance", "সব একাউন্টের Dr=Cr যাচাইয়ের তালিকা"],
      ],
    },
    "module-02": {
      intro: "<strong>Chart of Accounts (COA)</strong> হলো কোম্পানির মাস্টার ফাইলিং সিস্টেম: প্রতিটি একাউন্টের কোড + নাম + ধরন। কোডের প্রথম অঙ্ক ধরন বলে দেয় (১=Asset, ২=Liability, ৩=Equity, ৪=Revenue, ৫+=Expense)। নিয়ম: <strong>এক ধারণা = এক একাউন্ট</strong>, ব্যবহৃত কোড কখনো পুনর্ব্যবহার নয়, নতুন একাউন্ট অনুমোদনের গেট দিয়ে।",
      glossary: [
        ["COA", "সব একাউন্টের মাস্টার তালিকা"],
        ["Account code", "একাউন্টের স্থায়ী পরিচয় নম্বর (যেমন ১২১১)"],
        ["Asset / Liability / Equity / Revenue / Expense", "একাউন্টের পাঁচ ধরন"],
      ],
    },
    "module-03": {
      intro: "দুই স্তরের স্মৃতি: <strong>General Ledger</strong> = সারসংক্ষেপ (ব্যাংক যা দেখে), <strong>Subledger</strong> = খুঁটিনাটি (H&M, Zara—হিসাবে হিসাবে)। নিয়ম: সাবলেজারের যোগফল সবসময় GL কন্ট্রোল একাউন্টের সমান। <strong>অমিল হলে সাবলেজার সাধারণত সঠিক</strong> — GL মেলাতে বসানো জার্নাল নয়, হারানো পোস্টিং খুঁজুন।",
      glossary: [
        ["Subledger", "বিস্তারিত স্তর: ক্রেতা/সরবরাহকারী/ইনভয়েস ধরে ধরে"],
        ["Control account", "GL-এর এক-লাইন সারসংক্ষেপ (যেমন ১৩১০)"],
        ["Reconciliation", "দুই স্তর মিলিয়ে দেখা — প্রতিদিন"],
      ],
    },
    "module-04": {
      intro: "<strong>পোস্টিং ইঞ্জিন</strong> = পুরো ERP-এর হৃদয়। মানুষ ঘটনা approve করে; ইঞ্জিন আগে-সম্মত নিয়ম (R1–R9) দেখে জার্নাল এন্ট্রি লেখে। প্রতিটি নিয়ম ঠিক করে: কোন একাউন্ট, কত টাকা, কখন অনুমোদিত (ধারাবাহিকতা যাচাই), কোন সাবলেজার সারি। নিয়ম কোডে নয়, <strong>ভার্সনযুক্ত কনফিগে</strong> থাকে — আর GL+সাবলেজার একসাথে, অখণ্ডভাবে লেখা হয়।",
      glossary: [
        ["Posting rule", "ঘটনা → এন্ট্রির পূর্ব-সম্মত রেসিপি"],
        ["Sequence validation", "GRN ছাড়া পেমেন্ট নয় — বাস্তবের ক্রম কঠোরভাবে পালন"],
        ["Atomic write", "GL ও সাবলেজার একসাথে লেখা; অর্ধেক লেখা অসম্ভব"],
        ["Reversal", "ভুল শোধরানোর একমাত্র পথ — ডিলিট/এডিট কখনো নয়"],
      ],
    },
    "module-05": {
      intro: "খরচ পানির মতো পাইপে বয়: প্রতিটি প্রসেস একটি <strong>WIP বাকেট</strong>, যেখানে পড়ে <strong>আগের ধাপের খরচ + সরাসরি শ্রম/উপকরণ + ফ্যাক্টরি ওভারহেড</strong>। শেষ বাকেট খালি হয় Finished Goods-এ — সেই জমা খরচই প্রতি পিসের আসল দাম। বিদ্যুৎ-ভাড়া সরাসরি পণ্যে যায় না; OH পুল হয়ে মেশিন-ঘণ্টা ভাগে পৌঁছায়।",
      glossary: [
        ["WIP", "অর্ধশেষিত পণ্য — প্রক্রিয়ার ভেতরে আটকে থাকা মূল্য"],
        ["Direct labor", "যে শ্রম নির্দিষ্ট অর্ডারে ধরে ধরে মাপা যায়"],
        ["Overhead (OH)", "ভাগ করা ফ্যাক্টরি খরচ — ড্রাইভার দিয়ে বণ্টিত"],
        ["Cost rollup", "প্রতিটি ধাপে খরচ জমতে জমতে চূড়ান্ত ইউনিট ব্যয়"],
      ],
    },
    "module-06": {
      intro: "সোনালি নিয়ম: <strong>মজুদ যতক্ষণ সম্পদ, শিপ হলেই খরচ</strong>। এক্সপোর্টে মালিকানা যায় <strong>B/L তারিখে</strong> — সেদিনই Revenue ও COGS একসাথে লেখা হয় (matching)। উৎপাদন খরচ নয়! March-এ বেশি বানিয়ে 'লাভ', April-এ বেশি পাঠিয়ে 'লস' দেখানোই এই নিয়ম ভাঙার ফল।",
      glossary: [
        ["COGS", "ঠিক যে পিস শিপ হয়েছে, তার জমা খরচ"],
        ["Matching principle", "রাজস্ব ও তার খরচ একই মাসে — সৎ মুনাফার ভিত্তি"],
        ["Moving average", "বিভিন্ন দরের সুতার স্তর মিশিয়ে ন্যায্য গড় দাম"],
        ["Write-down", "নষ্ট মজুদের মূল্য ডকুমেন্ট করে কমানো"],
      ],
    },
    "module-07": {
      intro: "এক এক্সপোর্টে তিন রেট: <strong>B/L তারিখের রেটে</strong> রাজস্ব বই হয়; <strong>টাকা আসার দিনের রেটে</strong> settlement → realized FX gain/loss; মাসশেষে বাকি ব্যালেন্স revalue → unrealized (পরে উল্টে যায়)। <strong>Back-to-back LC</strong>: এক্সপোর্ট LC-র বিনিময়ে ইমপোর্ট LC — ডলার আসে ডলার যেতে; এটিই প্রাকৃতিক হেজ। ১২০ দিনের মধ্যে টাকা দেশে আনা বাধ্যতামূলক।",
      glossary: [
        ["Booking rate", "ঘটনার দিনের রেট — মূল এন্ট্রি এতেই"],
        ["Realized FX", "সেটেলমেন্টের পার্থক্য — চিরস্থায়ী"],
        ["Unrealized FX", "মাসশেষ মূল্যায়ন — পরে রিভার্স হয়"],
        ["UD", "বন্ডের সুতা কোথায় খরচ হয়ে কোথায় রপ্তানি হলো তার ঘোষণা"],
      ],
    },
    "module-08": {
      intro: "এক বেতন শিট, তিন গন্তব্য: <strong>সরাসরি শ্রম</strong> (সেলাই/নিটিং অপারেটর) → WIP-এ পণ্যের খরচ; <strong>ফ্যাক্টরি সহায়ক</strong> (সুপারভাইজর, মেকানিক) → OH পুল; <strong>অ্যাডমিন</strong> → মাসের খরচ। রুট ঠিক করে কর্মী মাস্টারের <strong>ডিপার্টমেন্ট কোড</strong>। ওভারটাইম অবশ্যই উৎপাদনের সাথে মিলতে হবে — নইলে Finance জিজ্ঞেস করবে।",
      glossary: [
        ["Direct labor", "পণ্যে ঢোকে — অর্ডারভিত্তিক মাপা যায়"],
        ["Indirect/OH labor", "সবার ভাগে যায় — পুল হয়ে বণ্টিত"],
        ["TDS", "বেতন থেকে কাটা কর — NBR-এ জমা দিতে হয়"],
        ["WPPF", "শ্রমিকের মুনাফায় আইনগত অংশ — বার্ষিক প্রভিশন"],
      ],
    },
    "module-09": {
      intro: "AR/AP হলো প্রতিশ্রুতির ক্যালেন্ডার। <strong>Aging ladder</strong> (০-৩০/৩১-৬০/৬১-৯০/৯০+) বলে কাকে চাপা, কোথায় ঝুঁকি। সরবরাহকারীকে দেওয়ার আগে <strong>three-way match</strong>: PO + approved GRN + invoice। সপ্তাহে একবার cash forecast: আসবে বনাম যাবে। লাভজর্কী কোম্পানিও টাকা না আসলে ডুবতে পারে — সেটাই এই মডিউলের রহস্য।",
      glossary: [
        ["Aging", "কত দিন ধরে বকেয়া — ঝুঁকির ঘড়ি"],
        ["Three-way match", "PO+GRN+Invoice মিললে তবেই পেমেন্ট"],
        ["Cash flow forecast", "কোন সপ্তাহে টাকা কম-বেশি — আগে থেকে হিসাব"],
        ["Provision", "সন্দেহজনক বকেয়ার জন্য আগেই সৎ খরচ দেখানো"],
      ],
    },
    "module-10": {
      intro: "৫ কোটির মেশিন = এক মাসের খরচ নয়; <strong>১০ বছরে ছড়িয়ে দেওয়া খরচ = depreciation</strong>। চার উপকরণ: Cost (ঢোকানো-বসানো সহ), Useful life, Residual value, Method। মাসে মাসে: Dr Depreciation (OH পুলে) / Cr Accumulated Depreciation। নগদ একবারই গেছে — P&L ও Balance Sheet-এর গল্প আলাদা ক্যামেরার।",
      glossary: [
        ["Depreciation", "মেশিনের মাসিক 'খরচ হওয়া' হিসাব"],
        ["Accumulated depreciation", "এখন পর্যন্ত মোট কাটা খরচ"],
        ["Book value", "Cost − Accumulated = বইয়ের দাম"],
        ["Capitalize vs expense", "জীবন বাড়ালে asset-এ; সাধারণ সার্ভিস হলে খরচ"],
      ],
    },
    "module-11": {
      intro: "তিন ক্যামেরা, এক গল্প: <strong>Income Statement</strong> ('আমরা জ্ঞানী ছিলাম?'), <strong>Balance Sheet</strong> ('এ মুহূর্তে কী আছে-কী দেনা?'), <strong>Cash Flow</strong> ('খাওয়া চলবে?')। সংযোগ: লাভ ঢোকে Equity-তে; Cash Flow ব্যাখ্যা করে ১২ কোটি লাভ হয়েও নগদ বাড়ল মাত্র ৪০ লাখ — কারণ টাকা আটকে আছে receivable ও inventory-তে।",
      glossary: [
        ["Income Statement", "সময়ের লাভ-ক্ষতি"],
        ["Balance Sheet", "মুহূর্তের সম্পদ = দেনা + মালিকানা"],
        ["Cash Flow", "Operating/Investing/Financing — নগদের সত্য"],
        ["Working capital", "receivable+inventory-তে আটকে থাকা টাকা"],
      ],
    },
    "module-12": {
      intro: "একজন মানুষ কখনো <strong>বানানো + অনুমোদন</strong> একসাথে ধরবে না (Segregation of Duties)। সঙ্গে: অনুমোদন সীমা, maker-checker (বিশেষত vendor-র ব্যাংক একাউন্ট বদল!), অমোঘ audit trail (reversal হ্যাঁ, edit/delete না), আর প্রতিদিনের reconciliation। এক ভুয়া পেমেন্টের ক্ষতি > হাজার slow approval-এর ব্যয়।",
      glossary: [
        ["SoD", "authorize/execute/record — এক ব্যক্তিতে দুটো নয়"],
        ["Maker-checker", "অন্য কেউ না দেখলে pending থাকবে"],
        ["Approval limit", "টাকার অঙ্ক অনুযায়ী স্তরে স্তরে অনুমোদন"],
        ["Exception report", "প্রতিদিন কে আটকাল, কী মেলেনি — তার তালিকা"],
      ],
    },
    "module-13": {
      intro: "বাস্তব জগৎ গোলমাল: buyer claim → ডকুমেন্ট সহ <strong>credit note</strong>; LC discrepancy → নতুন এন্ট্রি নয়, সংশোধিত কাগজ; মেশিন নষ্ট → breakdown report, repair = OH। মেটা-নিয়ম: <strong>স্বাভাবিক হিসাব + বাড়তি প্রমাণ + স্পষ্ট অনুমোদন + দায়িত্বশীল ও ডেডলাইন</strong>। নিঃশব্দে পরের ইনভয়েস কমানো কখনোই নয়।",
      glossary: [
        ["Credit note", "দাবি মেনে AR/রাজস্ব কমানোর স্বীকৃত কাগজ"],
        ["LC discrepancy", "কাগজে অমিল — ব্যাংক টাকা আটকে রাখে"],
        ["Downtime report", "মেশিন বন্ধের রেকর্ড — খরচ ও variance-এর উৎস"],
      ],
    },
    "module-14": {
      intro: "প্রতিটি এন্ট্রির ছায়া: <strong>VAT</strong> আমাদের নয় — রাষ্ট্রের টাকা (Input ফেরতযোগ্য, Output জমা); এক্সপোর্ট zero-rated তবু return দিতে হয়। <strong>TDS/AIT</strong>: আমরা কাটি / আমাদের কাটা হয় — উভয়ই চ্যালান-সনদে পরিষ্কার। <strong>Bond+UD</strong>: ডিউটিমুক্ত সুতার প্রতিশ্রুতি কেজিধারে প্রমাণ। <strong>রেট কখনো হার্ডকোড নয়</strong> — তারিখ-সহ কনফিগ, প্রতি জুন বাজেটে হালনাগাদ, nbr.gov.bd যাচাই।",
      glossary: [
        ["VAT Input/Output", "কেনায় ফেরতযোগ্য / বিক্রিতে জমার কর"],
        ["TDS", "আমরা অন্যের পেমেন্ট থেকে কাটি"],
        ["AIT", "আমাদের রসিদ থেকে অগ্রিম কর কাটা হয়"],
        ["Bond/UD", "ডিউটিমুক্ত আমদানি → রপ্তানি প্রমাণের চেইন"],
        ["Book ≠ taxable profit", "করের হিসাব আলাদা নিয়মে হয়"],
      ],
    },
  };

  function inject() {
    // Hidden while the site runs English-only. The panels (and all data
    // below) are kept intact — they reappear automatically when "bn" is
    // added to LANGUAGES in i18n.js.
    if (!(window.MascoI18N && window.MascoI18N.isBanglaEnabled && window.MascoI18N.isBanglaEnabled())) {
      return;
    }

    // Match "/modules/module-XX.html" from the URL.
    var m = location.pathname.match(/\/modules\/(module-\d+)\.html$/);
    if (!m) return;
    var data = SUMMARIES[m[1]];
    if (!data) return;

    var main = document.querySelector("main.container");
    var mystery = document.querySelector(".hf-mystery");
    if (!main || !mystery) return;

    var box = document.createElement("section");
    box.className = "hf-box hf-bangla";
    var html =
      '<span class="hf-label">বাংলা সারসংক্ষেপ · Bangla Key Concepts</span>' +
      '<p lang="bn">' + data.intro + "</p>";
    if (data.glossary && data.glossary.length) {
      html += '<table class="bn-glossary"><thead><tr><th>English</th><th>বাংলায়</th></tr></thead><tbody>';
      for (var i = 0; i < data.glossary.length; i++) {
        html +=
          "<tr><td><strong>" +
          data.glossary[i][0] +
          "</strong></td><td>" +
          data.glossary[i][1] +
          "</td></tr>";
      }
      html += "</tbody></table>";
    }
    html +=
      '<p class="bn-note">বিস্তারিত পাঠ, উদাহরণ ও কুইজ নিচে ইংরেজিতে — এই প্যানেল মূল ধারণার সহায়ক। পূর্ণ বাংলা অনুবাদ পরবর্তী পর্যায়ে আসবে।</p>';
    box.innerHTML = html;

    mystery.parentNode.insertBefore(box, mystery);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();
