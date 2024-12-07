import "./App.css";
import { Checklist } from "./components/Checklist";
import { LocationContext } from "./components/LocationContext";
import { SettingContext } from "./components/SettingContext";
import _locations from "./data/checks.json";
import _settings from "./data/mystery.json";
import { LocationData, SettingData } from "./types/LocationData";

function App() {
    const initialSettings: { [key: string]: string } = {};
    const locations: LocationData = {
        locations: _locations,
        regionCache: new Map<string, number[]>(),
        checkedLocations: new Map<string, string>(),
    };
    locations.locations.forEach((location, index) => {
        location.id = index;
        const region: string = location.region;
        if (!locations.regionCache.has(region)) {
            locations.regionCache.set(region, []);
        }
        locations.regionCache.get(region)?.push(index);
    });
    const settings: SettingData = {
        settings: _settings,
        enabled: initialSettings,
    };
    settings.settings.forEach((setting) =>
        setting.categories.forEach((category) => {
            if (category.default) {
                initialSettings[setting.name] = category.name ?? "Off";
            }
        })
    );
    return (
        <>
            <LocationContext.Provider value={locations}>
                <SettingContext.Provider value={settings}>
                    <Checklist></Checklist>
                </SettingContext.Provider>
            </LocationContext.Provider>
        </>
    );
}

export default App;
