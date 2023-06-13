import React, { useState, useEffect } from 'react';
import UiBarColumn from '../UiBarColumn/UiBarColumn';
import WeekdayColumn from '../Others/WeekdayColumn';
import TimetableColumn from '../Others/TimetableColumn';
import { Timetables } from "./../../utils/types"
import { TimetableDbController } from "./../../utils/DbController/TimetableDbController"
import AppUser from '../../utils/AppUser';

export default function TimetablePage() {
    const [timetables, setTimetables] = useState<Timetables>({})

    useEffect(() => {
        let newTimetablesData: Timetables;
        TimetableDbController.readTimetable().then((response) =>{
            newTimetablesData = response as Timetables;
            setTimetables(newTimetablesData);
            console.log("data",newTimetablesData)
        });
    }, [])

    return (
        <div>
            <h1>timetable</h1>
            <TimetableColumn timetables={timetables}/>
        </div>
    );
}