import React from 'react';
import HamburgerMenuButton from "./HamburgerMenuButton"
import DateDisplay from "./DateDisplay"

interface MyProps{
    focusYear: number;
    focusMonth: number;
    changeMonth: (amount: 1 | -1) => void
}

export default function CalendarUiBar(props: MyProps) {
    const {focusYear, focusMonth, changeMonth} = props;

    return (
        <div className="row align-items-center border-bottom">
            <div className="col-auto p-0">
                <HamburgerMenuButton/>
            </div>
            <div className="col-auto">
                <DateDisplay focusYear={focusYear} focusMonth={focusMonth}/>
            </div>
        </div>
    );
}