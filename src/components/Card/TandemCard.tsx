import React, { useState, useEffect, useContext } from 'react';
import { Task, Event } from "./../../utils/types"
import { PageStateContext } from '../../provider/PageStateProvider';

export default function TandemCard({ cardType, data }: { cardType:"task"|"event", data: Task|Event}) {
    // ページの状態を管理する
    const {setPageState, setFetchingId, setFetchingData} = useContext(PageStateContext);

    // カードがクリック中かどうかを管理する
    const [isActive, setIsActive] = useState<boolean>(false);

    // データの時間(締め切りor開始時間)をDateオブジェクトで管理する
    const [dateData, setDateData] = useState<Date | null>(null);

    useEffect(() => {
        // データの時間をDateオブジェクトで取得する
        let newDateData: Date
        let dateTime: number = 0;
        if(cardType === "task"){
            const TaskData: Task = data as Task;
            dateTime = TaskData.deadline;
        }else{
            const EventData: Event = data as Event;
            dateTime = EventData.startTime;
        }
        newDateData = new Date(dateTime);
        setDateData(newDateData);
    }, [data])

    return (
        <div
            className={`mb-1 ${(cardType === "task") ? "bg-task" : "bg-event"} text-white fs-4 rounded user-select-none ${isActive ? "opacity-75" : ""}`}
            onMouseDown={() => setIsActive(true)}
            onMouseUp={() => setIsActive(false)}
            onMouseLeave={() => setIsActive(false)}
            onTouchStart={() => setIsActive(true)}
            onTouchEnd={() => setIsActive(false)}
            onClick={() => {
                if(data.id){
                    setFetchingId(data.id);
                    setFetchingData(data);
                    setPageState("view");
                }
            }}
        >
            <div className="text-truncate">
                <span>{data.title}</span>
            </div>
            <div className="text-truncate">
                <span className="me-3">{(cardType === "task") ? "〆" : "始"}</span>
                <span>{dateData ? (dateData.getMonth() + 1) : ""}</span>
                <span className="me-2">月</span>
                <span>{dateData ? (dateData.getDate()) : ""}</span>
                <span className="me-3">日</span>
                <span>{dateData ? (`00${dateData.getHours()}`.slice(-2)) : ""}</span>
                <span>：</span>
                <span>{dateData ? (`00${dateData.getMinutes()}`.slice(-2)) : ""}</span>
            </div>
        </div>
    );
}