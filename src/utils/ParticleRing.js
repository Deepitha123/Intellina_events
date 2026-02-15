/**
 * ParticleRing - Vanilla JS implementation
 * Creates a rotating particle ring effect using 2D canvas
 */
export class ParticleRing {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            particleCount: options.particleCount || 2500,
            minRadius: options.minRadius || 150,
            maxRadius: options.maxRadius || 300,
            depth: options.depth || 50,
            rotationSpeed: options.rotationSpeed || 0.0005,
            leftColor: options.leftColor || [99, 102, 241], // Indigo
            rightColor: options.rightColor || [139, 92, 246], // Purple
            ...options
        };

        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.rotation = 0;
        this.animationId = null;
        this.lastTime = 0;

        this.init();
    }

    init() {
        // Create canvas
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'particle-ring-canvas';
        this.canvas.style.cssText = `
            width: 100%;
            height: 100%;
            display: block;
        `;
        this.ctx = this.canvas.getContext('2d');

        this.container.appendChild(this.canvas);

        // Generate particles
        this.generateParticles();

        // Setup resize
        this.updateSize();
        window.addEventListener('resize', () => this.updateSize());

        // Start animation
        this.start();
    }

    updateSize() {
        const rect = this.container.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.ctx.scale(dpr, dpr);

        this.width = rect.width;
        this.height = rect.height;
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;
    }

    randomFromInterval(min, max) {
        return Math.random() * (max - min) + min;
    }

    calculateColor(x) {
        const maxDiff = this.options.maxRadius * 2;
        const distance = x + this.options.maxRadius;
        const ratio = Math.max(0, Math.min(1, distance / maxDiff));

        const [r0, g0, b0] = this.options.leftColor;
        const [r1, g1, b1] = this.options.rightColor;

        const r = Math.round(r0 * (1 - ratio) + r1 * ratio);
        const g = Math.round(g0 * (1 - ratio) + g1 * ratio);
        const b = Math.round(b0 * (1 - ratio) + b1 * ratio);

        return `rgb(${r}, ${g}, ${b})`;
    }

    generateParticles() {
        this.particles = [];

        // Inner particles
        for (let i = 0; i < this.options.particleCount; i++) {
            const randomRadius = this.randomFromInterval(this.options.minRadius, this.options.maxRadius);
            const randomAngle = Math.random() * Math.PI * 2;

            const x = Math.cos(randomAngle) * randomRadius;
            const y = Math.sin(randomAngle) * randomRadius;
            const z = this.randomFromInterval(-this.options.depth, this.options.depth);

            this.particles.push({
                x, y, z,
                color: this.calculateColor(x),
                size: 2
            });
        }

        // Outer particles (fewer, more spread out)
        for (let i = 0; i < this.options.particleCount / 4; i++) {
            const randomRadius = this.randomFromInterval(this.options.minRadius / 2, this.options.maxRadius * 2);
            const angle = Math.random() * Math.PI * 2;

            const x = Math.cos(angle) * randomRadius;
            const y = Math.sin(angle) * randomRadius;
            const z = this.randomFromInterval(-this.options.depth * 10, this.options.depth * 10);

            this.particles.push({
                x, y, z,
                color: this.calculateColor(x),
                size: 1.5
            });
        }
    }

    draw(time) {
        if (!this.canvas || !this.ctx) return;

        const deltaTime = time - this.lastTime;
        this.lastTime = time;
        this.rotation += deltaTime * this.options.rotationSpeed;

        // Clear canvas
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.scale(dpr, dpr);

        // Sort particles by z-depth (back to front)
        const sortedParticles = [...this.particles].sort((a, b) => a.z - b.z);

        // Draw particles
        sortedParticles.forEach(particle => {
            // Apply rotation
            const rotatedX = particle.x * Math.cos(this.rotation) - particle.y * Math.sin(this.rotation);
            const rotatedY = particle.x * Math.sin(this.rotation) + particle.y * Math.cos(this.rotation);

            // Project to 2D (simple perspective)
            const scale = Math.max(0.1, 1 + (particle.z / 500));
            const screenX = this.centerX + rotatedX * scale;
            const screenY = this.centerY + rotatedY * scale;

            // Calculate opacity based on z-depth
            const opacity = Math.max(0.1, Math.min(1, 0.5 + (particle.z / (this.options.depth * 20))));

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(screenX, screenY, particle.size * scale, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = opacity;
            this.ctx.fill();

            // Add glow effect
            this.ctx.shadowBlur = 10 * scale;
            this.ctx.shadowColor = particle.color;
        });

        this.ctx.globalAlpha = 1;
        this.ctx.shadowBlur = 0;

        this.animationId = requestAnimationFrame((t) => this.draw(t));
    }

    start() {
        if (!this.animationId) {
            this.lastTime = performance.now();
            this.animationId = requestAnimationFrame((t) => this.draw(t));
        }
    }

    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    destroy() {
        this.stop();
        window.removeEventListener('resize', () => this.updateSize());
        if (this.canvas && this.canvas.parentElement) {
            this.canvas.remove();
        }
    }
}
