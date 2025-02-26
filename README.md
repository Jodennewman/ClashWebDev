# Creative3 Website

This project uses TypeScript for animations and interactions, leveraging GSAP for smooth animations and ScrollTrigger for scroll-based effects.

## Project Structure

- `src/` - Contains all TypeScript source files
  - `main.ts` - Main entry point that initializes all animations
  - `serpentine.ts` - Animations for the serpentine section
  - `StatsAnimations.ts` - Animations for the stats section
  - `horizontalSections.ts` - Handling of horizontal scrolling sections
  - `Hero.ts` and `Hero2.ts` - Hero section animations
  - `utils/` - Utility functions and helpers

- `public/` - Static assets and compiled JavaScript
  - `js/` - Compiled JavaScript files
  - `assets/` - Images, SVGs, and other assets

- `index.html` - Main HTML file

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Development

To start the development server:

```bash
npm run dev
```

This will start a local development server with hot reloading.

### Building for Production

To build the project for production:

```bash
npm run build
```

Or use the build script:

```bash
./build.sh
```

This will compile the TypeScript files and output them to the `dist` directory.

## Converting from JavaScript to TypeScript

The project was originally using JavaScript for animations but has been converted to TypeScript for better type safety and maintainability. The main changes include:

1. Creating proper TypeScript files with type definitions
2. Organizing code into modules with proper imports/exports
3. Creating a main entry point (`main.ts`) that initializes all animations
4. Setting up proper build tools with Vite and TypeScript

## Animation Features

- **Serpentine Path Animation**: The serpentine path is animated using GSAP's DrawSVG plugin, drawing the path as the user scrolls.
- **Split Screen Scrolling**: The left content is pinned while the right content scrolls, creating an interesting visual effect.
- **Rotating Star**: The star in the "F*CKING" text rotates continuously.
- **Text Animations**: Text elements fade in and slide into place as the user scrolls.
- **Decorative Elements**: Various decorative elements are animated with rotation and scaling effects.

## Customizing Animations

To customize the animations, edit the corresponding TypeScript files in the `src` directory. After making changes, rebuild the project to see the changes in action. 