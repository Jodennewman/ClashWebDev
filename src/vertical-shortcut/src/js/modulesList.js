import feather from 'feather-icons';

import { courseModules } from './moduleData.js';

/**
 * Renders the modules list using the course module data
 */
export function renderModulesList() {
  return new Promise((resolve, reject) => {
    try {
      console.log('Rendering modules list...');
      
      const modulesContainer = document.querySelector('.modules-container');
      
      if (!modulesContainer) {
        console.error('Modules container not found');
        reject(new Error('Modules container not found'));
        return;
      }

      // Clear existing content
      modulesContainer.innerHTML = '';
      
      // Group modules by category
      const modulesByCategory = groupModulesByCategory(courseModules);
      
      // Create and append each category section
      Object.entries(modulesByCategory).forEach(([category, modules]) => {
        // Add category header
        modulesContainer.appendChild(createCategoryHeader(category));
        
        // Add modules grid for this category
        const modulesGrid = document.createElement('div');
        modulesGrid.className = 'track-modules';
        
        // Add each module card to the grid
        modules.forEach(module => {
          modulesGrid.appendChild(createModuleCard(module));
        });
        
        modulesContainer.appendChild(modulesGrid);
      });
      
      // Initialize Feather icons if available
      if (typeof window.feather !== 'undefined') {
        window.feather.replace();
      }
      
      resolve();
    } catch (error) {
      console.error('Error rendering modules list:', error);
      reject(error);
    }
  });
}

// Helper functions
function groupModulesByCategory(modules) {
  return modules.reduce((acc, module) => {
    if (!acc[module.category]) {
      acc[module.category] = [];
    }
    acc[module.category].push(module);
    return acc;
  }, {});
}

function createCategoryHeader(category) {
  const header = document.createElement('div');
  header.className = 'track-header';
  header.innerHTML = `
    <h3 class="track-title">${category}</h3>
    <p class="track-description">${getCategoryDescription(category)}</p>
  `;
  return header;
}

function createModuleCard(module) {
  const card = document.createElement('div');
  card.className = 'module-card';
  card.innerHTML = `
    <div class="module-icon">
      <i data-feather="${module.icon}"></i>
    </div>
    <div class="module-content">
      <div class="module-category">${module.category}</div>
      <h3 class="module-title">${module.title}</h3>
      <p class="module-description">${module.description}</p>
    </div>
  `;
  return card;
}

function getCategoryDescription(category) {
  const descriptions = {
    'Basic Theory': 'Foundational concepts for short-form video success',
    'Advanced Theory': 'Deeper strategies to elevate your content',
    'Delegation': 'Systems to outsource your content creation',
    'Monetisation': 'Strategies to convert audience into revenue',
    // Add descriptions for other categories
  };
  
  return descriptions[category] || 'Specialized training for vertical video mastery';
}