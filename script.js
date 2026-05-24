/* ============================================
   نادي أجوان الرياضي - ملف الجافاسكريبت المحدث
   ============================================ */

// ===== NAVBAR SCROLL & MENU =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

// تغيير شكل النافبار عند السكرول
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNavLink();
});

// فتح وإغلاق القائمة (Hamburger)
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// إغلاق القائمة عند الضغط على أي رابط
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.nav-link');
  let currentSection = 'home';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinksAll.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-section') === currentSection) {
      link.classList.add('active');
    }
  });
}

// ===== HERO SLIDER =====
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('sliderPrev');
const nextBtn = document.getElementById('sliderNext');
let currentSlide = 0;
let sliderInterval;

function goToSlide(index) {
  slides[currentSlide].classList.remove('active');
  if (dots[currentSlide]) dots[currentSlide].classList.remove('active');

  currentSlide = (index + slides.length) % slides.length;

  slides[currentSlide].classList.add('active');
  if (dots[currentSlide]) dots[currentSlide].classList.add('active');
}

function nextSlide() { goToSlide(currentSlide + 1); }
function prevSlide() { goToSlide(currentSlide - 1); }

function startAutoSlide() {
  sliderInterval = setInterval(nextSlide, 5000);
}

function resetAutoSlide() {
  clearInterval(sliderInterval);
  startAutoSlide();
}

// أزرار التحكم (هتختفي تلقائياً بـ CSS على الموبايل)
if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });
  nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
}

// التحكم باللمس (Swipe) - خاص بالموبايل
let touchStartX = 0;
const heroSection = document.querySelector('.hero');

heroSection.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

heroSection.addEventListener('touchend', (e) => {
  let touchEndX = e.changedTouches[0].screenX;
  let diff = touchStartX - touchEndX;

  if (Math.abs(diff) > 50) { // لو السحبة أكبر من 50 بكسل
    if (diff > 0) nextSlide();
    else prevSlide();
    resetAutoSlide();
  }
});

// تشغيل السلايدر
startAutoSlide();

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 72,
        behavior: 'smooth'
      });
    }
  });
});
