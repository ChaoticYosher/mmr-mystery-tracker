import { Check } from "./Check";
import { MysterySetting } from "./MysterySetting";

export type LocationData = {
    locations: Check[];
    settings: MysterySetting[];
    currentSettings: { [key: string]: string };
};

export enum ChecklistAction {
    UpdateSetting = "checklistActionUpdateSetting",
}

export type LocationUpdateData = {
    type: ChecklistAction;
} & UpdateSettingData;

export type UpdateSettingData = {
    category: string;
    value: string;
};
