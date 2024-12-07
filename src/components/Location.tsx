import { useContext } from "react";
import { Check } from "../types/Check";
import {
    LocationData,
    TrackerAction,
    UpdateLocationData,
} from "../types/LocationData";
import { LocationContext } from "./LocationContext";
import { useImmerReducer } from "use-immer";

function reducer(locations: LocationData, action: UpdateLocationData) {
    switch (action.type) {
        case TrackerAction.UpdateLocation: {
            const regionCheckedCache = locations.checkedLocations.get(
                action.region
            );
            if (regionCheckedCache) {
                if (regionCheckedCache.includes(action.name)) {
                    regionCheckedCache.splice(
                        regionCheckedCache.indexOf(action.name)
                    );
                } else {
                    regionCheckedCache.push(action.name);
                }
            }
            return locations;
        }
    }
}

export function Location({ id, name, region }: Check) {
    const locations: LocationData = useContext(LocationContext);
    const [state, dispatch] = useImmerReducer(reducer, locations);
    return (
        <button
            key={id}
            className={
                state.checkedLocations.get(region)?.includes(name)
                    ? "checked"
                    : ""
            }
            onClick={() => {
                dispatch({
                    type: TrackerAction.UpdateLocation,
                    name: name,
                    region: region,
                });
            }}
        >
            {name}
        </button>
    );
}
