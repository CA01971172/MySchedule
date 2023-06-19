import React from 'react';
import PlainUiBar from '../UiBarColumn/PlainUiBar';
import WeekdayColumn from '../Others/WeekdayColumn';
import TimetableColumn from '../Others/TimetableColumn';
import AddButton from "./../Others/AddButton"


export default function TimetablePage() {
    return (
        <div className="h-100 position-relative">
            <div className="container h-100 border-start border-end d-flex flex-column">
                <PlainUiBar/>
                <WeekdayColumn pageType="timetable"/>
                <TimetableColumn/>
            </div>
            <AddButton/>
        </div>
    );
}