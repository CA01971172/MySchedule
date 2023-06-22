import React, { useContext } from 'react';
import { PageStateContext } from '../../provider/PageStateProvider';

export default function AddButton() {
    // 現在操作中のデータ等を管理する
    const [pageState, setPageState, fetchingId, setFetchingId, fetchingData, setFetchingData, tabKey, setTabKey] = useContext(PageStateContext);

    return (
        <div className="position-absolute bottom-0 end-0 m-3 pe-3">
            <button
                className="btn btn-primary btn-lg"
                onClick={() => {
                    setFetchingId(null);
                    setFetchingData(null);
                    setPageState(2);
                }}
            >
                <i className="bi bi-plus-lg"/>
            </button>
        </div>
    );
}