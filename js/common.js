
// common.js - shared features for all pages

// Smooth scroll
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      let target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// Cookie consent
function initCookieConsent() {
  function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
  }
  function getCookie(name) {
    let cname = name + "=";
    return document.cookie.split(';').map(c => c.trim()).find(c => c.startsWith(cname))?.substring(cname.length) || "";
  }
  if (typeof $ !== 'undefined') {
    if (!getCookie("tastybites_accept")) $("#cookieConsent").fadeIn();
    $("#acceptCookies").click(() => {
      setCookie("tastybites_accept", "yes", 365);
      $("#cookieConsent").fadeOut();
    });
  }
}

// Sticky header
function initStickyHeader() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('shadow-sm', window.scrollY > 50);
  });
}

// Dark mode toggle
function initDarkMode() {
  const toggle = document.getElementById('darkModeToggle');
  if (!toggle) return;
  const body = document.body;
  if (localStorage.getItem('darkMode') === 'true') body.classList.add('dark-mode');
  toggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
  });
}

// Scroll to top button
function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.style.display = (window.scrollY > 300) ? 'block' : 'none';
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// Init shared
document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initCookieConsent();
  initStickyHeader();
  initDarkMode();
  initScrollTop();
});
