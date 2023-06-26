import React, { useState, useEffect ,useContext } from 'react';
import EditUiBar from '../../UiBarColumn/EditUiBar';
import { PageStateContext } from '../../../provider/PageStateProvider';
import { EventContext } from '../../../provider/EventProvider';
import { Event, Events } from "./../../../utils/types"
import EventDbController from '../../../utils/DbController/EventDbController';
import DateInputGroup from "./Form/DateInputGroup"
import TextareaAutosize from '@mui/base/TextareaAutosize';

export default function TaskEditPage() {
    // 現在操作中のデータ等を管理する
    const {fetchingId, setFetchingId, createDate, fetchingData, setFetchingData} = useContext(PageStateContext);

    // 予定のデータを管理する
    const [events, setEvents] = useContext(EventContext);

    // 新規データが編集されたかどうか
    const [isTouched, setIsTouched] = useState(false);

    // データの型をEventだと解釈しておく
    const [data, setData] = useState<Event>({} as Event);
    useEffect(() => {
        let convertData: Event;
        if(fetchingData === null){
            let initialDate: Date = new Date();
            if(createDate !== null) initialDate = createDate;
            const initialTime: number = initialDate.getTime();
            convertData = {
                title: "",
                isAllDay: false,
                startTime: initialTime,
                endTime: initialTime,
                description: ""
            }
        }else{
            convertData = fetchingData as Event;
        }
        setData(convertData);
    }, [fetchingData])

    // フォーム内容を管理するState
    const [title, setTitle] = useState<string>("");
    const [isAllDay, setIsAllDay] = useState<boolean>(false);
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [startHours, setStartHours] = useState<number>(0);
    const [startMinutes, setStartMinutes] = useState<number>(0);
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [endHours, setEndHours] = useState<number>(0);
    const [endMinutes, setEndMinutes] = useState<number>(0);
    const [description, setDescription] = useState<string>("");
        useEffect(() => {
            // フォーム内容を既存のデータで初期化する
            setTitle(data.title || "");
            setIsAllDay(data.isAllDay || false);
            setStartDate(new Date(data.startTime || 0));
            setStartHours(new Date(data.startTime || 0).getHours());
            setStartMinutes(new Date(data.startTime || 0).getMinutes());
            setEndDate(new Date(data.endTime || 0));
            setEndHours(new Date(data.endTime || 0).getHours());
            setEndMinutes(new Date(data.endTime || 0).getMinutes());
            setDescription(data.description || "");
    }, [data])

    // データを保存する関数
    async function saveData(): Promise<void>{
        let startDateData: Date = new Date();
        let endDateData: Date = new Date();
        if(Number.isNaN(startDate.getTime()) === false){
            startDateData = startDate;
        }
        if(Number.isNaN(endDate.getTime()) === false){
            endDateData = endDate;
        }
        const startTimeDate: Date = new Date(startDateData.getFullYear(), startDateData.getMonth(), startDateData.getDate(), startHours, startMinutes, 0);
        const endTimeDate: Date = new Date(endDateData.getFullYear(), endDateData.getMonth(), endDateData.getDate(), endHours, endMinutes, 0);
        const newEvent: Event = {
            title,
            isAllDay,
            startTime: startTimeDate.getTime(),
            endTime: endTimeDate.getTime(),
            description
        };
        const newEvents: Events = Object.assign({}, events);
        if(fetchingId){
            // データベース上のデータを書き換える
            await EventDbController.updateEvent(newEvent, fetchingId);
            // html上のデータを書き換える
            setFetchingData(newEvent);
            newEvents[fetchingId] = newEvent;
        }else{
            // データベース上にデータを新規作成する
            const generatedId: string = await EventDbController.createEvent(newEvent, true);
            newEvent.id = generatedId;
            // html上のデータを書き換える
            setFetchingId(generatedId);
            setFetchingData(newEvent);
            newEvents[generatedId] = newEvent;
        }
        setEvents(newEvents);
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
                    <div className="pt-1 pb-1 mb-3 border-bottom form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="isAllDay"
                            checked={isAllDay}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setIsAllDay(event.target.checked);
                                setIsTouched(true);
                            }}
                        />
                        <label className="form-check-label" htmlFor="isAllDay">終日</label>
                    </div>
                    <div className="w-100 p-1 mb-3 border-bottom">
                        <DateInputGroup
                            label="始業時間"
                            shortLabel="始"
                            date={startDate}
                            setDate={setStartDate}
                            hours={startHours}
                            setHours={setStartHours}
                            minutes={startMinutes}
                            setMinutes={setStartMinutes}
                            setIsTouched={setIsTouched}
                            isAllDay={isAllDay}
                        />
                    </div>
                    <div className="w-100 p-1 mb-3 border-bottom">
                        <DateInputGroup
                            label="終業時間"
                            shortLabel="終"
                            date={endDate}
                            setDate={setEndDate}
                            hours={endHours}
                            setHours={setEndHours}
                            minutes={endMinutes}
                            setMinutes={setEndMinutes}
                            setIsTouched={setIsTouched}
                            isAllDay={isAllDay}
                        />
                    </div>
                    <div className="w-100 p-1 border-bottom">
                        <TextareaAutosize
                            className="form-control resize-none"
                            value={description}
                            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                                setDescription(event.target.value)
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}