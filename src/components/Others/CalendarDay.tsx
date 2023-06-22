import React from 'react';
import { CalendarData } from '../../utils/types';
import CalendarCard from "./../Card/CalendarCard"

interface MyProps{
    day: number;
    textColor: string;
    border: string;
    data: CalendarData;
}

export default function CalendarDay(props: MyProps) {
    const {day, textColor, border, data} = props;

    return (
        <div className={`col p-1 ${border}`}>
            <div className={`text-center ${textColor}`}>
                {day}
            </div>
            {data.shifts.map((value, index) => (
                <CalendarCard key={index} cardType="shift" data={value}/>
            ))}
        </div>
    );
}