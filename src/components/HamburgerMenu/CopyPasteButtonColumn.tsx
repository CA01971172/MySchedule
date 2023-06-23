import React from 'react';

export default function CopyPasteButtonColumn({week, keepWeekShift}: {week: number, keepWeekShift: (week: number) => void}) {
    return (
        <div className="row border-bottom align-items-center" style={{height: "calc(100% / 6)"}}>
            <div className="col text-center">
                <button
                    type="button"
                    className="btn btn-outline-dark me-3"
                    onClick={() => keepWeekShift(week)}
                >
                    コピー
                </button>
                <button
                    type="button"
                    className="btn btn-outline-dark"
                >
                    貼り付け
                </button>
            </div>
        </div>
    );
}