import './navbar.js';

document.querySelectorAll('wm-navbar .nav-item a.nav-link').forEach((el) => {
  if (el.getAttribute('href') === window.location.pathname) {
    el.classList.add('active');
  }
});
