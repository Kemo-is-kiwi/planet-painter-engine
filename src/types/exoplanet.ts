// Type definitions for Exoplanet Discovery Platform

export type FalsePositiveReason = 
  | 'Transit-Like' 
  | 'Stellar Eclipse' 
  | 'Centroid Offset' 
  | 'Ephemeris Match Indicates Contamination';

export interface ExoplanetResult {
  classification: 'planet' | 'false_positive' | 'candidate';
  confidence: number;
  radius: number; // In Earth radii (R⊕)
  orbitRadius: number; // In Astronomical Units (AU)
  planetColor: string; // Hex color code
  isBinary: boolean;
  starColor: string; // Hex color code for primary star
  secondStarColor?: string; // Hex color code for secondary star (if binary)
  reasoning: string[]; // Array of classification reasoning points
  telescopeSource: string; // e.g., "TESS Sector 14", "Kepler Q1-Q17"
  discoveryDate: string; // ISO date string
  temperature: number; // In Kelvin
  hostStarType: string; // e.g., "G-type main sequence"
  falsePositiveReasons?: FalsePositiveReason[]; // Present when classification is 'false_positive'
}

export interface ModelOutputPayload {
  // Raw output from your ML model - adjust fields as needed
  is_planet: boolean;
  confidence_score: number;
  planet_radius_earth: number;
  orbital_distance_au: number;
  is_binary_system: boolean;
  telescope_data_source: string;
  detection_date: string;
  estimated_temperature_k: number;
  host_star_classification: string;
  evidence_factors: string[];
  // Optional visual parameters
  suggested_planet_color?: string;
  primary_star_color?: string;
  secondary_star_color?: string;
}