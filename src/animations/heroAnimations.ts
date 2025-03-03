import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

export function initializeHeroAnimations() {
    // Initial hero title animations
    gsap.to("#heroTitleMain", {
        x: '-20vw',
        duration: 0.2,
        ease: "power4.Out",
    });

    gsap.to("#heroTitleMain2", {
        x: '-20vw',
        duration: 0.2,
        ease: "power4.Out",
    });

    // Timeline setup
    const titleGlobalTL = gsap.timeline({ paused: false });
    const tl = gsap.timeline({ paused: true });
    const attentionTL = gsap.timeline({ paused: true });

    // Split text animations
    const split1 = new SplitText("#heroTitleLine1", { type: "chars" });
    const line1TL = gsap.timeline();

    split1.chars.forEach((obj, i) => {
        let slideTween = gsap.from(obj, {
            ease: "power4.out",
            y: 50,
            opacity: 0,
            delay: i * 0.02
        });

        let colorTween = gsap.from(obj, {
            color: i % 2 === 0 ? "#ffb127" : "#ffc69e",
            delay: i * 0.01,
            ease: "none",
        });

        tl.add(slideTween, 0);
    });

    // Second split text animation
    const split2 = new SplitText("#heroTitleMain", { type: "words" });
    const rewind2 = Array.from(split2.words).reverse();
    
    rewind2.forEach((obj, i) => {
        let heroOpacityTween = gsap.from(obj, {
            x: 30 + (i * -40),
            y: -10,
            opacity: 0,
            duration: 1,
            delay: i * 0.1,
        });
        attentionTL.add(heroOpacityTween, 0);
    });

    titleGlobalTL.to(tl, { duration: 1.5, progress: 1, ease: "power2.Out" }, 0);
}