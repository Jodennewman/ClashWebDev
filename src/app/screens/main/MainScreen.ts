// Import dependencies
import * as PIXI from 'pixi.js';
import Matter from 'matter-js';

// Type Definitions
type Eyeball = {
    sprite: PIXI.Sprite;
    body: Matter.Body;
};

// 1️⃣ Create the PIXI Application
const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x000000,
    resolution: window.devicePixelRatio || 1,
    antialias: true
});
document.body.appendChild(app.view as HTMLCanvasElement);

// 2️⃣ Setup Matter.js Physics Engine
const engine: Matter.Engine = Matter.Engine.create();
const world: Matter.World = engine.world;
engine.gravity.y = 1; // Enable gravity

// 3️⃣ Create a Bucket (Physics)
function createBucket(): void {
    const bucketWidth = 250, bucketHeight = 150;
    const x = app.renderer.width / 2;
    const y = app.renderer.height - bucketHeight / 2;

    // Left and right walls
    const leftWall = Matter.Bodies.rectangle(x - bucketWidth / 2, y, 20, bucketHeight, { isStatic: true });
    const rightWall = Matter.Bodies.rectangle(x + bucketWidth / 2, y, 20, bucketHeight, { isStatic: true });
    const bottom = Matter.Bodies.rectangle(x, y + bucketHeight / 2, bucketWidth, 20, { isStatic: true });

    Matter.World.add(world, [leftWall, rightWall, bottom]);

    // Draw the bucket
    const bucket = new PIXI.Graphics();
    bucket.lineStyle(6, 0xff9966);
    bucket.drawRect(x - bucketWidth / 2, y, bucketWidth, bucketHeight);
    app.stage.addChild(bucket);
}

// 4️⃣ Create Eyeballs (Physics + Pixi Graphics)
const eyeballs: Eyeball[] = [];

function createEyeball(x: number, y: number, radius: number): void {
    const eyeballTexture = PIXI.Texture.from('https://upload.wikimedia.org/wikipedia/commons/6/6d/Black_and_White_Eye.svg');
    const sprite = new PIXI.Sprite(eyeballTexture);
    sprite.width = sprite.height = radius * 2;
    sprite.anchor.set(0.5);
    sprite.x = x;
    sprite.y = y;
    app.stage.addChild(sprite);

    const body = Matter.Bodies.circle(x, y, radius, { restitution: 0.7, friction: 0.1 });
    Matter.World.add(world, body);

    eyeballs.push({ sprite, body });
}

// 5️⃣ Spawn Eyeballs at Random Intervals
setInterval(() => {
    const x = Math.random() * (app.renderer.width - 200) + 100;
    createEyeball(x, 50, 20);
}, 1000);

// 6️⃣ Game Loop: Sync Physics with Pixi
function update(): void {
    Matter.Engine.update(engine);
    
    eyeballs.forEach(obj => {
        obj.sprite.x = obj.body.position.x;
        obj.sprite.y = obj.body.position.y;
        obj.sprite.rotation = obj.body.angle;
    });

    requestAnimationFrame(update);
}

// 7️⃣ Initialize Scene
createBucket();
update();