// Module Directory Map - Vanilla JavaScript Implementation
document.addEventListener('DOMContentLoaded', function() {
  // Create the module map container
  const createModuleMap = () => {
    // Group modules by main category
    const modulesByCategory = {
      "Theory Basics": [
        "Starting an account", "Naming your account", "Creating a bio", "Managing highlights",
        "Developing your Linkspace", "Using Pinned Videos", "The Frame", 
        "Safe Zones & Clutter", "Visual Hierarchy", "Movement & Contrast"
      ],
      "Cardinal Principles": [
        "Cardinal Sins", "Cardinal Virtues", "Algorithmic Reality", 
        "How Videos Actually Grow", "Good Vs Bad in Short Form", 
        "Nailing What Actually Counts", "Applying it Across Platforms"
      ],
      "Hook Mastery": [
        "Using Clarity and Intrigue", "Developing Authority", "Nailing Delivery", 
        "The Text Hook", "The Visual Hook", "Nuanced Hooks", "BIG vs small",
        "False Assumptions", "The Impossible Question", "A Contrarian Statement",
        "This Just Happened!!?!", "PR: Who Are You?"
      ],
      "Scripting": [
        "Rule 1: Simplicity", "Rule 2: Being Concise", "Rule 3: Rehooking", 
        "Rule 4: Authenticity", "Rule 5: Storytelling", "Rule 6: Would I watch this?",
        "Bonus: Boulder Theory", "Script Mastery", "Getting it wrong (on purpose)",
        "The FOMO comment section", "Using Controversy"
      ],
      "Metrics & Analysis": [
        "Likes", "Saves", "Shares", "Retention", "Comments", 
        "Advanced Metrics", "Follower Conversion", "Completed Watchtime", 
        "Demographics", "Traffic Sources"
      ],
      "Platform Strategy": [
        "TikTok", "Instagram", "YouTube", "The Rest!", "Pillar Content Strategy",
        "Topics", "Buckets", "Data-Led Iteration"
      ],
      "Authority Building": [
        "Scripting for Authority", "The 6 Rules of Authority",
        "Brand Wholism", "Complex formats", "Remixing formats",
        "Breaking Expectations", "The Unexpected Pivot"
      ],
      "Content Management": [
        "What to do when it goes wrong", "How to save your page",
        "Handling Comments", "Reframing Anger", "Managing Debate",
        "The Best Kind of Comment", "Optimising for Conversion", "Optimising for Watch Time"
      ],
      "Production": [
        "Camera Confidence", "Producing a Podcast for Clips", 
        "Home Studio Setup", "Solo Phone Shooter", 
        "Lofi - respecting the medium", "Hifi - the founders paradox",
        "Editing Basics", "Editing Team", "Editing Advanced"
      ],
      "Research": [
        "Research and Writing", "Research advanced", "Generating Ideas",
        "Targeted Search", "Keyword Mapping", "Tailoring Your Algorithm",
        "Inspiration Through Different Sources", "Refining Your Script",
        "The Research Toolkit"
      ],
      "Repurposing": [
        "From Shortform", "From Longform", "From Articles", 
        "From LinkedIn", "Serialisation", "Podcast Clipping"
      ],
      "Planning & Distribution": [
        "Posting and Scheduling for Founders", "Posting for Creators", 
        "Platform Monetisation", "Partnerships", "Business Integration"
      ],
      "Delegation & Team": [
        "First bottlenecks", "Managing Creatives", "Videography Delegated",
        "Make Content Run Itself", "Team Pipeline Breakdown", "Team Workflow"
      ],
      "Conversion Strategy": [
        "Lead Magnets", "Youtube Strategy", "Podcasts", 
        "Building a Newsletter", "Using your platform for sales", 
        "Speaking engagements", "Taking People Off Platform"
      ]
    };

    // Define color schemes for each category (using brand colors)
    const categoryColors = {
      "Theory Basics": { bg: "#0F474A", text: "#FDF7E4" },
      "Cardinal Principles": { bg: "#123C55", text: "#FDF7E4" },
      "Hook Mastery": { bg: "#186080", text: "#FDF7E4" },
      "Scripting": { bg: "#3196AD", text: "#FDF7E4" },
      "Metrics & Analysis": { bg: "#D45D56", text: "#FDF7E4" },
      "Platform Strategy": { bg: "#F49272", text: "#08141B" },
      "Authority Building": { bg: "#FFC590", text: "#08141B" },
      "Content Management": { bg: "#FDF7E4", text: "#08141B" },
      "Production": { bg: "#A12C3B", text: "#FDF7E4" },
      "Research": { bg: "#E76662", text: "#FDF7E4" },
      "Repurposing": { bg: "#33626F", text: "#FDF7E4" },
      "Planning & Distribution": { bg: "#378596", text: "#FDF7E4" },
      "Delegation & Team": { bg: "#FEAF52", text: "#08141B" },
      "Conversion Strategy": { bg: "#FA9644", text: "#08141B" }
    };

    // Count total modules
    const totalModules = Object.values(modulesByCategory).reduce(
      (total, modules) => total + modules.length, 0
    );

    // Create main container
    const moduleMapContainer = document.createElement('div');
    moduleMapContainer.className = 'module-map-container';
    moduleMapContainer.id = 'module-map';

    // Create header section
    const headerSection = document.createElement('div');
    headerSection.className = 'module-map-header';
    headerSection.innerHTML = `
      <h2 class="module-map-title">Complete Course Curriculum</h2>
      <p class="module-map-subtitle">
        A comprehensive framework with <span id="module-counter" class="module-count-highlight">${totalModules}+ lessons</span> 
        designed specifically for founders and their teams
      </p>
      <p class="module-map-instruction">Click any category to explore the modules</p>
    `;
    moduleMapContainer.appendChild(headerSection);

    // Create grid for module categories
    const moduleGrid = document.createElement('div');
    moduleGrid.className = 'module-grid';

    // Add categories to grid
    Object.keys(modulesByCategory).forEach(category => {
      // Create category card
      const categoryCard = document.createElement('div');
      categoryCard.className = 'category-card';
      categoryCard.dataset.category = category;

      // Create category header
      const categoryHeader = document.createElement('div');
      categoryHeader.className = 'category-header';
      categoryHeader.style.backgroundColor = categoryColors[category].bg;
      categoryHeader.style.color = categoryColors[category].text;
      categoryHeader.innerHTML = `
        <h3 class="category-title">${category}</h3>
        <div class="category-meta">
          <span class="module-count">${modulesByCategory[category].length} modules</span>
          <svg class="chevron-icon" viewBox="0 0 24 24">
            <path d="M19 9l-7 7-7-7" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        </div>
      `;
      categoryCard.appendChild(categoryHeader);

      // Create modules list container (initially hidden)
      const modulesList = document.createElement('div');
      modulesList.className = 'modules-list collapsed';
      
      // Create unordered list for modules
      const modulesUl = document.createElement('ul');
      
      // Add module items
      modulesByCategory[category].forEach(module => {
        const moduleItem = document.createElement('li');
        moduleItem.className = 'module-item';
        moduleItem.innerHTML = `
          <div class="module-bullet" style="background-color: ${categoryColors[category].bg}"></div>
          <span class="module-name">${module}</span>
        `;
        modulesUl.appendChild(moduleItem);
      });
      
      modulesList.appendChild(modulesUl);
      categoryCard.appendChild(modulesList);
      
      // Add click event to toggle category
      categoryCard.addEventListener('click', function() {
        // Toggle active class on the card
        this.classList.toggle('active');
        
        // Toggle the modules list
        const modulesList = this.querySelector('.modules-list');
        if (modulesList.classList.contains('collapsed')) {
          modulesList.classList.remove('collapsed');
          modulesList.classList.add('expanded');
          this.querySelector('.chevron-icon').classList.add('rotated');
        } else {
          modulesList.classList.add('collapsed');
          modulesList.classList.remove('expanded');
          this.querySelector('.chevron-icon').classList.remove('rotated');
        }
      });
      
      moduleGrid.appendChild(categoryCard);
    });

    moduleMapContainer.appendChild(moduleGrid);

    // Create CTA section
    const ctaSection = document.createElement('div');
    ctaSection.className = 'module-map-cta';
    ctaSection.innerHTML = `
      <a href="#pricing" class="cta-button">Explore Pricing Options</a>
    `;
    moduleMapContainer.appendChild(ctaSection);

    return moduleMapContainer;
  };

  // Add pulse animation to module counter
  const setupPulseAnimation = () => {
    setInterval(() => {
      const counter = document.getElementById('module-counter');
      if (counter) {
        counter.classList.add('pulse');
        setTimeout(() => {
          counter.classList.remove('pulse');
        }, 1000);
      }
    }, 5000);
  };

  // Add CSS styles for the module map
  const addModuleMapStyles = () => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .module-map-container {
        background-color: rgba(15, 23, 42, 0.9);
        color: #ffffff;
        padding: 2rem;
        border-radius: 1rem;
        max-width: 1200px;
        margin: 2rem auto;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      }

      .module-map-header {
        text-align: center;
        margin-bottom: 2.5rem;
      }

      .module-map-title {
        font-size: 2rem;
        font-weight: 800;
        margin-bottom: 1rem;
        background: linear-gradient(90deg, #FEAF52, #D45D56, #186080);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .module-map-subtitle {
        color: #cbd5e1;
        margin-bottom: 1rem;
        font-size: 1.125rem;
      }

      .module-count-highlight {
        color: #D45D56;
        font-weight: bold;
      }

      .module-map-instruction {
        font-size: 0.875rem;
        color: #94a3b8;
      }

      .module-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 1rem;
      }

      .category-card {
        border-radius: 0.75rem;
        overflow: hidden;
        transition: all 0.3s ease;
        cursor: pointer;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }

      .category-card:hover {
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
        transform: translateY(-2px);
      }

      .category-card.active {
        box-shadow: 0 10px 20px rgba(212, 93, 86, 0.2);
      }

      .category-header {
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .category-title {
        font-weight: 700;
        font-size: 1.125rem;
      }

      .category-meta {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .module-count {
        font-size: 0.875rem;
      }

      .chevron-icon {
        width: 1rem;
        height: 1rem;
        transition: transform 0.3s ease;
      }

      .chevron-icon.rotated {
        transform: rotate(180deg);
      }

      .modules-list {
        transition: all 0.3s ease;
        overflow: hidden;
        background-color: rgba(15, 23, 42, 0.7);
      }

      .modules-list.collapsed {
        max-height: 0;
      }

      .modules-list.expanded {
        max-height: 500px;
      }

      .modules-list ul {
        list-style: none;
        padding: 1rem;
      }

      .module-item {
        display: flex;
        align-items: flex-start;
        margin-bottom: 0.75rem;
      }

      .module-bullet {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        margin-right: 0.75rem;
        margin-top: 0.45rem;
        flex-shrink: 0;
      }

      .module-name {
        font-size: 0.875rem;
        color: #cbd5e1;
      }

      .module-map-cta {
        margin-top: 2rem;
        text-align: center;
      }

      .cta-button {
        display: inline-block;
        padding: 0.75rem 1.5rem;
        background: linear-gradient(90deg, #D45D56, #186080);
        color: white;
        font-weight: 600;
        border-radius: 0.5rem;
        text-decoration: none;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }

      .cta-button:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 20px rgba(212, 93, 86, 0.3);
      }

      .pulse {
        animation: pulse-animation 1s ease-out;
      }
      
      @keyframes pulse-animation {
        0% { transform: scale(1); }
        50% { transform: scale(1.15); }
        100% { transform: scale(1); }
      }
      
      /* Media queries for responsiveness */
      @media (max-width: 768px) {
        .module-grid {
          grid-template-columns: 1fr;
        }
        
        .module-map-container {
          padding: 1.5rem;
          margin: 1rem;
        }
        
        .module-map-title {
          font-size: 1.75rem;
        }
      }
    `;
    
    document.head.appendChild(styleElement);
  };

  // Initialize the module map
  const initModuleMap = () => {
    // First add styles
    addModuleMapStyles();
    
    // Create module map
    const moduleMap = createModuleMap();
    
    // Find target container or create one
    let targetContainer = document.getElementById('module-directory-container');
    if (!targetContainer) {
      targetContainer = document.createElement('div');
      targetContainer.id = 'module-directory-container';
      
      // Try to find modules section or append to body
      const modulesSection = document.querySelector('.modules-section .container') || document.body;
      modulesSection.appendChild(targetContainer);
    }
    
    // Append module map to container
    targetContainer.appendChild(moduleMap);
    
    // Setup pulse animation
    setupPulseAnimation();
  };

  // Run initialization
  initModuleMap();
}); 