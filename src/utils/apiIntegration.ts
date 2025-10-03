import { ModelOutputPayload, ExoplanetResult } from '@/types/exoplanet';

/**
 * Transform your ML model output to the format expected by the visualization
 * Adjust this function according to your actual model output structure
 */
export function transformModelOutput(modelOutput: ModelOutputPayload): ExoplanetResult {
  return {
    classification: modelOutput.is_planet ? 'planet' : 'false_positive',
    confidence: modelOutput.confidence_score,
    radius: modelOutput.planet_radius_earth,
    orbitRadius: modelOutput.orbital_distance_au,
    planetColor: modelOutput.suggested_planet_color || '#4facfe',
    isBinary: modelOutput.is_binary_system,
    starColor: modelOutput.primary_star_color || '#ffd93d',
    secondStarColor: modelOutput.secondary_star_color,
    reasoning: modelOutput.evidence_factors,
    telescopeSource: modelOutput.telescope_data_source,
    discoveryDate: modelOutput.detection_date,
    temperature: modelOutput.estimated_temperature_k,
    hostStarType: modelOutput.host_star_classification,
  };
}

/**
 * Example API call to your ML model backend
 * Replace with your actual API endpoint
 */
export async function fetchModelPrediction(inputData: any): Promise<ExoplanetResult> {
  try {
    // Replace with your actual API endpoint
    const response = await fetch('YOUR_ML_MODEL_API_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any required authentication headers
        // 'Authorization': 'Bearer YOUR_TOKEN'
      },
      body: JSON.stringify(inputData),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const modelOutput: ModelOutputPayload = await response.json();
    return transformModelOutput(modelOutput);
  } catch (error) {
    console.error('Error fetching model prediction:', error);
    throw error;
  }
}

/**
 * Parse uploaded JSON file containing model results
 */
export async function parseModelResultsFile(file: File): Promise<ExoplanetResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const jsonData = JSON.parse(event.target?.result as string);
        const result = transformModelOutput(jsonData);
        resolve(result);
      } catch (error) {
        reject(new Error('Invalid JSON file format'));
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}