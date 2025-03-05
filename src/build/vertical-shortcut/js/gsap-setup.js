/**
 * GSAP Setup for The Vertical Shortcut
 * 
 * This file handles loading GSAP and its plugins from CDN
 * and initializing ScrollSmoother.
 */

// Load GSAP from CDN
document.addEventListener('DOMContentLoaded', function() {
  // Check if GSAP is already loaded
  if (typeof gsap === 'undefined') {
    console.log('Loading GSAP from CDN...');
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js')
      .then(() => loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/ScrollTrigger.min.js'))
      .then(() => loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/ScrollSmoother.min.js'))
      .then(() => loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/ScrollToPlugin.min.js'))
      .then(() => {
        console.log('✅ GSAP and plugins loaded');
        initGSAP();
      })
      .catch(error => {
        console.error('❌ Error loading GSAP:', error);
      });
  } else {
    console.log('GSAP already loaded, initializing...');
    initGSAP();
  }
});

// Helper function to load scripts
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    
    document.head.appendChild(script);
  });
}

// Initialize GSAP and plugins
function initGSAP() {
  // Register plugins
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);
  
  // Set ScrollTrigger defaults
  ScrollTrigger.defaults({
    markers: false,
    toggleActions: 'play none none reverse'
  });
  
  // Initialize ScrollSmoother
  initSmoother();
  
  // Initialize basic animations
  initBasicAnimations();
}

// Initialize ScrollSmoother
function initSmoother() {
  try {
    const wrapper = document.querySelector('#vs-smooth-wrapper');
    const content = document.querySelector('#vs-smooth-content');
    
    if (!wrapper || !content) {
      console.warn('⚠️ Smooth wrapper or content elements not found');
      return null;
    }
    
    // Create smoother
    const smoother = ScrollSmoother.create({
      wrapper: wrapper,
      content: content,
      smooth: 1.5,
      effects: true
    });
    
    // Store in window for debugging and access from other scripts
    window.smoother = smoother;
    
    console.log('✅ ScrollSmoother initialized');
    return smoother;
  } catch (error) {
    console.error('❌ Error initializing ScrollSmoother:', error);
    return null;
  }
}

// Initialize basic animations
function initBasicAnimations() {
  // Fade in elements with .fade-in class
  gsap.utils.toArray('.fade-in').forEach(element => {
    gsap.from(element, {
      opacity: 0,
      y: 30,
      duration: 1,
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  });
  
  // Stagger animations for lists
  gsap.utils.toArray('.stagger-list').forEach(list => {
    const items = list.querySelectorAll('.stagger-item');
    
    gsap.from(items, {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.8,
      scrollTrigger: {
        trigger: list,
        start: 'top 80%'
      }
    });
  });
}

// Make functions available globally
window.initSmoother = initSmoother;
window.initBasicAnimations = initBasicAnimations; 