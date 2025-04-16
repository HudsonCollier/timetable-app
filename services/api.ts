type StationResponse = string[];

const API_BASE_URL = 'https://c5bb-2601-681-4c00-9850-510d-efde-ee3a-22a1.ngrok-free.app';

  export const searchStations = async (query: string): Promise<string[]> => {
    const response = await fetch(
      `${API_BASE_URL}/stations?query=${encodeURIComponent(query)}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
  
    if (!response.ok) throw new Error('Network error');
  
    return await response.json();
  };
  