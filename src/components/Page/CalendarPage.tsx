import React from 'react';
import CalendarColumn from '../Others/CalendarColumn';
import CalendarAddButton from "./../Others/CalendarAddButton"
import CalendarUiBar from '../UiBarColumn/CalendarUiBar';
import WeekdayColumn from '../Others/WeekdayColumn';

export default function CalendarPage() {
    return (
        <div className="h-100 position-relative">
            <div className="container h-100 border-start border-end d-flex flex-column">
                <CalendarUiBar/>
                <WeekdayColumn pageType="calendar"/>
                <CalendarColumn pageType="calendar"/>
            </div>
            <CalendarAddButton/>
        </div>
    );
}