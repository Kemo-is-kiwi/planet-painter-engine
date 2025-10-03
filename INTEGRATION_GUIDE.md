# Exoplanet Discovery Platform - Integration Guide

## Overview
This platform visualizes exoplanet discovery results from Kepler, K2, and TESS ML models with interactive 3D rendering.

## Folder Structure

```
exoplanet-discovery-platform/
├── src/
│   ├── components/
│   │   ├── ExoplanetVisualization.tsx  # Main 3D visualization component
│   │   ├── Navbar.tsx                   # Navigation bar
│   │   └── StarField.tsx                # Animated star background
│   ├── pages/
│   │   ├── Index.tsx                    # Landing page
│   │   ├── Results.tsx                  # Results viewer with 3D model
│   │   └── NotFound.tsx                 # 404 page
│   ├── styles/
│   │   └── exoplanet.css               # Custom CSS (no Tailwind classes used)
│   ├── types/
│   │   └── exoplanet.ts                # TypeScript type definitions
│   ├── utils/
│   │   └── apiIntegration.ts           # API integration utilities
│   ├── App.tsx                          # Main app component with routing
│   ├── index.css                        # Design system (semantic tokens)
│   └── main.tsx                         # App entry point
├── index.html
├── package.json
└── README.md
```

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

Key dependencies installed:
- `three@^0.160.0` - 3D graphics library
- `@react-three/fiber@^8.18.0` - React renderer for Three.js
- `@react-three/drei@^9.122.0` - Useful helpers for React Three Fiber
- Other React ecosystem packages (React Router, TanStack Query, etc.)

### 2. Run Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:8080`

### 3. Build for Production
```bash
npm run build
```

## Integrating Your ML Model

### Option 1: File Upload Integration

Update `src/pages/Results.tsx` to handle your JSON file format:

```typescript
import { parseModelResultsFile } from '@/utils/apiIntegration';

const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) return;

  setLoading(true);
  
  try {
    const result = await parseModelResultsFile(file);
    setResult(result);
  } catch (error) {
    console.error('Error parsing file:', error);
    // Show error toast
  } finally {
    setLoading(false);
  }
};
```

### Option 2: API Integration

Update `src/utils/apiIntegration.ts` with your model's API endpoint:

```typescript
export async function fetchModelPrediction(inputData: any): Promise<ExoplanetResult> {
  const response = await fetch('https://your-model-api.com/predict', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: JSON.stringify(inputData),
  });

  const modelOutput = await response.json();
  return transformModelOutput(modelOutput);
}
```

## Expected Model Output Format

Your ML model should output JSON in this format (adjust `transformModelOutput` in `apiIntegration.ts` if different):

```json
{
  "is_planet": true,
  "confidence_score": 94.7,
  "planet_radius_earth": 0.8,
  "orbital_distance_au": 4.5,
  "is_binary_system": true,
  "telescope_data_source": "TESS Sector 14",
  "detection_date": "2024-01-15",
  "estimated_temperature_k": 285,
  "host_star_classification": "G-type main sequence (Binary)",
  "evidence_factors": [
    "Consistent transit depth across multiple observations",
    "No significant secondary eclipse detected",
    "Transit duration matches theoretical predictions"
  ],
  "suggested_planet_color": "#4facfe",
  "primary_star_color": "#ffd93d",
  "secondary_star_color": "#ff6b6b"
}
```

## Customizing the 3D Visualization

### Adjust Planet Appearance
Edit `src/components/ExoplanetVisualization.tsx`:

```typescript
// Change planet material properties
<meshStandardMaterial 
  color={color} 
  roughness={0.7}  // 0 = smooth, 1 = rough
  metalness={0.3}  // 0 = non-metallic, 1 = metallic
/>
```

### Modify Orbit Speed
```typescript
// In AnimatedPlanet component
groupRef.current.rotation.y += 0.001 * speed; // Adjust multiplier
```

### Add Atmospheric Glow
```typescript
<Sphere args={[radius * 1.1, 32, 32]} position={position}>
  <meshBasicMaterial 
    color={color} 
    transparent 
    opacity={0.2}
  />
</Sphere>
```

## Styling Customization

All styles are in `src/styles/exoplanet.css` using custom CSS (no Tailwind classes in components).

### Change Color Scheme
Edit design tokens in `src/index.css`:

```css
:root {
  --space-black: 220 20% 8%;
  --stellar-blue: 210 80% 55%;
  --planet-teal: 180 70% 50%;
  /* ... other colors */
}
```

### Adjust Card Styles
Edit in `src/styles/exoplanet.css`:

```css
.card {
  background: hsl(230 25% 12% / 0.6);
  border-radius: 1rem;
  padding: 2rem;
  /* ... */
}
```

## Deployment

### Deploy to Vercel/Netlify
```bash
npm run build
```

Upload the `dist/` folder or connect your Git repository.

### Environment Variables
If using API integration, set environment variables:
- `VITE_MODEL_API_URL` - Your ML model API endpoint
- `VITE_MODEL_API_KEY` - API authentication key

Access in code:
```typescript
const API_URL = import.meta.env.VITE_MODEL_API_URL;
```

## API Endpoints for Your Backend

If you want to create a backend API for your model, here's a suggested structure:

### POST /api/predict
**Request:**
```json
{
  "lightCurveData": [...],
  "telescopeSource": "TESS",
  "candidateId": "TIC-123456"
}
```

**Response:**
```json
{
  "is_planet": true,
  "confidence_score": 94.7,
  // ... other fields as shown above
}
```

### GET /api/results/:id
Retrieve previously computed results by ID.

## Troubleshooting

### 3D Scene Not Rendering
- Check browser console for WebGL errors
- Ensure GPU acceleration is enabled in browser
- Try a different browser (Chrome/Firefox recommended)

### Performance Issues
- Reduce polygon count in 3D meshes (lower `args` values in `<Sphere>`)
- Disable auto-rotation if needed
- Limit number of stars in StarField component

### Model Integration Errors
- Verify JSON format matches expected structure
- Check CORS settings if calling external API
- Ensure all required fields are present in model output

## Additional Features to Implement

### Multiple Planets
Extend visualization to show multiple planets in one system:

```typescript
{planets.map((planet, index) => (
  <AnimatedPlanet 
    key={index}
    radius={planet.radius}
    orbitRadius={planet.orbitRadius}
    color={planet.color}
    speed={planet.speed}
  />
))}
```

### Texture Mapping
Add realistic planet textures:

```typescript
import { useTexture } from '@react-three/drei';

const texture = useTexture('/textures/earth.jpg');

<meshStandardMaterial map={texture} />
```

### Time-based Animation
Animate based on actual orbital periods:

```typescript
const orbitalPeriod = calculateOrbitalPeriod(orbitRadius, starMass);
const speed = (2 * Math.PI) / (orbitalPeriod * scaleFactor);
```

## Support

For questions about:
- **3D Visualization**: Check Three.js and React Three Fiber documentation
- **Model Integration**: Refer to `src/utils/apiIntegration.ts` examples
- **Styling**: See `src/styles/exoplanet.css` and `src/index.css`

## License
MIT
