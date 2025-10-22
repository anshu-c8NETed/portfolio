// Image optimization script
document.addEventListener('DOMContentLoaded', function() {
  // Find all images with loading="lazy"
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  // Set up Intersection Observer to load images only when they're about to enter viewport
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          
          // If image has data-src, use it as the source
          if (lazyImage.dataset.src) {
            lazyImage.src = lazyImage.dataset.src;
          }
          
          // If image has data-srcset, use it as the srcset
          if (lazyImage.dataset.srcset) {
            lazyImage.srcset = lazyImage.dataset.srcset;
          }
          
          // Stop observing the image once it's loaded
          imageObserver.unobserve(lazyImage);
        }
      });
    }, {
      rootMargin: '200px 0px' // Start loading images when they're 200px from entering the viewport
    });
    
    lazyImages.forEach(function(lazyImage) {
      imageObserver.observe(lazyImage);
    });
  } else {
    // Fallback for browsers that don't support Intersection Observer
    // This will load all images immediately
    lazyImages.forEach(function(lazyImage) {
      if (lazyImage.dataset.src) {
        lazyImage.src = lazyImage.dataset.src;
      }
      if (lazyImage.dataset.srcset) {
        lazyImage.srcset = lazyImage.dataset.srcset;
      }
    });
  }
});