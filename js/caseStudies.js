/*import { gsap } from './main';

export function initUIInteractions() {
  document.addEventListener('DOMContentLoaded', function() {
    // Menu animation
    const burgerButton = document.querySelector('.burger-button');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuItems = document.querySelectorAll('.menu-item');

    if (burgerButton && menuOverlay && menuItems.length > 0) {
      burgerButton.addEventListener('click', () => {
        console.log('Burger button clicked'); // Debug
        burgerButton.classList.toggle('open');
        menuOverlay.classList.toggle('open');
        
        // Animate menu items when opening
        if (menuOverlay.classList.contains('open')) {
          gsap.fromTo(menuItems, 
            {
              y: 50,
              opacity: 0
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: "power3.out",
              delay: 0.3
            }
          );
        }
      });
      
      // Close menu when clicking menu items
      menuItems.forEach(item => {
        item.addEventListener('click', () => {
          burgerButton.classList.remove('open');
          menuOverlay.classList.remove('open');
        });
      });
    } else {
      console.error('Burger menu elements not found');
    }
  });
}

export function initCaseStudies() {
  document.addEventListener('DOMContentLoaded', function() {
    const caseButtons = document.querySelectorAll('.casestudybutton') as NodeListOf<HTMLElement>;
    const caseStudyBox = document.getElementById('case-study-box');
    const closeBoxBtn = document.getElementById('closeBoxBtn');

    // IMPORTANT: ScrollTrigger should be registered in main.ts only
    // gsap.registerPlugin(ScrollTrigger);
    
    // Case study content data
    const caseStudyData = {
      1: {
        title: "Growth Strategy",
        content: `
          <h4>Client: Fashion Retailer</h4>
          <p>We helped a struggling fashion retailer increase their social media engagement by 300% and boost online sales by 150% within just 3 months.</p>
          <h4>The Challenge</h4>
          <p>The client was struggling with low brand awareness and declining sales in a competitive market.</p>
          <h4>Our Approach</h4>
          <p>We implemented a comprehensive content strategy focusing on short-form video content across TikTok, Instagram Reels, and YouTube Shorts.</p>
          <h4>Results</h4>
          <ul>
            <li>300% increase in social media engagement</li>
            <li>150% increase in online sales</li>
            <li>45% increase in website traffic</li>
            <li>200% growth in follower count across platforms</li>
          </ul>
        `
      },
      2: {
        title: "Strategic Planning",
        content: `
          <h4>Client: Tech Startup</h4>
          <p>We developed a strategic content plan that helped a tech startup secure $2M in funding and establish themselves as thought leaders in their industry.</p>
          <h4>The Challenge</h4>
          <p>The client needed to build credibility quickly to attract investors and early adopters.</p>
          <h4>Our Approach</h4>
          <p>We created a multi-platform content strategy focusing on educational content, behind-the-scenes footage, and product demonstrations.</p>
          <h4>Results</h4>
          <ul>
            <li>Secured $2M in Series A funding</li>
            <li>Featured in 5 major tech publications</li>
            <li>Grew email list from 500 to 15,000 subscribers</li>
            <li>Established founder as industry thought leader</li>
          </ul>
        `
      },
      3: {
        title: "Results Driven",
        content: `
          <h4>Client: Fitness Brand</h4>
          <p>We helped a fitness brand increase their conversion rate by 75% and reduce customer acquisition costs by 40% through targeted short-form content.</p>
          <h4>The Challenge</h4>
          <p>The client was spending too much on advertising with diminishing returns and needed a more efficient marketing approach.</p>
          <h4>Our Approach</h4>
          <p>We developed a content strategy focused on authentic user testimonials, workout snippets, and nutrition tips delivered in engaging short-form videos.</p>
          <h4>Results</h4>
          <ul>
            <li>75% increase in conversion rate</li>
            <li>40% reduction in customer acquisition costs</li>
            <li>60% increase in repeat purchases</li>
            <li>Created 5 viral videos with over 1M views each</li>
          </ul>
        `
      }
    };
    
    // Initialize GSAP
    // IMPORTANT: ScrollTrigger should be registered in main.ts only
    // gsap.registerPlugin(ScrollTrigger);
    
    // Button hover animations
    caseButtons.forEach(button => {
      const buttonSVG = button.querySelector('svg');
      const label = button.querySelector('.case-button-label');
      
      // Create hover animation
      const hoverTl = gsap.timeline({ paused: true });
      hoverTl.to(buttonSVG, { 
        rotation: 15, 
        duration: 0.5, 
        ease: "power2.out" 
      });
      hoverTl.to(label, { 
        opacity: 1, 
        scale: 1.1, 
        duration: 0.3 
      }, 0);
      
      // Add event listeners
      button.addEventListener('mouseenter', () => hoverTl.play());
      button.addEventListener('mouseleave', () => hoverTl.reverse());
      
      // Click animation and functionality
      button.addEventListener('click', function() {
        const caseNumber = this.getAttribute('data-case');
        showCaseStudyBox(caseNumber);
        
        // Click animation
        gsap.to(buttonSVG, {
          scale: 0.9,
          duration: 0.1,
          ease: "power4.out",
          yoyo: true,
          repeat: 1
        });
      });
    });
    
    // Function to show case study box
    function showCaseStudyBox(caseNumber: string | number) {
      if (!caseStudyBox) return;
      
      // Update content
      const caseKey = Number(caseNumber) as 1 | 2 | 3;
      const caseData = caseStudyData[caseKey];
      const titleElement = caseStudyBox.querySelector('.case-study-title');
      const contentElement = caseStudyBox.querySelector('.case-study-content');
      
      if (titleElement) titleElement.textContent = caseData.title;
      if (contentElement) contentElement.innerHTML = caseData.content;
      
      // Show and animate the box
      caseStudyBox.style.display = 'block';
      
      // Animation
      gsap.fromTo(caseStudyBox, 
        { 
          opacity: 0, 
          scale: 0.8,
          y: 20
        }, 
        { 
          opacity: 1, 
          scale: 1,
          y: 0,
          duration: 0.5, 
          ease: "power4.out" 
        }
      );
      
      // Add backdrop
      const backdrop = document.createElement('div');
      backdrop.classList.add('case-study-backdrop');
      backdrop.style.position = 'fixed';
      backdrop.style.top = '0';
      backdrop.style.left = '0';
      backdrop.style.width = '100%';
      backdrop.style.height = '100%';
      backdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
      backdrop.style.zIndex = '999';
      backdrop.style.opacity = '0';
      document.body.appendChild(backdrop);
      
      gsap.to(backdrop, { opacity: 1, duration: 0.3 });
      
      // Close on backdrop click
      backdrop.addEventListener('click', closeCaseStudyBox);
    }
    
    // Function to close case study box
    function closeCaseStudyBox() {
      const backdrop = document.querySelector('.case-study-backdrop');
      
      gsap.to(caseStudyBox, { 
        opacity: 0, 
        scale: 0.8,
        y: 20,
        duration: 0.3, 
        onComplete: () => {
          if (caseStudyBox) {
            caseStudyBox.style.display = 'none';
          }
        }
      });
      
      if (backdrop) {
        gsap.to(backdrop, { 
          opacity: 0, 
          duration: 0.3, 
          onComplete: () => {
            backdrop.remove();
          }
        });
      }
    }
    
    // Close button event listener
    if (closeBoxBtn) {
      closeBoxBtn.addEventListener('click', closeCaseStudyBox);
    }
    
    // Make buttons visible immediately
    gsap.set(caseButtons, {
      opacity: 1,
      scale: 1,
      visibility: 'visible'
    });
    
    // Initial animations for buttons when section comes into view
    gsap.from(caseButtons, {
      scale: 0.5,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".case-studies-section",
        start: "top center",
        end: "bottom center",
        toggleActions: "play none none reverse",
        scroller: "#smooth-content",
        markers: {
          startColor: "yellow",
          endColor: "gold",
          fontSize: "16px",
          fontWeight: "bold",
          indent: 50
        },
        id: "caseStudyButtonsTrigger",
        onEnter: () => console.log("Case study section entered view"),
        onLeave: () => console.log("Case study section left view"),
        onEnterBack: () => console.log("Case study section entered view (backwards)"),
        onLeaveBack: () => console.log("Case study section left view (backwards)")
      }
    });
    
    // Use a safer update approach with a small delay to ensure DOM is ready
    setTimeout(() => {
      // Update just this specific ScrollTrigger instance rather than refreshing all
      ScrollTrigger.getById("caseStudyButtonsTrigger")?.update();
      console.log("Case study buttons ScrollTrigger updated");
    }, 500);
    
    // Force the buttons to be visible regardless of animation state
    console.log("Case study buttons:", caseButtons);
    caseButtons.forEach(button => {
      const htmlButton = button as HTMLElement;
      htmlButton.style.opacity = "1";
      htmlButton.style.visibility = "visible";
      console.log("Set button visible:", htmlButton.id);
    });
  });
}*/
