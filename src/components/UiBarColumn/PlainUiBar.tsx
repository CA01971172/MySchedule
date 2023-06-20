import React from 'react';
import HamburgerMenuButton from "./HamburgerMenuButton"

export default function PlainUiBar(){
    return (
        <div className="row border-bottom">
            <div className="col">
                <HamburgerMenuButton/>
            </div>
        </div>
    );
}