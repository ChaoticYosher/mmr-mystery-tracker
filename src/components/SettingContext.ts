import { createContext, Dispatch, useContext } from "react";
import { SettingData, SettingUpdateData } from "../types/LocationData";

export const SettingContext = createContext<SettingData>({
    settings: [],
    enabled: {},
});

export function useSetting() {
    return useContext(SettingContext);
}

export const SettingDispatchContext = createContext<
    Dispatch<SettingUpdateData>
>(() => {});

export function useSettingDispatch() {
    return useContext(SettingDispatchContext);
}
