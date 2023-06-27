import React from 'react';
import HamburgerMenuButton from "./HamburgerMenuButton"
import SettingsButton from "./SettingsButton"

export default function PlainUiBar(){
    return (
        <div className="row border-bottom">
            <div className="col p-0">
                <HamburgerMenuButton/>
            </div>
            <div className="col-auto p-0">
                <SettingsButton/>
            </div>
        </div>
    );
}