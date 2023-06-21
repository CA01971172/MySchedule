import React, { useContext } from 'react';
import AppUser from '../../utils/AppUser';
import { LoginPageUrl } from '../../utils/constants';
import { DrawerContext } from '../../provider/DrawerProvider';

export default function HamburgerMenuHeader() {
    // ハンバーガーメニューが開いているかどうかを管理する
    const [drawerOpened, setDrawerOpened, isChangedSettings, setIsChangedSettings, openHamburgerMenu] = useContext(DrawerContext);

    return (
        <div className="p-1 ps-3 pe-3 d-flex justify-content-between align-items-center border-bottom">
            <button
                className="btn fs-3"
                onClick={() => {
                    setDrawerOpened(false)
                }}
            >
                <i className="bi bi-x-lg"/>
            </button>
            <button
                type="button"
                className="btn btn-outline-danger h-75"
                onClick={() => {
                    const logoutCheck: Boolean = window.confirm("ログアウトします。\nよろしいですか？")
                    if(logoutCheck){
                        AppUser.signOut(LoginPageUrl)
                    }
                }}
            >
                ログアウト
            </button>
        </div>
    );
}