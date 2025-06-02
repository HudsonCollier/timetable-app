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
