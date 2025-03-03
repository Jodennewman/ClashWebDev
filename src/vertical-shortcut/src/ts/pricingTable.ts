import { PricingTier } from '../types/types-index';
import { pricingTiers } from '../data/pricingData';

/**
 * Renders the pricing table using the pricing data
 */
export function renderPricingTable(): void {
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
  
  console.log('Pricing table rendered with', pricingTiers.length, 'tiers');
}

/**
 * Creates HTML for a single pricing card
 */
function createPricingCard(tier: PricingTier): string {
  // Create popular badge if this tier is marked as popular
  const popularBadge = tier.popular 
    ? `<div class="popular-badge">
         <span>Most<br>Popular</span>
       </div>` 
    : '';
  
  // Create feature list items
  const featuresHTML = tier.features.map((feature: string) => 
    `<li class="pricing-feature">
      <span class="feature-bullet" style="background-color: ${tier.color}"></span>
      ${feature}
     </li>`
  ).join('');

  // Return the complete card HTML
  return `
    <div class="pricing-card ${tier.popular ? 'popular' : ''}" style="border-top: 5px solid ${tier.color}">
      ${popularBadge}
      <h3 class="pricing-card-title" style="color: ${tier.color}">${tier.name}</h3>
      <div class="pricing-card-price">${tier.price}</div>
      <p class="pricing-card-description">${tier.description}</p>
      <button class="cta-button" style="background-color: ${tier.color}" data-link="${tier.buttonLink}">
        ${tier.buttonText}
      </button>
      <ul class="pricing-features">
        ${featuresHTML}
      </ul>
    </div>
  `;
}