// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// Search Tabs
const searchTabs = document.querySelectorAll('.search-tab');
searchTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        searchTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
    });
});

// Room Buttons
const roomButtons = document.querySelectorAll('.room-btn');
roomButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        roomButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// View Toggle
const viewButtons = document.querySelectorAll('.view-btn');
const catalogGrid = document.querySelector('.catalog-grid');

viewButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        viewButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Toggle grid/list view
        if (catalogGrid) {
            const isGrid = btn.querySelector('rect[width="7"]');
            if (isGrid) {
                catalogGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
            } else {
                catalogGrid.style.gridTemplateColumns = '1fr';
            }
        }
    });
});

// Favorite Toggle
const favoriteButtons = document.querySelectorAll('.property-favorite');
favoriteButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        btn.classList.toggle('active');
        
        const svg = btn.querySelector('path');
        if (btn.classList.contains('active')) {
            svg.setAttribute('fill', 'currentColor');
        } else {
            svg.setAttribute('fill', 'none');
        }
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Form Validation
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simple validation
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#e53e3e';
            } else {
                input.style.borderColor = '';
            }
        });
        
        if (isValid) {
            alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.');
            form.reset();
        }
    });
});

// Scroll Header Effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Gallery Modal (simple implementation)
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        // Here you can implement a full gallery modal
        console.log('Gallery item clicked:', index);
    });
});

// Price formatting
function formatPrice(price) {
    return new Intl.NumberFormat('ru-RU').format(price);
}

// Initialize tooltips or other UI enhancements
document.addEventListener('DOMContentLoaded', () => {
    console.log('Prime Estate website loaded');
});
