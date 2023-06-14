import React, { useState } from 'react';
import UiBarColumn from '../UiBarColumn/PlainUiBar';
import CardListColumn from '../Others/CardListColumn';
import { Task } from "./../../utils/types"
import TaskDbController from '../../utils/DbController/TaskDbController';

export default function TaskPage() {
    const [searchValue, setSearchValue] = useState<string>("");

    return (
        <div/>
    );
}