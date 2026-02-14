import { animate } from 'motion';

export function renderTransition() {
    return `
    <div id="transition-page" class="fixed inset-0 z-50 overflow-hidden bg-[hsl(var(--background))]">
      <!-- Dimensional tunnel effect -->
      <div id="dimensional-tunnel" class="absolute inset-0 flex items-center justify-center">
        <!-- Rings will be injected here -->
        <div id="tunnel-rings" class="absolute inset-0 flex items-center justify-center"></div>
        
        <!-- Center dimensional rift -->
        <div id="center-rift" class="absolute w-32 h-32 rounded-full bg-[hsl(var(--primary))] opacity-0"
             style="box-shadow: 0 0 60px hsl(var(--primary-glow)), 0 0 120px hsl(var(--primary-glow) / 0.3)">
        </div>
        
        <!-- Particles streaming through -->
        <div id="particle-container" class="absolute inset-0 flex items-center justify-center overflow-hidden"></div>
      </div>
      
      <!-- Transitional text -->
      <div id="transitional-text-container" class="absolute inset-0 flex items-center justify-center opacity-0">
        <p class="text-2xl tracking-widest text-[hsl(var(--foreground))] flicker font-['Share_Tech_Mono']">
          CROSSING DIMENSIONS...
        </p>
      </div>
    </div>
  `;
}

export function initTransition(onComplete) {
    const ringsContainer = document.getElementById('tunnel-rings');
    const rift = document.getElementById('center-rift');
    const particleContainer = document.getElementById('particle-container');
    const textContainer = document.getElementById('transitional-text-container');

    // Create rings
    for (let i = 0; i < 5; i++) {
        const size = 100 + i * 200;
        const ring = document.createElement('div');
        ring.className = 'absolute rounded-full border-2 opacity-0';
        ring.style.width = `${size}px`;
        ring.style.height = `${size}px`;
        ring.style.borderColor = i % 2 === 0 ? 'hsl(var(--primary))' : 'hsl(var(--accent))';
        ring.style.boxShadow = i % 2 === 0 
            ? '0 0 30px hsl(var(--primary) / 0.1), inset 0 0 30px hsl(var(--primary) / 0.05)'
            : '0 0 30px hsl(var(--accent) / 0.1), inset 0 0 30px hsl(var(--accent) / 0.05)';
        ringsContainer.appendChild(ring);

        const duration = 2 - i * 0.2;
        const delay = i * 0.1;

        animate(ring, {
            scale: [0, 3],
            opacity: [0.8, 0]
        }, {
            duration: duration,
            delay: delay,
            easing: [0.4, 0, 0.2, 1]
        });
    }

    // Animate rift
    animate(rift, {
        scale: [0, 0.5, 4],
        opacity: [0, 1, 0]
    }, {
        duration: 2,
        delay: 0.1,
        easing: [0.4, 0, 0.2, 1]
    });

    // Create and animate particles
    for (let i = 0; i < 20; i++) {
        const angle = (i * 360) / 20;
        const startRadius = 50;
        const radian = (angle * Math.PI) / 180;
        
        const particle = document.createElement('div');
        particle.className = 'absolute w-1 h-1 rounded-full bg-[hsl(var(--foreground))] opacity-0';
        particle.style.boxShadow = '0 0 2px hsl(var(--foreground))';
        
        const startX = Math.cos(radian) * startRadius;
        const startY = Math.sin(radian) * startRadius;
        const endX = Math.cos(radian) * 800;
        const endY = Math.sin(radian) * 800;

        particleContainer.appendChild(particle);

        animate(particle, {
            x: [startX, endX],
            y: [startY, endY],
            opacity: [0, 1, 0]
        }, {
            duration: 2,
            delay: 0.1 + i * 0.05,
            easing: [0.4, 0, 0.2, 1]
        });
    }

    // Animate text
    animate(textContainer, {
        opacity: [0, 1, 0]
    }, {
        duration: 1.5,
        delay: 0.5
    });

    // Complete transition
    setTimeout(() => {
        const page = document.getElementById('transition-page');
        if (page) {
            animate(page, { opacity: 0 }, { duration: 0.8 }).finished.then(() => {
                onComplete();
            });
        } else {
            onComplete();
        }
    }, 2500);
}



