import React from 'react';
import { Events, Tasks } from '../../utils/types';
import TandemCard from "./../Card/TandemCard"

export default function CardListColumn({ pageType, data } : { pageType: "task" | "event", data: Tasks|Events}) {
    return (
        <div className="row">
            {Object.keys(data).map((key) => (
                <TandemCard key={key} cardType={pageType} data={data[key]}/>
            ))}
        </div>
    );
}