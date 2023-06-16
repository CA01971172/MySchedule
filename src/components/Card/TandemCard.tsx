import React, { useState, useContext } from 'react';
import { Task, Event } from "./../../utils/types"
import { PageStateContext } from '../../provider/PageStateProvider';

export default function TandemCard({ cardType, data }: { cardType:"task"|"event", data: Task|Event}) {
    // ページの状態を管理する
    const [pageState, setPageState, fetchingId, setFetchingId, fetchingData, setFetchingData] = useContext(PageStateContext);

    // カードがクリック中かどうかを管理する
    const [isActive, setIsActive] = useState<boolean>(false);

    return (
        <div/>
    );
}