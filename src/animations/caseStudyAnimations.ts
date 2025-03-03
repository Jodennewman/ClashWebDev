import { gsap } from 'gsap';

export function initializeCaseStudyAnimations() {
    // Case study button animations
    const caseStudyButtons = document.querySelectorAll('.casestudybutton');
    const caseStudyBox = document.getElementById('case-study-box');
    const backdrop = document.querySelector('.backdrop');

    caseStudyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const icon = this.querySelector('.case-button-icon');
            const textEl = this.querySelector('.case-button-label');

            // Rotate icon and show text
            gsap.to(icon, { 
                rotation: 180, 
                duration: 1.5, 
                ease: "power2.Out"
            });

            gsap.to(textEl, { 
                autoAlpha: 1, 
                duration: 0.4 
            });

            // Reset other buttons
            caseStudyButtons.forEach(otherButton => {
                if (otherButton !== this) {
                    const otherIcon = otherButton.querySelector('.case-button-icon');
                    const otherText = otherButton.querySelector('.case-button-label');

                    gsap.to(otherIcon, { 
                        rotation: 0, 
                        duration: 2, 
                        ease: "power3.in" 
                    });

                    gsap.to(otherText, { 
                        autoAlpha: 0, 
                        duration: 0.3,
                        onComplete: () => {
                            otherText.style.display = 'none';
                        }
                    });
                }
            });

            // Animate the clicked button
            gsap.to(icon, {
                scale: 1.2,
                duration: 0.3,
                ease: "back.out(1.7)",
                yoyo: true,
                repeat: 1
            });
        });
    });

    // Case study box animations
    function showCaseStudy(box: HTMLElement) {
        gsap.to(box, { 
            autoAlpha: 1, 
            scale: 1, 
            duration: 1.2, 
            ease: "elastic.out(1.75,1)" 
        });
    }

    function hideCaseStudy() {
        if (!caseStudyBox) return;

        gsap.to(caseStudyBox, { 
            autoAlpha: 0, 
            scale: 0.8, 
            duration: 0.3,
            onComplete: () => {
                if (caseStudyBox) {
                    caseStudyBox.style.display = 'none';
                }
            }
        });

        // Reset all buttons
        gsap.to(".caseStudyButton", { 
            x: 0, 
            y: 0, 
            scale: 1, 
            duration: 0.5 
        });
    }

    // Menu animations
    const menuItems = document.querySelectorAll('.menu-item');
    gsap.fromTo(menuItems,
        {
            opacity: 0,
            y: 20
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out"
        }
    );

    // Return functions for external use
    return {
        showCaseStudy,
        hideCaseStudy
    };
} 