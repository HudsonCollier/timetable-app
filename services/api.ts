import { getToken } from "./authApi";
import { passportInfo, visitedStation } from "@/types/types";

const API_BASE_URL = "http://192.168.1.85:8080";
// const API_BASE_URL = "http://timetables-backend-production.up.railway.app";


/**
 * Used in order to autocomplete the search bar when a user is searching for a station
 *
 * @param query - The string which is what the user enters into the search bar
 * @returns - Station names and codes for stations that start with "query..."
 */
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

/**
 * Builds the header for an authenticated API request. Gets the JWT token and adds it to the header.
 */
const authHeader = async () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${await getToken()}`,
});

type StationResponse = string[];

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

/**
 * Used to fetch all of the departures from a certain station for the next two hours.
 *
 * @param stationCode - The code for the station that we want to view departures for
 * @returns - An array of timetable enties containing info about each departure
 */
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

/**
 * Adds a trip to the currently logged in users account. Saves trip to the DB.
 *
 * @param departure - THe departure station code
 * @param arrival - Arrival station code
 * @param trainNum - The train number
 * @returns - JSON of the trip
 */
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

/**
 * Used to fetch all of the trips in the database for the currently authenticated user
 *
 * @returns - Array of TripInfo objects that contain data about each trip
 */
export const fetchUserTrips = async (): Promise<TripInfo[]> => {
  const headers = await authHeader();
  const res = await fetch(`${API_BASE_URL}/trips/all`, { headers });
  if (!res.ok) throw new Error("Failed to fetch trips");
  return await res.json();
};

/**
 * Deletes a trip for the specified user
 *
 * @param tripId - ID of the trip user wants deleted
 */
export const deleteTrip = async (tripId: number) => {
  const headers = await authHeader();
  const res = await fetch(`${API_BASE_URL}/trips/${tripId}`, {
    method: "DELETE",
    headers,
  });
  if (!res.ok) throw new Error("Failed to delete trip");
};

/**
 * Fetches the users lifetime train data
 *
 * @returns PassportInfo object containing the users lifetime stats
 */
export const fetchUsersStats = async (): Promise<passportInfo> => {
  const headers = await authHeader();
  const res = await fetch(`${API_BASE_URL}/passport/`, { headers });
  if (!res.ok) throw new Error("Failed to fetch passport");
  return await res.json();
};

/**
 * Fetches the user data for the current logged in user. Used in order to retrieve the first and
 * last name of the user
 * @returns
 */
export const fetchMe = async (): Promise<{
  firstName: string;
  lastName: string;
}> => {
  const headers = await authHeader();
  const res = await fetch(`${API_BASE_URL}/users/me`, { headers });
  if (!res.ok) throw new Error("Failed to fetch me");
  return await res.json();
};
