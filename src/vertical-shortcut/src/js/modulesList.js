import feather from 'feather-icons';

// Module data for the Vertical Shortcut course
export const courseModules = [
  // Foundational Track - Most important for founders
  {
    track: "Foundational Track",
    title: "Content Strategy Essentials",
    description: "Learn how to create a content strategy that aligns with your business goals and attracts your target audience",
    icon: "compass",
    forFounder: true,
    mustWatch: true,
    imageUrl: "./assets/modules/strategy.jpg",
    submodules: [
      "Business-aligned content strategy",
      "Audience analysis and targeting",
      "Content pillar development"
    ]
  },
  {
    track: "Foundational Track",
    title: "Industry Analysis & Positioning",
    description: "Establish your unique market position through competitor analysis and differentiation strategies",
    icon: "target",
    forFounder: true,
    mustWatch: false,
    imageUrl: "./assets/modules/positioning.jpg",
    submodules: [
      "Market gap identification",
      "Competitive differentiation",
      "Authority positioning frameworks"
    ]
  },
  {
    track: "Foundational Track",
    title: "Creating Your Content Identity",
    description: "Develop a distinct and recognizable content style that cuts through the noise",
    icon: "feather",
    forFounder: true,
    mustWatch: false,
    imageUrl: "./assets/modules/branding.jpg",
    submodules: [
      "Visual identity development",
      "Voice and tone guidelines",
      "Brand consistency across platforms"
    ]
  },
  {
    track: "Foundational Track",
    title: "Algorithm Optimization",
    description: "Understand how platform algorithms work and how to optimize your content for maximum reach",
    icon: "trending-up",
    forFounder: true,
    mustWatch: true,
    imageUrl: "./assets/modules/algorithm.jpg",
    submodules: [
      "Platform-specific algorithm insights",
      "Engagement metrics optimization",
      "Trend analysis and utilization"
    ]
  },
  
  // Content Creation Track - Important for content creators and team members
  {
    track: "Content Creation",
    title: "Hook Writing Masterclass",
    description: "Master the art of creating hooks that stop the scroll and captivate viewers in the first 3 seconds",
    icon: "anchor",
    forFounder: false,
    mustWatch: false,
    color: "#4F46E5", // Indigo
    imageUrl: "./assets/modules/hooks.jpg",
    submodules: [
      "Pattern interruption techniques",
      "Data-backed hook formulas",
      "A/B testing hooks methodology"
    ]
  },
  {
    track: "Content Creation",
    title: "Story-Driven Content Creation",
    description: "Use storytelling principles to create emotional connections with your audience",
    icon: "book-open",
    forFounder: false,
    mustWatch: false,
    color: "#4F46E5", // Indigo
    imageUrl: "./assets/modules/storytelling.jpg",
    submodules: [
      "Story structure for short-form",
      "Personal narrative development",
      "Emotion-driven content patterns"
    ]
  },
  {
    track: "Content Creation",
    title: "Script Writing for Vertical",
    description: "Write compelling scripts optimized for vertical video that deliver your message effectively",
    icon: "edit-3",
    forFounder: false,
    mustWatch: false,
    color: "#4F46E5", // Indigo
    imageUrl: "./assets/modules/scriptwriting.jpg",
    submodules: [
      "Vertical-optimized script formats",
      "Concise messaging techniques",
      "Call-to-action optimization"
    ]
  },
  {
    track: "Content Creation",
    title: "Research & Content Planning",
    description: "Data-driven approaches to discover what your audience wants and how to deliver it",
    icon: "search",
    forFounder: false,
    mustWatch: false,
    color: "#4F46E5", // Indigo
    imageUrl: "./assets/modules/research.jpg",
    submodules: [
      "Audience research methodologies",
      "Content gap analysis",
      "Trend identification techniques"
    ]
  },
  
  // Team Training Track - For videographers and editors
  {
    track: "Team Training",
    title: "Vertical Video Production",
    description: "Master the technical aspects of filming high-quality vertical content with any equipment",
    icon: "video",
    forFounder: false,
    mustWatch: false,
    color: "#0EA5E9", // Sky blue
    imageUrl: "./assets/modules/production.jpg",
    submodules: [
      "Camera settings optimization",
      "Lighting for vertical formats",
      "Audio quality enhancement"
    ]
  },
  {
    track: "Team Training",
    title: "Advanced Editing Techniques",
    description: "Learn professional editing techniques specifically optimized for short-form vertical content",
    icon: "scissors",
    forFounder: false,
    mustWatch: false,
    color: "#0EA5E9", // Sky blue
    imageUrl: "./assets/modules/editing.jpg",
    submodules: [
      "Pacing and rhythm techniques",
      "Visual effects optimization",
      "Transition mastery for engagement"
    ]
  },
  {
    track: "Team Training",
    title: "Podcast Repurposing Pipeline",
    description: "Transform long-form podcast content into engaging short-form vertical clips",
    icon: "mic",
    forFounder: false,
    mustWatch: false,
    color: "#0EA5E9", // Sky blue
    imageUrl: "./assets/modules/podcast.jpg",
    submodules: [
      "Content chunking framework",
      "Highlight identification system",
      "Visual overlay strategies"
    ]
  },
  {
    track: "Team Training",
    title: "Platform-Specific Optimization",
    description: "Tailor your content for maximum performance on each specific platform",
    icon: "smartphone",
    forFounder: false,
    mustWatch: false,
    color: "#0EA5E9", // Sky blue
    imageUrl: "./assets/modules/platforms.jpg",
    submodules: [
      "Platform feature utilization",
      "Algorithm-specific adjustments",
      "Format optimization by platform"
    ]
  },
  
  // Growth Track - Important for marketing team and founders
  {
    track: "Growth Strategy",
    title: "Viral Content Architecture",
    description: "Learn the science behind content that spreads organically through audience sharing",
    icon: "zap",
    forFounder: true,
    mustWatch: true,
    imageUrl: "./assets/modules/viral.jpg",
    submodules: [
      "Viral trigger incorporation",
      "Social sharing psychology",
      "Content velocity strategies"
    ]
  },
  {
    track: "Growth Strategy",
    title: "LinkedIn Content Mastery",
    description: "Specialized hour-long module on maximizing LinkedIn for B2B growth and personal branding",
    icon: "linkedin",
    forFounder: true,
    mustWatch: true,
    imageUrl: "./assets/modules/linkedin.jpg",
    submodules: [
      "LinkedIn algorithm specifics",
      "B2B content optimization",
      "Professional audience engagement"
    ]
  },
  {
    track: "Growth Strategy",
    title: "Multi-Platform Repurposing",
    description: "Maximize your content's impact by strategically adapting it for multiple platforms",
    icon: "repeat",
    forFounder: false,
    mustWatch: false,
    imageUrl: "./assets/modules/repurposing.jpg",
    submodules: [
      "Cross-platform content strategy",
      "Asset management systems",
      "Efficiency in repurposing"
    ]
  },
  {
    track: "Growth Strategy",
    title: "Data-Led Iteration",
    description: "Use analytics to continuously improve your content strategy and increase performance",
    icon: "bar-chart-2",
    forFounder: true,
    mustWatch: false,
    imageUrl: "./assets/modules/data.jpg",
    submodules: [
      "Performance metrics analysis",
      "Testing frameworks",
      "Continuous improvement cycles"
    ]
  },
  
  // Team Building Track
  {
    track: "Team Building",
    title: "Content Team Structure",
    description: "Learn how to build and structure the ideal content team for your specific business needs",
    icon: "users",
    forFounder: true,
    mustWatch: true,
    color: "#F43F5E", // Rose
    imageUrl: "./assets/modules/team.jpg",
    submodules: [
      "Role definition and documentation",
      "Team composition planning",
      "Hiring and onboarding frameworks"
    ]
  },
  {
    track: "Team Building",
    title: "Delegation Systems",
    description: "Learn how to effectively delegate content creation while maintaining quality and brand voice",
    icon: "share-2",
    forFounder: true,
    mustWatch: false,
    color: "#F43F5E", // Rose
    imageUrl: "./assets/modules/delegation.jpg",
    submodules: [
      "Task delegation frameworks",
      "Quality control systems",
      "Brand consistency protocols"
    ]
  },
  {
    track: "Team Building",
    title: "Team Management",
    description: "Manage your content team effectively with minimal founder time investment",
    icon: "clipboard",
    forFounder: true,
    mustWatch: false,
    color: "#F43F5E", // Rose
    imageUrl: "./assets/modules/management.jpg",
    submodules: [
      "Performance measurement systems",
      "Workflow optimization",
      "Team motivation strategies"
    ]
  },
  {
    track: "Team Building",
    title: "Content Calendar Systems",
    description: "Build efficient content scheduling systems that make production consistent and reliable",
    icon: "calendar",
    forFounder: true,
    mustWatch: false,
    color: "#F43F5E", // Rose
    imageUrl: "./assets/modules/calendar.jpg",
    submodules: [
      "Calendar setup and organization",
      "Content batching strategies",
      "Publishing schedule optimization"
    ]
  },
  
  // Business Systems Track
  {
    track: "Business Systems",
    title: "Content-to-Cash Conversion",
    description: "Convert your content audience into leads and customers through strategic monetization",
    icon: "dollar-sign",
    forFounder: true,
    mustWatch: true,
    color: "#10B981", // Emerald
    imageUrl: "./assets/modules/conversion.jpg",
    submodules: [
      "Call-to-action optimization",
      "Traffic-to-lead funnels",
      "Offer presentation strategies"
    ]
  },
  {
    track: "Business Systems",
    title: "Content ROI Analysis",
    description: "Measure and optimize the business impact of your content efforts",
    icon: "pie-chart",
    forFounder: true,
    mustWatch: false,
    color: "#10B981", // Emerald
    imageUrl: "./assets/modules/roi.jpg",
    submodules: [
      "Content performance metrics",
      "Attribution modeling",
      "Investment optimization strategies"
    ]
  },
  {
    track: "Business Systems",
    title: "Content Production Systems",
    description: "Build efficient systems that make content creation consistent and scalable",
    icon: "settings",
    forFounder: true,
    mustWatch: false,
    color: "#10B981", // Emerald
    imageUrl: "./assets/modules/systems.jpg",
    submodules: [
      "Production pipeline development",
      "Quality control frameworks",
      "Streamlined approval processes"
    ]
  },
  {
    track: "Business Systems",
    title: "Long-term Authority Building",
    description: "Use vertical content as part of a broader strategy to build enduring industry authority",
    icon: "award",
    forFounder: true,
    mustWatch: false,
    color: "#10B981", // Emerald
    imageUrl: "./assets/modules/authority.jpg",
    submodules: [
      "Content authority ladders",
      "Trust-building content patterns",
      "Thought leadership positioning"
    ]
  }
];

/**
 * Renders the modules list by track
 */
export function renderModulesList() {
  console.log('Rendering modules list by track...');
  
  const modulesContainer = document.querySelector('.modules-container');
  
  if (!modulesContainer) {
    console.error('Modules container not found - make sure .modules-container exists in your HTML');
    return;
  }

  // Clear any existing content
  modulesContainer.innerHTML = '';
  
  // Group modules by track
  const modulesByTrack = {};
  courseModules.forEach(module => {
    if (!modulesByTrack[module.track]) {
      modulesByTrack[module.track] = [];
    }
    modulesByTrack[module.track].push(module);
  });
  
  // Create a track section for each track
  Object.keys(modulesByTrack).forEach(trackName => {
    const trackModules = modulesByTrack[trackName];
    
    // Create track header
    const trackHeader = document.createElement('div');
    trackHeader.className = 'track-header';
    trackHeader.innerHTML = `
      <h3 class="track-title">${trackName}</h3>
      <p class="track-description">${getTrackDescription(trackName)}</p>
    `;
    
    // Create track container
    const trackContainer = document.createElement('div');
    trackContainer.className = 'track-modules';
    
    // Add modules to track container
    trackModules.forEach(module => {
      const moduleCard = createModuleCard(module);
      trackContainer.appendChild(moduleCard);
    });
    
    // Add track header and container to modules container
    modulesContainer.appendChild(trackHeader);
    modulesContainer.appendChild(trackContainer);
  });
  
  // Initialize hover/click interactions for module cards
  initModuleInteractions();
  
  // Initialize Feather icons if available
  if (typeof feather !== 'undefined' && feather.replace) {
    feather.replace();
  } else {
    console.warn('Feather icons not found - make sure to include the feather-icons library');
  }
  
  console.log('Modules list rendered with', courseModules.length, 'modules across', Object.keys(modulesByTrack).length, 'tracks');
}

/**
 * Creates a DOM element for a single module card
 */
function createModuleCard(module) {
  // Create the module card element
  const moduleCard = document.createElement('div');
  moduleCard.className = 'module-card';
  
  if (module.forFounder) {
    moduleCard.classList.add('for-founder');
  }
  
  if (module.mustWatch) {
    moduleCard.classList.add('must-watch');
  }
  
  if (module.color) {
    moduleCard.style.setProperty('--module-color', module.color);
  }
  
  // Create the module content
  moduleCard.innerHTML = `
    <div class="module-icon">
      <i data-feather="${module.icon}"></i>
    </div>
    <div class="module-content">
      ${module.forFounder ? '<div class="founder-indicator"></div>' : ''}
      ${module.mustWatch ? '<div class="must-watch-badge">Must Watch</div>' : ''}
      <h3 class="module-title">${module.title}</h3>
      <p class="module-description">${module.description}</p>
      <div class="module-image ${module.imageUrl ? '' : 'placeholder'}" ${module.imageUrl ? `style="background-image: url('${module.imageUrl}')"` : ''}>
        ${!module.imageUrl ? '<span>Module image coming soon</span>' : ''}
      </div>
      <div class="module-details">
        <h4 class="submodules-title">What you'll learn:</h4>
        <ul class="submodules-list">
          ${module.submodules.map(submodule => `<li>${submodule}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
  
  return moduleCard;
}

/**
 * Initialize hover/click interactions for module cards
 */
function initModuleInteractions() {
  const moduleCards = document.querySelectorAll('.module-card');
  
  moduleCards.forEach(card => {
    // Toggle expanded state on click/tap
    card.addEventListener('click', function() {
      // If already expanded, collapse it
      if (this.classList.contains('expanded')) {
        this.classList.remove('expanded');
        return;
      }
      
      // Collapse any currently expanded card
      const expandedCard = document.querySelector('.module-card.expanded');
      if (expandedCard) {
        expandedCard.classList.remove('expanded');
      }
      
      // Expand this card
      this.classList.add('expanded');
    });
  });
}

/**
 * Get description for each track
 */
function getTrackDescription(trackName) {
  const trackDescriptions = {
    "Foundational Track": "Essential modules for founders to establish the strategic foundation for vertical content success.",
    "Content Creation": "Content writing and ideation skills for creating engaging short-form videos that stop the scroll.",
    "Team Training": "Technical training for videographers, editors, and content producers to create professional content.",
    "Growth Strategy": "Strategic modules focused on maximizing reach and audience growth across platforms.",
    "Team Building": "Build and manage a high-performing content team that can operate with minimal founder involvement.",
    "Business Systems": "Convert content views into business results with proven systems for monetization and scaling."
  };
  
  return trackDescriptions[trackName] || "Specialized modules for vertical video mastery.";
} 