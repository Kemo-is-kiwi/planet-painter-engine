import { XCircle, AlertTriangle } from 'lucide-react';
import { FalsePositiveReason } from '@/types/exoplanet';

interface FalsePositiveVisualizationProps {
  reasons: FalsePositiveReason[];
  confidence: number;
}

const reasonDescriptions: Record<FalsePositiveReason, string> = {
  'Transit-Like': 'Signal mimics planetary transit but lacks key planetary characteristics',
  'Stellar Eclipse': 'Light curve indicates eclipsing binary star system rather than planet',
  'Centroid Offset': 'Signal centroid shifts suggest contamination from nearby star',
  'Ephemeris Match Indicates Contamination': 'Transit timing matches known contaminating source'
};

const reasonColors: Record<FalsePositiveReason, string> = {
  'Transit-Like': 'hsl(30 100% 60%)',
  'Stellar Eclipse': 'hsl(0 85% 60%)',
  'Centroid Offset': 'hsl(280 70% 60%)',
  'Ephemeris Match Indicates Contamination': 'hsl(340 75% 60%)'
};

export const FalsePositiveVisualization = ({ reasons, confidence }: FalsePositiveVisualizationProps) => {
  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <XCircle size={32} style={{ color: 'hsl(0 85% 60%)' }} />
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'hsl(0 0% 95%)' }}>
            False Positive Detected
          </h2>
          <p style={{ color: 'hsl(220 15% 65%)', fontSize: '1rem', marginTop: '0.25rem' }}>
            Confidence: <strong style={{ color: 'hsl(0 85% 60%)' }}>{confidence}%</strong>
          </p>
        </div>
      </div>

      <div style={{ 
        background: 'linear-gradient(135deg, hsl(0 85% 60% / 0.1), hsl(340 75% 60% / 0.1))',
        border: '2px solid hsl(0 85% 60% / 0.3)',
        borderRadius: '1rem',
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <AlertTriangle size={64} style={{ color: 'hsl(0 85% 60%)', margin: '0 auto' }} />
        </div>
        <h3 style={{ fontSize: '1.25rem', textAlign: 'center', color: 'hsl(0 0% 95%)', marginBottom: '1.5rem' }}>
          Signal does not indicate planetary detection
        </h3>
      </div>

      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.25rem', color: 'hsl(0 0% 95%)' }}>
          Detected Issues ({reasons.length})
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {reasons.map((reason, index) => (
            <div 
              key={index}
              className="data-panel"
              style={{
                borderLeft: `4px solid ${reasonColors[reason]}`,
                padding: '1.25rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                <div style={{
                  minWidth: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '50%',
                  background: `${reasonColors[reason]}20`,
                  border: `2px solid ${reasonColors[reason]}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: reasonColors[reason],
                  fontWeight: '700',
                  fontSize: '1.125rem'
                }}>
                  {index + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ 
                    color: reasonColors[reason], 
                    fontWeight: '600', 
                    fontSize: '1.125rem',
                    marginBottom: '0.5rem'
                  }}>
                    {reason}
                  </h4>
                  <p style={{ color: 'hsl(220 15% 75%)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                    {reasonDescriptions[reason]}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
