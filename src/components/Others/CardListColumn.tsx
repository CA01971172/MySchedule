import React from 'react';
import { Events, Tasks } from '../../utils/types';

export default function CardListColumn({ pageType, data } : { pageType: "task" | "event", data: Tasks|Events}) {
    return (
        <div className="row">
            {Object.keys(data).map((key, index) => (
                <div
                    key={key}
                >
                    {key}
                </div>
            ))}
        </div>
    );
}