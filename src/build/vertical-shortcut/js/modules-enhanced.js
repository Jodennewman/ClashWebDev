/**
 * Enhanced Modules Section Interactions
 * Handles filtering, animations, and interactive elements for the course modules section
 */

document.addEventListener('DOMContentLoaded', () => {
  // Wait a short time to ensure all scripts are loaded
  setTimeout(() => {
    initializeModuleSectionInteractions();
  }, 100);
});

// Store state for module categories and filters
// Check if moduleState already exists to prevent duplicate declaration error
const moduleState = window.moduleState || {
  activeTrack: 'all',
  expandedCategories: [],
  expandedSubcategories: [],
  filteredCount: 0,
  totalModules: 0,
  moduleData: []
};

// Make moduleState globally available
window.moduleState = moduleState;

/**
 * Initialize all module section interactions
 */
function initializeModuleSectionInteractions() {
  console.log('Initializing module section interactions');
  
  // Check if GSAP and ScrollTrigger are available
  if (window.gsap && window.ScrollTrigger) {
    console.log('GSAP and ScrollTrigger found, registering plugin');
    try {
      // Register ScrollTrigger plugin if it exists
      gsap.registerPlugin(ScrollTrigger);
    } catch (error) {
      console.warn('Error registering ScrollTrigger:', error);
    }
  } else {
    console.warn('GSAP or ScrollTrigger not found. Animations will be limited.');
  }
  
  initializeModuleTracksFilter();
  initializeModuleCategoryToggles();
  enhanceModuleCards();
  initializeModuleStats();
  
  // Delay animations to ensure DOM is fully ready
  setTimeout(() => {
    animateModulesSectionElements();
  }, 200);
}

/**
 * Initialize the module tracks filtering functionality
 */
function initializeModuleTracksFilter() {
  const trackButtons = document.querySelectorAll('.track-btn');
  const modulesGrid = document.querySelector('.modules-grid');
  
  if (!trackButtons.length || !modulesGrid) return;
  
  trackButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active button
      trackButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Get selected track
      const selectedTrack = button.getAttribute('data-track');
      moduleState.activeTrack = selectedTrack;
      
      // Filter modules based on track
      filterModulesByTrack(selectedTrack);
      updateModuleStats();
      
      // Refresh ScrollTrigger after animation completes
      setTimeout(() => {
        if (window.ScrollTrigger) {
          ScrollTrigger.refresh();
        }
      }, 500);
    });
  });
}

/**
 * Initialize module category toggles for expandable sections
 */
function initializeModuleCategoryToggles() {
  // Add event listeners to category headers
  document.querySelectorAll('.module-category-header').forEach((header, index) => {
    header.addEventListener('click', () => {
      toggleCategory(index);
    });
  });
  
  // Add event listeners to subcategory headers
  document.querySelectorAll('.module-subcategory-header').forEach((header, index) => {
    header.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent bubbling to parent category
      toggleSubcategory(index);
    });
  });
}

/**
 * Toggle a category's expanded/collapsed state
 * @param {number} categoryIndex - Index of the category to toggle
 */
function toggleCategory(categoryIndex) {
  const categoryContent = document.querySelector(`.category-content[data-category="${categoryIndex}"]`);
  const categoryHeader = document.querySelector(`.module-category-header[data-category="${categoryIndex}"]`);
  
  if (!categoryContent || !categoryHeader) return;
  
  const isExpanded = categoryContent.classList.contains('expanded');
  
  if (isExpanded) {
    // Collapse
    categoryContent.classList.remove('expanded');
    categoryHeader.classList.remove('expanded');
    
    // Update state
    moduleState.expandedCategories = moduleState.expandedCategories.filter(i => i !== categoryIndex);
    
    // Animate collapse with GSAP if available
    if (window.gsap) {
      gsap.to(categoryContent, {
        height: 0,
        opacity: 0.5,
        duration: 0.3,
        ease: 'power2.out',
        onComplete: () => {
          categoryContent.style.display = 'none';
        }
      });
    } else {
      categoryContent.style.display = 'none';
    }
  } else {
    // Expand
    categoryContent.classList.add('expanded');
    categoryHeader.classList.add('expanded');
    
    // Update state
    moduleState.expandedCategories.push(categoryIndex);
    
    // Animate expand with GSAP if available
    if (window.gsap) {
      categoryContent.style.display = 'block';
      categoryContent.style.height = '0px';
      categoryContent.style.opacity = '0.5';
      
      gsap.to(categoryContent, {
        height: 'auto',
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out'
      });
    } else {
      categoryContent.style.display = 'block';
    }
  }
  
  // Refresh ScrollTrigger if category is expanding
  if (!isExpanded && window.ScrollTrigger) {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);
  }
}

/**
 * Toggle a subcategory's expanded/collapsed state
 * @param {number} subcategoryIndex - Index of the subcategory to toggle
 */
function toggleSubcategory(subcategoryIndex) {
  const subcategoryContent = document.querySelector(`.subcategory-content[data-subcategory="${subcategoryIndex}"]`);
  const subcategoryHeader = document.querySelector(`.module-subcategory-header[data-subcategory="${subcategoryIndex}"]`);
  
  if (!subcategoryContent || !subcategoryHeader) return;
  
  const isExpanded = subcategoryContent.classList.contains('expanded');
  
  if (isExpanded) {
    // Collapse
    subcategoryContent.classList.remove('expanded');
    subcategoryHeader.classList.remove('expanded');
    
    // Update state
    moduleState.expandedSubcategories = moduleState.expandedSubcategories.filter(i => i !== subcategoryIndex);
    
    // Animate collapse with GSAP if available
    if (window.gsap) {
      gsap.to(subcategoryContent, {
        height: 0,
        opacity: 0.5,
        duration: 0.25,
        ease: 'power2.out',
        onComplete: () => {
          subcategoryContent.style.display = 'none';
        }
      });
    } else {
      subcategoryContent.style.display = 'none';
    }
  } else {
    // Expand
    subcategoryContent.classList.add('expanded');
    subcategoryHeader.classList.add('expanded');
    
    // Update state
    moduleState.expandedSubcategories.push(subcategoryIndex);
    
    // Animate expand with GSAP if available
    if (window.gsap) {
      subcategoryContent.style.display = 'block';
      subcategoryContent.style.height = '0px';
      subcategoryContent.style.opacity = '0.5';
      
      gsap.to(subcategoryContent, {
        height: 'auto',
        opacity: 1,
        duration: 0.35,
        ease: 'power2.out'
      });
    } else {
      subcategoryContent.style.display = 'block';
    }
  }
  
  // Refresh ScrollTrigger if subcategory is expanding
  if (!isExpanded && window.ScrollTrigger) {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 350);
  }
}

/**
 * Initialize module stats counter and progress indicators
 */
function initializeModuleStats() {
  updateModuleStats();
  try {
    initializeProgressBars();
  } catch (error) {
    console.warn('Error initializing progress bars:', error);
  }
}

/**
 * Update module statistics display based on current state
 */
function updateModuleStats() {
  const moduleCards = document.querySelectorAll('.module-card');
  if (!moduleCards.length) {
    console.warn('No module cards found when updating stats');
    return;
  }
  
  const visibleModules = Array.from(moduleCards).filter(card => {
    return window.getComputedStyle(card).display !== 'none';
  });
  
  moduleState.filteredCount = visibleModules.length;
  moduleState.totalModules = moduleCards.length;
  
  // Update counters in the UI
  const countElement = document.querySelector('.modules-count-value');
  const totalElement = document.querySelector('.modules-total-value');
  const progressElement = document.querySelector('.modules-progress-indicator');
  
  if (countElement) {
    countElement.textContent = moduleState.filteredCount;
  }
  
  if (totalElement) {
    totalElement.textContent = moduleState.totalModules;
  }
  
  if (progressElement) {
    const progress = (moduleState.filteredCount / moduleState.totalModules) * 100;
    progressElement.style.width = `${progress}%`;
  }
}

/**
 * Initialize interactive progress bars for module completion
 */
function initializeProgressBars() {
  const progressBars = document.querySelectorAll('.module-progress-bar');
  if (!progressBars.length) {
    console.warn('No progress bars found during initialization');
    return;
  }
  
  console.log(`Initializing ${progressBars.length} progress bars`);
  
  progressBars.forEach(bar => {
    const progress = parseFloat(bar.getAttribute('data-progress') || '0');
    const progressIndicator = bar.querySelector('.progress-indicator');
    
    if (!progressIndicator) {
      console.warn('Progress indicator not found in bar:', bar);
      return;
    }
    
    // Set initial width without animation
    progressIndicator.style.width = `${progress}%`;
    
    // Skip GSAP animation if not available
    if (!window.gsap) return;
    
    try {
      // Use basic GSAP if ScrollTrigger not available
      if (!window.ScrollTrigger) {
        gsap.to(progressIndicator, {
          width: `${progress}%`,
          duration: 1.2,
          ease: 'power2.out',
          delay: 0.5
        });
        return;
      }
      
      // Use ScrollTrigger if available
      const scrollConfig = {
        trigger: bar,
        start: 'top 90%',
      };
      
      // Only add scroller if it exists in the DOM
      const scroller = document.querySelector('.vs-smooth-wrapper');
      if (scroller) {
        scrollConfig.scroller = scroller;
      }
      
      gsap.to(progressIndicator, {
        width: `${progress}%`,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: scrollConfig
      });
    } catch (error) {
      console.warn('Error animating progress bar:', error);
      // Fallback to CSS only
      progressIndicator.style.width = `${progress}%`;
      progressIndicator.style.transition = 'width 1s ease';
    }
  });
}

/**
 * Filter modules based on selected track
 * @param {string} track - The selected track to filter by
 */
function filterModulesByTrack(track) {
  const moduleCards = document.querySelectorAll('.module-card');
  let visibleCount = 0;
  
  if (!moduleCards.length) return;
  
  moduleCards.forEach(card => {
    const cardTrack = card.getAttribute('data-track')?.toLowerCase();
    const isMatchingTrack = track === 'all' || !track || cardTrack === track;
    
    if (isMatchingTrack) {
      // Show the card with animation
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.display = 'block';
      
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 50 + (visibleCount * 30)); // Staggered animation
      
      visibleCount++;
    } else {
      // Hide the card with animation
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        card.style.display = 'none';
      }, 300);
    }
  });
  
  // Update module count
  moduleState.filteredCount = visibleCount;
  updateModuleStats();
  
  // If no modules match, show empty state message
  const emptyState = document.querySelector('.modules-empty-state');
  if (emptyState) {
    if (visibleCount === 0) {
      emptyState.style.display = 'block';
      if (window.gsap) {
        gsap.from(emptyState, {
          opacity: 0,
          y: 20,
          duration: 0.4,
          ease: 'power2.out'
        });
      }
    } else {
      emptyState.style.display = 'none';
    }
  }
}

/**
 * Generate dynamic icon HTML for module cards
 * @param {string} iconName - Feather icon name
 * @returns {string} - HTML for the icon
 */
function getIconHTML(iconName) {
  // First check if we have a custom icon with that name
  const customIcons = {
    'course': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>',
    'strategy': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>'
  };
  
  if (customIcons[iconName]) {
    return customIcons[iconName];
  }
  
  // Fallback to standard feather icon
  return `<i data-feather="${iconName || 'box'}"></i>`;
}

/**
 * Calculate module difficulty level based on module data
 * @param {Object} moduleData - Module data object
 * @returns {string} - Difficulty level (beginner, intermediate, advanced)
 */
function calculateModuleDifficulty(moduleData) {
  // Implement your own difficulty calculation logic
  const complexityMap = {
    'beginner': ['basic', 'introduction', 'start', 'fundamental'],
    'advanced': ['advanced', 'expert', 'complex', 'mastery']
  };
  
  const title = moduleData.title?.toLowerCase() || '';
  const description = moduleData.description?.toLowerCase() || '';
  
  // Check if title or description contains any advanced keywords
  for (const advKeyword of complexityMap.advanced) {
    if (title.includes(advKeyword) || description.includes(advKeyword)) {
      return 'advanced';
    }
  }
  
  // Check if title or description contains any beginner keywords
  for (const begKeyword of complexityMap.beginner) {
    if (title.includes(begKeyword) || description.includes(begKeyword)) {
      return 'beginner';
    }
  }
  
  // Default to intermediate
  return 'intermediate';
}

/**
 * Animate module section elements on scroll
 */
function animateModulesSectionElements() {
  // Exit if GSAP is not available
  if (!window.gsap) {
    console.warn('GSAP not loaded. Animations will not run.');
    return;
  }
  
  // Check if ScrollTrigger is available
  const hasScrollTrigger = window.ScrollTrigger !== undefined;
  
  // Determine the appropriate scroller
  const smoothScroller = document.querySelector('.vs-smooth-wrapper');
  const scroller = smoothScroller || document.body;
  
  // Animate course value metrics
  const valueMetrics = document.querySelectorAll('.value-metric');
  if (valueMetrics.length && window.gsap) {
    if (hasScrollTrigger) {
      gsap.from(valueMetrics, {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.course-value-highlights',
          scroller: scroller,
          start: 'top 80%',
        }
      });
    } else {
      // Fallback animation without ScrollTrigger
      gsap.from(valueMetrics, {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
      });
    }
  }
  
  // Animate quick tools
  const quickTools = document.querySelectorAll('.quick-tool');
  if (quickTools.length && window.gsap) {
    if (hasScrollTrigger) {
      gsap.from(quickTools, {
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: '.quick-tools-banner',
          scroller: scroller,
          start: 'top 75%',
        }
      });
    } else {
      // Fallback animation without ScrollTrigger
      gsap.from(quickTools, {
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: 'power1.out',
      });
    }
  }
  
  // Animate featured module
  const featuredModule = document.querySelector('.featured-module');
  if (featuredModule && window.gsap) {
    if (hasScrollTrigger) {
      gsap.from(featuredModule, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: featuredModule,
          scroller: scroller,
          start: 'top 75%',
        }
      });
    } else {
      // Fallback animation without ScrollTrigger
      gsap.from(featuredModule, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      });
    }
  }
  
  // Animate showcase items
  const showcaseItems = document.querySelectorAll('.showcase-item');
  if (showcaseItems.length && window.gsap) {
    if (hasScrollTrigger) {
      gsap.from(showcaseItems, {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.showcase-gallery',
          scroller: scroller,
          start: 'top 70%',
        }
      });
    } else {
      // Fallback animation without ScrollTrigger
      gsap.from(showcaseItems, {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power2.out',
      });
    }
  }
  
  // Animate learning paths
  const learningPaths = document.querySelectorAll('.learning-path');
  if (learningPaths.length && window.gsap) {
    if (hasScrollTrigger) {
      gsap.from(learningPaths, {
        x: -30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.learning-paths',
          scroller: scroller,
          start: 'top 70%',
        }
      });
    } else {
      // Fallback animation without ScrollTrigger
      gsap.from(learningPaths, {
        x: -30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.7,
        ease: 'power2.out',
      });
    }
  }
  
  // Animate instructor insights
  const insightCards = document.querySelectorAll('.insight-card');
  if (insightCards.length && window.gsap) {
    if (hasScrollTrigger) {
      gsap.from(insightCards, {
        scale: 0.95,
        opacity: 0,
        stagger: 0.2,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.instructor-insights',
          scroller: scroller,
          start: 'top 70%',
        }
      });
    } else {
      // Fallback animation without ScrollTrigger
      gsap.from(insightCards, {
        scale: 0.95,
        opacity: 0,
        stagger: 0.2,
        duration: 0.7,
        ease: 'power2.out',
      });
    }
  }
  
  // Animate bonus items
  const bonusItems = document.querySelectorAll('.bonus-item');
  if (bonusItems.length && window.gsap) {
    if (hasScrollTrigger) {
      gsap.from(bonusItems, {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: '.course-bonuses',
          scroller: scroller,
          start: 'top 70%',
        }
      });
    } else {
      // Fallback animation without ScrollTrigger
      gsap.from(bonusItems, {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power1.out',
      });
    }
  }
  
  // Modules CTA reveal
  const modulesCta = document.querySelector('.modules-cta');
  if (modulesCta && window.gsap) {
    if (hasScrollTrigger) {
      gsap.from(modulesCta, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: modulesCta,
          scroller: scroller,
          start: 'top 80%',
        }
      });
    } else {
      // Fallback animation without ScrollTrigger
      gsap.from(modulesCta, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      });
    }
  }
  
  // Progress bars animation
  const progressBars = document.querySelectorAll('.module-progress-bar');
  if (progressBars.length && window.gsap) {
    if (hasScrollTrigger) {
      gsap.from(progressBars, {
        width: '0%',
        duration: 1,
        ease: 'power1.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.learning-paths',
          scroller: scroller,
          start: 'top 60%',
        }
      });
    } else {
      // Fallback animation without ScrollTrigger
      gsap.from(progressBars, {
        width: '0%',
        duration: 1,
        ease: 'power1.out',
        stagger: 0.1,
      });
    }
  }
  
  // Module category headers fade-in
  const categoryHeaders = document.querySelectorAll('.module-category-header');
  if (categoryHeaders.length && window.gsap) {
    if (hasScrollTrigger) {
      gsap.from(categoryHeaders, {
        opacity: 0,
        y: 15,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.modules-grid',
          scroller: scroller,
          start: 'top 75%',
        }
      });
    } else {
      // Fallback animation without ScrollTrigger
      gsap.from(categoryHeaders, {
        opacity: 0,
        y: 15,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
      });
    }
  }
}

/**
 * Helper function to enhance module cards with hover animations
 */
function enhanceModuleCards() {
  const moduleCards = document.querySelectorAll('.module-card');
  
  if (!moduleCards.length) return;
  
  moduleCards.forEach(card => {
    // Setup card mark as completed functionality
    setupCardCompletion(card);
    
    // Setup hover animations
    card.addEventListener('mouseenter', () => {
      if (window.gsap) {
        gsap.to(card, {
          y: -10,
          scale: 1.02,
          boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
          duration: 0.3,
          ease: 'power2.out'
        });
        
        // Animate the card icon
        const cardIcon = card.querySelector('.module-icon');
        if (cardIcon) {
          gsap.to(cardIcon, {
            rotate: 10,
            scale: 1.1,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)'
          });
        }
      }
    });
    
    card.addEventListener('mouseleave', () => {
      if (window.gsap) {
        gsap.to(card, {
          y: 0,
          scale: 1,
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
          duration: 0.3,
          ease: 'power2.out'
        });
        
        // Reset the card icon
        const cardIcon = card.querySelector('.module-icon');
        if (cardIcon) {
          gsap.to(cardIcon, {
            rotate: 0,
            scale: 1,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)'
          });
        }
      }
    });
  });
}

/**
 * Setup module card completion functionality
 * @param {HTMLElement} card - The module card element
 */
function setupCardCompletion(card) {
  const completionCheckbox = card.querySelector('.module-completion-checkbox');
  const moduleId = card.getAttribute('data-module-id');
  
  if (!completionCheckbox || !moduleId) return;
  
  // Check if module is completed from localStorage
  const completedModules = JSON.parse(localStorage.getItem('completedModules') || '[]');
  const isCompleted = completedModules.includes(moduleId);
  
  // Set initial state
  if (isCompleted) {
    card.classList.add('module-completed');
    completionCheckbox.checked = true;
  }
  
  // Add event listener for checkbox changes
  completionCheckbox.addEventListener('change', () => {
    const isChecked = completionCheckbox.checked;
    const storedModules = JSON.parse(localStorage.getItem('completedModules') || '[]');
    
    if (isChecked) {
      // Mark as completed
      card.classList.add('module-completed');
      if (!storedModules.includes(moduleId)) {
        storedModules.push(moduleId);
      }
      
      // Celebrate completion with confetti animation
      if (window.gsap) {
        // Create and animate completion particles
        createCompletionEffect(card);
      }
    } else {
      // Mark as incomplete
      card.classList.remove('module-completed');
      const index = storedModules.indexOf(moduleId);
      if (index > -1) {
        storedModules.splice(index, 1);
      }
    }
    
    // Save to localStorage
    localStorage.setItem('completedModules', JSON.stringify(storedModules));
    
    // Update progress indicators
    updateModuleStats();
  });
}

/**
 * Create a completion celebration effect
 * @param {HTMLElement} element - The element to create the effect around
 */
function createCompletionEffect(element) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  // Create 20 particles
  for (let i = 0; i < 20; i++) {
    createParticle(centerX, centerY);
  }
}

/**
 * Create an individual particle for the completion effect
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 */
function createParticle(x, y) {
  const particle = document.createElement('div');
  document.body.appendChild(particle);
  
  // Set particle styles
  const size = Math.random() * 10 + 5;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.position = 'fixed';
  particle.style.borderRadius = '50%';
  particle.style.zIndex = '9999';
  particle.style.pointerEvents = 'none';
  
  // Random color from our palette
  const colors = ['#FEAF52', '#E76662', '#33626F', '#378596', '#F37947'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  particle.style.backgroundColor = color;
  
  // Position at center
  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;
  
  // Random direction
  const angle = Math.random() * Math.PI * 2;
  const speed = Math.random() * 100 + 50;
  const vx = Math.cos(angle) * speed;
  const vy = Math.sin(angle) * speed;
  
  // Animate with GSAP
  gsap.to(particle, {
    x: vx,
    y: vy,
    opacity: 0,
    scale: 0,
    duration: Math.random() * 1 + 0.5,
    ease: 'power1.out',
    onComplete: () => {
      document.body.removeChild(particle);
    }
  });
}

// Expose functions to global scope for external use
window.enhanceModuleSection = {
  initialize: initializeModuleSectionInteractions,
  filterByTrack: filterModulesByTrack,
  enhanceCards: enhanceModuleCards,
  toggleCategory: toggleCategory,
  toggleSubcategory: toggleSubcategory,
  updateStats: updateModuleStats
}; 