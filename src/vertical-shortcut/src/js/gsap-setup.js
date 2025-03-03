import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollSmoother, ScrollTrigger, ScrollToPlugin);

// Variable to store the smoother instance
let smoother;

/**
 * Initialize the ScrollSmoother instance
 * Returns a promise that resolves when the smoother is ready
 */


// Initialize smoother when DOM is loaded


// Export GSAP modules
export { gsap, ScrollTrigger, ScrollSmoother, ScrollToPlugin }; 