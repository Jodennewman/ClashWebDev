import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

// Register plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

document.addEventListener('DOMContentLoaded', () => {
  // Clear previous animations
  ScrollTrigger.getAll().forEach(st => st.kill());
  gsap.globalTimeline.clear();

  console.log("Setting up simplified stats animations");
  
  const stats = [
    { selector: "#viewsCount", value: 750, decimals: 0, label: "#viewsText" },
    { selector: "#followersCount", value: 4.5, decimals: 1, label: "#followersText" },
    { selector: "#interactionsCount", value: 86, decimals: 0, label: "#interactionsText" }
  ];

  // Store references to each container
  const statContainers: HTMLElement[] = [];

  // STEP 1: Initial fade-in animations
  stats.forEach((stat, index) => {
    const numberEl = document.querySelector(stat.selector);
    const labelEl = document.querySelector(stat.label);
    if (!numberEl || !labelEl) return;

    const containerEl = numberEl.parentElement;
    if (containerEl) {
      statContainers.push(containerEl);
    }

    // Split text
    const splitLabel = new SplitText(labelEl, { type: "chars" });
    
    // Set initial state - completely hidden, positioned below
    gsap.set(containerEl, { y: 100, opacity: 0, rotation: 0, scale: 1 });
    gsap.set(numberEl, { textContent: "0m+", opacity: 0 });
    gsap.set(splitLabel.chars, { opacity: 0, y: 30 });

    // Create initial animation trigger
    ScrollTrigger.create({
      trigger: containerEl,
      start: "top 80%",
      markers: false,
      id: `stat-${index}`,
      onEnter: () => {
        // Staggered delays for each stat
        const delay = index * 0.3;
        
        // 1. Fade in and move up the container
        gsap.to(containerEl, {
          y: 0,
          opacity: 1,
          duration: 1.2,
          delay: delay,
          ease: "power2.out"
        });
        
        // 2. Animate the number
        gsap.to(numberEl, {
          opacity: 1,
          duration: 0.8,
          delay: delay + 0.2,
          ease: "power2.out"
        });
        
        // 3. Count up animation
        gsap.to({ value: 0 }, {
          value: stat.value,
          duration: 1.1,
          delay: delay + 0.2,
          ease: "power3.inOut",
          onUpdate: function() {
            const formatted = this.targets()[0].value.toFixed(stat.decimals || 0);
            numberEl.textContent = `${parseFloat(formatted)}m+`;
          }
        });
        
        // 4. Stagger in the characters
        gsap.to(splitLabel.chars, {
          opacity: 1,
          y: 0,
          stagger: 0.03,
          duration: 0.6,
          delay: delay + 0.3,
          ease: "power2.out"
        });
        
        // 5. Simple, gentle floating animation
        gsap.to(containerEl, {
          y: "+=10",
          duration: 3,
          delay: delay + 1,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        });
      }
    });
  });

  // STEP 2: HOW animation and swooping behavior
  const bigHowTrigger = document.querySelector("#bigHow");
  if (bigHowTrigger) {
    ScrollTrigger.create({
      trigger: bigHowTrigger,
      start: "top 70%",
      once: true,
      markers: false,
      toggleActions: "play none reverse reset",
      onEnter: () => {
        console.log("HOW triggered - stats will swoop to it");
        
        // 1. Animate in the HOW
        gsap.fromTo("#bigHow", 
          { scale: 0, opacity: 0 },
          { 
            scale: 1, 
            opacity: 1, 
            duration: 1, 
            ease: "back.out(2)",
            onComplete: swoopStatsToHOW 
          }
        );
        
        // 2. Function to make stats swoop to HOW
        function swoopStatsToHOW() {
          // Get HOW position
          const howEl = document.querySelector("#bigHow");
          if (!howEl) return;
          
          const howRect = howEl.getBoundingClientRect();
          const howX = howRect.left + (howRect.width / 2);
          const howY = howRect.top + (howRect.height / 2);
          
          // Define positions around HOW
          const haloPositions = [
            { x: howX, y: howY + 170 },           // Top
            { x: howX, y: howY + 280 },      // Left
            { x: howX , y: howY +380 }       // Right
          ];
          
          // Make each stat swoop to its position
          statContainers.forEach((container, i) => {
            // Kill any existing animations
            gsap.killTweensOf(container);
            
            // Get current position
            const rect = container.getBoundingClientRect();
            const currentX = rect.left + (rect.width / 2);
            const currentY = rect.top + (rect.height / 2);
            
            // Get target position
            const target = haloPositions[i] || haloPositions[0];
            
            // Convert to relative movement values
            const moveX = target.x - currentX;
            const moveY = target.y - currentY;
            
            // First reset all transforms
            gsap.set(container, { clearProps: "all" });
            
            // Create the swooping animation with direct CSS properties
            gsap.fromTo(container,
              { 
                x: 0, 
                y: 0, 
                rotation: 0,
                scale: 1
              },
              {
                x: moveX,
                y: moveY,
                scale: i===0 ? 0.4 : i===1 ? 0.3 : 0.2,
                rotation: 0,
                duration: 1,
                delay: i * 0.1,
                ease: "back.inOut(1.7)",
                onComplete: () => {
                  // Add subtle floating animation after they arrive
                  gsap.to(container, {
                    y: `+=${i===0 ? -20 : i===1 ? -10 : -10}`,
                    rotation: `+=${i===0 ? 0 : i===1 ? 3 : -3}`,
                    duration: 2.5,
                    ease: "sine.inOut",
                    repeat: -1,
                    yoyo: true
                  });
                }
              }
            );
          });
        }
      }
    });
  }
});