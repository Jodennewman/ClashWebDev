import { Application, Assets, Circle, Container, DisplacementFilter, Graphics, Sprite } from 'pixi.js';
import gsap from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';
import { progress } from 'motion'; // if you need it
import { mm } from "./utils/gsapMatchMedia";


(async () =>
{
    // ==================================
    // 1) CREATE THE PIXI APPLICATION
    // ==================================
    const app = new Application();
    await app.init({
        background: "#000000",
        resizeTo: window,
        antialias: true,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
        backgroundAlpha: 0
    });

    

    gsap.registerPlugin(PixiPlugin, ScrollTrigger, Physics2DPlugin, MotionPathPlugin, EasePack, MotionPathHelper);

    // Attach the Pixi canvas
    document.getElementById("pixi-container-hero")?.appendChild(app.canvas);

    // ==================================
    // 2) LOAD ASSETS
    // ==================================
    await Assets.load([
        '/assets/main/simplePipe.webp',
        '/assets/main/simplePipeTop.webp',
        '/assets/main/PipeDispMap.webp',
        // Eyeballs
        '/assets/main/eyeballSprite1.webp',
        '/assets/main/eyeballSprite2.webp',
        '/assets/main/eyeballSprite3.webp',
        '/assets/main/eyeballSprite4.svg',
        '/assets/main/eyeballSprite5.webp',
        '/assets/main/eyeballSprite6.webp',
    ]);    
    /*const eyeballSVG = await Assets.load({
        src: '/assets/main/eyeballSprite1.svg',
        data: {
            parseAsGraphicsContext: true,
        },
    });*/

    app.stage.eventMode = 'static';

    // ==================================
    // 3) SET UP PIPE & DISPLACEMENT
    // ==================================
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

    // ==================================
    // 4) MIDDLE CONTAINER FOR EYEBALLS
    // ==================================
    const pipeMiddleContainer = new Container();
    pipeContainer.addChildAt(pipeMiddleContainer, pipeContainer.getChildIndex(pipeSpriteTop));

    // ==================================
    // 5) EYEBALL SPAWNING
    // ==================================
    // Create random eyeballs with unique displacement
    function spawnEyeball(): Container
    {
        const eyeballContainer = new Container();

        // 1) Random eyeball sprite
        const randomIndex = Math.floor(Math.random() * 6) + 1;
        const newRandom = randomIndex === 4 ? 5 : randomIndex;
       const eyeballSprite = Sprite.from(`/assets/main/eyeballSprite${newRandom}.webp`);
       // const eyeballSprite = new Graphics(eyeballSVG);
        eyeballSprite.anchor.set(0.5);
        eyeballSprite.scale.set(0.2);

        // 2) Each eyeball’s own displacement
        const eyeDispSprite = Sprite.from('/assets/main/PipeDispMap.webp');
        eyeDispSprite.texture.source.addressMode = 'clamp-to-edge';
        eyeDispSprite.anchor.set(-0.05);

        const eyeDispFilter = new DisplacementFilter(eyeDispSprite);
        eyeDispFilter.padding = 20;
        // Start with a moderate scale so you actually see distortion
        eyeDispFilter.scale.set(30, 30);

       // pipeSprite.filters = [...currentFilters, eyeDispFilter];
      //  pipeSpriteTop.filters = [...currentFilters, eyeDispFilter];
    
       // eyeballContainer.addChild(eyeDispSprite);
        eyeballContainer.addChild(eyeballSprite);

        return eyeballContainer;
    }

    function spawnMultipleEyeballs(count: number, startX: number, startY: number)
    {
        for (let i = 0; i < count; i++)
        {
            const eContainer = spawnEyeball();
            eContainer.scale.set(0.1);
            pipeMiddleContainer.addChild(eContainer);
            let randomX = window.innerWidth/(Math.random() * 0.6 + 1.4);
            // Place at pipe tip (or base)
            eContainer.x = startX;
            eContainer.y = startY;
            let delayAmount = i * Math.random()/10
            let tween = gsap.to(eContainer, {
                alpha: 1,
                motionPath: {
                    path: [{x: startX, y: startY}, {x: startX - (randomX), y: startY+450}, {x: startX - (randomX), y: startY+1300}],
                    curviness: Math.random() * 1.3 + 1.7
                },
                duration: 1.2,
                delay: delayAmount,
                ease: "slow(0.7, 0.55)"
            })
            let tween2 = gsap.to(eContainer.children, {
                rotation: (Math.random()-0.5) > 0 ? 7 : -7,
                duration: 1.2,
                delay: delayAmount,
                ease: "power3.out",
            }, "<");
            let tweenScale = gsap.to( eContainer.scale, {
                x: 1,
                y: 1,
                duration: 0.2,
                delay: delayAmount,
                ease: "power4.in"
            })

            let yoyoScale = gsap.to( eContainer.scale, {
                x: 1.4,
                y: 1.4,
                ease: "slow(0.4, 0.55, true)",
                delay: delayAmount,
                duration: 0.8,
            })
            
            mainTL.add(tweenScale, 0.3)
            mainTL.add(tween, 0.55);
            mainTL.add(tween2, 0.55)
            mainTL.add(yoyoScale, 0.75)
        }
    }

    // The “main eyeball” that we might keep center
    let mainEyeContainer: Container | null = null;

    function spawnMainEyeball(startX: number, startY: number)
    {
        mainEyeContainer = spawnEyeball();
        mainEyeContainer.scale.set(0.1);
   //     mainEyeContainer.children[0].tint = 0xff00ff;
        pipeMiddleContainer.addChild(mainEyeContainer);

        mainEyeContainer.x = startX;
        mainEyeContainer.y = startY;

        // Animate it upward or outward
        let tween = gsap.to(mainEyeContainer, {
            alpha: 1,
            motionPath: {
                path: [{x: startX, y: startY}, {x: startX - (window.innerWidth/1.9  ), y: startY+480}, {x: startX - (window.innerWidth/1.9), y: startY+550}],
                curviness: 2.1
            },
            duration: 1.35,
            ease: "slow(0.4, 0.8)",
           /* onUpdate: self =>
                {
                    if (!mainEyeContainer) return; // Only do the center logic after the main eyeball is spawned
    
                    // Keep the main eyeball in the center of the screen
                    pipeContainer.x = (window.innerWidth / 2) - mainEyeContainer.x;
                    pipeContainer.y = (window.innerHeight / 2) - mainEyeContainer.y;
                } */
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
        })

        let yoyoScale = gsap.to( mainEyeContainer.scale, {
            x: 1.4,
            y: 1.4,
            ease: "slow(0.4, 0.55, true)",
            duration: 0.8,
        })

        let tweenRotate = gsap.to(mainEyeContainer.children, {
            rotation: 12,
            duration: 1.5,
            ease: "power3.out",
        });
        
        mainTL.add(tweenRotate, 1.3)
        mainTL.add(tween, 1.3)
        mainTL.add(tween2, 0.3)
        mainTL.add(tween3, 3.2)
        mainTL.add(yoyoScale, 1.5)
    };

    // ==================================
    // 6) SINGLE SCROLLTRIGGER TIMELINE
    // ==================================
    // Pinned from "top top" to an extra 1500px. Adjust as needed.
    const mainTL = gsap.timeline({
        scrollTrigger: {
            trigger: "#heroSection",
            start: "top top",
            end: "+=1500",
            pinSpacing: false,
            scrub: 1,
            pin: true,
            markers: true,
            // We'll do onUpdate if you want mainEye pinned center:
            
        }
    });
    console.log("ScrollTrigger is:", ScrollTrigger);

    // Step A: animate displacement from scale(0,100)->(0,0), x:500->-pipeContainer.width/4
    mainTL.to(displacementSprite, {
        x: -pipeContainer.width / 4,
        duration: 1
    }, 0);

    mainTL.to(displacementFilter.scale, {
        x: 0,
        y: 0,
        duration: 1
    }, 0);

    // Move pipe up a bit (optional)
    mainTL.to(pipeContainer.position, {
        y: "+=36.3",
        duration: 1
    }, 0); 

    // Step B: Spawn multiple eyeballs
    function getPipeTipLocal(): { x:number, y:number } {
        const globalPos = pipeSpriteTop.toGlobal({ x: window.innerWidth/5.5, y: 290 });
        return pipeMiddleContainer.toLocal(globalPos);
    }

    // at ~30% scroll
    mainTL.call(() => {
        const tip = getPipeTipLocal();
        spawnMultipleEyeballs(20, tip.x, tip.y);
    }, [], 0);

    // Step C: Spawn main eyeball at ~60%
    mainTL.call(() => {
        const tip = getPipeTipLocal();
        spawnMainEyeball(tip.x, tip.y);
    }, [], 0);

    mainTL.to(pipeContainer, {
        y: pipeContainer.y -800,
        x: pipeContainer.x + window.innerWidth*0.12,
        duration: 1.2,
        ease: "power3.Out"
      }, 1.3    )
      .to("#titleWrapper", {
        y: "-=800",
        x: window.innerWidth*0.12,
        duration: 1.2,
        ease: "power3.Out"
      }, "<").to(".hero-bg", {
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
      

    // When eyeball falls, animate design grid away
    function animateDesignGrid(direction = "away") {
        const designGrid = document.querySelector('.design-grid');
        if (direction === "away") {
            gsap.to(designGrid, {
                y: "150vh",
                x: "10vw",
                scale: 0.8,
                opacity: 0,
                duration: 0.8,
                ease: "power3.in",
                delay: 0.1
            });
        } else {
            // Reset animation if needed
            gsap.to(designGrid, {
                y: 0,
                x: 0,
                scale: 1,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out"
            });
        }
    }
      

      mainTL.to("#app1", {
        scale: 0.1,
        duration: 2.4,
        ease: "expo.in"
      }, ">-0.3");
      
})();