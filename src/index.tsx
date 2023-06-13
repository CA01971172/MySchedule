import React from 'react';
import { FirebaseInitializer } from "./lib/firebase/firebase"
import AppUser from "./utils/AppUser"
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./style/app.scss"
import App from "./components/App";

window.onload = async function(){
    // firebaseを初期化する
    FirebaseInitializer.initialize();
    // 正しいページにリダイレクトする
    await AppUser.redirect();

    //Appコンポーネントをレンダリングする
    const container: HTMLElement | null = document.getElementById("root");
    if(!container) throw new Error("The root element is not found.")
    const root = createRoot(container);
    root.render(<App />);
};



//テスト用ログアウトコード(コンソール上で実行)
import { LoginPageUrl } from "./utils/constants";
declare global {
    interface Window {
        logout(): void;
    }
}
window.logout = function (): void{
    const logoutCheck: Boolean = window.confirm("ログアウトします。\nよろしいですか？")
    if(logoutCheck){
        AppUser.signOut(LoginPageUrl)
    }
}