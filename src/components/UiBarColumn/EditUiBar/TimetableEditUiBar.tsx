import React, { useContext } from 'react';
import { PageStateContext } from '../../../provider/PageStateProvider';
import { TimetableContext } from './../../../provider/TimetableProvider';
import { Timetables, Timetable } from '../../../utils/types';

export default function TimetableEditUiBar({saveData}: {saveData: ()=>void}){
    // 現在操作中のデータ等を管理する
    const [pageState, setPageState, fetchingId, setFetchingId, fetchingData, setFetchingData] = useContext(PageStateContext);

    // 時間割のデータを管理する
    const [timetables, setTimetables] = useContext(TimetableContext);

    return (
        <div className="row border-bottom">
            <div className="col d-flex justify-content-between align-items-center">
                <button
                    type="button"
                    className="btn btn-default"
                    style={{fontSize: "1.5rem"}}
                    onClick={() => setPageState(1)}
                >
                    <i className="bi bi-x-lg"/>
                </button>
                <button
                    type="button"
                    className="btn btn-success h-75"
                    onClick={() => {
                        saveData();
                        window.alert("データを保存しました。");
                        setPageState(1);
                    }}
                >
                    保存
                </button>
            </div>
        </div>
    );
}