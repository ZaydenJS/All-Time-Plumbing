// All Time Plumbing - Interactive Features

document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation Toggle
  const mobileToggle = document.querySelector(".mobile-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (mobileToggle && navMenu) {
    // Function to toggle menu
    function toggleMenu(e) {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle("active");
      mobileToggle.classList.toggle("active");
      mobileToggle.setAttribute("aria-expanded", String(isOpen));
    }

    // Add both click and touch events for better mobile compatibility
    mobileToggle.addEventListener("click", toggleMenu);
    mobileToggle.addEventListener("touchstart", toggleMenu, { passive: false });

    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
      if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
        if (navMenu.classList.contains("active")) {
          navMenu.classList.remove("active");
          mobileToggle.classList.remove("active");
          mobileToggle.setAttribute("aria-expanded", "false");
        }
      }
    });
  }

  // Smooth Scrolling for Navigation Links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Dynamically account for current sticky header height on mobile/desktop
        const navbarEl = document.querySelector(".navbar");
        const headerHeight = navbarEl
          ? Math.ceil(navbarEl.getBoundingClientRect().height)
          : 0;
        const targetY =
          window.pageYOffset +
          targetSection.getBoundingClientRect().top -
          headerHeight -
          8; // small breathing space

        window.scrollTo({
          top: Math.max(targetY, 0),
          behavior: "smooth",
        });

        // Close mobile menu if open and update aria state
        if (navMenu && navMenu.classList.contains("active")) {
          navMenu.classList.remove("active");
          if (mobileToggle) {
            mobileToggle.classList.remove("active");
            mobileToggle.setAttribute("aria-expanded", "false");
          }
        }
      }
    });
  });

  // Contact Form Handling
  const contactForm = document.getElementById("quoteForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
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

      // Phone validation (basic)
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

  // Navbar Scroll Effect
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 100) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
      // prevent layout shift by locking nav height after first paint
      navbar.style.minHeight = navbar.offsetHeight + "px";
    });
  }

  // Animate Numbers on Scroll
  const animateNumbers = () => {
    const numbers = document.querySelectorAll(
      ".stat-number, .indicator-number"
    );

    numbers.forEach((number) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const originalText = entry.target.textContent;

              // Handle decimal numbers like "5.0"
              if (originalText.includes(".")) {
                const target = parseFloat(originalText.replace(/[^\d.]/g, ""));
                const suffix = originalText.replace(/[\d.]/g, "");
                let current = 0;
                const increment = target / 50;

                const timer = setInterval(() => {
                  current += increment;
                  if (current >= target) {
                    entry.target.textContent = target + suffix;
                    clearInterval(timer);
                  } else {
                    entry.target.textContent = current.toFixed(1) + suffix;
                  }
                }, 30);
              } else {
                // Handle whole numbers
                const target = parseInt(originalText.replace(/\D/g, ""));
                const suffix = originalText.replace(/\d/g, "");
                let current = 0;
                const increment = target / 50;

                const timer = setInterval(() => {
                  current += increment;
                  if (current >= target) {
                    entry.target.textContent = target + suffix;
                    clearInterval(timer);
                  } else {
                    entry.target.textContent = Math.floor(current) + suffix;
                  }
                }, 30);
              }

              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(number);
    });
  };

  // Initialize number animation
  animateNumbers();

  // Add hover effects to service cards
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Add click-to-call functionality
  const phoneNumbers = document.querySelectorAll('a[href^="tel:"]');
  phoneNumbers.forEach((phone) => {
    phone.addEventListener("click", function () {
      // Track phone clicks (for analytics)
      if (typeof gtag !== "undefined") {
        gtag("event", "phone_call", {
          event_category: "contact",
          event_label: "phone_click",
        });
      }
    });
  });

  // Emergency CTA pulse effect
  const emergencyBtn = document.querySelector(".emergency-btn");
  if (emergencyBtn) {
    setInterval(() => {
      emergencyBtn.style.transform = "scale(1.05)";
      setTimeout(() => {
        emergencyBtn.style.transform = "scale(1)";
      }, 200);
    }, 3000);
  }

  // Add loading states to buttons
  const buttons = document.querySelectorAll(".btn, .cta-button, .service-btn");
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      if (this.href && this.href.includes("#")) {
        return; // Skip for anchor links
      }

      const originalContent = this.innerHTML;
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';

      setTimeout(() => {
        this.innerHTML = originalContent;
      }, 1000);
    });
  });

  // Parallax effect for hero section - DISABLED to prevent white space
  // const hero = document.querySelector(".hero");
  // if (hero) {
  //   window.addEventListener("scroll", function () {
  //     const scrolled = window.pageYOffset;
  //     const rate = scrolled * -0.5;

  //     if (scrolled < hero.offsetHeight) {
  //       hero.style.transform = `translateY(${rate}px)`;
  //     }
  //   });
  // }

  // Add entrance animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".service-card, .benefit, .stat, .contact-method"
  );
  animateElements.forEach((el) => {
    observer.observe(el);
  });

  // Add scroll-to-top functionality
  const scrollToTop = () => {
    const scrollBtn = document.createElement("button");
    scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollBtn.className = "scroll-to-top";
    scrollBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-teal) 100%);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;

    document.body.appendChild(scrollBtn);

    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        scrollBtn.style.opacity = "1";
        scrollBtn.style.visibility = "visible";
      } else {
        scrollBtn.style.opacity = "0";
        scrollBtn.style.visibility = "hidden";
      }
    });

    scrollBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  };

  // Initialize scroll to top
  scrollToTop();

  // Gallery Modal Functionality
  const galleryImages = document.querySelectorAll(".gallery-image");
  const modal = document.getElementById("galleryModal");
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const closeBtn = document.querySelector(".modal-close");
  const prevBtn = document.querySelector(".modal-prev");
  const nextBtn = document.querySelector(".modal-next");

  let currentImageIndex = 0;
  let galleryData = [];

  // Collect gallery data
  galleryImages.forEach((galleryImage, index) => {
    const img = galleryImage.querySelector("img");
    const overlay =
      galleryImage.parentElement.querySelector(".gallery-overlay");
    const title = overlay ? overlay.querySelector("h4")?.textContent || "" : "";
    const description = overlay
      ? overlay.querySelector("p")?.textContent || ""
      : "";

    galleryData.push({
      src: img.src,
      alt: img.alt,
      title: title,
      description: description,
    });

    // Add click event to gallery image
    galleryImage.addEventListener("click", () => {
      currentImageIndex = index;
      openModal();
    });
  });

  function openModal() {
    const data = galleryData[currentImageIndex];
    modalImage.src = data.src;
    modalImage.alt = data.alt;
    modalTitle.textContent = data.title;
    modalDescription.textContent = data.description;
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  function showPrevImage() {
    currentImageIndex =
      currentImageIndex > 0 ? currentImageIndex - 1 : galleryData.length - 1;
    openModal();
  }

  function showNextImage() {
    currentImageIndex =
      currentImageIndex < galleryData.length - 1 ? currentImageIndex + 1 : 0;
    openModal();
  }

  // Event listeners
  closeBtn.addEventListener("click", closeModal);
  prevBtn.addEventListener("click", showPrevImage);
  nextBtn.addEventListener("click", showNextImage);

  // Close modal when clicking outside the image
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;

    switch (e.key) {
      case "Escape":
        closeModal();
        break;
      case "ArrowLeft":
        showPrevImage();
        break;
      case "ArrowRight":
        showNextImage();
        break;
    }
  });

  // Gallery items are now displayed without filtering

  // Add CSS for animations
  const style = document.createElement("style");
  style.textContent = `
        .animate-in {
            animation: slideInUp 0.6s ease forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .navbar.scrolled {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        @media (max-width: 768px) {
            .nav-menu.active {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                padding: 20px;
                gap: 16px;
            }
            
            .mobile-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .mobile-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
        }
    `;
  document.head.appendChild(style);
});

// Utility function for phone number formatting
function formatPhoneNumber(phoneNumber) {
  const cleaned = phoneNumber.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{4})(\d{3})(\d{3})$/);
  if (match) {
    return `${match[1]} ${match[2]} ${match[3]}`;
  }
  return phoneNumber;
}

// Utility function for email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Console message for developers
console.log(
  "%c🌟 All Time Plumbing Website",
  "color: #1e40af; font-size: 16px; font-weight: bold;"
);
console.log(
  "%cBuilt with modern web technologies for optimal performance and user experience.",
  "color: #64748b; font-size: 12px;"
);
