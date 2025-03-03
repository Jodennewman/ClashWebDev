import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Declare global window property for TypeScript
declare global {
  interface Window {
    _smoother: any;
  }
}

// Register plugins - only do this once
gsap.registerPlugin(ScrollSmoother, ScrollTrigger, ScrollToPlugin);

// Initialize ScrollSmoother when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const smoother = ScrollSmoother.create({
    wrapper: "#vs-smooth-wrapper",
    content: "#vs-smooth-content",
    smooth: 1,
    effects: true,
    normalizeScroll: true
  });

  // Store smoother instance for debugging purposes
  window._smoother = smoother;
  console.log('ScrollSmoother initialized');
});

// Export for use in other files
export { gsap, ScrollSmoother, ScrollTrigger, ScrollToPlugin
 };