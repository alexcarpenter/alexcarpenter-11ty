(function() {
  var nav = document.querySelector('.js-nav');

  document.addEventListener('click', function(e) {
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

  // Ref: https://timkadlec.com/
  window.onload = function(){
    setTimeout(function(){
      window.performance = window.performance || window.mozPerformance || window.msPerformance || window.webkitPerformance || {};
      var t = performance.timing || {};

      if (!t) {
        
        return;
      }
      var start = t.navigationStart,
          end = t.loadEventEnd
          loadTime = (end - start) / 1000;

      var copy = document.querySelectorAll('.js-page-timing');
      copy[0].innerHTML += "<p class='loaded'>This page loaded in <strong>" + loadTime + " seconds</strong>.</p>";
    }, 0); 
  }
})();