import React from 'react';
import QueryUtils from "./../utils/QueryUtils"
import { PageType } from "./../utils/types"
import LoginPage from "./Page/LoginPage"
import AppPage from "./Page/AppPage"
import { PageStateProvider } from "./../provider/PageStateProvider"
import { DrawerProvider } from "./../provider/DrawerProvider"
import { TimetableProvider } from "./../provider/TimetableProvider"

export default function App() {
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
        return(
            <PageStateProvider>
                <DrawerProvider>
                    <TimetableProvider>
                        <AppPage pageType={pageType}/>
                    </TimetableProvider>
                </DrawerProvider>
            </PageStateProvider>
        );
    }

}