/**
 * MASCO ACCOUNTING LEARNING SITE
 * auth.js — session-aware page behavior.
 * Include after api.js on every page. It:
 *   1. fills any element with class "auth-area" (nav) with login state,
 *   2. optionally guards the whole page via data-require attributes.
 *
 * Page guards (on <body>):
 *   data-require="login"            any logged-in user
 *   data-require="ManagerOrAdmin"   managers and admins only
 */

(function () {
  "use strict";

  const API = window.MascoAPI;

  function roleSatisfies(userRoles, requirement) {
    if (requirement === "login") return true;
    const needed = requirement.split(",").map((r) => r.trim());
    return userRoles.some((role) => needed.includes(role));
  }

  function renderAuthArea() {
    document.querySelectorAll(".auth-area").forEach((el) => {
      // Language toggle mount — i18n.js builds the actual button
      // (this code runs after i18n's initial pass, so request it directly).
      const mount = document.createElement("span");
      mount.className = "lang-toggle-mount";

      if (API.isLoggedIn()) {
        const user = API.getUser() || {};
        el.innerHTML = `
          <a href="/dashboard.html" class="auth-user" title="My dashboard">${escapeHtml(user.fullName || user.email || "")}</a>
          <button type="button" class="btn btn-nav" id="logout-btn">${window.MascoI18N ? window.MascoI18N.t("nav.logout") : "Log out"}</button>
        `;
        el.querySelector("#logout-btn").addEventListener("click", () => API.logout());
      } else {
        el.innerHTML = `<a href="/login.html" class="btn btn-nav">${window.MascoI18N ? window.MascoI18N.t("nav.login") : "Log in"}</a>`;
      }
      el.prepend(mount);
      if (window.MascoI18N && window.MascoI18N.createToggle) {
        window.MascoI18N.createToggle(mount);
      }
    });
  }

  function guardPage() {
    const requirement = document.body.getAttribute("data-require");
    if (!requirement) return;

    const user = API.isLoggedIn() ? API.getUser() : null;
    if (!user) {
      location.href = "/login.html?next=" + encodeURIComponent(location.pathname);
      return;
    }
    if (!roleSatisfies(user.roles || [], requirement)) {
      document.body.innerHTML = `
        <div class="guard-box">
          <h2 data-i18n="guard.notAllowed">${MascoI18N.t("guard.notAllowed")}</h2>
          <p>${escapeHtml(user.email)} ${MascoI18N.t("guard.body")}</p>
          <p><a href="/dashboard.html">${MascoI18N.t("guard.goDash")}</a></p>
        </div>`;
      throw new Error("Access denied by page guard");
    }
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text == null ? "" : String(text);
    return div.innerHTML;
  }

  // Run once DOM is ready. i18n boots first so translations exist,
  // then the guard and auth-area render in the chosen language.
  function start() {
    if (window.MascoI18N) window.MascoI18N.apply();
    guardPage();
    renderAuthArea();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
