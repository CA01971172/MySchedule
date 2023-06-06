import React, { useState, useEffect } from 'react';

export default function LoginPage() {
    return (
        <div>
            <ul className="nav">
                <li className="nav-item">
                <a href="#contents1" className="nav-link active" data-toggle="tab">タブ１</a>
                </li>
                <li className="nav-item">
                <a href="#contents2" className="nav-link" data-toggle="tab">タブ2</a>
                </li>
                <li className="nav-item">
                <a href="#contents3" className="nav-link" data-toggle="tab">タブ3</a>
                </li>
            </ul>
            <div className="tab-content">
                <div id="contents1" className="tab-pane active">
                    <p>タブ1のコンテンツ</p>
                </div>
                <div id="contents2" className="tab-pane">
                    <p>タブ2のコンテンツ</p>
                </div>
                <div id="contents3" className="tab-pane">
                    <p>タブ3のコンテンツ</p>
                </div>
            </div>
        </div>
    );
}