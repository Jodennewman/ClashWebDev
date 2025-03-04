import { gsap, initSmoother } from './gsap-setup.js';
import { initAnimations } from './animations.js';
import { renderPricingTable } from './pricingTable.js';
import { renderModulesList } from './modulesList.js';

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', async () => {
  console.log("🚀 DOM fully loaded");
  
  // Initialize Feather icons
  if (window.feather) {
    window.feather.replace();
    console.log("✅ Feather icons replaced");
  }
  
  // Step 1: Initialize the scroll smoother
  await initSmoother();
  
  // Step 2: Initialize content
  await initializeContent();
  
  // Step 3: Initialize animations with a delay to ensure DOM is fully processed
  setTimeout(() => {
    initAnimations()
      .then(() => console.log("✅ All animations initialized"))
      .catch(error => console.error("❌ Animation error:", error));
  }, 500);
});

// Initialize all content (modules and pricing)
async function initializeContent() {
  console.log("📦 Initializing content...");
  
  try {
    // Render modules list first
    await renderModulesList();
    console.log("✅ Modules rendered");
    
    // Then render pricing table
    await renderPricingTable();
    console.log("✅ Pricing table rendered");
    
    return true;
  } catch (error) {
    console.error("❌ Error initializing content:", error);
    return false;
  }
}