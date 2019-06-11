;(function () {
  var nav = document.querySelector('.js-nav');

  document.addEventListener('click', function (e) {
    toggleNav(e);
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
})();
