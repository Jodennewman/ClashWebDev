"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initHero2 = initHero2;
const pixi_js_1 = require("pixi.js");
const main_1 = require("./main");
const animation_service_1 = require("./services/animation-service");
const gsap_setup_1 = require("./utils/gsap-setup");
console.log('Hero2.ts loaded');
function initHero2() {
    const container = document.getElementById("pixi-container");
    if (!container) {
        console.error("Hero container not found");
        return;
    }
    console.log("Initializing Hero2 Section");
    // Don't create a new ScrollSmoother - use the one from animation-service
    // Create scroll trigger for this section
    gsap_setup_1.ScrollTrigger.create({
        trigger: "#heroSection2",
        start: "top top",
        end: "+=2000",
        scrub: true,
        scroller: "#smooth-content",
        pin: true,
        id: "hero2Pin", // Add an ID for debugging
        onEnter: () => console.log("Hero2 section entered view"),
        onLeave: () => console.log("Hero2 section left view")
    });
    return (() => __awaiter(this, void 0, void 0, function* () {
        var _a;
        // 1️⃣ Initialize PixiJS Application
        const app = new pixi_js_1.Application();
        yield app.init({
            background: "#000000",
            resizeTo: window,
            antialias: true,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundAlpha: 0
        });
        (_a = document.getElementById("pixi-container")) === null || _a === void 0 ? void 0 : _a.appendChild(app.canvas);
        /*const heroSection2 = document.querySelector('#heroSection2') as HTMLElement;
        if (heroSection2) {
            gsap.set(heroSection2, { opacity: 0 }); // Set initial state
        }*/
        // 🎨 **Create a Container for the Entire Scene**
        const sceneContainer = new pixi_js_1.Container();
        // ✅ Move Pivot to the Center of the Screen
        sceneContainer.pivot.set(window.innerWidth / 2, window.innerHeight / 2);
        // ✅ Position the Container at the Center
        sceneContainer.position.set(window.innerWidth / 2, window.innerHeight / 2);
        sceneContainer.scale.set(1);
        app.stage.addChild(sceneContainer);
        // 2️⃣ Load Eyeball Textures
        const eyeballTextures = yield Promise.all([
            pixi_js_1.Assets.load("/assets/main/eyeballSprite1.svg"),
            pixi_js_1.Assets.load("/assets/main/eyeballSprite2.svg"),
            pixi_js_1.Assets.load("/assets/main/eyeballSprite3.svg"),
            pixi_js_1.Assets.load("/assets/main/eyeballSprite4.svg"),
            pixi_js_1.Assets.load("/assets/main/eyeballSprite5.svg"),
            pixi_js_1.Assets.load("/assets/main/eyeballSprite6.svg"),
        ]);
        const MAX_EYEBALLS = 290;
        // 3️⃣ Initialize Matter.js Physics Engine
        const engine = main_1.Matter.Engine.create();
        const world = engine.world;
        engine.gravity.y = 1;
        // 4️⃣ Create the Bucket (Based on SVG)
        function createBucket() {
            const x = window.innerWidth / 2;
            const y = window.innerHeight / 2 - 100; // Adjusted so it's visible
            // 🎨 **PixiJS Graphics for the Bucket**
            const bucket = new pixi_js_1.Graphics();
            bucket.arc(0, 0, 270, Math.PI + 0.05, 2 * Math.PI - 0.05, true); // Draws the bottom open arc
            bucket.stroke({ width: 60, color: 0xff976c });
            // ✅ Position Fix
            bucket.position.x = x;
            bucket.position.y = y;
            // ✅ Add Bucket to Scene Container Instead of `app.stage`
            sceneContainer.addChild(bucket);
            console.log("✅ Bucket added to scene");
            // 🟠 **Matter.js Static Physics Bodies**
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
                const segment = main_1.Matter.Bodies.rectangle((x1 + x2) / 2, (y1 + y2) / 2, 60, 100, {
                    isStatic: true,
                    angle: angleStart + Math.PI / segmentCount,
                    render: { visible: true }
                });
                bucketSegments.push(segment);
            }
            main_1.Matter.World.add(world, bucketSegments);
        }
        // 5️⃣ Create Eyeballs (Physics + Pixi Graphics)
        const eyeballs = [];
        function createEyeball() {
            if (eyeballs.length >= MAX_EYEBALLS)
                return; // 🛑 Prevent spawning if full
            const spawnX = window.innerWidth / 2 + (Math.random() * 10 - 5);
            const spawnY = Math.random() * -50;
            const radius = Math.random() * 7 + 7;
            const originalRadius = radius;
            const randomTexture = eyeballTextures[Math.floor(Math.random() * eyeballTextures.length)];
            const sprite = new pixi_js_1.Sprite(randomTexture);
            sprite.width = sprite.height = radius * 2;
            sprite.anchor.set(0.5);
            sprite.x = spawnX;
            sprite.y = spawnY;
            const hue = Math.random() * (55 - 25) + 30;
            sprite.tint = (0, main_1.hsl)(hue, Math.random() * 50 + 50, Math.random() * 20 + 80);
            // ✅ Add Eyeballs to Scene Container Instead of `app.stage`
            sceneContainer.addChild(sprite);
            const body = main_1.Matter.Bodies.circle(spawnX, spawnY, radius + 1, { restitution: 0.005, friction: 0.2, density: 0.2 });
            main_1.Matter.World.add(world, body);
            eyeballs.push({ sprite, body, originalRadius });
        }
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
                    if (isMouseDown)
                        forceMagnitude *= 50;
                    const forceX = (dx / distance) * forceMagnitude;
                    const forceY = (dy / distance) * forceMagnitude;
                    main_1.Matter.Body.applyForce(body, body.position, { x: forceX, y: forceY });
                }
            });
        });
        let spawnInterval = null;
        setInterval(() => { createEyeball(); }, 40);
        const bowlTL = animation_service_1.gsap.timeline({
            scrollTrigger: {
                trigger: "#heroSection2",
                scroller: "#smooth-content",
                start: "top top",
                pin: true,
                scrub: 1,
                end: "+=2000",
                onEnter: () => {
                    engine.gravity.y = 1; // 🟢 Restore normal gravity
                    setTimeout(() => {
                        if (!spawnInterval) {
                            spawnInterval = setInterval(() => {
                                createEyeball();
                            }, 20);
                        }
                    }, 300);
                },
                onLeave: () => {
                    engine.gravity.y = -1; // 🔴 Reverse gravity so eyeballs float up
                    setTimeout(() => {
                        clearEyeballs(); // Remove after they have floated
                    }, 600); // Adjust timing as needed
                    if (spawnInterval) {
                        clearInterval(spawnInterval);
                        spawnInterval = null;
                    }
                },
                onEnterBack: () => {
                    engine.gravity.y = 1; // 🟢 Restore normal gravity when scrolling back
                    if (!spawnInterval) {
                        spawnInterval = setInterval(() => {
                            createEyeball();
                        }, 7);
                    }
                },
                onLeaveBack: () => {
                    setTimeout(() => {
                        engine.gravity.y = -1; // 🔴 Reverse gravity again when leaving back up
                        clearEyeballs();
                    }, -1000);
                }
            }
        });
        function TextSplitter(text, charsYes, wordsYes, ease = "none", duration = 1, stagger = 0.1, position = "<") {
            let splitType = !!charsYes && !!wordsYes ? "chars words" : !!charsYes && !wordsYes ? "chars" : !charsYes && !!wordsYes ? "words" : "words";
            let split = new gsap_setup_1.SplitText(text, { type: `${splitType}` });
            console.log(JSON.stringify(split));
            let chars = split.chars || null;
            let words = split.words || null;
            let tl = animation_service_1.gsap.timeline();
            let charsTween = animation_service_1.gsap.from(chars || null, {
                yPercent: 200,
                opacity: 0,
                duration: duration,
                ease: ease,
                stagger: stagger
            });
            let wordsTween = animation_service_1.gsap.from(words || null, {
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
        let billionEyesText = document.querySelector("#billionEyesText");
        let billionEyesAnimation = TextSplitter(billionEyesText, true, true, "elastic.out(1,0.6)", 1.2, 0.05, 0).tl;
        gsap_setup_1.ScrollTrigger.create({
            trigger: "#billionEyesText",
            scroller: "#smooth-content",
            start: "middle 80%",
            end: "bottom top",
            pin: false,
            scrub: false,
            toggleActions: "play none none reverse",
            animation: billionEyesAnimation
        });
        /*  gsap.from("#billionEyesText", {
           yPercent: 130,
           opacity:0,
           duration: 1.5,
           ease: "elastic.out(1,0.6)",
           scrollTrigger: {
             trigger: "#billionEyesText",
             start: "middle 60%",
             pin: false,
             scrub: false,
             toggleActions: "play none none reverse"
           }
         }); */
        function clearEyeballs() {
            eyeballs.forEach(({ body, sprite }) => {
                main_1.Matter.World.remove(world, body); // Remove from Matter.js physics world
                sceneContainer.removeChild(sprite); // Remove from PixiJS scene
            });
            eyeballs.length = 0; // Reset the array
        }
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
            // Borrow from seconds → minutes
            if (seconds < 0) {
                minutes--;
                seconds = 60 + seconds;
            }
            // Borrow from minutes → hours
            if (minutes < 0) {
                hours--;
                minutes = 60 + minutes;
            }
            // Borrow from hours → days
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
            updateCounter(); // Run immediately
            setInterval(updateCounter, 1000); // ✅ Update every second
        }
        function formatTimeSince(timeObj) {
            const { years, months, days, hours, minutes, seconds } = timeObj;
            const yearLabel = pluralize(years, "Year", "Years");
            const monthLabel = pluralize(months, "Month", "Months");
            const dayLabel = pluralize(days, "Day", "Days");
            const hoursLabel = pluralize(hours, "Hour", "Hours");
            const minutesLabel = pluralize(days, "Minute", "Minutes");
            const secondsLabel = pluralize(days, "Second", "Seconds");
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
        // 1) Choose your start date
        const myStartDate = new Date("2023-03-04"); // e.g. January 1, 2020
        updateTimeSince(myStartDate);
        // 2) Calculate the time since that date
        const elapsed = getTimeSince(myStartDate);
        // 3) Build a text message (customize as you like)
        // 4) Place it in the container
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
            /*   .to("#heroSection2", {
                 opacity: 1,
                 duration: 0.2,
                 ease: "expo.out"
             },  0) */
            .from(sceneContainer.position, {
            y: 1400,
            duration: 1.2,
            ease: "expo.out",
        }, 0);
        bowlTL.fromTo(engine.gravity, { y: -40 }, { y: 1, duration: 0.4, ease: "power4.out" }, 0);
        const container = document.getElementById("dateSince");
        bowlTL.from(container, {
            opacity: 0,
            y: "+=200",
            duration: 1.2,
            ease: "power3.inOut",
        }, 0.5);
        if (container) {
            console.log("Updating dateSince container:", formatTimeSince(elapsed));
            container.innerHTML = formatTimeSince(elapsed);
        }
        // animating the date since text
        function update() {
            main_1.Matter.Engine.update(engine);
            eyeballs.forEach((obj, index) => {
                obj.sprite.x = obj.body.position.x;
                obj.sprite.y = obj.body.position.y;
                obj.sprite.rotation = obj.body.angle;
                // ✅ Get velocity magnitude and direction
                const velocityX = obj.body.velocity.x;
                const velocityY = obj.body.velocity.y;
                const velocityMagnitude = Math.sqrt(Math.pow(velocityX, 2) + Math.pow(velocityY, 2)) || 0.001; // Avoid division by zero
                // ✅ Compute movement direction (angle) from velocity
                const velocityAngle = Math.atan2(velocityY, velocityX); // Angle in radians
                // ✅ Define squash & stretch factors based on velocity
                const stretchFactor = Math.min(1 + velocityMagnitude * 0.03, 1.3); // Max stretch = 1.3
                const squashFactor = Math.max(1 - velocityMagnitude * 0.05, 0.7); // Min squash = 0.7
                // ✅ Apply scale relative to radius (so all eyeballs scale correctly)
                const newWidth = obj.originalRadius * 2 * squashFactor;
                const newHeight = obj.originalRadius * 2 * stretchFactor;
                // ✅ Only update scale if there's a noticeable change (prevent jitter)
                if (Math.abs(obj.sprite.width - newWidth) > 0.5 ||
                    Math.abs(obj.sprite.height - newHeight) > 0.5) {
                    animation_service_1.gsap.to(obj.sprite, {
                        width: newHeight,
                        height: newWidth,
                        duration: 0.1, // Smooth transition
                        ease: "power2.out"
                    });
                }
                // ✅ Reduce crazy spinning (only update rotation if movement is strong)
                if (velocityMagnitude > 0.5) {
                    animation_service_1.gsap.to(obj.sprite, {
                        rotation: velocityAngle,
                        duration: 0.5, // Smooth rotation
                        ease: "power2.out"
                    });
                }
                // 🔥 If the eyeball falls off the screen, remove it
                if (obj.body.position.y > window.innerHeight + 200 || obj.body.position.y < -200) {
                    main_1.Matter.World.remove(world, obj.body);
                    sceneContainer.removeChild(obj.sprite);
                    eyeballs.splice(index, 1); // Remove from array
                }
            });
            requestAnimationFrame(update);
        }
        createBucket();
        update();
        return app;
    }))();
}
;
