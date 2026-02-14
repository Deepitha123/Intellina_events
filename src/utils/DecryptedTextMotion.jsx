export class DecryptedTextMotion {
    constructor(element, options = {}) {
        this.element = element;
        this.originalText = element.dataset.text || element.innerText;
        this.options = {
            speed: options.speed || 50,
            maxIterations: options.maxIterations || 10,
            sequential: options.sequential !== false,
            revealDirection: options.revealDirection || 'start',
            useOriginalCharsOnly: options.useOriginalCharsOnly || false,
            characters: options.characters || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
            animateOn: options.animateOn || 'view',
            encryptedClassName: options.encryptedClassName || 'encrypted-char',
            revealedClassName: options.revealedClassName || 'revealed-char'
        };

        this.revealedIndices = new Set();
        this.interval = null;
        this.isScrambling = false;
        this.currentIteration = 0;
        this.hasAnimated = false;

        this.init();
    }

    init() {
        this.element.setAttribute('aria-label', this.originalText);
        this.render(new Set());
        
        if (this.options.animateOn === 'view' || this.options.animateOn === 'both') {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !this.hasAnimated) {
                        this.hasAnimated = true;
                        this.startScramble();
                    }
                });
            }, { threshold: 0.1 });
            observer.observe(this.element);
        }
    }

    startScramble() {
        if (this.isScrambling) return;
        this.isScrambling = true;
        this.currentIteration = 0;
        this.revealedIndices = new Set();

        if (this.interval) clearInterval(this.interval);

        this.interval = setInterval(() => {
            this.updateState();
        }, this.options.speed);
    }

    updateState() {
        if (this.options.sequential) {
            if (this.revealedIndices.size < this.originalText.length) {
                const nextIndex = this.getNextIndex();
                this.revealedIndices.add(nextIndex);
                this.render(this.revealedIndices);
            } else {
                this.stopScramble();
            }
        } else {
            this.render(this.revealedIndices);
            this.currentIteration++;
            if (this.currentIteration >= this.options.maxIterations) {
                this.revealedIndices = new Set(Array.from({ length: this.originalText.length }, (_, i) => i));
                this.render(this.revealedIndices);
                this.stopScramble();
            }
        }
    }

    stopScramble() {
        clearInterval(this.interval);
        this.isScrambling = false;
    }

    getNextIndex() {
        const textLength = this.originalText.length;
        const size = this.revealedIndices.size;

        if (this.options.revealDirection === 'start') return size;
        if (this.options.revealDirection === 'end') return textLength - 1 - size;

        const middle = Math.floor(textLength / 2);
        const offset = Math.floor(size / 2);
        const nextIndex = size % 2 === 0 ? middle + offset : middle - offset - 1;
        if (nextIndex >= 0 && nextIndex < textLength && !this.revealedIndices.has(nextIndex)) return nextIndex;

        for (let i = 0; i < textLength; i++) {
            if (!this.revealedIndices.has(i)) return i;
        }
        return 0;
    }

    shuffleText(revealedSet) {
        const chars = this.options.characters.split('');
        return this.originalText.split('').map((char, i) => {
            if (char === ' ' || char === '\n') return char;
            if (revealedSet.has(i)) return char;
            return chars[Math.floor(Math.random() * chars.length)];
        }).join('');
    }

    render(revealedSet) {
        const displayText = this.shuffleText(revealedSet);
        const chars = this.originalText.split('');
        const displayChars = displayText.split('');

        this.element.innerHTML = displayChars.map((char, i) => {
            const isRevealed = revealedSet.has(i) || (!this.isScrambling && this.hasAnimated);
            const className = isRevealed ? this.options.revealedClassName : this.options.encryptedClassName;
            return `<span class="${className}" style="display: inline-block; transition: all 0.2s ease-out;">${char}</span>`;
        }).join('');
    }
}
