type StationResponse = string[];

const API_BASE_URL = 'https://a4bc-2601-681-4c00-9850-715c-e3e4-a980-efc9.ngrok-free.app/'

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
  
  // const BASE_URL = 'https://your-api.com'; // Replace with your actual API base URL

  // export async function getTripInfo(departure: string, arrival: string, trainNumber: string) {
  //   const url = `${BASE_URL}/tripinfo?departure=${encodeURIComponent(departure)}&arrival=${encodeURIComponent(arrival)}&train=${encodeURIComponent(trainNumber)}`;
  
  //   const response = await fetch(url);
    
  //   if (!response.ok) {
  //     throw new Error('API request failed');
  //   }
  
  //   const data = await response.json();
  //   return data;
  // }