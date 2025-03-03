import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initCaseStudies(): void {
    console.log('Initializing case studies section...');

    // Use the correct selector that matches the HTML
    const caseButtons = document.querySelectorAll('.casestudybutton');
    console.log('Found case study buttons:', caseButtons.length);

    if (!caseButtons.length) {
        console.warn('No case study buttons found. Available classes:', 
            Array.from(document.querySelectorAll('[class*="case"]'))
                .map(el => el.className)
                .join(', ')
        );
        return;
    }

    // Kill any existing triggers
    ScrollTrigger.getAll().forEach(st => {
        if (st.vars.id?.toString().includes('caseStudy')) {
            st.kill();
        }
    });

    // Reset any existing animations
    gsap.killTweensOf(caseButtons);

    // Create a timeline for the animation
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".case-studies-section",
            scroller: "#smooth-content",
            start: "top center",
            end: "bottom center",
            toggleActions: "play none none reverse",
            pin: false,
            anticipatePin: 1,
            markers: {
                startColor: "yellow",
                endColor: "gold",
                fontSize: "16px",
                fontWeight: "bold",
                indent: 50
            },
            id: "caseStudyButtonsTrigger",
            onEnter: () => {
                console.log("Case study section entered view");
                console.log("ScrollTrigger state:", ScrollTrigger.getById("caseStudyButtonsTrigger"));
            },
            onLeave: () => console.log("Case study section left view"),
            onEnterBack: () => console.log("Case study section entered view (backwards)"),
            onLeaveBack: () => console.log("Case study section left view (backwards)"),
            onUpdate: (self) => {
                console.log("ScrollTrigger progress:", {
                    progress: self.progress.toFixed(2),
                    direction: self.direction,
                    isActive: self.isActive
                });
            }
        }
    });

    // Add the animation to the timeline
    tl.from(caseButtons, {
        scale: 0.5,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "back.out(1.7)"
    });

    // Ensure buttons are visible
    gsap.set(caseButtons, {
        opacity: 1,
        visibility: 'visible'
    });

    console.log('Case studies section initialized');
} 