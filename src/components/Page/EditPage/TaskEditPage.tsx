import React, { useState, useEffect ,useContext } from 'react';
import TaskEditUiBar from '../../UiBarColumn/EditUiBar/TaskEditUiBar';
import { PageStateContext } from '../../../provider/PageStateProvider';
import { TaskContext } from '../../../provider/TaskProvider';
import { Task, Tasks } from "./../../../utils/types"
import TaskDbController from '../../../utils/DbController/TaskDbController';
import YearsInput from "./Form/YearsInput"
import MonthInput from "./Form/MonthInput"
import DayInput from "./Form/DayInput"
import HoursInput from './Form/HoursInput';
import MinutesInput from './Form/MinutesInput';
import { Form } from 'react-bootstrap';

export default function TaskEditPage() {
    // 現在操作中のデータ等を管理する
    const [pageState, setPageState, fetchingId, setFetchingId, fetchingData, setFetchingData] = useContext(PageStateContext);

    // 課題のデータを管理する
    const [tasks, setTasks] = useContext(TaskContext);

    // 新規データが編集されたかどうか
    const [isTouched, setIsTouched] = useState(false);

    // データの型をTaskだと解釈しておく
    const [data, setData] = useState<Task>({} as Task);
    useEffect(() => {
        let convertData: Task;
        if(fetchingData === null){
            const initialDate: Date = new Date(2000, 1, 1, 0, 0, 0);
            const initialTime: number = initialDate.getTime();
            convertData = {
                title: "",
                deadline: initialTime,
                description: ""
            }
        }else{
            convertData = fetchingData as Task;
        }
        setData(convertData);
    }, [fetchingData])

    // フォーム内容を管理するState
    const [title, setTitle] = useState<string>("");
    const [date, setDate] = useState<Date>(new Date());
    const [hours, setHours] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [description, setDescription] = useState<string>("");
        useEffect(() => {
            // フォーム内容を既存のデータで初期化する
            setTitle(data.title || "");
            setDate(new Date(data.deadline || 0));
            setHours(new Date(data.deadline || 0).getHours());
            setMinutes(new Date(data.deadline || 0).getMinutes());
            setDescription(data.description || "");
    }, [data])

    // データを保存する関数
    async function saveData(): Promise<void>{
        const deadlineDate: Date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes, 0);
        const deadline: number = deadlineDate.getTime();
        const newTask: Task = {
            title,
            deadline,
            description
        };
        const newTasks: Tasks = Object.assign({}, tasks);
        if(fetchingId){
            // データベース上のデータを書き換える
            await TaskDbController.updateTask(newTask, fetchingId);
            // html上のデータを書き換える
            setFetchingData(newTask);
            newTasks[fetchingId] = newTask;
        }else{
            // データベース上にデータを新規作成する
            const generatedId: string = await TaskDbController.createTask(newTask);
            newTask.id = generatedId;
            // html上のデータを書き換える
            setFetchingId(generatedId);
            setFetchingData(newTask);
            newTasks[generatedId] = newTask;
        }
        setTasks(newTasks);
    }

    return (
        <div className="h-100 position-relative">
            <div className="container h-100 border-start border-end d-flex flex-column">
                <TaskEditUiBar saveData={saveData} isTouched={isTouched}/>
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
                            <div className="input-group">
                                <span className="input-group-text">〆</span>
                                <Form.Control
                                        type="date"
                                        value={getYyyyMmDd(date)}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            const value: string = event.target.value;
                                            setDate(new Date(value));
                                        }}
                                        style={{minWidth: "8rem"}}
                                    />
                                <HoursInput hours={hours} setHours={setHours} setIsTouched={setIsTouched}/>
                                <span className="input-group-text">：</span>
                                <MinutesInput minutes={minutes} setMinutes={setMinutes} setIsTouched={setIsTouched}/>
                            </div>
                        </div>
                        <div className="d-none d-md-block">
                            <div className="input-group">
                                <span className="input-group-text">締め切り</span>
                                <Form.Control
                                        className="w-50"
                                        type="date"
                                        value={getYyyyMmDd(date)}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            const value: string = event.target.value;
                                            setDate(new Date(value));
                                        }}
                                    />
                                <HoursInput hours={hours} setHours={setHours} setIsTouched={setIsTouched}/>
                                <span className="input-group-text">：</span>
                                <MinutesInput minutes={minutes} setMinutes={setMinutes} setIsTouched={setIsTouched}/>
                            </div>
                        </div>
                    </div>
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