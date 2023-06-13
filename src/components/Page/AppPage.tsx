import React, { useState } from 'react';
import { Tab, Tabs } from "react-bootstrap";
import { PageType, TabType } from "../../utils/types"
import TimetablePage from "./TimetablePage"
import TaskPage from "./TaskPage"
import ShiftPage from "./ShiftPage"
import EventPage from "./EventPage"
import CalendarPage from "./CalendarPage"


// PageType等をタブの種類に変換する関数
function convertTabContent(pageType: string | null): TabType{
    let result: TabType;
    switch(pageType){
        case "timetable":
        case "task":
        case "shift":
        case "event":
        case "calendar":
            result = pageType;
        default:
            result = "calendar";
    }
    return result;
}

export default function AppPage({ pageType }: { pageType: PageType }){
    // タブを管理する
    let newTabKey: TabType = convertTabContent(pageType);
    const [tabKey, setTabKey] = useState<string>(newTabKey);

    return (
        <Tabs
            id="mySchedule-tabs"
            className="bg-primary"
            activeKey={tabKey}
            onSelect={(keyName) => setTabKey(keyName || "")}
        >
            <Tab
                eventKey="timetable"
                title={<span className={((tabKey === "timetable") ? "text-primary" : "text-white")}>時間割</span>}
            >
                <TimetablePage/>
            </Tab>
            <Tab
                eventKey="task"
                title={<span className={((tabKey === "task") ? "text-primary" : "text-white")}>課題</span>}
            >
                <TaskPage/>
            </Tab>
            <Tab
                eventKey="shift"
                title={<span className={((tabKey === "shift") ? "text-primary" : "text-white")}>バイト</span>}
            >
                <ShiftPage/>
            </Tab>
            <Tab
                eventKey="event"
                title={<span className={((tabKey === "event") ? "text-primary" : "text-white")}>予定</span>}
            >
                <EventPage/>
            </Tab>
            <Tab
                eventKey="calendar"
                title={<span className={((tabKey === "calendar") ? "text-primary" : "text-white")}>カレンダー</span>}
            >
                <CalendarPage/>
            </Tab>
        </Tabs>
    );
}