// TGlobal Site - Interactive JavaScript
(function () {
    const STORAGE_KEY = 'theme';

    document.addEventListener('DOMContentLoaded', () => {
        const body = document.body;
        const themeToggle = document.getElementById('themeToggle');
        const header = document.getElementById('header');
        const navToggle = document.getElementById('navToggle');
        const mobileNav = document.getElementById('mobileNav');
        const plannerForm = document.querySelector('.planner__form');
        const prefersDarkMedia = window.matchMedia('(prefers-color-scheme: dark)');

        const savedTheme = localStorage.getItem(STORAGE_KEY);
        const initialTheme = savedTheme || (prefersDarkMedia.matches ? 'dark' : 'light');

        const applyTheme = (theme, persist = false) => {
            const themeClass = theme === 'dark' ? 'theme-dark' : 'theme-light';
            body.classList.remove('theme-dark', 'theme-light');
            body.classList.add(themeClass);
            body.setAttribute('data-theme', theme);

            if (themeToggle) {
                themeToggle.setAttribute('aria-checked', String(theme === 'dark'));
            }

            if (persist) {
                localStorage.setItem(STORAGE_KEY, theme);
            }
        };

        applyTheme(initialTheme);

        if (themeToggle) {
            themeToggle.setAttribute('role', 'switch');
            themeToggle.addEventListener('click', () => {
                const currentTheme = body.classList.contains('theme-dark') ? 'dark' : 'light';
                const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
                applyTheme(nextTheme, true);
            });
        }

        const toggleMobileNav = (force) => {
            if (!navToggle || !mobileNav) return;
            const shouldOpen = typeof force === 'boolean' ? force : !mobileNav.classList.contains('open');
            mobileNav.classList.toggle('open', shouldOpen);
            navToggle.classList.toggle('is-active', shouldOpen);
            body.classList.toggle('nav-open', shouldOpen);
            navToggle.setAttribute('aria-expanded', String(shouldOpen));
        };

        if (navToggle && mobileNav) {
            navToggle.addEventListener('click', () => toggleMobileNav());
            mobileNav.querySelectorAll('a[href^="#"]').forEach(link => {
                link.addEventListener('click', () => toggleMobileNav(false));
            });
        }

        document.querySelectorAll('.primary-nav__link').forEach(link => {
            link.addEventListener('click', () => {
                if (mobileNav && mobileNav.classList.contains('open')) {
                    toggleMobileNav(false);
                }
            });
        });

        let lastScrollY = window.scrollY;
        const updateHeaderOnScroll = () => {
            const currentScrollY = window.scrollY;

            if (header) {
                header.classList.toggle('site-header--scrolled', currentScrollY > 80);
                const shouldHide = currentScrollY > lastScrollY && currentScrollY > 160;
                header.classList.toggle('site-header--hidden', shouldHide);
            }

            lastScrollY = currentScrollY;
        };

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', event => {
                const hash = anchor.getAttribute('href');
                if (!hash || hash === '#') return;

                const target = document.querySelector(hash);
                if (!target) return;

                event.preventDefault();
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 12;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            });
        });

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.case-study, .testimonial, .service-card, .client-logo, .planner__form')
            .forEach(element => observer.observe(element));

        const testimonials = document.querySelectorAll('.testimonial');
        if (testimonials.length > 1) {
            let currentTestimonial = 0;
            const rotateTestimonials = () => {
                testimonials.forEach((testimonial, index) => {
                    const isActive = index === currentTestimonial;
                    testimonial.style.opacity = isActive ? '1' : '0.7';
                    testimonial.style.transform = isActive ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.98)';
                });

                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            };

            rotateTestimonials();
            setInterval(rotateTestimonials, 5000);
        }

        const validateForm = form => {
            const fields = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;

            fields.forEach(field => {
                const value = field.value.trim();
                const isEmail = field.type === 'email';
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                const hasError = !value || (isEmail && !emailRegex.test(value));
                field.classList.toggle('error', hasError);
                if (hasError) {
                    isValid = false;
                }
            });

            return isValid;
        };

        if (plannerForm) {
            plannerForm.addEventListener('submit', event => {
                event.preventDefault();
                if (validateForm(plannerForm)) {
                    window.TGlobalUtils.notify('Thanks! We will be in touch shortly.', 'success');
                    plannerForm.reset();
                } else {
                    window.TGlobalUtils.notify('Please complete the required fields.', 'warning');
                }
            });
        }

        const debounce = (fn, wait = 10) => {
            let timeout;
            return (...args) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => fn(...args), wait);
            };
        };

        const debouncedScrollHandler = debounce(updateHeaderOnScroll, 10);
        window.addEventListener('scroll', debouncedScrollHandler);
        updateHeaderOnScroll();

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && mobileNav && mobileNav.classList.contains('open')) {
                toggleMobileNav(false);
            }

            if (event.key === 'Enter' && event.target === navToggle) {
                event.preventDefault();
                toggleMobileNav();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 1060 && mobileNav && mobileNav.classList.contains('open')) {
                toggleMobileNav(false);
            }
        });

        prefersDarkMedia.addEventListener('change', event => {
            if (localStorage.getItem(STORAGE_KEY)) {
                return;
            }

            applyTheme(event.matches ? 'dark' : 'light');
        });

        const clientsCarousel = document.querySelector('[data-clients-carousel]');
        if (clientsCarousel) {
            const track = clientsCarousel.querySelector('.clients-carousel__track');
            const items = Array.from(track.children);
            const prevControl = clientsCarousel.querySelector('[data-direction="prev"]');
            const nextControl = clientsCarousel.querySelector('[data-direction="next"]');
            let currentIndex = 0;
            let autoTimer = null;
            let resizeTimer = null;

            const getGap = () => {
                const styles = window.getComputedStyle(track);
                const columnGap = parseFloat(styles.columnGap || styles.gap || '0');
                return Number.isNaN(columnGap) ? 0 : columnGap;
            };

            const getVisibleCount = () => {
                const width = window.innerWidth;
                if (width <= 540) return 1;
                if (width <= 768) return 2;
                return 3;
            };

            const getMaxIndex = () => Math.max(0, items.length - getVisibleCount());

            const updatePosition = () => {
                if (!items.length) return;
                const gap = getGap();
                const itemWidth = items[0].getBoundingClientRect().width;
                const offset = currentIndex * (itemWidth + gap);
                track.style.transform = `translateX(${-offset}px)`;
            };

            const move = direction => {
                const maxIndex = getMaxIndex();
                if (maxIndex <= 0) {
                    return;
                }

                currentIndex += direction;
                if (currentIndex > maxIndex) {
                    currentIndex = 0;
                } else if (currentIndex < 0) {
                    currentIndex = maxIndex;
                }

                updatePosition();
            };

            const stopAuto = () => {
                if (autoTimer) {
                    window.clearInterval(autoTimer);
                    autoTimer = null;
                }
            };

            const startAuto = () => {
                stopAuto();
                if (getVisibleCount() >= 3) {
                    autoTimer = window.setInterval(() => move(1), 4000);
                }
            };

            nextControl?.addEventListener('click', () => {
                move(1);
                if (getVisibleCount() >= 3) {
                    startAuto();
                } else {
                    stopAuto();
                }
            });

            prevControl?.addEventListener('click', () => {
                move(-1);
                if (getVisibleCount() >= 3) {
                    startAuto();
                } else {
                    stopAuto();
                }
            });

            clientsCarousel.addEventListener('mouseenter', stopAuto);
            clientsCarousel.addEventListener('mouseleave', () => {
                if (getVisibleCount() >= 3) {
                    startAuto();
                }
            });

            window.addEventListener('resize', () => {
                window.clearTimeout(resizeTimer);
                resizeTimer = window.setTimeout(() => {
                    const maxIndex = getMaxIndex();
                    if (currentIndex > maxIndex) {
                        currentIndex = maxIndex;
                    }
                    updatePosition();
                    startAuto();
                }, 150);
            });

            updatePosition();
            startAuto();
        }

        ['assets/images/bilberrry-logo.svg', 'assets/images/bb-sky.webp'].forEach(src => {
            const img = new Image();
            img.src = src;
        });

        console.log('TGlobal site interactive features loaded successfully.');

        window.addEventListener('load', () => {
            body.classList.add('loaded');
            const loader = document.querySelector('.loader');
            if (loader) {
                loader.style.opacity = '0';
                setTimeout(() => loader.remove(), 300);
            }
        });
    });
})();

window.TGlobalUtils = {
    scrollTo(elementId, offset = 80) {
        const element = document.getElementById(elementId);
        if (element) {
            const top = element.offsetTop - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    },

    notify(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = [
            'position: fixed',
            'top: 96px',
            'right: 20px',
            'background: var(--primary-gradient)',
            'color: #fff',
            'padding: 1rem 1.5rem',
            'border-radius: 12px',
            'box-shadow: 0 20px 40px rgba(8, 9, 18, 0.28)',
            'z-index: 10000',
            'transform: translateX(110%)',
            'transition: transform 0.3s ease'
        ].join(';');

        document.body.appendChild(notification);

        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });

        setTimeout(() => {
            notification.style.transform = 'translateX(110%)';
            setTimeout(() => notification.remove(), 320);
        }, 3000);
    }
};
