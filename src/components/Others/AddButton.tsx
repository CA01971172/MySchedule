import React, { useContext } from 'react';
import { PageStateContext } from '../../provider/PageStateProvider';

export default function AddButton() {
    // 現在操作中のデータ等を管理する
    const {setPageState, setFetchingId, setFetchingData} = useContext(PageStateContext);

    return (
        <div className="position-absolute bottom-0 end-0 m-4">
            <button
                className="btn btn-primary btn-lg"
                onClick={() => {
                    setFetchingId(null);
                    setFetchingData(null);
                    setPageState("edit");
                }}
            >
                <i className="bi bi-plus-lg"/>
            </button>
        </div>
    );
}

// onClick={() => {
//     setFetchingId(null);
//     setFetchingData(null);
//     setPageState("edit");
// }}