document.addEventListener('DOMContentLoaded', () => {

    /* ============================================
       1. SCROLL REVEAL - IntersectionObserver
       ============================================ */
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach((el) => {
            revealObserver.observe(el);
        });
    }

    /* ============================================
       2. HEADER SCROLL EFFECT
       ============================================ */
    const header = document.querySelector('.header');

    if (header) {
        const handleHeaderScroll = () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleHeaderScroll, { passive: true });
        handleHeaderScroll();
    }

    /* ============================================
       3. MOBILE MENU
       ============================================ */
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');

    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            nav.classList.toggle('active');

            if (nav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking a nav link
        const navLinks = nav.querySelectorAll('.nav-link');
        navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    /* ============================================
       4. SEARCH TABS
       ============================================ */
    const searchTabs = document.querySelectorAll('.search-tab');

    searchTabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            searchTabs.forEach((t) => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    /* ============================================
       5. ROOM BUTTONS
       ============================================ */
    const roomButtons = document.querySelectorAll('.room-btn');

    roomButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            roomButtons.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    /* ============================================
       6. VIEW TOGGLE (CATALOG)
       ============================================ */
    const viewButtons = document.querySelectorAll('.view-btn');
    const catalogGrid = document.querySelector('.catalog-grid');

    viewButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            viewButtons.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');

            if (catalogGrid) {
                const viewType = btn.getAttribute('data-view');
                if (viewType === 'list') {
                    catalogGrid.classList.add('list-view');
                } else {
                    catalogGrid.classList.remove('list-view');
                }
            }
        });
    });

    /* ============================================
       7. FILTER TOGGLE (CATALOG MOBILE)
       ============================================ */
    const filterToggle = document.getElementById('filterToggle');
    const filterSection = document.getElementById('filterSection');

    if (filterToggle && filterSection) {
        filterToggle.addEventListener('click', () => {
            filterToggle.classList.toggle('active');
            filterSection.classList.toggle('active');
        });
    }

    /* ============================================
       8. FAVORITE TOGGLE
       ============================================ */
    const favoriteButtons = document.querySelectorAll('.property-favorite');

    favoriteButtons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            btn.classList.toggle('active');

            const svgPath = btn.querySelector('path');
            if (svgPath) {
                if (btn.classList.contains('active')) {
                    svgPath.setAttribute('fill', 'currentColor');
                } else {
                    svgPath.setAttribute('fill', 'none');
                }
            }
        });
    });

    /* ============================================
       9. COUNTER ANIMATION
       ============================================ */
    const counters = document.querySelectorAll('[data-count]');

    if (counters.length > 0) {
        const easeOutExpo = (t) => {
            return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        };

        const animateCounter = (el) => {
            const target = parseInt(el.getAttribute('data-count'), 10);
            const duration = 2000;
            const startTime = performance.now();

            const updateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = easeOutExpo(progress);
                const currentValue = Math.round(easedProgress * target);

                el.textContent = currentValue.toLocaleString('ru-RU');

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            };

            requestAnimationFrame(updateCounter);
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        counters.forEach((counter) => {
            counterObserver.observe(counter);
        });
    }

    /* ============================================
       10. SMOOTH SCROLL FOR ANCHOR LINKS
       ============================================ */
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const targetEl = document.querySelector(href);
                if (targetEl) {
                    e.preventDefault();
                    targetEl.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    /* ============================================
       11. FORM HANDLING
       ============================================ */
    const showToast = (message, type) => {
        let toast = document.getElementById('toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast';
            document.body.appendChild(toast);
        }

        toast.textContent = message;
        toast.className = '';

        // Force reflow to restart animation if already showing
        void toast.offsetWidth;

        toast.classList.add('show');
        if (type) {
            toast.classList.add(type);
        }

        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    };

    const forms = document.querySelectorAll('form');

    forms.forEach((form) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const requiredFields = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;

            requiredFields.forEach((field) => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#e53e3e';
                } else {
                    field.style.borderColor = '';
                }
            });

            if (isValid) {
                showToast('Спасибо! Ваша заявка отправлена.', 'success');
                form.reset();
            }
        });
    });

    /* ============================================
       12. BACK TO TOP BUTTON
       ============================================ */
    const backToTop = document.querySelector('.back-to-top');

    if (backToTop) {
        const handleBackToTopVisibility = () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        };

        window.addEventListener('scroll', handleBackToTopVisibility, { passive: true });
        handleBackToTopVisibility();

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ============================================
       13. GALLERY LIGHTBOX (PROPERTY-SINGLE PAGE)
       ============================================ */
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (galleryItems.length > 0) {
        const galleryImages = [];
        galleryItems.forEach((item) => {
            const img = item.querySelector('img');
            if (img) {
                galleryImages.push(img.src);
            }
        });

        let currentLightboxIndex = 0;
        let lightboxOverlay = null;
        let lightboxImage = null;

        const createLightbox = () => {
            lightboxOverlay = document.createElement('div');
            lightboxOverlay.className = 'lightbox-overlay';

            lightboxImage = document.createElement('img');
            lightboxImage.className = 'lightbox-image';
            lightboxImage.alt = 'Gallery image';

            const closeBtn = document.createElement('button');
            closeBtn.className = 'lightbox-close';
            closeBtn.innerHTML = '&#10005;';
            closeBtn.addEventListener('click', closeLightbox);

            const prevBtn = document.createElement('button');
            prevBtn.className = 'lightbox-prev';
            prevBtn.innerHTML = '&#8249;';
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                navigateLightbox(-1);
            });

            const nextBtn = document.createElement('button');
            nextBtn.className = 'lightbox-next';
            nextBtn.innerHTML = '&#8250;';
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                navigateLightbox(1);
            });

            lightboxOverlay.appendChild(lightboxImage);
            lightboxOverlay.appendChild(closeBtn);
            lightboxOverlay.appendChild(prevBtn);
            lightboxOverlay.appendChild(nextBtn);

            // Close on overlay click (not on image or buttons)
            lightboxOverlay.addEventListener('click', (e) => {
                if (e.target === lightboxOverlay) {
                    closeLightbox();
                }
            });

            document.body.appendChild(lightboxOverlay);
        };

        const openLightbox = (index) => {
            if (!lightboxOverlay) {
                createLightbox();
            }

            currentLightboxIndex = index;
            lightboxImage.src = galleryImages[currentLightboxIndex];
            document.body.style.overflow = 'hidden';

            // Force reflow then add active class for transition
            void lightboxOverlay.offsetWidth;
            lightboxOverlay.style.display = 'flex';
            requestAnimationFrame(() => {
                lightboxOverlay.classList.add('active');
            });
        };

        const closeLightbox = () => {
            if (!lightboxOverlay) return;
            lightboxOverlay.classList.remove('active');
            document.body.style.overflow = '';

            setTimeout(() => {
                lightboxOverlay.style.display = 'none';
            }, 400);
        };

        const navigateLightbox = (direction) => {
            currentLightboxIndex = (currentLightboxIndex + direction + galleryImages.length) % galleryImages.length;
            lightboxImage.src = galleryImages[currentLightboxIndex];
        };

        // Attach click handlers to gallery items
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                openLightbox(index);
            });
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (!lightboxOverlay || lightboxOverlay.style.display === 'none') return;

            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                navigateLightbox(-1);
            } else if (e.key === 'ArrowRight') {
                navigateLightbox(1);
            }
        });
    }

    /* ============================================
       14. PHONE INPUT MASK (+7 (___) ___-__-__)
       ============================================ */
    const phoneInputs = document.querySelectorAll('input[type="tel"]');

    phoneInputs.forEach((input) => {
        input.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');

            // If starts with 8, replace with 7
            if (value.startsWith('8')) {
                value = '7' + value.substring(1);
            }

            // If doesn't start with 7, prepend 7
            if (value.length > 0 && !value.startsWith('7')) {
                value = '7' + value;
            }

            let formatted = '';

            if (value.length > 0) {
                formatted = '+7';
            }
            if (value.length > 1) {
                formatted += ' (' + value.substring(1, 4);
            }
            if (value.length > 4) {
                formatted += ') ' + value.substring(4, 7);
            }
            if (value.length > 7) {
                formatted += '-' + value.substring(7, 9);
            }
            if (value.length > 9) {
                formatted += '-' + value.substring(9, 11);
            }

            e.target.value = formatted;
        });

        input.addEventListener('keydown', (e) => {
            // Allow backspace, delete, tab, escape, arrows
            const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
            if (allowedKeys.includes(e.key)) return;

            // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
            if ((e.ctrlKey || e.metaKey) && ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase())) return;

            // Block non-numeric input
            if (!/\d/.test(e.key)) {
                e.preventDefault();
            }
        });

        // Handle paste
        input.addEventListener('paste', (e) => {
            e.preventDefault();
            const pastedData = (e.clipboardData || window.clipboardData).getData('text');
            const digits = pastedData.replace(/\D/g, '');
            input.value = digits;
            input.dispatchEvent(new Event('input'));
        });
    });

});
