import { Link } from 'react-router-dom';
import { Globe, Database, Home } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
        <Globe size={28} />
        ExoPlanet Discovery
      </Link>
      <div className="nav-links">
        <Link to="/" className="nav-link">
          <Home size={20} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
          Home
        </Link>
        <Link to="/results" className="nav-link">
          <Database size={20} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
          Results
        </Link>
      </div>
    </nav>
  );
};