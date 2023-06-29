import React, { useState, useEffect, useContext } from 'react';
import { Events, Event , Tasks, Task } from '../../utils/types';
import TandemCard from "./../Card/TandemCard"
import { EventSettingsContext } from '../../provider/EventSettingsProvider';

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

// 過去のDateかどうか判定する関数
function getIsPassedDate(date: Date, isAllDay: boolean): boolean{
    let result: boolean = false;
    const nowDate: Date = new Date();
    let theDate: Date;
    if(isAllDay){
        const theYear: number = date.getFullYear();
        const theMonth: number = date.getMonth();
        const theDay: number = date.getDate();
        theDate = new Date(theYear, theMonth, theDay+1);
    }else{
        theDate = date;
    }
    if(theDate.getTime() < nowDate.getTime()){
        result = true;
    }
    return result;
}

export default function CardListColumn({ pageType, data }: { pageType: "task" | "event", data: Tasks|Events}) {
    // 予定の設定データを管理する
    const [eventSettings, setEventSettings] = useContext(EventSettingsContext);

    // 過去の予定かどうか判定する関数
    function getIsPassedEvent(data: Event): boolean{
        let result: boolean = false;
        const hidePassedEvent: boolean = eventSettings.hidePassedEvent;
        const isPassedEvent: boolean = getIsPassedDate(new Date(data.startTime), data.isAllDay);
        if(hidePassedEvent && isPassedEvent){
            result = true;
        }
        return result;
    }

    // データが過去の予定かどうか判定する関数
    function getIsPassedData(data: Task|Event): boolean|null{
        let result = null;
        if(pageType === "event"){
            const convertedData = data as Event;
            result = getIsPassedEvent(convertedData);
        }
        return result;
    }

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
                ((getIsPassedData(data) !== true) && (
                    <TandemCard key={index} cardType={pageType} data={data}/>
                ))
            ))}
        </div>
    );
}