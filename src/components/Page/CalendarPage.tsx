import React, { useState, useEffect } from 'react';
import CalendarColumn from '../Others/CalendarColumn';
import AddButton from "./../Others/AddButton"
import CalendarUiBar from '../UiBarColumn/CalendarUiBar';
import WeekdayColumn from '../Others/WeekdayColumn';

interface MyProps{
    focusYear: number;
    focusMonth: number;
    changeMonth: (amount: 1|-1) => void;
}

export default function CalendarPage(props: MyProps) {
    const {focusYear, focusMonth, changeMonth} = props;

    return (
        <div className="h-100 position-relative">
            <div className="container h-100 border-start border-end d-flex flex-column">
                <CalendarUiBar focusMonth={focusMonth} focusYear={focusYear} changeMonth={changeMonth}/>
                <WeekdayColumn pageType="calendar"/>
                <CalendarColumn pageType="calendar" focusMonth={focusMonth} focusYear={focusYear}/>
            </div>
            <AddButton/>
        </div>
    );
}