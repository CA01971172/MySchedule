import React, { useContext } from 'react';
import { PageState, PageStateContext, convertPageState } from '../../provider/PageStateProvider';

export default function EditUiBar({saveData, isTouched}: {saveData: ()=>Promise<void>, isTouched: boolean}){
    // 現在操作中のデータ等を管理する
    const {pageState, setPageState, fetchingData} = useContext(PageStateContext);

    return (
        <div className="row border-bottom">
            <div className="col d-flex justify-content-between align-items-center">
                <button
                    type="button"
                    className="btn btn-default fs-3"
                    onClick={() => {
                        if((!isTouched) && (fetchingData === null)){
                            setPageState("page");
                        }else{
                            saveData().then(()=>{
                                if(fetchingData === null){
                                    setPageState("page");
                                }else{
                                    const newPageState: PageState = convertPageState(pageState, "View");
                                    setPageState(newPageState);
                                }
                            });
                        }
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