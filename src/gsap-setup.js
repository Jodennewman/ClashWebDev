// gsap-setup.js
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { SplitText } from 'gsap/SplitText';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Physics2DPlugin } from 'gsap/Physics2DPlugin';
import { PixiPlugin } from 'gsap/PixiPlugin';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

// Register all plugins
gsap.registerPlugin(
  ScrollTrigger,
  ScrollSmoother,
  DrawSVGPlugin,
  SplitText,
  MotionPathPlugin,
  Physics2DPlugin,
  PixiPlugin,
  ScrambleTextPlugin
);

export { gsap, ScrollTrigger, ScrollSmoother };