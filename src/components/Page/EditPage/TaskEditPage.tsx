import React, { useState, useEffect ,useContext } from 'react';
import EditUiBar from '../../UiBarColumn/EditUiBar';
import { PageStateContext } from '../../../provider/PageStateProvider';
import { TaskContext } from '../../../provider/TaskProvider';
import { Task, Tasks } from "./../../../utils/types"
import TaskDbController from '../../../utils/DbController/TaskDbController';
import DateInputGroup from "./Form/DateInputGroup"

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
            const initialDate: Date = new Date();
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
        let dateData: Date = new Date();
        if(Number.isNaN(date.getTime()) === false){
            dateData = date;
        }
        const deadlineDate: Date = new Date(dateData.getFullYear(), dateData.getMonth(), dateData.getDate(), hours, minutes, 0);
        const deadline: number = deadlineDate.getTime();
        const newTask: Task = {
            title,
            deadline,
            description
        };
        const newTasks: Tasks = Object.assign({}, tasks);
        console.log("prev", tasks)
        if(fetchingId){
            // データベース上のデータを書き換える
            await TaskDbController.updateTask(newTask, fetchingId);
            // html上のデータを書き換える
            setFetchingData(newTask);
            newTasks[fetchingId] = newTask;
        }else{
            // データベース上にデータを新規作成する
            const generatedId: string = await TaskDbController.createTask(newTask);
            console.log(generatedId)
            newTask.id = generatedId;
            // html上のデータを書き換える
            setFetchingId(generatedId);
            setFetchingData(newTask);
            newTasks[generatedId] = newTask;
            console.log("new",newTasks)
        }
        setTasks(newTasks);
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
                        <DateInputGroup
                            label="締め切り"
                            shortLabel="〆"
                            date={date}
                            setDate={setDate}
                            hours={hours}
                            setHours={setHours}
                            minutes={minutes}
                            setMinutes={setMinutes}
                            setIsTouched={setIsTouched}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}