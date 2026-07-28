/* ============================================
   PORTFOLIO.JS — Clean & Optimised
   ============================================ */

// ===== TYPING ANIMATION =====
const TYPING_TEXTS = [
  'Full-Stack Developer',
  'Java Programmer',
  'Android Developer',
];

let tIdx = 0, cIdx = 0, deleting = false;

function typeLoop() {
  const el = document.getElementById('typingText');
  if (!el) return;

  const word = TYPING_TEXTS[tIdx];

  if (!deleting) {
    el.textContent = word.slice(0, ++cIdx);
    if (cIdx === word.length) { deleting = true; return setTimeout(typeLoop, 1800); }
  } else {
    el.textContent = word.slice(0, --cIdx);
    if (cIdx === 0) { deleting = false; tIdx = (tIdx + 1) % TYPING_TEXTS.length; return setTimeout(typeLoop, 400); }
  }

  setTimeout(typeLoop, deleting ? 45 : 95);
}

// ===== HAMBURGER MENU =====
function initNav() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('navMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    menu.classList.toggle('open');
  });

  menu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      btn.classList.remove('open');
      menu.classList.remove('open');
    });
  });
}

// ===== ACTIVE NAV LINK ON SCROLL =====
function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');
  let current    = '';

  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });

  links.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === `#${current}`);
  });
}

// ===== NAVBAR SHADOW ON SCROLL =====
function updateNavbar() {
  document.getElementById('navbar')?.classList.toggle('scrolled', window.scrollY > 20);
}

// ===== SCROLL REVEAL =====
function initReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        // Animate skill bars when skills section enters view
        e.target.querySelectorAll?.('.bar-fill').forEach(b => b.classList.add('animated'));
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

// ===== SKILL BAR ANIMATION via section observer =====
function initSkillBars() {
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;

  const io = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      skillsSection.querySelectorAll('.bar-fill').forEach(b => b.classList.add('animated'));
      io.disconnect();
    }
  }, { threshold: 0.2 });

  io.observe(skillsSection);
}

// ===== CONTACT FORM =====
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    if (data.name && data.email && data.message) {
      showToast(`Thanks ${data.name}! I'll get back to you soon.`);
      form.reset();
    }
  });
}

// ===== TOAST NOTIFICATION =====
function showToast(msg) {
  const t = document.createElement('div');
  t.textContent = msg;
  Object.assign(t.style, {
    position: 'fixed', bottom: '28px', right: '28px',
    background: 'linear-gradient(135deg,#6c63ff,#06b6d4)',
    color: '#fff', padding: '14px 22px',
    borderRadius: '10px', fontSize: '0.9rem',
    fontFamily: 'Inter,sans-serif', fontWeight: '500',
    boxShadow: '0 8px 24px rgba(108,99,255,.35)',
    zIndex: '9999', opacity: '0',
    transition: 'opacity 0.3s ease'
  });
  document.body.appendChild(t);
  requestAnimationFrame(() => { t.style.opacity = '1'; });
  setTimeout(() => {
    t.style.opacity = '0';
    setTimeout(() => t.remove(), 300);
  }, 3500);
}

// ===== SMOOTH SCROLL for anchor links =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ===== SCROLL HANDLER (debounced) =====
let rafPending = false;
window.addEventListener('scroll', () => {
  if (rafPending) return;
  rafPending = true;
  requestAnimationFrame(() => {
    updateActiveLink();
    updateNavbar();
    rafPending = false;
  });
}, { passive: true });

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  typeLoop();
  initNav();
  initReveal();
  initSkillBars();
  initContactForm();
  initSmoothScroll();
  updateNavbar();
  updateActiveLink();
});
