import { createContext, Dispatch, useContext } from "react";
import { LocationData, UpdateLocationData } from "../types/LocationData";

export const LocationContext = createContext<LocationData>({
  locations: [],
  regionCache: new Map<string, number[]>(),
  checkedLocations: new Map<string, string[]>(),
});

export function useLocations() {
  return useContext(LocationContext);
}

export const LocationDispatchContext = createContext<
  Dispatch<UpdateLocationData>
>(() => {});

export function useLocationsDispatch() {
  return useContext(LocationDispatchContext);
}
