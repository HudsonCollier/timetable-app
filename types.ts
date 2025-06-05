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
