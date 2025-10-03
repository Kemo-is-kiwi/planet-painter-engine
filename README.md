# Exoplanet Discovery Platform

An advanced 3D visualization platform for exoplanet discoveries from Kepler, K2, and TESS space telescope data. Integrates with ML classification models to display interactive planetary systems with support for binary stars.

## Features

- 🌍 **Interactive 3D Visualization** - Rotate, zoom, and explore exoplanetary systems
- ⭐ **Binary Star Support** - Visualize planets orbiting binary star systems  
- 🤖 **ML Model Integration** - Connect your Kepler/K2/TESS detection models
- 📊 **Classification Analysis** - Display reasoning for planet vs false positive classifications
- 🎨 **Cosmic UI Design** - Beautiful space-themed interface with custom CSS
- 📱 **Responsive Design** - Works on desktop and mobile devices

## Quick Start

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

## Integration Guide

See [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md) for detailed instructions on:
- Folder structure
- Integrating your ML model
- API integration examples
- Customizing 3D visualizations
- Deployment instructions

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Three.js** - 3D graphics
- **React Three Fiber** - React renderer for Three.js
- **React Router** - Routing
- **Vite** - Build tool

## Project Structure

```
src/
├── components/        # Reusable UI components
├── pages/            # Page components (Index, Results)
├── styles/           # Custom CSS styles
├── types/            # TypeScript type definitions
└── utils/            # Utility functions and API integration
```

## Model Output Format

Your ML model should return JSON with these fields:
- `is_planet` - Boolean classification
- `confidence_score` - Classification confidence (0-100)
- `planet_radius_earth` - Planet radius in Earth radii
- `orbital_distance_au` - Orbit radius in AU
- `is_binary_system` - Whether host is binary star
- `evidence_factors` - Array of classification reasoning
- See [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md) for complete format

## Customization

All styling uses custom CSS (minimal Tailwind usage as requested). Edit:
- `src/styles/exoplanet.css` - Component styles
- `src/index.css` - Design system tokens
- `src/components/ExoplanetVisualization.tsx` - 3D rendering

## License

MIT
