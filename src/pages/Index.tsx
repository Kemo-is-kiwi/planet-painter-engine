import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { StarField } from '@/components/StarField';
import { Telescope, Globe, Database, Zap, Binary, Eye } from 'lucide-react';
import '../styles/exoplanet.css';

const Index = () => {
  return (
    <div className="cosmic-background">
      <StarField />
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 className="hero-title">
            Exoplanet Discovery Platform
          </h1>
          <p className="hero-subtitle">
            Advanced visualization for Kepler, K2, and TESS exoplanet detection models.
            Explore 3D interactive models of discovered planets and binary star systems.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/results">
              <button className="btn-primary">
                View Results
              </button>
            </Link>
            <a href="#features">
              <button className="btn-secondary">
                Learn More
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ position: 'relative', zIndex: 1, padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="section-title">Platform Features</h2>
            <p className="section-subtitle">
              Comprehensive tools for exoplanet discovery visualization and analysis
            </p>
          </div>

          <div className="grid-container grid-3">
            <div className="card">
              <div className="feature-icon">
                <Globe size={32} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.75rem', color: 'hsl(0 0% 95%)' }}>
                3D Visualization
              </h3>
              <p style={{ color: 'hsl(220 15% 65%)', lineHeight: '1.6' }}>
                Interactive 3D models of exoplanets with accurate radius and orbital parameters.
                Rotate, zoom, and explore planetary systems in real-time.
              </p>
            </div>

            <div className="card">
              <div className="feature-icon">
                <Binary size={32} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.75rem', color: 'hsl(0 0% 95%)' }}>
                Binary Star Support
              </h3>
              <p style={{ color: 'hsl(220 15% 65%)', lineHeight: '1.6' }}>
                Visualize exoplanets in binary star systems with dual star rendering
                and accurate orbital mechanics.
              </p>
            </div>

            <div className="card">
              <div className="feature-icon">
                <Database size={32} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.75rem', color: 'hsl(0 0% 95%)' }}>
                ML Model Integration
              </h3>
              <p style={{ color: 'hsl(220 15% 65%)', lineHeight: '1.6' }}>
                Direct integration with your Kepler, K2, and TESS detection models.
                Upload results and see instant visualizations.
              </p>
            </div>

            <div className="card">
              <div className="feature-icon">
                <Telescope size={32} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.75rem', color: 'hsl(0 0% 95%)' }}>
                Multi-Telescope Data
              </h3>
              <p style={{ color: 'hsl(220 15% 65%)', lineHeight: '1.6' }}>
                Support for data from Kepler, K2, and TESS space telescopes
                with unified visualization format.
              </p>
            </div>

            <div className="card">
              <div className="feature-icon">
                <Eye size={32} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.75rem', color: 'hsl(0 0% 95%)' }}>
                Classification Analysis
              </h3>
              <p style={{ color: 'hsl(220 15% 65%)', lineHeight: '1.6' }}>
                Detailed reasoning for planet vs. false positive classifications
                with confidence scores and evidence breakdown.
              </p>
            </div>

            <div className="card">
              <div className="feature-icon">
                <Zap size={32} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.75rem', color: 'hsl(0 0% 95%)' }}>
                Real-time Rendering
              </h3>
              <p style={{ color: 'hsl(220 15% 65%)', lineHeight: '1.6' }}>
                High-performance 3D rendering with WebGL for smooth, responsive
                planetary system visualization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ position: 'relative', zIndex: 1, padding: '4rem 2rem', textAlign: 'center' }}>
        <div className="card" style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem', color: 'hsl(0 0% 95%)' }}>
            Ready to Visualize Your Discoveries?
          </h2>
          <p style={{ color: 'hsl(220 15% 65%)', marginBottom: '2rem', fontSize: '1.125rem' }}>
            Upload your model results and explore exoplanets in stunning 3D detail
          </p>
          <Link to="/results">
            <button className="btn-primary">
              Get Started
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
