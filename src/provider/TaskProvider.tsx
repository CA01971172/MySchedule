import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Tasks } from "./../utils/types"
import TaskDbController from "./../utils/DbController/TaskDbController"
import TaskSettingsDbController from '../utils/DbController/TaskSettingsDbController';

export const TaskContext = createContext<[Tasks, React.Dispatch<React.SetStateAction<Tasks>>]>([{}, ()=>{}])

export function TaskProvider({children}: {children: ReactNode}){
    // 課題のデータを管理する
    const [tasks, setTasks] = useState<Tasks>({})

    useEffect(() => {
        getTaskData().then((newTasksData) => {
            setTasks(newTasksData);
        });
    }, [])

    // 課題のデータをデータベース取得する関数
    // 「提出期限が過ぎた課題を自動で削除する」がtrueになっている場合、古い課題を削除しておく
    async function getTaskData(): Promise<Tasks>{
        let tasksData: Tasks = {};
        const autoTaskDelete: boolean = await TaskSettingsDbController.getAutoTaskDelete();
        if(autoTaskDelete === true){
            await TaskDbController.deleteOldTask();
        }
        tasksData =  await TaskDbController.readTask() as Tasks;
        return tasksData;
    }

    return (
        <TaskContext.Provider value={[tasks, setTasks]}>
            {children}
        </TaskContext.Provider>
    );
}