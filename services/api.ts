type StationResponse = string[];

const API_BASE_URL = 'http://192.168.1.85:8080';
export const searchStations = async (query: string): Promise<{ name: string, code: string }[]> => {
    const response = await fetch(
        `${API_BASE_URL}/stations/search?query=${encodeURIComponent(query)}`,
        { method: 'GET', headers: { 'Content-Type': 'application/json' } }
    );
    
    if (!response.ok) throw new Error('Network error');
    return await response.json();
};


  
export interface TrainInfo {
    trainNumber: number;
    departureStation: string;
    arrivalStation: string;
    direction: string;
    departureTime: string;
    arrivalTime: string;
    onTime: boolean;
    delayed: boolean;
    cancelled: boolean;
    delayDuration: number;
    departurePlatformNumber?: string;
    arrivalPlatformNumber?: string;
    timeUntilDeparture: string;
  }
  
  export const addTrip = async (
    departure: string,
    arrival: string,
    trainNum: number
  ): Promise<TrainInfo> => {
    const response = await fetch(
      `${API_BASE_URL}/trains?fromStation=${encodeURIComponent(
        departure
      )}&toStation=${encodeURIComponent(arrival)}&trainNumber=${encodeURIComponent(trainNum)}`,
      { method: 'GET', headers: { 'Content-Type': 'application/json' } }
    );
  
    if (!response.ok) throw new Error('Network error');
    const json = await response.json();
    return json as TrainInfo;

  };
  


  