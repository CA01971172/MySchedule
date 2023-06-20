import React, { useContext, useState, useRef, useEffect } from 'react';
import { useSwipeable } from "react-swipeable";
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

// +1か-1でタブを取得するための関数
function swipeTab(nowTab: TabType, swipe: 1|-1){
    let result: TabType;
    const tabList: TabType[] = ["timetable", "task", "shift", "event", "calendar"]; // タブの一覧を左から順に定義しておく
    const nowIndex: number = tabList.findIndex(element => element === nowTab); // 現在開いているタブのindex番号を取得する
    let resultIndex: number;
    // タブをスワイプした後のindexを取得する(端のタブはスワイプできない)
    if(nowTab === tabList[0]){
        resultIndex = nowIndex + Math.max(swipe, 0);
    }else if(nowTab === tabList[tabList.length-1]){
        resultIndex = nowIndex + Math.min(swipe, 0);
    }else{
        resultIndex = nowIndex + swipe;
    }
    result = tabList[resultIndex];
    return result;
}

function touchStartEvent(e: TouchEvent){
    if (e.touches[0].pageX > 20 && e.touches[0].pageX < window.innerWidth - 20) return;
    e.preventDefault();
}

export default function AppPage({ pageType }: { pageType: PageType }){
    // ページのスワイプによるブラウザバックを禁止する
    const container = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (container.current) {
            container.current.addEventListener('touchstart', (e) => touchStartEvent(e));
        }

        return () => {
            if (container.current) {
                container.current.removeEventListener('touchstart', touchStartEvent);
            }
        }
    }, [container.current]);

    // タブを管理する
    let newTabKey: TabType = convertTabContent(pageType);
    const [tabKey, setTabKey] = useState<TabType>(newTabKey);

    // ページの状態を管理する
    const [pageState, setPageState, fetchingId, setFetchingId, fetchingData, setFetchingData] = useContext(PageStateContext);

    // ハンバーガーメニューが開いているかどうかを管理する
    const [drawerOpened, setDrawerOpened] = useContext(DrawerContext);

    // スワイプイベントを管理する
    const swipeHandlers = useSwipeable({
        onSwipedLeft: (event) => { // 右から左にスワイプしたときに発火するイベント
            console.log("left",event)
            const newTab: TabType = swipeTab(tabKey, 1);
            changeTab(newTab);
        },
        onSwipedRight: (event) => { // 左から右にスワイプしたときに発火するイベント
            console.log("right",event)
            console.log(event.initial[0])
            if(event.initial[0] < 20){
                // 画面左端からスワイプしたときのみ発火するイベント
                setDrawerOpened(true); // ハンバーガーメニューを開く
            }else{
                const newTab: TabType = swipeTab(tabKey, -1);
                changeTab(newTab);
            }
        },
        preventScrollOnSwipe: false,
        trackMouse: true, //マウス操作でのスワイプを許可する場合はtrue
    });

    // タブを切り替える関数
    function changeTab(tabName: TabType){
        setPageState(0);
        setFetchingId(null);
        setFetchingData(null);
        setTabKey(tabName);
    }

    return (
        <div className="w-100 h-100" ref={container}>
            <div
                className="w-100 h-100 d-flex flex-column"
                {...swipeHandlers}
                
            >
                <Tabs
                    id="mySchedule-tabs"
                    className="bg-primary"
                    activeKey={tabKey}
                    onSelect={(keyName) => {
                        changeTab(keyName as TabType);
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
                        // <CalendarHamburgerMenu/>
                    )))))}
                </Drawer>
            </div>
        </div>
    );
}