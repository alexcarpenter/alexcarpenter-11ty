;(function () {
  var nav = document.querySelector('.js-nav');

  document.addEventListener('click', function (e) {
    toggleNav(e);
    toggleDarkMode(e);
  }, false);

  function toggleNav(e) {
    if (!e.target.matches('.js-nav-toggle')) return;
    var btn = e.target;
    btn.classList.contains('is-active') ? hideNav(btn) : showNav(btn);
  }

  function showNav(el) {
    el.classList.add('is-active');
    nav.classList.add('is-visible');
    el.setAttribute('aria-expanded', true);
  }

  function hideNav(el) {
    el.classList.remove('is-active');
    nav.classList.remove('is-visible');
    el.setAttribute('aria-expanded', false);
  }

  function toggleDarkMode(e) {
    if (!e.target.matches('.js-dark-mode-toggle')) return;
    document.documentElement.classList.toggle('dark-mode');
    if (document.documentElement.classList.contains('dark-mode')) {
      localStorage.setItem('isDarkMode', true);
      return;
    }
    localStorage.removeItem('isDarkMode');
  }
})();
