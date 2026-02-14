/**
 * ElectricBorder - Vanilla JS implementation
 * Creates an animated electric/chaotic border effect using canvas
 */
export class ElectricBorder {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            color: options.color || '#ff0033',
            speed: options.speed || 1,
            chaos: options.chaos || 0.12,
            borderRadius: options.borderRadius || 24,
            borderOffset: options.borderOffset || 60,
            displacement: options.displacement || 60,
            ...options
        };

        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
        this.time = 0;
        this.lastFrameTime = 0;
        this.resizeObserver = null;

        this.init();
    }

    init() {
        // Create canvas wrapper
        const canvasContainer = document.createElement('div');
        canvasContainer.className = 'eb-canvas-container';
        canvasContainer.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 2;
        `;

        // Create canvas
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'eb-canvas';
        this.canvas.style.display = 'block';
        this.ctx = this.canvas.getContext('2d');

        canvasContainer.appendChild(this.canvas);
        this.container.appendChild(canvasContainer);

        // Create glow layers
        this.createGlowLayers();

        // Set container styles
        this.container.style.position = 'relative';
        this.container.style.isolation = 'isolate';
        this.container.style.overflow = 'visible';

        // Setup resize observer
        this.resizeObserver = new ResizeObserver(() => this.updateSize());
        this.resizeObserver.observe(this.container);

        // Initial size update
        this.updateSize();

        // Start animation
        this.start();
    }

    createGlowLayers() {
        const layersContainer = document.createElement('div');
        layersContainer.className = 'eb-layers';
        layersContainer.style.cssText = `
            position: absolute;
            inset: 0;
            border-radius: inherit;
            pointer-events: none;
            z-index: 0;
        `;

        // Glow 1 - Sharp inner glow
        const glow1 = document.createElement('div');
        glow1.className = 'eb-glow-1';
        glow1.style.cssText = `
            position: absolute;
            inset: 0;
            border-radius: inherit;
            pointer-events: none;
            box-sizing: border-box;
            border: 2px solid ${this.options.color}99;
            filter: blur(1px);
        `;

        // Glow 2 - Soft outer glow
        const glow2 = document.createElement('div');
        glow2.className = 'eb-glow-2';
        glow2.style.cssText = `
            position: absolute;
            inset: 0;
            border-radius: inherit;
            pointer-events: none;
            box-sizing: border-box;
            border: 2px solid ${this.options.color};
            filter: blur(4px);
        `;

        // Background glow
        const bgGlow = document.createElement('div');
        bgGlow.className = 'eb-background-glow';
        bgGlow.style.cssText = `
            position: absolute;
            inset: 0;
            border-radius: inherit;
            pointer-events: none;
            z-index: -1;
            transform: scale(1.1);
            filter: blur(32px);
            opacity: 0.3;
            background: linear-gradient(-30deg, ${this.options.color}, transparent, ${this.options.color});
        `;

        layersContainer.appendChild(glow1);
        layersContainer.appendChild(glow2);
        layersContainer.appendChild(bgGlow);
        this.container.appendChild(layersContainer);
    }

    updateSize() {
        const rect = this.container.getBoundingClientRect();
        const width = rect.width + this.options.borderOffset * 2;
        const height = rect.height + this.options.borderOffset * 2;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        this.canvas.width = width * dpr;
        this.canvas.height = height * dpr;
        this.canvas.style.width = `${width}px`;
        this.canvas.style.height = `${height}px`;
        this.ctx.scale(dpr, dpr);

        this.width = width;
        this.height = height;
    }

    // Noise functions
    random(x) {
        return (Math.sin(x * 12.9898) * 43758.5453) % 1;
    }

    noise2D(x, y) {
        const i = Math.floor(x);
        const j = Math.floor(y);
        const fx = x - i;
        const fy = y - j;

        const a = this.random(i + j * 57);
        const b = this.random(i + 1 + j * 57);
        const c = this.random(i + (j + 1) * 57);
        const d = this.random(i + 1 + (j + 1) * 57);

        const ux = fx * fx * (3.0 - 2.0 * fx);
        const uy = fy * fy * (3.0 - 2.0 * fy);

        return a * (1 - ux) * (1 - uy) + b * ux * (1 - uy) + c * (1 - ux) * uy + d * ux * uy;
    }

    octavedNoise(x, octaves, lacunarity, gain, baseAmplitude, baseFrequency, time, seed, baseFlatness) {
        let y = 0;
        let amplitude = baseAmplitude;
        let frequency = baseFrequency;

        for (let i = 0; i < octaves; i++) {
            let octaveAmplitude = amplitude;
            if (i === 0) {
                octaveAmplitude *= baseFlatness;
            }
            y += octaveAmplitude * this.noise2D(frequency * x + seed * 100, time * frequency * 0.3);
            frequency *= lacunarity;
            amplitude *= gain;
        }

        return y;
    }

    getCornerPoint(centerX, centerY, radius, startAngle, arcLength, progress) {
        const angle = startAngle + progress * arcLength;
        return {
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle)
        };
    }

    getRoundedRectPoint(t, left, top, width, height, radius) {
        const straightWidth = width - 2 * radius;
        const straightHeight = height - 2 * radius;
        const cornerArc = (Math.PI * radius) / 2;
        const totalPerimeter = 2 * straightWidth + 2 * straightHeight + 4 * cornerArc;
        const distance = t * totalPerimeter;

        let accumulated = 0;

        // Top edge
        if (distance <= accumulated + straightWidth) {
            const progress = (distance - accumulated) / straightWidth;
            return { x: left + radius + progress * straightWidth, y: top };
        }
        accumulated += straightWidth;

        // Top-right corner
        if (distance <= accumulated + cornerArc) {
            const progress = (distance - accumulated) / cornerArc;
            return this.getCornerPoint(left + width - radius, top + radius, radius, -Math.PI / 2, Math.PI / 2, progress);
        }
        accumulated += cornerArc;

        // Right edge
        if (distance <= accumulated + straightHeight) {
            const progress = (distance - accumulated) / straightHeight;
            return { x: left + width, y: top + radius + progress * straightHeight };
        }
        accumulated += straightHeight;

        // Bottom-right corner
        if (distance <= accumulated + cornerArc) {
            const progress = (distance - accumulated) / cornerArc;
            return this.getCornerPoint(left + width - radius, top + height - radius, radius, 0, Math.PI / 2, progress);
        }
        accumulated += cornerArc;

        // Bottom edge
        if (distance <= accumulated + straightWidth) {
            const progress = (distance - accumulated) / straightWidth;
            return { x: left + width - radius - progress * straightWidth, y: top + height };
        }
        accumulated += straightWidth;

        // Bottom-left corner
        if (distance <= accumulated + cornerArc) {
            const progress = (distance - accumulated) / cornerArc;
            return this.getCornerPoint(left + radius, top + height - radius, radius, Math.PI / 2, Math.PI / 2, progress);
        }
        accumulated += cornerArc;

        // Left edge
        if (distance <= accumulated + straightHeight) {
            const progress = (distance - accumulated) / straightHeight;
            return { x: left, y: top + height - radius - progress * straightHeight };
        }
        accumulated += straightHeight;

        // Top-left corner
        const progress = (distance - accumulated) / cornerArc;
        return this.getCornerPoint(left + radius, top + radius, radius, Math.PI, Math.PI / 2, progress);
    }

    drawElectricBorder(currentTime) {
        if (!this.canvas || !this.ctx) return;

        const deltaTime = (currentTime - this.lastFrameTime) / 1000;
        this.time += deltaTime * this.options.speed;
        this.lastFrameTime = currentTime;

        // Clear canvas
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.scale(dpr, dpr);

        this.ctx.strokeStyle = this.options.color;
        this.ctx.lineWidth = 1;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';

        const scale = this.options.displacement;
        const left = this.options.borderOffset;
        const top = this.options.borderOffset;
        const borderWidth = this.width - 2 * this.options.borderOffset;
        const borderHeight = this.height - 2 * this.options.borderOffset;
        const maxRadius = Math.min(borderWidth, borderHeight) / 2;
        const radius = Math.min(this.options.borderRadius, maxRadius);

        const approximatePerimeter = 2 * (borderWidth + borderHeight) + 2 * Math.PI * radius;
        const sampleCount = Math.floor(approximatePerimeter / 2);

        const octaves = 10;
        const lacunarity = 1.6;
        const gain = 0.7;
        const amplitude = this.options.chaos;
        const frequency = 10;
        const baseFlatness = 0;

        this.ctx.beginPath();

        for (let i = 0; i <= sampleCount; i++) {
            const progress = i / sampleCount;
            const point = this.getRoundedRectPoint(progress, left, top, borderWidth, borderHeight, radius);

            const xNoise = this.octavedNoise(
                progress * 8,
                octaves,
                lacunarity,
                gain,
                amplitude,
                frequency,
                this.time,
                0,
                baseFlatness
            );

            const yNoise = this.octavedNoise(
                progress * 8,
                octaves,
                lacunarity,
                gain,
                amplitude,
                frequency,
                this.time,
                1,
                baseFlatness
            );

            const displacedX = point.x + xNoise * scale;
            const displacedY = point.y + yNoise * scale;

            if (i === 0) {
                this.ctx.moveTo(displacedX, displacedY);
            } else {
                this.ctx.lineTo(displacedX, displacedY);
            }
        }

        this.ctx.closePath();
        this.ctx.stroke();

        this.animationId = requestAnimationFrame((time) => this.drawElectricBorder(time));
    }

    start() {
        if (!this.animationId) {
            this.animationId = requestAnimationFrame((time) => this.drawElectricBorder(time));
        }
    }

    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    destroy() {
        this.stop();
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
        if (this.canvas && this.canvas.parentElement) {
            this.canvas.parentElement.remove();
        }
        const layers = this.container.querySelector('.eb-layers');
        if (layers) {
            layers.remove();
        }
    }
}
