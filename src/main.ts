import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { SplitText } from 'gsap/SplitText';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Physics2DPlugin } from 'gsap/Physics2DPlugin';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { Flip } from 'gsap/Flip';
import { CustomEase } from 'gsap/CustomEase';
import { EasePack } from 'gsap/EasePack';
import { PixiPlugin } from 'gsap/PixiPlugin';

// Import our animation modules
import { initSerpentineAnimation, initSplitScreenScroll, initRotatingStar } from './serpentine';
import { initHorizontalSections } from './horizontalSections';
import './ourStory.ts';

// Import the whoAreYou module with its named export
import { initWhoAreYouSection } from './whoareyou';
import { initCaseStudies } from './caseStudies';

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
  ScrollSmoother,
  Flip,
  CustomEase,
  EasePack,
  PixiPlugin
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
  
  // Initialize all sections in order from top to bottom of the page
  try {
    console.log('Initializing sections in order...');
    
    // First section animations
    initSerpentineAnimation();
    console.log('Serpentine animation initialized');
    
    // Split screen section
    initSplitScreenScroll();
    console.log('Split screen scroll initialized');
    
    // Who are you section
    initWhoAreYouSection();
    console.log('Who are you section initialized');
    
    // Case studies section
    initCaseStudies();
    console.log('Case studies initialized');
    
    // Other animations
    initRotatingStar();
    initHorizontalSections();
    
    // Final refresh after all sections are initialized
    gsap.delayedCall(0.5, () => {
      ScrollTrigger.refresh(true);
      console.log('Final ScrollTrigger refresh after all initializations');
      
      // Log all active triggers for debugging
      console.log('Active ScrollTrigger instances:', 
        ScrollTrigger.getAll().map(st => ({
          id: st.vars.id,
          trigger: st.trigger?.classList.toString(),
          isActive: st.isActive
        }))
      );
    });
    
  } catch (e: any) {
    console.error('Error in main initialization:', e);
    console.error('Main initialization failed:', e.message);
  }
}); 