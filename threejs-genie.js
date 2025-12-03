// Three.js Genie Character
class GenieCharacter {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true });
        this.renderer.setSize(128, 128);
        this.renderer.setClearColor(0x000000, 0);

        this.camera.position.z = 5;

        this.createGenie();
        this.createParticles();
        this.animate();

        this.idleAnimation();
    }

    createGenie() {
        // Simple low-poly genie using basic geometry
        const geometry = new THREE.CylinderGeometry(0.5, 0.3, 2, 8);
        const material = new THREE.MeshPhongMaterial({
            color: 0x00ff88,
            emissive: 0x002211,
            transparent: true,
            opacity: 0.8
        });
        this.genie = new THREE.Mesh(geometry, material);
        this.scene.add(this.genie);

        // Add a simple head
        const headGeometry = new THREE.SphereGeometry(0.4, 8, 6);
        const headMaterial = new THREE.MeshPhongMaterial({
            color: 0x00ffaa,
            emissive: 0x002211
        });
        this.head = new THREE.Mesh(headGeometry, headMaterial);
        this.head.position.y = 1.2;
        this.genie.add(this.head);

        // Add arms
        const armGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 6);
        const armMaterial = new THREE.MeshPhongMaterial({
            color: 0x00ff88,
            emissive: 0x002211
        });
        this.leftArm = new THREE.Mesh(armGeometry, armMaterial);
        this.leftArm.position.set(-0.6, 0.5, 0);
        this.leftArm.rotation.z = Math.PI / 4;
        this.genie.add(this.leftArm);

        this.rightArm = new THREE.Mesh(armGeometry, armMaterial);
        this.rightArm.position.set(0.6, 0.5, 0);
        this.rightArm.rotation.z = -Math.PI / 4;
        this.genie.add(this.rightArm);

        // Add lighting
        const ambientLight = new THREE.AmbientLight(0x404040);
        this.scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0x00ff88, 1, 100);
        pointLight.position.set(0, 0, 5);
        this.scene.add(pointLight);
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < 20; i++) {
            const particleGeometry = new THREE.SphereGeometry(0.02, 4, 4);
            const particleMaterial = new THREE.MeshBasicMaterial({
                color: 0x00ff88,
                transparent: true,
                opacity: 0.6
            });
            const particle = new THREE.Mesh(particleGeometry, particleMaterial);
            particle.position.set(
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 4
            );
            this.scene.add(particle);
            this.particles.push(particle);
        }
    }

    idleAnimation() {
        // Slow float and rotation
        this.idleTween = new TWEEN.Tween(this.genie.position)
            .to({ y: this.genie.position.y + 0.2 }, 2000)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .yoyo(true)
            .repeat(Infinity)
            .start();

        this.rotationTween = new TWEEN.Tween(this.genie.rotation)
            .to({ y: this.genie.rotation.y + Math.PI * 2 }, 8000)
            .easing(TWEEN.Easing.Linear.None)
            .repeat(Infinity)
            .start();
    }

    moveToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate position relative to viewport
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let targetX, targetY;

        if (window.innerWidth > 768) {
            // Desktop: bottom-right
            targetX = viewportWidth - 160; // 128px (genie size) + 32px margin
            targetY = viewportHeight - 160;
        } else {
            // Mobile: bottom-center
            targetX = viewportWidth / 2 - 64;
            targetY = viewportHeight - 160;
        }

        // Animate genie movement
        const currentX = parseFloat(this.canvas.parentElement.style.left || '0');
        const currentY = parseFloat(this.canvas.parentElement.style.top || '0');

        new TWEEN.Tween({ x: currentX, y: currentY })
            .to({ x: targetX, y: targetY }, 1000)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onUpdate((obj) => {
                this.canvas.parentElement.style.left = obj.x + 'px';
                this.canvas.parentElement.style.top = obj.y + 'px';
            })
            .start();
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        TWEEN.update();

        // Animate particles
        this.particles.forEach((particle, index) => {
            particle.position.y += 0.01;
            if (particle.position.y > 2) {
                particle.position.y = -2;
            }
            particle.rotation.x += 0.01;
            particle.rotation.y += 0.01;
        });

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize genie when DOM is loaded
let genieCharacter;
document.addEventListener('DOMContentLoaded', () => {
    genieCharacter = new GenieCharacter('genie-canvas');
});
