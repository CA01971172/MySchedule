import React from 'react';

interface MyProps{
    focusYear: number;
    focusMonth: number;
}

export default function DateDisplay(props: MyProps) {
    const {focusYear, focusMonth} = props;

    return (
        <div>
            <span className="fs-3 me-2">{focusYear}年</span>
            <span className="fs-3">{focusMonth}月</span>
        </div>
    );
}