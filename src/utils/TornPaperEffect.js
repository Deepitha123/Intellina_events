// ============= TORN PAPER PARTICLE EFFECT =============
// Premium Upside Down themed torn paper background effect

const PAPER_GLOW_COLOR = '255, 255, 255'; // White color
const DEFAULT_PARTICLE_COUNT = 40; // Number of papers floating

export class TornPaperEffect {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            particleCount: options.particleCount || DEFAULT_PARTICLE_COUNT,
            glowColor: options.glowColor || PAPER_GLOW_COLOR,
            enableUpsideDown: options.enableUpsideDown !== false, // Default true
            speed: options.speed || 0.3 // Slower default speed
        };
        
        this.particles = [];
        this.animationFrame = null;
        this.isActive = false;
        
        this.init();
    }

    init() {
        // Create canvas or container for particles
        this.particleContainer = document.createElement('div');
        this.particleContainer.className = 'torn-paper-container fixed inset-0 z-[1] pointer-events-none overflow-hidden';
        this.container.appendChild(this.particleContainer);
        
        // Create initial particles
        this.createParticles();
        this.startAnimation();
        
        // Handle window resize
        this.handleResizeBound = () => this.handleResize();
        window.addEventListener('resize', this.handleResizeBound);
    }

    createParticle() {
        const particle = document.createElement('div');
        
        // Random paper sizes: small, medium, large
        const sizes = [
            { width: 4, height: 6 },    // small
            { width: 7, height: 10 },   // medium
            { width: 12, height: 16 },  // large
            { width: 8, height: 12 }    // medium-small
        ];
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        
        // Create irregular torn paper effect with random clip-path
        const clipPath = `polygon(
            ${Math.random() * 10}% ${Math.random() * 10}%,
            ${85 + Math.random() * 10}% ${Math.random() * 15}%,
            ${90 + Math.random() * 10}% ${40 + Math.random() * 20}%,
            ${85 + Math.random() * 10}% ${80 + Math.random() * 15}%,
            ${Math.random() * 15}% ${85 + Math.random() * 10}%,
            ${Math.random() * 10}% ${40 + Math.random() * 20}%
        )`;
        
        // Random starting position (ensure they start off-screen for smooth entrance)
        const startX = Math.random() * (window.innerWidth + 100) - 50;
        const startY = Math.random() * (window.innerHeight + 100) - 50;
        
        // Random velocity for floating motion (slower)
        const vx = (Math.random() - 0.5) * 0.15 * this.options.speed;
        const vy = (Math.random() - 0.5) * 0.15 * this.options.speed;
        const vr = (Math.random() - 0.5) * 0.2; // Slower rotation velocity
        
        // Upside down effect - some papers rotate 180deg
        const initialRotation = this.options.enableUpsideDown && Math.random() > 0.5 
            ? 180 + (Math.random() - 0.5) * 20 
            : (Math.random() - 0.5) * 20;
        
        const initialOpacity = 0.25 + Math.random() * 0.3; // Slightly more subtle for white
        
        particle.style.cssText = `
            position: absolute;
            width: ${size.width}px;
            height: ${size.height}px;
            background: rgba(${this.options.glowColor}, 0.4);
            box-shadow: 0 0 10px rgba(${this.options.glowColor}, 0.5),
                        inset 0 0 3px rgba(${this.options.glowColor}, 0.3),
                        0 0 15px rgba(${this.options.glowColor}, 0.2);
            clip-path: ${clipPath};
            pointer-events: none;
            left: 0;
            top: 0;
            opacity: ${initialOpacity};
            transform: translate(${startX}px, ${startY}px) rotate(${initialRotation}deg) translateZ(0);
            filter: blur(${0.2 + Math.random() * 0.3}px);
            will-change: transform, opacity;
            backface-visibility: hidden;
        `;
        
        return {
            element: particle,
            x: startX,
            y: startY,
            vx: vx,
            vy: vy,
            rotation: initialRotation,
            vr: vr,
            size: size,
            clipPath: clipPath,
            floatPhase: Math.random() * Math.PI * 2, // For sine wave floating
            floatSpeed: 0.0005 + Math.random() * 0.001, // Slower float speed
            baseOpacity: initialOpacity
        };
    }

    createParticles() {
        // Clear existing particles
        this.particles.forEach(p => p.element.remove());
        this.particles = [];
        
        // Create new particles
        for (let i = 0; i < this.options.particleCount; i++) {
            const particle = this.createParticle();
            this.particleContainer.appendChild(particle.element);
            this.particles.push(particle);
        }
    }

    animate() {
        if (!this.isActive) return;
        
        const time = Date.now() * 0.001;
        
        this.particles.forEach(particle => {
            // Update position with floating motion (sine wave) - slower
            const floatX = Math.sin(time * particle.floatSpeed * 0.5 + particle.floatPhase) * 15;
            const floatY = Math.cos(time * particle.floatSpeed * 0.35 + particle.floatPhase) * 10;
            
            particle.x += particle.vx + floatX * 0.05;
            particle.y += particle.vy + floatY * 0.05;
            particle.rotation += particle.vr * 0.5;
            
            // Wrap around edges for continuous flow
            if (particle.x < -50) particle.x = window.innerWidth + 50;
            if (particle.x > window.innerWidth + 50) particle.x = -50;
            if (particle.y < -50) particle.y = window.innerHeight + 50;
            if (particle.y > window.innerHeight + 50) particle.y = -50;
            
            // Apply transform with smooth easing using transform instead of left/top for better performance
            particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px) rotate(${particle.rotation}deg)`;
            
            // Subtle opacity variation for breathing effect
            const opacityVariation = 0.1 * Math.sin(time * 0.5 + particle.floatPhase);
            particle.element.style.opacity = Math.max(0.15, Math.min(0.6, particle.baseOpacity + opacityVariation));
        });
        
        this.animationFrame = requestAnimationFrame(() => this.animate());
    }

    startAnimation() {
        if (this.isActive) return;
        this.isActive = true;
        this.animate();
    }

    stopAnimation() {
        this.isActive = false;
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }

    handleResize() {
        // Adjust particle positions on resize
        const scaleX = window.innerWidth / (this.container.offsetWidth || window.innerWidth);
        const scaleY = window.innerHeight / (this.container.offsetHeight || window.innerHeight);
        
        this.particles.forEach(particle => {
            particle.x *= scaleX;
            particle.y *= scaleY;
        });
    }

    destroy() {
        this.stopAnimation();
        this.particles.forEach(p => p.element.remove());
        this.particles = [];
        if (this.particleContainer && this.particleContainer.parentNode) {
            this.particleContainer.parentNode.removeChild(this.particleContainer);
        }
        if (this.handleResizeBound) {
            window.removeEventListener('resize', this.handleResizeBound);
        }
    }
}
