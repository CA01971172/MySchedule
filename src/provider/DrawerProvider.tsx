import React, { createContext, useState, ReactNode } from 'react';

export const DrawerContext = createContext<[boolean, React.Dispatch<React.SetStateAction<boolean>>]>([false, ()=>{}])

export function DrawerProvider({children}: {children: ReactNode}){
    // ハンバーガーメニューが開いているかどうかを管理する
    const [drawerOpened, setDrawerOpened] = useState<boolean>(false);

    return (
        <DrawerContext.Provider value={[drawerOpened, setDrawerOpened]}>
            {children}
        </DrawerContext.Provider>
    );
}