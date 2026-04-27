(function () {
  const SUPABASE_URL = window.SUPABASE_URL || localStorage.getItem('SUPABASE_URL') || 'https://YOUR_PROJECT.supabase.co';
  const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || localStorage.getItem('SUPABASE_ANON_KEY') || 'YOUR_SUPABASE_ANON_KEY';

  if (!window.supabase) {
    console.warn('Supabase library not loaded.');
    return;
  }

  if (SUPABASE_URL.includes('YOUR_PROJECT') || SUPABASE_ANON_KEY.includes('YOUR_SUPABASE')) {
    console.warn('Set real Supabase credentials in js/supabase-config.js or window variables.');
  }

  window.sfhSupabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
})();
