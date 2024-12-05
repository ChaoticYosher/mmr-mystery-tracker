import { useContext } from "react";
import {
    ChecklistAction,
    LocationData,
    LocationUpdateData,
    UpdateSettingData,
} from "../types/LocationData";
import { LocationContext } from "./LocationContext";
import { useImmerReducer } from "use-immer";

function reducer(data: LocationData, action: LocationUpdateData) {
    switch (action.type) {
        case ChecklistAction.UpdateSetting: {
            const actionData: UpdateSettingData = action;
            const catIndex: number = data.settings.findIndex(
                (setting) => actionData.category === setting.name
            );
            if (catIndex != -1) {
                const optionIndex = data.settings[
                    catIndex
                ].categories.findIndex(
                    (category) => category === actionData.value
                );
                if (optionIndex != -1) {
                    data.currentSettings[data.settings[catIndex].name] =
                        data.settings[catIndex].categories[optionIndex].name ??
                        "";
                }
            }
            break;
        }
    }
}

export function Checklist() {
    const data: LocationData = useContext(LocationContext);
    const [state, dispatch] = useImmerReducer(reducer, data);
    return (
        <>
            {data.settings.map((setting) =>
                setting.categories.map((category) => (
                    <button
                        onClick={() =>
                            dispatch({
                                type: ChecklistAction.UpdateSetting,
                                category: setting.name,
                                value: category.name ?? "",
                            })
                        }
                    >
                        {setting.name}: {category.name}
                    </button>
                ))
            )}
            {state.locations.map((location) => (
                <button>{location.name}</button>
            ))}
        </>
    );
}
