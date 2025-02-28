import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const storySection = document.getElementById('OurStorySection');
  if (!storySection) return;

  initStoryCards();
  setupHorizontalScroll();
  setupNavButtons();
});

/**
 * Initialize the story cards with hover and click interactions
 */
function initStoryCards() {
  const storyCards = document.querySelectorAll('.story-card');
  const eyeballs = document.querySelectorAll('.card-eyeball');

  // Initialize each card
  storyCards.forEach((card, index) => {
    // Set initial scale and opacity
    gsap.set(card, {
      scale: index === 0 ? 1 : 0.9,
      opacity: index === 0 ? 1 : 0.7,
      transformStyle: 'preserve-3d',
      transformPerspective: 1000
    });

    // Add mouse tracking for eyeballs
    const eyeball = card.querySelector('.eyeball-img');
    if (eyeball) {
      card.addEventListener('mousemove', (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const rect = card.getBoundingClientRect();
        const x = (mouseEvent.clientX - rect.left) / rect.width;
        const y = (mouseEvent.clientY - rect.top) / rect.height;
        
        // Calculate movement range (limit to 10px in any direction)
        const moveX = (x - 0.5) * 20;
        const moveY = (y - 0.5) * 20;
        
        gsap.to(eyeball, {
          x: moveX,
          y: moveY,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      // Reset position when mouse leaves
      card.addEventListener('mouseleave', () => {
        gsap.to(eyeball, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)'
        });
      });
    }
    
    // Use GSAP for card flipping instead of CSS
    const cardInner = card.querySelector('.card-inner');
    if (cardInner) {
      card.addEventListener('mouseenter', () => {
        gsap.to(cardInner, {
          rotationY: 180,
          duration: 0.6,
          ease: 'power1.inOut',
          force3D: true,
          transformPerspective: 1000,
          transformStyle: 'preserve-3d',
          overwrite: true
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(cardInner, {
          rotationY: 0,
          duration: 0.6,
          ease: 'power1.inOut',
          force3D: true,
          transformPerspective: 1000,
          transformStyle: 'preserve-3d',
          overwrite: true
        });
      });
    }
  });
}

/**
 * Setup the horizontal scroll behavior for the OurStorySection
 */
function setupHorizontalScroll() {
  const ourstorywrapper = document.querySelector('.ourstorywrapper');
  const storyCards = document.querySelectorAll('.story-card');
  const yearLabels = document.querySelectorAll('.ccyears');
  const timelineMarker = document.querySelector('.timeline-marker');
  
  if (!ourstorywrapper || storyCards.length === 0) return;

  // Create ScrollTrigger for horizontal scrolling
  ScrollTrigger.create({
    trigger: ourstorywrapper,
    start: 'top top',
    end: 'bottom bottom',
    pin: true,
    scrub: 1,
    onUpdate: (self) => {
      // Calculate which card should be active based on scroll progress
      const progress = self.progress;
      const cardCount = storyCards.length;
      const activeIndex = Math.min(
        Math.floor(progress * cardCount),
        cardCount - 1
      );
      
      // Update timeline marker position
      if (timelineMarker) {
        const percent = progress * 100;
        gsap.to(timelineMarker, {
          left: `${5 + percent * 0.9}%`,
          duration: 0.1,
          ease: 'none'
        });
      }
      
      // Update year labels
      yearLabels.forEach((label, i) => {
        if (i === activeIndex) {
          label.classList.add('active');
        } else {
          label.classList.remove('active');
        }
      });
      
      // Animate cards based on active index
      storyCards.forEach((card, i) => {
        // Set z-index based on active status to prevent cutoff
        const zIndex = i === activeIndex ? 20 : 10;
        
        gsap.to(card, {
          scale: i === activeIndex ? 1 : 0.9,
          opacity: i === activeIndex ? 1 : 0.7,
          zIndex: zIndex,
          duration: 0.3,
          transformOrigin: "center center",
          force3D: true
        });
      });
    }
  });
}

/**
 * Setup the prev/next navigation buttons
 */
function setupNavButtons() {
  const prevButton = document.querySelector('.prev-button');
  const nextButton = document.querySelector('.next-button');
  const storyCards = document.querySelectorAll('.story-card');
  const yearLabels = document.querySelectorAll('.ccyears');
  const timelineMarker = document.querySelector('.timeline-marker');
  
  let activeIndex = 0;
  const cardCount = storyCards.length;
  
  if (!prevButton || !nextButton || storyCards.length === 0) return;
  
  // Set initial state
  updateActiveCard();
  
  // Previous button click
  prevButton.addEventListener('click', () => {
    activeIndex = (activeIndex - 1 + cardCount) % cardCount;
    updateActiveCard();
  });
  
  // Next button click
  nextButton.addEventListener('click', () => {
    activeIndex = (activeIndex + 1) % cardCount;
    updateActiveCard();
  });
  
  function updateActiveCard() {
    // Update timeline marker position
    if (timelineMarker) {
      const percent = (activeIndex / (cardCount - 1)) * 100;
      gsap.to(timelineMarker, {
        left: `${5 + percent * 0.9}%`,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
    
    // Update year labels
    yearLabels.forEach((label, i) => {
      if (i === activeIndex) {
        label.classList.add('active');
      } else {
        label.classList.remove('active');
      }
    });
    
    // Animate cards
    storyCards.forEach((card, i) => {
      // Set z-index based on active status to prevent cutoff
      const zIndex = i === activeIndex ? 20 : 10;
      
      gsap.to(card, {
        scale: i === activeIndex ? 1 : 0.9,
        opacity: i === activeIndex ? 1 : 0.7,
        zIndex: zIndex,
        duration: 0.3,
        transformOrigin: "center center",
        force3D: true
      });
    });
    
    // Scroll to the active card
    const cardsContainer = document.querySelector('.story-cards-container');
    if (cardsContainer) {
      const activeCard = storyCards[activeIndex] as HTMLElement;
      const containerWidth = cardsContainer.clientWidth;
      const cardLeft = activeCard.offsetLeft;
      const cardWidth = activeCard.offsetWidth;
      
      gsap.to(cardsContainer, {
        scrollLeft: cardLeft - (containerWidth / 2) + (cardWidth / 2),
        duration: 0.5,
        ease: 'power2.out'
      });
    }
  }
}

// Export the module for import in main.ts
export default {
  initStoryCards,
  setupHorizontalScroll,
  setupNavButtons
}; 