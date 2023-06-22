import React, { useState, useEffect ,useContext } from 'react';
import EditUiBar from '../../UiBarColumn/EditUiBar';
import { PageStateContext } from '../../../provider/PageStateProvider';
import { ShiftContext } from '../../../provider/ShiftProvider';
import { Shift, Shifts } from "./../../../utils/types"
import ShiftDbController from '../../../utils/DbController/ShiftDbController';
import DateInputGroup from "./Form/DateInputGroup"

export default function ShiftEditPage() {
    // 現在操作中のデータ等を管理する
    const [pageState, setPageState, fetchingId, setFetchingId, fetchingData, setFetchingData, tabKey, setTabKey] = useContext(PageStateContext);

    // バイトシフトのデータを管理する
    const [shifts, setShifts] = useContext(ShiftContext);

    // 新規データが編集されたかどうか
    const [isTouched, setIsTouched] = useState(false);

    // データの型をTaskだと解釈しておく
    const [data, setData] = useState<Shift>({} as Shift);
    useEffect(() => {
        let convertData: Shift;
        if(fetchingData === null){
            const initialDate: Date = new Date();
            const initialTime: number = initialDate.getTime();
            convertData = {
                startTime: initialTime,
                endTime: initialTime,
                breakTime: 0
            }
        }else{
            convertData = fetchingData as Shift;
        }
        setData(convertData);
    }, [fetchingData])

    // フォーム内容を管理するState
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [startHours, setStartHours] = useState<number>(0);
    const [startMinutes, setStartMinutes] = useState<number>(0);
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [endHours, setEndHours] = useState<number>(0);
    const [endMinutes, setEndMinutes] = useState<number>(0);
    const [breakMinutes, setBreakMinutes] = useState<number>(0);
        useEffect(() => {
            // フォーム内容を既存のデータで初期化する
            setStartDate(new Date(data.startTime || 0));
            setStartHours(new Date(data.startTime || 0).getHours());
            setStartMinutes(new Date(data.startTime || 0).getMinutes());
            setEndDate(new Date(data.endTime || 0));
            setEndHours(new Date(data.endTime || 0).getHours());
            setEndMinutes(new Date(data.endTime || 0).getMinutes());
            setBreakMinutes(data.breakTime || 0);
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
        const newShift: Shift = {
            startTime: startTimeDate.getTime(),
            endTime: endTimeDate.getTime(),
            breakTime: breakMinutes
        };
        const newShifts: Shifts = Object.assign({}, shifts);
        if(fetchingId){
            // データベース上のデータを書き換える
            await ShiftDbController.updateShift(newShift, fetchingId);
            // html上のデータを書き換える
            setFetchingData(newShift);
            newShifts[fetchingId] = newShift;
        }else{
            // データベース上にデータを新規作成する
            const generatedId: string = await ShiftDbController.createShift(newShift);
            newShift.id = generatedId;
            // html上のデータを書き換える
            setFetchingId(generatedId);
            setFetchingData(newShift);
            newShifts[generatedId] = newShift;
        }
        setShifts(newShifts);
    }

    // 左の0を削除する関数
    function suppressZero(value: string | number): string{
        let result = "";
        const suppressedValue: string = String(value).replace(/^0+/, "")
        if(suppressedValue === ""){
            // 全部が0なせいで、0を消すと文字が全部消えちゃうなら、"0"を返す
            result = "0";
        }else{
            result = suppressedValue;
        }
        return result;
    }

    return (
        <div className="h-100 position-relative">
            <div className="container h-100 border-start border-end d-flex flex-column">
                <EditUiBar saveData={saveData} isTouched={isTouched}/>
                <div className="row flex-grow-1 d-block p-3">
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
                        />
                    </div>
                    <div className="input-group w-100 p-1 border-bottom">
                        <span className="input-group-text">休憩時間</span>
                        <input
                            type="number"
                            className="form-control"
                            min={0}
                            value={suppressZero(breakMinutes)}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const receive: string = event.target.value;
                                setBreakMinutes(Math.max(Number(receive), 0));
                                setIsTouched(true);
                            }}
                        />
                        <span className="input-group-text">分</span>
                    </div>
                </div>
            </div>
        </div>
    );
}