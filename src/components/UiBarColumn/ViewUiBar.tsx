import React, { useContext } from 'react';
import { PageStateContext } from '../../provider/PageStateProvider';

export default function ViewUiBar(){
    // 現在操作中のデータ等を管理する
    const [pageState, setPageState, fetchingId, setFetchingId, fetchingData, setFetchingData] = useContext(PageStateContext);

    return (
        <div className="row border-bottom">
            <div className="col">
                <button
                    className="btn btn-default"
                    style={{fontSize: "1.5rem"}}
                    onClick={() => setPageState(0)}
                >
                    <i className="bi bi-x-lg"/>
                </button>
            </div>
        </div>
    );
}