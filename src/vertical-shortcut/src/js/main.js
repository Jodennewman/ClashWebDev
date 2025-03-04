/**
 * The Vertical Shortcut - Main Application Script
 * 
 * This file handles the initialization of all site components
 * and coordinates the loading sequence.
 */

// Import required dependencies
import { initAnimations } from './animations.js';
import { renderPricingTable } from './pricingTable.js';
import { renderModulesList } from './modulesList.js';
import { gsap, ScrollTrigger, ScrollSmoother } from './gsap-setup.js';

// Utility function to check if an element exists
function elementExists(selector) {
  return document.querySelector(selector) !== null;
}

// Initialize Feather icons
function initializeIcons() {
  try {
    if (typeof feather !== 'undefined') {
      feather.replace();
      console.log("✅ Feather icons initialized");
      return true;
    } else {
      console.warn("⚠️ Feather icons not available");
      return false;
    }
  } catch (error) {
    console.error("❌ Error initializing icons:", error);
    return false;
  }
}

// Initialize the ScrollSmoother
function initializeSmoother() {
  return new Promise((resolve) => {
    try {
      // Look for both possible wrapper/content pairs
      const wrapper = document.querySelector('#smooth-wrapper') || document.querySelector('#vs-smooth-wrapper');
      const content = document.querySelector('#smooth-content') || document.querySelector('#vs-smooth-content');
      
      if (!wrapper || !content) {
        console.warn("⚠️ Smooth scrolling elements not found in DOM");
        resolve(null);
        return;
      }
      
      // Create the ScrollSmoother instance
      const smoother = ScrollSmoother.create({
        wrapper: wrapper,
        content: content,
        smooth: 1,
        effects: true,
        normalizeScroll: true,
        smoothTouch: 0.1
      });
      
      // Store reference globally for debugging
      window._smoother = smoother;
      console.log("✅ ScrollSmoother initialized");
      resolve(smoother);
      
    } catch (error) {
      console.error("❌ Error initializing ScrollSmoother:", error);
      resolve(null);
    }
  });
}

// Initialize the modules section
function initializeModules() {
  return new Promise((resolve) => {
    try {
      // Check if modules container exists before rendering
      if (elementExists('.modules-container')) {
        renderModulesList();
        console.log("✅ Modules section initialized");
        resolve(true);
      } else {
        console.warn("⚠️ Modules container not found in DOM");
        resolve(false);
      }
    } catch (error) {
      console.error("❌ Error initializing modules section:", error);
      resolve(false);
    }
  });
}

// Initialize the pricing section
function initializePricing() {
  return new Promise((resolve) => {
    try {
      // Check if pricing container exists before rendering
      if (elementExists('.pricing-cards-container')) {
        renderPricingTable();
        console.log("✅ Pricing section initialized");
        resolve(true);
      } else {
        console.warn("⚠️ Pricing container not found in DOM");
        resolve(false);
      }
    } catch (error) {
      console.error("❌ Error initializing pricing section:", error);
      resolve(false);
    }
  });
}

// Initialize smooth scrolling for navigation links
function setupNavigation(smoother) {
  try {
    const navLinks = document.querySelectorAll('nav a, a.hero-cta, a.cta-button');
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        
        // Only handle internal links (starting with #)
        if (targetId && targetId.startsWith('#')) {
          e.preventDefault();
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
            if (smoother) {
              // Use ScrollSmoother if available
              smoother.scrollTo(targetElement, true, "top top");
            } else {
              // Fallback to standard smooth scrolling
              targetElement.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start'
              });
            }
          }
        }
      });
    });
    
    console.log("✅ Navigation initialized");
    return true;
  } catch (error) {
    console.error("❌ Error setting up navigation:", error);
    return false;
  }
}

// Initialize animations with proper error handling
async function initializeAnimations() {
  try {
    console.log("🎬 Starting animations initialization");
    await initAnimations();
    console.log("✅ Animations initialized");
    return true;
  } catch (error) {
    console.error("❌ Error initializing animations:", error);
    // Apply basic animations to ensure minimum visibility
    document.querySelectorAll('section').forEach(section => {
      section.style.opacity = '1';
      section.style.visibility = 'visible';
    });
    return false;
  }
}

// Initialize FAQ accordion functionality
function initFAQAccordion() {
  try {
    const faqItems = document.querySelectorAll('.faq-question');
    if (faqItems.length === 0) {
      console.warn("⚠️ No FAQ items found");
      return false;
    }
    
    faqItems.forEach(question => {
      question.addEventListener('click', () => {
        const item = question.parentElement;
        item.classList.toggle('active');
      });
    });
    
    console.log("✅ FAQ accordion initialized");
    return true;
  } catch (error) {
    console.error("❌ Error initializing FAQ accordion:", error);
    return false;
  }
}

// Main initialization function with proper sequence
async function initializeApplication() {
  console.log("🚀 Starting application initialization");
  
  // Step 1: Initialize icons (doesn't depend on DOM structure)
  initializeIcons();
  
  // Step 2: Initialize ScrollSmoother first
  const smoother = await initializeSmoother();
  
  // Step 3: Initialize content sections in parallel
  await Promise.all([
    initializeModules(),
    initializePricing()
  ]);
  
  // Step 4: Initialize navigation with the smoother reference
  setupNavigation(smoother);
  
  // Step 5: Initialize FAQ accordion
  initFAQAccordion();
  
  // Step 6: Initialize animations last
  // We use a delay to ensure DOM updates are complete
  setTimeout(async () => {
    await initializeAnimations();
    
    // Refresh ScrollTrigger to ensure animations work with updated DOM
    if (ScrollTrigger) {
      ScrollTrigger.refresh();
      console.log("🔄 ScrollTrigger refreshed");
    }
    
    console.log("✅ Application fully initialized");
  }, 500);
}

// Start initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeApplication);

// Export for module usage if needed
export {
  initializeApplication,
  initializeSmoother,
  setupNavigation
};