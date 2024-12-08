import { useImmerReducer } from "use-immer";
import {
    LocationData,
    TrackerAction,
    UpdateLocationData,
} from "../types/LocationData";
import { LocationContext, LocationDispatchContext } from "./LocationContext";

function reducer(locations: LocationData, action: UpdateLocationData) {
    switch (action.type) {
        case TrackerAction.UpdateLocation: {
            const regionCheckedCache = locations.checkedLocations.get(
                action.region
            );
            if (regionCheckedCache) {
                if (regionCheckedCache.includes(action.name)) {
                    regionCheckedCache.splice(
                        regionCheckedCache.indexOf(action.name),
                        1
                    );
                } else {
                    regionCheckedCache.push(action.name);
                }
            }
            return locations;
        }
    }
}

export type LocationProviderProps = React.PropsWithChildren & {
    initialLocations: LocationData;
};

export function LocationProvider({
    initialLocations,
    children,
}: LocationProviderProps) {
    const [locations, locationDispatch] = useImmerReducer(
        reducer,
        initialLocations
    );
    return (
        <LocationContext.Provider value={locations}>
            <LocationDispatchContext.Provider value={locationDispatch}>
                {children}
            </LocationDispatchContext.Provider>
        </LocationContext.Provider>
    );
}
