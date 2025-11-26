// ====== AGENCY-LEVEL LOADING SCREEN CONTROLLER ======
class EnhancedLoaderController {
  constructor() {
    this.loaderWrapper = document.getElementById('loader-wrapper');
    this.loaderProgress = document.querySelector('.loader-progress');
    this.loaderPercentage = document.querySelector('.loader-percentage');
    this.loaderText = document.querySelector('.loader-text');
    this.progress = 0;
    this.targetProgress = 0;
    this.isComplete = false;
    this.resources = [];
    this.loadedResources = 0;
    
    // Enhanced loading messages
    this.loadingMessages = [
      'Initializing Experience...',
      'Loading Assets...',
      'Preparing Visuals...',
      'Optimizing Performance...',
      'Building Interface...',
      'Almost Ready...',
      'Finalizing...'
    ];
    this.messageIndex = 0;
    
    this.init();
  }

  init() {
    console.log('🚀 Enhanced Loader: Starting...');
    
    // Prevent scrolling during load
    document.body.style.overflow = 'hidden';
    
    // Hide main content initially with better styling
    const main = document.getElementById('main');
    if (main) {
      main.style.opacity = '0';
      main.style.visibility = 'hidden';
      main.style.transform = 'scale(0.95)';
      main.style.filter = 'blur(10px)';
    }
    
    // Initialize particles
    this.createParticles();
    
    // Start loading sequence
    this.detectResources();
    this.simulateRealisticLoading();
    this.monitorPageLoad();
    this.animateProgress();
    this.startMessageSequence();
    this.animateLetters();
    this.addInteractivity();
  }

  // Create animated particle system
  createParticles() {
    const particleContainer = document.querySelector('.loader-particles');
    if (!particleContainer) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle-orb';
      
      // Random starting position
      const startX = Math.random() * window.innerWidth;
      const startY = Math.random() * window.innerHeight;
      
      // Random movement
      const moveX = (Math.random() - 0.5) * 400;
      const moveY = (Math.random() - 0.5) * 400;
      
      particle.style.left = startX + 'px';
      particle.style.top = startY + 'px';
      particle.style.setProperty('--tx', moveX + 'px');
      particle.style.setProperty('--ty', moveY + 'px');
      particle.style.animationDelay = Math.random() * 5 + 's';
      particle.style.animationDuration = (5 + Math.random() * 5) + 's';
      
      particleContainer.appendChild(particle);
    }
    
    console.log('✨ Enhanced Loader: Particles created');
  }

  // Detect all resources to load
  detectResources() {
    // Get all images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (img.complete) {
        this.loadedResources++;
      } else {
        this.resources.push(img);
        img.addEventListener('load', () => this.onResourceLoad());
        img.addEventListener('error', () => this.onResourceLoad());
      }
    });

    // Add stylesheets and scripts
    this.resources.push(...document.querySelectorAll('link[rel="stylesheet"]'));
    this.resources.push(...document.querySelectorAll('script[src]'));
    
    console.log(`📦 Enhanced Loader: Tracking ${this.resources.length} resources`);
  }

  onResourceLoad() {
    this.loadedResources++;
    const resourceProgress = (this.loadedResources / Math.max(this.resources.length, 1)) * 60;
    this.targetProgress = Math.min(85, Math.max(this.targetProgress, resourceProgress));
    
    console.log(`📥 Enhanced Loader: ${this.loadedResources}/${this.resources.length} resources loaded`);
  }

  // Realistic loading simulation with variable speeds
  simulateRealisticLoading() {
    const stages = [
      { progress: 15, delay: 100, message: 0 },
      { progress: 28, delay: 300, message: 1 },
      { progress: 42, delay: 600, message: 2 },
      { progress: 58, delay: 900, message: 3 },
      { progress: 73, delay: 1200, message: 4 },
      { progress: 88, delay: 1500, message: 5 }
    ];

    stages.forEach(stage => {
      setTimeout(() => {
        if (!this.isComplete && this.targetProgress < stage.progress) {
          this.targetProgress = stage.progress;
          this.updateMessage(stage.message);
        }
      }, stage.delay);
    });
  }

  monitorPageLoad() {
    const checkLoadComplete = () => {
      const state = document.readyState;
      
      if (state === 'interactive') {
        this.targetProgress = Math.max(this.targetProgress, 70);
        this.updateMessage(4);
      }
      
      if (state === 'complete') {
        setTimeout(() => {
          this.completeLoading();
        }, 600);
      } else {
        setTimeout(checkLoadComplete, 100);
      }
    };

    if (document.readyState === 'complete') {
      setTimeout(() => {
        this.completeLoading();
      }, 600);
    } else {
      window.addEventListener('load', () => {
        setTimeout(() => {
          this.completeLoading();
        }, 400);
      });
      checkLoadComplete();
    }
  }

  // Ultra-smooth progress animation with easing
  animateProgress() {
    let lastTime = Date.now();
    
    const animate = () => {
      if (!this.isComplete) {
        const currentTime = Date.now();
        const deltaTime = (currentTime - lastTime) / 1000;
        lastTime = currentTime;
        
        // Advanced easing with momentum
        const ease = 0.06;
        const diff = this.targetProgress - this.progress;
        this.progress += diff * ease * (deltaTime * 60);
        
        // Update UI
        this.updateProgressBar(Math.floor(this.progress));
        
        requestAnimationFrame(animate);
      }
    };
    
    animate();
  }

  updateProgressBar(percent) {
    // Clamp between 0 and 100
    percent = Math.min(100, Math.max(0, percent));
    
    if (this.loaderProgress) {
      this.loaderProgress.style.width = `${percent}%`;
    }
    
    if (this.loaderPercentage) {
      this.loaderPercentage.textContent = `${percent}%`;
      this.loaderPercentage.setAttribute('data-percent', `${percent}%`);
    }
  }

  // Message sequence with smooth transitions
  updateMessage(index) {
    if (!this.loaderText || index >= this.loadingMessages.length) return;
    
    // Fade out
    this.loaderText.style.opacity = '0';
    this.loaderText.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
      this.loaderText.textContent = this.loadingMessages[index];
      // Fade in
      this.loaderText.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      this.loaderText.style.opacity = '1';
      this.loaderText.style.transform = 'translateY(0)';
    }, 400);
  }

  startMessageSequence() {
    this.updateMessage(0);
  }

  // Animate logo letters with stagger
  animateLetters() {
    const letters = document.querySelectorAll('.loader-letter');
    letters.forEach((letter, index) => {
      letter.setAttribute('data-text', letter.textContent);
      
      setTimeout(() => {
        letter.style.opacity = '1';
        letter.style.transform = 'translateY(0) rotateX(0deg) scale(1)';
      }, index * 150);
    });
  }

  // Add interactive effects
  addInteractivity() {
    // Mouse move parallax effect
    document.addEventListener('mousemove', (e) => {
      if (this.isComplete) return;
      
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      
      const logo = document.querySelector('.loader-logo');
      if (logo) {
        logo.style.transform = `translate(${x}px, ${y}px)`;
      }
    });
  }

  completeLoading() {
    if (this.isComplete) return;
    
    console.log('✅ Enhanced Loader: Loading complete!');
    
    this.isComplete = true;
    this.targetProgress = 100;
    
    // Final message
    this.updateMessage(6);
    
    // Animate to 100% smoothly
    const finalAnimation = () => {
      this.progress += (100 - this.progress) * 0.15;
      this.updateProgressBar(Math.floor(this.progress));
      
      if (this.progress < 99.5) {
        requestAnimationFrame(finalAnimation);
      } else {
        this.updateProgressBar(100);
        setTimeout(() => this.hideLoader(), 500);
      }
    };
    
    finalAnimation();
  }

  hideLoader() {
    console.log('🎬 Enhanced Loader: Starting exit animation...');
    
    // Apply fade out class
    if (this.loaderWrapper) {
      this.loaderWrapper.classList.add('fade-out');
    }
    
    // Remove loader and reveal content with stagger
    setTimeout(() => {
      if (this.loaderWrapper) {
        this.loaderWrapper.style.display = 'none';
      }
      
      // Re-enable scrolling
      document.body.style.overflow = '';
      
      // Reveal main content with smooth animation
      const main = document.getElementById('main');
      if (main) {
        main.style.visibility = 'visible';
        main.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
        
        // Staggered reveal
        setTimeout(() => {
          main.style.opacity = '1';
          main.style.transform = 'scale(1)';
          main.style.filter = 'blur(0px)';
        }, 50);
      }
      
      // Trigger page animations
      this.triggerPageAnimations();
      
      console.log('🎉 Enhanced Loader: Complete! Welcome!');
    }, 1000);
  }

  triggerPageAnimations() {
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('loaderComplete'));
    
    // Small delay for smooth transition
    setTimeout(() => {
      if (typeof firstPageAnim === 'function') {
        firstPageAnim();
      }
    }, 300);
  }
}

// Initialize enhanced loader
function initEnhancedLoader() {
  console.log('🎨 Initializing Enhanced Agency Loader...');
  new EnhancedLoaderController();
}

// Start loader immediately
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEnhancedLoader);
} else {
  initEnhancedLoader();
}
