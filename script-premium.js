// ===== FORTUNE 500 PREMIUM JAVASCRIPT - ALL TIME PLUMBING =====

// Initialize AOS (Animate On Scroll)
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 800,
    easing: "ease-out-cubic",
    once: true,
    offset: 100,
    delay: 100,
  });
});

// ===== NAVIGATION =====
class Navigation {
  constructor() {
    this.navbar = document.getElementById("navbar");
    this.menuToggle = document.getElementById("menuToggle");
    this.navMenu = document.getElementById("navMenu");
    this.navLinks = document.querySelectorAll(".nav-link");
    this.init();
  }

  init() {
    this.handleScroll();
    this.handleMobileMenu();
    this.handleSmoothScroll();
    this.handleActiveLinks();
    window.addEventListener("scroll", () => this.handleScroll());
  }

  handleScroll() {
    const scrolled = window.scrollY > 50;
    this.navbar.classList.toggle("scrolled", scrolled);

    // Add subtle parallax effect to hero
    const hero = document.querySelector(".hero");
    if (hero && window.scrollY < hero.offsetHeight) {
      const scrollPercent = window.scrollY / hero.offsetHeight;
      const heroContent = hero.querySelector(".hero-content");
      if (heroContent) {
        heroContent.style.transform = `translateY(${scrollPercent * 30}px)`;
        heroContent.style.opacity = 1 - scrollPercent * 0.3;
      }
    }
  }

  handleMobileMenu() {
    this.menuToggle?.addEventListener("click", () => {
      this.menuToggle.classList.toggle("active");
      this.navMenu.classList.toggle("active");
      document.body.classList.toggle("menu-open");
    });

    // Close mobile menu when clicking on a link
    this.navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        this.menuToggle.classList.remove("active");
        this.navMenu.classList.remove("active");
        document.body.classList.remove("menu-open");
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        !this.navMenu.contains(e.target) &&
        !this.menuToggle.contains(e.target)
      ) {
        this.menuToggle.classList.remove("active");
        this.navMenu.classList.remove("active");
        document.body.classList.remove("menu-open");
      }
    });
  }

  handleSmoothScroll() {
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (href.startsWith("#")) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }
      });
    });

    // Handle dropdown links
    const dropdownLinks = document.querySelectorAll(".dropdown-link");
    dropdownLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (href.startsWith("#")) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }
      });
    });
  }

  handleActiveLinks() {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.navLinks.forEach((link) => {
              link.classList.remove("active");
              if (link.getAttribute("href") === `#${entry.target.id}`) {
                link.classList.add("active");
              }
            });
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-100px 0px -100px 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    // Set home as active by default
    const homeLink = document.querySelector('a[href="#home"]');
    if (homeLink) {
      homeLink.classList.add("active");
    }
  }
}

// ===== EMERGENCY ALERT =====
class EmergencyAlert {
  constructor() {
    this.alert = document.getElementById("emergencyAlert");
    this.closeBtn = document.getElementById("alertClose");
    this.init();
  }

  init() {
    this.closeBtn?.addEventListener("click", () => {
      this.alert.style.display = "none";
    });

    // Auto-hide after 10 seconds
    setTimeout(() => {
      if (this.alert) {
        this.alert.style.opacity = "0.8";
      }
    }, 10000);
  }
}

// ===== HERO CANVAS ANIMATION =====
class HeroCanvas {
  constructor() {
    this.canvas = document.getElementById("heroCanvas");
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.animate();
    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }

  createParticles() {
    const particleCount = Math.floor(
      (this.canvas.width * this.canvas.height) / 15000
    );

    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach((particle) => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Wrap around edges
      if (particle.x < 0) particle.x = this.canvas.width;
      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.canvas.height;
      if (particle.y > this.canvas.height) particle.y = 0;

      // Draw particle with ocean theme
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(8, 145, 178, ${particle.opacity})`;
      this.ctx.fill();
    });

    requestAnimationFrame(() => this.animate());
  }
}

// ===== HERO PARTICLES =====
class HeroParticles {
  constructor() {
    this.container = document.getElementById("heroParticles");
    if (!this.container) return;

    this.init();
  }

  init() {
    this.createFloatingElements();
  }

  createFloatingElements() {
    const elements = ["💧", "🌊", "🔧", "⚡", "🛠️", "💎", "🔵", "💙"];

    elements.forEach((element, index) => {
      const particle = document.createElement("div");
      particle.style.cssText = `
                position: absolute;
                font-size: ${Math.random() * 20 + 15}px;
                opacity: ${Math.random() * 0.4 + 0.1};
                animation: float ${
                  Math.random() * 12 + 18
                }s ease-in-out infinite;
                animation-delay: ${index * -2.5}s;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                user-select: none;
                filter: drop-shadow(0 2px 4px rgba(8, 145, 178, 0.3));
            `;
      particle.textContent = element;
      this.container.appendChild(particle);
    });
  }
}

// ===== PERFORMANCE OPTIMIZATIONS =====
class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.lazyLoadImages();
    this.preloadCriticalResources();
    this.optimizeAnimations();
  }

  lazyLoadImages() {
    const images = document.querySelectorAll("img[data-src]");

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  }

  preloadCriticalResources() {
    const criticalResources = [
      "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700;800;900&display=swap",
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
    ];

    criticalResources.forEach((resource) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "style";
      link.href = resource;
      document.head.appendChild(link);
    });
  }

  optimizeAnimations() {
    // Reduce animations on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
      document.documentElement.style.setProperty("--transition-base", "0.15s");
      document.documentElement.style.setProperty("--transition-slow", "0.25s");
    }
  }
}

// ===== SCROLL TO TOP FUNCTIONALITY =====
class ScrollToTop {
  constructor() {
    this.button = document.getElementById("scrollToTopBtn");
    if (!this.button) return;
    this.init();
  }

  init() {
    this.handleScroll();
    this.button.addEventListener("click", () => this.scrollToTop());
    window.addEventListener("scroll", () => this.handleScroll());
  }

  handleScroll() {
    const scrolled = window.scrollY > 300;
    this.button.style.opacity = scrolled ? "1" : "0";
    this.button.style.visibility = scrolled ? "visible" : "hidden";
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}

// ===== FORM HANDLING =====
class ContactForm {
  constructor() {
    this.form = document.getElementById("contactForm");
    if (!this.form) return;
    this.init();
  }

  init() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  handleSubmit(e) {
    e.preventDefault();

    // Clear previous errors
    this.clearErrors();

    // Get form data
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData);

    // Simple validation
    if (!this.validateForm(data)) return;

    // Show loading state
    this.showLoadingState();

    // Simulate form submission (in a real app, you'd send to server)
    setTimeout(() => {
      this.hideLoadingState();
      this.showSuccessMessage();
      this.form.reset();
    }, 2000);
  }

  validateForm(data) {
    const required = ["firstName", "lastName", "email", "message"];

    for (let field of required) {
      if (!data[field] || data[field].trim() === "") {
        this.showError(field, "This field is required");
        return false;
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      this.showError("email", "Please enter a valid email address");
      return false;
    }

    return true;
  }

  clearErrors() {
    const errorDivs = this.form.querySelectorAll(".form-error");
    const fields = this.form.querySelectorAll("input, select, textarea");

    errorDivs.forEach((div) => {
      div.textContent = "";
    });

    fields.forEach((field) => {
      field.style.borderColor = "";
    });
  }

  showError(fieldName, message) {
    const field = this.form.querySelector(`[name="${fieldName}"]`);
    const errorDiv = field.parentNode.querySelector(".form-error");

    field.style.borderColor = "var(--error)";
    errorDiv.textContent = message;

    // Add shake animation
    field.style.animation = "shake 0.5s ease-in-out";
    setTimeout(() => {
      field.style.animation = "";
    }, 500);
  }

  showLoadingState() {
    const submitBtn = this.form.querySelector(".form-submit");
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <div style="width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top: 2px solid white; border-radius: 50%; animation: spin 1s linear infinite;"></div>
        <span>Sending...</span>
      </div>
    `;

    // Store original text for restoration
    submitBtn.dataset.originalText = originalText;
  }

  hideLoadingState() {
    const submitBtn = this.form.querySelector(".form-submit");
    submitBtn.disabled = false;
    submitBtn.innerHTML = submitBtn.dataset.originalText;
  }

  showSuccessMessage() {
    // Create success notification
    const notification = document.createElement("div");
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, var(--success) 0%, #059669 100%);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 0.75rem;
      box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
      z-index: 9999;
      font-weight: 600;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;
    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <i class="fas fa-check-circle"></i>
        <span>Message sent successfully! We'll get back to you soon.</span>
      </div>
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)";
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 5000);
  }
}

// ===== OCEAN WAVE EFFECTS =====
class OceanEffects {
  constructor() {
    this.init();
  }

  init() {
    this.createWaveEffects();
    this.addOceanGradientAnimation();
    this.addFloatingBubbles();
  }

  createWaveEffects() {
    const sections = document.querySelectorAll(".hero, .services, .contact");
    sections.forEach((section) => {
      const wave = document.createElement("div");
      wave.className = "ocean-wave";
      wave.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 60px;
        background: linear-gradient(90deg,
          rgba(8, 145, 178, 0.1) 0%,
          rgba(6, 182, 212, 0.1) 50%,
          rgba(8, 145, 178, 0.1) 100%);
        animation: oceanWave 8s ease-in-out infinite;
        pointer-events: none;
      `;
      section.style.position = "relative";
      section.appendChild(wave);
    });
  }

  addOceanGradientAnimation() {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes oceanWave {
        0%, 100% { transform: translateX(-50px) scaleY(1); }
        50% { transform: translateX(50px) scaleY(1.2); }
      }

      @keyframes oceanFlow {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `;
    document.head.appendChild(style);
  }

  addFloatingBubbles() {
    const bubbleContainer = document.createElement("div");
    bubbleContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
      overflow: hidden;
    `;

    for (let i = 0; i < 15; i++) {
      const bubble = document.createElement("div");
      bubble.style.cssText = `
        position: absolute;
        width: ${Math.random() * 20 + 10}px;
        height: ${Math.random() * 20 + 10}px;
        background: radial-gradient(circle, rgba(8, 145, 178, 0.3) 0%, rgba(8, 145, 178, 0.1) 100%);
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        animation: floatBubble ${Math.random() * 20 + 15}s linear infinite;
        animation-delay: ${Math.random() * -20}s;
      `;
      bubbleContainer.appendChild(bubble);
    }

    document.body.appendChild(bubbleContainer);

    const bubbleStyle = document.createElement("style");
    bubbleStyle.textContent = `
      @keyframes floatBubble {
        0% {
          transform: translateY(100vh) scale(0);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          transform: translateY(-100px) scale(1);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(bubbleStyle);
  }
}

// ===== INITIALIZE EVERYTHING =====
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all components
  new Navigation();
  new EmergencyAlert();
  new HeroCanvas();
  new HeroParticles();
  new PerformanceOptimizer();
  new ScrollToTop();
  new ContactForm();
  new OceanEffects();

  // Add smooth reveal animations
  const revealElements = document.querySelectorAll(
    ".hero-badge, .hero-title, .hero-subtitle, .hero-features, .hero-actions"
  );
  revealElements.forEach((element, index) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";

    setTimeout(() => {
      element.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }, 200 + index * 150);
  });

  console.log(
    "🌊 All Time Plumbing - Ocean Professional Website Loaded Successfully! 🌊"
  );
});
