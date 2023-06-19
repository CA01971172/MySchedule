import React from 'react';

// 年用のinput要素
export default function YearsInput({ years, setYears, setIsTouched }: { years: number, setYears: (value: number)=>void, setIsTouched:(value: boolean)=>void }){
    return (
        <input
        className="form-control"
        type="number"
        min={0}
        max={9999}
        value={`${years}`.slice(-4)}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const receive: string = event.target.value;
            setYears(Math.max(Math.min(Number(receive), 9999), 0));
            setIsTouched(true);
        }}
    />
    );
}