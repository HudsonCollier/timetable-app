type StationResponse = string[];

const API_BASE_URL = 'http://10.0.0.225:8080';
  export const searchStations = async (query: string): Promise<string[]> => {
    const response = await fetch(
        `${API_BASE_URL}/stations/search?query=${encodeURIComponent(query)}`,
        { method: 'GET', headers: { 'Content-Type': 'application/json' } }
      );
      
    if (!response.ok) throw new Error('Network error');
  
    return await response.json();
  };