"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initBasicAnimations = initBasicAnimations;
// src/animations.ts
const animation_service_1 = require("../services/animation-service");
function initBasicAnimations() {
    console.log('Initializing basic animations');
    // Element existence checks
    const asterixSpan = document.querySelector('#asterix-spanID');
    const headingLeadingAgency = document.querySelector('.heading.leadingagency');
    const eyeballSVG = document.querySelector('#eyeballSVG');
    if (!headingLeadingAgency) {
        console.warn('Leading agency heading not found');
        return;
    }
    // Asterix animations
    let asterixTL = animation_service_1.gsap.timeline();
    animation_service_1.gsap.from(".heading.leadingagency", {
        "--scale1": 0.6,
        duration: 2,
        ease: "power4.inOut"
    });
    let asterixTween1 = animation_service_1.gsap.to(".heading.leadingagency", {
        duration: 3,
        "--rotation": 359.9,
        ease: "none"
    });
    asterixTL.add(asterixTween1, 0);
    animation_service_1.gsap.to(asterixTL, {
        progress: 1,
        duration: 4,
        ease: "none",
        repeat: -1
    });
    // Hover states
    if (asterixSpan) {
        let asterixSpeedUp = animation_service_1.gsap.to(asterixTL, {
            duration: 0.5,
            timeScale: 2,
            ease: "power2.Out",
            paused: true
        });
        let asterixSpeedDown = animation_service_1.gsap.to(asterixTL, {
            duration: 2,
            timeScale: 1,
            ease: "power2.in",
            paused: true
        });
        asterixSpan.addEventListener('mouseenter', () => asterixSpeedUp.play());
        asterixSpan.addEventListener('mouseleave', () => asterixSpeedDown.play());
    }
    // Eyeball animations
    if (eyeballSVG) {
        initEyeballAnimation(eyeballSVG);
    }
}
function initEyeballAnimation(eyeballElement) {
    // Create rotation properties
    const eyeball = eyeBallCreateRotationProperties(eyeballElement);
    if (eyeball) {
        // Store angles in an object
        const angles = { x: 0, y: 0 };
        // Create a timeline that moves the eyeball around
        animation_service_1.gsap.timeline({ repeat: -1, repeatDelay: 1 })
            .to(angles, {
            x: -30,
            duration: 1.5,
            ease: "power2.inOut",
            onUpdate: () => eyeball.updateEyeball(angles.x, angles.y, 25)
        })
            .to(angles, {
            y: -15,
            duration: 1,
            ease: "power2.inOut",
            onUpdate: () => eyeball.updateEyeball(angles.x, angles.y, 25)
        })
            .to(angles, {
            x: 30, y: 0,
            duration: 2,
            ease: "power2.inOut",
            onUpdate: () => eyeball.updateEyeball(angles.x, angles.y, 25)
        })
            .to(angles, {
            x: 0, y: 20,
            duration: 1.5,
            ease: "power2.inOut",
            onUpdate: () => eyeball.updateEyeball(angles.x, angles.y, 25)
        })
            .to(angles, {
            x: 0, y: 0,
            duration: 1,
            ease: "power2.inOut",
            onUpdate: () => eyeball.updateEyeball(angles.x, angles.y, 25)
        });
    }
}
function eyeBallCreateRotationProperties(svgSelector) {
    // 1) Find the <radialGradient> inside your SVG
    const gradient = svgSelector.querySelector('#eyeballGradient');
    if (!gradient) {
        console.warn("No gradient found with id='eyeballGradient'");
        return null;
    }
    // 2) Parse initial attributes from the radial gradient
    const baseX = parseFloat(gradient.getAttribute('cx') || '0');
    const baseY = parseFloat(gradient.getAttribute('cy') || '0');
    const baseR = parseFloat(gradient.getAttribute('r') || '0');
    function getGradientPositionFromAngles(angleX, angleY, radius) {
        const radX = angleX * (Math.PI / 180);
        const radY = angleY * (Math.PI / 180);
        const x = radius * Math.sin(radX) * Math.cos(radY);
        const y = radius * Math.sin(radY);
        return { x, y };
    }
    function getScaleFactorFromAngles(angleX, angleY) {
        const maxFlatten = 0.2;
        const distanceFromCenter = Math.sqrt(angleX * angleX + angleY * angleY);
        const ratio = Math.min(distanceFromCenter / 90, 1);
        return 1 - ratio * maxFlatten;
    }
    function updateEyeball(angleX, angleY, movementRadius = 20) {
        const gradient = svgSelector.querySelector('#eyeballGradient');
        if (!gradient) {
            console.warn("No gradient found with id='eyeballGradient'");
            return;
        }
        const { x, y } = getGradientPositionFromAngles(angleX, angleY, movementRadius);
        const scaleFactor = getScaleFactorFromAngles(angleX, angleY);
        const newRadius = baseR * scaleFactor;
        gradient.setAttribute("fx", (baseX + x).toFixed(2));
        gradient.setAttribute("fy", (baseY + y).toFixed(2));
        gradient.setAttribute("r", newRadius.toFixed(2));
    }
    return {
        baseX,
        baseY,
        baseR,
        updateEyeball,
        getGradientPositionFromAngles,
        getScaleFactorFromAngles
    };
}
