import React, { createContext, useState, useEffect, ReactNode, useRef } from 'react';
import { Shifts } from "../utils/types"

export const CalendarContext = createContext<{
    keptShifts: Shifts,
    setKeptShifts: React.Dispatch<React.SetStateAction<Shifts>>,
    shiftCalendarRef: React.RefObject<HTMLDivElement>,
    focusYear: number,
    focusMonth: number,
    initializeFocusMonth: () => void,
    changeMonth: (amount: 1 | -1) => void
}>({
    keptShifts: {},
    setKeptShifts: () => {},
    shiftCalendarRef: {} as React.RefObject<HTMLDivElement>,
    focusYear: 2000,
    focusMonth: 1,
    initializeFocusMonth: () => {},
    changeMonth: () => {}
})

export function CalendarProvider({children}: {children: ReactNode}){
    // クリップボード(？)に保存されたバイトのシフトのデータを管理する
    const [keptShifts, setKeptShifts] = useState<Shifts>({})

    // カレンダー欄のRef
    const shiftCalendarRef = useRef<HTMLDivElement>(null)

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

    return (
        <CalendarContext.Provider value={{keptShifts, setKeptShifts, shiftCalendarRef, focusYear, focusMonth, initializeFocusMonth, changeMonth}}>
            {children}
        </CalendarContext.Provider>
    );
}