import { gsap, ScrollTrigger, ScrollSmoother, ScrollToPlugin } from './gsap-setup.js';
import { renderPricingTable, renderModulesList } from './pricingTable.js';


// Don't re-register ScrollTrigger - it's already registered in gsap-setup.js
// gsap.registerPlugin(ScrollTrigger);

/**
 * Initializes all animations for the Vertical Shortcut landing page
 * Compatible with your existing ScrollSmoother setup
 */

// Set GSAP defaults once
gsap.defaults({ease: "power2.out"});

// Set ScrollTrigger defaults to always include the scroller
ScrollTrigger.defaults({
  scroller: ".smooth-scroll",
  markers: false
});

// Delay length in milliseconds to ensure DOM updates are complete
const DOM_UPDATE_DELAY = 500;

// Utility function to check if element exists and is visible
function elementIsReady(selector) {
  const element = document.querySelector(selector);
  return element && element.offsetParent !== null;
}



// Initialize animations
export async function initAnimations() {
  console.log("🎬 Initializing animations...");
  
  try {
    // Initialize the cursor animation immediately (doesn't depend on scroll)

    
    // Wait for DOM updates after rendering modules and pricing table
    console.log("⏳ Waiting for DOM updates...");
    await new Promise(resolve => setTimeout(resolve, DOM_UPDATE_DELAY));
    
    // Basic animation to ensure content is visible even if scroll triggers fail
    animateAllSectionsBasic();
    
    // Initialize section-specific animations with better error handling
    await initHeroAnimations()
      .then(() => initProblemSectionAnimations())
      .then(() => initSolutionSectionAnimations()) 
      .then(() => initBenefitsSectionAnimations())
      .then(() => initTestimonialAnimations())
      .then(() => initModulesAnimations())
      .then(() => initPricingAnimations())
      .then(() => initFaqAnimations())
      .then(() => initCtaAnimations())
      .catch(error => {
        console.error("⚠️ Error in animation initialization:", error);
      });
      
    console.log("✅ All animations initialized");

    
    
    // Final refresh of ScrollTrigger


   

// Basic animation to ensure all sections are visible even without scroll triggers
function animateAllSectionsBasic() {
  const sections = document.querySelectorAll('section');
  if (!sections.length) return;
  
  console.log("🔄 Applying basic animations to ensure content visibility");
  
  gsap.set(sections, { opacity: 1, visibility: "visible" });
  
  // Ensure key sections are visible
  const criticalSections = [
    '.hero-section', 
    '.problem-section', 
    '.solution-section', 
    '.benefits-section',
    '.modules-section',
    '.pricing-section',
    '.faq-section',
    '.final-cta-section'
  ];
  
  criticalSections.forEach(selector => {
    const section = document.querySelector(selector);
    if (section) {
      gsap.set(section, { opacity: 1, visibility: "visible" });
      
      // Make all children visible too
      const children = section.querySelectorAll('*');
      gsap.set(children, { opacity: 1, visibility: "visible" });
    }
  });
}

// Hero section animations
function initHeroAnimations() {
  return new Promise((resolve) => {
    try {
      if (!elementIsReady('.hero-section')) {
        console.log("⏩ Hero section not ready, skipping animations");
        resolve();
        return;
      }
      
      console.log("🚀 Initializing hero animations");
      
      const heroTl = gsap.timeline();
      
      heroTl.from('.hero-title', {
        opacity: 0,
        y: 50,
        duration: 1
      })
      .from('.hero-subtitle', {
        opacity: 0,
        y: 30,
        duration: 0.8
      }, "-=0.6")
      .from('.hero-cta', {
        opacity: 0,
        y: 20,
        duration: 0.6
      }, "-=0.4")
      .from('.hero-image', {
        opacity: 0,
        scale: 0.8,
        duration: 1
      }, "-=0.6");
      
      // Simple scroll trigger for hero parallax
      if (document.querySelector('.hero-background')) {
        try {
          gsap.to('.hero-background', {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
              trigger: '.hero-section',
              start: "top top",
              end: "bottom top",
              scrub: true
            }
          });
        } catch (error) {
          console.warn("⚠️ Hero parallax animation failed:", error);
        }
      }
      
      resolve();
    } catch (error) {
      console.error("⚠️ Hero animation error:", error);
      resolve(); // Still resolve to continue with other animations
    }
  });
}

// Problem section animations
function initProblemSectionAnimations() {
  return new Promise((resolve) => {
    try {
      if (!elementIsReady('.problem-section')) {
        console.log("⏩ Problem section not ready, skipping animations");
        resolve();
        return;
      }
      
      console.log("🔍 Initializing problem section animations");
      
      // Directly animate the problem section elements
      const problemTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.problem-section',
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
      
      problemTl.from('.problem-title', {
        opacity: 0,
        y: 30,
        duration: 0.8
      })
      .from('.problem-description', {
        opacity: 0,
        y: 20,
        duration: 0.6
      }, "-=0.4")
      .from('.problem-card', {
        opacity: 0,
        y: 20,
        stagger: 0.2,
        duration: 0.6
      }, "-=0.3");
      
      resolve();
    } catch (error) {
      console.error("⚠️ Problem section animation error:", error);
      resolve(); // Still resolve to continue with other animations
    }
  });
}

// Solution section animations
function initSolutionSectionAnimations() {
  return new Promise((resolve) => {
    try {
      if (!elementIsReady('.solution-section')) {
        console.log("⏩ Solution section not ready, skipping animations");
        resolve();
        return;
      }
      
      console.log("💡 Initializing solution section animations");
      
      // Simple reveal animation for the solution section
      const solutionTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.solution-section',
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
      
      solutionTl.from('.solution-title', {
        opacity: 0,
        y: 30,
        duration: 0.8
      })
      .from('.solution-description', {
        opacity: 0,
        y: 20,
        duration: 0.6
      }, "-=0.4")
      .from('.solution-image', {
        opacity: 0,
        scale: 0.9,
        duration: 0.8
      }, "-=0.4")
      .from('.solution-features', {
        opacity: 0,
        y: 20,
        duration: 0.6
      }, "-=0.4");
      
      resolve();
    } catch (error) {
      console.error("⚠️ Solution section animation error:", error);
      resolve();
    }
  });
}

// Benefits section animations (What You'll Gain)
function initBenefitsSectionAnimations() {
  return new Promise((resolve) => {
    try {
      if (!elementIsReady('.benefits-section')) {
        console.log("⏩ Benefits section not ready, skipping animations");
        resolve();
        return;
      }
      
      console.log("🎁 Initializing benefits section animations");
      
      // Make sure the benefits section is visible first
      gsap.set('.benefits-section', { opacity: 1, visibility: "visible" });
      
      // Direct animation instead of scroll trigger for reliability
      const benefitsTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.benefits-section',
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
      
      benefitsTl.from('.benefits-title', {
        opacity: 0,
        y: 30,
        duration: 0.8
      })
      .from('.benefits-description', {
        opacity: 0,
        y: 20,
        duration: 0.6
      }, "-=0.4")
      .from('.benefit-card', {
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 0.6
      }, "-=0.3");
      
      // Direct animation for each benefit card
      document.querySelectorAll('.benefit-card').forEach((card, index) => {
        gsap.set(card, { opacity: 1, visibility: "visible" });
        
        const icon = card.querySelector('.benefit-icon');
        const title = card.querySelector('h3');
        const description = card.querySelector('p');
        
        if (icon) gsap.from(icon, { opacity: 0, scale: 0.5, duration: 0.5, delay: 0.1 * index });
        if (title) gsap.from(title, { opacity: 0, y: 20, duration: 0.5, delay: 0.1 * index + 0.1 });
        if (description) gsap.from(description, { opacity: 0, y: 20, duration: 0.5, delay: 0.1 * index + 0.2 });
      });
      
      resolve();
    } catch (error) {
      console.error("⚠️ Benefits section animation error:", error);
      resolve();
    }
  });
}

// Testimonial animations
function initTestimonialAnimations() {
  return new Promise((resolve) => {
    try {
      if (!elementIsReady('.testimonials-section')) {
        console.log("⏩ Testimonials section not ready, skipping animations");
        resolve();
        return;
      }
      
      console.log("👥 Initializing testimonial animations");
      
      // Simple fade in for testimonials
      const testimonialsTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.testimonials-section',
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
      
      testimonialsTl.from('.testimonials-title', {
        opacity: 0,
        y: 30,
        duration: 0.8
      })
      .from('.testimonials-description', {
        opacity: 0,
        y: 20,
        duration: 0.6
      }, "-=0.4")
      .from('.testimonial-card', {
        opacity: 0,
        y: 20,
        stagger: 0.2,
        duration: 0.6
      }, "-=0.3");
      
      resolve();
    } catch (error) {
      console.error("⚠️ Testimonials animation error:", error);
      resolve();
    }
  });
}

// Modules animations
function initModulesAnimations() {
  return new Promise((resolve) => {
    try {
      if (!elementIsReady('.modules-section')) {
        console.log("⏩ Modules section not ready, skipping animations");
        resolve();
        return;
      }
      
      console.log("📚 Initializing modules animations");
      
      // Ensure modules section is visible
      gsap.set('.modules-section', { opacity: 1, visibility: "visible" });
      
      // Simple reveal for modules section
      const modulesTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.modules-section',
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
      
      modulesTl.from('.modules-title', {
        opacity: 0,
        y: 30,
        duration: 0.8
      })
      .from('.modules-description', {
        opacity: 0,
        y: 20,
        duration: 0.6
      }, "-=0.4");
      
      // Animate modules stats
      if (document.querySelector('.modules-stats')) {
        gsap.from('.module-stat', {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.6,
          scrollTrigger: {
            trigger: '.modules-stats',
            start: "top 80%",
            toggleActions: "play none none none"
          }
        });
      }
      
      // Animate module cards
      if (document.querySelector('.module-card')) {
        gsap.from('.module-card', {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.6,
          scrollTrigger: {
            trigger: '.modules-grid',
            start: "top 80%",
            toggleActions: "play none none none"
          }
        });
      }
      
      // Animate bonus section
      if (document.querySelector('.modules-bonus-section')) {
        gsap.from('.modules-bonus-section', {
          opacity: 0,
          y: 30,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.modules-bonus-section',
            start: "top 80%",
            toggleActions: "play none none none"
          }
        });
        
        gsap.from('.bonus-item', {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.6,
          scrollTrigger: {
            trigger: '.bonus-grid',
            start: "top 85%",
            toggleActions: "play none none none"
          }
        });
      }
      
      resolve();
    } catch (error) {
      console.error("⚠️ Modules animation error:", error);
      resolve();
    }
  });
}

// Pricing animations
function initPricingAnimations() {
  return new Promise((resolve) => {
    try {
      if (!elementIsReady('.pricing-section')) {
        console.log("⏩ Pricing section not ready, skipping animations");
        resolve();
        return;
      }
      
      console.log("💰 Initializing pricing animations");
      
      // Ensure pricing section is visible
      gsap.set('.pricing-section', { opacity: 1, visibility: "visible" });
      
      // Simple pricing section animation
      const pricingTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.pricing-section',
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
      
      pricingTl.from('.pricing-title', {
        opacity: 0,
        y: 30,
        duration: 0.8
      })
      .from('.pricing-subtitle', {
        opacity: 0,
        y: 20,
        duration: 0.6
      }, "-=0.4");
      
      // Animate pricing cards
      gsap.from('.pricing-card', {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: '.pricing-cards-container',
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
      
      // Animate comparison table title with eyeballs
      if (document.querySelector('.comparison-table-title')) {
        gsap.from('.comparison-table-title', {
          opacity: 0,
          y: 30,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.comparison-table-container',
            start: "top 90%",
            toggleActions: "play none none none"
          }
        });
      }
      gsap.to('.popular-badge::after', {
        rotation: -360,
      }, {
        rotation: 0,
        duration: 15,
        ease: "linear",
        repeat: -1,
      });
      // Animate eyeball decorations
      if (document.querySelector('.eyeball-decoration')) {
        gsap.from('.eyeball-decoration', {
          opacity: 0,
          scale: 0,
          rotate: 45,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(2)",
          delay: 0.5,
          scrollTrigger: {
            trigger: '.comparison-table-container',
            start: "top 90%",
            toggleActions: "play none none none"
          }
        });
      }
      
      // Animate comparison table rows
      if (document.querySelector('.comparison-row')) {
        gsap.from('.comparison-row', {
          opacity: 0,
          y: 20,
          stagger: 0.05,
          duration: 0.5,
          scrollTrigger: {
            trigger: '.comparison-table',
            start: "top 90%",
            toggleActions: "play none none none"
          }
        });
      }
      
      // Animate popular badge
      if (document.querySelector('.popular-badge')) {
        gsap.from('.popular-badge', {
          opacity: 0,
          scale: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.3)",
          delay: 1,
          scrollTrigger: {
            trigger: '.pricing-cards-container',
            start: "top 80%",
            toggleActions: "play none none none"
          }
        });
      }
      
      resolve();
    } catch (error) {
      console.error("⚠️ Pricing animation error:", error);
      resolve();
    }
  });
}

// FAQ animations
function initFaqAnimations() {
  return new Promise((resolve) => {
    try {
      if (!elementIsReady('.faq-section')) {
        console.log("⏩ FAQ section not ready, skipping animations");
        resolve();
        return;
      }
      
      console.log("❓ Initializing FAQ animations");
      
      // Simple fade in for FAQ section
      const faqTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.faq-section',
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
      
      faqTl.from('.faq-title', {
        opacity: 0,
        y: 30,
        duration: 0.8
      })
      .from('.faq-description', {
        opacity: 0,
        y: 20,
        duration: 0.6
      }, "-=0.4")
      .from('.faq-item', {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5
      }, "-=0.2");
      
      resolve();
    } catch (error) {
      console.error("⚠️ FAQ animation error:", error);
      resolve();
    }
  });
}

// CTA animations
function initCtaAnimations() {
  return new Promise((resolve) => {
    try {
      if (!elementIsReady('.final-cta-section')) {
        console.log("⏩ CTA section not ready, skipping animations");
        resolve();
        return;
      }
      
      console.log("🏁 Initializing CTA animations");
      
      // Simple fade in for CTA
      const ctaTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.final-cta-section',
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
      
      ctaTl.from('.final-cta-content', {
        opacity: 0,
        y: 30,
        duration: 0.8
      })
      .from('.final-cta-button', {
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        ease: "back.out(1.7)"
      }, "-=0.4");
      
      resolve();
    } catch (error) {
      console.error("⚠️ CTA animation error:", error);
      resolve();
    }
  });
}



// Custom cursor function


function initPricingCardHoverEffects() {
  // Pricing card hover effects
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
  
  // Comparison table row hover effects for better UX
  const comparisonRows = document.querySelectorAll('.comparison-table tr:not(:first-child)');
  
  comparisonRows.forEach(row => {
    row.addEventListener('mouseenter', () => {
      gsap.to(row, {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        duration: 0.3
      });
    });
    
    row.addEventListener('mouseleave', () => {
      gsap.to(row, {
        backgroundColor: 'transparent',
        duration: 0.3
      });
    })
  });
}
} catch (error) {
  console.error("⚠️ Animation initialization error:", error)  ;
  return null;
}
}

export function initSmoother() {
  console.log('Initializing ScrollSmoother...');
  
  return new Promise((resolve) => {
    // Create a timeout in case smoother creation fails
    const timeout = setTimeout(() => {
      console.warn('ScrollSmoother initialization timed out');
      resolve(null);
    }, 2000);
    
    try {
      // Look for the smooth wrapper and content elements
      const wrapper = document.querySelector('#smooth-wrapper') || document.querySelector('#vs-smooth-wrapper');
      const content = document.querySelector('#smooth-content') || document.querySelector('#vs-smooth-content');
      
      if (!wrapper || !content) {
        console.warn('Smooth wrapper or content elements not found in DOM');
        clearTimeout(timeout);
        resolve(null);
        return;
      }
      
      // Create the smoother
      smoother = ScrollSmoother.create({
        wrapper: wrapper,
        content: content,
        smooth: 1.5,
        effects: true
      });
      
      // Store in window for debugging
      window._smoother = smoother;
      
      console.log('ScrollSmoother initialized successfully');
      clearTimeout(timeout);
      resolve(smoother);
    } catch (error) {
      console.error('Error initializing ScrollSmoother:', error);
      clearTimeout(timeout);
      resolve(null);
    }
  })
};

