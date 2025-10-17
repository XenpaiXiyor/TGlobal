// TGlobal Replica - Interactive JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Set dark theme as default
    body.setAttribute('data-theme', 'dark');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            body.setAttribute('data-theme', newTheme);
            
            // Save theme preference
            localStorage.setItem('theme', newTheme);
            
            // Update header background
            const header = document.querySelector('.header');
            if (header) {
                if (newTheme === 'light') {
                    header.style.background = 'rgba(255, 255, 255, 0.95)';
                } else {
                    header.style.background = 'rgba(15, 23, 42, 0.95)';
                }
            }
        });
        
        // Load saved theme preference
        const savedTheme = localStorage.getItem('theme') || 'dark';
        body.setAttribute('data-theme', savedTheme);
    }

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = navToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navToggle.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = '';
                    span.style.opacity = '';
                }
            });
        });
    }
    
    // Close mobile menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            
            // Reset hamburger animation
            const spans = navToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = '';
                span.style.opacity = '';
            });
        });
    });
    
    // Header background opacity on scroll
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    function updateHeaderOnScroll() {
        const currentScrollY = window.scrollY;
        
        if (header) {
            if (currentScrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
            }
            
            // Hide/show header on scroll direction
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollY = currentScrollY;
    }
    
    window.addEventListener('scroll', updateHeaderOnScroll);
    
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
    window.removeEventListener('scroll', updateHeaderOnScroll);
    window.addEventListener('scroll', debouncedScrollHandler);
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
        
        // Enter key on nav toggle
        if (e.key === 'Enter' && e.target === navToggle) {
            navToggle.click();
        }
    });
    
    // Add accessibility attributes
    navToggle.setAttribute('aria-label', 'Toggle navigation menu');
    navToggle.setAttribute('aria-expanded', 'false');
    
    // Update aria-expanded when menu toggles
    const originalToggleClick = navToggle.onclick;
    navToggle.addEventListener('click', function() {
        const expanded = navMenu.classList.contains('active');
        navToggle.setAttribute('aria-expanded', expanded.toString());
    });
    
    // Preload critical images
    const criticalImages = [
        'assets/images/bilberrry-logo.svg',
        'assets/images/bb-sky.webp'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    // Initialize page
    console.log('🚀 Bilberrry Replica - Interactive features loaded successfully!');
    
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
