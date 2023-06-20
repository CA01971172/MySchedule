import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Tasks } from "./../utils/types"
import TaskDbController from "./../utils/DbController/TaskDbController"

export const TaskContext = createContext<[Tasks, React.Dispatch<React.SetStateAction<Tasks>>]>([{}, ()=>{}])

export function TaskProvider({children}: {children: ReactNode}){
    // 課題のデータを管理する
    const [tasks, setTasks] = useState<Tasks>({})

    useEffect(() => {
        let newTasksData: Tasks;
        TaskDbController.readTask().then((response) =>{
            newTasksData = response as Tasks;
            setTasks(newTasksData || {});
        });
    }, [])

    return (
        <TaskContext.Provider value={[tasks, setTasks]}>
            {children}
        </TaskContext.Provider>
    );
}