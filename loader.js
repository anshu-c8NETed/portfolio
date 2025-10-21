// Loading Screen Controller
class LoaderController {
  constructor() {
    this.loaderWrapper = document.getElementById('loader-wrapper');
    this.loaderProgress = document.querySelector('.loader-progress');
    this.loaderPercentage = document.querySelector('.loader-percentage');
    this.progress = 0;
    this.targetProgress = 0;
    this.isComplete = false;
    
    this.init();
  }

  init() {
    // Prevent scrolling during load
    document.body.style.overflow = 'hidden';
    
    // Hide main content initially
    const main = document.getElementById('main');
    if (main) {
      main.style.opacity = '0';
    }
    
    // Start loading simulation
    this.simulateLoading();
    
    // Monitor actual page load
    this.monitorPageLoad();
    
    // Animate progress bar smoothly
    this.animateProgress();
  }

  simulateLoading() {
    // Faster loading simulation
    const loadingSteps = [
      { progress: 30, delay: 200 },
      { progress: 50, delay: 400 },
      { progress: 70, delay: 600 },
      { progress: 90, delay: 800 }
    ];

    loadingSteps.forEach(step => {
      setTimeout(() => {
        if (!this.isComplete) {
          this.targetProgress = step.progress;
        }
      }, step.delay);
    });
  }

  monitorPageLoad() {
    // Wait for all resources to load
    const checkLoadComplete = () => {
      if (document.readyState === 'complete') {
        // Shorter minimum loading time
        setTimeout(() => {
          this.completeLoading();
        }, 1000);
      } else {
        setTimeout(checkLoadComplete, 100);
      }
    };

    // Start checking
    if (document.readyState === 'complete') {
      setTimeout(() => {
        this.completeLoading();
      }, 1000);
    } else {
      window.addEventListener('load', () => {
        setTimeout(() => {
          this.completeLoading();
        }, 500);
      });
      checkLoadComplete();
    }
  }

  animateProgress() {
    const animate = () => {
      if (!this.isComplete) {
        // Smooth progress animation
        this.progress += (this.targetProgress - this.progress) * 0.1;
        
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

  completeLoading() {
    if (this.isComplete) return;
    
    this.isComplete = true;
    this.targetProgress = 100;
    
    // Animate to 100%
    const finalAnimation = () => {
      this.progress += (100 - this.progress) * 0.15;
      this.updateProgressBar(Math.floor(this.progress));
      
      if (this.progress < 99.5) {
        requestAnimationFrame(finalAnimation);
      } else {
        this.updateProgressBar(100);
        this.hideLoader();
      }
    };
    
    finalAnimation();
  }

  hideLoader() {
    setTimeout(() => {
      // Add fade out class
      if (this.loaderWrapper) {
        this.loaderWrapper.classList.add('fade-out');
      }
      
      // Remove loader after animation
      setTimeout(() => {
        if (this.loaderWrapper) {
          this.loaderWrapper.style.display = 'none';
        }
        
        // Re-enable scrolling
        document.body.style.overflow = '';
        
        // Show main content with smooth transition
        const main = document.getElementById('main');
        if (main) {
          main.style.transition = 'opacity 0.5s ease';
          main.style.opacity = '1';
        }
        
        // Trigger page animations after content is visible
        this.triggerPageAnimations();
      }, 800);
    }, 500);
  }

  triggerPageAnimations() {
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('loaderComplete'));
    
    // Wait for DOM to be ready, then trigger animations
    setTimeout(() => {
      if (typeof firstPageAnim === 'function') {
        firstPageAnim();
      }
    }, 500);
  }
}

// Initialize loader when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new LoaderController();
  });
} else {
  new LoaderController();
}

// Optional: Add loading text variations
const loadingTexts = [
  'Loading Experience...',
  'Preparing Portfolio...',
  'Almost There...',
  'Getting Ready...'
];

let textIndex = 0;
const loaderText = document.querySelector('.loader-text');

if (loaderText) {
  const textInterval = setInterval(() => {
    textIndex = (textIndex + 1) % loadingTexts.length;
    loaderText.style.opacity = '0';
    loaderText.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
      loaderText.textContent = loadingTexts[textIndex];
      loaderText.style.opacity = '1';
    }, 300);
  }, 2000);
  
  // Clear interval when loader completes
  window.addEventListener('loaderComplete', () => {
    clearInterval(textInterval);
  });
}
