import React, { useState } from 'react';
import { Tab, Tabs } from "react-bootstrap";
import { PageType, TabType } from "./../utils/types"

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
            activeKey={tabKey}
            onSelect={(keyName) => setTabKey(keyName || "")}
        >
            <Tab eventKey="timetable" title="時間割">
                時間割のページ
            </Tab>
            <Tab eventKey="task" title="課題">
                課題のページ
            </Tab>
            <Tab eventKey="shift" title="バイト">
                バイトのページ
            </Tab>
            <Tab eventKey="event" title="予定">
                予定のページ
            </Tab>
            <Tab eventKey="calendar" title="カレンダー">
                カレンダーのページ
            </Tab>
        </Tabs>
    );
}