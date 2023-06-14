import React, { useState, useEffect, useContext } from 'react';
import Drawer from '@mui/material/Drawer';
import { DrawerContext } from "./../../provider/DrawerProvider"
import PlainUiBar from '../UiBarColumn/PlainUiBar';
import WeekdayColumn from '../Others/WeekdayColumn';
import TimetableColumn from '../Others/TimetableColumn';
import { Timetables } from "./../../utils/types"
import { TimetableDbController } from "./../../utils/DbController/TimetableDbController"
import AddButton from "./../Others/AddButton"

export default function TimetablePage() {
    // ハンバーガーメニューが開いているかどうかを管理する
    const [drawerOpened, setDrawerOpened] = useContext(DrawerContext);

    // 時間割のデータを管理する
    const [timetables, setTimetables] = useState<Timetables>({})

    useEffect(() => {
        let newTimetablesData: Timetables;
        TimetableDbController.readTimetable().then((response) =>{
            newTimetablesData = response as Timetables;
            setTimetables(newTimetablesData);
        });
    }, [])

    return (
        <div className="h-100 position-relative">
            <div className="container h-100 border-start border-end d-flex flex-column">
                <PlainUiBar/>
                <WeekdayColumn pageType="timetable"/>
                <TimetableColumn timetables={timetables}/>
            </div>
            <AddButton/>
            <Drawer
                anchor={'left'}
                open={drawerOpened}
                onClose={() => setDrawerOpened(false)}
                PaperProps={{ style: { width: "60%" } }}
            >
                <div>hoge</div>
            </Drawer>
        </div>
    );
}