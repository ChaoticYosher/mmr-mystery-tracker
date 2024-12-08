import { useContext } from "react";
import { LocationData, SettingData } from "../types/LocationData";
import { LocationContext } from "./LocationContext";
import { MysterySetting } from "./MysterySetting";
import { Region } from "./Region";
import { SettingContext } from "./SettingContext";

export function Checklist() {
    const locations: LocationData = useContext(LocationContext);
    const settings: SettingData = useContext(SettingContext);
    return (
        <>
            {settings.settings.map((setting) => (
                <MysterySetting key={setting.name} setting={setting} />
            ))}
            {Array.from(locations.regionCache.keys()).map((region: string) => (
                <Region key={region} name={region}></Region>
            ))}
        </>
    );
}
