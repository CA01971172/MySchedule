import React, { useState, useEffect ,useContext } from 'react';
import { PageStateContext } from '../../../provider/PageStateProvider';
import { Timetable } from "./../../../utils/types"
import ViewUiBar from '../../UiBarColumn/ViewUiBar';
import { youbi } from "./../../../utils/types"

export default function TimetableViewPage() {
    // 現在操作中のデータ等を管理する
    const [pageState, setPageState, fetchingId, setFetchingId, fetchingData, setFetchingData, tabKey, setTabKey] = useContext(PageStateContext);

    // データの型をTimetableだと解釈しておく
    const [data, setData] = useState<Timetable>({} as Timetable);
    useEffect(() => {
        const convertData = fetchingData as Timetable;
        setData(convertData);
    }, [fetchingData])

    return (
        <div className="h-100 position-relative">
            <div className="container h-100 border-start border-end d-flex flex-column">
                <ViewUiBar contentType="timetable"/>
                <div className="row flex-grow-1 d-block p-3 fs-4">
                    <div className="w-100 p-1 mb-3 border-bottom text-truncate">
                        {data.title}
                    </div>
                    <div className="w-100 p-1 mb-3 border-bottom text-truncate">
                        <span className="me-1">{youbi[data.dayOfWeek]}</span>
                        <span className="me-3">曜日</span>
                        <span>{( "00" + (new Date(data.startTime).getHours())).slice( -2 )}</span>
                        <span>：</span>
                        <span className="me-3">{( "00" + (new Date(data.startTime).getMinutes())).slice( -2 )}</span>
                        <span className="me-3">～</span>
                        <span>{( "00" + (new Date(data.endTime).getHours())).slice( -2 )}</span>
                        <span>：</span>
                        <span>{( "00" + (new Date(data.endTime).getMinutes())).slice( -2 )}</span>
                    </div>
                    <div className="w-100 p-1 mb-3 border-bottom text-truncate">
                        <span>講師</span>
                        <span>：</span>
                        <span>{data.teacher}</span>
                    </div>
                    <div className="w-100 p-1 border-bottom text-truncate">
                        <span>教室</span>
                        <span>：</span>
                        <span>{data.classroom}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}