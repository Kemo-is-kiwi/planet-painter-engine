import { useState } from 'react';
import { ExoplanetVisualization } from '@/components/ExoplanetVisualization';
import { Navbar } from '@/components/Navbar';
import { StarField } from '@/components/StarField';
import { CheckCircle, XCircle, Upload, Database } from 'lucide-react';
import '../styles/exoplanet.css';

interface ExoplanetResult {
  classification: 'planet' | 'false_positive';
  confidence: number;
  radius: number;
  orbitRadius: number;
  planetColor: string;
  isBinary: boolean;
  starColor: string;
  secondStarColor?: string;
  reasoning: string[];
  telescopeSource: string;
  discoveryDate: string;
  temperature: number;
  hostStarType: string;
}

// Mock data - replace with actual API integration
const mockResult: ExoplanetResult = {
  classification: 'planet',
  confidence: 94.7,
  radius: 0.8,
  orbitRadius: 4.5,
  planetColor: '#4facfe',
  isBinary: true,
  starColor: '#ffd93d',
  secondStarColor: '#ff6b6b',
  reasoning: [
    'Consistent transit depth across multiple observations',
    'No significant secondary eclipse detected',
    'Transit duration matches theoretical predictions',
    'Stellar variability ruled out through analysis',
    'Centroid analysis confirms planetary nature'
  ],
  telescopeSource: 'TESS Sector 14',
  discoveryDate: '2024-01-15',
  temperature: 285,
  hostStarType: 'G-type main sequence (Binary)'
};

export default function Results() {
  const [result, setResult] = useState<ExoplanetResult | null>(mockResult);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    
    // Simulate API call - replace with actual integration
    setTimeout(() => {
      setResult(mockResult);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="cosmic-background">
      <StarField />
      <Navbar />
      
      <div style={{ position: 'relative', zIndex: 1, padding: '2rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 className="section-title" style={{ fontSize: '2.5rem' }}>
              Exoplanet Discovery Results
            </h1>
            <p className="section-subtitle">
              Analyze classification results and visualize discovered exoplanets
            </p>
          </div>

          {!result && !loading && (
            <div className="card" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
              <Upload size={48} style={{ margin: '0 auto 1rem', color: 'hsl(210 80% 65%)' }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'hsl(0 0% 95%)' }}>
                Upload Model Results
              </h3>
              <p style={{ color: 'hsl(220 15% 65%)', marginBottom: '2rem' }}>
                Upload JSON output from your Kepler/K2/TESS exoplanet detection model
              </p>
              <label htmlFor="file-upload" className="btn-primary" style={{ display: 'inline-block' }}>
                Select File
              </label>
              <input
                id="file-upload"
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
            </div>
          )}

          {loading && (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
              <div className="loading-spinner" />
              <p style={{ color: 'hsl(220 15% 65%)', marginTop: '1rem' }}>
                Analyzing model output...
              </p>
            </div>
          )}

          {result && !loading && (
            <div className="grid-container" style={{ gridTemplateColumns: '1fr', gap: '2rem' }}>
              {/* Classification Status */}
              <div className="card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem', color: 'hsl(0 0% 95%)' }}>
                      Classification Result
                    </h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                      <span className={result.classification === 'planet' ? 'status-badge status-planet' : 'status-badge status-false'}>
                        {result.classification === 'planet' ? (
                          <>
                            <CheckCircle size={16} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
                            Confirmed Exoplanet
                          </>
                        ) : (
                          <>
                            <XCircle size={16} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
                            False Positive
                          </>
                        )}
                      </span>
                      <span style={{ color: 'hsl(220 15% 65%)', fontSize: '1rem' }}>
                        Confidence: <strong style={{ color: 'hsl(210 80% 65%)' }}>{result.confidence}%</strong>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="info-grid">
                  <div className="data-panel">
                    <div className="data-label">Telescope Source</div>
                    <div className="data-value" style={{ fontSize: '1.125rem' }}>{result.telescopeSource}</div>
                  </div>
                  <div className="data-panel">
                    <div className="data-label">Discovery Date</div>
                    <div className="data-value" style={{ fontSize: '1.125rem' }}>{result.discoveryDate}</div>
                  </div>
                  <div className="data-panel">
                    <div className="data-label">Host Star Type</div>
                    <div className="data-value" style={{ fontSize: '1.125rem' }}>{result.hostStarType}</div>
                  </div>
                  <div className="data-panel">
                    <div className="data-label">Est. Temperature</div>
                    <div className="data-value" style={{ fontSize: '1.125rem' }}>{result.temperature}K</div>
                  </div>
                </div>
              </div>

              {/* 3D Visualization */}
              {result.classification === 'planet' && (
                <div className="card">
                  <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', color: 'hsl(0 0% 95%)' }}>
                    3D System Visualization
                  </h2>
                  <ExoplanetVisualization data={result} />
                  <div className="info-grid" style={{ marginTop: '1.5rem' }}>
                    <div className="data-panel">
                      <div className="data-label">Planet Radius</div>
                      <div className="data-value" style={{ fontSize: '1.125rem' }}>{result.radius} R⊕</div>
                    </div>
                    <div className="data-panel">
                      <div className="data-label">Orbital Radius</div>
                      <div className="data-value" style={{ fontSize: '1.125rem' }}>{result.orbitRadius} AU</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Classification Reasoning */}
              <div className="card">
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', color: 'hsl(0 0% 95%)' }}>
                  <Database size={24} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
                  Classification Reasoning
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {result.reasoning.map((reason, index) => (
                    <div key={index} className="data-panel" style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                      <div style={{ 
                        minWidth: '2rem', 
                        height: '2rem', 
                        borderRadius: '50%', 
                        background: 'linear-gradient(135deg, hsl(210 80% 55% / 0.2), hsl(180 70% 50% / 0.2))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'hsl(210 80% 65%)',
                        fontWeight: '700'
                      }}>
                        {index + 1}
                      </div>
                      <p style={{ color: 'hsl(220 15% 75%)', fontSize: '1rem', margin: '0.25rem 0 0 0' }}>
                        {reason}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}