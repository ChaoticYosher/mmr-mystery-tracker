import { Check } from "../types/Check";
import { LocationData, TrackerAction } from "../types/LocationData";
import { useLocations, useLocationsDispatch } from "./LocationContext";

export function Location({ id, spoiler, region }: Check) {
  const locations: LocationData = useLocations();
  const dispatch = useLocationsDispatch();
  return (
    <button
      key={id}
      className={
        locations.checkedLocations.get(region)?.includes(spoiler)
          ? "checked"
          : ""
      }
      onClick={() => {
        dispatch({
          type: TrackerAction.UpdateLocation,
          name: spoiler,
          region: region,
        });
      }}
    >
      {spoiler}
    </button>
  );
}
