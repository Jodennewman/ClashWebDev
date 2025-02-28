import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

// IMPORTANT: Do not register plugins here. All plugins should be registered in main.ts
// gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);

// Initialize timelines
let serpTL = gsap.timeline();

// Animate the serpentine path with drawSVG
export function initSerpentineAnimation(): void {
    console.log("Initializing serpentine animation");
    
    // Get the serpentine path element and log more details
    const serpentinePath = document.getElementById('serpentinePath');
    const animationPath = document.getElementById('serpentineAnimationPath');
    const section = document.querySelector('.serpentine-section');
    
    // Log detailed element information
    console.log("Section details:", {
        found: !!section,
        height: section?.getBoundingClientRect().height,
        inView: section ? isElementInViewport(section) : false,
        classes: section?.classList.toString()
    });
    
    console.log("Path details:", {
        serpentinePath: {
            found: !!serpentinePath,
            id: serpentinePath?.id,
            visible: serpentinePath ? getComputedStyle(serpentinePath).display : null
        },
        animationPath: {
            found: !!animationPath,
            id: animationPath?.id,
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
    ScrollTrigger.getAll().forEach(st => {
        if (st.vars.id === "serpentinePathTrigger") {
            console.log("Killing existing ScrollTrigger:", st.vars.id);
            st.kill();
        }
    });
    
    // Make sure the path is visible immediately
    gsap.set([serpentinePath, animationPath], { 
        autoAlpha: 0,
        scale: 0.95,
        y: 30
    });
    
    // Create the main timeline with more detailed ScrollTrigger config
    const mainTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
            markers: true,
            id: "serpentinePathTrigger",
            toggleActions: "play reverse play reverse",
            scroller: "#smooth-content",
            onEnter: () => {
                console.log("Entered serpentine section");
                logTriggerState("onEnter");
            },
            onLeave: () => {
                console.log("Left serpentine section");
                logTriggerState("onLeave");
            },
            onEnterBack: () => {
                console.log("Entered back serpentine section");
                logTriggerState("onEnterBack");
            },
            onLeaveBack: () => {
                console.log("Left back serpentine section");
                logTriggerState("onLeaveBack");
            },
            onUpdate: (self) => {
                console.log("Progress:", self.progress.toFixed(3));
                logTriggerState("onUpdate");
            },
            onToggle: (self) => {
                console.log("Active:", self.isActive);
                logTriggerState("onToggle");
            }
        }
    });
    
    // Add animations to the timeline
    mainTimeline
        .to([serpentinePath, animationPath], {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 1,
            ease: "power2.out"
        })
        .from(".serpentine-text", {
            y: 50,
            opacity: 0,
            stagger: 0.2,
            duration: 1,
            ease: "power2.out"
        }, "-=0.5");
    
    // Force a refresh of ScrollTrigger and log the result
    console.log("Before ScrollTrigger refresh");
    ScrollTrigger.refresh(true);
    console.log("After ScrollTrigger refresh");
    
    // Log all ScrollTrigger instances for debugging
    console.log("Active ScrollTrigger instances:", ScrollTrigger.getAll());
    
    // Helper function to check if element is in viewport
    function isElementInViewport(el: Element) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Helper function to log trigger state
    function logTriggerState(event: string) {
        const st = ScrollTrigger.getById("serpentinePathTrigger");
        if (st) {
            console.log(`ScrollTrigger state (${event}):`, {
                progress: st.progress,
                direction: st.direction,
                isActive: st.isActive,
                start: st.start,
                end: st.end,
                trigger: st.trigger,
                scroller: st.scroller
            });
        }
    }
}

// Handle the split screen scrolling effect
export function initSplitScreenScroll(): void {
    console.log("Initializing split screen scroll with true parallax effect");
    
    // Make sure all elements are visible initially
    gsap.set('.text-line, .gallery-item, .left-content-description, .stats-container', {
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
        gsap.set(item, {
            opacity: 1,
            y: 50 + (index * 30), // Start with offset
            scale: 0.95 + (index % 3) * 0.05, // Slight scale variation
            filter: `blur(${index % 2 === 0 ? 0 : 2}px)` // Alternate blur for depth
        });
        
        // Animate items into view
        gsap.to(item, {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.2,
            delay: delay,
            ease: "power2.out"
        });
        
        // Create the parallax effect - items move at different speeds based on data-speed
        gsap.to(item, {
            y: -100 * speed, // Move up as we scroll down, speed determines how much
            scrollTrigger: {
                trigger: "#splitScreenWrapper",
                start: "top top",
                end: "bottom top",
                scrub: true,
                markers: false
            }
        });
        
        // Add a subtle scale effect as items scroll into view
        ScrollTrigger.create({
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            onUpdate: (self) => {
                // Scale and blur based on scroll position
                const progress = self.progress;
                const scale = 0.9 + (progress * 0.2); // Scale from 0.9 to 1.1
                const blur = Math.max(0, 5 - (progress * 5)); // Blur from 5px to 0px
                
                gsap.set(item, {
                    scale: scale,
                    filter: `blur(${blur}px)`,
                    opacity: Math.min(1, 0.6 + (progress * 0.4)) // Opacity from 0.6 to 1
                });
            }
        });
    });
    
    // Animate the heading text with a staggered effect
    const textLines = document.querySelectorAll('.text-line');
    gsap.from(textLines, {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".left-content",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });
    
    // Add a subtle rotation to the orange circle
    const orangeCircle = document.querySelector('.orange-circle');
    if (orangeCircle) {
        gsap.to(orangeCircle, {
            rotation: 360,
            duration: 20,
            repeat: -1,
            ease: "none"
        });
    }
    
    // Animate the description with a fade in
    const description = document.querySelector('.left-content-description p');
    if (description) {
        gsap.from(description, {
            y: 30,
            opacity: 0,
            duration: 1,
            delay: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".left-content",
                start: "top 60%",
                toggleActions: "play none none none"
            }
        });
    }
    
    // Animate stats with a staggered effect
    const statItems = document.querySelectorAll('.stat-item');
    gsap.from(statItems, {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        delay: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
            trigger: ".stats-container",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });
    
    // Add a subtle floating animation to gallery items for more dynamic feel
    galleryItems.forEach((item, index) => {
        // Random floating animation
        gsap.to(item, {
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
export function initRotatingStar(): void {
    console.log("Initializing rotating star");
    
    // Look for the element with class 'rotating-star' instead of ID 'rotatingStar'
    const rotatingStar = document.querySelector('.orange-star');
    
    if (!rotatingStar) {
        console.error("Rotating star element not found");
        return;
    }
    
    // The CSS animation is already applied, but we can enhance it with GSAP
    gsap.to(rotatingStar, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
    });
    
    console.log("Rotating star initialized");
}

// Original motion path animations
serpTL.to("#blueBall", {
    motionPath: {
        path: "#serpentineAnimationPath",
        autoRotate: true,
    },
    ease: "none",
    duration: 0.5,
}, 0)
.to("#purpleCross", {
    motionPath: {
        path: "#serpentineAnimationPath",
        curviness: 2,
        autoRotate: true,
    },
    ease: "none",
    duration: 0.5,
}, 0.5);

ScrollTrigger.create({
    trigger: "#section-serpentine",
    start: "top middle",
    animation: serpTL,
    markers: true,
    end: "+500px",
    scrub: 1,
    toggleActions: "play reverse play reverse"
});

// New function added at the end of the file
export function animateGalleryItems(): void {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        let scaleValue = 1;
        let blurValue = "0px";
        if (index % 3 === 1) {
            scaleValue = 1.1;
            blurValue = "2px";
        } else if (index % 3 === 2) {
            scaleValue = 0.9;
            blurValue = "1px";
        }
        gsap.to(item, { scale: scaleValue, filter: `blur(${blurValue})`, duration: 0.8 });
    });
}

// Add a new function to animate the orange star along the serpentine path
function animateOrangeStar(): void {
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
    
    console.log("Animating orange star along serpentine path", orangeStar, path);
    
    // Set initial position and style
    gsap.set(orangeStar, {
        autoAlpha: 1, // Make it visible immediately
        scale: 0.7, // Start a bit larger
        transformOrigin: "center center",
        zIndex: 20,
        filter: "drop-shadow(0 0 20px rgba(255, 165, 0, 0.8))"
    });
    
    // Create the animation timeline
    const starTL = gsap.timeline({
        scrollTrigger: {
            trigger: "#section-serpentine",
            start: "top 80%", // Start earlier
            end: "bottom top",
            scrub: 1.5, // Smoother scrubbing
            markers: true, // Enable markers for debugging
            id: "orangeStarTrigger",
            onUpdate: (self) => {
                // Increase the star's scale as it moves further down the path
                const progress = self.progress;
                gsap.to(orangeStar, {
                    scale: 0.7 + (progress * 0.8), // Scale from 0.7 to 1.5
                    duration: 0.1
                });
            }
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
        })
        .to(orangeStar, {
            y: "+=100vh", // Continue moving down into the next section
            duration: 3, // Longer duration
            ease: "power1.in",
            onComplete: () => {
                // When the animation is complete, make sure the star is positioned at the start of the next section
                const splitScreenSection = document.getElementById('splitScreenWrapper');
                if (splitScreenSection) {
                    // Position the star at the top of the split screen section
                    gsap.set(orangeStar, {
                        y: splitScreenSection.offsetTop,
                        x: window.innerWidth / 2
                    });
                }
            }
        });
    
    // Add a spinning animation
    gsap.to(orangeStar, {
        rotation: 360,
        duration: 10,
        repeat: -1,
        ease: "none"
    });
    
    console.log("Orange star animation initialized");
}