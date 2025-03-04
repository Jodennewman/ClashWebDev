/**
 * The Vertical Shortcut - Animations Module
 * 
 * Handles all GSAP animations throughout the site with improved error handling
 * and element existence checks to prevent errors.
 */

import { gsap, ScrollTrigger, ScrollToPlugin } from './gsap-setup.js';

// Make sure GSAP plugins are registered
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Default animation settings
const DEFAULTS = {
  duration: 0.8,
  ease: "power2.out",
  staggerAmount: 0.15
};

/**
 * Utility function to check if an element exists in the DOM
 * @param {string} selector - CSS selector for the element
 * @return {boolean} True if element exists
 */
function elementExists(selector) {
  return document.querySelector(selector) !== null;
}

/**
 * Safely gets elements without throwing errors if not found
 * @param {string} selector - CSS selector for the element(s)
 * @return {Array} Array of matching elements or empty array if none
 */
function safeSelect(selector) {
  return gsap.utils.toArray(selector);
}

/**
 * Creates a timeline for section fading in
 * @param {string} selector - Section selector
 * @param {Object} options - Animation options
 * @return {gsap.timeline|null} The created timeline or null if error
 */
function createSectionTimeline(selector, options = {}) {
  try {
    const section = document.querySelector(selector);
    if (!section) {
      console.log(`⏩ ${selector} not found, skipping animation`);
      return null;
    }
    
    return gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: options.start || "top 80%",
        end: options.end || "bottom 20%",
        toggleActions: options.toggleActions || "play none none reverse",
        markers: false
      }
    });
  } catch (error) {
    console.error(`❌ Error creating timeline for ${selector}:`, error);
    return null;
  }
}

/**
 * Initialize hero section animations
 * @return {Promise} Resolves when animations are set up
 */
function initHeroAnimations() {
  return new Promise((resolve) => {
    try {
      console.log("🚀 Initializing hero animations");
      
      const heroElements = {
        title: '.hero-title',
        subtitle: '.hero-subtitle',
        cta: '.hero-cta',
        image: '.hero-image',
        eyeballs: '.hero-eyeball'
      };
      
      // Check that at least some hero elements exist
      const hasHeroElements = Object.values(heroElements).some(elementExists);
      
      if (!hasHeroElements) {
        console.log("⏩ Hero section elements not found, skipping animations");
        resolve();
        return;
      }
      
      // Create main hero timeline
      const heroTl = gsap.timeline();
      
      // Animate title if it exists
      if (elementExists(heroElements.title)) {
        heroTl.from(heroElements.title, {
          opacity: 0,
          y: 50,
          duration: DEFAULTS.duration
        });
      }
      
      // Animate subtitle if it exists
      if (elementExists(heroElements.subtitle)) {
        heroTl.from(heroElements.subtitle, {
          opacity: 0,
          y: 30,
          duration: DEFAULTS.duration
        }, "-=0.6");
      }
      
      // Animate CTA if it exists
      if (elementExists(heroElements.cta)) {
        heroTl.from(heroElements.cta, {
          opacity: 0,
          y: 20,
          duration: DEFAULTS.duration - 0.2
        }, "-=0.4");
      }
      
      // Animate hero image if it exists
      if (elementExists(heroElements.image)) {
        heroTl.from(heroElements.image, {
          opacity: 0,
          scale: 0.8,
          duration: DEFAULTS.duration
        }, "-=0.6");
      }
      
      // Animate eyeballs if they exist
      const eyeballs = safeSelect(heroElements.eyeballs);
      if (eyeballs.length > 0) {
        eyeballs.forEach((eyeball, index) => {
          gsap.to(eyeball, {
            y: "random(-20, 20)",
            x: "random(-10, 10)",
            rotation: "random(-5, 5)",
            duration: 3 + index,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        });
      }
      
      // Create parallax effect if hero has a background
      if (elementExists('.hero-background')) {
        ScrollTrigger.create({
          trigger: '.hero-section',
          start: "top top",
          end: "bottom top",
          scrub: true,
          onUpdate: self => {
            gsap.set('.hero-background', { y: self.progress * 30 + '%' });
          }
        });
      }
      
      resolve();
    } catch (error) {
      console.error("❌ Error in hero animations:", error);
      resolve(); // Still resolve to continue with other animations
    }
  });
}

/**
 * Initialize problem section animations
 * @return {Promise} Resolves when animations are set up
 */
function initProblemSectionAnimations() {
  return new Promise((resolve) => {
    try {
      console.log("🔍 Initializing problem section animations");
      
      if (!elementExists('.problem-section')) {
        console.log("⏩ Problem section not found, skipping animations");
        resolve();
        return;
      }
      
      // Create timeline for problem section
      const problemTl = createSectionTimeline('.problem-section');
      
      if (!problemTl) {
        resolve();
        return;
      }
      
      // Animate title and subtitle if they exist
      if (elementExists('.section-title')) {
        problemTl.from('.section-title', {
          opacity: 0,
          y: 30,
          duration: DEFAULTS.duration
        });
      }
      
      if (elementExists('.section-subtitle')) {
        problemTl.from('.section-subtitle', {
          opacity: 0,
          y: 20,
          duration: DEFAULTS.duration - 0.2
        }, "-=0.4");
      }
      
      // Animate problem cards with stagger
      const problemCards = safeSelect('.problem-card');
      if (problemCards.length > 0) {
        problemTl.from(problemCards, {
          opacity: 0,
          y: 20,
          stagger: DEFAULTS.staggerAmount,
          duration: DEFAULTS.duration - 0.2
        }, "-=0.3");
      }
      
      resolve();
    } catch (error) {
      console.error("❌ Error in problem section animations:", error);
      resolve();
    }
  });
}

/**
 * Initialize solution section animations
 * @return {Promise} Resolves when animations are set up
 */
function initSolutionSectionAnimations() {
  return new Promise((resolve) => {
    try {
      console.log("💡 Initializing solution section animations");
      
      if (!elementExists('.solution-section')) {
        console.log("⏩ Solution section not found, skipping animations");
        resolve();
        return;
      }
      
      // Create timeline for solution section
      const solutionTl = createSectionTimeline('.solution-section');
      
      if (!solutionTl) {
        resolve();
        return;
      }
      
      // Animate title if it exists
      if (elementExists('.solution-title')) {
        solutionTl.from('.solution-title', {
          opacity: 0,
          y: 30,
          duration: DEFAULTS.duration
        });
      } else if (elementExists('.solution-section .section-title')) {
        // Alternative title class
        solutionTl.from('.solution-section .section-title', {
          opacity: 0,
          y: 30,
          duration: DEFAULTS.duration
        });
      }
      
      // Animate description if it exists
      if (elementExists('.solution-description')) {
        solutionTl.from('.solution-description', {
          opacity: 0,
          y: 20,
          duration: DEFAULTS.duration - 0.2
        }, "-=0.4");
      } else if (elementExists('.solution-section .section-subtitle')) {
        // Alternative description class
        solutionTl.from('.solution-section .section-subtitle', {
          opacity: 0,
          y: 20,
          duration: DEFAULTS.duration - 0.2
        }, "-=0.4");
      }
      
      // Animate solution image if it exists
      if (elementExists('.solution-image')) {
        solutionTl.from('.solution-image', {
          opacity: 0,
          scale: 0.9,
          duration: DEFAULTS.duration
        }, "-=0.4");
      }
      
      // Animate solution stats if they exist
      const statItems = safeSelect('.stat-item');
      if (statItems.length > 0) {
        solutionTl.from(statItems, {
          opacity: 0,
          y: 20,
          stagger: DEFAULTS.staggerAmount,
          duration: DEFAULTS.duration - 0.2
        }, "-=0.4");
      }
      
      resolve();
    } catch (error) {
      console.error("❌ Error in solution section animations:", error);
      resolve();
    }
  });
}

/**
 * Initialize benefits section animations
 * @return {Promise} Resolves when animations are set up
 */
function initBenefitsSectionAnimations() {
  return new Promise((resolve) => {
    try {
      console.log("🎁 Initializing benefits section animations");
      
      if (!elementExists('.benefits-section')) {
        console.log("⏩ Benefits section not found, skipping animations");
        resolve();
        return;
      }
      
      // Make sure the benefits section is visible first
      gsap.set('.benefits-section', { opacity: 1, visibility: "visible" });
      
      // Create timeline for benefits section
      const benefitsTl = createSectionTimeline('.benefits-section');
      
      if (!benefitsTl) {
        resolve();
        return;
      }
      
      // Animate title if it exists
      if (elementExists('.benefits-section .section-title')) {
        benefitsTl.from('.benefits-section .section-title', {
          opacity: 0,
          y: 30,
          duration: DEFAULTS.duration
        });
      }
      
      // Animate subtitle if it exists
      if (elementExists('.benefits-section .section-subtitle')) {
        benefitsTl.from('.benefits-section .section-subtitle', {
          opacity: 0,
          y: 20,
          duration: DEFAULTS.duration - 0.2
        }, "-=0.4");
      }
      
      // Animate benefit cards
      const benefitCards = safeSelect('.benefit-card');
      if (benefitCards.length > 0) {
        benefitsTl.from(benefitCards, {
          opacity: 0,
          y: 20,
          stagger: DEFAULTS.staggerAmount,
          duration: DEFAULTS.duration - 0.2
        }, "-=0.3");
        
        // Individual animations for each card's contents
        benefitCards.forEach((card, index) => {
          const icon = card.querySelector('.benefit-icon');
          const title = card.querySelector('h3');
          const description = card.querySelector('p');
          
          const cardTl = gsap.timeline();
          
          if (icon) {
            cardTl.from(icon, { 
              opacity: 0, 
              scale: 0.5, 
              duration: 0.5, 
              delay: 0.1 * index 
            });
          }
          
          if (title) {
            cardTl.from(title, { 
              opacity: 0, 
              y: 20, 
              duration: 0.5, 
              delay: 0.1 * index + 0.1 
            });
          }
          
          if (description) {
            cardTl.from(description, { 
              opacity: 0, 
              y: 20, 
              duration: 0.5, 
              delay: 0.1 * index + 0.2 
            });
          }
        });
      }
      
      resolve();
    } catch (error) {
      console.error("❌ Error in benefits section animations:", error);
      resolve();
    }
  });
}

/**
 * Initialize testimonial animations
 * @return {Promise} Resolves when animations are set up
 */
function initTestimonialAnimations() {
  return new Promise((resolve) => {
    try {
      console.log("👥 Initializing testimonial animations");
      
      if (!elementExists('.testimonials-section')) {
        console.log("⏩ Testimonials section not found, skipping animations");
        resolve();
        return;
      }
      
      // Create timeline for testimonials section
      const testimonialsTl = createSectionTimeline('.testimonials-section');
      
      if (!testimonialsTl) {
        resolve();
        return;
      }
      
      // Animate title if it exists
      if (elementExists('.testimonials-section .section-title')) {
        testimonialsTl.from('.testimonials-section .section-title', {
          opacity: 0,
          y: 30,
          duration: DEFAULTS.duration
        });
      }
      
      // Animate subtitle if it exists
      if (elementExists('.testimonials-section .section-subtitle')) {
        testimonialsTl.from('.testimonials-section .section-subtitle', {
          opacity: 0,
          y: 20,
          duration: DEFAULTS.duration - 0.2
        }, "-=0.4");
      }
      
      // Animate testimonial cards
      const testimonialCards = safeSelect('.testimonial-card');
      if (testimonialCards.length > 0) {
        testimonialsTl.from(testimonialCards, {
          opacity: 0,
          y: 20,
          stagger: DEFAULTS.staggerAmount,
          duration: DEFAULTS.duration - 0.2
        }, "-=0.3");
      }
      
      resolve();
    } catch (error) {
      console.error("❌ Error in testimonials animations:", error);
      resolve();
    }
  });
}

/**
 * Initialize modules section animations
 * @return {Promise} Resolves when animations are set up
 */
function initModulesAnimations() {
  return new Promise((resolve) => {
    try {
      console.log("📚 Initializing modules animations");
      
      if (!elementExists('.modules-section')) {
        console.log("⏩ Modules section not found, skipping animations");
        resolve();
        return;
      }
      
      // Ensure modules section is visible
      gsap.set('.modules-section', { opacity: 1, visibility: "visible" });
      
      // Create timeline for modules section
      const modulesTl = createSectionTimeline('.modules-section');
      
      if (!modulesTl) {
        resolve();
        return;
      }
      
      // Animate section title and subtitle if they exist
      if (elementExists('.modules-section .section-title')) {
        modulesTl.from('.modules-section .section-title', {
          opacity: 0,
          y: 30,
          duration: DEFAULTS.duration
        });
      }
      
      if (elementExists('.modules-section .section-subtitle')) {
        modulesTl.from('.modules-section .section-subtitle', {
          opacity: 0,
          y: 20,
          duration: DEFAULTS.duration - 0.2
        }, "-=0.4");
      }
      
      // Animate modules stats if they exist
      const moduleStats = safeSelect('.modules-meta-stats .stat-card');
      if (moduleStats.length > 0) {
        modulesTl.from(moduleStats, {
          opacity: 0,
          y: 20,
          stagger: DEFAULTS.staggerAmount,
          duration: DEFAULTS.duration - 0.2
        }, "-=0.2");
      }
      
      // Animate filter buttons if they exist
      const filterButtons = safeSelect('.filter-btn');
      if (filterButtons.length > 0) {
        modulesTl.from(filterButtons, {
          opacity: 0,
          y: 10,
          stagger: 0.05,
          duration: 0.4
        }, "-=0.2");
      }
      
      // Animate track tabs if they exist
      const trackTabs = safeSelect('.tab-btn');
      if (trackTabs.length > 0) {
        modulesTl.from(trackTabs, {
          opacity: 0,
          y: 10,
          stagger: 0.05,
          duration: 0.4
        }, "-=0.2");
      }
      
      // Animate module cards
      const moduleCards = safeSelect('.module-card');
      if (moduleCards.length > 0) {
        ScrollTrigger.batch(moduleCards, {
          interval: 0.1,
          batchMax: 3,
          onEnter: batch => {
            gsap.from(batch, {
              opacity: 0,
              y: 30,
              stagger: 0.15,
              duration: 0.6,
              overwrite: true
            });
          },
          start: "top 85%"
        });
      }
      
      // Animate included resources section if it exists
      if (elementExists('.included-resources')) {
        const resourcesTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.included-resources',
            start: "top 80%"
          }
        });
        
        resourcesTl.from('.resources-title', {
          opacity: 0,
          y: 20,
          duration: 0.6
        }).from('.resource-item', {
          opacity: 0,
          y: 30,
          stagger: 0.1,
          duration: 0.5
        }, "-=0.3");
      }
      
      // Animate beta cohort section if it exists
      if (elementExists('.beta-cohort')) {
        const cohortTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.beta-cohort',
            start: "top 80%"
          }
        });
        
        cohortTl.from('.cohort-badge', {
          opacity: 0,
          scale: 0,
          duration: 0.6,
          ease: "back.out(1.7)"
        }).from('.cohort-title', {
          opacity: 0,
          y: 30,
          duration: 0.6
        }, "-=0.3").from('.cohort-description', {
          opacity: 0,
          y: 20,
          duration: 0.5
        }, "-=0.3").from('.cohort-benefit', {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.5
        }, "-=0.2").from('.cohort-cta', {
          opacity: 0,
          y: 20,
          scale: 0.9,
          duration: 0.5,
          ease: "back.out(1.7)"
        }, "-=0.2");
      }
      
      resolve();
    } catch (error) {
      console.error("❌ Error in modules animations:", error);
      resolve();
    }
  });
}

/**
 * Initialize pricing section animations
 * @return {Promise} Resolves when animations are set up
 */
function initPricingAnimations() {
  return new Promise((resolve) => {
    try {
      console.log("💰 Initializing pricing animations");
      
      if (!elementExists('.pricing-section')) {
        console.log("⏩ Pricing section not found, skipping animations");
        resolve();
        return;
      }
      
      // Ensure pricing section is visible
      gsap.set('.pricing-section', { opacity: 1, visibility: "visible" });
      
      // Create timeline for pricing section
      const pricingTl = createSectionTimeline('.pricing-section');
      
      if (!pricingTl) {
        resolve();
        return;
      }
      
      // Animate title and subtitle if they exist
      if (elementExists('.pricing-section .pricing-title, .pricing-section .section-title')) {
        pricingTl.from('.pricing-section .pricing-title, .pricing-section .section-title', {
          opacity: 0,
          y: 30,
          duration: DEFAULTS.duration
        });
      }
      
      if (elementExists('.pricing-section .pricing-subtitle, .pricing-section .section-subtitle')) {
        pricingTl.from('.pricing-section .pricing-subtitle, .pricing-section .section-subtitle', {
          opacity: 0,
          y: 20,
          duration: DEFAULTS.duration - 0.2
        }, "-=0.4");
      }
      
      // Animate pricing quiz button if it exists
      if (elementExists('.pricing-quiz-btn')) {
        pricingTl.from('.pricing-quiz-btn', {
          opacity: 0,
          scale: 0.9,
          duration: 0.5,
          ease: "back.out(1.7)"
        }, "-=0.2");
      }
      
      // Animate pricing cards with stagger
      const pricingCards = safeSelect('.pricing-card');
      if (pricingCards.length > 0) {
        pricingTl.from(pricingCards, {
          opacity: 0,
          y: 30,
          stagger: 0.2,
          duration: DEFAULTS.duration,
          ease: "power3.out"
        }, "-=0.2");
      }
      
      // Special animation for popular badge if it exists
      if (elementExists('.popular-badge')) {
        gsap.from('.popular-badge', {
          scrollTrigger: {
            trigger: '.pricing-cards-container',
            start: "top 80%"
          },
          scale: 0,
          rotation: 45,
          opacity: 0,
          duration: 0.8,
          delay: 1,
          ease: "elastic.out(1, 0.5)"
        });
      }
      
      // Add hover effects to pricing cards
      initPricingCardHoverEffects();
      
      resolve();
    } catch (error) {
      console.error("❌ Error in pricing animations:", error);
      resolve();
    }
  });
}

/**
 * Initialize hover effects for pricing cards
 */
function initPricingCardHoverEffects() {
  try {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -10,
          boxShadow: '0 30px 60px rgba(0, 0, 0, 0.3)',
          duration: 0.3,
          ease: 'power2.out'
        });
        
        // If this is the popular card, add extra emphasis
        if (card.classList.contains('popular')) {
          gsap.to(card, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
          duration: 0.3,
          ease: 'power2.out'
        });
        
        // Reset the popular card
        if (card.classList.contains('popular')) {
          gsap.to(card, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      });
    });
  } catch (error) {
    console.error("❌ Error initializing pricing card hover effects:", error);
  }
}

/**
 * Initialize FAQ section animations
 * @return {Promise} Resolves when animations are set up
 */
function initFAQAnimations() {
  return new Promise((resolve) => {
    try {
      console.log("❓ Initializing FAQ animations");
      
      if (!elementExists('.faq-section')) {
        console.log("⏩ FAQ section not found, skipping animations");
        resolve();
        return;
      }
      
      // Create timeline for FAQ section
      const faqTl = createSectionTimeline('.faq-section');
      
      if (!faqTl) {
        resolve();
        return;
      }
      
      // Animate title if it exists
      if (elementExists('.faq-section.section-title')) {
        faqTl.from('.faq-section.section-title', {
          opacity: 0,
          y: 30,
          duration: DEFAULTS.duration
        });
      }
      
      // Animate subtitle if it exists
      if (elementExists('.faq-section.section-subtitle')) {
        faqTl.from('.faq-section.section-subtitle', {
          opacity: 0,
          y: 20,
          duration: DEFAULTS.duration - 0.2
        }, "-=0.4");
      }
      
      // Animate FAQ items with stagger
      const faqItems = safeSelect('.faq-item');
      if (faqItems.length > 0) {
        faqTl.from(faqItems, {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.5
        }, "-=0.2");
      }
      
      resolve();
    } catch (error) {
      console.error("❌ Error in FAQ animations:", error);
      resolve();
    }
  });
}

/**
 * Initialize CTA section animations
 * @return {Promise} Resolves when animations are set up
 */
function initCTAAnimations() {
  return new Promise((resolve) => {
    try {
      console.log("🏁 Initializing CTA animations");
      
      // Check for final CTA section with multiple possible class names
      const ctaSection = document.querySelector('.cta-section, .final-cta-section');
      
      if (!ctaSection) {
        console.log("⏩ CTA section not found, skipping animations");
        resolve();
        return;
      }
      
      // Create timeline for CTA section
      const ctaTl = gsap.timeline({
        scrollTrigger: {
          trigger: ctaSection,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
      
      // Animate title if it exists
      const ctaTitle = ctaSection.querySelector('.cta-title');
      if (ctaTitle) {
        ctaTl.from(ctaTitle, {
          opacity: 0,
          y: 30,
          duration: DEFAULTS.duration
        });
      }
      
      // Animate description if it exists
      const ctaDescription = ctaSection.querySelector('.cta-description');
      if (ctaDescription) {
        ctaTl.from(ctaDescription, {
          opacity: 0,
          y: 20,
          duration: DEFAULTS.duration - 0.2
        }, "-=0.4");
      }
      
      // Animate button if it exists
      const ctaButton = ctaSection.querySelector('.cta-button');
      if (ctaButton) {
        ctaTl.from(ctaButton, {
          opacity: 0,
          scale: 0.9,
          duration: 0.6,
          ease: "back.out(1.7)"
        }, "-=0.4");
      }
      
      resolve();
    } catch (error) {
      console.error("❌ Error in CTA animations:", error);
      resolve();
    }
  });
}

/**
 * Helper function to ensure all sections are visible 
 * even if animations fail
 */
function ensureVisibility() {
  try {
    const sections = document.querySelectorAll('section');
    
    // Make all sections visible
    gsap.set(sections, { opacity: 1, visibility: "visible" });
    
    // Make all key section contents visible
    const criticalElements = [
      '.hero-section *', 
      '.problem-section *', 
      '.solution-section *', 
      '.benefits-section *',
      '.modules-section *',
      '.pricing-section *',
      '.faq-section *',
      '.cta-section *'
    ];
    
    criticalElements.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      if (elements.length) {
        gsap.set(elements, { opacity: 1, visibility: "visible" });
      }
    });
  } catch (error) {
    console.error("❌ Error ensuring visibility:", error);
  }
}

/**
 * Main function to initialize all animations
 * @return {Promise} Resolves when all animations are initialized
 */
export async function initAnimations() {
  console.log("🎬 Initializing animations...");
  
  try {
    // Wait for DOM updates after rendering modules and pricing table
    console.log("⏳ Waiting for DOM updates...");
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Basic animation to ensure content is visible even if scroll triggers fail
    ensureVisibility();
    
    // Initialize section-specific animations sequentially
    await initHeroAnimations();
    await initProblemSectionAnimations();
    await initSolutionSectionAnimations();
    await initBenefitsSectionAnimations();
    await initTestimonialAnimations();
    await initModulesAnimations();
    await initPricingAnimations();
    await initFAQAnimations();
    await initCTAAnimations();
    
    console.log("✅ All animations initialized");
    
    // Refresh ScrollTrigger
    ScrollTrigger.refresh();
    
    return true;
  } catch (error) {
    console.error("⚠️ Error in animation initialization:", error);
    ensureVisibility();
    return false;
  }
}

export {
  initHeroAnimations,
  initProblemSectionAnimations,
  initSolutionSectionAnimations,
  initBenefitsSectionAnimations,
  initTestimonialAnimations,
  initModulesAnimations,
  initPricingAnimations,
  initFAQAnimations,
  initCTAAnimations
};