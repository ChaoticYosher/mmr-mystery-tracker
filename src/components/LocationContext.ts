import { LocationData } from "../types/LocationData";
import { createContext } from "react";

export const LocationContext = createContext<LocationData>({
    locations: [],
    settings: [],
    currentSettings: {},
});
