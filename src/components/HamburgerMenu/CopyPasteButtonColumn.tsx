import React from 'react';

export default function CopyPasteButtonColumn({week, copyWeekShift, pasteWeekShift}: {week: number, copyWeekShift: (week: number) => void, pasteWeekShift: (week: number) => void}) {
    return (
        <div className="row border-bottom align-items-center" style={{height: "calc(100% / 6)"}}>
            <div className="col text-center">
                <button
                    type="button"
                    className="btn btn-outline-dark me-3"
                    onClick={() => copyWeekShift(week)}
                >
                    コピー
                </button>
                <button
                    type="button"
                    className="btn btn-outline-dark"
                    onClick={() => pasteWeekShift(week)}
                >
                    貼り付け
                </button>
            </div>
        </div>
    );
}