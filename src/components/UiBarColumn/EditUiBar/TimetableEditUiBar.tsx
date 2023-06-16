import React, { useContext } from 'react';
import { PageStateContext } from '../../../provider/PageStateProvider';

export default function TimetableEditUiBar({saveData}: {saveData: ()=>Promise<void>}){
    // 現在操作中のデータ等を管理する
    const [pageState, setPageState, fetchingId, setFetchingId, fetchingData, setFetchingData] = useContext(PageStateContext);

    return (
        <div className="row border-bottom">
            <div className="col d-flex justify-content-between align-items-center">
                <button
                    type="button"
                    className="btn btn-default fs-3"
                    onClick={() => {
                        saveData().then(()=>{
                            if(fetchingData === null){
                                setPageState(0);
                            }else{
                                setPageState(1);
                            }
                        });
                    }}
                >
                    <i className="bi bi-x-lg"/>
                </button>
                <button
                    type="button"
                    className="btn btn-success h-75"
                    onClick={() => {
                        saveData().then(()=>{
                            window.alert("データを保存しました。");
                        });
                    }}
                >
                    保存
                </button>
            </div>
        </div>
    );
}