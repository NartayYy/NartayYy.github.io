(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ========================================
  // Theme Toggle
  // ========================================
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  themeToggle.addEventListener('click', function () {
    const current = html.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  // ========================================
  // Mobile Menu
  // ========================================
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  function openMenu() {
    navToggle.setAttribute('aria-expanded', 'true');
    navMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', function () {
    const expanded = this.getAttribute('aria-expanded') === 'true';
    expanded ? closeMenu() : openMenu();
  });

  navMenu.querySelectorAll('.navbar__link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      closeMenu();
      navToggle.focus();
    }
  });

  // ========================================
  // Scroll Progress Bar
  // ========================================
  const scrollProgress = document.getElementById('scrollProgress');

  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = progress + '%';
  }

  // ========================================
  // Navbar Scroll Effect
  // ========================================
  const navbar = document.getElementById('navbar');

  function updateNavbar() {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  }

  // ========================================
  // Scroll-to-Top Button
  // ========================================
  const scrollTopBtn = document.getElementById('scrollTop');

  function updateScrollTopBtn() {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }

  scrollTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });

  // ========================================
  // Scroll Event (throttled via rAF)
  // ========================================
  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(function () {
        updateScrollProgress();
        updateNavbar();
        updateScrollTopBtn();
        updateTimeline();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // ========================================
  // Fade-in Observer
  // ========================================
  if (!prefersReducedMotion) {
    const fadeObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.fade-in').forEach(function (el) {
      fadeObserver.observe(el);
    });
  } else {
    document.querySelectorAll('.fade-in').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ========================================
  // Scroll-Spy
  // ========================================
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.navbar__link');

  const spyObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    },
    { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
  );

  sections.forEach(function (section) {
    spyObserver.observe(section);
  });

  // ========================================
  // Counter Animation
  // ========================================
  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-target'));
    const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1500;
    const start = performance.now();

    function easeOut(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = easeOut(progress) * target;

      if (decimals > 0) {
        el.textContent = value.toFixed(decimals) + suffix;
      } else {
        el.textContent = Math.round(value) + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }

  const counterObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('.counter').forEach(function (el) {
    counterObserver.observe(el);
  });

  // ========================================
  // Language Bars Animation
  // ========================================
  const langObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const fill = entry.target;
          const width = fill.getAttribute('data-width');
          fill.style.setProperty('--fill-width', width + '%');
          fill.classList.add('animated');
          langObserver.unobserve(fill);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('.language__fill').forEach(function (el) {
    langObserver.observe(el);
  });

  // ========================================
  // Timeline Growing Line
  // ========================================
  const timelineEl = document.getElementById('timeline');
  const timelineLine = document.getElementById('timelineLine');

  function updateTimeline() {
    if (!timelineEl || !timelineLine || prefersReducedMotion) return;

    const rect = timelineEl.getBoundingClientRect();
    const viewportH = window.innerHeight;
    const timelineH = timelineEl.offsetHeight;

    if (rect.top > viewportH || rect.bottom < 0) return;

    const scrolled = viewportH - rect.top;
    const total = timelineH + viewportH * 0.3;
    const progress = Math.max(0, Math.min(1, scrolled / total));

    timelineLine.style.transform = 'scaleY(' + progress + ')';
  }

  // ========================================
  // Smooth Scroll for Anchor Links
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start'
      });
    });
  });

  // ========================================
  // Initial Calls
  // ========================================
  updateScrollProgress();
  updateNavbar();
  updateScrollTopBtn();
  updateTimeline();
})();
