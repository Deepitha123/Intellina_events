export function initParticles(container) {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.backgroundColor = 'transparent';
  canvas.style.zIndex = '1';
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  const updateSize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  updateSize();

  const config = {
    particleCount: 60,
    particleColor: '#ffffff',
    particleSize: 3,
    particleOpacity: 0.5,
    speed: 1.6,
    repulseDistance: 200,
    pushCount: 4
  };

  const particles = [];
  let animationId;
  const mouse = { x: null, y: null };

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * config.speed;
      this.vy = (Math.random() - 0.5) * config.speed;
      this.size = Math.random() * config.particleSize;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > canvas.width) this.x = Math.random() * canvas.width;
      if (this.y < 0 || this.y > canvas.height) this.y = Math.random() * canvas.height;

      if (mouse.x !== null && mouse.y !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < config.repulseDistance) {
          const force = (config.repulseDistance - distance) / config.repulseDistance;
          this.x += (dx / distance) * force * 5;
          this.y += (dy / distance) * force * 5;
        }
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.beginPath();

      const sides = 5;
      const radius = this.size;
      for (let i = 0; i < sides; i++) {
        const angle = (Math.PI * 2 * i) / sides - Math.PI / 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.closePath();
      ctx.fillStyle = config.particleColor;
      ctx.globalAlpha = config.particleOpacity;
      ctx.fill();
      ctx.restore();
    }
  }

  const initParticlesArray = () => {
    particles.length = 0;
    for (let i = 0; i < config.particleCount; i++) {
      particles.push(new Particle());
    }
  };

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    animationId = requestAnimationFrame(animate);
  };

  const handleResize = () => {
    updateSize();
    initParticlesArray();
  };

  const handleMouseMove = (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  };

  const handleMouseLeave = () => {
    mouse.x = null;
    mouse.y = null;
  };

  // Initialize
  initParticlesArray();
  animate();

  // Event listeners
  window.addEventListener('resize', handleResize);
  container.addEventListener('mousemove', handleMouseMove);
  container.addEventListener('mouseleave', handleMouseLeave);

  // Return cleanup function
  return () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', handleResize);
    container.removeEventListener('mousemove', handleMouseMove);
    container.removeEventListener('mouseleave', handleMouseLeave);
    if (canvas.parentNode) {
      canvas.parentNode.removeChild(canvas);
    }
  };
}
