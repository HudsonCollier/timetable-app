type StationResponse = string[];

const API_BASE_URL = 'https://7966-155-98-131-4.ngrok-free.app';

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
  