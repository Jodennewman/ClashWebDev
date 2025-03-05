/**
 * Modules Section Functionality
 */

document.addEventListener('DOMContentLoaded', function() {
  // Make sure we don't initialize twice
  if (window.modulesInitialized) return;
  window.modulesInitialized = true;
  
  console.log('Initializing modules.js functionality');
  
  // Use courseModulesList instead of modules to avoid duplications
  const modulesData = window.courseModulesList || [];
  
  // Initialize module functionality
  initializeModules(modulesData);
  
  // Refresh any ScrollTrigger instances
  if (window.ScrollTrigger) {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
  }
});

/**
 * Initialize modules section with data
 * @param {Array} modulesData - Array of module objects 
 */
function initializeModules(modulesData) {
  const modulesSection = document.querySelector('.modules-section');
  if (!modulesSection || !modulesData || !modulesData.length) {
    console.warn('Modules section or data not found');
    return;
  }
  
  console.log(`Initializing modules with ${modulesData.length} items`);
  
  // Set up module filtering
  setupModuleFilters(modulesData);
  
  // Set up category toggles
  setupCategoryToggles();
  
  // Initialize animations if GSAP is available
  if (window.gsap && window.ScrollTrigger) {
    initModulesAnimations();
  }
  
  // Track module progress from localStorage
  loadModuleProgress(modulesData);
}

/**
 * Set up module filtering by track
 * @param {Array} modulesData - Array of module objects
 */
function setupModuleFilters(modulesData) {
  const filterButtons = document.querySelectorAll('.track-btn');
  if (!filterButtons.length) return;
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Get filter value
      const filter = this.dataset.track;
      
      // Filter modules
      filterModulesByTrack(modulesData, filter);
    });
  });
}

/**
 * Filter modules by track category
 * @param {Array} modulesData - Array of module objects
 * @param {string} track - Track category to filter by
 */
function filterModulesByTrack(modulesData, track) {
  const moduleCards = document.querySelectorAll('.module-card');
  if (!moduleCards.length) return;
  
  let visibleCount = 0;
  
  moduleCards.forEach(card => {
    if (track === 'all' || card.dataset.track === track) {
      card.style.display = '';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });
  
  // Show empty state if no modules match filter
  toggleEmptyState(visibleCount === 0);
  
  // Update count display
  updateModuleCount(visibleCount, modulesData.length);
  
  // Refresh ScrollTrigger if available
  if (window.ScrollTrigger) {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);
  }
}

/**
 * Toggle empty state message
 * @param {boolean} isEmpty - Whether to show empty state
 */
function toggleEmptyState(isEmpty) {
  const emptyState = document.querySelector('.modules-empty-state');
  const moduleGrid = document.querySelector('.modules-grid');
  
  if (!emptyState || !moduleGrid) return;
  
  if (isEmpty) {
    emptyState.style.display = 'block';
    moduleGrid.style.display = 'none';
  } else {
    emptyState.style.display = 'none';
    moduleGrid.style.display = '';
  }
}

/**
 * Update module count display
 * @param {number} visibleCount - Number of visible modules
 * @param {number} totalCount - Total number of modules
 */
function updateModuleCount(visibleCount, totalCount) {
  const countElement = document.querySelector('.modules-count');
  if (!countElement) return;
  
  countElement.innerHTML = `Showing <span class="modules-count-value">${visibleCount}</span> of <span class="modules-total-value">${totalCount}</span> modules`;
  
  // Update progress bar
  updateProgressBar(visibleCount, totalCount);
}

/**
 * Update progress bar
 * @param {number} visible - Number of visible modules
 * @param {number} total - Total number of modules
 */
function updateProgressBar(visible, total) {
  const progressIndicator = document.querySelector('.modules-progress-indicator');
  if (!progressIndicator) return;
  
  const percentage = (visible / total) * 100;
  progressIndicator.style.width = `${percentage}%`;
}

/**
 * Set up category expanding/collapsing
 */
function setupCategoryToggles() {
  const categoryHeaders = document.querySelectorAll('.module-category-header');
  
  categoryHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const category = this.closest('.module-category');
      const content = category.querySelector('.category-content');
      
      this.classList.toggle('expanded');
      
      if (this.classList.contains('expanded')) {
        content.style.display = 'grid';
        // Animate height if GSAP is available
        if (window.gsap) {
          gsap.from(content, {
            height: 0,
            duration: 0.3,
            ease: 'power1.out'
          });
        }
      } else {
        content.style.display = 'none';
      }
      
      // Refresh ScrollTrigger if available
      if (window.ScrollTrigger) {
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 300);
      }
    });
  });
  
  // Also handle subcategory toggles
  const subcategoryHeaders = document.querySelectorAll('.module-subcategory-header');
  
  subcategoryHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const subcategory = this.closest('.module-subcategory');
      const content = subcategory.querySelector('.subcategory-content');
      
      this.classList.toggle('expanded');
      
      if (this.classList.contains('expanded')) {
        content.style.display = 'grid';
        // Animate height if GSAP is available
        if (window.gsap) {
          gsap.from(content, {
            height: 0,
            duration: 0.3,
            ease: 'power1.out'
          });
        }
      } else {
        content.style.display = 'none';
      }
      
      // Refresh ScrollTrigger if available
      if (window.ScrollTrigger) {
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 300);
      }
    });
  });
}

/**
 * Initialize module section animations
 */
function initModulesAnimations() {
  if (!window.gsap || !window.ScrollTrigger) return;
  
  try {
    // Determine scroller element
    const scroller = document.querySelector('.vs-smooth-wrapper') || document.body;
    
    // Animate category headers
    gsap.utils.toArray('.module-category-header').forEach((header, i) => {
      try {
        gsap.from(header, {
          y: 20,
          opacity: 0,
          duration: 0.5,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: header,
            scroller: scroller,
            start: 'top 85%',
          }
        });
      } catch (error) {
        console.warn('ScrollTrigger animation failed:', error);
      }
    });
    
    // Animate module cards
    gsap.utils.toArray('.module-card').forEach((card, i) => {
      try {
        gsap.from(card, {
          y: 30,
          opacity: 0,
          duration: 0.5,
          delay: 0.2 + (i * 0.05),
          scrollTrigger: {
            trigger: card,
            scroller: scroller,
            start: 'top 85%',
          }
        });
      } catch (error) {
        console.warn('ScrollTrigger animation failed:', error);
      }
    });
  } catch (error) {
    console.warn('Error initializing module animations:', error);
  }
}

/**
 * Load module progress from localStorage
 * @param {Array} modulesData - Array of module objects
 */
function loadModuleProgress(modulesData) {
  try {
    const savedProgress = localStorage.getItem('courseModulesProgress');
    if (savedProgress) {
      const progressData = JSON.parse(savedProgress);
      
      // Update module data with saved progress
      modulesData.forEach(module => {
        if (progressData[module.id]) {
          module.progress = progressData[module.id].progress;
          module.completed = progressData[module.id].completed;
          
          // Update UI for this module
          updateModuleUI(module.id, module.progress, module.completed);
        }
      });
    }
  } catch (error) {
    console.warn('Error loading module progress:', error);
  }
}

/**
 * Update module UI based on progress
 * @param {string} moduleId - Module ID
 * @param {number} progress - Progress percentage
 * @param {boolean} completed - Whether module is completed
 */
function updateModuleUI(moduleId, progress, completed) {
  const moduleCard = document.querySelector(`.module-card[data-module-id="${moduleId}"]`);
  if (!moduleCard) return;
  
  // Update progress bar
  const progressBar = moduleCard.querySelector('.progress-indicator');
  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }
  
  // Update completed status
  const checkbox = moduleCard.querySelector('.module-completion-checkbox');
  if (checkbox) {
    checkbox.checked = completed;
  }
  
  // Add completed class if necessary
  if (completed) {
    moduleCard.classList.add('module-completed');
  } else {
    moduleCard.classList.remove('module-completed');
  }
}

// Make functions available globally
window.modulesFunctions = {
  initialize: initializeModules,
  filterByTrack: filterModulesByTrack,
  updateProgress: updateModuleUI
}; 