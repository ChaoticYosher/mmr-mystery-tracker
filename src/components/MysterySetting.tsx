import { useContext } from "react";
import { useImmerReducer } from "use-immer";
import {
    TrackerAction,
    LocationUpdateData,
    SettingData,
    UpdateSettingData,
} from "../types/LocationData";
import { Category, MysterySettingData } from "../types/MysterySettingData";
import { SettingContext } from "./SettingContext";

function reducer(data: SettingData, action: LocationUpdateData) {
    switch (action.type) {
        case TrackerAction.UpdateSetting: {
            const actionData: UpdateSettingData = action;
            const setting: MysterySettingData | undefined = data.settings.find(
                (setting) => actionData.category === setting.name
            );
            if (
                setting &&
                setting.categories.find(
                    (category) => category.name === actionData.value
                )
            ) {
                data.enabled[actionData.category] = actionData.value;
            }
            console.log(Array.from(Object.entries(data.enabled)));
            return data;
        }
    }
}

export interface MysterySettingProps {
    setting: MysterySettingData;
}

export function MysterySetting({ setting }: MysterySettingProps) {
    const data: SettingData = useContext(SettingContext);
    const [state, dispatch] = useImmerReducer(reducer, data);

    return (
        <div>
            {setting.categories.map((category: Category) => (
                <button
                    key={setting.name + ": " + category.name}
                    onClick={() =>
                        dispatch({
                            type: TrackerAction.UpdateSetting,
                            category: setting.name,
                            value: category.name ?? "",
                        })
                    }
                    className={
                        category.name &&
                        category.name === state.enabled[setting.name]
                            ? "selected-setting"
                            : ""
                    }
                >
                    {setting.name}: {category.name}
                </button>
            ))}
        </div>
    );
}
