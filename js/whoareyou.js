"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initWhoAreYouSection = initWhoAreYouSection;
// Remove any GSAP imports 
const animation_service_1 = require("./services/animation-service");
const gsap_setup_1 = require("./utils/gsap-setup");
// Use this:
// Remove duplicate plugin registration
console.log('whoAreYou.ts loaded');
/**
 * Initialize the "Who Are You" section with dramatic box expansion
 */
function initWhoAreYouSection() {
    console.log('Initializing Who Are You section');
    const realcheck = document.getElementById("whoAreYou-section");
    if (!realcheck) {
        console.error("Who Are You section not found");
        return;
    }
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
    // Create a custom ease for smoother animations - replacing the bouncy one with a smoother curve
    gsap_setup_1.CustomEase.create("smoothTransition", "M0,0 C0.25,0.1 0.25,0.9 1,1");
    // Add dynamic styles from the codepen
    addDynamicGridStyles();
    // For desktop devices, add hover interactions
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (!isMobile) {
        // Add mouseenter events to each box
        [leftBox, middleBox, rightBox].forEach(box => {
            if (!box)
                return;
            box.addEventListener("click", () => {
                let newActive = null;
                if (box === leftBox)
                    newActive = "left";
                if (box === middleBox)
                    newActive = "middle";
                if (box === rightBox)
                    newActive = "right";
                doFlip(newActive);
            });
        });
        // Revert to default on container mouseleave
        if (container) {
            container.addEventListener("mouseleave", () => {
                doFlip(null); // no data-active => default layout
            });
        }
    }
    else {
        // For mobile, use click/tap instead of hover
        [leftBox, middleBox, rightBox].forEach(box => {
            if (!box)
                return;
            box.addEventListener("click", () => {
                let newActive = null;
                if (box === leftBox)
                    newActive = "left";
                if (box === middleBox)
                    newActive = "middle";
                if (box === rightBox)
                    newActive = "right";
                // If this box is already active, deactivate it
                if (container && container.getAttribute('data-active') === newActive) {
                    doFlip(null);
                }
                else {
                    doFlip(newActive);
                }
            });
        });
    }
    /**
     * Animate the transition between states
     */
    function doFlip(stateName) {
        console.log(`Changing state to: ${stateName || 'default'}`);
        // 1) get "before" state for all 3 boxes
        const state = gsap_setup_1.Flip.getState(".pickyourselfdivbox");
        // 2) set container's data-active (or remove it)
        if (stateName) {
            if (container) {
                container.setAttribute("data-active", stateName);
            }
        }
        else {
            if (container) {
                container.removeAttribute("data-active");
            }
        }
        // 3) animate from old to new with calmer animation
        gsap_setup_1.Flip.from(state, {
            duration: 0.5, // Reduced from 0.8
            ease: "smoothTransition", // Using our new custom ease
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
    function animateContent(stateName) {
        [leftBox, middleBox, rightBox].forEach(box => {
            if (!box)
                return;
            const title = box.querySelector('.persona-title');
            const desc = box.querySelector('.persona-description');
            const extContent = box.querySelector('.extended-content');
            const button = box.querySelector('.get-started-btn');
            const isActive = (stateName === 'left' && box === leftBox) ||
                (stateName === 'middle' && box === middleBox) ||
                (stateName === 'right' && box === rightBox);
            if (isActive) {
                // For active box - show content with smoother animations
                if (title) {
                    animation_service_1.gsap.to(title, {
                        scale: 1.15, // Reduced scale
                        y: 0, // Removed y movement
                        color: "white",
                        fontWeight: "600",
                        duration: 0.4,
                        ease: "power2.out"
                    });
                }
                if (desc) {
                    animation_service_1.gsap.to(desc, {
                        opacity: 1,
                        y: 0,
                        scale: 1, // Removed scale change
                        duration: 0.3,
                        delay: 0.1
                    });
                }
                if (extContent) {
                    animation_service_1.gsap.set(extContent, { display: 'block' });
                    animation_service_1.gsap.fromTo(extContent, { opacity: 0, y: 15 }, // Reduced y movement
                    { opacity: 1, y: 0, duration: 0.4, delay: 0.2, ease: "power2.out" });
                }
                if (button) {
                    animation_service_1.gsap.set(button, { display: 'block' });
                    animation_service_1.gsap.fromTo(button, { opacity: 0, y: 10, scale: 0.95 }, {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.3,
                        delay: 0.3,
                        ease: "power2.out"
                    });
                }
                // Subtle highlight for active box
                animation_service_1.gsap.to(box, {
                    boxShadow: "0 0 40px rgba(0,0,0,0.2)",
                    duration: 0.4
                });
            }
            else {
                // For inactive boxes - smoother transitions out
                if (title) {
                    animation_service_1.gsap.to(title, {
                        scale: 1,
                        y: 0,
                        color: "rgba(255,255,255,0.9)",
                        fontWeight: "400",
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
                if (desc) {
                    animation_service_1.gsap.to(desc, {
                        opacity: 0.7,
                        scale: 1,
                        duration: 0.3
                    });
                }
                if (extContent) {
                    animation_service_1.gsap.to(extContent, {
                        opacity: 0,
                        y: 5, // Reduced movement
                        duration: 0.2,
                        onComplete: () => {
                            animation_service_1.gsap.set(extContent, { display: 'none' });
                        }
                    });
                }
                if (button) {
                    animation_service_1.gsap.to(button, {
                        opacity: 0,
                        y: 5, // Reduced movement
                        duration: 0.2,
                        onComplete: () => {
                            animation_service_1.gsap.set(button, { display: 'none' });
                        }
                    });
                }
                animation_service_1.gsap.to(box, {
                    boxShadow: "none",
                    duration: 0.3
                });
            }
        });
    }
    // Initial entrance animation - smoother and more subtle
    animation_service_1.gsap.fromTo([leftBox, middleBox, rightBox], { y: 30, opacity: 0 }, // Reduced y movement
    { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" });
    console.log('Who Are You section initialized with dramatic box expansion');
}
/**
 * Add grid area styles directly from the codepen
 */
function addDynamicGridStyles() {
    const styleElement = document.createElement('style');
    styleElement.id = 'dynamic-whoareyou-styles';
    styleElement.textContent = `
    /* Base styles for boxes */
    .pickyourselfdivbox {
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      overflow: hidden;
      padding: 2.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #1a1a1a;
      border-radius: 12px;
      border: 1px solid rgba(255,255,255,0.1);
    }

    /* Left Box (Creative) */
    #leftGreenCreativeBlock {
      background: linear-gradient(135deg, #1e3a8a, #2563eb);
    }

    /* Middle Box (Builder) */
    #middleBlueBuilderBlock {
      background: linear-gradient(135deg, #0f766e, #0d9488);
    }

    /* Right Box (Executive) */
    #rightPinkExecBlock {
      background: linear-gradient(135deg, #831843, #be185d);
    }

    /* Grid layouts remain the same */
    #whoAreYou-section[data-active="left"] #leftGreenCreativeBlock {
      grid-area: 4 / 1 / 7 / 6 !important;
      z-index: 1;
    }
    #whoAreYou-section[data-active="left"] #middleBlueBuilderBlock {
      grid-area: 4 / 6 / 7 / 8 !important;
      z-index: 0;
    }
    #whoAreYou-section[data-active="left"] #rightPinkExecBlock {
      grid-area: 4 / 8 / 7 / 10 !important;
      z-index: 0;
    }
    
    /* Middle Box Expanded */
    #whoAreYou-section[data-active="middle"] #leftGreenCreativeBlock {
      grid-area: 4 / 1 / 7 / 3 !important;
      z-index: 1;
    }
    #whoAreYou-section[data-active="middle"] #middleBlueBuilderBlock {
      grid-area: 4 / 3 / 7 / 8 !important;
      z-index: 0;
    }
    #whoAreYou-section[data-active="middle"] #rightPinkExecBlock {
      grid-area: 4 / 8 / 7 / 10 !important;
      z-index: 1;
    }
    
    /* Right Box Expanded */
    #whoAreYou-section[data-active="right"] #leftGreenCreativeBlock {
      grid-area: 4 / 1 / 7 / 3 !important;
      z-index: 1;
    }
    #whoAreYou-section[data-active="right"] #middleBlueBuilderBlock {
      grid-area: 4 / 3 / 7 / 5 !important;
      z-index: 1;
    }
    #whoAreYou-section[data-active="right"] #rightPinkExecBlock {
      grid-area: 4 / 5 / 7 / 10 !important;
      z-index: 0;
    }
    
    /* Modern content styling */
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
      font-size: 2rem;
      margin-bottom: 1rem;
      font-weight: 600;
      letter-spacing: -0.02em;
    }

    .persona-description {
      font-size: 1.1rem;
      opacity: 0.9;
      line-height: 1.5;
      max-width: 80%;
      margin: 0 auto;
    }

    .extended-content {
      margin-top: 2rem;
      display: none;
    }

    .extended-content p {
      margin-bottom: 1.5rem;
      line-height: 1.6;
    }

    .extended-content ul {
      text-align: left;
      padding-left: 0;
      list-style: none;
      margin: 1.5rem auto;
      max-width: 80%;
    }

    .extended-content li {
      margin-bottom: 1rem;
      padding-left: 1.5rem;
      position: relative;
    }

    .extended-content li:before {
      content: "•";
      position: absolute;
      left: 0;
      color: rgba(255,255,255,0.5);
    }

    .get-started-btn {
      background: rgba(255,255,255,0.1);
      color: white;
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 8px;
      padding: 12px 28px;
      font-weight: 500;
      margin-top: 2rem;
      cursor: pointer;
      display: none;
      align-self: center;
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;
    }

    .get-started-btn:hover {
      background: rgba(255,255,255,0.15);
      border-color: rgba(255,255,255,0.3);
      transform: translateY(-2px);
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
function setupEnhancedContent(leftBox, middleBox, rightBox) {
    // Creative content
    leftBox.innerHTML = `
    <div class="persona-content">
      <h3 class="persona-title">Creative</h3>
      <p class="persona-description">You're a creative who wants to push the boundaries of short-form content.</p>
      
      <div class="extended-content">
        <p>As a creative, you're looking for ways to express your unique vision across platforms. <br>Our tools help you:</p>
        <ul style="text-align: center;">
          <br>Unlock new creative possibilities
          <br>Reach wider audiences authentically
          <br>Turn your creative passion into influence
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
            animation_service_1.gsap.timeline()
                .to(button, { scale: 0.95, duration: 0.1 })
                .to(button, { scale: 1, duration: 0.1 })
                .add(() => {
                console.log('User clicked Get Started button');
            });
        });
    });
}
