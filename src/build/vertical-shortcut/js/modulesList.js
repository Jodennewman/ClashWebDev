/**
 * Module List Renderer for The Vertical Shortcut
 */

// Check if modules list already exists in global scope
if (typeof window.courseModulesList === 'undefined') {
  // Define module data
  window.courseModulesList = [
    // Foundation Track
    {
      id: 'found-1',
      title: 'Core Storytelling Principles',
      description: 'Master the fundamental principles that make content compelling and shareable.',
      category: 'foundation',
      subcategory: 'fundamentals',
      difficulty: 'beginner',
      duration: '45 min',
      lessons: 5,
      progress: 0,
      completed: false,
      icon: 'book-open'
    },
    {
      id: 'found-2',
      title: 'Content Planning Framework',
      description: 'Build a versatile system for planning your content calendar across platforms.',
      category: 'foundation',
      subcategory: 'fundamentals',
      difficulty: 'beginner',
      duration: '60 min',
      lessons: 7,
      progress: 0,
      completed: false,
      icon: 'calendar'
    },
    {
      id: 'found-3',
      title: 'Creator Mindset & Habits',
      description: 'Develop the psychological approach and daily habits of successful creators.',
      category: 'foundation',
      subcategory: 'mindset',
      difficulty: 'beginner',
      duration: '50 min',
      lessons: 6,
      progress: 0,
      completed: false,
      icon: 'book-open'
    },
    {
      id: 'found-4',
      title: 'Audience Research Methods',
      description: 'Learn actionable techniques to deeply understand your ideal audience.',
      category: 'foundation',
      subcategory: 'research',
      difficulty: 'intermediate',
      duration: '75 min',
      lessons: 8,
      progress: 0,
      completed: false,
      icon: 'search'
    },
    {
      id: 'found-5',
      title: 'Personal Brand Development',
      description: 'Craft an authentic personal brand that resonates with your audience.',
      category: 'foundation',
      subcategory: 'branding',
      difficulty: 'intermediate',
      duration: '90 min',
      lessons: 9,
      progress: 0,
      completed: false,
      icon: 'user'
    },
    
    // Content Creation Track
    {
      id: 'content-1',
      title: 'Captivating Video Production',
      description: 'Create professional-looking videos with equipment you already have.',
      category: 'content',
      subcategory: 'video',
      difficulty: 'intermediate',
      duration: '120 min',
      lessons: 12,
      progress: 0,
      completed: false,
      featured: true,
      popular: true,
      icon: 'video'
    },
    {
      id: 'content-2',
      title: 'Engaging Script Writing',
      description: 'Write scripts that hold viewer attention and deliver your message effectively.',
      category: 'content',
      subcategory: 'story',
      difficulty: 'intermediate',
      duration: '60 min',
      lessons: 6,
      progress: 0,
      completed: false,
      icon: 'edit-3'
    },
    {
      id: 'content-3',
      title: 'Advanced Editing Techniques',
      description: 'Learn professional editing tricks to make your content stand out.',
      category: 'content',
      subcategory: 'video',
      difficulty: 'advanced',
      duration: '150 min',
      lessons: 15,
      progress: 0,
      completed: false,
      popular: true,
      icon: 'film'
    },
    {
      id: 'content-4',
      title: 'Visual Storytelling Elements',
      description: 'Create powerful visual narratives that connect emotionally with viewers.',
      category: 'content',
      subcategory: 'story',
      difficulty: 'intermediate',
      duration: '90 min',
      lessons: 8,
      progress: 0,
      completed: false,
      icon: 'image'
    },
    {
      id: 'content-5',
      title: 'Hook Creation Masterclass',
      description: 'Craft irresistible hooks that capture attention in the first 3 seconds.',
      category: 'content',
      subcategory: 'story',
      difficulty: 'intermediate',
      duration: '70 min',
      lessons: 7,
      progress: 0,
      completed: false,
      popular: true,
      icon: 'anchor'
    },
    {
      id: 'content-6',
      title: 'Audio Quality Optimization',
      description: 'Achieve professional audio quality regardless of your setup.',
      category: 'content',
      subcategory: 'production',
      difficulty: 'intermediate',
      duration: '60 min',
      lessons: 6,
      progress: 0,
      completed: false,
      icon: 'mic'
    },
    
    // Growth Acceleration Track
    {
      id: 'growth-1',
      title: 'Algorithm Optimization Strategies',
      description: 'Master the algorithms with data-driven content strategies.',
      category: 'growth',
      subcategory: 'algorithms',
      difficulty: 'advanced',
      duration: '110 min',
      lessons: 10,
      progress: 0,
      completed: false,
      popular: true,
      icon: 'trending-up'
    },
    {
      id: 'growth-2',
      title: 'Community Building Principles',
      description: 'Transform viewers into an engaged community that supports your growth.',
      category: 'growth',
      subcategory: 'community',
      difficulty: 'intermediate',
      duration: '85 min',
      lessons: 8,
      progress: 0,
      completed: false,
      icon: 'users'
    },
    {
      id: 'growth-3',
      title: 'Content Distribution System',
      description: 'Build a system to repurpose and distribute your content across platforms.',
      category: 'growth',
      subcategory: 'distribution',
      difficulty: 'intermediate',
      duration: '100 min',
      lessons: 9,
      progress: 0,
      completed: false,
      icon: 'share-2'
    },
    {
      id: 'growth-4',
      title: 'Analytics & Iterative Improvement',
      description: 'Use data to continuously improve your content strategy and results.',
      category: 'growth',
      subcategory: 'analytics',
      difficulty: 'advanced',
      duration: '120 min',
      lessons: 12,
      progress: 0,
      completed: false,
      icon: 'bar-chart-2'
    },
    {
      id: 'growth-5',
      title: 'Monetization Frameworks',
      description: 'Implement multiple revenue streams for sustainable creator income.',
      category: 'growth',
      subcategory: 'monetization',
      difficulty: 'advanced',
      duration: '130 min',
      lessons: 14,
      progress: 0,
      completed: false,
      featured: true,
      icon: 'dollar-sign'
    },
    {
      id: 'theory-foundations',
      title: 'Theory Foundations',
      description: 'The essential frameworks needed to understand how vertical video marketing works',
      icon: 'book-open',
      featured: true,
      modules: [
        // Module content
      ]
    },
    {
      id: 'content-identity',
      title: 'Content Identity',
      description: 'Establish your unique voice and personal brand identity',
      icon: 'user',
      modules: [
        // Module content
      ]
    }
  ];
}

/**
 * Renders the modules list using the course module data
 */
window.renderModules = function() {
  const modulesContainer = document.querySelector('.modules-grid');
  if (!modulesContainer) return;
  
  modulesContainer.innerHTML = '';
  
  window.courseModulesList.forEach(module => {
    const moduleCard = document.createElement('div');
    moduleCard.className = 'module-card';
    moduleCard.setAttribute('data-track', module.category);
    moduleCard.setAttribute('data-module-id', module.id);
    
    let badgesHTML = '';
    if (module.founderOnly) {
      badgesHTML += `<span class="module-card-badge founder-only">Founder Only</span>`;
    }
    if (module.mustWatch) {
      badgesHTML += `<span class="module-card-badge must-watch">Must Watch</span>`;
    }
    
    moduleCard.innerHTML = `
      <div class="module-card-inner">
        ${module.popular ? `<div class="module-ribbon">Most Popular</div>` : ''}
        ${badgesHTML ? `<div class="module-card-badges">${badgesHTML}</div>` : ''}
        <div class="module-header">
          <div class="module-icon"><i data-feather="${module.icon}"></i></div>
          <div class="module-difficulty ${module.difficulty || 'beginner'}">${module.difficulty ? module.difficulty.charAt(0).toUpperCase() + module.difficulty.slice(1) : 'Beginner'}</div>
          <label class="module-completion">
            <input type="checkbox" class="module-completion-checkbox">
            <span class="checkmark"></span>
          </label>
        </div>
        <h3 class="module-title">${module.title}</h3>
        <p class="module-description">${module.description}</p>
        <div class="module-meta">
          <div class="module-duration"><i data-feather="clock"></i> ${module.duration}</div>
          <div class="module-lessons"><i data-feather="film"></i> ${module.lessons} lessons</div>
        </div>
        <div class="module-progress-bar" data-progress="${module.progress || 0}">
          <div class="progress-indicator"></div>
        </div>
      </div>
    `;
    
    modulesContainer.appendChild(moduleCard);
  });
  
  // Initialize Feather icons
  if (typeof feather !== 'undefined') {
    feather.replace();
  }
};

// Make the renderModules function globally available
if (typeof window.renderModules === 'undefined') {
  window.renderModules = renderModules;
}

// Initialize modules on page load
document.addEventListener('DOMContentLoaded', () => {
  if (typeof window.renderModules === 'function') {
    window.renderModules();
  }
}); 