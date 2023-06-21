import React, { useContext, useState, useEffect, useRef, RefObject, createRef } from 'react';
import { useSwipeable } from 'react-swipeable'
import { Tab, Tabs } from "react-bootstrap";
import { PageStateContext } from "./../../provider/PageStateProvider"
import Drawer from '@mui/material/Drawer';
import { DrawerContext } from "./../../provider/DrawerProvider"
import { PageType, TabType, TaskSettings } from "../../utils/types"
import TaskSettingsDbController from "./../../utils/DbController/TaskSettingsDbController"
import EventSettingsDbController from "./../../utils/DbController/EventSettingsDbController"
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

export default function AppPage({ pageType }: { pageType: PageType }){
    const tabList: TabType[] = ["timetable", "task", "shift", "event", "calendar"]; // タブの一覧を左から順に定義しておく

    // タブを管理する
    let newTabKey: TabType = convertTabContent(pageType);
    const [tabKey, setTabKey] = useState<TabType>(newTabKey);
    // タブを切り替える関数
    function changeTab(tabName: TabType){
        setPageState(0);
        setFetchingId(null);
        setFetchingData(null);
        const nowTabIndex: number = tabList.findIndex(element => element === tabKey); // 開いているタブのindex番号を取得する
        const nextTabIndex: number = tabList.findIndex(element => element === tabName); // 次に開くタブのindex番号を取得する
        tabsScroll(nowTabIndex, nextTabIndex);
        setTabKey(tabName);
    }
    // タブのrefを管理する
    const tabRefs = useRef<RefObject<HTMLSpanElement>[]>([]) // タブのref
    tabList.forEach((_, index) => {
        tabRefs.current[index] = createRef<HTMLSpanElement>();
    })
    // タブバーをスクロールさせる関数
    function tabsScroll(nowIndex: number, nextIndex: number){
        const tabsUl: HTMLUListElement = tabRefs.current[nowIndex].current?.parentNode?.parentNode?.parentNode as HTMLUListElement;
        if(tabsUl){
            let absLeft: number = 0;
            if(nowIndex < nextIndex){
                // 右にスクロールする場合
                const leftWidth: number = getAllWidth(-1, nextIndex);
                console.log("leftWidth", leftWidth);
                absLeft = leftWidth;
                tabsUl.scrollTo({left: absLeft})
            }else if(nowIndex > nextIndex){
                // 左にスクロールする場合
                const parentWidth: number = tabsUl.scrollWidth;
                const rightWidth: number = getAllWidth(1, nextIndex);
                console.log("parentWidth", parentWidth);
                console.log("rightWidth", rightWidth);
                absLeft = parentWidth - rightWidth;
                tabsUl.scrollTo({left: absLeft})
            }
            console.log("absLeft", absLeft);
        }
        // widthの合計を求める関数
        function getAllWidth(direction: 1|-1, index: number){
            let result = 0;
            let test: string[] = []
            if(direction === 1){
                for(let i: number = index-1; i < tabList.length; i++){
                    addWidth(i);
                }
            }else{
                for(let i: number = index; i >= 2; i--){
                    addWidth(i);
                }
            }
            function addWidth(rectIndex: number){
                let fixedIndex = rectIndex;
                if(rectIndex < 0){
                    fixedIndex = 0;
                }else if(rectIndex > tabList.length-1){
                    fixedIndex = tabList.length-1;
                }
                const rect = tabRefs.current[fixedIndex].current?.getBoundingClientRect();
                const width: number = 16 + (rect?.width||0) + 16;
                result += width
                test.push((tabRefs.current[fixedIndex].current?.textContent || "")+": "+width)
            }
            console.log(test)
            return result;
        }
    }

    // ページの状態を管理する
    const [pageState, setPageState, fetchingId, setFetchingId, fetchingData, setFetchingData] = useContext(PageStateContext);

    // ハンバーガーメニューが開いているかどうかを管理する
    const [drawerOpened, setDrawerOpened, isChangedSettings, setIsChangedSettings, settings, setSettings, openHamburgerMenu, closeHamburgerMenu] = useContext(DrawerContext);

    // 課題の設定データを管理する
    const [taskSettings, setTaskSettings] = useState<TaskSettings>({
        enabledAlert: false,
        daysBeforeDeadline: 3,
        autoTaskDelete: false
    });
    // 設定データをデータベースから取得する
    useEffect(() => {
        let newTaskSettings: TaskSettings = {} as TaskSettings;
        TaskSettingsDbController.getTaskSettings().then((taskSettings) => {
            newTaskSettings = taskSettings;
            setTaskSettings(newTaskSettings);
        })
    }, [])

    // スワイプイベントを管理する
    const swipeAppHandlers = useSwipeable({ // アプリページ用のスワイプ処理
        onSwiping: (event) => {
            // ハンバーガーメニューを開く処理
            if(!drawerOpened && (event.dir === "Right") && (event.absX > 30)){
                if((event.initial[0] <= 50)){
                    // 画面左端からスワイプしたときのみハンバーガーメニューを開く
                    openHamburgerMenu();
                }
            }
        },
        onSwipedLeft: (event) => { // 右から左にスワイプしたときに発火するイベント
            const newTab: TabType = swipeTab(tabKey, 1);
            if(!drawerOpened) changeTab(newTab);
        },
        onSwipedRight: (event) => { // 左から右にスワイプしたときに発火するイベント
            if(event.initial[0] > 50){
                const newTab: TabType = swipeTab(tabKey, -1);
                if(!drawerOpened) changeTab(newTab);
            }
        }
    });
    const swipeDrawerHandlers = useSwipeable({ // ハンバーガーメニュー用のスワイプ処理
        onSwiping: (event) => {
            // ハンバーガーメニューを閉じる処理
            if(drawerOpened && (event.dir === "Left") && (event.absX > 30)){
                closeHamburgerMenu();
            }
        }
    });

    return (
        <div className="w-100 h-100 d-flex flex-column position-relative" onTouchStart={()=>{}} {...swipeAppHandlers}>
            <Tabs
                id="mySchedule-tabs"
                className="bg-primary"
                style={{
                    flexWrap: "nowrap",
                    overflowX: "auto"
                }}
                activeKey={tabKey}
                onSelect={(keyName) => {
                    changeTab(keyName as TabType);
                }}
            >
                <Tab
                    eventKey="timetable"
                    title={
                        <span
                            className={`text-nowrap ${((tabKey === "timetable") ? "text-primary" : "text-white")}`}
                            ref={tabRefs.current[0]}
                        >
                            時間割
                        </span>
                    }
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
                    title={
                        <span
                            className={`text-nowrap ${((tabKey === "task") ? "text-primary" : "text-white")}`}
                            ref={tabRefs.current[1]}
                        >
                            課題
                        </span>
                    }
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
                    title={
                        <span
                            className={`text-nowrap ${((tabKey === "shift") ? "text-primary" : "text-white")}`}
                            ref={tabRefs.current[2]}
                        >
                            バイト
                        </span>
                    }
                >
                    <ShiftPage/>
                </Tab>
                <Tab
                    eventKey="event"
                    title={
                        <span
                            className={`text-nowrap ${((tabKey === "event") ? "text-primary" : "text-white")}`}
                            ref={tabRefs.current[3]}
                        >
                            予定
                        </span>
                    }
                >
                    <EventPage/>
                </Tab>
                <Tab
                    eventKey="calendar"
                    title={
                        <span
                            className={`text-nowrap ${((tabKey === "calendar") ? "text-primary" : "text-white")}`}
                            ref={tabRefs.current[4]}
                        >
                            カレンダー
                        </span>
                    }
                >
                    <CalendarPage/>
                </Tab>
            </Tabs>
            <Drawer
                anchor={'left'}
                open={drawerOpened}
                onClose={() => {
                    closeHamburgerMenu();
                }}
                PaperProps={{ style: { width: "60%" } }}
                {...swipeDrawerHandlers}
            >
                {((tabKey === "timetable") ? (
                    <TimetableHamburgerMenu/>
                ) : ((tabKey === "task") ? (
                    <TaskHamburgerMenu taskSettings={taskSettings} setTaskSettings={setTaskSettings}/>
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
    );
}