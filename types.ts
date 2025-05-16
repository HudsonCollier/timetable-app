export type TrainInfo = {
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
  };
  