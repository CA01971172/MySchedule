import React, { useState, useContext } from 'react';
import { EventContext } from "./../../provider/EventProvider"
import CardListColumn from '../Others/CardListColumn';
import AddButton from "./../Others/AddButton"
// import SearchUiBar from '../UiBarColumn/SearchUiBar';
import PlainUiBar from '../UiBarColumn/PlainUiBar';

export default function EventPage() {
    // const [searchValue, setSearchValue] = useState<string>("");

    // 予定のデータを管理する
    const [events, setEvents] = useContext(EventContext);

    return (
        <div>
            <div className="container h-100 border-start border-end d-flex flex-column">
                <PlainUiBar/>
                {/* <SearchUiBar pageType="event"/> */}
                <CardListColumn pageType="event" data={events}/>
            </div>
            <AddButton/>
        </div>
    );
}