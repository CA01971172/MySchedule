import React, { useState, useEffect } from 'react';
import { Events, Event , Tasks, Task } from '../../utils/types';
import TandemCard from "./../Card/TandemCard"

// 課題のデータを締め切り時刻で並べ替える関数
function sortTaskByDeadline(tasks: Tasks): Task[]{
    const sortedTasks = Object.entries(tasks || {})
        .map(([id, task]) => ({ id, ...task }))
        .sort((a, b) => a.deadline - b.deadline);
    return sortedTasks;
}

// 予定のデータを開始時間で並べ替える関数
function sortEventByStartTime(events: Events): Event[]{
    const sortedEvents = Object.entries(events || {})
        .map(([id, event]) => ({ id, ...event }))
        .sort((a, b) => a.startTime - b.startTime);
    return sortedEvents;
}

export default function CardListColumn({ pageType, data }: { pageType: "task" | "event", data: Tasks|Events}) {
    // データを整えて管理する
    const [sortedData, setSortedData] = useState<Task[] | Event[]>([]);
    useEffect(()=>{
        let newData: Task[] | Event[] = new Array;
        if(pageType === "task"){
            newData = sortTaskByDeadline(data as Tasks);
        }else if(pageType === "event"){
            newData = sortEventByStartTime(data as Events);
        }
        setSortedData(newData);
    }, [data])

    return (
        <div className="row p-2">
            {sortedData.map((data, index) => (
                <TandemCard key={index} cardType={pageType} data={data}/>
            ))}
        </div>
    );
}