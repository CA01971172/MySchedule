import { Button } from "./Button"
import { AppUser } from "../../utils/AppUser";
import { LoginPageUrl } from "../../utils/constants";

export class LogoutButton extends Button { // ログアウト用のbutton要素を作成するクラス
    constructor() {
        const title: string = "ログアウト"
        const style: string[] =["btn", "btn-outline-danger"]
        const logout = function (){
            const logoutCheck: Boolean = window.confirm("ログアウトします。\nよろしいですか？")
            if(logoutCheck){
                const appUser:AppUser = new AppUser()
                appUser.signOut(LoginPageUrl)
            }
        }
        super(title, logout, style)
    }

    render(): HTMLButtonElement {
        return this.button;
    }
}