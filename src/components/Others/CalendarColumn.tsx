import React, { useContext } from 'react';
import CalendarDay from "./CalendarDay"
import { CalendarContext } from '../../provider/CalendarProvider';

type DateNumber = {
    year: number;
    month: number;
    day: number;
    dayOfWeek: number;
}

// DateオブジェクトをDateNumber型に変換する関数
function getDateNumber(date: Date): DateNumber{
    let result: DateNumber = {
        year: 0,
        month: 0,
        day: 0,
        dayOfWeek: 0
    }
    result.year = date.getFullYear();
    result.month = date.getMonth() + 1;
    result.day = date.getDate();
    result.dayOfWeek = date.getDay();
    return result;
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
    // 枠線のクラスを取得する関数
    function getBorder(dateNumber: DateNumber): string{
        let result: string = "";
        const nowDate: Date = new Date();
        const nowDateNumber: DateNumber = getDateNumber(nowDate);
        if((nowDateNumber.year === dateNumber.year) && (nowDateNumber.month === dateNumber.month) && (nowDateNumber.day === dateNumber.day)){
            result = "border-primary"
        }
        return result;
    }

    return (
        <div className="row calendar-row flex-grow-1 overflow-hidden" ref={shiftCalendarRef}>
            {(getDays().map((value, index)=>(
                <CalendarDay
                    key={`${focusYear}/${value.month}/${value.day}`}
                    pageType={pageType}
                    border={getBorder(value)}
                    textColor={getTextColor(value.dayOfWeek, value.month)}
                    year={value.year}
                    month={value.month}
                    day={value.day}
                />
            )))}
        </div>
    );
}