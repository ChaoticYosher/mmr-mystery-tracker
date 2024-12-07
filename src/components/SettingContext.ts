import { createContext } from "react";
import { SettingData } from "../types/LocationData";

export const SettingContext = createContext<SettingData>({
    settings: [],
    enabled: {},
});
