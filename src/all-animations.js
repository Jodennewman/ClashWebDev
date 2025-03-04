// animations.js - Contains all animations for the main page
import { gsap, ScrollTrigger, ScrollSmoother } from './gsap-setup.js';
import { Application, Assets, Container, DisplacementFilter, Sprite, Graphics } from 'pixi.js';
import Matter from 'matter-js';
import hsl from 'hsl-to-hex';

// ========== MAIN INITIALIZATION FUNCTION ==========
export async function initAnimations() {
  console.log("Starting animation initialization");
  
  try {
    // Initialize sections in order
    await initHeroSection();
    await initHero2Section();
    await initStatsSection();
    await initSerpentineSection();
    await initSplitScreenSection();
    await initWhoAreWeSection();
    await initHorizontalSection();
    
    // Final ScrollTrigger refresh
    ScrollTrigger.refresh(true);
    console.log("All animations initialized successfully");
  } catch (error) {
    console.error("Animation initialization error:", error);
  }
}

// ========== SECTION 1: HERO WITH PIXI.JS ==========
async function initHeroSection() {
  console.log("Initializing Hero section with Pixi.js");
  
  try {
    // Create Pixi Application
    const app = new Application();
    await app.init({
      background: "#000000",
      resizeTo: window,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      backgroundAlpha: 0
    });

    // Attach to container
    const pixiContainer = document.getElementById("pixi-container-hero");
    if (!pixiContainer) {
      console.warn("Pixi container for hero not found");
      return;
    }
    pixiContainer.appendChild(app.canvas);

    // Load assets
    await Assets.load([
      '/assets/main/simplePipe.webp',
      '/assets/main/simplePipeTop.webp',
      '/assets/main/PipeDispMap.webp',
      '/assets/main/eyeballSprite1.webp',
      '/assets/main/eyeballSprite2.webp',
      '/assets/main/eyeballSprite3.webp',
      '/assets/main/eyeballSprite4.svg',
      '/assets/main/eyeballSprite5.webp',
      '/assets/main/eyeballSprite6.webp',
    ]);

    app.stage.eventMode = 'static';

    // Set up pipe & displacement
    const pipeContainer = new Container();
    app.stage.addChild(pipeContainer);

    const currentFilters = Array.isArray(pipeContainer.filters) 
      ? pipeContainer.filters 
      : (pipeContainer.filters ? [pipeContainer.filters] : []);

    const pipeSprite = Sprite.from('/assets/main/simplePipe.webp');
    pipeContainer.addChild(pipeSprite);

    const pipeSpriteTop = Sprite.from('/assets/main/simplePipeTop.webp');
    pipeContainer.addChild(pipeSpriteTop);

    // Your original pipe positioning & rotation
    pipeContainer.x = window.innerWidth / 1.625;
    pipeContainer.y = window.innerHeight / 4.6;
    pipeContainer.rotation = -0.253;

    // Displacement sprite
    const displacementSprite = Sprite.from('/assets/main/PipeDispMap.webp');
    displacementSprite.texture.source.addressMode = 'clamp-to-edge'; 
    displacementSprite.anchor.set(-0.05);
    displacementSprite.position.set(500, 0);
    pipeContainer.addChild(displacementSprite);

    // Displacement filter
    const displacementFilter = new DisplacementFilter(displacementSprite);
    displacementFilter.scale.set(0, 100); 
    displacementFilter.padding = 20;

    // Apply to pipe base & top
    pipeSprite.filters = [displacementFilter];
    pipeSpriteTop.filters = [displacementFilter];

    // Middle container for eyeballs
    const pipeMiddleContainer = new Container();
    pipeContainer.addChildAt(pipeMiddleContainer, pipeContainer.getChildIndex(pipeSpriteTop));

    // Eyeball spawning function
    function spawnEyeball() {
      const eyeballContainer = new Container();

      // Random eyeball sprite
      const randomIndex = Math.floor(Math.random() * 6) + 1;
      const newRandom = randomIndex === 4 ? 5 : randomIndex;
      const eyeballSprite = Sprite.from(`/assets/main/eyeballSprite${newRandom}.webp`);
      eyeballSprite.anchor.set(0.5);
      eyeballSprite.scale.set(0.2);

      // Each eyeball's own displacement
      const eyeDispSprite = Sprite.from('/assets/main/PipeDispMap.webp');
      eyeDispSprite.texture.source.addressMode = 'clamp-to-edge';
      eyeDispSprite.anchor.set(-0.05);

      const eyeDispFilter = new DisplacementFilter(eyeDispSprite);
      eyeDispFilter.padding = 20;
      eyeDispFilter.scale.set(30, 30);

      eyeballContainer.addChild(eyeballSprite);

      return eyeballContainer;
    }

    function spawnMultipleEyeballs(count, startX, startY) {
      for (let i = 0; i < count; i++) {
        const eContainer = spawnEyeball();
        eContainer.scale.set(0.1);
        pipeMiddleContainer.addChild(eContainer);
        let randomX = window.innerWidth/(Math.random() * 0.6 + 1.4);
        eContainer.x = startX;
        eContainer.y = startY;
        let delayAmount = i * Math.random()/10;
        
        let tween = gsap.to(eContainer, {
          alpha: 1,
          motionPath: {
            path: [{x: startX, y: startY}, {x: startX - (randomX), y: startY+450}, {x: startX - (randomX), y: startY+1300}],
            curviness: Math.random() * 1.3 + 1.7
          },
          duration: 1.2,
          delay: delayAmount,
          ease: "slow(0.7, 0.55)"
        });
        
        let tween2 = gsap.to(eContainer.children, {
          rotation: (Math.random()-0.5) > 0 ? 7 : -7,
          duration: 1.2,
          delay: delayAmount,
          ease: "power3.out",
        });
        
        let tweenScale = gsap.to(eContainer.scale, {
          x: 1,
          y: 1,
          duration: 0.2,
          delay: delayAmount,
          ease: "power4.in"
        });

        let yoyoScale = gsap.to(eContainer.scale, {
          x: 1.4,
          y: 1.4,
          ease: "slow(0.4, 0.55, true)",
          delay: delayAmount,
          duration: 0.8,
        });
        
        mainTL.add(tweenScale, 0.3);
        mainTL.add(tween, 0.55);
        mainTL.add(tween2, 0.55);
        mainTL.add(yoyoScale, 0.75);
      }
    }

    // The "main eyeball" that we might keep center
    let mainEyeContainer = null;

    function spawnMainEyeball(startX, startY) {
      mainEyeContainer = spawnEyeball();
      mainEyeContainer.scale.set(0.1);
      pipeMiddleContainer.addChild(mainEyeContainer);

      mainEyeContainer.x = startX;
      mainEyeContainer.y = startY;

      // Animate it upward or outward
      let tween = gsap.to(mainEyeContainer, {
        alpha: 1,
        motionPath: {
          path: [{x: startX, y: startY}, {x: startX - (window.innerWidth/1.9), y: startY+480}, {x: startX - (window.innerWidth/1.9), y: startY+550}],
          curviness: 2.1
        },
        duration: 1.35,
        ease: "slow(0.4, 0.8)",
      });
      
      let tween2 = gsap.to(mainEyeContainer.scale, {
        x: 1,
        y: 1,
        duration: 0.5,
        ease: "power3.in"
      });

      let tween3 = gsap.to(mainEyeContainer, {
        y: "+=700",
        x: "-=200",
        duration: 1,
        ease: "power3.in",
      });

      let yoyoScale = gsap.to(mainEyeContainer.scale, {
        x: 1.4,
        y: 1.4,
        ease: "slow(0.4, 0.55, true)",
        duration: 0.8,
      });

      let tweenRotate = gsap.to(mainEyeContainer.children, {
        rotation: 12,
        duration: 1.5,
        ease: "power3.out",
      });
      
      mainTL.add(tweenRotate, 1.3);
      mainTL.add(tween, 1.3);
      mainTL.add(tween2, 0.3);
      mainTL.add(tween3, 3.2);
      mainTL.add(yoyoScale, 1.5);
    }

    // Set up ScrollTrigger
    const mainTL = gsap.timeline({
      scrollTrigger: {
        trigger: "#heroSection",
        start: "top top",
        end: "+=1500",
        pinSpacing: false,
        scrub: 1,
        pin: true,
        id: "heroSectionTrigger"
      }
    });

    // Animate displacement
    mainTL.to(displacementSprite, {
      x: -pipeContainer.width / 4,
      duration: 1
    }, 0);

    mainTL.to(displacementFilter.scale, {
      x: 0,
      y: 0,
      duration: 1
    }, 0);

    // Move pipe up
    mainTL.to(pipeContainer.position, {
      y: "+=36.3",
      duration: 1
    }, 0);

    // Spawn eyeballs function
    function getPipeTipLocal() {
      const globalPos = pipeSpriteTop.toGlobal({ x: window.innerWidth/5.5, y: 290 });
      return pipeMiddleContainer.toLocal(globalPos);
    }

    // Spawn multiple eyeballs
    mainTL.call(() => {
      const tip = getPipeTipLocal();
      spawnMultipleEyeballs(20, tip.x, tip.y);
    }, [], 0);

    // Spawn main eyeball
    mainTL.call(() => {
      const tip = getPipeTipLocal();
      spawnMainEyeball(tip.x, tip.y);
    }, [], 0);

    // Additional animations
    mainTL.to(pipeContainer, {
      y: pipeContainer.y - 800,
      x: pipeContainer.x + window.innerWidth * 0.12,
      duration: 1.2,
      ease: "power3.Out"
    }, 1.3)
    .to("#titleWrapper", {
      y: "-=800",
      x: window.innerWidth * 0.12,
      duration: 1.2,
      ease: "power3.Out"
    }, "<")
    .to(".hero-bg", {
      opacity: 0,
      duration: 1.2,
      ease: "power2.in"
    }, "<")
    .to(".design-grid", {
      y: "-=800",
      x: "+=100",
      scale: 0.8,
      opacity: 0,
      duration: 1,
      ease: "power3.in"
    }, "<")
    .to("#app1", {
      scale: 0.1,
      duration: 2.4,
      ease: "expo.in"
    }, ">-0.3");

    // Initialize text animations
    initHeroTitleAnimations();

    console.log("Hero section initialized successfully");
    return true;
  } catch (error) {
    console.error("Hero section initialization error:", error);
    return false;
  }
}

// Hero title animations
function initHeroTitleAnimations() {
  // Example of text animation with SplitText
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
  
  const titleGlobalTL = gsap.timeline({ paused: false });
  const tl = gsap.timeline({ paused: true });
  const attentionTL = gsap.timeline({ paused: true });
  
  // Split text animations
  const split1 = new SplitText("#heroTitleLine1", { type: "chars" });
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
  
  // Second split text
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
  
  // Main title sequence
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
  
  // Text scramble animations
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
      chars: "clash"
    },
    duration: 0.3,
    ease: "power2.inOut",
    scale: 1.1,
  }, ">5");
  
  titleGlobalTL.to("#glitchTitle", {
    scrambleText: {
      text: "We Get",
      chars: "clash"
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
      chars: "clash"
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
      chars: "clash"
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
      chars: "clash"
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

// ========== SECTION 2: HERO2 WITH MATTER.JS ==========
async function initHero2Section() {
  console.log("Initializing Hero2 section with Matter.js");

  try {
    // Initialize PixiJS Application
    const app = new Application();
    await app.init({
      background: "#000000",
      resizeTo: window,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      backgroundAlpha: 0
    });

    // Add canvas to container
    const container = document.getElementById("pixi-container");
    if (!container) {
      console.warn("Pixi container for Hero2 not found");
      return false;
    }
    container.appendChild(app.canvas);

    // Load eyeball textures
    const eyeballTextures = await Promise.all([
      Assets.load("/assets/main/eyeballSprite1.svg"),
      Assets.load("/assets/main/eyeballSprite2.svg"),
      Assets.load("/assets/main/eyeballSprite3.svg"),
      Assets.load("/assets/main/eyeballSprite4.svg"),
      Assets.load("/assets/main/eyeballSprite5.svg"),
      Assets.load("/assets/main/eyeballSprite6.svg"),
    ]);
    const MAX_EYEBALLS = 290;

    // Initialize Matter.js Physics Engine
    const engine = Matter.Engine.create();
    const world = engine.world;
    engine.gravity.y = 1;

    // Create scene container with proper positioning
    const sceneContainer = new Container();
    sceneContainer.pivot.set(window.innerWidth / 2, window.innerHeight / 2);
    sceneContainer.position.set(window.innerWidth / 2, window.innerHeight / 2);
    sceneContainer.scale.set(1);
    app.stage.addChild(sceneContainer);

    // Create bucket function
    function createBucket() {
      const x = window.innerWidth / 2;
      const y = window.innerHeight / 2 - 100;
      const bucketWidth = 700;
      const bucketHeight = 200;

      // PixiJS Graphics for the Bucket
      const bucket = new Graphics();
      bucket.arc(0, 0, 270, Math.PI + 0.05, 2 * Math.PI - 0.05, true);
      bucket.stroke({ width: 60, color: 0xff976c });

      bucket.position.x = x;
      bucket.position.y = y;
      sceneContainer.addChild(bucket);

      // Matter.js Static Physics Bodies
      const bucketSegments = [];
      const segmentCount = 30;
      const radius = 270;

      for (let i = 0; i < segmentCount; i++) {
        const angleStart = Math.PI + (i / segmentCount) * -Math.PI;
        const angleEnd = Math.PI + ((i + 1) / segmentCount) * -Math.PI;

        const x1 = x + Math.cos(angleStart) * radius;
        const y1 = y + Math.sin(angleStart) * radius;
        const x2 = x + Math.cos(angleEnd) * radius;
        const y2 = y + Math.sin(angleEnd) * radius;

        const segment = Matter.Bodies.rectangle(
          (x1 + x2) / 2, (y1 + y2) / 2,
          60, 100,
          {
            isStatic: true,
            angle: angleStart + Math.PI / segmentCount,
            render: { visible: true }
          }
        );

        bucketSegments.push(segment);
      }

      Matter.World.add(world, bucketSegments);
    }

    // Eyeballs array to track sprites and bodies
    const eyeballs = [];

    // Create eyeball function
    function createEyeball() {
      if (eyeballs.length >= MAX_EYEBALLS) return;
      
      const spawnX = window.innerWidth / 2 + (Math.random() * 10 - 5);
      const spawnY = Math.random() * -50;
      const radius = Math.random() * 7 + 7;

      const originalRadius = radius;

      const randomTexture = eyeballTextures[Math.floor(Math.random() * eyeballTextures.length)];
      const sprite = new Sprite(randomTexture);
      sprite.width = sprite.height = radius * 2;
      sprite.anchor.set(0.5);
      sprite.x = spawnX;
      sprite.y = spawnY;
      
      const hue = Math.random() * (55 - 25) + 30;
      sprite.tint = hsl(hue, Math.random() * 50 + 50, Math.random() * 20 + 80);

      sceneContainer.addChild(sprite);

      const body = Matter.Bodies.circle(spawnX, spawnY, radius + 1, { 
        restitution: 0.005, 
        friction: 0.2, 
        density: 0.2 
      });
      
      Matter.World.add(world, body);

      eyeballs.push({ sprite, body, originalRadius });
    }

    // Mouse interaction
    let isMouseDown = false;
    window.addEventListener("mousedown", () => { isMouseDown = true; });
    window.addEventListener("mouseup", () => { isMouseDown = false; });

    window.addEventListener("mousemove", (event) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      eyeballs.forEach(({ body }) => {
        const dx = body.position.x - mouseX;
        const dy = body.position.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          let forceMagnitude = 0.20;
          if (isMouseDown) forceMagnitude *= 50;

          const forceX = (dx / distance) * forceMagnitude;
          const forceY = (dy / distance) * forceMagnitude;

          Matter.Body.applyForce(body, body.position, { x: forceX, y: forceY });
        }
      });
    });

    // Set up spawn interval
    let spawnInterval = null;
    setInterval(() => { createEyeball(); }, 40);

    // Set up ScrollTrigger
    const bowlTL = gsap.timeline({
      scrollTrigger: {
        trigger: "#heroSection2",
        start: "top top",
        pin: true,
        scrub: 1,
        end: "+=3000",
        id: "hero2ScrollTrigger",
        onEnter: () => {
          engine.gravity.y = 1;
          setTimeout(() => {
            if (!spawnInterval) {
              spawnInterval = setInterval(() => {
                createEyeball();
              }, 20);
            }
          }, 300);
        },
        onLeave: () => {
          engine.gravity.y = -1;
          setTimeout(() => {
            clearEyeballs();
          }, 600);
          if (spawnInterval) {
            clearInterval(spawnInterval);
            spawnInterval = null;
          }
        },
        onEnterBack: () => {
          engine.gravity.y = 1;
          if (!spawnInterval) {
            spawnInterval = setInterval(() => {
              createEyeball();
            }, 7);
          }
        },
        onLeaveBack: () => {
          setTimeout(() => {
            engine.gravity.y = -1;
            clearEyeballs();
          }, -1000);
        }
      }
    });

    // Clear eyeballs function
    function clearEyeballs() {
      eyeballs.forEach(({ body, sprite }) => {
        Matter.World.remove(world, body);
        sceneContainer.removeChild(sprite);
      });
      eyeballs.length = 0;
    }

    // Text animation helper
    function TextSplitter(text, charsYes, wordsYes, ease = "none", duration = 1, stagger = 0.1, position = "<") {
      let splitType = !!charsYes && !!wordsYes ? "chars words" : !!charsYes && !wordsYes ? "chars" : !charsYes && !!wordsYes ? "words" : "words";
      let split = new SplitText(text, { type: `${splitType}` });
      let chars = split.chars || null;
      let words = split.words || null;

      let tl = gsap.timeline();

      let charsTween = gsap.from(chars || null, {
        yPercent: 200,
        opacity: 0,
        duration: duration,
        ease: ease,
        stagger: stagger
      });

      let wordsTween = gsap.from(words || null, {
        yPercent: 140,
        opacity: 0,
        duration: duration,
        ease: ease,
        stagger: stagger
      });

      charsYes === true ? tl.add(charsTween, position) : null;
      wordsYes === true ? tl.add(wordsTween, position) : null;
      
      return { tl, split };
    }

    // Animate text
    const billionEyesEl = document.querySelector("#billionEyesText");
    if (billionEyesEl) {
      let billionEyesAnimation = TextSplitter(billionEyesEl, true, true, "elastic.out(1,0.6)", 1.2, 0.05, 0).tl;
      
      ScrollTrigger.create({
        trigger: "#billionEyesText",
        start: "50% 80%",
        end: "bottom top",
        pin: false,
        scrub: false,
        toggleActions: "play none none reverse",
        animation: billionEyesAnimation,
        id: "billionEyesTextTrigger"
      });
    }

    // Date since calculation
    function getTimeSince(startDate) {
      const now = new Date();

      let years = now.getFullYear() - startDate.getFullYear();
      let months = now.getMonth() - startDate.getMonth();
      let days = now.getDate() - startDate.getDate();

      if (days < 0) {
        months--;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days = prevMonth.getDate() + days;
      }

      if (months < 0) {
        years--;
        months = 12 + months;
      }

      let hours = now.getHours() - startDate.getHours();
      let minutes = now.getMinutes() - startDate.getMinutes();
      let seconds = now.getSeconds() - startDate.getSeconds();

      if (seconds < 0) {
        minutes--;
        seconds = 60 + seconds;
      }

      if (minutes < 0) {
        hours--;
        minutes = 60 + minutes;
      }

      if (hours < 0) {
        days--;
        hours = 24 + hours;
      }

      return { years, months, days, hours, minutes, seconds };
    }

    function updateTimeSince(startDate) {
      function updateCounter() {
        const elapsed = getTimeSince(startDate);
        const container = document.getElementById("dateSince");

        if (container) {
          container.innerHTML = formatTimeSince(elapsed);
        }
      }

      updateCounter();
      setInterval(updateCounter, 1000);
    }

    function formatTimeSince(timeObj) {
      const { years, months, days, hours, minutes, seconds } = timeObj;
      const yearLabel = pluralize(years, "Year", "Years");
      const monthLabel = pluralize(months, "Month", "Months");
      const dayLabel = pluralize(days, "Day", "Days");
      const hoursLabel = pluralize(hours, "Hour", "Hours");
      const minutesLabel = pluralize(minutes, "Minute", "Minutes");
      const secondsLabel = pluralize(seconds, "Second", "Seconds");
      
      return `<span style=color:#ffce91;>In only:</span>
     ${years} ${yearLabel},
        ${months} ${monthLabel}, 
           ${days} ${dayLabel},
              <p style="opacity: 75%; position: absolute; display: inline-block; line-height: 1; font-size: clamp(2rem, 4.3vw, 3.2rem); font-weight: 500;">${hours} ${hoursLabel}, </p>
                  <p style="opacity: 60%; position: absolute; display: inline-block; font-size: clamp(1.8rem, 3.5vw, 2.4rem); margin-top: -0.8rem; font-weight: 400;">${minutes} ${minutesLabel}, </p>
                     <p style="opacity: 42%; position: absolute; display: inline-block; font-size: clamp(1.5rem, 3vw, 2rem); margin-top: -2.1rem; font-weight: 300;">${seconds} ${secondsLabel}.  </p>
                                          `;
    }

    function pluralize(value, singular, plural) {
      return (value === 1 ? singular : plural);
    }

    // Initialize the date counter
    const myStartDate = new Date("2023-03-04");
    updateTimeSince(myStartDate);
    const elapsed = getTimeSince(myStartDate);

    // Animation timeline
    bowlTL.from(sceneContainer.scale, {
      x: 20,
      y: 20,
      duration: 0.8,
      ease: "power4.out",
    }, 0)
    .from(sceneContainer, {
      alpha: 1,
      duration: 0.2,
      ease: "expo.in",
    }, 0)
    .from(sceneContainer.position, {
      y: 1400,
      duration: 1.2,
      ease: "expo.out",
    }, 0);

    bowlTL.fromTo(engine.gravity, { y: -40 }, { y: 1, duration: 0.4, ease: "power4.out" }, 0);

    const dateSinceContainer = document.getElementById("dateSince");
    if (dateSinceContainer) {
      bowlTL.from(dateSinceContainer, {
        opacity: 0,
        y: "+=200",
        duration: 1.2,
        ease: "power3.inOut",
      }, 0.5);
      
      dateSinceContainer.innerHTML = formatTimeSince(elapsed);
    }

    // Update function for physics
    function update() {
      Matter.Engine.update(engine);
      eyeballs.forEach((obj, index) => {
        obj.sprite.x = obj.body.position.x;
        obj.sprite.y = obj.body.position.y;
        obj.sprite.rotation = obj.body.angle;

        // Get velocity magnitude and direction
        const velocityX = obj.body.velocity.x;
        const velocityY = obj.body.velocity.y;
        const velocityMagnitude = Math.sqrt(velocityX ** 2 + velocityY ** 2) || 0.001;

        // Normalize velocity vector
        const directionX = velocityX / velocityMagnitude || 0;
        const directionY = velocityY / velocityMagnitude || 1;

        // Compute movement direction angle
        const velocityAngle = Math.atan2(velocityY, velocityX);

        // Define squash & stretch factors
        const stretchFactor = Math.min(1 + velocityMagnitude * 0.03, 1.3);
        const squashFactor = Math.max(1 - velocityMagnitude * 0.05, 0.7);

        // Apply scale relative to radius
        const newWidth = obj.originalRadius * 2 * squashFactor;
        const newHeight = obj.originalRadius * 2 * stretchFactor;

        // Only update scale if there's a noticeable change
        if (
          Math.abs(obj.sprite.width - newWidth) > 0.5 ||
          Math.abs(obj.sprite.height - newHeight) > 0.5
        ) {
          gsap.to(obj.sprite, {
            width: newHeight,
            height: newWidth,
            duration: 0.1,
            ease: "power2.out"
          });
        }

        // Reduce crazy spinning
        if (velocityMagnitude > 0.5) {
          gsap.to(obj.sprite, {
            rotation: velocityAngle,
            duration: 0.5,
            ease: "power2.out"
          });
        }

        // Remove offscreen eyeballs
        if (obj.body.position.y > window.innerHeight + 200 || obj.body.position.y < -200) {
          Matter.World.remove(world, obj.body);
          sceneContainer.removeChild(obj.sprite);
          eyeballs.splice(index, 1);
        }
      });
      requestAnimationFrame(update);
    }

    // Create bucket and start update loop
    createBucket();
    update();

    console.log("Hero2 section initialized successfully");
    return true;
  } catch (error) {
    console.error("Hero2 section initialization error:", error);
    return false;
  }
}

// ========== SECTION 3: STATS SECTION ==========
async function initStatsSection() {
  console.log("Initializing Stats section");
  
  try {
    // Main timeline for stats section
    let statsMasterTL = gsap.timeline({
      scrollTrigger: {
        trigger: "#section-stats",
        pin: false,
        start: "top center",
        end: "bottom bottom",
        scrub: true,
        id: "statsMasterTrigger"
      }
    });

    // Loop path animation
    gsap.fromTo("#loopPath1",
      { drawSVG: 0 },
      {
        duration: 0.7,
        drawSVG: "100%",
        ease: "slow(0.2, 0.9, false)",
        scrollTrigger: {
          trigger: "#section-stats",
          pin: false,
          scrub: true,
          start: "top center",
          end: "+=500",
          id: "loopPathTrigger"
        }
      }
    );

    // Question mark animations
    statsMasterTL.fromTo("#mainQMark",
      { drawSVG: 0 },
      { duration: 1, drawSVG: "100%", ease: "power3.inOut" },
      0.5
    ).fromTo("#mainQMarkdot",
      { drawSVG: 0 },
      { duration: 0.3, drawSVG: "100%", ease: "slow(0.2, 0.9, false)" },
      "<+0.8"
    ).fromTo(".Qcascade",
      { drawSVG: 0 },
      { duration: 0.5, drawSVG: "100%", ease: "power3.out", stagger: { each: 0.025, from: "end" } },
      "<+0.5"
    );

    // Eyeball animation helper
    function eyeBallCreateRotationProperties(svgSelector) {
      const gradient = document.querySelector(`${svgSelector} #eyeballGradient`);
      if (!gradient) return null;
      
      const baseX = parseFloat(gradient.getAttribute('cx'));
      const baseY = parseFloat(gradient.getAttribute('cy'));
      const baseR = parseFloat(gradient.getAttribute('r'));
      
      function getGradientPositionFromAngles(angleX, angleY, radius) {
        const radX = angleX * (Math.PI / 180);
        const radY = angleY * (Math.PI / 180);
        const x = radius * Math.sin(radX) * Math.cos(radY);
        const y = radius * Math.sin(radY);
        return { x, y };
      }
      
      function getScaleFactorFromAngles(angleX, angleY) {
        const maxFlatten = 0.2;
        const distanceFromCenter = Math.sqrt(angleX * angleX + angleY * angleY);
        const ratio = Math.min(distanceFromCenter / 90, 1);
        return 1 - ratio * maxFlatten;
      }
      
      function updateEyeball(angleX, angleY, movementRadius = 20) {
        const { x, y } = getGradientPositionFromAngles(angleX, angleY, movementRadius);
        const scaleFactor = getScaleFactorFromAngles(angleX, angleY);
        const newRadius = baseR * scaleFactor;
        gradient.setAttribute("fx", (baseX + x).toFixed(2));
        gradient.setAttribute("fy", (baseY + y).toFixed(2));
        gradient.setAttribute("r", newRadius.toFixed(2));
      }
      
      return {
        baseX, baseY, baseR,
        updateEyeball,
        getGradientPositionFromAngles,
        getScaleFactorFromAngles
      };
    }

    // Animate eyeball
    const eyeball = eyeBallCreateRotationProperties("#eyeballSVG");
    if (eyeball) {
      const angles = { x: 0, y: 0 };
      gsap.timeline({ repeat: -1, repeatDelay: 1 })
        .to(angles, {
          x: -30,
          duration: 1.5,
          ease: "power2.inOut",
          onUpdate: () => eyeball.updateEyeball(angles.x, angles.y, 25)
        })
        .to(angles, {
          y: -15,
          duration: 1,
          ease: "power2.inOut",
          onUpdate: () => eyeball.updateEyeball(angles.x, angles.y, 25)
        })
        .to(angles, {
          x: 30, y: 0,
          duration: 2,
          ease: "power2.inOut",
          onUpdate: () => eyeball.updateEyeball(angles.x, angles.y, 25)
        })
        .to(angles, {
          x: 0, y: 20,
          duration: 1.5,
          ease: "power2.inOut",
          onUpdate: () => eyeball.updateEyeball(angles.x, angles.y, 25)
        })
        .to(angles, {
          x: 0, y: 0,
          duration: 1,
          ease: "power2.inOut",
          onUpdate: () => eyeball.updateEyeball(angles.x, angles.y, 25)
        });
    }

    // Stats counter animations
    gsap.from('#viewsCount', {
      textContent: 0,
      duration: 2,
      ease: "power1.inOut",
      snap: { textContent: 1 },
      stagger: 1,
      scrollTrigger: {
        trigger: "#viewsFlex",
        start: "top 90%",
        toggleActions: "play none none reverse",
        id: "viewsCountTrigger"
      }
    });

    gsap.from('#followersCount', {
      textContent: 0,
      duration: 2,
      ease: "power1.inOut",
      snap: { textContent: 0.1 },
      stagger: 1,
      scrollTrigger: {
        trigger: "#followersFlex",
        start: "top 90%",
        toggleActions: "play none none reverse",
        id: "followersCountTrigger"
      }
    });

    gsap.from('#interactionsCount', {
      textContent: 0,
      duration: 2,
      ease: "power1.inOut",
      snap: { textContent: 1 },
      stagger: 1,
      scrollTrigger: {
        trigger: "#interactionsFlex",
        start: "top 90%",
        toggleActions: "play none none reverse",
        id: "interactionsCountTrigger"
      }
    });

    console.log("Stats section initialized successfully");
    return true;
  } catch (error) {
    console.error("Stats section initialization error:", error);
    return false;
  }
}

// ========== SECTION 4: SERPENTINE SECTION ==========
async function initSerpentineSection() {
  console.log("Initializing Serpentine section");
  
  try {
    // Get the serpentine path element and related elements
    const serpentinePath = document.getElementById('serpentinePath');
    const animationPath = document.getElementById('serpentineAnimationPath');
    const section = document.querySelector('.serpentine-section');
    
    if (!serpentinePath || !animationPath || !section) {
      console.warn("Required elements for serpentine section not found");
      return false;
    }
    
    // Make sure the path is visible but start with drawSVG at 0
    gsap.set([serpentinePath, animationPath], { 
      autoAlpha: 1,
      scale: 0.95,
      y: 30
    });
    
    gsap.set(animationPath, { drawSVG: 0 });
    
    // Create the main timeline with ScrollTrigger
    const mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        scroller: "#smooth-content",
        start: "top bottom",
        end: "+800px",
        scrub: 1,
        id: "serpentinePathTrigger",
        toggleActions: "play none none reverse"
      }
    });
    
    // Add animations to the timeline
    mainTimeline
      // First animate scale and position
      .to([serpentinePath, animationPath], {
        scale: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      })
      // Then animate the path drawing with DrawSVG
      .to(animationPath, {
        drawSVG: "100%",
        duration: 1.5,
        ease: "power2.inOut"
      }, "-=0.3")
      // Animate text after path is drawn
      .from(".serpentine-text", {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out"
      }, "-=0.8");
    
    // Set up motion path animations
    setupSerpentineMotionPaths();
    
    // Animate the orange star
    animateOrangeStar();
    
    console.log("Serpentine section initialized successfully");
    return true;
  } catch (error) {
    console.error("Serpentine section initialization error:", error);
    return false;
  }
}

// Helper function for serpentine animation
function setupSerpentineMotionPaths() {
  // Create a timeline for motion paths
  let serpTL = gsap.timeline();
  
  // Animate blue ball along path
  serpTL.to("#blueBall", {
    motionPath: {
      path: "#serpentineAnimationPath",
      autoRotate: true,
    },
    ease: "none",
    duration: 0.5,
  }, 0);
  
  // Animate purple cross along path
  serpTL.to("#purpleCross", {
    motionPath: {
      path: "#serpentineAnimationPath",
      curviness: 2,
      autoRotate: true,
    },
    ease: "none",
    duration: 0.5,
  }, 0.5);
  
  // Create ScrollTrigger for the motion paths
  ScrollTrigger.create({
    trigger: "#section-serpentine",
    start: "top middle",
    animation: serpTL,
    scroller: "#smooth-content",
    end: "+500px",
    scrub: 1,
    id: "serpentineMotionTrigger",
    toggleActions: "play reverse play reverse"
  });
}

// Animate orange star
function animateOrangeStar() {
  const orangeStar = document.getElementById('orangeStar');
  if (!orangeStar) return;
  
  const path = document.getElementById('serpentineAnimationPath');
  if (!path) return;
  
  // Set initial style
  gsap.set(orangeStar, {
    autoAlpha: 1,
    scale: 0.7,
    transformOrigin: "center center",
    zIndex: 20,
    filter: "drop-shadow(0 0 20px rgba(255, 165, 0, 0.8))"
  });
  
  // Create animation timeline
  const starTL = gsap.timeline({
    scrollTrigger: {
      trigger: "#section-serpentine",
      start: "top 90%",
      end: "+800px",
      scroller: "#smooth-content",
      scrub: 1.5,
      id: "orangeStarTrigger"
    }
  });
  
  // Animate along path
  starTL
    .to(orangeStar, {
      autoAlpha: 1,
      duration: 0.5
    })
    .to(orangeStar, {
      motionPath: {
        path: `#${path.id}`,
        align: `#${path.id}`,
        alignOrigin: [0.5, 0.5],
        autoRotate: true
      },
      duration: 8,
      ease: "power1.inOut"
    });
  
  // Add spinning animation
  gsap.to(orangeStar, {
    rotation: 360,
    duration: 10,
    repeat: -1,
    ease: "none"
  });
}

// ========== SECTION 5: SPLIT SCREEN SECTION ==========
async function initSplitScreenSection() {
  console.log("Initializing Split Screen section");
  
  try {
    // Set up heading animation
    gsap.fromTo(".heading-large .text-line", 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".split-screen-section",
          start: "top 80%",
          scrub: 1,
          id: "splitScreenTrigger"
        }
      }
    );
    
    // Set up gallery parallax effects
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item) => {
      const speed = parseFloat(item.getAttribute('data-speed') || '0.5');
      
      // Set initial state with slight scale and blur variations
      gsap.set(item, {
        opacity: 1,
        y: 50,
        scale: 0.95,
        filter: 'blur(2px)'
      });
      
      // Animate items into view
      gsap.to(item, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".right-content",
          start: "top 80%",
          toggleActions: "play none none reverse",
          id: `galleryItem-${speed}`
        }
      });
      
      // Create the parallax effect
      gsap.to(item, {
        y: -100 * speed,
        scrollTrigger: {
          trigger: "#splitScreenWrapper",
          start: "top top",
          end: "bottom top",
          scrub: true,
          id: `galleryParallax-${speed}`
        }
      });
      
      // Add subtle floating animation
      gsap.to(item, {
        y: "+=15",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });
    
    // Animate stats with a staggered effect
    const statItems = document.querySelectorAll('.stat-item');
    gsap.from(statItems, {
      y: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".stats-container",
        start: "top 80%",
        toggleActions: "play none none reverse",
        id: "statItemsTrigger"
      }
    });
    
    console.log("Split Screen section initialized successfully");
    return true;
  } catch (error) {
    console.error("Split Screen section initialization error:", error);
    return false;
  }
}

// ========== SECTION 6: WHO ARE WE SECTION ==========
async function initWhoAreWeSection() {
  console.log("Initializing Who Are We section");
  
  try {
    // Set up asterisk animation
    let asterixTL = gsap.timeline();
    
    gsap.from(".heading.leadingagency", {
      "--scale1": 0.6,
      duration: 2,
      ease: "power4.inOut"
    });
    
    let asterixTween1 = gsap.to(".heading.leadingagency", {
      duration: 3,
      "--rotation": 359.9,
      ease: "none"
    });
    
    asterixTL.add(asterixTween1, 0);
    
    gsap.to(asterixTL, {
      progress: 1,
      duration: 4,
      ease: "none",
      repeat: -1
    });
    
    // Setup hover effects for asterisk
    const asterixSpeedUp = gsap.to(asterixTL, {
      duration: 0.5,
      timeScale: 2,
      ease: "power2.Out",
      paused: true
    });
    
    const asterixSpeedDown = gsap.to(asterixTL, {
      duration: 2,
      timeScale: 1,
      ease: "power2.in",
      paused: true
    });
    
    // Add hover interactions
    const asterixSpan = document.querySelector("#asterix-spanID");
    if (asterixSpan) {
      asterixSpan.addEventListener("mouseenter", () => asterixSpeedUp.play());
      asterixSpan.addEventListener("mouseleave", () => asterixSpeedDown.play());
    }
    
    console.log("Who Are We section initialized successfully");
    return true;
  } catch (error) {
    console.error("Who Are We section initialization error:", error);
    return false;
  }
}

// ========== SECTION 7: HORIZONTAL SECTION ==========
async function initHorizontalSection() {
  console.log("Initializing Horizontal section");
  
  try {
    // Get the container
    const container = document.querySelector("#Horizontal2");
    if (!container) {
      console.warn("Horizontal container not found");
      return false;
    }
    
    // Set up horizontal scrolling
    gsap.to(container, {
      x: () => -(container.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        start: "top top",
        end: () => "+=" + (container.scrollWidth - window.innerWidth),
        id: "horizontal2Trigger"
      }
    });
    
    // Initialize sub-sections
    await initTestimonialsSection();
    await initOurStorySection();
    await initWhoAreYouSection();
    
    console.log("Horizontal section initialized successfully");
    return true;
  } catch (error) {
    console.error("Horizontal section initialization error:", error);
    return false;
  }
}

// ========== HORIZONTAL SUB-SECTIONS ==========
// Testimonials section
async function initTestimonialsSection() {
  console.log("Initializing Testimonials section");
  
  try {
    // Set up case study button animations
    const caseButtons = document.querySelectorAll('.casestudybutton');
    const caseStudyBox = document.getElementById('case-study-box');
    
    // Ensure buttons are visible
    gsap.set(caseButtons, {
      opacity: 1,
      scale: 1,
      visibility: 'visible'
    });
    
    // Add hover animations
    caseButtons.forEach(button => {
      const buttonSVG = button.querySelector('svg');
      const label = button.querySelector('.case-button-label');
      
      // Hover animation
      button.addEventListener('mouseenter', () => {
        gsap.to(buttonSVG, { 
          rotation: 15, 
          duration: 0.5, 
          ease: "power2.out" 
        });
        
        gsap.to(label, { 
          opacity: 1, 
          scale: 1.1, 
          duration: 0.3 
        });
      });
      
      button.addEventListener('mouseleave', () => {
        gsap.to(buttonSVG, { 
          rotation: 0, 
          duration: 0.5, 
          ease: "power2.out" 
        });
        
        gsap.to(label, { 
          opacity: 0.7, 
          scale: 1, 
          duration: 0.3 
        });
      });
      
      // Click animation
      button.addEventListener('click', () => {
        gsap.to(buttonSVG, {
          scale: 0.9,
          duration: 0.1,
          ease: "power4.out",
          yoyo: true,
          repeat: 1
        });
        
        // Show case study box
        if (caseStudyBox) {
          showCaseStudyBox(button.getAttribute('data-case'));
        }
      });
    });
    
    // Close button functionality
    const closeBtn = document.getElementById('closeBoxBtn');
    if (closeBtn && caseStudyBox) {
      closeBtn.addEventListener('click', () => {
        gsap.to(caseStudyBox, { 
          opacity: 0, 
          scale: 0.8,
          y: 20,
          duration: 0.3, 
          onComplete: () => {
            caseStudyBox.style.display = 'none';
          }
        });
      });
    }
    
    // Function to show case study box
    function showCaseStudyBox(caseNumber) {
      if (!caseStudyBox) return;
      
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
      Object.assign(backdrop.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: '999',
        opacity: '0'
      });
      
      document.body.appendChild(backdrop);
      
      gsap.to(backdrop, { opacity: 1, duration: 0.3 });
      
      // Close on backdrop click
      backdrop.addEventListener('click', () => {
        gsap.to(caseStudyBox, { 
          opacity: 0, 
          scale: 0.8,
          y: 20,
          duration: 0.3, 
          onComplete: () => {
            caseStudyBox.style.display = 'none';
          }
        });
        
        gsap.to(backdrop, { 
          opacity: 0, 
          duration: 0.3, 
          onComplete: () => {
            backdrop.remove();
          }
        });
      });
    }
    
    return true;
  } catch (error) {
    console.error("Testimonials section initialization error:", error);
    return false;
  }
}

// Our Story section
async function initOurStorySection() {
  console.log("Initializing Our Story section");
  
  try {
    const storyCards = document.querySelectorAll('.story-card');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const yearLabels = document.querySelectorAll('.ccyears');
    const timelineMarker = document.querySelector('.timeline-marker');
    
    if (!storyCards.length) {
      console.warn("Story cards not found");
      return false;
    }
    
    let activeIndex = 0;
    const cardCount = storyCards.length;
    
    // Initialize each card
    storyCards.forEach((card, index) => {
      // Set initial scale and opacity
      gsap.set(card, {
        scale: index === 0 ? 1 : 0.9,
        opacity: index === 0 ? 1 : 0.7,
        transformStyle: 'preserve-3d',
        transformPerspective: 1000
      });
      
      // Add mouse tracking for eyeballs
      const eyeball = card.querySelector('.eyeball-img');
      if (eyeball) {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width;
          const y = (e.clientY - rect.top) / rect.height;
          
          // Calculate movement range
          const moveX = (x - 0.5) * 20;
          const moveY = (y - 0.5) * 20;
          
          gsap.to(eyeball, {
            x: moveX,
            y: moveY,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
        
        // Reset position when mouse leaves
        card.addEventListener('mouseleave', () => {
          gsap.to(eyeball, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)'
          });
        });
      }
      
      // Use GSAP for card flipping
      const cardInner = card.querySelector('.card-inner');
      if (cardInner) {
        card.addEventListener('mouseenter', () => {
          gsap.to(cardInner, {
            rotationY: 180,
            duration: 0.6,
            ease: 'power1.inOut',
            force3D: true,
            transformPerspective: 1000,
            transformStyle: 'preserve-3d',
            overwrite: true
          });
        });
        
        card.addEventListener('mouseleave', () => {
          gsap.to(cardInner, {
            rotationY: 0,
            duration: 0.6,
            ease: 'power1.inOut',
            force3D: true,
            transformPerspective: 1000,
            transformStyle: 'preserve-3d',
            overwrite: true
          });
        });
      }
    });
    
    // Set up prev/next buttons
    if (prevButton && nextButton) {
      // Previous button click
      prevButton.addEventListener('click', () => {
        activeIndex = (activeIndex - 1 + cardCount) % cardCount;
        updateActiveCard();
      });
      
      // Next button click
      nextButton.addEventListener('click', () => {
        activeIndex = (activeIndex + 1) % cardCount;
        updateActiveCard();
      });
    }
    
    // Function to update active card
    function updateActiveCard() {
      // Update year labels
      yearLabels.forEach((label, i) => {
        if (i === activeIndex) {
          gsap.to(label, { color: "#fff", scale: 1.1, duration: 0.3 });
        } else {
          gsap.to(label, { color: "rgba(255,255,255,0.5)", scale: 1, duration: 0.3 });
        }
      });
      
      // Update timeline marker
      if (timelineMarker) {
        const positions = [20, 40, 60, 80];
        gsap.to(timelineMarker, { 
          left: `${positions[activeIndex]}%`, 
          duration: 0.5,
          ease: "power2.inOut"
        });
      }
      
      // Animate cards
      storyCards.forEach((card, i) => {
        if (i === activeIndex) {
          gsap.to(card, { 
            scale: 1.05, 
            opacity: 1, 
            duration: 0.5,
            ease: "back.out(1.7)",
            zIndex: 20
          });
        } else {
          gsap.to(card, { 
            scale: 0.9,
            opacity: 0.6, 
            duration: 0.5,
            zIndex: 10
          });
        }
      });
    }
    
    // Initialize the active card
    updateActiveCard();
    
    return true;
  } catch (error) {
    console.error("Our Story section initialization error:", error);
    return false;
  }
}

// Who Are You section
async function initWhoAreYouSection() {
  console.log("Initializing Who Are You section");
  
  try {
    // Get the boxes
    const container = document.getElementById("whoAreYou-section");
    const leftBox = document.getElementById("leftGreenCreativeBlock");
    const middleBox = document.getElementById("middleBlueBuilderBlock");
    const rightBox = document.getElementById("rightPinkExecBlock");
    
    if (!container || !leftBox || !middleBox || !rightBox) {
      console.warn("Who Are You boxes not found");
      return false;
    }
    
    // Animate boxes in
    gsap.fromTo([leftBox, middleBox, rightBox], 
      { y: 30, opacity: 0 }, 
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#whoAreYou-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
          id: "whoAreYouTrigger"
        }
      }
    );
    
    // Add click events to each box
    [leftBox, middleBox, rightBox].forEach(box => {
      if (!box) return;
      
      box.addEventListener("click", () => {
        let newActive = null;
        if (box === leftBox) newActive = "left";
        if (box === middleBox) newActive = "middle";
        if (box === rightBox) newActive = "right";
        
        // If this box is already active, deactivate it
        if (container && container.getAttribute('data-active') === newActive) {
          container.removeAttribute('data-active');
          animateContent(null);
        } else {
          if (container) {
            container.setAttribute("data-active", newActive);
          }
          animateContent(newActive);
        }
      });
    });
    
    // Function to animate content
    function animateContent(stateName) {
      [leftBox, middleBox, rightBox].forEach(box => {
        if (!box) return;
        
        const title = box.querySelector('.persona-title');
        const desc = box.querySelector('.persona-description');
        const extContent = box.querySelector('.extended-content');
        const button = box.querySelector('.get-started-btn');
        
        const isActive = (stateName === 'left' && box === leftBox) ||
                         (stateName === 'middle' && box === middleBox) ||
                         (stateName === 'right' && box === rightBox);
        
        if (isActive) {
          // For active box
          if (title) {
            gsap.to(title, {
              scale: 1.15,
              color: "white",
              fontWeight: "600",
              duration: 0.4,
              ease: "power2.out"
            });
          }
          
          if (desc) {
            gsap.to(desc, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.3,
              delay: 0.1
            });
          }
          
          if (extContent) {
            gsap.set(extContent, { display: 'block' });
            gsap.fromTo(extContent, 
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, duration: 0.4, delay: 0.2, ease: "power2.out" }
            );
          }
          
          if (button) {
            gsap.set(button, { display: 'block' });
            gsap.fromTo(button,
              { opacity: 0, y: 10, scale: 0.95 },
              { 
                opacity: 1, 
                y: 0, 
                scale: 1, 
                duration: 0.3, 
                delay: 0.3,
                ease: "power2.out"
              }
            );
          }
          
          gsap.to(box, {
            boxShadow: "0 0 40px rgba(0,0,0,0.2)",
            duration: 0.4
          });
        } else {
          // For inactive boxes
          if (title) {
            gsap.to(title, {
              scale: 1,
              y: 0,
              color: "rgba(255,255,255,0.9)",
              fontWeight: "400",
              duration: 0.3,
              ease: "power2.out"
            });
          }
          
          if (desc) {
            gsap.to(desc, {
              opacity: 0.7,
              scale: 1,
              duration: 0.3
            });
          }
          
          if (extContent) {
            gsap.to(extContent, {
              opacity: 0,
              y: 5,
              duration: 0.2,
              onComplete: () => { 
                gsap.set(extContent, { display: 'none' }); 
              }
            });
          }
          
          if (button) {
            gsap.to(button, {
              opacity: 0,
              y: 5,
              duration: 0.2,
              onComplete: () => { 
                gsap.set(button, { display: 'none' }); 
              }
            });
          }
          
          gsap.to(box, {
            boxShadow: "none",
            duration: 0.3
          });
        }
      });
    }
    
    return true;
  } catch (error) {
    console.error("Who Are You section initialization error:", error);
    return false;
  }
}

// Window resize handler to refresh ScrollTrigger
window.addEventListener('resize', () => {
  clearTimeout(window.resizeTimer);
  window.resizeTimer = setTimeout(() => {
    console.log("Window resized, refreshing ScrollTrigger");
    ScrollTrigger.refresh();
  }, 250);
});