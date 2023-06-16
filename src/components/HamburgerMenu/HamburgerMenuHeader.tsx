import React from 'react';

export default function HamburgerMenuHeader() {
    return (
        <div className="p-1 d-flex justify-content-between border-bottom border-secondary">
            <button className="btn"><i className="bi bi-x-lg"></i></button>
            <button type="button" className="btn btn-outline-danger">ログアウト</button>
        </div>
    );
}






