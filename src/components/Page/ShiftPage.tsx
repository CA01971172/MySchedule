import React, { useState, useEffect } from 'react';
import CalendarColumn from '../Others/CalendarColumn';
import AddButton from "./../Others/AddButton"
import CalendarUiBar from '../UiBarColumn/CalendarUiBar';
import WeekdayColumn from '../Others/WeekdayColumn';

export default function ShiftPage() {
    return (
        <div className="h-100 position-relative">
            <div className="container h-100 border-start border-end d-flex flex-column">
                <CalendarUiBar/>
                <WeekdayColumn pageType="shift"/>
                <CalendarColumn pageType="shift"/>
            </div>
            <AddButton/>
        </div>
    );
}