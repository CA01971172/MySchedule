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
window.hoge = async function (): Promise<void>{
    const serverAddress: string = "https://myschedule.iti2022kawahara.com";
    try{
        const serverLink: string = `${serverAddress}`
        const response = await fetch(serverLink, {
            method: 'GET',
            mode: 'cors',
        });
        const result = await response.text();
        console.log(result);
    }catch(e){
        console.log(e);
        throw new Error("サーバーへの接続に失敗しました");
    }
}