import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins once
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

// Set correct ScrollTrigger defaults
ScrollTrigger.defaults({
  scroller: "#vs-smooth-wrapper", // FIXED: This was inconsistent across files
  markers: false,
  toggleActions: 'play none none reverse'
});

// Initialize ScrollSmoother
function initSmoother() {
  console.log('Initializing ScrollSmoother...');
  
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      console.warn('ScrollSmoother initialization timed out');
      resolve(null);
    }, 2000);
    
    try {
      const wrapper = document.querySelector('#vs-smooth-wrapper');
      const content = document.querySelector('#vs-smooth-content');
      
      if (!wrapper || !content) {
        console.warn('Smooth wrapper or content elements not found in DOM');
        clearTimeout(timeout);
        resolve(null);
        return;
      }
      
      // Create the smoother
      const smoother = ScrollSmoother.create({
        wrapper: wrapper,
        content: content,
        smooth: 1.5,
        effects: true
      });
      
      // Store in window for debugging
      window._smoother = smoother;
      
      console.log('ScrollSmoother initialized successfully');
      clearTimeout(timeout);
      resolve(smoother);
    } catch (error) {
      console.error('Error initializing ScrollSmoother:', error);
      clearTimeout(timeout);
      resolve(null);
    }
  });
}

// Export GSAP modules and utilities
export { gsap, ScrollTrigger, ScrollSmoother, ScrollToPlugin, initSmoother };