import React, { useState, useContext } from 'react';
import { Task, Shift, Event } from "./../../utils/types"
import { PageStateContext } from '../../provider/PageStateProvider';

export default function CalendarCard({ cardType, data }: { cardType: "task"|"shift"|"event", data: Task|Shift|Event}) {
    // ページの状態を管理する
    const [pageState, setPageState, fetchingId, setFetchingId, fetchingData, setFetchingData, tabKey, setTabKey] = useContext(PageStateContext);

    // カードがクリック中かどうかを管理する
    const [isActive, setIsActive] = useState<boolean>(false);

    // カードのタイトルを取得する
    function getTitle(): string{
        let result: string = "";
        switch(cardType){
            case "task":
                const taskData: Task = data as Task;
                result = taskData.title;
                break;
            case "shift":
                result = "バイト";
                break;
            case "event":
                const eventData: Event = data as Event;
                result = eventData.title;
                break;
            default:
                break;
        }
        return result;
    }

    return (
        <div
            className={`mb-1 bg-${cardType} text-white rounded user-select-none ${isActive ? "opacity-75" : ""}`}
            onMouseDown={() => setIsActive(true)}
            onMouseUp={() => setIsActive(false)}
            onMouseLeave={() => setIsActive(false)}
            onTouchStart={() => setIsActive(true)}
            onTouchEnd={() => setIsActive(false)}
            onClick={() => {
                if(data.id){
                    if(tabKey !== cardType) setTabKey(cardType);
                    setFetchingId(data.id);
                    setFetchingData(data);
                    setPageState(1);
                }
            }}
        >
            <span className="p-1">{getTitle()}</span>
        </div>
    );
}