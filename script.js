/* ===================================================
   BABA EASY FOOD - Main JavaScript
   Animations, interactions, and functionality
   =================================================== */

'use strict';

// ===== LOADING SCREEN =====
(function initLoader() {
  const loader = document.getElementById('loading-screen');
  if (!loader) return;

  window.addEventListener('load', function () {
    setTimeout(function () {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 1400);
  });

  document.body.style.overflow = 'hidden';
})();

// ===== AOS INIT =====
document.addEventListener('DOMContentLoaded', function () {
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 60,
    delay: 0,
  });
});

// ===== NAVBAR =====
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (!navbar) return;

  // Scroll effect
  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navbar.contains(e.target)) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
      }
    });
  }

  // Active link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinkItems = document.querySelectorAll('.nav-links a[href^="#"]');

  function updateActiveLink() {
    let current = '';
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinkItems.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
})();

// ===== HERO PARTICLES =====
(function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const count = window.innerWidth < 768 ? 15 : 30;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    const size = Math.random() * 6 + 2;
    const left = Math.random() * 100;
    const delay = Math.random() * 8;
    const duration = Math.random() * 10 + 8;

    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      bottom: -10px;
      animation-delay: ${delay}s;
      animation-duration: ${duration}s;
      opacity: ${Math.random() * 0.5 + 0.1};
    `;

    container.appendChild(particle);
  }
})();

// ===== PARALLAX HERO =====
(function initParallax() {
  const heroBg = document.querySelector('.hero-bg');
  const heroContent = document.querySelector('.hero-content');

  if (!heroBg) return;

  function handleParallax() {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      heroBg.style.transform = `translateY(${scrollY * 0.4}px)`;
      if (heroContent) {
        heroContent.style.transform = `translateY(${scrollY * 0.15}px)`;
        heroContent.style.opacity = 1 - (scrollY / (window.innerHeight * 0.8));
      }
    }
  }

  window.addEventListener('scroll', handleParallax, { passive: true });
})();

// ===== ANIMATED COUNTERS =====
(function initCounters() {
  const counters = document.querySelectorAll('.usp-counter');
  if (!counters.length) return;

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    function update() {
      current += step;
      if (current >= target) {
        el.textContent = target;
        return;
      }
      el.textContent = Math.floor(current);
      requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(function (counter) {
    observer.observe(counter);
  });
})();

// ===== GALLERY LIGHTBOX =====
(function initLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const lightboxOverlay = lightbox ? lightbox.querySelector('.lightbox-overlay') : null;

  if (!lightbox || !galleryItems.length) return;

  let currentIndex = 0;
  const items = Array.from(galleryItems);

  function openLightbox(index) {
    currentIndex = index;
    const item = items[index];
    const src = item.getAttribute('data-src') || item.querySelector('img').src;
    const caption = item.getAttribute('data-caption') || '';

    lightboxImg.src = src;
    lightboxImg.alt = caption;
    lightboxCaption.textContent = caption;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    const item = items[currentIndex];
    lightboxImg.style.opacity = '0';
    setTimeout(function () {
      lightboxImg.src = item.getAttribute('data-src') || item.querySelector('img').src;
      lightboxCaption.textContent = item.getAttribute('data-caption') || '';
      lightboxImg.style.opacity = '1';
    }, 200);
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % items.length;
    const item = items[currentIndex];
    lightboxImg.style.opacity = '0';
    setTimeout(function () {
      lightboxImg.src = item.getAttribute('data-src') || item.querySelector('img').src;
      lightboxCaption.textContent = item.getAttribute('data-caption') || '';
      lightboxImg.style.opacity = '1';
    }, 200);
  }

  lightboxImg.style.transition = 'opacity 0.2s ease';

  items.forEach(function (item, index) {
    item.addEventListener('click', function () {
      openLightbox(index);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrev);
  if (lightboxNext) lightboxNext.addEventListener('click', showNext);

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });
})();

// ===== CONTACT FORM =====
(function initContactForm() {
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Invio in corso...';
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual backend/FormSpree/Netlify Forms)
    setTimeout(function () {
      form.style.display = 'none';
      if (successMsg) {
        successMsg.style.display = 'block';
        successMsg.style.animation = 'loaderFadeIn 0.5s ease';
      }
    }, 1500);
  });
})();

// ===== BACK TO TOP =====
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ===== SMOOTH SCROLL =====
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const offset = 80;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    });
  });
})();

// ===== 3D CARD HOVER =====
(function init3DCards() {
  const cards = document.querySelectorAll('.service-card');

  cards.forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `translateY(-8px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
    });
  });
})();

// ===== WHATSAPP FLOAT ANIMATION =====
(function initWhatsAppFloat() {
  const btn = document.querySelector('.whatsapp-float');
  if (!btn) return;

  // Show tooltip periodically
  setTimeout(function () {
    btn.querySelector('.whatsapp-tooltip').style.opacity = '1';
    setTimeout(function () {
      btn.querySelector('.whatsapp-tooltip').style.opacity = '';
    }, 3000);
  }, 5000);
})();

// ===== PROVINCE ITEMS STAGGER =====
(function initProvinceStagger() {
  const items = document.querySelectorAll('.province-item');
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const allItems = entry.target.parentElement.querySelectorAll('.province-item');
        allItems.forEach(function (item, index) {
          setTimeout(function () {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
          }, index * 80);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  if (items.length) {
    items.forEach(function (item) {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-20px)';
      item.style.transition = 'opacity 0.4s ease, transform 0.4s ease, background 0.3s ease, color 0.3s ease';
    });
    observer.observe(items[0]);
  }
})();

// ===== NAVBAR ACTIVE STYLE =====
(function addNavActiveStyle() {
  const style = document.createElement('style');
  style.textContent = `
    .nav-links a.active {
      color: var(--gold) !important;
      background: rgba(212,160,23,0.1) !important;
    }
  `;
  document.head.appendChild(style);
})();

// ===== INTERSECTION OBSERVER FOR SECTION FADE =====
(function initSectionObserver() {
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
      }
    });
  }, { threshold: 0.05 });

  sections.forEach(function (section) {
    observer.observe(section);
  });
})();

// ===== REVIEW CARDS HOVER =====
(function initReviewCards() {
  const cards = document.querySelectorAll('.review-card');
  cards.forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      cards.forEach(function (c) {
        if (c !== card) c.style.opacity = '0.7';
      });
    });
    card.addEventListener('mouseleave', function () {
      cards.forEach(function (c) {
        c.style.opacity = '';
      });
    });
  });
})();

console.log('%cBaba Easy Food - Website loaded successfully!', 'color: #1B4332; font-weight: bold; font-size: 14px;');
console.log('%cCash & Carry B2B | Cinisello Balsamo (MI)', 'color: #D4A017; font-size: 12px;');
