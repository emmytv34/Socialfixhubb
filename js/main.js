(function () {
  function markActiveNav() {
    const path = window.location.pathname;
    document.querySelectorAll('.nav a').forEach((a) => {
      const href = a.getAttribute('href');
      if (!href) return;
      if (path.endsWith(href.replace(/^\./, '')) || (path === '/' && href.includes('index.html'))) {
        a.classList.add('active');
      }
    });
  }

  function bindSearch() {
    document.querySelectorAll('[data-site-search]').forEach((form) => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const q = form.querySelector('input')?.value?.trim();
        if (!q) return;
        window.location.href = `/pages/guides.html?q=${encodeURIComponent(q)}`;
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    markActiveNav();
    bindSearch();
  });
})();
