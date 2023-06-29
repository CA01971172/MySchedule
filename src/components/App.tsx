import React from 'react';
import QueryUtils from "./../utils/QueryUtils"
import { PageType } from "./../utils/types"
import LoginPage from "./Page/LoginPage"
import AppPage from "./Page/AppPage"
import Providers from "./../provider/Providers"
import RegisterPage from "./Page/RegisterPage"
export default function App() {
    // 現在開いているページの種類を取得する
    const pageType: PageType = null//QueryUtils.getPageType();

    if(pageType === "login"){
        return (
            <LoginPage/> 
        );
    }else if(pageType === "register"){
        return (
            <RegisterPage/>
        );
    }else{
        return(
            <Providers>
                <AppPage pageType={pageType}/>
            </Providers>
        );
    }

}