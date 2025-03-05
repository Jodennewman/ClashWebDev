import { pricingTiers } from './pricingData.js';

/**
 * Renders the pricing table using the pricing data
 */
export function renderPricingTable() {
  console.log('Rendering pricing table...');
  
  const pricingContainer = document.querySelector('.pricing-cards-container');
  
  if (!pricingContainer) {
    console.error('Pricing container not found - make sure .pricing-cards-container exists in your HTML');
    return;
  }

  // Clear any existing content
  pricingContainer.innerHTML = '';
  
  // Add each pricing tier card to the container
  pricingTiers.forEach(tier => {
    const cardHTML = createPricingCard(tier);
    pricingContainer.innerHTML += cardHTML;
  });
  
  // Add the comparison table directly after the pricing cards
  const pricingSection = document.querySelector('.pricing-section .container');
  if (pricingSection) {
    // Create the eyeball decoration for the table header
    const eyeballDecorations = createEyeballDecorations();
    
    // Create the comparison table (visible by default)
    const comparisonTable = document.createElement('div');
    comparisonTable.className = 'comparison-table-wrapper';
    comparisonTable.innerHTML = `
      <h3 class="comparison-title">Compare All Features</h3>
      ${eyeballDecorations}
      <div class="comparison-table">
        ${createComparisonTable()}
      </div>
    `;
    
    // Add the table to the DOM
    pricingSection.appendChild(comparisonTable);
    
    // Initialize feather icons
    if (typeof feather !== 'undefined' && feather.replace) {
      feather.replace();
    }
    
    // Add styles for the comparison table
    addComparisonTableStyles();
  }
  
  console.log('Pricing table rendered with', pricingTiers.length, 'tiers');
}

/**
 * Creates HTML for a single pricing card
 */
function createPricingCard(tier) {
  const popularBadge = tier.popular 
    ? `<div class="popular-badge"><span>Most Popular</span></div>` 
    : '';
  
  // Limit features to a maximum of 5 per card to keep similar heights
  const limitedFeatures = tier.features.slice(0, 5);
  
  // Highlight key features with more prominent styling
  const featuresHTML = limitedFeatures.map((feature, index) => {
    const isHighlighted = index < 3; // Highlight the first 3 features
    return `
      <li class="pricing-feature ${isHighlighted ? 'feature-highlight' : ''}">
        <span class="feature-bullet" style="background-color: ${tier.color}"></span>
        ${feature}
      </li>
    `;
  }).join('');
  
  // For the third tier, replace the price with "Applications Only"
  const priceDisplay = tier.name === "Viral Growth Engine" 
    ? `<p style="font-size: 0.7rem;">Starting at:</p><div class="pricing-card-price applications-only" style="color: ${tier.color}">${tier.price}*</div><p style="font-size: 0.7rem; position: absolute; bottom: 0.5rem; left: 2rem;">*Limited to Availability, Inquire by Application to Learn More</p>` 
    : `<div class="pricing-card-price" style="color: ${tier.color}">${tier.price}</div>`;
  
  return `
    <div class="pricing-card ${tier.popular ? 'popular' : ''}" style="border-top: 5px solid ${tier.color}">
      ${popularBadge}
      <h3 class="pricing-card-title" style="color: ${tier.color}">${tier.name}</h3>
      ${priceDisplay}
      <p class="pricing-card-description">${tier.description}</p>
      <a href="${tier.buttonLink}" class="cta-button" style="background-color: ${tier.color}; text-align: center;">${tier.buttonText}</a>
      <ul class="pricing-features">
        ${featuresHTML}
      </ul>
    </div>
  `;
}

/**
 * Creates the comparison table HTML
 */
function createComparisonTable() {
  // Get all feature categories from the first tier's featureDetails
  const featureCategories = Object.keys(pricingTiers[0].featureDetails);
  
  // Create the table header
  let tableHTML = `
    <table>
      <thead>
        <tr>
          <th class="feature-col">Feature</th>
          ${pricingTiers.map(tier => `
            <th class="tier-header" style="background-color: ${tier.color}; color: white;">
              ${tier.name}
              <div class="tier-price">${tier.price}</div>
            </th>
          `).join('')}
        </tr>
      </thead>
      <tbody>
  `;
  
  // Create a row for each feature category
  featureCategories.forEach((category, index) => {
    tableHTML += `
      <tr class="${index % 2 === 0 ? 'row-alternate' : ''}">
        <td class="feature-name">${category}</td>
        ${pricingTiers.map(tier => {
          const value = tier.featureDetails[category];
          const isIncluded = value !== "No";
          
          return `<td class="feature-check" style="color: ${tier.color}">
            ${isIncluded 
              ? value === "Yes" 
                ? `<div class="check-circle" style="background-color: ${tier.color}"><i data-feather="check" class="feature-icon"></i></div>` 
                : `<div class="feature-value">${value}</div>`
              : `<div class="feature-dash">—</div>`
            }
          </td>`;
        }).join('')}
      </tr>
    `;
  });
  
  // Close the table
  tableHTML += `
      </tbody>
    </table>
  `;
  
  return tableHTML;
}

/**
 * Creates decorative eyeball elements for the table header
 */
function createEyeballDecorations() {
  return `
    <div class="eyeball-decorations">
      <div class="eyeball eyeball-left">
        <div class="eyeball-outer">
          <div class="eyeball-inner">
            <div class="eyeball-pupil"></div>
          </div>
        </div>
      </div>
      <div class="eyeball eyeball-right">
        <div class="eyeball-outer">
          <div class="eyeball-inner">
            <div class="eyeball-pupil"></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Adds custom CSS for the comparison table to the document head
 */
function addComparisonTableStyles() {
  const style = document.createElement('style');
  style.textContent = `
    /* Pricing Card Styles Update */
    .pricing-card {
      min-height: 520px;
      height: 100%;
    }
    
    .pricing-cards-container {
      align-items: stretch;
    }
    
    .popular-badge {
      z-index: 10;
      transform: translate(25%, -25%) rotate(45deg);
    }
    
    .pricing-card.popular {
      z-index: 5;
    }
    
    /* Feature highlight styles */
    .feature-highlight {
      font-weight: 600;
      font-size: 1.05rem;
    }
    
    /* Update pricing cards to match the promotional style */
    .pricing-card {
      background: linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%);
      border-radius: 1.5rem;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
      transform: translateY(0);
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    .pricing-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
    }
    
    .pricing-card.popular:hover {
      transform: scale(1.05) translateY(-10px);
    }
    
    .pricing-card-title {
      font-size: 2rem;
      letter-spacing: -0.02em;
      margin-bottom: 0.5rem;
    }
    
    .pricing-card-price {
      font-size: 3.5rem;
      font-weight: 800;
      margin-bottom: 1.5rem;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }
    
    .pricing-features .feature-highlight {
      font-size: 1.1rem;
      font-weight: 600;
    }
    
    /* Comparison Table Styling */
    .comparison-table-wrapper {
      margin-top: 5rem;
      position: relative;
      padding-top: 2rem;
    }
    
    .comparison-title {
      text-align: center;
      font-size: 2.5rem;
      font-weight: 800;
      margin-bottom: 2.5rem;
      background: linear-gradient(90deg, #f97316, #fb7185, #38bdf8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      position: relative;
      display: inline-block;
      left: 50%;
      transform: translateX(-50%);
    }
    
    .comparison-table {
      background-color: rgba(15, 23, 42, 0.7);
      border-radius: 1.5rem;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      position: relative;
      z-index: 10;
    }
    
    .comparison-table table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      color: var(--text-secondary);
    }
    
    .comparison-table th,
    .comparison-table td {
      padding: 1.25rem;
      text-align: center;
      position: relative;
    }
    
    .comparison-table th:not(:last-child)::after,
    .comparison-table td:not(:last-child)::after {
      content: '';
      position: absolute;
      right: 0;
      top: 20%;
      height: 60%;
      width: 1px;
      background: rgba(255, 255, 255, 0.1);
    }
    
    .comparison-table th.feature-col,
    .comparison-table td.feature-name {
      text-align: left;
      padding-left: 2.5rem;
      font-weight: 600;
      width: 30%;
      color: var(--text-primary);
    }
    
    .tier-header {
      font-size: 1.25rem;
      font-weight: 700;
      padding: 1.5rem 1rem !important;
      letter-spacing: 0.02em;
    }
    
    .tier-price {
      font-weight: 700;
      font-size: 1.5rem;
      margin-top: 0.5rem;
      opacity: 0.9;
    }
    
    .row-alternate {
      background-color: rgba(255, 255, 255, 0.03);
    }
    
    .check-circle {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      color: white;
    }
    
    .feature-icon {
      width: 1.5rem;
      height: 1.5rem;
      stroke-width: 3;
    }
    
    .feature-value {
      font-weight: 500;
      font-size: 0.95rem;
      padding: 0.5rem;
    }
    
    .feature-dash {
      font-size: 1.5rem;
      color: rgba(255, 255, 255, 0.2);
      font-weight: 300;
    }
    
    /* Eyeball decorations */
    .eyeball-decorations {
      position: absolute;
      width: 100%;
      top: -30px;
      left: 0;
      z-index: 5;
      pointer-events: none;
    }
    
    .eyeball {
      position: absolute;
      width: 60px;
      height: 60px;
    }
    
    .eyeball-left {
      left: 15%;
      top: 0;
    }
    
    .eyeball-right {
      right: 15%;
      top: 10px;
    }
    
    .eyeball-outer {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
    
    .eyeball-inner {
      width: 70%;
      height: 70%;
      border-radius: 50%;
      background: #38bdf8;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .eyeball-pupil {
      width: 50%;
      height: 50%;
      border-radius: 50%;
      background: #0f172a;
    }
    
    /* Responsive design */
    @media (max-width: 992px) {
      .comparison-table th.feature-col,
      .comparison-table td.feature-name {
        width: 40%;
      }
      
      .eyeball-left {
        left: 5%;
      }
      
      .eyeball-right {
        right: 5%;
      }
    }
    
    @media (max-width: 768px) {
      .comparison-table {
        overflow-x: auto;
      }
      
      .comparison-table table {
        min-width: 700px;
      }
      
      .comparison-title {
        font-size: 2rem;
      }
      
      .tier-header {
        font-size: 1.1rem;
      }
      
      .tier-price {
        font-size: 1.2rem;
      }
      
      .feature-value {
        font-size: 0.9rem;
      }
      
      .eyeball {
        width: 40px;
        height: 40px;
      }
    }
  `;
  document.head.appendChild(style);
}

export function renderModulesList() {
  return new Promise((resolve) => {
    const modulesContainer = document.querySelector('.modules-container');
    
    if (!modulesContainer) {
      console.error('Modules container not found');
      resolve();
      return;
    }
    
    // Clear existing content first
    modulesContainer.innerHTML = '';
    
    // Create a bold intro section
    const introSection = document.createElement('div');
    introSection.className = 'modules-intro';
    introSection.innerHTML = `
      <div class="modules-stats">
        <div class="module-stat">
          <span class="stat-number">20+</span>
          <span class="stat-label">Core Modules</span>
        </div>
        <div class="module-stat">
          <span class="stat-number">100+</span>
          <span class="stat-label">Video Lessons</span>
        </div>
        <div class="module-stat">
          <span class="stat-number">48</span>
          <span class="stat-label">Templates & Resources</span>
        </div>
        <div class="module-stat">
          <span class="stat-number">12</span>
          <span class="stat-label">Live Workshops</span>
        </div>
      </div>
      <p class="modules-value-prop">Our comprehensive curriculum is built for founders who need results, not theory. Each module includes 5-6 actionable sub-modules with templates, swipe files, and done-for-you resources to implement immediately.</p>
    `;
    
    // Add the intro section before the modules
    modulesContainer.appendChild(introSection);
    
    // Create a container for the module cards
    const modulesGrid = document.createElement('div');
    modulesGrid.className = 'modules-grid';
    modulesContainer.appendChild(modulesGrid);
    
    // Define module categories with their specific submodules
    const moduleCategories = [
      {
        icon: 'compass',
        category: 'Foundation',
        title: 'Framework & Strategy',
        description: 'Build your content system from the ground up',
        submodules: [
          'Setting Your Authority Pillars',
          'Audience Insight Research', 
          'Content Strategy Canvas',
          'Growth System Blueprint',
          'Team Structure & Roles',
          'Content ROI Mapping'
        ],
        workshops: 'Authority Positioning Workshop'
      },
      {
        icon: 'target',
        category: 'Content',
        title: 'Hooks & Scripts',
        description: 'Create attention-grabbing content that converts',
        submodules: [
          'Hook Formulas That Convert',
          'Viral Script Templates',
          'Pattern Interrupts Masterclass',
          'Storytelling Frameworks',
          'Call-to-Value Sequences',
          'Emotional Triggers Library'
        ],
        workshops: 'Hook Writing Intensive'
      },
      {
        icon: 'video',
        category: 'Production',
        title: 'Recording & Editing',
        description: 'Professional-quality content creation without the tech overwhelm',
        submodules: [
          'Minimalist Equipment Guide',
          'Smartphone Filming Setup',
          'Lighting & Sound Optimization',
          'Basic Editing Workflows',
          'Template-Based Editing',
          'Batch Recording System'
        ],
        workshops: 'Tech & Setup Walkthrough'
      },
      {
        icon: 'bar-chart-2',
        category: 'Growth',
        title: 'Distribution & Algorithms',
        description: 'Master platform-specific growth strategies',
        submodules: [
          'Platform Algorithm Decoders',
          'Cross-Platform Repurposing',
          'Engagement Trigger Tactics',
          'Hashtag & Keyword Strategy',
          'Trend Surfing Framework',
          'Analytics & Iteration System'
        ],
        workshops: 'Algorithm Mastery Session'
      },
      {
        icon: 'users',
        category: 'Scaling',
        title: 'Team & Systems',
        description: 'Scale your content machine without your constant involvement',
        submodules: [
          'Team Hiring Playbook',
          'SOPs & Process Documentation',
          'Approval Workflows',
          'Content Calendar Systems',
          'Quality Control Checklists',
          'Team Training Modules'
        ],
        workshops: 'Team Scaling Blueprint'
      },
      {
        icon: 'dollar-sign',
        category: 'Monetization',
        title: 'Conversion & Sales',
        description: 'Turn views into business growth and revenue',
        submodules: [
          'Content-to-Cash Pipelines',
          'Soft CTA Frameworks',
          'DM Conversion Scripts',
          'Social Selling Templates',
          'Funnel Integration Models',
          'Affiliate & Partnership Systems'
        ],
        workshops: 'Sales Conversion Intensive'
      },
      {
        icon: 'shield',
        category: 'Advanced',
        title: 'Credibility & Authority',
        description: 'Position yourself as the go-to expert in your space',
        submodules: [
          'Authority Content Framework',
          'Media Feature Strategy',
          'Expert Positioning Tactics',
          'Social Proof Amplification',
          'Thought Leadership Content',
          'Network Expansion Protocol'
        ],
        workshops: 'Authority Acceleration Workshop'
      },
      {
        icon: 'trending-up',
        category: 'Mastery',
        title: 'Optimization & Analytics',
        description: 'Fine-tune your system for maximum ROI',
        submodules: [
          'Performance Analytics Dashboard',
          'Content Testing Framework',
          'Conversion Optimization',
          'A/B Testing Scripts',
          'Engagement Metrics Analysis',
          'ROI Tracking System'
        ],
        workshops: 'Analytics Deep Dive'
      }
    ];
    
    // Create and append module cards
    moduleCategories.forEach(module => {
      const moduleCard = document.createElement('div');
      moduleCard.className = 'module-card';
      
      const moduleContent = `
        <div class="module-content">
          <div class="module-header">
            <div class="module-icon">
              <i data-feather="${module.icon}"></i>
            </div>
            <div>
              <p class="module-category">${module.category}</p>
              <h3 class="module-title">${module.title}</h3>
            </div>
          </div>
          <p class="module-description">${module.description}</p>
          
          <div class="module-submodules">
            <div class="submodules-header">
              <span class="submodules-count">${module.submodules.length} Sub-Modules</span>
              <button class="toggle-submodules">View All</button>
            </div>
            <ul class="submodules-list">
              ${module.submodules.map(submodule => `<li>${submodule}</li>`).join('')}
            </ul>
          </div>
          
          <div class="module-workshop">
            <span class="workshop-badge">Live Workshop</span>
            <span class="workshop-title">${module.workshops}</span>
          </div>
        </div>
      `;
      
      moduleCard.innerHTML = moduleContent;
      modulesGrid.appendChild(moduleCard);
    });
    
    // Add workshop/bonus section
    const bonusSection = document.createElement('div');
    bonusSection.className = 'modules-bonus-section';
    bonusSection.innerHTML = `
      <div class="bonus-header">
        <h3>Premium Bonuses Included</h3>
        <p>In addition to our core modules, you'll get access to these exclusive resources</p>
      </div>
      <div class="bonus-grid">
        <div class="bonus-item">
          <div class="bonus-icon">
            <i data-feather="calendar"></i>
          </div>
          <h4>Monthly Live Q&A Calls</h4>
          <p>Get your specific questions answered directly by our experts</p>
        </div>
        <div class="bonus-item">
          <div class="bonus-icon">
            <i data-feather="users"></i>
          </div>
          <h4>Private Community</h4>
          <p>Connect with other founders implementing the same system</p>
        </div>
        <div class="bonus-item">
          <div class="bonus-icon">
            <i data-feather="file-text"></i>
          </div>
          <h4>Swipe File Library</h4>
          <p>Copy-and-paste templates for every content type</p>
        </div>
        <div class="bonus-item">
          <div class="bonus-icon">
            <i data-feather="award"></i>
          </div>
          <h4>Certification Program</h4>
          <p>Get certified in the Vertical Shortcut methodology</p>
        </div>
      </div>
    `;
    
    modulesContainer.appendChild(bonusSection);
    
    // Initialize feather icons in the newly created elements
    if (window.feather) {
      window.feather.replace();
    }
    
    // Add toggle functionality for submodules
    document.querySelectorAll('.toggle-submodules').forEach(button => {
      button.addEventListener('click', () => {
        const list = button.closest('.module-submodules').querySelector('.submodules-list');
        list.classList.toggle('expanded');
        button.textContent = list.classList.contains('expanded') ? 'Hide' : 'View All';
      });
    });
    
    // Add CSS for the new modules section
    const style = document.createElement('style');
    style.textContent = `
      .modules-section {
        background-color: var(--dark-bg);
      }
      
      .modules-container {
        display: flex;
        flex-direction: column;
        gap: 3rem;
      }
      
      .modules-intro {
        text-align: center;
        margin-bottom: 2rem;
      }
      
      .modules-stats {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 2rem;
        margin-bottom: 2rem;
      }
      
      .module-stat {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      
      .stat-number {
        font-size: 3rem;
        font-weight: 800;
        background: linear-gradient(90deg, var(--orange) 0%, var(--pink) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        line-height: 1;
      }
      
      .stat-label {
        font-size: 1rem;
        color: var(--text-secondary);
        margin-top: 0.5rem;
      }
      
      .modules-value-prop {
        max-width: 800px;
        margin: 0 auto;
        font-size: 1.125rem;
        color: var(--text-secondary);
      }
      
      .modules-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 2rem;
      }
      
      .module-card {
        background-color: var(--card-bg);
        border-radius: 1rem;
        overflow: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        position: relative;
        border-top: 5px solid var(--blue);
        padding: 0;
        display: block;
      }
      
      .module-content {
        padding: 2rem;
      }
      
      .module-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
      }
      
      .module-header {
        display: flex;
        gap: 1.25rem;
        margin-bottom: 1.5rem;
      }
      
      .module-icon {
        background: linear-gradient(135deg, var(--blue), var(--pink));
        width: 50px;
        height: 50px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        flex-shrink: 0;
      }
      
      .module-icon svg {
        width: 24px;
        height: 24px;
      }
      
      .module-category {
        font-size: 0.875rem;
        text-transform: uppercase;
        color: var(--pink);
        font-weight: 600;
        letter-spacing: 0.05em;
        margin-bottom: 0.25rem;
      }
      
      .module-title {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
      }
      
      .module-description {
        color: var(--text-secondary);
        margin-bottom: 1.5rem;
        font-size: 0.9375rem;
      }
      
      .module-submodules {
        background-color: rgba(15, 23, 42, 0.4);
        border-radius: 0.75rem;
        padding: 1.25rem;
        margin-bottom: 1.5rem;
      }
      
      .submodules-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
      }
      
      .submodules-count {
        font-weight: 600;
        font-size: 0.875rem;
        color: var(--blue);
      }
      
      .toggle-submodules {
        background: transparent;
        border: none;
        color: var(--pink);
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
        transition: all 0.2s;
      }
      
      .toggle-submodules:hover {
        background-color: rgba(251, 113, 133, 0.1);
      }
      
      .submodules-list {
        list-style: none;
        margin: 0;
        padding: 0;
        max-height: 100px;
        overflow: hidden;
        transition: max-height 0.5s ease;
      }
      
      .submodules-list.expanded {
        max-height: 500px;
      }
      
      .submodules-list li {
        position: relative;
        padding-left: 1.5rem;
        margin-bottom: 0.75rem;
        color: var(--text-secondary);
        font-size: 0.875rem;
      }
      
      .submodules-list li::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0.5rem;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: var(--blue);
      }
      
      .module-workshop {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }
      
      .workshop-badge {
        background: linear-gradient(135deg, var(--orange), var(--pink));
        color: white;
        font-size: 0.75rem;
        font-weight: 600;
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
      }
      
      .workshop-title {
        font-size: 0.875rem;
        color: var(--text-secondary);
      }
      
      .modules-bonus-section {
        background-color: var(--card-bg);
        border-radius: 1rem;
        padding: 3rem;
        margin-top: 2rem;
        border-left: 5px solid var(--orange);
      }
      
      .bonus-header {
        text-align: center;
        margin-bottom: 2.5rem;
      }
      
      .bonus-header h3 {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 1rem;
        background: linear-gradient(90deg, var(--orange) 0%, var(--pink) 50%, var(--blue) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      
      .bonus-header p {
        color: var(--text-secondary);
        max-width: 600px;
        margin: 0 auto;
      }
      
      .bonus-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(240px, 1fr));
        gap: 2rem;
      }
      
      .bonus-item {
        text-align: center;
      }
      
      .bonus-icon {
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, var(--orange) 0%, var(--pink) 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1.25rem;
        color: white;
      }
      
      .bonus-icon svg {
        width: 28px;
        height: 28px;
      }
      
      .bonus-item h4 {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 0.75rem;
      }
      
      .bonus-item p {
        color: var(--text-secondary);
        font-size: 0.9375rem;
      }
      
      @media (max-width: 768px) {
        .modules-grid {
          grid-template-columns: 1fr;
        }
        
        .bonus-grid {
          grid-template-columns: 1fr;
        }
        
        .modules-bonus-section {
          padding: 2rem;
        }
      }
    `;
    
    document.head.appendChild(style);
    
    // Resolve the promise after everything is set up
    resolve();
  });
} 