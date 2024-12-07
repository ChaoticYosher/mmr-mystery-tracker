import { Check } from "./Check";
import { MysterySettingData } from "./MysterySettingData";

export type LocationData = {
    locations: Check[];
    regionCache: Map<string, number[]>;
    checkedLocations: Map<string, string[]>;
};

export enum TrackerAction {
    UpdateSetting = "trackerActionUpdateSetting",
    UpdateLocation = "trackerActionUpdateLocation",
}

export type UpdateLocationData = {
    name: string;
    region: string;
    type: string;
};

export type SettingUpdateData = {
    category: string;
    value: string;
    type: TrackerAction;
};

export type SettingData = {
    settings: MysterySettingData[];
    enabled: { [key: string]: string };
};
