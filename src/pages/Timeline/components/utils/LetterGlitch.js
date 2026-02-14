// LetterGlitch Background Effect - Vanilla JS Version
export class LetterGlitch {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            glitchColors: options.glitchColors || ['#ff0033', '#ff3366', '#ff6699', '#ffffff'],
            glitchSpeed: options.glitchSpeed || 50,
            centerVignette: options.centerVignette !== false,
            outerVignette: options.outerVignette || false,
            smooth: options.smooth !== false,
            characters: options.characters || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789'
        };

        this.canvas = null;
        this.ctx = null;
        this.animationRef = null;
        this.letters = [];
        this.grid = { columns: 0, rows: 0 };
        this.lastGlitchTime = Date.now();

        this.fontSize = 16;
        this.charWidth = 10;
        this.charHeight = 20;

        this.init();
    }

    init() {
        // Create canvas
        this.canvas = document.createElement('canvas');
        this.canvas.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: block; z-index: 0;';
        this.container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        // Create vignettes
        if (this.options.outerVignette) {
            const outerVignette = document.createElement('div');
            outerVignette.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1; background: radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,1) 100%);';
            this.container.appendChild(outerVignette);
        }

        if (this.options.centerVignette) {
            const centerVignette = document.createElement('div');
            centerVignette.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1; background: radial-gradient(circle, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 60%);';
            this.container.appendChild(centerVignette);
        }

        this.resizeCanvas();
        this.animate();

        window.addEventListener('resize', () => this.handleResize());
    }

    getRandomChar() {
        const chars = this.options.characters.split('');
        return chars[Math.floor(Math.random() * chars.length)];
    }

    getRandomColor() {
        return this.options.glitchColors[Math.floor(Math.random() * this.options.glitchColors.length)];
    }

    hexToRgb(hex) {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    interpolateColor(start, end, factor) {
        const result = {
            r: Math.round(start.r + (end.r - start.r) * factor),
            g: Math.round(start.g + (end.g - start.g) * factor),
            b: Math.round(start.b + (end.b - start.b) * factor)
        };
        return `rgb(${result.r}, ${result.g}, ${result.b})`;
    }

    calculateGrid(width, height) {
        const columns = Math.ceil(width / this.charWidth);
        const rows = Math.ceil(height / this.charHeight);
        return { columns, rows };
    }

    initializeLetters(columns, rows) {
        this.grid = { columns, rows };
        const totalLetters = columns * rows;
        this.letters = Array.from({ length: totalLetters }, () => ({
            char: this.getRandomChar(),
            color: this.getRandomColor(),
            targetColor: this.getRandomColor(),
            colorProgress: 1
        }));
    }

    resizeCanvas() {
        if (!this.canvas) return;
        const parent = this.container;
        if (!parent) return;

        const dpr = window.devicePixelRatio || 1;
        const rect = parent.getBoundingClientRect();

        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.canvas.style.width = `${rect.width}px`;
        this.canvas.style.height = `${rect.height}px`;

        if (this.ctx) {
            this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        const { columns, rows } = this.calculateGrid(rect.width, rect.height);
        this.initializeLetters(columns, rows);
        this.drawLetters();
    }

    drawLetters() {
        if (!this.ctx || this.letters.length === 0) return;
        
        const rect = this.container.getBoundingClientRect();
        this.ctx.clearRect(0, 0, rect.width, rect.height);
        this.ctx.font = `${this.fontSize}px monospace`;
        this.ctx.textBaseline = 'top';

        this.letters.forEach((letter, index) => {
            const x = (index % this.grid.columns) * this.charWidth;
            const y = Math.floor(index / this.grid.columns) * this.charHeight;
            this.ctx.fillStyle = letter.color;
            this.ctx.fillText(letter.char, x, y);
        });
    }

    updateLetters() {
        if (!this.letters || this.letters.length === 0) return;
        const updateCount = Math.max(1, Math.floor(this.letters.length * 0.02)); // Even smoother updates

        for (let i = 0; i < updateCount; i++) {
            const index = Math.floor(Math.random() * this.letters.length);
            if (!this.letters[index]) continue;

            this.letters[index].char = this.getRandomChar();
            this.letters[index].targetColor = this.getRandomColor();

            if (!this.options.smooth) {
                this.letters[index].color = this.letters[index].targetColor;
                this.letters[index].colorProgress = 1;
            } else {
                this.letters[index].colorProgress = 0;
            }
        }
    }

    handleSmoothTransitions() {
        let needsRedraw = false;
        this.letters.forEach(letter => {
            if (letter.colorProgress < 1) {
                letter.colorProgress += 0.05; // Very smooth transition
                if (letter.colorProgress > 1) letter.colorProgress = 1;

                const startRgb = this.hexToRgb(letter.color);
                const endRgb = this.hexToRgb(letter.targetColor);
                if (startRgb && endRgb) {
                    letter.color = this.interpolateColor(startRgb, endRgb, letter.colorProgress);
                    needsRedraw = true;
                }
            }
        });

        if (needsRedraw) {
            this.drawLetters();
        }
    }

    animate() {
        const now = Date.now();
        if (now - this.lastGlitchTime >= this.options.glitchSpeed) {
            this.updateLetters();
            this.drawLetters();
            this.lastGlitchTime = now;
        }

        if (this.options.smooth) {
            this.handleSmoothTransitions();
        }

        this.animationRef = requestAnimationFrame(() => this.animate());
    }

    handleResize() {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            if (this.animationRef) {
                cancelAnimationFrame(this.animationRef);
            }
            this.resizeCanvas();
            this.animate();
        }, 100);
    }

    destroy() {
        if (this.animationRef) {
            cancelAnimationFrame(this.animationRef);
        }
        window.removeEventListener('resize', this.handleResize);
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}
