import { SettingData, TrackerAction } from "../types/LocationData";
import { Category, MysterySettingData } from "../types/MysterySettingData";
import { useSetting, useSettingDispatch } from "./SettingContext";

export interface MysterySettingProps {
    setting: MysterySettingData;
}

export function MysterySetting({ setting }: MysterySettingProps) {
    const data: SettingData = useSetting();
    const dispatch = useSettingDispatch();
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
                        category.name === data.enabled[setting.name]
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
