import React from 'react';

// 月用のinput要素
export default function MonthInput({ month, setMonth, setIsTouched }: { month: number, setMonth: (value: number)=>void, setIsTouched:(value: boolean)=>void }){
    return (
        <input
        className="form-control"
        type="number"
        min={1}
        max={12}
        value={`${month}`.slice(-2)}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const receive: number = Number(event.target.value);
            setMonth(Math.max(Math.min(Number(receive), 12), 0));
            setIsTouched(true);
        }}
        onBlur={() => {if(month <= 0) setMonth(1)}}
    />
    );
}