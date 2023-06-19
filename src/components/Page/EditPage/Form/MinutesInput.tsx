import React from 'react';

// 分用のinput要素
export default function MinutesInput({ minutes, setMinutes, setIsTouched }: { minutes: number, setMinutes: (value: number)=>void, setIsTouched:(value: boolean)=>void }){
    return (
        <input
        className="form-control"
        type="number"
        min={0}
        max={59}
        value={`00${minutes}`.slice(-2)}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const receive: string = event.target.value;
            setMinutes(Math.max(Math.min(Number(receive), 59), 0));
            setIsTouched(true);
        }}
    />
    );
}