// Pricing plans data
const pricingPlans = [
  {
    id: 'self-guided',
    title: 'Self-Guided',
    price: 497,
    period: 'one-time',
    subtitle: 'Perfect for DIY founders who want to implement at their own pace',
    popular: false,
    class: 'self-guided',
    ctaText: 'Get Started',
    ctaLink: '#checkout-self-guided',
    features: [
      {
        text: 'Full Course Access',
        description: 'Access to all modules and future updates'
      },
      {
        text: 'Community Support',
        description: 'Join our private community of founders'
      },
      {
        text: 'DIY Templates & Swipe Files',
        description: 'Copy-and-paste frameworks and templates'
      },
      {
        text: 'Implementation Guides',
        description: 'Step-by-step guides for self-implementation'
      },
      {
        text: 'Lifetime Access',
        description: 'Including all future updates and additions'
      },
      {
        text: 'Email Support',
        description: 'Get answers to your technical questions'
      }
    ]
  },
  {
    id: 'guided-implementation',
    title: 'Guided Implementation',
    price: 997,
    period: 'one-time',
    subtitle: 'For founders who want personalized guidance and faster results',
    popular: true,
    class: 'guided-implementation',
    ctaText: 'Get Guided Access',
    ctaLink: '#checkout-guided',
    features: [
      {
        text: 'Everything in Self-Guided',
        description: 'All features from the self-guided plan'
      },
      {
        text: '4 Implementation Calls',
        badge: 'Personalized',
        description: 'One-on-one coaching calls to accelerate your progress'
      },
      {
        text: 'Website & Strategy Audit',
        description: 'Expert review of your current vertical SaaS offering'
      },
      {
        text: 'Priority Email Support',
        description: '24-hour response time to your questions'
      },
      {
        text: 'Advanced Analytics Setup',
        description: 'Done-for-you analytics dashboard configuration'
      },
      {
        text: '60-Day Implementation Plan',
        badge: 'Custom',
        description: 'Tailored roadmap to get your vertical SaaS up and running'
      }
    ]
  },
  {
    id: 'agency-partnership',
    title: 'Agency Partnership',
    price: 2497,
    period: 'one-time',
    subtitle: 'For founders who want experts to handle the implementation',
    popular: false,
    class: 'agency-partnership',
    ctaText: 'Apply Now',
    ctaLink: '#apply-agency',
    features: [
      {
        text: 'Everything in Guided Implementation',
        description: 'All features from the guided implementation plan'
      },
      {
        text: 'Done-For-You Implementation',
        badge: 'VIP',
        description: 'Our team handles the entire setup process for you'
      },
      {
        text: 'Unlimited Support Calls',
        description: 'Get help whenever you need it during the implementation'
      },
      {
        text: 'Custom Integration Development',
        description: 'We build custom integrations for your specific needs'
      },
      {
        text: 'Marketing & Launch Support',
        description: 'Help with go-to-market strategy and execution'
      },
      {
        text: '90-Day Growth Plan',
        description: 'Strategic plan for scaling your vertical SaaS business'
      }
    ]
  }
];

// Function to render pricing cards
function renderPricingCards() {
  const container = document.querySelector('.pricing-cards-container');
  if (!container) return;
  
  container.innerHTML = pricingPlans.map(plan => `
    <div class="pricing-card ${plan.class} ${plan.popular ? 'popular' : ''}">
      ${plan.popular ? '<span class="popular-badge">Most Popular</span>' : ''}
      <div class="pricing-card-header">
        <h3 class="pricing-card-title">${plan.title}</h3>
        <div class="pricing-card-price">
          <span class="price-currency">$</span>${plan.price}
          <span class="price-period">/${plan.period}</span>
        </div>
        <p class="pricing-card-subtitle">${plan.subtitle}</p>
      </div>
      
      <ul class="pricing-features">
        ${plan.features.map(feature => `
          <li class="pricing-feature">
            <i data-feather="check-circle" class="pricing-feature-icon"></i>
            <div class="pricing-feature-text">
              <span class="pricing-feature-item">${feature.text}</span>
              ${feature.badge ? `<span class="feature-badge">${feature.badge}</span>` : ''}
              ${feature.description ? `<p class="pricing-feature-description">${feature.description}</p>` : ''}
            </div>
          </li>
        `).join('')}
      </ul>
      
      <a href="${plan.ctaLink}" class="pricing-card-cta">
        ${plan.ctaText}
        <i data-feather="arrow-right"></i>
      </a>
    </div>
  `).join('');
  
  // Initialize feather icons
  if (typeof feather !== 'undefined') {
    feather.replace();
  }
}

// Function to render comparison table
function renderComparisonTable() {
  const container = document.querySelector('.comparison-table-container');
  if (!container) return;
  
  const features = [
    { name: 'Course Access', tooltip: 'Access to all modules and content' },
    { name: 'Community Support', tooltip: 'Access to our private community' },
    { name: 'Templates & Swipes', tooltip: 'Ready-to-use templates and resources' },
    { name: 'Implementation Guides', tooltip: 'Step-by-step implementation instructions' },
    { name: 'Personal Coaching Calls', tooltip: 'One-on-one coaching sessions' },
    { name: 'Website & Strategy Audit', tooltip: 'Professional review of your setup' },
    { name: 'Priority Support', tooltip: 'Faster response times for your questions' },
    { name: 'Custom Implementation Plan', tooltip: 'Tailored plan for your specific needs' },
    { name: 'Done-For-You Setup', tooltip: 'Our team handles the implementation' },
    { name: 'Custom Integrations', tooltip: 'We build integrations for your specific needs' },
    { name: 'Marketing Support', tooltip: 'Help with marketing and launching' }
  ];
  
  const planFeatures = {
    'Self-Guided': {
      'Course Access': true,
      'Community Support': true,
      'Templates & Swipes': true,
      'Implementation Guides': true,
      'Personal Coaching Calls': false,
      'Website & Strategy Audit': false,
      'Priority Support': false,
      'Custom Implementation Plan': false,
      'Done-For-You Setup': false,
      'Custom Integrations': false,
      'Marketing Support': false
    },
    'Guided Implementation': {
      'Course Access': true,
      'Community Support': true,
      'Templates & Swipes': true,
      'Implementation Guides': true,
      'Personal Coaching Calls': true,
      'Website & Strategy Audit': true,
      'Priority Support': true,
      'Custom Implementation Plan': true,
      'Done-For-You Setup': false,
      'Custom Integrations': false,
      'Marketing Support': false
    },
    'Agency Partnership': {
      'Course Access': true,
      'Community Support': true,
      'Templates & Swipes': true,
      'Implementation Guides': true,
      'Personal Coaching Calls': true,
      'Website & Strategy Audit': true,
      'Priority Support': true,
      'Custom Implementation Plan': true,
      'Done-For-You Setup': true,
      'Custom Integrations': true,
      'Marketing Support': true
    }
  };
  
  container.innerHTML = `
    <table class="comparison-table">
      <thead>
        <tr>
          <th class="feature-column">Feature</th>
          ${pricingPlans.map(plan => `
            <th class="${plan.popular ? 'popular-column' : ''}">${plan.title}</th>
          `).join('')}
        </tr>
      </thead>
      <tbody>
        ${features.map(feature => `
          <tr>
            <td class="feature-name">
              ${feature.name}
              ${feature.tooltip ? `<i data-feather="info" class="feature-info" title="${feature.tooltip}"></i>` : ''}
            </td>
            ${pricingPlans.map(plan => `
              <td class="${plan.popular ? 'popular-column' : ''}">
                ${planFeatures[plan.title][feature.name] 
                  ? '<i data-feather="check" class="feature-check"></i>' 
                  : '<i data-feather="minus" class="feature-minus"></i>'}
              </td>
            `).join('')}
          </tr>
        `).join('')}
        <tr class="price-row">
          <td>Price</td>
          ${pricingPlans.map(plan => `
            <td class="${plan.popular ? 'popular-column' : ''}">
              <strong>$${plan.price}</strong>
            </td>
          `).join('')}
        </tr>
        <tr class="cta-row">
          <td></td>
          ${pricingPlans.map(plan => `
            <td class="${plan.popular ? 'popular-column' : ''}">
              <a href="${plan.ctaLink}" class="table-cta ${plan.popular ? 'popular-cta' : ''}">${plan.ctaText}</a>
            </td>
          `).join('')}
        </tr>
      </tbody>
    </table>
  `;
  
  // Initialize feather icons
  if (typeof feather !== 'undefined') {
    feather.replace();
  }
} 