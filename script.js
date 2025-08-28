// All Time Plumbing - Optimized Interactive Features
(function () {
  "use strict";

  // Cache DOM elements for better performance
  const elements = {
    mobileToggle: null,
    navMenu: null,
    navbar: null,
    contactForm: null,
  };

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  function init() {
    cacheElements();
    initMobileNav();
    initSmoothScroll();
    initContactForm();
    initGallery();
  }

  function cacheElements() {
    elements.mobileToggle = document.querySelector(".mobile-toggle");
    elements.navMenu = document.querySelector(".nav-menu");
    elements.navbar = document.querySelector(".navbar");
    elements.contactForm = document.getElementById("quoteForm");
  }

  // Mobile Navigation Toggle
  function initMobileNav() {
    if (!elements.mobileToggle || !elements.navMenu) return;

    elements.mobileToggle.addEventListener(
      "click",
      function () {
        const isOpen = elements.navMenu.classList.toggle("active");
        this.classList.toggle("active");
        this.setAttribute("aria-expanded", String(isOpen));
      },
      { passive: true }
    );
  }

  // Optimized Smooth Scrolling
  function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    if (!navLinks.length) return;

    navLinks.forEach((link) => {
      link.addEventListener("click", handleSmoothScroll, { passive: false });
    });
  }

  function handleSmoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (!targetSection) return;

    // Use cached navbar element for better performance
    const headerHeight = elements.navbar
      ? Math.ceil(elements.navbar.getBoundingClientRect().height)
      : 0;

    const targetY =
      window.pageYOffset +
      targetSection.getBoundingClientRect().top -
      headerHeight -
      8;

    // Use requestAnimationFrame for smoother scrolling
    requestAnimationFrame(() => {
      window.scrollTo({
        top: Math.max(targetY, 0),
        behavior: "smooth",
      });
    });

    // Close mobile menu if open
    closeMobileMenu();
  }

  function closeMobileMenu() {
    if (elements.navMenu?.classList.contains("active")) {
      elements.navMenu.classList.remove("active");
      if (elements.mobileToggle) {
        elements.mobileToggle.classList.remove("active");
        elements.mobileToggle.setAttribute("aria-expanded", "false");
      }
    }
  }

  // Contact Form Handling
  function initContactForm() {
    if (!elements.contactForm) return;

    elements.contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);

      // Basic validation
      if (!data.name || !data.phone || !data.email || !data.service) {
        alert("Please fill in all required fields.");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        alert("Please enter a valid email address.");
        return;
      }

      // Phone validation
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      if (!phoneRegex.test(data.phone)) {
        alert("Please enter a valid phone number.");
        return;
      }

      // Simulate form submission
      const submitBtn = this.querySelector(".submit-btn");
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      // Simulate API call
      setTimeout(() => {
        alert(
          "Thank you for your quote request! We'll contact you within 30 minutes during business hours."
        );
        this.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
  }

  // Gallery functionality
  function initGallery() {
    const galleryItems = document.querySelectorAll(".gallery-item");
    const modal = document.getElementById("galleryModal");

    if (!galleryItems.length || !modal) return;

    const modalImage = modal.querySelector("#modalImage");
    const modalTitle = modal.querySelector("#modalTitle");
    const modalDescription = modal.querySelector("#modalDescription");
    const closeBtn = modal.querySelector(".modal-close");

    // Gallery item click handlers
    galleryItems.forEach((item, index) => {
      item.addEventListener("click", () => {
        const img = item.querySelector("img");
        const overlay = item.querySelector(".gallery-overlay");

        if (img && overlay) {
          modalImage.src = img.src;
          modalImage.alt = img.alt;
          modalTitle.textContent = overlay.querySelector("h4").textContent;
          modalDescription.textContent = overlay.querySelector("p").textContent;
          modal.classList.add("active");
          document.body.style.overflow = "hidden";
        }
      });
    });

    // Close modal
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        modal.classList.remove("active");
        document.body.style.overflow = "";
      });
    }

    // Close on backdrop click
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "";
      }
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        modal.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }
})();
