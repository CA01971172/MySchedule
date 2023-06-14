import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Timetables } from "./../utils/types"
import TimetableDbController from "./../utils/DbController/TimetableDbController"

export const TimetableContext = createContext<[Timetables, React.Dispatch<React.SetStateAction<Timetables>>]>([{}, ()=>{}])

export function TimetableProvider({children}: {children: ReactNode}){
    // 時間割のデータを管理する
    const [timetables, setTimetables] = useState<Timetables>({})

    useEffect(() => {
        let newTimetablesData: Timetables;
        TimetableDbController.readTimetable().then((response) =>{
            newTimetablesData = response as Timetables;
            setTimetables(newTimetablesData);
            console.log("timetables",newTimetablesData)
        });
    }, [])

    return (
        <TimetableContext.Provider value={[timetables, setTimetables]}>
            {children}
        </TimetableContext.Provider>
    );
}