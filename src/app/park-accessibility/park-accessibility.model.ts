export type ParkAccessibility = {
    // Define the structure of your ParkAccessibility model based on your API response
    id: number;
    rentalLocations: string[];
    wheelchairReplacementLocations: string[];
    breakLocations: string[];
    stationaryBrailleMapLocations: string[];
    signLanguageSchedule: string;
    guestRelationsLocations: string[];
    serviceAnimalRestrictions_Ride: string[];
    serviceAnimalRestrictions_Board: string[];
    serviceAnimalReliefAreas: string[];
    companionRestroomLocations: string[];
    firstAidLocations: string;
  }