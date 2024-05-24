import React from 'react';
import FirebaseInitializer from "./lib/firebase/firebase"
import AppUser from "./utils/AppUser"
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./style/app.scss"
import App from "./components/App";
import ErrorPage from "./components/ErrorPage";

async function checkServerAccess(): Promise<boolean>{
    const serverAddress: string = "https://myschedule-server.iti2022kawahara.com";
    try{
        const serverLink: string = `${serverAddress}`
        const response = await fetch(serverLink, {
            method: 'GET',
            mode: 'cors',
        });
        const result = await response.text();
        return true;
    }catch(e){
        return false;
    }
}

window.onload = async function(){
    // EC2サーバーにアクセスできるかどうかを取得する
    // const isServerRunning: boolean = await checkServerAccess();
    const isServerRunning: boolean = true; // TODO サーバーが復旧したら、サーバーアクセスエラーページも復活させる

    // firebaseを初期化する
    FirebaseInitializer.initialize();
    // 正しいページにリダイレクトする
    await AppUser.redirect();

    //Appコンポーネントをレンダリングする
    const container: HTMLElement | null = document.getElementById("root");
    if(!container) throw new Error("The root element is not found.")
    const root = createRoot(container);

    if(isServerRunning){
        root.render(<App />);
    }else{
        root.render(<ErrorPage errorCode=""/>);
    };
};



//テスト用コード(コンソール上で実行)
declare global {
    interface Window {
        testConnect(): void;
    }
}
window.testConnect = async function (): Promise<void>{
    const serverAddress: string = "https://myschedule-server.iti2022kawahara.com";
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
