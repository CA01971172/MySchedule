import React from 'react';
import HamburgerMenuButton from "./HamburgerMenuButton"
import DateDisplay from "./DateDisplay"
import DateController from "./DateController"

interface MyProps{
    focusYear: number;
    focusMonth: number;
    setFocusYear: (value: React.SetStateAction<number>) => void
    setFocusMonth: (value: React.SetStateAction<number>) => void
}

export default function CalendarUiBar(props: MyProps) {
    const {focusYear, focusMonth, setFocusYear, setFocusMonth} = props;

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
        <div className="row align-items-center border-bottom">
            <div className="col-auto p-0">
                <HamburgerMenuButton/>
            </div>
            <div className="col-auto p-0">
                <DateController changeMonth={changeMonth}/>
            </div>
            <div className="col">
                <DateDisplay focusYear={focusYear} focusMonth={focusMonth}/>
            </div>
        </div>
    );
}