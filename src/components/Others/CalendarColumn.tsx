import React, { useContext } from 'react';
import { TaskContext } from "./../../provider/TaskProvider"
import { ShiftContext } from "./../../provider/ShiftProvider"
// import { EventContext } from "./../../provider/EventProvider"
import CalendarDay from "./CalendarDay"
import { Event, Shift, Task, CalendarData } from '../../utils/types';
import { CalendarContext } from '../../provider/CalendarProvider';

type MonthDay = {
    month: number;
    day: number;
    dayOfWeek: number;
}

export default function CalendarColumn({pageType}: {pageType: "shift" | "calendar"}) {
    // バイトシフトのドロワーメニュー用Context
    const {focusYear, focusMonth, shiftCalendarRef} = useContext(CalendarContext);

    // 課題のデータを管理する
    const [tasks, setTasks] = useContext(TaskContext);
    // バイトのシフトのデータを管理する
    const [shifts, setShifts] = useContext(ShiftContext);
    // 予定のデータを管理する
    // const [events, setEvents] = useContext(EventContext);

    // その月のカレンダーに格納すべき日を全て取得する関数
    function getDays(): MonthDay[]{
        const result: MonthDay[] = new Array;
        // 余白埋め用で、先月分のカレンダーの部分を作成する
        const firstWeekDay: number = new Date(focusYear, focusMonth - 1, 1).getDay(); // 月の初日の曜日
        const prevMonthDayLength: number = firstWeekDay; // その月のカレンダーがどれだけ前の月の日を含むか
        const lastPrevMonthDay: number = new Date(focusYear, focusMonth - 1, 0).getDate(); // 前の月の最終日
        for(let i: number = lastPrevMonthDay - prevMonthDayLength + 1; i <= lastPrevMonthDay; i++){
            result.push({ month: focusMonth - 1, day: i, dayOfWeek: getDayOfWeek(focusYear, focusMonth - 1, i) });
        }
        // 今月分のカレンダーの部分を作成する
        const lastMonthDay: number = new Date(focusYear, focusMonth, 0).getDate(); // 今の月の最終日
        for(let i: number = 1; i <= lastMonthDay; i++){
            result.push({ month: focusMonth, day: i, dayOfWeek: getDayOfWeek(focusYear, focusMonth, i) });
        }
        // 余白埋め用で、来月分のカレンダーの部分を作成する
        const calendarRows: number = 6; // カレンダーが含む行数
        const surplusLength: number = calendarRows * 7 - result.length// 先月と今月の日をカレンダーに入れて、カレンダーの余った部分の日数
        for(let i: number = 1; i <= surplusLength; i++){
            result.push({ month: focusMonth + 1, day: i, dayOfWeek: getDayOfWeek(focusYear, focusMonth + 1, i) });
        }
        return result;
    }
    // 曜日を取得する関数
    function getDayOfWeek(year: number, month: number, day: number): number {
        return new Date(year, month - 1, day).getDay();
    }

    // カレンダーの日付の色を取得する関数
    function getTextColor(dayOfWeek: number, month: number): string{
        let result = "";
        if(month === focusMonth){
            switch(dayOfWeek){
                case 0:
                    result = "text-red";
                    break;
                case 6:
                    result = "text-blue";
                    break;
                default:
                    break;
            }
        }else{
            result = "text-muted";
        }
        return result;
    }
    // 枠線の太さを取得する関数
    function getBorder(index: number): string{
        let result: string = "";
        const classNames: string[] = new Array;
        if(index % 7 !== 0){
            // 一番左の列以外は、左線を付ける
            classNames.push("border-start");
        }
        if(index > 6){
            // 一番上の行以外は、上線を付ける
            classNames.push("border-top");
        }
        result = classNames.join(" ");
        return result;
    }

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
        <div className="row calendar-row flex-grow-1 overflow-hidden" ref={shiftCalendarRef}>
            {(getDays().map((value, index)=>(
                <CalendarDay
                    key={`${focusYear}/${value.month}/${value.day}`}
                    border={getBorder(index)}
                    textColor={getTextColor(value.dayOfWeek, value.month)}
                    day={value.day}
                    data={getDayData(focusYear, value.month, value.day)}
                />
            )))}
        </div>
    );
}