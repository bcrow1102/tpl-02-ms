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
     split hero animation
  ----------------------------- */
  function initSplitHero() {
    var heroLeft = document.querySelector('.hero-left');
    var heroLeftImage = document.querySelector('.hero-left img');
    var heroRight = document.querySelector('.hero-right');
    var copyTop = document.querySelector('.copy-top');
    var copyMain = document.querySelector('.copy-main');
    var copySub = document.querySelector('.copy-sub');
    var copyPrice = document.querySelector('.copy-price');
    var textEls = [copyTop, copyMain, copySub, copyPrice].filter(Boolean);

    /* --- fallback if GSAP not loaded --- */
    if (typeof gsap === 'undefined') {
      if (heroRight) {
        heroRight.style.opacity = '1';
        heroRight.style.transform = 'none';
      }
      textEls.forEach(function (el) {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    /* --- FOUC prevention: hide everything before animating --- */
    if (heroLeftImage) {
      gsap.set(heroLeftImage, { scale: 1.08, x: -40, transformOrigin: 'center center' });
    }
    if (heroRight) {
      gsap.set(heroRight, { opacity: 0, x: 80 });
    }
    textEls.forEach(function (el) {
      gsap.set(el, { opacity: 0, y: 30 });
    });

    /* --- build timeline --- */
    var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    /* 1) left image: scale down + slide in from left */
    if (heroLeftImage) {
      tl.to(heroLeftImage, {
        scale: 1,
        x: 0,
        duration: 1.4
      }, 0);
    }

    /* 2) text stack: staggered fade + rise */
    if (copyTop) {
      tl.to(copyTop, {
        opacity: 1,
        y: 0,
        duration: 0.6
      }, 0.15);
    }

    if (copyMain) {
      tl.to(copyMain, {
        opacity: 1,
        y: 0,
        duration: 0.7
      }, 0.25);
    }

    if (copySub) {
      tl.to(copySub, {
        opacity: 1,
        y: 0,
        duration: 0.6
      }, 0.5);
    }

    if (copyPrice) {
      tl.to(copyPrice, {
        opacity: 1,
        y: 0,
        duration: 0.6
      }, 0.65);
    }

    /* 3) right panel: slide in from right + fade */
    if (heroRight) {
      tl.to(heroRight, {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: 'power2.out'
      }, 0.35);
    }
  }

  /* -----------------------------
     boot
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

  function boot() {
    initSplitHero();
    initInfoTabs();
  }