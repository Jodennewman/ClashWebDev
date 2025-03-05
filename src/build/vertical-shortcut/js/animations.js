// animations.js - All animation functionality
(function() {
  // Animation initialization function
  function initAnimations() {
    // Only initialize if we have GSAP available
    if (typeof gsap === 'undefined') {
      console.error('GSAP not loaded! Cannot initialize animations.');
      return;
    }
    
    // Initialize page transitions
    initPageTransitions();
    
    // Initialize parallax effects
    initParallaxGraphics();
    
    // Initialize text reveal animations
    initTextRevealAnimations();
    
    // Initialize all animation sections
    initHeaderAnimations();
    initHeroSection();
    initFeatureAnimations();
    initTestimonialAnimations();
    initPricingAnimations();
    initFooterAnimations();
    initRecommendationQuiz();
    
    // Refresh ScrollTrigger to ensure all animations work properly
    ScrollTrigger.refresh();
    
    // This ensures proper initialization on browsers and devices
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
  }
  
  // Text reveal animations for headings
  function initTextRevealAnimations() {
    // Find all headings to animate
    const headings = document.querySelectorAll('h1, h2, h3, .animate-text');
    
    headings.forEach(heading => {
      // Skip if already processed
      if (heading.classList.contains('text-split')) return;
      
      // Mark as processed
      heading.classList.add('text-split');
      
      // Create the split text instance
      const splitText = new SplitText(heading, {
        type: "chars,words,lines",
        linesClass: "split-line",
        wordsClass: "split-word",
        charsClass: "split-char"
      });
      
      // Create the animation
      gsap.from(splitText.chars, {
        scrollTrigger: {
          trigger: heading,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        opacity: 0,
        y: 20,
        rotationX: -90,
        stagger: 0.02,
        duration: 0.8,
        ease: "back.out(1.7)"
      });
    });
    
    // Animate paragraphs with a simpler effect
    const paragraphs = document.querySelectorAll('p.animate-text, .feature-description, .testimonial-text');
    
    paragraphs.forEach(paragraph => {
      // Skip if already processed
      if (paragraph.classList.contains('text-split')) return;
      
      // Mark as processed
      paragraph.classList.add('text-split');
      
      // Create the split text instance
      const splitText = new SplitText(paragraph, {
        type: "lines",
        linesClass: "split-line"
      });
      
      // Create the animation
      gsap.from(splitText.lines, {
        scrollTrigger: {
          trigger: paragraph,
          start: "top 85%",
          toggleActions: "play none none none"
        },
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out"
      });
    });
  }
  
  // Parallax scrolling effects
  function initParallaxEffects() {
    // Find all elements with parallax data attributes
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) {
      // Add parallax to some elements if none exist
      addParallaxToElements();
    }
    
    // Create parallax effect for each element
    parallaxElements.forEach(element => {
      const speed = parseFloat(element.getAttribute('data-parallax')) || 0.2;
      const direction = element.getAttribute('data-parallax-direction') || 'x';
      const offset = parseInt(element.getAttribute('data-parallax-offset')) || 0;
      
      // Create the parallax effect
      gsap.to(element, {
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        },
        [direction]: `${offset + (direction === 'y' ? 100 : 50) * speed}px`,
        ease: "none",
        onComplete: () => {
          ScrollTrigger.refresh();
        }
      });
    });
    
    // Add parallax to background sections
    const bgSections = document.querySelectorAll('.bg-parallax');
    bgSections.forEach(section => {
      gsap.to(section, {
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        },
        backgroundPosition: `50% ${70}%`,
        ease: "none"
      });
    });
  }
  
  // Add parallax attributes to elements if none exist
  function addParallaxToElements() {
    // Add to images in specific sections
    const images = document.querySelectorAll('.hero-section img, .features-section img, .testimonials-section img');
    images.forEach((img, index) => {
      // Alternate directions and speeds
      const speed = 0.1 + (index % 3) * 0.05;
      const direction = index % 2 === 0 ? 'y' : 'x';
      
      img.setAttribute('data-parallax', speed.toString());
      img.setAttribute('data-parallax-direction', direction);
    });
    
    // Add to section backgrounds
    const sections = document.querySelectorAll('.hero-section, .features-section, .testimonials-section');
    sections.forEach(section => {
      section.classList.add('bg-parallax');
    });
  }
  
  // Page transition animations
  function initPageTransitions() {
    // Create a page transition overlay if it doesn't exist
    let transitionOverlay = document.querySelector('.page-transition-overlay');
    if (!transitionOverlay) {
      transitionOverlay = document.createElement('div');
      transitionOverlay.className = 'page-transition-overlay';
      document.body.appendChild(transitionOverlay);
      
      // Add styles inline if not already in CSS
      transitionOverlay.style.position = 'fixed';
      transitionOverlay.style.top = '0';
      transitionOverlay.style.left = '0';
      transitionOverlay.style.width = '100%';
      transitionOverlay.style.height = '100%';
      transitionOverlay.style.backgroundColor = '#0f172a';
      transitionOverlay.style.zIndex = '9998';
      transitionOverlay.style.transform = 'scaleY(0)';
      transitionOverlay.style.transformOrigin = 'top';
      transitionOverlay.style.pointerEvents = 'none';
    }
    
    // Initial page load animation
    const tl = gsap.timeline();
    
    tl.set(transitionOverlay, { 
      scaleY: 1,
      transformOrigin: 'bottom'
    })
    .to(transitionOverlay, {
      scaleY: 0,
      transformOrigin: 'bottom',
      duration: 1.2,
      ease: 'power4.inOut',
      onComplete: () => {
        // Reveal content with a stagger effect
        gsap.from('.stagger-fade-in', {
          opacity: 0,
          y: 30,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out'
        });
      }
    });
    
    // Handle link clicks for page transitions
    document.querySelectorAll('a[href^="http"], a[href^="/"]').forEach(link => {
      link.addEventListener('click', e => {
        // Only handle external links or internal page navigations (not hash links)
        const href = link.getAttribute('href');
        if (href.startsWith('#') || link.target === '_blank') return;
        
        e.preventDefault();
        
        // Create exit animation
        const exitTl = gsap.timeline({
          onComplete: () => {
            window.location.href = href;
          }
        });
        
        exitTl.set(transitionOverlay, {
          transformOrigin: 'top',
          scaleY: 0
        })
        .to(transitionOverlay, {
          scaleY: 1,
          duration: 0.8,
          ease: 'power4.inOut'
        });
      });
    });
  }
  
  // Header animations
  function initHeaderAnimations() {
    const header = document.querySelector('header');
    if (!header) return;
    
    gsap.to(header, {
      scrollTrigger: {
        trigger: 'body',
        start: "top top",
        end: "50px top",
        toggleClass: {targets: header, className: "scrolled"},
        onEnter: () => header.classList.add('scrolled'),
        onLeaveBack: () => header.classList.remove('scrolled'),
        onComplete: () => {
          ScrollTrigger.refresh();
        }
      }
    });
  }
  
  // Hero section animations
  function initHeroSection() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    const splitHeadline = new SplitText('.hero-section h1', {type: "words,chars"});
    const chars = splitHeadline.chars;
    
    gsap.from(chars, {
      opacity: 0,
      y: 20,
      ease: "back.out(1.7)",
      stagger: 0.02,
      duration: 0.7,
      delay: 0.2
    });
    
    gsap.from('.hero-section .hero-description', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.6
    });
    
    gsap.from('.hero-section .cta-button', {
      opacity: 0,
      y: 20,
      ease: "back.out",
      duration: 0.6,
      delay: 0.8
    });
  }
  
  // Feature animations
  function initFeatureAnimations() {
    const features = document.querySelectorAll('.feature-card');
    if (features.length === 0) return;
    
    features.forEach((feature, index) => {
      gsap.from(feature, {
        scrollTrigger: {
          trigger: feature,
          start: "top 80%",
          end: "bottom top%",
          onComplete: () => {
            ScrollTrigger.refresh();
          }
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.1
      });
    });
  }
  
  // Testimonial animations
  function initTestimonialAnimations() {
    const testimonials = document.querySelector('.testimonials-section');
    if (!testimonials) return;
    
    gsap.from('.testimonial-card', {
      scrollTrigger: {
        trigger: testimonials,
        start: "top 70%",
        end: "bottom top"
      },
      y: 60,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: "power2.out",
      onComplete: () => {
        ScrollTrigger.refresh();
      }
    });
  }
  
  // Pricing animations
  function initPricingAnimations() {
    const pricingSection = document.querySelector('.pricing-section');
    if (!pricingSection) return;
    
    const cards = pricingSection.querySelectorAll('.pricing-card');
    
    gsap.from(cards, {
      scrollTrigger: {
        trigger: pricingSection,
        start: "top 70%",
        end: "bottom top",
        onComplete: () => {
          ScrollTrigger.refresh();
        }
      },
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "back.out(1.2)"
    });
  }
  
  // Footer animations
  function initFooterAnimations() {
    const footer = document.querySelector('footer');
    if (!footer) return;
    
    gsap.from(footer.querySelectorAll('h4, ul'), {
      scrollTrigger: {
        trigger: footer,
        start: "top 90%",
        end: "+=200px",
        onComplete: () => {
          ScrollTrigger.refresh();
        }
      },
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.7
    });
  }
  
  // Plan Recommendation Quiz
  function initRecommendationQuiz() {
    // Quiz elements
    const quizModal = document.getElementById('quizModal');
    const openQuizBtn = document.getElementById('openQuizBtn');
    const pricingQuizBtn = document.getElementById('pricingQuizBtn');
    const closeQuizBtn = document.getElementById('closeQuizBtn');
    const quizSteps = document.querySelectorAll('.quiz-step');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const quizButtonsContainer = document.getElementById('quizButtons');
    
    // Guard clause if quiz elements don't exist
    if (!quizModal || !openQuizBtn) return;
    
    // Current step and user answers
    let currentStep = 0;
    const totalSteps = quizSteps.length - 1; // Exclude result step
    let userAnswers = {};
    
    // Event listeners for opening and closing the quiz
    if (openQuizBtn) {
      openQuizBtn.addEventListener('click', openQuiz);
    }
    
    if (pricingQuizBtn) {
      pricingQuizBtn.addEventListener('click', openQuiz);
    }
    
    if (closeQuizBtn) {
      closeQuizBtn.addEventListener('click', closeQuiz);
    }
    
    // Open quiz modal
    function openQuiz() {
      quizModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
      resetQuiz();
    }
    
    // Close quiz modal
    function closeQuiz() {
      quizModal.classList.remove('active');
      document.body.style.overflow = '';
      gsap.to(window, {
        scrollTo: { y: "#pricing-section", offsetY: 100 },
        duration: 1,
        ease: "power3.inOut"
      });
    }
    
    // Event listener for next button
    if (nextButton) {
      nextButton.addEventListener('click', () => {
        const questionId = quizSteps[currentStep].getAttribute('data-question');
        const selectedOption = document.querySelector(`input[name="${questionId}"]:checked`);
        
        // If no option selected, show error message
        if (!selectedOption && currentStep < totalSteps) {
          alert('Please select an option to continue');
          return;
        }
        
        // Store answer
        if (selectedOption) {
          userAnswers[questionId] = selectedOption.value;
        }
        
        // If last question, show recommendation
        if (currentStep === totalSteps) {
          showRecommendation();
          return;
        }
        
        // Move to next step
        goToStep(currentStep + 1);
      });
    }
    
    // Event listener for previous button
    if (prevButton) {
      prevButton.addEventListener('click', () => {
        if (currentStep > 0) {
          goToStep(currentStep - 1);
        }
      });
    }
    
    // Allow clicking on option labels to select radio
    const quizOptions = document.querySelectorAll('.quiz-option');
    quizOptions.forEach(option => {
      option.addEventListener('click', function(e) {
        const radio = this.querySelector('input[type="radio"]');
        if (radio && e.target !== radio) {
          radio.checked = true;
          radio.dispatchEvent(new Event('change')); // Trigger change event
        }
      });
    });
    
    // Go to specific step
    function goToStep(step) {
      // Remove active class from all steps
      quizSteps.forEach(step => {
        step.classList.remove('active');
      });
      
      // Add active class to target step
      quizSteps[step].classList.add('active');
      currentStep = step;
      
      // Update navigation buttons
      updateNavButtons();
    }
    
    // Update navigation buttons based on current step
    function updateNavButtons() {
      prevButton.style.visibility = currentStep === 0 ? 'hidden' : 'visible';
      
      if (currentStep === totalSteps) {
        nextButton.textContent = 'Show Recommendation';
      } else if (currentStep === totalSteps + 1) { // Result step
        nextButton.textContent = 'View Pricing Options';
      } else {
        nextButton.textContent = 'Next';
      }
    }
    
    // Reset quiz to initial state
    function resetQuiz() {
      resetAnswers();
      goToStep(0);
    }
    
    // Reset all answers
    function resetAnswers() {
      userAnswers = {};
      const allRadios = document.querySelectorAll('.quiz-option input[type="radio"]');
      allRadios.forEach(radio => {
        radio.checked = false;
      });
    }
    
    // Show recommendation based on answers
    function showRecommendation() {
      // Recommendation logic based on answers
      let recommendation = 'blueprint'; // Default
      
      // Example logic for determining recommendation
      const teamSize = userAnswers.team_size || '';
      const dataVolume = userAnswers.data_volume || '';
      const features = userAnswers.features || '';
      
      // Logic for Enterprise plan
      if (
        (teamSize === 'large' && dataVolume === 'high') ||
        (teamSize === 'enterprise' && dataVolume === 'medium') ||
        (features === 'advanced')
      ) {
        recommendation = 'growth';
      }
      // Logic for Pro plan
      else if (
        (teamSize === 'medium' && (dataVolume === 'medium' || dataVolume === 'high')) ||
        (teamSize === 'large' && dataVolume === 'low') ||
        (features === 'customization')
      ) {
        recommendation = 'builder';
      }
      
      // Plan data with details for each recommendation
      const planData = {
        blueprint: {
          name: 'Blueprint',
          color: '#3975EA',
          badge: 'STARTER',
          description: 'Perfect for individuals or small teams just getting started.',
          features: [
            '3 projects',
            'Basic analytics',
            'Community support',
            'Limited integrations'
          ]
        },
        builder: {
          name: 'Builder',
          color: '#FF7233',
          badge: 'PRO',
          description: 'The sweet spot for small to medium-sized teams with growing needs.',
          features: [
            'Unlimited projects',
            'Advanced analytics',
            'Priority support',
            'API access',
            'Enhanced security'
          ]
        },
        growth: {
          name: 'Growth',
          color: '#893CFF',
          badge: 'ENTERPRISE',
          description: 'For organizations with complex needs and enterprise-grade requirements.',
          features: [
            'Unlimited projects',
            'Dedicated account manager',
            'Custom integrations',
            'Advanced security',
            'SLA guarantees',
            'On-premise deployment'
          ]
        }
      };
      
      // Get plan details
      const plan = planData[recommendation];
      
      // Create recommendation HTML
      const recommendationHTML = createRecommendationHTML(plan);
      
      // Insert into result container
      const resultContainer = document.querySelector('.quiz-result-content');
      if (resultContainer) {
        resultContainer.innerHTML = recommendationHTML;
        
        // Refresh feather icons in the result section
        setTimeout(() => {
          if (typeof feather !== 'undefined') {
            feather.replace({
              scope: '.quiz-result-content'
            });
          }
        }, 100);
      }
      
      // Go to result step
      goToStep(totalSteps + 1);
      nextButton.textContent = 'View Pricing Options';
      
      // Animate recommendation card
      const recommendationCard = document.querySelector('.recommendation-card');
      if (recommendationCard) {
        gsap.from(recommendationCard, {
          y: 30,
          opacity: 0,
          duration: 0.5,
          ease: "back.out(1.7)"
        });
      }
      
      // After showing recommendation, scroll to the pricing section when clicking "View Pricing Options"
      if (currentStep === totalSteps + 1) {
        nextButton.addEventListener('click', closeQuiz);
      }
    }
    
    // Create HTML for recommendation
    function createRecommendationHTML(plan) {
      // Create features HTML
      const featuresHTML = plan.features.map(feature => 
        `<div class="recommendation-feature">
          <i data-feather="check" class="feature-icon"></i>
          <span>${feature}</span>
        </div>`
      ).join('');
      
      // Create recommendation card HTML
      return `
        <div class="recommendation-card" style="border-color: ${plan.color}">
          <div class="recommendation-badge" style="background-color: ${plan.color}">${plan.badge}</div>
          <h3 class="recommendation-title">${plan.name}</h3>
          <p class="recommendation-description">${plan.description}</p>
          <div class="recommendation-features">
            ${featuresHTML}
          </div>
          <a href="#pricing-${plan.name.toLowerCase()}" class="recommendation-cta" style="background-color: ${plan.color}">
            View Pricing Options
          </a>
        </div>
      `;
    }
    
    // Find and check a radio button within a quiz option
    function checkOption(option) {
      const radio = option.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
        radio.dispatchEvent(new Event('change')); // Notify listeners of the change
      }
    }
  }

  function initParallaxGraphics() {
    // Parallax Scrolling Effect with GSAP ScrollTrigger
  document.addEventListener('DOMContentLoaded', function() {
    // Check if GSAP and ScrollTrigger are loaded
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.error('GSAP or ScrollTrigger not loaded. Please include the necessary scripts.');
      return;
    }
  
    
  
    // Select all elements with data-parallax attribute
    const parallaxElements = document.querySelectorAll('[data-parallax="true"]');
  
    // Initialize parallax effect for each element
    parallaxElements.forEach(element => {
      // Get speed and direction from data attributes
      const speed = parseFloat(element.getAttribute('data-speed')) || 0.5;
      const direction = element.getAttribute('data-direction') || 'vertical';
      
      // Calculate movement based on speed
      let yMovement = 0;
      let xMovement = 0;
      
      if (direction === 'vertical') {
        yMovement = window.innerHeight * speed * -1; // Negative for scroll-down movement
      } else if (direction === 'horizontal') {
        xMovement = window.innerWidth * speed * 0.1 * (Math.random() > 0.5 ? 1 : -1); // Random left or right
      }
      
      // Create animation
      gsap.to(element, {
        y: yMovement,
        x: xMovement,
        ease: "none",
        scrollTrigger: {
          trigger: ".title-container", // The container element
          start: "top top",
          end: "bottom top",
          markers: true,
          scrub: true, // Smooth scrubbing effect
          invalidateOnRefresh: true // Recalculate on window resize
        },
        onComplete: () => {
          ScrollTrigger.refresh();
        }
      });
      
      // Special handling for the biggercontext image
      if (element.id === 'biggercontext') {
        // Make it visible when scrolling starts
        gsap.set(element, { autoAlpha: 0, display: 'block' });
        
        gsap.to(element, {
          autoAlpha: 1,
          scrollTrigger: {
            trigger: ".title-container",
            start: "top+=100 top",
            end: "top middle",
            pin: false,
            scrub: true,
            onComplete: () => {
              ScrollTrigger.refresh();
            }
          }
        });
      }
    });
    
    // Refresh ScrollTrigger on window resize
    window.addEventListener('resize', function() {
      ScrollTrigger.refresh();
    });
  }); 
  }
  
  // Event Listener - Initialize animations when DOM is loaded
  document.addEventListener('DOMContentLoaded', initAnimations);
  
  // Expose the initialization function to the global scope
  window.initAnimations = initAnimations;
})(); 