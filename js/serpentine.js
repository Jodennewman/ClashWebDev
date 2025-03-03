"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSerpentineAnimation = initSerpentineAnimation;
exports.initSplitScreenScroll = initSplitScreenScroll;
exports.initRotatingStar = initRotatingStar;
exports.animateGalleryItems = animateGalleryItems;
exports.animateOrangeStar = animateOrangeStar;
// Import from the animation service
const animation_service_1 = require("./services/animation-service");
const gsap_setup_1 = require("./utils/gsap-setup");
console.log('serpentine.ts loaded');
// Initialize timelines
let serpTL = animation_service_1.gsap.timeline();
// Animate the serpentine path with drawSVG
function initSerpentineAnimation() {
    const container = document.getElementById("section-serpentine");
    if (!container) {
        console.error("Serpentine container not found");
        return;
    }
    console.log("Initializing serpentine animation");
    // Create timeline
    const timeline = animation_service_1.gsap.timeline({
        scrollTrigger: {
            trigger: "#section-serpentine",
            scroller: "#smooth-content",
            start: "top center",
            end: "bottom center",
            scrub: 1,
            // Use markers for debugging
            markers: true
        }
    });
    // Get the serpentine path element and log more details
    const serpentinePath = document.getElementById('serpentinePath');
    const animationPath = document.getElementById('serpentineAnimationPath');
    const section = document.querySelector('.serpentine-section');
    // Log detailed element information
    console.log("Section details:", {
        found: !!section,
        height: section === null || section === void 0 ? void 0 : section.getBoundingClientRect().height,
        inView: section ? isElementInViewport(section) : false,
        classes: section === null || section === void 0 ? void 0 : section.classList.toString()
    });
    console.log("Path details:", {
        serpentinePath: {
            found: !!serpentinePath,
            id: serpentinePath === null || serpentinePath === void 0 ? void 0 : serpentinePath.id,
            visible: serpentinePath ? getComputedStyle(serpentinePath).display : null
        },
        animationPath: {
            found: !!animationPath,
            id: animationPath === null || animationPath === void 0 ? void 0 : animationPath.id,
            visible: animationPath ? getComputedStyle(animationPath).display : null
        }
    });
    if (!serpentinePath || !animationPath || !section) {
        console.error("Required elements not found:", {
            serpentinePath: !!serpentinePath,
            animationPath: !!animationPath,
            section: !!section
        });
        return;
    }
    // Clear any existing ScrollTrigger instances for this section
    animation_service_1.gsap.globalTimeline.clear();
    // Make sure the path is visible immediately but start with drawSVG at 0
    animation_service_1.gsap.set([serpentinePath, animationPath], {
        autoAlpha: 1,
        scale: 0.95,
        y: 30
    });
    // Set drawSVG to 0 initially
    animation_service_1.gsap.set(animationPath, { drawSVG: 0 });
    // Add animations to the timeline
    timeline
        // First animate scale and position
        .to([serpentinePath, animationPath], {
        scale: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
    })
        // Then animate the path drawing with DrawSVG
        .to(animationPath, {
        drawSVG: "100%",
        duration: 1.5,
        ease: "power2.inOut"
    }, "-=0.3")
        // Animate text after path is drawn
        .from(".serpentine-text", {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out"
    }, "-=0.8");
    // Also set up the motion path animations from the original code
    setupMotionPathAnimations();
    // Helper function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth));
    }
    console.log("Serpentine animation with DrawSVG initialized successfully");
}
// Set up the motion path animations for the decorative elements
function setupMotionPathAnimations() {
    // Clear the timeline first
    serpTL.clear();
    // Check if elements exist
    const blueBall = document.querySelector("#blueBall");
    const purpleCross = document.querySelector("#purpleCross");
    const animationPath = document.querySelector("#serpentineAnimationPath");
    if (!animationPath) {
        console.error("Animation path not found for motion paths");
        return;
    }
    if (blueBall) {
        serpTL.to("#blueBall", {
            motionPath: {
                path: "#serpentineAnimationPath",
                autoRotate: true,
            },
            ease: "none",
            duration: 0.5,
        }, 0);
    }
    else {
        console.warn("Blue ball element not found for motion path");
    }
    if (purpleCross) {
        serpTL.to("#purpleCross", {
            motionPath: {
                path: "#serpentineAnimationPath",
                curviness: 2,
                autoRotate: true,
            },
            ease: "none",
            duration: 0.5,
        }, 0.5);
    }
    else {
        console.warn("Purple cross element not found for motion path");
    }
    // Create ScrollTrigger for these motion path animations
    gsap_setup_1.ScrollTrigger.create({
        trigger: "#section-serpentine",
        scroller: "#smooth-content",
        start: "top middle",
        end: "+500px",
        pin: true,
        scrub: 1,
        id: "serpentineMotionTrigger",
        onUpdate: (self) => {
            // Use the progress to animate the timeline manually
            serpTL.progress(self.progress);
        }
    });
    console.log("Motion path animations initialized");
}
// Handle the split screen scrolling effect
function initSplitScreenScroll() {
    const container = document.getElementById("splitScreenWrapper");
    if (!container) {
        console.error("Split screen container not found");
        return;
    }
    console.log("Initializing split screen scroll with true parallax effect");
    // Make sure all elements are visible initially
    animation_service_1.gsap.set('.text-line, .gallery-item, .left-content-description, .stats-container', {
        opacity: 1,
        clearProps: 'all' // Clear any previous GSAP properties
    });
    // Create a parallax effect for the gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        // Get the data-speed attribute or use a default value
        const speed = parseFloat(item.getAttribute('data-speed') || '0.5');
        const delay = index * 0.1; // Staggered delay for initial animation
        // Set initial state with slight scale and blur variations
        animation_service_1.gsap.set(item, {
            opacity: 1,
            y: 50 + (index * 30), // Start with offset
            scale: 0.95 + (index % 3) * 0.05, // Slight scale variation
            filter: `blur(${index % 2 === 0 ? 0 : 2}px)` // Alternate blur for depth
        });
        // Animate items into view
        animation_service_1.gsap.to(item, {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.2,
            delay: delay,
            ease: "power2.out"
        });
        // Create the parallax effect - items move at different speeds based on data-speed
        animation_service_1.gsap.to(`.gallery-item:nth-child(${index + 1})`, {
            y: -100 * speed, // Move up as we scroll down, speed determines how much
            scrollTrigger: {
                trigger: `.gallery-item:nth-child(${index + 1})`,
                scroller: "#smooth-content",
                start: "top top",
                end: "bottom top",
                scrub: true,
                markers: false
            }
        });
        // Add a subtle scale effect as items scroll into view
        animation_service_1.gsap.timeline({
            scrollTrigger: {
                trigger: `.gallery-item:nth-child(${index + 1})`,
                scroller: "#smooth-content",
                start: "top bottom",
                end: "bottom top",
                scrub: true,
                onUpdate: (self) => {
                    // Scale and blur based on scroll position
                    const progress = self.progress;
                    const scale = 0.9 + (progress * 0.2); // Scale from 0.9 to 1.1
                    const blur = Math.max(0, 5 - (progress * 5)); // Blur from 5px to 0px
                    animation_service_1.gsap.set(`.gallery-item:nth-child(${index + 1})`, {
                        scale: scale,
                        filter: `blur(${blur}px)`,
                        opacity: Math.min(1, 0.6 + (progress * 0.4)) // Opacity from 0.6 to 1
                    });
                }
            }
        });
    });
    // Animate the heading text with a staggered effect
    const textLines = document.querySelectorAll('.text-line');
    animation_service_1.gsap.from(textLines, {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".left-content",
            scroller: "#smooth-content",
            start: "top 80%",
            end: "bottom top",
            toggleActions: "play none none none"
        }
    });
    // Add a subtle rotation to the orange circle
    const orangeCircle = document.querySelector('.orange-circle');
    if (orangeCircle) {
        animation_service_1.gsap.to(orangeCircle, {
            rotation: 360,
            duration: 20,
            repeat: -1,
            ease: "none"
        });
    }
    // Animate the description with a fade in
    const description = document.querySelector('.left-content-description p');
    if (description) {
        animation_service_1.gsap.from(description, {
            y: 30,
            opacity: 0,
            duration: 1,
            delay: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".left-content",
                scroller: "#smooth-content",
                start: "top 60%",
                end: "bottom top",
                toggleActions: "play none none none"
            }
        });
    }
    // Animate stats with a staggered effect
    const statItems = document.querySelectorAll('.stat-item');
    animation_service_1.gsap.from(statItems, {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        delay: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
            trigger: ".stats-container",
            scroller: "#smooth-content",
            start: "top 80%",
            end: "bottom top",
            toggleActions: "play none none none"
        }
    });
    // Add a subtle floating animation to gallery items for more dynamic feel
    galleryItems.forEach((item, index) => {
        // Random floating animation
        animation_service_1.gsap.to(item, {
            y: `+=${(index % 2 === 0 ? 15 : -15)}`, // Alternate up/down
            duration: 2 + (index * 0.2), // Varied duration
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.1
        });
    });
    console.log("Split screen scroll with parallax effect initialized successfully");
}
// Handle the rotating star animation
function initRotatingStar() {
    console.log("Initializing rotating star");
    // Look for the element with class 'rotating-star' instead of ID 'rotatingStar'
    const rotatingStar = document.querySelector('.orange-star');
    if (!rotatingStar) {
        console.error("Rotating star element not found");
        return;
    }
    // The CSS animation is already applied, but we can enhance it with GSAP
    animation_service_1.gsap.to(rotatingStar, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
    });
    console.log("Rotating star initialized");
}
// New function added at the end of the file
function animateGalleryItems() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        let scaleValue = 1;
        let blurValue = "0px";
        if (index % 3 === 1) {
            scaleValue = 1.1;
            blurValue = "2px";
        }
        else if (index % 3 === 2) {
            scaleValue = 0.9;
            blurValue = "1px";
        }
        animation_service_1.gsap.to(item, { scale: scaleValue, filter: `blur(${blurValue})`, duration: 0.8 });
    });
}
// Add a new function to animate the orange star along the serpentine path
function animateOrangeStar() {
    // Get the orange star element that's now in the HTML
    const orangeStar = document.getElementById('orangeStar');
    if (!orangeStar) {
        console.error("Orange star element not found");
        return;
    }
    // Get the path for the motion
    const path = document.getElementById('serpentineAnimationPath');
    if (!path) {
        console.error("Path element not found for motion path animation");
        return;
    }
    console.log("Animating orange star along serpentine path");
    // Set initial position and style
    animation_service_1.gsap.set(orangeStar, {
        autoAlpha: 1, // Make it visible immediately
        scale: 0.7, // Start a bit larger
        transformOrigin: "center center",
        zIndex: 20,
        filter: "drop-shadow(0 0 20px rgba(255, 165, 0, 0.8))"
    });
    // Create the animation timeline
    const starTL = animation_service_1.gsap.timeline({
        scrollTrigger: {
            trigger: "#section-serpentine",
            scroller: "#smooth-content",
            start: "top 80%", // Start earlier
            end: "bottom top",
            scrub: 1.5, // Smoother scrubbing
            id: "orangeStarTrigger"
        }
    });
    // Animate the star along the path
    starTL
        .to(orangeStar, {
        autoAlpha: 1,
        duration: 0.5
    })
        .to(orangeStar, {
        motionPath: {
            path: `#${path.id}`, // Use the ID as a selector
            align: `#${path.id}`,
            alignOrigin: [0.5, 0.5],
            autoRotate: true
        },
        duration: 8, // Longer duration for smoother motion
        ease: "power1.inOut"
    });
    // Add a spinning animation
    animation_service_1.gsap.to(orangeStar, {
        rotation: 360,
        duration: 10,
        repeat: -1,
        ease: "none"
    });
    console.log("Orange star animation initialized");
}
