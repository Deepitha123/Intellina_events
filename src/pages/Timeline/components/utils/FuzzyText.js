/**
 * FuzzyText Utility
 * Converts text into an animated, glitchy "fuzzy" canvas effect.
 * Ported from React version provided by user.
 */

export class FuzzyText {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            text: options.text || 'INTELLINA',
            fontSize: options.fontSize || 'clamp(2rem, 10vw, 10rem)',
            fontWeight: options.fontWeight || 900,
            fontFamily: options.fontFamily || 'inherit',
            color: options.color || '#fff',
            enableHover: options.enableHover !== undefined ? options.enableHover : true,
            baseIntensity: options.baseIntensity || 0.18,
            hoverIntensity: options.hoverIntensity || 0.5,
            fuzzRange: options.fuzzRange || 30,
            fps: options.fps || 60,
            direction: options.direction || 'horizontal',
            transitionDuration: options.transitionDuration || 0,
            clickEffect: options.clickEffect || false,
            glitchMode: options.glitchMode || false,
            glitchInterval: options.glitchInterval || 2000,
            glitchDuration: options.glitchDuration || 200,
            gradient: options.gradient || null,
            letterSpacing: options.letterSpacing || 0,
            className: options.className || '',
            ...options
        };

        this.canvas = document.createElement('canvas');
        if (this.options.className) {
            this.canvas.className = this.options.className;
        }
        this.container.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        this.isCancelled = false;
        this.animationFrameId = null;

        this.init();
    }

    async init() {
        const { fontSize, fontWeight, fontFamily, text, letterSpacing, color, gradient, fuzzRange, fps, glitchMode, glitchInterval, glitchDuration, direction, transitionDuration, enableHover, clickEffect, baseIntensity, hoverIntensity } = this.options;

        const computedFontFamily = fontFamily === 'inherit' ? window.getComputedStyle(this.canvas).fontFamily || 'sans-serif' : fontFamily;
        const fontSizeStr = typeof fontSize === 'number' ? `${fontSize}px` : fontSize;
        const fontString = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;

        try {
            await document.fonts.load(fontString);
        } catch {
            await document.fonts.ready;
        }
        if (this.isCancelled) return;

        let numericFontSize;
        if (typeof fontSize === 'number') {
            numericFontSize = fontSize;
        } else {
            const temp = document.createElement('span');
            temp.style.fontSize = fontSize;
            document.body.appendChild(temp);
            const computedSize = window.getComputedStyle(temp).fontSize;
            numericFontSize = parseFloat(computedSize);
            document.body.removeChild(temp);
        }

        const offscreen = document.createElement('canvas');
        const offCtx = offscreen.getContext('2d');
        if (!offCtx) return;

        offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
        offCtx.textBaseline = 'alphabetic';

        let totalWidth = 0;
        if (letterSpacing !== 0) {
            for (const char of text) {
                totalWidth += offCtx.measureText(char).width + letterSpacing;
            }
            totalWidth -= letterSpacing;
        } else {
            totalWidth = offCtx.measureText(text).width;
        }

        const metrics = offCtx.measureText(text);
        const actualLeft = metrics.actualBoundingBoxLeft ?? 0;
        const actualRight = letterSpacing !== 0 ? totalWidth : (metrics.actualBoundingBoxRight ?? metrics.width);
        const actualAscent = metrics.actualBoundingBoxAscent ?? numericFontSize;
        const actualDescent = metrics.actualBoundingBoxDescent ?? numericFontSize * 0.2;

        const textBoundingWidth = Math.ceil(letterSpacing !== 0 ? totalWidth : actualLeft + actualRight);
        const tightHeight = Math.ceil(actualAscent + actualDescent);

        const extraWidthBuffer = 10;
        const offscreenWidth = textBoundingWidth + extraWidthBuffer;

        offscreen.width = offscreenWidth;
        offscreen.height = tightHeight;

        const xOffset = extraWidthBuffer / 2;
        offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
        offCtx.textBaseline = 'alphabetic';

        if (gradient && Array.isArray(gradient) && gradient.length >= 2) {
            const grad = offCtx.createLinearGradient(0, 0, offscreenWidth, 0);
            gradient.forEach((c, i) => grad.addColorStop(i / (gradient.length - 1), c));
            offCtx.fillStyle = grad;
        } else {
            offCtx.fillStyle = color;
        }

        if (letterSpacing !== 0) {
            let xPos = xOffset;
            for (const char of text) {
                offCtx.fillText(char, xPos, actualAscent);
                xPos += offCtx.measureText(char).width + letterSpacing;
            }
        } else {
            offCtx.fillText(text, xOffset - actualLeft, actualAscent);
        }

        const horizontalMargin = fuzzRange + 20;
        const verticalMargin = 0;
        this.canvas.width = offscreenWidth + horizontalMargin * 2;
        this.canvas.height = tightHeight + verticalMargin * 2;
        this.ctx.translate(horizontalMargin, verticalMargin);

        const interactiveLeft = horizontalMargin + xOffset;
        const interactiveTop = verticalMargin;
        const interactiveRight = interactiveLeft + textBoundingWidth;
        const interactiveBottom = interactiveTop + tightHeight;

        this.state = {
            isHovering: false,
            isClicking: false,
            isGlitching: false,
            currentIntensity: baseIntensity,
            targetIntensity: baseIntensity,
            lastFrameTime: 0,
            frameDuration: 1000 / fps
        };

        const startGlitchLoop = () => {
            if (!glitchMode || this.isCancelled) return;
            this.glitchTimeoutId = setTimeout(() => {
                if (this.isCancelled) return;
                this.state.isGlitching = true;
                this.glitchEndTimeoutId = setTimeout(() => {
                    this.state.isGlitching = false;
                    startGlitchLoop();
                }, glitchDuration);
            }, glitchInterval);
        };

        if (glitchMode) startGlitchLoop();

        const run = timestamp => {
            if (this.isCancelled) return;

            if (timestamp - this.state.lastFrameTime < this.state.frameDuration) {
                this.animationFrameId = window.requestAnimationFrame(run);
                return;
            }
            this.state.lastFrameTime = timestamp;

            this.ctx.clearRect(
                -fuzzRange - 20,
                -fuzzRange - 10,
                offscreenWidth + 2 * (fuzzRange + 20),
                tightHeight + 2 * (fuzzRange + 10)
            );

            if (this.state.isClicking) {
                this.state.targetIntensity = 1;
            } else if (this.state.isGlitching) {
                this.state.targetIntensity = 1;
            } else if (this.state.isHovering) {
                this.state.targetIntensity = hoverIntensity;
            } else {
                this.state.targetIntensity = baseIntensity;
            }

            if (transitionDuration > 0) {
                const step = 1 / (transitionDuration / this.state.frameDuration);
                if (this.state.currentIntensity < this.state.targetIntensity) {
                    this.state.currentIntensity = Math.min(this.state.currentIntensity + step, this.state.targetIntensity);
                } else if (this.state.currentIntensity > this.state.targetIntensity) {
                    this.state.currentIntensity = Math.max(this.state.currentIntensity - step, this.state.targetIntensity);
                }
            } else {
                this.state.currentIntensity = this.state.targetIntensity;
            }

            if (direction === 'horizontal') {
                for (let j = 0; j < tightHeight; j++) {
                    const dx = Math.floor(this.state.currentIntensity * (Math.random() - 0.5) * fuzzRange);
                    this.ctx.drawImage(offscreen, 0, j, offscreenWidth, 1, dx, j, offscreenWidth, 1);
                }
            } else if (direction === 'vertical') {
                for (let i = 0; i < offscreenWidth; i++) {
                    const dy = Math.floor(this.state.currentIntensity * (Math.random() - 0.5) * fuzzRange);
                    this.ctx.drawImage(offscreen, i, 0, 1, tightHeight, i, dy, 1, tightHeight);
                }
            } else {
                for (let j = 0; j < tightHeight; j++) {
                    const dx = Math.floor(this.state.currentIntensity * (Math.random() - 0.5) * fuzzRange);
                    this.ctx.drawImage(offscreen, 0, j, offscreenWidth, 1, dx, j, offscreenWidth, 1);
                }
                const tempData = this.ctx.getImageData(0, 0, offscreenWidth + fuzzRange, tightHeight + fuzzRange);
                this.ctx.clearRect(
                    -fuzzRange - 20,
                    -fuzzRange - 10,
                    offscreenWidth + 2 * (fuzzRange + 20),
                    tightHeight + 2 * (fuzzRange + 10)
                );
                this.ctx.putImageData(tempData, 0, 0);
                for (let i = 0; i < offscreenWidth + fuzzRange; i++) {
                    const dy = Math.floor(this.state.currentIntensity * (Math.random() - 0.5) * fuzzRange * 0.5);
                    const colData = this.ctx.getImageData(i, 0, 1, tightHeight + fuzzRange);
                    this.ctx.clearRect(i, -fuzzRange, 1, tightHeight + 2 * fuzzRange);
                    this.ctx.putImageData(colData, i, dy);
                }
            }
            this.animationFrameId = window.requestAnimationFrame(run);
        };

        this.animationFrameId = window.requestAnimationFrame(run);

        const isInsideTextArea = (x, y) => {
            return x >= interactiveLeft && x <= interactiveRight && y >= interactiveTop && y <= interactiveBottom;
        };

        this.handleMouseMove = e => {
            if (!enableHover) return;
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            this.state.isHovering = isInsideTextArea(x, y);
        };

        this.handleMouseLeave = () => {
            this.state.isHovering = false;
        };

        this.handleClick = () => {
            if (!clickEffect) return;
            this.state.isClicking = true;
            clearTimeout(this.clickTimeoutId);
            this.clickTimeoutId = setTimeout(() => {
                this.state.isClicking = false;
            }, 150);
        };

        this.handleTouchMove = e => {
            if (!enableHover) return;
            e.preventDefault();
            const rect = this.canvas.getBoundingClientRect();
            const touch = e.touches[0];
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;
            this.state.isHovering = isInsideTextArea(x, y);
        };

        this.handleTouchEnd = () => {
            this.state.isHovering = false;
        };

        if (enableHover) {
            this.canvas.addEventListener('mousemove', this.handleMouseMove);
            this.canvas.addEventListener('mouseleave', this.handleMouseLeave);
            this.canvas.addEventListener('touchmove', this.handleTouchMove, { passive: false });
            this.canvas.addEventListener('touchend', this.handleTouchEnd);
        }

        if (clickEffect) {
            this.canvas.addEventListener('click', this.handleClick);
        }
    }

    destroy() {
        this.isCancelled = true;
        window.cancelAnimationFrame(this.animationFrameId);
        clearTimeout(this.glitchTimeoutId);
        clearTimeout(this.glitchEndTimeoutId);
        clearTimeout(this.clickTimeoutId);
        if (this.options.enableHover) {
            this.canvas.removeEventListener('mousemove', this.handleMouseMove);
            this.canvas.removeEventListener('mouseleave', this.handleMouseLeave);
            this.canvas.removeEventListener('touchmove', this.handleTouchMove);
            this.canvas.removeEventListener('touchend', this.handleTouchEnd);
        }
        if (this.options.clickEffect) {
            this.canvas.removeEventListener('click', this.handleClick);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}
