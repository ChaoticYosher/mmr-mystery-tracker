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
                data.currentSettings[actionData.category] = actionData.value;
            }
            console.log(Array.from(Object.entries(data.currentSettings)));
            return data;
        }
    }
}

export function Checklist() {
    const data: LocationData = useContext(LocationContext);
    const [state, dispatch] = useImmerReducer(reducer, data);
    return (
        <>
            {state.settings.map((setting) =>
                setting.categories.map((category) => (
                    <button
                        key={setting.name + ": " + category.name}
                        onClick={() =>
                            dispatch({
                                type: ChecklistAction.UpdateSetting,
                                category: setting.name,
                                value: category.name ?? "",
                            })
                        }
                        className={
                            category.name &&
                            category.name ===
                                state.currentSettings[setting.name]
                                ? "selected-setting"
                                : ""
                        }
                    >
                        {setting.name}: {category.name}
                    </button>
                ))
            )}
            {state.locations.map((location) => (
                <button key={location.id}>{location.name}</button>
            ))}
        </>
    );
}
