import React from 'react';

// 日用のinput要素
export default function MonthInput({ day, setDay, setIsTouched }: { day: number, setDay: (value: number)=>void, setIsTouched:(value: boolean)=>void }){
    return (
        <input
        className="form-control"
        type="number"
        min={1}
        max={12}
        value={`${day}`.slice(-2)}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const receive: number = Number(event.target.value);
            setDay(Math.max(Math.min(Number(receive), 12), 0));
            setIsTouched(true);
        }}
        onBlur={() => {if(day <= 0) setDay(1)}}
    />
    );
}