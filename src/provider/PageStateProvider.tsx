import React, { createContext, useState, ReactNode } from 'react';
import { Timetable, Task, Shift, Event, TabType } from "./../utils/types"

type MyType = [
    0|1|2,
    React.Dispatch<React.SetStateAction<0|1|2>>,
    string|null,
    React.Dispatch<React.SetStateAction<string|null>>,
    Event|Timetable|Task|Shift|null,
    React.Dispatch<React.SetStateAction<Event|Timetable|Task|Shift|null>>,
    TabType,
    React.Dispatch<React.SetStateAction<TabType>>,
]

export const PageStateContext = createContext<MyType>([0, ()=>{}, null, ()=>{}, null, ()=>{}, "calendar", ()=>{}])

export function PageStateProvider({children}: {children: ReactNode}){
    // 個別データを閲覧/編集中かどうかを管理する
    // 0が全体ページを閲覧中、1が個別ページを閲覧中、2が個別ページを編集中
    const [pageState, setPageState] = useState<0|1|2>(0);

    // 現在個別ページで操作しているデータのidを操作する
    const [fetchingId, setFetchingId] = useState<string|null>(null);

    // 現在個別ページで操作しているデータを操作する
    const [fetchingData, setFetchingData] = useState<Timetable|Task|Shift|Event|null>(null);

    // 開いているタブの種類を管理する
    const [tabKey, setTabKey] = useState<TabType>("calendar");

    return (
        <PageStateContext.Provider value={[pageState, setPageState, fetchingId, setFetchingId, fetchingData, setFetchingData, tabKey, setTabKey]}>
            {children}
        </PageStateContext.Provider>
    );
}