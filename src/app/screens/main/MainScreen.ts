import { FancyButton } from "@pixi/ui";
import { animate } from "motion";
import type { AnimationPlaybackControls } from "motion/react";
import type { Ticker } from "pixi.js";
import { Container } from "pixi.js";

import { engine } from "../../getEngine";
import { PausePopup } from "../../popups/PausePopup";
import { SettingsPopup } from "../../popups/SettingsPopup";
import { Button } from "../../ui/Button";

// 1) Import your new EyeballBucket class
import { EyeballBucket } from "./eyeballBucket";

/** The screen that holds the main app logic */
export class MainScreen extends Container {
  /** Assets bundles required by this screen */
  public static assetBundles = ["main"];

  public mainContainer: Container;
  private pauseButton: FancyButton;
  private settingsButton: FancyButton;
  private addButton: FancyButton;
  private removeButton: FancyButton;

  // 2) Replace "bouncer" with "eyeballBucket"
  private eyeballBucket: EyeballBucket;
  private paused = false;

  constructor() {
    super();

    this.mainContainer = new Container();
    this.addChild(this.mainContainer);

    // 3) Create EyeballBucket
    this.eyeballBucket = new EyeballBucket();

    // Example button animations
    const buttonAnimations = {
      hover: {
        props: {
          scale: { x: 1.1, y: 1.1 },
        },
        duration: 100,
      },
      pressed: {
        props: {
          scale: { x: 0.9, y: 0.9 },
        },
        duration: 100,
      },
    };

    // 4) Pause Button
    this.pauseButton = new FancyButton({
      defaultView: "icon-pause.png",
      anchor: 0.5,
      animations: buttonAnimations,
    });
    this.pauseButton.onPress.connect(() =>
      engine().navigation.presentPopup(PausePopup)
    );
    this.addChild(this.pauseButton);

    // 5) Settings Button
    this.settingsButton = new FancyButton({
      defaultView: "icon-settings.png",
      anchor: 0.5,
      animations: buttonAnimations,
    });
    this.settingsButton.onPress.connect(() =>
      engine().navigation.presentPopup(SettingsPopup)
    );
    this.addChild(this.settingsButton);

    // 6) Add Button
    this.addButton = new Button({
      text: "Add Eyeball",
      width: 175,
      height: 110,
    });
    // Instead of this.bouncer.add(), call eyeballBucket
    this.addButton.onPress.connect(() => this.eyeballBucket.addEyeball());
    this.addChild(this.addButton);

    // 7) Remove Button
    this.removeButton = new Button({
      text: "Remove Eyeball",
      width: 175,
      height: 110,
    });
    // Instead of bouncer.remove(), call eyeballBucket
    this.removeButton.onPress.connect(() => this.eyeballBucket.removeEyeball());
    this.addChild(this.removeButton);
  }

  /** Prepare the screen just before showing */
  public prepare() {}

  /** Update the screen each frame/tick */
  public update(_time: Ticker) {
    if (this.paused) return;
    // 8) Update eyeball bucket
    this.eyeballBucket.update();
  }

  /** Pause gameplay - automatically fired when a popup is presented */
  public async pause() {
    this.mainContainer.interactiveChildren = false;
    this.paused = true;
  }

  /** Resume gameplay */
  public async resume() {
    this.mainContainer.interactiveChildren = true;
    this.paused = false;
  }

  /** Fully reset if needed */
  public reset() {}

  /** Handle resizing */
  public resize(width: number, height: number) {
    const centerX = width * 0.5;
    const centerY = height * 0.5;

    this.mainContainer.x = centerX;
    this.mainContainer.y = centerY;

    this.pauseButton.x = 30;
    this.pauseButton.y = 30;

    this.settingsButton.x = width - 30;
    this.settingsButton.y = 30;

    this.removeButton.x = width / 2 - 100;
    this.removeButton.y = height - 75;

    this.addButton.x = width / 2 + 100;
    this.addButton.y = height - 75;

    // 9) Let the EyeballBucket know about new width/height
    this.eyeballBucket.resize(width, height);
  }

  /** Show screen with any transitions */
  public async show(): Promise<void> {
    engine().audio.bgm.play("main/sounds/bgm-main.mp3", { volume: 0.5 });

    const elementsToAnimate = [
      this.pauseButton,
      this.settingsButton,
      this.addButton,
      this.removeButton,
    ];

    let finalPromise!: AnimationPlaybackControls;
    for (const element of elementsToAnimate) {
      element.alpha = 0;
      finalPromise = animate(
        element,
        { alpha: 1 },
        { duration: 0.3, delay: 0.75, ease: "backOut" }
      );
    }

    await finalPromise;

    // 10) Add the eyeball bucket container to the screen
    this.eyeballBucket.show(this.mainContainer);
  }

  /** Hide screen with animations if needed */
  public async hide() {}

  /** Auto pause the app if window loses focus */
  public blur() {
    if (!engine().navigation.currentPopup) {
      engine().navigation.presentPopup(PausePopup);
    }
  }
}