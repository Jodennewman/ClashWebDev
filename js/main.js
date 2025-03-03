"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mm = exports.hsl = exports.Matter = exports.Sprite = exports.Graphics = exports.DisplacementFilter = exports.Container = exports.Circle = exports.Assets = exports.Application = void 0;
exports.whenElementExists = whenElementExists;
// src/main.ts (updated)
const animation_service_1 = require("./services/animation-service");
const gsap_setup_1 = require("./utils/gsap-setup");
const Matter = require("matter-js");
exports.Matter = Matter;
const matchMedia = require("./utils/gsapMatchMedia");
exports.mm = matchMedia;
const pixi_js_1 = require("pixi.js");
Object.defineProperty(exports, "Application", { enumerable: true, get: function () { return pixi_js_1.Application; } });
Object.defineProperty(exports, "Assets", { enumerable: true, get: function () { return pixi_js_1.Assets; } });
Object.defineProperty(exports, "Circle", { enumerable: true, get: function () { return pixi_js_1.Circle; } });
Object.defineProperty(exports, "Container", { enumerable: true, get: function () { return pixi_js_1.Container; } });
Object.defineProperty(exports, "DisplacementFilter", { enumerable: true, get: function () { return pixi_js_1.DisplacementFilter; } });
Object.defineProperty(exports, "Graphics", { enumerable: true, get: function () { return pixi_js_1.Graphics; } });
Object.defineProperty(exports, "Sprite", { enumerable: true, get: function () { return pixi_js_1.Sprite; } });
require("./utils/scroll-debug.js");
// Import our animation modules
const ui_interactions_1 = require("./app/ui-interactions");
const Hero_ts_1 = require("./Hero.ts");
const Title_Animation_js_1 = require("./Title-Animation.js");
// Other imports
const heroAnimations_1 = require("./animations/heroAnimations");
// Import these for re-export only
// Import the animation service
console.log('Main module starting');
document.addEventListener('DOMContentLoaded', () => {
    // Enable scrolling on body and HTML
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    // Fix the smooth-content size
    const content = document.getElementById('smooth-content');
    if (content) {
        // Force a minimum height to enable scrolling
        content.style.minHeight = '300vh';
    }
    // Force a ScrollTrigger refresh after a delay
    setTimeout(() => {
        gsap_setup_1.ScrollTrigger.refresh(true);
        console.log("Forced ScrollTrigger refresh");
    }, 1000);
});
// Use a flag to prevent multiple initializations
let hasInitialized = false;
function whenElementExists(selector, callback, maxAttempts = 10) {
    let attempts = 0;
    const interval = setInterval(() => {
        const element = document.querySelector(selector);
        if (element) {
            clearInterval(interval);
            callback(element);
        }
        else if (++attempts >= maxAttempts) {
            clearInterval(interval);
            console.warn(`Element ${selector} not found after ${maxAttempts} attempts`);
        }
    }, 200);
}
var hsl_to_hex_1 = require("hsl-to-hex");
Object.defineProperty(exports, "hsl", { enumerable: true, get: function () { return hsl_to_hex_1.default; } });
/**
 * Initialize ScrollTrigger properly
 * This function should be called after the DOM is fully loaded
 * It ensures all ScrollTrigger instances are properly set up
 */
/*
function initScrollTrigger() {
  console.log('Initializing ScrollTrigger...');
  
  // Clear any existing ScrollTrigger instances to prevent conflicts
  ScrollTrigger.getAll().forEach(st => st.kill());
  gsap.globalTimeline.clear();
  
  // Create ScrollSmoother if needed
  let smoother: ScrollSmoother | null = null;
  try {
    if (document.getElementById('smooth-wrapper') && document.getElementById('smooth-content')) {
      // Use a flag to prevent infinite loops
      let isRefreshing = false;

      smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#vs-smooth-content",
        smooth: 2,
        smoothTouch: 0.1,
        effects: true,
        normalizeScroll: true,
        ignoreMobileResize: true,
        onUpdate: () => {
          if (!isRefreshing) {
            isRefreshing = true;
            ScrollTrigger.refresh();
            setTimeout(() => { isRefreshing = false; }, 100);
          }
        }
      });
      
      // Keep this event listener though
      ScrollTrigger.addEventListener("refresh", () => {
        if (smoother) {
          smoother.refresh();
        }
      });
      
      // Set ScrollTrigger defaults to use the smoother
      ScrollTrigger.defaults({
        scroller: "#smooth-content",
        markers: true,
      });
      
      console.log('ScrollSmoother created successfully');
    } else {
      console.warn('Smooth-wrapper or smooth-content not found, skipping ScrollSmoother creation');
    }
  } catch (e) {
    console.error('Error creating ScrollSmoother:', e);
  }
  
  // Add a delayed refresh to ensure all ScrollTriggers are properly initialized
  setTimeout(() => {
    console.log('Performing delayed ScrollTrigger refresh...');
    ScrollTrigger.refresh(true);
  }, 1000);
  
  return smoother;
}
*/
// In main.ts
function initializeEverything() {
    // Prevent double initialization
    if (hasInitialized) {
        console.log('Already initialized, skipping...');
        return;
    }
    // Add at the top of initializeEverything
    const wrapper = document.getElementById('smooth-wrapper');
    const content = document.getElementById('smooth-content');
    console.log('Scroll containers:', {
        wrapper: wrapper ? true : false,
        content: content ? true : false
    });
    // Check their dimensions
    if (wrapper && content) {
        console.log('Wrapper dimensions:', wrapper.getBoundingClientRect());
        console.log('Content dimensions:', content.getBoundingClientRect());
    }
    hasInitialized = true;
    console.log('Initializing everything...');
    // CRITICAL: Wait for full page load, not just DOMContentLoaded
    if (document.readyState !== 'complete') {
        window.addEventListener('load', initializeEverything);
        return;
    }
    try {
        // 1. Animation system first - this is critical
        (0, animation_service_1.initAnimation)();
        // Wait to ensure ScrollSmoother is ready before adding animations
        setTimeout(() => {
            // 2. Add other components
            (0, ui_interactions_1.initUIInteractions)();
            // 3. Add sections with element existence checks
            whenElementExists('#heroSection', () => {
                console.log('Hero section found, initializing');
                (0, Hero_ts_1.initHero)();
                (0, heroAnimations_1.initBasicAnimations)();
            });
            whenElementExists('#heroTitle', () => {
                console.log('Hero title found, initializing');
                (0, Title_Animation_js_1.initTitleAnimation)();
            });
            // Add the rest of your section initializations with whenElementExists
            // 4. Final refresh after everything is initialized
            setTimeout(animation_service_1.refreshAnimations, 500);
        }, 300);
    }
    catch (e) {
        console.error('Error in initialization:', e);
    }
}
// Use load event instead of DOMContentLoaded
window.addEventListener('load', initializeEverything);
