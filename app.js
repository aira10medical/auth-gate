// ===============================
// Static access gate (NO EMAIL)
// ===============================

const VALID_CODES = [
  "medico2025",
  "admin2025",
  "staff2025"
];

const VIEWER_URL = "https://viewer.drakarinapesce.com.ar/";

// ===============================
// DOM elements
// ===============================

const form = document.getElementById("login-form");
const codeInput = document.getElementById("code");
const statusEl = document.getElementById("status");

// ===============================
// Auto-redirect if authorized
// ===============================

if (localStorage.getItem("gate_authorized") === "true") {
  window.location.href = VIEWER_URL;
}

// ===============================
// Handle access code
// ===============================

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const code = codeInput.value.trim();

  if (!code) {
    statusEl.textContent = "Please enter access code.";
    return;
  }

  if (VALID_CODES.includes(code)) {
    localStorage.setItem("gate_authorized", "true");
    statusEl.textContent = "Access granted. Redirecting…";
    setTimeout(() => {
      window.location.href = VIEWER_URL;
    }, 300);
  } else {
    statusEl.textContent = "Invalid access code.";
    codeInput.value = "";
    codeInput.focus();
  }
});
