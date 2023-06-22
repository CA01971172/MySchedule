import React, { useContext } from 'react';
import { PageStateContext } from '../../provider/PageStateProvider';
import { ContentType, Events, Shifts, Tasks, Timetables } from '../../utils/types';
import TimetableDbController from '../../utils/DbController/TimetableDbController';
import { TimetableContext } from './../../provider/TimetableProvider';
import TaskDbController from '../../utils/DbController/TaskDbController';
import { TaskContext } from '../../provider/TaskProvider';
import ShiftDbController from '../../utils/DbController/ShiftDbController';
import { ShiftContext } from '../../provider/ShiftProvider';
import EventDbController from '../../utils/DbController/EventDbController';


export default function ViewUiBar({contentType}: {contentType: ContentType}){
    // 現在操作中のデータ等を管理する
    const [pageState, setPageState, fetchingId, setFetchingId, fetchingData, setFetchingData, tabKey, setTabKey] = useContext(PageStateContext);

    // 時間割のデータを管理する
    const [timetables, setTimetables] = useContext(TimetableContext);
    // 課題のデータを管理する
    const [tasks, setTasks] = useContext(TaskContext);
    // シフトのデータを管理する
    const [shifts, setShifts] = useContext(ShiftContext);

    function deleteData(){
        if(fetchingId){
            let newData: Timetables|Tasks|Shifts|Events = {};
            switch(contentType){
                case "timetable":
                    newData = Object.assign({}, timetables);
                    delete newData[fetchingId];
                    setTimetables(newData);
                    TimetableDbController.deleteTimetable(fetchingId)
                    break;
                case "task":
                    newData = Object.assign({}, tasks);
                    delete newData[fetchingId];
                    setTasks(newData);
                    TaskDbController.deleteTask(fetchingId)
                    break;
                case "shift":
                    newData = Object.assign({}, shifts);
                    delete newData[fetchingId];
                    setShifts(newData);
                    ShiftDbController.deleteShift(fetchingId)
                    break;
                case "event":
                    // newData = Object.assign({}, timetables);
                    // delete newData[fetchingId];
                    // setEvents(newData);
                    // EventDbController.deleteEvent(fetchingId)
                    break;
            }
        }
    }

    return (
        <div className="row border-bottom">
            <div className="col d-flex justify-content-between align-items-center">
                <button
                    type="button"
                    className="btn btn-default fs-3"
                    onClick={() => {
                        setPageState(0)
                        setFetchingId(null);
                        setFetchingData(null);
                    }}
                >
                    <i className="bi bi-x-lg"/>
                </button>
                <div>
                    <button
                        type="button"
                        className="btn btn-default fs-3"
                        onClick={() => {
                            const isDeleteDo: boolean = window.confirm("このデータを削除します。\nよろしいですか？");
                            if(isDeleteDo){
                                deleteData();
                                setPageState(0)
                                setFetchingId(null);
                                setFetchingData(null);
                            }
                        }}
                    >
                        <i className="bi bi-trash"/>
                    </button>
                    <button
                        className="btn btn-default fs-3"
                        onClick={() => setPageState(2)}
                    >
                        <i className="bi bi-pencil"/>
                    </button>
                </div>
            </div>
        </div>
    );
}