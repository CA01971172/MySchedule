import React, { useState, useEffect } from 'react';
import UiBarColumn from '../UiBarColumn/UiBarColumn';
import WeekdayColumn from '../Others/WeekdayColumn';
import TimetableColumn from '../Others/TimetableColumn';
import { Timetable, Timetables } from "./../../utils/types"
import { TimetableDbController } from "./../../utils/DbController/TimetableDbController"

export default function TimetablePage() {
    const [timetables, setTimetables] = useState<Timetables>({})

    useEffect(() => {
        TimetableDbController.readTimetable
    },[timetables])

    return (
        <div/>
    );
}