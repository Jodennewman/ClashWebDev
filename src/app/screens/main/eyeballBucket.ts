// src/app/screens/main/eyeballBucket.ts

import { Container, Graphics, GraphicsContext, Sprite, Texture } from "pixi.js";

export class EyeballBucket {
  public container: Container;

  private bucketCtx: GraphicsContext; // v8 approach
  private bucketShape: Graphics;
  private eyeballs: Sprite[] = [];
  private eyeballTextures: Texture[];
  private isFull = false;
    
  constructor() {
    // The top-level container
    this.container = new Container();

    // 1) Create a GraphicsContext
    this.bucketCtx = new GraphicsContext();

    // 2) Build geometry with chainable calls
    const scaleFactor = 0.2;

    // Instead of "LineStyle", use "lineStyle" (note the lowercase 'l'):
this.bucketCtx.setStrokeStyle({
  width: 119.3 * scaleFactor,
  color: 0xff976c,
  alpha: 1.0,
  alignment: 0.5
});

    // Move & draw path: M807,0 c0,196-167.3,355-373.7,355 S59.7,196,59.7,0
    this.bucketCtx.moveTo(807 * scaleFactor, 0);

    this.bucketCtx.bezierCurveTo(
      807 * scaleFactor,
      196 * scaleFactor,         // ctrl1 x,y
      (807 - 167.3) * scaleFactor,
      355 * scaleFactor,         // ctrl2 x,y
      (807 - 373.7) * scaleFactor,
      355 * scaleFactor          // end x,y
    );

    // Approximate the “S59.7,196,59.7,0” with lineTos:
    this.bucketCtx.lineTo(59.7 * scaleFactor, 196 * scaleFactor);
    this.bucketCtx.lineTo(59.7 * scaleFactor, 0);

    // 3) Make a Graphics from the context
    this.bucketShape = new Graphics(this.bucketCtx);

    // 4) Add shape to main container
    this.container.addChild(this.bucketShape);

    // 5) Prepare eyeball textures
    this.eyeballTextures = [Texture.from("eyeballFlat.svg")];
  }

  /** Add this entire EyeballBucket container to a parent container. */
  public show(parent: Container) {
    parent.addChild(this.container);
  }

  public addEyeball() {
    if (this.isFull) return;

    const tex = this.eyeballTextures[
      Math.floor(Math.random() * this.eyeballTextures.length)
    ];
    const ball = new Sprite(tex);
    ball.anchor.set(0.5);

    // Place near center or random offset
    ball.x = (Math.random() * 100) - 50;
    ball.y = (Math.random() * 50) - 25;
    ball.scale.set(0.4);

    this.container.addChild(ball);
    this.eyeballs.push(ball);

    if (this.eyeballs.length >= 20) {
      this.isFull = true;
    }
  }

  public removeEyeball() {
    if (!this.eyeballs.length) return;
    const last = this.eyeballs.pop()!;
    this.container.removeChild(last);
    this.isFull = false;
  }

  /** Called every frame by your main update() loop */
  public update() {
    // e.g., rotate eyeballs
    this.eyeballs.forEach((eb) => {
      eb.rotation += 0.01;
    });
  }

  /** Called by your MainScreen.resize(...) */
  public resize(width: number, height: number) {
    // center the container
    this.container.x = width / 2;
    this.container.y = height / 2;
  }
  
}
