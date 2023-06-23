import React, {useContext, useState, useEffect} from 'react';
import CalendarCard from "./../Card/CalendarCard"
import { PageState, PageStateContext } from '../../provider/PageStateProvider';
import { CalendarData, Event, Shift, Task } from '../../utils/types';
import { TaskContext } from '../../provider/TaskProvider';
import { ShiftContext } from '../../provider/ShiftProvider';

interface MyProps{
    pageType: "shift" | "calendar"
    year: number;
    month: number;
    day: number;
    textColor: string;
    border: string;
}

export default function CalendarDay(props: MyProps) {
    const {pageType, year, month, day, textColor, border} = props;

    const {setPageState, setCreateDate, setFetchingId, setFetchingData, tabKey} = useContext(PageStateContext);

    // 課題のデータを管理する
    const [tasks, setTasks] = useContext(TaskContext);
    // バイトのシフトのデータを管理する
    const [shifts, setShifts] = useContext(ShiftContext);
    // 予定のデータを管理する
    // const [events, setEvents] = useContext(EventContext);

    // その日のデータを管理する
    const [data, setData] = useState<CalendarData>({tasks: [], shifts: [], events: []})
    useEffect(() => {
        setData(getDayData());
    },[tasks, shifts/* , events */])
    // その日のデータを取得する関数
    function getDayData(): CalendarData{
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
        for(const key in shifts){
            const value: Shift = shifts[key];
            const startTime: number = value.startTime;
            if((startTime >= nowDayTime) && (startTime < nextDayTime)){
                value.id = key;
                shiftsInRange.push(value);
            }
        }
        result.shifts = shiftsInRange;
        // 課題のデータを取得する
        const tasksInRange: Task[] = new Array;
        for(const key in tasks){
            const value: Task = tasks[key];
            const deadline: number = value.deadline;
            if((deadline >= nowDayTime) && (deadline < nextDayTime)){
                value.id = key;
                tasksInRange.push(value);
            }
        }
        result.tasks = tasksInRange;
        // 予定のデータを取得する
        const eventsInRange: Event[] = new Array;
/*         for(const key in events){
            const value: Event = events[key];
            const startTime: number = value.startTime;
            if((startTime >= nowDayTime) && (startTime < nextDayTime)){
                value.id = key;
                eventsInRange.push(value);
            }
        } */
        result.events = eventsInRange;
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
                setPageState(newPageState);
            }}
        >
            <div className={`text-center ${textColor}`}>
                {day}
            </div>
            <div className="flex-grow-1 overflow-y-auto">
                {data.shifts.map((value, index) => (
                    <CalendarCard key={index} cardType="shift" data={value}/>
                ))}
                {(pageType === "calendar") && data.tasks.map((value, index) => (
                    <CalendarCard key={index} cardType="task" data={value}/>
                ))}
                {(pageType === "calendar") && data.events.map((value, index) => (
                    <CalendarCard key={index} cardType="event" data={value}/>
                ))}
            </div>
        </div>
    );
}