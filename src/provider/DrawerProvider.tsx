import React, { createContext, useState, ReactNode } from 'react';
import { TabType } from '../utils/types';

type MyType = [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
];

export const DrawerContext = createContext<MyType>([false, ()=>{}])

export function DrawerProvider({children}: {children: ReactNode}){
    // ハンバーガーメニューが開いているかどうかを管理する
    const [drawerOpened, setDrawerOpened] = useState<boolean>(false);

    return (
        <DrawerContext.Provider value={[drawerOpened, setDrawerOpened]}>
            {children}
        </DrawerContext.Provider>
    );
}