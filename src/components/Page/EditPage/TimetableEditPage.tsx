import React, { useState, useEffect ,useContext } from 'react';
import TimetableEditUiBar from '../../UiBarColumn/EditUiBar/TimetableEditUiBar';
import { PageStateContext } from '../../../provider/PageStateProvider';
import { Timetable } from "./../../../utils/types"

export default function TimetableEditPage() {
    // 現在操作中のデータ等を管理する
    const [pageState, setPageState, fetchingId, setFetchingId, fetchingData, setFetchingData] = useContext(PageStateContext);

    // データの型をTimetableだと解釈しておく
    const [data, setData] = useState<Timetable>({} as Timetable);
    useEffect(() => {
        const convertData = fetchingData as Timetable;
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
            setDayOfWeek(data.dayOfWeek || 0);
            setStartHours(new Date(data.startTime || 0).getHours());
            setStartMinutes(new Date(data.startTime || 0).getMinutes());
            setEndHours(new Date(data.endTime || 0).getHours());
            setEndMinutes(new Date(data.endTime || 0).getMinutes());
            setTeacher(data.teacher || "");
            setClassroom(data.classroom || "");
    }, [data])

    // 数値型を0～23に丸める関数
    function roundHoursValue(value: number): number{
        let result: number = 0;
        result = Math.min(Math.max(value, 0), 23);
        return result;
    }
    // 数値型を0～59に丸める関数
    function roundMinutesValue(value: number): number{
        let result: number = 0;
        result = Math.min(Math.max(value, 0), 59);
        return result;
    }

    return (
        <div className="h-100 position-relative">
            <div className="container h-100 border-start border-end d-flex flex-column">
                <TimetableEditUiBar/>
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
                                <select
                                    style={{width: "5rem"}}
                                    className="form-select"
                                    id="weekdaySelect"
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
                                <label className="input-group-text" htmlFor="weekdaySelect">曜日</label>
                            </div>
                            <div className="input-group mb-2">
                                <span className="input-group-text">開始時間</span>
                                <input
                                    className="form-control"
                                    type="number"
                                    min="0"
                                    max="23"
                                    value={startHours}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        const numberValue: number = Number(event.target.value.slice(0, 2));
                                        const roundedValue: number = roundHoursValue(numberValue);
                                        setStartHours(roundedValue);
                                    }}
                                />
                                <span className="input-group-text">：</span>
                                <input
                                    className="form-control"
                                    type="number"
                                    min="0"
                                    max="59"
                                    value={startMinutes}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        const numberValue: number = Number(event.target.value.slice(0, 2));
                                        const roundedValue: number = roundMinutesValue(numberValue);
                                        setStartMinutes(roundedValue);
                                    }}
                                />
                            </div>
                            <div className="input-group">
                                <span className="input-group-text">終了時間</span>
                                <input
                                    className="form-control"
                                    type="number"
                                    min="0"
                                    max="23"
                                    value={endHours}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        const numberValue: number = Number(event.target.value.slice(0, 2));
                                        const roundedValue: number = roundHoursValue(numberValue);
                                        setEndHours(roundedValue);
                                    }}
                                />
                                <span className="input-group-text">：</span>
                                <input
                                    className="form-control"
                                    type="number"
                                    min="0"
                                    max="59"
                                    value={endMinutes}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        const numberValue: number = Number(event.target.value.slice(0, 2));
                                        const roundedValue: number = roundMinutesValue(numberValue);
                                        setEndMinutes(roundedValue);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="d-none d-sm-block">
                            <div className="input-group">
                                <select
                                    style={{width: "5rem"}}
                                    className="form-select"
                                    id="weekdaySelect"
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
                                <label className="input-group-text" htmlFor="weekdaySelect">曜日</label>
                                <input
                                    className="form-control"
                                    type="number"
                                    min="0"
                                    max="23"
                                    value={startHours}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        const numberValue: number = Number(event.target.value.slice(0, 2));
                                        const roundedValue: number = roundHoursValue(numberValue);
                                        setStartHours(roundedValue);
                                    }}
                                />
                                <span className="input-group-text">：</span>
                                <input
                                    className="form-control"
                                    type="number"
                                    min="0"
                                    max="59"
                                    value={startMinutes}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        const numberValue: number = Number(event.target.value.slice(0, 2));
                                        const roundedValue: number = roundMinutesValue(numberValue);
                                        setStartMinutes(roundedValue);
                                    }}
                                />
                                <span className="input-group-text">～</span>
                                <input
                                    className="form-control"
                                    type="number"
                                    min="0"
                                    max="23"
                                    value={endHours}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        const numberValue: number = Number(event.target.value.slice(0, 2));
                                        const roundedValue: number = roundHoursValue(numberValue);
                                        setEndHours(roundedValue);
                                    }}
                                />
                                <span className="input-group-text">：</span>
                                <input
                                    className="form-control"
                                    type="number"
                                    min="0"
                                    max="59"
                                    value={endMinutes}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        const numberValue: number = Number(event.target.value.slice(0, 2));
                                        const roundedValue: number = roundMinutesValue(numberValue);
                                        setEndMinutes(roundedValue);
                                    }}
                                />
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