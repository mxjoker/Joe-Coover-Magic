/* ═══════════════════════════════════════════════════════════════
   JOE COOVER MAGIC — gallery.js
   Photo lightbox for media.html
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── BUILD LIGHTBOX DOM ─────────────────────────────────── */
  function buildLightbox() {
    const lb = document.createElement('div');
    lb.id = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Photo viewer');
    lb.innerHTML = `
      <div class="lb-backdrop"></div>
      <div class="lb-inner">
        <button class="lb-close" aria-label="Close photo viewer">✕</button>
        <button class="lb-prev" aria-label="Previous photo">&#8592;</button>
        <button class="lb-next" aria-label="Next photo">&#8594;</button>
        <div class="lb-img-wrap">
          <img class="lb-img" src="" alt="">
        </div>
        <div class="lb-caption"></div>
        <div class="lb-counter"></div>
      </div>
    `;
    document.body.appendChild(lb);

    // Inject styles
    const style = document.createElement('style');
    style.textContent = `
      #lightbox {
        display: none;
        position: fixed;
        inset: 0;
        z-index: 9999;
        align-items: center;
        justify-content: center;
      }
      #lightbox.open { display: flex; }
      .lb-backdrop {
        position: absolute;
        inset: 0;
        background: rgba(10, 10, 15, 0.96);
        backdrop-filter: blur(8px);
        cursor: pointer;
      }
      .lb-inner {
        position: relative;
        z-index: 1;
        max-width: min(90vw, 1100px);
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
      }
      .lb-img-wrap {
        position: relative;
        max-height: calc(90vh - 100px);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .lb-img {
        max-width: 90vw;
        max-height: calc(90vh - 100px);
        object-fit: contain;
        border: 1px solid rgba(255, 45, 120, 0.25);
        box-shadow: 0 0 60px rgba(255, 45, 120, 0.15);
        display: block;
      }
      .lb-close {
        position: fixed;
        top: 24px; right: 32px;
        font-size: 1.5rem;
        color: rgba(240,240,248,0.6);
        background: none; border: none;
        cursor: pointer;
        transition: color 0.2s;
        z-index: 2;
      }
      .lb-close:hover { color: #FF2D78; }
      .lb-prev, .lb-next {
        position: fixed;
        top: 50%; transform: translateY(-50%);
        font-size: 2rem;
        color: rgba(240,240,248,0.5);
        background: rgba(10,10,15,0.7);
        border: 1px solid rgba(255,255,255,0.06);
        width: 52px; height: 52px;
        display: flex; align-items: center; justify-content: center;
        cursor: pointer;
        transition: all 0.2s;
        z-index: 2;
      }
      .lb-prev { left: 24px; }
      .lb-next { right: 24px; }
      .lb-prev:hover, .lb-next:hover {
        color: #FF2D78;
        border-color: rgba(255, 45, 120, 0.4);
        box-shadow: 0 0 20px rgba(255, 45, 120, 0.2);
      }
      .lb-caption {
        font-family: 'Jost', sans-serif;
        font-size: 0.88rem;
        color: rgba(240,240,248,0.5);
        text-align: center;
        max-width: 600px;
      }
      .lb-counter {
        font-family: 'Audiowide', cursive;
        font-size: 0.62rem;
        letter-spacing: 0.2em;
        color: rgba(255, 45, 120, 0.6);
        text-transform: uppercase;
      }
      @media (max-width: 768px) {
        .lb-prev { left: 8px; }
        .lb-next { right: 8px; }
        .lb-close { top: 16px; right: 16px; }
      }
    `;
    document.head.appendChild(style);
    return lb;
  }

  /* ─── INIT GALLERY ───────────────────────────────────────── */
  function initGallery() {
    const items = document.querySelectorAll('.gallery-item');
    if (!items.length) return;

    const lb    = buildLightbox();
    const img   = lb.querySelector('.lb-img');
    const cap   = lb.querySelector('.lb-caption');
    const ctr   = lb.querySelector('.lb-counter');
    const close = lb.querySelector('.lb-close');
    const prev  = lb.querySelector('.lb-prev');
    const next  = lb.querySelector('.lb-next');
    const back  = lb.querySelector('.lb-backdrop');

    let current = 0;
    const photos = Array.from(items).map(function (item) {
      return {
        src: item.dataset.full || item.querySelector('img')?.src || '',
        alt: item.dataset.caption || item.querySelector('img')?.alt || ''
      };
    });

    function show(index) {
      current = (index + photos.length) % photos.length;
      img.src = photos[current].src;
      img.alt = photos[current].alt;
      cap.textContent = photos[current].alt;
      ctr.textContent = (current + 1) + ' / ' + photos.length;
    }

    function open(index) {
      show(index);
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
      close.focus();
    }

    function closeLB() {
      lb.classList.remove('open');
      document.body.style.overflow = '';
      items[current].focus();
    }

    items.forEach(function (item, i) {
      item.style.cursor = 'pointer';
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');
      item.setAttribute('aria-label', 'View photo: ' + (item.dataset.caption || ''));
      item.addEventListener('click', function () { open(i); });
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); }
      });
    });

    close.addEventListener('click', closeLB);
    back.addEventListener('click', closeLB);
    prev.addEventListener('click', function () { show(current - 1); });
    next.addEventListener('click', function () { show(current + 1); });

    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape')      closeLB();
      if (e.key === 'ArrowLeft')   show(current - 1);
      if (e.key === 'ArrowRight')  show(current + 1);
    });
  }

  // Init when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGallery);
  } else {
    initGallery();
  }

})();
