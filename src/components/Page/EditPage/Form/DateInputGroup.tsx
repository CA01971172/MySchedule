import React from 'react';
import { Form } from 'react-bootstrap';
import HoursInput from './HoursInput';
import MinutesInput from './MinutesInput';

interface MyInterface{
    label: string;
    shortLabel: string;
    date: Date;
    setDate: (value: React.SetStateAction<Date>) => void;
    hours: number;
    setHours: (value: React.SetStateAction<number>) => void;
    minutes: number;
    setMinutes: (value: React.SetStateAction<number>) => void;
    setIsTouched: (value: React.SetStateAction<boolean>) => void;
    isAllDay?: boolean;
}

export default function DateInputGroup(props: MyInterface){
    const {label, shortLabel, date, setDate, hours, setHours, minutes, setMinutes, setIsTouched, isAllDay } = props;
    return (
        <div>
            <div className="d-md-none">
                <div className="input-group">
                    <span className="input-group-text">{shortLabel}</span>
                    <Form.Control
                            type="date"
                            value={getYyyyMmDd(date)}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value: string = event.target.value;
                                setDate(new Date(value));
                                setIsTouched(true);
                            }}
                            style={{minWidth: "8rem"}}
                        />
                    {(isAllDay !== true) && (<HoursInput hours={hours} setHours={setHours} setIsTouched={setIsTouched}/>)}
                    {(isAllDay !== true) && (<span className="input-group-text">：</span>)}
                    {(isAllDay !== true) && (<MinutesInput minutes={minutes} setMinutes={setMinutes} setIsTouched={setIsTouched}/>)}
                </div>
            </div>
            <div className="d-none d-md-block">
                <div className="input-group">
                    <span className="input-group-text">{label}</span>
                    <Form.Control
                            className="w-50"
                            type="date"
                            value={getYyyyMmDd(date)}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value: string = event.target.value;
                                setDate(new Date(value));
                                setIsTouched(true);
                            }}
                        />
                    {(isAllDay !== true) && (<HoursInput hours={hours} setHours={setHours} setIsTouched={setIsTouched}/>)}
                    {(isAllDay !== true) && (<span className="input-group-text">：</span>)}
                    {(isAllDay !== true) && (<MinutesInput minutes={minutes} setMinutes={setMinutes} setIsTouched={setIsTouched}/>)}
                </div>
            </div>
        </div>
    );
}

// Dateオブジェクトをyyyy-mm-dd形式で取得する関数
function getYyyyMmDd(date: Date): string{
    let result: string = "";
    const year: string = ("0000"+String(date.getFullYear())).slice(-4);
    const month: string = ("00"+String(date.getMonth()+1)).slice(-2);
    const day: string = ("00"+String(date.getDate())).slice(-2);
    result = `${year}-${month}-${day}`;
    return result;
}