'use strict';

(function initLoader() {
  const loader = document.getElementById('loading-screen');
  if (!loader) return;

  document.body.style.overflow = 'hidden';

  window.addEventListener('load', function () {
    window.setTimeout(function () {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 1100);
  });
})();

document.addEventListener('DOMContentLoaded', function () {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 850,
      easing: 'ease-out-cubic',
      once: true,
      offset: 40,
    });
  }
});

(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navAnchors = navLinks ? navLinks.querySelectorAll('a[href^="#"]') : [];
  const sections = document.querySelectorAll('section[id]');

  if (!navbar) return;

  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 24);

    let currentId = '';
    sections.forEach(function (section) {
      const top = section.offsetTop - 140;
      if (window.scrollY >= top) currentId = section.id;
    });

    navAnchors.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
    });
  }

  function closeMenu() {
    if (!navToggle || !navLinks) return;
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Apri il menu');
    document.body.classList.remove('menu-open');
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const open = navLinks.classList.toggle('open');
      navToggle.classList.toggle('active', open);
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Chiudi il menu' : 'Apri il menu');
      document.body.classList.toggle('menu-open', open && window.innerWidth <= 900);
    });

    navAnchors.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', function (event) {
      if (!navbar.contains(event.target)) closeMenu();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) closeMenu();
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

(function initSmoothScroll() {
  const anchors = document.querySelectorAll('a[href^="#"]');
  anchors.forEach(function (anchor) {
    anchor.addEventListener('click', function (event) {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
})();

(function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const count = window.innerWidth < 768 ? 16 : 44;
  for (let index = 0; index < count; index += 1) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = 12 + Math.random() * 18 + 's';
    particle.style.animationDelay = Math.random() * 8 + 's';
    particle.style.opacity = String(0.08 + Math.random() * 0.34);
    particle.style.transform = 'scale(' + (0.8 + Math.random() * 0.8) + ')';
    container.appendChild(particle);
  }
})();

(function initHeroShuffle() {
  const images = document.querySelectorAll('[data-hero-image]');
  if (images.length < 2) return;

  let current = 0;
  window.setInterval(function () {
    images[current].classList.remove('active');
    current = (current + 1) % images.length;
    images[current].classList.add('active');
  }, 4000);
})();

(function initCounters() {
  const counters = document.querySelectorAll('.usp-counter');
  if (!counters.length) return;

  function animateCounter(counter) {
    const target = Number(counter.dataset.target || 0);
    const duration = 1600;
    const start = performance.now();

    function step(timestamp) {
      const progress = Math.min((timestamp - start) / duration, 1);
      const value = Math.floor(progress * target);
      counter.textContent = String(value);
      if (progress < 1) requestAnimationFrame(step);
      else counter.textContent = String(target);
    }

    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.5 });

  counters.forEach(function (counter) {
    observer.observe(counter);
  });
})();

(function initUspScene() {
  const scene = document.getElementById('uspScene');
  if (!scene || window.innerWidth <= 900) return;

  const left = scene.querySelector('[data-usp-card="left"]');
  const center = scene.querySelector('[data-usp-card="center"]');
  const right = scene.querySelector('[data-usp-card="right"]');
  if (!left || !center || !right) return;

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function updateCards() {
    const rect = scene.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const start = viewportHeight;
    const end = viewportHeight * 0.3;
    const progress = clamp((start - rect.top) / (start - end), 0, 1);

    const spread = progress;
    const leftX = -368 * spread;
    const rightX = 368 * spread;
    const leftY = 18 * spread;
    const rightY = 18 * spread;
    const centerY = -12 * spread;
    const leftRotate = -10 * spread;
    const rightRotate = 10 * spread;
    const centerScale = 1 + 0.03 * spread;
    const sideScale = 0.96 + 0.04 * spread;

    left.style.transform = 'translate3d(' + leftX + 'px, ' + leftY + 'px, 0) rotate(' + leftRotate + 'deg) scale(' + sideScale + ')';
    center.style.transform = 'translate3d(0, ' + centerY + 'px, 0) rotate(0deg) scale(' + centerScale + ')';
    right.style.transform = 'translate3d(' + rightX + 'px, ' + rightY + 'px, 0) rotate(' + rightRotate + 'deg) scale(' + sideScale + ')';

    left.style.opacity = String(0.86 + 0.14 * spread);
    right.style.opacity = String(0.86 + 0.14 * spread);
    center.style.opacity = '1';
  }

  window.addEventListener('scroll', updateCards, { passive: true });
  window.addEventListener('resize', updateCards);
  updateCards();
})();

(function initProvinceReveal() {
  const items = document.querySelectorAll('.province-item');
  if (!items.length) return;

  items.forEach(function (item) {
    item.style.opacity = '0';
    item.style.transform = 'translateY(12px)';
    item.style.transition = 'transform 480ms cubic-bezier(0.16,1,0.3,1), opacity 480ms cubic-bezier(0.16,1,0.3,1)';
  });

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      items.forEach(function (item, index) {
        window.setTimeout(function () {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, index * 70);
      });
      observer.disconnect();
    });
  }, { threshold: 0.18 });

  observer.observe(items[0]);
})();

(function initLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const lightboxOverlay = lightbox ? lightbox.querySelector('.lightbox-overlay') : null;

  if (!lightbox || !galleryItems.length || !lightboxImg || !lightboxCaption) return;

  const items = Array.from(galleryItems);
  let currentIndex = 0;

  function render(index) {
    const item = items[index];
    if (!item) return;
    lightboxImg.src = item.dataset.src || item.querySelector('img').src;
    lightboxImg.alt = item.dataset.caption || item.querySelector('img').alt || '';
    lightboxCaption.textContent = item.dataset.caption || '';
  }

  function open(index) {
    currentIndex = index;
    render(currentIndex);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function next() {
    currentIndex = (currentIndex + 1) % items.length;
    render(currentIndex);
  }

  function prev() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    render(currentIndex);
  }

  items.forEach(function (item, index) {
    item.addEventListener('click', function () {
      open(index);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', close);
  if (lightboxOverlay) lightboxOverlay.addEventListener('click', close);
  if (lightboxPrev) lightboxPrev.addEventListener('click', prev);
  if (lightboxNext) lightboxNext.addEventListener('click', next);

  document.addEventListener('keydown', function (event) {
    if (!lightbox.classList.contains('active')) return;
    if (event.key === 'Escape') close();
    if (event.key === 'ArrowRight') next();
    if (event.key === 'ArrowLeft') prev();
  });
})();

(function initContactForm() {
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  const status = document.getElementById('formStatus');
  if (!form || !success || !status) return;

  const validators = {
    nome: function (value) {
      return value.trim() ? '' : 'Inserisci il nome.';
    },
    cognome: function (value) {
      return value.trim() ? '' : 'Inserisci il cognome.';
    },
    telefono: function (value) {
      const cleaned = value.replace(/[^\d+]/g, '');
      if (!cleaned.trim()) return 'Inserisci un numero di telefono.';
      return cleaned.length < 8 ? 'Inserisci un numero valido.' : '';
    },
    email: function (value) {
      if (!value.trim()) return '';
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Inserisci un indirizzo email valido.';
    },
    messaggio: function (value) {
      return value.trim().length >= 12 ? '' : 'Descrivi la richiesta con almeno 12 caratteri.';
    },
  };

  function setError(input, message) {
    const group = input.closest('.form-group');
    const errorNode = group ? group.querySelector('.field-error') : null;
    if (!group || !errorNode) return;
    group.classList.toggle('is-invalid', Boolean(message));
    errorNode.textContent = message;
  }

  function validateInput(input) {
    const validator = validators[input.name];
    const message = validator ? validator(input.value) : '';
    setError(input, message);
    return !message;
  }

  form.querySelectorAll('input, textarea').forEach(function (input) {
    input.addEventListener('blur', function () {
      validateInput(input);
    });

    input.addEventListener('input', function () {
      if (input.closest('.form-group') && input.closest('.form-group').classList.contains('is-invalid')) {
        validateInput(input);
      }
      status.textContent = '';
    });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    status.textContent = '';

    const fields = Array.from(form.querySelectorAll('input, textarea'));
    const valid = fields.every(validateInput);
    if (!valid) {
      status.textContent = 'Controlla i campi evidenziati e riprova.';
      const firstInvalid = form.querySelector('.is-invalid input, .is-invalid textarea');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    const originalContent = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Invio in corso';

    window.setTimeout(function () {
      form.hidden = true;
      success.hidden = false;
      submitButton.disabled = false;
      submitButton.innerHTML = originalContent;
    }, 1200);
  });
})();

(function initBackToTop() {
  const button = document.getElementById('backToTop');
  if (!button) return;

  function update() {
    button.classList.toggle('visible', window.scrollY > 500);
  }

  window.addEventListener('scroll', update, { passive: true });
  update();

  button.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

(function initFloatingTooltip() {
  const button = document.querySelector('.whatsapp-float');
  const tooltip = button ? button.querySelector('.whatsapp-tooltip') : null;
  if (!button || !tooltip) return;

  window.setTimeout(function () {
    tooltip.style.opacity = '1';
    window.setTimeout(function () {
      tooltip.style.opacity = '';
    }, 2600);
  }, 2400);
})();
