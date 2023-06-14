import React, { useContext } from 'react';
import { PageStateContext } from '../../provider/PageStateProvider';

export default function ViewUiBar(){
    // 現在操作中のデータ等を管理する
    const [pageState, setPageState, fetchingId, setFetchingId, fetchingData, setFetchingData] = useContext(PageStateContext);

    return (
        <div className="row border-bottom">
            <div className="col d-flex justify-content-between">
                <button
                    className="btn btn-default mr-auto"
                    style={{fontSize: "1.5rem"}}
                    onClick={() => setPageState(0)}
                >
                    <i className="bi bi-x-lg"/>
                </button>
                <div>
                    <button
                        className="btn btn-default ml-auto"
                        style={{fontSize: "1.5rem"}}
                        onClick={() => {}}
                    >
                        <i className="bi bi-trash"/>
                    </button>
                    <button
                        className="btn btn-default ml-auto"
                        style={{fontSize: "1.5rem"}}
                        onClick={() => setPageState(2)}
                    >
                        <i className="bi bi-pencil"/>
                    </button>
                </div>
            </div>
        </div>
    );
}