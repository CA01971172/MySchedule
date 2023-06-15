import React from 'react';
import QueryUtils from "./../utils/QueryUtils"
import { PageType } from "./../utils/types"
import LoginPage from "./Page/LoginPage"
import AppPage from "./Page/AppPage"
import ShiftHamburgerMenu from "./HamburgerMenu/ShiftHamburgerMenu"

export default function App() {
    // 現在開いているページの種類を取得する
    const pageType: PageType = QueryUtils.getPageType();

    if(pageType === "login"){
        return (
            <div> {/* <LoginPage/> */}
           <ShiftHamburgerMenu/> </div>
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