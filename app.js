// ===============================
// Supabase configuration
// ===============================

const SUPABASE_URL = "https://skmomjhpzuomdopnmdhx.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_ZwI0wv4bHYpemg5zGEWymQ_RYKzmny5";


if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("Missing Supabase environment variables");
}

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// ===============================
// DOM elements
// ===============================

const form = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const statusEl = document.getElementById("status");

// ===============================
// Redirect if already logged in
// ===============================

(async () => {
  const { data } = await supabase.auth.getSession();

  if (data?.session) {
    window.location.href = "https://viewer.drakarinapesce.com.ar/";
  }
})();

// ===============================
// Handle Magic Link login
// ===============================

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();

  if (!email) {
    statusEl.textContent = "Please enter a valid email.";
    return;
  }

  statusEl.textContent = "Sending magic link...";

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: window.location.origin
    }
  });

  if (error) {
    console.error(error);
    statusEl.textContent = "Error sending magic link.";
    return;
  }

  statusEl.textContent =
    "Magic link sent. Check your email to continue.";
});

