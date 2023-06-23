import React, { useState, useEffect } from 'react';
import { Events, Tasks } from '../../utils/types';
import TandemCard from "./../Card/TandemCard"

export default function CardListColumn({ pageType, data } : { pageType: "task" | "event", data: Tasks|Events}) {
    // 個別のデータの要素の値にも要素のキー(id)を格納しておく
    const [idAddedData, setIdAddedData] = useState<Tasks|Events>({});
    useEffect(() => {
        const newData: Tasks|Events = Object.assign({}, data);
        for(const key in data){
            newData[key]["id"] = key;
        }
        setIdAddedData(data);
    }, [data])

    return (
        <div className="row p-2">
            {Object.keys(idAddedData).map((key) => (
                <TandemCard key={key} cardType={pageType} data={idAddedData[key]}/>
            ))}
        </div>
    );
}