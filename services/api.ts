import { getToken } from "./authApi";

type StationResponse = string[];

const API_BASE_URL = "http://192.168.1.85:8080";
export const searchStations = async (
  query: string
): Promise<{ name: string; code: string }[]> => {
  const response = await fetch(
    `${API_BASE_URL}/stations/search?query=${encodeURIComponent(query)}`,
    { method: "GET", headers: { "Content-Type": "application/json" } }
  );

  if (!response.ok) throw new Error("Network error");
  return await response.json();
};

const authHeader = async () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${await getToken()}`,
});

export type StopInfo = {
  id: number;
  stationName: string;
  stationCode: string;
  arrivalTime: string | null;
  departureTime: string | null;
  cancelled: boolean;
  arrivalPlatform: string | null;
  departurePlatform: string | null;
  delayInSeconds: number;
  status: string | null;
};

export type TripInfo = {
  id: number;
  trainNumber: number;
  departureStation: string;
  arrivalStation: string;
  direction: string;
  departureTime: string;
  arrivalTime: string;
  onTime: boolean;
  cancelled: boolean;
  delayed: boolean;
  delayDuration: number;
  departurePlatformNumber: string | null;
  arrivalPlatformNumber: string | null;
  timeUntilDeparture: string;
  date: string;
  tripDistance: number;
  tripDuration: number;
  intermediateStops: StopInfo[];
  departureStationName: string;
  arrivalStationName: string;
  live: boolean;
  departureCity: string;
  arrivalCity: string;
  timeUntilArrival: string;
};

export interface timetableEntry {
  departureTime: string;
  direction: string;
  trainNumber: string;
  departurePlatform: string;
  intermediateStations: string[];
}

// export const addTrip = async (
//   departure: string,
//   arrival: string,
//   trainNum: number
// ): Promise<TrainInfo> => {
//   const response = await fetch(
//     `${API_BASE_URL}/trains?fromStation=${encodeURIComponent(
//       departure
//     )}&toStation=${encodeURIComponent(arrival)}&trainNumber=${encodeURIComponent(trainNum)}`,
//     { method: 'GET', headers: { 'Content-Type': 'application/json' } }
//   );

//   if (!response.ok) throw new Error('Network error');
//   const json = await response.json();
//   return json as TrainInfo;

// };

export const searchDepartures = async (
  stationCode: string
): Promise<timetableEntry[]> => {
  const response = await fetch(
    `${API_BASE_URL}/timetable/departures?stationCode=${encodeURIComponent(
      stationCode
    )}`,
    { method: "GET", headers: { "Content-Type": "application/json" } }
  );

  if (!response.ok) throw new Error("NETWORK ERROR");
  const json = await response.json();
  return json as timetableEntry[];
};

// Add trip for the current logged in user
export const AddTrip = async (
  departure: string,
  arrival: string,
  trainNum: number
) => {
  const headers = await authHeader();
  const response = await fetch(`${API_BASE_URL}/trips/add`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      departureStation: departure,
      arrivalStation: arrival,
      trainNumber: trainNum,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to add trip");
  }

  return await response.json();
};

// Fetch all the trips for the logged in user
export const fetchUserTrips = async (): Promise<TripInfo[]> => {
  const headers = await authHeader();
  const res = await fetch(`${API_BASE_URL}/trips/all`, { headers });
  if (!res.ok) throw new Error("Failed to fetch trips");
  return await res.json();
};


// Delete a trip
export const deleteTrip = async (tripId: number) => {
  const headers = await authHeader();
  const res = await fetch(`${API_BASE_URL}/trips/${tripId}`, {
    method: "DELETE",
    headers,
  });
  if (!res.ok) throw new Error("Failed to delete trip");
};
