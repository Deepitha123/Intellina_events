import gsap from 'gsap';

export class MagicBento {
    constructor(container, options = {}) {
        this.container = container;
        this.cards = Array.from(container.querySelectorAll('.magic-bento-card'));
        this.options = {
            spotlightRadius: options.spotlightRadius || 400,
            glowColor: options.glowColor || '255, 0, 51',
            glitchColor: '0, 255, 255',
            enableParticles: options.enableParticles !== false,
            idleAnimation: options.idleAnimation !== false,
            backgroundMode: options.backgroundMode || false,
            enableDotGrid: options.enableDotGrid || true // New: Dot Grid
        };

        this.spotlight = null;
        this.canvas = null;
        this.ctx = null;
        this.dots = [];
        this.mouse = { x: 0, y: 0 };

        this.init();
    }

    init() {
        if (this.options.enableDotGrid) {
            this.initDotGrid();
        }

        if (!this.options.backgroundMode) {
            this.createGlobalSpotlight();
        }

        this.cards.forEach((card, index) => {
            this.initCard(card, index);
        });

        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        window.addEventListener('resize', () => this.handleResize());
    }

    initDotGrid() {
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'absolute inset-0 z-[-1] pointer-events-none opacity-40';
        this.container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.resizeCanvas();
        this.createDots();
        this.animateDots();
    }

    resizeCanvas() {
        if (!this.canvas) return;
        const oldWidth = this.canvas.width;
        const oldHeight = this.canvas.height;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        // Scale existing dots to new canvas size if resizing
        if (oldWidth > 0 && oldHeight > 0) {
            const scaleX = this.canvas.width / oldWidth;
            const scaleY = this.canvas.height / oldHeight;
            this.dots.forEach(dot => {
                dot.x *= scaleX;
                dot.y *= scaleY;
                dot.originX *= scaleX;
                dot.originY *= scaleY;
            });
        } else {
            this.createDots(); // Create new dots on first load
        }
    }

    handleResize() {
        this.resizeCanvas();
    }

    createDots() {
        if (!this.canvas) return;
        this.dots = [];
        // Create dots randomly distributed across canvas for free-flowing effect
        const dotCount = Math.floor((this.canvas.width * this.canvas.height) / 2000); // Adaptive density
        
        for (let i = 0; i < dotCount; i++) {
            this.dots.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                originX: Math.random() * this.canvas.width,
                originY: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.2, // Slower random velocity X
                vy: (Math.random() - 0.5) * 0.2, // Slower random velocity Y
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.3 + 0.1,
                angle: Math.random() * Math.PI * 2, // Random starting angle
                speed: Math.random() * 0.15 + 0.05, // Slower random speed
                phase: Math.random() * Math.PI * 2 // Phase for wave motion
            });
        }
    }

    animateDots() {
        if (!this.ctx) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update time for flow (slower)
        this.time = (this.time || 0) + 0.003;

        // Update and draw dots
        const mouseX = this.mouse.x;
        const mouseY = this.mouse.y;
        const radius = 300; // Interaction radius

        this.dots.forEach(dot => {
            // Free-flowing air-like movement - multiple wave patterns combined (slower)
            const wave1X = Math.sin(dot.phase + this.time * dot.speed * 0.5) * 20;
            const wave1Y = Math.cos(dot.phase + this.time * dot.speed * 0.35) * 20;
            
            const wave2X = Math.sin(dot.originY * 0.003 + this.time * 0.25) * 15;
            const wave2Y = Math.cos(dot.originX * 0.003 + this.time * 0.25) * 15;
            
            const wave3X = Math.sin(dot.angle + this.time * 0.6) * 10;
            const wave3Y = Math.cos(dot.angle + this.time * 0.6) * 10;

            // Combine waves for organic flow
            const flowX = wave1X + wave2X + wave3X;
            const flowY = wave1Y + wave2Y + wave3Y;

            // Update position with velocity for continuous movement (slower)
            dot.vx += (Math.sin(this.time + dot.phase) * 0.003);
            dot.vy += (Math.cos(this.time + dot.phase) * 0.003);
            
            // Damping to prevent excessive speed
            dot.vx *= 0.99;
            dot.vy *= 0.99;

            // Calculate new position (slower movement)
            const currentX = dot.originX + flowX + dot.vx * 30;
            const currentY = dot.originY + flowY + dot.vy * 30;

            // Wrap around edges for continuous flow
            if (currentX < 0) dot.originX = this.canvas.width;
            if (currentX > this.canvas.width) dot.originX = 0;
            if (currentY < 0) dot.originY = this.canvas.height;
            if (currentY > this.canvas.height) dot.originY = 0;

            // Distance from mouse
            const dx = mouseX - currentX;
            const dy = mouseY - currentY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            let scale = 1;
            let alpha = dot.opacity;
            let color = '255, 255, 255';

            if (dist < radius) {
                const nav = (1 - dist / radius);
                scale = 1 + nav * 2; // Scale up near mouse
                alpha = dot.opacity + nav * 0.7;
                // Tint red near mouse
                color = this.options.glowColor;
            }

            // Draw Dot with smooth glow
            const gradient = this.ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, dot.size * scale * 2);
            gradient.addColorStop(0, `rgba(${color}, ${alpha})`);
            gradient.addColorStop(0.5, `rgba(${color}, ${alpha * 0.5})`);
            gradient.addColorStop(1, `rgba(${color}, 0)`);
            
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(currentX, currentY, dot.size * scale, 0, Math.PI * 2);
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animateDots());
    }

    createGlobalSpotlight() {
        this.spotlight = document.createElement('div');
        this.spotlight.className = 'global-spotlight fixed pointer-events-none rounded-full z-50 mix-blend-screen opacity-0 transition-opacity duration-300';
        this.spotlight.style.width = '800px';
        this.spotlight.style.height = '800px';
        this.spotlight.style.background = `radial-gradient(circle, 
        rgba(${this.options.glowColor}, 0.15) 0%, 
        rgba(${this.options.glowColor}, 0.05) 30%, 
        transparent 70%)`;
        this.spotlight.style.transform = 'translate(-50%, -50%)';
        document.body.appendChild(this.spotlight);
    }

    initCard(card, index) {
        // Idle Animation
        if (this.options.idleAnimation) {
            const duration = 4 + Math.random() * 3;
            // Larger movement range for background mode to feel like "floating style"
            const moveY = this.options.backgroundMode ? 30 : 10;

            gsap.to(card, {
                y: -moveY - Math.random() * moveY,
                duration: duration,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: Math.random() * 2
            });

            gsap.to(card, {
                rotationX: (Math.random() - 0.5) * 10,
                rotationY: (Math.random() - 0.5) * 10,
                duration: duration * 1.5,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: Math.random() * 2
            });
        }

        // Hover Logic - Disabled in Background Mode
        if (!this.options.backgroundMode) {
            card.addEventListener('mouseenter', () => this.handleCardEnter(card));
            card.addEventListener('mouseleave', () => this.handleCardLeave(card));
            card.addEventListener('mousemove', (e) => this.handleCardMove(e, card));
        }
    }

    handleMouseMove(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;

        if (this.spotlight) {
            gsap.set(this.spotlight, { left: e.clientX, top: e.clientY });

            // Check if near grid (only if not background mode)
            if (!this.options.backgroundMode) {
                const containerRect = this.container.getBoundingClientRect();
                const isNear = (e.clientX > containerRect.left - 100 && e.clientX < containerRect.right + 100 && e.clientY > containerRect.top - 100 && e.clientY < containerRect.bottom + 100);
                gsap.to(this.spotlight, { opacity: isNear ? 1 : 0, duration: 0.5 });

                if (isNear) {
                    this.cards.forEach(card => {
                        const rect = card.getBoundingClientRect();
                        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                    });
                }
            }
        }
    }

    // ... Existing Enter/Leave/Move/Particles methods ...
    handleCardEnter(card) {
        // Premium hover effects with multiple layers
        gsap.to(card, {
            scale: 1.06,
            zIndex: 20,
            boxShadow: `0 30px 80px rgba(${this.options.glowColor}, 0.5), 
                        0 0 40px rgba(${this.options.glowColor}, 0.3) inset,
                        0 0 100px rgba(${this.options.glowColor}, 0.2)`,
            borderColor: `rgba(${this.options.glowColor}, 1)`,
            duration: 0.6,
            ease: 'power3.out'
        });

        // Add premium glow animation
        const glow = document.createElement('div');
        glow.className = 'premium-glow absolute inset-0 rounded-2xl pointer-events-none';
        glow.style.background = `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
            rgba(${this.options.glowColor}, 0.4) 0%, 
            rgba(${this.options.glowColor}, 0.1) 40%, 
            transparent 70%)`;
        glow.style.opacity = '0';
        glow.style.transition = 'opacity 0.6s ease';
        card.appendChild(glow);
        
        setTimeout(() => {
            glow.style.opacity = '1';
        }, 10);

        // Enhanced particle burst
        if (this.options.enableParticles) {
            this.createParticles(card);
            // Additional particle burst after delay
            setTimeout(() => this.createParticles(card), 200);
        }
    }

    handleCardLeave(card) {
        gsap.to(card, {
            scale: 1,
            zIndex: 1,
            boxShadow: 'none',
            borderColor: 'rgba(255,255,255,0.1)',
            rotationX: 0,
            rotationY: 0,
            duration: 0.7,
            ease: 'power2.out'
        });
        
        // Remove premium glow
        const glow = card.querySelector('.premium-glow');
        if (glow) {
            glow.style.opacity = '0';
            setTimeout(() => glow.remove(), 700);
        }
        
        const particles = card.querySelectorAll('.particle');
        particles.forEach(p => p.remove());
    }

    handleCardMove(e, card) {
        // ... existing logic ...
        const rect = card.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = ((y - centerY) / centerY) * -15;
        const rotateY = ((x - centerX) / centerX) * 15;

        gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            transformPerspective: 1000,
            duration: 0.1,
            ease: 'none'
        });
    }

    createParticles(card) {
        // Premium particle burst - more particles with varied effects
        const particleCount = 12;
        for (let i = 0; i < particleCount; i++) {
            const p = document.createElement('div');
            p.className = 'particle absolute rounded-full pointer-events-none';
            const size = Math.random() * 5 + 2;
            p.style.width = size + 'px';
            p.style.height = size + 'px';
            p.style.backgroundColor = `rgb(${this.options.glowColor})`;
            p.style.boxShadow = `0 0 ${size * 3}px rgb(${this.options.glowColor})`;

            const rect = card.getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Particles spawn from center or random position
            const spawnX = Math.random() > 0.5 ? centerX + (Math.random() - 0.5) * rect.width * 0.3 : Math.random() * rect.width;
            const spawnY = Math.random() > 0.5 ? centerY + (Math.random() - 0.5) * rect.height * 0.3 : Math.random() * rect.height;
            
            p.style.left = spawnX + 'px';
            p.style.top = spawnY + 'px';

            card.appendChild(p);

            // Enhanced animation with rotation and scale
            const angle = (Math.PI * 2 * i) / particleCount;
            const distance = 80 + Math.random() * 60;
            const targetX = Math.cos(angle) * distance;
            const targetY = Math.sin(angle) * distance;

            gsap.fromTo(p,
                { scale: 0, opacity: 0, rotation: 0 },
                {
                    scale: 1.5,
                    opacity: 1,
                    rotation: 360,
                    duration: 0.4,
                    ease: 'back.out(2)',
                    onComplete: () => {
                        gsap.to(p, {
                            x: targetX,
                            y: targetY,
                            scale: 0,
                            opacity: 0,
                            rotation: 720,
                            duration: 1.2 + Math.random() * 0.5,
                            ease: 'power2.out',
                            onComplete: () => p.remove()
                        });
                    }
                }
            );
        }
    }
}
