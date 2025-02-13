import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/all';
import mm from './utils/gsapMatchMedia';


let serpTL = gsap.timeline();

gsap.registerPlugin(DrawSVGPlugin)

serpTL.fromTo("#grdstrk1-d", {
    drawSVG: 0
}, {
    drawSVG: "0% 100%",
    duration: 0.5,
    ease: "none"
}, 0).fromTo("#grdstrk2-d", {
    drawSVG: "100% 100%"
}, {
    drawSVG: "100% 0%",
    duration: 0.5,
    ease: "none"
}, ">").fromTo("#grdstrk3-d", {
    drawSVG: "100% 100%"
}, {
    drawSVG: "100% 0%",
    duration: 0.5,
    ease: "none"
}, ">");

gsap.to ("#blueBall", {
    rotation: 359,
    duration: 1,
    ease: "none",
    repeat: -1,
});

gsap.to ("#purpleCross", {
    rotation: -359,
    duration: 1,
    ease: "none",
    repeat: -1,
});

gsap.to ("#pinkHalfHalfCircle", {
    rotation: 359,
    duration: 1,
    ease: "none",
    repeat: -1,
})

gsap.to ("#tealStar", {
    rotation: 359,
    duration: 1,
    ease: "none",
    repeat: -1,
})


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
    trigger: "#w-node-b0d629dd-d26f-3dd7-84cc-4f1327c3d455-dd823d93",
    start: "top middle",
    animation: serpTL,
    markers: true,
    end: "+500px",
    scrub:1,
    toggleActions: "play reverse play reverse"
})