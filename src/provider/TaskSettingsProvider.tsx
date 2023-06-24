import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { TaskSettings } from "./../utils/types"
import TaskSettingsDbController from '../utils/DbController/TaskSettingsDbController';

export const TaskSettingsContext = createContext<[TaskSettings, React.Dispatch<React.SetStateAction<TaskSettings>>]>([{} as TaskSettings, ()=>{}])

export function TaskSettingsProvider({children}: {children: ReactNode}){
    // 課題の設定データを管理する
    const [taskSettings, setTaskSettings] = useState<TaskSettings>({
        enabledAlert: false,
        daysBeforeDeadline: 3,
        autoTaskDelete: false
    });

    // 設定データをデータベースから取得する
    useEffect(() => {
        let newTaskSettings: TaskSettings = {} as TaskSettings;
        TaskSettingsDbController.getTaskSettings().then((taskSettings) => {
            newTaskSettings = taskSettings;
            setTaskSettings(newTaskSettings);
        })
    }, [])

    return (
        <TaskSettingsContext.Provider value={[taskSettings, setTaskSettings]}>
            {children}
        </TaskSettingsContext.Provider>
    );
}