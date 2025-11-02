// ====== ADVANCED CUSTOM CURSOR SYSTEM ======
class CustomCursor {
  constructor() {
    this.cursor = null;
    this.glow = null;
    this.trailCanvas = null;
    this.trailCtx = null;
    this.particles = [];
    this.mouse = { x: 0, y: 0 };
    this.cursorPos = { x: 0, y: 0 };
    this.glowPos = { x: 0, y: 0 };
    this.isHovering = false;
    this.init();
  }

  init() {
    console.log('Custom Cursor: Initializing...');
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Create cursor elements
    this.createCursor();
    this.createTrailCanvas();
    this.addEventListeners();
    this.animate();
    
    console.log('Custom Cursor: Initialized successfully');
  }

  createCursor() {
    // Main cursor dot
    this.cursor = document.createElement('div');
    this.cursor.id = 'custom-cursor';
    this.cursor.style.cssText = `
      position: fixed;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: linear-gradient(135deg, #6366f1, #ec4899);
      pointer-events: none;
      z-index: 100000;
      mix-blend-mode: screen;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 20px rgba(99, 102, 241, 0.8);
    `;
    document.body.appendChild(this.cursor);

    // Glow ring
    this.glow = document.createElement('div');
    this.glow.id = 'cursor-glow';
    this.glow.style.cssText = `
      position: fixed;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 2px solid rgba(99, 102, 241, 0.4);
      pointer-events: none;
      z-index: 99999;
      transform: translate(-50%, -50%);
      transition: width 0.3s ease, height 0.3s ease, border-color 0.3s ease;
    `;
    document.body.appendChild(this.glow);
  }

  createTrailCanvas() {
    this.trailCanvas = document.createElement('canvas');
    this.trailCanvas.id = 'cursor-trail';
    this.trailCanvas.width = window.innerWidth;
    this.trailCanvas.height = window.innerHeight;
    this.trailCanvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 99998;
      background: transparent;
    `;
    document.body.appendChild(this.trailCanvas);
    this.trailCtx = this.trailCanvas.getContext('2d', { alpha: true });
  }

  addEventListeners() {
    document.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      
      // Create trail particles
      if (Math.random() > 0.7) {
        this.particles.push({
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 3 + 2,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
          life: 1,
          color: Math.random() > 0.5 ? '#6366f1' : '#ec4899'
        });
      }
    });

    // Wait for DOM to be fully loaded before adding hover listeners
    setTimeout(() => {
      // Hover effects for interactive elements
      const interactiveElements = document.querySelectorAll('a, button, .elem, .skill-card, .menu-btn, .cta-btn, input, textarea');
      
      console.log(`Custom Cursor: Found ${interactiveElements.length} interactive elements`);
      
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
          this.isHovering = true;
          this.cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
          this.cursor.style.background = 'linear-gradient(135deg, #ec4899, #8b5cf6)';
          this.glow.style.width = '60px';
          this.glow.style.height = '60px';
          this.glow.style.borderColor = 'rgba(236, 72, 153, 0.6)';
        });

        el.addEventListener('mouseleave', () => {
          this.isHovering = false;
          this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
          this.cursor.style.background = 'linear-gradient(135deg, #6366f1, #ec4899)';
          this.glow.style.width = '40px';
          this.glow.style.height = '40px';
          this.glow.style.borderColor = 'rgba(99, 102, 241, 0.4)';
        });
      });
    }, 1000); // Wait 1 second for all elements to load

    window.addEventListener('resize', () => {
      this.trailCanvas.width = window.innerWidth;
      this.trailCanvas.height = window.innerHeight;
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // Smooth cursor movement with physics
    const ease = 0.15;
    this.cursorPos.x += (this.mouse.x - this.cursorPos.x) * ease;
    this.cursorPos.y += (this.mouse.y - this.cursorPos.y) * ease;

    const glowEase = 0.1;
    this.glowPos.x += (this.mouse.x - this.glowPos.x) * glowEase;
    this.glowPos.y += (this.mouse.y - this.glowPos.y) * glowEase;

    // Update cursor positions
    this.cursor.style.left = this.cursorPos.x + 'px';
    this.cursor.style.top = this.cursorPos.y + 'px';
    
    this.glow.style.left = this.glowPos.x + 'px';
    this.glow.style.top = this.glowPos.y + 'px';

    // Draw and update trail particles
    this.drawTrail();
  }

  drawTrail() {
    // Fade out effect with transparency
    this.trailCtx.clearRect(0, 0, this.trailCanvas.width, this.trailCanvas.height);
    this.trailCtx.globalCompositeOperation = 'source-over';
    this.trailCtx.fillStyle = 'rgba(10, 10, 10, 0.05)';
    this.trailCtx.fillRect(0, 0, this.trailCanvas.width, this.trailCanvas.height);

    // Update and draw particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      
      p.x += p.speedX;
      p.y += p.speedY;
      p.life -= 0.02;
      p.size *= 0.97;

      if (p.life <= 0 || p.size < 0.5) {
        this.particles.splice(i, 1);
        continue;
      }

      this.trailCtx.beginPath();
      this.trailCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.trailCtx.fillStyle = p.color + Math.floor(p.life * 255).toString(16).padStart(2, '0');
      this.trailCtx.fill();

      // Glow effect
      this.trailCtx.shadowBlur = 15;
      this.trailCtx.shadowColor = p.color;
      this.trailCtx.fill();
      this.trailCtx.shadowBlur = 0;
    }
  }
}

// Initialize custom cursor
function initCustomCursor() {
  if (window.innerWidth > 768) {
    console.log('Custom Cursor: Starting initialization...');
    new CustomCursor();
  } else {
    console.log('Custom Cursor: Skipped (mobile device)');
  }
}

// Wait for loader to complete
if (typeof window !== 'undefined') {
  window.addEventListener('loaderComplete', () => {
    console.log('Custom Cursor: Loader complete, initializing...');
    setTimeout(initCustomCursor, 300);
  });
  
  // Fallback if loader event doesn't fire
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (!document.getElementById('custom-cursor')) {
        console.log('Custom Cursor: Fallback initialization...');
        initCustomCursor();
      }
    }, 2000);
  });
}