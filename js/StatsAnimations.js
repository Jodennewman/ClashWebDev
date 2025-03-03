"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initLoopDeLoop = initLoopDeLoop;
exports.initBigHow = initBigHow;
// @ts-ignore - Plugin is used for drawSVG functionality
const gsap_setup_1 = require("./utils/gsap-setup");
const animation_service_1 = require("./services/animation-service");
// Wrap the existing code in an exported function
function initLoopDeLoop() {
    let statsMasterTL = animation_service_1.gsap.timeline({
        scrollTrigger: {
            trigger: "#section-stats",
            scroller: "#smooth-content",
            pin: false,
            start: "top center",
            end: "bottom bottom",
            scrub: true
        }
    });
    //    let qMarkTL = gsap.timeline();
    // 2) Add tweens in sequence, or with relative positions
    animation_service_1.gsap.fromTo("#loopPath1", { drawSVG: 0 }, { duration: 0.7, drawSVG: "100%", ease: "slow(0.2, 0.9, false)",
        scrollTrigger: {
            trigger: "#section-stats",
            scroller: "#smooth-content",
            pin: false,
            scrub: true,
            start: "top center",
            end: "+600px"
        }
    });
    statsMasterTL.fromTo("#mainQMark", { drawSVG: 0 }, { duration: 1, drawSVG: "100%", ease: "power3.inOut" }, 0.5 // starts 0.2s after prior tween begins, for example
    )
        .fromTo("#mainQMarkdot", { drawSVG: 0 }, { duration: 0.3, drawSVG: "100%", ease: "slow(0.2, 0.9, false)" }, "<+0.8" // starts 0.5s after the previous tween ends
    )
        .fromTo(".Qcascade", { drawSVG: 0 }, { duration: 0.5, drawSVG: "100%", ease: "power3.out", stagger: { each: 0.025, from: "end" } }, "<+0.5");
}
function initBigHow() {
    console.log("Initializing Big How section animations");
    const container = document.getElementById("section-stats");
    if (!container) {
        console.error("Stats container not found");
        return;
    }
    const stats = [
        { selector: "#viewsCount", value: 750, decimals: 0, label: "#viewsText" },
        { selector: "#followersCount", value: 4.5, decimals: 1, label: "#followersText" },
        { selector: "#interactionsCount", value: 86, decimals: 0, label: "#interactionsText" }
    ];
    console.log('StatsAnimations.ts loaded');
    // Store references to each container
    const statContainers = [];
    // STEP 1: Initial fade-in animations
    stats.forEach((stat, index) => {
        const numberEl = document.querySelector(stat.selector);
        const labelEl = document.querySelector(stat.label);
        if (!numberEl || !labelEl)
            return;
        const containerEl = numberEl.parentElement;
        if (!containerEl)
            return;
        statContainers.push(containerEl);
        // Split text
        const splitLabel = new gsap_setup_1.SplitText(labelEl, { type: "chars" });
        // Set initial state
        animation_service_1.gsap.set(containerEl, { y: 100, opacity: 0 });
        animation_service_1.gsap.set(numberEl, { textContent: "0m+", opacity: 0 });
        animation_service_1.gsap.set(splitLabel.chars, { opacity: 0, y: 30 });
        // Simple trigger to play once when element is 80% in view
        gsap_setup_1.ScrollTrigger.create({
            trigger: `#${containerEl.id}`,
            start: "top 80%",
            end: "bottom top",
            scroller: "#smooth-content",
            markers: true,
            onEnter: () => {
                const delay = index * 0.3;
                // Animate in sequence
                animation_service_1.gsap.to(containerEl, {
                    y: 0, opacity: 1, duration: 1.2,
                    delay, ease: "power2.out"
                });
                animation_service_1.gsap.to(numberEl, {
                    opacity: 1, duration: 0.8,
                    delay: delay + 0.2, ease: "power2.out"
                });
                // Count up
                animation_service_1.gsap.to({ value: 0 }, {
                    value: stat.value,
                    duration: 1.1,
                    delay: delay + 0.2,
                    ease: "power3.inOut",
                    onUpdate: function () {
                        const formatted = this.targets()[0].value.toFixed(stat.decimals || 0);
                        numberEl.textContent = `${parseFloat(formatted)}m+`;
                    }
                });
                // Character reveal
                animation_service_1.gsap.to(splitLabel.chars, {
                    opacity: 1, y: 0,
                    stagger: 0.03, duration: 0.6,
                    delay: delay + 0.3, ease: "power2.out"
                });
            }
        });
    });
    // STEP 2: HOW animation and swooping behavior
    const bigHowTrigger = document.querySelector("#bigHow");
    if (bigHowTrigger) {
        gsap_setup_1.ScrollTrigger.create({
            trigger: "#bigHow",
            start: "top 70%",
            once: true,
            markers: false,
            scroller: "#smooth-content",
            toggleActions: "play none none reverse",
            onEnter: () => {
                console.log("HOW triggered - stats will swoop to it");
                // 1. Animate in the HOW
                animation_service_1.gsap.fromTo("#bigHow", { scale: 0, opacity: 0 }, {
                    scale: 1,
                    opacity: 1,
                    duration: 1,
                    ease: "back.out(2)",
                    onComplete: swoopStatsToHOW
                });
                // 2. Function to make stats swoop to HOW
                function swoopStatsToHOW() {
                    // Get HOW position
                    const howEl = document.querySelector("#bigHow");
                    if (!howEl)
                        return;
                    const howRect = howEl.getBoundingClientRect();
                    const howX = howRect.left + (howRect.width / 2);
                    const howY = howRect.top + (howRect.height / 2);
                    // Define positions around HOW
                    const haloPositions = [
                        { x: howX, y: howY + 170 }, // Top
                        { x: howX, y: howY + 280 }, // Left
                        { x: howX, y: howY + 380 } // Right
                    ];
                    // Make each stat swoop to its position
                    statContainers.forEach((container, i) => {
                        // Kill any existing animations
                        animation_service_1.gsap.killTweensOf(container);
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
                        animation_service_1.gsap.set(container, { clearProps: "all" });
                        // Create the swooping animation with direct CSS properties
                        animation_service_1.gsap.fromTo(container, {
                            x: 0,
                            y: 0,
                            rotation: 0,
                            scale: 1
                        }, {
                            x: moveX,
                            y: moveY,
                            scale: i === 0 ? 0.4 : i === 1 ? 0.3 : 0.2,
                            rotation: 0,
                            duration: 1,
                            delay: i * 0.1,
                            ease: "back.inOut(1.7)",
                            onComplete: () => {
                                // Add subtle floating animation after they arrive
                                animation_service_1.gsap.to(container, {
                                    y: `+=${i === 0 ? -20 : i === 1 ? -10 : -10}`,
                                    rotation: `+=${i === 0 ? 0 : i === 1 ? 3 : -3}`,
                                    duration: 2.5,
                                    ease: "sine.inOut",
                                    repeat: -1,
                                    yoyo: true
                                });
                            }
                        });
                    });
                }
            }
        });
    }
}
