import React, { useContext } from 'react';
import { CalendarContext } from '../../provider/CalendarProvider';

export default function DateController() {
    const {changeMonth} = useContext(CalendarContext);

    return (
        <div>
            <button
                className="btn fs-3"
                onClick={() => {changeMonth(-1)}}
            >
                <i className="bi bi-chevron-left"/>
            </button>
            <button
                className="btn fs-3"
                onClick={() => {changeMonth(1)}}
            >
                <i className="bi bi-chevron-right"/>
            </button>
        </div>
    );
}