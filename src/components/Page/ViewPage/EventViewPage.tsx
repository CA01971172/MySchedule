import React, { useState, useEffect ,useContext } from 'react';
import { PageStateContext } from '../../../provider/PageStateProvider';
import { Event } from "./../../../utils/types"
import ViewUiBar from '../../UiBarColumn/ViewUiBar';
import TextareaAutosize from '@mui/base/TextareaAutosize';

export default function EventViewPage() {
    // 現在操作中のデータ等を管理する
    const {fetchingData} = useContext(PageStateContext);

    // データの型をEventだと解釈しておく
    const [data, setData] = useState<Event>({} as Event);
    useEffect(() => {
        const convertData = fetchingData as Event;
        setData(convertData);
    }, [fetchingData])

    return (
        <div className="h-100 position-relative">
            <div className="container h-100 border-start border-end d-flex flex-column">
                <ViewUiBar contentType="event"/>
                <div className="row flex-grow-1 d-block p-3 fs-4">
                    <div className="w-100 p-1 mb-3 border-bottom">
                        {data.title}
                    </div>
                    <div className="w-100 p-1 mb-3 border-bottom">
                        <span className="me-3">始</span>
                        <span>{`${new Date(data.startTime).getFullYear()}`}</span>
                        <span className="me-3">年</span>
                        <span>{`${new Date(data.startTime).getMonth()+1}`}</span>
                        <span className="me-2">月</span>
                        <span>{`${new Date(data.startTime).getDate()}`}</span>
                        <span className="me-3">日</span>
                        {!data.isAllDay && (
                            <span>{( "00" + (new Date(data.startTime).getHours())).slice( -2 )}</span>
                        )}
                        {!data.isAllDay && (
                            <span className="me-2">：</span>
                        )}
                        {!data.isAllDay && (
                            <span>{( "00" + (new Date(data.startTime).getMinutes())).slice( -2 )}</span>
                        )}
                    </div>
                    <div className="w-100 p-1 mb-3 border-bottom">
                        <span className="me-3">終</span>
                        <span>{`${new Date(data.endTime).getFullYear()}`}</span>
                        <span className="me-3">年</span>
                        <span>{`${new Date(data.endTime).getMonth()+1}`}</span>
                        <span className="me-2">月</span>
                        <span>{`${new Date(data.endTime).getDate()}`}</span>
                        <span className="me-3">日</span>
                        {!data.isAllDay && (
                            <span>{( "00" + (new Date(data.endTime).getHours())).slice( -2 )}</span>
                        )}
                        {!data.isAllDay && (
                            <span className="me-2">：</span>
                        )}
                        {!data.isAllDay && (
                            <span>{( "00" + (new Date(data.endTime).getMinutes())).slice( -2 )}</span>
                        )}
                    </div>
                    <div className="w-100 p-1">
                        <TextareaAutosize className="form-control resize-none" value={data.description} readOnly/>
                    </div>
                </div>
            </div>
        </div>
    );
}