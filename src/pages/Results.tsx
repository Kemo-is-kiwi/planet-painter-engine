import { useState } from 'react';
import { ExoplanetVisualization } from '@/components/ExoplanetVisualization';
import { FalsePositiveVisualization } from '@/components/FalsePositiveVisualization';
import { CandidateVisualization } from '@/components/CandidateVisualization';
import { InputForm } from '@/components/InputForm';
import { ChatbotInput } from '@/components/ChatbotInput';
import { ModelWeightSlider } from '@/components/ModelWeightSlider';
import { Navbar } from '@/components/Navbar';
import { StarField } from '@/components/StarField';
import { CheckCircle, XCircle, Upload, Database, HelpCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExoplanetResult } from '@/types/exoplanet';
import '../styles/exoplanet.css';

// Mock results for different classifications
const mockResults: Record<string, ExoplanetResult> = {
  planet: {
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
  },
  candidate: {
    classification: 'candidate',
    confidence: 72.3,
    radius: 1.2,
    orbitRadius: 2.8,
    planetColor: '#ffa500',
    isBinary: false,
    starColor: '#ffe066',
    reasoning: [
      'Transit signal detected but requires additional confirmation',
      'Signal-to-noise ratio within acceptable range',
      'Preliminary analysis suggests planetary characteristics',
      'Follow-up observations recommended'
    ],
    telescopeSource: 'Kepler Q12',
    discoveryDate: '2024-02-20',
    temperature: 320,
    hostStarType: 'K-type main sequence'
  },
  false_positive: {
    classification: 'false_positive',
    confidence: 88.2,
    radius: 0.0,
    orbitRadius: 0.0,
    planetColor: '#666666',
    isBinary: true,
    starColor: '#ff6b6b',
    secondStarColor: '#ff4444',
    reasoning: [
      'Signal characteristics inconsistent with planetary transit',
      'Multiple false positive indicators detected',
      'Contamination from nearby eclipsing binary confirmed'
    ],
    telescopeSource: 'TESS Sector 8',
    discoveryDate: '2024-03-10',
    temperature: 0,
    hostStarType: 'Eclipsing Binary System',
    falsePositiveReasons: ['Stellar Eclipse', 'Centroid Offset', 'Ephemeris Match Indicates Contamination']
  }
};

export default function Results() {
  const [result, setResult] = useState<ExoplanetResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [modelWeight, setModelWeight] = useState(0.5);
  const [inputMode, setInputMode] = useState<'form' | 'chat' | 'file'>('form');

  const handleFormSubmit = (features: number[]) => {
    setLoading(true);
    // Simulate API call with model weight
    setTimeout(() => {
      const resultType = modelWeight < 0.4 ? 'planet' : modelWeight > 0.6 ? 'candidate' : 'false_positive';
      setResult(mockResults[resultType]);
      setLoading(false);
    }, 2000);
  };

  const handleChatSubmit = (message: string) => {
    setLoading(true);
    // Simulate AI processing
    setTimeout(() => {
      setResult(mockResults.candidate);
      setLoading(false);
    }, 2500);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setTimeout(() => {
      setResult(mockResults.planet);
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
              Exoplanet Discovery Platform
            </h1>
            <p className="section-subtitle">
              Advanced AI-powered classification for Kepler, K2, and TESS observations
            </p>
          </div>

          {!result && !loading && (
            <>
              <ModelWeightSlider onModelChange={setModelWeight} />

              <Tabs value={inputMode} onValueChange={(v) => setInputMode(v as any)} className="mb-8">
                <TabsList style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  gap: '0.5rem',
                  background: 'hsl(220 20% 14%)',
                  padding: '0.5rem',
                  borderRadius: '0.75rem',
                  marginBottom: '2rem'
                }}>
                  <TabsTrigger 
                    value="form"
                    style={{
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.95rem',
                      fontWeight: '600'
                    }}
                  >
                    Feature Input
                  </TabsTrigger>
                  <TabsTrigger 
                    value="chat"
                    style={{
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.95rem',
                      fontWeight: '600'
                    }}
                  >
                    AI Assistant
                  </TabsTrigger>
                  <TabsTrigger 
                    value="file"
                    style={{
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.95rem',
                      fontWeight: '600'
                    }}
                  >
                    File Upload
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="form">
                  <InputForm onSubmit={handleFormSubmit} isLoading={loading} />
                </TabsContent>

                <TabsContent value="chat">
                  <ChatbotInput onSubmit={handleChatSubmit} isLoading={loading} />
                </TabsContent>

                <TabsContent value="file">
                  <div className="card" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
                    <Upload size={48} style={{ margin: '0 auto 1rem', color: 'hsl(210 80% 65%)' }} />
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'hsl(0 0% 95%)' }}>
                      Upload Model Output
                    </h3>
                    <p style={{ color: 'hsl(220 15% 65%)', marginBottom: '2rem' }}>
                      Upload JSON output from your trained model
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
                </TabsContent>
              </Tabs>
            </>
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
            <>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <button 
                  onClick={() => setResult(null)}
                  className="btn-primary"
                  style={{ display: 'inline-block' }}
                >
                  New Analysis
                </button>
              </div>

              <div className="grid-container" style={{ gridTemplateColumns: '1fr', gap: '2rem' }}>
                {/* Classification Status */}
                <div className="card">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem', color: 'hsl(0 0% 95%)' }}>
                        Classification Result
                      </h2>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                        <span className={
                          result.classification === 'planet' ? 'status-badge status-planet' : 
                          result.classification === 'candidate' ? 'status-badge' :
                          'status-badge status-false'
                        } style={result.classification === 'candidate' ? {
                          background: 'linear-gradient(135deg, hsl(30 100% 60% / 0.2), hsl(45 100% 60% / 0.2))',
                          border: '2px solid hsl(30 100% 60%)',
                          color: 'hsl(30 100% 60%)'
                        } : {}}>
                          {result.classification === 'planet' ? (
                            <>
                              <CheckCircle size={16} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
                              Confirmed Exoplanet
                            </>
                          ) : result.classification === 'candidate' ? (
                            <>
                              <HelpCircle size={16} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
                              Exoplanet Candidate
                            </>
                          ) : (
                            <>
                              <XCircle size={16} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
                              False Positive
                            </>
                          )}
                        </span>
                        <span style={{ color: 'hsl(220 15% 65%)', fontSize: '1rem' }}>
                          Confidence: <strong style={{ 
                            color: result.classification === 'planet' ? 'hsl(140 70% 50%)' : 
                                   result.classification === 'candidate' ? 'hsl(30 100% 60%)' : 
                                   'hsl(0 85% 60%)'
                          }}>{result.confidence}%</strong>
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
                    {result.temperature > 0 && (
                      <div className="data-panel">
                        <div className="data-label">Est. Temperature</div>
                        <div className="data-value" style={{ fontSize: '1.125rem' }}>{result.temperature}K</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Visualizations based on classification */}
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

                {result.classification === 'candidate' && (
                  <CandidateVisualization data={result} confidence={result.confidence} />
                )}

                {result.classification === 'false_positive' && result.falsePositiveReasons && (
                  <FalsePositiveVisualization 
                    reasons={result.falsePositiveReasons} 
                    confidence={result.confidence}
                  />
                )}

                {/* Classification Reasoning */}
                {result.reasoning.length > 0 && (
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
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}