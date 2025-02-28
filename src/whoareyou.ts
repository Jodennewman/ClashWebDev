import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';

// Remove duplicate plugin registration
console.log('whoAreYou.ts loaded');

/**
 * Initialize the "Who Are You" section with dramatic box expansion
 */
function initWhoAreYouSection(): void {
  console.log('Initializing Who Are You section');
  
  // Get the container and persona boxes
  const container = document.getElementById("whoAreYou-section");
  const leftBox = document.getElementById("leftGreenCreativeBlock");
  const middleBox = document.getElementById("middleBlueBuilderBlock");
  const rightBox = document.getElementById("rightPinkExecBlock");
  
  // Log element status
  console.log('Elements found:', { 
    container: container ? true : false, 
    leftBox: leftBox ? true : false, 
    middleBox: middleBox ? true : false, 
    rightBox: rightBox ? true : false 
  });
  
  if (!container || !leftBox || !middleBox || !rightBox) {
    console.error('Could not find all required elements for Who Are You section');
    return;
  }
  
  // Set up enhanced content for each box
  setupEnhancedContent(leftBox, middleBox, rightBox);
  
  // Create a custom ease for smoother animations
  CustomEase.create("customBounce", "M0,0 C0.156,0.028 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1");
  
  // Add dynamic styles from the codepen
  addDynamicGridStyles();
  
  // For desktop devices, add hover interactions
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  
  if (!isMobile) {
    // Add mouseenter events to each box
    [leftBox, middleBox, rightBox].forEach(box => {
      if (!box) return;
      
      box.addEventListener("mouseenter", () => {
        let newActive: string | null = null;
        if (box === leftBox) newActive = "left";
        if (box === middleBox) newActive = "middle";
        if (box === rightBox) newActive = "right";
        doFlip(newActive);
      });
    });
    
    // Revert to default on container mouseleave
    if (container) {
      container.addEventListener("mouseleave", () => {
        doFlip(null);  // no data-active => default layout
      });
    }
  } else {
    // For mobile, use click/tap instead of hover
    [leftBox, middleBox, rightBox].forEach(box => {
      if (!box) return;
      
      box.addEventListener("click", () => {
        let newActive: string | null = null;
        if (box === leftBox) newActive = "left";
        if (box === middleBox) newActive = "middle";
        if (box === rightBox) newActive = "right";
        
        // If this box is already active, deactivate it
        if (container && container.getAttribute('data-active') === newActive) {
          doFlip(null);
        } else {
          doFlip(newActive);
        }
      });
    });
  }
  
  /**
   * Animate the transition between states
   */
  function doFlip(stateName: string | null): void {
    console.log(`Changing state to: ${stateName || 'default'}`);
    
    // 1) get "before" state for all 3 boxes
    const state = Flip.getState(".pickyourselfdivbox");
    
    // 2) set container's data-active (or remove it)
    if (stateName) {
      if (container) {
        container.setAttribute("data-active", stateName);
      }
    } else {
      if (container) {
        container.removeAttribute("data-active");
      }
    }
    
    // 3) animate from old to new
    Flip.from(state, {
      duration: 0.8,
      ease: "customBounce",
      onComplete: () => {
        console.log('Box animation completed');
      }
    });
    
    // Animate content visibility based on active state
    animateContent(stateName);
  }
  
  /**
   * Animate content elements with dramatic effects
   */
  function animateContent(stateName: string | null): void {
    // Handle each box's content animations
    [leftBox, middleBox, rightBox].forEach(box => {
      if (!box) return;
      
      const title = box.querySelector('.persona-title');
      const desc = box.querySelector('.persona-description');
      const extContent = box.querySelector('.extended-content');
      const button = box.querySelector('.get-started-btn');
      
      const isActive = (stateName === 'left' && box === leftBox) ||
                       (stateName === 'middle' && box === middleBox) ||
                       (stateName === 'right' && box === rightBox);
      
      if (isActive) {
        // For active box - show extended content with dramatic animations
        
        // Title animation - grow and emphasize
        if (title) {
          gsap.to(title, {
            scale: 1.3,
            y: -10,
            color: "white",
            textShadow: "0 2px 10px rgba(0,0,0,0.5)",
            fontWeight: "bold",
            duration: 0.5
          });
        }
        
        // Description animation - fade in and emphasize
        if (desc) {
          gsap.to(desc, {
            opacity: 1,
            y: 0,
            scale: 1.1,
            duration: 0.4,
            delay: 0.1
          });
        }
        
        // Extended content animation - dramatic reveal
        if (extContent) {
          gsap.set(extContent, { display: 'block' });
          gsap.fromTo(extContent, 
            { opacity: 0, y: 30 }, 
            { opacity: 1, y: 0, duration: 0.5, delay: 0.2 }
          );
        }
        
        // Button animation - bounce in
        if (button) {
          gsap.set(button, { display: 'block' });
          gsap.fromTo(button,
            { opacity: 0, y: 20, scale: 0.8 },
            { 
              opacity: 1, 
              y: 0, 
              scale: 1, 
              duration: 0.5, 
              delay: 0.4,
              ease: "back.out(1.7)"
            }
          );
        }
        
        // Add subtle glow to the active box
        gsap.to(box, {
          boxShadow: "0 0 30px rgba(255,255,255,0.3)",
          duration: 0.5
        });
        
      } else {
        // For inactive boxes - hide extended content
        
        // Reset title
        if (title) {
          gsap.to(title, {
            scale: 1,
            y: 0,
            color: "rgba(255,255,255,0.9)",
            textShadow: "none",
            fontWeight: "normal",
            duration: 0.3
          });
        }
        
        // Fade description
        if (desc) {
          gsap.to(desc, {
            opacity: 0.7,
            scale: 1,
            duration: 0.3
          });
        }
        
        // Hide extended content
        if (extContent) {
          gsap.to(extContent, {
            opacity: 0,
            y: 10,
            duration: 0.3,
            onComplete: () => { 
              gsap.set(extContent, { display: 'none' }); 
            }
          });
        }
        
        // Hide button
        if (button) {
          gsap.to(button, {
            opacity: 0,
            y: 10,
            duration: 0.3,
            onComplete: () => { 
              gsap.set(button, { display: 'none' }); 
            }
          });
        }
        
        // Remove glow from inactive boxes
        gsap.to(box, {
          boxShadow: "none",
          duration: 0.5
        });
      }
    });
  }
  
  // Initial entrance animation for the boxes
  gsap.fromTo([leftBox, middleBox, rightBox], 
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" }
  );
  
  console.log('Who Are You section initialized with dramatic box expansion');
}

/**
 * Add grid area styles directly from the codepen
 */
function addDynamicGridStyles(): void {
  const styleElement = document.createElement('style');
  styleElement.id = 'dynamic-whoareyou-styles';
  
  // Use EXACTLY the grid-area values from the codepen
  styleElement.textContent = `
    /* Left Box Expanded */
    #whoAreYou-section[data-active="left"] #leftGreenCreativeBlock {
      grid-area: 4 / 1 / 7 / 6 !important;
      z-index: 1;
      transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    #whoAreYou-section[data-active="left"] #middleBlueBuilderBlock {
      grid-area: 4 / 6 / 7 / 8 !important;
      z-index: 0;
      transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    #whoAreYou-section[data-active="left"] #rightPinkExecBlock {
      grid-area: 4 / 8 / 7 / 10 !important;
      z-index: 0;
      transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    
    /* Middle Box Expanded */
    #whoAreYou-section[data-active="middle"] #leftGreenCreativeBlock {
      grid-area: 4 / 1 / 7 / 3 !important;
      z-index: 1;
      transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    #whoAreYou-section[data-active="middle"] #middleBlueBuilderBlock {
      grid-area: 4 / 3 / 7 / 8 !important;
      z-index: 0;
      transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    #whoAreYou-section[data-active="middle"] #rightPinkExecBlock {
      grid-area: 4 / 8 / 7 / 10 !important;
      z-index: 1;
      transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    
    /* Right Box Expanded */
    #whoAreYou-section[data-active="right"] #leftGreenCreativeBlock {
      grid-area: 4 / 1 / 7 / 3 !important;
      z-index: 1;
      transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    #whoAreYou-section[data-active="right"] #middleBlueBuilderBlock {
      grid-area: 4 / 3 / 7 / 5 !important;
      z-index: 1;
      transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    #whoAreYou-section[data-active="right"] #rightPinkExecBlock {
      grid-area: 4 / 5 / 7 / 10 !important;
      z-index: 0;
      transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    
    /* Additional styling for content elements */
    .pickyourselfdivbox {
      transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
      overflow: hidden;
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .persona-content {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      color: white;
      text-align: center;
    }
    
    .persona-title {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
      font-weight: 600;
    }
    
    .persona-description {
      font-size: 1rem;
      opacity: 0.9;
    }
    
    .extended-content {
      margin-top: 1.5rem;
      display: none;
    }
    
    .extended-content p {
      margin-bottom: 1rem;
    }
    
    .extended-content ul {
      text-align: left;
      padding-left: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .extended-content li {
      margin-bottom: 0.5rem;
    }
    
    .get-started-btn {
      background: white;
      color: #333;
      border: none;
      border-radius: 30px;
      padding: 10px 25px;
      font-weight: 600;
      margin-top: 1rem;
      cursor: pointer;
      display: none;
      align-self: center;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      transition: transform 0.3s, box-shadow 0.3s;
    }
    
    .get-started-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 20px rgba(0,0,0,0.3);
    }
  `;
  
  // Check if the style element already exists and remove it
  const existingStyle = document.getElementById('dynamic-whoareyou-styles');
  if (existingStyle) {
    existingStyle.remove();
  }
  
  // Add to document head
  document.head.appendChild(styleElement);
}

/**
 * Set up the enhanced content for each box
 */
function setupEnhancedContent(leftBox: HTMLElement, middleBox: HTMLElement, rightBox: HTMLElement): void {
  // Creative content
  leftBox.innerHTML = `
    <div class="persona-content">
      <h3 class="persona-title">Creative</h3>
      <p class="persona-description">You're a creative who wants to push the boundaries of short-form content.</p>
      
      <div class="extended-content">
        <p>As a creative, you're looking for ways to express your unique vision across platforms. Our tools help you:</p>
        <ul>
          <li>Unlock new creative possibilities</li>
          <li>Reach wider audiences authentically</li>
          <li>Turn your creative passion into influence</li>
        </ul>
      </div>
      
      <button class="get-started-btn">Find Out More</button>
    </div>
  `;
  
  // Builder content
  middleBox.innerHTML = `
    <div class="persona-content">
      <h3 class="persona-title">Builder</h3>
      <p class="persona-description">You're building a brand and need to establish a strong social presence.</p>
      
      <div class="extended-content">
        <p>As a builder, you need strategic approaches to grow your audience. Our methods help you:</p>
        <ul>
          <li>Build community around your brand</li>
          <li>Convert followers into loyal customers</li>
          <li>Scale your content strategy efficiently</li>
        </ul>
      </div>
      
      <button class="get-started-btn">Find Out More</button>
    </div>
  `;
  
  // Executive content
  rightBox.innerHTML = `
    <div class="persona-content">
      <h3 class="persona-title">Executive</h3>
      <p class="persona-description">You need to justify ROI and see meaningful business results.</p>
      
      <div class="extended-content">
        <p>As an executive, you're focused on tangible outcomes. Our solutions deliver:</p>
        <ul>
          <li>Clear metrics and ROI tracking</li>
          <li>Strategic advantage in the attention economy</li>
          <li>Data-driven insights for better decisions</li>
        </ul>
      </div>
      
      <button class="get-started-btn">Find Out More</button>
    </div>
  `;
  
  // Add button click handlers
  document.querySelectorAll('.get-started-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent triggering parent box click
      
      // Add click animation
      gsap.timeline()
        .to(button, { scale: 0.95, duration: 0.1 })
        .to(button, { scale: 1, duration: 0.1 })
        .add(() => {
          console.log('User clicked Get Started button');
        });
    });
  });
}

// Export the function
export { initWhoAreYouSection }; 