import { gsap, ScrollTrigger, ScrollToPlugin } from './gsap-setup';
import { initAnimations } from './animations';
import { renderPricingTable } from './pricingTable';
// Import but don't directly call - animation module handles this
import { renderModulesList } from './modulesList';
import feather from 'feather-icons';


document.addEventListener('DOMContentLoaded', async () => {
  // Initialize feather icons
  feather.replace();
  
  // Render pricing table (this is synchronous)
  renderPricingTable();
  
  // Initialize all animations - this will render modules internally
  await initAnimations();
  
  // Set up navigation scroll behavior
  setupNavigation();
});

function setupNavigation(): void {
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href');
      if (!targetId) return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      window.scrollTo({
        top: targetElement.getBoundingClientRect().top + window.scrollY - 100,
        behavior: 'smooth'
      });
    });
  });
}