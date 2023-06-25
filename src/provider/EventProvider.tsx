import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Events } from "./../utils/types"
import EventDbController from "./../utils/DbController/EventDbController"

export const EventContext = createContext<[Events, React.Dispatch<React.SetStateAction<Events>>]>([{}, ()=>{}])

export function EventProvider({children}: {children: ReactNode}){
    // バイトのシフトのデータを管理する
    const [events, setEvents] = useState<Events>({})

    useEffect(() => {
        let newEventsData: Events;
        EventDbController.readEvent().then((response) =>{
            newEventsData = response as Events;
            setEvents(newEventsData || {});
        });
    }, [])

    return (
        <EventContext.Provider value={[events, setEvents]}>
            {children}
        </EventContext.Provider>
    );
}