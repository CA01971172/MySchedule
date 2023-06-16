import React from 'react';
import AppUser from '../../utils/AppUser';
import { LoginPageUrl } from '../../utils/constants';

export default function HamburgerMenuHeader() {
    return (
        <div className="p-1 ps-3 pe-3 d-flex justify-content-between align-items-center border-bottom">
            <button
                className="btn"
                style={{fontSize: "1.5rem"}}
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