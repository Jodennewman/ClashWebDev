/**
 * Module List Renderer for The Vertical Shortcut
 */

// Sample modules list for The Vertical Shortcut
const modules = [
  {
    id: 1,
    title: "Finding Your Niche",
    category: "Strategy",
    description: "Discover how to identify a profitable vertical that aligns with your skills and passion.",
    icon: "compass",
    founderOnly: false,
    mustWatch: true
  },
  {
    id: 2,
    title: "Content Planning",
    category: "Content",
    description: "Learn how to create a sustainable content plan that drives engagement and growth.",
    icon: "calendar",
    founderOnly: false,
    mustWatch: false
  },
  {
    id: 3,
    title: "Viral Video Framework",
    category: "Content",
    description: "Master the proven formula for creating videos that get millions of views organically.",
    icon: "trending-up",
    founderOnly: false,
    mustWatch: true
  },
  {
    id: 4,
    title: "Audience Building",
    category: "Growth",
    description: "Develop strategies to grow and nurture a loyal audience that converts.",
    icon: "users",
    founderOnly: false,
    mustWatch: false
  },
  {
    id: 5,
    title: "Monetization Mastery",
    category: "Business",
    description: "Explore multiple revenue streams beyond just brand deals and affiliate marketing.",
    icon: "dollar-sign",
    founderOnly: true,
    mustWatch: false
  },
  {
    id: 6,
    title: "Advanced Analytics",
    category: "Strategy",
    description: "Use data to optimize your content strategy and drive higher conversion rates.",
    icon: "bar-chart",
    founderOnly: true,
    mustWatch: false
  }
];

/**
 * Renders the modules list using the course module data
 */
function renderModules() {
  const modulesContainer = document.querySelector('.modules-grid');
  if (!modulesContainer) return;
  
  modulesContainer.innerHTML = '';
  
  modules.forEach(module => {
    const moduleCard = document.createElement('div');
    moduleCard.className = 'module-card';
    
    let badgesHTML = '';
    if (module.founderOnly) {
      badgesHTML += `<span class="module-card-badge founder-only">Founder Only</span>`;
    }
    if (module.mustWatch) {
      badgesHTML += `<span class="module-card-badge must-watch">Must Watch</span>`;
    }
    
    moduleCard.innerHTML = `
      <div class="module-card-content">
        ${badgesHTML ? `<div class="module-card-badges">${badgesHTML}</div>` : ''}
        <div class="module-card-top">
          <h3 class="module-card-title">${module.title}</h3>
          <div class="module-card-icon">
            <i data-feather="${module.icon}"></i>
          </div>
        </div>
        <p class="module-card-description">${module.description}</p>
        <div class="module-card-footer">
          <a href="#" class="module-card-link">
            Watch Module <i data-feather="arrow-right"></i>
          </a>
          <div class="module-status">
            <i data-feather="clock" class="module-status-icon"></i>
            <span>45 min</span>
          </div>
        </div>
      </div>
    `;
    
    modulesContainer.appendChild(moduleCard);
  });
  
  // Initialize Feather icons
  if (typeof feather !== 'undefined') {
    feather.replace();
  }
}

// Initialize modules on page load
document.addEventListener('DOMContentLoaded', () => {
  renderModules();
});

// Export modules for other scripts if needed
window.courseModules = modules; 