type StationResponse = string[];

const API_BASE_URL = __DEV__ 
  ? 'http://10.0.2.2:8080'
  : 'http://localhost:8080';

export const searchStations = async (query: string): Promise<StationResponse> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/stations?query=${encodeURIComponent(query)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Response issue');
    }

    return await response.json();
  } catch (error) {
    console.error('Error searching stations:', error);
    throw error;
  }
};