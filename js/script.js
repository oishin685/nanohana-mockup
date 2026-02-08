/* ============================================
   菜の花村 - Website JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

  // ==========================================
  // Header Scroll Effect
  // ==========================================
  const header = document.querySelector('.header');
  let lastScroll = 0;

  function handleHeaderScroll() {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // ==========================================
  // Hamburger Menu
  // ==========================================
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile nav when clicking a link
    mobileNav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close mobile nav on resize
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ==========================================
  // Scroll Fade-In Animation
  // ==========================================
  const fadeElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

  if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(function(el) {
      fadeObserver.observe(el);
    });
  } else {
    // Fallback: show all elements
    fadeElements.forEach(function(el) {
      el.classList.add('is-visible');
    });
  }

  // ==========================================
  // Back to Top Button
  // ==========================================
  const backToTop = document.querySelector('.back-to-top');

  if (backToTop) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 400) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    }, { passive: true });

    backToTop.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================
  // Contact Form Validation
  // ==========================================
  const contactForm = document.querySelector('#contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      let isValid = true;

      // Clear previous errors
      this.querySelectorAll('.form-error').forEach(function(err) {
        err.classList.remove('show');
      });
      this.querySelectorAll('.form-input, .form-textarea, .form-select').forEach(function(input) {
        input.classList.remove('error');
      });

      // Validate required fields
      var requiredFields = this.querySelectorAll('[required]');
      requiredFields.forEach(function(field) {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
          var errorEl = field.parentElement.querySelector('.form-error');
          if (errorEl) {
            errorEl.textContent = 'この項目は必須です';
            errorEl.classList.add('show');
          }
        }
      });

      // Validate email
      var emailField = this.querySelector('#email');
      if (emailField && emailField.value.trim()) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value.trim())) {
          isValid = false;
          emailField.classList.add('error');
          var errorEl = emailField.parentElement.querySelector('.form-error');
          if (errorEl) {
            errorEl.textContent = '正しいメールアドレスを入力してください';
            errorEl.classList.add('show');
          }
        }
      }

      // Validate phone
      var phoneField = this.querySelector('#phone');
      if (phoneField && phoneField.value.trim()) {
        var phoneRegex = /^[\d\-\+\(\)\s]+$/;
        if (!phoneRegex.test(phoneField.value.trim())) {
          isValid = false;
          phoneField.classList.add('error');
          var errorEl = phoneField.parentElement.querySelector('.form-error');
          if (errorEl) {
            errorEl.textContent = '正しい電話番号を入力してください';
            errorEl.classList.add('show');
          }
        }
      }

      if (isValid) {
        showToast('お問い合わせを送信しました（デモ）');
        this.reset();
      }
    });

    // Real-time validation feedback
    contactForm.querySelectorAll('.form-input, .form-textarea').forEach(function(field) {
      field.addEventListener('blur', function() {
        if (this.hasAttribute('required') && !this.value.trim()) {
          this.classList.add('error');
        } else {
          this.classList.remove('error');
          var errorEl = this.parentElement.querySelector('.form-error');
          if (errorEl) errorEl.classList.remove('show');
        }
      });

      field.addEventListener('input', function() {
        if (this.classList.contains('error') && this.value.trim()) {
          this.classList.remove('error');
          var errorEl = this.parentElement.querySelector('.form-error');
          if (errorEl) errorEl.classList.remove('show');
        }
      });
    });
  }

  // ==========================================
  // Square Payment Demo
  // ==========================================
  var squareBtn = document.querySelector('.square-btn');
  if (squareBtn) {
    squareBtn.addEventListener('click', function(e) {
      e.preventDefault();
      showToast('Square決済画面が開きます（デモ表示）');
    });
  }

  // ==========================================
  // Toast Notification
  // ==========================================
  function showToast(message) {
    // Remove existing toast
    var existingToast = document.querySelector('.toast');
    if (existingToast) existingToast.remove();

    var toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    // Show toast
    requestAnimationFrame(function() {
      toast.classList.add('show');
    });

    // Hide toast after 3 seconds
    setTimeout(function() {
      toast.classList.remove('show');
      setTimeout(function() {
        toast.remove();
      }, 300);
    }, 3000);
  }

  // Make showToast available globally
  window.showToast = showToast;

  // ==========================================
  // Active Navigation Link
  // ==========================================
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  var navLinks = document.querySelectorAll('.nav-list a, .mobile-nav-list a');

  navLinks.forEach(function(link) {
    var href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ==========================================
  // Smooth scroll for anchor links
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var headerHeight = document.querySelector('.header').offsetHeight;
        var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==========================================
  // Stagger animation for grid items
  // ==========================================
  var gridItems = document.querySelectorAll('.product-card, .category-card, .value-card, .feature-card');
  gridItems.forEach(function(item, index) {
    item.style.transitionDelay = (index % 4) * 0.1 + 's';
  });

});
