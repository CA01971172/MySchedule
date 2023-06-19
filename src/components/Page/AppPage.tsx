import React, { useContext, useState } from 'react';
import { Tab, Tabs } from "react-bootstrap";
import { PageStateContext } from "./../../provider/PageStateProvider"
import Drawer from '@mui/material/Drawer';
import { DrawerContext } from "./../../provider/DrawerProvider"
import { PageType, TabType } from "../../utils/types"
import TimetablePage from "./TimetablePage"
import TimetableViewPage from "./ViewPage/TimetableViewPage"
import TimetableEditPage from "./EditPage/TimetableEditPage"
import TimetableHamburgerMenu from "./../HamburgerMenu/TimetableHamburgerMenu"
import TaskPage from "./TaskPage"
import TaskViewPage from "./ViewPage/TaskViewPage"
import TaskEditPage from "./EditPage/TaskEditPage"
import TaskHamburgerMenu from "../HamburgerMenu/TaskHamburgerMenu"
import ShiftPage from "./ShiftPage"
import ShiftViewPage from "./ViewPage/ShiftViewPage"
import ShiftEditPage from "./EditPage/ShiftEditPage"
import ShiftHamburgerMenu from "./../HamburgerMenu/ShiftHamburgerMenu"
import EventPage from "./EventPage"
import EventViewPage from "./ViewPage/EventViewPage"
import EventEditPage from "./EditPage/EventEditPage"
import EventHamburgerMenu from "../HamburgerMenu/EventHamburgerMenu"
import CalendarPage from "./CalendarPage"
// import CalendarHamburgerMenu from "./../HamburgerMenu/CalendarHamburgerMenu"


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

    // ページの状態を管理する
    const [pageState, setPageState, fetchingId, setFetchingId, fetchingData, setFetchingData] = useContext(PageStateContext);

    // ハンバーガーメニューが開いているかどうかを管理する
    const [drawerOpened, setDrawerOpened] = useContext(DrawerContext);


    return (
        <div>
            <Tabs
                id="mySchedule-tabs"
                className="bg-primary"
                activeKey={tabKey}
                onSelect={(keyName) => {
                    setPageState(0);
                    setFetchingId(null);
                    setFetchingData(null);
                    setTabKey(keyName || "");
                    console.log(keyName)
            }}
            >
                <Tab
                    eventKey="timetable"
                    title={<span className={((tabKey === "timetable") ? "text-primary" : "text-white")}>時間割</span>}
                >
                    {((pageState === 0) ? (
                        <TimetablePage/>
                    ) : ((pageState === 1) ? (
                        <TimetableViewPage/>
                    ) : (
                        <TimetableEditPage/>
                    )))}
                </Tab>
                <Tab
                    eventKey="task"
                    title={<span className={((tabKey === "task") ? "text-primary" : "text-white")}>課題</span>}
                >
                    {((pageState === 0) ? (
                        <TaskPage/>
                    ) : ((pageState === 1) ? (
                        <TaskViewPage/>
                    ) : (
                        <TaskEditPage/>
                    )))}
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
            <Drawer
                anchor={'left'}
                open={drawerOpened}
                onClose={() => setDrawerOpened(false)}
                PaperProps={{ style: { width: "60%" } }}
            >
                {((tabKey === "timetable") ? (
                    <TimetableHamburgerMenu/>
                ) : ((tabKey === "task") ? (
                    <TaskHamburgerMenu/>
                ) : ((tabKey === "shift") ? (
                    <ShiftHamburgerMenu/>
                ) : ((tabKey === "event") ? (
                    <EventHamburgerMenu/>
                ) : (
                    <></>
                )))))}
            </Drawer>
        </div>
    );
}