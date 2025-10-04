import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Ring } from '@react-three/drei';
import * as THREE from 'three';
import { HelpCircle, Info } from 'lucide-react';

interface CandidateVisualizationProps {
  data: {
    radius: number;
    orbitRadius: number;
    planetColor: string;
    isBinary: boolean;
    starColor: string;
    secondStarColor?: string;
  };
  confidence: number;
}

const Planet = ({ radius, color, position }: { radius: number; color: string; position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Sphere ref={meshRef} args={[radius, 32, 32]} position={position}>
      <meshStandardMaterial color={color} roughness={0.7} metalness={0.3} opacity={0.7} transparent />
    </Sphere>
  );
};

const Star = ({ color, position, scale = 1 }: { color: string; position: [number, number, number]; scale?: number }) => {
  return (
    <Sphere args={[0.5 * scale, 32, 32]} position={position}>
      <meshBasicMaterial color={color} opacity={0.8} transparent />
      <pointLight color={color} intensity={1.5} distance={10} />
    </Sphere>
  );
};

const OrbitPath = ({ radius }: { radius: number }) => {
  return (
    <Ring args={[radius - 0.02, radius + 0.02, 64]} rotation={[Math.PI / 2, 0, 0]}>
      <meshBasicMaterial color="#ffa500" transparent opacity={0.4} />
    </Ring>
  );
};

const AnimatedPlanet = ({ 
  radius, 
  orbitRadius, 
  color 
}: { 
  radius: number; 
  orbitRadius: number; 
  color: string;
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0008;
    }
  });

  return (
    <group ref={groupRef}>
      <Planet radius={radius} color={color} position={[orbitRadius, 0, 0]} />
    </group>
  );
};

export const CandidateVisualization = ({ data, confidence }: CandidateVisualizationProps) => {
  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <HelpCircle size={32} style={{ color: 'hsl(30 100% 60%)' }} />
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'hsl(0 0% 95%)' }}>
            Exoplanet Candidate
          </h2>
          <p style={{ color: 'hsl(220 15% 65%)', fontSize: '1rem', marginTop: '0.25rem' }}>
            Confidence: <strong style={{ color: 'hsl(30 100% 60%)' }}>{confidence}%</strong>
          </p>
        </div>
      </div>

      <div style={{
        background: 'linear-gradient(135deg, hsl(30 100% 60% / 0.1), hsl(45 100% 60% / 0.1))',
        border: '2px solid hsl(30 100% 60% / 0.3)',
        borderRadius: '1rem',
        padding: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
          <Info size={24} style={{ color: 'hsl(30 100% 60%)', flexShrink: 0, marginTop: '0.25rem' }} />
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'hsl(0 0% 95%)', marginBottom: '0.5rem' }}>
              Requires Further Verification
            </h3>
            <p style={{ color: 'hsl(220 15% 75%)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              This signal shows promising characteristics of a planetary transit, but additional observations 
              and analysis are needed to confirm its planetary nature and rule out false positive scenarios.
            </p>
          </div>
        </div>
      </div>

      <div style={{ width: '100%', height: '500px', position: 'relative', borderRadius: '1rem', overflow: 'hidden' }}>
        <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          
          {data.isBinary ? (
            <>
              <Star color={data.starColor} position={[-1.5, 0, 0]} scale={1.2} />
              <Star color={data.secondStarColor || '#ff6b35'} position={[1.5, 0, 0]} scale={0.9} />
            </>
          ) : (
            <Star color={data.starColor} position={[0, 0, 0]} scale={1.5} />
          )}

          <OrbitPath radius={data.orbitRadius} />

          <AnimatedPlanet 
            radius={data.radius} 
            orbitRadius={data.orbitRadius} 
            color={data.planetColor}
          />

          <OrbitControls 
            enablePan={true} 
            enableZoom={true} 
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.3}
          />
        </Canvas>
      </div>

      <div className="info-grid" style={{ marginTop: '1.5rem' }}>
        <div className="data-panel">
          <div className="data-label">Estimated Radius</div>
          <div className="data-value" style={{ fontSize: '1.125rem', color: 'hsl(30 100% 60%)' }}>
            {data.radius} R⊕
          </div>
        </div>
        <div className="data-panel">
          <div className="data-label">Estimated Orbital Radius</div>
          <div className="data-value" style={{ fontSize: '1.125rem', color: 'hsl(30 100% 60%)' }}>
            {data.orbitRadius} AU
          </div>
        </div>
      </div>
    </div>
  );
};
