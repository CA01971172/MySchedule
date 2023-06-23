import React, { useState, useEffect, useContext } from 'react';
import { PageStateContext } from '../../provider/PageStateProvider';
import { Timetable } from "./../../utils/types"

export default function TimetableCard({ timetable }: { timetable: Timetable}) {
    // ページの状態を管理する
    const {setPageState, setFetchingId, setFetchingData} = useContext(PageStateContext);

    // カードがクリック中かどうかを管理する
    const [isActive, setIsActive] = useState<boolean>(false);

    // 授業の開始/終了時間を文字列で管理する
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
        <div
            className={`mb-1 bg-timetable text-white rounded user-select-none ${isActive ? "opacity-75" : ""}`}
            onMouseDown={() => setIsActive(true)}
            onMouseUp={() => setIsActive(false)}
            onMouseLeave={() => setIsActive(false)}
            onTouchStart={() => setIsActive(true)}
            onTouchEnd={() => setIsActive(false)}
            onClick={() => {
                if(timetable.id){
                    setFetchingId(timetable.id);
                    setFetchingData(timetable);
                    setPageState("view");
                }
            }}
        >
            <div className="d-flex justify-content-center">
                <b className="text-truncate">{timetable.title}</b>
            </div>
            <div className="d-flex justify-content-center">{startTime}</div>
            <div className="m-auto text-vertical">～</div>
            <div className="d-flex justify-content-center">{endTime}</div>
        </div>
    );
}