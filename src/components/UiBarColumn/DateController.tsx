import React from 'react';

export default function DateController({changeMonth}: { changeMonth: (amount: 1 | -1) => void }) {

    return (
        <div>
            <button
                className="btn fs-3"
                onClick={() => {changeMonth(-1)}}
            >
                <i className="bi bi-chevron-left"/>
            </button>
            <button
                className="btn fs-3"
                onClick={() => {changeMonth(1)}}
            >
                <i className="bi bi-chevron-right"/>
            </button>
        </div>
    );
}