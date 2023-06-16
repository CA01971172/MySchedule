import React, { useState, useContext } from 'react';
import Drawer from '@mui/material/Drawer';
import { DrawerContext } from "./../../provider/DrawerProvider"
import { TaskContext } from "./../../provider/TaskProvider"
import CardListColumn from '../Others/CardListColumn';
import AddButton from "./../Others/AddButton"
import TaskHamburgerMenu from "./../HamburgerMenu/TaskHamburgerMenu"
// import SearchUiBar from '../UiBarColumn/SearchUiBar';
import PlainUiBar from '../UiBarColumn/PlainUiBar';

export default function TaskPage() {
    // const [searchValue, setSearchValue] = useState<string>("");

    // 課題のデータを管理する
    const [tasks, setTasks] = useContext(TaskContext);

    // ハンバーガーメニューが開いているかどうかを管理する
    const [drawerOpened, setDrawerOpened] = useContext(DrawerContext);

    return (
        <div className="h-100 position-relative">
            <div className="container h-100 border-start border-end d-flex flex-column">
                <PlainUiBar/>
                {/* <SearchUiBar pageType="task"/> */}
                <CardListColumn pageType="task" data={tasks}/>
            </div>
            <AddButton/>
            <Drawer
                anchor={'left'}
                open={drawerOpened}
                onClose={() => setDrawerOpened(false)}
                PaperProps={{ style: { width: "60%" } }}
            >
                <TaskHamburgerMenu/>
            </Drawer>
        </div>
    );
}