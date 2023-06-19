import React, { useState, useEffect ,useContext } from 'react';
import { PageStateContext } from '../../../provider/PageStateProvider';
import { Task } from "./../../../utils/types"
import ViewUiBar from '../../UiBarColumn/ViewUiBar';
import TextareaAutosize from '@mui/base/TextareaAutosize';

export default function TaskViewPage() {
    // 現在操作中のデータ等を管理する
    const [pageState, setPageState, fetchingId, setFetchingId, fetchingData, setFetchingData] = useContext(PageStateContext);

    // データの型をTaskだと解釈しておく
    const [data, setData] = useState<Task>({} as Task);
    useEffect(() => {
        const convertData = fetchingData as Task;
        setData(convertData);
    }, [fetchingData])

    return (
        <div className="h-100 position-relative">
            <div className="container h-100 border-start border-end d-flex flex-column">
                <ViewUiBar contentType="task"/>
                <div className="row flex-grow-1 d-block p-3 fs-4">
                    <div className="w-100 p-1 mb-3 border-bottom text-truncate">
                        {data.title}
                    </div>
                    <div className="w-100 p-1 mb-3 border-bottom text-truncate">
                        <span className="me-3">〆</span>
                        <span>{`${new Date(data.deadline).getFullYear()}`}</span>
                        <span className="me-3">年</span>
                        <span>{`${new Date(data.deadline).getMonth()+1}`}</span>
                        <span className="me-2">月</span>
                        <span>{`${new Date(data.deadline).getDate()}`}</span>
                        <span className="me-3">日</span>
                        <span>{( "00" + (new Date(data.deadline).getHours())).slice( -2 )}</span>
                        <span className="me-2">：</span>
                        <span>{( "00" + (new Date(data.deadline).getMinutes())).slice( -2 )}</span>
                    </div>
                    <div className="w-100 p-1">
                        <TextareaAutosize className="form-control resize-none" value={data.description} readOnly/>
                    </div>
                </div>
            </div>
        </div>
    );
}