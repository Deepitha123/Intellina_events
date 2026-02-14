import React, { useEffect, useRef } from 'react';
import './ParticleNetworkAnimation.css';

const ParticleNetworkAnimation = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // --- HELPER FUNCTIONS ---
        const getLimitedRandom = (min, max, roundToInteger) => {
            let number = Math.random() * (max - min) + min;
            if (roundToInteger) {
                number = Math.round(number);
            }
            return number;
        };

        const returnRandomArrayitem = (array) => {
            return array[Math.floor(Math.random() * array.length)];
        };

        // --- CLASSES ---

        /**
         * Particle Class
         */
        class Particle {
            constructor(parent, x, y) {
                this.network = parent;
                this.canvas = parent.canvas;
                this.ctx = parent.ctx;
                this.particleColor = returnRandomArrayitem(this.network.options.particleColors);

                // 3D Depth Property (0 = far/fade, 1 = near/bright)
                this.z = Math.random();

                // Size scales with depth
                const baseRadius = getLimitedRandom(1.5, 2.5);
                this.radius = baseRadius * (0.5 + this.z * 0.8);

                this.opacity = 0;
                this.x = x || Math.random() * this.canvas.width;
                this.y = y || Math.random() * this.canvas.height;

                // Velocity scales with depth (parallax effect)
                const baseVelocity = parent.options.velocity;
                this.velocity = {
                    x: (Math.random() - 0.5) * baseVelocity * (0.5 + this.z),
                    y: (Math.random() - 0.5) * baseVelocity * (0.5 + this.z)
                };

                // Flow Field / Wander properties
                this.vector = Math.random() * Math.PI * 2; // Movement angle
                this.speed = baseVelocity * (0.5 + this.z);
                this.wander = 0.05; // Amount it can steer per frame

                // Pulsing Effect
                this.pulseAngle = Math.random() * Math.PI * 2;
                this.pulseSpeed = 0.05 + Math.random() * 0.05;
            }

            update() {
                // Fade in
                if (this.opacity < 1) {
                    this.opacity += 0.01;
                } else {
                    this.opacity = 1;
                }

                // Pulsing
                this.pulseAngle += this.pulseSpeed;
                // Oscillate opacity slightly based on pulse
                const depthOpacity = 0.3 + (this.z * 0.7);
                const pulseVariation = Math.sin(this.pulseAngle) * 0.2;
                this.currentOpacity = Math.max(0.1, Math.min(1, depthOpacity + pulseVariation));

                // Organic Movement (Wander)
                // Randomly steer the vector slightly
                this.vector += (Math.random() - 0.5) * this.wander;

                // Update specific X/Y velocity based on angle
                this.velocity.x = Math.cos(this.vector) * this.speed;
                this.velocity.y = Math.sin(this.vector) * this.speed;


                // Repulse from cursor - Plasma interaction
                if (this.network.interactionParticle) {
                    const mouse = this.network.interactionParticle;
                    const dx = this.x - mouse.x;
                    const dy = this.y - mouse.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const repulseRadius = 180;

                    if (distance < repulseRadius) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (repulseRadius - distance) / repulseRadius;

                        // Push away
                        const directionX = forceDirectionX * force * 5 * (0.5 + this.z);
                        const directionY = forceDirectionY * force * 5 * (0.5 + this.z);

                        this.x += directionX;
                        this.y += directionY;

                        // "Plasma" excitement - near mouse, pulse faster and glow brighter
                        this.currentOpacity = Math.min(1, this.currentOpacity + force * 0.5);
                    }
                }

                // Change dir if outside map - wrap around or bounce
                // Let's bounce for now to keep them on screen
                if (this.x > this.canvas.width + 50 || this.x < -50) {
                    this.vector = Math.PI - this.vector; // Reflect X
                    // Push back in to prevent sticking
                    if (this.x > this.canvas.width) this.x = this.canvas.width;
                    if (this.x < 0) this.x = 0;
                }
                if (this.y > this.canvas.height + 50 || this.y < -50) {
                    this.vector = -this.vector; // Reflect Y
                    if (this.y > this.canvas.height) this.y = this.canvas.height;
                    if (this.y < 0) this.y = 0;
                }

                // Update position
                this.x += this.velocity.x;
                this.y += this.velocity.y;
            }

            draw() {
                this.ctx.beginPath();
                this.ctx.fillStyle = this.particleColor;
                this.ctx.globalAlpha = this.currentOpacity * this.opacity; // Combine fade-in with pulse
                this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);

                // Glow effect
                if (this.z > 0.6) {
                    // Bright neon glow for foreground
                    this.ctx.shadowBlur = 15 * this.z;
                    this.ctx.shadowColor = this.particleColor;
                } else {
                    this.ctx.shadowBlur = 0;
                }

                this.ctx.fill();
                this.ctx.shadowBlur = 0; // Reset
            }
        }

        /**
         * ParticleNetwork Class
         */
        class ParticleNetwork {
            constructor(parent) {
                this.options = {
                    velocity: 0.8, // Slightly slower base speed
                    density: 12000,
                    netLineDistance: 220,
                    netLineColor: 'rgba(229, 9, 20, 1)', // Base color, opacity handled dynamically
                    particleColors: ['#e50914', '#ff4d4d', '#b30710'] // Red variants
                };
                this.canvas = parent.canvas;
                this.ctx = parent.ctx;

                // Track time for packet animations
                this.time = 0;

                this.animationFrame = null;
                this.createIntervalId = null;

                this.init();
            }

            init() {
                this.createParticles(true);
                this.animationFrame = requestAnimationFrame(this.update.bind(this));
                this.bindUiActions();
            }

            createParticles(isInitial) {
                this.particles = [];
                const quantity = this.canvas.width * this.canvas.height / this.options.density;

                if (isInitial) {
                    let counter = 0;
                    if (this.createIntervalId) clearInterval(this.createIntervalId);

                    this.createIntervalId = setInterval(() => {
                        if (counter < quantity - 1) {
                            this.particles.push(new Particle(this));
                        } else {
                            clearInterval(this.createIntervalId);
                        }
                        counter++;
                    }, 100); // Faster spawn for smoother start
                } else {
                    for (let i = 0; i < quantity; i++) {
                        this.particles.push(new Particle(this));
                    }
                }
            }

            createInteractionParticle() {
                this.interactionParticle = new Particle(this);
                this.interactionParticle.velocity = { x: 0, y: 0 };
                this.interactionParticle.z = 1; // Mouse is always "front"
                this.particles.push(this.interactionParticle);
                return this.interactionParticle;
            }

            removeInteractionParticle() {
                const index = this.particles.indexOf(this.interactionParticle);
                if (index > -1) {
                    this.interactionParticle = undefined;
                    this.particles.splice(index, 1);
                }
            }

            update() {
                if (this.canvas) {
                    this.time += 0.01; // Increment global time
                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

                    // Draw connections
                    for (let i = 0; i < this.particles.length; i++) {
                        for (let j = this.particles.length - 1; j > i; j--) {
                            const p1 = this.particles[i];
                            const p2 = this.particles[j];

                            // Skip if z-depth difference is too high (don't connect far background to foreground)
                            if (Math.abs(p1.z - p2.z) > 0.3) continue;

                            // Precise check
                            const distance = Math.sqrt(
                                Math.pow(p1.x - p2.x, 2) +
                                Math.pow(p1.y - p2.y, 2)
                            );

                            // Max distance scales with average depth (closer particles connect further)
                            const avgZ = (p1.z + p2.z) / 2;
                            const maxDist = this.options.netLineDistance * (0.5 + avgZ);

                            if (distance > maxDist) continue;

                            this.ctx.beginPath();
                            const color = this.options.netLineColor; // Using string replacement for opacity is tricky if hex/rgb.
                            // Assuming hex or rgb, let's just stick to a fixed color ref or parse it effectively.
                            // Simpler: Use netLineColor as base, but control opacity via globalAlpha

                            this.ctx.strokeStyle = '#e50914'; // Hardcoded base red for lines

                            // Opacity based on distance AND depth brightness
                            const distFactor = (maxDist - distance) / maxDist;
                            const depthFactor = 0.1 + (avgZ * 0.6); // Background lines fainter

                            this.ctx.globalAlpha = distFactor * depthFactor * p1.opacity * p2.opacity;
                            this.ctx.lineWidth = 0.5 + (avgZ * 0.5); // Thicker lines in front

                            this.ctx.moveTo(p1.x, p1.y);
                            this.ctx.lineTo(p2.x, p2.y);
                            this.ctx.stroke();

                            // --- DATA PACKET ANIMATION ---
                            // Occasional "packets" flowing along lines
                            // Use a unique hash based on particle indices to decide if/when this line gets a packet
                            const pairId = i * this.particles.length + j;
                            // Speed of packet depends on pairId
                            const packetSpeed = 0.5 + (pairId % 10) * 0.05;
                            const packetProgress = (this.time * packetSpeed + pairId) % 5; // Modulo larger number for spacing

                            // If progress is between 0 and 1, draw the packet along the line
                            if (packetProgress >= 0 && packetProgress <= 1) {
                                const packetX = p1.x + (p2.x - p1.x) * packetProgress;
                                const packetY = p1.y + (p2.y - p1.y) * packetProgress;

                                this.ctx.beginPath();
                                this.ctx.fillStyle = '#ffffff'; // White packet for contrast
                                this.ctx.globalAlpha = 1 * distFactor * depthFactor; // Bright
                                this.ctx.arc(packetX, packetY, 1.5, 0, Math.PI * 2);
                                this.ctx.shadowBlur = 5;
                                this.ctx.shadowColor = '#ffffff';
                                this.ctx.fill();
                                this.ctx.shadowBlur = 0;
                            }
                        }
                    }

                    // Draw particles
                    for (let i = 0; i < this.particles.length; i++) {
                        this.particles[i].update();
                        this.particles[i].draw();
                    }

                    if (this.options.velocity !== 0) {
                        this.animationFrame = requestAnimationFrame(this.update.bind(this));
                    }
                }
            }

            bindUiActions() {
                this.spawnQuantity = 3;
                this.mouseIsDown = false;
                this.touchIsMoving = false;

                this.onMouseMove = (e) => {
                    const rect = this.canvas.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    if (!this.interactionParticle) {
                        this.createInteractionParticle();
                    }
                    this.interactionParticle.x = x;
                    this.interactionParticle.y = y;
                };

                this.onTouchMove = (e) => {
                    e.preventDefault();
                    this.touchIsMoving = true;

                    const rect = this.canvas.getBoundingClientRect();
                    const x = e.changedTouches[0].clientX - rect.left;
                    const y = e.changedTouches[0].clientY - rect.top;

                    if (!this.interactionParticle) {
                        this.createInteractionParticle();
                    }
                    this.interactionParticle.x = x;
                    this.interactionParticle.y = y;
                };

                this.onMouseDown = (e) => {
                    this.mouseIsDown = true;
                    let counter = 0;
                    let quantity = this.spawnQuantity;

                    const intervalId = setInterval(() => {
                        if (this.mouseIsDown) {
                            if (counter === 1) quantity = 1;
                            for (let i = 0; i < quantity; i++) {
                                if (this.interactionParticle) {
                                    this.particles.push(new Particle(this, this.interactionParticle.x, this.interactionParticle.y));
                                }
                            }
                        } else {
                            clearInterval(intervalId);
                        }
                        counter++;
                    }, 50);
                };

                this.onTouchStart = (e) => {
                    e.preventDefault();
                    setTimeout(() => {
                        if (!this.touchIsMoving) {
                            const rect = this.canvas.getBoundingClientRect();
                            const x = e.changedTouches[0].clientX - rect.left;
                            const y = e.changedTouches[0].clientY - rect.top;

                            for (let i = 0; i < this.spawnQuantity; i++) {
                                this.particles.push(new Particle(this, x, y));
                            }
                        }
                    }, 200);
                };

                this.onMouseUp = () => { this.mouseIsDown = false; };
                this.onMouseOut = () => { this.removeInteractionParticle(); };
                this.onTouchEnd = (e) => {
                    e.preventDefault();
                    this.touchIsMoving = false;
                    this.removeInteractionParticle();
                };

                this.canvas.addEventListener('mousemove', this.onMouseMove);
                this.canvas.addEventListener('touchmove', this.onTouchMove);
                this.canvas.addEventListener('mousedown', this.onMouseDown);
                this.canvas.addEventListener('touchstart', this.onTouchStart);
                this.canvas.addEventListener('mouseup', this.onMouseUp);
                this.canvas.addEventListener('mouseout', this.onMouseOut);
                this.canvas.addEventListener('touchend', this.onTouchEnd);
            }

            unbindUiActions() {
                if (this.canvas) {
                    this.canvas.removeEventListener('mousemove', this.onMouseMove);
                    this.canvas.removeEventListener('touchmove', this.onTouchMove);
                    this.canvas.removeEventListener('mousedown', this.onMouseDown);
                    this.canvas.removeEventListener('touchstart', this.onTouchStart);
                    this.canvas.removeEventListener('mouseup', this.onMouseUp);
                    this.canvas.removeEventListener('mouseout', this.onMouseOut);
                    this.canvas.removeEventListener('touchend', this.onTouchEnd);
                }
            }

            destroy() {
                if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
                if (this.createIntervalId) clearInterval(this.createIntervalId);
                this.unbindUiActions();
            }
        }

        // --- INITIALIZATION ---
        const canvas = document.createElement('canvas');
        container.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        const sizeCanvas = () => {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
        };
        sizeCanvas();

        const particleNetwork = new ParticleNetwork({
            canvas: canvas,
            ctx: ctx,
            options: {}
        });

        const handleResize = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            sizeCanvas();
            particleNetwork.createParticles(false);
        };

        window.addEventListener('resize', handleResize);

        // --- CLEANUP ---
        return () => {
            window.removeEventListener('resize', handleResize);
            particleNetwork.destroy();
            if (container.contains(canvas)) {
                container.removeChild(canvas);
            }
        };

    }, []);

    return (
        <div className="particle-network-animation" ref={containerRef}>
            <div className="glow glow-1"></div>
            <div className="glow glow-2"></div>
            <div className="glow glow-3"></div>
        </div>
    );
};

export default ParticleNetworkAnimation;
