import React, { useContext } from 'react';
import { DrawerContext } from "./../../provider/DrawerProvider"

export default function HamburgerMenuButton() {
    // ハンバーガーメニューが開いているかどうかを管理する
    const [drawerOpened, setDrawerOpened] = useContext(DrawerContext);

    return (
        <button
            className="btn btn-default fs-3"
            onClick={() => setDrawerOpened((prev) => !prev)}
        >
            <i className="bi bi-list"/>
        </button>
    );
}