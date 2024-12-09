import { LocationData } from "../types/LocationData";
import { Location } from "./Location";
import { useLocations } from "./LocationContext";

export interface RegionProps {
  name: string;
}

function calculateRemainingChecks(locations: LocationData, name: string) {
  return (
    (locations.regionCache.get(name)?.length ?? 0) -
    (locations.checkedLocations.get(name)?.length ?? 0)
  );
}

export function Region({ name }: RegionProps) {
  const locations: LocationData = useLocations();
  return (
    <>
      <div>
        <p>
          {name} ({calculateRemainingChecks(locations, name)})
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
