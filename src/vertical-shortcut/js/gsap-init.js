// gsap-init.js - Import this first before any animation code
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
im


(function() {
  // Check if GSAP is loaded
  if (typeof gsap === 'undefined') {
    console.error('GSAP not loaded! Please ensure GSAP is loaded before this script.');
    return;
  }
  
  // Register essential plugins only once
  gsap.registerPlugin(
    ScrollTrigger,
    DrawSVGPlugin,
    SplitText,
    MotionPathPlugin,
    Physics2DPlugin,
    ScrollSmoother,
    Flip,
    CustomEase,
    EasePack
  );

  // Store initial window size for reference
  window.initialWindowWidth = window.innerWidth;
  window.initialWindowHeight = window.innerHeight;
  
  // Create a global timeline for coordination
  window.mainTimeline = gsap.timeline();
  
  // Initialize ScrollSmoother
  window.addEventListener('DOMContentLoaded', () => {
    // Initialize ScrollSmoother
    window.smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.5,
      effects: true,
      normalizeScroll: true,
      ignoreMobileResize: true
    });
    
    // Initialize ScrollTrigger refresh on resize
    window.addEventListener('resize', () => {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    });
    
    console.log('ScrollSmoother initialized successfully');
  });
  
  // Define useful utilities
  window.utils = {
    mapRange: function(value, min1, max1, min2, max2) {
      return min2 + (max2 - min2) * (value - min1) / (max1 - min1);
    },
    clamp: function(value, min, max) {
      return Math.min(Math.max(value, min), max);
    },
    // Mobile detection
    isMobile: function() {
      return window.innerWidth < 768;
    }
  };
  
  // Log initialization
  console.log('GSAP and plugins initialized successfully');
})(); 