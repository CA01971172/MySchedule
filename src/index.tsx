import React from 'react';
import FirebaseInitializer from "./lib/firebase/firebase"
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



//テスト用コード(コンソール上で実行)
declare global {
    interface Window {
        hoge(): void;
    }
}
window.hoge = function (): void{
    const email: string|null = window.prompt("enter your email");
    if(!email) return
    AppUser.registerEmail(email)
}