import React, { useState, useContext } from 'react';
import { ShiftContext } from "./../../provider/ShiftProvider"
import CalendarColumn from '../Others/CalendarColumn';
import AddButton from "./../Others/AddButton"
import CalendarUiBar from '../UiBarColumn/CalendarUiBar';

export default function ShiftPage() {
    // バイトのシフトのデータを管理する
    const [shifts, setShifts] = useContext(ShiftContext);

    // フォーカス中の月を管理する
    const [focusYear, setFocusYear] = useState<number>(2000);
    const [focusMonth, setFocusMonth] = useState<number>(1);
    function changeMonth(amount: 1|-1){
        let newYear = focusYear;
        let newMonth = focusMonth;
        if(newMonth + amount > 12){
            newMonth = 1;
            newYear++;
        }else if(newMonth + amount){
            newMonth = 12;
            newYear--;
        }else{
            newMonth += amount;
        }
        setFocusMonth(newMonth);
        if(newYear !== focusMonth) setFocusYear(newYear);
    }

    return (
        <div className="h-100 position-relative">
            <div className="container h-100 border-start border-end d-flex flex-column">
                <CalendarUiBar changeMonth={changeMonth}/>
                <CalendarColumn pageType="shift"/>
            </div>
            <AddButton/>
        </div>
    );

    return (
        <div/>
    );
}