/**
 * MASCO ACCOUNTING LEARNING SITE
 * api.js — thin fetch wrapper for the backend API.
 * Handles: base URL, JWT attach, 401 handling, error normalization.
 * No dependencies.
 */

(function () {
  "use strict";

  const TOKEN_KEY = "ml.token";
  const USER_KEY = "ml.user";

  class ApiError extends Error {
    constructor(status, payload) {
      super((payload && payload.error) || `Request failed (${status})`);
      this.status = status;
      this.payload = payload;
    }
  }

  function getToken() {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  }

  function setSession(token, user) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  function getUser() {
    try {
      return JSON.parse(localStorage.getItem(USER_KEY));
    } catch {
      return null;
    }
  }

  function isLoggedIn() {
    const token = getToken();
    if (!token) return false;
    // Cheap expiry check: JWT middle segment carries exp (seconds).
    try {
      const payload = JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  function clearSession() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  /**
   * Core request helper.
   * @param {string} method HTTP method
   * @param {string} path   API path beginning with /api/
   * @param {object} body   optional JSON body
   * @returns {Promise<any>} parsed JSON response
   */
  async function request(method, path, body) {
    const headers = { Accept: "application/json" };
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
    if (body !== undefined) headers["Content-Type"] = "application/json";

    let response;
    try {
      response = await fetch(path, {
        method,
        headers,
        body: body === undefined ? undefined : JSON.stringify(body),
      });
    } catch (networkErr) {
      throw new ApiError(0, { error: "Cannot reach the server. Are you running the app?" });
    }

    if (response.status === 204) return null;

    let payload = null;
    const contentType = response.headers.get("Content-Type") || "";
    if (contentType.includes("application/json")) {
      payload = await response.json().catch(() => null);
    } else if (contentType.includes("text/csv")) {
      payload = await response.text();
    }

    if (!response.ok) {
      // Session expired or invalid: clear and send to login (except on login page itself).
      if (response.status === 401 && !location.pathname.endsWith("/login.html")) {
        clearSession();
        location.href = "/login.html";
      }
      throw new ApiError(response.status, payload);
    }
    return payload;
  }

  window.MascoAPI = {
    ApiError,

    // session
    getToken,
    setSession,
    getUser,
    isLoggedIn,
    clearSession,

    // endpoints
    async login(email, password) {
      const data = await request("POST", "/api/auth/login", { email, password });
      setSession(data.token, data.user);
      return data.user;
    },
    logout() {
      clearSession();
      location.href = "/index.html";
    },
    me() {
      return request("GET", "/api/auth/me");
    },

    modules() {
      return request("GET", "/api/modules");
    },
    startModule(moduleCode) {
      return request("POST", `/api/progress/${encodeURIComponent(moduleCode)}/start`);
    },
    submitAttempt(moduleCode, selectedAnswers) {
      return request(
        "POST",
        `/api/quizzes/${encodeURIComponent(moduleCode)}/attempts`,
        { selectedAnswers },
      );
    },

    myReport() {
      return request("GET", "/api/reports/my");
    },
    teamReport() {
      return request("GET", "/api/reports/team");
    },

    users() {
      return request("GET", "/api/users");
    },
    createUser(payload) {
      return request("POST", "/api/users", payload);
    },
    updateUser(id, payload) {
      return request("PUT", `/api/users/${encodeURIComponent(id)}`, payload);
    },
    resetPassword(id, newPassword) {
      return request(
        "POST",
        `/api/users/${encodeURIComponent(id)}/reset-password`,
        { newPassword },
      );
    },
  };
})();
