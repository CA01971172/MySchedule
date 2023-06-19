import React from 'react';

export default function TaskEditUiBar({saveData, isTouched}: {saveData: ()=>Promise<void>, isTouched: boolean}){
    return (
        <div className="row border-bottom">
            <div className="col">
                <></>
            </div>
        </div>
    );
}