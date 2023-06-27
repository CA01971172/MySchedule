import React, { useContext } from 'react';
import AppUser from '../../utils/AppUser';
import { LoginPageUrl } from '../../utils/constants';
import { DrawerContext } from '../../provider/DrawerProvider';

export default function HamburgerMenuHeader() {
    // ハンバーガーメニューが開いているかどうかを管理する
    const {closeHamburgerMenu} = useContext(DrawerContext);

    return (
        <div className="bg-body w-100 p-1 d-flex justify-content-between align-items-center border-bottom">
            <button
                className="btn fs-3"
                onClick={() => closeHamburgerMenu()}
            >
                <i className="bi bi-x-lg"/>
            </button>
        </div>
    );
}