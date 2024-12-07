import { useContext } from "react";
import { useImmerReducer } from "use-immer";
import {
    SettingData,
    SettingUpdateData,
    TrackerAction,
} from "../types/LocationData";
import { Category, MysterySettingData } from "../types/MysterySettingData";
import { SettingContext } from "./SettingContext";

function reducer(data: SettingData, action: SettingUpdateData) {
    switch (action.type) {
        case TrackerAction.UpdateSetting: {
            const setting: MysterySettingData | undefined = data.settings.find(
                (setting) => action.category === setting.name
            );
            if (
                setting &&
                setting.categories.find(
                    (category) => category.name === action.value
                )
            ) {
                data.enabled[action.category] = action.value;
            }
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
