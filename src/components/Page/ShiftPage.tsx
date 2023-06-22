import React, { useState, useContext, useEffect } from 'react';
import { ShiftContext } from "./../../provider/ShiftProvider"
import CalendarColumn from '../Others/CalendarColumn';
import AddButton from "./../Others/AddButton"
import CalendarUiBar from '../UiBarColumn/CalendarUiBar';

export default function ShiftPage({tabKey}: {tabKey: string}) {
    // バイトのシフトのデータを管理する
    const [shifts, setShifts] = useContext(ShiftContext);

    // フォーカス中の月を管理する
    const [focusYear, setFocusYear] = useState<number>(2000);
    const [focusMonth, setFocusMonth] = useState<number>(1);
    // フォーカス中の月を初期化する
    useEffect(() => {
        const nowDate: Date = new Date();
        const newYear: number = nowDate.getFullYear();
        const newMonth: number = nowDate.getMonth();
        setFocusYear(newYear);
        setFocusMonth(newMonth);
    }, [tabKey])

    React.useEffect(()=>{
        console.log(shifts);
    },[shifts])

    return (
        <div className="h-100 position-relative">
            <div className="container h-100 border-start border-end d-flex flex-column">
                <CalendarUiBar focusMonth={focusMonth} focusYear={focusYear} setFocusYear={setFocusYear} setFocusMonth={setFocusMonth}/>
                <CalendarColumn pageType="shift" focusMonth={focusMonth} focusYear={focusYear}/>
            </div>
            <AddButton/>
        </div>
    );
}