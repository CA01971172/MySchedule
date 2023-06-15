import React, { useState, useEffect, useContext } from 'react';
import { Timetables, Timetable } from '../../utils/types';
import TimetableCard from "./../Card/TimetableCard"
import { TimetableContext } from './../../provider/TimetableProvider';


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

export default function TimetableColumn() {
    // 時間割のデータを管理する
    const [timetables, setTimetables] = useContext(TimetableContext);

    // 時間割のデータを整えて管理する
    const [timetableData, setTimetableData] = useState<Record<string, Timetable[]>>({})

    // 作成するデータを分類するためのタイプ
    const dayOfWeekType: string[] = ["mon", "tue", "wed", "thu", "fri"];

    useEffect(() => {
/*         console.log("timetables",timetables)
        Object.values(timetables).forEach((data) => {
            console.log("title:", data.title, "\nstartTime",data.startTime)
        }) */
        const sortedData = sortTimetablesByStartTime(timetables);
/*         console.log("sortedData",sortedData)
        sortedData.forEach((data) => {
            console.log("title:", data.title, "\nstartTime",data.startTime)
        }) */
        const groupedData = groupTimetablesByDay(sortedData);
/*         console.log("groupedData",groupedData)
        for(const key in groupedData){
            console.log("key:", key)
            groupedData[key].forEach((data) => {
                console.log("title:", data.title, "\nstartTime",data.startTime)
            })
        } */
        setTimetableData(groupedData);
    },[timetables])

    return (
        <div className="row row-cols-5 flex-grow-1">
            {dayOfWeekType.map((dayOfWeek, index) => (
                <div
                    key={dayOfWeek}
                    className={`col p-1 ${(index === dayOfWeekType.length -1 ) ? "": "border-end"}`}
                >
                        {timetableData[dayOfWeek] && timetableData[dayOfWeek].map((timetable, index) => (
                            <TimetableCard key={index} timetable={timetable}/>
                        ))}
                </div>
            ))}
        </div>
    );
}