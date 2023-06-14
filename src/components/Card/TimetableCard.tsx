import React, { useState, useEffect } from 'react';
import { Timetable } from "./../../utils/types"

export default function TimetableCard({ timetable }: { timetable: Timetable}) {
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");

    useEffect(() => {
        // 授業の開始時間を文字列で取得する
        const startTimeDate: Date = new Date(timetable.startTime);
        const startTimeHour: number = startTimeDate.getHours();
        const startTimeMinute: number = startTimeDate.getMinutes();
        const startTimeStr: string = `${( "00" + startTimeHour ).slice( -2 )}:${( "00" + startTimeMinute ).slice( -2 )}`;
        setStartTime(startTimeStr);

        // 授業の終了時間を文字列で取得する
        const endTimeDate: Date = new Date(timetable.endTime);
        const endTimeHour: number = endTimeDate.getHours();
        const endTimeMinute: number = endTimeDate.getMinutes();
        const endTimeStr: string = `${( "00" + endTimeHour ).slice( -2 )}:${( "00" + endTimeMinute ).slice( -2 )}`;
        setEndTime(endTimeStr);
    }, [timetable])

    return (
        <div className="mb-1 bg-timetable text-white rounded user-select-none">
            <div className="d-flex justify-content-center">
                <b className="text-truncate">{timetable.title}</b>
            </div>
            <div className="d-flex justify-content-center">{startTime}</div>
            <div className="m-auto text-vertical">～</div>
            <div className="d-flex justify-content-center">{endTime}</div>
        </div>
    );
}