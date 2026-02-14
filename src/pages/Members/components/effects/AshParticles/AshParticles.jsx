
import React, { useEffect, useRef } from 'react';

const AshParticles = ({ isActive }) => {
    const canvasRef = useRef(null);
    const particles = useRef([]);
    const mouse = useRef({ x: -1000, y: -1000 });
    const requestRef = useRef();

    useEffect(() => {
        if (!isActive) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width = window.innerWidth;
        let height = window.innerHeight;

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };

        const handleTouchMove = (e) => {
            if (e.touches.length > 0) {
                const rect = canvas.getBoundingClientRect();
                mouse.current = {
                    x: e.touches[0].clientX - rect.left,
                    y: e.touches[0].clientY - rect.top
                };
            }
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove);

        handleResize();

        // Particle Class
        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5; // Drift
                this.vy = Math.random() * 0.5 + 0.5;   // Fall
                this.size = Math.random() * 2 + 2;     // 2-4px
                this.opacity = Math.random() * 0.4 + 0.5; // Increased: 0.5-0.9
                this.color = `rgba(160, 210, 235, ${this.opacity})`; // Light blue tint
                this.glow = Math.random() * 10;
            }

            update() {
                // Gravity / Drift
                this.x += this.vx;
                this.y += this.vy;

                // Mouse Repulsion (Deflection)
                const dx = mouse.current.x - this.x;
                const dy = mouse.current.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Repulsion range (smaller radius for tighter deflection)
                if (dist < 100) {
                    const force = (100 - dist) / 100;
                    // Negative multiplier pushes AWAY from mouse
                    this.vx -= (dx / dist) * force * 0.5;
                    this.vy -= (dy / dist) * force * 0.5;
                }

                // Friction (to stabilize movement for "floating" feel)
                this.vx *= 0.98;
                this.vy *= 0.98;

                // Minimum fall speed (so they don't stop completely)
                if (this.vy < 0.5) this.vy += 0.02;

                // Wrap around
                if (this.y > height) {
                    this.y = -10;
                    this.x = Math.random() * width;
                }
                if (this.x > width) this.x = 0;
                if (this.x < 0) this.x = width;
            }

            draw() {
                ctx.beginPath();
                ctx.globalAlpha = this.opacity;
                ctx.shadowBlur = this.glow;
                ctx.shadowColor = "rgba(160, 210, 235, 0.5)";
                ctx.fillStyle = this.color;
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1;
                ctx.shadowBlur = 0;
            }
        }

        // Init Particles
        const particleCount = Math.min(width * 0.1, 150); // Responsive count
        for (let i = 0; i < particleCount; i++) {
            particles.current.push(new Particle());
        }

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            particles.current.forEach(p => {
                p.update();
                p.draw();
            });

            requestRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            cancelAnimationFrame(requestRef.current);
            particles.current = []; // Clear
        };
    }, [isActive]);

    if (!isActive) return null;

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 15 // Behind content but visible
            }}
        />
    );
};

export default AshParticles;
