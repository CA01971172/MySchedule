import React, { useState, useEffect ,useContext } from 'react';
import TimetableEditUiBar from '../../UiBarColumn/EditUiBar/TimetableEditUiBar';
import { PageStateContext } from '../../../provider/PageStateProvider';
import { TimetableContext } from '../../../provider/TimetableProvider';
import { Timetable, Timetables } from "./../../../utils/types"
import TimetableDbController from '../../../utils/DbController/TimetableDbController';

export default function TimetableEditPage() {
    // 現在操作中のデータ等を管理する
    const [pageState, setPageState, fetchingId, setFetchingId, fetchingData, setFetchingData] = useContext(PageStateContext);

    // 時間割のデータを管理する
    const [timetables, setTimetables] = useContext(TimetableContext);

    // データの型をTimetableだと解釈しておく
    const [data, setData] = useState<Timetable>({} as Timetable);
    useEffect(() => {
        let convertData: Timetable;
        if(fetchingData === null){
            const initialDate: Date = new Date(2000, 1, 1, 0, 0, 0);
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
            const generatedId: string = await TimetableDbController.createTimetable(newTimetable);
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
                <TimetableEditUiBar saveData={saveData}/>
                <div className="row flex-grow-1 d-block p-3" style={{fontSize: "1.5rem"}}>
                    <div className="w-100 p-1 mb-3 border-bottom">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="タイトルを追加"
                            value={title}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setTitle(event.target.value)
                            }}
                        />
                    </div>
                    <div className="w-100 p-1 mb-3 border-bottom">
                        <div className="d-sm-none">
                            <div className="input-group mb-2">
                                <DayOfWeekSelect id="weekdaySelectSm" dayOfWeek={dayOfWeek} setDayOfWeek={setDayOfWeek}/>
                                <label className="input-group-text" htmlFor="weekdaySelectSm">曜日</label>
                            </div>
                            <div className="input-group mb-2">
                                <span className="input-group-text">開始時間</span>
                                <HoursInput hours={startHours} setHours={setStartHours}/>
                                <span className="input-group-text">：</span>
                                <MinutesInput minutes={startMinutes} setMinutes={setStartMinutes}/>
                            </div>
                            <div className="input-group">
                                <span className="input-group-text">終了時間</span>
                                <HoursInput hours={endHours} setHours={setEndHours}/>
                                <span className="input-group-text">：</span>
                                <MinutesInput minutes={endMinutes} setMinutes={setEndMinutes}/>
                            </div>
                        </div>
                        <div className="d-none d-sm-block">
                            <div className="input-group">
                                <DayOfWeekSelect id="weekdaySelectMd" dayOfWeek={dayOfWeek} setDayOfWeek={setDayOfWeek}/>
                                <label className="input-group-text" htmlFor="weekdaySelectMd">曜日</label>
                                <HoursInput hours={startHours} setHours={setStartHours}/>
                                <span className="input-group-text">：</span>
                                <MinutesInput minutes={startMinutes} setMinutes={setStartMinutes}/>
                                <span className="input-group-text">～</span>
                                <HoursInput hours={endHours} setHours={setEndHours}/>
                                <span className="input-group-text">：</span>
                                <MinutesInput minutes={endMinutes} setMinutes={setEndMinutes}/>
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
                                    setTeacher(event.target.value)
                                }}
                            />
                    </div>
                    <div className="input-group w-100 p-1 mb-3 border-bottom">
                        <span className="input-group-text">教室</span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            value={classroom}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setClassroom(event.target.value)
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

// 曜日用のselect要素
function DayOfWeekSelect({ id, dayOfWeek, setDayOfWeek}: { id: string, dayOfWeek: number, setDayOfWeek: (value: number)=>void}){
    return (
        <select
        style={{width: "5rem"}}
        className="form-select"
        id={id}
        aria-label="weekday select"
        value={dayOfWeek}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            setDayOfWeek(Number(event.target.value));
        }}
    >
        <option value="1">月</option>
        <option value="2">火</option>
        <option value="3">水</option>
        <option value="4">木</option>
        <option value="5">金</option>
    </select>
    );
}

// 時間用のinput要素
function HoursInput({ hours, setHours }: { hours: number, setHours: (value: number)=>void }){
    return (
        <input
        className="form-control"
        type="number"
        min="0"
        max="23"
        value={`00${hours}`.slice(-2)}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const textValue: string = event.target.value.replace(/[０-９．]/g, (s) =>
                String.fromCharCode(s.charCodeAt(0) - 0xfee0)
            );
            if (!isNaN(Number(textValue))) {
                setHours(Math.min(Number(textValue), 23));
            }
        }}
    />
    );
}

// 分用のinput要素
function MinutesInput({ minutes, setMinutes }: { minutes: number, setMinutes: (value: number)=>void }){
    return (
        <input
        className="form-control"
        type="number"
        min="0"
        max="59"
        value={`00${minutes}`.slice(-2)}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const textValue: string = event.target.value.replace(/[０-９．]/g, (s) =>
                String.fromCharCode(s.charCodeAt(0) - 0xfee0)
            );
            if (!isNaN(Number(textValue))) {
                setMinutes(Math.min(Number(textValue), 59));
            }
        }}
    />
    );
}