import React, { useState, useEffect, useContext } from 'react';
import { Task, Event } from "./../../utils/types"
import { PageStateContext } from '../../provider/PageStateProvider';

export default function TandemCard({ cardType, data }: { cardType:"task"|"event", data: Task|Event}) {
    // ページの状態を管理する
    const [pageState, setPageState, fetchingId, setFetchingId, fetchingData, setFetchingData] = useContext(PageStateContext);

    // カードがクリック中かどうかを管理する
    const [isActive, setIsActive] = useState<boolean>(false);

    // データの時間(締め切りor開始時間)を文字列で管理する
    const [dataDate, setDataDate] = useState<string>("");

    useEffect(() => {
        // データの時間を文字列で取得する
        let newDataDate: number = 0;
        if(cardType === "task"){
            const TaskData: Task = data as Task;
            newDataDate = TaskData.deadline;
        }else{
            const EventData: Event = data as Event;
            newDataDate = EventData.startTime;
        }

    }, [data])

    return (
        <div
            className={`mb-1 ${(cardType === "task") ? "bg-task" : "bg-event"} text-white rounded user-select-none ${isActive ? "opacity-75" : ""}`}
            onMouseDown={() => setIsActive(true)}
            onMouseUp={() => setIsActive(false)}
            onMouseLeave={() => setIsActive(false)}
            onTouchStart={() => setIsActive(true)}
            onTouchEnd={() => setIsActive(false)}
            onClick={() => {
                if(data.id){
                    setFetchingId(data.id);
                    setFetchingData(data);
                    setPageState(1);
                }
            }}
        >
            <div>
                <span className="text-truncate fs-4">{data.title}</span>
            </div>
        </div>
    );
}