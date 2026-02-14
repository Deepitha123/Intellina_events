// Typewriter Effect Utility
export class Typewriter {
    constructor(element, options = {}) {
        this.element = element;
        this.text = options.text || element.dataset.text || element.innerText;
        this.options = {
            speed: options.speed || 50, // Typing speed in ms
            deleteSpeed: options.deleteSpeed || 30,
            pauseTime: options.pauseTime || 1000,
            showCursor: options.showCursor !== false,
            cursorChar: options.cursorChar || '|',
            onComplete: options.onComplete || null
        };

        this.currentIndex = 0;
        this.isDeleting = false;
        this.isComplete = false;
        this.timeout = null;

        this.init();
    }

    init() {
        this.element.innerHTML = '';
        if (this.options.showCursor) {
            this.cursor = document.createElement('span');
            this.cursor.className = 'typewriter-cursor';
            this.cursor.textContent = this.options.cursorChar;
            this.cursor.style.cssText = 'color: #ff0033; animation: blink 1s infinite;';
            this.element.appendChild(this.cursor);
        }
        this.type();
    }

    type() {
        const currentText = this.text.substring(0, this.currentIndex);
        
        // Create text span
        const textSpan = document.createElement('span');
        textSpan.className = 'typewriter-text';
        textSpan.textContent = currentText;
        
        // Clear and add text
        this.element.innerHTML = '';
        this.element.appendChild(textSpan);
        
        if (this.options.showCursor) {
            this.element.appendChild(this.cursor);
        }

        if (!this.isComplete) {
            this.currentIndex++;
            
            if (this.currentIndex > this.text.length) {
                this.isComplete = true;
                if (this.options.onComplete) {
                    this.options.onComplete();
                }
                // Keep cursor blinking
                return;
            }

            this.timeout = setTimeout(() => this.type(), this.options.speed);
        }
    }

    destroy() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    }
}
