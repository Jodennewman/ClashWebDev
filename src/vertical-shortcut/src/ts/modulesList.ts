import { Module } from '../types/types-index';
import { courseModules } from '../data/moduleData';
import feather from 'feather-icons';

/**
 * Renders the modules list using the course module data
 */
export function renderModulesList(): void {
  console.log('Rendering modules list...');
  
  const modulesContainer = document.querySelector('.modules-container');
  
  if (!modulesContainer) {
    console.error('Modules container not found - make sure .modules-container exists in your HTML');
    return;
  }

  // Clear any existing content
  modulesContainer.innerHTML = '';
  
  // Add each module card to the container
  courseModules.forEach(module => {
    const moduleHTML = createModuleCard(module);
    modulesContainer.innerHTML += moduleHTML;
  });
  
  // Initialize Feather icons if available
  if (typeof feather !== 'undefined' && feather.replace) {
    feather.replace();
  } else {
    console.warn('Feather icons not found - make sure to include the feather-icons library');
  }
  
  console.log('Modules list rendered with', courseModules.length, 'modules');
}

/**
 * Creates HTML for a single module card
 */
function createModuleCard(module: Module): string {
  return `
    <div class="module-card">
      <div class="module-icon">
        <i data-feather="${module.icon}"></i>
      </div>
      <div class="module-content">
        <div class="module-category">${module.category}</div>
        <h3 class="module-title">${module.title}</h3>
        <p class="module-description">${module.description}</p>
      </div>
    </div>
  `;
}