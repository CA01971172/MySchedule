import React, {useContext} from 'react';
import { CalendarData } from '../../utils/types';
import CalendarCard from "./../Card/CalendarCard"
import { CalendarContext } from '../../provider/CalendarProvider';
import { PageState, PageStateContext } from '../../provider/PageStateProvider';

interface MyProps{
    year: number;
    month: number;
    day: number;
    textColor: string;
    border: string;
    data: CalendarData;
}

export default function CalendarDay(props: MyProps) {
    const {year, month, day, textColor, border, data} = props;

    const {setPageState, setCreateDate, setFetchingId, setFetchingData, tabKey} = useContext(PageStateContext);

    return (
        <div
            className={`col d-flex flex-column p-1 ${border}`}
            onClick={() => {
                const theDate: Date = new Date(year, month - 1, day);
                let newPageState: PageState = "edit";
                if(tabKey === "calendar") newPageState = "taskEdit";
                setCreateDate(theDate);
                setFetchingId(null);
                setFetchingData(null);
                setPageState("edit");
                console.log(theDate);
            }}
        >
            <div className={`text-center ${textColor}`}>
                {day}
            </div>
            <div className="flex-grow-1 overflow-y-auto">
                {data.shifts.map((value, index) => (
                    <CalendarCard key={index} cardType="shift" data={value}/>
                ))}
                {data.tasks.map((value, index) => (
                    <CalendarCard key={index} cardType="task" data={value}/>
                ))}
                {data.events.map((value, index) => (
                    <CalendarCard key={index} cardType="event" data={value}/>
                ))}
            </div>
        </div>
    );
}