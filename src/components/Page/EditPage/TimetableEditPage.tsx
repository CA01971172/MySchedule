import React, { useState, useEffect ,useContext } from 'react';
import EditUiBar from '../../UiBarColumn/EditUiBar';
import { PageStateContext } from '../../../provider/PageStateProvider';
import { TimetableContext } from '../../../provider/TimetableProvider';
import { Timetable, Timetables } from "./../../../utils/types"
import TimetableDbController from '../../../utils/DbController/TimetableDbController';
import DayOfWeekSelect from "./Form/DayOfWeekSelect"
import HoursInput from "./Form/HoursInput"
import MinutesInput from "./Form/MinutesInput"

export default function TimetableEditPage() {
    // 現在操作中のデータ等を管理する
    const {fetchingId, setFetchingId, createDate, fetchingData, setFetchingData} = useContext(PageStateContext);

    // 時間割のデータを管理する
    const [timetables, setTimetables] = useContext(TimetableContext);

    // 新規データが編集されたかどうか
    const [isTouched, setIsTouched] = useState(false);

    // データの型をTimetableだと解釈しておく
    const [data, setData] = useState<Timetable>({} as Timetable);
    useEffect(() => {
        let convertData: Timetable;
        if(fetchingData === null){
            let initialDate: Date = new Date(2000, 1, 1, 0, 0, 0);
            if(createDate !== null) initialDate = createDate;
            const initialTime: number = initialDate.getTime();
            convertData = {
                title: "",
                dayOfWeek: 1,
                startTime: initialTime,
                endTime: initialTime,
                teacher: "",
                classroom: "",
            }
        }else{
            convertData = fetchingData as Timetable;
        }
        setData(convertData);
    }, [fetchingData])

    // フォーム内容を管理するState
    const [title, setTitle] = useState<string>("");
    const [dayOfWeek, setDayOfWeek] = useState<number>(0);
    const [startHours, setStartHours] = useState<number>(0);
    const [startMinutes, setStartMinutes] = useState<number>(0);
    const [endHours, setEndHours] = useState<number>(0);
    const [endMinutes, setEndMinutes] = useState<number>(0);
    const [teacher, setTeacher] = useState<string>("");
    const [classroom, setClassroom] = useState<string>("");
        useEffect(() => {
            // フォーム内容を既存のデータで初期化する
            setTitle(data.title || "");
            setDayOfWeek(data.dayOfWeek || 1);
            setStartHours(new Date(data.startTime || 0).getHours());
            setStartMinutes(new Date(data.startTime || 0).getMinutes());
            setEndHours(new Date(data.endTime || 0).getHours());
            setEndMinutes(new Date(data.endTime || 0).getMinutes());
            setTeacher(data.teacher || "");
            setClassroom(data.classroom || "");
    }, [data])

    // データを保存する関数
    async function saveData(): Promise<void>{
        const startDate: Date = new Date(2000, 1, 1, startHours, startMinutes, 0);
        const startTime: number = startDate.getTime();
        const endDate: Date = new Date(2000, 1, 1, endHours, endMinutes, 0);
        const endTime: number = endDate.getTime();
        const newTimetable: Timetable = {
            title,
            dayOfWeek,
            startTime,
            endTime,
            teacher,
            classroom
        };
        const newTimetables: Timetables = Object.assign({}, timetables);
        if(fetchingId){
            // データベース上のデータを書き換える
            await TimetableDbController.updateTimetable(newTimetable, fetchingId);
            // html上のデータを書き換える
            setFetchingData(newTimetable);
            newTimetables[fetchingId] = newTimetable;
        }else{
            // データベース上にデータを新規作成する
            const generatedId: string = await TimetableDbController.createTimetable(newTimetable, true);
            newTimetable.id = generatedId;
            // html上のデータを書き換える
            setFetchingId(generatedId);
            setFetchingData(newTimetable);
            newTimetables[generatedId] = newTimetable;
        }
        setTimetables(newTimetables);
    }

    return (
        <div className="h-100 position-relative">
            <div className="container h-100 border-start border-end d-flex flex-column">
                <EditUiBar saveData={saveData} isTouched={isTouched}/>
                <div className="row flex-grow-1 d-block p-3">
                    <div className="w-100 p-1 mb-3 border-bottom">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="タイトルを追加"
                            value={title}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setTitle(event.target.value);
                                setIsTouched(true);
                            }}
                        />
                    </div>
                    <div className="w-100 p-1 mb-3 border-bottom">
                        <div className="d-md-none">
                            <div className="input-group mb-2">
                                <DayOfWeekSelect id="weekdaySelectMd" dayOfWeek={dayOfWeek} setDayOfWeek={setDayOfWeek} setIsTouched={setIsTouched}/>
                                <label className="input-group-text" htmlFor="weekdaySelectMd">曜日</label>
                            </div>
                            <div className="input-group mb-2">
                                <span className="input-group-text">開始時間</span>
                                <HoursInput hours={startHours} setHours={setStartHours} setIsTouched={setIsTouched}/>
                                <span className="input-group-text">：</span>
                                <MinutesInput minutes={startMinutes} setMinutes={setStartMinutes} setIsTouched={setIsTouched}/>
                            </div>
                            <div className="input-group">
                                <span className="input-group-text">終了時間</span>
                                <HoursInput hours={endHours} setHours={setEndHours} setIsTouched={setIsTouched}/>
                                <span className="input-group-text">：</span>
                                <MinutesInput minutes={endMinutes} setMinutes={setEndMinutes} setIsTouched={setIsTouched}/>
                            </div>
                        </div>
                        <div className="d-none d-md-block">
                            <div className="input-group">
                                <DayOfWeekSelect id="weekdaySelectLg" dayOfWeek={dayOfWeek} setDayOfWeek={setDayOfWeek} setIsTouched={setIsTouched}/>
                                <label className="input-group-text" htmlFor="weekdaySelectLg">曜日</label>
                                <HoursInput hours={startHours} setHours={setStartHours} setIsTouched={setIsTouched}/>
                                <span className="input-group-text">：</span>
                                <MinutesInput minutes={startMinutes} setMinutes={setStartMinutes} setIsTouched={setIsTouched}/>
                                <span className="input-group-text">～</span>
                                <HoursInput hours={endHours} setHours={setEndHours} setIsTouched={setIsTouched}/>
                                <span className="input-group-text">：</span>
                                <MinutesInput minutes={endMinutes} setMinutes={setEndMinutes} setIsTouched={setIsTouched}/>
                            </div>
                        </div>
                    </div>
                    <div className="input-group w-100 p-1 mb-3 border-bottom">
                            <span className="input-group-text">講師</span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder=""
                                value={teacher}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setTeacher(event.target.value);
                                    setIsTouched(true);
                                }}
                            />
                    </div>
                    <div className="input-group w-100 p-1 border-bottom">
                        <span className="input-group-text">教室</span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            value={classroom}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setClassroom(event.target.value);
                                setIsTouched(true);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}