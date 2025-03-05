/**
 * Custom Cursor Animation
 * Enhances user experience with a custom animated cursor
 */

(function() {
  // Initialize the custom cursor
  function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) {
      console.warn('⚠️ Custom cursor element not found');
      return;
    }
    
    // Show the cursor
    cursor.style.display = 'block';
    document.body.classList.add('custom-cursor-active');
    
    // Variables for cursor animation
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    // Update cursor position with smooth animation
    function updateCursorPosition() {
      // Calculate the distance to move (easing effect)
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;
      
      // Update cursor position with easing
      cursorX += dx * 0.2;
      cursorY += dy * 0.2;
      
      // Apply the position
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      
      // Continue the animation loop
      requestAnimationFrame(updateCursorPosition);
    }
    
    // Start the animation loop
    updateCursorPosition();
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    // Handle interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .interactive');
    
    interactiveElements.forEach(element => {
      // Grow cursor on hover
      element.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
      });
      
      // Return to normal size on mouse leave
      element.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
      });
    });
    
    // Hide cursor when mouse leaves the window
    document.addEventListener('mouseleave', () => {
      cursor.classList.add('hidden');
    });
    
    // Show cursor when mouse enters the window
    document.addEventListener('mouseenter', () => {
      cursor.classList.remove('hidden');
    });
    
    console.log('✅ Custom cursor initialized');
  }
  
  // Initialize when DOM is loaded
  document.addEventListener('DOMContentLoaded', initCustomCursor);
  
  // Expose to global scope
  window.initCustomCursor = initCustomCursor;
})(); 