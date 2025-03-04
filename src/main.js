// main.js
import { gsap, ScrollTrigger, ScrollSmoother } from './gsap-setup.js';
import { initAnimations } from './animations.js';

// Wait for the page to be fully loaded
window.addEventListener('load', () => {
  console.log('Page loaded, initializing animations');
  
  // Create ScrollSmoother
  const smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 2,
    smoothTouch: 0.1,
    effects: true
  });
  
  // Initialize all animations
  initAnimations();
});