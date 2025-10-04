import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Brain } from 'lucide-react';

interface ModelWeightSliderProps {
  onModelChange: (weight: number) => void;
}

export const ModelWeightSlider = ({ onModelChange }: ModelWeightSliderProps) => {
  const [weight, setWeight] = useState([50]);

  const handleChange = (value: number[]) => {
    setWeight(value);
    onModelChange(value[0] / 100);
  };

  return (
    <div className="card" style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <Brain size={24} style={{ color: 'hsl(210 80% 65%)' }} />
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'hsl(0 0% 95%)' }}>
          Model Tuning
        </h3>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'hsl(220 15% 65%)', fontSize: '0.875rem' }}>
        <span style={{ fontWeight: weight[0] < 50 ? '600' : '400', color: weight[0] < 50 ? 'hsl(210 80% 65%)' : 'inherit' }}>
          Model A (Conservative)
        </span>
        <span style={{ fontWeight: weight[0] > 50 ? '600' : '400', color: weight[0] > 50 ? 'hsl(180 70% 50%)' : 'inherit' }}>
          Model B (Aggressive)
        </span>
      </div>

      <Slider
        value={weight}
        onValueChange={handleChange}
        max={100}
        step={1}
        className="mb-2"
      />

      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <div style={{ fontSize: '0.75rem', color: 'hsl(220 15% 60%)', marginBottom: '0.25rem' }}>
          Current Weight
        </div>
        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'hsl(210 80% 65%)' }}>
          {weight[0]}%
        </div>
      </div>
    </div>
  );
};
