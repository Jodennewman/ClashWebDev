import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

export function initializeScrollAndEyeball() {


    // Eyeball animation functions
    function getGradientPositionFromAngles(angleX: number, angleY: number, movementRadius: number) {
        // Convert angles to radians
        const radX = angleX * Math.PI / 180;
        const radY = angleY * Math.PI / 180;
        
        // Calculate x and y offsets
        const x = Math.sin(radX) * movementRadius;
        const y = Math.sin(radY) * movementRadius;
        
        return { x, y };
    }

    function getScaleFactorFromAngles(angleX: number, angleY: number) {
        // Get absolute angles
        const absX = Math.abs(angleX);
        const absY = Math.abs(angleY);
        
        // Calculate scale based on larger angle
        const maxAngle = Math.max(absX, absY);
        const minScale = 0.7; // Minimum scale at max angle
        const scaleReduction = (1 - minScale) * (maxAngle / 90);
        
        return 1 - scaleReduction;
    }

    function updateEyeball(angleX: number, angleY: number, movementRadius = 20) {
        const gradient = document.querySelector('radialGradient');
        if (!gradient) return;

        // Base values for the gradient
        const baseX = 50;
        const baseY = 50;
        const baseR = 20;

        // Get the XY offset for the pupil
        const { x, y } = getGradientPositionFromAngles(angleX, angleY, movementRadius);
        
        // Scale the gradient for perspective
        const scaleFactor = getScaleFactorFromAngles(angleX, angleY);
        const newRadius = baseR * scaleFactor;
        
        // Apply changes to the radial gradient
        gradient.setAttribute("fx", (baseX + x).toFixed(2));
        gradient.setAttribute("fy", (baseY + y).toFixed(2));
        gradient.setAttribute("r", newRadius.toFixed(2));
    }

    // Return functions for external use
    return {
        updateEyeball,
        getGradientPositionFromAngles,
        getScaleFactorFromAngles
    };
} 