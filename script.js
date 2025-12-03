// Loading Animation
window.addEventListener('load', () => {
    setTimeout(() => {
        const loading = document.getElementById('loading');
        loading.style.opacity = '0';
        setTimeout(() => {
            loading.style.display = 'none';
        }, 500);
    }, 2000);
});

// Custom Cursor
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.getElementById('cursor');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => {
        cursor.classList.add('active');
    });

    document.addEventListener('mouseup', () => {
        cursor.classList.remove('active');
    });

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .fish-card, .activity-card, .map-marker');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('active'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });
});

// Water Particles Animation
function createParticles() {
    const heroSection = document.getElementById('hero');
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// Ambient Sound Toggle
const soundToggle = document.getElementById('sound-toggle');
const ambientSound = document.getElementById('ambient-sound');
let soundEnabled = false;

soundToggle.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    if (soundEnabled) {
        ambientSound.play();
        soundToggle.textContent = '🔊';
    } else {
        ambientSound.pause();
        soundToggle.textContent = '🔇';
    }
});

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Header Background Change on Scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(0, 0, 0, 0.95)';
        nav.style.backdropFilter = 'blur(20px)';
    } else {
        nav.style.background = 'rgba(0, 0, 0, 0.5)';
        nav.style.backdropFilter = 'blur(10px)';
    }
});

// Scroll-Triggered Animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.container > *');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

animateOnScroll();

// Fish Card Hover Effects
document.querySelectorAll('.fish-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.05)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Activity Card Hover Effects
document.querySelectorAll('#adventure .bg-green-900').forEach(card => {
    const icon = card.querySelector('div:first-child');
    card.addEventListener('mouseenter', () => {
        icon.style.transform = 'scale(1.2) rotate(10deg)';
    });

    card.addEventListener('mouseleave', () => {
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Jungle Map Interactions
document.querySelectorAll('.map-marker').forEach(marker => {
    marker.addEventListener('mouseenter', () => {
        marker.style.transform = 'scale(1.5)';
    });

    marker.addEventListener('mouseleave', () => {
        marker.style.transform = 'scale(1)';
    });
});

// Gallery Lightbox
const galleryImages = document.querySelectorAll('#gallery img');
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = '<span class="close">&times;</span><img src="" alt="">';
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector('img');
const closeBtn = lightbox.querySelector('.close');

galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
    });
});

closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
    }
});

// Review Slider
let currentReview = 0;
const reviews = document.querySelectorAll('#reviews .bg-green-800');
const totalReviews = reviews.length;

function showReview(index) {
    reviews.forEach(review => review.classList.remove('review-slide'));
    reviews[index].classList.add('review-slide');
}

function nextReview() {
    currentReview = (currentReview + 1) % totalReviews;
    showReview(currentReview);
}

// Auto-slide reviews every 5 seconds
setInterval(nextReview, 5000);

// Contact Form Handling
const contactForm = document.querySelector('#contact form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// WhatsApp Function
function openWhatsApp() {
    const phoneNumber = '916375202840';
    const message = 'I want to book Rawt Aqua Farm & Jungle Retreat';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('#hero video');
    if (heroBg) {
        heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Leaf Animation
function createLeaves() {
    const leafCount = 10;
    for (let i = 0; i < leafCount; i++) {
        const leaf = document.createElement('div');
        leaf.className = 'leaf';
        leaf.style.left = Math.random() * 100 + '%';
        leaf.style.animationDelay = Math.random() * 10 + 's';
        leaf.style.animationDuration = (Math.random() * 5 + 10) + 's';
        document.body.appendChild(leaf);
    }
}

createLeaves();

// Firefly Animation
function createFireflies() {
    const fireflyCount = 20;
    for (let i = 0; i < fireflyCount; i++) {
        const firefly = document.createElement('div');
        firefly.className = 'firefly';
        firefly.style.left = Math.random() * 100 + '%';
        firefly.style.top = Math.random() * 100 + '%';
        firefly.style.animationDelay = Math.random() * 3 + 's';
        document.body.appendChild(firefly);
    }
}

createFireflies();

// Fog Animation
function createFog() {
    const fog = document.createElement('div');
    fog.className = 'fog';
    document.body.appendChild(fog);
}

createFog();

// Responsive Menu Close on Link Click
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Window Resize Handler
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        mobileMenu.classList.add('hidden');
    }
});

// Performance Optimization: Debounce Scroll Events
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

window.addEventListener('scroll', debounce(() => {
    // Scroll-triggered functions can be added here
}, 16));

// Accessibility: Keyboard Navigation for Gallery
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
        }
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Add animate-on-scroll class to elements
document.querySelectorAll('#about, #fish, #stay, #adventure, #map, #gallery, #reviews, #location, #contact, #safety').forEach(section => {
    section.classList.add('animate-on-scroll');
});

// Form Validation
document.querySelectorAll('#contact input, #contact select, #contact textarea').forEach(field => {
    field.addEventListener('blur', () => {
        if (field.value.trim() === '') {
            field.style.borderColor = '#ef4444';
        } else {
            field.style.borderColor = '#10b981';
        }
    });
});

// Dynamic Year in Footer
document.addEventListener('DOMContentLoaded', () => {
    const year = new Date().getFullYear();
    const copyright = document.querySelector('footer p');
    if (copyright) {
        copyright.innerHTML = copyright.innerHTML.replace('2024', year);
    }
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(error => console.log('SW registration failed'));
    });
}

// Error Handling
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
});

// Prevent right-click on images (optional)
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});
