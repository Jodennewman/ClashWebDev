import { gsap, ScrollTrigger, ScrollSmoother, ScrollToPlugin } from './gsap-setup';


gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

// Don't re-register ScrollTrigger - it's already registered in gsap-setup.ts
// gsap.registerPlugin(ScrollTrigger);

/**
 * Initializes all animations for the Vertical Shortcut landing page
 * Compatible with your existing ScrollSmoother setup
 */


export function initAnimations(): void {
  console.log('Initializing Vertical Shortcut animations');
  
  // Determine the correct scroller based on context
  const scroller = document.querySelector('#vs-smooth-content') ? '#vs-smooth-content' : '#smooth-content';
  console.log(`Using scroller: ${scroller}`);
  
  // Set ScrollTrigger defaults
  ScrollTrigger.defaults({
    markers: false,  // Explicitly set markers to false
    toggleActions: 'play none none reverse'
  });

  // Hero section animation
  const heroTimeline = gsap.timeline();

  heroTimeline
    .from('.hero-title', {
      scrollTrigger: {
        trigger: '.hero-section',
        scroller: "#vs-smooth-content",
        start: 'top 80%',
        end: '+500px',
        id: 'hero-title',
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
    .from('.hero-subtitle', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6')
    .from('.hero-cta', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out'
    }, '-=0.4');

  // Benefits section animation - use string selectors
  gsap.from('.benefit-card', {
    scrollTrigger: {
      trigger: '.benefits-section',
      scroller: '#vs-smooth-content',
      start: 'top 70%',
      scrub: false,
      pin: false,
      end: '+500px', 
      id: 'benefits',
      toggleActions: 'play none none reverse'
    },
    y: 40,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out'
  });

  // Modules section animation
  gsap.from('.module-card', {
    scrollTrigger: {
      trigger: '.modules-container',
      scroller: "#vs-smooth-content",
      start: 'top 70%',
      end: 'bottom top',
      id: 'modules-cards',
      toggleActions: 'play none none reverse'
    },
    y: 30,
    opacity: 0,
    duration: 0.5,
    stagger: 0.15,
    ease: 'power2.out'
  });

  // Pricing section animation
  const pricingTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: '.pricing-section',
      scroller: "#vs-smooth-content",
      start: 'top 60%',
      end: '+500px',
      scrub: false,
      pin: false,
      id: 'pricing-section',
      toggleActions: 'play none none reverse'
    }
  });

  pricingTimeline
    .from('.pricing-title', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out'
    })
    .from('.pricing-subtitle', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.4')
    .from('.pricing-card', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    }, '-=0.2');
    
  // Popular badge animation
  gsap.from('.popular-badge', {
    scrollTrigger: {
      trigger: '.popular-badge',
      scroller: "#vs-smooth-content",
      start: 'top 60%',
      end: '+500px',
      scrub: false,
      pin: false,
      id: 'popular-badge',
      toggleActions: 'play none none none'
    },
    scale: 0,
    rotation: -45,
    opacity: 0,
    duration: 0.8,
    delay: 1,
    ease: 'elastic.out(1, 0.5)'
  });

  // Initialize pricing card hover effects
  initPricingCardHoverEffects();
  
  // CTA Section animation
  gsap.from('.cta-section', {
    scrollTrigger: {
      trigger: '.cta-section',
      scroller: "#vs-smooth-content",
      start: 'top 70%',
      end: '+500px',
      scrub: false,
      pin: false,
      id: 'cta-section',
      toggleActions: 'play none none reverse'
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out'
  });

  // Do a single refresh after all animations are defined
  ScrollTrigger.refresh(true);
}

/**
 * Initialize hover effects for pricing cards and buttons
 */
function initPricingCardHoverEffects(): void {
  // Create hover animations for pricing cards
  document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -10,
        scale: 1.02,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });

  // Create hover animations for CTA buttons
  document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('mouseenter', () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.2,
        ease: 'power1.out'
      });
    });

    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.2,
        ease: 'power1.out'
      });
    });
  });
}
