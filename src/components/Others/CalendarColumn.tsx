import React, { useContext } from 'react';
import CalendarDay from "./CalendarDay"
import { CalendarContext } from '../../provider/CalendarProvider';

type DateNumber = {
    year: number;
    month: number;
    day: number;
    dayOfWeek: number;
}

export default function CalendarColumn({pageType}: {pageType: "shift" | "calendar"}) {
    // バイトシフトのドロワーメニュー用Context
    const {focusYear, focusMonth, shiftCalendarRef} = useContext(CalendarContext);

    // その月のカレンダーに格納すべき日を全て取得する関数
    function getDays(): DateNumber[]{
        const result: DateNumber[] = new Array;
        // 余白埋め用で、先月分のカレンダーの部分を作成する
        const firstWeekDay: number = new Date(focusYear, focusMonth - 1, 1).getDay(); // 月の初日の曜日
        const prevMonthDayLength: number = firstWeekDay; // その月のカレンダーがどれだけ前の月の日を含むか
        const lastPrevMonthDay: number = new Date(focusYear, focusMonth - 1, 0).getDate(); // 前の月の最終日
        for(let i: number = lastPrevMonthDay - prevMonthDayLength + 1; i <= lastPrevMonthDay; i++){
            result.push({
                year: focusYear,
                month: focusMonth - 1,
                day: i,
                dayOfWeek: getDayOfWeek(focusYear, focusMonth - 1, i)
            });
        }
        // 今月分のカレンダーの部分を作成する
        const lastMonthDay: number = new Date(focusYear, focusMonth, 0).getDate(); // 今の月の最終日
        for(let i: number = 1; i <= lastMonthDay; i++){
            result.push({
                year: focusYear,
                month: focusMonth,
                day: i, 
                dayOfWeek: getDayOfWeek(focusYear, focusMonth, i) 
            });
        }
        // 余白埋め用で、来月分のカレンダーの部分を作成する
        const calendarRows: number = 6; // カレンダーが含む行数
        const surplusLength: number = calendarRows * 7 - result.length// 先月と今月の日をカレンダーに入れて、カレンダーの余った部分の日数
        for(let i: number = 1; i <= surplusLength; i++){
            result.push({
                year: focusYear,
                month: focusMonth + 1,
                day: i,
                dayOfWeek: getDayOfWeek(focusYear, focusMonth + 1, i)
            });
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

    return (
        <div className="row calendar-row flex-grow-1 overflow-hidden" ref={shiftCalendarRef}>
            {(getDays().map((value, index)=>(
                <CalendarDay
                    key={`${focusYear}/${value.month}/${value.day}`}
                    pageType={pageType}
                    border={getBorder(index)}
                    textColor={getTextColor(value.dayOfWeek, value.month)}
                    year={value.year}
                    month={value.month}
                    day={value.day}
                />
            )))}
        </div>
    );
}