// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ===== Nav background on scroll + scroll progress bar =====
const nav = document.getElementById('nav');
const progressFill = document.getElementById('progressFill');

function onScroll() {
  const scrollY = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

  progressFill.style.width = pct + '%';

  if (scrollY > 40) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ===== Scroll-triggered reveal animations =====
const revealEls = document.querySelectorAll('[data-reveal]');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      // slight stagger based on position within its parent group
      const el = entry.target;
      const siblings = Array.from(el.parentElement.children).filter(c => c.hasAttribute('data-reveal'));
      const order = siblings.indexOf(el);
      el.style.transitionDelay = (order * 0.12) + 's';
      el.classList.add('in-view');
      revealObserver.unobserve(el);
    }
  });
}, { threshold: 0.18, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ===== Hero fade-in elements (sub + scroll cue) handled via CSS animation,
// but ensure [data-fade] becomes visible (CSS animation overrides opacity already) =====

// ===== Smooth anchor scrolling (extra control beyond CSS scroll-behavior) =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId.length > 1) {
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = nav.offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight + 1;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  });
});

// ===== Subtle parallax on hero logo while scrolling within hero =====
const heroLogo = document.getElementById('heroLogo');
const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
  const heroHeight = hero.offsetHeight;
  const scrollY = window.scrollY;
  if (scrollY < heroHeight) {
    const progress = scrollY / heroHeight;
    heroLogo.style.transform = `translateY(${progress * 60}px) scale(${1 - progress * 0.08})`;
    heroLogo.style.opacity = String(1 - progress * 1.1);
  }
}, { passive: true });

// ===== WhatsApp button has no JS needed — it's a plain mailto-style link =====
