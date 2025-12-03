// Genie System: Voice + Movement + Scroll Logic
class GenieSystem {
    constructor() {
        this.sections = ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10'];
        this.spoken = new Array(this.sections.length).fill(false);
        this.isMuted = false;
        this.currentSection = 0;

        this.GENIE_STORY = [
            "Greetings, traveler. You have stepped into the heart of Rawt Aqua Farm and the Ancient Jungle, a land hidden from time and blessed with living waters.",
            "These forests grew long before maps were drawn. Mountains whispered and rivers carved their path to create this sacred valley.",
            "These waters are alive—pure, untouched, fed by ancient underground springs. Every drop carries the memory of a thousand-year rainfall.",
            "Here swim the jewels of the jungle—Golden Catla, Royal Rohu, mystical Koi, spirits of the deep bright as moonlight.",
            "Follow me… The true jungle begins now. Every tree has a story, every breeze a secret.",
            "When night awakens, fireflies paint the darkness with gold. The jungle reveals its true face.",
            "The mountains above guard our valley. Climb them, and see the world as the eagles do—vast and infinite.",
            "Rest here, traveler. This camp has welcomed explorers, wanderers, and dreamers through countless moons.",
            "I am the guardian spirit of this jungle, watching every river bend, every rising moon, and now guiding you.",
            "Our journey ends for now, traveler. But the jungle remembers you. Return whenever your heart seeks mystery and ancient waters."
        ];

        this.init();
    }

    init() {
        this.setupVoice();
        this.setupScrollTriggers();
        this.setupMuteToggle();
        this.setupMobileMenu();
    }

    setupVoice() {
        if ('speechSynthesis' in window) {
            this.synth = window.speechSynthesis;
            // Set voice preferences
            this.synth.onvoiceschanged = () => {
                const voices = this.synth.getVoices();
                // Try to find a deep male voice
                this.voice = voices.find(voice => voice.name.toLowerCase().includes('male') || voice.name.toLowerCase().includes('deep')) || voices[0];
            };
        } else {
            console.warn('Speech synthesis not supported');
        }
    }

    speak(text) {
        if (this.isMuted || !this.synth) return;

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = this.voice;
        utterance.pitch = 0.7; // Deep pitch
        utterance.rate = 0.85; // Slow, storyteller pace
        utterance.volume = 0.8;

        this.synth.speak(utterance);
    }

    setupScrollTriggers() {
        const observerOptions = {
            threshold: 0.6,
            rootMargin: '0px 0px -10% 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    const index = this.sections.indexOf(sectionId);

                    if (index !== -1 && !this.spoken[index]) {
                        this.spoken[index] = true;
                        this.currentSection = index;
                        this.speak(this.GENIE_STORY[index]);

                        // Move genie to this section
                        if (window.genieCharacter) {
                            window.genieCharacter.moveToSection(sectionId);
                        }
                    }
                }
            });
        }, observerOptions);

        this.sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                observer.observe(section);
            }
        });
    }

    setupMuteToggle() {
        const muteToggle = document.getElementById('mute-toggle');
        if (muteToggle) {
            muteToggle.addEventListener('click', () => {
                this.isMuted = !this.isMuted;
                muteToggle.textContent = this.isMuted ? '🔇' : '🔊';

                if (this.isMuted && this.synth) {
                    this.synth.cancel(); // Stop any ongoing speech
                }
            });
        }
    }

    setupMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');

        if (mobileMenuToggle && mobileMenu) {
            mobileMenuToggle.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });

            // Close menu when clicking a link
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                });
            });
        }
    }

    // Method to manually trigger genie movement (for demo purposes)
    moveGenieRandomly() {
        if (!window.genieCharacter) return;

        const sections = this.sections;
        const randomSection = sections[Math.floor(Math.random() * sections.length)];
        window.genieCharacter.moveToSection(randomSection);
    }
}

// Initialize the genie system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.genieSystem = new GenieSystem();

    // Optional: Add random movement for demo
    // setInterval(() => {
    //     window.genieSystem.moveGenieRandomly();
    // }, 8000);
});

// Fog particle effect
function createFogEffect() {
    const canvas = document.createElement('canvas');
    canvas.id = 'fog-canvas';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 3 + 1,
            opacity: Math.random() * 0.5 + 0.1
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

createFogEffect();
