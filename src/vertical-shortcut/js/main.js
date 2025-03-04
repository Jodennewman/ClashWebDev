/**
 * The Vertical Shortcut - Main Application Script
 * 
 * This file handles the initialization of all site components
 * and coordinates the loading sequence.
 */

// Main initialization function with proper sequence
function initializeApplication() {
  console.log("🚀 Starting application initialization");
  
  // Step 1: Initialize icons (doesn't depend on DOM structure)
  initializeIcons();
  
  // Step 2: Initialize content sections
  initializeModules();
  initializePricing();
  
  // Step 3: Initialize interactive elements
  initFAQAccordion();
  initQuiz();
  initCustomCursor();
  
  // Step 4: Initialize headline rotation
  initHeadlineRotation();
  
  console.log("✅ Application initialization complete");
}

// Initialize Feather icons
function initializeIcons() {
  try {
    if (typeof feather !== 'undefined') {
      feather.replace();
      console.log("✅ Feather icons initialized");
      return true;
    } else {
      console.warn("⚠️ Feather icons not available");
      return false;
    }
  } catch (error) {
    console.error("❌ Error initializing icons:", error);
    return false;
  }
}

// Initialize the modules section
function initializeModules() {
  try {
    // Check if modules container exists
    const modulesContainer = document.querySelector('.modules-container');
    if (!modulesContainer) {
      console.warn("⚠️ Modules container not found in DOM");
      return false;
    }
    
    // If we have a modules list rendering function, call it
    if (typeof window.renderModules === 'function') {
      window.renderModules();
      console.log("✅ Modules section initialized");
      return true;
    } else {
      console.error("❌ renderModules function not found");
      return false;
    }
  } catch (error) {
    console.error("❌ Error initializing modules section:", error);
    return false;
  }
}

// Initialize the pricing section
function initializePricing() {
  try {
    // Check if pricing container exists
    const pricingContainer = document.querySelector('.pricing-cards-container');
    if (!pricingContainer) {
      console.warn("⚠️ Pricing container not found in DOM");
      return false;
    }
    
    // If we have a pricing table rendering function, call it
    if (typeof window.renderPricingTable === 'function') {
      window.renderPricingTable();
      console.log("✅ Pricing section initialized");
      return true;
    } else {
      console.error("❌ renderPricingTable function not found");
      return false;
    }
  } catch (error) {
    console.error("❌ Error initializing pricing section:", error);
    return false;
  }
}

// Initialize FAQ accordion functionality
function initFAQAccordion() {
  try {
    const faqItems = document.querySelectorAll('.faq-question');
    if (faqItems.length === 0) {
      console.warn("⚠️ No FAQ items found");
      return false;
    }
    
    faqItems.forEach(question => {
      question.addEventListener('click', () => {
        const item = question.parentElement;
        item.classList.toggle('active');
        
        // Update the icon
        const icon = question.querySelector('i');
        if (icon) {
          if (item.classList.contains('active')) {
            icon.setAttribute('data-feather', 'minus');
          } else {
            icon.setAttribute('data-feather', 'plus');
          }
          feather.replace();
        }
      });
    });
    
    console.log("✅ FAQ accordion initialized");
    return true;
  } catch (error) {
    console.error("❌ Error initializing FAQ accordion:", error);
    return false;
  }
}

// Initialize the quiz functionality
function initQuiz() {
  try {
    // Quiz elements
    const quizModal = document.getElementById('recommendation-quiz');
    const openQuizBtn = document.getElementById('open-quiz');
    const pricingQuizBtn = document.getElementById('pricing-quiz-btn');
    const closeQuizBtn = document.getElementById('close-quiz');
    const nextBtn = document.getElementById('quiz-next');
    const prevBtn = document.getElementById('quiz-prev');
    const quizSteps = document.querySelectorAll('.quiz-step');
    
    if (!quizModal || !openQuizBtn || !closeQuizBtn || !nextBtn || !prevBtn) {
      console.warn("⚠️ Quiz elements not found");
      return false;
    }
    
    let currentStep = 1;
    const totalSteps = quizSteps.length - 1; // Exclude result step
    const userAnswers = {
      journey: '',
      involvement: '',
      speed: ''
    };
    
    // Open quiz modal from hero section
    openQuizBtn.addEventListener('click', () => {
      quizModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
      // Reset quiz state
      goToStep(1);
      resetAnswers();
    });
    
    // Open quiz modal from pricing section
    if (pricingQuizBtn) {
      pricingQuizBtn.addEventListener('click', () => {
        quizModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        // Reset quiz state
        goToStep(1);
        resetAnswers();
      });
    }
    
    // Close quiz modal
    closeQuizBtn.addEventListener('click', () => {
      quizModal.classList.remove('active');
      document.body.style.overflow = ''; // Restore scrolling
    });
    
    // Next button click
    nextBtn.addEventListener('click', () => {
      if (currentStep < totalSteps) {
        // Save the current answer
        const currentRadio = document.querySelector(`.quiz-step[data-step="${currentStep}"] input:checked`);
        if (currentRadio) {
          const name = currentRadio.name;
          const value = currentRadio.value;
          userAnswers[name] = value;
          
          // Go to next step
          goToStep(currentStep + 1);
        } else {
          // Alert the user to select an option
          alert('Please select an option to continue');
        }
      } else if (currentStep === totalSteps) {
        // Save the final answer
        const currentRadio = document.querySelector(`.quiz-step[data-step="${currentStep}"] input:checked`);
        if (currentRadio) {
          const name = currentRadio.name;
          const value = currentRadio.value;
          userAnswers[name] = value;
          
          // Show the recommendation
          showRecommendation(userAnswers);
        } else {
          // Alert the user to select an option
          alert('Please select an option to continue');
        }
      } else if (currentStep === 'result') {
        // On result page, close quiz and scroll to pricing
        quizModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' });
      }
    });
    
    // Previous button click
    prevBtn.addEventListener('click', () => {
      if (currentStep > 1) {
        goToStep(currentStep - 1);
      }
    });
    
    // Allow clicking on option labels to select radio buttons
    document.querySelectorAll('.quiz-option').forEach(option => {
      option.addEventListener('click', () => {
        const radio = option.querySelector('input[type="radio"]');
        if (radio) {
          radio.checked = true;
        }
      });
    });
    
    // Handle navigation to specific step
    function goToStep(step) {
      // Hide all steps
      quizSteps.forEach(stepElement => {
        stepElement.classList.remove('active');
      });
      
      // Show the target step
      const targetStep = document.querySelector(`.quiz-step[data-step="${step}"]`);
      if (targetStep) {
        targetStep.classList.add('active');
        currentStep = step;
        
        // Update navigation buttons
        updateNavButtons();
      }
    }
    
    // Update the navigation buttons based on current step
    function updateNavButtons() {
      // Disable/enable previous button
      prevBtn.disabled = currentStep === 1;
      
      // Update next button text based on step
      if (currentStep === totalSteps) {
        nextBtn.textContent = 'See Recommendation';
      } else if (currentStep === 'result') {
        nextBtn.textContent = 'Take Me There';
      } else {
        nextBtn.textContent = 'Next';
      }
    }
    
    // Reset all answers
    function resetAnswers() {
      document.querySelectorAll('.quiz-option input').forEach(radio => {
        radio.checked = false;
      });
      
      Object.keys(userAnswers).forEach(key => {
        userAnswers[key] = '';
      });
    }
    
    // Show the recommendation based on user answers
    function showRecommendation(answers) {
      // Implement the recommendation logic
      let recommendation = 'blueprint'; // Default to Blueprint
      
      // Rule 1: If involvement is "none" OR speed is "fast" => Accelerator
      if (answers.involvement === 'none' || answers.speed === 'fast') {
        recommendation = 'accelerator';
      }
      // Rule 2: Else If journey is beginner/started AND involvement is hands-on AND speed is slow => Blueprint
      else if ((answers.journey === 'beginner' || answers.journey === 'started') && 
               answers.involvement === 'hands-on' && 
               answers.speed === 'slow') {
        recommendation = 'blueprint';
      }
      // Rule 3: All other combinations => Foundations
      else {
        recommendation = 'foundations';
      }
      
      // Update plan names to match the tiers
      const planData = {
        blueprint: {
          name: 'Blueprint',
          color: 'var(--orange)',
          badge: 'blueprint',
          description: 'Perfect for founders who prefer a hands-on approach and are not in a hurry.',
          features: [
            'All essential founder must-watch basics',
            'Vertical strategy fundamentals',
            'Framework for content creation',
            'DIY approach with guided learning'
          ]
        },
        foundations: {
          name: 'Foundations',
          color: 'var(--blue)',
          badge: 'builder',
          description: 'Our most popular plan! Ideal for founders who want a balanced approach to content creation.',
          features: [
            'Everything in Blueprint',
            'Advanced content strategy modules',
            'Team training and delegation systems',
            'Regular strategy updates'
          ]
        },
        accelerator: {
          name: 'Accelerator',
          color: 'var(--pink)',
          badge: 'growth',
          description: 'For founders who want the fastest results with minimal personal involvement.',
          features: [
            'Everything in Foundations',
            'VIP support and coaching',
            'Advanced viral frameworks',
            'Exclusive case studies and ROI multipliers'
          ]
        }
      };
      
      // Get the recommended plan data
      const planInfo = planData[recommendation];
      
      // Create the features list
      const featuresHTML = planInfo.features.map(feature => `
        <div class="recommendation-feature">
          <i data-feather="check" class="recommendation-check"></i>
          <span>${feature}</span>
        </div>
      `).join('');
      
      // Create the complete HTML
      const recommendationHTML = `
        <div class="plan-badge ${planInfo.badge}">Founder ${planInfo.name}</div>
        <h3 class="recommendation-title" style="color: ${planInfo.color}">The ${planInfo.name} Plan</h3>
        <p class="recommendation-description">${planInfo.description}</p>
        <div class="recommendation-features">
          ${featuresHTML}
        </div>
        <a href="#pricing" class="recommendation-cta" style="background-color: ${planInfo.color}">View ${planInfo.name} Details</a>
      `;
      
      // Insert the recommendation content
      document.getElementById('quiz-recommendation').innerHTML = recommendationHTML;
      
      // Ensure feather icons are refreshed in the result
      if (typeof feather !== 'undefined') {
        setTimeout(() => {
          feather.replace();
        }, 100);
      }
      
      // Show the result step
      goToStep('result');
      
      // Update next button to link to the pricing section
      nextBtn.textContent = 'View Pricing Options';
    }
    
    console.log("✅ Quiz functionality initialized");
    return true;
  } catch (error) {
    console.error("❌ Error initializing quiz:", error);
    return false;
  }
}

// Initialize custom cursor
function initCustomCursor() {
  try {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) {
      console.warn("⚠️ Custom cursor element not found");
      return false;
    }
    
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
    
    document.querySelectorAll('a, button, .faq-question').forEach(element => {
      element.addEventListener('mouseenter', () => {
        cursor.style.width = '40px';
        cursor.style.height = '40px';
      });
      
      element.addEventListener('mouseleave', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
      });
    });
    
    console.log("✅ Custom cursor initialized");
    return true;
  } catch (error) {
    console.error("❌ Error initializing custom cursor:", error);
    return false;
  }
}

// Initialize headline rotation
function initHeadlineRotation() {
  try {
    const headlines = document.querySelectorAll('.hero-headline');
    if (headlines.length <= 1) {
      console.warn("⚠️ Not enough headlines for rotation");
      return false;
    }
    
    let currentHeadline = 0;
    
    // Set initial headline
    headlines[currentHeadline].classList.add('active');
    
    // Rotate headlines every 5 seconds
    setInterval(() => {
      headlines[currentHeadline].classList.remove('active');
      currentHeadline = (currentHeadline + 1) % headlines.length;
      headlines[currentHeadline].classList.add('active');
    }, 5000);
    
    console.log("✅ Headline rotation initialized");
    return true;
  } catch (error) {
    console.error("❌ Error initializing headline rotation:", error);
    return false;
  }
}

// Start initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeApplication); 