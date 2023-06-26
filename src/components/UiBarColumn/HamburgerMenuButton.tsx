import React, { useContext } from 'react';
import { DrawerContext } from "./../../provider/DrawerProvider"

export default function HamburgerMenuButton() {
    // ハンバーガーメニューが開いているかどうかを管理する
    const {drawerOpened, openHamburgerMenu, closeHamburgerMenu} = useContext(DrawerContext);

    return (
        <button
            className="btn fs-3"
            onClick={() => {
                if(drawerOpened){
                    closeHamburgerMenu();
                }else{
                    openHamburgerMenu();
                }
            }}
        >
            <i className="bi bi-list"/>
        </button>
    );
}