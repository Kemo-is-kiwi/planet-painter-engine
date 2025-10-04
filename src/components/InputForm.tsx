import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles } from 'lucide-react';

interface InputFormProps {
  onSubmit: (features: number[]) => void;
  isLoading: boolean;
}

export const InputForm = ({ onSubmit, isLoading }: InputFormProps) => {
  const [features, setFeatures] = useState<string[]>(Array(14).fill(''));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericFeatures = features.map(f => parseFloat(f) || 0);
    onSubmit(numericFeatures);
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const featureGroups = [
    { title: 'Transit Properties', features: ['Transit Depth', 'Transit Duration', 'Orbital Period'] },
    { title: 'Stellar Parameters', features: ['Host Star Mass', 'Star Temperature', 'Star Radius', 'Metallicity'] },
    { title: 'Signal Characteristics', features: ['Signal-to-Noise', 'Impact Parameter', 'Secondary Eclipse Depth'] },
    { title: 'Orbital Dynamics', features: ['Semi-major Axis', 'Eccentricity', 'Inclination', 'Planet Radius'] }
  ];

  let featureIndex = 0;

  return (
    <form onSubmit={handleSubmit} className="card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
        <Sparkles size={28} style={{ color: 'hsl(210 80% 65%)' }} />
        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'hsl(0 0% 95%)' }}>
          Input Features
        </h2>
      </div>

      <div className="grid-container" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {featureGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="data-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1.25rem', color: 'hsl(210 80% 65%)' }}>
              {group.title}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {group.features.map((featureName) => {
                const currentIndex = featureIndex++;
                return (
                  <div key={currentIndex}>
                    <Label 
                      htmlFor={`feature-${currentIndex}`}
                      style={{ color: 'hsl(220 15% 75%)', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}
                    >
                      {featureName}
                    </Label>
                    <Input
                      id={`feature-${currentIndex}`}
                      type="number"
                      step="any"
                      value={features[currentIndex]}
                      onChange={(e) => handleFeatureChange(currentIndex, e.target.value)}
                      placeholder="0.0"
                      style={{
                        background: 'hsl(220 20% 14%)',
                        border: '1px solid hsl(220 20% 25%)',
                        color: 'hsl(0 0% 95%)',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '0.5rem'
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <Button 
        type="submit" 
        disabled={isLoading}
        className="btn-primary"
        style={{ marginTop: '2rem', width: '100%', maxWidth: '300px', margin: '2rem auto 0' }}
      >
        {isLoading ? 'Analyzing...' : 'Analyze Discovery'}
      </Button>
    </form>
  );
};
