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
    }
}
window.logout = function (): void{
    const logoutCheck: Boolean = window.confirm("ログアウトします。\nよろしいですか？")
    if(logoutCheck){
        const appUser:AppUser = new AppUser()
        appUser.signOut(LoginPageUrl)
    }
}