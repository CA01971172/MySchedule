import React, { useState } from 'react';
import UiBarColumn from '../UiBarColumn/PlainUiBar';
import WeekdayColumn from '../Others/WeekdayColumn';
import CalendarColumn from '../Others/CalendarColumn';

export default function CalendarPage() {
    const [focusYear, setFocusYear] = useState<number>(2000);
    const [focusMonth, setFocusMonth] = useState<number>(1);

    return (
        <div/>
    );
}