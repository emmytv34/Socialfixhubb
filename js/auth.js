(function () {
  async function onLoginSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.querySelector('input[name="email"]').value.trim();
    const password = form.querySelector('input[name="password"]').value;
    const status = form.querySelector('.auth-status');

    if (!window.sfhSupabase) {
      status.textContent = '⚠️ Supabase not configured.';
      return;
    }

    status.textContent = 'Signing you in...';
    const { error } = await window.sfhSupabase.auth.signInWithPassword({ email, password });
    status.textContent = error ? `❌ ${error.message}` : '✅ Login successful. Redirecting to dashboard...';
    if (!error) setTimeout(() => (window.location.href = '/pages/dashboard.html'), 800);
  }

  async function onSignupSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.querySelector('input[name="email"]').value.trim();
    const password = form.querySelector('input[name="password"]').value;
    const fullName = form.querySelector('input[name="name"]')?.value.trim();
    const status = form.querySelector('.auth-status');

    if (!window.sfhSupabase) {
      status.textContent = '⚠️ Supabase not configured.';
      return;
    }

    status.textContent = 'Creating account...';
    const { error } = await window.sfhSupabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName || '' } }
    });

    status.textContent = error
      ? `❌ ${error.message}`
      : '✅ Signup successful. Check your email for verification link.';
  }

  async function bindAuthState() {
    const el = document.querySelector('[data-auth-user]');
    if (!el || !window.sfhSupabase) return;
    const { data } = await window.sfhSupabase.auth.getSession();
    const user = data.session?.user;
    el.textContent = user ? `👋 ${user.email}` : 'Guest';
  }

  document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('[data-login-form]');
    const signupForm = document.querySelector('[data-signup-form]');
    if (loginForm) loginForm.addEventListener('submit', onLoginSubmit);
    if (signupForm) signupForm.addEventListener('submit', onSignupSubmit);

    const logoutBtn = document.querySelector('[data-logout]');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', async () => {
        if (!window.sfhSupabase) return;
        await window.sfhSupabase.auth.signOut();
        window.location.href = '/index.html';
      });
    }

    bindAuthState();
  });
})();
