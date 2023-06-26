import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { EventSettings } from "../utils/types"
import EventSettingsDbController from '../utils/DbController/EventSettingsDbController';

export const EventSettingsContext = createContext<[EventSettings, React.Dispatch<React.SetStateAction<EventSettings>>]>([{} as EventSettings, ()=>{}])

export function EventSettingsProvider({children}: {children: ReactNode}){
    // 予定の設定データを管理する
    const [eventSettings, setEventSettings] = useState<EventSettings>({
        hidePassedEvent: false
    });

    // 設定データをデータベースから取得する
    useEffect(() => {
        let newEventSettings: EventSettings = {} as EventSettings;
        EventSettingsDbController.getHidePassedEvent().then((hidePassedEvent) => {
            newEventSettings.hidePassedEvent = hidePassedEvent;
            setEventSettings(newEventSettings);
        })
    }, [])

    return (
        <EventSettingsContext.Provider value={[eventSettings, setEventSettings]}>
            {children}
        </EventSettingsContext.Provider>
    );
}