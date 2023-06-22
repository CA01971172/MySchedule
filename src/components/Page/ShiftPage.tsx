import React, { useState, useEffect } from 'react';
import CalendarColumn from '../Others/CalendarColumn';
import AddButton from "./../Others/AddButton"
import CalendarUiBar from '../UiBarColumn/CalendarUiBar';
import WeekdayColumn from '../Others/WeekdayColumn';

export default function ShiftPage({tabKey}: {tabKey: string}) {
    // フォーカス中の月を管理する
    const [focusYear, setFocusYear] = useState<number>(2000);
    const [focusMonth, setFocusMonth] = useState<number>(1);
    // フォーカス中の月を初期化する
    useEffect(() => {
        if(tabKey === "shift"){
            const nowDate: Date = new Date();
            const newYear: number = nowDate.getFullYear();
            const newMonth: number = nowDate.getMonth() + 1;
            setFocusYear(newYear);
            setFocusMonth(newMonth);
        }
    }, [tabKey])

    return (
        <div className="h-100 position-relative">
            <div className="container h-100 border-start border-end d-flex flex-column">
                <CalendarUiBar focusMonth={focusMonth} focusYear={focusYear} setFocusYear={setFocusYear} setFocusMonth={setFocusMonth}/>
                <WeekdayColumn pageType="shift"/>
                <CalendarColumn pageType="shift" focusMonth={focusMonth} focusYear={focusYear}/>
            </div>
            <AddButton/>
        </div>
    );
}