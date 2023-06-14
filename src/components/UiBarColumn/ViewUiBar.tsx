import React, { useContext } from 'react';
import { PageStateContext } from '../../provider/PageStateProvider';
import { TimetableContext } from './../../provider/TimetableProvider';
import { ContentType, Events, Shifts, Tasks, Timetables } from '../../utils/types';

export default function ViewUiBar({contentType}: {contentType: ContentType}){
    // 現在操作中のデータ等を管理する
    const [pageState, setPageState, fetchingId, setFetchingId, fetchingData, setFetchingData] = useContext(PageStateContext);

    // 時間割のデータを管理する
    const [timetables, setTimetables] = useContext(TimetableContext);

    function deleteData(){
        if(fetchingId){
            let newData: Timetables|Tasks|Shifts|Events = {};
            switch(contentType){
                case "timetable":
                    console.log("id",fetchingId);
                    newData = Object.assign({}, timetables);
                    delete newData[fetchingId];
                    console.log("timetables",timetables);
                    console.log("newData",newData);
                    // setTimetables(newData);
                    break;
            }
        }
    }

    return (
        <div className="row border-bottom">
            <div className="col d-flex justify-content-between">
                <button
                    className="btn btn-default mr-auto"
                    style={{fontSize: "1.5rem"}}
                    onClick={() => setPageState(0)}
                >
                    <i className="bi bi-x-lg"/>
                </button>
                <div>
                    <button
                        className="btn btn-default ml-auto"
                        style={{fontSize: "1.5rem"}}
                        onClick={() => {
                            const isDeleteDo: boolean = window.confirm("このデータを削除します。\nよろしいですか？");
                            if(isDeleteDo){
                                deleteData();
                                // setPageState(0);
                                // setFetchingData(null);
                            }
                        }}
                    >
                        <i className="bi bi-trash"/>
                    </button>
                    <button
                        className="btn btn-default ml-auto"
                        style={{fontSize: "1.5rem"}}
                        onClick={() => setPageState(2)}
                    >
                        <i className="bi bi-pencil"/>
                    </button>
                </div>
            </div>
        </div>
    );
}