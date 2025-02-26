import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { SplitText } from 'gsap/SplitText';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Physics2DPlugin } from 'gsap/Physics2DPlugin';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

// Import our animation modules
import { initSerpentineAnimation, initSplitScreenScroll, initRotatingStar } from './serpentine';
import { initHorizontalSections } from './horizontalSections';
// Import other animations as needed
// import { setupStatsAnimations } from './StatsAnimations';
// import { setupHorizontalSections } from './horizontalSections';

// =============================================
// IMPORTANT: This is the ONLY place where GSAP plugins should be registered
// All other files should import ScrollTrigger from here and NOT register it again
// =============================================
gsap.registerPlugin(
  ScrollTrigger,
  DrawSVGPlugin,
  SplitText,
  MotionPathPlugin,
  Physics2DPlugin,
  ScrollSmoother
);

/**
 * Initialize ScrollTrigger properly
 * This function should be called after the DOM is fully loaded
 * It ensures all ScrollTrigger instances are properly set up
 */
export function initScrollTrigger() {
  console.log('Initializing ScrollTrigger...');
  
  // Clear any existing ScrollTrigger instances to prevent conflicts
  ScrollTrigger.getAll().forEach(st => st.kill());
  gsap.globalTimeline.clear();
  
  // Set defaults for ScrollTrigger if needed
  // ScrollTrigger.defaults({ markers: false });
  
  // Create ScrollSmoother if needed
  const smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 2,
    smoothTouch: 0.1,
    effects: true,
    normalizeScroll: true,
    ignoreMobileResize: true
  });
  
  // Set ScrollTrigger defaults to use the smoother
  ScrollTrigger.defaults({
    scroller: "#smooth-content",
    markers: {
      startColor: "green",
      endColor: "red",
      fontSize: "12px"
    }
  });
  
  // Add a delayed refresh to ensure all ScrollTriggers are properly initialized
  setTimeout(() => {
    console.log('Performing delayed ScrollTrigger refresh...');
    ScrollTrigger.refresh(true);
  }, 1000);
  
  console.log('ScrollTrigger initialized');
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Initializing animations from main.ts...');
  
  // Initialize ScrollTrigger first
  initScrollTrigger();
  
  // Initialize animations in the correct order (top to bottom of page)
  console.log('Initializing serpentine animation...');
  initSerpentineAnimation();
  console.log('Initializing split screen scroll...');
  initSplitScreenScroll();
  console.log('Initializing rotating star...');
  initRotatingStar();
  console.log('Initializing horizontal sections...');
  initHorizontalSections();
  
  // Initialize other animations as needed
  // setupStatsAnimations();
  
  // Log all ScrollTrigger instances for debugging
  console.log('All ScrollTrigger instances:', ScrollTrigger.getAll().map(st => st.vars.id || 'unnamed'));
  
  console.log('All animations initialized from main.ts');
}); 