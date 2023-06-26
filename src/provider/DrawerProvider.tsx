import React, { createContext, useState, ReactNode } from 'react';
import { EventSettings, TabType, TaskSettings } from '../utils/types';
import TaskSettingsDbController from '../utils/DbController/TaskSettingsDbController';
import EventSettingsDbController from '../utils/DbController/EventSettingsDbController';

type Settings = [
    (null | "task" | "event"),
    (null | TaskSettings | EventSettings)
];

export const DrawerContext = createContext<{
    drawerOpened: boolean,
    setDrawerOpened: React.Dispatch<React.SetStateAction<boolean>>,
    isChangedSettings: boolean,
    setIsChangedSettings: React.Dispatch<React.SetStateAction<boolean>>
    settings: Settings
    setSettings: React.Dispatch<React.SetStateAction<Settings>>
    openHamburgerMenu: () => void,
    closeHamburgerMenu: () => void
}>({
    drawerOpened: false,
    setDrawerOpened: ()=>{},
    isChangedSettings: false,
    setIsChangedSettings: ()=>{},
    settings: [null, null],
    setSettings: ()=>{},
    openHamburgerMenu: ()=>{},
    closeHamburgerMenu: ()=>{}
})

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
        <DrawerContext.Provider value={{drawerOpened, setDrawerOpened, isChangedSettings, setIsChangedSettings, settings, setSettings, openHamburgerMenu, closeHamburgerMenu}}>
            {children}
        </DrawerContext.Provider>
    );
}