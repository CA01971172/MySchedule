import React, { useContext } from 'react';
import Drawer from '@mui/material/Drawer';
import { DrawerContext } from "./../../provider/DrawerProvider"
import PlainUiBar from '../UiBarColumn/PlainUiBar';
import WeekdayColumn from '../Others/WeekdayColumn';
import TimetableColumn from '../Others/TimetableColumn';
import AddButton from "./../Others/AddButton"

export default function TimetablePage() {
    // ハンバーガーメニューが開いているかどうかを管理する
    const [drawerOpened, setDrawerOpened] = useContext(DrawerContext);

    return (
        <div className="h-100 position-relative">
            <div className="container h-100 border-start border-end d-flex flex-column">
                <PlainUiBar/>
                <WeekdayColumn pageType="timetable"/>
                <TimetableColumn/>
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