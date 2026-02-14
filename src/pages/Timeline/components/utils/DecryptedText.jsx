
export class DecryptedText {
    constructor(element, options = {}) {
        this.element = element;
        this.originalText = element.dataset.text || element.innerText;
        this.options = {
            speed: options.speed || 50,
            maxIterations: options.maxIterations || 10,
            sequential: options.sequential || false,
            revealDirection: options.revealDirection || 'start',
            useOriginalCharsOnly: options.useOriginalCharsOnly || false,
            characters: options.characters || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
            animateOn: options.animateOn || 'hover', // 'hover', 'view', 'both', 'none'
            encryptedClassName: options.encryptedClassName || 'encrypted-char',
            revealedClassName: options.revealedClassName || 'revealed-char'
        };

        this.revealedIndices = new Set();
        this.interval = null;
        this.isHovering = false;
        this.isScrambling = false;
        this.currentIteration = 0;
        this.hasAnimated = false;

        this.init();
    }

    init() {
        // Accessibility
        this.element.setAttribute('aria-label', this.originalText);

        // Initial Render
        this.render(new Set());

        // Event Listeners
        if (this.options.animateOn === 'hover' || this.options.animateOn === 'both') {
            this.element.addEventListener('mouseenter', () => {
                this.isHovering = true;
                this.startScramble();
            });
            this.element.addEventListener('mouseleave', () => {
                this.isHovering = false;
                // If animateOn is just hover, we might want to reset or stop. 
                // For this implementation, we'll let it finish or stop based on logic.
            });
        }

        if (this.options.animateOn === 'view' || this.options.animateOn === 'both') {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !this.hasAnimated) {
                        this.isHovering = true; // Trigger start
                        this.startScramble();
                        this.hasAnimated = true;
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
                this.revealedIndices = new Set(Array.from({ length: this.originalText.length }, (_, i) => i)); // Reveal all
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

        // Center logic simplified
        const middle = Math.floor(textLength / 2);
        const offset = Math.floor(size / 2);
        const nextIndex = size % 2 === 0 ? middle + offset : middle - offset - 1;
        if (nextIndex >= 0 && nextIndex < textLength && !this.revealedIndices.has(nextIndex)) return nextIndex;

        // Fallback
        for (let i = 0; i < textLength; i++) {
            if (!this.revealedIndices.has(i)) return i;
        }
        return 0;
    }

    shuffleText(revealedSet) {
        if (this.options.useOriginalCharsOnly) {
            // Logic to just shuffle original chars (omitted for brevity, using random char set mostly)
            return this.originalText.split('').map((char, i) => {
                if (char === ' ' || char === '\n') return char;
                if (revealedSet.has(i)) return char;
                const available = Array.from(new Set(this.originalText.split(''))).filter(c => c !== ' ');
                return available[Math.floor(Math.random() * available.length)];
            }).join('');
        } else {
            const chars = this.options.characters.split('');
            return this.originalText.split('').map((char, i) => {
                if (char === ' ' || char === '\n') return char;
                if (revealedSet.has(i)) return char;
                return chars[Math.floor(Math.random() * chars.length)];
            }).join('');
        }
    }

    render(revealedSet) {
        const displayText = this.shuffleText(revealedSet);

        // We need to render HTML to style individual characters if needed (class names)
        // But to keep it simple and performant for the "effect", we might just update textContent 
        // OR build a span string. User asked for specific styling classes, so let's build HTML.

        let html = '';
        const chars = this.originalText.split('');
        const displayChars = displayText.split('');

        // Note: shuffleText returns a string, but we want to map over original to preserve structure
        // Actually, displayChars indices map 1:1 to original

        this.element.innerHTML = displayChars.map((char, i) => {
            const isRevealed = revealedSet.has(i) || (!this.isScrambling && !this.isHovering && this.hasAnimated); // Logic tweak
            // If we are finished (maxIterations reached or all revealed), everything is revealed.
            const finalRevealed = isRevealed || (this.currentIteration >= this.options.maxIterations && !this.options.sequential);

            const className = finalRevealed ? this.options.revealedClassName : this.options.encryptedClassName;
            return `<span class="${className}">${char}</span>`;
        }).join('');
    }
}
