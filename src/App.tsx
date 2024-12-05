import "./App.css";
import { Checklist } from "./components/Checklist";
import { LocationContext } from "./components/LocationContext";
import _locations from "./data/checks.json";
import _settings from "./data/mystery.json";
import { LocationData } from "./types/LocationData";

function App() {
    const initialSettings: { [key: string]: string } = {};
    const data: LocationData = {
        locations: _locations,
        settings: _settings,
        currentSettings: initialSettings,
    };
    data.settings.forEach((setting) =>
        setting.categories.forEach((category) => {
            if (category.default) {
                initialSettings[setting.name] = category.name ?? "Off";
            }
        })
    );
    return (
        <>
            <LocationContext.Provider value={data}>
                <Checklist></Checklist>
            </LocationContext.Provider>
        </>
    );
}

export default App;
