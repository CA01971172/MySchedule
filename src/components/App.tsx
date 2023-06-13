import React, { useState, useEffect } from 'react';
import { FirebaseInitializer } from "./../lib/firebase/firebase"
import AppUser from "./../utils/AppUser"
import { QueryUtils } from "./../utils/QueryUtils"
import { PageType } from "./../utils/types"
import LoginPage from "./Page/LoginPage"
import AppPage from "./Page/AppPage"

export default function App() {
    // firebaseを初期化する
    FirebaseInitializer.initialize();
    // 正しいページにリダイレクトする
    AppUser.redirect();
    // 現在開いているページの種類を取得する
    const pageType: PageType = QueryUtils.getPageType();

    if(pageType === "login"){
        return (
            <LoginPage/>
        );
    }else if(pageType === "register"){
        return (
            // <RegisterPage/>
            <></>
        );
    }else{
        return(<AppPage pageType={pageType}/>);
    }
}