import React, { useState } from 'react';
import UiBarColumn from '../UiBarColumn/UiBarColumn';
import CardListColumn from '../Others/CardListColumn';
import { Event } from "./../../utils/types"
import { EventDbController } from "./../../utils/DbController/EventDbController"

export default function EventPage() {
    const [searchValue, setSearchValue] = useState<string>("");

    return (
        <div/>
    );
}