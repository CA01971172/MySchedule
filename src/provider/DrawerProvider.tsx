import React, { createContext, useState, ReactNode } from 'react';
import { EventSettings, TabType, TaskSettings } from '../utils/types';
import TaskSettingsDbController from '../utils/DbController/TaskSettingsDbController';
import EventSettingsDbController from '../utils/DbController/EventSettingsDbController';

type MyType = [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
    [(null | "task" | "event"), (null | TaskSettings | EventSettings)],
    React.Dispatch<React.SetStateAction<[(null | "task" | "event"), (null | TaskSettings | EventSettings)]>>,
    ()=>void,
    ()=>void,
];

export const DrawerContext = createContext<MyType>([false, ()=>{}, false, ()=>{}, [null, null], ()=>{}, ()=>{}, ()=>{},])

export function DrawerProvider({children}: {children: ReactNode}){
    // ハンバーガーメニューが開いているかどうかを管理する
    const [drawerOpened, setDrawerOpened] = useState<boolean>(false);

    // ハンバーガーメニュー内の設定が変更されたかどうかを管理する
    const [isChangedSettings, setIsChangedSettings] = useState<boolean>(false);

    // 設定データを保存する
    const [settings, setSettings] = useState<[(null | "task" | "event"), (null | TaskSettings | EventSettings)]>([null, null]);
    
    // ハンバーガーメニューを開く処理
    function openHamburgerMenu(){
        setIsChangedSettings(false);
        setSettings([null, null]);
        setDrawerOpened(true);
    }

    // ハンバーガーメニューを閉じる処理
    function closeHamburgerMenu(){
        // データが変更済なら、データベースにデータを保存する
        if(isChangedSettings && settings[0]){
            console.log("new settings", settings);
            if(settings[0] === "task"){
                TaskSettingsDbController.setTaskSettings(settings[1] as TaskSettings);
            }else{
                EventSettingsDbController.setHidePassedEvent((settings[1] as EventSettings).hidePassedEvent);
            }
        }
        // ハンバーガーメニューを閉じる
        setDrawerOpened(false);
    }

    return (
        <DrawerContext.Provider value={[drawerOpened, setDrawerOpened, isChangedSettings, setIsChangedSettings, settings, setSettings, openHamburgerMenu, closeHamburgerMenu]}>
            {children}
        </DrawerContext.Provider>
    );
}