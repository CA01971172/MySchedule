import React, { useState, useEffect ,useContext } from 'react';
import { PageStateContext } from '../../../provider/PageStateProvider';
import { Shift } from "./../../../utils/types"
import ViewUiBar from '../../UiBarColumn/ViewUiBar';

export default function ShiftViewPage() {
    const {fetchingData} = useContext(PageStateContext);

    // データの型をShiftだと解釈しておく
    const [data, setData] = useState<Shift>({} as Shift);
    useEffect(() => {
        const convertData = fetchingData as Shift;
        setData(convertData);
    }, [fetchingData])

    return (
        <div className="h-100 position-relative">
            <div className="container h-100 border-start border-end d-flex flex-column">
                <ViewUiBar contentType="shift"/>
                <div className="row flex-grow-1 d-block p-3 fs-4">
                    <div className="w-100 p-1 mb-3 border-bottom">
                        <span className="me-3">始</span>
                        <span>{`${new Date(data.startTime).getFullYear()}`}</span>
                        <span className="me-3">年</span>
                        <span>{`${new Date(data.startTime).getMonth()+1}`}</span>
                        <span className="me-2">月</span>
                        <span>{`${new Date(data.startTime).getDate()}`}</span>
                        <span className="me-3">日</span>
                        <span>{( "00" + (new Date(data.startTime).getHours())).slice( -2 )}</span>
                        <span className="me-2">：</span>
                        <span>{( "00" + (new Date(data.startTime).getMinutes())).slice( -2 )}</span>
                    </div>
                    <div className="w-100 p-1 mb-3 border-bottom">
                        <span className="me-3">終</span>
                        <span>{`${new Date(data.endTime).getFullYear()}`}</span>
                        <span className="me-3">年</span>
                        <span>{`${new Date(data.endTime).getMonth()+1}`}</span>
                        <span className="me-2">月</span>
                        <span>{`${new Date(data.endTime).getDate()}`}</span>
                        <span className="me-3">日</span>
                        <span>{( "00" + (new Date(data.endTime).getHours())).slice( -2 )}</span>
                        <span className="me-2">：</span>
                        <span>{( "00" + (new Date(data.endTime).getMinutes())).slice( -2 )}</span>
                    </div>
                    <div className="w-100 p-1 border-bottom">
                        <span className="me-3">休憩時間</span>
                        <span>{data.breakTime}分</span>
                    </div>
                </div>
            </div>
        </div>
    );
}