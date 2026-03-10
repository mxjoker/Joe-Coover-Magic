/* ============================================================
   JOE COOVER MAGIC — main.js
   Sticky nav · Mobile menu · Scroll reveal · FAQ · Misc
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     STICKY NAV — add .scrolled class after 20px scroll
  ---------------------------------------------------------- */
  const nav = document.querySelector('.site-nav');
  if (nav) {
    const handleNavScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll(); // run once on load
  }

  /* ----------------------------------------------------------
     ACTIVE NAV LINK — highlight current page
  ---------------------------------------------------------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ----------------------------------------------------------
     MOBILE HAMBURGER MENU
  ---------------------------------------------------------- */
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.nav-mobile');

  if (hamburger && mobileMenu) {
    const toggleMenu = () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      hamburger.setAttribute('aria-expanded', isOpen);
    };

    hamburger.addEventListener('click', toggleMenu);

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ----------------------------------------------------------
     SCROLL REVEAL — IntersectionObserver
  ---------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(el => revealObserver.observe(el));
  }

  /* ----------------------------------------------------------
     FAQ ACCORDION
  ---------------------------------------------------------- */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all open items
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Open clicked if it was closed
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ----------------------------------------------------------
     MARQUEE — duplicate children for seamless loop
  ---------------------------------------------------------- */
  document.querySelectorAll('.marquee-track').forEach(track => {
    const items = track.innerHTML;
    track.innerHTML = items + items; // duplicate for seamless scroll
  });

  /* ----------------------------------------------------------
     SMOOTH ANCHOR SCROLL (for in-page links like #contact)
  ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'));
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ----------------------------------------------------------
     NETLIFY FORM — success redirect handling
     Netlify redirects to ?success=true after submission
  ---------------------------------------------------------- */
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('success') === 'true') {
    const form = document.querySelector('.contact-form');
    const success = document.querySelector('.form-success');
    if (form && success) {
      form.style.display = 'none';
      success.classList.add('show');
      // Scroll to success message
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  /* ----------------------------------------------------------
     LAZY LOAD IMAGES (for media/gallery page)
  ---------------------------------------------------------- */
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length) {
      const imageObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            if (img.dataset.srcset) img.srcset = img.dataset.srcset;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        });
      }, { rootMargin: '200px' });
      lazyImages.forEach(img => imageObserver.observe(img));
    }
  }

  /* ----------------------------------------------------------
     YEAR — auto-update copyright year in footer
  ---------------------------------------------------------- */
  document.querySelectorAll('.copyright-year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

})();
