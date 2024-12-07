import { useContext } from "react";
import { LocationData, SettingData } from "../types/LocationData";
import { LocationContext } from "./LocationContext";
import { MysterySetting } from "./MysterySetting";
import { SettingContext } from "./SettingContext";

export function Checklist() {
    const locations: LocationData = useContext(LocationContext);
    const settings: SettingData = useContext(SettingContext);
    return (
        <>
            {settings.settings.map((setting) => (
                <MysterySetting setting={setting} />
            ))}
            {Array.from(locations.regionCache.keys()).map((region: string) => (
                <div>
                    <p>{region}</p>
                    {locations.regionCache.get(region)?.map((locationIndex) => (
                        <button key={locationIndex}>
                            {locations.locations[locationIndex].name}
                        </button>
                    ))}
                </div>
            ))}
        </>
    );
}
