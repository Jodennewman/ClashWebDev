import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollSmoother, ScrollTrigger, ScrollToPlugin);




// Export GSAP modules
export { gsap, ScrollTrigger, ScrollSmoother, ScrollToPlugin }; 