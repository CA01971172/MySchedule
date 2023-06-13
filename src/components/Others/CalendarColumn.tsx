import React from 'react';

interface MyProps{
    pageType: "shift" | "calendar";
    focusYear: number;
    focusMonth: number;
}

export default function CalendarColumn(props: MyProps) {
    const {pageType, focusYear, focusMonth} = props;

    return (
        <div/>
    );
}