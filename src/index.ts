import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './scss/style.scss';
import { Application } from "./utils/application";
const app:Application = new Application();
app.run();

import { test } from './test/Murakami/test';
test()

//テスト用ログアウトコード(コンソール上で実行)
import { AppUser } from "./utils/AppUser";
import { LoginPageUrl } from "./utils/constants";
declare global {
    interface Window {
        logout(): void;
        getApp(): void;
    }
}
window.logout = function (): void{
    const logoutCheck: Boolean = window.confirm("ログアウトします。\nよろしいですか？")
    if(logoutCheck){
        const appUser:AppUser = new AppUser()
        appUser.signOut(LoginPageUrl)
    }
}
window.getApp = async function (): Promise<void>{
    console.log(app)
    console.log(app.appUser)
    await app.appUser.assignUserInfo()
    console.log(app.appUser)
}