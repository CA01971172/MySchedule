import React, { createContext, useState, ReactNode } from 'react';
import { EventSettings, TabType, TaskSettings } from '../utils/types';

type MyType = [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
    null | TaskSettings | EventSettings,
    React.Dispatch<React.SetStateAction<null | TaskSettings | EventSettings>>,
    ()=>void,
    ()=>void,
];

export const DrawerContext = createContext<MyType>([false, ()=>{}, false, ()=>{}, null, ()=>{}, ()=>{}, ()=>{},])

export function DrawerProvider({children}: {children: ReactNode}){
    // ハンバーガーメニューが開いているかどうかを管理する
    const [drawerOpened, setDrawerOpened] = useState<boolean>(false);

    // ハンバーガーメニュー内の設定が変更されたかどうかを管理する
    const [isChangedSettings, setIsChangedSettings] = useState<boolean>(false);

    // 設定データを保存する
    const [settings, setSettings] = useState<null | TaskSettings | EventSettings>(null);
    
    // ハンバーガーメニューを開く処理
    function openHamburgerMenu(){
        setIsChangedSettings(false);
        setSettings(null);
        setDrawerOpened(true);
    }

    // ハンバーガーメニューを閉じる処理
    function closeHamburgerMenu(){
        if(isChangedSettings && settings){
            // TODO データベースと通信する処理
            console.log(settings);
        }
        setDrawerOpened(false);
    }

    return (
        <DrawerContext.Provider value={[drawerOpened, setDrawerOpened, isChangedSettings, setIsChangedSettings, settings, setSettings, openHamburgerMenu, closeHamburgerMenu]}>
            {children}
        </DrawerContext.Provider>
    );
}