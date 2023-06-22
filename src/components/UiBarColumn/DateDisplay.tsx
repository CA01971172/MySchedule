import React, { useContext } from 'react';
import { CalendarContext } from '../../provider/CalendarProvider';

export default function DateDisplay() {
    const {focusYear, focusMonth} = useContext(CalendarContext);

    return (
        <div>
            <span className="fs-3 me-2">{focusYear}年</span>
            <span className="fs-3">{focusMonth}月</span>
        </div>
    );
}