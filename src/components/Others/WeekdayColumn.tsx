import React from 'react';

export default function WeekdayColumn({ pageType } : { pageType: "timetable" | "shift" | "calendar"}) {
    return (
        <div className={`row row-cols-${(pageType !== "timetable") ? "7" : "5"} border-bottom`}>
            {(pageType !== "timetable") && (<div className="col p-1 text-red d-flex justify-content-center">日</div>)}
            <div className="col p-1 d-flex justify-content-center">月</div>
            <div className="col p-1 d-flex justify-content-center">火</div>
            <div className="col p-1 d-flex justify-content-center">水</div>
            <div className="col p-1 d-flex justify-content-center">木</div>
            <div className="col p-1 d-flex justify-content-center">金</div>
            {(pageType !== "timetable") && (<div className="col p-1 text-blue d-flex justify-content-center">土</div>)}
        </div>
    );
}