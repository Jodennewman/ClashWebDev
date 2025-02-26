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
    
    // Get the serpentine path element
    const serpentinePath = document.getElementById('serpentinePath');
    
    if (!serpentinePath) {
        console.error("Serpentine path element not found");
        return;
    }
    
    console.log("Found serpentine path element:", serpentinePath);
    
    // Make sure the path is visible before animation
    gsap.set(serpentinePath, { 
        autoAlpha: 0, // Start invisible
        scale: 0.95
    });
    
    // Create the animation for the path with a longer duration and more pronounced effect
    const serpentineTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: "#section-serpentine",
            start: "top 80%", // Start earlier
            end: "bottom 20%", // End later
            scrub: 1,
            markers: true, // Add markers for debugging
            id: "serpentinePathTrigger",
            onEnter: () => {
                console.log("Entered serpentine section");
                // Fade in and add a glow effect when entering
                gsap.to(serpentinePath, {
                    autoAlpha: 1,
                    scale: 1,
                    filter: "drop-shadow(0 0 25px rgba(106, 17, 203, 0.8))",
                    duration: 1.5,
                    ease: "power2.out"
                });
                
                // Start the orange star animation when entering the section
                animateOrangeStar();
            },
            onLeave: () => console.log("Left serpentine section"),
            onEnterBack: () => console.log("Entered back serpentine section"),
            onLeaveBack: () => console.log("Left back serpentine section")
        }
    });
    
    console.log("Serpentine animation timeline created:", serpentineTimeline);
    
    // Animate eyeballs along the path
    const eyeballs = document.querySelectorAll('.eyeball');
    
    eyeballs.forEach((eyeball, index) => {
        const delay = index * 0.08; // Slightly faster stagger
        gsap.from(eyeball, {
            y: 70, // Increased from 50
            opacity: 0,
            duration: 0.8,
            delay,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: "#section-serpentine",
                start: "top 70%",
                toggleActions: "play none none reverse"
            }
        });
        
        // Add more varied floating animation
        gsap.to(eyeball, {
            y: `random(-20, 20)`, // Increased range
            x: `random(-15, 15)`, // Increased range
            rotation: `random(-15, 15)`, // Increased range
            duration: `random(3, 7)`, // Longer duration
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: `random(0, 3)` // More varied delay
        });
    });
    
    // Animate text elements
    const textElements = document.querySelectorAll('.serpentine-text');
    
    // Create a timeline for text animations
    const textTL = gsap.timeline({
        scrollTrigger: {
            trigger: "#section-serpentine",
            start: "top 60%",
            end: "bottom 20%",
            scrub: 1.5,
            markers: false
        }
    });
    
    // Animate each text element with a staggered effect
    textElements.forEach((text, index) => {
        const yOffset = index === 1 ? "-=30" : "+=30"; // Middle text moves in opposite direction
        
        textTL.fromTo(text, 
            { 
                opacity: 0, 
                y: yOffset,
                scale: 0.9
            },
            { 
                opacity: 1, 
                y: 0,
                scale: 1,
                duration: 1,
                ease: "power2.out"
            },
            index * 0.3 // Stagger the animations
        );
        
        // Add a subtle floating animation after the text appears
        gsap.to(text, {
            y: "random(-10, 10)",
            duration: "random(3, 5)",
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: 1 + (index * 0.5)
        });
    });
    
    // Rotating decorative elements with different speeds and directions
    gsap.to(".blue-ball", {
        rotation: 360,
        duration: 20,
        ease: "none",
        repeat: -1
    });
    
    gsap.to(".purple-cross", {
        rotation: -360,
        duration: 25,
        ease: "none",
        repeat: -1
    });
    
    gsap.to(".teal-star", {
        rotation: 360,
        duration: 30,
        ease: "none",
        repeat: -1
    });
    
    // Special animations for eyeballs at section crossovers
    const topEyeballs = document.querySelectorAll('.eyeball-row:first-child .eyeball');
    
    // Top eyeballs animation (section entrance)
    topEyeballs.forEach((eyeball) => {
        // Random rotation
        gsap.to(eyeball, {
            rotation: Math.random() > 0.5 ? 20 : -20, // Increased rotation
            duration: 2 + Math.random() * 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
        
        // Random scale pulsing
        gsap.to(eyeball, {
            scale: 0.85 + Math.random() * 0.4, // More varied scale
            duration: 1 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: Math.random()
        });
        
        // Add a special animation when scrolling into view
        ScrollTrigger.create({
            trigger: "#section-serpentine",
            start: "top 90%",
            end: "top 10%",
            onEnter: () => {
                gsap.to(eyeball, {
                    y: -40, // Increased from -30
                    scale: 1.3, // Increased from 1.2
                    duration: 0.5,
                    ease: "back.out(1.7)",
                    overwrite: true
                });
                
                // Add a glow effect
                const eyeballImg = eyeball.querySelector('.eyeball-img') as HTMLElement;
                if (eyeballImg) {
                    gsap.to(eyeballImg, {
                        filter: "drop-shadow(0 0 25px rgba(255, 255, 255, 0.9))", // Increased glow
                        duration: 0.5
                    });
                }
            },
            onLeaveBack: () => {
                gsap.to(eyeball, {
                    y: 0,
                    scale: 1,
                    duration: 0.5,
                    ease: "back.in(1.7)",
                    overwrite: true
                });
                
                // Remove glow effect
                const eyeballImg = eyeball.querySelector('.eyeball-img') as HTMLElement;
                if (eyeballImg) {
                    gsap.to(eyeballImg, {
                        filter: "drop-shadow(0 0 15px rgba(255, 255, 255, 0.7))",
                        duration: 0.5
                    });
                }
            }
        });
    });
    
    // Animate description with a fade-in effect
    const description = document.querySelector('.serpentine-description');
    if (description) {
        gsap.timeline({
            scrollTrigger: {
                trigger: "#section-serpentine",
                start: "top 60%",
                end: "center 40%",
                scrub: 1
            }
        }).fromTo(description,
            { y: 30, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.8 }
        );
    } else {
        console.error("Serpentine description not found");
    }
    
    // Animate CTA button with a bounce effect
    const ctaButton = document.querySelector('.serpentine-cta');
    if (ctaButton) {
        gsap.timeline({
            scrollTrigger: {
                trigger: "#section-serpentine",
                start: "top 50%",
                end: "center 30%",
                scrub: 1
            }
        }).fromTo(ctaButton,
            { y: 20, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.5, ease: "back.out(1.7)" }
        );
    } else {
        console.error("Serpentine CTA button not found");
    }
    
    // Animate section title with a slide-in effect
    const sectionTitle = document.querySelector('.section-title');
    if (sectionTitle) {
        gsap.timeline({
            scrollTrigger: {
                trigger: "#section-serpentine",
                start: "top 75%",
                end: "center 50%",
                scrub: 1
            }
        }).fromTo(sectionTitle,
            { y: -30, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.8 }
        );
    } else {
        console.error("Section title not found");
    }
    
    // Animate decorative elements with a pop-in effect
    const decorativeElements = document.querySelectorAll('.decorative-element');
    if (decorativeElements.length > 0) {
        gsap.timeline({
            scrollTrigger: {
                trigger: "#section-serpentine",
                start: "top 70%",
                end: "center 30%",
                scrub: 1
            }
        }).fromTo(decorativeElements,
            { scale: 0, autoAlpha: 0, rotation: -45 },
            { 
                scale: 1, 
                autoAlpha: 1, 
                rotation: 0,
                stagger: 0.15, 
                duration: 0.8,
                ease: "back.out(1.7)"
            }
        );
    } else {
        console.error("Decorative elements not found");
    }
    
    // Add console logs to help debug
    console.log("Serpentine animation initialized");
    document.querySelectorAll('.eyeball').forEach((eyeball, index) => {
        console.log(`Eyeball ${index + 1} found:`, eyeball);
    });
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
    const rotatingStar = document.querySelector('.rotating-star');
    
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
        path: [{x: 0, y:0 }, {x: "-=70vw", y:"=+10vh"}, { x:"-=5vw", y:"=+10vh"}],
        autoRotate: true,
    },
    ease: "none",
    duration: 0.5,
}, 0)
.to("#purpleCross", {
    motionPath: {
        path: [{x: 0, y:0 }, {x: "-=70vw", y:"+=10vh"}, { x:"-=5vw", y:"+=10vh"}],
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
    const path = document.getElementById('serpentinePath');
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