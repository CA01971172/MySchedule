import React from 'react';

export default function AuthHeader() {
    return (
        <header>
            <nav className="navbar navbar-expand navbar-dark bg-primary">
                <div className="navbar-brand d-none d-md-block">
                    </div>
                <div className="navbar-collapse justify-content-center">
                    <ul className="navbar-nav list-group-horizontal">
                        <li className="nav-item title">
                            <div className="nav-link active">MySchedule</div>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}