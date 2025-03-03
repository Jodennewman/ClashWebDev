import { initAnimations, initSmoother } from './animations.js';
import { renderPricingTable } from './pricingTable.js';
import { renderModulesList } from './modulesList.js';
import feather from 'feather-icons';

// Wait for the DOM to be fully loaded before executing any scripts
document.addEventListener('DOMContentLoaded', () => {
  console.log("🚀 DOM fully loaded");
  
  // Initialize the scroll smoother first
  initSmoother();
  
  // Replace Feather icons next
  if (window.feather) {
    window.feather.replace();
    console.log("✅ Feather icons replaced");
  }
  
  // Then initialize modules and the pricing table
  initializeContent()
    .then(() => {
      // Initialize animations after a delay to ensure DOM updates are complete
      setTimeout(() => {
        console.log("⏱️ Delay completed, initializing animations...");
        initAnimations()
          .then(() => {
            console.log("✅ All animations initialized");
          })
          .catch(error => {
            console.error("⚠️ Animation initialization error:", error);
          });
      }, 300); // 300ms delay before initializing animations
    })
    .catch(error => {
      console.error("⚠️ Error initializing content:", error);
    });
});


// Initialize all content (modules and pricing table)
async function initializeContent() {
  console.log("📦 Initializing content...");
  
  // Render modules list first
  try {
    await renderModulesList();
    console.log("✅ Modules rendered");
  } catch (error) {
    console.error("⚠️ Error rendering modules:", error);
  }
  
  // Then render pricing table
  try {
    await renderPricingTable();
    console.log("✅ Pricing table rendered");
  } catch (error) {
    console.error("⚠️ Error rendering pricing table:", error);
  }
  
  return Promise.resolve();
}

/**
 * Sets up smooth scrolling for navigation links
 * @param {Object} smoother - The ScrollSmoother instance
 */
function setupSmoothScrolling(smoother) {
  const navLinks = document.querySelectorAll('nav a, a.hero-cta, a.cta-button');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href');
      if (targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        
        if (targetElement && smoother) {
          smoother.scrollTo(targetElement, true, "top top");
        } else if (targetElement) {
          // Fallback if smoother is not available
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        // External link, navigate normally
        window.location.href = targetId;
      }
    });
  });
} 