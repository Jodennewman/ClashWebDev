"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initTitleAnimation = initTitleAnimation;
// @ts-ignore - Plugin is used for drawSVG functionality
const gsap_setup_1 = require("./utils/gsap-setup");
const animation_service_1 = require("./services/animation-service");
// Export a function that can be called from main.ts
console.log('Title-Animation.ts loaded');
function initTitleAnimation() {
    console.log("Initializing title animations");
    // 1) Register the plugins from your bundle
    animation_service_1.gsap.to("#heroTitleMain", {
        x: '-20vw',
        duration: 0.2,
        ease: "power4.Out",
    });
    animation_service_1.gsap.to("#heroTitleMain2", {
        x: '-20vw',
        duration: 0.2,
        ease: "power4.Out",
    });
    const titleGlobalTL = animation_service_1.gsap.timeline({ paused: false });
    const tl = animation_service_1.gsap.timeline({ paused: true });
    const attentionTL = animation_service_1.gsap.timeline({ paused: true });
    //split 1
    const split1 = new gsap_setup_1.SplitText("#heroTitleLine1", { type: "chars" });
    split1.chars.forEach((obj, i) => {
        let slideTween = animation_service_1.gsap.from(obj, {
            ease: "power4.out",
            y: 50,
            opacity: 0,
            delay: i * 0.02
        });
        let colorTween = animation_service_1.gsap.from(obj, {
            color: i % 2 === 0 ? "#ffb127" : "#ffc69e",
            delay: i * 0.01,
            ease: "none",
        });
        tl.add(slideTween, 0);
        tl.add(colorTween, 0);
    });
    // Split 2
    const split2 = new gsap_setup_1.SplitText("#heroTitleMain", { type: "words" });
    const rewind2 = Array.from(split2.words).reverse();
    rewind2.forEach((obj, i) => {
        // let txt = (obj as HTMLElement).innerText;
        let heroOpacityTween = animation_service_1.gsap.from(obj, {
            x: 30 + (i * -40),
            y: -10,
            opacity: 0,
            duration: 1,
            delay: i * 0.1,
        });
        attentionTL.add(heroOpacityTween, 0);
    });
    titleGlobalTL.to(tl, { duration: 1.5, progress: 1, ease: "power2.Out" }, 0);
    titleGlobalTL.to(attentionTL, { duration: 2, progress: 1, ease: "power4.Out" }, ">-0.85");
    titleGlobalTL.to("#heroTitleMain2", {
        duration: 0.5,
        opacity: 1,
        ease: "power4.inOut",
    }, ">-0.5");
    titleGlobalTL.to("#heroTitleMain", {
        duration: 0.5,
        opacity: 0,
        ease: "power4.inOut",
    }, "<0.2");
    titleGlobalTL.to("#glitchTitle", {
        scrambleText: {
            text: "We Get",
            chars: "clash"
        },
        duration: 0.3,
        scale: 1,
        ease: "power2.inOut",
    }, ">2");
    titleGlobalTL.to("#glitchTitle", {
        scrambleText: {
            text: "Clash Gets",
            chars: "clash",
        },
        duration: 0.3,
        ease: "power2.inOut",
        scale: 1.1,
    }, ">5");
    titleGlobalTL.to("#glitchTitle", {
        scrambleText: {
            text: "We Get",
            chars: "clash",
        },
        duration: 0.3,
        ease: "power2.inOut",
        scale: 1.1,
    }, ">0.3");
    titleGlobalTL.to("#glitchTitle", {
        scrambleText: {
            text: "We Really Get",
            chars: "clash"
        },
        duration: 0.3,
        ease: "power2.inOut",
        scale: 2
    }, ">4");
    titleGlobalTL.to("#glitchTitle", {
        scrambleText: {
            text: "We Get",
            chars: "clash",
        },
        duration: 0.3,
        ease: "power2.inOut",
        scale: 1.1,
    }, ">0.3");
    titleGlobalTL.to("#glitchTitle", {
        scrambleText: {
            text: "Creation Gets",
            chars: "clash"
        },
        duration: 0.3,
        ease: "power2.inOut",
        scale: 2
    }, ">4");
    titleGlobalTL.to("#glitchTitle", {
        scrambleText: {
            text: "We Get",
            chars: "clash",
        },
        duration: 0.3,
        ease: "power2.inOut",
        scale: 1.1,
    }, ">0.3");
    titleGlobalTL.to("#glitchTitle", {
        scrambleText: {
            text: "Only We Get",
            chars: "clash",
            color: "#ff0000"
        },
        duration: 0.3,
        ease: "power2.inOut",
        scale: 2
    }, ">4");
    titleGlobalTL.to("#glitchTitle", {
        scrambleText: {
            text: "We Get",
            chars: "clash",
        },
        duration: 0.3,
        ease: "power2.inOut",
        scale: 1.1,
    }, ">0.3");
    titleGlobalTL.to("#glitchTitle", {
        scrambleText: {
            text: "We Get",
            chars: "clash"
        },
        duration: 0.3,
        scale: 1,
        ease: "power2.inOut",
    }, ">0.2");
}
