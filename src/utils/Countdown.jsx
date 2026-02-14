
export class Countdown {
    constructor(container, targetDate) {
        this.container = container;
        this.targetDate = new Date(targetDate).getTime();
        this.frameId = null;

        this.init();
    }

    init() {
        this.container.innerHTML = `
            <style>
                .st-flip-clock {
                    display: flex;
                    justify-content: center;
                    gap: 1.5rem;
                    font-family: 'Share Tech Mono', sans-serif;
                    transform-style: preserve-3d;
                    perspective: 1000px;
                }

                .st-flip-unit {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.5rem;
                }

                .st-flip-card-wrapper {
                    display: flex;
                    gap: 0.25rem;
                }

                .st-flip-card {
                    position: relative;
                    width: 50px;
                    height: 70px;
                    perspective: 300px;
                }

                .st-flip-card-inner {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(to bottom, #2a2a2a 50%, #202020 50%);
                    border-radius: 6px;
                    font-size: 3rem;
                    color: #e0e0e0;
                    font-weight: bold;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    box-shadow: 
                        0 4px 6px rgba(0,0,0,0.5),
                        inset 0 1px 1px rgba(255,255,255,0.1);
                    overflow: hidden;
                    transform-style: preserve-3d;
                }

                .st-flip-card.flipping .st-flip-card-inner {
                    animation: flip-animation 0.6s cubic-bezier(0.4, 0.0, 0.2, 1);
                }

                @keyframes flip-animation {
                    0% {
                        transform: rotateX(0deg);
                    }
                    100% {
                        transform: rotateX(-180deg);
                    }
                }

                /* Split Line */
                .st-flip-card-inner::after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 0;
                    width: 100%;
                    height: 2px;
                    background: rgba(0,0,0,0.6);
                    transform: translateY(-50%);
                    z-index: 10;
                    box-shadow: 0 1px 0 rgba(255,255,255,0.05);
                }

                /* Red Glow on hover */
                .st-countdown-container:hover .st-flip-card-inner {
                    box-shadow: 
                        0 0 15px rgba(255, 0, 51, 0.3),
                        0 4px 6px rgba(0,0,0,0.5);
                    color: #fff;
                    text-shadow: 0 0 10px rgba(255, 0, 51, 0.6);
                }

                .st-flip-label {
                    color: #ff0033;
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    text-shadow: 0 0 10px rgba(255, 0, 51, 0.4);
                    font-weight: bold;
                    font-family: 'Benguiat', serif;
                }

                .st-separator {
                    font-size: 3rem;
                    color: #ff0033;
                    align-self: flex-start;
                    margin-top: 0.5rem;
                    text-shadow: 0 0 15px rgba(255, 0, 51, 0.6);
                    animation: pulse-sep 2s infinite;
                }

                @keyframes pulse-sep {
                    0%, 100% { opacity: 1; text-shadow: 0 0 15px rgba(255, 0, 51, 0.6); }
                    50% { opacity: 0.5; text-shadow: 0 0 5px rgba(255, 0, 51, 0.3); }
                }

                @media (max-width: 768px) {
                    .st-flip-clock {
                        gap: 0.5rem;
                    }
                    .st-flip-card {
                        width: 30px;
                        height: 45px;
                    }
                    .st-flip-card-inner {
                        font-size: 1.8rem;
                    }
                    .st-flip-label {
                        font-size: 0.6rem;
                        letter-spacing: 1px;
                    }
                    .st-separator {
                        font-size: 1.8rem;
                        margin-top: 0;
                    }
                }
            </style>
            
            <div class="st-flip-clock">
                <!-- Days -->
                <div class="st-flip-unit">
                    <div class="st-flip-card-wrapper">
                        <div class="st-flip-card" id="d1-container">
                            <div class="st-flip-card-inner" id="d1">0</div>
                        </div>
                        <div class="st-flip-card" id="d2-container">
                            <div class="st-flip-card-inner" id="d2">0</div>
                        </div>
                    </div>
                    <div class="st-flip-label">Days</div>
                </div>

                <div class="st-separator">:</div>

                <!-- Hours -->
                <div class="st-flip-unit">
                    <div class="st-flip-card-wrapper">
                        <div class="st-flip-card" id="h1-container">
                            <div class="st-flip-card-inner" id="h1">0</div>
                        </div>
                        <div class="st-flip-card" id="h2-container">
                            <div class="st-flip-card-inner" id="h2">0</div>
                        </div>
                    </div>
                    <div class="st-flip-label">Hours</div>
                </div>

                <div class="st-separator">:</div>

                <!-- Minutes -->
                <div class="st-flip-unit">
                    <div class="st-flip-card-wrapper">
                        <div class="st-flip-card" id="m1-container">
                            <div class="st-flip-card-inner" id="m1">0</div>
                        </div>
                        <div class="st-flip-card" id="m2-container">
                            <div class="st-flip-card-inner" id="m2">0</div>
                        </div>
                    </div>
                    <div class="st-flip-label">Minutes</div>
                </div>

                <div class="st-separator">:</div>

                <!-- Seconds -->
                <div class="st-flip-unit">
                    <div class="st-flip-card-wrapper">
                        <div class="st-flip-card" id="s1-container">
                            <div class="st-flip-card-inner" id="s1">0</div>
                        </div>
                        <div class="st-flip-card" id="s2-container">
                            <div class="st-flip-card-inner" id="s2">0</div>
                        </div>
                    </div>
                    <div class="st-flip-label">Seconds</div>
                </div>
            </div>
        `;

        this.elements = {
            d1: this.container.querySelector('#d1'),
            d2: this.container.querySelector('#d2'),
            h1: this.container.querySelector('#h1'),
            h2: this.container.querySelector('#h2'),
            m1: this.container.querySelector('#m1'),
            m2: this.container.querySelector('#m2'),
            s1: this.container.querySelector('#s1'),
            s2: this.container.querySelector('#s2'),
        };

        this.update();
        this.start();
    }

    update() {
        const now = new Date().getTime();
        const distance = this.targetDate - now;

        if (distance < 0) {
            this.stop();
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        this.updateDigits(days, 'd');
        this.updateDigits(hours, 'h');
        this.updateDigits(minutes, 'm');
        this.updateDigits(seconds, 's');
    }

    updateDigits(value, prefix) {
        const str = String(value).padStart(2, '0');
        const d1 = str[0];
        const d2 = str[1];

        if (this.elements[`${prefix}1`].textContent !== d1) {
            // Trigger flip animation
            const container1 = this.container.querySelector(`#${prefix}1-container`);
            if (container1) {
                container1.classList.add('flipping');
                setTimeout(() => container1.classList.remove('flipping'), 600);
            }
            this.elements[`${prefix}1`].textContent = d1;
        }
        if (this.elements[`${prefix}2`].textContent !== d2) {
            // Trigger flip animation
            const container2 = this.container.querySelector(`#${prefix}2-container`);
            if (container2) {
                container2.classList.add('flipping');
                setTimeout(() => container2.classList.remove('flipping'), 600);
            }
            this.elements[`${prefix}2`].textContent = d2;
        }
    }

    start() {
        this.frameId = setInterval(() => this.update(), 1000);
    }

    stop() {
        if (this.frameId) clearInterval(this.frameId);
    }
}
