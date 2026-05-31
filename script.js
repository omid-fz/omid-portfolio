// ─── PAGE NAVIGATION ──────────────────────────────────────────────────────────

const pages    = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.nav-link');

/**
 * Show the page matching the given id and animate it in.
 * @param {string} id - matches data-page attribute and page-{id} element id
 */
function showPage(id) {
  // Hide all pages
  pages.forEach(p => p.classList.remove('active', 'visible'));
  navLinks.forEach(l => l.classList.remove('active'));

  const target     = document.getElementById('page-' + id);
  const activeLink = document.querySelector(`.nav-link[data-page="${id}"]`);

  if (!target) return;

  target.classList.add('active');
  if (activeLink) activeLink.classList.add('active');

  // Double rAF ensures the display:block has painted before the transition fires
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      target.classList.add('visible');
    });
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── EVENT LISTENERS ──────────────────────────────────────────────────────────

// Sidebar nav links
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    showPage(link.dataset.page);
  });
});

// Any other element with data-page (e.g. the "View my career" CTA button)
document.querySelectorAll('[data-page]').forEach(el => {
  if (!el.classList.contains('nav-link')) {
    el.addEventListener('click', () => showPage(el.dataset.page));
  }
});

// ─── INIT ──────────────────────────────────────────────────────────────────────

// Show the home page on first load
showPage('home');
