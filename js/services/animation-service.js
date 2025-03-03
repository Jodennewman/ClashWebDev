"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gsap = void 0;
exports.initAnimation = initAnimation;
exports.getSmoother = getSmoother;
exports.refreshAnimations = refreshAnimations;
// src/services/animation-service.ts
const gsap_1 = require("gsap");
Object.defineProperty(exports, "gsap", { enumerable: true, get: function () { return gsap_1.gsap; } });
const gsap_setup_1 = require("../utils/gsap-setup");
// Single instances to reference throughout app
let smoother = null;
let initialized = false;
function initAnimation() {
    if (initialized)
        return;
    console.log('Animation service initializing...');
    // Wait until DOM is fully loaded
    if (document.readyState !== 'complete') {
        console.log('DOM not ready, adding event listener');
        window.addEventListener('load', () => initAnimation());
        return;
    }
    // Check for required elements
    const wrapper = document.getElementById('smooth-wrapper');
    const content = document.getElementById('smooth-content');
    if (!wrapper || !content) {
        console.error('Smooth scrolling elements not found:', { wrapper: !!wrapper, content: !!content });
        return;
    }
    console.log('Creating ScrollSmoother with elements:', { wrapper, content });
    // Clear any existing ScrollTrigger instances
    gsap_setup_1.ScrollTrigger.getAll().forEach(st => st.kill());
    try {
        // Create ScrollSmoother
        smoother = gsap_setup_1.ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 1.5,
            effects: true,
            normalizeScroll: true,
            ignoreMobileResize: true
        });
        // Set default for all ScrollTrigger instances
        gsap_setup_1.ScrollTrigger.defaults({
            scroller: "#smooth-content",
            markers: false // Change to true for debugging
        });
        // Setup refresh coordination
        gsap_setup_1.ScrollTrigger.addEventListener("refresh", () => {
            if (smoother)
                smoother.refresh();
        });
        initialized = true;
        console.log('Animation service initialized, ScrollSmoother created');
        // Force a refresh after a short delay
        setTimeout(() => {
            gsap_setup_1.ScrollTrigger.refresh(true);
            console.log('Forced ScrollTrigger refresh complete');
        }, 200);
    }
    catch (error) {
        console.error('Error creating ScrollSmoother:', error);
    }
}
function getSmoother() {
    return smoother;
}
function refreshAnimations() {
    console.log('Refreshing animations');
    gsap_setup_1.ScrollTrigger.refresh(true);
    if (smoother)
        smoother.refresh();
}
