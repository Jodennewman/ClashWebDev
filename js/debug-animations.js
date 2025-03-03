export function addTestAnimation() {
  // Simple test animation with clear visual feedback
  const testBox = document.createElement('div');
  testBox.style.cssText = 'position:fixed; bottom:20px; right:20px; width:100px; height:100px; background:red; z-index:9999;';
  testBox.id = 'test-trigger-box';
  document.body.appendChild(testBox);
  gsap.to('#test-trigger-box', {
    backgroundColor: 'green',
    scrollTrigger: {
      trigger: '#smooth-content',
      start: 'top top',
      end: '+=500',
      scrub: true,
      markers: true,
      onEnter: () => console.log('TEST TRIGGER ENTERED'),
      onLeave: () => console.log('TEST TRIGGER LEFT'),
      onEnterBack: () => console.log('TEST TRIGGER ENTERED BACK'),
      onLeaveBack: () => console.log('TEST TRIGGER LEFT BACK')
    }
  });
}
