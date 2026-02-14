
import { animate } from 'motion';

export function renderLoader() {
  return `
    <style>
        /* Enhanced vignette */
        #loader-page::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.9) 100%);
        pointer-events: none;
        z-index: 1;
        }

        /* Film grain */
        #loader-page::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
        pointer-events: none;
        animation: grain 0.3s steps(3) infinite;
        z-index: 2;
        }

        @keyframes grain {
        0%, 100% { transform: translate(0, 0); }
        10% { transform: translate(-1%, -1%); }
        20% { transform: translate(1%, 1%); }
        30% { transform: translate(-2%, 0%); }
        40% { transform: translate(2%, -2%); }
        50% { transform: translate(-1%, 2%); }
        60% { transform: translate(1%, -1%); }
        70% { transform: translate(0%, 1%); }
        80% { transform: translate(-2%, -1%); }
        90% { transform: translate(2%, 1%); }
        }

        .loader-container {
        position: relative;
        z-index: 3;
        text-align: center;
        margin-top: 2rem;
        }

        /* Portal enhancement */
        .portal {
        width: 200px; /* Reduced size */
        height: 200px;
        margin: 0 auto 30px;
        position: relative;
        border-radius: 50%;
        background: radial-gradient(circle, #1a0505 0%, #0a0a0a 70%);
        box-shadow: 
            inset 0 0 50px rgba(139, 0, 0, 0.5),
            0 0 80px rgba(139, 0, 0, 0.3),
            0 0 100px rgba(139, 0, 0, 0.1);
        }

        /* Enhanced rings */
        .ring {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        border: 2px solid;
        border-color: #8b0000 transparent #8b0000 transparent;
        animation: rotate 4s linear infinite;
        }

        .ring:nth-child(1) {
        width: 180px;
        height: 180px;
        animation-duration: 3s;
        border-width: 1px;
        opacity: 0.7;
        box-shadow: 0 0 20px rgba(139, 0, 0, 0.3);
        }

        .ring:nth-child(2) {
        width: 150px;
        height: 150px;
        animation-duration: 4s;
        animation-direction: reverse;
        border-width: 1.5px;
        opacity: 0.6;
        box-shadow: 0 0 15px rgba(139, 0, 0, 0.4);
        }

        .ring:nth-child(3) {
        width: 120px;
        height: 120px;
        animation-duration: 5s;
        border-width: 1px;
        opacity: 0.5;
        }

        .ring:nth-child(4) {
        width: 90px;
        height: 90px;
        animation-duration: 3.5s;
        animation-direction: reverse;
        border-width: 2px;
        opacity: 0.8;
        box-shadow: 0 0 25px rgba(139, 0, 0, 0.5);
        }

        .ring:nth-child(5) {
        width: 60px;
        height: 60px;
        animation-duration: 2.8s;
        border-width: 1.5px;
        opacity: 0.6;
        }

        @keyframes rotate {
        from { transform: translate(-50%, -50%) rotate(0deg); }
        to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        /* Enhanced core */
        .core {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 40px;
        height: 40px;
        background: radial-gradient(circle, #ff1744 0%, #8b0000 60%, transparent 100%);
        border-radius: 50%;
        animation: pulse 2s ease-in-out infinite;
        box-shadow: 
            0 0 30px rgba(255, 23, 68, 0.7),
            0 0 60px rgba(139, 0, 0, 0.5),
            inset 0 0 10px rgba(255, 23, 68, 0.3);
        }

        @keyframes pulse {
        0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.9;
        }
        50% {
            transform: translate(-50%, -50%) scale(1.15);
            opacity: 1;
        }
        }

        /* Enhanced particles */
        .particle-custom {
        position: absolute;
        background: #ff1744;
        border-radius: 50%;
        pointer-events: none;
        animation: float-particle 3s infinite;
        box-shadow: 0 0 15px rgba(255, 23, 68, 0.9);
        }

        .particle-custom:nth-child(6) { width: 4px; height: 4px; top: 15%; left: 25%; animation-delay: 0s; }
        .particle-custom:nth-child(7) { width: 3px; height: 3px; top: 35%; left: 75%; animation-delay: 0.6s; }
        .particle-custom:nth-child(8) { width: 5px; height: 5px; top: 55%; left: 15%; animation-delay: 1.2s; }
        .particle-custom:nth-child(9) { width: 3px; height: 3px; top: 75%; left: 65%; animation-delay: 1.8s; }
        .particle-custom:nth-child(10) { width: 4px; height: 4px; top: 25%; left: 85%; animation-delay: 2.4s; }
        .particle-custom:nth-child(11) { width: 2px; height: 2px; top: 45%; left: 40%; animation-delay: 0.3s; }
        .particle-custom:nth-child(12) { width: 3px; height: 3px; top: 65%; left: 90%; animation-delay: 0.9s; }

        @keyframes float-particle {
        0%, 100% {
            transform: translateY(0) scale(0);
            opacity: 0;
        }
        20% {
            opacity: 1;
            transform: translateY(-15px) scale(1);
        }
        80% {
            opacity: 1;
        }
        100% {
            transform: translateY(-120px) scale(0);
            opacity: 0;
        }
        }

        /* Enhanced progress bar */
        .progress-container {
        width: 300px;
        height: 2px;
        background: rgba(139, 0, 0, 0.25);
        margin: 20px auto 15px;
        border-radius: 2px;
        overflow: hidden;
        box-shadow: 
            0 0 15px rgba(139, 0, 0, 0.4),
            inset 0 1px 3px rgba(0, 0, 0, 0.5);
        position: relative;
        }

        .progress-bar {
        height: 100%;
        background: linear-gradient(90deg, #8b0000 0%, #ff1744 50%, #ff4569 75%, #ff1744 100%);
        background-size: 200% 100%;
        width: 0%;
        animation: shimmer 1.5s linear infinite;
        box-shadow: 0 0 20px rgba(255, 23, 68, 0.9);
        transition: width 0.3s ease-out;
        }

        @keyframes shimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
        }

        /* Loading text container */
        .text-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        margin-top: 15px;
        }

        /* Loading text */
        .loading-text {
        color: #8b0000;
        font-size: 12px;
        letter-spacing: 5px;
        text-transform: uppercase;
        font-weight: 400;
        text-shadow: 0 0 25px rgba(139, 0, 0, 0.6);
        animation: flicker-text 3s infinite;
        min-height: 20px;
        }

        @keyframes flicker-text {
        0%, 100% { opacity: 1; }
        41%, 43% { opacity: 0.75; }
        45%, 47% { opacity: 1; }
        50%, 52% { opacity: 0.85; }
        }

        .loading-text span {
        display: none;
        }

        .loading-text span.active {
        display: inline-block;
        animation: fade-in 0.6s ease;
        }

        @keyframes fade-in {
        from {
            opacity: 0;
            transform: translateY(8px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
        }

        /* Enhanced percentage */
        .percentage {
        color: #ff1744;
        font-size: 40px;
        font-weight: 300;
        letter-spacing: 4px;
        font-family: 'Courier New', monospace;
        text-shadow: 
            0 0 40px rgba(255, 23, 68, 0.7),
            0 0 20px rgba(255, 23, 68, 0.5);
        animation: glow-pulse 2s ease-in-out infinite;
        }

        @keyframes glow-pulse {
        0%, 100% {
            text-shadow: 
            0 0 40px rgba(255, 23, 68, 0.7),
            0 0 20px rgba(255, 23, 68, 0.5);
        }
        50% {
            text-shadow: 
            0 0 60px rgba(255, 23, 68, 0.9),
            0 0 30px rgba(255, 23, 68, 0.7);
        }
        }

        /* Subtle scanlines */
        .scanlines {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.1),
            rgba(0, 0, 0, 0.1) 1px,
            transparent 1px,
            transparent 3px
        );
        pointer-events: none;
        z-index: 4;
        opacity: 0.3;
        }
    </style>

    <div id="loader-page" class="fixed inset-0 flex flex-col items-center justify-center bg-[#0a0a0a] z-50 overflow-hidden w-full h-screen font-benguiat">
        <div class="scanlines"></div>
        
        <!-- Main centered content -->
        <div class="flex flex-col items-center justify-center relative z-20">
            
            <!-- Premium Title Section -->
            <div class="flex flex-col items-center justify-center mb-12 transform hover:scale-[1.02] transition-transform duration-700">
                
                <!-- INTELLINA Title with Rich Effects -->
                <h1 class="text-6xl md:text-8xl font-black tracking-widest text-transparent uppercase text-center relative leading-tight mb-4" 
                    style="-webkit-text-stroke: 1px #ff0033; filter: drop-shadow(0 0 20px rgba(255, 0, 51, 0.4)); font-family: 'Benguiat', serif;">
                    INTELLINA
                    <!-- Depth Layers -->
                    <span class="absolute inset-0 text-st-red opacity-10 blur-xl pointer-events-none mix-blend-screen" aria-hidden="true">INTELLINA</span>
                </h1>
                
                 <!-- Tagline -->
                 <p class="text-xs md:text-sm text-st-red/90 tracking-[0.6em] uppercase font-bold text-center border-y border-st-red/20 py-2 px-8 backdrop-blur-sm bg-black/20" 
                    style="box-shadow: 0 0 20px rgba(255,0,51,0.1);">
                    Welcome to the Upside Down
                </p>
            </div>

            <!-- Portal Animation -->
            <div class="loader-container">
                <div class="portal">
                    <div class="ring"></div>
                    <div class="ring"></div>
                    <div class="ring"></div>
                    <div class="ring"></div>
                    <div class="ring"></div>
                    <div class="core"></div>
                    <div class="particle-custom"></div>
                    <div class="particle-custom"></div>
                    <div class="particle-custom"></div>
                    <div class="particle-custom"></div>
                    <div class="particle-custom"></div>
                    <div class="particle-custom"></div>
                    <div class="particle-custom"></div>
                </div>
                
                <div class="progress-container">
                    <div class="progress-bar"></div>
                </div>
                
                <div class="text-container">
                    <div class="percentage text-4xl font-thin tracking-wider text-st-red drop-shadow-[0_0_10px_rgba(255,0,51,0.8)]">0%</div>
                    
                    <p class="loading-text mt-2">
                    <span class="active">Loading Hawkins...</span>
                    <span>Finding Eleven...</span>
                    <span>Upside Down Detected...</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
  `;
}

export function initLoader(onComplete) {
  const messages = document.querySelectorAll('.loading-text span');
  const percentage = document.querySelector('.percentage');
  const progressBar = document.querySelector('.progress-bar');
  const loaderPage = document.getElementById('loader-page');

  let currentIndex = 0;
  let currentPercent = 0;
  let targetPercent = 0;
  let stepIndex = 0;

  // More realistic progress simulation
  const progressSteps = [
    { percent: 33, duration: 1500 }, // Sped up slightly for UX
    { percent: 67, duration: 1500 },
    { percent: 100, duration: 1500 }
  ];

  let interval;

  function updateProgress() {
    if (stepIndex < progressSteps.length) {
      targetPercent = progressSteps[stepIndex].percent;

      // Clear previous interval if any
      if (interval) clearInterval(interval);

      const duration = progressSteps[stepIndex].duration;
      const startPercent = currentPercent;
      const distance = targetPercent - startPercent;
      // Calculate step time based on distance, minimum 20ms
      const stepTime = Math.max(20, duration / distance);

      interval = setInterval(() => {
        if (currentPercent < targetPercent) {
          currentPercent++;
          if (percentage) percentage.textContent = currentPercent + '%';
          if (progressBar) progressBar.style.width = currentPercent + '%';
        } else {
          clearInterval(interval);
          checkCompletion();
        }
      }, stepTime);

      stepIndex++;
    }
  }

  function checkCompletion() {
    if (currentPercent >= 100) {
      setTimeout(() => {
        // Exit animation
        animate(loaderPage, { opacity: 0, scale: 1.1 }, { duration: 0.8, easing: 'ease-in-out' }).finished.then(() => {
          onComplete();
        });
      }, 500);
    }
  }

  // Cycle through messages with progress
  function nextMessage() {
    if (currentIndex < messages.length - 1) {
      messages[currentIndex].classList.remove('active');
      currentIndex++;
      messages[currentIndex].classList.add('active');
      updateProgress();

      setTimeout(nextMessage, 1600); // Slightly offset from progress duration
    }
  }

  // Start the sequence
  updateProgress();
  setTimeout(nextMessage, 1600);
}
