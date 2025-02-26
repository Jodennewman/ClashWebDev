// Find and remove the ScrollTrigger code that controls the first horizontal section
// Look for something like this:

/*
// REMOVE THIS CODE (typically in a js/ts file that handles horizontal scrolling)
// This is likely controlling your first horizontal section
gsap.to(".splitscreen-wrapper", {
  scrollTrigger: {
    trigger: "#Horizontal1",
    start: "top top",
    end: "+=1000", // or some calculation
    pin: true,
    scrub: true,
  },
  x: "-100%", // or some percentage/pixel value
  ease: "none"
});
*/

// Make sure to KEEP any code related to the second horizontal section
// The second one might have a different trigger element or class 

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export function initHorizontalSections(): void {
  console.log('Initializing horizontal sections...');
  
  // Horizontal section 2
  const container2 = document.querySelector("#Horizontal2");
  if (container2) {
    gsap.to(container2, {
      x: () => -(container2.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: container2,
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        start: "top top",
        end: () => "+=" + (container2.scrollWidth - window.innerWidth),
        id: "horizontal2Trigger",
        markers: true // Enable for debugging
      }
    });
    console.log('Horizontal section 2 initialized');
  } else {
    console.error('Horizontal section 2 element not found');
  }
  
  // Add any other horizontal sections or related animations here
  
  // Asterix animations
  let asterixTL = gsap.timeline();
  
  gsap.from(".heading.leadingagency", {
    "--scale1": 0.6,
    duration: 2,
    ease: "power4.inOut"
  });
  
  let asterixTween1 = gsap.to(".heading.leadingagency", {
    duration: 3,
    "--rotation": 359.9,
    ease: "none"
  });
  
  asterixTL.add(asterixTween1, 0);
  
  gsap.to(asterixTL, {
    progress: 1,
    duration: 4,
    ease: "none",
    repeat: -1
  });
  
  console.log('Asterix animations initialized');
}

document.addEventListener('DOMContentLoaded', () => {
  console.log("Setting up sections");
  
  // STEP 1: Find and kill any existing horizontal scroll triggers for the first section
  const existingTriggers = ScrollTrigger.getAll();
  existingTriggers.forEach(trigger => {
    // Only remove triggers for the first horizontal section
    if (trigger.vars.trigger === "#Horizontal1" || 
        trigger.vars.trigger === ".horizontal-scroll-1" ||
        trigger.vars.trigger === "#splitScreenWrapper") {
      console.log("Removing horizontal scroll trigger for first section");
      trigger.kill();
    }
  });
  
  // STEP 2: Modify the DOM structure to convert horizontal to vertical layout
  const horizontalSection = document.querySelector('#Horizontal1');
  
  if (horizontalSection) {
    const splitScreen = document.querySelector('#splitScreenWrapper');
    const serpentineSection = document.querySelector('#section-serpentine');
    const parentElement = horizontalSection.parentElement;
    
    // Only proceed if we found all elements
    if (splitScreen && serpentineSection && parentElement) {
      // Remove horizontal layout classes
      splitScreen.classList.remove('hpanels1');
      serpentineSection.classList.remove('hpanels1');
      
      // Unwrap the horizontal container by moving its children before it
      // and then removing the container
      parentElement.insertBefore(splitScreen, horizontalSection);
      parentElement.insertBefore(serpentineSection, horizontalSection);
      parentElement.removeChild(horizontalSection);
      
      // Add some CSS to ensure vertical layout
      splitScreen.setAttribute('style', 'width: 100%; display: block;');
      serpentineSection.setAttribute('style', 'width: 100%; display: block;');
      
      console.log("Converted first horizontal section to vertical layout");
    }
  }
  
  // Note: We're not touching the second horizontal section at all
}); 