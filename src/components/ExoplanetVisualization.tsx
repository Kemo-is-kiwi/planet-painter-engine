import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Ring } from '@react-three/drei';
import * as THREE from 'three';

interface ExoplanetData {
  radius: number;
  orbitRadius: number;
  planetColor: string;
  isBinary: boolean;
  starColor: string;
  secondStarColor?: string;
}

const Planet = ({ radius, color, position }: { radius: number; color: string; position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Sphere ref={meshRef} args={[radius, 32, 32]} position={position}>
      <meshStandardMaterial color={color} roughness={0.7} metalness={0.3} />
    </Sphere>
  );
};

const Star = ({ color, position, scale = 1 }: { color: string; position: [number, number, number]; scale?: number }) => {
  return (
    <Sphere args={[0.5 * scale, 32, 32]} position={position}>
      <meshBasicMaterial color={color} />
      <pointLight color={color} intensity={2} distance={10} />
    </Sphere>
  );
};

const OrbitPath = ({ radius }: { radius: number }) => {
  return (
    <Ring args={[radius - 0.02, radius + 0.02, 64]} rotation={[Math.PI / 2, 0, 0]}>
      <meshBasicMaterial color="#4080ff" transparent opacity={0.3} />
    </Ring>
  );
};

const AnimatedPlanet = ({ 
  radius, 
  orbitRadius, 
  color, 
  speed = 0.5 
}: { 
  radius: number; 
  orbitRadius: number; 
  color: string;
  speed?: number;
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001 * speed;
    }
  });

  return (
    <group ref={groupRef}>
      <Planet radius={radius} color={color} position={[orbitRadius, 0, 0]} />
    </group>
  );
};

export const ExoplanetVisualization = ({ data }: { data: ExoplanetData }) => {
  const [autoRotate, setAutoRotate] = useState(true);

  return (
    <div className="visualization-container" style={{ width: '100%', height: '600px', position: 'relative' }}>
      <div className="controls-panel">
        <div style={{ marginBottom: '0.5rem', color: 'hsl(220 15% 65%)', fontSize: '0.875rem', fontWeight: '600' }}>
          Controls
        </div>
        <button 
          className="control-button"
          onClick={() => setAutoRotate(!autoRotate)}
        >
          {autoRotate ? 'Disable' : 'Enable'} Auto-Rotate
        </button>
        <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: 'hsl(220 15% 60%)' }}>
          <div>• Click + Drag to rotate</div>
          <div>• Scroll to zoom</div>
          <div>• Right-click to pan</div>
        </div>
      </div>

      <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        {/* Stars */}
        {data.isBinary ? (
          <>
            <Star color={data.starColor} position={[-1.5, 0, 0]} scale={1.2} />
            <Star color={data.secondStarColor || '#ff6b35'} position={[1.5, 0, 0]} scale={0.9} />
          </>
        ) : (
          <Star color={data.starColor} position={[0, 0, 0]} scale={1.5} />
        )}

        {/* Orbit path */}
        <OrbitPath radius={data.orbitRadius} />

        {/* Planet */}
        <AnimatedPlanet 
          radius={data.radius} 
          orbitRadius={data.orbitRadius} 
          color={data.planetColor}
        />

        <OrbitControls 
          enablePan={true} 
          enableZoom={true} 
          enableRotate={true}
          autoRotate={autoRotate}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};