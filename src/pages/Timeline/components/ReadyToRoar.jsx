import { animate } from 'motion';

export function renderReadyToRoar() {
    return `
    <div id="ready-to-roar-page" class="fixed inset-0 flex flex-col items-center justify-center bg-[#050505] z-50 overflow-hidden w-full h-screen font-benguiat selection:bg-[#ff0033] selection:text-white">
        <style>
            @font-face {
                font-family: 'Benguiat';
                src: local('ITC Benguiat'), local('Benguiat'), url('https://fonts.cdnfonts.com/s/13969/Benguiat.woff') format('woff');
            }
            
            /* Ultra Premium Text Effects */
            .st-text-glow {
                text-shadow: 0 0 10px rgba(255, 0, 51, 0.5), 0 0 20px rgba(255, 0, 51, 0.3);
            }

            .subtitle-premium {
                 text-shadow: 0 0 15px rgba(255, 0, 51, 0.9), 0 0 30px rgba(255, 0, 51, 0.6), 0 0 50px rgba(255, 0, 51, 0.4);
                 letter-spacing: 0.5em;
            }
            
            .st-cursor {
                display: inline-block;
                width: 2px;
                height: 1.2em;
                background-color: #ff0033;
                animation: st-blink 1s step-end infinite;
                vertical-align: text-bottom;
                margin-left: 2px;
                box-shadow: 0 0 15px #ff0033;
            }
            
            @keyframes st-blink { 50% { opacity: 0; } }

            /* Advanced Glass Box */
            .quote-box {
                background: rgba(10, 10, 10, 0.7);
                border: 1px solid rgba(255, 255, 255, 0.05);
                box-shadow: 0 20px 50px rgba(0,0,0,0.5);
                backdrop-filter: blur(10px);
                position: relative;
                overflow: hidden;
            }

            /* Running Light Border Effect */
            .box-border-anim {
                position: absolute;
                inset: 0;
                pointer-events: none;
                z-index: 1;
            }
            
            .box-border-anim::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 2px;
                background: linear-gradient(90deg, transparent, #ff0033, transparent);
                animation: anim-top 3s linear infinite;
            }
             .box-border-anim::after {
                content: '';
                position: absolute;
                bottom: 0;
                right: -100%;
                width: 100%;
                height: 2px;
                background: linear-gradient(90deg, transparent, #ff0033, transparent);
                animation: anim-bottom 3s linear infinite;
            }
            .box-border-side {
                position: absolute;
                inset: 0;
                pointer-events: none;
                z-index: 1;
            }
            .box-border-side::before {
                content: '';
                position: absolute;
                top: -100%;
                right: 0;
                width: 2px;
                height: 100%;
                background: linear-gradient(180deg, transparent, #ff0033, transparent);
                animation: anim-right 3s linear infinite;
                animation-delay: 0.75s;
            }
             .box-border-side::after {
                content: '';
                position: absolute;
                bottom: -100%;
                left: 0;
                width: 2px;
                height: 100%;
                background: linear-gradient(180deg, transparent, #ff0033, transparent);
                animation: anim-left 3s linear infinite;
                animation-delay: 0.75s;
            }

            @keyframes anim-top { 0% { left: -100%; } 100% { left: 100%; } }
            @keyframes anim-bottom { 0% { right: -100%; } 100% { right: 100%; } }
            @keyframes anim-right { 0% { top: -100%; } 100% { top: 100%; } }
            @keyframes anim-left { 0% { bottom: -100%; } 100% { bottom: 100%; } }

            /* Corner Accents */
            .corner {
                position: absolute;
                width: 20px;
                height: 20px;
                border: 2px solid #ff0033;
                z-index: 10;
                box-shadow: 0 0 10px rgba(255, 0, 51, 0.5);
                transition: all 0.3s ease;
            }
            .corner-tl { top: -2px; left: -2px; border-right: none; border-bottom: none; }
            .corner-tr { top: -2px; right: -2px; border-left: none; border-bottom: none; }
            .corner-bl { bottom: -2px; left: -2px; border-right: none; border-top: none; }
            .corner-br { bottom: -2px; right: -2px; border-left: none; border-top: none; }
            
            .quote-box:hover .corner {
                width: 30px;
                height: 30px;
                box-shadow: 0 0 20px rgba(255, 0, 51, 0.8);
            }

            /* Cinematic Upside Down Particles */
            .particle-cinematic {
                position: absolute;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                pointer-events: none;
                filter: blur(1px);
                animation: float-up var(--duration) linear infinite;
                opacity: 0;
            }
            @keyframes float-up {
                0% { transform: translateY(100vh) scale(0); opacity: 0; }
                20% { opacity: 0.6; }
                80% { opacity: 0.6; }
                100% { transform: translateY(-10vh) scale(1); opacity: 0; }
            }
            
            .red-glow-spot {
                position: absolute;
                width: 600px;
                height: 600px;
                background: radial-gradient(circle, rgba(255, 0, 51, 0.15) 0%, transparent 70%);
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: -1;
                pointer-events: none;
                animation: pulse-glow 5s ease-in-out infinite;
            }
             @keyframes pulse-glow {
                0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
                50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
            }

            .vignette {
                background: radial-gradient(circle, transparent 40%, #000 100%);
                pointer-events: none;
            }
            
             /* Scanlines for old TV feel */
            .scanlines {
                background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.2));
                background-size: 100% 4px;
                position: absolute;
                inset: 0;
                pointer-events: none;
                z-index: 25;
                opacity: 0.3;
            }
        </style>

        <!-- Environmental Effects -->
        <div class="absolute inset-0 vignette z-10"></div>
        <div class="scanlines"></div>
        <div class="red-glow-spot"></div>
        <div id="particles-container" class="absolute inset-0 z-0 overflow-hidden"></div>

        <!-- Main Content -->
        <div class="relative z-30 w-full max-w-4xl px-8 flex flex-col items-center gap-10">
            
            <!-- Subtitle -->
            <h2 class="text-xl md:text-3xl font-bold uppercase text-[#ff0033] subtitle-premium font-benguiat opacity-0 transform translate-y-4" id="subtitle-text">
                Ready to Roar
            </h2>

            <!-- Premium Box -->
            <div class="quote-box rounded-lg p-10 md:p-14 w-full transform scale-95 opacity-0 transition-transform duration-700 hover:scale-[1.01]" id="quote-container">
                <!-- Box Animations -->
                <div class="box-border-anim"></div>
                <div class="box-border-side"></div>
                <div class="corner corner-tl"></div>
                <div class="corner corner-tr"></div>
                <div class="corner corner-bl"></div>
                <div class="corner corner-br"></div>
                
                <div class="min-h-[140px] flex items-center justify-center text-center relative z-20">
                    <p id="typewriter-content" class="text-xl md:text-2xl lg:text-3xl font-medium leading-loose tracking-wider text-[#e0e0e0] st-text-glow font-serif">
                        <!-- Text will be typed here -->
                    </p>
                </div>
            </div>

            <!-- Optional Decoration Line -->
            <div id="decoration-line" class="h-[1px] w-0 bg-gradient-to-r from-transparent via-[#ff0033] to-transparent mx-auto opacity-0 shadow-[0_0_15px_#ff0033]"></div>
        </div>
    </div>
  `;
}

export function initReadyToRoar(onComplete) {
    const textToType = "Learning has no boundaries- technical or non-technical. Every skill matters, every idea counts, and every effort builds the future.";
    const element = document.getElementById('typewriter-content');
    const decorationLine = document.getElementById('decoration-line');
    const page = document.getElementById('ready-to-roar-page');
    const subtitle = document.getElementById('subtitle-text');
    const quoteContainer = document.getElementById('quote-container');
    const particlesContainer = document.getElementById('particles-container');

    // Create cinematic particles
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle-cinematic');
        const size = Math.random() * 3 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.setProperty('--duration', `${Math.random() * 10 + 5}s`);
        particle.style.animationDelay = `${Math.random() * 5}s`;
        if (particlesContainer) particlesContainer.appendChild(particle);
    }

    let index = 0;
    const typingSpeed = 40;

    // Reveal elements sequence
    animate(subtitle, { opacity: 1, y: 0 }, { duration: 1, easing: "ease-out" });
    animate(quoteContainer, { opacity: 1, scale: 1 }, { duration: 1, delay: 0.4, easing: "ease-out" });

    function typeChar() {
        if (index < textToType.length) {
            const currentText = textToType.substring(0, index + 1);
            element.innerHTML = `${currentText}<span class="st-cursor"></span>`;
            index++;
            const randomSpeed = typingSpeed + (Math.random() * 20 - 10);
            setTimeout(typeChar, randomSpeed);
        } else {
            element.innerHTML = `${textToType}<span class="st-cursor"></span>`;

            animate(decorationLine, { width: ['0%', '50%'], opacity: [0, 1] }, { duration: 1.5, easing: "ease-out" });

            setTimeout(() => {
                animate(subtitle, { opacity: 0, y: -20 }, { duration: 0.8 });
                animate(quoteContainer, { opacity: 0, scale: 0.9 }, { duration: 0.8, delay: 0.1 });
                animate(decorationLine, { width: '0%', opacity: 0 }, { duration: 0.8, delay: 0.2 });
                animate(document.querySelector('.red-glow-spot'), { opacity: 0 }, { duration: 1 });

                setTimeout(() => {
                    animate(page, { opacity: 0 }, { duration: 1.2 }).finished.then(() => {
                        onComplete();
                    });
                }, 1000);
            }, 3800);
        }
    }

    setTimeout(typeChar, 1800);
}
