import React, {useContext} from 'react';
import { CalendarData } from '../../utils/types';
import CalendarCard from "./../Card/CalendarCard"
import { CalendarContext } from '../../provider/CalendarProvider';
import { PageState, PageStateContext } from '../../provider/PageStateProvider';

interface MyProps{
    year: number;
    month: number;
    day: number;
    textColor: string;
    border: string;
    data: CalendarData;
}

export default function CalendarDay(props: MyProps) {
    const {year, month, day, textColor, border, data} = props;

    const {setPageState, setCreateDate, setFetchingId, setFetchingData, tabKey} = useContext(PageStateContext);

    // その日のデータを取得する関数
    function getDayData(year: number, month: number, day: number): CalendarData{
        const result: CalendarData = {
            tasks: [],
            shifts: [],
            events: []
        };
        // 今日初めと翌日初めのDateオブジェクトを取得する
        const nowDay: Date = new Date(year, month-1, day);
        const nowDayTime: number = nowDay.getTime();
        const nextDay: Date = new Date(year, month-1, day+1);
        const nextDayTime: number = nextDay.getTime();
        // アルバイトシフトのデータを取得する
        const shiftsInRange: Shift[] = new Array;
        Object.keys(shifts).forEach((key) => {
            const value: Shift = shifts[key];
            const startTime: number = value.startTime;
            if((startTime >= nowDayTime) && (startTime < nextDayTime)){
                value.id = key;
                shiftsInRange.push(value);
            }
        })
        result.shifts = shiftsInRange;
        // シフトでなくカレンダーページなら、課題と予定のデータを取得する
        if(pageType === "calendar"){
            // 課題のデータを取得する
            const tasksInRange: Task[] = new Array;
            Object.keys(tasks).forEach((key) => {
                const value: Task = tasks[key];
                const deadline: number = value.deadline;
                if((deadline >= nowDayTime) && (deadline < nextDayTime)){
                    value.id = key;
                    tasksInRange.push(value);
                }
            })
            result.tasks = tasksInRange;
            // 予定のデータを取得する
/*             const eventsInRange: Event[] = new Array;
            Object.keys(events).forEach((key) => {
                const value: Event = events[key];
                const startTime: number = value.startTime;
                if((startTime >= nowDayTime) && (startTime < nextDayTime)){
                    value.id = key;
                    eventsInRange.push(value);
                }
            })
            result.events = eventsInRange; */
        }
        return result;
    }

    return (
        <div
            className={`col d-flex flex-column p-1 ${border}`}
            onClick={() => {
                const theDate: Date = new Date(year, month - 1, day);
                let newPageState: PageState = "edit";
                if(tabKey === "calendar") newPageState = "taskEdit";
                setCreateDate(theDate);
                setFetchingId(null);
                setFetchingData(null);
                setPageState("edit");
                console.log(theDate);
            }}
        >
            <div className={`text-center ${textColor}`}>
                {day}
            </div>
            <div className="flex-grow-1 overflow-y-auto">
                {data.shifts.map((value, index) => (
                    <CalendarCard key={index} cardType="shift" data={value}/>
                ))}
                {data.tasks.map((value, index) => (
                    <CalendarCard key={index} cardType="task" data={value}/>
                ))}
                {data.events.map((value, index) => (
                    <CalendarCard key={index} cardType="event" data={value}/>
                ))}
            </div>
        </div>
    );
}