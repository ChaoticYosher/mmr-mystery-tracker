import { useImmerReducer } from "use-immer";
import {
    SettingData,
    SettingUpdateData,
    TrackerAction,
} from "../types/LocationData";
import { SettingContext, SettingDispatchContext } from "./SettingContext";
import { MysterySettingData } from "../types/MysterySettingData";

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

export type SettingProviderProps = React.PropsWithChildren & {
    initialSettings: SettingData;
};

export function SettingProvider({
    initialSettings,
    children,
}: SettingProviderProps) {
    const [settings, settingsDispatch] = useImmerReducer(
        reducer,
        initialSettings
    );
    return (
        <SettingContext.Provider value={settings}>
            <SettingDispatchContext.Provider value={settingsDispatch}>
                {children}
            </SettingDispatchContext.Provider>
        </SettingContext.Provider>
    );
}
