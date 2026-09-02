(() => {
  const root = document.documentElement;
  const header = document.querySelector('.site-header');
  const progressBar = document.getElementById('progress-bar');
  const themeToggle = document.getElementById('theme-toggle');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const themeKey = 'inner-north-journal-theme';

  const storedTheme = localStorage.getItem(themeKey);
  if (storedTheme === 'dark' || storedTheme === 'light') {
    root.dataset.theme = storedTheme;
  }

  const updateThemeLabel = () => {
    const isDark = root.dataset.theme === 'dark';
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    themeToggle.setAttribute('title', isDark ? 'Switch to light theme' : 'Switch to dark theme');
  };

  themeToggle.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(themeKey, root.dataset.theme);
    updateThemeLabel();
  });
  updateThemeLabel();

  const updateScrollState = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', updateScrollState, { passive: true });
  updateScrollState();

  const closeMenu = () => {
    mobileNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
    mobileNav.setAttribute('aria-hidden', 'true');
  };
  menuToggle.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    mobileNav.setAttribute('aria-hidden', String(!open));
  });
  mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

  document.getElementById('copyright-year').textContent = new Date().getFullYear();
})();
