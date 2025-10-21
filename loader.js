// ====== ENHANCED LOADING SCREEN CONTROLLER ======
class LoaderController {
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
    
    this.loadingTexts = [
      'Loading Experience...',
      'Preparing Portfolio...',
      'Almost There...',
      'Getting Ready...'
    ];
    this.textIndex = 0;
    
    this.init();
  }

  init() {
    // Prevent scrolling during load
    document.body.style.overflow = 'hidden';
    
    // Hide main content initially
    const main = document.getElementById('main');
    if (main) {
      main.style.opacity = '0';
      main.style.visibility = 'hidden';
    }
    
    // Start loading sequence
    this.detectResources();
    this.simulateLoading();
    this.monitorPageLoad();
    this.animateProgress();
    this.startTextRotation();
    this.animateLetters();
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

    // Add main scripts and stylesheets
    this.resources.push(...document.querySelectorAll('link[rel="stylesheet"]'));
    this.resources.push(...document.querySelectorAll('script[src]'));
    
    // If no resources to load, set minimum time
    if (this.resources.length === 0) {
      this.targetProgress = 50;
    }
  }

  onResourceLoad() {
    this.loadedResources++;
    const resourceProgress = (this.loadedResources / this.resources.length) * 70;
    this.targetProgress = Math.min(90, resourceProgress);
  }

  simulateLoading() {
    // Smooth loading simulation with realistic timing
    const loadingSteps = [
      { progress: 20, delay: 100 },
      { progress: 35, delay: 300 },
      { progress: 50, delay: 500 },
      { progress: 65, delay: 700 },
      { progress: 80, delay: 900 }
    ];

    loadingSteps.forEach(step => {
      setTimeout(() => {
        if (!this.isComplete && this.targetProgress < step.progress) {
          this.targetProgress = step.progress;
        }
      }, step.delay);
    });
  }

  monitorPageLoad() {
    const checkLoadComplete = () => {
      const state = document.readyState;
      
      if (state === 'interactive') {
        this.targetProgress = Math.max(this.targetProgress, 70);
      }
      
      if (state === 'complete') {
        // Minimum loading time for smooth experience
        setTimeout(() => {
          this.completeLoading();
        }, 800);
      } else {
        setTimeout(checkLoadComplete, 50);
      }
    };

    if (document.readyState === 'complete') {
      setTimeout(() => {
        this.completeLoading();
      }, 800);
    } else {
      window.addEventListener('load', () => {
        setTimeout(() => {
          this.completeLoading();
        }, 600);
      });
      checkLoadComplete();
    }
  }

  animateProgress() {
    const animate = () => {
      if (!this.isComplete) {
        // Ultra-smooth easing
        const ease = 0.08;
        this.progress += (this.targetProgress - this.progress) * ease;
        
        // Update UI
        this.updateProgressBar(Math.floor(this.progress));
        
        requestAnimationFrame(animate);
      }
    };
    
    animate();
  }

  updateProgressBar(percent) {
    if (this.loaderProgress) {
      this.loaderProgress.style.width = `${percent}%`;
    }
    
    if (this.loaderPercentage) {
      this.loaderPercentage.textContent = `${percent}%`;
    }
  }

  startTextRotation() {
    if (!this.loaderText) return;
    
    this.textInterval = setInterval(() => {
      if (this.isComplete) {
        clearInterval(this.textInterval);
        return;
      }
      
      this.textIndex = (this.textIndex + 1) % this.loadingTexts.length;
      
      // Fade out
      this.loaderText.style.opacity = '0';
      this.loaderText.style.transform = 'translateY(10px)';
      
      setTimeout(() => {
        this.loaderText.textContent = this.loadingTexts[this.textIndex];
        // Fade in
        this.loaderText.style.opacity = '1';
        this.loaderText.style.transform = 'translateY(0)';
      }, 300);
    }, 2500);
  }

  animateLetters() {
    const letters = document.querySelectorAll('.loader-letter');
    letters.forEach((letter, index) => {
      setTimeout(() => {
        letter.style.opacity = '1';
        letter.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }

  completeLoading() {
    if (this.isComplete) return;
    
    this.isComplete = true;
    this.targetProgress = 100;
    
    // Clear text interval
    if (this.textInterval) {
      clearInterval(this.textInterval);
    }
    
    // Final loading text
    if (this.loaderText) {
      this.loaderText.textContent = 'Welcome!';
    }
    
    // Animate to 100% with perfect easing
    const finalAnimation = () => {
      this.progress += (100 - this.progress) * 0.12;
      this.updateProgressBar(Math.floor(this.progress));
      
      if (this.progress < 99.8) {
        requestAnimationFrame(finalAnimation);
      } else {
        this.updateProgressBar(100);
        setTimeout(() => this.hideLoader(), 400);
      }
    };
    
    finalAnimation();
  }

  hideLoader() {
    // Fade out loader with smooth animation
    if (this.loaderWrapper) {
      this.loaderWrapper.classList.add('fade-out');
    }
    
    // Remove loader and show content
    setTimeout(() => {
      if (this.loaderWrapper) {
        this.loaderWrapper.style.display = 'none';
      }
      
      // Re-enable scrolling
      document.body.style.overflow = '';
      
      // Show main content with staggered fade-in
      const main = document.getElementById('main');
      if (main) {
        main.style.visibility = 'visible';
        main.style.transition = 'opacity 0.6s ease';
        main.style.opacity = '1';
      }
      
      // Trigger page animations
      this.triggerPageAnimations();
    }, 900);
  }

  triggerPageAnimations() {
    // Dispatch custom event for other scripts
    window.dispatchEvent(new CustomEvent('loaderComplete'));
    
    // Small delay to ensure smooth transition
    setTimeout(() => {
      if (typeof firstPageAnim === 'function') {
        firstPageAnim();
      }
    }, 200);
  }
}

// Initialize loader
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new LoaderController();
  });
} else {
  new LoaderController();
}
