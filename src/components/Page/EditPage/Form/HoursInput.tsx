import React from 'react';

// 時間用のinput要素
export default function HoursInput({ hours, setHours, setIsTouched }: { hours: number, setHours: (value: number)=>void, setIsTouched:(value: boolean)=>void }){
    return (
        <input
        className="form-control"
        type="number"
        min={0}
        max={23}
        value={`00${hours}`.slice(-2)}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const receive: string = event.target.value;
            setHours(Math.max(Math.min(Number(receive), 23), 0));
            setIsTouched(true);
        }}
    />
    );
}