import React from 'react';
import { Timetables } from '../../utils/types';

export default function TimetableColumn({timetables}:{timetables: Timetables}) {
    return (
        <div>
            {Object.keys(timetables).map((id) => (
                <div>{timetables.id.title}</div>
            ))}
        </div>
    );
}