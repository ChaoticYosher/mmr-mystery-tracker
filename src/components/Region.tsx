import { useContext } from "react";
import { LocationData } from "../types/LocationData";
import { Location } from "./Location";
import { LocationContext } from "./LocationContext";

export interface RegionProps {
    name: string;
}

export function Region({ name }: RegionProps) {
    const locations: LocationData = useContext(LocationContext);
    return (
        <>
            <div>
                <p>
                    {name}
                    {(locations.regionCache.get(name)?.length ?? 0) -
                        (locations.checkedLocations.get(name)?.length ?? 0)}
                </p>
                {locations.regionCache.get(name)?.map((locationIndex) => (
                    <Location
                        key={locations.locations[locationIndex].id}
                        {...locations.locations[locationIndex]}
                    />
                ))}
            </div>
        </>
    );
}
