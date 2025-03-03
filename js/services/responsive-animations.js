"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initResponsiveAnimations = initResponsiveAnimations;
const animation_service_1 = require("./animation-service");
// Debounce function to prevent excessive refreshes
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}
// Set up resize handler
function initResponsiveAnimations() {
    const handleResize = debounce(() => {
        console.log('Window resized, refreshing animations');
        (0, animation_service_1.refreshAnimations)();
    }, 250);
    window.addEventListener('resize', handleResize);
}
