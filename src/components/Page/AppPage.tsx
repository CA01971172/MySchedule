import React, { useState } from 'react';
import { Tab, Tabs } from "react-bootstrap";
import { PageType, TabType } from "../../utils/types"

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

type KeyAndTitle = {
    key: TabType
    title: "時間割"|"課題"|"バイト"|"予定"|"カレンダー"
}

export default function AppPage({ pageType }: { pageType: PageType }){
    // タブを管理する
    let newTabKey: TabType = convertTabContent(pageType);
    const [tabKey, setTabKey] = useState<string>(newTabKey);
    const keysAndTitles: KeyAndTitle[] = [
        {key: "timetable", title: "時間割"},
        {key: "task", title: "課題"},
        {key: "shift", title: "バイト"},
        {key: "event", title: "予定"},
        {key: "calendar", title: "カレンダー"}
    ]

    return (
        <Tabs
            id="mySchedule-tabs"
            className="bg-primary"
            activeKey={tabKey}
            onSelect={(keyName) => setTabKey(keyName || "")}
        >
            {keysAndTitles.map((value, index) => (
                <Tab
                    eventKey={value.key}
                    title={<span className={((tabKey === value.key) ? "text-primary" : "text-white")}>{value.title}</span>}
                >
                    {value.title}のページ
                </Tab>
            ))}
        </Tabs>
    );
}