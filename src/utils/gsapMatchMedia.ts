// gsapMatchMedia.ts (shared utility module)
import { gsap } from "gsap";

const mm = gsap.matchMedia();

mm.add(
  {
    isMobile: "(max-width: 768px)",
    isTablet: "(min-width: 769px) and (max-width: 1024px)",
    isDesktop: "(min-width: 1025px)",
    reduceMotion: "(prefers-reduced-motion: reduce)"
  },
  (context) => {
    const isMobile = context.conditions?.isMobile ?? false;
    const isTablet = context.conditions?.isTablet ?? false;
    const isDesktop = context.conditions?.isDesktop ?? false;
    const reduceMotion = context.conditions?.reduceMotion ?? false;

    // Possibly store them in a global store or export them
    console.log("Media Query State =>", { isMobile, isTablet, isDesktop, reduceMotion });

    return () => {
      console.log("Cleaning up for these conditions...");
    };
  }
);

export default mm;