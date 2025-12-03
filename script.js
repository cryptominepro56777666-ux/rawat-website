// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const genie = document.getElementById('genie');

// Matrix Rain Effect
function createMatrixRain() {
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()_+-=[]{}|;:,.<>?";
    const matrixArray = matrix.split("");

    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ff00';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 35);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

createMatrixRain();

// Navigation Toggle
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Smooth Scrolling for Navigation Links
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
        // Close mobile menu if open
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// Navbar Background Change on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.8)';
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
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Gallery Lightbox
const galleryImages = document.querySelectorAll('.gallery-grid img');
galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        const lightbox = document.createElement('div');
        lightbox.style.position = 'fixed';
        lightbox.style.top = '0';
        lightbox.style.left = '0';
        lightbox.style.width = '100%';
        lightbox.style.height = '100%';
        lightbox.style.background = 'rgba(0, 0, 0, 0.8)';
        lightbox.style.display = 'flex';
        lightbox.style.alignItems = 'center';
        lightbox.style.justifyContent = 'center';
        lightbox.style.zIndex = '9999';
        lightbox.style.cursor = 'pointer';

        const imgClone = img.cloneNode();
        imgClone.style.maxWidth = '90%';
        imgClone.style.maxHeight = '90%';
        imgClone.style.objectFit = 'contain';

        lightbox.appendChild(imgClone);
        document.body.appendChild(lightbox);

        lightbox.addEventListener('click', () => {
            document.body.removeChild(lightbox);
        });
    });
});

// Form Validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = contactForm.querySelector('input[type="text"]').value;
        const phone = contactForm.querySelector('input[type="tel"]').value;
        const visitType = contactForm.querySelector('select').value;
        const date = contactForm.querySelector('input[type="date"]').value;
        const message = contactForm.querySelector('textarea').value;

        if (!name || !phone || !visitType || !date) {
            alert('Please fill in all required fields.');
            return;
        }

        // Here you would typically send the form data to a server
        alert('Thank you for your booking request! We will contact you soon.');
        contactForm.reset();
    });
}

// Genie Assistant Functionality
if (genie) {
    let genieClicks = 0;
    const messages = [
        "Welcome to Rawat Aqua Jungle Retreat! 🌿",
        "Explore our magical jungle paradise! ✨",
        "Discover the wonders of nature with us! 🐟",
        "Your adventure awaits! 🌟"
    ];

    genie.addEventListener('click', () => {
        genieClicks = (genieClicks + 1) % messages.length;

        // Speak the message if speech synthesis is supported
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(messages[genieClicks]);
            utterance.pitch = 1.2;
            utterance.rate = 0.9;
            utterance.volume = 0.8;
            window.speechSynthesis.speak(utterance);
        }

        // Visual feedback
        genie.style.transform = 'scale(1.2)';
        setTimeout(() => {
            genie.style.transform = 'scale(1)';
        }, 200);

        // Add sparkle effect
        const sparkle = document.createElement('div');
        sparkle.textContent = '✨';
        sparkle.style.position = 'absolute';
        sparkle.style.fontSize = '2rem';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.animation = 'sparkle-pop 0.5s ease-out';
        sparkle.style.zIndex = '1001';
        genie.appendChild(sparkle);

        setTimeout(() => {
            if (genie.contains(sparkle)) {
                genie.removeChild(sparkle);
            }
        }, 500);
    });

    // Gentle random movements
    setInterval(() => {
        const randomX = Math.random() * 10 - 5;
        const randomY = Math.random() * 10 - 5;
        genie.style.transform = `translate(${randomX}px, ${randomY}px)`;
        setTimeout(() => {
            genie.style.transform = 'translate(0, 0)';
        }, 2000);
    }, 5000);

    // React to scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (scrolled > 500) {
            genie.style.opacity = '0.7';
        } else {
            genie.style.opacity = '1';
        }
    });
}

// Custom Cursor
const cursor = document.createElement('div');
cursor.className = 'cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
});

document.addEventListener('mousedown', () => {
    cursor.style.transform = 'scale(0.8)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'scale(1)';
});

// Loading Animation
window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.style.opacity = '0';
        setTimeout(() => {
            loading.style.display = 'none';
        }, 500);
    }
});

// Parallax Effect for Hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        heroVideo.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// WhatsApp Integration
function openWhatsApp() {
    const phone = "+919876543210";
    const message = "Hi, I'm interested in booking a visit to Rawat Aqua Jungle Retreat.";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Add CSS for sparkle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle-pop {
        0% {
            opacity: 1;
            transform: scale(0);
        }
        50% {
            opacity: 1;
            transform: scale(1.5);
        }
        100% {
            opacity: 0;
            transform: scale(2);
        }
    }
`;
document.head.appendChild(style);

// Terminal Functionality
function initTerminal() {
    const terminal = document.getElementById('terminal');
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.querySelector('.terminal-output');
    const terminalClose = document.querySelector('.terminal-close');
    const terminalMinimize = document.querySelector('.terminal-minimize');

    let isMinimized = false;

    // Toggle terminal visibility with Ctrl+`
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === '`') {
            e.preventDefault();
            terminal.style.display = terminal.style.display === 'block' ? 'none' : 'block';
            if (terminal.style.display === 'block') {
                terminalInput.focus();
            }
        }
    });

    // Close terminal
    terminalClose.addEventListener('click', () => {
        terminal.style.display = 'none';
    });

    // Minimize terminal
    terminalMinimize.addEventListener('click', () => {
        if (isMinimized) {
            terminal.style.height = '300px';
            terminal.querySelector('.terminal-body').style.display = 'block';
            isMinimized = false;
        } else {
            terminal.style.height = '30px';
            terminal.querySelector('.terminal-body').style.display = 'none';
            isMinimized = true;
        }
    });

    // Terminal commands
    const commands = {
        help: () => {
            return `Available commands:
help - Show this help
about - About Rawt Aqua Farm
fish - List fish varieties
stay - Stay information
adventure - Adventure packages
contact - Contact information
clear - Clear terminal
exit - Close terminal
hack - Access hidden features`;
        },
        about: () => {
            return `Rawt Aqua Farm & Jungle Retreat
Location: Aravali Hills, Rajasthan
Features: Natural spring-water ponds, 90+ fish varieties, Jungle trails, Eco-friendly farming`;
        },
        fish: () => {
            return `Premium Fish Varieties:
- Arowana: Rare & Expensive (₹50,000 - ₹2,00,000)
- Koi: Local Freshwater (₹5,000 - ₹25,000)
- Rohu XXL: Breeding Pairs (₹10,000 - ₹50,000)
- Golden Catla: Custom Orders (₹3,000 - ₹15,000)`;
        },
        stay: () => {
            return `Jungle Stay Options:
- Luxury Tents / Bamboo Huts
- Pure Natural Water Pool
- Bonfire Zone
- Night Camping
- Bird Watching Morning Walk`;
        },
        adventure: () => {
            return `Adventure Packages:
- Night Jungle Safari
- Mountain Trekking
- River Crossing
- Archery & Survival Training
- Fishing Experience
- Firefly Watching`;
        },
        contact: () => {
            return `Contact Information:
Phone: +91 98765 43210
Email: info@rawtaquafarm.com
Location: Aravali Hills, Rajasthan`;
        },
        clear: () => {
            terminalOutput.innerHTML = '';
            return '';
        },
        exit: () => {
            terminal.style.display = 'none';
            return '';
        },
        save: () => {
            const output = Array.from(terminalOutput.children).map(p => p.textContent).join('\n');
            const blob = new Blob([output], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'terminal-output.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            return 'Terminal output saved to terminal-output.txt';
        }
    };

    // Typing animation function
    function typeText(element, text, speed = 50) {
        let i = 0;
        element.classList.add('typing');
        element.textContent = '';

        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                element.classList.remove('typing');
            }
        }
        type();
    }

    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = terminalInput.value.trim().toLowerCase();
            const output = document.createElement('p');
            output.textContent = `> ${terminalInput.value}`;
            terminalOutput.appendChild(output);

            if (commands[command]) {
                const result = commands[command]();
                if (result) {
                    const resultOutput = document.createElement('p');
                    terminalOutput.appendChild(resultOutput);
                    typeText(resultOutput, result, 30);
                }
            } else if (command !== '') {
                const errorOutput = document.createElement('p');
                errorOutput.style.color = '#ff4444';
                terminalOutput.appendChild(errorOutput);
                typeText(errorOutput, `Command not found: ${command}. Type 'help' for available commands.`, 30);
            }

            terminalInput.value = '';
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
    });
}

// Loading Screen Functionality
function initLoadingScreen() {
    const loading = document.getElementById('loading');
    const loadingBar = document.getElementById('loading-bar');
    const loadingText = document.getElementById('loading-text');

    const loadingMessages = [
        'Loading Rawt Aqua Jungle Retreat...',
        'Initializing Matrix Protocol...',
        'Connecting to Jungle Network...',
        'Loading Environmental Data...',
        'Activating Genie AI...',
        'System Ready!'
    ];

    let messageIndex = 0;
    let progress = 0;

    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;

        loadingBar.style.width = progress + '%';

        if (progress > (messageIndex + 1) * 100 / loadingMessages.length) {
            messageIndex++;
            if (messageIndex < loadingMessages.length) {
                loadingText.textContent = loadingMessages[messageIndex];
            }
        }

        if (progress >= 100) {
            clearInterval(loadingInterval);
            setTimeout(() => {
                loading.style.opacity = '0';
                setTimeout(() => {
                    loading.style.display = 'none';
                }, 500);
            }, 500);
        }
    }, 100);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initLoadingScreen();
    initTerminal();
    console.log('Rawat Aqua Jungle Retreat website loaded successfully!');
    console.log('Press Ctrl+` to open terminal interface');
});
