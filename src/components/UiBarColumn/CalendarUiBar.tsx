import React from 'react';
import HamburgerMenuButton from "./HamburgerMenuButton"
import DateDisplay from "./DateDisplay"
import DateController from "./DateController"


export default function CalendarUiBar() {
    return (
        <div className="row align-items-center border-bottom">
            <div className="col-auto p-0">
                <HamburgerMenuButton/>
            </div>
            <div className="col-auto p-0">
                <DateController/>
            </div>
            <div className="col">
                <DateDisplay/>
            </div>
        </div>
    );
}