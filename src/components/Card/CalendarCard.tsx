import React, { useState, useContext } from 'react';
import { Task, Shift, Event } from "./../../utils/types"
import { PageState, PageStateContext } from '../../provider/PageStateProvider';

export default function CalendarCard({ cardType, data }: { cardType: "task"|"shift"|"event", data: Task|Shift|Event}) {
    // ページの状態を管理する
    const {setPageState, setFetchingId, setFetchingData, tabKey, setTabKey} = useContext(PageStateContext);

    // カードがクリック中かどうかを管理する
    const [isActive, setIsActive] = useState<boolean>(false);

    // カードのタイトルを取得する
    function getTitle(): string{
        let result: string = "";
        switch(cardType){
            case "task":
                const taskData: Task = data as Task;
                result = taskData.title || "課題";
                break;
            case "shift":
                result = "バイト";
                break;
            case "event":
                const eventData: Event = data as Event;
                result = eventData.title || "予定";
                break;
            default:
                break;
        }
        return result;
    }

    return (
        <div
            className={`d-flex bg-${cardType} text-white rounded user-select-none ${isActive ? "opacity-75" : ""}`}
            style={{marginBottom: "1px"}}
            onMouseDown={() => setIsActive(true)}
            onMouseUp={() => setIsActive(false)}
            onMouseLeave={() => setIsActive(false)}
            onTouchStart={() => setIsActive(true)}
            onTouchEnd={() => setIsActive(false)}
            onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                if(data.id){
                    setFetchingId(data.id);
                    setFetchingData(data);
                    if(tabKey === "shift"){
                        setPageState("view");
                    }else{
                        const newPageState: PageState = `${cardType}View` as PageState;
                        setPageState(newPageState);
                    }
                }
                event.stopPropagation(); // 親要素へのonClickイベントの伝搬を止める
            }}
        >
            <span className="w-100 d-inline-block text-nowrap overflow-hidden" style={{fontSize: "12px"}}>{getTitle()}</span>
        </div>
    );
}