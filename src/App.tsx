import "./App.css";
import { Checklist } from "./components/Checklist";
import { LocationProvider } from "./components/LocationProvider";
import { SettingProvider } from "./components/SettingProvider";
import _locations from "./data/checks.json";
import _settings from "./data/mystery.json";
import { LocationData, SettingData } from "./types/LocationData";

function initializeSettings(): SettingData {
    const initialSettings: { [key: string]: string } = {};
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
    return settings;
}

function initialLocations(): LocationData {
    const initialLocations: LocationData = {
        locations: _locations,
        regionCache: new Map<string, number[]>(),
        checkedLocations: new Map<string, string[]>(),
    };
    initialLocations.locations.forEach((location, index) => {
        location.id = index;
        const region: string = location.region;
        if (!initialLocations.regionCache.has(region)) {
            initialLocations.regionCache.set(region, []);
        }
        if (!initialLocations.checkedLocations.has(region)) {
            initialLocations.checkedLocations.set(region, []);
        }
        initialLocations.regionCache.get(region)?.push(index);
    });
    return initialLocations;
}

function App() {
    return (
        <LocationProvider initialLocations={initialLocations()}>
            <SettingProvider initialSettings={initializeSettings()}>
                <Checklist></Checklist>
            </SettingProvider>
        </LocationProvider>
    );
}

export default App;
