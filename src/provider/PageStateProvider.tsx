import React, { createContext, useState, ReactNode } from 'react';
import { Timetable, Task, Shift, Event, TabType, ContentType } from "./../utils/types"

export type PageState = (
    "page"
    | "view"
    | "edit"
    | "timetableView"
    | "timetableEdit"
    | "taskView"
    | "taskEdit"
    | "shiftView"
    | "shiftEdit"
    | "eventView"
    | "eventEdit"
);

// 〇〇Viewを〇〇Editに変換する、などの変換を行う関数
export function convertPageState(pageType: PageState, pageMode: "View"|"Edit"): PageState{
    let result: PageState = "page"
    let contentType: ContentType | "" = "";
    switch(pageType){
        case "timetableView":
        case "timetableEdit":
            contentType = "timetable";
            break;
        case "taskView":
        case "taskEdit":
            contentType = "task";
            break;
        case "shiftView":
        case "shiftEdit":
            contentType = "shift";
            break;
        case "eventView":
        case "eventEdit":
            contentType = "event";
            break;
        default:
            if(pageMode === "View"){
                return "view";
            }else if(pageMode === "Edit"){
                return "edit"
            }else{
                return "page";
            }
    }
    result = (contentType + pageMode) as PageState;
    return result;
}

interface PageStates{
    pageState: PageState;
    setPageState: React.Dispatch<React.SetStateAction<PageState>>;
    fetchingId: string|null;
    setFetchingId: React.Dispatch<React.SetStateAction<string|null>>;
    fetchingData: Event|Timetable|Task|Shift|null;
    setFetchingData: React.Dispatch<React.SetStateAction<Event|Timetable|Task|Shift|null>>;
    tabKey: TabType;
    setTabKey: React.Dispatch<React.SetStateAction<TabType>>;
}

export const PageStateContext = createContext<PageStates>({
    pageState: "page",
    setPageState: ()=>{},
    fetchingId: null,
    setFetchingId: ()=>{},
    fetchingData: null,
    setFetchingData: ()=>{},
    tabKey: "calendar",
    setTabKey: ()=>{}
})

export function PageStateProvider({children}: {children: ReactNode}){
    // 個別データを閲覧/編集中かどうかを管理する
    // pageが全体ページを閲覧中、viewが個別ページを閲覧中、editが個別ページを編集中
    const [pageState, setPageState] = useState<PageState>("page");

    // 現在個別ページで操作しているデータのidを操作する
    const [fetchingId, setFetchingId] = useState<string|null>(null);

    // 現在個別ページで操作しているデータを操作する
    const [fetchingData, setFetchingData] = useState<Timetable|Task|Shift|Event|null>(null);

    // 開いているタブの種類を管理する
    const [tabKey, setTabKey] = useState<TabType>("calendar");

    return (
        <PageStateContext.Provider value={{pageState, setPageState, fetchingId, setFetchingId, fetchingData, setFetchingData, tabKey, setTabKey}}>
            {children}
        </PageStateContext.Provider>
    );
}