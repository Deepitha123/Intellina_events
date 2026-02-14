import React, { useEffect, useRef } from 'react';
import { animate } from 'motion';

const Transition = ({ onComplete }) => {
    const ringsRef = useRef(null);
    const riftRef = useRef(null);
    const particleRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const ringsContainer = ringsRef.current;
        const rift = riftRef.current;
        const particleContainer = particleRef.current;
        const textContainer = textRef.current;

        if (!ringsContainer || !rift || !particleContainer || !textContainer) return;

        // Create rings
        const ringAnimations = [];
        for (let i = 0; i < 5; i++) {
            const size = 100 + i * 200;
            const ring = document.createElement('div');
            ring.className = 'absolute rounded-full border-2 opacity-0';
            ring.style.width = `${size}px`;
            ring.style.height = `${size}px`;
            ring.style.borderColor = i % 2 === 0 ? 'var(--neon-red)' : '#660000';
            ring.style.boxShadow = i % 2 === 0
                ? '0 0 30px rgba(255,0,51,0.1), inset 0 0 30px rgba(255,0,51,0.05)'
                : '0 0 30px rgba(102,0,0,0.1), inset 0 0 30px rgba(102,0,0,0.05)';
            ringsContainer.appendChild(ring);

            const duration = 2 - i * 0.2;
            const delay = i * 0.1;

            const anim = animate(ring, {
                scale: [0, 3],
                opacity: [0.8, 0]
            }, {
                duration: duration,
                delay: delay,
                easing: [0.4, 0, 0.2, 1]
            });
            ringAnimations.push(anim);
        }

        // Animate rift
        const riftAnim = animate(rift, {
            scale: [0, 0.5, 4],
            opacity: [0, 1, 0]
        }, {
            duration: 2,
            delay: 0.1,
            easing: [0.4, 0, 0.2, 1]
        });

        // Create and animate particles
        const particleAnimations = [];
        for (let i = 0; i < 20; i++) {
            const angle = (i * 360) / 20;
            const startRadius = 50;
            const radian = (angle * Math.PI) / 180;

            const particle = document.createElement('div');
            particle.className = 'absolute w-1 h-1 rounded-full bg-white opacity-0';
            particle.style.boxShadow = '0 0 2px white';

            const startX = Math.cos(radian) * startRadius;
            const startY = Math.sin(radian) * startRadius;
            const endX = Math.cos(radian) * 800;
            const endY = Math.sin(radian) * 800;

            particleContainer.appendChild(particle);

            const anim = animate(particle, {
                x: [startX, endX],
                y: [startY, endY],
                opacity: [0, 1, 0]
            }, {
                duration: 2,
                delay: 0.1 + i * 0.05,
                easing: [0.4, 0, 0.2, 1]
            });
            particleAnimations.push(anim);
        }

        // Animate text
        const textAnim = animate(textContainer, {
            opacity: [0, 1, 0]
        }, {
            duration: 1.5,
            delay: 0.5
        });

        // Complete transition
        const timer = setTimeout(() => {
            onComplete();
        }, 2500);

        return () => {
            clearTimeout(timer);
            // Cleanup animations if needed (motion usually cleans up on element removal)
            if (ringsContainer) ringsContainer.innerHTML = '';
            if (particleContainer) particleContainer.innerHTML = '';
        };
    }, [onComplete]);

    return (
        <div id="transition-page" className="fixed inset-0 z-[10000] overflow-hidden bg-black">
            {/* Dimensional tunnel effect */}
            <div id="dimensional-tunnel" className="absolute inset-0 flex items-center justify-center">
                <div id="tunnel-rings" ref={ringsRef} className="absolute inset-0 flex items-center justify-center"></div>

                <div id="center-rift" ref={riftRef} className="absolute w-32 h-32 rounded-full bg-st-red opacity-0"
                    style={{ boxShadow: '0 0 60px rgba(255,0,51,0.8), 0 0 120px rgba(255,0,51,0.3)' }}>
                </div>

                <div id="particle-container" ref={particleRef} className="absolute inset-0 flex items-center justify-center overflow-hidden"></div>
            </div>

            <div id="transitional-text-container" ref={textRef} className="absolute inset-0 flex items-center justify-center opacity-0">
                <p className="text-2xl tracking-[0.5em] text-white flicker font-mono uppercase">
                    Crossing Dimensions...
                </p>
            </div>
        </div>
    );
};

export default Transition;
