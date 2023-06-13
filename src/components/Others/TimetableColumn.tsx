import React, { useState, useEffect } from 'react';
import { Timetables, Timetable } from '../../utils/types';

// 時間割のデータを授業開始時間で並べ替える関数
function sortTimetablesByStartTime(timetables: Timetables): Timetable[]{
    const sortedTimetables = Object.entries(timetables)
        .map(([id, timetable]) => ({ id, ...timetable }))
        .sort((a, b) => a.startTime - b.startTime);
    return sortedTimetables;
}

// dayOfWeekで時間割データを分類する関数
function groupTimetablesByDay(timetables: Timetable[]): Record<string, Timetable[]> {
    const groupedTimetables: Record<string, Timetable[]> = {};
    // TimetablesをdayOfWeekプロパティで分類
    for (const timetable of timetables) {
        const dayOfWeekKey = getDayOfWeekKey(timetable.dayOfWeek);
        if (!(dayOfWeekKey in groupedTimetables)) {
            groupedTimetables[dayOfWeekKey] = [];
        }
        groupedTimetables[dayOfWeekKey].push(timetable);
    }
    return groupedTimetables;
}

// 0～6を"sun"～"sat"に変換する関数
function getDayOfWeekKey(dayOfWeek: number): string {
    const dayOfWeekMap: { [key: number]: string } = {
        0: 'sun',
        1: 'mon',
        2: 'tue',
        3: 'wed',
        4: 'thu',
        5: 'fri',
        6: 'sat',
    };
    return dayOfWeekMap[dayOfWeek] || '';
}

export default function TimetableColumn({timetables}:{timetables: Timetables}) {
    const [timetableData, setTimetableData] = useState<Record<string, Timetable[]>>({})

    useEffect(() => {
        const sortedData = sortTimetablesByStartTime(timetables);
        const groupedData = groupTimetablesByDay(sortedData);
        console.log(groupedData)
        setTimetableData(groupedData);
    },[timetables])

    return (
        <div className="container">
            <div className="row">
                {Object.keys(timetableData).map((dayOfWeek) => (
                    <div
                        key={dayOfWeek}
                        className="col"
                    >
                        {timetableData[dayOfWeek].map((timetable, index) => (
                            <div key={index}>{timetable.title}</div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}