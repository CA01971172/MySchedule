import React from 'react';

// 曜日用のselect要素
export default function DayOfWeekSelect({ id, dayOfWeek, setDayOfWeek, setIsTouched}: { id: string, dayOfWeek: number, setDayOfWeek: (value: number)=>void, setIsTouched:(value: boolean)=>void}){
    return (
        <select
        style={{width: "5rem"}}
        className="form-select"
        id={id}
        aria-label="weekday select"
        value={dayOfWeek}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            setDayOfWeek(Number(event.target.value));
            setIsTouched(true);
        }}
    >
        <option value="1">月</option>
        <option value="2">火</option>
        <option value="3">水</option>
        <option value="4">木</option>
        <option value="5">金</option>
    </select>
    );
}