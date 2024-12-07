import { LocationData } from "../types/LocationData";
import { createContext } from "react";

export const LocationContext = createContext<LocationData>({
    locations: [],
    locationIndex: new Map<string, number[]>(),
    checkedLocations: new Map<string, string>(),
});
