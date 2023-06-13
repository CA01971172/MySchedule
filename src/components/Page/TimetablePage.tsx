import React, { useState } from 'react';
import UiBarColumn from '../UiBarColumn/UiBarColumn';
import WeekdayColumn from '../Others/WeekdayColumn';
import TimetableColumn from '../Others/TimetableColumn';
import { Timetable } from "./../../utils/types"
import { TimetableDbController } from "./../../utils/DbController/TimetableDbController"

export default function TimetablePage() {
    const [focusYear, setFocusYear] = useState<number>(2000);
    const [focusMonth, setFocusMonth] = useState<number>(1);

    return (
        <div/>
    );
}