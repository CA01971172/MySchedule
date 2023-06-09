import React, { createContext, useState, useEffect, ReactNode, useRef } from 'react';
import { Shifts } from "../utils/types"

export const CalendarContext = createContext<{
    keptShifts: Shifts | null,
    setKeptShifts: React.Dispatch<React.SetStateAction<Shifts | null>>,
    shiftCalendarRef: React.RefObject<HTMLDivElement>,
    calendarHeight: number,
    focusYear: number,
    focusMonth: number,
    initializeFocusMonth: () => void,
    changeMonth: (amount: 1 | -1) => void,
    enableTask: boolean,
    setEnableTask: React.Dispatch<React.SetStateAction<boolean>>,
    enableShift: boolean,
    setEnableShift: React.Dispatch<React.SetStateAction<boolean>>,
    enableEvent: boolean,
    setEnableEvent: React.Dispatch<React.SetStateAction<boolean>>
}>({
    keptShifts: {},
    setKeptShifts: () => {},
    shiftCalendarRef: {} as React.RefObject<HTMLDivElement>,
    calendarHeight: 0,
    focusYear: 2000,
    focusMonth: 1,
    initializeFocusMonth: () => {},
    changeMonth: () => {},
    enableTask: false,
    setEnableTask: () => {},
    enableShift: false,
    setEnableShift: () => {},
    enableEvent: false,
    setEnableEvent: () => {}
})

export function CalendarProvider({children}: {children: ReactNode}){
    // クリップボード(？)に保存されたバイトのシフトのデータを管理する
    const [keptShifts, setKeptShifts] = useState<Shifts | null>(null)

    // カレンダー欄の高さを保管する
    const [calendarHeight, setCalendarHeight] = useState<number>(0);
    const shiftCalendarRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const calendarElement: HTMLDivElement | null = shiftCalendarRef.current;
        const newHeight: number = (calendarElement?.getBoundingClientRect().height || 0);
        setCalendarHeight(newHeight);
    }, [shiftCalendarRef])

    // カレンダー系ページでフォーカス中の月を管理する
    const [focusYear, setFocusYear] = useState<number>(2000);
    const [focusMonth, setFocusMonth] = useState<number>(1);

    // フォーカス中の月を初期化する関数
    function initializeFocusMonth(): void{
        const nowDate: Date = new Date();
        const newYear: number = nowDate.getFullYear();
        const newMonth: number = nowDate.getMonth() + 1;
        setFocusYear(newYear);
        setFocusMonth(newMonth);
    }
    useEffect(() => {
        initializeFocusMonth();
    }, [])

    // 表示月を1つ前後に遷移させる関数
    function changeMonth(amount: 1|-1){
        let newYear: number = focusYear;
        let newMonth: number = focusMonth;
        if(newMonth + amount > 12){
            newMonth = 1;
            newYear++;
        }else if(newMonth + amount < 1){
            newMonth = 12;
            newYear--;
        }else{
            newMonth += amount;
        }
        setFocusMonth(newMonth);
        if(newYear !== focusMonth) setFocusYear(newYear);
    }

    // 表示するカードのデータを管理する
    const [enableTask, setEnableTask] = useState<boolean>(true);
    const [enableShift, setEnableShift] = useState<boolean>(true);
    const [enableEvent, setEnableEvent] = useState<boolean>(true);

    return (
        <CalendarContext.Provider value={{
            keptShifts, setKeptShifts,
            shiftCalendarRef, calendarHeight,
            focusYear, focusMonth, initializeFocusMonth, changeMonth,
            enableTask, setEnableTask,
            enableShift, setEnableShift,
            enableEvent, setEnableEvent
        }}>
            {children}
        </CalendarContext.Provider>
    );
}