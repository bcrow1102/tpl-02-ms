(function () {
  'use strict';

  /* -----------------------------
     header scroll
  ----------------------------- */
  var header = document.querySelector('.site-header');

  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('is-scrolled', window.scrollY > 30);
    }, { passive: true });
  }

  /* -----------------------------
     smooth scroll
  ----------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = link.getAttribute('href');
      if (!href || href === '#') return;

      var target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });

  /* -----------------------------
     saas hero animation
  ----------------------------- */
  function initSaasHero() {
    var hero = document.querySelector('.hero-saas');
    var eyebrow = document.querySelector('.hero-saas__eyebrow-wrap');
    var title = document.querySelector('.hero-saas__title');
    var desc = document.querySelector('.hero-saas__desc');
    var ctas = document.querySelector('.hero-saas__cta-row');
    var meta = document.querySelector('.hero-saas__meta');
    var items = [eyebrow, title, desc, ctas, meta].filter(Boolean);

    if (!hero) return;

    if (typeof gsap === 'undefined') {
      items.forEach(function (el) {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    items.forEach(function (el) {
      gsap.set(el, { opacity: 0, y: 24 });
    });

    var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    items.forEach(function (el, index) {
      tl.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.72
      }, 0.08 * index);
    });
  }

  /* -----------------------------
     info tabs
  ----------------------------- */
  function initInfoTabs() {
    var tabs = document.querySelectorAll('.zimo-info-tab');
    var panels = document.querySelectorAll('.zimo-info-panel');
    var tabsSection = document.querySelector('.zimo-info-tabs');

    if (!tabs.length || !panels.length) return;

    function openPanel(target, shouldScroll) {
      tabs.forEach(function (btn) {
        var isMatch = btn.getAttribute('data-tab') === target;
        btn.classList.toggle('is-active', isMatch);
        btn.setAttribute('aria-selected', isMatch ? 'true' : 'false');
      });

      panels.forEach(function (panel) {
        var isMatch = panel.getAttribute('data-panel') === target;
        panel.classList.toggle('is-active', isMatch);
      });

      if (shouldScroll && tabsSection) {
        var header = document.querySelector('.site-header');
        var headerHeight = header ? header.offsetHeight : 0;
        var top = tabsSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 12;

        window.scrollTo({
          top: top,
          behavior: 'smooth'
        });
      }
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var target = tab.getAttribute('data-tab');
        var isAlreadyActive = tab.classList.contains('is-active');

        if (isAlreadyActive) {
          return;
        }

        openPanel(target, true);
      });
    });

    var defaultActive = document.querySelector('.zimo-info-tab.is-active');
    if (defaultActive) {
      openPanel(defaultActive.getAttribute('data-tab'), false);
    }
  }

  /* -----------------------------
     boot
  ----------------------------- */
  function boot() {
    initSaasHero();
    initInfoTabs();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();