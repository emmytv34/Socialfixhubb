(function () {
  const NAV_LINKS = [
    ['Home', '/index.html', '🏠'],
    ['Guides', '/pages/guides.html', '📘'],
    ['Resources', '/pages/free-resources.html', '🎁'],
    ['Tools', '/pages/virtual-tools.html', '🧰'],
    ['Pricing', '/pages/pricing.html', '💎'],
    ['Dashboard', '/pages/dashboard.html', '📊'],
    ['Contact', '/pages/contact.html', '✉️']
  ];

  function navHtml(pathname) {
    return NAV_LINKS.map(([label, href, icon]) => {
      const active = pathname.endsWith(href) || (pathname === '/' && href === '/index.html');
      return `<a href="${href}" class="${active ? 'active' : ''}">${icon} ${label}</a>`;
    }).join('');
  }

  function renderLayout() {
    const siteHeader = document.querySelector('[data-site-header]');
    const siteFooter = document.querySelector('[data-site-footer]');
    const path = window.location.pathname;

    if (siteHeader) {
      siteHeader.innerHTML = `
      <header class="header">
        <div class="container header-inner">
          <a class="brand" href="/index.html"><span class="brand-mark">🛠️</span><span>Social Fix Hub</span></a>
          <form class="top-search" data-site-search>
            <input type="search" placeholder="Search guides, tools, resources..." aria-label="Search" />
            <button type="submit">Search</button>
          </form>
          <div class="header-actions">
            <button class="btn" data-theme-toggle>🌙 Dark</button>
            <a class="btn-link" href="/pages/login.html">Login</a>
            <a class="btn primary" href="/pages/signup.html">Sign up</a>
          </div>
        </div>
        <div class="nav-wrap"><nav class="container nav">${navHtml(path)}</nav></div>
      </header>`;
    }

    if (siteFooter) {
      siteFooter.innerHTML = `
      <footer class="footer">
        <div class="container footer-inner">
          <strong>© 2026 Social Fix Hub</strong>
          <div class="footer-links">
            <a href="/pages/about.html">About</a>
            <a href="/pages/privacy.html">Privacy</a>
            <a href="/pages/terms.html">Terms</a>
            <a href="/pages/faq.html">FAQ</a>
          </div>
        </div>
      </footer>`;
    }
  }

  function bindSearch() {
    document.querySelectorAll('[data-site-search]').forEach((form) => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const q = form.querySelector('input')?.value?.trim();
        window.location.href = q ? `/pages/guides.html?q=${encodeURIComponent(q)}` : '/pages/guides.html';
      });
    });
  }

  function hydrateGuideSearch() {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    const el = document.querySelector('[data-query-display]');
    if (q && el) el.textContent = `Results for: "${q}"`;
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderLayout();
    bindSearch();
    hydrateGuideSearch();
  });
})();
