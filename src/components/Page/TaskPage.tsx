import React, { useState, useContext } from 'react';
import { TaskContext } from "./../../provider/TaskProvider"
import CardListColumn from '../Others/CardListColumn';
import AddButton from "./../Others/AddButton"
// import SearchUiBar from '../UiBarColumn/SearchUiBar';
import PlainUiBar from '../UiBarColumn/PlainUiBar';

export default function TaskPage() {
    // const [searchValue, setSearchValue] = useState<string>("");

    // 課題のデータを管理する
    const [tasks, setTasks] = useContext(TaskContext);

    return (
        <div className="h-100 position-relative">
            <div className="container h-100 border-start border-end d-flex flex-column">
                <PlainUiBar/>
                {/* <SearchUiBar pageType="task"/> */}
                <CardListColumn pageType="task" data={tasks}/>
            </div>
            <AddButton/>
        </div>
    );
}