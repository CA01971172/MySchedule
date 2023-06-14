import React, { useState, useEffect ,useContext } from 'react';
import { PageStateContext } from '../../../provider/PageStateProvider';
import { Timetable } from "./../../../utils/types"
import ViewUiBar from '../../UiBarColumn/ViewUiBar';

export default function TimetableViewPage() {
    // 現在操作中のデータ等を管理する
    const [pageState, setPageState, fetchingId, setFetchingId, fetchingData, setFetchingData] = useContext(PageStateContext);

    // データの型をTimetableだと解釈しておく
    const [data, setData] = useState<Timetable>({} as Timetable);
    useEffect(() => {
        const convertData = fetchingData as Timetable;
        setData(convertData);
    }, [fetchingData])

    return (
        <div>
            {(data.title) && (<div>{data.title}</div>)}
        </div>
    );
}