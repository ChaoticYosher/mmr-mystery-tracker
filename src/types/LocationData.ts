import { Check } from "./Check";
import { MysterySettingData } from "./MysterySettingData";

export type LocationData = {
    locations: Check[];
    locationIndex: Map<string, number[]>;
    checkedLocations: Map<string, string>;
};

export enum TrackerAction {
    UpdateSetting = "checklistActionUpdateSetting",
}

export type LocationUpdateData = {
    type: TrackerAction;
} & UpdateSettingData;

export type UpdateSettingData = {
    category: string;
    value: string;
};

export type SettingData = {
    settings: MysterySettingData[];
    enabled: { [key: string]: string };
};
