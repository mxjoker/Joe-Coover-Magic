/* ═══════════════════════════════════════════════════════════════
   JOE COOVER MAGIC — main.js
   Sticky nav · Mobile hamburger · Scroll reveals · Active links
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── NAV: Scrolled state ─────────────────────────────────── */
  const nav = document.querySelector('.site-nav');

  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Run once on load

  /* ─── NAV: Mobile hamburger ───────────────────────────────── */
  const hamburger = document.querySelector('.nav-hamburger');
  const drawer    = document.querySelector('.nav-drawer');

  if (hamburger && drawer) {
    hamburger.addEventListener('click', function () {
      const isOpen = drawer.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      // Prevent body scroll when drawer is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close drawer on link click
    drawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        drawer.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && drawer.classList.contains('open')) {
        drawer.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ─── NAV: Active link highlight ─────────────────────────── */
  function setActiveLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a, .nav-drawer a').forEach(function (a) {
      const href = a.getAttribute('href') || '';
      const page = href.split('/').pop();
      if (page === currentPath || (currentPath === '' && page === 'index.html')) {
        a.classList.add('active');
      } else {
        a.classList.remove('active');
      }
    });
  }
  setActiveLink();

  /* ─── SCROLL REVEAL ───────────────────────────────────────── */
  function initReveal() {
    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Unobserve after reveal — no repeated animation
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  }

  initReveal();

  /* ─── FAQ ACCORDION ───────────────────────────────────────── */
  function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const item = btn.closest('.faq-item');
        const isOpen = item.classList.contains('open');

        // Close all open items
        document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });

        // If it wasn't open, open it
        if (!isOpen) {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  initFAQ();

  /* ─── SMOOTH SCROLL for anchor links ─────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--nav-height')) || 76;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ─── MARQUEE: pause on hover ────────────────────────────── */
  document.querySelectorAll('.marquee-track').forEach(function (track) {
    const strip = track.closest('.marquee-strip');
    if (!strip) return;
    strip.addEventListener('mouseenter', function () {
      track.style.animationPlayState = 'paused';
    });
    strip.addEventListener('mouseleave', function () {
      track.style.animationPlayState = 'running';
    });
  });

  /* ─── FORM: basic client-side validation ─────────────────── */
  const contactForm = document.querySelector('form[name="contact"]');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      let valid = true;
      contactForm.querySelectorAll('[required]').forEach(function (field) {
        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = '#FF2D78';
          field.addEventListener('input', function () {
            field.style.borderColor = '';
          }, { once: true });
        }
      });
      if (!valid) {
        e.preventDefault();
        const firstInvalid = contactForm.querySelector('[required]:placeholder-shown, [required][value=""]');
        if (firstInvalid) firstInvalid.focus();
      }
    });
  }

  /* ─── YEAR in footer copyright ───────────────────────────── */
  document.querySelectorAll('.js-year').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

})();
