// TGlobal Replica - Interactive JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    const header = document.querySelector('.header');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    const applyTheme = (theme, persist = false) => {
        body.setAttribute('data-theme', theme);
        if (persist) {
            localStorage.setItem('theme', theme);
        }
        if (themeToggle) {
            themeToggle.setAttribute('aria-pressed', (theme === 'dark').toString());
        }
    };

    applyTheme(initialTheme);

    if (themeToggle) {
        themeToggle.setAttribute('role', 'switch');
        themeToggle.setAttribute('aria-label', 'Toggle color theme');
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme') || 'light';
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(nextTheme, true);
        });
    }

    const toggleMobileNav = (force) => {
        if (!navToggle || !navMenu) return;
        const shouldOpen = typeof force === 'boolean' ? force : !navMenu.classList.contains('active');
        navMenu.classList.toggle('active', shouldOpen);
        navToggle.classList.toggle('active', shouldOpen);
        body.classList.toggle('nav-open', shouldOpen);
        navToggle.setAttribute('aria-expanded', shouldOpen.toString());

        const spans = navToggle.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (shouldOpen) {
                if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                span.style.transform = '';
                span.style.opacity = '';
            }
        });
    };

    if (navToggle && navMenu) {
        navToggle.setAttribute('aria-label', 'Toggle navigation menu');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.addEventListener('click', () => toggleMobileNav());
    }

    // Close mobile menu when clicking nav links
    if (navMenu && navToggle) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => toggleMobileNav(false));
        });
    }

    // Header background opacity on scroll
    let lastScrollY = window.scrollY;

    function updateHeaderOnScroll() {
        const currentScrollY = window.scrollY;

        if (header) {
            header.classList.toggle('header--scrolled', currentScrollY > 100);
            const shouldHide = currentScrollY > lastScrollY && currentScrollY > 200;
            header.classList.toggle('header--hidden', shouldHide);
        }

        lastScrollY = currentScrollY;
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.case-study, .testimonial, .service-category, .client-logo'
    );

    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Testimonials auto-rotate (optional enhancement)
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;

    function rotateTestimonials() {
        if (testimonials.length > 1) {
            testimonials.forEach((testimonial, index) => {
                testimonial.style.opacity = index === currentTestimonial ? '1' : '0.7';
                testimonial.style.transform = index === currentTestimonial ?
                    'translateY(0) scale(1)' : 'translateY(10px) scale(0.98)';
            });

            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        }
    }

    // Start testimonial rotation (every 5 seconds)
    if (testimonials.length > 1) {
        setInterval(rotateTestimonials, 5000);
        rotateTestimonials(); // Initial call
    }

    // Client logo hover effects with stagger
    const clientLogos = document.querySelectorAll('.client-logo');
    clientLogos.forEach((logo, index) => {
        logo.addEventListener('mouseenter', function() {
            // Add slight delay based on index for stagger effect
            setTimeout(() => {
                this.style.transform = 'translateY(-10px) scale(1.05)';
                this.style.filter = 'grayscale(0)';
            }, index * 50);
        });

        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.filter = 'grayscale(1)';
        });
    });

    // Case study hover interactions
    const caseStudies = document.querySelectorAll('.case-study');
    caseStudies.forEach(study => {
        study.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.15)';
        });

        study.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
        });
    });

    // Form validation (if contact forms are added)
    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            const value = input.value.trim();
            const errorElement = input.nextElementSibling;

            if (!value) {
                isValid = false;
                input.classList.add('error');
                if (errorElement && errorElement.classList.contains('error-message')) {
                    errorElement.textContent = 'This field is required';
                }
            } else {
                input.classList.remove('error');
                if (errorElement && errorElement.classList.contains('error-message')) {
                    errorElement.textContent = '';
                }
            }

            // Email validation
            if (input.type === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    input.classList.add('error');
                    if (errorElement && errorElement.classList.contains('error-message')) {
                        errorElement.textContent = 'Please enter a valid email address';
                    }
                }
            }
        });

        return isValid;
    }

    // Performance optimization - debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply debounced scroll handler
    const debouncedScrollHandler = debounce(updateHeaderOnScroll, 10);
    window.addEventListener('scroll', debouncedScrollHandler);
    updateHeaderOnScroll();

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            toggleMobileNav(false);
        }

        if (e.key === 'Enter' && e.target === navToggle) {
            e.preventDefault();
            toggleMobileNav();
        }
    });

    // Preload critical images
    const criticalImages = [
        'assets/images/tglobal-logo.svg',
        'assets/images/bb-sky.webp'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // Initialize page
    console.log('🚀 TGlobal interactive features loaded successfully!');

    // Add loading state management
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');

        // Optional: Add a loading animation
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 300);
        }
    });
});

// Utility functions for external use
window.BilberrryUtils = {
    // Smooth scroll to element
    scrollTo: function(elementId, offset = 80) {
        const element = document.getElementById(elementId);
        if (element) {
            const top = element.offsetTop - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    },

    // Show notification
    notify: function(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);

        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
};
